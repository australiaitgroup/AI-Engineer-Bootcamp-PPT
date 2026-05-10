import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const known = [
	'Context 要分层管理，不能一股脑塞进去',
	'按需加载（RAG）比预载全部文档效果更好',
	'动态预算控制能同时降低成本和延迟',
	'对话摘要解决了长对话 token 爆炸问题',
];

const layers = [
	{ level: '项目级', desc: '全局规则、技术栈约束', note: '= System Prompt 的持久化', color: colors.dark },
	{ level: '模块级', desc: '领域专属规则', note: '= 按需 RAG 的结构化替代', color: cyan },
	{ level: '用户级', desc: '个人偏好设置', note: '= 用户画像的工程化存储', color: colors.indigo },
];

export default function S12_Transition() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner split style={{ gap: 56 }}>
				<Half>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 12</span>
						<Title style={{ marginTop: 8, fontSize: '46px' }}>数据验证了方向——<br /><span style={{ color: cyan }}>工程上怎么落地？</span></Title>
						<Divider color={cyan} />
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
						<div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, marginBottom: 14 }}>✅ 我们已经知道的：</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							{known.map((item, i) => (
								<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
									<div style={{ display: 'flex', gap: 12, padding: '10px 14px', background: colors.white, border: `2px solid ${cyan}` }}>
										<span style={{ color: cyan, fontWeight: 900 }}>✓</span>
										<span style={{ fontFamily: fonts.body, fontSize: 15, color: '#333' }}>{item}</span>
									</div>
								</motion.div>
							))}
						</div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
							style={{ marginTop: 20, padding: '14px 16px', background: colors.yellow, border, boxShadow: shadow }}>
							<p style={{ fontFamily: fonts.body, fontSize: 15, color: colors.black, fontWeight: 600, lineHeight: 1.5 }}>
								<strong>但这些规则放哪里？怎么复用？</strong><br />多人协作时，Context 策略怎么统一？
							</p>
						</motion.div>
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
						<div style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>
							下一步：<span style={{ color: cyan }}>CLAUDE.md Pattern</span>
						</div>
					</motion.div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
						{layers.map(({ level, desc, note, color }, i) => (
							<motion.div key={level} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}>
								<div style={{ display: 'flex', gap: 0, border, boxShadow: `4px 4px 0 ${colors.black}`, overflow: 'hidden' }}>
									<div style={{ width: 90, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 8px' }}>
										<span style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white, textAlign: 'center' }}>{level}</span>
									</div>
									<div style={{ flex: 1, padding: '14px 16px', background: colors.white }}>
										<div style={{ fontFamily: fonts.body, fontSize: 16, color: '#333', fontWeight: 600 }}>{desc}</div>
										<div style={{ fontFamily: fonts.mono, fontSize: 12, color: color, marginTop: 4, fontWeight: 700 }}>{note}</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
						style={{ marginTop: 18, padding: '14px 16px', background: colors.dark, border, boxShadow: shadow }}>
						<p style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
							把 Context Engineering 策略写进项目结构里，而不是散落在代码注释和每个人的脑子里
						</p>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
