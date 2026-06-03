import React from 'react';
import { Slide, Inner, Half, Title, Card, BulletList, Tag } from '../ui';
import { colors } from '../../styles/theme';

export default function S05_BM25() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.yellow, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            BM25 — 关键词检索利器
          </Title>
          <Tag style={{ background: colors.yellow, color: colors.dark, marginLeft: 'auto' }}>
            Best Match 25
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Formula + Properties */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Formula Card */}
            <Card
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: colors.darkBg,
                padding: '24px 28px',
                color: '#fff',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.yellow,
                  letterSpacing: 2,
                  marginBottom: 16,
                  textTransform: 'uppercase',
                }}
              >
                BM25 公式
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 15,
                  color: '#e8e8e8',
                  lineHeight: 2,
                  textAlign: 'center',
                }}
              >
                <div style={{ color: colors.yellow, fontSize: 17, marginBottom: 8 }}>
                  Score(D, Q) = Σ IDF(qᵢ) · f(qᵢ, D) · (k₁ + 1)
                </div>
                <div style={{ color: '#aaa', fontSize: 13 }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ─────────────────────────────────
                </div>
                <div style={{ color: '#e8e8e8', fontSize: 15 }}>
                  f(qᵢ, D) + k₁ · (1 - b + b · |D| / avgdl)
                </div>
                <div style={{ marginTop: 16, fontSize: 12, color: '#888', textAlign: 'left' }}>
                  f(qᵢ,D) = 词频 &nbsp;|&nbsp; |D| = 文档长度 &nbsp;|&nbsp; k₁≈1.5 &nbsp;|&nbsp; b≈0.75
                </div>
              </div>
            </Card>

            {/* Key properties */}
            <BulletList
              items={[
                { icon: '🎯', text: '精确匹配：对词形完全一致的词给予高分' },
                { icon: '📏', text: '长度归一化：长文档不会自动占优势' },
                { icon: '📉', text: '词频饱和：词语出现100次 ≠ 10倍得分' },
                { icon: '⚡', text: '速度极快：无需 GPU，纯 CPU 计算' },
              ]}
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '16px 20px',
              }}
            />
          </div>

          {/* Right: Comparison with Vector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: colors.dark, marginBottom: 4 }}>
              BM25 vs 向量检索
            </div>

            {/* Comparison table */}
            <div
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                overflow: 'hidden',
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
                {['维度', 'BM25', '向量检索'].map((h) => (
                  <div key={h} style={{ padding: '10px 14px', borderRight: '1px solid #444' }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {[
                ['精确词匹配', '✅ 强', '❌ 弱'],
                ['语义理解', '❌ 弱', '✅ 强'],
                ['同义词', '❌ 需同形', '✅ 自动处理'],
                ['专有名词', '✅ 精确', '⚠️ 不稳定'],
                ['多语言', '⚠️ 需分词', '✅ 天然支持'],
                ['计算成本', '✅ 极低', '⚠️ 需GPU'],
              ].map(([dim, bm25, vec], i) => (
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
                  <div style={{ padding: '9px 14px', fontWeight: 600, color: '#333', borderRight: '1px solid #ddd' }}>{dim}</div>
                  <div style={{ padding: '9px 14px', borderRight: '1px solid #ddd' }}>{bm25}</div>
                  <div style={{ padding: '9px 14px' }}>{vec}</div>
                </div>
              ))}
            </div>

            {/* Takeaway */}
            <Card
              style={{
                border: `3px solid ${colors.yellow}`,
                boxShadow: `6px 6px 0 ${colors.yellow}`,
                background: '#fffdf0',
                padding: '14px 18px',
                fontSize: 14,
                fontWeight: 700,
                color: colors.dark,
              }}
            >
              💡 两者互补！BM25 补关键词精度，向量补语义泛化
            </Card>
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
