import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const problems = [
	{
		icon: '💬', title: '对话超出窗口',
		desc: '用户问了 50 轮之后，前面的对话已超出 context window，模型"忘了"你们讨论过什么',
		color: colors.red,
	},
	{
		icon: '🗂', title: '缺乏私有数据',
		desc: '用户问的问题需要私有数据，模型的训练数据里没有你公司的内部文档',
		color: colors.orange,
	},
	{
		icon: '⚙️', title: '无法执行操作',
		desc: '用户需要 AI 执行操作，比如查数据库、发邮件、搜网页——模型只能生成文字，做不了这些',
		color: colors.purple,
	},
];

export default function S03_WhyNotEnough() {
	return (
		<Slide bg={colors.white}>
			<Inner split style={{ gap: 56 }}>
				<Half style={{ flex: '0 0 420px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 03</span>
						<Title style={{ marginTop: 8, fontSize: '52px' }}>为什么 Prompt<br /><span style={{ color: colors.red }}>Engineering 不够了？</span></Title>
						<Divider color={colors.red} />
						<p style={{ fontFamily: fonts.body, fontSize: 17, color: '#555', lineHeight: 1.6, marginBottom: 24 }}>
							Prompt Engineering 解决的是<strong>「一条消息怎么写」</strong>的问题——但真实 AI 应用远不止单次交互：
						</p>
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
						style={{ padding: '18px 20px', background: colors.dark, border, boxShadow: shadow }}>
						<p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.yellow, fontWeight: 700, lineHeight: 1.6 }}>
							Gartner 2026 预测：<br />
							<span style={{ fontSize: 24, display: 'block', marginTop: 6 }}>57%</span>
							的 AI Agent 项目失败的根本原因是<br />上下文管理失败——不是模型不够好，<br />而是喂给模型的信息不对
						</p>
					</motion.div>
				</Half>

				<Half>
					<Stagger style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
						{problems.map(({ icon, title, desc, color }) => (
							<StaggerItem key={title}>
								<motion.div
									whileHover={{ x: 4, y: 4, boxShadow: '0 0 0 #000' }}
									transition={{ duration: 0.15 }}
									style={{ background: color, border, boxShadow: shadow, padding: '22px 20px', display: 'flex', gap: 18, alignItems: 'flex-start' }}
								>
									<span style={{ fontSize: 36, flexShrink: 0 }}>{icon}</span>
									<div>
										<div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 800, color: colors.white, marginBottom: 8 }}>{title}</div>
										<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>{desc}</p>
									</div>
								</motion.div>
							</StaggerItem>
						))}
					</Stagger>
				</Half>
			</Inner>
		</Slide>
	);
}
