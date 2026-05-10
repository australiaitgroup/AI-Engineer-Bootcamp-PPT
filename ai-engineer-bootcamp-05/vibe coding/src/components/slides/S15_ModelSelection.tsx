import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const pink = '#ec4899';

const models = [
  {
    name: 'claude-3-haiku', speed: '⚡⚡⚡', quality: '⭐⭐', cost: '$',
    best: ['Tab 补全（内部用）', '简单 Q&A', '格式转换', '快速解释代码'],
    avoid: ['复杂架构设计', '多文件重构'],
    color: '#22c55e',
    desc: '最快最便宜，日常小任务',
  },
  {
    name: 'claude-3.5-sonnet', speed: '⚡⚡', quality: '⭐⭐⭐⭐', cost: '$$$',
    best: ['Composer 开发新功能', '复杂 debug', '代码审查', '大多数编程任务'],
    avoid: ['Token 特别紧张的场景'],
    color: pink,
    desc: '🎯 日常首选，速度质量平衡',
  },
  {
    name: 'claude-3-opus', speed: '⚡', quality: '⭐⭐⭐⭐⭐', cost: '$$$$',
    best: ['复杂架构决策', '多文件全局重构', 'Security audit', '需要推理的难题'],
    avoid: ['日常开发（太贵太慢）'],
    color: '#8b5cf6',
    desc: '大招，留给最难的任务',
  },
];

export default function S15_ModelSelection() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 28 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: pink, letterSpacing: 2 }}>PART 2 · CURSOR</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>Model <span style={{ color: pink }}>选择策略</span></Title>
          <Divider color={pink} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, width: '100%' }}>
          {models.map(({ name, speed, quality, cost, best, avoid, color, desc }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: color, padding: '14px 18px', borderBottom: border }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.black }}>{name}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12, color: 'rgba(0,0,0,0.7)', marginTop: 4 }}>{desc}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                    {[{ label: 'Speed', val: speed }, { label: 'Quality', val: quality }, { label: 'Cost', val: cost }].map(({ label, val }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontFamily: fonts.mono, fontSize: 9, color: 'rgba(0,0,0,0.5)', fontWeight: 700, letterSpacing: 1 }}>{label}</span>
                        <span style={{ fontSize: 14 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '14px 18px', background: colors.white, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 6 }}>✅ 适合</div>
                    {best.map((item, j) => (
                      <div key={j} style={{ fontFamily: fonts.body, fontSize: 13, color: colors.dark, marginBottom: 4 }}>• {item}</div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 6 }}>⚠️ 不适合</div>
                    {avoid.map((item, j) => (
                      <div key={j} style={{ fontFamily: fonts.body, fontSize: 12, color: '#c0392b', marginBottom: 4 }}>• {item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div style={{ padding: '12px 24px', background: colors.dark, border, boxShadow: '4px 4px 0 #000', textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 13, color: '#fbbf24', fontWeight: 700 }}>
              💡 Cursor 默认用 Sonnet，可在设置里切换。大多数时候 Sonnet 就够了。
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
