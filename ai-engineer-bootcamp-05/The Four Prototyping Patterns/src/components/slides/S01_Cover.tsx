import { motion } from 'framer-motion';
import { Slide, colors, fonts } from '../ui';

export default function S01_Cover() {
	return (
		<Slide bg={colors.dark} style={{ position: 'relative' }}>
			{/* 背景装饰 */}
			<div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
				<motion.div
					initial={{ x: -300, rotate: -12 }}
					animate={{ x: 0, rotate: -12 }}
					transition={{ duration: 0.65 }}
					style={{ position: 'absolute', top: -120, left: -160, width: '55%', height: '140%', background: colors.indigo }}
				/>
				<motion.div
					initial={{ y: 280 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					style={{ position: 'absolute', bottom: -80, right: -60, width: 460, height: 460, background: colors.teal, transform: 'rotate(14deg)', border: `4px solid ${colors.black}` }}
				/>
				<motion.div
					initial={{ scale: 0, rotate: 0 }}
					animate={{ scale: 1, rotate: 20 }}
					transition={{ duration: 0.4, delay: 0.35 }}
					style={{ position: 'absolute', top: 60, right: 220, width: 140, height: 140, background: colors.yellow, border: `3px solid ${colors.black}` }}
				/>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.4, delay: 0.5 }}
					style={{ position: 'absolute', bottom: 140, left: '40%', width: 64, height: 64, background: colors.red, border: `3px solid ${colors.black}`, transform: 'rotate(-8deg)' }}
				/>
			</div>

			<div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: 60 }}>
				{/* JR Badge */}
				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 20px', background: colors.white, border: `3px solid ${colors.black}`, boxShadow: `5px 5px 0 ${colors.black}`, marginBottom: 32 }}>
						<div style={{ width: 36, height: 36, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fonts.heading, fontWeight: 900, fontSize: 18 }}>JR</div>
						<span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 800 }}>匠人学院 · AI Engineering Bootcamp</span>
					</div>
				</motion.div>

				{/* 系列标签 */}
				<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
					{['01 Prompt', '02 RAG', '04 Fine-tuning'].map(label => (
						<span key={label} style={{ padding: '5px 14px', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', fontFamily: fonts.mono, fontWeight: 700, fontSize: 13, border: '2px solid rgba(255,255,255,0.2)' }}>
							{label}
						</span>
					))}
					<span style={{ padding: '5px 18px', background: colors.yellow, color: colors.black, fontFamily: fonts.mono, fontWeight: 700, fontSize: 13, border: `2px solid ${colors.black}`, boxShadow: `3px 3px 0 ${colors.black}`, transform: 'rotate(-1.5deg)' }}>
						03 Agent ← 本节
					</span>
				</motion.div>

				{/* 主标题 */}
				<motion.h1
					initial={{ opacity: 0, x: -60 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.35, duration: 0.55 }}
					style={{ fontFamily: fonts.heading, fontSize: '88px', fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, color: colors.white, textShadow: `4px 4px 0 ${colors.black}` }}
				>
					The Four<br />
					<span style={{ display: 'inline-block', padding: '2px 24px', background: colors.teal, color: colors.black, border: `4px solid ${colors.black}`, boxShadow: `6px 6px 0 ${colors.black}`, transform: 'rotate(-1deg)', marginTop: 8 }}>
						Prototyping
					</span>{' '}
					<span style={{ color: colors.yellow }}>Patterns</span>
				</motion.h1>

				{/* 副标题 */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					style={{ marginTop: 28, fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.9)', borderLeft: `5px solid ${colors.teal}`, paddingLeft: 16, lineHeight: 1.4 }}
				>
					理解 AI Agent 的核心构件与工程化方法<br />
					<span style={{ color: colors.yellow, fontSize: 20 }}>零基础适用 · LangChain 实战</span>
				</motion.p>

				{/* Tags */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
					{[
						{ label: 'LLM 决策循环', bg: colors.teal },
						{ label: 'Tool 设计原则', bg: colors.white },
						{ label: '4 种 Agent 类型', bg: colors.indigo },
						{ label: '代码示例 × 4', bg: colors.yellow },
					].map(({ label, bg }) => (
						<span key={label} style={{ padding: '10px 20px', background: bg, border: `3px solid ${colors.black}`, boxShadow: `4px 4px 0 ${colors.black}`, fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: bg === colors.indigo ? colors.white : colors.black }}>
							{label}
						</span>
					))}
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} style={{ marginTop: 36, fontFamily: fonts.mono, fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
					www.jiangren.com.au · AI Engineering Bootcamp · 零基础适用
				</motion.div>
			</div>
		</Slide>
	);
}
