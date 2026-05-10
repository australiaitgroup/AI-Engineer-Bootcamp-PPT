import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const layers = [
  {
    layer: 'Layer 1', title: '项目级 Context', color: colors.dark,
    items: ['CONTEXT.md / CLAUDE.md / .cursorrules', '技术栈、架构、全局规范', '每次对话都生效'],
    icon: '🏛',
  },
  {
    layer: 'Layer 2', title: '任务级 Context', color: violet,
    items: ['你当前要做的功能的相关文件', '用 @file 或 @folder 引用', '按需提供，不要一次全塞'],
    icon: '📂',
  },
  {
    layer: 'Layer 3', title: '对话级 Context', color: '#14b8a6',
    items: ['本次对话的具体问题和背景', '之前的错误信息、你的尝试', '清晰描述期望输出'],
    icon: '💬',
  },
];

export default function S07_BuildContext() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 56 }}>
        <div style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · CONTEXT</span>
            <Title style={{ marginTop: 8 }}>什么是 Context？<br /><span style={{ color: violet }}>如何 Build Context?</span></Title>
            <Divider color={violet} />
            <p style={{ fontFamily: fonts.body, fontSize: 15, color: '#555', lineHeight: 1.6 }}>
              Context = <strong>AI 做出好回答所需要的所有信息</strong>。分三层来管理，清晰又高效。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ padding: '18px 20px', background: violet, border, boxShadow: shadow }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.white, fontWeight: 700, marginBottom: 10 }}>📐 好 Context 的公式</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  '项目背景（是什么、用什么技术）',
                  '相关文件（这次任务涉及的代码）',
                  '具体问题（要做什么、有什么约束）',
                  '期望输出（格式、风格、完整度）',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: 14 }}>{i + 1}.</span>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 12 }}>三层 CONTEXT 架构</div>
          </motion.div>

          {layers.map(({ layer, title, color, items, icon }, i) => (
            <motion.div key={layer} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.12 }}>
              <div style={{ display: 'flex', gap: 0, border, boxShadow: '4px 4px 0 #000', overflow: 'hidden' }}>
                <div style={{ width: 72, background: color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 8px', gap: 4, flexShrink: 0 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: 1, textAlign: 'center' }}>{layer}</span>
                </div>
                <div style={{ flex: 1, padding: '16px 18px', background: '#fafafa', borderLeft: `2px solid ${colors.black}` }}>
                  <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 800, color, marginBottom: 8 }}>{title}</div>
                  {items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                      <span style={{ color, fontWeight: 900 }}>▸</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div style={{ padding: '12px 16px', background: '#fbbf24', border, boxShadow: '4px 4px 0 #000' }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
                🔑 原则：每层 Context 短而聚焦，不要什么都塞进一个大 Prompt
              </p>
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
