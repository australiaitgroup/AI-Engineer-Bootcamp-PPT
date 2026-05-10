import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

export default function S08_ContextWindow() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner split style={{ gap: 56 }}>
        <div style={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · CONTEXT</span>
            <Title style={{ marginTop: 8 }}>Context 管理<br /><span style={{ color: violet }}>窗口是有限的</span></Title>
            <Divider color={violet} />
          </motion.div>

          {/* Context window visualization */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 10 }}>上下文窗口 (~200K tokens)</div>
            <div style={{ border, boxShadow: '4px 4px 0 #000', overflow: 'hidden' }}>
              {[
                { label: 'System / CONTEXT.md', pct: 10, color: colors.dark, textColor: colors.white },
                { label: '相关代码文件 (@file)', pct: 30, color: violet, textColor: colors.white },
                { label: '对话历史', pct: 25, color: '#ec4899', textColor: colors.white },
                { label: '当前请求', pct: 15, color: '#fbbf24', textColor: colors.black },
                { label: '⚠️ 超出 = 遗忘 / 幻觉', pct: 20, color: '#ef444422', textColor: '#ef4444', border: '2px dashed #ef4444' },
              ].map(({ label, pct, color, textColor }) => (
                <motion.div key={label}
                  initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.4, duration: 0.6 }}
                  style={{ background: color, padding: '8px 14px', borderBottom: `1px solid ${colors.black}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: textColor, fontWeight: 700 }}>{label}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: textColor, opacity: 0.8 }}>{pct}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 12 }}>✅ 管理技巧</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🎯', tip: '只 @ 相关文件', detail: '不要 @整个 src/，只 @ 你要改的那几个文件' },
                { icon: '🔄', tip: '长对话开新对话', detail: '超过 20 轮后质量下降，重开 + 带新 context' },
                { icon: '📋', tip: '总结后继续', detail: '"请总结目前进度" → 复制到新对话开头' },
                { icon: '🗂', tip: '用 /clear 清空', detail: 'Claude Code 里 /clear 重置，保留 CLAUDE.md' },
                { icon: '✂️', tip: '拆小任务', detail: '一次对话做一件事，不要什么都放在一起' },
              ].map(({ icon, tip, detail }) => (
                <div key={tip} style={{ display: 'flex', gap: 0, border, boxShadow: '3px 3px 0 #000', overflow: 'hidden' }}>
                  <div style={{ width: 48, background: `${violet}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, borderRight: `2px solid ${colors.black}` }}>
                    {icon}
                  </div>
                  <div style={{ padding: '10px 14px', background: colors.white, flex: 1 }}>
                    <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: violet, marginBottom: 3 }}>{tip}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 13, color: '#666' }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div style={{ padding: '14px 18px', background: '#ef4444', border, boxShadow: shadow }}>
              <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.white, marginBottom: 6 }}>❌ 常见反模式</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  '"一口气把整个项目 100 个文件都给 AI 看"',
                  '"一个对话做了 50 轮还在接着问"',
                  '"把完整 npm install 日志贴进去"',
                ].map((item, i) => (
                  <div key={i} style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.9)' }}>⚠️ {item}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
