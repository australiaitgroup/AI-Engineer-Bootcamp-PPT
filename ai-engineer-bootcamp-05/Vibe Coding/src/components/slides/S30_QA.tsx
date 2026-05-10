import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';
const pink = '#ec4899';

export default function S30_QA() {
  return (
    <Slide bg={colors.dark} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: -150, right: -150, width: 450, height: 450, border: `3px dashed rgba(139,92,246,0.2)`, borderRadius: '50%' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, border: `3px dashed rgba(236,72,153,0.15)`, borderRadius: '50%' }}
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 80, right: 160, fontSize: 60, opacity: 0.12 }}
      >💬</motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', bottom: 120, right: 80, fontSize: 50, opacity: 0.08 }}
      >⚡</motion.div>

      <div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 'clamp(72px, 10vw, 128px)', fontWeight: 900, color: colors.white, letterSpacing: -4, lineHeight: 1 }}>
            Q&A
          </h1>
          <div style={{ width: 80, height: 6, background: `linear-gradient(90deg, ${violet}, ${pink})`, margin: '16px auto 0' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 600 }}>
            问题、想法、卡住的地方<br />
            <span style={{ color: violet, fontWeight: 700 }}>开放 Hacking Time 🚀</span>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '💻', label: '继续做今晚的练习' },
              { icon: '🔧', label: '试你自己的项目' },
              { icon: '❓', label: '问助教任何问题' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.07)', border: `2px solid ${violet}`, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.white }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: colors.white, border: `3px solid ${colors.black}`, boxShadow: shadow }}>
              <div style={{ width: 32, height: 32, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fonts.heading, fontWeight: 900, fontSize: 14 }}>JR</div>
              <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800 }}>匠人学院 JR ACADEMY</span>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>www.jiangren.com.au</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
            Vibe Coding Workshop · JR Academy · {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </Slide>
  );
}
