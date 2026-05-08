const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "The Four Prototyping Patterns";

const logoB64 = "image/png;base64," + fs.readFileSync("/home/claude/logo_b64.txt", "utf8").trim();

const C = {
  bg: "FBF0EB",
  dark: "1A1F4E",
  red: "E8453C",
  orange: "E8622A",
  white: "FFFFFF",
  gray: "6B7280",
  border: "E0D5CE",
  codeBlack: "1E1E1E",
  teal: "0D9488",
  green: "28A745",
  gold: "F59E0B",
  purple: "7C3AED",
  lightBlue: "EEF3FB",
  blue: "2B5BA8",
  lightGray: "F3F4F6",
};

function addLogo(slide) {
  slide.addImage({ data: logoB64, x: 8.55, y: 0.12, w: 1.3, h: 1.3 * (189 / 802) });
}

function addFooter(slide) {
  slide.addText("www.jiangren.com.au", {
    x: 0.4, y: 5.28, w: 3, h: 0.22,
    fontSize: 10, color: C.dark, bold: true, margin: 0,
  });
}

function addTitle(slide, title) {
  slide.addText(title, {
    x: 0.42, y: 0.18, w: 7.9, h: 0.55,
    fontSize: 24, bold: true, color: C.dark, fontFace: "Arial", margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 0.76, w: 1.1, h: 0.07,
    fill: { color: C.red }, line: { color: C.red },
  });
}

function addWatermark(slide) {
  slide.addText("J", {
    x: 7.8, y: -0.3, w: 1.5, h: 2.0,
    fontSize: 200, color: C.dark, bold: true, transparency: 94,
    fontFace: "Arial Black", margin: 0,
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 8.5, y: 3.8, w: 2.5, h: 2.5,
    fill: { color: C.dark, transparency: 96 },
    line: { color: C.dark, transparency: 94 },
  });
}

function shadow() {
  return { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 };
}

// ═══════════════════════════════════
// SLIDE 1 — 封面
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addImage({ data: logoB64, x: 0.42, y: 0.28, w: 2.2, h: 2.2 * (189 / 802) });

  s.addText("The Four", {
    x: 0.42, y: 1.3, w: 5.2, h: 0.75,
    fontSize: 42, bold: true, color: C.dark, fontFace: "Arial", margin: 0,
  });
  s.addText("Prototyping Patterns", {
    x: 0.42, y: 2.05, w: 5.2, h: 0.75,
    fontSize: 42, bold: true, color: C.orange, fontFace: "Arial", margin: 0,
  });
  s.addText("理解 AI Agent 的核心构件与工程化方法", {
    x: 0.42, y: 2.9, w: 5.0, h: 0.4,
    fontSize: 14, color: C.gray, margin: 0,
  });
  s.addText("JR Academy  ·  AI Engineering Bootcamp  ·  零基础适用", {
    x: 0.42, y: 3.45, w: 5.0, h: 0.32,
    fontSize: 11, bold: true, color: C.dark, margin: 0,
  });
  s.addText("www.jiangren.com.au", {
    x: 0.42, y: 5.15, w: 3, h: 0.22,
    fontSize: 10, color: C.dark, bold: true, margin: 0,
  });

  // Right dark panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.6, y: 0, w: 4.4, h: 5.625,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 6.2, y: 0.3, w: 3.5, h: 3.5,
    fill: { color: "FFFFFF", transparency: 93 }, line: { color: "FFFFFF", transparency: 90 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.8, y: 3.0, w: 2.0, h: 2.0,
    fill: { color: C.orange, transparency: 85 }, line: { color: C.orange, transparency: 80 },
  });

  // 4 patterns preview on dark panel
  const patterns = [
    { label: "01  Prompt", color: C.blue },
    { label: "02  RAG", color: C.teal },
    { label: "03  Agent", color: C.orange },
    { label: "04  Fine-tuning", color: C.purple },
  ];
  patterns.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.85, y: 1.0 + i * 1.05, w: 3.9, h: 0.78,
      fill: { color: p.color, transparency: 75 }, line: { color: p.color, transparency: 40 },
    });
    s.addText(p.label, {
      x: 6.0, y: 1.0 + i * 1.05, w: 3.6, h: 0.78,
      fontSize: 16, bold: true, color: C.white, valign: "middle", margin: 0,
    });
  });
}

