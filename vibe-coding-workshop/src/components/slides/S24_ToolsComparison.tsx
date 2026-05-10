import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';
const pink = '#ec4899';
const teal = '#14b8a6';

const scenarios = [
  { scenario: '写一个新 UI 组件', tool: 'Cursor (Composer)', reason: '可视化、快速迭代', color: pink },
  { scenario: '修改一个已知 bug', tool: 'Cursor (Chat)', reason: '定位到具体文件，精准修改', color: pink },
  { scenario: '重构整个模块架构', tool: 'Claude Code', reason: '需要理解全局、跨多文件操作', color: teal },
  { scenario: '写测试 & 提升覆盖率', tool: 'Claude Code', reason: '自主分析、批量生成、运行验证', color: teal },
  { scenario: 'Code Review', tool: 'Claude Code', reason: '全 Repo 分析，发现隐藏问题', color: teal },
  { scenario: '理解一段复杂代码', tool: 'Cursor (Chat)', reason: '直接问，立刻解释', color: pink },
  { scenario: '日常补全', tool: 'Cursor (Tab)', reason: '无需思考，速度最快', color: pink },
  { scenario: '部署、CI/CD 配置', tool: 'Claude Code', reason: '需要执行命令、读配置文件', color: teal },
];

export default function S24_ToolsComparison() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner center style={{ gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 4 · ADVANCED</span>
          <Title style={{ marginTop: 8, textAlign: 'center' }}>Cursor + Claude Code<br /><span style={{ color: violet }}>互补场景</span></Title>
          <Divider color={violet} center />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
          {scenarios.map(({ scenario, tool, reason, color }, i) => (
            <motion.div key={scenario} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
              <div style={{ display: 'flex', gap: 0, border, overflow: 'hidden', boxShadow: '3px 3px 0 #000' }}>
                <div style={{ width: 6, background: color, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: '10px 14px', background: colors.white, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 800, color: colors.dark }}>{scenario}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 12, color: '#888', marginTop: 2 }}>{reason}</div>
                  </div>
                  <div style={{ padding: '4px 10px', background: color, flexShrink: 0 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.white, fontWeight: 700, whiteSpace: 'nowrap' }}>{tool}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div style={{ padding: '14px 24px', background: colors.dark, border, boxShadow: '4px 4px 0 #000', textAlign: 'center', width: '100%' }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 13, color: '#fbbf24', fontWeight: 700 }}>
              🎯 一天的典型工作流：早上 Claude Code 做计划 → 白天 Cursor 写代码 → 下班前 Claude Code 跑测试/整理
            </p>
          </div>
        </motion.div>
      </Inner>
    </Slide>
  );
}
