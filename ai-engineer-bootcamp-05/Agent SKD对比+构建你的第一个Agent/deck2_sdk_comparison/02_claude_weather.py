# -*- coding: utf-8 -*-
"""
代码 · Claude Agent SDK —— 内置工具 + 流式循环
对应 slides 第 11 页。哲学：给 agent 一台电脑 + 一堆钩子(hooks)。

安装：pip install claude-agent-sdk   环境：export ANTHROPIC_API_KEY=...
跑法：python 02_claude_weather.py
看点：工具很多是内置的(WebSearch/文件/bash)或直接挂 MCP；async for 天然流式，每步实时可见。

说明：Claude Agent SDK 的内置工具偏向「读写文件 / bash / web」等 OS 能力，
不像另外两家那样习惯定义一个纯函数 get_weather。这里演示两种接法：
  A) 用内置 WebSearch 让它自己查(真实、贴官方用法)
  B) 通过自定义工具/MCP 暴露 get_weather(注释示意)
"""

import os
import asyncio
from weather_common import banner, mock_run, has

QUESTION = "东京今天天气怎么样?"
CITY = "东京"


async def run_real():
    from claude_agent_sdk import query, ClaudeAgentOptions

    options = ClaudeAgentOptions(
        system_prompt="你是天气助手",
        allowed_tools=["WebSearch"],        # 内置工具；也可挂 MCP server 暴露 get_weather
        permission_mode="acceptEdits",      # 可插入 human-in-the-loop 人审检查点
    )
    async for msg in query(prompt=QUESTION, options=options):
        print(msg)                          # 流式输出每一步(Thought/工具调用/结果)


def main():
    real = has("claude_agent_sdk") and bool(os.getenv("ANTHROPIC_API_KEY"))
    banner("Claude Agent SDK", real)
    if real:
        asyncio.run(run_real())
    else:
        mock_run("Claude", QUESTION, CITY)


if __name__ == "__main__":
    main()
