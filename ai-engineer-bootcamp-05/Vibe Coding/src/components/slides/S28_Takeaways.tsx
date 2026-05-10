import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const checkboxes = [
  { text: '我知道 CONTEXT.md 是什么、怎么写', color: violet },
  { text: '我会用 Cursor 的三种模式（Tab / Chat / Composer）', color: '#ec4899' },
  { text: '我知道 @ 引用如何精准喂上下文', color: '#14b8a6' },
  { text: '我能用 Claude Code 完成跨文件的复杂任务', color: '#fbbf24' },
  { text: '我知道什么时候用 Cursor，什么时候用 Claude Code', color: '#f97316' },
  { text: '我了解 AI 代码的常见坑和 Review 要点', color: '#22c55e' },
];

export default function S28_Takeaways() {
  return (
    <Slide bg={colors.dark} style={{ position: 'relative' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, border: `3px dashed rgba(139,92,246,0.15)`, borderRadius: '50%' }}
      />

      <Inner center style={{ gap: 32, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>TONIGHT'S WINS</span>
          <Title style={{ marginTop: 8, textAlign: 'center', color: colors.white }}>今晚的<span style={{ color: violet }}>收获</span></Title>
          <Divider color={violet} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: '100%' }}>
          {checkboxes.map(({ text, color }, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: 'rgba(255,255,255,0.06)', border: `2px solid ${color}`, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, border: `2px solid ${color}`, background: `${color}30`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <span style={{ color, fontSize: 14, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ fontFamily: fonts.body, fontSize: 15, color: colors.white, lineHeight: 1.5 }}>{text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          <div style={{ padding: '20px 32px', background: violet, border: `3px solid ${colors.black}`, boxShadow: shadow, textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.heading, fontSize: 'clamp(16px, 2vw, 22px)', color: colors.white, fontWeight: 900, lineHeight: 1.5 }}>
              Vibe Coding 的核心：<span style={{ color: '#fbbf24' }}>用清晰的"意图"驱动 AI，用批判性思维验证输出</span>
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
