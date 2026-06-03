import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag, Grid } from '../ui';
import { colors } from '../../styles/theme';

export default function S21_AWS_OpenSearch() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.blue, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            AWS OpenSearch Lab — 云端升级
          </Title>
          <Tag style={{ background: colors.blue, color: '#fff', marginLeft: 'auto' }}>
            Lab Session
          </Tag>
        </div>

        {/* Comparison: ChromaDB vs OpenSearch */}
        <Grid cols={2} style={{ gap: 28, flex: 1 }}>
          {/* ChromaDB */}
          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              borderTop: `8px solid #888`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>💻</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#666' }}>ChromaDB</div>
                <div style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>本地方案（学习 & 原型）</div>
              </div>
            </div>

            {[
              { pro: true, text: '零配置，pip install 即用' },
              { pro: true, text: '本地文件持久化' },
              { pro: true, text: '免费，无云账号需求' },
              { pro: false, text: '不支持分布式，单机限制' },
              { pro: false, text: '无内置 BM25（需额外实现）' },
              { pro: false, text: '不适合生产环境' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  color: item.pro ? '#166534' : '#888',
                  padding: '4px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <span>{item.pro ? '✅' : '⚠️'}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </Card>

          {/* OpenSearch */}
          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              borderTop: `8px solid ${colors.blue}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>☁️</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: colors.blue }}>AWS OpenSearch</div>
                <div style={{ fontSize: 12, color: colors.blue, fontWeight: 600 }}>云端方案（生产就绪）</div>
              </div>
            </div>

            {[
              { pro: true, text: '内置向量搜索 + BM25（一站式混合）' },
              { pro: true, text: '水平扩展，PB级数据支持' },
              { pro: true, text: 'AWS 全托管，免运维' },
              { pro: true, text: '与 LangChain 无缝集成' },
              { pro: true, text: 'KNN + BM25 混合检索原生支持' },
              { pro: false, text: '需要 AWS 账号和费用（有免费额度）' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  color: item.pro ? '#166534' : '#888',
                  padding: '4px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <span>{item.pro ? '✅' : '⚠️'}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </Card>
        </Grid>

        {/* Key features & Code snippet */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card
            style={{
              border: `3px solid ${colors.blue}`,
              boxShadow: `6px 6px 0 ${colors.blue}`,
              background: '#eff6ff',
              padding: '16px 18px',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: colors.dark, marginBottom: 10 }}>
              OpenSearch 混合检索架构
            </div>
            <div style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.7 }}>
              单一索引同时存储向量字段（knn_vector）和文本字段（text）
              <br />→ 一次查询同时跑 KNN 向量搜索 + BM25 关键词搜索
              <br />→ 内置 Hybrid Search API 完成融合，无需手写 RRF
            </div>
          </Card>
          <div
            style={{
              background: colors.darkBg,
              border: '3px solid black',
              boxShadow: '4px 4px 0 black',
              padding: '14px 16px',
              fontFamily: 'monospace',
              fontSize: 12,
              color: '#e0e0e0',
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: colors.blue, fontWeight: 700, marginBottom: 8 }}>langchain-opensearch</div>
            <div style={{ color: '#6b7280' }}># 安装</div>
            <div>pip install opensearch-py langchain-opensearch</div>
            <br />
            <div style={{ color: '#6b7280' }}># 初始化</div>
            <div>from langchain_opensearch import OpenSearchVectorSearch</div>
            <div>db = OpenSearchVectorSearch(</div>
            <div>&nbsp;&nbsp;index_name="hybrid-rag",</div>
            <div>&nbsp;&nbsp;embedding_function=embeddings,</div>
            <div>&nbsp;&nbsp;opensearch_url=OPENSEARCH_URL,</div>
            <div>)</div>
          </div>
        </div>
      </Inner>
    </Slide>
  );
}
