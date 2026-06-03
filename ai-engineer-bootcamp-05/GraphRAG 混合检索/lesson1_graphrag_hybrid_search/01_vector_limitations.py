"""
课程：GraphRAG 与混合检索 — 第一节
Lesson: GraphRAG & Hybrid Retrieval — Part 1

展示内容：纯向量检索的局限性，以及 BM25 关键词检索如何弥补这些不足
Demonstrates: Limitations of pure vector search, and how BM25 keyword search compensates

运行命令 / Run:
    pip install chromadb sentence-transformers rank-bm25
    python 01_vector_limitations.py
"""

import chromadb
from chromadb.utils import embedding_functions
from rank_bm25 import BM25Okapi

# ===== Document Corpus =====

DOCUMENTS = [
    # Product model numbers
    "The iPhone 15 Pro Max features a titanium frame and USB-C connector.",
    "Apple released the MacBook Pro M3 with 18-hour battery life.",
    "Samsung Galaxy S24 Ultra has a built-in S Pen stylus.",
    "The ThinkPad X1 Carbon Gen 12 weighs only 1.12 kg.",
    "Sony WH-1000XM5 headphones offer best-in-class noise cancellation.",
    # Multi-hop reasoning data
    "Tim Cook is the CEO of Apple Inc., headquartered in Cupertino, California.",
    "Sundar Pichai leads Google, which is based in Mountain View, California.",
    "Satya Nadella is the CEO of Microsoft, located in Redmond, Washington.",
    "Tim Cook studied at Auburn University in Auburn, Alabama.",
    "Sundar Pichai attended Stanford University in Stanford, California.",
    # Numerical / date precision
    "Apple was founded on April 1, 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne.",
    "Google was incorporated on September 4, 1998.",
    "Microsoft was founded on April 4, 1975 by Bill Gates and Paul Allen.",
    "Apple's market cap exceeded $3 trillion for the first time in January 2022.",
    "The first iPhone was announced on January 9, 2007.",
]

DOC_IDS = [f"doc_{i}" for i in range(len(DOCUMENTS))]


# ===== Setup ChromaDB + BM25 =====

def build_vector_store() -> chromadb.Collection:
    """Create an in-memory ChromaDB collection with MiniLM embeddings."""
    client = chromadb.Client()
    ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    collection = client.create_collection(name="demo", embedding_function=ef)
    collection.add(documents=DOCUMENTS, ids=DOC_IDS)
    return collection


def build_bm25_index() -> BM25Okapi:
    """Tokenise documents and build a BM25 index."""
    tokenised = [doc.lower().split() for doc in DOCUMENTS]
    return BM25Okapi(tokenised)


def vector_search(collection: chromadb.Collection, query: str, n: int = 3) -> list[str]:
    """Return top-n documents via vector similarity."""
    results = collection.query(query_texts=[query], n_results=n)
    return results["documents"][0]


def bm25_search(index: BM25Okapi, query: str, n: int = 3) -> list[str]:
    """Return top-n documents via BM25 keyword scoring."""
    tokens = query.lower().split()
    scores = index.get_scores(tokens)
    ranked = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
    return [DOCUMENTS[i] for i in ranked[:n]]


def print_results(label: str, results: list[str]) -> None:
    print(f"  [{label}]")
    for i, doc in enumerate(results, 1):
        print(f"    {i}. {doc}")


# ===== Scenario 1: Exact Keyword Match (Model Numbers) =====

def demo_exact_keyword(collection: chromadb.Collection, bm25: BM25Okapi) -> None:
    query = "WH-1000XM5"
    print(f"\nQuery: '{query}'")
    print("  Expected: Sony WH-1000XM5 headphones doc")
    print_results("Vector Search", vector_search(collection, query))
    print_results("BM25 Search  ", bm25_search(bm25, query))


# ===== Scenario 2: Multi-Hop Reasoning =====

def demo_multi_hop(collection: chromadb.Collection, bm25: BM25Okapi) -> None:
    query = "Which city did the CEO of Apple attend university in?"
    print(f"\nQuery: '{query}'")
    print("  Expected: Auburn, Alabama  (Tim Cook → Auburn University → Auburn, AL)")
    print_results("Vector Search", vector_search(collection, query))
    print_results("BM25 Search  ", bm25_search(bm25, query))


# ===== Scenario 3: Numerical / Date Precision =====

def demo_date_precision(collection: chromadb.Collection, bm25: BM25Okapi) -> None:
    query = "April 4 1975"
    print(f"\nQuery: '{query}'")
    print("  Expected: Microsoft founded April 4, 1975")
    print_results("Vector Search", vector_search(collection, query))
    print_results("BM25 Search  ", bm25_search(bm25, query))


# ===== Main =====

def main() -> None:
    print("Building vector store (MiniLM)…")
    collection = build_vector_store()
    bm25 = build_bm25_index()
    print("Done.\n")

    print("=" * 60)
    print("SCENARIO 1 — Exact Keyword Match (product model numbers)")
    print("=" * 60)
    demo_exact_keyword(collection, bm25)

    print("\n" + "=" * 60)
    print("SCENARIO 2 — Multi-Hop Reasoning")
    print("=" * 60)
    demo_multi_hop(collection, bm25)

    print("\n" + "=" * 60)
    print("SCENARIO 3 — Numerical / Date Precision")
    print("=" * 60)
    demo_date_precision(collection, bm25)

    print("\n" + "=" * 60)
    print("TAKEAWAY")
    print("=" * 60)
    print("  Vector search excels at semantic similarity but struggles with:")
    print("  • Exact token matches (model numbers, codes)")
    print("  • Multi-hop reasoning (requires graph traversal)")
    print("  • Numerical/date precision (embeddings compress numerics)")
    print("  BM25 handles exact matches well but misses semantic intent.")
    print("  → Hybrid retrieval + Graph traversal gives the best of all worlds.")


if __name__ == "__main__":
    main()
