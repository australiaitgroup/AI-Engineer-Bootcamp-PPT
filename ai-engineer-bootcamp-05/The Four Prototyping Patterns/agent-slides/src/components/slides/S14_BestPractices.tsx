import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border } from '../ui';

const best = [
	'限制工具权限，只暴露必要工具',
	'为每个 Tool 明确定义输入/输出格式',
	'设置最大步数与成本预算上限',
	'记录每步思考、调用与返回（trace）',
	'为 memory 做摘要生命周期管理',
	'先做小规模 sandbox 测试再上生产',
];

const bad = [
	'把任意 shell / 网络访问直接暴露给 Agent',
	'工具描述模糊，导致 LLM 误用工具',
	'不做停止条件，导致无限循环费用暴增',
	'忽视日志，出问题时无法复现决策路径',
	'过度自动化，没有人工回退机制',
	'忽略成本，高并发工具迅速消耗预算',
];

export default function S14_BestPractices() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner split style={{ gap: 48 }}>
				<Half>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.teal, letterSpacing: 2 }}>SLIDE 14</span>
						<Title style={{ marginTop: 8 }}>最佳实践<br /><span style={{ color: colors.teal }}>vs 常见陷阱</span></Title>
						<Divider color={colors.teal} />
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ padding: '12px 16px', background: colors.teal, border, marginBottom: 14 }}>
							<p style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.white }}>✅ 最佳实践</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							{best.map((item, i) => (
								<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}>
									<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: colors.white, border: `2px solid ${colors.teal}` }}>
										<span style={{ color: colors.teal, fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✓</span>
										<span style={{ fontFamily: fonts.body, fontSize: 15, color: '#333', lineHeight: 1.4 }}>{item}</span>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
						<div style={{ padding: '12px 16px', background: colors.red, border, marginBottom: 14, marginTop: 60 }}>
							<p style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.white }}>❌ 常见陷阱</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							{bad.map((item, i) => (
								<motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.07 }}>
									<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: colors.white, border: `2px solid ${colors.red}` }}>
										<span style={{ color: colors.red, fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✗</span>
										<span style={{ fontFamily: fonts.body, fontSize: 15, color: '#333', lineHeight: 1.4 }}>{item}</span>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
