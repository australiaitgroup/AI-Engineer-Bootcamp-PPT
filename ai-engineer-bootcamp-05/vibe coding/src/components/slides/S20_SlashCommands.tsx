import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

const builtinCmds = [
  { cmd: '/help', desc: '查看所有可用命令' },
  { cmd: '/clear', desc: '清空对话历史，保留 CLAUDE.md' },
  { cmd: '/compact', desc: '压缩对话历史，节省 token' },
  { cmd: '/model', desc: '切换使用的模型' },
  { cmd: '/cost', desc: '查看本次对话消耗的 token' },
  { cmd: '/exit', desc: '退出 Claude Code' },
];

const customCmdCode = `.claude/commands/gen-tests.md:

---
# Generate Tests for $ARGUMENTS

请为以下函数/模块生成完整的测试：
\`\`\`
$ARGUMENTS
\`\`\`

要求：
- 使用 Vitest
- 覆盖 happy path + edge cases
- 包含 mock 如果有外部依赖`;

export default function S20_SlashCommands() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner split style={{ gap: 48 }}>
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: teal, letterSpacing: 2 }}>PART 3 · CLAUDE CODE</span>
            <Title style={{ marginTop: 8, fontSize: '40px' }}>/ 命令与自定义<br /><span style={{ color: teal }}>Slash Commands</span></Title>
            <Divider color={teal} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 10 }}>内置命令</div>
            <div style={{ border, boxShadow: '4px 4px 0 #000', overflow: 'hidden' }}>
              {builtinCmds.map(({ cmd, desc }, i) => (
                <div key={cmd} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', background: i % 2 === 0 ? '#fafafa' : colors.white, borderBottom: i < builtinCmds.length - 1 ? `1px solid #e0e0e0` : 'none' }}>
                  <div style={{ padding: '8px 12px', borderRight: `1px solid #e0e0e0` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 13, color: teal, fontWeight: 700 }}>{cmd}</span>
                  </div>
                  <div style={{ padding: '8px 12px' }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#555' }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ padding: '12px 16px', background: teal, border, boxShadow: shadow }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, lineHeight: 1.6 }}>
                💡 /compact 是日常必用命令！长对话后用它压缩，省 token 又保持上下文
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 10 }}>自定义 Slash Commands</div>
            <div style={{ padding: '14px 16px', background: `${teal}10`, border, marginBottom: 14 }}>
              <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark, lineHeight: 1.6 }}>
                在 <code style={{ background: '#eee', padding: '2px 6px', fontFamily: fonts.mono, fontSize: 12 }}>.claude/commands/</code> 目录下创建 .md 文件，就能定义自己的 slash 命令。
              </p>
            </div>

            <div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '18px 16px', boxShadow: shadow }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.9 }}>{customCmdCode}</pre>
            </div>

            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700 }}>使用方式</div>
              {[
                { usage: '/gen-tests src/utils/formatDate.ts', desc: '为 formatDate 函数生成测试' },
                { usage: '/gen-tests src/services/userService.ts', desc: '为 userService 生成测试' },
              ].map(({ usage, desc }) => (
                <div key={usage} style={{ padding: '10px 14px', background: '#0d1117', border: `1px solid ${teal}` }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 13, color: '#86efac', marginBottom: 4 }}>$ {usage}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
