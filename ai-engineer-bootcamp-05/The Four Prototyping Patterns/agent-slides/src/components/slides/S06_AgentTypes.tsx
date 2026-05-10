import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, Card, Stagger, StaggerItem, colors, fonts } from '../ui';

const types = [
	{
		num: '01', icon: '⚡', label: 'Reactive Agent', title: '反应式 Agent',
		desc: '基于当前输入立即决定下一步，不做长期规划。',
		fit: '简单工具调用、单步任务',
		example: '问"今天天气怎样" → 直接调用天气 API → 返回结果',
		bg: colors.teal,
	},
	{
		num: '02', icon: '📋', label: 'Planner Agent', title: '规划式 Agent',
		desc: '先制定中长期步骤计划，再逐步执行，支持条件分支。',
		fit: '复杂多步骤任务',
		example: '写报告 → 先规划：搜索→整理→写作→校对',
		bg: colors.indigo,
	},
	{
		num: '03', icon: '🔧', label: 'Tool-using Agent', title: '工具驱动 Agent',
		desc: '核心能力是调用并组合多种工具，LangChain Agent 的典型实现。',
		fit: '需要跨系统整合的任务',
		example: '先 Search → 再 Calculator → 再 FileWrite',
		bg: colors.orange,
	},
	{
		num: '04', icon: '💬', label: 'Conversational Agent', title: '对话式 Agent',
		desc: '带会话记忆（Memory），能在多轮交互中保持上下文。',
		fit: '客服、助手类多轮交互',
		example: '第1轮问产品 → 第5轮仍记得你的偏好',
		bg: colors.purple,
	},
];

export default function S06_AgentTypes() {
	return (
		<Slide bg={colors.white}>
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.purple, letterSpacing: 2 }}>SLIDE 06</span>
					<Title style={{ marginTop: 8 }}>四种 <span style={{ color: colors.purple }}>Agent 类型</span></Title>
					<Divider color={colors.purple} center />
				</motion.div>

				<Stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
					{types.map(({ num, icon, label, title, desc, fit, example, bg }) => (
						<StaggerItem key={num}>
							<Card bg={bg} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
								<div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
									<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
										<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{num}</span>
										<span style={{ fontSize: 28 }}>{icon}</span>
									</div>
									<div>
										<div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>{label}</div>
										<div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 900, color: colors.white, lineHeight: 1.2 }}>{title}</div>
									</div>
								</div>
								<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{desc}</p>
								<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
									<span style={{ padding: '4px 10px', background: colors.yellow, fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: colors.black }}>适合</span>
									<span style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{fit}</span>
								</div>
								<div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.2)', borderLeft: `3px solid ${colors.yellow}` }}>
									<p style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>例：{example}</p>
								</div>
							</Card>
						</StaggerItem>
					))}
				</Stagger>
			</Inner>
		</Slide>
	);
}
