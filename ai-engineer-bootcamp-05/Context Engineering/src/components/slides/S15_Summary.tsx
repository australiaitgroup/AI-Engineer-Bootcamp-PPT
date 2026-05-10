import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const points = [
	{ icon: '🏗', title: 'CE 不是写 Prompt，是设计系统', desc: '决定给 AI 看什么、不看什么、按什么顺序看', color: cyan },
	{ icon: '📦', title: '四种来源按需组合', desc: 'System Instructions / User Input / Tool Results / Memory', color: colors.indigo },
	{ icon: '💰', title: '上下文是有限资源', desc: '信号密度比信息量重要，超过 20K 效果下降', color: colors.orange },
	{ icon: '⚡', title: '按需加载 + 动态预算', desc: '不要预先塞入所有信息，用户问什么再检索什么', color: colors.teal },
];

export default function S15_Summary() {
	return (
		<Slide bg={colors.dark} style={{ position: 'relative' }}>
			<motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
				style={{ position: 'absolute', top: -140, right: -140, width: 440, height: 440, border: `3px dashed rgba(6,182,212,0.2)`, borderRadius: '50%' }} />
			<motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
				style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, border: `3px dashed rgba(6,182,212,0.15)`, borderRadius: '50%' }} />
			<motion.div
				initial={{ x: 300 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}
				style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', background: 'rgba(6,182,212,0.08)' }} />

			<div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1300, display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<h2 style={{ fontFamily: fonts.heading, fontSize: '72px', fontWeight: 900, color: colors.white, letterSpacing: -2, lineHeight: 1.1 }}>总结</h2>
					<p style={{ fontFamily: fonts.mono, fontSize: 16, color: colors.yellow, marginTop: 8, fontWeight: 700 }}>
						记住这几点就够了 — Context Engineering 核心要点
					</p>
					<div style={{ width: 60, height: 4, background: cyan, margin: '16px auto 0' }} />
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
					style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%' }}>
					{points.map(({ icon, title, desc, color }, i) => (
						<motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
							style={{ padding: '20px 22px', background: 'rgba(255,255,255,0.05)', border: `2px solid ${color}`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
							<span style={{ fontSize: 32, flexShrink: 0 }}>{icon}</span>
							<div>
								<div style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 800, color: color, marginBottom: 6 }}>{title}</div>
								<p style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{desc}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* 量化驱动 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
					style={{ padding: '16px 28px', background: cyan, border, boxShadow: shadow, width: '100%', textAlign: 'center' }}>
					<p style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.black, fontWeight: 700 }}>
						📊 量化驱动 — 每次改动都跑评估，用数据说话而不是凭感觉
					</p>
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', background: colors.white, border: `3px solid ${colors.black}`, boxShadow: `4px 4px 0 ${colors.black}` }}>
						<div style={{ width: 30, height: 30, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fonts.heading, fontWeight: 900, fontSize: 14 }}>JR</div>
						<span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800 }}>匠人学院 JR ACADEMY</span>
					</div>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>www.jiangren.com.au</span>
				</motion.div>
			</div>
		</Slide>
	);
}
