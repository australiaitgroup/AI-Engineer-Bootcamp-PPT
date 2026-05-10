import { motion } from 'framer-motion';
import { Slide, colors, fonts, border, shadow } from '../ui';

export default function S01_Cover() {
	const cyan = '#06b6d4';
	const cyanDark = '#0891b2';
	return (
		<Slide bg={colors.dark} style={{ position: 'relative' }}>
			<div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
				<motion.div initial={{ x: 400 }} animate={{ x: 0 }} transition={{ duration: 0.7 }}
					style={{ position: 'absolute', top: -80, right: -100, width: '50%', height: '120%', background: cyanDark, transform: 'rotate(8deg)' }} />
				<motion.div initial={{ y: -200 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
					style={{ position: 'absolute', top: -60, right: 180, width: 180, height: 180, background: colors.yellow, border: `4px solid ${colors.black}`, transform: 'rotate(-12deg)' }} />
				<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.4 }}
					style={{ position: 'absolute', bottom: 100, right: '38%', width: 70, height: 70, background: colors.red, border: `3px solid ${colors.black}`, transform: 'rotate(10deg)' }} />
				<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.55 }}
					style={{ position: 'absolute', bottom: -60, left: '30%', width: 320, height: 320, background: 'rgba(6,182,212,0.18)', border: `3px solid rgba(6,182,212,0.4)`, borderRadius: '50%' }} />
			</div>

			<div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 1400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: 60 }}>
				{/* JR Badge */}
				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 20px', background: colors.white, border: `3px solid ${colors.black}`, boxShadow: `5px 5px 0 ${colors.black}`, marginBottom: 28 }}>
						<div style={{ width: 36, height: 36, background: colors.black, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fonts.heading, fontWeight: 900, fontSize: 18 }}>JR</div>
						<span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 800 }}>匠人学院 · AI Engineering Bootcamp</span>
					</div>
				</motion.div>

				{/* 数据 badge */}
				<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
					<div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
						<div style={{ padding: '10px 20px', background: colors.red, border, boxShadow: shadow, fontFamily: fonts.heading, fontSize: 32, fontWeight: 900, color: colors.white, transform: 'rotate(-1.5deg)' }}>
							57%
						</div>
						<span style={{ fontFamily: fonts.body, fontSize: 18, color: 'rgba(255,255,255,0.75)', maxWidth: 360, lineHeight: 1.4 }}>
							AI Agent 项目失败的根本原因是<strong style={{ color: colors.yellow }}>上下文管理失败</strong>
							<span style={{ display: 'block', fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>— Gartner 2026</span>
						</span>
					</div>
				</motion.div>

				{/* 主标题 */}
				<motion.h1 initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.55 }}
					style={{ fontFamily: fonts.heading, fontSize: '96px', fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, color: colors.white, textShadow: `4px 4px 0 ${colors.black}` }}>
					Context<br />
					<span style={{ display: 'inline-block', padding: '2px 24px', background: cyan, color: colors.black, border: `4px solid ${colors.black}`, boxShadow: `6px 6px 0 ${colors.black}`, transform: 'rotate(-1deg)', marginTop: 8 }}>
						Engineering
					</span>
				</motion.h1>

				<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
					style={{ marginTop: 28, fontFamily: fonts.heading, fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.9)', borderLeft: `5px solid ${cyan}`, paddingLeft: 16, lineHeight: 1.5 }}>
					从 Prompt Engineering 到上下文信息系统设计<br />
					<span style={{ color: colors.yellow, fontSize: 18 }}>设计 AI 能"看到"什么，比写好一句话更重要</span>
				</motion.p>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
					{[
						{ label: '四种上下文来源', bg: cyan },
						{ label: 'Token 预算管理', bg: colors.white },
						{ label: '动态组装实战', bg: colors.yellow },
						{ label: 'CLAUDE.md Pattern', bg: colors.dark },
					].map(({ label, bg }) => (
						<span key={label} style={{ padding: '10px 20px', background: bg, border, boxShadow: `4px 4px 0 ${colors.black}`, fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: bg === colors.dark ? colors.yellow : colors.black }}>
							{label}
						</span>
					))}
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
					style={{ marginTop: 36, fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
					www.jiangren.com.au · AI Engineering Bootcamp
				</motion.div>
			</div>
		</Slide>
	);
}
