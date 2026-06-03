"""
课程：GraphRAG 与混合检索 — 第三节
Lesson: GraphRAG & Hybrid Retrieval — Part 3

展示内容：向量检索 + BM25 关键词检索 + 图谱检索，通过 RRF（倒数排名融合）合并结果
Demonstrates: Combining vector search, BM25 keyword search, and simulated graph-based
              lookup using Reciprocal Rank Fusion (RRF) — no Neo4j required for this demo.

运行命令 / Run:
    pip install chromadb sentence-transformers rank-bm25
    python 03_hybrid_retrieval_rrf.py
"""

from __future__ import annotations

import chromadb
from chromadb.utils import embedding_functions
from rank_bm25 import BM25Okapi

# ===== Document Corpus =====

DOCUMENTS: list[str] = [
    "Apple Inc. was founded on April 1, 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne.",
    "Tim Cook became the CEO of Apple in August 2011, succeeding Steve Jobs.",
    "Tim Cook studied Industrial Engineering at Auburn University in Auburn, Alabama.",
    "Auburn University is a public research university located in Auburn, Alabama.",
    "Apple's headquarters is located in Cupertino, California at Apple Park.",
    "The iPhone 15 Pro Max features a titanium frame, USB-C port, and an A17 Pro chip.",
    "Google was incorporated on September 4, 1998 by Larry Page and Sergey Brin.",
    "Sundar Pichai is the CEO of Google and its parent company Alphabet Inc.",
    "Sundar Pichai attended Stanford University for his MS in Materials Science.",
    "Stanford University is situated in Stanford, California near Palo Alto.",
    "Microsoft was founded on April 4, 1975 by Bill Gates and Paul Allen in Redmond, Washington.",
    "Satya Nadella has served as Microsoft's CEO since February 2014.",
    "Azure Cloud is Microsoft's flagship cloud computing platform launched in 2010.",
    "The MacBook Pro M3 was released in October 2023 with up to 22-hour battery life.",
    "Google Search was launched in 1998 and processes over 8.5 billion queries per day.",
]

DOC_IDS: list[str] = [f"doc_{i}" for i in range(len(DOCUMENTS))]

# ===== Simulated Graph Knowledge Base =====
# Maps an entity/concept to the documents that can be reached via graph traversal.
# In production this would be Cypher queries on Neo4j.

GRAPH_INDEX: dict[str, list[int]] = {
    "apple ceo university city": [1, 2, 3],        # Tim Cook → Auburn Univ → Auburn, AL
    "google ceo university location": [7, 8, 9],   # Sundar → Stanford → Stanford, CA
    "microsoft ceo": [10, 11],
    "apple products": [5, 13],
    "google products": [6, 14],
    "microsoft products": [12],
}


# ===== Setup =====

def build_vector_store() -> chromadb.Collection:
    """Build an in-memory ChromaDB collection."""
    client = chromadb.Client()
    ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    col = client.create_collection(name="hybrid_demo", embedding_function=ef)
    col.add(documents=DOCUMENTS, ids=DOC_IDS)
    return col


def build_bm25_index() -> BM25Okapi:
    """Build a BM25 index over the corpus."""
    tokenised = [doc.lower().split() for doc in DOCUMENTS]
    return BM25Okapi(tokenised)


# ===== Individual Retrieval Methods =====

def vector_search(collection: chromadb.Collection, query: str, n: int = 5) -> list[tuple[int, str]]:
    """Return (doc_index, doc_text) pairs ranked by vector similarity."""
    results = collection.query(query_texts=[query], n_results=n)
    ids = results["ids"][0]
    docs = results["documents"][0]
    return [(int(doc_id.split("_")[1]), doc) for doc_id, doc in zip(ids, docs)]


def bm25_search(index: BM25Okapi, query: str, n: int = 5) -> list[tuple[int, str]]:
    """Return (doc_index, doc_text) pairs ranked by BM25 score."""
    tokens = query.lower().split()
    scores = index.get_scores(tokens)
    ranked_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
    return [(i, DOCUMENTS[i]) for i in ranked_indices[:n]]


