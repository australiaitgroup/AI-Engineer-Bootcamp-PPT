import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const methods = [
  {
    num: '01', title: '精准描述问题', color: violet, icon: '🎯',
    bad: '"这个不对，重新写"',
    good: '"第 23 行的 fetchUser 函数，当 userId 为 null 时会报错，加一个 null 检查并返回 null"',
  },
  {
    num: '02', title: '贴上错误信息', color: '#ec4899', icon: '🐛',
    bad: '"我运行不了"',
    good: '"运行后报这个错：TypeError: Cannot read property \'map\' of undefined at line 45"',
  },
  {
    num: '03', title: '说明已尝试的方案', color: '#14b8a6', icon: '🔄',
    bad: '"还是不行"',
    good: '"我试过加 optional chaining (user?.name)，但还是报错。看看是不是类型定义的问题？"',
  },
  {
    num: '04', title: '验收标准先说清楚', color: '#fbbf24', icon: '✅',
    bad: '"帮我写一个登录功能"',
    good: '"帮我写登录功能：支持 email + 密码，密码加密存储，登录成功返回 JWT，失败返回 400 + 错误信息"',
  },
];

export default function S09_IterationFeedback() {
  return (
    <Slide bg={colors.white}>
      <Inner center style={{ gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · ITERATION</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>如何给 AI<span style={{ color: violet }}> 迭代反馈</span></Title>
          <Divider color={violet} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%' }}>
          {methods.map(({ num, title, color, icon, bad, good }, i) => (
            <motion.div key={num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%' }}>
                <div style={{ background: color, padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: border }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: 'rgba(0,0,0,0.5)', fontWeight: 700 }}>METHOD {num}</span>
                    <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.black }}>{title}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 16px', background: colors.white, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ padding: '8px 12px', background: '#fff5f5', border: `1px solid #fca5a5` }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>❌ 模糊反馈</div>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#c0392b', fontStyle: 'italic' }}>{bad}</span>
                  </div>
                  <div style={{ padding: '8px 12px', background: '#f0fdf4', border: `1px solid #86efac` }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>✅ 精准反馈</div>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#065f46', lineHeight: 1.5 }}>{good}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Inner>
    </Slide>
  );
}
