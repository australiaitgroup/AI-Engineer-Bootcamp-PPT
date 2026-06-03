import React from 'react';
import { Slide, Inner, Title, Card, Tag, Grid } from '../ui';
import { colors } from '../../styles/theme';

const components = [
  {
    step: '01',
    name: 'LLMGraphTransformer',
    icon: '🤖',
    color: colors.blue,
    desc: '使用 LLM 从非结构化文本中自动抽取实体和关系，生成图文档（GraphDocument）',
    input: '原始文本 (Document)',
    output: 'GraphDocument（节点 + 关系）',
    code: 'from langchain_experimental.graph_transformers\n  import LLMGraphTransformer',
  },
  {
    step: '02',
    name: 'Neo4jGraph',
    icon: '🕸️',
    color: colors.green,
    desc: '连接 Neo4j 数据库，将 GraphDocument 持久化存储，并提供查询接口',
    input: 'GraphDocument',
    output: 'Neo4j 图数据库中的节点和关系',
    code: 'from langchain_neo4j import Neo4jGraph\ngraph = Neo4jGraph(url, user, pwd)',
  },
  {
    step: '03',
    name: 'GraphCypherQAChain',
    icon: '⛓️',
    color: colors.yellow,
    desc: 'LLM 将自然语言转成 Cypher，执行查询，再将结果转为自然语言答案',
    input: '自然语言问题',
    output: '基于图数据的自然语言答案',
    code: 'from langchain_neo4j import GraphCypherQAChain\nchain = GraphCypherQAChain.from_llm(llm, graph)',
  },
];

export default function S12_LangChainGraphRAG() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.blue, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            LangChain GraphRAG 三大组件
          </Title>
          <Tag style={{ background: colors.blue, color: '#fff', marginLeft: 'auto' }}>
            LangChain
          </Tag>
        </div>

        {/* Flow arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            background: '#f5f5f5',
            border: '2px solid #ddd',
            padding: '8px 20px',
            fontSize: 13,
            fontWeight: 700,
            color: '#666',
          }}
        >
          <span>文本 → </span>
          <span style={{ color: colors.blue }}>LLMGraphTransformer</span>
          <span> → 图 → </span>
          <span style={{ color: colors.green }}>Neo4jGraph</span>
          <span> → 存储 → 问题 → </span>
          <span style={{ color: colors.yellow === colors.yellow ? colors.dark : colors.yellow }}>GraphCypherQAChain</span>
          <span> → 答案</span>
        </div>

        {/* Three component cards */}
        <Grid cols={3} style={{ flex: 1, gap: 24 }}>
          {components.map((comp) => (
            <Card
              key={comp.step}
              style={{
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                borderTop: `8px solid ${comp.color}`,
              }}
            >
              {/* Step + Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: comp.color,
                    border: '2px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 900,
                    color: comp.color === colors.yellow ? colors.dark : '#fff',
                    flexShrink: 0,
                  }}
                >
                  {comp.step}
                </div>
                <span style={{ fontSize: 20 }}>{comp.icon}</span>
              </div>

              {/* Name */}
              <div style={{ fontSize: 17, fontWeight: 900, color: colors.dark, lineHeight: 1.2 }}>
                {comp.name}
              </div>

              {/* Description */}
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{comp.desc}</div>

              {/* Input/Output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                <div
                  style={{
                    background: '#f0f7ff',
                    border: '1px solid #d0e4ff',
                    padding: '5px 10px',
                    fontSize: 11,
                    color: '#1e40af',
                  }}
                >
                  ↓ 输入：{comp.input}
                </div>
                <div
                  style={{
                    background: '#f0fff4',
                    border: '1px solid #bbf7d0',
                    padding: '5px 10px',
                    fontSize: 11,
                    color: '#166534',
                  }}
                >
                  ↑ 输出：{comp.output}
                </div>
              </div>

              {/* Code snippet */}
              <div
                style={{
                  background: colors.darkBg,
                  padding: '10px 12px',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#ccc',
                  lineHeight: 1.6,
                  whiteSpace: 'pre',
                  marginTop: 'auto',
                }}
              >
                {comp.code}
              </div>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Slide>
  );
}
