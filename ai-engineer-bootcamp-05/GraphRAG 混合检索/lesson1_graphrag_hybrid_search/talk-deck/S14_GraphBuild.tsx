import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag } from '../ui';
import { colors } from '../../styles/theme';

const code = `from langchain_neo4j import Neo4jGraph

# 1. 连接 Neo4j（本地 or AuraDB 云端）
graph = Neo4jGraph(
    url="bolt://localhost:7687",        # 或 AuraDB URI
    username="neo4j",
    password="your-password",
    enhanced_schema=True,               # 自动获取图 schema
)

# 2. 将 GraphDocument 写入 Neo4j
graph.add_graph_documents(
    graph_documents,                    # 来自 LLMGraphTransformer
    baseEntityLabel=True,               # 为所有节点添加 __Entity__ 标签
    include_source=True,                # 保留原始文档引用
)

# 3. 刷新 schema（新增节点后必须刷新）
graph.refresh_schema()
print(graph.schema)

# 4. 验证：直接执行 Cypher
result = graph.query("""
    MATCH (p:Person)-[:CEO_OF]->(c:Company)
    RETURN p.id as person, c.id as company
    LIMIT 5
""")
print(result)
# [{'person': 'Tim Cook', 'company': 'Apple Inc'}, ...]`;

export default function S14_GraphBuild() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.green, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            构建图数据库 — add_graph_documents
          </Title>
          <Tag style={{ background: colors.green, color: '#fff', marginLeft: 'auto' }}>
            Step 02
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Code */}
          <div
            style={{
              background: colors.darkBg,
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              padding: '16px 20px',
              flex: 1.3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: colors.green,
                letterSpacing: 2,
                marginBottom: 12,
                borderBottom: '1px solid #333',
                paddingBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              graph_build.py
            </div>
            <pre
              style={{
                fontFamily: "'Space Mono', 'Fira Code', monospace",
                fontSize: 11.5,
                color: '#e0e0e0',
                lineHeight: 1.65,
                margin: 0,
                whiteSpace: 'pre',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {code.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#');
                const isKeyword = /^(from|import|def|class|return|for|if|print)\b/.test(line.trim());
                return (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      color: isComment ? '#6b7280' : isKeyword ? colors.green : '#e0e0e0',
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Right: Visual flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Flow: Document → Entities → Graph */}
            <div style={{ fontSize: 14, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
              数据流向
            </div>

            {[
              {
                icon: '📄',
                label: '原始文档',
                desc: '"Tim Cook is the CEO of Apple..."',
                color: colors.blue,
              },
              {
                icon: '🤖',
                label: 'LLMGraphTransformer',
                desc: '抽取实体和关系 → GraphDocument',
                color: colors.blue,
                isArrow: true,
              },
              {
                icon: '🕸️',
                label: 'Neo4jGraph.add_graph_documents()',
                desc: '写入节点和关系到图数据库',
                color: colors.green,
                isArrow: true,
              },
              {
                icon: '✅',
                label: 'Neo4j 图数据库',
                desc: '(Tim Cook)-[:CEO_OF]->(Apple Inc)',
                color: colors.green,
                isArrow: true,
              },
            ].map((step, i) => (
              <React.Fragment key={i}>
                {step.isArrow && (
                  <div style={{ textAlign: 'center', fontSize: 18, color: step.color, fontWeight: 900 }}>↓</div>
                )}
                <Card
                  style={{
                    border: `3px solid ${step.color}`,
                    boxShadow: `4px 4px 0 ${step.color}`,
                    background: '#fff',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{step.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: colors.dark }}>{step.label}</div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#666',
                        fontFamily: 'monospace',
                        marginTop: 2,
                      }}
                    >
                      {step.desc}
                    </div>
                  </div>
                </Card>
              </React.Fragment>
            ))}

            {/* Tips */}
            <Card
              style={{
                border: `3px solid ${colors.yellow}`,
                boxShadow: `4px 4px 0 ${colors.yellow}`,
                background: '#fffdf0',
                padding: '12px 14px',
                fontSize: 12,
                color: colors.dark,
                lineHeight: 1.5,
              }}
            >
              <strong>⚠️ 注意：</strong> 每次添加新文档后必须调用
              <code style={{ background: '#eee', padding: '1px 4px', margin: '0 4px', fontFamily: 'monospace' }}>
                graph.refresh_schema()
              </code>
              以更新 LangChain 的 schema 缓存
            </Card>
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
