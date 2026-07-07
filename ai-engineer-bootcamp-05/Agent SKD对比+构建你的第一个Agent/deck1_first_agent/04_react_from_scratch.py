# -*- coding: utf-8 -*-
"""
实践 ④ 自实现 ReAct Loop —— 掀开引擎盖，看清底层
对应 slides 第 13 页。

自实现的价值：透明、好调试，你能完全掌控解析、执行、重试。
代价是解析脆弱、安全要自己兜 —— 生产别用裸 eval，用白名单/沙箱。
(本文件的 calculator 已用 common.safe_calculator 做白名单。)

跑法：python 04_react_from_scratch.py
    - 有 OPENAI_API_KEY：call_llm 用真实模型，按 ReAct 格式输出
    - 没有 key：call_llm 用本地规则「假 LLM」，同样跑通整个 loop
"""

import os
import re
from common import TOOLS, mode_banner

PROMPT_HEADER = """你是一个 ReAct Agent。可用工具：
- search_docs[query]：检索文档
- calculator[expr]：计算算术表达式
请严格按以下格式逐步输出：
Thought: <你的思考>
Action: <工具名>[<参数>]
或在信息足够时：
Thought: <思考>
Final Answer: <答案>
"""


# ---------- call_llm：真实 or 假 LLM，返回一段 ReAct 文本 ----------

def call_llm(history: str) -> str:
    if os.getenv("OPENAI_API_KEY"):
        try:
            from openai import OpenAI
            client = OpenAI()
            resp = client.chat.completions.create(
                model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
                temperature=0,
                stop=["Observation:"],   # 关键：让模型停在 Observation 前，由我们回填
                messages=[{"role": "user", "content": history}],
            )
            return resp.choices[0].message.content
        except Exception as e:
            print(f"[提示] 真实 LLM 调用失败({e})，改用本地假 LLM")
    return _fake_llm(history)


def _fake_llm(history: str) -> str:
    """规则式假 LLM：根据 history 里『已经发出过哪些 Action』决定下一步。

    注意用 "Action: xxx[" 判断实际执行过的步骤，避免被 prompt 里出现的
    工具名(如 header 里的 calculator[expr])误导。
    """
    searched = "Action: search_docs[" in history
    calculated = "Action: calculator[" in history

    if searched and calculated:                    # 两步都做过 -> 收尾
        nums = re.findall(r"[\d.]+", history.rsplit("Observation:", 1)[-1])
        val = nums[0] if nums else "?"
        return f"Thought: 我已经拿到人口并算出 10%。\nFinal Answer: X 国人口的 10% 约为 {val}。"
    if searched:                                    # 查过了 -> 该算了
        m = re.findall(r"[\d,]{4,}", history.rsplit("Observation:", 1)[-1])
        base = (m[0].replace(",", "") if m else "50000000")
        return f"Thought: 已知人口，现在计算它的 10%。\nAction: calculator[{base}*0.1]"
    return "Thought: 我需要先查 X 国人口。\nAction: search_docs[X 国人口]"


# ---------- parse_action：正则解析 Action / Final ----------

def parse_action(text: str):
    fin = re.search(r"Final Answer:\s*(.+)", text, re.S)
    if fin:
        return "final", fin.group(1).strip(), None
    act = re.search(r"Action:\s*(\w+)\[(.*?)\]", text, re.S)
    if act:
        return "action", act.group(1).strip(), act.group(2).strip()
    return "none", None, None


# ---------- 主循环：结构与 slides 完全一致 ----------

def react_loop(question, max_steps=6):
    history = PROMPT_HEADER + f"\nQuestion: {question}\n"
    for step in range(1, max_steps + 1):          # ← 停止条件：最大步数
        out = call_llm(history)
        print(f"\n── 第 {step} 轮 " + "─" * 40)
        print(out.strip())
        typ, tool, arg = parse_action(out)
        if typ == "final":
            return tool
        if typ == "action":
            obs = TOOLS.get(tool, lambda a: f"未知工具 {tool}")(arg)
            print(f"Observation: {obs}")
            history += out + f"\nObservation: {obs}\n"
        else:
            history += out + "\n"
    return "Stopped: reached max steps"


def main():
    mode_banner(bool(os.getenv("OPENAI_API_KEY")))
    q = "查 X 国人口，并算它的 10%"
    print(f"\n❓ 问题：{q}")
    ans = react_loop(q)
    print(f"\n✅ 最终答案：{ans}")


if __name__ == "__main__":
    main()
