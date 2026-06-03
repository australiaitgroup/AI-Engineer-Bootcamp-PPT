import React from 'react';
import { Slide, Inner, Title, Card, Stagger, StaggerItem } from '../ui';
import { colors } from '../../styles/theme';

const objectives = [
  '理解纯向量检索的局限性，掌握混合检索的动机与价值',
  '掌握 BM25 算法原理，能在实际项目中与向量检索互补使用',
  '理解知识图谱结构，学会用 LLMGraphTransformer 自动构建图谱',
  '在 Neo4j 中存储图数据，并使用 Cypher 语言进行多跳查询',
  '实现 RRF 融合算法，将 Vector + BM25 + Graph 三路结果合并排序',
];

export default function S02_Objectives() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 24,
          paddingTop: 48,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <div
            style={{
              width: 12,
              height: 48,
              background: colors.green,
              border: '2px solid black',
            }}
          />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            本节学习目标
          </Title>
        </div>

        {/* Objectives */}
        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          {objectives.map((obj, i) => (
            <StaggerItem key={i}>
              <Card
                style={{
                  border: '3px solid black',
                  boxShadow: '6px 6px 0 black',
                  background: '#fff',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  borderLeft: `8px solid ${colors.green}`,
                }}
              >
                {/* Checkmark */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: colors.green,
                    border: '3px solid black',
                    borderRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 20,
                  }}
                >
                  ✓
                </div>

                {/* Number badge */}
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: colors.green,
                    minWidth: 28,
                    letterSpacing: 0.5,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Text */}
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: colors.dark,
                    lineHeight: 1.4,
                  }}
                >
                  {obj}
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Inner>
    </Slide>
  );
}
