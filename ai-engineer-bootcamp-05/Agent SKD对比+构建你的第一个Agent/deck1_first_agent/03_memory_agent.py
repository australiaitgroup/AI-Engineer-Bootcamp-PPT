# -*- coding: utf-8 -*-
"""
实践 ③ 带记忆的多步 Agent —— 让它记住上一句
对应 slides 第 12 页。

现行做法：用 checkpointer(InMemorySaver) 保存会话状态，
同一个 thread_id 就能跨轮保持上下文。

跑法：python 03_memory_agent.py
记忆的代价：会话越长越占 token，生产里要做摘要/裁剪。
"""

from common import TOOLS, get_chat_model, mode_banner


def run_real():
    from langchain_core.tools import tool
    from langgraph.prebuilt import create_react_agent
    from langgraph.checkpoint.memory import InMemorySaver
    from common import search_docs

    @tool
    def search(query: str) -> str:
        """检索产品销售数据"""
        return search_docs(query)

    # 用 checkpointer 保存会话状态(现行做法)
    agent = create_react_agent(get_chat_model(), [search], checkpointer=InMemorySaver())
    cfg = {"configurable": {"thread_id": "user-1"}}   # 同一 thread 保持上下文

    for q in ["查产品 A 的销售数据", "和上个月对比一下"]:  # 第二句靠记忆理解「它」
        print(f"\n❓ 用户：{q}")
        res = agent.invoke({"messages": [("user", q)]}, cfg)
        res["messages"][-1].pretty_print()


def run_mock():
    """降级模式：用一个简单的会话 buffer 演示『记住上一句』这件事本身。"""
    from common import search_docs

    class MemoryAgent:
        def __init__(self):
            self.history = []           # 这就是最朴素的 Memory：一个 list
            self.last_subject = None

        def invoke(self, user_msg):
            self.history.append(("user", user_msg))
            # 模拟：如果这句里有代词/对比词，就靠 memory 补全主语
            if any(k in user_msg for k in ["对比", "它", "上个月", "再"]):
                subj = self.last_subject or "上一个查询对象"
                obs = search_docs(subj)
                answer = f"(用记忆补全主语=『{subj}』) 对比结果：{obs} vs 上月数据"
            else:
                self.last_subject = user_msg
                obs = search_docs(user_msg)
                answer = f"查询结果：{obs}"
            self.history.append(("assistant", answer))
            return answer

    agent = MemoryAgent()
    for q in ["查产品 A 的销售数据", "和上个月对比一下"]:
        print(f"\n❓ 用户：{q}")
        print(f"  🤖 {agent.invoke(q)}")
    print(f"\n🧠 当前 Memory(共 {len(agent.history)} 条)：")
    for role, msg in agent.history:
        print(f"   [{role}] {msg}")
    print("\n⚠️ 提醒：会话越长，这个 history 越占 token —— 生产里要摘要或裁剪。")


def main():
    real = get_chat_model() is not None
    mode_banner(real)
    (run_real if real else run_mock)()


if __name__ == "__main__":
    main()
