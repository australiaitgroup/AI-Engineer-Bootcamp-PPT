"""
课程：GraphRAG 与混合检索 — 第四节
Lesson: GraphRAG & Hybrid Retrieval — Part 4

展示内容：端到端 GraphRAG 流水线 — LLMGraphTransformer 抽取实体、Neo4j 存储图谱、
          GraphCypherQAChain 图谱问答，结合向量检索实现混合查询
Demonstrates: End-to-end GraphRAG pipeline using LangChain:
              • Entity extraction with LLMGraphTransformer
              • Graph storage in Neo4j via Neo4jGraph
              • Graph Q&A with GraphCypherQAChain
              • Vector Q&A with ChromaDB
              • Hybrid query combining both answer paths

前置条件 / Prerequisites:
    1. Neo4j running at bolt://localhost:7687 (run 02_knowledge_graph_builder.py first)
    2. OPENAI_API_KEY set in .env (uses DeepSeek-compatible API)

运行命令 / Run:
    pip install langchain langchain-openai langchain-community langchain-neo4j
                chromadb sentence-transformers python-dotenv openai
    python 04_graphrag_pipeline.py
"""

from __future__ import annotations

import os
from typing import Any

from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_openai import ChatOpenAI
from langchain_community.graphs import Neo4jGraph
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.chains import GraphCypherQAChain
from langchain_experimental.graph_transformers import LLMGraphTransformer

load_dotenv()

# ===== Configuration =====

NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
DEEPSEEK_BASE_URL = "https://api.deepseek.com"

if not OPENAI_API_KEY:
    raise EnvironmentError("OPENAI_API_KEY is not set. Add it to your .env file.")

# ===== Sample Documents for Entity Extraction =====

RAW_TEXTS: list[str] = [
    "Apple Inc. was founded by Steve Jobs in 1976. Tim Cook is the current CEO of Apple.",
    "Tim Cook studied Industrial Engineering at Auburn University located in Auburn, Alabama.",
    "Apple makes the iPhone 15 Pro Max and the MacBook Pro M3.",
    "Google was founded by Larry Page and Sergey Brin in 1998. Sundar Pichai is Google's CEO.",
    "Sundar Pichai attended Stanford University in Stanford, California.",
    "Google produces Google Search and the Pixel 8 smartphone.",
    "Microsoft was founded by Bill Gates in 1975. Satya Nadella became CEO in 2014.",
    "Microsoft develops Windows 11 and Azure Cloud services.",
]

DOCUMENTS: list[Document] = [Document(page_content=text) for text in RAW_TEXTS]


# ===== LLM Setup (DeepSeek-compatible via OpenAI client) =====

def build_llm() -> ChatOpenAI:
    """Build a ChatOpenAI-compatible LLM pointed at DeepSeek."""
    return ChatOpenAI(
        model="deepseek-chat",
        api_key=OPENAI_API_KEY,
        base_url=DEEPSEEK_BASE_URL,
        temperature=0,
    )


# ===== Graph Store =====

def build_neo4j_graph() -> Neo4jGraph:
    """Connect to the Neo4j instance."""
    return Neo4jGraph(
        url=NEO4J_URI,
        username=NEO4J_USER,
        password=NEO4J_PASSWORD,
    )


def extract_and_store_graph(llm: ChatOpenAI, graph: Neo4jGraph) -> None:
    """Extract entities/relationships from documents and persist to Neo4j."""
    print("  Extracting graph from documents with LLMGraphTransformer…")
    transformer = LLMGraphTransformer(llm=llm)
    graph_docs = transformer.convert_to_graph_documents(DOCUMENTS)
    graph.add_graph_documents(graph_docs, baseEntityLabel=True, include_source=True)
    print(f"  Stored {len(graph_docs)} graph document(s) in Neo4j.")


# ===== Vector Store =====

def build_vector_store() -> Chroma:
    """Create an in-memory Chroma vector store from the raw documents."""
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    return Chroma.from_texts(texts=RAW_TEXTS, embedding=embeddings)


# ===== QA Chains =====

