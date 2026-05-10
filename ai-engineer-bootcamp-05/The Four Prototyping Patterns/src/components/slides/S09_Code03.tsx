import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, CardSm, colors, fonts, border } from '../ui';

const memoryTypes = [
	{ name: 'ConversationBufferMemory', desc: '完整保存所有对话', note: '简单但占 token', color: colors.teal },
	{ name: 'ConversationSummaryMemory', desc: '自动摘要旧对话', note: '节省 token', color: colors.indigo },
	{ name: 'VectorStoreMemory', desc: '向量化存储长期记忆', note: '按相关性检索', color: colors.purple },
];

const code = `from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True)

agent = initialize_agent(tools, llm,
    agent="zero-shot-react-description",
    memory=memory)  # 注入 memory

agent.run("Find the latest sales for product X.")
agent.run("Compare with last month and explain trend.")
# 第2次调用能利用第1次的上下文!`;

export default function S09_Code03() {
	return (
		<Slide bg={colors.darkBg}>
			<Inner split style={{ gap: 48 }}>
				<Half style={{ flex: '0 0 380px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.purple, letterSpacing: 2 }}>SLIDE 09</span>
						<Title white style={{ marginTop: 8 }}>代码示例 03</Title>
						<Divider color={colors.purple} />
						<p style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 800, color: colors.yellow, marginBottom: 16 }}>加入 Memory（多轮任务）</p>
						<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 20 }}>
							Memory 让 Agent 在多轮对话中保持上下文，不再"失忆"
						</p>
					</motion.div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{memoryTypes.map(({ name, desc, note, color }, i) => (
							<motion.div key={name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
								<CardSm bg={color} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
									<div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.yellow }}>{name}</div>
									<div style={{ fontFamily: fonts.body, fontSize: 15, color: colors.white, fontWeight: 600 }}>{desc}</div>
									<div style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>→ {note}</div>
								</CardSm>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,165,0,0.15)', border: `2px solid ${colors.orange}` }}>
						<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.orange, fontWeight: 700 }}>
							⚠️ Memory 注意：对话越长成本越高。每 10 轮做一次摘要，保留关键决策，丢弃寒暄。
						</p>
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px 20px' }}>
							<div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.purple, marginBottom: 10, fontWeight: 700 }}>agent_with_memory.py</div>
							<pre style={{ fontFamily: fonts.mono, fontSize: 13, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{code}</pre>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
						<div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.06)', borderLeft: `4px solid ${colors.red}` }}>
							<p style={{ fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
								❌ 无 Memory：第2轮不知道第1轮说了什么，用户被迫重复
							</p>
						</div>
						<div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.15)', borderLeft: `4px solid ${colors.teal}` }}>
							<p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.teal, fontWeight: 700 }}>
								✅ 有 Memory：Agent 自动记住上下文，多轮任务流畅推进
							</p>
						</div>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
