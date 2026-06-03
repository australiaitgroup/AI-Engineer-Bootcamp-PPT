import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag, Grid } from '../ui';
import { colors } from '../../styles/theme';

export default function S10_Neo4j() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.green, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            Neo4j — 世界领先图数据库
          </Title>
          <Tag style={{ background: colors.green, color: '#fff', marginLeft: 'auto' }}>
            Graph Database
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Comparison table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
              关系型数据库 vs 图数据库
            </div>

            <div
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  background: colors.dark,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                {['维度', '关系型 (MySQL)', '图数据库 (Neo4j)'].map((h) => (
                  <div key={h} style={{ padding: '10px 12px', borderRight: '1px solid #333' }}>
                    {h}
                  </div>
                ))}
              </div>

              {[
                ['数据模型', '表 + 行 + 列', '节点 + 关系 + 属性'],
                ['关联查询', 'JOIN（N表性能差）', '图遍历（原生高效）'],
                ['多跳查询', '递归CTE，复杂', 'MATCH 路径，简洁'],
                ['Schema', '强Schema，固定', '灵活Schema，易扩展'],
                ['擅长场景', '事务处理，报表', '关系网络，推荐，RAG'],
                ['查询语言', 'SQL', 'Cypher'],
              ].map(([dim, sql, neo4j], i) => (
                <div
                  key={dim}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    background: i % 2 === 0 ? '#fff' : '#f9f9f9',
                    borderTop: '1px solid #ddd',
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      padding: '9px 12px',
                      fontWeight: 700,
                      color: '#333',
                      borderRight: '1px solid #ddd',
                    }}
                  >
                    {dim}
                  </div>
                  <div style={{ padding: '9px 12px', color: '#666', borderRight: '1px solid #ddd' }}>{sql}</div>
                  <div style={{ padding: '9px 12px', color: colors.green, fontWeight: 600 }}>{neo4j}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Key features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
              Neo4j 核心特性
            </div>

            <Grid cols={2} style={{ gap: 14, flex: 1 }}>
              {[
                {
                  icon: '⚡',
                  title: '原生图存储',
                  desc: '关系以指针形式直接存储，遍历 O(1)，不需要 JOIN 操作',
                  color: colors.green,
                },
                {
                  icon: '🔍',
                  title: 'Cypher 语言',
                  desc: '声明式图查询语言，ASCII art 语法，可读性极强',
                  color: colors.blue,
                },
                {
                  icon: '🔌',
                  title: 'LangChain 集成',
                  desc: 'Neo4jGraph + GraphCypherQAChain，开箱即用',
                  color: colors.yellow,
                },
                {
                  icon: '☁️',
                  title: 'AuraDB 云服务',
                  desc: '免费托管实例，适合学习和原型开发，无需本地部署',
                  color: colors.green,
                },
                {
                  icon: '🔒',
                  title: 'ACID 事务',
                  desc: '支持完整事务，数据一致性有保障',
                  color: colors.red,
                },
                {
                  icon: '📊',
                  title: 'Graph Data Science',
                  desc: '内置图算法库：PageRank、社区发现、相似度计算',
                  color: colors.blue,
                },
              ].map((f) => (
                <Card
                  key={f.title}
                  style={{
                    border: '3px solid black',
                    boxShadow: '4px 4px 0 black',
                    background: '#fff',
                    padding: '14px 16px',
                    borderTop: `5px solid ${f.color}`,
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: colors.dark, marginBottom: 4 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{f.desc}</div>
                </Card>
              ))}
            </Grid>

            {/* Quick start */}
            <div
              style={{
                background: colors.darkBg,
                border: '3px solid black',
                boxShadow: '4px 4px 0 black',
                padding: '12px 16px',
                fontFamily: 'monospace',
                fontSize: 13,
                color: colors.green,
              }}
            >
              pip install langchain-neo4j neo4j
            </div>
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
