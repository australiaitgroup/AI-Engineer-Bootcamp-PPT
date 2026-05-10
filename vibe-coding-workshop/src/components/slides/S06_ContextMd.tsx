import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const template = `# CONTEXT.md

## 项目简介
这是一个 [项目类型]，用于 [解决什么问题]。
目标用户：[谁在用]

## 技术栈
- Frontend: React 18 + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL
- 部署: Vercel + Railway

## 项目结构
src/
  components/   - UI 组件
  api/          - API 路由
  services/     - 业务逻辑
  utils/        - 工具函数

## 编码规范
- 使用 TypeScript，禁止 any
- 组件用函数式，hooks 优先
- CSS: Tailwind，不用 styled-components

## 当前开发阶段
MVP 阶段，功能优先，暂不考虑性能优化

## 已知问题 / 注意事项
- 用户认证模块还未完成
- 测试覆盖率 < 20%，先跑通功能`;

export default function S06_ContextMd() {
  return (
    <Slide bg={colors.warmBg}>
      <Inner split style={{ gap: 48 }}>
        <Half style={{ flex: '0 0 380px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 1 · CONTEXT</span>
            <Title style={{ marginTop: 8, fontSize: '40px' }}>CONTEXT.md<br /><span style={{ color: violet }}>项目说明书</span></Title>
            <Divider color={violet} />
            <p style={{ fontFamily: fonts.body, fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>
              CONTEXT.md 是你给 AI 的"新人入职文档"。它放在项目根目录，告诉 AI 这个项目是什么、怎么做、有什么规矩。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { section: '项目简介', desc: '是什么、解决什么问题、目标用户', color: violet },
                { section: '技术栈', desc: '前后端框架、数据库、部署环境', color: '#ec4899' },
                { section: '项目结构', desc: '目录说明，让 AI 知道在哪改', color: '#14b8a6' },
                { section: '编码规范', desc: 'TypeScript/命名/CSS 方案偏好', color: '#fbbf24' },
                { section: '开发阶段', desc: 'MVP/生产？帮 AI 判断质量标准', color: '#f97316' },
                { section: '注意事项', desc: '已知 bug、临时方案、禁止触碰的区域', color: '#ef4444' },
              ].map(({ section, desc, color }) => (
                <div key={section} style={{ display: 'flex', gap: 0, border: `1px solid ${color}`, overflow: 'hidden' }}>
                  <div style={{ width: 6, background: color, flexShrink: 0 }} />
                  <div style={{ padding: '8px 12px', flex: 1 }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800, color: colors.dark }}>{section}</span>
                    <span style={{ fontFamily: fonts.body, fontSize: 12, color: '#666', marginLeft: 8 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Half>

        <Half>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 10 }}>CONTEXT.md 模板</div>
            <div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px 18px', boxShadow: shadow }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 11, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{template}</pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ marginTop: 12, padding: '12px 16px', background: violet, border, boxShadow: '4px 4px 0 #000' }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, lineHeight: 1.6 }}>
                🎯 实测：有 CONTEXT.md 后，AI 第一次回答的准确率提升 ~40%<br />
                不需要每次都解释"我的项目是用 TypeScript 的"
              </p>
            </div>
          </motion.div>
        </Half>
      </Inner>
    </Slide>
  );
}
