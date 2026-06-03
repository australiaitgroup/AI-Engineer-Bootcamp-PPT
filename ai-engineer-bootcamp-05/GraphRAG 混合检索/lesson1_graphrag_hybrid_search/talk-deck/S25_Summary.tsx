import React from 'react';
import { Slide, Inner, Title, BulletList, Tag, Stagger, StaggerItem } from '../ui';
import { colors } from '../../styles/theme';

const takeaways = [
  {
    icon: '🔍',
    text: '纯向量检索有盲区：精确关键词和多跳关系是其致命弱点，不能作为 RAG 的唯一检索路径',
    color: colors.red,
  },
  {
    icon: '🔤',
    text: 'BM25 是向量检索的最佳搭档：关键词精确匹配、无需 GPU、成本极低，两者互补覆盖大多数查询场景',
    color: colors.yellow,
  },
  {
    icon: '🕸️',
    text: '知识图谱解锁多跳推理：Neo4j + Cypher 可以追踪任意深度的实体关系链，这是向量和 BM25 无法做到的',
    color: colors.green,
  },
  {
    icon: '⚡',
    text: 'RRF 是融合的黄金标准：只看排名不看分数，消除不同检索系统的分数量纲差异，简单有效',
    color: colors.blue,
  },
  {
    icon: '🤖',
    text: 'Vibe Coding 加速 RAG 开发：让 AI 设计 Schema、修复 Cypher、生成 Pipeline，工程效率提升 3-5x',
    color: colors.dark,
  },
];

export default function S25_Summary() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 28,
          paddingTop: 48,
        }}
      >
        <Stagger>
          {/* Header */}
          <StaggerItem>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 56,
                  background: colors.green,
                  border: '2px solid black',
                }}
              />
              <div>
                <Title style={{ fontSize: 48, fontWeight: 900, color: colors.dark }}>
                  本节核心要点
                </Title>
                <div style={{ fontSize: 18, color: '#666', fontWeight: 600, marginTop: 4 }}>
                  GraphRAG + 混合检索 · 5 个带走的认知
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Takeaways */}
          <StaggerItem>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {takeaways.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    padding: '14px 20px',
                    background: '#fff',
                    border: '3px solid black',
                    boxShadow: '5px 5px 0 black',
                    borderLeft: `8px solid ${item.color}`,
                  }}
                >
                  {/* Number */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: item.color,
                      border: '2px solid black',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 900,
                      color: item.color === colors.yellow ? colors.dark : '#fff',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>

                  <span style={{ fontSize: 16, fontWeight: 600, color: colors.dark, lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Next lesson tag */}
          <StaggerItem>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                marginTop: 8,
                borderTop: '3px solid black',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700, color: '#888' }}>
                Liangjun Song · JR Academy AI Bootcamp · 2026-06-03
              </span>
              <Tag
                style={{
                  background: colors.green,
                  color: '#fff',
                  border: '3px solid black',
                  boxShadow: '4px 4px 0 black',
                  fontSize: 16,
                  fontWeight: 800,
                  padding: '8px 20px',
                }}
              >
                下节课 → 2026-06-07 RAG Evaluation
              </Tag>
            </div>
          </StaggerItem>
        </Stagger>
      </Inner>
    </Slide>
  );
}
