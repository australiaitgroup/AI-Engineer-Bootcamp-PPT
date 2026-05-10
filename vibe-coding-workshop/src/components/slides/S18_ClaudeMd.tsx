import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

const template = `# CLAUDE.md

## Project Overview
这是一个 [项目描述]

## Tech Stack
- Runtime: Node.js 20
- Framework: Express + TypeScript
- Database: PostgreSQL + Prisma ORM
- Testing: Vitest

## Development Commands
\`\`\`
npm run dev      # Start dev server
npm test         # Run tests
npm run build    # Build for production
npm run lint     # Check code style
\`\`\`

## Code Conventions
- TypeScript strict mode
- Async/await，不用 callbacks
- 每个函数都要有 JSDoc

## Architecture Notes
- src/routes/  - HTTP 路由层
- src/services/ - 业务逻辑层
- src/models/  - 数据库模型

## Important Constraints
- 不能修改 src/auth/ 目录（已稳定）
- API 变更必须更新 docs/api.md
- 所有新功能必须有测试`;

export default function S18_ClaudeMd() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner split style={{ gap: 48 }}>
        <Half style={{ flex: '0 0 380px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: teal, letterSpacing: 2 }}>PART 3 · CLAUDE CODE</span>
            <Title style={{ marginTop: 8, fontSize: '40px' }}>CLAUDE.md<br /><span style={{ color: teal }}>Agent 说明书</span></Title>
            <Divider color={teal} />
            <p style={{ fontFamily: fonts.body, fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>
              CLAUDE.md 是专门给 Claude Code 读的配置文件。和 CONTEXT.md 类似，但更侧重于<strong>命令、架构约束、禁止区域</strong>。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { sec: '项目概述', desc: '一句话说清楚项目是什么', color: colors.dark },
                { sec: '开发命令', desc: 'dev/test/build 命令，Claude 会用到', color: teal },
                { sec: '代码规范', desc: '语言风格、命名、注释要求', color: '#8b5cf6' },
                { sec: '架构说明', desc: '目录结构，职责划分', color: '#fbbf24' },
                { sec: '重要约束', desc: '禁止修改的区域、必须更新的文档', color: '#ef4444' },
              ].map(({ sec, desc, color }) => (
                <div key={sec} style={{ display: 'flex', gap: 0, border: `1px solid ${color}`, overflow: 'hidden' }}>
                  <div style={{ width: 6, background: color, flexShrink: 0 }} />
                  <div style={{ padding: '8px 12px', flex: 1 }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800, color: colors.dark }}>{sec}</span>
                    <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#666', marginLeft: 8 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ padding: '12px 16px', background: teal, border, boxShadow: shadow }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, lineHeight: 1.6 }}>
                💡 分层结构更好：根目录 CLAUDE.md 全局规则 + 子目录 CLAUDE.md 模块规则
              </p>
            </div>
          </motion.div>
        </Half>

        <Half>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 10 }}>CLAUDE.md 模板</div>
            <div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '18px 16px', boxShadow: shadow }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 11, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{template}</pre>
            </div>
          </motion.div>
        </Half>
      </Inner>
    </Slide>
  );
}
