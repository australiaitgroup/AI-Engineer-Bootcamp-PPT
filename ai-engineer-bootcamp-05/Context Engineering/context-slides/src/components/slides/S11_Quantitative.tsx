import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const rows = [
	{ version: 'V1', name: '纯 System Prompt（无 RAG）', faithfulness: 0.45, relevancy: 0.62, latency: '1.2s', cost: '$200', color: colors.red },
	{ version: 'V2', name: 'System Prompt + RAG', faithfulness: 0.78, relevancy: 0.85, latency: '2.1s', cost: '$350', color: colors.orange },
	{ version: 'V3', name: '完整 Context Engineering', faithfulness: 0.91, relevancy: 0.93, latency: '1.8s', cost: '$400', color: colors.teal },
];

function Bar({ value, max = 1, color }: { value: number; max?: number; color: string }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
			<div style={{ width: 120, height: 20, background: '#eee', border: `2px solid ${colors.black}`, overflow: 'hidden' }}>
				<motion.div initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }} transition={{ duration: 0.6, delay: 0.4 }}
					style={{ height: '100%', background: color }} />
			</div>
			<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: color }}>{value}</span>
		</div>
	);
}

export default function S11_Quantitative() {
	return (
		<Slide bg={colors.white}>
			<Inner center style={{ gap: 24 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 11</span>
					<Title style={{ marginTop: 8 }}>量化对比：<span style={{ color: cyan }}>V1 / V2 / V3</span></Title>
					<Divider color={cyan} center />
					<p style={{ fontFamily: fonts.body, fontSize: 16, color: '#666' }}>客服场景 50 条测试问题，3 种方案对比</p>
				</motion.div>

				{/* 表格 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ width: '100%', border, boxShadow: shadow, overflow: 'hidden' }}>
					{/* 表头 */}
					<div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 200px 200px 100px 100px', background: colors.dark, borderBottom: `3px solid ${colors.black}` }}>
						{['方案', '描述', 'Faithfulness', 'Answer Relevancy', '平均延迟', '月成本'].map(h => (
							<div key={h} style={{ padding: '12px 16px', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.yellow }}>{h}</div>
						))}
					</div>
					{/* 行 */}
					{rows.map(({ version, name, faithfulness, relevancy, latency, cost, color }, i) => (
						<motion.div key={version} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
							style={{ display: 'grid', gridTemplateColumns: '80px 1fr 200px 200px 100px 100px', borderBottom: i < rows.length - 1 ? `2px solid #eee` : 'none', background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
							<div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
								<span style={{ padding: '4px 12px', background: color, fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.white, border: `2px solid ${colors.black}` }}>{version}</span>
							</div>
							<div style={{ padding: '16px', fontFamily: fonts.body, fontSize: 14, color: '#333', display: 'flex', alignItems: 'center' }}>{name}</div>
							<div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}><Bar value={faithfulness} color={color} /></div>
							<div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}><Bar value={relevancy} color={color} /></div>
							<div style={{ padding: '16px', fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: '#333', display: 'flex', alignItems: 'center' }}>{latency}</div>
							<div style={{ padding: '16px', fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: '#333', display: 'flex', alignItems: 'center' }}>{cost}</div>
						</motion.div>
					))}
				</motion.div>

				{/* 两条洞察 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
					style={{ display: 'flex', gap: 20, width: '100%' }}>
					<div style={{ flex: 1, padding: '14px 18px', background: colors.red, border, boxShadow: `4px 4px 0 ${colors.black}` }}>
						<p style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white, marginBottom: 6 }}>V1 为什么这么差？</p>
						<p style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>只有训练数据，无私有知识 → 超过一半回答不可信（幻觉）</p>
					</div>
					<div style={{ flex: 1, padding: '14px 18px', background: colors.teal, border, boxShadow: `4px 4px 0 ${colors.black}` }}>
						<p style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white, marginBottom: 6 }}>V2 → V3 的关键提升</p>
						<p style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>用户画像 + 对话摘要 + 动态预算 → 延迟反而更低（1.8s vs 2.1s）</p>
					</div>
				</motion.div>
			</Inner>
		</Slide>
	);
}
