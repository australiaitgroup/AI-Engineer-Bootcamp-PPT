# =============================================================================
#  agent.py — LLM Function Calling 核心逻辑
# =============================================================================

import json

from openai import OpenAI

from tools import TOOL_HANDLERS, TOOLS

_SYSTEM_PROMPT = (
    "你是一个有用的助手，拥有两个工具：\n"
    "  • reverse_string：反转字符串\n"
    "  • basic_calculator：四则运算（add/subtract/multiply/divide）\n"
    "需要时调用工具，然后用自然语言回答用户。"
)


# ── 打印工具 ──────────────────────────────────────────────────────────────────
#
#  视觉约定：
#   ╭───╮  圆角框  →  ☁  LLM 云端调用（发送 / 接收）
#   ┏━━━┓  粗线框  →  ⚙  本地 Tool Call 执行
#   ──────  细线   →  💬 用户输入
#
# ─────────────────────────────────────────────────────────────────────────────

_W = 62  # 框宽（字符数）


def _llm_box(title: str) -> None:
    """☁ LLM 边框（圆角细线）。"""
    inner = _W - 4
    print(f"\n╭─ ☁  {title} {'─' * max(0, inner - len(title) - 1)}╮")


def _llm_box_end() -> None:
    print(f"╰{'─' * (_W - 2)}╯")


def _tool_box(title: str) -> None:
    """⚙ 本地 Tool Call 边框（粗线）。"""
    inner = _W - 4
    print(f"\n┏━ ⚙  {title} {'━' * max(0, inner - len(title) - 1)}┓")


def _tool_box_end() -> None:
    print(f"┗{'━' * (_W - 2)}┛")


def _llm_line(text: str) -> None:
    print(f"│  {text}")


def _tool_line(text: str) -> None:
    print(f"┃  {text}")


# ── 各阶段打印 ────────────────────────────────────────────────────────────────


def _print_user_message(user_message: str) -> None:
    sep = "─" * _W
    print(f"\n{sep}")
    print(f"  💬 用户输入: {user_message}")
    print(sep)


def _print_llm_request(round_: int, model: str, messages: list[dict]) -> None:
    """☁ LLM 请求框：展示发送给 LLM 的 messages。"""
    _llm_box(f"LLM 第 {round_} 次调用  [{model}]  — 发送 messages")
    role_icon = {"system": "⚙ sys ", "user": "👤 usr ", "assistant": "🤖 ast ", "tool": "🔧 tool"}
    for msg in messages:
        role = msg.get("role", "?")
        icon = role_icon.get(role, f"   {role} ")
        content = msg.get("content") or ""
        short = content[:80] + "…" if len(content) > 80 else content
        _llm_line(f"{icon}│ {short}")
        for tc in msg.get("tool_calls") or []:
            fn = tc.get("function", {})
            _llm_line(f"        └─ call: {fn.get('name')}({fn.get('arguments')})")
    _llm_box_end()


def _print_llm_response(round_: int, msg) -> None:
    """☁ LLM 响应框：展示 LLM 返回的内容。"""
    _llm_box(f"LLM 第 {round_} 次响应")
    if msg.content:
        _llm_line(f"📝 文本: {msg.content}")
    if msg.tool_calls:
        for tc in msg.tool_calls:
            _llm_line(f"🔧 请求调用工具: {tc.function.name}")
            _llm_line(f"   参数: {tc.function.arguments}")
    if not msg.content and not msg.tool_calls:
        _llm_line("(无内容)")
    _llm_box_end()


def _print_tool_call(name: str, arguments: str, result: str) -> None:
    """⚙ 本地 Tool Call 框：展示本地函数执行过程。"""
    _tool_box(f"本地执行 Tool Call")
    _tool_line(f"函数名 : {name}")
    _tool_line(f"入参   : {arguments}")
    _tool_line(f"返回值 : {result}")
    _tool_box_end()


# ── 工具执行 ──────────────────────────────────────────────────────────────────


def _execute_tool(name: str, arguments: str) -> str:
    handler = TOOL_HANDLERS.get(name)
    if not handler:
        return f"ERROR: unknown tool '{name}'"
    try:
        args = json.loads(arguments or "{}")
        return str(handler(**args))
    except Exception as exc:
        return f"ERROR: {exc}"


# ── LLM 调用封装 ──────────────────────────────────────────────────────────────


def _call_llm(client: OpenAI, messages: list[dict], model: str, round_: int):
    _print_llm_request(round_, model, messages)
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        tools=TOOLS,
        temperature=0,
    )
    msg = response.choices[0].message
    _print_llm_response(round_, msg)
    return msg


def _append_assistant(messages: list[dict], msg) -> None:
    record: dict = {"role": "assistant", "content": msg.content}
    if msg.tool_calls:
        record["tool_calls"] = [
            {
                "id": tc.id,
                "type": "function",
                "function": {"name": tc.function.name, "arguments": tc.function.arguments},
            }
            for tc in msg.tool_calls
        ]
    messages.append(record)


# ── 公开接口 ──────────────────────────────────────────────────────────────────


def chat_with_tools(client: OpenAI, user_message: str, model: str = "deepseek-chat") -> str:
    """单问题问答：最多 1 次工具调用 + 1 次最终生成。"""
    _print_user_message(user_message)

    messages: list[dict] = [
        {"role": "system", "content": _SYSTEM_PROMPT},
        {"role": "user", "content": user_message},
    ]

    # 第 1 次：LLM 决定是否调用工具
    msg = _call_llm(client, messages, model, round_=1)
    _append_assistant(messages, msg)

    if not msg.tool_calls:
        return msg.content or ""

    # 执行所有工具调用
    for tc in msg.tool_calls:
        result = _execute_tool(tc.function.name, tc.function.arguments)
        _print_tool_call(tc.function.name, tc.function.arguments, result)
        messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})

    # 第 2 次：基于工具结果生成最终答案
    final_msg = _call_llm(client, messages, model, round_=2)
    return final_msg.content or ""
