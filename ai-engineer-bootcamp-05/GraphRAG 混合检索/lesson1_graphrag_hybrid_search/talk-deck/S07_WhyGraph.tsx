import React from 'react';
import { Slide, Inner, Title, Card, Tag } from '../ui';
import { colors } from '../../styles/theme';

const hops = [
  {
    entity: '苹果公司',
    type: 'Company',
    rel: 'CEO_OF',
    color: colors.green,
  },
  {
    entity: 'Tim Cook',
    type: 'Person',
    rel: 'STUDIED_AT',
    color: colors.blue,
  },
  {
    entity: 'Auburn University',
    type: 'University',
    rel: 'LOCATED_IN',
    color: colors.yellow,
  },
  {
    entity: 'Alabama, USA',
    type: 'Location',
    rel: null,
    color: colors.red,
  },
];

export default function S07_WhyGraph() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 28, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.green, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            为什么图检索能做多跳推理？
          </Title>
          <Tag style={{ background: colors.green, color: '#fff', marginLeft: 'auto' }}>
            Multi-hop Reasoning
          </Tag>
        </div>

        {/* Query */}
        <Card
          style={{
            border: '3px solid ' + colors.blue,
            boxShadow: '6px 6px 0 ' + colors.blue,
            background: '#eff6ff',
            padding: '16px 24px',
            fontSize: 20,
            fontWeight: 700,
            color: colors.dark,
          }}
        >
          🔍 用户问：<span style={{ color: colors.blue }}>"苹果公司的CEO毕业的大学在哪个城市？"</span>
        </Card>

        {/* Traversal path */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
            图遍历路径 (Graph Traversal)
          </div>

          {/* Path visualization */}
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: 0,
              flex: 1,
            }}
          >
            {hops.map((hop, i) => (
              <React.Fragment key={i}>
                {/* Node */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    flex: 1,
                  }}
                >
                  {/* Hop number */}
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: '#888',
                      letterSpacing: 1,
                    }}
                  >
                    HOP {i + 1}
                  </div>

                  {/* Node box */}
                  <div
                    style={{
                      background: hop.color,
                      border: '3px solid black',
                      boxShadow: '6px 6px 0 black',
                      padding: '16px 20px',
                      width: '100%',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: hop.color === colors.yellow ? colors.dark : '#fff',
                        lineHeight: 1.2,
                      }}
                    >
                      {hop.entity}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: hop.color === colors.yellow ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.75)',
                        letterSpacing: 1,
                      }}
                    >
                      :{hop.type}
                    </span>
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#555',
                      textAlign: 'center',
                      lineHeight: 1.4,
                    }}
                  >
                    {i === 0 && '起始节点'}
                    {i === 1 && 'CEO 关系找到人物'}
                    {i === 2 && '就读关系找到学校'}
                    {i === 3 && (
                      <span style={{ color: colors.green, fontWeight: 800 }}>
                        ✅ 最终答案！
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow between hops */}
                {hop.rel && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '0 4px',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        background: colors.dark,
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '3px 8px',
                        letterSpacing: 0.5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {hop.rel}
                    </div>
                    <div style={{ fontSize: 24, color: colors.dark, lineHeight: 1 }}>→</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Comparison: vector vs graph */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card
              style={{
                border: `3px solid ${colors.red}`,
                boxShadow: `4px 4px 0 ${colors.red}`,
                background: '#fff5f5',
                padding: '14px 18px',
                fontSize: 14,
              }}
            >
              <div style={{ fontWeight: 800, color: colors.red, marginBottom: 6 }}>❌ 向量检索</div>
              <div style={{ color: '#666', lineHeight: 1.5 }}>
                每次只能找到单个文档片段，无法跨文档追踪实体链，需要多次查询且结果无法自动关联
              </div>
            </Card>
            <Card
              style={{
                border: `3px solid ${colors.green}`,
                boxShadow: `4px 4px 0 ${colors.green}`,
                background: '#f0fff4',
                padding: '14px 18px',
                fontSize: 14,
              }}
            >
              <div style={{ fontWeight: 800, color: colors.green, marginBottom: 6 }}>✅ 图检索</div>
              <div style={{ color: '#166534', lineHeight: 1.5 }}>
                一条 Cypher 查询可以遍历任意深度的实体关系，自动完成多跳推理，返回精确答案
              </div>
            </Card>
          </div>
        </div>
      </Inner>
    </Slide>
  );
}
