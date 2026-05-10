import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';
const pink = '#ec4899';

export default function S01_Cover() {
  return (
    <Slide bg={colors.dark} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: -180, right: -180, width: 500, height: 500, border: `3px dashed rgba(139,92,246,0.2)`, borderRadius: '50%' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, border: `3px dashed rgba(236,72,153,0.15)`, borderRadius: '50%' }}
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 80, right: 120, fontSize: 80, opacity: 0.15 }}
      >⚡</motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', bottom: 100, right: 200, fontSize: 60, opacity: 0.1 }}
      >🚀</motion.div>

      <div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', background: violet, border: `2px solid ${colors.black}`, boxShadow: '4px 4px 0 #000' }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, letterSpacing: 2 }}>JR ACADEMY · LIVE WORKSHOP</span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 900, color: colors.white, letterSpacing: -3, lineHeight: 1.0 }}>
            Vibe<span style={{ color: violet }}> Coding</span>
          </h1>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 900, color: colors.white, letterSpacing: -3, lineHeight: 1.0 }}>
            Workshop
          </h1>
          <div style={{ width: 80, height: 6, background: `linear-gradient(90deg, ${violet}, ${pink})`, marginTop: 16 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 'clamp(16px, 1.8vw, 24px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, maxWidth: 700 }}>
            用 AI 把想法直接变成代码<br />
            <span style={{ color: violet, fontWeight: 700 }}>Cursor × Claude Code</span> — 从零到真实项目
          </p>
        </motion.div>

        {/* Time breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'PART 1', title: 'Repo + Context', time: '30 min', color: violet },
            { label: 'PART 2', title: 'Cursor 实战', time: '35 min', color: pink },
            { label: 'PART 3', title: 'Claude Code', time: '25 min', color: '#14b8a6' },
            { label: 'PART 4', title: '高级话题', time: '20 min', color: '#fbbf24' },
          ].map(({ label, title, time, color }) => (
            <div key={label} style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.07)', border: `2px solid ${color}`, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 140 }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color, fontWeight: 700, letterSpacing: 2 }}>{label}</span>
              <span style={{ fontFamily: fonts.heading, fontSize: 14, color: colors.white, fontWeight: 700 }}>{title}</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{time}</span>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', background: colors.white, border: `3px solid ${colors.black}`, boxShadow: shadow }}>
            <div style={{ width: 30, height: 30, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fonts.heading, fontWeight: 900, fontSize: 14 }}>JR</div>
            <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800 }}>匠人学院 JR ACADEMY</span>
          </div>
          <span style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>www.jiangren.com.au</span>
        </motion.div>
      </div>
    </Slide>
  );
}
