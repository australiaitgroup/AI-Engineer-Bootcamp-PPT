import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

const prices = [
  { model: 'claude-3-haiku', input: '$0.25', output: '$1.25', typical: '~$0.01/次任务', note: '日常小任务首选' },
  { model: 'claude-3.5-sonnet', input: '$3', output: '$15', typical: '~$0.05-0.20/次任务', note: '绝大多数任务用这个' },
  { model: 'claude-3-opus', input: '$15', output: '$75', typical: '~$0.50-2/次任务', note: '复杂任务才用' },
];

export default function S22_TokenBudget() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner split style={{ gap: 56 }}>
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: teal, letterSpacing: 2 }}>PART 3 · CLAUDE CODE</span>
            <Title style={{ marginTop: 8 }}>费用 &<br /><span style={{ color: teal }}>Token 预算技巧</span></Title>
            <Divider color={teal} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 4 }}>💰 省钱技巧</div>
              {[
                { tip: '只引用相关文件', detail: '不要 @整个项目，精准 @ 目标文件' },
                { tip: '/compact 压缩历史', detail: '长对话后执行，减少重复 token' },
                { tip: 'Haiku 做简单任务', detail: '格式转换、快速解释用便宜模型' },
                { tip: '本地模型做隐私任务', detail: 'Ollama + llama3 处理敏感代码' },
                { tip: '设置月度预算上限', detail: 'Anthropic 控制台设置 spending limit' },
              ].map(({ tip, detail }) => (
                <div key={tip} style={{ padding: '10px 14px', border: `1px solid ${teal}`, background: `${teal}08`, display: 'flex', gap: 10 }}>
                  <span style={{ color: teal, fontWeight: 900, flexShrink: 0 }}>✓</span>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.dark }}>{tip}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 12, color: '#666' }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 12 }}>参考价格（per 1M tokens）</div>
            <div style={{ border, boxShadow: shadow, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 130px 140px', background: colors.dark, borderBottom: `2px solid ${colors.black}` }}>
                {['Model', 'Input', 'Output', '典型消耗', '备注'].map((h) => (
                  <div key={h} style={{ padding: '10px 12px', borderRight: `1px solid rgba(255,255,255,0.1)` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{h}</span>
                  </div>
                ))}
              </div>
              {prices.map(({ model, input, output, typical, note }, i) => (
                <div key={model} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 130px 140px', background: i % 2 === 0 ? '#fafafa' : colors.white, borderBottom: `1px solid #eee` }}>
                  <div style={{ padding: '10px 12px', borderRight: `1px solid #eee` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700 }}>{model}</span>
                  </div>
                  <div style={{ padding: '10px 12px', borderRight: `1px solid #eee` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 13, color: '#22c55e', fontWeight: 700 }}>{input}</span>
                  </div>
                  <div style={{ padding: '10px 12px', borderRight: `1px solid #eee` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 13, color: '#f97316', fontWeight: 700 }}>{output}</span>
                  </div>
                  <div style={{ padding: '10px 12px', borderRight: `1px solid #eee` }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#555' }}>{typical}</span>
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#888' }}>{note}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ marginTop: 16, padding: '16px 20px', background: '#fbbf24', border, boxShadow: shadow }}>
              <div style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 800, color: colors.black, marginBottom: 8 }}>📊 现实参考</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { scenario: '一天写代码 8 小时', cost: '约 $1-5/天 (Sonnet)' },
                  { scenario: '一次全量代码 Review', cost: '约 $0.50-2' },
                  { scenario: '重构一个模块', cost: '约 $0.20-1' },
                  { scenario: '补一个模块的测试', cost: '约 $0.10-0.30' },
                ].map(({ scenario, cost }) => (
                  <div key={scenario} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.06)' }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 12, color: '#555' }}>{scenario}</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.black, fontWeight: 700 }}>{cost}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
