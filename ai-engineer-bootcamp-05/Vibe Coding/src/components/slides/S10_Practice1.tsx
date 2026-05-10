import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

export default function S10_Practice1() {
  return (
    <Slide bg={colors.dark} style={{ position: 'relative' }}>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${violet}20 0%, transparent 70%)` }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: violet, border: `2px solid ${colors.black}`, boxShadow: '4px 4px 0 #000', marginBottom: 16 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, letterSpacing: 2 }}>HANDS-ON PRACTICE 1</span>
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, color: colors.white, lineHeight: 1.1, letterSpacing: -2 }}>
            实战练习 1
          </h1>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: violet, marginTop: 8 }}>
            写你自己项目的 CONTEXT.md
          </h2>
          <div style={{ width: 60, height: 4, background: violet, margin: '16px auto 0' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ border, boxShadow: shadow, overflow: 'hidden', textAlign: 'left', width: 700 }}>
            <div style={{ background: violet, padding: '12px 20px', borderBottom: border }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white }}>📋 任务说明</span>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.05)' }}>
              {[
                { step: '1', task: '打开你自己的一个项目（或用今晚我们 fork 的 demo）' },
                { step: '2', task: '在根目录创建 CONTEXT.md 文件' },
                { step: '3', task: '填写：项目简介、技术栈、项目结构、编码规范' },
                { step: '4', task: '（可选）补充：当前阶段、已知问题、注意事项' },
              ].map(({ step, task }) => (
                <div key={step} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, background: violet, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${colors.black}` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.white, fontWeight: 700 }}>{step}</span>
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: 15, color: colors.white, lineHeight: 1.5, opacity: 0.9 }}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ padding: '10px 24px', background: '#fbbf24', border: `3px solid ${colors.black}`, boxShadow: '4px 4px 0 #000' }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900, color: colors.black }}>⏱ 5 分钟</span>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>完成后我们一起看几个例子</span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
