import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const errors = [
	{
		wrong: '把所有规则塞进一个巨大的 System Prompt',
		problem: '超过 2000 tokens 后模型对中间内容的注意力显著下降',
		fix: '用分层结构（CLAUDE.md pattern），每层短而聚焦',
	},
	{
		wrong: '128K 窗口就用 128K',
		problem: '实测超过 20K tokens 后效果开始下降，"Lost in the Middle" 问题',
		fix: '保持有效 context 在 10-30K 范围内，关键信息放开头或结尾',
	},
	{
		wrong: 'System Prompt 里写空洞描述',
		problem: '"你是一个专业的、负责任的、有创造力的助手"——占 token 但零信息量',
		fix: '2000 token 的 Prompt 真正有用的往往不到 200 token，只写具体规则',
	},
];

export default function S14_CommonErrors() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.red, letterSpacing: 2 }}>SLIDE 14</span>
					<Title style={{ marginTop: 8 }}>三个<span style={{ color: colors.red }}> 常见错误</span></Title>
					<Divider color={colors.red} center />
				</motion.div>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
					{errors.map(({ wrong, problem, fix }, i) => (
						<motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.15 }}>
							<div style={{ border, boxShadow: shadow, overflow: 'hidden' }}>
								{/* 错误行 */}
								<div style={{ display: 'flex', gap: 0 }}>
									<div style={{ width: 56, background: colors.red, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
										<span style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 900, color: colors.white }}>❌</span>
									</div>
									<div style={{ flex: 1, padding: '14px 18px', background: '#fff5f5', borderBottom: `2px solid ${colors.black}` }}>
										<span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 800, color: colors.black }}>{wrong}</span>
									</div>
								</div>
								{/* 问题 */}
								<div style={{ display: 'flex', gap: 0 }}>
									<div style={{ width: 56, background: '#fde8e8', borderRight: `2px solid ${colors.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.red, fontWeight: 700, writing: 'vertical' }}>问题</span>
									</div>
									<div style={{ flex: 1, padding: '12px 18px', background: '#fff8f8', borderBottom: `2px solid ${colors.black}` }}>
										<p style={{ fontFamily: fonts.body, fontSize: 15, color: '#c0392b' }}>{problem}</p>
									</div>
								</div>
								{/* 正确做法 */}
								<div style={{ display: 'flex', gap: 0 }}>
									<div style={{ width: 56, background: colors.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900, color: colors.white }}>✅</span>
									</div>
									<div style={{ flex: 1, padding: '12px 18px', background: '#f0fdf9' }}>
										<p style={{ fontFamily: fonts.body, fontSize: 15, color: '#065f46', fontWeight: 600 }}>正确做法：{fix}</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
