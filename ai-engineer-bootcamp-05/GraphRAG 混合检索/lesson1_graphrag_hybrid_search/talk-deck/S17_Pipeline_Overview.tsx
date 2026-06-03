import React from 'react';
import { Slide, Inner, Title, Card, Tag, Grid } from '../ui';
import { colors } from '../../styles/theme';

const steps = [
  {
    num: 1,
    phase: 'Indexing',
    title: '文档加载 & 切分',
    desc: '使用 LangChain 文档加载器读取数据源（PDF、网页、数据库），用 TextSplitter 切成合适大小的 chunks',
    tech: 'DocumentLoader + RecursiveTextSplitter',
    color: colors.blue,
    icon: '📄',
  },
  {
    num: 2,
    phase: 'Indexing',
    title: '向量索引构建',
    desc: '用 Embedding 模型将 chunks 转为向量，存入向量数据库（ChromaDB / OpenSearch）',
    tech: 'OpenAIEmbeddings + ChromaDB',
    color: colors.blue,
    icon: '🔢',
  },
  {
    num: 3,
    phase: 'Indexing',
    title: 'BM25 索引构建',
    desc: '对同一批 chunks 建立 BM25 关键词索引（内存中，或存入 OpenSearch BM25 字段）',
    tech: 'rank_bm25.BM25Okapi',
    color: colors.yellow,
    icon: '🔤',
  },
  {
    num: 4,
    phase: 'Indexing',
    title: '知识图谱构建',
    desc: '用 LLMGraphTransformer 从文本中抽取实体和关系，写入 Neo4j 图数据库',
    tech: 'LLMGraphTransformer + Neo4jGraph',
    color: colors.green,
    icon: '🕸️',
  },
  {
    num: 5,
    phase: 'Retrieval',
    title: '三路并行检索',
    desc: '收到用户查询后，同时触发向量、BM25、图三路检索，各返回 top-k 文档列表',
    tech: 'asyncio.gather() 并行执行',
    color: colors.green,
    icon: '⚡',
  },
  {
    num: 6,
    phase: 'Fusion',
    title: 'RRF 融合 + 生成',
    desc: '用 RRF 算法合并三路排名，取 top-k 文档作为 context，送入 LLM 生成最终答案',
    tech: 'reciprocal_rank_fusion() + ChatOpenAI',
    color: colors.red,
    icon: '🎯',
  },
];

export default function S17_Pipeline_Overview() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.dark, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            完整 Pipeline — 六步流程
          </Title>
          <Tag style={{ background: colors.dark, color: '#fff', marginLeft: 'auto' }}>
            Full Pipeline
          </Tag>
        </div>

        <Grid cols={3} style={{ flex: 1, gap: 16 }}>
          {steps.map((step) => (
            <Card
              key={step.num}
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderLeft: `8px solid ${step.color}`,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: step.color,
                    border: '2px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    fontWeight: 900,
                    color: step.color === colors.yellow ? colors.dark : '#fff',
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <span style={{ fontSize: 18 }}>{step.icon}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: step.color,
                    letterSpacing: 1,
                    background: step.color + '22',
                    padding: '2px 8px',
                    border: `1px solid ${step.color}`,
                  }}
                >
                  {step.phase}
                </span>
              </div>

              {/* Title */}
              <div style={{ fontSize: 16, fontWeight: 900, color: colors.dark }}>
                {step.title}
              </div>

              {/* Description */}
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, flex: 1 }}>
                {step.desc}
              </div>

              {/* Tech badge */}
              <div
                style={{
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  padding: '4px 8px',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: '#444',
                  marginTop: 'auto',
                }}
              >
                {step.tech}
              </div>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Slide>
  );
}
