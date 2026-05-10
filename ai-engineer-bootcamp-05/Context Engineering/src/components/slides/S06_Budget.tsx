import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const budgetItems = [
	{ label: 'System Prompt', tokens: '~2K', pct: 8, desc: '固定开销，每次都有', color: colors.dark },
	{ label: '用户画像摘要', tokens: '~1K', pct: 4, desc: '动态，从用户数据库拉取', color: colors.indigo },
	{ label: '最近对话历史', tokens: '~4K', pct: 17, desc: '滑动窗口，保留最近 5-10 轮', color: colors.purple },
	{ label: '知识库检索结果', tokens: '~8K', pct: 33, desc: 'RAG 检索的 top-5 文档片段', color: cyan },
	{ label: '工具调用结果', tokens: '~4K', pct: 17, desc: 'Agent 执行工具后的返回值', color: colors.orange },
	{ label: '当前用户输入', tokens: '~1K', pct: 4, desc: '必须保留，不能砍', color: colors.red },
	{ label: '预留给 AI 回答', tokens: '~4K', pct: 17, desc: '输出空间', color: colors.green },
];

export default function S06_Budget() {
	return (
		<Slide bg={colors.white}>
			<Inner split style={{ gap: 56 }}>
				<Half style={{ flex: '0 0 400px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 06</span>
						<Title style={{ marginTop: 8, fontSize: '52px' }}>上下文窗口 =<br /><span style={{ color: cyan }}>"预算"</span></Title>
						<Divider color={cyan} />
						<p style={{ fontFamily: fonts.body, fontSize: 16, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
							GPT-4o 128K / Claude 200K / Gemini 1M——听起来很大，实际工程中你很快发现不够用。
							<strong>像管理预算一样管理 context window：</strong>
						</p>
					</motion.div>

					{/* 已用/剩余 */}
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
						<div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
							<div style={{ flex: 1, padding: '14px 16px', background: colors.red, border, boxShadow: shadow, textAlign: 'center' }}>
								<div style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 900, color: colors.white }}>~24K</div>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>已用 / 128K</div>
							</div>
							<div style={{ flex: 1, padding: '14px 16px', background: colors.green, border, boxShadow: shadow, textAlign: 'center' }}>
								<div style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 900, color: colors.white }}>104K</div>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>可弹性使用</div>
							</div>
						</div>
						<div style={{ padding: '12px 16px', background: colors.yellow, border }}>
							<p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.black, fontWeight: 700 }}>
								💡 实测：超过 20K tokens 后效果开始下降（Lost in the Middle 问题）
							</p>
						</div>
					</motion.div>
				</Half>

				<Half>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						{budgetItems.map(({ label, tokens, pct, desc, color }, i) => (
							<motion.div key={label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<span style={{ width: 130, fontFamily: fonts.body, fontSize: 14, color: '#333', flexShrink: 0 }}>{label}</span>
									{/* 进度条 */}
									<div style={{ flex: 1, height: 28, background: '#f0f0f0', border: `2px solid ${colors.black}`, position: 'relative', overflow: 'hidden' }}>
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: `${pct}%` }}
											transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
											style={{ height: '100%', background: color }}
										/>
										<span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: '#555' }}>{desc}</span>
									</div>
									<span style={{ width: 48, fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: color, textAlign: 'right', flexShrink: 0 }}>{tokens}</span>
								</div>
							</motion.div>
						))}
					</div>
				</Half>
			</Inner>
		</Slide>
	);
}
