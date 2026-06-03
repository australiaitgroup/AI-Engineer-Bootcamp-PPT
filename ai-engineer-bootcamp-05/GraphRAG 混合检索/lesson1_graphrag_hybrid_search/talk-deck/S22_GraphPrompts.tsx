import React from 'react';
import { Slide, Inner, Half, Title, Card, Tag, BulletList } from '../ui';
import { colors } from '../../styles/theme';

const promptTemplate = `CYPHER_GENERATION_TEMPLATE = """
你是一位 Neo4j Cypher 专家。
根据下面的图 Schema 和用户问题，生成一条精确的 Cypher 查询。

Schema:
{schema}

重要规则：
1. 只使用 Schema 中存在的节点标签和关系类型
2. 不要使用不存在的属性
3. 对于文本匹配，使用 CONTAINS 或 toLower() 而非精确等号
4. 多跳查询使用模式路径：(a)-[:R1]->(b)-[:R2]->(c)
5. 始终使用 LIMIT 限制结果（默认 LIMIT 10）
6. 返回有意义的字段名，使用 AS 别名

用户问题：{question}

Cypher 查询（只输出查询语句，不要解释）：
"""

from langchain.prompts import PromptTemplate
cypher_prompt = PromptTemplate(
    input_variables=["schema", "question"],
    template=CYPHER_GENERATION_TEMPLATE
)

chain = GraphCypherQAChain.from_llm(
    llm=ChatOpenAI(model="gpt-4o", temperature=0),
    graph=graph_db,
    cypher_prompt=cypher_prompt,
    verbose=True,           # 显示生成的 Cypher（调试用）
    return_intermediate_steps=True,  # 返回中间步骤
    top_k=10,               # 最多返回 10 条图查询结果
)`;

export default function S22_GraphPrompts() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.yellow, border: '2px solid black' }} />
          <Title style={{ fontSize: 40, fontWeight: 900, color: colors.dark }}>
            Prompt Master — 优化 Cypher 生成
          </Title>
          <Tag style={{ background: colors.yellow, color: colors.dark, marginLeft: 'auto' }}>
            graph-prompts
          </Tag>
        </div>

        <Half style={{ flex: 1, gap: 28 }}>
          {/* Left: Prompt template code */}
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
              cypher_prompt_template.py
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
              {promptTemplate.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#');
                const isKeyword = /^(from|import|chain|cypher_prompt)\b/.test(line.trim());
                const isString = line.includes('"""');
                const isRule = /^\d+\./.test(line.trim());
                return (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      color: isComment
                        ? '#6b7280'
                        : isString
                        ? '#a3e635'
                        : isRule
                        ? colors.yellow
                        : isKeyword
                        ? colors.blue
                        : '#e0e0e0',
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Right: Tips */}
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
                提升 Cypher 生成质量的技巧
              </div>
              {[
                {
                  tip: '提供完整 Schema',
                  detail: '在 Prompt 中包含节点类型、关系类型和关键属性，LLM 才知道图的结构',
                  color: colors.green,
                },
                {
                  tip: 'CONTAINS 替代 =',
                  detail: '用户输入"苹果"时，用 WHERE n.name CONTAINS "苹果" 避免精确匹配失败',
                  color: colors.blue,
                },
                {
                  tip: '强制加 LIMIT',
                  detail: '没有 LIMIT 的查询可能返回百万行，导致超时或 context 过长',
                  color: colors.yellow,
                },
                {
                  tip: 'verbose=True 调试',
                  detail: '开发期间打开 verbose，查看 LLM 实际生成的 Cypher，快速定位问题',
                  color: colors.red,
                },
              ].map((item) => (
                <div
                  key={item.tip}
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: item.color,
                      border: '1px solid black',
                      flexShrink: 0,
                      marginTop: 5,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: colors.dark }}>{item.tip}</div>
                    <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </Card>

            <BulletList
              items={[
                { icon: '🎯', text: '使用 return_intermediate_steps=True 可查看 Cypher 执行结果' },
                { icon: '🔄', text: '加入 few-shot 示例：在 Prompt 中放2-3个Q→Cypher对' },
                { icon: '⚠️', text: '避免让 LLM 生成 DELETE/MERGE 等写操作' },
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
