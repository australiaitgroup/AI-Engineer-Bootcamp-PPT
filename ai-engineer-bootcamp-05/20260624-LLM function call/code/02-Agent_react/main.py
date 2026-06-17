from agent import build_default_tools, create_deepseek_llm, react_loop


def main() -> None:
    tools = build_default_tools()
    llm = create_deepseek_llm()
    question = "请帮我计算 21+21，并统计答案字符串有多少个字符。"

    print(f"Question: {question}\n")
    result = react_loop(question, tools, llm, verbose=True)
    print(f"\nResult: {result}")


if __name__ == "__main__":
    main()
