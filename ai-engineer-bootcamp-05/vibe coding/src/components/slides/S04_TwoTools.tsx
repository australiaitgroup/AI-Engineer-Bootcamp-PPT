import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';
const pink = '#ec4899';
const teal = '#14b8a6';

export default function S04_TwoTools() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 28 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · TOOLS</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>今晚的<span style={{ color: violet }}>两个工具</span></Title>
          <Divider color={violet} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
          {/* Cursor */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%' }}>
              <div style={{ background: pink, padding: '20px 24px', borderBottom: border }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 52, height: 52, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>⚡</div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 900, color: colors.white }}>Cursor</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>AI-First IDE</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 24px', background: colors.white, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>核心能力</div>
                  {['Tab 补全 — 预测你的下一行代码', 'Chat 模式 — 对话式修改当前文件', 'Composer Agent — 跨文件生成整个功能', '@ 引用系统 — 精准喂入上下文'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: pink, fontWeight: 900 }}>▸</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 14px', background: `${pink}15`, border: `1px solid ${pink}` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.dark }}>💡 <strong>适合场景</strong>：日常写代码、快速迭代功能</span>
                </div>
                <div style={{ padding: '8px 14px', background: '#f5f5f5', border: `1px solid #ddd` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#666' }}>cursor.com · 免费版可用 · Pro $20/mo</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Claude Code */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%' }}>
              <div style={{ background: teal, padding: '20px 24px', borderBottom: border }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 52, height: 52, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🤖</div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 900, color: colors.white }}>Claude Code</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>Terminal AI Agent</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 24px', background: colors.white, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>核心能力</div>
                  {['直接操作终端 — 运行命令、创建文件', '全 Repo 理解 — 真正读懂整个项目', '自主完成复杂任务 — 给目标它自己做', 'MCP 工具扩展 — 连 GitHub/DB/浏览器'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: teal, fontWeight: 900 }}>▸</span>
                      <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 14px', background: `${teal}15`, border: `1px solid ${teal}` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.dark }}>💡 <strong>适合场景</strong>：大型重构、批量任务、CI/CD</span>
                </div>
                <div style={{ padding: '8px 14px', background: '#f5f5f5', border: `1px solid #ddd` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#666' }}>npm i -g @anthropic-ai/claude-code · API 计费</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div style={{ padding: '14px 24px', background: violet, border, boxShadow: '4px 4px 0 #000', width: '100%', textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.white, fontWeight: 700 }}>
              🔥 最强组合：Cursor 写代码 + Claude Code 做大任务 — 今晚两个都学！
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
