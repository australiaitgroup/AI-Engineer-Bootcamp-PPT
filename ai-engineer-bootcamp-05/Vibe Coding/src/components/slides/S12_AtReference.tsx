import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const pink = '#ec4899';

const refs = [
  {
    ref: '@file', color: '#22c55e', icon: '📄',
    desc: '引用单个文件',
    example: '@src/components/Button.tsx 给这个组件加一个 disabled 状态',
    tip: '最常用，精准引入相关文件',
  },
  {
    ref: '@folder', color: '#06b6d4', icon: '📁',
    desc: '引用整个目录',
    example: '@src/api/ 给所有 API 路由加统一的错误处理',
    tip: '谨慎使用，目录大时消耗大量 token',
  },
  {
    ref: '@codebase', color: pink, icon: '🗂',
    desc: 'AI 自动搜索相关代码',
    example: '@codebase 找出所有调用了 fetchUser 函数的地方',
    tip: '让 AI 自己决定看哪些文件',
  },
  {
    ref: '@docs', color: '#fbbf24', icon: '📚',
    desc: '引用官方文档',
    example: '@docs React 18 这里的 useTransition 用法对不对？',
    tip: '需要先在 Cursor Settings 里添加文档 URL',
  },
  {
    ref: '@web', color: '#f97316', icon: '🌐',
    desc: '实时搜索网络',
    example: '@web 最新的 Next.js 15 部署到 Vercel 的配置方式',
    tip: 'Pro 功能，适合查最新信息',
  },
  {
    ref: '@git', color: '#8b5cf6', icon: '🔀',
    desc: '引用 Git 历史',
    example: '@git 最近一次提交改了什么？帮我写 commit message',
    tip: '方便理解最近的改动',
  },
];

export default function S12_AtReference() {
  return (
    <Slide bg={colors.white}>
      <Inner center style={{ gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: pink, letterSpacing: 2 }}>PART 2 · CURSOR</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>@ <span style={{ color: pink }}>引用系统</span></Title>
          <Divider color={pink} center />
          <p style={{ fontFamily: fonts.body, fontSize: 14, color: '#666', marginTop: 8 }}>用 @ 符号精准地把信息喂给 AI，避免 token 浪费</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, width: '100%' }}>
          {refs.map(({ ref, color, icon, desc, example, tip }, i) => (
            <motion.div key={ref} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }}>
              <div style={{ border, boxShadow: '4px 4px 0 #000', overflow: 'hidden', height: '100%' }}>
                <div style={{ background: color, padding: '10px 14px', borderBottom: border, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 900, color: colors.black }}>{ref}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11, color: 'rgba(0,0,0,0.65)' }}>{desc}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ padding: '6px 10px', background: '#0d1117', border: `1px solid #30363d` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#a5f3fc', lineHeight: 1.5 }}>{example}</span>
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12, color: '#666' }}>💡 {tip}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Inner>
    </Slide>
  );
}
