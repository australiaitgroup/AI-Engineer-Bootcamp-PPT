import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const sources = [
	{
		icon: '⚙️', label: 'System Instructions', title: '系统指令',
		example: '角色定义、安全边界、输出格式',
		feature: '固定，每次都加载',
		bg: colors.dark, textColor: colors.white, tagBg: colors.yellow,
	},
	{
		icon: '💬', label: 'User Input', title: '用户输入',
		example: '问题、上传的文件、选择的选项',
		feature: '每次不同',
		bg: cyan, textColor: colors.black, tagBg: colors.white,
	},
	{
		icon: '🔧', label: 'Tool Results', title: '工具结果',
		example: 'API 响应、数据库查询、搜索结果',
		feature: '按需加载，可能很大',
		bg: colors.orange, textColor: colors.white, tagBg: colors.yellow,
	},
	{
		icon: '🧠', label: 'Memory', title: '记忆',
		example: '对话摘要、用户偏好、长期记忆',
		feature: '需要压缩管理',
		bg: colors.indigo, textColor: colors.white, tagBg: colors.yellow,
	},
];

export default function S05_FourSources() {
	return (
		<Slide bg="#f0f9ff">
			<Inner center style={{ gap: 24 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 05</span>
					<Title style={{ marginTop: 8 }}>四种<span style={{ color: cyan }}> 上下文来源</span></Title>
					<Divider color={cyan} center />
				</motion.div>

				<div style={{ display: 'flex', gap: 20, alignItems: 'stretch', width: '100%' }}>
					<Stagger style={{ display: 'flex', flex: 3, gap: 18 }}>
						{sources.map(({ icon, label, title, example, feature, bg, textColor, tagBg }) => (
							<StaggerItem key={label} style={{ flex: 1 }}>
								<motion.div whileHover={{ x: 4, y: 4, boxShadow: '0 0 0 #000' }} transition={{ duration: 0.15 }}
									style={{ background: bg, border, boxShadow: shadow, padding: '22px 16px', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
									<span style={{ fontSize: 32 }}>{icon}</span>
									<div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: bg === colors.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)', letterSpacing: 1 }}>{label}</div>
									<div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 800, color: textColor, lineHeight: 1.2 }}>{title}</div>
									<div style={{ width: 32, height: 3, background: bg === colors.dark || bg === colors.indigo || bg === colors.orange ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }} />
									<p style={{ fontFamily: fonts.body, fontSize: 14, color: bg === colors.dark || bg === colors.indigo || bg === colors.orange ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)', lineHeight: 1.5, flex: 1 }}>
										示例：{example}
									</p>
									<span style={{ padding: '4px 10px', background: tagBg, fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: colors.black, alignSelf: 'flex-start', border: `2px solid ${colors.black}` }}>
										{feature}
									</span>
								</motion.div>
							</StaggerItem>
						))}
					</Stagger>

					{/* 中心 LLM */}
					<motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.6, type: 'spring', stiffness: 160 }}
						style={{ flex: '0 0 160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<div style={{ padding: '20px 18px', background: colors.yellow, border, boxShadow: `6px 6px 0 ${colors.black}`, textAlign: 'center', transform: 'rotate(-2deg)' }}>
							<div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 900, marginBottom: 4 }}>LLM</div>
							<div style={{ fontFamily: fonts.mono, fontSize: 11, color: '#555', fontWeight: 700 }}>Context Window</div>
						</div>
					</motion.div>
				</div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
					style={{ padding: '12px 24px', background: colors.dark, border, boxShadow: `4px 4px 0 ${colors.black}`, width: '100%', maxWidth: 900 }}>
					<p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.yellow, textAlign: 'center', fontWeight: 700 }}>
						这四种来源贯穿整个 Bootcamp：Phase 2（RAG）→ Phase 3（Agent 工具）→ Phase 4（模型优化）
					</p>
				</motion.div>
			</Inner>
		</Slide>
	);
}
