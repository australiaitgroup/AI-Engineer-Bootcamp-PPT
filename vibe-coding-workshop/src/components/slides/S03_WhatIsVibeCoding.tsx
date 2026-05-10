import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const comparison = [
  { aspect: '入门门槛', old: '需要学语法、记 API', new: '说人话，AI 翻译成代码' },
  { aspect: '开发速度', old: '思考 → 搜索 → 写代码 → 调试', new: '描述需求 → AI 生成 → 验证' },
  { aspect: '主要瓶颈', old: '记忆语法、找 API 文档', new: '描述清楚需求 + 判断输出质量' },
  { aspect: '调试方式', old: '自己逐行 debug', new: '把错误贴给 AI，AI 给方案' },
  { aspect: '适合人群', old: '专职工程师', new: '任何有想法的人' },
];

export default function S03_WhatIsVibeCoding() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 56 }}>
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · INTRO</span>
            <Title style={{ marginTop: 8 }}>什么是<br /><span style={{ color: violet }}>Vibe Coding?</span></Title>
            <Divider color={violet} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <div style={{ padding: '20px 22px', background: violet, border, boxShadow: shadow }}>
              <p style={{ fontFamily: fonts.body, fontSize: 16, color: colors.white, lineHeight: 1.6, fontWeight: 500 }}>
                <strong>Vibe Coding</strong> = 用自然语言描述你想要的效果，让 AI 把"感觉"直接变成可运行的代码
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🎯', text: '"帮我写一个登录表单，支持 Google 登录"' },
                { icon: '🔧', text: '"把这段代码改成支持分页"' },
                { icon: '🐛', text: '"这里报错了，帮我修一下"' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ padding: '10px 14px', background: `${violet}15`, border: `1px solid ${violet}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.dark, lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>传统编程 VS VIBE CODING</div>
            <div style={{ border, boxShadow: shadow, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', background: colors.dark }}>
                <div style={{ padding: '12px 16px', borderRight: `2px solid ${colors.black}` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>维度</span>
                </div>
                <div style={{ padding: '12px 16px', borderRight: `2px solid ${colors.black}` }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 14, color: '#ef4444', fontWeight: 800 }}>❌ 传统编程</span>
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 14, color: '#22c55e', fontWeight: 800 }}>✅ Vibe Coding</span>
                </div>
              </div>
              {comparison.map(({ aspect, old, new: newWay }, i) => (
                <div key={aspect} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', background: i % 2 === 0 ? '#fafafa' : colors.white, borderTop: `2px solid ${colors.black}` }}>
                  <div style={{ padding: '12px 16px', borderRight: `2px solid ${colors.black}`, background: `${violet}10` }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800, color: colors.dark }}>{aspect}</span>
                  </div>
                  <div style={{ padding: '12px 16px', borderRight: `2px solid ${colors.black}` }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#c0392b' }}>{old}</span>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#065f46', fontWeight: 600 }}>{newWay}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div style={{ marginTop: 20, padding: '14px 20px', background: '#fbbf24', border, boxShadow: '4px 4px 0 #000' }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.black, fontWeight: 700 }}>
                💡 核心转变：从"怎么写代码"→"怎么描述清楚你想要什么"
              </p>
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
