# 01 - ReAct Agent 示例

简化版 ReAct（Reasoning + Acting）循环：LLM 按 **Thought → Action → Observation** 格式推理，必要时调用工具，最后给出 **Final Answer**。

## 目录结构

```
01-Agent_react/
├── main.py              # 程序入口
├── agent/
│   ├── types.py         # Tool 定义
│   ├── prompt.py        # 提示词构建 / Action 解析
│   ├── loop.py          # ReAct 主循环
│   ├── llm/             # LLM 接入（DeepSeek）
│   └── tools/           # 工具实现
├── logic.txt            # 代码逻辑图（ASCII）
├── requirements.txt
└── .env.example
```

## 内置工具

| 工具 | 作用 |
|------|------|
| `calculator` | 安全计算数学表达式 |
| `get_current_time` | 获取指定时区当前时间 |
| `word_count` | 统计文本字符数与词数 |

## 快速开始

```bash
cd 01-Agent_react
pip install -r requirements.txt

# 复制并填写 API Key
copy .env.example .env

python main.py
```

程序会自动读取项目根目录下的 `.env` 文件；也可手动设置系统环境变量 `DEEPSEEK_API_KEY`。

API Key 可从 [DeepSeek 开放平台](https://platform.deepseek.com/) 获取，参考 `.env.example`。

## 代码逻辑图

### 整体架构

```
    main.py
       |
       +-- build_default_tools()  -->  tools (calculator / get_current_time / word_count)
       |
       +-- create_deepseek_llm()  -->  llm(prompt) -> str
       |
       +-- react_loop(question, tools, llm)
                  |
                  v
              agent/loop.py  (核心循环)
```

### ReAct 主循环

**一句话：** 最多跑 6 轮；每轮先问 LLM，若已能作答就结束，否则执行工具、把结果记入 `history`，再进入下一轮。

```
  [开始]
     |
     |  history = []     （空列表，用来记每一轮发生了什么）
     v
  .-------------------.
  |   第 1~6 轮循环    |<---------------------------.
  '-------------------'                             |
     |                                               |
     | ① 拼 prompt（问题 + 之前的 history）           |
     v                                               |
  ② 问 LLM，拿到 out                                 |
     |                                               |
     v                                               |
  ③ out 包含 "Final Answer:" 吗？                   |
     |                                               |
     +--- 是 ---> 提取答案，返回，[结束]              |
     |                                               |
     +--- 否 ---> ④ 从 out 里解析 Thought / Action   |
                     |                               |
                     v                               |
                 ⑤ 调用对应工具                      |
                     |                               |
                     v                               |
                 得到 Observation                    |
                     |                               |
                     v                               |
                 ⑥ 写入 history                      |
                     |                               |
                     '-------------------------------'
     |
     |  （跑满 6 轮仍无 Final Answer）
     v
  返回 "Failed: max steps exceeded."
```

### 单轮交互格式

```
Thought: 我需要先计算 ...
Action: calculator
Action Input: 21+21
        ↓ 工具执行
Observation: 42
        ↓ 下一轮
Thought: 已有结果
Final Answer: 42
```

### 简单示例（单工具，2 轮）

**Question:** `21+21 等于多少？`

**Step 1 — LLM 输出：**

```
Thought: 需要先计算 21+21。
Action: calculator
Action Input: 21+21
```

→ 调用 `calculator.run("21+21")` → **Observation:** `42`

**Step 2 — LLM 输出（history 中已有 Observation）：**

```
Thought: 我已经得到计算结果。
Final Answer: 42
```

→ **Result:** `42`

```
    用户                LLM                    calculator
     |                  |                          |
     |  21+21 等于多少？ |                          |
     |----------------->|                          |
     |                  | Thought: 需要先计算 21+21 |
     |                  | Action: calculator       |
     |                  | Action Input: 21+21      |
     |                  |------------------------->|
     |                  |                          |
     |                  |<----- Observation: 42 ---|
     |                  |                          |
     |                  | Thought: 我已经得到计算结果 |
     |                  | Final Answer: 42         |
     |<-----------------|                          |
     |                  |                          |
    Result: 42
```

### 多次思考示例（`main.py` 默认问题）

当一个问题需要**连续调用多个工具**时，ReAct 会多轮循环：每轮都有独立的 `Thought`，直到信息足够再给出 `Final Answer`。

**Question:** `请帮我计算 21+21，并统计答案 '42' 这个字符串有多少个字符。`

**Step 1**

```
Thought: 先计算 21+21。
Action: calculator
Action Input: 21+21
```
→ **Observation:** `42`

**Step 2**

```
Thought: 计算结果是 42，接下来统计字符串 "42" 的字符数。
Action: word_count
Action Input: 42
```
→ **Observation:** `字符数: 2, 词数: 1`

**Step 3**

```
Thought: 21+21=42，字符串 "42" 有 2 个字符。
Final Answer: 21+21 等于 42，"42" 这个字符串有 2 个字符。
```

```
    用户          LLM              calculator        word_count
     |            |                    |                 |
     |  复合问题   |                    |                 |
     |----------->|                    |                 |
     |            | Thought: 先算 21+21 |                 |
     |            | Action: calculator |                 |
     |            |------------------->|                 |
     |            |<-- Obs: 42 --------|                 |
     |            |                    |                 |
     |            | Thought: 再统计 "42" 字符数           |
     |            | Action: word_count |                 |
     |            |------------------------------------->|
     |            |<-- Obs: 字符数:2, 词数:1 ------------|
     |            |                    |                 |
     |            | Thought: 信息已齐，可以作答            |
     |            | Final Answer: ...  |                 |
     |<-----------|                    |                 |
```

## 扩展方式

1. 在 `agent/tools/` 新建工具文件，实现 `run(input: str) -> str`
2. 在 `agent/tools/__init__.py` 的 `build_default_tools()` 中注册
3. 如需新 LLM，在 `agent/llm/` 添加实现即可
