import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

export default function S23_Practice3() {
  return (
    <Slide bg={colors.dark} style={{ position: 'relative' }}>
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${teal}18 0%, transparent 70%)` }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: teal, border: `2px solid ${colors.black}`, boxShadow: '4px 4px 0 #000', marginBottom: 16 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, letterSpacing: 2 }}>HANDS-ON PRACTICE 3</span>
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: colors.white, lineHeight: 1.1, letterSpacing: -2 }}>
            实战练习 3
          </h1>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: teal, marginTop: 8 }}>
            Claude Code 为你的项目补测试用例
          </h2>
          <div style={{ width: 60, height: 4, background: teal, margin: '16px auto 0' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ border, boxShadow: shadow, overflow: 'hidden', textAlign: 'left', width: '100%', maxWidth: 900 }}>
            <div style={{ background: teal, padding: '12px 20px', borderBottom: border }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white }}>📋 任务步骤</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {[
                {
                  step: 'Step 1', icon: '🚀', time: '2 min',
                  title: '进入项目目录，启动 Claude Code',
                  detail: 'cd your-project && claude\n让 Claude 先读 CLAUDE.md，告诉它任务是"补测试"',
                  color: teal,
                },
                {
                  step: 'Step 2', icon: '📋', time: '3 min',
                  title: '让 Claude 分析测试覆盖率',
                  detail: '"分析 src/utils/ 目录下哪些函数没有测试，列出清单"',
                  color: '#8b5cf6',
                },
                {
                  step: 'Step 3', icon: '✍️', time: '4 min',
                  title: '生成测试文件',
                  detail: '"为 formatDate.ts 生成完整测试，包含边界条件，不要修改源文件"',
                  color: '#22c55e',
                },
                {
                  step: 'Step 4', icon: '✅', time: '1 min',
                  title: '让 Claude 运行测试并修复',
                  detail: '"运行 npm test，如果有报错，分析原因并修复"',
                  color: '#fbbf24',
                },
              ].map(({ step, icon, time, title, detail, color }, i) => (
                <div key={step} style={{ padding: '16px 18px', background: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.1)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, border: `2px solid ${colors.black}` }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 10, color: `${color}`, fontWeight: 700 }}>{step} · {time}</div>
                      <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.white }}>{title}</div>
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', border: `1px solid rgba(255,255,255,0.1)` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line' }}>{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ padding: '10px 24px', background: '#fbbf24', border: `3px solid ${colors.black}`, boxShadow: '4px 4px 0 #000' }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900, color: colors.black }}>⏱ 10 分钟</span>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>没有自己项目的同学可以用 Demo Repo</span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
