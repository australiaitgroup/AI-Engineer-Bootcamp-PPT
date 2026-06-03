import React from 'react';
import { Slide, Inner, Title, Card, Tag, Stagger, StaggerItem } from '../ui';
import { colors } from '../../styles/theme';

const pitfalls = [
  {
    n: '坑1',
    title: 'Neo4j 连接失败',
    problem: 'bolt://localhost:7687 连不上，或 AuraDB URI 格式错误',
    solution: '本地用 bolt://，AuraDB 用 neo4j+s://。检查 NEO4J_URI / NEO4J_PASSWORD 环境变量是否正确设置',
    code: 'graph = Neo4jGraph(url=os.getenv("NEO4J_URI"), ...)',
  },
  {
    n: '坑2',
    title: '实体抽取质量差',
    problem: 'LLMGraphTransformer 抽出大量无意义节点，图质量混乱',
    solution: '设置 allowed_nodes 和 allowed_relationships 限制范围；使用 GPT-4o 而非 mini；文档先分块再抽取',
    code: 'LLMGraphTransformer(llm, allowed_nodes=["Person", "Company"])',
  },
  {
    n: '坑3',
    title: 'RRF 的 k 值不合适',
    problem: 'k 太小（如5）导致 rank=1 的文档得分远超其他，混合失去意义',
    solution: '标准值 k=60 适合大多数场景。如果某路检索天然质量更高，可适当降低 k 增加区分度',
    code: 'rrf_fusion(results, k=60)  # 标准值，不要随意改',
  },
  {
    n: '坑4',
    title: 'Cypher 语法错误',
    problem: 'GraphCypherQAChain 生成的 Cypher 对不存在的属性或关系进行查询',
    solution: '调用 graph.refresh_schema() 确保 schema 最新；在 Prompt 中明确指出不能使用不存在的属性；开启 verbose=True 查看生成的 Cypher',
    code: 'graph.refresh_schema()  # 每次添加数据后调用',
  },
  {
    n: '坑5',
    title: '三路结果相互冲突',
    problem: '向量、BM25、图检索返回相互矛盾的答案，LLM 不知道该信哪个',
    solution: '在 context 中标注每个文档的来源（source: vector/bm25/graph）；在 Prompt 中告诉 LLM 优先信任图检索结果（关系查询）',
    code: '{"content": doc, "source": "graph"}  # 标注来源',
  },
];

export default function S24_Pitfalls() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, paddingTop: 36 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.red, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            Top 5 踩坑指南
          </Title>
          <Tag style={{ background: colors.red, color: '#fff', marginLeft: 'auto' }}>
            Pitfalls & Solutions
          </Tag>
        </div>

        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {pitfalls.map((p) => (
            <StaggerItem key={p.n}>
              <Card
                style={{
                  border: '3px solid black',
                  boxShadow: '5px 5px 0 black',
                  background: '#fff',
                  padding: '12px 18px',
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr 1fr 160px',
                  gap: 16,
                  alignItems: 'start',
                }}
              >
                {/* Tag */}
                <Tag
                  style={{
                    background: colors.red,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 900,
                    alignSelf: 'center',
                    textAlign: 'center',
                    padding: '6px 4px',
                    border: '2px solid black',
                    boxShadow: '3px 3px 0 black',
                  }}
                >
                  {p.n}
                </Tag>

                {/* Problem */}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: colors.dark, marginBottom: 4 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 12, color: colors.red, lineHeight: 1.5 }}>
                    ❌ {p.problem}
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: colors.green,
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    SOLUTION
                  </div>
                  <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
                    ✅ {p.solution}
                  </div>
                </div>

                {/* Code */}
                <div
                  style={{
                    background: '#111',
                    padding: '8px 10px',
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: colors.green,
                    lineHeight: 1.6,
                    alignSelf: 'center',
                    border: '1px solid #333',
                  }}
                >
                  {p.code}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Inner>
    </Slide>
  );
}
