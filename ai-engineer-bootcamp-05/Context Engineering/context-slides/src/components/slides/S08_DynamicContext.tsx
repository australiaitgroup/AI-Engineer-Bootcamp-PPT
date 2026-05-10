import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border } from '../ui';

const cyan = '#06b6d4';

const steps = [
	{ num: 1, label: 'System Prompt', note: '固定加载，每次都有', color: colors.dark },
	{ num: 2, label: '用户画像', note: '从数据库动态拉取', color: colors.indigo },
	{ num: 3, label: '对话历史', note: '滑动窗口，仅最近5轮', color: colors.purple },
	{ num: 4, label: '知识库检索', note: 'RAG 按需检索 top-3', color: cyan },
	{ num: 5, label: '订单信息', note: '条件加载，按关键词触发', color: colors.orange },
];

const code = `def build_customer_service_context(user_id, message):
    # 1. 固定部分 — 每次都加载
    system = load_system_prompt('cs_v3.txt')  # ~500 tokens

    # 2. 动态 — 用户画像
    profile = db.get_user_profile(user_id)

    # 3. 动态 — 最近 5 轮对话（滑动窗口）
    recent = get_recent_messages(user_id, last_n=5)

    # 4. 动态 — 知识库检索
    docs = rag_search(message, top_k=3)

    # 5. 条件加载 — 只在提到订单时查询
    order_info = ""
    if '订单' in message or '退款' in message:
        order_info = get_recent_orders(user_id)`;

export default function S08_DynamicContext() {
	return (
		<Slide bg={colors.darkBg}>
			<Inner split style={{ gap: 48 }}>
				<Half style={{ flex: '0 0 360px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cyan, letterSpacing: 2 }}>SLIDE 08</span>
						<Title white style={{ marginTop: 8, fontSize: '44px' }}>动态上下文组装<br /><span style={{ color: cyan }}>客服 Agent</span></Title>
						<Divider color={cyan} />
						<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 24 }}>
							每次用户发消息，代码需要动态组装上下文——不是每次都加载所有信息
						</p>
					</motion.div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						{steps.map(({ num, label, note, color }, i) => (
							<motion.div key={num} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: color, border: `2px solid ${colors.black}` }}>
									<span style={{ width: 24, height: 24, background: colors.yellow, border: `2px solid ${colors.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.black, flexShrink: 0 }}>{num}</span>
									<div>
										<div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 800, color: colors.white }}>{label}</div>
										<div style={{ fontFamily: fonts.mono, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{note}</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
						style={{ marginTop: 16, padding: '12px 14px', background: colors.yellow, border }}>
						<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
							💡 关键：订单信息只在用户提到"订单""退款"时才查询——按需加载节省 token
						</p>
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 12, color: cyan, fontWeight: 700, marginBottom: 8 }}>build_customer_service_context()</div>
						<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px' }}>
							<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{code}</pre>
						</div>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
