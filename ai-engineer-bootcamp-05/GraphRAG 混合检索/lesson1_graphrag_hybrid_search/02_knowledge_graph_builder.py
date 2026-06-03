"""
课程：GraphRAG 与混合检索 — 第二节
Lesson: GraphRAG & Hybrid Retrieval — Part 2

展示内容：用 Neo4j 构建知识图谱，并执行单跳、双跳、三跳图查询
Demonstrates: Building a knowledge graph in Neo4j with company/person/product data,
              then running single-hop, two-hop, and three-hop Cypher queries.

前置条件 / Prerequisites:
    Neo4j running locally at bolt://localhost:7687
    Default credentials: neo4j / password  (edit NEO4J_PASSWORD below if different)

运行命令 / Run:
    pip install neo4j
    python 02_knowledge_graph_builder.py
"""

from __future__ import annotations

from neo4j import GraphDatabase, Driver

# ===== Connection Config =====

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "password"


# ===== Sample Data =====

COMPANIES: list[dict] = [
    {"name": "Apple", "founded": 1976, "hq_city": "Cupertino", "hq_state": "California"},
    {"name": "Google", "founded": 1998, "hq_city": "Mountain View", "hq_state": "California"},
    {"name": "Microsoft", "founded": 1975, "hq_city": "Redmond", "hq_state": "Washington"},
]

PERSONS: list[dict] = [
    {"name": "Tim Cook", "title": "CEO", "university": "Auburn University", "uni_city": "Auburn", "uni_state": "Alabama"},
    {"name": "Sundar Pichai", "title": "CEO", "university": "Stanford University", "uni_city": "Stanford", "uni_state": "California"},
    {"name": "Satya Nadella", "title": "CEO", "university": "University of Wisconsin-Milwaukee", "uni_city": "Milwaukee", "uni_state": "Wisconsin"},
    {"name": "Steve Jobs", "title": "Co-Founder", "university": "Reed College", "uni_city": "Portland", "uni_state": "Oregon"},
    {"name": "Bill Gates", "title": "Co-Founder", "university": "Harvard University", "uni_city": "Cambridge", "uni_state": "Massachusetts"},
]

PRODUCTS: list[dict] = [
    {"name": "iPhone 15 Pro Max", "category": "Smartphone", "year": 2023},
    {"name": "MacBook Pro M3", "category": "Laptop", "year": 2023},
    {"name": "Google Pixel 8", "category": "Smartphone", "year": 2023},
    {"name": "Google Search", "category": "Service", "year": 1998},
    {"name": "Windows 11", "category": "OS", "year": 2021},
    {"name": "Azure Cloud", "category": "Cloud Platform", "year": 2010},
]

# (person_name, relationship_type, company_name)
PERSON_COMPANY_RELS: list[tuple[str, str, str]] = [
    ("Tim Cook", "CEO_OF", "Apple"),
    ("Steve Jobs", "FOUNDED", "Apple"),
    ("Sundar Pichai", "CEO_OF", "Google"),
    ("Satya Nadella", "CEO_OF", "Microsoft"),
    ("Bill Gates", "FOUNDED", "Microsoft"),
]

# (company_name, product_name)
COMPANY_PRODUCT_RELS: list[tuple[str, str]] = [
    ("Apple", "iPhone 15 Pro Max"),
    ("Apple", "MacBook Pro M3"),
    ("Google", "Google Pixel 8"),
    ("Google", "Google Search"),
    ("Microsoft", "Windows 11"),
    ("Microsoft", "Azure Cloud"),
]


# ===== Graph Builder =====

def clear_graph(driver: Driver) -> None:
    """Remove all nodes and relationships from the database."""
    with driver.session() as session:
        session.run("MATCH (n) DETACH DELETE n")
    print("  Graph cleared.")


