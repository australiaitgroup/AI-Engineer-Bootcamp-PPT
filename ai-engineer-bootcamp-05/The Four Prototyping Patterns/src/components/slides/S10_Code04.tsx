import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border } from '../ui';

const plannerCode = `# 1. Planner: LLM 生成步骤计划
plan_prompt = "Given goal: {goal},"
             "output a numbered plan."

plan = llm.generate(plan_prompt.format(
    goal="Write 3-slide summary of doc X"))
# plan: 1.search 2.extract 3.summarize`;

const executorCode = `# 2. Executor: 按计划逐步执行工具
for step in parsed_plan:
    if step.type == "search":
        obs = search_tool(step.input)
    elif step.type == "summarize":
        obs = summarizer_tool(step.input)
    # obs 反馈给下一步

# 3. 组装最终输出
final = llm.generate("Assemble slides...")`;

export default function S10_Code04() {
	return (
		<Slide bg={colors.darkBg}>
			<Inner split style={{ gap: 40 }}>
				<Half style={{ flex: '0 0 340px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.orange, letterSpacing: 2 }}>SLIDE 10</span>
						<Title white style={{ marginTop: 8 }}>代码示例 04</Title>
						<Divider color={colors.orange} />
						<p style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 800, color: colors.yellow, marginBottom: 12 }}>Planner + Executor</p>
						<p style={{ fontFamily: fonts.body, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 20 }}>
							对复杂任务，显式的规划器 + 执行器比单纯 ReAct 更可控，便于监控与断点重试。
						</p>
					</motion.div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{[
							{ label: 'Planner（规划器）', items: ['基于目标生成步骤列表', '由 LLM 担任控制器', '输出结构化计划（JSON/编号）'], color: colors.orange },
							{ label: 'Executor（执行器）', items: ['按计划逐步调用工具', '把观测结果回传 Planner', '支持断点重试与监控'], color: colors.teal },
						].map(({ label, items, color }) => (
							<motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
								<div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: `2px solid ${color}` }}>
									<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: color, marginBottom: 8 }}>{label}</div>
									{items.map((item, i) => (
										<p key={i} style={{ fontFamily: fonts.body, fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>• {item}</p>
									))}
								</div>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ marginTop: 14, padding: '12px 14px', background: colors.orange, border }}>
						<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.black, fontWeight: 700 }}>
							💡 适合：多步骤、需要条件分支的复杂任务；比 ReAct 更可控，便于监控每一步
						</p>
					</motion.div>
				</Half>

				<Half>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
							<div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.orange, fontWeight: 700, marginBottom: 6 }}>planner_executor.py</div>
							<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '16px 18px' }}>
								<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{plannerCode}</pre>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
							<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '16px 18px' }}>
								<pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{executorCode}</pre>
							</div>
						</motion.div>

						{/* 对比 */}
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} style={{ display: 'flex', gap: 12 }}>
							<div style={{ flex: 1, padding: '10px 12px', background: 'rgba(255,255,255,0.06)', borderLeft: `3px solid #555` }}>
								<p style={{ fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>ReAct 模式：灵活，适合短任务</p>
							</div>
							<div style={{ flex: 1, padding: '10px 12px', background: 'rgba(255,145,77,0.15)', borderLeft: `3px solid ${colors.orange}` }}>
								<p style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.orange, fontWeight: 700 }}>Planner+Executor：可控，适合长任务</p>
							</div>
						</motion.div>
					</div>
				</Half>
			</Inner>
		</Slide>
	);
}
