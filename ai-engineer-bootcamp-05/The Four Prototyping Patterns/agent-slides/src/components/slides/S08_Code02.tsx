import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Divider, colors, fonts, border, shadow } from '../ui';

const code = `from langchain.agents import Tool, initialize_agent
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0)

# rag_qa 是你已有的 RAG pipeline
def doc_qa_tool(query: str) -> str:
    return rag_qa(query)  # 直接复用现有 RAG

tool = Tool(
    name="DocumentQA",
    func=doc_qa_tool,
    description="Answer questions using uploaded docs"
)

agent = initialize_agent([tool], llm,
    agent="zero-shot-react-description")`;

export default function S08_Code02() {
	return (
		<Slide bg={colors.darkBg}>
			<Inner split style={{ gap: 48 }}>
				<Half style={{ flex: '0 0 380px' }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: colors.indigo, letterSpacing: 2 }}>SLIDE 08</span>
						<Title white style={{ marginTop: 8 }}>代码示例 02</Title>
						<Divider color={colors.indigo} />
						<p style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 800, color: colors.yellow, marginBottom: 16 }}>RAG 封装成 Tool</p>
						<p style={{ fontFamily: fonts.body, fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
							把已有的 RAG pipeline 包装成 Tool，让 Agent 把文档问答能力作为工具使用。
						</p>
					</motion.div>

					{/* 架构图 */}
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
						{[
							{ label: '用户输入', bg: colors.indigo },
							{ label: '↓', bg: 'transparent', noBox: true },
							{ label: 'Agent (LLM)', bg: colors.purple },
							{ label: '↓ 调用', bg: 'transparent', noBox: true },
							{ label: 'DocumentQA Tool', bg: colors.teal },
							{ label: '↓ 内部走', bg: 'transparent', noBox: true },
							{ label: 'RAG Pipeline', bg: colors.orange },
							{ label: '↓ 查询', bg: 'transparent', noBox: true },
							{ label: '向量数据库', bg: '#444' },
						].map(({ label, bg, noBox }, i) => (
							noBox
								? <div key={i} style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{label}</div>
								: <div key={i} style={{ padding: '8px 16px', background: bg, border, textAlign: 'center', fontFamily: fonts.body, fontSize: 15, fontWeight: 700, color: colors.white }}>{label}</div>
						))}
					</motion.div>
				</Half>

				<Half>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '20px 20px' }}>
							<div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.teal, marginBottom: 10, fontWeight: 700 }}>agent_with_docqa.py</div>
							<pre style={{ fontFamily: fonts.mono, fontSize: 13, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{code}</pre>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 20, padding: '14px 16px', background: colors.teal, border, boxShadow: shadow }}>
						<p style={{ fontFamily: fonts.body, fontSize: 15, color: colors.black, fontWeight: 600 }}>
							✅ 优点：把复杂 RAG 封装为单一 Tool，Agent 可以组合使用：<br />
							<strong>先查文档 → 再生成 PPT 提纲</strong>
						</p>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
