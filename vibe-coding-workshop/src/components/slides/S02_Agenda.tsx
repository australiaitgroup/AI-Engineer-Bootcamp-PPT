import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const parts = [
  {
    num: 'PART 1',
    title: 'Repo 结构 + Context 工程',
    time: '30 min',
    items: ['为什么 Repo 结构很重要', 'CONTEXT.md 怎么写', '上下文窗口管理', '如何给 AI 迭代反馈'],
    color: violet,
    icon: '🏗',
    practice: '实战 1：写自己项目的 CONTEXT.md',
  },
  {
    num: 'PART 2',
    title: 'Cursor 实战',
    time: '35 min',
    items: ['三种模式 Tab / Chat / Composer', '@ 引用系统', '.cursorrules 配置', 'Model 选择策略'],
    color: '#ec4899',
    icon: '⚡',
    practice: '实战 2：Cursor 生成 + Debug 完整功能',
  },
  {
    num: 'PART 3',
    title: 'Claude Code 深度使用',
    time: '25 min',
    items: ['CLAUDE.md 配置', '长任务拆解与 Checkpoint', '/ 命令 & MCP 扩展', '费用 & Token 预算'],
    color: '#14b8a6',
    icon: '🤖',
    practice: '实战 3：Claude Code 补测试用例',
  },
  {
    num: 'PART 4',
    title: '高级话题 + Q&A',
    time: '20 min',
    items: ['工具互补场景对比', 'AI 代码 Review 技巧', '常见踩坑 & 避坑指南', '推荐资源清单'],
    color: '#fbbf24',
    icon: '🎯',
    practice: 'Q&A + 开放 Hacking Time',
  },
];

export default function S02_Agenda() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 24, width: '92%', maxWidth: 1400 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>TONIGHT'S PLAN</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>今晚我们要做什么</Title>
          <Divider color={violet} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%' }}>
          {parts.map(({ num, title, time, items, color, icon, practice }, i) => (
            <motion.div key={num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%' }}>
                {/* Header */}
                <div style={{ background: color, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: border }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(0,0,0,0.6)', fontWeight: 700, letterSpacing: 2 }}>{num} · {time}</div>
                    <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 800, color: colors.black, marginTop: 2 }}>{title}</div>
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '14px 18px', background: colors.white }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color, fontWeight: 900, fontSize: 16, lineHeight: 1.5, flexShrink: 0 }}>▸</span>
                        <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark, lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 10, padding: '8px 12px', background: `${color}22`, border: `1px solid ${color}` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.dark, fontWeight: 700 }}>🎯 {practice}</span>
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
