# -*- coding: utf-8 -*-
"""
Deck2 现场演示 · 共享模块
=========================
三家 SDK 写同一个任务：天气助手 + get_weather 工具调用。
把「工具」和「mock 兜底」放这里，三个文件各自只写 SDK 特有的部分，
方便学员并排对比「同一件事，三种写法」。
"""

import os
import time


# ---------- 所有 SDK 共用同一个业务工具 ----------

_WEATHER = {
    "东京": "晴，24°C，湿度 40%",
    "tokyo": "Sunny, 24°C, humidity 40%",
    "北京": "多云，21°C，湿度 55%",
    "上海": "小雨，19°C，湿度 80%",
}


def lookup_weather(city: str) -> str:
    """纯业务逻辑：查天气。真实里接天气 API，这里用假数据保证现场可跑。"""
    return _WEATHER.get(city.strip().lower(), _WEATHER.get(city.strip(), f"{city} 晴，23°C"))


def banner(sdk_name: str, real: bool):
    mode = "真实 SDK" if real else "MOCK(未装 SDK / 无 key，本地模拟同样流程)"
    print("=" * 64)
    print(f"【{sdk_name}】运行模式：{mode}")
    print("=" * 64)


def mock_run(sdk_name: str, question: str, city: str):
    """三家 SDK 共用的降级演示：模拟『决策->调工具->生成回答』并计时。

    输出结构刻意统一，方便现场对着 slides 第 15 页填『代码量/延迟/可控性』表。
    """
    t0 = time.time()
    print(f"❓ 用户：{question}")
    print("  💭 [LLM] 判断需要天气信息 -> 决定调用工具 get_weather")
    print(f"  🔧 [Tool] get_weather(city={city!r})")
    result = lookup_weather(city)
    print(f"  👀 [Observation] {result}")
    answer = f"{city}今天{result}，出门注意增减衣物。"
    # 模拟流式输出，突出各家「流式体验」差异这一讲课点
    print("  🤖 [Assistant] ", end="", flush=True)
    for ch in answer:
        print(ch, end="", flush=True)
        time.sleep(0.006)
    print()
    dt = (time.time() - t0) * 1000
    print(f"  ⏱ 本次耗时 ≈ {dt:.0f} ms(mock)")
    return answer


def has(*modules) -> bool:
    """检测某个 SDK 是否已安装(且有对应 key)。"""
    import importlib.util
    return all(importlib.util.find_spec(m) is not None for m in modules)
