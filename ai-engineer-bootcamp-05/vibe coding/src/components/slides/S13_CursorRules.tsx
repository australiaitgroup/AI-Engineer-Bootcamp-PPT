import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const pink = '#ec4899';

const rulesTemplate = `# .cursorrules

## Role
You are a senior TypeScript developer.
Always write clean, production-ready code.

## Tech Stack
- React 18 with hooks
- TypeScript (strict mode, no any)
- Tailwind CSS for styling
- Vitest for testing

## Code Style
- Use functional components only
- Prefer named exports over default
- Add JSDoc for public functions
- Handle loading & error states

## Patterns to Follow
- Custom hooks in src/hooks/
- API calls via src/services/
- Types/interfaces in src/types/

## What to Avoid
- No class components
- No inline styles (use Tailwind)
- No console.log in production
- No magic numbers, use constants

## Testing
- Write tests for all utils
- Test happy path + edge cases`;

export default function S13_CursorRules() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner split style={{ gap: 48 }}>
        <Half style={{ flex: '0 0 380px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: pink, letterSpacing: 2 }}>PART 2 · CURSOR</span>
            <Title style={{ marginTop: 8, fontSize: '40px' }}>.cursorrules<br /><span style={{ color: pink }}>项目规范注入</span></Title>
            <Divider color={pink} />
            <p style={{ fontFamily: fonts.body, fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>
              .cursorrules 放在项目根目录，告诉 Cursor 在这个项目里永远遵守什么规则——不用每次对话都重复说。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { sec: 'Role & Persona', desc: '给 AI 设定角色，如"高级 TypeScript 开发者"', color: colors.dark },
                { sec: 'Tech Stack', desc: '确认使用的框架、库版本', color: pink },
                { sec: 'Code Style', desc: '命名规范、注释要求、代码格式', color: '#14b8a6' },
                { sec: 'Patterns', desc: '项目架构规则，文件放哪里', color: '#fbbf24' },
                { sec: 'Avoid', desc: '明确禁止的做法', color: '#ef4444' },
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
            <div style={{ padding: '12px 16px', background: pink, border, boxShadow: shadow }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, lineHeight: 1.6 }}>
                💡 有了 .cursorrules 后，AI 不再问"你用什么框架？" 直接写符合你规范的代码
              </p>
            </div>
          </motion.div>
        </Half>

        <Half>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: pink, fontWeight: 700, marginBottom: 10 }}>.cursorrules 模板</div>
            <div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '18px 16px', boxShadow: shadow }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 11, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{rulesTemplate}</pre>
            </div>
          </motion.div>
        </Half>
      </Inner>
    </Slide>
  );
}
