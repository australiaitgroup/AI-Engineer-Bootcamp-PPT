# GraphRAG + 混合检索

> **2026-06-03 · 19:00 Sydney · 90 分钟**
>
> PHASE 3: RAG · Liangjun Song · JR Academy AI Bootcamp

---

## 课程一句话

纯向量检索有硬伤——用 Vector + BM25 + Graph 三路并行 + RRF 融合，搭出工业级 RAG。

---

## 整体架构

```
文档
 │
 ├─► ChromaDB ──► 向量检索 ─────────────┐
 │                                      │
 ├─► BM25 索引 ──► 关键词检索 ──────────┤──► RRF 融合 ──► 最终答案
 │                                      │
 └─► Neo4j 图 ──► 图检索（多跳）────────┘
      │
      LangChain GraphCypherQAChain
```

---

## 文件结构

```
2026-06-03_GraphRAG_混合检索/
├── README.md                              # 本文件
├── SLIDES.md                              # 幻灯片使用指南（Marp + talk-deck）
├── requirements.txt                       # Python 依赖
├── .env.example                           # 环境变量模板
└── lesson1_graphrag_hybrid_search/        # 主课（90 分钟）
    ├── README.md                          # 课时详情
    ├── slides.md                          # Marp 幻灯片（45 张，Teal 主题）
    ├── talk-deck/                         # React/TSX 幻灯片（25 张）
    │   ├── S01_Cover.tsx ~ S25_Summary.tsx
    │   └── App.tsx.snippet
    ├── 01_vector_limitations.py           # 向量检索局限演示
    ├── 02_knowledge_graph_builder.py      # Neo4j 知识图谱构建
    ├── 03_hybrid_retrieval_rrf.py         # 三路检索 + RRF
    └── 04_graphrag_pipeline.py            # LangChain GraphRAG Pipeline
```

---

## 快速开始

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填入 OPENAI_API_KEY、NEO4J_* 等

# 3. 启动 Neo4j（Demo 2、4 需要）
docker run -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password neo4j:5

# 4. 运行 Demo
cd lesson1_graphrag_hybrid_search
python 01_vector_limitations.py     # 无需 Neo4j
python 02_knowledge_graph_builder.py
python 03_hybrid_retrieval_rrf.py   # 无需 Neo4j
python 04_graphrag_pipeline.py
```

---

## 知识点清单

- [ ] 纯向量检索局限：精确关键词失败、多跳推理失败
- [ ] BM25 原理与 `rank_bm25` 实现
- [ ] Knowledge Graph：Node、Relationship、Property
- [ ] Neo4j + Cypher 查询（单跳、多跳、三跳）
- [ ] LangChain `LLMGraphTransformer` 实体抽取
- [ ] `Neo4jGraph` + `GraphCypherQAChain`
- [ ] RRF 公式：score(d) = Σ 1/(k + rank_i(d))
- [ ] 三路并行检索 + RRF 融合完整代码
- [ ] AWS Lab: OpenSearch 向量搜索
- [ ] Prompt Master: graph-prompts

---

## 下节课

**2026-06-07 · RAG Evaluation** — 评估你的 RAG 系统，RAGAS 框架入门
