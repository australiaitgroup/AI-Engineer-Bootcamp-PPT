import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag, BulletList } from '../ui';
import { colors } from '../../styles/theme';

const code = `from rank_bm25 import BM25Okapi
import jieba  # 中文分词（英文可用 split()）

class BM25Retriever:
    def __init__(self, documents: list[str]):
        # 分词（中文需要 jieba）
        tokenized_docs = [
            list(jieba.cut(doc)) for doc in documents
        ]
        self.bm25 = BM25Okapi(tokenized_docs)
        self.documents = documents

    def retrieve(self, query: str, top_k: int = 5):
        # 对查询词分词
        tokenized_query = list(jieba.cut(query))

        # 计算所有文档的 BM25 分数
        scores = self.bm25.get_scores(tokenized_query)

        # 按分数排序，返回 top_k
        ranked_indices = sorted(
            range(len(scores)),
            key=lambda i: scores[i],
            reverse=True
        )[:top_k]

        return [
            {
                "rank": rank + 1,
                "doc": self.documents[idx],
                "score": float(scores[idx]),
            }
            for rank, idx in enumerate(ranked_indices)
        ]

# 使用示例
retriever = BM25Retriever(corpus)
results = retriever.retrieve("苹果公司CEO", top_k=5)`;

export default function S15_BM25_Code() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.yellow, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            BM25 实现代码 — rank_bm25
          </Title>
          <Tag style={{ background: colors.yellow, color: colors.dark, marginLeft: 'auto' }}>
            Implementation
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Code */}
          <div
            style={{
              background: colors.darkBg,
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              padding: '16px 20px',
              flex: 1.3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: colors.yellow,
                letterSpacing: 2,
                marginBottom: 12,
                borderBottom: '1px solid #333',
                paddingBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              bm25_retriever.py
            </div>
            <pre
              style={{
                fontFamily: "'Space Mono', 'Fira Code', monospace",
                fontSize: 11.5,
                color: '#e0e0e0',
                lineHeight: 1.65,
                margin: 0,
                whiteSpace: 'pre',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {code.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#');
                const isKeyword = /^(from|import|def|class|return|for|if|self|list)\b/.test(line.trim());
                return (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      color: isComment ? '#6b7280' : isKeyword ? colors.yellow : '#e0e0e0',
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Right: Explanation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '18px 18px',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: colors.dark, marginBottom: 12 }}>
                代码核心步骤
              </div>
              {[
                { num: '1', text: '分词：将每个文档切成词语列表（中文用jieba）' },
                { num: '2', text: '建索引：BM25Okapi 自动计算 TF-IDF 和长度统计' },
                { num: '3', text: '查询分词：将查询词同样进行分词处理' },
                { num: '4', text: '评分：调用 get_scores() 得到所有文档的 BM25 分数' },
                { num: '5', text: '排序：按分数降序，返回 top_k 结果' },
              ].map((s) => (
                <div
                  key={s.num}
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: '7px 0',
                    borderBottom: '1px solid #f0f0f0',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      background: colors.yellow,
                      border: '2px solid black',
                      fontSize: 11,
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </div>
                  <span style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{s.text}</span>
                </div>
              ))}
            </Card>

            <Card
              style={{
                border: '3px solid black',
                boxShadow: '4px 4px 0 black',
                background: '#fff',
                padding: '14px 16px',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>
                安装依赖
              </div>
              <div
                style={{
                  background: colors.darkBg,
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: colors.green,
                  marginBottom: 8,
                }}
              >
                pip install rank-bm25 jieba
              </div>
              <div style={{ fontSize: 12, color: '#777' }}>
                英文文档可直接用 str.split()，无需 jieba
              </div>
            </Card>

            <BulletList
              items={[
                { icon: '⚡', text: 'BM25Okapi 是最常用的 BM25 变体' },
                { icon: '🎯', text: '无需 GPU，纯 Python 即可运行' },
                { icon: '🔄', text: '可与向量检索无缝集成到 RRF 中' },
              ]}
              style={{
                border: `3px solid ${colors.yellow}`,
                boxShadow: `4px 4px 0 ${colors.yellow}`,
                background: '#fffdf0',
                padding: '12px 14px',
              }}
            />
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
