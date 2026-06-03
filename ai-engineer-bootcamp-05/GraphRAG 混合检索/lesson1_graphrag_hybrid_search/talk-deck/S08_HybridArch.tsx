import React from 'react';
import { Slide, Inner, Title, Card, Grid, Tag } from '../ui';
import { colors } from '../../styles/theme';

function ArchColumn({
  icon,
  label,
  sublabel,
  tech,
  color,
}: {
  icon: string;
  label: string;
  sublabel: string;
  tech: string;
  color: string;
}) {
  return (
    <Card
      style={{
        border: '3px solid black',
        boxShadow: '6px 6px 0 black',
        background: '#fff',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        borderTop: `8px solid ${color}`,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 36 }}>{icon}</div>
      <div style={{ fontSize: 20, fontWeight: 900, color: colors.dark }}>{label}</div>
      <div style={{ fontSize: 14, color: '#555', lineHeight: 1.5 }}>{sublabel}</div>
      <div
        style={{
          background: color,
          border: '2px solid black',
          padding: '4px 14px',
          fontSize: 12,
          fontWeight: 700,
          color: color === colors.yellow ? colors.dark : '#fff',
        }}
      >
        {tech}
      </div>
    </Card>
  );
}

export default function S08_HybridArch() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 20,
          paddingTop: 40,
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.blue, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            三路融合架构总览
          </Title>
          <Tag style={{ background: colors.blue, color: '#fff', marginLeft: 'auto' }}>
            Architecture
          </Tag>
        </div>

        {/* Query input */}
        <div
          style={{
            border: '3px solid black',
            boxShadow: '4px 4px 0 black',
            background: colors.dark,
            color: '#fff',
            padding: '12px 24px',
            fontSize: 18,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          📝 用户查询 (Query)
        </div>

        {/* Down arrow */}
        <div style={{ textAlign: 'center', fontSize: 20, color: colors.dark, fontWeight: 900 }}>↓ 并行检索</div>

        {/* Three columns */}
        <Grid cols={3} style={{ gap: 20 }}>
          <ArchColumn
            icon="🔢"
            label="向量检索"
            sublabel="语义相似度匹配，召回语义相关文档"
            tech="ChromaDB / OpenSearch"
            color={colors.blue}
          />
          <ArchColumn
            icon="🔤"
            label="BM25 检索"
            sublabel="关键词精确匹配，召回词形相关文档"
            tech="rank_bm25 / OpenSearch"
            color={colors.yellow}
          />
          <ArchColumn
            icon="🕸️"
            label="图检索"
            sublabel="实体关系遍历，多跳推理精确关联"
            tech="Neo4j + Cypher"
            color={colors.green}
          />
        </Grid>

        {/* Down arrow to RRF */}
        <div style={{ textAlign: 'center', fontSize: 20, color: colors.dark, fontWeight: 900 }}>
          ↓ 三路结果列表
        </div>

        {/* RRF box */}
        <div
          style={{
            border: '3px solid black',
            boxShadow: '6px 6px 0 black',
            background: colors.yellow,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 900, color: colors.dark }}>⚡ RRF 融合排序</span>
          <span style={{ fontSize: 15, color: colors.dark, fontWeight: 600 }}>
            score(d) = Σ 1/(k + rank_i(d))
          </span>
        </div>

        {/* Down arrow to Final */}
        <div style={{ textAlign: 'center', fontSize: 20, color: colors.dark, fontWeight: 900 }}>↓</div>

        {/* Final result */}
        <div
          style={{
            border: '3px solid black',
            boxShadow: '6px 6px 0 black',
            background: colors.green,
            color: '#fff',
            padding: '16px 24px',
            fontSize: 20,
            fontWeight: 900,
            textAlign: 'center',
          }}
        >
          ✅ 最终融合结果 → LLM 生成回答
        </div>
      </Inner>
    </Slide>
  );
}
