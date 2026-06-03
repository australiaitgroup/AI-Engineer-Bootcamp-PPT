import React from 'react';
import { Slide, Inner, Title, Card, Tag, Stagger, StaggerItem } from '../ui';
import { colors } from '../../styles/theme';

const tips = [
  {
    num: '01',
    title: '让 AI 设计图 Schema',
    desc: '把你的业务描述给 Claude/GPT，让它帮你设计 allowed_nodes 和 allowed_relationships。比自己想更全面，还能发现你没考虑到的实体关系。',
    prompt: '"我有电商订单数据，帮我设计一个知识图谱 Schema，包含用户、商品、订单、品牌等实体"',
    color: colors.blue,
    icon: '🤖',
  },
  {
    num: '02',
    title: 'Cypher 调试 Loop',
    desc: '把 graph.schema 和错误信息贴给 AI，让它修复 Cypher 语法。AI 对 Cypher 的掌握远超大多数工程师，10秒能搞定你研究半小时的语法问题。',
    prompt: '"这是我的图 Schema: {schema}，生成的 Cypher 报错: {error}，帮我修复"',
    color: colors.green,
    icon: '🔧',
  },
  {
    num: '03',
    title: 'RAG 数据管道自动化',
    desc: 'Vibe Coding 核心：描述你的数据处理需求（什么数据源、怎么切分、需要什么实体），让 AI 生成完整的 data-rag Pipeline 代码，包括错误处理和批处理逻辑。',
    prompt: '"写一个 data-rag Pipeline，从 S3 读取 PDF，用 LLMGraphTransformer 提取实体，写入 Neo4j，每批100个文档"',
    color: colors.yellow,
    icon: '⚡',
  },
];

export default function S23_VibeCoding() {
  return (
    <Slide style={{ background: colors.darkBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 28, paddingTop: 48 }}>
        {/* Title */}
        <Stagger>
          <StaggerItem>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 56,
                  background: colors.yellow,
                  border: '2px solid #555',
                }}
              />
              <div>
                <Title style={{ fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                  Vibe Coding:
                </Title>
                <span
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    color: colors.yellow,
                    lineHeight: 1,
                    display: 'block',
                    fontFamily: 'monospace',
                  }}
                >
                  data-rag
                </span>
              </div>
              <Tag
                style={{
                  background: colors.yellow,
                  color: colors.dark,
                  marginLeft: 'auto',
                  fontSize: 14,
                }}
              >
                AI-Assisted Engineering
              </Tag>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div
              style={{
                fontSize: 16,
                color: '#aaa',
                fontWeight: 600,
                borderLeft: `3px solid ${colors.yellow}`,
                paddingLeft: 16,
              }}
            >
              用 AI 辅助构建 RAG 数据工程 — 让 Claude/GPT 成为你的图数据工程师
            </div>
          </StaggerItem>

          {/* Tips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {tips.map((tip) => (
              <StaggerItem key={tip.num}>
                <Card
                  style={{
                    border: `3px solid ${tip.color}`,
                    boxShadow: `6px 6px 0 ${tip.color}`,
                    background: '#1e1e1e',
                    padding: '18px 22px',
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Number + Icon */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: tip.color,
                        border: '2px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 900,
                        color: tip.color === colors.yellow ? colors.dark : '#fff',
                      }}
                    >
                      {tip.num}
                    </div>
                    <span style={{ fontSize: 20 }}>{tip.icon}</span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
                      {tip.title}
                    </div>
                    <div style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6, marginBottom: 10 }}>
                      {tip.desc}
                    </div>
                    {/* Prompt example */}
                    <div
                      style={{
                        background: '#111',
                        border: `1px solid ${tip.color}55`,
                        padding: '8px 12px',
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: tip.color,
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                      }}
                    >
                      💬 {tip.prompt}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Inner>
    </Slide>
  );
}
