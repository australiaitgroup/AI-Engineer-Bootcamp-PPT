import React from 'react';
import { Slide, Inner, Title, Card, Tag, GrowBar } from '../ui';
import { colors } from '../../styles/theme';

const results = [
  { method: '向量检索', accuracy: 72, answer: 'Tim Cook（苹果公司CEO）', correct: true, color: colors.blue },
  { method: 'BM25 检索', accuracy: 85, answer: 'Tim Cook', correct: true, color: colors.yellow },
  { method: '图检索', accuracy: 98, answer: 'Tim Cook (CEO since 2011)', correct: true, color: colors.green },
  { method: '混合 RRF', accuracy: 97, answer: 'Tim Cook，2011年起担任CEO', correct: true, color: colors.dark },
];

const tableData = [
  { method: '向量检索', rank: 3, reason: '找到苹果相关文档，但关键词匹配不精确', icon: '🔢', color: colors.blue },
  { method: 'BM25 检索', rank: 1, reason: '"CEO" 关键词精确匹配，排名靠前', icon: '🔤', color: colors.yellow },
  { method: '图检索', rank: 1, reason: '直接遍历 Apple-[:CEO_OF]->Person 关系', icon: '🕸️', color: colors.green },
  { method: '混合 RRF', rank: 1, reason: 'RRF 融合三路，Tim Cook 稳居第一', icon: '⚡', color: colors.dark },
];

export default function S19_Demo_SingleHop() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.blue, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            Demo — 单跳查询对比
          </Title>
          <Tag style={{ background: colors.blue, color: '#fff', marginLeft: 'auto' }}>
            Single-hop Query
          </Tag>
        </div>

        {/* Query */}
        <Card
          style={{
            border: '3px solid black',
            boxShadow: '6px 6px 0 black',
            background: '#eff6ff',
            padding: '16px 24px',
            borderLeft: `8px solid ${colors.blue}`,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.blue, letterSpacing: 1 }}>用户查询</span>
          <div style={{ fontSize: 22, fontWeight: 900, color: colors.dark, marginTop: 6 }}>
            "苹果公司的CEO是谁？"
          </div>
        </Card>

        {/* Comparison table */}
        <div
          style={{
            border: '3px solid black',
            boxShadow: '6px 6px 0 black',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '130px 60px 1fr',
              background: colors.dark,
              color: '#fff',
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {['检索方式', '答案排名', '分析'].map((h) => (
              <div key={h} style={{ padding: '10px 14px', borderRight: '1px solid #444' }}>
                {h}
              </div>
            ))}
          </div>
          {tableData.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 60px 1fr',
                background: i % 2 === 0 ? '#fff' : '#f9f9f9',
                borderTop: '1px solid #ddd',
                fontSize: 14,
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontWeight: 700,
                  color: row.color,
                  borderRight: '1px solid #ddd',
                }}
              >
                <span>{row.icon}</span> {row.method}
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  textAlign: 'center',
                  fontWeight: 900,
                  color: row.rank === 1 ? colors.green : '#888',
                  borderRight: '1px solid #ddd',
                }}
              >
                #{row.rank}
              </div>
              <div style={{ padding: '10px 14px', color: '#555' }}>{row.reason}</div>
            </div>
          ))}
        </div>

        {/* Accuracy bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
            各方法准确率对比（单跳查询）
          </div>
          {results.map((r) => (
            <div key={r.method} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  minWidth: 90,
                  color: r.color === colors.dark ? colors.dark : r.color,
                }}
              >
                {r.method}
              </span>
              <div style={{ flex: 1 }}>
                <GrowBar
                  value={r.accuracy}
                  max={100}
                  color={r.color === colors.dark ? '#333' : r.color}
                  height={20}
                  label={`${r.accuracy}%`}
                />
              </div>
            </div>
          ))}
        </div>

        <Card
          style={{
            border: `3px solid ${colors.green}`,
            boxShadow: `4px 4px 0 ${colors.green}`,
            background: '#f0fff4',
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 600,
            color: '#166534',
          }}
        >
          ✅ 单跳查询：BM25 和图检索均表现优秀，混合检索综合最稳定
        </Card>
      </Inner>
    </Slide>
  );
}
