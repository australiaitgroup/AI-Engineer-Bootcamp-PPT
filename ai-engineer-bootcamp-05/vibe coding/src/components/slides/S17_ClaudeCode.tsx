import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

const comparison = [
  { aspect: '操作方式', cursor: 'GUI — 可视化 IDE 里点击', cc: 'Terminal — 命令行对话' },
  { aspect: '理解范围', cursor: '当前打开的文件', cc: '整个 Repo + 可自主搜索' },
  { aspect: '文件操作', cursor: '修改现有文件', cc: '创建/删除/移动文件' },
  { aspect: '命令执行', cursor: '不能运行命令', cc: '直接运行 npm/git/bash' },
  { aspect: '任务类型', cursor: '精准、快速的编码', cc: '长任务、自主完成' },
  { aspect: '价格', cursor: '$20/月 (Pro)', cc: 'API 按量计费' },
];

export default function S17_ClaudeCode() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 48 }}>
        <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: teal, letterSpacing: 2 }}>PART 3 · CLAUDE CODE</span>
            <Title style={{ marginTop: 8 }}>Claude Code<br /><span style={{ color: teal }}>是什么?</span></Title>
            <Divider color={teal} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <div style={{ padding: '18px 20px', background: teal, border, boxShadow: shadow }}>
              <p style={{ fontFamily: fonts.body, fontSize: 15, color: colors.white, lineHeight: 1.6 }}>
                <strong>Claude Code</strong> = 运行在终端里的 AI Agent，可以<strong>自主理解整个项目、执行命令、修改文件</strong>，完成复杂的多步骤任务
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <div style={{ padding: '12px 16px', background: '#0d1117', border: `2px solid #30363d` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, color: '#a5f3fc', marginBottom: 6 }}>安装 & 使用</div>
              <pre style={{ fontFamily: fonts.mono, fontSize: 13, color: '#86efac', margin: 0, lineHeight: 2 }}>{`npm install -g @anthropic-ai/claude-code
cd your-project
claude`}</pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                '🔍 自主阅读所有相关文件',
                '🛠 运行测试、检查 lint 错误',
                '📝 一次修改十几个文件',
                '🔄 遇到错误自动重试修复',
              ].map((item) => (
                <div key={item} style={{ padding: '8px 12px', background: `${teal}10`, border: `1px solid ${teal}` }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 12 }}>CURSOR vs CLAUDE CODE</div>
            <div style={{ border, boxShadow: shadow, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', background: colors.dark }}>
                <div style={{ padding: '10px 14px', borderRight: `2px solid ${colors.black}` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>维度</span>
                </div>
                <div style={{ padding: '10px 14px', borderRight: `2px solid ${colors.black}` }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 14, color: '#ec4899', fontWeight: 800 }}>⚡ Cursor</span>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 14, color: teal, fontWeight: 800 }}>🤖 Claude Code</span>
                </div>
              </div>
              {comparison.map(({ aspect, cursor, cc }, i) => (
                <div key={aspect} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', background: i % 2 === 0 ? '#fafafa' : colors.white, borderTop: `2px solid ${colors.black}` }}>
                  <div style={{ padding: '10px 14px', borderRight: `2px solid ${colors.black}`, background: `${teal}10` }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 12, fontWeight: 800, color: colors.dark }}>{aspect}</span>
                  </div>
                  <div style={{ padding: '10px 14px', borderRight: `2px solid ${colors.black}` }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#555' }}>{cursor}</span>
                  </div>
                  <div style={{ padding: '10px 14px' }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#065f46', fontWeight: 500 }}>{cc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ marginTop: 16, padding: '12px 18px', background: '#fbbf24', border, boxShadow: '4px 4px 0 #000' }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
                🔑 关键区别：Claude Code 能自主完成"目标"，Cursor 是帮你完成"步骤"
              </p>
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
