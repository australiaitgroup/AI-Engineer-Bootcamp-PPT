import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

type Tag = 'fixed' | 'dynamic' | 'conditional' | 'required';
const tagStyles: Record<Tag, { bg: string; label: string }> = {
	fixed:     { bg: colors.dark,   label: '固定' },
	dynamic:   { bg: cyan,          label: '动态' },
	conditional:{ bg: colors.orange, label: '条件' },
	required:  { bg: colors.red,    label: '必须' },
};

function TagBadge({ type }: { type: Tag }) {
	const { bg, label } = tagStyles[type];
	return (
		<span style={{ padding: '3px 10px', background: bg, fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: colors.white, border: `2px solid ${colors.black}`, whiteSpace: 'nowrap' }}>
			{label}
		</span>
	);
}

const csRows: { label: string; tag: Tag }[] = [
	{ label: 'System Prompt', tag: 'fixed' },
	{ label: '用户画像（VIP / 普通）', tag: 'dynamic' },
	{ label: '最近 5 轮对话历史', tag: 'dynamic' },
	{ label: 'FAQ 知识库检索', tag: 'dynamic' },
	{ label: '订单信息', tag: 'conditional' },
	{ label: '当前用户输入', tag: 'required' },
];

const codeRows: { label: string; tag: Tag }[] = [
	{ label: 'System Prompt（代码规范+技术栈）', tag: 'fixed' },
	{ label: '当前打开的文件内容', tag: 'dynamic' },
	{ label: '相关文件（import 分析自动找）', tag: 'dynamic' },
	{ label: '最近 5 轮对话', tag: 'dynamic' },
	{ label: '错误日志', tag: 'conditional' },
	{ label: '用户的代码问题', tag: 'required' },
];

function ScenarioCard({ title, icon, rows, accentColor }: { title: string; icon: string; rows: { label: string; tag: Tag }[]; accentColor: string }) {
	return (
		<div style={{ flex: 1, background: colors.white, border, boxShadow: shadow, overflow: 'hidden' }}>
			<div style={{ padding: '14px 18px', background: accentColor, borderBottom: `3px solid ${colors.black}` }}>
				<p style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 800, color: colors.white }}>
					{icon} {title}
				</p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{rows.map(({ label, tag }, i) => (
					<div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', background: i % 2 === 0 ? '#fafafa' : '#fff', borderBottom: i < rows.length - 1 ? `1px solid #eee` : 'none' }}>
						<span style={{ fontFamily: fonts.body, fontSize: 14, color: '#333' }}>{label}</span>
						<TagBadge type={tag} />
					</div>
				))}
			</div>
		</div>
	);
}

export default function S09_ScenarioComparison() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center style={{ gap: 24 }}>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 09</span>
					<Title style={{ marginTop: 8 }}>动态组装：<span style={{ color: cyan }}>场景对比</span></Title>
					<Divider color={cyan} center />
					<p style={{ fontFamily: fonts.body, fontSize: 17, color: '#666' }}>没有万能的上下文组装方案——每个场景都要单独设计</p>
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
					style={{ display: 'flex', gap: 28, width: '100%', alignItems: 'flex-start' }}>
					<ScenarioCard title="客服 Agent" icon="💬" rows={csRows} accentColor={cyan} />
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
						<span style={{ padding: '8px 18px', background: colors.yellow, border, fontFamily: fonts.heading, fontSize: 22, fontWeight: 900 }}>VS</span>
					</div>
					<ScenarioCard title="代码助手" icon="💻" rows={codeRows} accentColor={colors.indigo} />
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
					style={{ padding: '12px 24px', background: colors.dark, border, boxShadow: `4px 4px 0 ${colors.black}`, width: '100%' }}>
					<p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.yellow, textAlign: 'center', fontWeight: 700 }}>
						关键差异：客服需要用户画像 + 知识库 | 代码助手需要当前文件 + 关联文件。场景不同，设计不同。
					</p>
				</motion.div>
			</Inner>
		</Slide>
	);
}
