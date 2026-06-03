import React from 'react';
import { Slide, Inner, Title, Card, Highlight, Tag, Grid } from '../ui';
import { colors } from '../../styles/theme';

export default function S04_FailureCases() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 28, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.red, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            真实失败案例
          </Title>
          <Tag style={{ background: colors.red, color: '#fff', marginLeft: 'auto' }}>
            Case Study
          </Tag>
        </div>

        <Grid cols={2} style={{ flex: 1, gap: 32 }}>
          {/* Case 1: Exact keyword failure */}
          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '28px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Tag style={{ background: colors.red, color: '#fff', fontSize: 13 }}>失败案例 1</Tag>
              <span style={{ fontSize: 17, fontWeight: 800, color: colors.dark }}>精确关键词匹配</span>
            </div>

            {/* Query box */}
            <div
              style={{
                background: '#f0f7ff',
                border: '2px solid ' + colors.blue,
                padding: '10px 16px',
                fontSize: 15,
                fontWeight: 700,
                color: colors.blue,
              }}
            >
              用户查询："RAG-Fusion 算法"
            </div>

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#888', letterSpacing: 1 }}>向量检索返回结果：</div>
              {[
                { rank: 1, text: '检索增强生成综述', score: '0.88', bad: false },
                { rank: 2, text: 'RAG 系统优化方案', score: '0.85', bad: false },
                { rank: 3, text: '多路检索技术对比', score: '0.82', bad: false },
                { rank: 7, text: 'RAG-Fusion 原始论文 ← 正确答案！', score: '0.71', bad: true },
              ].map((r) => (
                <div
                  key={r.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 10px',
                    background: r.bad ? '#fff0f0' : '#fafafa',
                    border: r.bad ? `2px solid ${colors.red}` : '1px solid #ddd',
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 900, color: r.bad ? colors.red : '#888', minWidth: 24 }}>
                    #{r.rank}
                  </span>
                  <span style={{ flex: 1, color: r.bad ? colors.red : '#444', fontWeight: r.bad ? 700 : 400 }}>
                    {r.text}
                  </span>
                  <span style={{ color: '#888', fontSize: 12 }}>{r.score}</span>
                </div>
              ))}
            </div>

            <Highlight style={{ background: '#fff0f0', borderLeft: `4px solid ${colors.red}`, padding: '10px 14px', fontSize: 14 }}>
              ❌ 精确匹配的文档因为"表面词形"不同被排到第 7 位
            </Highlight>
          </Card>

          {/* Case 2: Multi-hop failure */}
          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '28px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Tag style={{ background: colors.red, color: '#fff', fontSize: 13 }}>失败案例 2</Tag>
              <span style={{ fontSize: 17, fontWeight: 800, color: colors.dark }}>多跳关联推理</span>
            </div>

            {/* Query box */}
            <div
              style={{
                background: '#f0f7ff',
                border: '2px solid ' + colors.blue,
                padding: '10px 16px',
                fontSize: 15,
                fontWeight: 700,
                color: colors.blue,
              }}
            >
              用户查询："苹果CEO的母校在哪个城市？"
            </div>

            {/* Hop chain - failing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#888', letterSpacing: 1 }}>需要的推理链：</div>
              {[
                { hop: 'Hop 1', text: '苹果公司 → CEO → Tim Cook', ok: true },
                { hop: 'Hop 2', text: 'Tim Cook → 毕业于 → Auburn University', ok: true },
                { hop: 'Hop 3', text: 'Auburn University → 位于 → Alabama 州', ok: false },
              ].map((h) => (
                <div
                  key={h.hop}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    background: h.ok ? '#f0fff4' : '#fff0f0',
                    border: `2px solid ${h.ok ? colors.green : colors.red}`,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      background: h.ok ? colors.green : colors.red,
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 900,
                      padding: '2px 8px',
                      minWidth: 48,
                      textAlign: 'center',
                    }}
                  >
                    {h.hop}
                  </span>
                  <span style={{ color: h.ok ? '#166534' : colors.red }}>{h.text}</span>
                  <span style={{ marginLeft: 'auto' }}>{h.ok ? '✅' : '❌'}</span>
                </div>
              ))}
            </div>

            <Highlight
              style={{
                background: '#fff0f0',
                borderLeft: `4px solid ${colors.red}`,
                padding: '10px 14px',
                fontSize: 14,
              }}
            >
              ❌ 向量检索无法跨文档追踪实体关系链，每次只检索一个文档片段
            </Highlight>
          </Card>
        </Grid>
      </Inner>
    </Slide>
  );
}
