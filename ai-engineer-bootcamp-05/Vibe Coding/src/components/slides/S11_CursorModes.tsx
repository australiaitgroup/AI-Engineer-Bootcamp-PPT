import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const pink = '#ec4899';

const modes = [
  {
    name: 'Tab 补全', shortcut: 'Tab', color: '#22c55e', icon: '⌨️',
    desc: 'AI 预测你的下一行，按 Tab 接受',
    features: ['实时预测，0 延迟', '上下文感知，不只是单词补全', '可以补全整个函数体'],
    usage: '适合：写新代码时，日常提速神器',
  },
  {
    name: 'Chat 模式', shortcut: 'Cmd+L', color: '#06b6d4', icon: '💬',
    desc: '侧边栏对话，可以引用当前文件',
    features: ['对话式修改当前文件', '解释代码、查找 bug', '用 @file 引入其他文件'],
    usage: '适合：理解代码、小范围修改',
  },
  {
    name: 'Composer Agent', shortcut: 'Cmd+I', color: pink, icon: '🤖',
    desc: '跨文件生成，完成整个功能模块',
    features: ['一次修改多个文件', '可以新建文件和目录', '自动安装依赖'],
    usage: '适合：开发新功能、大幅重构',
  },
];

export default function S11_CursorModes() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 28 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: pink, letterSpacing: 2 }}>PART 2 · CURSOR</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>Cursor <span style={{ color: pink }}>三种模式</span></Title>
          <Divider color={pink} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, width: '100%' }}>
          {modes.map(({ name, shortcut, color, icon, desc, features, usage }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: color, padding: '16px 20px', borderBottom: border }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900, color: colors.black }}>{name}</div>
                      <div style={{ display: 'inline-flex', padding: '2px 10px', background: colors.black, marginTop: 4 }}>
                        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.white, fontWeight: 700 }}>{shortcut}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily: fonts.body, fontSize: 13, color: 'rgba(0,0,0,0.7)', lineHeight: 1.5 }}>{desc}</p>
                </div>
                <div style={{ padding: '16px 20px', background: colors.white, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    {features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
                        <span style={{ color, fontWeight: 900, fontSize: 14 }}>✓</span>
                        <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.dark }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', padding: '8px 12px', background: `${color}20`, border: `1px solid ${color}` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.dark, fontWeight: 700 }}>💡 {usage}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div style={{ padding: '12px 24px', background: colors.dark, border, boxShadow: '4px 4px 0 #000', textAlign: 'center' }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.white, fontWeight: 700 }}>
              🎯 新手流程：Tab 补全日常 → Chat 理解代码 → Composer 开发功能
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
