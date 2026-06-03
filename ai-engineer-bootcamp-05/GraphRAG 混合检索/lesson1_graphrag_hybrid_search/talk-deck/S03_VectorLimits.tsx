import React from 'react';
import { Slide, Inner, Half, Title, Card, BulletList, Tag } from '../ui';
import { colors } from '../../styles/theme';

const codeSnippet = `# 场景：精确关键词查找
query = "GPT-4o"
results = vector_store.similarity_search(query)

# ❌ 结果可能返回：
# - "语言模型的发展历程"     (0.82)
# - "多模态AI技术综述"       (0.79)
# - "GPT-4相关研究"          (0.76)
#
# ⚠️  "GPT-4o" 的精确文档
#     得分 0.71，排在第 8 位
#     → 用户永远看不到！`;

export default function S03_VectorLimits() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.red, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            纯向量检索的局限性
          </Title>
          <Tag style={{ background: colors.red, color: '#fff', marginLeft: 'auto' }}>
            痛点分析
          </Tag>
        </div>

        {/* Half layout */}
        <Half style={{ flex: 1, gap: 32 }}>
          {/* Left: problem description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '20px 24px',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: colors.dark, marginBottom: 12 }}>
                向量检索的本质
              </div>
              <div style={{ fontSize: 15, color: '#555', lineHeight: 1.6 }}>
                向量检索通过语义相似度匹配文档，擅长处理<strong>同义词、近义词</strong>，
                但在以下场景会失效：
              </div>
            </Card>

            <BulletList
              items={[
                { icon: '⚡', text: '精确关键词匹配（型号、代码、专有名词）' },
                { icon: '🔗', text: '多跳推理（A→B→C 跨文档关联）' },
                { icon: '📊', text: '结构化关系查询（谁是CEO？在哪个城市？）' },
                { icon: '🎯', text: '低频专业术语（训练数据中少见的词）' },
              ]}
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '16px 20px',
              }}
            />

            <Card
              style={{
                border: `3px solid ${colors.red}`,
                boxShadow: `6px 6px 0 ${colors.red}`,
                background: '#fff5f5',
                padding: '14px 20px',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: colors.red }}>
                核心问题：语义相似 ≠ 信息精确
              </span>
            </Card>
          </div>

          {/* Right: code showing failure */}
          <div
            style={{
              background: colors.darkBg,
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              borderRadius: 0,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.yellow,
                letterSpacing: 2,
                textTransform: 'uppercase',
                borderBottom: '1px solid #333',
                paddingBottom: 8,
              }}
            >
              failure_demo.py
            </div>
            <pre
              style={{
                fontFamily: "'Space Mono', 'Fira Code', monospace",
                fontSize: 13,
                color: '#e0e0e0',
                lineHeight: 1.7,
                margin: 0,
                whiteSpace: 'pre-wrap',
                flex: 1,
              }}
            >
              {codeSnippet}
            </pre>
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
