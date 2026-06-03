import React from 'react';
import { Slide, Inner, Title, Tag } from '../ui';
import { colors } from '../../styles/theme';

const code = `import asyncio
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_neo4j import Neo4jGraph, GraphCypherQAChain
from langchain_chroma import Chroma
from rank_bm25 import BM25Okapi

# ─── 初始化组件 ───────────────────────────────────────────────
llm        = ChatOpenAI(model="gpt-4o-mini", temperature=0)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
graph_db   = Neo4jGraph(url=NEO4J_URL, username="neo4j", password=NEO4J_PWD)
vector_db  = Chroma(embedding_function=embeddings, persist_directory="./chroma_db")
graph_chain = GraphCypherQAChain.from_llm(llm, graph=graph_db, verbose=False)

# ─── BM25 索引（从语料库构建）────────────────────────────────
corpus_texts    = [doc.page_content for doc in all_documents]
tokenized_corpus = [text.split() for text in corpus_texts]
bm25_index      = BM25Okapi(tokenized_corpus)

# ─── RRF 融合函数 ────────────────────────────────────────────
def rrf_fusion(results_list: list[list[dict]], k: int = 60) -> list[dict]:
    scores, doc_map = {}, {}
    for results in results_list:
        for rank, item in enumerate(results):
            key = item["content"]
            doc_map[key] = item
            scores[key] = scores.get(key, 0) + 1.0 / (k + rank + 1)
    return sorted(
        [{"content": k, "rrf_score": v, **doc_map[k]} for k, v in scores.items()],
        key=lambda x: x["rrf_score"], reverse=True
    )

# ─── 三路检索 ────────────────────────────────────────────────
async def hybrid_retrieve(query: str, top_k: int = 5) -> list[dict]:
    # 向量检索
    vec_docs   = vector_db.similarity_search(query, k=top_k * 2)
    vec_results = [{"content": d.page_content, "source": "vector"} for d in vec_docs]

    # BM25 检索
    tokens    = query.split()
    bm25_scores = bm25_index.get_scores(tokens)
    top_bm25  = sorted(range(len(bm25_scores)), key=lambda i: bm25_scores[i], reverse=True)[:top_k * 2]
    bm25_results = [{"content": corpus_texts[i], "source": "bm25"} for i in top_bm25]

    # 图检索
    graph_answer = graph_chain.invoke({"query": query})
    graph_results = [{"content": graph_answer["result"], "source": "graph"}]

    # RRF 融合
    fused = rrf_fusion([vec_results, bm25_results, graph_results], k=60)
    return fused[:top_k]

# ─── RAG 生成 ────────────────────────────────────────────────
async def graph_hybrid_rag(query: str) -> str:
    context_docs = await hybrid_retrieve(query, top_k=5)
    context = "\\n\\n".join([d["content"] for d in context_docs])
    prompt  = f"""基于以下上下文回答问题。如果上下文不足，请说明。

上下文：
{context}

问题：{query}
答案："""
    response = llm.invoke(prompt)
    return response.content

# ─── 运行 ────────────────────────────────────────────────────
answer = asyncio.run(graph_hybrid_rag("苹果公司CEO的母校在哪个城市？"))
print(answer)`;

export default function S18_Pipeline_Code() {
  return (
    <Slide style={{ background: '#0f0f0f' }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, paddingTop: 32 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 44, background: colors.green, border: '2px solid #555' }} />
          <Title style={{ fontSize: 38, fontWeight: 900, color: '#fff' }}>
            完整 Pipeline 代码
          </Title>
          <Tag style={{ background: colors.green, color: '#fff', marginLeft: 'auto' }}>
            graph_hybrid_rag.py
          </Tag>
        </div>

        {/* Full code card */}
        <div
          style={{
            background: '#111',
            border: '3px solid #333',
            boxShadow: '6px 6px 0 #222',
            padding: '16px 20px',
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <pre
            style={{
              fontFamily: "'Space Mono', 'Fira Code', monospace",
              fontSize: 11,
              color: '#e0e0e0',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {code.split('\n').map((line, i) => {
              const isComment = line.trim().startsWith('#');
              const isKeyword = /^(import|from|async|def|await|return|for|if|in|not|class)\b/.test(line.trim());
              const isSection = line.includes('───');
              const isString = line.trim().startsWith('"""') || line.includes('f"""');
              return (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    color: isSection
                      ? '#444'
                      : isComment
                      ? '#6b7280'
                      : isString
                      ? colors.yellow
                      : isKeyword
                      ? colors.green
                      : '#e0e0e0',
                  }}
                >
                  {line}
                </span>
              );
            })}
          </pre>
        </div>
      </Inner>
    </Slide>
  );
}
