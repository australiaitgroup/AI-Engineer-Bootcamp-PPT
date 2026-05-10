import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, Card, CardSm, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

const principles = [
	{ num: '①', title: '单一职责', desc: '一个 tool 只做一件事（搜索、计算、写表格）', bg: colors.teal },
	{ num: '②', title: '契约明确', desc: '明确输入/输出格式，返回结构化 JSON', bg: colors.indigo },
	{ num: '③', title: '幂等可重试', desc: '工具最好幂等，失败时可安全重试', bg: colors.yellow },
	{ num: '④', title: '边界与权限', desc: '对外部资源做权限控制，谨防滥用', bg: colors.red },
];

export default function S04_Tool() {
	return (
		<Slide bg={colors.white}>
			<Inner split style={{ gap: 56 }}>
				<Half>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.teal, letterSpacing: 2 }}>SLIDE 04</span>
						<Title style={{ marginTop: 8 }}>Tool 是<br /><span style={{ color: colors.teal }}>什么？</span></Title>
						<Divider color={colors.teal} />
						<p style={{ fontFamily: fonts.body, fontSize: 18, color: '#555', lineHeight: 1.6, marginBottom: 24 }}>
							每个 Tool 有三要素：
						</p>
					</motion.div>

					<Stagger style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{[
							{ field: 'name', desc: '工具名称，LLM 用来识别并调用它' },
							{ field: 'description', desc: '描述工具能做什么，LLM 读这段文字来决定何时调用' },
							{ field: 'func', desc: '实际执行的函数/方法' },
						].map(({ field, desc }) => (
							<StaggerItem key={field}>
								<div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
									<span style={{ padding: '4px 14px', background: colors.dark, color: colors.yellow, fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, border, flexShrink: 0 }}>{field}</span>
									<span style={{ fontFamily: fonts.body, fontSize: 16, color: '#444', lineHeight: 1.5, paddingTop: 4 }}>{desc}</span>
								</div>
							</StaggerItem>
						))}
					</Stagger>

					{/* 示例 */}
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
						<Card bg={colors.dark} style={{ marginTop: 24 }}>
							<div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.teal, marginBottom: 8 }}>示例 Tool</div>
							<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
								{[
									{ k: 'name', v: 'Calculator' },
									{ k: 'description', v: 'Performs arithmetic' },
									{ k: 'func', v: 'calculator_tool()' },
								].map(({ k, v }) => (
									<div key={k} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
										<span style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{k}:</span>
										<span style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.yellow, fontWeight: 700 }}>{v}</span>
									</div>
								))}
							</div>
						</Card>
					</motion.div>
				</Half>

				{/* 右侧：四原则 */}
				<Half>
					<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
						<div style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 800, marginBottom: 20 }}>
							Tool 设计 <span style={{ color: colors.teal }}>四原则</span>
						</div>
					</motion.div>
					<Stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
						{principles.map(({ num, title, desc, bg }) => (
							<StaggerItem key={num}>
								<CardSm bg={bg} style={{ height: '100%' }}>
									<div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
										<span style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 900, color: bg === colors.yellow ? colors.black : colors.white, lineHeight: 1 }}>{num}</span>
										<div>
											<div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, color: bg === colors.yellow ? colors.black : colors.white, marginBottom: 6 }}>{title}</div>
											<p style={{ fontFamily: fonts.body, fontSize: 14, color: bg === colors.yellow ? '#444' : 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{desc}</p>
										</div>
									</div>
								</CardSm>
							</StaggerItem>
						))}
					</Stagger>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
						style={{ marginTop: 20, padding: '12px 16px', background: '#f5f5f5', border: `2px dashed ${colors.black}` }}
					>
						<p style={{ fontFamily: fonts.mono, fontSize: 13, color: '#555' }}>
							💡 description 字段是最关键的——LLM 完全靠读这段文字来决定"要不要调用这个工具"
						</p>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
