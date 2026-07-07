# -*- coding: utf-8 -*-
"""
实践 ① 最小 Agent —— Calculator + Search，先跑通骨架
对应 slides 第 9~10 页(现场演示)。

跑法：
    python 01_minimal_agent.py
看点：
    1) 它先调哪个工具?为什么先 Search 再 Calculator
    2) 每轮 Thought/Action/Observation 打印出来，循环肉眼可见
    3) 问一个不需要工具的问题，看它直接给答案不空调工具
"""

from common import TOOLS, get_chat_model, mode_banner, MockReActRunner


def run_real(question: str):
    """真实模式：LangGraph 的 create_react_agent(现行写法)。"""
    from langchain_core.tools import tool
    from langgraph.prebuilt import create_react_agent
    from common import safe_calculator, search_docs

    # 老教程的 initialize_agent(..."zero-shot-react-description") 已废弃，
    # 现用 LangGraph 的 create_react_agent，内部同样是 ReAct 循环。
    @tool
    def calculator(expr: str) -> str:
        """计算算术表达式，如 50000000*0.1"""
        return safe_calculator(expr)

    @tool
    def search(query: str) -> str:
        """检索文档，输入自然语言查询"""
        return search_docs(query)

    llm = get_chat_model(temperature=0)
    agent = create_react_agent(llm, [calculator, search])

    # stream 打开，让每一步实时可见——这才是这节课的高光时刻
    for chunk in agent.stream(
        {"messages": [("user", question)]}, stream_mode="values"
    ):
        chunk["messages"][-1].pretty_print()


def run_mock(question: str):
    """降级模式：本地规则决策器，展示同样的 T/A/O 循环。"""
    MockReActRunner(TOOLS, max_steps=5).run(question)


def main():
    llm = get_chat_model()
    real = llm is not None
    mode_banner(real)

    demos = [
        "查 X 国人口，并算它的 10%",   # 看点 1&2：先 Search 再 Calculator
        "什么是 Agent?一句话",         # 看点 3：不需要工具，直接答
    ]
    for q in demos:
        print("\n" + "#" * 64)
        (run_real if real else run_mock)(q)


if __name__ == "__main__":
    main()
