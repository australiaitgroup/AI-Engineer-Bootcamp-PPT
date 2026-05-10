import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const bad = [
	{ label: '返回原始 HTML', code: "<div class='result'>26.5M</div>..." },
	{ label: '无结构纯文本', code: 'found something maybe 26 or 27 million' },
	{ label: '无 error 信息', code: 'None' },
];

const good = [
	{ label: '结构化 JSON', code: '{"population": 26500000, "year": 2025}' },
	{ label: '明确状态字段', code: '{"status": "ok", "data": "26.5M"}' },
	{ label: '清晰错误信息', code: '{"status": "error", "msg": "timeout"}' },
];

export default function S12_Observation() {
	return (
		<Slide bg={colors.white}>
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.orange, letterSpacing: 2 }}>SLIDE 12</span>
					<Title style={{ marginTop: 8 }}>解读 Agent <span style={{ color: colors.orange }}>Output</span></Title>
					<Divider color={colors.orange} center />
					<p style={{ fontFamily: fonts.body, fontSize: 17, color: '#666', maxWidth: 800 }}>
						工具执行后返回的 Observation 直接影响 LLM 的下一步决策——好的 Observation 设计是 Agent 稳定运行的关键
					</p>
				</motion.div>

				{/* 流程 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ display: 'flex', gap: 0, alignItems: 'center', width: '100%', maxWidth: 900 }}>
					{['Tool 执行\n调用外部服务/函数/API', 'Observation\n原始返回结果传回给 LLM', 'LLM 解读\n基于 Obs 决定下一步行动', '继续 / 停止\n再次 Act 或输出答案'].map((text, i) => (
						<div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
							<div style={{ flex: 1, padding: '14px 12px', background: [colors.teal, colors.orange, colors.indigo, colors.green][i], border, textAlign: 'center' }}>
								{text.split('\n').map((line, j) => (
									<p key={j} style={{ fontFamily: j === 0 ? fonts.heading : fonts.body, fontSize: j === 0 ? 16 : 13, fontWeight: j === 0 ? 800 : 400, color: colors.white, lineHeight: 1.4 }}>{line}</p>
								))}
							</div>
							{i < 3 && <div style={{ fontFamily: fonts.mono, fontSize: 20, color: colors.black, padding: '0 4px' }}>→</div>}
						</div>
					))}
				</motion.div>

				{/* 对比表 */}
				<div style={{ display: 'flex', gap: 28, width: '100%' }}>
					{/* 坏的 */}
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} style={{ flex: 1 }}>
						<div style={{ padding: '12px 16px', background: colors.red, border, boxShadow: shadow, marginBottom: 12 }}>
							<p style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.white }}>❌ 糟糕的 Observation</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							{bad.map(({ label, code }) => (
								<div key={label} style={{ border: `2px solid ${colors.red}`, padding: '10px 14px' }}>
									<div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: colors.red, marginBottom: 4 }}>{label}</div>
									<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#555', margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
								</div>
							))}
						</div>
					</motion.div>

					{/* 好的 */}
					<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }} style={{ flex: 1 }}>
						<div style={{ padding: '12px 16px', background: colors.teal, border, boxShadow: shadow, marginBottom: 12 }}>
							<p style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.white }}>✅ 好的 Observation</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							{good.map(({ label, code }) => (
								<div key={label} style={{ border: `2px solid ${colors.teal}`, padding: '10px 14px' }}>
									<div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: colors.teal, marginBottom: 4 }}>{label}</div>
									<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#333', margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
								</div>
							))}
						</div>
					</motion.div>
				</div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} style={{ padding: '12px 24px', background: colors.dark, border, boxShadow: `4px 4px 0 ${colors.black}` }}>
					<p style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.yellow, fontWeight: 700 }}>
						原则：Observation 要让 LLM 一眼读懂——结构化 &gt; 纯文本，有 status/error 字段 &gt; 裸返回值
					</p>
				</motion.div>
			</Inner>
		</Slide>
	);
}
