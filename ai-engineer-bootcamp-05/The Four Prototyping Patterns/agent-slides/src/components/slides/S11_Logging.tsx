import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, CardSm, colors, fonts, border } from '../ui';

const logItems = [
	{ icon: '💭', label: 'Thought', desc: 'LLM 的推理过程', example: '"我需要先搜索澳大利亚人口..."', color: colors.indigo },
	{ icon: '⚡', label: 'Action', desc: '调用了哪个 Tool', example: '工具名称 + 输入参数', color: colors.teal },
	{ icon: '👁', label: 'Observation', desc: '工具返回了什么结果', example: '原始输出 + 状态码', color: colors.orange },
	{ icon: '✅', label: 'Final Answer', desc: 'Agent 的最终输出', example: '以及经过了几步才完成', color: colors.green },
];

const code = `from langchain.callbacks import StdOutCallbackHandler
from langchain.callbacks import FileCallbackHandler

# verbose=True 打印每步 Thought/Action/Obs
agent = initialize_agent(
    tools, llm,
    verbose=True,  # 开启日志
    callbacks=[StdOutCallbackHandler(),
               FileCallbackHandler('agent.log')]
)

# 输出示例：
> Entering new AgentExecutor chain...
Thought: I need to search for population
Action: Search
Action Input: 'Australia population 2025'
Observation: 26.5 million (2025 estimate)
Final Answer: 26,501,000`;

export default function S11_Logging() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner split style={{ gap: 48 }}>
				<Half style={{ flex: '0 0 380px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.teal, letterSpacing: 2 }}>SLIDE 11</span>
						<Title style={{ marginTop: 8, fontSize: '52px' }}>Agent<br /><span style={{ color: colors.teal }}>Logging 系统</span></Title>
						<Divider color={colors.teal} />
						<p style={{ fontFamily: fonts.body, fontSize: 16, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
							Agent 自主运行时你看不见它在"想什么"——Logging 是让 Agent 可调试、可审计的唯一方法
						</p>
					</motion.div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						{logItems.map(({ icon, label, desc, example, color }, i) => (
							<motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
								<CardSm bg={colors.white} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
									<span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
									<div>
										<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: color }}>{label}</span>
										<p style={{ fontFamily: fonts.body, fontSize: 14, color: '#333', lineHeight: 1.4 }}>{desc}</p>
										<p style={{ fontFamily: fonts.mono, fontSize: 11, color: '#888' }}>{example}</p>
									</div>
								</CardSm>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ marginTop: 16, padding: '10px 14px', background: colors.teal, border }}>
						<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
							💡 三级策略：verbose=True（开发）→ FileCallback（测试）→ LangSmith（生产）
						</p>
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.teal, fontWeight: 700, marginBottom: 8 }}>agent_logging.py</div>
						<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px' }}>
							<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{code}</pre>
						</div>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
