# -*- coding: utf-8 -*-
"""
代码 · Google ADK 2.0 —— 声明式，最结构化
对应 slides 第 13 页。哲学：把 agent 当分布式系统的软件组件来「搭系统」。

安装：pip install google-adk   环境：需 Gemini/Vertex 凭据(见官方文档)
跑法(两种)：
    A) 直接跑本文件：python 03_google_adk_weather.py   (演示定义 + 本地调用工具)
    B) 官方 CLI：    adk run   (在包含 root_agent 的目录用交互式 UI 跑)
看点：结构化返回(dict)是 ADK 的习惯，便于图式编排；model= 一行就能换模型 —— 三家里独有的灵活。
"""

import os
from weather_common import lookup_weather, banner, mock_run, has

QUESTION = "东京今天天气怎么样?"
CITY = "东京"


# ADK 习惯：工具返回结构化 dict(status + result)，便于图式编排里判断分支
def get_weather(city: str) -> dict:
    return {"status": "ok", "result": lookup_weather(city)}


def build_agent():
    """定义 root_agent。adk run 会自动发现它。"""
    from google.adk.agents import Agent
    return Agent(
        name="weather_agent",
        model="gemini-2.5-flash",           # 也可一行换成 Claude / 开源模型(模型无关)
        instruction="你是天气助手，需要时调用工具",
        tools=[get_weather],
    )


# 供 `adk run` 发现的模块级变量(仅在装了 google-adk 时构建)
root_agent = build_agent() if has("google.adk") else None


def main():
    real = has("google.adk")
    banner("Google ADK 2.0", real)
    if real:
        # 提示：完整多 agent 编排建议用 `adk run` 或 Runner。
        # 这里直接演示工具的结构化返回，突出 ADK 的 dict 习惯。
        out = get_weather(CITY)
        print(f"🔧 get_weather 返回(结构化 dict)：{out}")
        print(f"🤖 {CITY}今天{out['result']}。")
        print("💡 换模型只需改 model=，其余不动 —— 这是 ADK 独有的灵活。")
    else:
        mock_run("Google ADK", QUESTION, CITY)


if __name__ == "__main__":
    main()
