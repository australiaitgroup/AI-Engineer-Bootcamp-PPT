import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const cyan = '#06b6d4';

const code = `from langchain_core.runnables import (
    RunnablePassthrough, RunnableParallel
)

# 并行获取多个上下文数据源
context_chain = RunnableParallel(
    user_profile = RunnablePassthrough() | get_user_profile,
    knowledge    = RunnablePassthrough() | search_knowledge_base,
    question     = lambda x: x['question'],
)

chain = context_chain | prompt | ChatOpenAI(model='gpt-4o')

result = chain.invoke({
    'user_id': 'u123',
    'question': '我要退款'
})`;

export default function S10_RunnableParallel() {
	return (
		<Slide bg={colors.darkBg}>
			<Inner split style={{ gap: 48 }}>
				<Half style={{ flex: '0 0 380px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 10</span>
						<Title white style={{ marginTop: 8, fontSize: '42px' }}>LangChain<br /><span style={{ color: cyan }}>RunnableParallel</span></Title>
						<Divider color={cyan} />
						<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 24 }}>
							手动拼字符串到第三个数据源就崩了。RunnableParallel 并行获取多个上下文，比串行快 2-3 倍：
						</p>
					</motion.div>

					{/* 串行 vs 并行对比 */}
					<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
							<div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.06)', border: `2px solid ${colors.red}` }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.red, fontWeight: 700, marginBottom: 8 }}>❌ 串行（旧方式）</div>
								{[['取用户画像', '0.8s'], ['查知识库', '1.2s'], ['取订单信息', '1.2s']].map(([label, t]) => (
									<div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
										<span>{label} →</span><span style={{ color: 'rgba(255,100,100,0.9)' }}>{t}</span>
									</div>
								))}
								<div style={{ borderTop: `1px solid rgba(255,255,255,0.15)`, marginTop: 8, paddingTop: 8, fontFamily: fonts.mono, fontSize: 13, color: colors.red, fontWeight: 700 }}>合计：3.2s</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
							<div style={{ padding: '14px 16px', background: 'rgba(6,182,212,0.12)', border: `2px solid ${cyan}` }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, color: cyan, fontWeight: 700, marginBottom: 8 }}>✅ 并行（RunnableParallel）</div>
								<div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
									<div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
										{['取用户画像', '查知识库', '取订单信息'].map(l => (
											<span key={l} style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{l}</span>
										))}
									</div>
									<span style={{ fontFamily: fonts.mono, fontSize: 16, color: cyan }}>┼→</span>
									<span style={{ fontFamily: fonts.mono, fontSize: 12, color: cyan, fontWeight: 700 }}>1.2s（同时）</span>
								</div>
								<div style={{ borderTop: `1px solid rgba(6,182,212,0.3)`, marginTop: 8, paddingTop: 8, fontFamily: fonts.mono, fontSize: 13, color: cyan, fontWeight: 700 }}>合计：1.4s 🎉</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
							style={{ padding: '12px 14px', background: colors.yellow, border, boxShadow: shadow }}>
							<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
								实测：客服系统从串行改并行后，P99 延迟从 3.2s 降到 1.4s
							</p>
						</motion.div>
					</div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 12, color: cyan, fontWeight: 700, marginBottom: 8 }}>runnable_parallel_example.py</div>
						<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px' }}>
							<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{code}</pre>
						</div>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
