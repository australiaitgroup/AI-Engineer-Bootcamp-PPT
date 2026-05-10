import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, Stagger, StaggerItem, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const principles = [
	{
		num: '01', title: '最高优先级：System Prompt + 当前任务',
		desc: '没有 System Prompt，AI 会"忘记"自己的角色和规则。当前任务直接决定回答质量。',
		tip: '💡 考试时先看题目要求和参考资料，不是把笔记本全搬进考场',
		color: colors.dark,
	},
	{
		num: '02', title: '压缩而不是丢弃',
		desc: '100 轮对话不要全塞进去。每 10 轮让 AI 生成摘要（几百 token）。保留：关键决策、用户偏好、重要事实。丢弃：寒暄、重复、过时信息。',
		tip: '💡 摘要保留信号，去除噪音',
		color: cyan,
	},
	{
		num: '03', title: '按需加载',
		desc: '不要预先塞入所有可能用到的文档。用户问什么再去检索相关内容。',
		tip: '💡 这就是 RAG 的核心思想',
		color: colors.orange,
	},
	{
		num: '04', title: '预留输出空间',
		desc: '别把 context window 用满，留 10-20% 给 AI 回答。',
		tip: '💡 128K 窗口实测超过 20K tokens 效果开始下降',
		color: colors.teal,
	},
];

export default function S07_BudgetPrinciples() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center style={{ gap: 28 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 07</span>
					<Title style={{ marginTop: 8 }}>预算管理<span style={{ color: cyan }}> 四原则</span></Title>
					<Divider color={cyan} center />
				</motion.div>

				<Stagger style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%' }}>
					{principles.map(({ num, title, desc, tip, color }) => (
						<StaggerItem key={num}>
							<motion.div whileHover={{ x: 4, y: 4, boxShadow: '0 0 0 #000' }} transition={{ duration: 0.15 }}
								style={{ background: color, border, boxShadow: shadow, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
									<span style={{ padding: '4px 12px', background: colors.yellow, fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.black, border: `2px solid ${colors.black}`, flexShrink: 0 }}>{num}</span>
									<div style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 800, color: colors.white, lineHeight: 1.3 }}>{title}</div>
								</div>
								<div style={{ width: 32, height: 3, background: 'rgba(255,255,255,0.4)' }} />
								<p style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, flex: 1 }}>{desc}</p>
								<div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderLeft: `3px solid ${colors.yellow}` }}>
									<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.yellow, fontWeight: 700 }}>{tip}</p>
								</div>
							</motion.div>
						</StaggerItem>
					))}
				</Stagger>
			</Inner>
		</Slide>
	);
}
