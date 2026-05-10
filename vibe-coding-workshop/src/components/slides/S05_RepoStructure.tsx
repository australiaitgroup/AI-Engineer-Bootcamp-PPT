import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const badStructure = `my-project/
├── index.js
├── stuff.js
├── helper.js
├── data.js
├── test.js
└── old_backup_v2.js`;

const goodStructure = `my-project/
├── CONTEXT.md          ← 🧠 AI 的"使用说明书"
├── src/
│   ├── api/            ← 按职责分层
│   ├── components/
│   ├── services/
│   └── utils/
├── tests/
├── docs/               ← 决策记录、API 文档
└── package.json`;

export default function S05_RepoStructure() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 48 }}>
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · FOUNDATION</span>
            <Title style={{ marginTop: 8 }}>为什么 Repo<br /><span style={{ color: violet }}>结构很重要?</span></Title>
            <Divider color={violet} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <p style={{ fontFamily: fonts.body, fontSize: 15, color: '#555', lineHeight: 1.7 }}>
              AI 读取你的代码就像新同事入职——<strong>第一印象决定理解质量</strong>。混乱的结构让 AI 产生歧义，清晰的结构让 AI 精准定位。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🗂', point: '文件职责清晰 → AI 知道该改哪里' },
                { icon: '📝', point: 'CONTEXT.md → 告诉 AI 项目的"来龙去脉"' },
                { icon: '🎯', point: '减少无关文件 → 节省上下文窗口' },
                { icon: '♻️', point: '命名一致 → AI 能预测和复用模式' },
              ].map(({ icon, point }) => (
                <div key={point} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: `${violet}10`, border: `1px solid ${violet}` }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark, lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>❌ 混乱结构（AI 不知道从哪下手）</div>
            <div style={{ background: '#0d1117', border: `2px solid #ef4444`, padding: '18px 20px' }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 13, color: '#fca5a5', margin: 0, lineHeight: 1.9 }}>{badStructure}</pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>✅ 清晰结构（AI 一眼找到目标）</div>
            <div style={{ background: '#0d1117', border: `2px solid #22c55e`, padding: '18px 20px' }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 13, color: '#86efac', margin: 0, lineHeight: 1.9 }}>{goodStructure}</pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ padding: '12px 16px', background: '#fbbf24', border, boxShadow: '4px 4px 0 #000' }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
                ⚡ CONTEXT.md 是重点——下一张幻灯片展开讲
              </p>
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
