import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, CardSm, Stagger, StaggerItem, colors, fonts } from '../ui';

const items = [
	{
		icon: '🔒', title: '限制工具范围', color: colors.indigo,
		desc: '只暴露必要工具，避免不受控访问',
		warn: '❌ 不要暴露任意 shell 或网络访问',
	},
	{
		icon: '✅', title: '输入/输出校验', color: colors.teal,
		desc: '工具输入与 LLM 输出都需校验',
		warn: '避免注入攻击或格式错误',
	},
	{
		icon: '💰', title: '速率与成本控制', color: colors.orange,
		desc: '限制调用频率、并发、单次最大 tokens',
		warn: '防止高额费用暴增',
	},
	{
		icon: '📋', title: '日志与可观测', color: colors.purple,
		desc: '记录每一步决策、工具调用与返回',
		warn: '便于审计与调试复现',
	},
	{
		icon: '🔄', title: '降级策略', color: colors.red,
		desc: '关键工具不可用时有安全降级',
		warn: '返回失败信息或替代方案',
	},
];

export default function S13_Security() {
	return (
		<Slide bg="#fff8f0">
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.red, letterSpacing: 2 }}>SLIDE 13</span>
					<Title style={{ marginTop: 8 }}>Agent <span style={{ color: colors.red }}>安全与可控性</span></Title>
					<Divider color={colors.red} center />
					<p style={{ fontFamily: fonts.body, fontSize: 17, color: '#666', maxWidth: 700 }}>
						Agent 会自主调用工具——安全设计从一开始就要考虑，不是事后补救
					</p>
				</motion.div>

				<Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, width: '100%' }}>
					{items.map(({ icon, title, color, desc, warn }) => (
						<StaggerItem key={title}>
							<CardSm bg={colors.white} style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
								<span style={{ fontSize: 30 }}>{icon}</span>
								<div style={{ width: 32, height: 3, background: color }} />
								<div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.black, lineHeight: 1.2 }}>{title}</div>
								<p style={{ fontFamily: fonts.body, fontSize: 14, color: '#444', lineHeight: 1.5, flex: 1 }}>{desc}</p>
								<p style={{ fontFamily: fonts.mono, fontSize: 12, color: color, fontWeight: 700 }}>{warn}</p>
							</CardSm>
						</StaggerItem>
					))}
				</Stagger>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
					style={{ padding: '14px 32px', background: colors.dark, border: `3px solid ${colors.black}`, boxShadow: `6px 6px 0 ${colors.black}` }}
				>
					<p style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.yellow, textAlign: 'center' }}>
						🏆 黄金法则：先在封闭 sandbox 中验证工具调用路径与安全性，再放到生产环境
					</p>
				</motion.div>
			</Inner>
		</Slide>
	);
}
