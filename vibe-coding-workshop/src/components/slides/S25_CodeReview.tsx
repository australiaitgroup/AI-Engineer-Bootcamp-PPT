import { motion } from 'framer-motion';
import { Slide, Inner, Title, Divider, colors, fonts, border, shadow } from '../ui';

const violet = '#8b5cf6';

const checklist = [
  { category: '安全性', items: ['SQL 注入风险（用参数化查询？）', 'XSS 漏洞（输出是否转义？）', '敏感信息是否暴露在日志/响应里'], color: '#ef4444' },
  { category: '逻辑正确性', items: ['边界条件（空数组、null、0）', '并发安全（race condition）', '错误处理是否完整'], color: '#f97316' },
  { category: '代码质量', items: ['函数是否太长（>50 行考虑拆分）', '是否有重复代码', '命名是否清晰表达意图'], color: violet },
  { category: '性能', items: ['N+1 查询问题', '不必要的重复计算', '大数据量的分页/分批'], color: '#14b8a6' },
];

const reviewPrompt = `# 代码 Review Prompt 模板

@src/services/userService.ts

请对这个文件做安全 + 质量 Review：
1. 找出所有安全漏洞（SQL注入/XSS等）
2. 检查错误处理是否完整
3. 找出逻辑 bug 或边界条件问题
4. 代码质量建议（重复/命名/结构）

每个问题说明：位置、原因、修复方案。
先报告严重问题，再报告建议性改进。`;

export default function S25_CodeReview() {
  return (
    <Slide bg={colors.white}>
      <Inner split style={{ gap: 48 }}>
        <div style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: violet, letterSpacing: 2 }}>PART 4 · ADVANCED</span>
            <Title style={{ marginTop: 8 }}>AI 写的代码<br /><span style={{ color: violet }}>如何 Review</span></Title>
            <Divider color={violet} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {checklist.map(({ category, items, color }) => (
                <div key={category} style={{ border: `1px solid ${color}`, overflow: 'hidden' }}>
                  <div style={{ background: color, padding: '6px 14px' }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800, color: colors.white }}>{category}</span>
                  </div>
                  <div style={{ padding: '10px 14px', background: `${color}08` }}>
                    {items.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                        <span style={{ color, fontWeight: 900, fontSize: 12, flexShrink: 0 }}>□</span>
                        <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.dark }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 10 }}>Review Prompt 模板</div>
            <div style={{ background: '#0d1117', border: `2px solid #30363d`, padding: '18px 16px', boxShadow: shadow }}>
              <pre style={{ fontFamily: fonts.mono, fontSize: 12, color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.9 }}>{reviewPrompt}</pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: violet, fontWeight: 700, marginBottom: 10 }}>常见 AI 代码陷阱</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { pit: '过度自信的错误处理', desc: '"catch (e) {}" — 吞掉错误什么都不做' },
                { pit: '硬编码的魔法数字', desc: 'if (status === 2) — 2 是什么鬼？' },
                { pit: '假设不会失败', desc: '缺少 null check，当数据不存在时 crash' },
                { pit: '同步执行异步操作', desc: '忘了 await，返回 Promise 而非实际值' },
              ].map(({ pit, desc }) => (
                <div key={pit} style={{ padding: '10px 14px', background: '#fff5f5', border: `1px solid #fca5a5` }}>
                  <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 800, color: '#c0392b', marginBottom: 3 }}>⚠️ {pit}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 11, color: '#c0392b', opacity: 0.8 }}>{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Inner>
    </Slide>
  );
}
