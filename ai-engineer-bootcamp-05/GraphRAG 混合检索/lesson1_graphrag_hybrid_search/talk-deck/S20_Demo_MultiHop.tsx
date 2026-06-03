import React from 'react';
import { Slide, Inner, Title, Card, Tag, GrowBar } from '../ui';
import { colors } from '../../styles/theme';

const results = [
  { method: '向量检索', accuracy: 31, color: colors.blue, icon: '🔢' },
  { method: 'BM25 检索', accuracy: 22, color: colors.yellow, icon: '🔤' },
  { method: '图检索', accuracy: 94, color: colors.green, icon: '🕸️' },
  { method: '混合 RRF', accuracy: 89, color: colors.dark, icon: '⚡' },
];

const tableData = [
  {
    method: '向量检索',
    answer: '找到"苹果公司"、"蒂姆库克"相关文档，但无法关联学校→城市',
    rank: '❌',
    color: colors.blue,
    icon: '🔢',
  },
  {
    method: 'BM25 检索',
    answer: '"毕业大学"关键词没有完全匹配，返回无关文档排第一',
    rank: '❌',
    color: colors.yellow,
    icon: '🔤',
  },
  {
    method: '图检索',
    answer: 'Apple→CEO→Tim Cook→Auburn→Alabama，直接路径查询，一步到位',
    rank: '✅',
    color: colors.green,
    icon: '🕸️',
  },
  {
    method: '混合 RRF',
    answer: '图检索的正确答案排名靠前，融合后仍保持高置信度',
    rank: '✅',
    color: colors.dark,
    icon: '⚡',
  },
];

export default function S20_Demo_MultiHop() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.green, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            Demo — 多跳查询对比
          </Title>
          <Tag style={{ background: colors.green, color: '#fff', marginLeft: 'auto' }}>
            Multi-hop Query
          </Tag>
        </div>

        {/* Query */}
        <Card
          style={{
            border: '3px solid black',
            boxShadow: '6px 6px 0 black',
            background: '#f0fff4',
            padding: '16px 24px',
            borderLeft: `8px solid ${colors.green}`,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.green, letterSpacing: 1 }}>
            多跳查询（3跳）
          </span>
          <div style={{ fontSize: 20, fontWeight: 900, color: colors.dark, marginTop: 6 }}>
            "苹果公司CEO毕业的大学在哪个城市？"
          </div>
          <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>
            推理链：Apple → CEO → Tim Cook → Auburn University → Alabama, USA
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
            {['检索方式', '是否正确', '失败/成功原因'].map((h) => (
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
                background:
                  row.rank === '✅' ? '#f0fff4' : i % 2 === 0 ? '#fff' : '#f9f9f9',
                borderTop: '1px solid #ddd',
                fontSize: 14,
                border: row.rank === '✅' ? `2px solid ${colors.green}` : undefined,
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontWeight: 700,
                  color: row.color === colors.dark ? colors.dark : row.color,
                  borderRight: '1px solid #ddd',
                }}
              >
                <span>{row.icon}</span> {row.method}
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  textAlign: 'center',
                  fontSize: 20,
                  borderRight: '1px solid #ddd',
                }}
              >
                {row.rank}
              </div>
              <div
                style={{
                  padding: '10px 14px',
                  color: row.rank === '✅' ? '#166534' : '#555',
                  fontWeight: row.rank === '✅' ? 600 : 400,
                }}
              >
                {row.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Accuracy bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
            多跳查询准确率 — 图检索碾压其他方法
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
                {r.icon} {r.method}
              </span>
              <div style={{ flex: 1 }}>
                <GrowBar
                  value={r.accuracy}
                  max={100}
                  color={r.color === colors.dark ? '#333' : r.color}
                  height={22}
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
            fontSize: 15,
            fontWeight: 800,
            color: '#166534',
          }}
        >
          🏆 多跳查询：图检索准确率 94%，向量和BM25 仅 22-31%，差距悬殊！
        </Card>
      </Inner>
    </Slide>
  );
}
