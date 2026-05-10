import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const pitfalls = [
  {
    wrong: '一次性让 AI 做太多',
    problem: '"帮我把整个项目从 JavaScript 迁移到 TypeScript" — AI 改一堆，你不知道改了什么',
    fix: '拆成小步骤：先迁移一个 utils 文件，确认没问题再继续',
  },
  {
    wrong: '不 review 直接用 AI 代码',
    problem: 'AI 可能生成看起来正确但逻辑错误的代码，或者安全漏洞',
    fix: '每次都快速扫一遍，特别是安全相关的代码（认证、SQL、输入验证）',
  },
  {
    wrong: '把 API Key / 密码给 AI 看',
    problem: '你的 .env 文件不应该进入 AI 的 context',
    fix: '用 .gitignore 排除 .env，在 context 里用占位符替代真实值',
  },
  {
    wrong: 'AI 出错后换个方向再问',
    problem: '模糊地"再试一次"只会让 AI 瞎猜，越来越偏',
    fix: '清楚说明哪里不对、为什么不对、期望是什么',
  },
  {
    wrong: '完全依赖 AI，不学基础',
    problem: '不懂原理时，AI 犯错你看不出来；也没法给出好的需求',
    fix: '理解核心概念，AI 负责加速，你负责把方向和质量',
  },
];

export default function S26_CommonPitfalls() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: '#ef4444', letterSpacing: 2 }}>PART 4 · PITFALLS</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>常见<span style={{ color: '#ef4444' }}>踩坑</span> & 怎么避免</Title>
          <Divider color='#ef4444' center />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          {pitfalls.map(({ wrong, problem, fix }, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ border, boxShadow: '4px 4px 0 #000', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 0 }}>
                  <div style={{ width: 52, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRight: `2px solid ${colors.black}` }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 900, color: colors.white }}>❌</span>
                  </div>
                  <div style={{ flex: 1, padding: '10px 16px', background: '#fff5f5', borderBottom: `2px solid ${colors.black}` }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.black }}>{wrong}</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div style={{ padding: '10px 16px', background: '#fff8f8', borderRight: `2px solid ${colors.black}` }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>⚠️ 问题</div>
                    <p style={{ fontFamily: fonts.body, fontSize: 13, color: '#c0392b', lineHeight: 1.5 }}>{problem}</p>
                  </div>
                  <div style={{ padding: '10px 16px', background: '#f0fdf4' }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>✅ 正确做法</div>
                    <p style={{ fontFamily: fonts.body, fontSize: 13, color: '#065f46', fontWeight: 500, lineHeight: 1.5 }}>{fix}</p>
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
