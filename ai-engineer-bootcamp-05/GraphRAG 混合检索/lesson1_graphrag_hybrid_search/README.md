# Lesson 1 · GraphRAG + 混合检索

> **2026-06-03 · 19:00 Sydney · 90 分钟 · PHASE 3: RAG**
>
> 讲师：Liangjun Song

---

## 教学目标

完成本课后，学员能够：

1. ✅ 解释纯向量检索在精确关键词和多跳推理场景下的局限性
2. ✅ 实现 BM25 关键词检索并与向量检索结合使用
3. ✅ 用 Neo4j + Cypher 构建知识图谱，存储实体和关系
4. ✅ 实现 Vector + BM25 + Graph 三路并行检索 + RRF 融合
5. ✅ 用 LangChain `GraphCypherQAChain` 搭建完整 GraphRAG pipeline

---

## 时间分配

| 时间段 | 内容 | 分钟 |
|--------|------|------|
| 0:00 – 0:10 | 回顾 + 纯向量检索局限性 | 10 |
| 0:10 – 0:20 | BM25 原理 + 实现 | 10 |
| 0:20 – 0:35 | Knowledge Graph + Neo4j + Cypher | 15 |
| 0:35 – 0:55 | LangChain GraphRAG 构建 | 20 |
| 0:55 – 1:10 | 三路检索 + RRF 融合代码 | 15 |
| 1:10 – 1:20 | 对比演示：单跳 vs 多跳 | 10 |
| 1:20 – 1:30 | AWS Lab + Prompt Master + Vibe Coding + Q&A | 10 |

---

## 文件结构

```
lesson1_graphrag_hybrid_search/
├── slides.md                    # Marp 幻灯片（45 张，Teal 主题）
├── talk-deck/                   # React/TSX 幻灯片（JR Neo-Brutalism）
│   ├── S01_Cover.tsx            # 标题页
│   ├── S02_Objectives.tsx       # 课程目标
│   ├── S03_VectorLimits.tsx     # 向量检索局限
│   ├── ...                      # S04 - S24
│   ├── S25_Summary.tsx          # 小结
│   └── App.tsx.snippet          # 如何注册到 App.tsx
├── 01_vector_limitations.py     # 向量检索失败案例演示
├── 02_knowledge_graph_builder.py # Neo4j 图构建演示
├── 03_hybrid_retrieval_rrf.py   # 三路检索 + RRF 融合
└── 04_graphrag_pipeline.py      # LangChain GraphRAG 完整 pipeline
```

---

## 环境准备

```bash
pip install -r ../requirements.txt
cp ../.env.example ../.env
# 编辑 .env 填入 OPENAI_API_KEY 和 NEO4J_* 配置
```

**Neo4j 本地启动（Demo 2 和 Demo 4 需要）：**

```bash
# Docker 最快
docker run -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  neo4j:5
```

---

## 运行 Demo

```bash
# 1. 向量检索局限（无需 Neo4j）
python 01_vector_limitations.py

# 2. 构建知识图谱（需要 Neo4j）
python 02_knowledge_graph_builder.py

# 3. 三路混合检索 + RRF（无需 Neo4j，图检索用模拟数据）
python 03_hybrid_retrieval_rrf.py

# 4. LangChain GraphRAG 完整 pipeline（需要 Neo4j + API Key）
python 04_graphrag_pipeline.py
```

---

## 常见踩坑

| 坑 | 原因 | 解决 |
|----|------|------|
| Neo4j 连接失败 | Docker 未启动或端口冲突 | `docker ps`，检查 7687 端口 |
| `LLMGraphTransformer` 实体少 | 模型温度太低或 prompt 不够详细 | 加 `allowed_nodes`/`allowed_relationships` |
| RRF 结果差异小 | k 值太大，拉平了差异 | 从 k=10 开始调 |
| Cypher 语法报错 | 大小写敏感，标签名区分 | 用 Neo4j Browser 先测试 Cypher |

---

## 参考资料

- [Neo4j LangChain Integration](https://python.langchain.com/docs/integrations/graphs/neo4j_cypher/)
- [rank_bm25 PyPI](https://pypi.org/project/rank-bm25/)
- [RRF 论文](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)
- [AWS OpenSearch Vector Search Lab](https://aws.amazon.com/opensearch-service/)