// ═══════════════════════════════════
// SLIDE 2 — 什么是 Agent？
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "什么是 Agent？");

  // Definition box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 0.95, w: 9.2, h: 0.92,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("Agent = 能自主决定使用哪个工具、何时使用、如何组合工具以完成复杂任务的软件实体", {
    x: 0.55, y: 0.95, w: 9.0, h: 0.92,
    fontSize: 15, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // Comparison: LLM vs Agent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 2.05, w: 4.3, h: 3.2,
    fill: { color: C.white }, line: { color: C.border, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 2.05, w: 4.3, h: 0.48,
    fill: { color: C.gray }, line: { color: C.gray },
  });
  s.addText("普通 LLM 调用", {
    x: 0.55, y: 2.05, w: 4.1, h: 0.48,
    fontSize: 14, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const llmSteps = [
    "用户输入一句话",
    "LLM 生成一次回答",
    "结束",
    "",
    "特点：问一句，得一句",
    "局限：无法查数据库、调 API、",
    "        执行多步骤任务",
  ];
  llmSteps.forEach((t, i) => {
    s.addText(t, {
      x: 0.58, y: 2.62 + i * 0.34, w: 4.0, h: 0.32,
      fontSize: 11, color: i >= 4 ? C.gray : C.dark,
      italic: i >= 4, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 2.05, w: 4.32, h: 3.2,
    fill: { color: C.white }, line: { color: C.orange, width: 2 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 2.05, w: 4.32, h: 0.48,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("AI Agent", {
    x: 5.43, y: 2.05, w: 4.1, h: 0.48,
    fontSize: 14, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const agentSteps = [
    "用户输入目标",
    "LLM 决定调用哪个工具",
    "执行工具，获得观测结果",
    "LLM 基于结果决定下一步",
    "重复直到完成任务",
    "",
    "特点：自主多步骤、跨系统整合",
  ];
  agentSteps.forEach((t, i) => {
    if (t) {
      s.addShape(pres.shapes.OVAL, {
        x: 5.46, y: 2.65 + i * 0.33, w: 0.18, h: 0.18,
        fill: { color: C.orange }, line: { color: C.orange },
      });
    }
    s.addText(t, {
      x: 5.72, y: 2.62 + i * 0.33, w: 3.75, h: 0.3,
      fontSize: 11, color: i === 6 ? C.orange : C.dark,
      bold: i === 6, margin: 0,
    });
  });

  // VS
  s.addShape(pres.shapes.OVAL, {
    x: 4.67, y: 3.2, w: 0.68, h: 0.68,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("VS", {
    x: 4.67, y: 3.2, w: 0.68, h: 0.68,
    fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 3 — Agent 的四大组成
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "Agent 的四大组成");

  // Center Agent box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 2.1, w: 2.4, h: 1.3,
    fill: { color: C.dark }, line: { color: C.dark }, shadow: shadow(),
  });
  s.addText("Agent", {
    x: 3.8, y: 2.1, w: 2.4, h: 0.65,
    fontSize: 20, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });
  s.addText("(LLM 决策器)", {
    x: 3.8, y: 2.75, w: 2.4, h: 0.55,
    fontSize: 11, color: "B8C5E0", align: "center", valign: "middle", margin: 0,
  });

  const components = [
    {
      x: 0.28, y: 0.95, w: 2.8, h: 2.1,
      color: C.blue, title: "🧠 LLM", sub: "决策器 / 思考器",
      points: ["决定下一步做什么", "调用哪个工具", "判断任务是否完成"],
      ax: 3.1, ay: 1.7, bx: 3.8, by: 2.3,
    },
    {
      x: 6.94, y: 0.95, w: 2.8, h: 2.1,
      color: C.teal, title: "🔧 Tool", sub: "工具",
      points: ["搜索 / 计算 / API", "数据库查询", "文件读取 / RAG"],
      ax: 6.94, ay: 1.7, bx: 6.2, by: 2.3,
    },
    {
      x: 0.28, y: 3.35, w: 2.8, h: 1.95,
      color: C.purple, title: "🧩 Memory", sub: "记忆",
      points: ["保持会话上下文", "中间状态传递", "长期记忆存储"],
      ax: 3.1, ay: 4.0, bx: 3.8, by: 3.1,
    },
    {
      x: 6.94, y: 3.35, w: 2.8, h: 1.95,
      color: C.orange, title: "👁 Observation", sub: "观测",
      points: ["工具执行后的输出", "作为 LLM 下一步输入", "驱动下一轮决策"],
      ax: 6.94, ay: 4.0, bx: 6.2, by: 3.1,
    },
  ];

  components.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: c.w, h: c.h,
      fill: { color: C.white }, line: { color: c.color, width: 2 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: c.w, h: 0.42,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.title, {
      x: c.x + 0.1, y: c.y, w: c.w - 0.2, h: 0.28,
      fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText(c.sub, {
      x: c.x + 0.1, y: c.y + 0.25, w: c.w - 0.2, h: 0.2,
      fontSize: 9, color: "FFDDC8", margin: 0,
    });
    c.points.forEach((p, i) => {
      s.addShape(pres.shapes.OVAL, {
        x: c.x + 0.12, y: c.y + 0.55 + i * 0.38, w: 0.14, h: 0.14,
        fill: { color: c.color }, line: { color: c.color },
      });
      s.addText(p, {
        x: c.x + 0.32, y: c.y + 0.5 + i * 0.38, w: c.w - 0.4, h: 0.32,
        fontSize: 10.5, color: C.dark, margin: 0,
      });
    });
    // Connecting line
    s.addShape(pres.shapes.LINE, {
      x: c.ax, y: c.ay, w: c.bx - c.ax, h: c.by - c.ay,
      line: { color: c.color, width: 1.5, dashType: "dash" },
    });
  });

  // Stop criteria note
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 3.5, w: 2.4, h: 0.65,
    fill: { color: C.red, transparency: 85 }, line: { color: C.red },
  });
  s.addText("⛔ Stop Criteria\n达到目标 / 超过步数", {
    x: 3.85, y: 3.52, w: 2.3, h: 0.6,
    fontSize: 9, color: C.red, align: "center", valign: "middle", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 4 — Tool 是什么？
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "Tool 是什么？");

  // 3 elements
  s.addText("每个 Tool 有三要素：", {
    x: 0.42, y: 0.92, w: 5, h: 0.3,
    fontSize: 13, bold: true, color: C.dark, margin: 0,
  });

  const elements = [
    { label: "name", desc: "工具名称，LLM 用来识别并调用它", example: "Calculator", color: C.blue },
    { label: "func", desc: "实际执行的函数/方法", example: "def calculator_tool(input): ...", color: C.teal },
    { label: "description", desc: "描述工具能做什么，LLM 读这段文字来决定何时调用", example: "Performs arithmetic expressions", color: C.orange },
  ];

  elements.forEach((e, i) => {
    const x = 0.42 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.28, w: 3.0, h: 1.85,
      fill: { color: C.white }, line: { color: e.color, width: 2 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.28, w: 3.0, h: 0.45,
      fill: { color: e.color }, line: { color: e.color },
    });
    s.addText(e.label, {
      x: x + 0.12, y: 1.28, w: 2.78, h: 0.45,
      fontSize: 16, bold: true, color: C.white, valign: "middle", fontFace: "Courier New", margin: 0,
    });
    s.addText(e.desc, {
      x: x + 0.12, y: 1.8, w: 2.78, h: 0.65,
      fontSize: 11, color: C.dark, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.12, y: 2.5, w: 2.78, h: 0.52,
      fill: { color: C.codeBlack }, line: { color: C.codeBlack },
    });
    s.addText(e.example, {
      x: x + 0.18, y: 2.52, w: 2.65, h: 0.48,
      fontSize: 9, color: "9CDCFE", fontFace: "Courier New", valign: "middle", margin: 0,
    });
  });

  // Design principles
  s.addText("Tool 设计四原则：", {
    x: 0.42, y: 3.28, w: 5, h: 0.3,
    fontSize: 13, bold: true, color: C.dark, margin: 0,
  });

  const principles = [
    { icon: "①", title: "单一职责", desc: "一个 tool 只做一件事（搜索、计算、写表格）", color: C.blue },
    { icon: "②", title: "契约明确", desc: "明确输入/输出格式，返回结构化 JSON", color: C.teal },
    { icon: "③", title: "幂等可重试", desc: "工具最好幂等，失败时可安全重试", color: C.orange },
    { icon: "④", title: "边界与权限", desc: "对外部资源做权限控制，谨防滥用", color: C.red },
  ];

  principles.forEach((p, i) => {
    const x = 0.42 + i * 2.38;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.65, w: 2.2, h: 1.6,
      fill: { color: C.white }, line: { color: p.color, width: 1.5 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.65, w: 2.2, h: 0.42,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(`${p.icon} ${p.title}`, {
      x: x + 0.1, y: 3.65, w: 2.0, h: 0.42,
      fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText(p.desc, {
      x: x + 0.1, y: 4.12, w: 2.0, h: 1.05,
      fontSize: 10, color: C.dark, margin: 0,
    });
  });
}

// ═══════════════════════════════════
// SLIDE 5 — Agent 工作流程
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "Agent 的工作流程：决策循环");

  s.addText("Agent 不是一次性调用，而是一个持续循环的决策过程——直到任务完成为止：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Flow steps
  const steps = [
    { num: "1", label: "INPUT", title: "接收用户目标", desc: "用户输入任务或问题", color: C.dark, x: 0.42, y: 1.38 },
    { num: "2", label: "THINK", title: "LLM 思考", desc: "选择工具、生成工具输入", color: C.blue, x: 2.52, y: 1.38 },
    { num: "3", label: "ACT", title: "执行工具", desc: "调用 Tool，获取结果", color: C.orange, x: 4.62, y: 1.38 },
    { num: "4", label: "OBSERVE", title: "获取观测", desc: "工具结果回传给 LLM", color: C.teal, x: 6.72, y: 1.38 },
  ];

  steps.forEach((st, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: st.y, w: 1.9, h: 1.95,
      fill: { color: C.white }, line: { color: st.color, width: 2 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: st.y, w: 1.9, h: 0.42,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(`${st.num}  ${st.label}`, {
      x: st.x + 0.08, y: st.y, w: 1.75, h: 0.42,
      fontSize: 11, bold: true, color: C.white, valign: "middle", fontFace: "Courier New", margin: 0,
    });
    s.addText(st.title, {
      x: st.x + 0.1, y: st.y + 0.5, w: 1.72, h: 0.35,
      fontSize: 12, bold: true, color: st.color, margin: 0,
    });
    s.addText(st.desc, {
      x: st.x + 0.1, y: st.y + 0.9, w: 1.72, h: 0.85,
      fontSize: 10.5, color: C.dark, margin: 0,
    });
    // Arrow to next
    if (i < 3) {
      s.addShape(pres.shapes.LINE, {
        x: st.x + 1.92, y: st.y + 0.97, w: 0.58, h: 0,
        line: { color: C.dark, width: 2 },
      });
      s.addText("→", {
        x: st.x + 1.9, y: st.y + 0.75, w: 0.62, h: 0.45,
        fontSize: 18, bold: true, color: C.dark, align: "center", margin: 0,
      });
    }
  });

  // Loop back arrow (bottom)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 2.52, y: 3.55, w: 5.82, h: 0.55,
    fill: { color: C.lightBlue }, line: { color: C.blue },
  });
  s.addText("↩  LLM 判断：任务未完成？→ 回到 THINK，继续下一轮", {
    x: 2.62, y: 3.58, w: 5.6, h: 0.48,
    fontSize: 11, color: C.blue, bold: true, valign: "middle", margin: 0,
  });

  // Stop
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 3.55, w: 1.9, h: 0.55,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("⛔ 完成 / 停止", {
    x: 0.45, y: 3.55, w: 1.84, h: 0.55,
    fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // ReAct pattern
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.3, w: 9.2, h: 1.0,
    fill: { color: C.white }, line: { color: C.orange, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.3, w: 0.08, h: 1.0,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("ReAct 模式（Reason + Act）", {
    x: 0.6, y: 4.35, w: 4, h: 0.3,
    fontSize: 12, bold: true, color: C.orange, margin: 0,
  });
  s.addText("这个循环就是著名的 ReAct（Reasoning + Acting）模式：LangChain 的 zero-shot-react-description Agent 就是实现了这个循环。LLM 每次先思考（Thought），再行动（Action），再观测（Observation），直到输出最终答案（Final Answer）。", {
    x: 0.6, y: 4.68, w: 9.0, h: 0.55,
    fontSize: 10, color: C.gray, margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 6 — 四种 Agent 类型
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "四种 Agent 类型");

  const types = [
    {
      num: "01", icon: "⚡", color: C.blue,
      title: "Reactive Agent", cn: "反应式 Agent",
      desc: "基于当前输入立即决定下一步，不做长期规划。",
      when: "适合：简单工具调用、单步任务",
      example: "问\"今天天气怎样\" → 直接调用天气 API → 返回结果",
    },
    {
      num: "02", icon: "📋", color: C.orange,
      title: "Planner Agent", cn: "规划式 Agent",
      desc: "先制定中长期步骤计划，再逐步执行，支持条件分支。",
      when: "适合：复杂多步骤任务",
      example: "写报告 → 先规划：搜索→整理→写作→校对",
    },
    {
      num: "03", icon: "🔧", color: C.teal,
      title: "Tool-using Agent", cn: "工具驱动 Agent",
      desc: "核心能力是调用并组合多种工具，LangChain Agent 的典型实现。",
      when: "适合：需要跨系统整合的任务",
      example: "先 Search → 再 Calculator → 再 FileWrite",
    },
    {
      num: "04", icon: "💬", color: C.purple,
      title: "Conversational Agent", cn: "对话式 Agent",
      desc: "带会话记忆（Memory），能在多轮交互中保持上下文。",
      when: "适合：客服、助手类多轮交互",
      example: "第1轮问产品→第5轮仍记得你的偏好",
    },
  ];

  types.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.42 + col * 4.85;
    const y = 1.0 + row * 2.25;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 2.1,
      fill: { color: C.white }, line: { color: t.color, width: 2 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 0.48,
      fill: { color: t.color }, line: { color: t.color },
    });
    s.addText(`${t.num}  ${t.icon}  ${t.title}`, {
      x: x + 0.12, y, w: 4.4, h: 0.48,
      fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText(t.cn, {
      x: x + 0.12, y: y + 0.54, w: 4.4, h: 0.26,
      fontSize: 11, bold: true, color: t.color, margin: 0,
    });
    s.addText(t.desc, {
      x: x + 0.12, y: y + 0.82, w: 4.4, h: 0.42,
      fontSize: 10, color: C.dark, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.12, y: y + 1.28, w: 4.38, h: 0.7,
      fill: { color: t.color, transparency: 90 }, line: { color: t.color, transparency: 70 },
    });
    s.addText(`${t.when}`, {
      x: x + 0.18, y: y + 1.3, w: 4.2, h: 0.25,
      fontSize: 9, bold: true, color: t.color, margin: 0,
    });
    s.addText(`例：${t.example}`, {
      x: x + 0.18, y: y + 1.55, w: 4.2, h: 0.38,
      fontSize: 9, color: C.gray, margin: 0,
    });
  });
}

// ═══════════════════════════════════
// SLIDE 7 — 代码示例：最小 Agent
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "代码示例 01：最小 Agent");

  s.addText("从零开始：定义两个工具（Calculator + Search），初始化 Agent，运行：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Code block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.26, w: 5.9, h: 3.9,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 0.56, y: 1.36, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("minimal_agent.py", { x: 0.76, y: 1.31, w: 4, h: 0.25, fontSize: 9, color: "9CA3AF", margin: 0 });

  const code = [
    { t: "from langchain import OpenAI", c: "C8D3F5" },
    { t: "from langchain.agents import Tool, initialize_agent", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "llm = OpenAI(temperature=0)", c: "9CDCFE" },
    { t: " ", c: "C8D3F5" },
    { t: "def calculator_tool(input_str: str) -> str:", c: "C8D3F5" },
    { t: "    return str(eval(input_str))  # 注意安全", c: "6A9955" },
    { t: " ", c: "C8D3F5" },
    { t: "def search_tool(query: str) -> str:", c: "C8D3F5" },
    { t: "    return f\"Search results for '{query}': ...\"", c: "CE9178" },
    { t: " ", c: "C8D3F5" },
    { t: "tools = [", c: "C8D3F5" },
    { t: "    Tool(name=\"Calculator\", func=calculator_tool,", c: "9CDCFE" },
    { t: "         description=\"Performs arithmetic\"),", c: "9CDCFE" },
    { t: "    Tool(name=\"Search\", func=search_tool,", c: "9CDCFE" },
    { t: "         description=\"Searches documents\"),", c: "9CDCFE" },
    { t: "]", c: "C8D3F5" },
    { t: "agent = initialize_agent(tools, llm,", c: "C8D3F5" },
    { t: "    agent=\"zero-shot-react-description\",", c: "9CDCFE" },
    { t: "    verbose=True)", c: "9CDCFE" },
  ];
  code.forEach((line, i) => {
    s.addText(line.t, {
      x: 0.52, y: 1.62 + i * 0.225, w: 5.65, h: 0.23,
      fontSize: 8, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Right: explanation
  const rights = [
    { step: "Step 1", desc: "导入 LangChain 必要模块", color: C.blue },
    { step: "Step 2", desc: "初始化 LLM（决策器）\ntemperature=0 使输出更稳定", color: C.teal },
    { step: "Step 3", desc: "定义工具函数\ncalculator_tool / search_tool", color: C.orange },
    { step: "Step 4", desc: "用 Tool 包装：\nname + func + description", color: C.purple },
    { step: "Step 5", desc: "initialize_agent 把 LLM 和\nTools 组合成可运行的 Agent", color: C.red },
  ];

  rights.forEach((r, i) => {
    const y = 1.26 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.45, y, w: 3.17, h: 0.68,
      fill: { color: C.white }, line: { color: r.color, width: 1.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.45, y, w: 0.82, h: 0.68,
      fill: { color: r.color }, line: { color: r.color },
    });
    s.addText(r.step, {
      x: 6.45, y, w: 0.82, h: 0.68,
      fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    s.addText(r.desc, {
      x: 7.32, y: y + 0.04, w: 2.22, h: 0.6,
      fontSize: 9, color: C.dark, valign: "middle", margin: 0,
    });
  });

  // Run output
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("agent.run(\"Find the population of Australia and then add 1000.\")  →  Agent 自动决定先 Search 再 Calculator", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9, color: C.orange, fontFace: "Courier New", align: "center", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 8 — 代码示例：RAG 封装成 Tool
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "代码示例 02：RAG 封装成 Tool");

  s.addText("把已有的 RAG pipeline 包装成 Tool，让 Agent 把文档问答能力作为工具使用：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Architecture diagram on left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.28, w: 3.2, h: 3.9,
    fill: { color: C.white }, line: { color: C.border }, shadow: shadow(),
  });
  s.addText("架构图", {
    x: 0.52, y: 1.33, w: 3.0, h: 0.3,
    fontSize: 11, bold: true, color: C.dark, margin: 0,
  });

  const arch = [
    { label: "用户输入", color: C.dark },
    { label: "Agent (LLM)", color: C.blue },
    { label: "DocumentQA Tool", color: C.orange },
    { label: "RAG Pipeline", color: C.teal },
    { label: "向量数据库", color: C.purple },
  ];
  arch.forEach((a, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.72, y: 1.72 + i * 0.6, w: 2.6, h: 0.42,
      fill: { color: a.color }, line: { color: a.color },
    });
    s.addText(a.label, {
      x: 0.72, y: 1.72 + i * 0.6, w: 2.6, h: 0.42,
      fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    if (i < 4) {
      s.addShape(pres.shapes.LINE, {
        x: 2.02, y: 2.14 + i * 0.6, w: 0, h: 0.18,
        line: { color: a.color, width: 1.5 },
      });
    }
  });

  // Code block on right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.78, y: 1.26, w: 5.84, h: 3.9,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 3.92, y: 1.36, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("agent_with_docqa.py", { x: 4.12, y: 1.31, w: 4, h: 0.25, fontSize: 9, color: "9CA3AF", margin: 0 });

  const code2 = [
    { t: "from langchain.agents import Tool, initialize_agent", c: "C8D3F5" },
    { t: "from langchain.chat_models import ChatOpenAI", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "llm = ChatOpenAI(temperature=0)", c: "9CDCFE" },
    { t: " ", c: "C8D3F5" },
    { t: "# rag_qa 是你已有的 RAG pipeline", c: "6A9955" },
    { t: "def doc_qa_tool(query: str) -> str:", c: "C8D3F5" },
    { t: "    return rag_qa(query)  # 直接复用现有 RAG", c: "9CDCFE" },
    { t: " ", c: "C8D3F5" },
    { t: "tool = Tool(", c: "C8D3F5" },
    { t: "    name=\"DocumentQA\",", c: "9CDCFE" },
    { t: "    func=doc_qa_tool,", c: "9CDCFE" },
    { t: "    description=\"Answer questions using uploaded docs\"", c: "CE9178" },
    { t: ")", c: "C8D3F5" },
    { t: "agent = initialize_agent([tool], llm,", c: "C8D3F5" },
    { t: "    agent=\"zero-shot-react-description\")", c: "9CDCFE" },
  ];
  code2.forEach((line, i) => {
    s.addText(line.t, {
      x: 3.88, y: 1.62 + i * 0.235, w: 5.6, h: 0.24,
      fontSize: 8.2, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Benefit box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.3,
    fill: { color: "F0FFF4" }, line: { color: C.green },
  });
  s.addText("优点：把复杂 RAG 封装为单一 Tool，Agent 可以组合使用：先查文档 → 再生成 PPT 提纲", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.26,
    fontSize: 10, color: C.green, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 9 — 代码示例：Memory
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "代码示例 03：加入 Memory（多轮任务）");

  s.addText("Memory 让 Agent 在多轮对话中保持上下文，不再\"失忆\"：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Code
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.26, w: 5.6, h: 2.6,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 0.56, y: 1.36, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("agent_with_memory.py", { x: 0.76, y: 1.31, w: 4, h: 0.25, fontSize: 9, color: "9CA3AF", margin: 0 });

  const code3 = [
    { t: "from langchain.memory import ConversationBufferMemory", c: "C8D3F5" },
    { t: "from langchain.agents import initialize_agent", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "memory = ConversationBufferMemory(", c: "9CDCFE" },
    { t: "    memory_key=\"chat_history\",", c: "9CDCFE" },
    { t: "    return_messages=True)", c: "9CDCFE" },
    { t: " ", c: "C8D3F5" },
    { t: "agent = initialize_agent(tools, llm,", c: "C8D3F5" },
    { t: "    agent=\"zero-shot-react-description\",", c: "9CDCFE" },
    { t: "    memory=memory)  # 注入 memory", c: "6A9955" },
    { t: " ", c: "C8D3F5" },
    { t: "agent.run(\"Find the latest sales for product X.\")", c: "CE9178" },
    { t: "agent.run(\"Compare with last month and explain trend.\")", c: "CE9178" },
    { t: "# 第2次调用能利用第1次的上下文!", c: "6A9955" },
  ];
  code3.forEach((line, i) => {
    s.addText(line.t, {
      x: 0.52, y: 1.62 + i * 0.235, w: 5.35, h: 0.24,
      fontSize: 8.2, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Memory types on right
  s.addText("Memory 类型对比：", {
    x: 6.15, y: 1.26, w: 3.47, h: 0.3,
    fontSize: 12, bold: true, color: C.dark, margin: 0,
  });

  const memTypes = [
    { name: "ConversationBufferMemory", desc: "完整保存所有对话\n简单但占 token", color: C.blue },
    { name: "ConversationSummaryMemory", desc: "自动摘要旧对话\n节省 token", color: C.teal },
    { name: "VectorStoreMemory", desc: "向量化存储长期记忆\n按相关性检索", color: C.purple },
  ];
  memTypes.forEach((m, i) => {
    const y = 1.62 + i * 0.75;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.15, y, w: 3.47, h: 0.65,
      fill: { color: C.white }, line: { color: m.color, width: 1.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.15, y, w: 0.08, h: 0.65,
      fill: { color: m.color }, line: { color: m.color },
    });
    s.addText(m.name, {
      x: 6.3, y: y + 0.04, w: 3.2, h: 0.28,
      fontSize: 9, bold: true, color: m.color, fontFace: "Courier New", margin: 0,
    });
    s.addText(m.desc, {
      x: 6.3, y: y + 0.32, w: 3.2, h: 0.28,
      fontSize: 9, color: C.gray, margin: 0,
    });
  });

  // Warning + tip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.0, w: 9.2, h: 0.68,
    fill: { color: C.white }, line: { color: C.gold, width: 1.5 }, shadow: shadow(),
  });
  s.addText("⚠️", { x: 0.52, y: 4.05, w: 0.4, h: 0.55, fontSize: 18, valign: "middle", margin: 0 });
  s.addText("Memory 注意事项：", {
    x: 0.95, y: 4.08, w: 2.5, h: 0.26, fontSize: 11, bold: true, color: C.gold, margin: 0,
  });
  s.addText("Memory 会保存对话历史并占用 token，对话越长成本越高。应做摘要或裁剪策略：每 10 轮做一次摘要，保留关键决策，丢弃寒暄。", {
    x: 0.95, y: 4.35, w: 8.5, h: 0.28, fontSize: 10, color: C.dark, margin: 0,
  });

  // Timeline without memory vs with memory
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.82, w: 4.45, h: 0.55,
    fill: { color: "FFF5F5" }, line: { color: C.red },
  });
  s.addText("❌ 无 Memory：第2轮不知道第1轮说了什么，用户被迫重复", {
    x: 0.52, y: 4.85, w: 4.25, h: 0.48, fontSize: 9.5, color: C.dark, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.17, y: 4.82, w: 4.45, h: 0.55,
    fill: { color: "F0FFF4" }, line: { color: C.green },
  });
  s.addText("✅ 有 Memory：Agent 自动记住上下文，多轮任务流畅推进", {
    x: 5.27, y: 4.85, w: 4.25, h: 0.48, fontSize: 9.5, color: C.dark, valign: "middle", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 10 — 代码示例：Planner + Executor
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "代码示例 04：Planner + Executor（自定义逻辑）");

  s.addText("对复杂任务，显式的规划器 + 执行器比单纯 ReAct 更可控，便于监控与断点重试：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Code
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.26, w: 5.6, h: 3.85,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 0.56, y: 1.36, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("planner_executor.py", { x: 0.76, y: 1.31, w: 4, h: 0.25, fontSize: 9, color: "9CA3AF", margin: 0 });

  const code4 = [
    { t: "# 1. Planner: LLM 生成步骤计划", c: "6A9955" },
    { t: "plan_prompt = \"Given goal: {goal},\"", c: "CE9178" },
    { t: "             \"output a numbered plan.\"", c: "CE9178" },
    { t: " ", c: "C8D3F5" },
    { t: "plan = llm.generate(plan_prompt.format(", c: "C8D3F5" },
    { t: "    goal=\"Write 3-slide summary of doc X\"))", c: "9CDCFE" },
    { t: "# plan: 1.search 2.extract 3.summarize", c: "6A9955" },
    { t: " ", c: "C8D3F5" },
    { t: "# 2. Executor: 按计划逐步执行工具", c: "6A9955" },
    { t: "for step in parsed_plan:", c: "C8D3F5" },
    { t: "    if step.type == \"search\":", c: "C8D3F5" },
    { t: "        obs = search_tool(step.input)", c: "9CDCFE" },
    { t: "    elif step.type == \"summarize\":", c: "C8D3F5" },
    { t: "        obs = summarizer_tool(step.input)", c: "9CDCFE" },
    { t: "    # obs 反馈给下一步", c: "6A9955" },
    { t: " ", c: "C8D3F5" },
    { t: "# 3. 组装最终输出", c: "6A9955" },
    { t: "final = llm.generate(\"Assemble slides...\")", c: "9CDCFE" },
  ];
  code4.forEach((line, i) => {
    s.addText(line.t, {
      x: 0.52, y: 1.62 + i * 0.228, w: 5.35, h: 0.23,
      fontSize: 8, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Right: Planner vs Executor breakdown
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.15, y: 1.26, w: 3.47, h: 1.75,
    fill: { color: C.white }, line: { color: C.blue, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.15, y: 1.26, w: 3.47, h: 0.42,
    fill: { color: C.blue }, line: { color: C.blue },
  });
  s.addText("Planner（规划器）", {
    x: 6.27, y: 1.26, w: 3.25, h: 0.42,
    fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0,
  });
  ["基于目标生成步骤列表", "由 LLM 担任控制器", "输出结构化计划（JSON/编号）"].forEach((t, i) => {
    s.addText(`• ${t}`, {
      x: 6.27, y: 1.74 + i * 0.32, w: 3.25, h: 0.28,
      fontSize: 10, color: C.dark, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.15, y: 3.12, w: 3.47, h: 1.75,
    fill: { color: C.white }, line: { color: C.orange, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.15, y: 3.12, w: 3.47, h: 0.42,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("Executor（执行器）", {
    x: 6.27, y: 3.12, w: 3.25, h: 0.42,
    fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0,
  });
  ["按计划逐步调用工具", "把观测结果回传 Planner", "支持断点重试与监控"].forEach((t, i) => {
    s.addText(`• ${t}`, {
      x: 6.27, y: 3.6 + i * 0.32, w: 3.25, h: 0.28,
      fontSize: 10, color: C.dark, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: "FFFBEB" }, line: { color: C.gold },
  });
  s.addText("💡 适合场景：多步骤、需要条件分支的复杂任务；比 ReAct 更可控，便于监控每一步", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 10, color: C.dark, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 11 — Agent Logging 系统
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "Observation 深入 01：Agent Logging 系统");

  s.addText("Agent 自主运行时你看不见它在\"想什么\"——Logging 是让 Agent 可调试、可审计的唯一方法：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Left: What to log
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.28, w: 4.5, h: 3.75,
    fill: { color: C.white }, line: { color: C.blue, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.28, w: 4.5, h: 0.45,
    fill: { color: C.blue }, line: { color: C.blue },
  });
  s.addText("📋  每一步应该记录什么？", {
    x: 0.55, y: 1.28, w: 4.28, h: 0.45,
    fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const logItems = [
    { step: "Thought", desc: "LLM 的推理过程\n\"我需要先搜索澳大利亚人口...\"", color: C.blue },
    { step: "Action", desc: "调用了哪个 Tool\n工具名称 + 输入参数", color: C.orange },
    { step: "Observation", desc: "工具返回了什么结果\n原始输出 + 状态码", color: C.teal },
    { step: "Final Answer", desc: "Agent 的最终输出\n以及经过了几步才完成", color: C.green },
  ];
  logItems.forEach((it, i) => {
    const y = 1.85 + i * 0.77;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y, w: 0.9, h: 0.55,
      fill: { color: it.color }, line: { color: it.color },
    });
    s.addText(it.step, {
      x: 0.55, y, w: 0.9, h: 0.55,
      fontSize: 8.5, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Courier New", margin: 0,
    });
    s.addText(it.desc, {
      x: 1.52, y: y + 0.04, w: 3.28, h: 0.5,
      fontSize: 10, color: C.dark, margin: 0,
    });
  });

  // Right: Code example
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.28, w: 4.52, h: 3.75,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 5.24, y: 1.38, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("agent_logging.py", { x: 5.44, y: 1.33, w: 4, h: 0.25, fontSize: 9, color: "9CA3AF", margin: 0 });

  const logCode = [
    { t: "from langchain.callbacks import StdOutCallbackHandler", c: "C8D3F5" },
    { t: "from langchain.callbacks import FileCallbackHandler", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "# verbose=True 打印每步 Thought/Action/Obs", c: "6A9955" },
    { t: "agent = initialize_agent(", c: "C8D3F5" },
    { t: "    tools, llm,", c: "9CDCFE" },
    { t: "    verbose=True,  # 开启日志", c: "6A9955" },
    { t: "    callbacks=[StdOutCallbackHandler(),", c: "9CDCFE" },
    { t: "               FileCallbackHandler('agent.log')]", c: "9CDCFE" },
    { t: ")", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "# 输出示例：", c: "6A9955" },
    { t: "> Entering new AgentExecutor chain...", c: "CE9178" },
    { t: "Thought: I need to search for population", c: "CE9178" },
    { t: "Action: Search", c: "CE9178" },
    { t: "Action Input: 'Australia population 2025'", c: "CE9178" },
    { t: "Observation: 26.5 million (2025 estimate)", c: "6BBF6B" },
    { t: "Final Answer: 26,501,000", c: "6BBF6B" },
  ];
  logCode.forEach((line, i) => {
    s.addText(line.t, {
      x: 5.2, y: 1.65 + i * 0.218, w: 4.28, h: 0.22,
      fontSize: 7.8, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Bottom: 3 levels
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: "FFFBEB" }, line: { color: C.gold },
  });
  s.addText("💡 三级 Logging 策略：verbose=True（开发调试）→ FileCallbackHandler（测试留档）→ LangSmith（生产监控）", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9.5, color: C.dark, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 12 — Agent Output Observation
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "Observation 深入 02：解读 Agent Output");

  s.addText("工具执行后返回的 Observation 直接影响 LLM 的下一步决策——好的 Observation 设计是 Agent 稳定运行的关键：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.35,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Observation flow
  const flowItems = [
    { label: "Tool 执行", sub: "调用外部服务\n/函数/API", color: C.orange, x: 0.42 },
    { label: "Observation", sub: "原始返回结果\n传回给 LLM", color: C.teal, x: 2.72 },
    { label: "LLM 解读", sub: "基于 Obs 决定\n下一步行动", color: C.blue, x: 5.02 },
    { label: "继续 / 停止", sub: "再次 Act\n或输出答案", color: C.purple, x: 7.32 },
  ];
  flowItems.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: f.x, y: 1.35, w: 2.1, h: 1.1,
      fill: { color: f.color }, line: { color: f.color }, shadow: shadow(),
    });
    s.addText(f.label, {
      x: f.x + 0.08, y: 1.38, w: 1.95, h: 0.42,
      fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    s.addText(f.sub, {
      x: f.x + 0.08, y: 1.82, w: 1.95, h: 0.55,
      fontSize: 9.5, color: "E0F0FF", align: "center", margin: 0,
    });
    if (i < 3) {
      s.addText("→", {
        x: f.x + 2.12, y: 1.6, w: 0.38, h: 0.42,
        fontSize: 20, bold: true, color: f.color, align: "center", margin: 0,
      });
    }
  });

  // Good vs Bad observation
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 2.65, w: 4.45, h: 2.35,
    fill: { color: C.white }, line: { color: C.red, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 2.65, w: 4.45, h: 0.42,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("❌  糟糕的 Observation 设计", {
    x: 0.55, y: 2.65, w: 4.2, h: 0.42,
    fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const badObs = [
    { label: "返回原始 HTML", code: "<div class='result'>26.5M</div>..." },
    { label: "无结构纯文本", code: "found something maybe 26 or 27 million" },
    { label: "无 error 信息", code: "None" },
  ];
  badObs.forEach((b, i) => {
    s.addText(b.label, {
      x: 0.55, y: 3.15 + i * 0.62, w: 4.2, h: 0.22,
      fontSize: 10, bold: true, color: C.red, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y: 3.38 + i * 0.62, w: 4.2, h: 0.28,
      fill: { color: C.codeBlack }, line: { color: C.codeBlack },
    });
    s.addText(b.code, {
      x: 0.62, y: 3.4 + i * 0.62, w: 4.06, h: 0.24,
      fontSize: 8, color: "CE9178", fontFace: "Courier New", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 2.65, w: 4.47, h: 2.35,
    fill: { color: C.white }, line: { color: C.green, width: 1.5 }, shadow: shadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 2.65, w: 4.47, h: 0.42,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("✅  好的 Observation 设计", {
    x: 5.28, y: 2.65, w: 4.2, h: 0.42,
    fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const goodObs = [
    { label: "结构化 JSON", code: '{"population": 26500000, "year": 2025}' },
    { label: "明确状态字段", code: '{"status": "ok", "data": "26.5M"}' },
    { label: "清晰错误信息", code: '{"status": "error", "msg": "timeout"}' },
  ];
  goodObs.forEach((g, i) => {
    s.addText(g.label, {
      x: 5.28, y: 3.15 + i * 0.62, w: 4.2, h: 0.22,
      fontSize: 10, bold: true, color: C.green, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.28, y: 3.38 + i * 0.62, w: 4.2, h: 0.28,
      fill: { color: C.codeBlack }, line: { color: C.codeBlack },
    });
    s.addText(g.code, {
      x: 5.35, y: 3.4 + i * 0.62, w: 4.06, h: 0.24,
      fontSize: 8, color: "6BBF6B", fontFace: "Courier New", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("原则：Observation 要让 LLM 一眼读懂——结构化 > 纯文本，有 status/error 字段 > 裸返回值", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9.5, color: C.orange, bold: true, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 11 — 安全与可控性
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "设计 Agent 时的安全与可控性");

  s.addText("Agent 会自主调用工具——安全设计从一开始就要考虑，不是事后补救：", {
    x: 0.42, y: 0.92, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  const items = [
    {
      icon: "🔒", title: "限制工具范围",
      desc: "只暴露必要工具，避免不受控访问\n❌ 不要暴露任意 shell 或网络访问",
      color: C.red,
    },
    {
      icon: "✅", title: "输入/输出校验",
      desc: "工具输入与 LLM 输出都需校验\n避免注入攻击或格式错误",
      color: C.blue,
    },
    {
      icon: "💰", title: "速率与成本控制",
      desc: "限制调用频率、并发、单次最大 tokens\n防止高额费用暴增",
      color: C.orange,
    },
    {
      icon: "📋", title: "日志与可观测",
      desc: "记录每一步决策、工具调用与返回\n便于审计与调试复现",
      color: C.teal,
    },
    {
      icon: "🔄", title: "降级策略",
      desc: "关键工具不可用时有安全降级\n返回失败信息或替代方案",
      color: C.purple,
    },
  ];

  items.forEach((it, i) => {
    const col = i < 3 ? i : i - 3;
    const row = i < 3 ? 0 : 1;
    const x = 0.42 + col * (i < 3 ? 3.12 : 4.72);
    const y = 1.28 + row * 2.15;
    const w = i < 3 ? 2.95 : 4.35;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 1.95,
      fill: { color: C.white }, line: { color: it.color, width: 2 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.48,
      fill: { color: it.color }, line: { color: it.color },
    });
    s.addText(`${it.icon}  ${it.title}`, {
      x: x + 0.12, y, w: w - 0.2, h: 0.48,
      fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText(it.desc, {
      x: x + 0.12, y: y + 0.56, w: w - 0.2, h: 1.3,
      fontSize: 10.5, color: C.dark, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("黄金法则：先在封闭 sandbox 中验证工具调用路径与安全性，再放到生产环境", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 10, color: C.orange, align: "center", bold: true, margin: 0,
  });
}

// ═══════════════════════════════════
// SLIDE 12 — 最佳实践 vs 常见陷阱
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s); addLogo(s); addFooter(s);
  addTitle(s, "最佳实践 vs 常见陷阱");

  // Headers
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.0, w: 4.5, h: 0.45,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("✅ 最佳实践", {
    x: 0.52, y: 1.0, w: 4.3, h: 0.45,
    fontSize: 14, bold: true, color: C.white, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.0, w: 4.52, h: 0.45,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("❌ 常见陷阱", {
    x: 5.2, y: 1.0, w: 4.3, h: 0.45,
    fontSize: 14, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const goods = [
    "限制工具权限，只暴露必要工具",
    "为每个 Tool 明确定义输入/输出格式",
    "设置最大步数与成本预算上限",
    "记录每步思考、调用与返回（trace）",
    "为 memory 做摘要生命周期管理",
    "先做小规模 sandbox 测试再上生产",
  ];
  const bads = [
    "把任意 shell / 网络访问直接暴露给 Agent",
    "工具描述模糊，导致 LLM 误用工具",
    "不做停止条件，导致无限循环费用暴增",
    "忽视日志，出问题时无法复现决策路径",
    "过度自动化，没有人工回退机制",
    "忽略成本，高并发工具迅速消耗预算",
  ];

  goods.forEach((g, i) => {
    const y = 1.55 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.42, y, w: 4.5, h: 0.5,
      fill: { color: i % 2 === 0 ? C.white : "F0FFF4" },
      line: { color: C.border, width: 0.5 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 0.54, y: y + 0.15, w: 0.2, h: 0.2,
      fill: { color: C.green }, line: { color: C.green },
    });
    s.addText(g, {
      x: 0.82, y, w: 4.0, h: 0.5,
      fontSize: 10.5, color: C.dark, valign: "middle", margin: 0,
    });
  });

  bads.forEach((b, i) => {
    const y = 1.55 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y, w: 4.52, h: 0.5,
      fill: { color: i % 2 === 0 ? C.white : "FFF5F5" },
      line: { color: C.border, width: 0.5 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 5.22, y: y + 0.15, w: 0.2, h: 0.2,
      fill: { color: C.red }, line: { color: C.red },
    });
    s.addText(b, {
      x: 5.5, y, w: 4.0, h: 0.5,
      fontSize: 10.5, color: C.dark, valign: "middle", margin: 0,
    });
  });
}

// ═══════════════════════════════════
// SLIDE 13 — 总结
// ═══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.OVAL, {
    x: -0.8, y: -0.8, w: 3.5, h: 3.5,
    fill: { color: "FFFFFF", transparency: 94 }, line: { color: "FFFFFF", transparency: 94 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 8.2, y: 3.5, w: 3.0, h: 3.0,
    fill: { color: C.orange, transparency: 88 }, line: { color: C.orange, transparency: 85 },
  });

  addLogo(s);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 0.2, w: 0.1, h: 0.9,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("总结", {
    x: 0.62, y: 0.2, w: 7.8, h: 0.55,
    fontSize: 22, bold: true, color: C.white, fontFace: "Arial", margin: 0,
  });
  s.addText("Agents = LLM + Tools + Planner/Executor + Memory", {
    x: 0.62, y: 0.76, w: 7.8, h: 0.28,
    fontSize: 12, color: "7B9EC9", margin: 0,
  });

  const summaries = [
    {
      icon: "🧠", title: "Agent 的本质",
      body: "LLM 作为决策器，自主选择工具、执行、观测、再决策——把人类\"选工具\"的能力给程序",
      color: C.blue,
    },
    {
      icon: "🔧", title: "Tool 设计要点",
      body: "单一职责、契约明确（name/func/description）、幂等可重试、权限受限",
      color: C.orange,
    },
    {
      icon: "🔄", title: "工作流程",
      body: "ReAct 循环：Think → Act → Observe → 重复，直到完成或触发停止条件",
      color: C.teal,
    },
    {
      icon: "⚙️", title: "工程化三要素",
      body: "可追踪（日志）+ 可回放（trace）+ 可校验（输入输出结构化）",
      color: C.purple,
    },
  ];

  summaries.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.42 + col * 4.85;
    const y = 1.18 + row * 1.55;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 1.38,
      fill: { color: "FFFFFF", transparency: 90 }, line: { color: p.color, transparency: 30 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h: 1.38,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(`${p.icon}  ${p.title}`, {
      x: x + 0.18, y: y + 0.1, w: 4.3, h: 0.38,
      fontSize: 13, bold: true, color: C.white, margin: 0,
    });
    s.addText(p.body, {
      x: x + 0.18, y: y + 0.52, w: 4.3, h: 0.78,
      fontSize: 10.5, color: "B8C5E0", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.35, w: 9.2, h: 0.68,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("练习路径：先实现 Calculator + Search 小 Agent → 封装 RAG 为 Tool → 加 Memory → 加监控", {
    x: 0.55, y: 4.38, w: 9.0, h: 0.62,
    fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  s.addText("www.jiangren.com.au", {
    x: 0.42, y: 5.22, w: 3, h: 0.22,
    fontSize: 10, color: "7B9EC9", bold: true, margin: 0,
  });
}

pres.writeFile({ fileName: "/home/claude/agents_ppt.pptx" })
  .then(() => console.log("DONE"))
  .catch(e => { console.error(e); process.exit(1); });
