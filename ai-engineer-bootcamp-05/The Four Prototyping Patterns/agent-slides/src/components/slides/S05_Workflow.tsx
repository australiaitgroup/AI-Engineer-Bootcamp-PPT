import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const steps = [
	{ num: 1, label: 'INPUT', title: '接收用户目标', desc: '用户输入任务或问题', bg: colors.indigo, icon: '📥' },
	{ num: 2, label: 'THINK', title: 'LLM 思考', desc: '选择工具、生成工具输入', bg: colors.purple, icon: '🧠' },
	{ num: 3, label: 'ACT', title: '执行工具', desc: '调用 Tool，获取结果', bg: colors.teal, icon: '⚡' },
	{ num: 4, label: 'OBSERVE', title: '获取观测', desc: '工具结果回传给 LLM', bg: colors.orange, icon: '👁' },
];

export default function S05_Workflow() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.teal, letterSpacing: 2 }}>SLIDE 05</span>
					<Title style={{ marginTop: 8 }}>Agent 决策<span style={{ color: colors.teal }}> 循环</span></Title>
					<Divider color={colors.teal} center />
					<p style={{ fontFamily: fonts.body, fontSize: 17, color: '#666', maxWidth: 700 }}>
						Agent 不是一次性调用，而是一个持续循环的决策过程——直到任务完成为止
					</p>
				</motion.div>

				{/* 循环箭头流程 */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 1100 }}>
					{steps.map(({ num, label, title, desc, bg, icon }, i) => (
						<div key={num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 + i * 0.12 }}
								style={{ flex: 1, background: bg, border, boxShadow: shadow, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', textAlign: 'center', minHeight: 180 }}
							>
								<span style={{ fontSize: 32 }}>{icon}</span>
								<span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>STEP {num}</span>
								<span style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, color: colors.yellow }}>{label}</span>
								<div style={{ width: 30, height: 2, background: 'rgba(255,255,255,0.4)' }} />
								<span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.white }}>{title}</span>
								<span style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{desc}</span>
							</motion.div>
							{i < steps.length - 1 && (
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
									<div style={{ width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 24, fontWeight: 900, color: colors.black }}>→</div>
								</motion.div>
							)}
						</div>
					))}
				</div>

				{/* 循环 + 停止 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
					<div style={{ padding: '12px 24px', background: colors.green, border, boxShadow: `4px 4px 0 ${colors.black}`, fontFamily: fonts.heading, fontSize: 18, fontWeight: 800 }}>
						⛔ 完成 / 停止
					</div>
					<span style={{ fontFamily: fonts.body, fontSize: 16, color: '#555' }}>OR</span>
					<div style={{ padding: '12px 24px', background: colors.yellow, border, boxShadow: `4px 4px 0 ${colors.black}`, fontFamily: fonts.heading, fontSize: 18, fontWeight: 800 }}>
						↩ 任务未完成 → 回到 THINK 继续下一轮
					</div>
				</motion.div>

				{/* ReAct 标签 */}
				<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }} style={{ padding: '14px 28px', background: colors.dark, border, boxShadow: `6px 6px 0 ${colors.black}` }}>
					<p style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.yellow, fontWeight: 700 }}>
						💡 ReAct 模式（Reason + Act）：LangChain zero-shot-react-description Agent 就是实现了这个循环
					</p>
				</motion.div>
			</Inner>
		</Slide>
	);
}
