import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

const mcps = [
  {
    name: 'GitHub MCP', icon: '🐙', color: '#333',
    actions: ['搜索 issues/PRs', '创建 PR、merge', '读取代码库内容', '管理 releases'],
    example: '"帮我把 bug #123 标记为 resolved 并关闭"',
  },
  {
    name: 'PostgreSQL MCP', icon: '🐘', color: '#336791',
    actions: ['执行 SQL 查询', '查看表结构', '分析慢查询', '生成数据报告'],
    example: '"查询今天注册的用户数，按国家分组"',
  },
  {
    name: 'Puppeteer MCP', icon: '🤖', color: '#40b5a4',
    actions: ['截图、生成 PDF', '自动化表单填写', 'E2E 测试', '网页数据抓取'],
    example: '"截图 localhost:3000/dashboard 给我看效果"',
  },
  {
    name: 'Filesystem MCP', icon: '📁', color: '#8b5cf6',
    actions: ['读写任意文件', '批量重命名', '目录遍历', '文件内容搜索'],
    example: '"找出所有超过 500 行的 .tsx 文件"',
  },
];

export default function S21_MCP() {
  return (
    <Slide bg={colors.white}>
      <Inner center style={{ gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: teal, letterSpacing: 2 }}>PART 3 · CLAUDE CODE</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>MCP <span style={{ color: teal }}>工具扩展</span></Title>
          <Divider color={teal} center />
          <p style={{ fontFamily: fonts.body, fontSize: 14, color: '#666' }}>
            MCP (Model Context Protocol) = 给 Claude Code 装插件，让它能操作外部系统
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%' }}>
          {mcps.map(({ name, icon, color, actions, example }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden' }}>
                <div style={{ background: color, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: border }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.white }}>{name}</span>
                </div>
                <div style={{ padding: '14px 16px', background: colors.white, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    {actions.map((action, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                        <span style={{ color: teal, fontWeight: 900 }}>✓</span>
                        <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.dark }}>{action}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '8px 12px', background: '#0d1117', border: `1px solid ${teal}` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#a5f3fc' }}>💬 {example}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div style={{ padding: '12px 24px', background: colors.dark, border, boxShadow: '4px 4px 0 #000', textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 13, color: '#fbbf24', fontWeight: 700 }}>
              🔧 安装：claude mcp add &lt;name&gt; — 超过 100+ MCP 可用，详见 mcp.so
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
