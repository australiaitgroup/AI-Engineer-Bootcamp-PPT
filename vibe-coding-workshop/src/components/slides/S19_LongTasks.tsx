import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const teal = '#14b8a6';

const stages = [
  { stage: '1. 分析阶段', icon: '🔍', desc: '先让 Claude 读代码、理解现状，不要动任何文件', tip: '"先分析 src/auth 模块的现有实现，不要修改任何文件，告诉我理解是否正确"' },
  { stage: '2. 计划阶段', icon: '📋', desc: '让 Claude 列出完整改动计划，确认再执行', tip: '"列出你要修改的所有文件和改动内容，等我确认"' },
  { stage: '3. 执行阶段', icon: '⚡', desc: '按阶段执行，每个阶段结束后 git commit', tip: '"好，执行第一步：只修改 user.service.ts"' },
  { stage: '4. 验证阶段', icon: '✅', desc: '让 Claude 自己运行测试验证结果', tip: '"运行 npm test，如果有失败的测试，修复后再报告"' },
];

export default function S19_LongTasks() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 48 }}>
        <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: teal, letterSpacing: 2 }}>PART 3 · CLAUDE CODE</span>
            <Title style={{ marginTop: 8 }}>长任务拆解<br /><span style={{ color: teal }}>与 Checkpoint</span></Title>
            <Divider color={teal} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <div style={{ padding: '16px 18px', background: teal, border, boxShadow: shadow }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, marginBottom: 8 }}>🚨 关键原则</div>
              <p style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                长任务 <strong>必须拆分</strong>，每阶段 git commit。AI 做错了，你能 <code style={{ background: 'rgba(255,255,255,0.2)', padding: '1px 6px' }}>git reset</code> 回退。
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ padding: '14px 16px', background: '#0d1117', border: `2px solid #30363d` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, color: '#a5f3fc', marginBottom: 8 }}>Git Checkpoint 命令</div>
              <pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#86efac', margin: 0, lineHeight: 2 }}>{`# 任务开始前
git checkout -b feature/refactor-auth

# 每个阶段完成后
git add .
git commit -m "checkpoint: 分析完成"

# 出问题时回退
git reset --hard HEAD~1`}</pre>
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: teal, fontWeight: 700, marginBottom: 14 }}>四阶段执行流程</div>
          </motion.div>

          {stages.map(({ stage, icon, desc, tip }, i) => (
            <motion.div key={stage} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.1 }}>
              <div style={{ display: 'flex', gap: 0, border, boxShadow: '4px 4px 0 #000', overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ width: 64, background: i === 0 ? colors.dark : i === 1 ? teal : i === 2 ? '#8b5cf6' : '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {icon}
                </div>
                <div style={{ flex: 1, padding: '12px 16px', background: '#fafafa', borderLeft: `2px solid ${colors.black}` }}>
                  <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.dark, marginBottom: 4 }}>{stage}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 13, color: '#555', marginBottom: 8 }}>{desc}</div>
                  <div style={{ padding: '6px 10px', background: '#0d1117', border: `1px solid #30363d` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#a5f3fc' }}>💬 {tip}</span>
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
