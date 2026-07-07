# 两节直播课 · 现场演示代码

配套你上传的两份 slides，把 DEMO 页的代码都做成**能当场跑通**的脚本。

核心设计：**双模式，现场绝不卡住**。
每个脚本都会先检测「有没有对应的 SDK 和 API key」——
- 有 → 跑真实模型/真实 SDK；
- 没有或断网 → 自动降级到 **mock 模式**（纯本地规则模拟 LLM 决策）。
两种模式打印的 `Thought / Action / Observation` 结构一致，讲课体验一样，**不装任何东西也能演示循环骨架**。

## 目录

```
agent-demos/
├── deck1_first_agent/          # 对应《构建第一个 Agent》
│   ├── common.py               # 工具 + 双模式检测 + mock 决策器
│   ├── 01_minimal_agent.py     # 最小 Agent：Calculator + Search
│   ├── 02_rag_as_tool.py       # 把 RAG 封成一个工具 document_qa
│   ├── 03_memory_agent.py      # 带记忆的多步 Agent(checkpointer)
│   └── 04_react_from_scratch.py# 自实现 ReAct loop(掀开引擎盖)
├── deck2_sdk_comparison/       # 对应《三家 Agent SDK 对比》
│   ├── weather_common.py       # get_weather 工具 + mock 兜底
│   ├── 00_run_all.py           # 三家依次跑 + 打印对比表(推荐现场用这个)
│   ├── 01_openai_weather.py    # OpenAI Agents SDK
│   ├── 02_claude_weather.py    # Claude Agent SDK
│   └── 03_google_adk_weather.py# Google ADK 2.0
├── requirements.txt
└── .env.example
```

## 快速开始（30 秒）

```bash
cd agent-demos

# 什么都不装，先看 mock 效果（推荐先跑一遍，确认现场万无一失）
python deck1_first_agent/01_minimal_agent.py
python deck2_sdk_comparison/00_run_all.py
```

想跑真实模型：

```bash
pip install -r requirements.txt          # 或只装你要现场演示真实的那家
cp .env.example .env                      # 填入对应 API key
export OPENAI_API_KEY=sk-...              # Deck1 + Deck2 OpenAI
export ANTHROPIC_API_KEY=...              # Deck2 Claude
```

## 现场演示动线建议

**Deck1《构建第一个 Agent》**
1. `01_minimal_agent.py` — 看点：它先 Search 再 Calculator；T/A/O 循环肉眼可见；问纯知识题时不空调工具。
2. `02_rag_as_tool.py` — 把「检索+生成」收拢成**一个工具**。
3. `03_memory_agent.py` — 第二句「和上个月对比」靠记忆补主语；顺带讲 token 成本。
4. `04_react_from_scratch.py` — 掀引擎盖，`parse_action` + 停止条件全透明。

**Deck2《三家 SDK 对比》**
- 直接 `00_run_all.py`：三份代码并排跑，最后打印对比表，照着填 slides 第 15 页的「代码量/延迟/可控性」。

## 保命提示（讲师版）
- **课前先跑通一次 mock**，确保零依赖也能演示。
- 真实模式建议 `OPENAI_MODEL=gpt-4o-mini`，快且便宜。
- `04` 的 calculator 已用**白名单**挡非法字符 —— 对应 slides「别用裸 eval」。
- 所有 SDK 版本变动快，真实模式请以各家**官方文档**为准；mock 逻辑不受影响。
