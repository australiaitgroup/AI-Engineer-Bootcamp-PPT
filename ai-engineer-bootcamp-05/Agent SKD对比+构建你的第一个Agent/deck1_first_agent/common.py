# -*- coding: utf-8 -*-
"""
Deck1 现场演示 · 共享模块
=========================
把「工具」「模型」「mock 决策器」都收在这里，四个 demo 直接 import。

设计目标(现场绝不卡住)：
- 有 OPENAI_API_KEY  -> 用真实 LangGraph create_react_agent(真 ReAct 循环)
- 没有 key / 断网    -> 自动降级到 MockReActRunner(纯本地规则式循环)
两种模式打印的 Thought/Action/Observation 结构一致，讲课体验一样。
"""

import os
import re


# ============================================================
# 1) 工具(tools) —— 单一职责 + 结构化 + 清晰 description
# ============================================================

def safe_calculator(expr: str) -> str:
    """计算一个算术表达式，只允许数字和 + - * / ( ) . 空格。

    ⚠️ 教学重点：绝不用裸 eval。这里用白名单正则挡掉一切字母/下划线，
    只放行安全字符，再交给 eval 求值——这就是 slides 里说的「白名单解析」。
    """
    if not re.fullmatch(r"[0-9+\-*/().\s]+", expr or ""):
        return "错误：表达式含非法字符，仅允许数字与 + - * / ( )"
    try:
        # 此时 expr 已被白名单过滤，无法访问任何名字/函数
        return str(eval(expr, {"__builtins__": {}}, {}))
    except Exception as e:  # 标准化错误返回，便于 Agent 判断与重试
        return f"错误：无法计算({e})"


# 一个假的「文档库」，演示 search 工具。真实里换成向量检索/搜索 API。
_FAKE_DOCS = {
    "x国人口": "X 国人口约 5000 万(来源：demo_doc#p1)",
    "population": "Country X population ~50,000,000 (demo_doc#p1)",
}


def search_docs(query: str) -> str:
    """检索文档，返回命中的片段。真实里替换为你自己的搜索/检索。"""
    q = query.lower().replace(" ", "")
    for key, val in _FAKE_DOCS.items():
        if key in q or any(w in q for w in ["人口", "population", "x国", "countryx"]):
            return val
    return f"未检索到与「{query}」直接相关的文档片段"


def document_qa(question: str) -> str:
    """用已上传文档回答问题，返回带来源的答案(把 RAG 封成一个工具)。

    真实里：这里调用你自己的 RAG pipeline(检索 + 生成)。
    demo 里：用假 RAG 直接给一个带来源的答案，让 Agent 学会「查证后再答」。
    """
    hit = search_docs(question)
    return f"Answer(基于文档)：{hit}  | Sources: [demo_doc.pdf#p1]"


# 供 mock 决策器与自实现 loop 复用的工具注册表
TOOLS = {
    "calculator": safe_calculator,
    "search_docs": search_docs,
    "document_qa": document_qa,
}

TOOL_DESCRIPTIONS = {
    "calculator": "计算算术表达式，如 50000000*0.1",
    "search_docs": "检索文档，输入自然语言查询",
    "document_qa": "用已上传文档回答问题，返回带来源答案",
}


# ============================================================
# 2) 双模式：拿一个真实 LangChain 模型，或告诉调用方走 mock
# ============================================================

def get_chat_model(temperature: float = 0):
    """有 key 就返回真实 ChatOpenAI；否则返回 None(调用方走 mock)。"""
    if not os.getenv("OPENAI_API_KEY"):
        return None
    try:
        from langchain_openai import ChatOpenAI
        model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        return ChatOpenAI(model=model, temperature=temperature)
    except Exception as e:
        print(f"[提示] 无法初始化 ChatOpenAI({e})，降级到 mock 模式")
        return None


def mode_banner(real: bool):
    tag = "真实 API 模式(LangGraph create_react_agent)" if real else "MOCK 模式(本地规则决策，无需 key)"
    print("=" * 64)
    print(f"运行模式：{tag}")
    print("=" * 64)


# ============================================================
# 3) MockReActRunner —— 没有 key 时，用规则模拟「LLM 的决策」
# ============================================================
# 它不是真 LLM，而是把「模型该怎么想」写成规则，好处是：
#   - 现场零依赖、零网络也能把 T/A/O 循环演示得明明白白
#   - 停止条件、循环结构和真实 Agent 完全一致

class MockReActRunner:
    """规则式 ReAct 执行器：打印 Thought/Action/Observation，直到 Final Answer。"""

    def __init__(self, tools: dict, max_steps: int = 5, verbose: bool = True):
        self.tools = tools
        self.max_steps = max_steps
        self.verbose = verbose

    def _log(self, label, text):
        if self.verbose:
            print(f"  {label:<12} {text}")

    def _decide(self, question, observations):
        """核心：根据问题 + 已有观测，模拟模型决定下一步。返回 (类型, 工具, 参数)。"""
        q = question.lower()

        # 规则 0：只挂了 document_qa 工具时(实践②)，把「文档问答」当一个能力直接调
        if set(self.tools) == {"document_qa"}:
            if not observations:
                return ("action", "document_qa", question)
            return ("final", None, observations[-1]["result"])

        # 规则 A：需要「先查再算」的问题(slides 里的经典例子)
        needs_search = any(k in q for k in ["人口", "population", "查", "多少人"])
        needs_calc = any(k in q for k in ["10%", "百分", "算", "乘", "加", "%"])

        done_search = any(o["tool"] == "search_docs" for o in observations)
        done_calc = any(o["tool"] == "calculator" for o in observations)

        if needs_search and not done_search:
            return ("action", "search_docs", question)
        if needs_calc and not done_calc:
            # 从已检索到的数字里凑一个表达式(演示用，简单抽取)
            nums = re.findall(r"[\d,]{4,}", " ".join(o["result"] for o in observations))
            base = nums[0].replace(",", "") if nums else "50000000"
            return ("action", "calculator", f"{base}*0.1")

        # 规则 B：纯知识问题，不需要工具，直接答(对应 slides 看点 3)
        if not needs_search and not needs_calc and not observations:
            return ("final", None,
                    "这个问题不需要调用工具，我直接回答：Agent = 会决策的 LLM + 会执行的工具。")

        # 汇总观测，给最终答案
        summary = "；".join(o["result"] for o in observations) or "已完成"
        return ("final", None, f"综合以上结果：{summary}")

    def run(self, question: str) -> str:
        print(f"\n❓ 问题：{question}")
        observations = []
        for step in range(1, self.max_steps + 1):
            print(f"\n── 第 {step} 轮 " + "─" * 40)
            typ, tool, arg = self._decide(question, observations)

            if typ == "final":
                self._log("💭 Thought", "信息够了，可以给最终答案。")
                self._log("✅ Final", arg)
                return arg

            # typ == "action"
            self._log("💭 Thought", f"我需要调用工具 `{tool}` 来获取信息。")
            self._log("🔧 Action", f"{tool}({arg!r})")
            result = self.tools.get(tool, lambda a: "未知工具")(arg)
            self._log("👀 Observation", result)
            observations.append({"tool": tool, "arg": arg, "result": result})

        # 停止条件：达到最大步数(必须有，否则可能无限循环)
        print("\n⛔ 达到最大步数，安全停止。")
        return "Stopped: reached max steps"
