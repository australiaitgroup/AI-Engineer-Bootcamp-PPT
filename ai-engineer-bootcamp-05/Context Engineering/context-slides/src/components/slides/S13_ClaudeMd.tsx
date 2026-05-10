import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const layers = [
	{
		level: '项目级 CLAUDE.md', file: '项目根目录/CLAUDE.md',
		desc: '= System Prompt（全局规则）', detail: '角色定义、技术栈约束、安全边界',
		color: colors.dark,
	},
	{
		level: '模块级 CLAUDE.md', file: 'src/modules/CLAUDE.md',
		desc: '= RAG 检索结果（领域知识）', detail: '该模块特有规则、依赖关系',
		color: cyan,
	},
	{
		level: '用户级 settings.json', file: '.claude/settings.json',
		desc: '= 用户画像（用户偏好）', detail: '个人编码习惯、输出格式偏好',
		color: colors.indigo,
	},
];

const fileTree = `项目根目录/
├── CLAUDE.md          ← 项目级
│      技术栈、编码规范、架构约束
│
├── src/
│   └── modules/
│       └── CLAUDE.md  ← 模块级
│              该模块的特殊规则
│
└── .claude/
    └── settings.json  ← 用户级
           个人偏好`;

export default function S13_ClaudeMd() {
	return (
		<Slide bg={colors.white}>
			<Inner split style={{ gap: 48 }}>
				<Half style={{ flex: '0 0 400px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 13</span>
						<Title style={{ marginTop: 8, fontSize: '42px' }}>CLAUDE.md Pattern<br /><span style={{ color: cyan }}>项目级上下文注入</span></Title>
						<Divider color={cyan} />
						<p style={{ fontFamily: fonts.body, fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
							Claude Code 的 CLAUDE.md 是实际项目中最优雅的 Context Engineering 实践——分三层注入上下文：
						</p>
					</motion.div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{layers.map(({ level, desc, detail, color }, i) => (
							<motion.div key={level} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
								<div style={{ display: 'flex', gap: 0, border, boxShadow: `4px 4px 0 ${colors.black}`, overflow: 'hidden' }}>
									<div style={{ width: 8, background: color }} />
									<div style={{ padding: '14px 16px', background: '#fafafa', flex: 1 }}>
										<div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.black }}>{level}</div>
										<div style={{ fontFamily: fonts.mono, fontSize: 11, color: color, fontWeight: 700, marginTop: 2 }}>{desc}</div>
										<div style={{ fontFamily: fonts.body, fontSize: 13, color: '#666', marginTop: 4 }}>{detail}</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
						style={{ marginTop: 16, padding: '14px 16px', background: colors.teal, border, boxShadow: shadow }}>
						<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700, lineHeight: 1.6 }}>
							实测：分层结构后 AI 遵循规则准确率从 <strong>72% → 91%</strong><br />
							原因：每层更短、更聚焦，模型更容易"记住"
						</p>
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 12, color: cyan, fontWeight: 700, marginBottom: 10 }}>project structure</div>
						<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '24px 22px' }}>
							<pre style={{ fontFamily: fonts.mono, fontSize: 13, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 2 }}>{fileTree}</pre>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
						style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
						{[
							{ arrow: '项目级 CLAUDE.md → System Prompt（全局规则）', color: colors.dark },
							{ arrow: '模块级 CLAUDE.md → RAG 检索结果（领域知识）', color: cyan },
							{ arrow: '用户级 settings.json → 用户画像（用户偏好）', color: colors.indigo },
						].map(({ arrow, color }) => (
							<div key={arrow} style={{ padding: '10px 14px', background: color, border: `2px solid ${colors.black}` }}>
								<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.white, fontWeight: 700 }}>{arrow}</p>
							</div>
						))}
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
