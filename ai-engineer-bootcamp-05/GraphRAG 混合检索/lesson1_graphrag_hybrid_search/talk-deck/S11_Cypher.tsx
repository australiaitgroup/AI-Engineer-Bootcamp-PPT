import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag, BulletList } from '../ui';
import { colors } from '../../styles/theme';

const cypherExamples = [
  {
    label: '基础查询：找公司的CEO',
    code: `MATCH (c:Company)-[:CEO_OF]->(p:Person)
RETURN c.name, p.name`,
  },
  {
    label: '多跳查询：CEO的母校所在城市',
    code: `MATCH (c:Company {name: "Apple"})
      -[:CEO_OF]->(p:Person)
      -[:STUDIED_AT]->(u:University)
      -[:LOCATED_IN]->(loc:Location)
RETURN c.name, p.name, u.name, loc.city`,
  },
  {
    label: '创建节点和关系',
    code: `CREATE (apple:Company {name: "Apple Inc"})
CREATE (tim:Person {name: "Tim Cook"})
CREATE (apple)-[:CEO_OF {since: 2011}]->(tim)`,
  },
];

export default function S11_Cypher() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.blue, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            Cypher — 图查询语言
          </Title>
          <Tag style={{ background: colors.blue, color: '#fff', marginLeft: 'auto' }}>
            Query Language
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Code examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1.2 }}>
            {cypherExamples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.blue,
                    letterSpacing: 1,
                    paddingLeft: 4,
                  }}
                >
                  {String(i + 1).padStart(2, '0')} / {ex.label}
                </div>
                <div
                  style={{
                    background: colors.darkBg,
                    border: '3px solid black',
                    boxShadow: '4px 4px 0 black',
                    padding: '14px 18px',
                    fontFamily: "'Space Mono', 'Fira Code', monospace",
                    fontSize: 13,
                    color: '#e0e0e0',
                    lineHeight: 1.7,
                    whiteSpace: 'pre',
                  }}
                >
                  <span style={{ color: colors.blue }}>{'MATCH '.includes(ex.code.split('\n')[0].split(' ')[0]) ? '' : ''}</span>
                  {ex.code.split('\n').map((line, li) => {
                    // Syntax highlight keywords
                    const parts = line.split(/\b(MATCH|RETURN|CREATE|WHERE|WITH|OPTIONAL|ORDER BY|LIMIT|SET|DELETE|MERGE)\b/);
                    return (
                      <div key={li}>
                        {parts.map((p, pi) =>
                          ['MATCH', 'RETURN', 'CREATE', 'WHERE', 'WITH', 'OPTIONAL', 'ORDER BY', 'LIMIT', 'SET', 'DELETE', 'MERGE'].includes(p) ? (
                            <span key={pi} style={{ color: colors.blue, fontWeight: 700 }}>{p}</span>
                          ) : (
                            <span key={pi}>{p}</span>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Syntax guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '20px 20px',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: colors.dark, marginBottom: 14 }}>
                Cypher 语法速查
              </div>
              {[
                { sym: '(n:Label)', desc: '节点，带标签' },
                { sym: '-[:REL]→', desc: '有向关系' },
                { sym: '{key: value}', desc: '属性过滤' },
                { sym: '[*1..3]', desc: '可变长路径' },
                { sym: 'WHERE n.age > 30', desc: '条件过滤' },
                { sym: 'RETURN n, r, m', desc: '返回节点/关系' },
              ].map((item) => (
                <div
                  key={item.sym}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '7px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <code
                    style={{
                      background: '#f0f7ff',
                      border: '1px solid ' + colors.blue,
                      padding: '2px 8px',
                      fontSize: 12,
                      fontFamily: 'monospace',
                      minWidth: 140,
                      color: colors.blue,
                      fontWeight: 700,
                    }}
                  >
                    {item.sym}
                  </code>
                  <span style={{ fontSize: 13, color: '#555' }}>{item.desc}</span>
                </div>
              ))}
            </Card>

            <BulletList
              items={[
                { icon: '💡', text: 'ASCII art 风格，直观表达图结构' },
                { icon: '🎯', text: '声明式语言，只描述"要什么"' },
                { icon: '🔄', text: '支持 MERGE（查找或创建）' },
              ]}
              style={{
                border: '3px solid black',
                boxShadow: '4px 4px 0 black',
                background: '#f0fff4',
                padding: '14px 16px',
              }}
            />
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
