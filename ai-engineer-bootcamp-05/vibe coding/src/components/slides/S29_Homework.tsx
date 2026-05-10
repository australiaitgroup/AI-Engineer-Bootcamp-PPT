import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const tasks = [
  {
    num: '01', title: '完善你的 CONTEXT.md', icon: '📝', color: violet,
    desc: '为你的一个真实项目写完整的 CONTEXT.md，至少包含5个section',
    bonus: '加分：给每个子目录也写 CLAUDE.md',
  },
  {
    num: '02', title: '用 Cursor 独立完成一个功能', icon: '⚡', color: '#ec4899',
    desc: '不要找人帮你，用 Cursor (Composer + Chat) 完整实现一个你一直想做的功能',
    bonus: '加分：记录你的 Prompt 迭代过程',
  },
  {
    num: '03', title: '用 Claude Code 重构一段代码', icon: '🤖', color: '#14b8a6',
    desc: '找一段你不满意的代码，让 Claude Code 帮你重构，关注 Checkpoint 流程',
    bonus: '加分：让 Claude Code 同时补测试',
  },
  {
    num: '04', title: '分享你的 Vibe Coding 经验', icon: '🎯', color: '#fbbf24',
    desc: '在 JR Discord #vibe-coding 频道分享你的一个实战案例',
    bonus: '加分：包括遇到的坑和解决方法',
  },
];

export default function S29_Homework() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 28 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>OPTIONAL HOMEWORK</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>作业<span style={{ color: violet }}>（可选）</span></Title>
          <Divider color={violet} center />
          <p style={{ fontFamily: fonts.body, fontSize: 14, color: '#666', marginTop: 8 }}>不强制，但做了收获最大。按你的节奏来。</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%' }}>
          {tasks.map(({ num, title, icon, color, desc, bonus }, i) => (
            <motion.div key={num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div style={{ border, boxShadow: shadow, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: color, padding: '14px 18px', borderBottom: border, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: 'rgba(0,0,0,0.5)', fontWeight: 700 }}>TASK {num}</div>
                    <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 900, color: colors.black }}>{title}</div>
                  </div>
                </div>
                <div style={{ padding: '14px 18px', background: colors.white, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.dark, lineHeight: 1.6 }}>{desc}</p>
                  <div style={{ marginTop: 'auto', padding: '8px 12px', background: `${color}15`, border: `1px solid ${color}` }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.dark, fontWeight: 700 }}>⭐ {bonus}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div style={{ padding: '14px 24px', background: violet, border, boxShadow: '4px 4px 0 #000', textAlign: 'center', width: '100%' }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.white, fontWeight: 700 }}>
              🚀 挑战：用 Vibe Coding 从零做一个你自己的项目，在下次分享日演示！
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
