import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag } from '../ui';
import { colors } from '../../styles/theme';

const code = `from langchain_openai import ChatOpenAI
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_core.documents import Document

# 1. 初始化 LLM（支持 OpenAI / DeepSeek / Ollama）
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)

# 2. 创建图转换器
llm_transformer = LLMGraphTransformer(
    llm=llm,
    # 可选：限定实体类型
    allowed_nodes=["Person", "Company", "University", "Location"],
    # 可选：限定关系类型
    allowed_relationships=["CEO_OF", "STUDIED_AT", "LOCATED_IN", "FOUNDED_BY"],
)

# 3. 准备文档
documents = [
    Document(page_content="""
        Tim Cook is the CEO of Apple Inc., which he joined in 1998.
        Cook graduated from Auburn University with a degree in
        industrial engineering in 1982. Auburn is located in
        Alabama, United States.
    """)
]

# 4. 转换为图文档
graph_documents = llm_transformer.convert_to_graph_documents(documents)

# 5. 查看提取结果
for doc in graph_documents:
    print("Nodes:", doc.nodes)
    print("Relationships:", doc.relationships)

# 输出示例：
# Nodes: [Node(id='Tim Cook', type='Person'),
#         Node(id='Apple Inc', type='Company'),
#         Node(id='Auburn University', type='University')]
# Relationships: [Rel(source='Tim Cook', target='Apple Inc', type='CEO_OF'),
#                 Rel(source='Tim Cook', target='Auburn University', type='STUDIED_AT')]`;

export default function S13_EntityExtraction() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.blue, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            LLMGraphTransformer — 实体抽取代码
          </Title>
          <Tag style={{ background: colors.blue, color: '#fff', marginLeft: 'auto' }}>
            Step 01
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Code (large) */}
          <div
            style={{
              background: colors.darkBg,
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              padding: '16px 20px',
              flex: 1.4,
              overflow: 'hidden',
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
              entity_extraction.py
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
              }}
            >
              {code.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#');
                const isKeyword = /^(from|import|def|class|return|for|if|print)\b/.test(line.trim());
                return (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      color: isComment ? '#6b7280' : isKeyword ? colors.blue : '#e0e0e0',
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Right: Key points */}
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
                关键参数说明
              </div>
              {[
                { param: 'allowed_nodes', desc: '限制 LLM 只抽取指定类型的实体，避免噪声' },
                { param: 'allowed_relationships', desc: '限制关系类型，让图结构更规范' },
                { param: 'temperature=0', desc: '实体抽取需要确定性输出，temperature 设为 0' },
              ].map((item) => (
                <div
                  key={item.param}
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0',
                    alignItems: 'flex-start',
                  }}
                >
                  <code
                    style={{
                      background: '#eff6ff',
                      border: '1px solid #c7d2fe',
                      padding: '2px 8px',
                      fontSize: 11,
                      fontFamily: 'monospace',
                      color: colors.blue,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {item.param}
                  </code>
                  <span style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{item.desc}</span>
                </div>
              ))}
            </Card>

            <Card
              style={{
                border: `3px solid ${colors.green}`,
                boxShadow: `6px 6px 0 ${colors.green}`,
                background: '#f0fff4',
                padding: '16px 18px',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>
                支持的 LLM 模型
              </div>
              {['OpenAI GPT-4o / GPT-4o-mini', 'DeepSeek Chat', 'Anthropic Claude', 'Ollama (本地部署)'].map(
                (m) => (
                  <div key={m} style={{ fontSize: 13, color: '#166534', padding: '3px 0' }}>
                    ✓ {m}
                  </div>
                )
              )}
            </Card>

            <Card
              style={{
                border: `3px solid ${colors.yellow}`,
                boxShadow: `4px 4px 0 ${colors.yellow}`,
                background: '#fffdf0',
                padding: '14px 16px',
                fontSize: 13,
                color: colors.dark,
              }}
            >
              <strong>💡 提示：</strong> 生产环境建议使用 GPT-4o，
              实体抽取质量更稳定；学习阶段 GPT-4o-mini 即可满足需求
            </Card>
          </div>
        </Half>
      </Inner>
    </Slide>
  );
}
