# -*- coding: utf-8 -*-
"""
代码 · OpenAI Agents SDK —— 函数即工具，一行运行
对应 slides 第 9 页。哲学：对话处理器 + 委派(Handoffs)。

安装：pip install openai-agents   环境：export OPENAI_API_KEY=...
跑法：python 01_openai_weather.py
看点：装饰器工具 + Runner 一行跑；真实里打开 tracing 面板看 trace。
"""

import os
from weather_common import lookup_weather, banner, mock_run, has

QUESTION = "东京今天天气怎么样?"
CITY = "东京"


def run_real():
    from agents import Agent, Runner, function_tool

    @function_tool
    def get_weather(city: str) -> str:
        return lookup_weather(city)          # 真实中接天气 API

    agent = Agent(
        name="Weather Assistant",
        instructions="你是天气助手，需要时调用工具",
        tools=[get_weather],
        # 多 agent 时：handoffs=[other_agent] 即可把任务连同完整历史委派出去
    )
    result = Runner.run_sync(agent, QUESTION)
    print(f"🤖 {result.final_output}")


def main():
    real = has("agents") and bool(os.getenv("OPENAI_API_KEY"))
    banner("OpenAI Agents SDK", real)
    if real:
        run_real()
    else:
        mock_run("OpenAI", QUESTION, CITY)


if __name__ == "__main__":
    main()