def create_nodes(driver: Driver) -> None:
    """Create Company, Person, and Product nodes."""
    with driver.session() as session:
        for c in COMPANIES:
            session.run(
                "MERGE (c:Company {name: $name}) "
                "SET c.founded = $founded, c.hq_city = $hq_city, c.hq_state = $hq_state",
                **c,
            )
        for p in PERSONS:
            session.run(
                "MERGE (p:Person {name: $name}) "
                "SET p.title = $title, p.university = $university, "
                "    p.uni_city = $uni_city, p.uni_state = $uni_state",
                **p,
            )
        for prod in PRODUCTS:
            session.run(
                "MERGE (p:Product {name: $name}) "
                "SET p.category = $category, p.year = $year",
                **prod,
            )
    print(f"  Created {len(COMPANIES)} companies, {len(PERSONS)} persons, {len(PRODUCTS)} products.")


def create_relationships(driver: Driver) -> None:
    """Wire up relationships between nodes."""
    with driver.session() as session:
        for person, rel, company in PERSON_COMPANY_RELS:
            session.run(
                f"MATCH (p:Person {{name: $person}}), (c:Company {{name: $company}}) "
                f"MERGE (p)-[:{rel}]->(c)",
                person=person,
                company=company,
            )
        for company, product in COMPANY_PRODUCT_RELS:
            session.run(
                "MATCH (c:Company {name: $company}), (p:Product {name: $product}) "
                "MERGE (c)-[:MAKES]->(p)",
                company=company,
                product=product,
            )
    print(f"  Created {len(PERSON_COMPANY_RELS)} person→company and {len(COMPANY_PRODUCT_RELS)} company→product relationships.")


# ===== Query Examples =====

def query_single_hop(driver: Driver) -> None:
    """Single-hop: Which products does Apple make?"""
    print("\n  Query: Which products does Apple make?")
    with driver.session() as session:
        results = session.run(
            "MATCH (c:Company {name: 'Apple'})-[:MAKES]->(p:Product) RETURN p.name AS product"
        )
        for r in results:
            print(f"    → {r['product']}")


def query_two_hop(driver: Driver) -> None:
    """Two-hop: Who is the CEO of Apple, and what university did they attend?"""
    print("\n  Query (2-hop): Apple CEO → university?")
    with driver.session() as session:
        results = session.run(
            "MATCH (p:Person)-[:CEO_OF]->(c:Company {name: 'Apple'}) "
            "RETURN p.name AS ceo, p.university AS university"
        )
        for r in results:
            print(f"    → {r['ceo']} attended {r['university']}")


def query_three_hop(driver: Driver) -> None:
    """Three-hop: Apple CEO → university → city."""
    print("\n  Query (3-hop): In which city is Apple CEO's university located?")
    with driver.session() as session:
        results = session.run(
            "MATCH (p:Person)-[:CEO_OF]->(c:Company {name: 'Apple'}) "
            "RETURN p.name AS ceo, p.university AS university, p.uni_city AS city, p.uni_state AS state"
        )
        for r in results:
            print(f"    → {r['ceo']}'s university ({r['university']}) is in {r['city']}, {r['state']}")


# ===== Main =====

def main() -> None:
    print("Connecting to Neo4j…")
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    driver.verify_connectivity()
    print("  Connected.\n")

    print("=" * 60)
    print("STEP 1 — Build Knowledge Graph")
    print("=" * 60)
    clear_graph(driver)
    create_nodes(driver)
    create_relationships(driver)

    print("\n" + "=" * 60)
    print("STEP 2 — Single-Hop Query")
    print("=" * 60)
    query_single_hop(driver)

    print("\n" + "=" * 60)
    print("STEP 3 — Two-Hop Query")
    print("=" * 60)
    query_two_hop(driver)

    print("\n" + "=" * 60)
    print("STEP 4 — Three-Hop Query")
    print("=" * 60)
    query_three_hop(driver)

    driver.close()
    print("\nDone. Graph is ready for lesson 04_graphrag_pipeline.py")


if __name__ == "__main__":
    main()