def build_graph_chain(llm: ChatOpenAI, graph: Neo4jGraph) -> GraphCypherQAChain:
    """Build a GraphCypherQAChain that translates NL questions to Cypher."""
    return GraphCypherQAChain.from_llm(
        llm=llm,
        graph=graph,
        verbose=False,
        return_intermediate_steps=True,
    )


def vector_answer(vector_store: Chroma, question: str, k: int = 3) -> str:
    """Retrieve top-k chunks and concatenate as a simple vector-based answer."""
    docs = vector_store.similarity_search(question, k=k)
    context = "\n".join(d.page_content for d in docs)
    return context


# ===== Hybrid Query =====

def hybrid_query(
    question: str,
    graph_chain: GraphCypherQAChain,
    vector_store: Chroma,
    llm: ChatOpenAI,
) -> dict[str, Any]:
    """
    Run the question through both graph and vector pipelines.
    Combine their outputs into a final synthesised answer.
    """
    # Graph answer
    try:
        graph_result = graph_chain.invoke({"query": question})
        graph_answer = graph_result.get("result", "No graph answer found.")
        cypher_query = (
            graph_result.get("intermediate_steps", [{}])[0]
            .get("query", "N/A")
        )
    except Exception as exc:
        graph_answer = f"Graph chain error: {exc}"
        cypher_query = "N/A"

    # Vector answer (context chunks)
    vector_context = vector_answer(vector_store, question)

    # Synthesise
    synthesis_prompt = (
        f"Question: {question}\n\n"
        f"Graph database answer:\n{graph_answer}\n\n"
        f"Vector retrieval context:\n{vector_context}\n\n"
        "Combine both sources and give a concise, accurate final answer:"
    )
    from langchain_core.messages import HumanMessage
    synthesis = llm.invoke([HumanMessage(content=synthesis_prompt)])
    final_answer = synthesis.content

    return {
        "question": question,
        "graph_answer": graph_answer,
        "cypher_query": cypher_query,
        "vector_context_snippet": vector_context[:200] + "…",
        "final_answer": final_answer,
    }


# ===== Display Helper =====

def print_result(result: dict[str, Any]) -> None:
    print(f"\n  Question   : {result['question']}")
    print(f"  Cypher     : {result['cypher_query']}")
    print(f"  Graph Ans  : {result['graph_answer']}")
    print(f"  Vec Context: {result['vector_context_snippet']}")
    print(f"  Final Ans  : {result['final_answer']}")


# ===== Demo Queries =====

DEMO_QUESTIONS: list[str] = [
    "Who is the CEO of Apple?",
    "Which city is Apple's CEO's university located in?",
    "What products does Microsoft make?",
]


# ===== Main =====

def main() -> None:
    print("=" * 65)
    print("STEP 1 — Connect to Neo4j & Build LLM")
    print("=" * 65)
    llm = build_llm()
    graph = build_neo4j_graph()
    print("  Neo4j connected.")

    print("\n" + "=" * 65)
    print("STEP 2 — Extract Entities & Store Graph")
    print("=" * 65)
    extract_and_store_graph(llm, graph)

    print("\n" + "=" * 65)
    print("STEP 3 — Build Vector Store")
    print("=" * 65)
    vector_store = build_vector_store()
    print("  Vector store ready (MiniLM embeddings).")

    print("\n" + "=" * 65)
    print("STEP 4 — Build QA Chains")
    print("=" * 65)
    graph_chain = build_graph_chain(llm, graph)
    print("  GraphCypherQAChain ready.")

    print("\n" + "=" * 65)
    print("STEP 5 — Hybrid Query Demo")
    print("=" * 65)

    for question in DEMO_QUESTIONS:
        print("-" * 65)
        result = hybrid_query(question, graph_chain, vector_store, llm)
        print_result(result)

    print("\n" + "=" * 65)
    print("TAKEAWAY")
    print("=" * 65)
    print("  • Graph chain excels at structured, relational lookups (multi-hop).")
    print("  • Vector store excels at fuzzy semantic retrieval.")
    print("  • Hybrid fusion via LLM synthesis delivers richer, more accurate answers.")


if __name__ == "__main__":
    main()
