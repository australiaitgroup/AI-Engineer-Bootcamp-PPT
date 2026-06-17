# LLM Function Calling 小工程

演示如何通过 OpenAI Function Calling 协议让 LLM 调用本地 Python 函数。

## 目录结构

```
01-small-llm-function-call-project/
├── main.py                  # 入口：控制台交互循环
├── agent.py                 # LLM 调用 + Function Calling 循环逻辑
├── tools/
│   ├── __init__.py          # 工具注册中心（TOOL_HANDLERS + TOOLS）
│   ├── reverse_string.py    # 工具：反转字符串
│   └── basic_calculator.py  # 工具：四则运算
├── .env.example             # 环境变量模板
└── README.md
```

## 工具说明

| 工具 | 参数 | 功能 |
|------|------|------|
| `reverse_string` | `text: str` | 将字符串反转，如 `"hello"` → `"olleh"` |
| `basic_calculator` | `operation, a, b` | 四则运算，`operation` 可选：`add / subtract / multiply / divide` |

## 快速开始

### 1. 安装依赖

```bash
pip install openai python-dotenv
```

### 2. 配置 API Key

```bash
cp .env.example .env
```

编辑 `.env`，填入你的 DeepSeek API Key：

```
DEEPSEEK_API_KEY=your_api_key_here
```

### 3. 运行

```bash
python main.py
```

### 4. 交互示例

```
============================================================
LLM Function Calling 小工程
可用工具：reverse_string / basic_calculator
输入 'exit' 或 'quit' 退出
============================================================

[你] 把 "OpenAI" 反转一下
[助手] "OpenAI" 反转后是 "IAnepO"。

[你] 计算 128 乘以 37
[助手] 128 × 37 = 4736。

[你] exit
再见！
```

## 流程图

```
用户输入
   │
   ▼
messages = [system, user] + TOOLS
   │
   ▼
LLM 第 1 次调用
   ├─ 无 tool_calls ──► 直接返回文本
   └─ 有 tool_calls
           │
           ▼
       执行本地工具（TOOL_HANDLERS）
           │
           ▼
       追加 [tool] 结果到 messages
           │
           ▼
       LLM 第 2 次调用 ──► 最终答案
```

## 扩展：新增工具

1. 在 `tools/` 下新建文件，实现函数和 `SCHEMA`（参考 `reverse_string.py`）。
2. 在 `tools/__init__.py` 中导入并注册到 `TOOL_HANDLERS` 和 `TOOLS`。
3. `agent.py` 和 `main.py` 无需修改。
