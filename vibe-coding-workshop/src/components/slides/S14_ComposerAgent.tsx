import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const pink = '#ec4899';

const example = `# 好的 Composer 提示词

## 背景
@src/components/ @src/types/user.ts
当前用户列表页只有静态数据

## 目标
添加真实的分页功能

## 具体要求
- 每页显示 10 条用户数据
- 支持上一页/下一页按钮
- 显示"第 X 页，共 Y 页"
- 数据从 /api/users?page=N&limit=10 获取
- 加载时显示 skeleton loader
- 错误时显示 retry 按钮

## 技术约束
- 用 React Query 做数据请求
- TypeScript 严格模式
- 不要修改 UserCard 组件`;

export default function S14_ComposerAgent() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 48 }}>
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: pink, letterSpacing: 2 }}>PART 2 · CURSOR</span>
            <Title style={{ marginTop: 8 }}>Composer Agent<br /><span style={{ color: pink }}>进阶技巧</span></Title>
            <Divider color={pink} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <div style={{ padding: '16px 18px', background: pink, border, boxShadow: shadow }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, marginBottom: 8 }}>📐 Composer 提示词公式</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  '① 背景 (@file 引入相关代码)',
                  '② 目标 (要实现什么)',
                  '③ 具体要求 (边界条件)',
                  '④ 技术约束 (用什么方案)',
                ].map((item, i) => (
                  <div key={i} style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{item}</div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { title: '分步骤生成', tip: '复杂功能拆成多个 Composer 对话，不要一次做完' },
                { title: '先生成再调整', tip: '让 AI 先出一版，再用 Chat 做精细修改' },
                { title: '接受 + 继续', tip: 'Accept 当前改动后，再开新的 Composer 做下一步' },
                { title: '用 Checkpoint', tip: '做大改动前先 git commit，出问题可以 revert' },
              ].map(({ title, tip }) => (
                <div key={title} style={{ padding: '10px 14px', border: `1px solid ${pink}`, background: `${pink}08` }}>
                  <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: pink, marginBottom: 4 }}>▸ {title}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 13, color: '#555' }}>{tip}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: pink, fontWeight: 700, marginBottom: 10 }}>实际 Prompt 示例（分页功能）</div>
            <div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px 18px', boxShadow: shadow }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.9 }}>{example}</pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: '❌ 模糊指令', content: '"帮我做分页"', bg: '#fff5f5', border: '1px solid #fca5a5', color: '#c0392b' },
                { label: '✅ 详细指令', content: '"参考模板，每页10条，用 React Query，加 skeleton"', bg: '#f0fdf4', border: '1px solid #86efac', color: '#065f46' },
              ].map(({ label, content, bg, border: bd, color }) => (
                <div key={label} style={{ padding: '12px 14px', background: bg, border: bd }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 11, color, fontWeight: 700, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 13, color, lineHeight: 1.5, fontStyle: 'italic' }}>{content}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
