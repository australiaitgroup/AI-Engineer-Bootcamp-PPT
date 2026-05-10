import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const resources = [
  {
    category: '官方文档', icon: '📚', color: colors.dark,
    items: [
      { name: 'Cursor 文档', url: 'docs.cursor.com', desc: '官方使用指南、快捷键、配置' },
      { name: 'Claude Code 文档', url: 'docs.anthropic.com/claude-code', desc: 'slash 命令、MCP 配置、CLAUDE.md' },
      { name: 'Anthropic Cookbook', url: 'github.com/anthropics/anthropic-cookbook', desc: '实用代码示例和最佳实践' },
    ],
  },
  {
    category: '社区', icon: '👥', color: '#ec4899',
    items: [
      { name: 'r/cursor', url: 'reddit.com/r/cursor', desc: 'Cursor 使用技巧、Prompt 分享' },
      { name: 'Cursor Discord', url: 'discord.gg/cursor', desc: '实时帮助、新功能讨论' },
      { name: 'JR Academy Discord', url: 'discord.jiangren.com.au', desc: '中文社区，互相交流 Vibe Coding 心得' },
    ],
  },
  {
    category: '值得关注的人', icon: '🔭', color: '#14b8a6',
    items: [
      { name: '@karpathy', url: 'Twitter/X', desc: '发明了 Vibe Coding 这个词的人' },
      { name: '@simonw', url: 'Twitter/X', desc: 'Simon Willison，AI 工具深度使用者' },
      { name: '@swyx', url: 'Twitter/X', desc: 'AI 工程趋势分析' },
    ],
  },
  {
    category: 'JR 平台资源', icon: '🎓', color: violet,
    items: [
      { name: 'Vibe Coding Hub', url: 'jiangren.com.au/learn/vibe-coding', desc: 'AI 编程学习中心' },
      { name: 'Prompt Lab', url: 'study-center?tab=prompt-lab', desc: '22+ 互动练习' },
      { name: 'AI 学习路径', url: 'jiangren.com.au/roadmaps', desc: '可视化学习路径' },
    ],
  },
];

export default function S27_Resources() {
  return (
    <Slide bg={colors.white}>
      <Inner center style={{ gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 4 · RESOURCES</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>推荐<span style={{ color: violet }}>资源</span></Title>
          <Divider color={violet} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%' }}>
          {resources.map(({ category, icon, color, items }, i) => (
            <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden' }}>
                <div style={{ background: color, padding: '10px 16px', display: 'flex', gap: 8, alignItems: 'center', borderBottom: border }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white }}>{category}</span>
                </div>
                <div style={{ padding: '12px 16px', background: colors.white, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {items.map(({ name, url, desc }) => (
                    <div key={name} style={{ padding: '8px 12px', background: `${color}08`, border: `1px solid ${color}40` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.dark }}>{name}</span>
                        <span style={{ fontFamily: fonts.mono, fontSize: 10, color, fontWeight: 700 }}>{url}</span>
                      </div>
                      <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#666' }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Inner>
    </Slide>
  );
}
