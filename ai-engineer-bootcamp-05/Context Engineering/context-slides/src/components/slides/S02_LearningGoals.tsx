import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const goals = [
	{
		num: '01', title: '区分两种工程方法',
		desc: '说清楚 Context Engineering 和 Prompt Engineering 的区别：一个是写好一句话，另一个是设计整个信息供给系统',
		icon: '🔀', color: cyan,
	},
	{
		num: '02', title: '画出架构图',
		desc: '画出四种上下文来源（System Instructions / User Input / Tool Results / Memory）的架构图',
		icon: '🏗', color: colors.indigo,
	},
	{
		num: '03', title: '做上下文预算分配',
		desc: '对一个真实场景（比如客服 Agent）做上下文预算分配，像管理资源一样管理 token',
		icon: '💰', color: colors.orange,
	},
	{
		num: '04', title: '代码实现动态组装',
		desc: '用 LangChain 的 RunnableParallel 实现动态上下文组装，比串行快 2-3 倍',
		icon: '⚡', color: colors.teal,
	},
];

export default function S02_LearningGoals() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center style={{ gap: 32 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 02</span>
					<Title style={{ marginTop: 8 }}>本节<span style={{ color: cyan }}> 学习目标</span></Title>
					<Divider color={cyan} center />
					<p style={{ fontFamily: fonts.body, fontSize: 17, color: '#666' }}>学完这节课，你应该能做到以下四件事</p>
				</motion.div>

				<Stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, width: '100%' }}>
					{goals.map(({ num, title, desc, icon, color }) => (
						<StaggerItem key={num}>
							<motion.div
								whileHover={{ x: 4, y: 4, boxShadow: '0 0 0 #000' }}
								transition={{ duration: 0.15 }}
								style={{ background: colors.white, border, boxShadow: shadow, padding: '24px 22px', display: 'flex', gap: 18, alignItems: 'flex-start' }}
							>
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
									<span style={{ padding: '4px 10px', background: color, fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.white, border: `2px solid ${colors.black}` }}>{num}</span>
									<span style={{ fontSize: 28 }}>{icon}</span>
								</div>
								<div>
									<div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 800, color: colors.black, marginBottom: 8 }}>{title}</div>
									<div style={{ width: 32, height: 3, background: color, marginBottom: 10 }} />
									<p style={{ fontFamily: fonts.body, fontSize: 15, color: '#555', lineHeight: 1.6 }}>{desc}</p>
								</div>
							</motion.div>
						</StaggerItem>
					))}
				</Stagger>
			</Inner>
		</Slide>
	);
}
