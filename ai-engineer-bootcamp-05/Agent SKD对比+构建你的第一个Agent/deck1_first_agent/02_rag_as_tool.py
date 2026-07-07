# -*- coding: utf-8 -*-
"""
实践 ② RAG 封装为工具 —— 让 Agent 能直接「查文档」
对应 slides 第 11 页。

核心思想：把「检索 + 生成」这一整套复杂能力，收拢成一个工具 document_qa。
Agent 只需把「文档问答」当作一种能力来调用，便于组合更复杂任务
(如先查证再生成报告)。

跑法：python 02_rag_as_tool.py
"""

from common import TOOLS, get_chat_model, mode_banner, MockReActRunner


def run_real(question: str):
    from langchain_core.tools import tool
    from langgraph.prebuilt import create_react_agent
    from common import document_qa as _rag

    @tool
    def document_qa(question: str) -> str:
        """用已上传文档回答问题，返回带来源的答案"""
        return _rag(question)          # 调用你自己的 RAG pipeline
        # -> "Answer: ...  Sources: [file.pdf#p3]"

    agent = create_react_agent(get_chat_model(), [document_qa])
    for chunk in agent.stream(
        {"messages": [("user", question)]}, stream_mode="values"
    ):
        chunk["messages"][-1].pretty_print()


def run_mock(question: str):
    # 只放 document_qa 一个工具，演示「能力即工具」
    MockReActRunner({"document_qa": TOOLS["document_qa"]}, max_steps=3).run(question)


def main():
    llm = get_chat_model()
    real = llm is not None
    mode_banner(real)

    q = "根据文档，X 国人口大概多少?给出来源"
    (run_real if real else run_mock)(q)


if __name__ == "__main__":
    main()
