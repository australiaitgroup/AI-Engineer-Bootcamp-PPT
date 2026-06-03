import React from 'react';
import { Slide, Inner, Half, Title, Card, CountUp, Tag } from '../ui';
import { colors } from '../../styles/theme';

const tableData = [
  {
    doc: 'Doc A',
    vecRank: 1,
    bm25Rank: 3,
    graphRank: 2,
    vecScore: '1/(60+1)=0.0164',
    bm25Score: '1/(60+3)=0.0159',
    graphScore: '1/(60+2)=0.0161',
    total: '0.0484',
    highlight: true,
  },
  {
    doc: 'Doc B',
    vecRank: 2,
    bm25Rank: 1,
    graphRank: 5,
    vecScore: '1/(60+2)=0.0161',
    bm25Score: '1/(60+1)=0.0164',
    graphScore: '1/(60+5)=0.0154',
    total: '0.0479',
    highlight: false,
  },
  {
    doc: 'Doc C',
    vecRank: 3,
    bm25Rank: 2,
    graphRank: 8,
    vecScore: '1/(60+3)=0.0159',
    bm25Score: '1/(60+2)=0.0161',
    graphScore: '1/(60+8)=0.0147',
    total: '0.0467',
    highlight: false,
  },
];

export default function S09_RRF() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.yellow, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            RRF — 倒数排名融合算法
          </Title>
          <Tag style={{ background: colors.yellow, color: colors.dark, marginLeft: 'auto' }}>
            Reciprocal Rank Fusion
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Formula + insight */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Formula */}
            <Card
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: colors.darkBg,
                padding: '24px 28px',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.yellow,
                  letterSpacing: 2,
                  marginBottom: 16,
                  textAlign: 'left',
                }}
              >
                核心公式
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 22,
                  color: colors.yellow,
                  marginBottom: 12,
                }}
              >
                score(d) = Σ 1 / (k + rankᵢ(d))
              </div>
              <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.8 }}>
                k = 常数（通常取 60，防止排名1的文档过于主导）
                <br />
                rankᵢ(d) = 文档 d 在第 i 路检索结果中的排名
                <br />
                Σ 对所有检索路径求和
              </div>
            </Card>

            {/* Key insight */}
            <Card
              style={{
                border: `3px solid ${colors.yellow}`,
                boxShadow: `6px 6px 0 ${colors.yellow}`,
                background: '#fffdf0',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: colors.dark }}>为什么用 RRF？</div>
              <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>
                不同检索系统的分数尺度完全不同（余弦相似度 vs BM25 分数 vs 图遍历权重），
                直接相加毫无意义。RRF 只关注排名，消除了分数系统差异。
              </div>
            </Card>

            {/* Score improvement */}
            <Card
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '18px 20px',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: '#888', marginBottom: 8 }}>
                混合检索 vs 单路检索 精度提升
              </div>
              <CountUp
                from={0}
                to={23}
                suffix="%"
                style={{ fontSize: 48, fontWeight: 900, color: colors.green }}
              />
              <div style={{ fontSize: 14, color: '#555' }}>平均精度提升（NDCG@10）</div>
            </Card>
          </div>

          {/* Right: Example table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#666', letterSpacing: 1 }}>
              具体计算示例（k = 60）
            </div>

            <div
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {/* Table header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 60px 60px 60px 1fr 90px',
                  background: colors.dark,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {['文档', '向量排名', 'BM25排名', '图排名', 'RRF 得分计算', '总分 ↓'].map((h) => (
                  <div key={h} style={{ padding: '10px 8px', borderRight: '1px solid #333', lineHeight: 1.3 }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Table rows */}
              {tableData.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 60px 60px 60px 1fr 90px',
                    background: row.highlight ? '#f0fff4' : i % 2 === 0 ? '#fff' : '#f9f9f9',
                    borderTop: '1px solid #ddd',
                    fontSize: 12,
                    border: row.highlight ? `2px solid ${colors.green}` : undefined,
                  }}
                >
                  <div
                    style={{
                      padding: '10px 8px',
                      fontWeight: 800,
                      color: row.highlight ? colors.green : colors.dark,
                      borderRight: '1px solid #ddd',
                    }}
                  >
                    {row.doc} {row.highlight && '🏆'}
                  </div>
                  <div style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #ddd' }}>
                    #{row.vecRank}
                  </div>
                  <div style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #ddd' }}>
                    #{row.bm25Rank}
                  </div>
                  <div style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #ddd' }}>
                    #{row.graphRank}
                  </div>
                  <div
                    style={{
                      padding: '10px 8px',
                      fontFamily: 'monospace',
                      fontSize: 11,
                      color: '#555',
                      borderRight: '1px solid #ddd',
                      lineHeight: 1.5,
                    }}
                  >
                    {row.vecScore}
                    <br />
                    +{row.bm25Score}
                    <br />
                    +{row.graphScore}
                  </div>
                  <div
                    style={{
                      padding: '10px 8px',
                      fontWeight: 900,
                      color: row.highlight ? colors.green : colors.dark,
                      textAlign: 'center',
                    }}
                  >
                    {row.total}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: '#f0fff4',
                border: `3px solid ${colors.green}`,
                boxShadow: `4px 4px 0 ${colors.green}`,
                padding: '12px 16px',
                fontSize: 14,
                fontWeight: 600,
                color: '#166534',
              }}
            >
              ✅ Doc A 在三路检索中均表现优秀，获得最高 RRF 总分，排列第一
            </div>
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
