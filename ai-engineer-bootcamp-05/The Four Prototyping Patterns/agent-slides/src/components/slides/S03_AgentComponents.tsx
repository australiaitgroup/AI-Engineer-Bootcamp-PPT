import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, CardSm, Stagger, StaggerItem, colors, fonts, border } from '../ui';

const components = [
	{ emoji: '🧠', label: 'LLM', title: '决策器 / 思考器', desc: '决定下一步做什么\n调用哪个工具\n判断任务是否完成', bg: colors.indigo, light: false },
	{ emoji: '🔧', label: 'Tool', title: '工具', desc: '搜索 / 计算 / API\n数据库查询\n文件读取 / RAG', bg: colors.teal, light: false },
	{ emoji: '🧩', label: 'Memory', title: '记忆', desc: '保持会话上下文\n中间状态传递\n长期记忆存储', bg: colors.yellow, light: true },
	{ emoji: '👁', label: 'Observation', title: '观测', desc: '工具执行后的输出\n作为 LLM 下一步输入\n驱动下一轮决策', bg: colors.white, light: true },
	{ emoji: '⛔', label: 'Stop Criteria', title: '停止条件', desc: '达到目标\n超过最大步数\n触发安全限制', bg: colors.red, light: false },
];

export default function S03_AgentComponents() {
	return (
		<Slide bg="#f8f0ff">
			<Inner center style={{ gap: 32 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.purple, letterSpacing: 2 }}>SLIDE 03</span>
					<Title style={{ marginTop: 8 }}>Agent 的<span style={{ color: colors.purple }}> 四大</span>组成</Title>
					<Divider color={colors.purple} center />
					<p style={{ fontFamily: fonts.body, fontSize: 18, color: '#666', maxWidth: 600 }}>
						每一个 Agent 都由这五个核心模块驱动——缺少任何一个，Agent 都无法完整运转
					</p>
				</motion.div>

				<Stagger style={{ display: 'flex', gap: 20, width: '100%', justifyContent: 'center' }}>
					{components.map(({ emoji, label, title, desc, bg, light }) => (
						<StaggerItem key={label} style={{ flex: 1, maxWidth: 240 }}>
							<CardSm bg={bg} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
								<div style={{ fontSize: 36 }}>{emoji}</div>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: light ? '#555' : 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>{label}</div>
								<div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, color: light ? colors.black : colors.white, lineHeight: 1.2 }}>{title}</div>
								<div style={{ width: 32, height: 3, background: light ? colors.black : 'rgba(255,255,255,0.4)', margin: '4px 0' }} />
								{desc.split('\n').map((line, i) => (
									<p key={i} style={{ fontFamily: fonts.body, fontSize: 14, color: light ? '#444' : 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>→ {line}</p>
								))}
							</CardSm>
						</StaggerItem>
					))}
				</Stagger>

				{/* Agent 居中标签 */}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
					style={{ position: 'absolute', padding: '14px 28px', background: colors.dark, border, boxShadow: `6px 6px 0 ${colors.black}`, fontFamily: fonts.heading, fontSize: 22, fontWeight: 900, color: colors.yellow, transform: 'rotate(-2deg)' }}
				>
					Agent (LLM 决策器)
				</motion.div>
			</Inner>
		</Slide>
	);
}
