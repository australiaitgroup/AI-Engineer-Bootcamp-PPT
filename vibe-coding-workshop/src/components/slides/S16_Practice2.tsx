import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const pink = '#ec4899';

export default function S16_Practice2() {
  return (
    <Slide bg={colors.dark} style={{ position: 'relative' }}>
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${pink}18 0%, transparent 70%)` }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: pink, border: `2px solid ${colors.black}`, boxShadow: '4px 4px 0 #000', marginBottom: 16 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, letterSpacing: 2 }}>HANDS-ON PRACTICE 2</span>
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: colors.white, lineHeight: 1.1, letterSpacing: -2 }}>
            实战练习 2
          </h1>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700, color: pink, marginTop: 8 }}>
            Cursor 生成 + Debug 完整功能
          </h2>
          <div style={{ width: 60, height: 4, background: pink, margin: '16px auto 0' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ border, boxShadow: shadow, overflow: 'hidden', textAlign: 'left', width: '100%', maxWidth: 800 }}>
            <div style={{ background: pink, padding: '12px 20px', borderBottom: border }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white }}>📋 任务：给 Demo 项目加一个搜索功能</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                {
                  step: 'Step 1', title: '用 Composer 生成搜索功能', time: '5 min',
                  detail: '打开 Cmd+I，@引用相关文件，用公式写 Prompt，生成搜索栏 + 过滤逻辑',
                  color: pink,
                },
                {
                  step: 'Step 2', title: '找到一个 Bug 并修复', time: '5 min',
                  detail: '故意触发边界条件（空搜索/特殊字符），把报错贴给 Chat，让 AI 修复',
                  color: '#8b5cf6',
                },
                {
                  step: 'Step 3', title: '加一个小优化', time: '5 min',
                  detail: '用 Chat 模式加防抖（debounce）或高亮匹配文字，感受 Chat vs Composer 的区别',
                  color: '#14b8a6',
                },
              ].map(({ step, title, time, detail, color }) => (
                <div key={step} style={{ display: 'flex', gap: 0, borderTop: `2px solid ${colors.black}` }}>
                  <div style={{ width: 120, background: color, padding: '14px 16px', borderRight: `2px solid ${colors.black}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>{step}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.white, fontWeight: 700 }}>{time}</span>
                  </div>
                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.05)', flex: 1 }}>
                    <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ padding: '10px 24px', background: '#fbbf24', border: `3px solid ${colors.black}`, boxShadow: '4px 4px 0 #000' }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900, color: colors.black }}>⏱ 15 分钟</span>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>遇到问题举手，助教帮你</span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
