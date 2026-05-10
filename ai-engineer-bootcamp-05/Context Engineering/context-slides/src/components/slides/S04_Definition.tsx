import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const questions = [
	'给 AI 看哪些文档？',
	'这些信息怎么排列？',
	'加载哪些工具？',
	'总共不能超过多少 token？',
	'保留多少对话历史？',
];

export default function S04_Definition() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 04</span>
					<Title style={{ marginTop: 8 }}>Context Engineering<span style={{ color: cyan }}> 定义</span></Title>
					<Divider color={cyan} center />
				</motion.div>

				{/* 核心定义 */}
				<motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
					style={{ padding: '24px 36px', background: cyan, border, boxShadow: `8px 8px 0 ${colors.black}`, textAlign: 'center', maxWidth: 900 }}>
					<p style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 800, color: colors.black, lineHeight: 1.4 }}>
						Context Engineering = 为 AI 在每次交互时构建<span style={{ background: colors.yellow, padding: '0 8px' }}>最优上下文</span>的艺术和科学
					</p>
				</motion.div>

				{/* 类比 */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
					style={{ display: 'flex', gap: 28, alignItems: 'center', width: '100%', maxWidth: 900 }}>
					<div style={{ flex: 1, padding: '20px 22px', background: colors.white, border, boxShadow: shadow, textAlign: 'center' }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 700 }}>Prompt Engineering</div>
						<div style={{ fontSize: 32, marginBottom: 8 }}>✉️</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, color: colors.black }}>写好一封邮件</div>
					</div>
					<div style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 900, color: cyan }}>→</div>
					<div style={{ flex: 1, padding: '20px 22px', background: cyan, border, boxShadow: shadow, textAlign: 'center' }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(0,0,0,0.5)', marginBottom: 8, fontWeight: 700 }}>Context Engineering</div>
						<div style={{ fontSize: 32, marginBottom: 8 }}>🏗</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, color: colors.black }}>管理整个信息系统</div>
					</div>
				</motion.div>

				{/* CE 要决定的问题 */}
				<div style={{ width: '100%', maxWidth: 900 }}>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
						<div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
							Context Engineering 要决定的问题：
						</div>
					</motion.div>
					<Stagger style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						{questions.map((q) => (
							<StaggerItem key={q}>
								<span style={{ padding: '10px 18px', background: colors.dark, color: colors.yellow, fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, border, boxShadow: `3px 3px 0 ${colors.black}` }}>
									{q}
								</span>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</Inner>
		</Slide>
	);
}
