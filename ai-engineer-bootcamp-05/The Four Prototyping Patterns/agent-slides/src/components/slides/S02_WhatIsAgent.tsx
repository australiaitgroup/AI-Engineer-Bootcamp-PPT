import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, Card, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

export default function S02_WhatIsAgent() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner split style={{ gap: 56 }}>
				{/* 左侧：标题 + 定义 */}
				<div style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.indigo, letterSpacing: 2 }}>SLIDE 02</span>
						<Title style={{ marginTop: 8 }}>什么是<br /><span style={{ color: colors.indigo }}>Agent？</span></Title>
						<Divider color={colors.indigo} />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.25 }}
						style={{ marginTop: 8, padding: '18px 20px', background: colors.indigo, border, boxShadow: shadow }}
					>
						<p style={{ fontFamily: fonts.body, fontSize: 17, color: colors.white, lineHeight: 1.6, fontWeight: 500 }}>
							<strong>Agent</strong> = 能自主决定使用哪个工具、何时使用、如何组合工具以完成复杂任务的软件实体
						</p>
					</motion.div>
				</div>

				{/* 右侧：对比卡片 */}
				<div style={{ flex: 1, display: 'flex', gap: 24, alignItems: 'stretch' }}>
					<Stagger style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
						<StaggerItem>
							<Card bg={colors.white} style={{ marginBottom: 0 }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 10 }}>普通 LLM 调用</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
									{['用户输入一句话', 'LLM 生成一次回答', '结束'].map((s, i) => (
										<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
											<span style={{ width: 28, height: 28, background: '#eee', border: `2px solid ${colors.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
											<span style={{ fontFamily: fonts.body, fontSize: 17 }}>{s}</span>
										</div>
									))}
								</div>
								<div style={{ marginTop: 14, padding: '8px 12px', background: '#f5f5f5', borderLeft: `4px solid #ccc` }}>
									<p style={{ fontFamily: fonts.mono, fontSize: 12, color: '#888' }}>局限：无法查数据库、调 API、执行多步骤任务</p>
								</div>
							</Card>
						</StaggerItem>

						<StaggerItem>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0' }}>
								<span style={{ padding: '6px 20px', background: colors.yellow, border: `3px solid ${colors.black}`, fontFamily: fonts.heading, fontSize: 20, fontWeight: 900 }}>VS</span>
							</div>
						</StaggerItem>

						<StaggerItem>
							<Card bg={colors.indigo} style={{ color: colors.white }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.yellow, marginBottom: 10 }}>AI Agent</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
									{['用户输入目标', 'LLM 决定调用哪个工具', '执行工具，获得观测结果', 'LLM 基于结果决定下一步', '重复直到完成任务'].map((s, i) => (
										<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
											<span style={{ width: 28, height: 28, background: colors.yellow, border: `2px solid ${colors.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.black, flexShrink: 0 }}>{i + 1}</span>
											<span style={{ fontFamily: fonts.body, fontSize: 16 }}>{s}</span>
										</div>
									))}
								</div>
								<div style={{ marginTop: 14, padding: '8px 12px', background: 'rgba(255,255,255,0.15)', borderLeft: `4px solid ${colors.yellow}` }}>
									<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.yellow }}>特点：自主多步骤、跨系统整合</p>
								</div>
							</Card>
						</StaggerItem>
					</Stagger>
				</div>
			</Inner>
		</Slide>
	);
}
