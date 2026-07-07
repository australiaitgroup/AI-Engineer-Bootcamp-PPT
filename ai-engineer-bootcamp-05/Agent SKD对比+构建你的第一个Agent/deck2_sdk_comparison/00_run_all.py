# -*- coding: utf-8 -*-
"""
现场演示总控 —— 三个 SDK 依次跑，最后打印对比表
对应 slides 第 14~15 页(同一任务写三遍 + 量化对比)。

跑法：python 00_run_all.py
建议：现场就照着输出，把「代码行数 / 首字延迟 / 调试信息」当场填进 slides 的表。
"""

import importlib


def section(title):
    print("\n\n" + "█" * 64)
    print(f"█  {title}")
    print("█" * 64)


def main():
    for mod, title in [
        ("01_openai_weather", "① OpenAI Agents SDK"),
        ("02_claude_weather", "② Claude Agent SDK"),
        ("03_google_adk_weather", "③ Google ADK 2.0"),
    ]:
        section(title)
        importlib.import_module(mod).main()

    # 感受型对照表(数字以现场实测为准，重点是让学员理解取舍维度)
    print("\n\n" + "=" * 64)
    print("量化对比(感受型 · 以现场实测为准)")
    print("=" * 64)
    rows = [
        ("维度",       "OpenAI",       "Claude",       "Google ADK"),
        ("起步代码量", "最少",         "少",           "中(更多结构)"),
        ("流式体验",   "好",           "最丝滑",       "好"),
        ("可控/可观测","内置tracing",  "hooks拦截",    "图式最透明"),
        ("换模型难度", "难(锁定)",     "难(锁定)",     "一行搞定"),
        ("最适合",     "轻量委派+生态","编码/OS+MCP",  "GCP企业+多语言"),
    ]
    for r in rows:
        print(f"  {r[0]:<10}| {r[1]:<12}| {r[2]:<12}| {r[3]:<14}")
    print("\n📊 结论不是『谁赢』，而是每一行都是一个取舍：锁定换省心、结构换灵活、丝滑换生态。")


if __name__ == "__main__":
    main()