def graph_search(query: str, n: int = 5) -> list[tuple[int, str]]:
    """
    Simulate a graph traversal lookup.
    In production: run a Cypher multi-hop query and return matching document chunks.
    """
    query_lower = query.lower()
    matched: list[int] = []
    for key, indices in GRAPH_INDEX.items():
        # Score by how many key tokens appear in the query
        overlap = sum(1 for token in key.split() if token in query_lower)
        if overlap >= 2:
            matched.extend(indices)

    # Deduplicate while preserving order
    seen: set[int] = set()
    unique: list[int] = []
    for idx in matched:
        if idx not in seen:
            seen.add(idx)
            unique.append(idx)

    return [(i, DOCUMENTS[i]) for i in unique[:n]]


# ===== RRF Fusion =====

def reciprocal_rank_fusion(
    results_list: list[list[tuple[int, str]]],
    k: int = 60,
) -> list[tuple[float, int, str]]:
    """
    Reciprocal Rank Fusion: fuse multiple ranked result lists.

    Args:
        results_list: Each inner list is a ranked sequence of (doc_index, doc_text).
        k: Smoothing constant (default 60, from the original RRF paper).

    Returns:
        Sorted list of (rrf_score, doc_index, doc_text), highest score first.
    """
    scores: dict[int, float] = {}
    texts: dict[int, str] = {}

    for ranked in results_list:
        for rank, (doc_idx, doc_text) in enumerate(ranked, start=1):
            scores[doc_idx] = scores.get(doc_idx, 0.0) + 1.0 / (k + rank)
            texts[doc_idx] = doc_text

    fused = [(score, idx, texts[idx]) for idx, score in scores.items()]
    fused.sort(key=lambda x: x[0], reverse=True)
    return fused


# ===== Display Helper =====

def show_results(label: str, results: list[tuple[int, str]], top: int = 3) -> None:
    print(f"  [{label}]")
    for rank, (idx, doc) in enumerate(results[:top], 1):
        print(f"    {rank}. [doc_{idx}] {doc[:90]}{'…' if len(doc) > 90 else ''}")


def show_fused(fused: list[tuple[float, int, str]], top: int = 5) -> None:
    print("  [RRF Fused Result]")
    for rank, (score, idx, doc) in enumerate(fused[:top], 1):
        print(f"    {rank}. score={score:.4f} [doc_{idx}] {doc[:85]}{'…' if len(doc) > 85 else ''}")


# ===== Demo Queries =====

def run_query(
    label: str,
    query: str,
    collection: chromadb.Collection,
    bm25: BM25Okapi,
) -> None:
    print(f"\nQuery: \"{query}\"")

    vec_results = vector_search(collection, query)
    bm25_results = bm25_search(bm25, query)
    graph_results = graph_search(query)

    show_results("Vector Search", vec_results)
    show_results("BM25 Search  ", bm25_results)
    show_results("Graph Search ", graph_results)

    fused = reciprocal_rank_fusion([vec_results, bm25_results, graph_results])
    show_fused(fused)


# ===== Main =====

def main() -> None:
    print("Building retrieval indexes…")
    collection = build_vector_store()
    bm25 = build_bm25_index()
    print("Done.\n")

    print("=" * 65)
    print("QUERY A — Single-Hop (semantic, vector-friendly)")
    print("=" * 65)
    run_query(
        label="single-hop",
        query="What chip does the iPhone 15 Pro Max use?",
        collection=collection,
        bm25=bm25,
    )

    print("\n" + "=" * 65)
    print("QUERY B — Multi-Hop (requires graph traversal)")
    print("=" * 65)
    run_query(
        label="multi-hop",
        query="Which city is Apple CEO's university located in?",
        collection=collection,
        bm25=bm25,
    )

    print("\n" + "=" * 65)
    print("QUERY C — Exact Keyword (BM25-friendly)")
    print("=" * 65)
    run_query(
        label="exact-keyword",
        query="September 4 1998",
        collection=collection,
        bm25=bm25,
    )

    print("\n" + "=" * 65)
    print("TAKEAWAY")
    print("=" * 65)
    print("  • Vector shines on semantic queries (A).")
    print("  • Graph traversal is essential for multi-hop reasoning (B).")
    print("  • BM25 wins on exact token matches (C).")
    print("  • RRF fusion surfaces the best document regardless of query type.")


if __name__ == "__main__":
    main()
