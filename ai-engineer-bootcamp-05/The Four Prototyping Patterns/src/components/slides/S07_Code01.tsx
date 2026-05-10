import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const steps = [
	{ num: 1, title: '导入 LangChain 必要模块', code: 'from langchain import OpenAI\nfrom langchain.agents import Tool, initialize_agent' },
	{ num: 2, title: '初始化 LLM（决策器）', code: 'llm = OpenAI(temperature=0)' },
	{ num: 3, title: '定义工具函数', code: 'def calculator_tool(input_str: str) -> str:\n    return str(eval(input_str))\n\ndef search_tool(query: str) -> str:\n    return f"Search results: ..."' },
	{ num: 4, title: '用 Tool 包装：name + func + description', code: 'tools = [\n  Tool(name="Calculator", func=calculator_tool,\n       description="Performs arithmetic"),\n  Tool(name="Search", func=search_tool,\n       description="Searches documents"),\n]' },
	{ num: 5, title: 'initialize_agent 把 LLM 和 Tools 组合', code: 'agent = initialize_agent(tools, llm,\n    agent="zero-shot-react-description",\n    verbose=True)' },
];

export default function S07_Code01() {
	return (
		<Slide bg={colors.darkBg}>
			<Inner split style={{ gap: 48 }}>
				{/* 左侧 */}
				<Half style={{ flex: '0 0 340px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.teal, letterSpacing: 2 }}>SLIDE 07</span>
						<Title white style={{ marginTop: 8 }}>代码示例 01</Title>
						<Divider color={colors.teal} />
						<p style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 800, color: colors.yellow, marginBottom: 16 }}>最小 Agent</p>
						<p style={{ fontFamily: fonts.body, fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
							从零开始：定义两个工具（Calculator + Search），初始化 Agent，运行。
						</p>
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 28 }}>
						<div style={{ padding: '14px 16px', background: colors.teal, border, boxShadow: shadow }}>
							<p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.black, fontWeight: 700 }}>
								agent.run("Find the population of Australia and then add 1000.")
							</p>
						</div>
						<div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.08)', borderLeft: `3px solid ${colors.yellow}` }}>
							<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.yellow }}>
								→ Agent 自动决定先 Search 再 Calculator
							</p>
						</div>
					</motion.div>
				</Half>

				{/* 右侧：步骤代码 */}
				<Half>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						{steps.map(({ num, title, code }, i) => (
							<motion.div key={num} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
									<span style={{ width: 28, height: 28, background: colors.teal, border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.black, flexShrink: 0, marginTop: 2 }}>{num}</span>
									<div style={{ flex: 1 }}>
										<div style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{title}</div>
										<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '10px 14px' }}>
											<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{code}</pre>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</Half>
			</Inner>
		</Slide>
	);
}
