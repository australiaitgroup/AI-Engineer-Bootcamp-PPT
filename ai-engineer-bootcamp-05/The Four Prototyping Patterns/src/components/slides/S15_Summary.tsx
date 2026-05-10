import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const points = [
	{
		icon: '🧠', title: 'Agent 的本质',
		desc: 'LLM 作为决策器，自主选择工具、执行、观测、再决策——把人类"选工具"的能力给程序',
		color: colors.indigo,
	},
	{
		icon: '🔧', title: 'Tool 设计要点',
		desc: '单一职责、契约明确（name/func/description）、幂等可重试、权限受限',
		color: colors.teal,
	},
	{
		icon: '🔄', title: '工作流程',
		desc: 'ReAct 循环：Think → Act → Observe → 重复，直到完成或触发停止条件',
		color: colors.orange,
	},
	{
		icon: '⚙️', title: '工程化三要素',
		desc: '可追踪（日志）+ 可回放（trace）+ 可校验（输入输出结构化）',
		color: colors.purple,
	},
];

export default function S15_Summary() {
	return (
		<Slide bg={colors.dark} style={{ position: 'relative' }}>
			{/* 装饰旋转圆 */}
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
				style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, border: `3px dashed rgba(255,255,255,0.12)`, borderRadius: '50%' }}
			/>
			<motion.div
				animate={{ rotate: -360 }}
				transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
				style={{ position: 'absolute', bottom: -80, left: -80, width: 280, height: 280, border: `3px dashed rgba(99,102,241,0.3)`, borderRadius: '50%' }}
			/>

			<div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1300, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
				{/* 标题 */}
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<h2 style={{ fontFamily: fonts.heading, fontSize: '72px', fontWeight: 900, color: colors.white, letterSpacing: -2, lineHeight: 1.1 }}>
						总结
					</h2>
					<p style={{ fontFamily: fonts.mono, fontSize: 18, color: colors.yellow, marginTop: 8, fontWeight: 700 }}>
						Agents = LLM + Tools + Planner/Executor + Memory
					</p>
					<div style={{ width: 60, height: 4, background: colors.teal, margin: '16px auto 0' }} />
				</motion.div>

				{/* 4 要点 */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.25 }}
					style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%' }}
				>
					{points.map(({ icon, title, desc, color }, i) => (
						<motion.div
							key={title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + i * 0.1 }}
							style={{ padding: '20px 22px', background: 'rgba(255,255,255,0.06)', border: `2px solid ${color}`, display: 'flex', gap: 16, alignItems: 'flex-start' }}
						>
							<span style={{ fontSize: 32, flexShrink: 0 }}>{icon}</span>
							<div>
								<div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, color: color, marginBottom: 6 }}>{title}</div>
								<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{desc}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* 练习路径 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} style={{ padding: '16px 28px', background: colors.indigo, border, boxShadow: shadow, width: '100%', textAlign: 'center' }}>
					<p style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.white, fontWeight: 700 }}>
						🚀 练习路径：先实现 Calculator + Search 小 Agent → 封装 RAG 为 Tool → 加 Memory → 加监控
					</p>
				</motion.div>

				{/* 底部 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', background: colors.white, border: `3px solid ${colors.black}`, boxShadow: `4px 4px 0 ${colors.black}` }}>
						<div style={{ width: 30, height: 30, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fonts.heading, fontWeight: 900, fontSize: 14 }}>JR</div>
						<span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800 }}>匠人学院 JR ACADEMY</span>
					</div>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>www.jiangren.com.au</span>
				</motion.div>
			</div>
		</Slide>
	);
}
