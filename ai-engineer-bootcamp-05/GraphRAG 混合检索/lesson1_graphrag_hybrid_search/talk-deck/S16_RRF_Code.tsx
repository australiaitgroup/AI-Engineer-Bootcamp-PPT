import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag } from '../ui';
import { colors } from '../../styles/theme';

const code = `def reciprocal_rank_fusion(
    results_list: list[list[dict]],
    k: int = 60
) -> list[dict]:
    """
    将多路检索结果用 RRF 算法融合排序。

    Args:
        results_list: 多路检索结果列表，每路是
                      [{"doc": ..., "score": ...}, ...]
        k: RRF 常数，通常取 60（防止 rank=1 过于主导）

    Returns:
        按 RRF 分数降序排列的融合结果列表
    """
    fused_scores: dict[str, float] = {}
    doc_map: dict[str, dict] = {}

    for results in results_list:
        for rank, item in enumerate(results):
            doc_id = item["doc"]  # 用文档内容作为唯一标识

            # 记录文档原始内容（用于后续返回）
            doc_map[doc_id] = item

            # RRF 核心公式：累加 1/(k + rank)
            if doc_id not in fused_scores:
                fused_scores[doc_id] = 0.0
            fused_scores[doc_id] += 1.0 / (k + rank + 1)

    # 按 RRF 分数降序排序
    sorted_docs = sorted(
        fused_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    # 构造返回结果
    return [
        {
            "doc": doc_id,
            "rrf_score": round(score, 6),
            **doc_map[doc_id],
        }
        for doc_id, score in sorted_docs
    ]


# ── 使用示例 ──────────────────────────────────
vector_results = vector_retriever.retrieve(query, top_k=10)
bm25_results   = bm25_retriever.retrieve(query, top_k=10)
graph_results  = graph_retriever.retrieve(query, top_k=10)

fused = reciprocal_rank_fusion(
    [vector_results, bm25_results, graph_results],
    k=60
)
print(fused[:3])  # 前3名融合结果`;

export default function S16_RRF_Code() {
  return (
    <Slide style={{ background: colors.darkBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.yellow, border: '2px solid #555' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: '#fff' }}>
            RRF 融合函数 — Python 实现
          </Title>
          <Tag style={{ background: colors.yellow, color: colors.dark, marginLeft: 'auto' }}>
            reciprocal_rank_fusion()
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 24 }}>
          {/* Left: Full code */}
          <div
            style={{
              border: '3px solid #444',
              boxShadow: '6px 6px 0 #333',
              padding: '16px 20px',
              flex: 1.5,
              display: 'flex',
              flexDirection: 'column',
              background: '#111',
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
              rrf_fusion.py
            </div>
            <pre
              style={{
                fontFamily: "'Space Mono', 'Fira Code', monospace",
                fontSize: 11,
                color: '#e0e0e0',
                lineHeight: 1.65,
                margin: 0,
                whiteSpace: 'pre',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {code.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#') || line.trim().startsWith('"""') || line.trim().startsWith('Args') || line.trim().startsWith('Returns');
                const isKeyword = /^(def|return|for|if|in|not)\b/.test(line.trim());
                const isSeparator = line.includes('──');
                return (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      color: isComment
                        ? '#6b7280'
                        : isSeparator
                        ? '#444'
                        : isKeyword
                        ? colors.yellow
                        : '#e0e0e0',
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Right: Annotations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                title: 'k = 60 的含义',
                desc: '当 k=60 时，rank=1 的文档得分为 1/61≈0.0164，rank=100 为 1/160≈0.0063。k 越大，排名靠后的文档影响越大（更平滑）',
                color: colors.yellow,
              },
              {
                title: '为什么用 rank 而非 score',
                desc: '不同检索器的分数量纲完全不同：余弦相似度 [0,1]，BM25 可以是任意正数，图权重又是另一套。RRF 只看排名位置，消除了这种不可比性',
                color: colors.blue,
              },
              {
                title: '文档去重',
                desc: '同一文档可能在多个检索路径中出现，RRF 自动累加其在各路的分数，相当于对"多路认可"的文档给予奖励',
                color: colors.green,
              },
              {
                title: 'rank + 1 的原因',
                desc: 'Python 的 enumerate 从 0 开始，但 RRF 公式中 rank 应从 1 开始，所以要 +1 修正',
                color: colors.red,
              },
            ].map((item) => (
              <Card
                key={item.title}
                style={{
                  border: `3px solid ${item.color}`,
                  boxShadow: `4px 4px 0 ${item.color}`,
                  background: '#1e1e1e',
                  padding: '12px 14px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6 }}>{item.desc}</div>
              </Card>
            ))}
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
