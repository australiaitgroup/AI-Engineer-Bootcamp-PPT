const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Context Engineering";

// Real logo as base64
const logoB64 = "image/png;base64," + fs.readFileSync("/home/claude/logo_b64.txt", "utf8").trim();

// Brand colors extracted from PDF
const C = {
  bg: "FBF0EB",        // exact background from PDF slides
  dark: "1A1F4E",      // deep navy for titles/text
  red: "E8453C",       // title underline bar red
  orange: "E8622A",    // accent orange
  logoRed: "E85D4A",   // logo text color
  white: "FFFFFF",
  gray: "6B7280",
  lightGray: "F3F4F6",
  border: "E0D5CE",
  black: "1A1A1A",
  codeBlack: "1E1E1E", // code block background
  codeGreen: "6BBF6B", // code comment green
  teal: "0D9488",
  green: "28A745",
  gold: "F59E0B",
  purple: "7C3AED",
  lightBlue: "EEF3FB",
  blue: "2B5BA8",
};

// ── Helpers ──────────────────────────────────────────────
function addLogo(slide, x = 8.55, y = 0.12, w = 1.3) {
  // Real extracted logo image
  slide.addImage({ data: logoB64, x, y, w, h: w * (189/802) });
}

function addFooter(slide) {
  slide.addText("www.jiangren.com.au", {
    x: 0.4, y: 5.28, w: 3, h: 0.22,
    fontSize: 10, color: C.dark, bold: true, margin: 0,
  });
}

function addPageTitle(slide, title) {
  slide.addText(title, {
    x: 0.42, y: 0.22, w: 7.8, h: 0.52,
    fontSize: 24, bold: true, color: C.dark, fontFace: "Arial", margin: 0,
  });
  // Red underline bar (short, ~1/4 of title area)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 0.78, w: 1.1, h: 0.07,
    fill: { color: C.red }, line: { color: C.red },
  });
}

// Watermark "JA" letters in background (visible in original PDF)
function addWatermark(slide) {
  // Top-right faint JA watermark
  slide.addText("J", {
    x: 7.8, y: -0.3, w: 1.5, h: 2.0,
    fontSize: 200, color: C.dark, bold: true, transparency: 94,
    fontFace: "Arial Black", margin: 0,
  });
  // Bottom right circle watermark shape
  slide.addShape(pres.shapes.OVAL, {
    x: 8.5, y: 3.8, w: 2.5, h: 2.5,
    fill: { color: C.dark, transparency: 96 },
    line: { color: C.dark, transparency: 94 },
  });
}

function makeShadow() {
  return { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 };
}

// ════════════════════════════════════════════════════════
// SLIDE 1 — 封面
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Left half content area
  // Logo top-left (封面用大logo)
  s.addImage({ data: logoB64, x: 0.42, y: 0.3, w: 2.2, h: 2.2 * (189/802) });

  // Big title
  s.addText("Context Engineering", {
    x: 0.42, y: 1.5, w: 5.0, h: 1.4,
    fontSize: 36, bold: true, color: C.dark, fontFace: "Arial", margin: 0,
  });

  // Subtitle
  s.addText("从 Prompt Engineering 到\n上下文信息系统设计", {
    x: 0.42, y: 3.0, w: 4.8, h: 0.9,
    fontSize: 16, color: C.gray, margin: 0,
  });

  // Author
  s.addText("JR Academy  ·  AI Engineering Bootcamp", {
    x: 0.42, y: 4.1, w: 4.8, h: 0.35,
    fontSize: 12, bold: true, color: C.dark, margin: 0,
  });

  // Footer
  s.addText("www.jiangren.com.au", {
    x: 0.42, y: 5.15, w: 3, h: 0.22,
    fontSize: 10, color: C.dark, bold: true, margin: 0,
  });

  // Right half — dark panel with decorative elements
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 0, w: 4.5, h: 5.625,
    fill: { color: C.dark }, line: { color: C.dark },
  });

  // Decorative circles on dark panel
  s.addShape(pres.shapes.OVAL, {
    x: 6.2, y: 0.5, w: 3.2, h: 3.2,
    fill: { color: "FFFFFF", transparency: 93 }, line: { color: "FFFFFF", transparency: 90 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 2.8, w: 2.0, h: 2.0,
    fill: { color: C.orange, transparency: 85 }, line: { color: C.orange, transparency: 80 },
  });

  // Key stat on dark panel
  s.addText("57%", {
    x: 5.8, y: 1.5, w: 4.0, h: 1.2,
    fontSize: 72, bold: true, color: C.orange, align: "center", fontFace: "Arial Black", margin: 0,
  });
  s.addText("AI Agent 项目失败\n根本原因是上下文管理失败", {
    x: 5.8, y: 2.8, w: 4.0, h: 0.9,
    fontSize: 13, color: "B8C5E0", align: "center", margin: 0,
  });
  s.addText("— Gartner 2026", {
    x: 5.8, y: 3.75, w: 4.0, h: 0.3,
    fontSize: 10, color: "7B9EC9", align: "center", italic: true, margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 2 — 学习目标
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "学习目标");
  addFooter(s);

  const goals = [
    {
      num: "01",
      title: "区分两种工程方法",
      desc: "说清楚 Context Engineering 和 Prompt Engineering 的区别：一个是写好一句话，另一个是设计整个信息供给系统",
      color: C.red,
    },
    {
      num: "02",
      title: "画出架构图",
      desc: "画出四种上下文来源（System Instructions / User Input / Tool Results / Memory）的架构图",
      color: C.orange,
    },
    {
      num: "03",
      title: "做上下文预算分配",
      desc: "对一个真实场景（比如客服 Agent）做上下文预算分配，像管理资源一样管理 token",
      color: C.blue,
    },
    {
      num: "04",
      title: "代码实现动态组装",
      desc: "用 LangChain 的 RunnableParallel 实现动态上下文组装，比串行快 2-3 倍",
      color: C.teal,
    },
  ];

  goals.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.42 + col * 4.85;
    const y = 1.05 + row * 2.05;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 1.85,
      fill: { color: C.white }, line: { color: g.color, width: 1.5 },
      shadow: makeShadow(),
    });
    // Left color bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h: 1.85,
      fill: { color: g.color }, line: { color: g.color },
    });
    // Number
    s.addText(g.num, {
      x: x + 0.15, y: y + 0.1, w: 0.55, h: 0.45,
      fontSize: 20, bold: true, color: g.color, fontFace: "Arial Black", margin: 0,
    });
    // Title
    s.addText(g.title, {
      x: x + 0.72, y: y + 0.1, w: 3.75, h: 0.42,
      fontSize: 14, bold: true, color: C.dark, margin: 0,
    });
    // Desc
    s.addText(g.desc, {
      x: x + 0.15, y: y + 0.58, w: 4.3, h: 1.15,
      fontSize: 11, color: C.gray, margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 3 — 为什么 Prompt Engineering 不够了
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "为什么 Prompt Engineering 不够了？");
  addFooter(s);

  // Intro text
  s.addText("Prompt Engineering 解决的是「一条消息怎么写」的问题——但真实 AI 应用远不止单次交互：", {
    x: 0.42, y: 0.95, w: 9.2, h: 0.4,
    fontSize: 12, color: C.gray, italic: true, margin: 0,
  });

  // 3 pain points
  const points = [
    {
      icon: "💬",
      title: "对话超出窗口",
      desc: "用户问了 50 轮之后，前面的对话已超出 context window，模型\"忘了\"你们讨论过什么",
      color: C.red,
      bg: "FFF5F5",
    },
    {
      icon: "🗂",
      title: "缺乏私有数据",
      desc: "用户问的问题需要私有数据，模型的训练数据里没有你公司的内部文档",
      color: C.orange,
      bg: "FFF8F0",
    },
    {
      icon: "⚙️",
      title: "无法执行操作",
      desc: "用户需要 AI 执行操作，比如查数据库、发邮件、搜网页——模型只能生成文字，做不了这些",
      color: C.blue,
      bg: C.lightBlue,
    },
  ];

  points.forEach((p, i) => {
    const x = 0.42 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.48, w: 3.0, h: 2.8,
      fill: { color: p.bg }, line: { color: p.color, width: 1.5 },
      shadow: makeShadow(),
    });
    s.addText(p.icon, {
      x, y: 1.58, w: 3.0, h: 0.6,
      fontSize: 28, align: "center", margin: 0,
    });
    s.addText(p.title, {
      x: x + 0.15, y: 2.2, w: 2.7, h: 0.4,
      fontSize: 14, bold: true, color: p.color, align: "center", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.2, y: 2.63, w: 2.6, h: 0,
      line: { color: p.color, width: 0.8 },
    });
    s.addText(p.desc, {
      x: x + 0.15, y: 2.72, w: 2.7, h: 1.45,
      fontSize: 11, color: C.dark, margin: 0,
    });
  });

  // Gartner callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.42, w: 9.2, h: 0.72,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("Gartner 2026 预测：", {
    x: 0.6, y: 4.47, w: 1.8, h: 0.6,
    fontSize: 11, bold: true, color: C.orange, valign: "middle", margin: 0,
  });
  s.addText("57% 的 AI Agent 项目失败的根本原因是上下文管理失败——不是模型不够好，而是喂给模型的信息不对", {
    x: 2.3, y: 4.47, w: 7.1, h: 0.6,
    fontSize: 11, color: "B8C5E0", valign: "middle", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 4 — Context Engineering 定义
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "Context Engineering 定义");
  addFooter(s);

  // Definition box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.0, w: 9.2, h: 1.05,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("Context Engineering  =  为 AI 在每次交互时构建最优上下文的艺术和科学", {
    x: 0.55, y: 1.0, w: 9.0, h: 1.05,
    fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // Analogy comparison
  s.addText("类比理解", {
    x: 0.42, y: 2.2, w: 3, h: 0.32,
    fontSize: 13, bold: true, color: C.dark, margin: 0,
  });

  const analogy = [
    { left: "Prompt Engineering", right: "写好一封邮件", color: C.orange },
    { left: "Context Engineering", right: "管理整个信息系统", color: C.blue },
  ];

  analogy.forEach((a, i) => {
    const y = 2.6 + i * 0.85;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.42, y, w: 3.8, h: 0.65,
      fill: { color: a.color }, line: { color: a.color },
    });
    s.addText(a.left, {
      x: 0.52, y, w: 3.6, h: 0.65,
      fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText("→", {
      x: 4.3, y, w: 0.5, h: 0.65,
      fontSize: 18, bold: true, color: a.color, align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.9, y, w: 4.72, h: 0.65,
      fill: { color: C.white }, line: { color: a.color, width: 1.5 },
    });
    s.addText(a.right, {
      x: 5.0, y, w: 4.5, h: 0.65,
      fontSize: 13, color: C.dark, valign: "middle", margin: 0,
    });
  });

  // What CE decides
  s.addText("Context Engineering 要决定的问题：", {
    x: 0.42, y: 4.3, w: 5, h: 0.3,
    fontSize: 12, bold: true, color: C.dark, margin: 0,
  });

  const decisions = [
    "给 AI 看哪些文档？",
    "加载哪些工具？",
    "保留多少对话历史？",
    "这些信息怎么排列？",
    "总共不能超过多少 token？",
  ];
  decisions.forEach((d, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    s.addShape(pres.shapes.OVAL, {
      x: 0.42 + col * 4.7, y: 4.68 + row * 0.3, w: 0.18, h: 0.18,
      fill: { color: C.red }, line: { color: C.red },
    });
    s.addText(d, {
      x: 0.68 + col * 4.7, y: 4.65 + row * 0.3, w: 4.3, h: 0.28,
      fontSize: 12, color: C.dark, margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 5 — 四种上下文来源
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "四种上下文来源");
  addFooter(s);

  const sources = [
    {
      num: "01", name: "System Instructions", cn: "系统指令",
      example: "角色定义、安全边界、输出格式",
      trait: "固定，每次都加载",
      color: C.blue, icon: "⚙️",
    },
    {
      num: "02", name: "User Input", cn: "用户输入",
      example: "问题、上传的文件、选择的选项",
      trait: "每次不同",
      color: C.orange, icon: "💬",
    },
    {
      num: "03", name: "Tool Results", cn: "工具结果",
      example: "API 响应、数据库查询、搜索结果",
      trait: "按需加载，可能很大",
      color: C.teal, icon: "🔧",
    },
    {
      num: "04", name: "Memory", cn: "记忆",
      example: "对话摘要、用户偏好、长期记忆",
      trait: "需要压缩管理",
      color: C.purple, icon: "🧠",
    },
  ];

  // Center LLM box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.9, y: 2.05, w: 2.2, h: 1.3,
    fill: { color: C.dark }, line: { color: C.dark },
    shadow: makeShadow(),
  });
  s.addText("LLM\nContext Window", {
    x: 3.9, y: 2.05, w: 2.2, h: 1.3,
    fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // 4 source cards with connecting lines to center
  const positions = [
    { x: 0.3, y: 0.95, ax: 2.95, ay: 1.55, bx: 3.9, by: 2.25 },   // top-left
    { x: 6.75, y: 0.95, ax: 6.75, ay: 1.55, bx: 6.1, by: 2.25 },  // top-right
    { x: 0.3, y: 3.55, ax: 2.95, ay: 3.95, bx: 3.9, by: 3.1 },    // bottom-left
    { x: 6.75, y: 3.55, ax: 6.75, ay: 3.95, bx: 6.1, by: 3.1 },   // bottom-right
  ];

  sources.forEach((src, i) => {
    const p = positions[i];
    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 2.7, h: 1.55,
      fill: { color: C.white }, line: { color: src.color, width: 2 },
      shadow: makeShadow(),
    });
    // Top color bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 2.7, h: 0.42,
      fill: { color: src.color }, line: { color: src.color },
    });
    s.addText(`${src.icon}  ${src.name}`, {
      x: p.x + 0.08, y: p.y, w: 2.55, h: 0.42,
      fontSize: 10, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText(src.cn, {
      x: p.x + 0.08, y: p.y + 0.46, w: 2.55, h: 0.28,
      fontSize: 12, bold: true, color: C.dark, margin: 0,
    });
    s.addText(`示例：${src.example}`, {
      x: p.x + 0.08, y: p.y + 0.76, w: 2.55, h: 0.3,
      fontSize: 9, color: C.gray, margin: 0,
    });
    s.addText(`特点：${src.trait}`, {
      x: p.x + 0.08, y: p.y + 1.1, w: 2.55, h: 0.28,
      fontSize: 9, color: src.color, bold: true, margin: 0,
    });
    // Connecting dashed line
    s.addShape(pres.shapes.LINE, {
      x: p.ax, y: p.ay, w: p.bx - p.ax, h: p.by - p.ay,
      line: { color: src.color, width: 1.2, dashType: "dash" },
    });
  });

  // Bottom note
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.2, w: 9.2, h: 0.28,
    fill: { color: C.lightBlue }, line: { color: C.blue },
  });
  s.addText("这四种来源贯穿整个 Bootcamp：Phase 2（RAG） → Phase 3（Agent 工具） → Phase 4（模型优化）", {
    x: 0.52, y: 5.21, w: 9.0, h: 0.26,
    fontSize: 9, color: C.blue, align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 6 — 上下文窗口 = "预算"
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "上下文窗口 = \"预算\"");
  addFooter(s);

  s.addText("GPT-4o 128K / Claude 200K / Gemini 1M——听起来很大，实际工程中你很快发现不够用。像管理预算一样管理 context window：", {
    x: 0.42, y: 0.94, w: 9.2, h: 0.38,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Budget breakdown bars
  const items = [
    { label: "System Prompt",    tokens: "~2K",  pct: 8,  color: C.blue,   note: "固定开销，每次都有" },
    { label: "用户画像摘要",      tokens: "~1K",  pct: 4,  color: C.orange, note: "动态，从用户数据库拉取" },
    { label: "最近对话历史",      tokens: "~4K",  pct: 17, color: C.teal,   note: "滑动窗口，保留最近 5-10 轮" },
    { label: "知识库检索结果",    tokens: "~8K",  pct: 33, color: C.purple, note: "RAG 检索的 top-5 文档片段" },
    { label: "工具调用结果",      tokens: "~4K",  pct: 17, color: C.red,    note: "Agent 执行工具后的返回值" },
    { label: "当前用户输入",      tokens: "~1K",  pct: 4,  color: C.green,  note: "必须保留，不能砍" },
    { label: "预留给 AI 回答",   tokens: "~4K",  pct: 17, color: "9CA3AF",  note: "输出空间" },
  ];

  const barMaxW = 5.5;
  items.forEach((it, i) => {
    const y = 1.42 + i * 0.52;
    const barW = Math.max((it.pct / 100) * barMaxW, 0.3);
    // Label
    s.addText(it.label, {
      x: 0.42, y, w: 2.2, h: 0.38,
      fontSize: 11, bold: true, color: C.dark, valign: "middle", margin: 0,
    });
    // Bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 2.7, y: y + 0.04, w: barW, h: 0.3,
      fill: { color: it.color }, line: { color: it.color },
    });
    // Token count
    s.addText(it.tokens, {
      x: 2.72 + barW, y, w: 0.7, h: 0.38,
      fontSize: 11, bold: true, color: it.color, valign: "middle", margin: 0,
    });
    // Note
    s.addText(it.note, {
      x: 3.55 + barW, y, w: 9.2 - 3.6 - barW, h: 0.38,
      fontSize: 9, color: C.gray, valign: "middle", margin: 0,
    });
  });

  // Total
  s.addShape(pres.shapes.LINE, {
    x: 0.42, y: 5.1, w: 9.1, h: 0,
    line: { color: C.dark, width: 1 },
  });
  s.addText("已用：~24K / 128K  总预算", {
    x: 0.42, y: 5.12, w: 5, h: 0.25,
    fontSize: 11, bold: true, color: C.dark, margin: 0,
  });
  s.addText("剩余：104K 可弹性使用", {
    x: 5.5, y: 5.12, w: 4, h: 0.25,
    fontSize: 11, color: C.teal, bold: true, margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 7 — 预算管理四原则
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "预算管理四原则");
  addFooter(s);

  const principles = [
    {
      num: "01", color: C.blue,
      title: "最高优先级：System Prompt + 当前任务",
      desc: "没有 System Prompt，AI 会\"忘记\"自己的角色和规则。当前任务直接决定回答质量。",
      analogy: "考试时先看题目要求和参考资料，不是把笔记本全搬进考场",
    },
    {
      num: "02", color: C.orange,
      title: "压缩而不是丢弃",
      desc: "100 轮对话不要全塞进去。每 10 轮让 AI 生成摘要（几百 token）。保留：关键决策、用户偏好、重要事实。丢弃：寒暄、重复、过时信息。",
      analogy: "摘要保留信号，去除噪音",
    },
    {
      num: "03", color: C.teal,
      title: "按需加载",
      desc: "不要预先塞入所有可能用到的文档。用户问什么再去检索相关内容。",
      analogy: "这就是 RAG 的核心思想",
    },
    {
      num: "04", color: C.purple,
      title: "预留输出空间",
      desc: "别把 context window 用满，留 10-20% 给 AI 回答。",
      analogy: "128K 窗口实测超过 20K tokens 效果开始下降",
    },
  ];

  principles.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.42 + col * 4.85;
    const y = 1.05 + row * 2.1;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 1.9,
      fill: { color: C.white }, line: { color: p.color, width: 1.5 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 0.48,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(`${p.num}  ${p.title}`, {
      x: x + 0.12, y, w: 4.38, h: 0.48,
      fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    s.addText(p.desc, {
      x: x + 0.12, y: y + 0.54, w: 4.38, h: 0.88,
      fontSize: 10.5, color: C.dark, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.12, y: y + 1.44, w: 4.36, h: 0.35,
      fill: { color: p.color, transparency: 88 }, line: { color: p.color, transparency: 60 },
    });
    s.addText(`💡 ${p.analogy}`, {
      x: x + 0.18, y: y + 1.46, w: 4.25, h: 0.3,
      fontSize: 9, color: p.color, italic: true, valign: "middle", margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 8 — 动态上下文组装：客服 Agent
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "动态上下文组装：客服 Agent");
  addFooter(s);

  s.addText("每次用户发消息，代码需要动态组装上下文——不是每次都加载所有信息：", {
    x: 0.42, y: 0.94, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Code block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.28, w: 5.5, h: 3.85,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  // Green dot
  s.addShape(pres.shapes.OVAL, {
    x: 0.58, y: 1.38, w: 0.14, h: 0.14,
    fill: { color: codeGreen = "6BBF6B" }, line: { color: "6BBF6B" },
  });
  s.addText("build_customer_service_context()", {
    x: 0.78, y: 1.33, w: 5.0, h: 0.25,
    fontSize: 9, color: "9CA3AF", margin: 0,
  });

  const codeLines = [
    { text: "def build_customer_service_context(user_id, message):", color: "C8D3F5" },
    { text: "    # 1. 固定部分 — 每次都加载", color: "6A9955" },
    { text: "    system = load_system_prompt('cs_v3.txt')  # ~500 tokens", color: "9CDCFE" },
    { text: "    # 2. 动态 — 用户画像", color: "6A9955" },
    { text: "    profile = db.get_user_profile(user_id)", color: "9CDCFE" },
    { text: "    # 3. 动态 — 最近 5 轮对话（滑动窗口）", color: "6A9955" },
    { text: "    recent = get_recent_messages(user_id, last_n=5)", color: "9CDCFE" },
    { text: "    # 4. 动态 — 知识库检索", color: "6A9955" },
    { text: "    docs = rag_search(message, top_k=3)", color: "9CDCFE" },
    { text: "    # 5. 条件加载 — 只在提到订单时查询", color: "6A9955" },
    { text: "    order_info = \"\"", color: "9CDCFE" },
    { text: "    if '订单' in message or '退款' in message:", color: "C8D3F5" },
    { text: "        order_info = get_recent_orders(user_id)", color: "9CDCFE" },
  ];
  codeLines.forEach((line, i) => {
    s.addText(line.text, {
      x: 0.52, y: 1.65 + i * 0.24, w: 5.2, h: 0.25,
      fontSize: 8.5, color: line.color, fontFace: "Courier New", margin: 0,
    });
  });

  // Right side: 5 step labels
  const steps = [
    { num: "1", label: "System Prompt", sub: "固定加载，每次都有", color: C.blue },
    { num: "2", label: "用户画像", sub: "从数据库动态拉取", color: C.orange },
    { num: "3", label: "对话历史", sub: "滑动窗口，仅最近5轮", color: C.teal },
    { num: "4", label: "知识库检索", sub: "RAG 按需检索 top-3", color: C.purple },
    { num: "5", label: "订单信息", sub: "条件加载，按关键词触发", color: C.red },
  ];

  steps.forEach((st, i) => {
    const y = 1.28 + i * 0.76;
    s.addShape(pres.shapes.OVAL, {
      x: 6.1, y: y + 0.18, w: 0.36, h: 0.36,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(st.num, {
      x: 6.1, y: y + 0.18, w: 0.36, h: 0.36,
      fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.label, {
      x: 6.55, y: y + 0.14, w: 3.2, h: 0.24,
      fontSize: 11, bold: true, color: C.dark, margin: 0,
    });
    s.addText(st.sub, {
      x: 6.55, y: y + 0.38, w: 3.2, h: 0.22,
      fontSize: 9, color: C.gray, margin: 0,
    });
  });

  // Bottom highlight
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: "FFFBEB" }, line: { color: C.gold },
  });
  s.addText("💡 关键：订单信息只在用户提到\"订单\"\"退款\"时才查询——按需加载节省 token", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9.5, color: C.dark, align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 9 — 动态上下文组装：代码助手对比
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "动态上下文组装：场景对比");
  addFooter(s);

  s.addText("没有万能的上下文组装方案——每个场景都要单独设计：", {
    x: 0.42, y: 0.94, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Two columns
  const cols = [
    {
      title: "客服 Agent", color: C.blue, x: 0.42,
      items: [
        { label: "System Prompt", tag: "固定", color: C.blue },
        { label: "用户画像（VIP / 普通）", tag: "动态", color: C.orange },
        { label: "最近 5 轮对话历史", tag: "动态", color: C.teal },
        { label: "FAQ 知识库检索", tag: "动态", color: C.purple },
        { label: "订单信息", tag: "条件", color: C.red },
        { label: "当前用户输入", tag: "必须", color: C.green },
      ],
    },
    {
      title: "代码助手", color: C.orange, x: 5.1,
      items: [
        { label: "System Prompt（代码规范+技术栈）", tag: "固定", color: C.blue },
        { label: "当前打开的文件内容", tag: "动态", color: C.orange },
        { label: "相关文件（import 分析自动找）", tag: "动态", color: C.teal },
        { label: "最近 5 轮对话", tag: "动态", color: C.purple },
        { label: "错误日志", tag: "条件", color: C.red },
        { label: "用户的代码问题", tag: "必须", color: C.green },
      ],
    },
  ];

  cols.forEach(col => {
    // Header
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.3, w: 4.5, h: 0.48,
      fill: { color: col.color }, line: { color: col.color },
    });
    s.addText(col.title, {
      x: col.x + 0.12, y: 1.3, w: 4.28, h: 0.48,
      fontSize: 15, bold: true, color: C.white, valign: "middle", margin: 0,
    });
    // Items
    col.items.forEach((item, i) => {
      const y = 1.88 + i * 0.54;
      s.addShape(pres.shapes.RECTANGLE, {
        x: col.x, y, w: 4.5, h: 0.44,
        fill: { color: i % 2 === 0 ? C.white : C.bg },
        line: { color: C.border, width: 0.5 },
      });
      // Tag badge
      s.addShape(pres.shapes.RECTANGLE, {
        x: col.x + 0.08, y: y + 0.08, w: 0.6, h: 0.26,
        fill: { color: item.color }, line: { color: item.color },
      });
      s.addText(item.tag, {
        x: col.x + 0.08, y: y + 0.08, w: 0.6, h: 0.26,
        fontSize: 7.5, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
      });
      s.addText(item.label, {
        x: col.x + 0.76, y, w: 3.65, h: 0.44,
        fontSize: 10.5, color: C.dark, valign: "middle", margin: 0,
      });
    });
  });

  // VS divider
  s.addShape(pres.shapes.OVAL, {
    x: 4.68, y: 2.55, w: 0.64, h: 0.64,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("VS", {
    x: 4.68, y: 2.55, w: 0.64, h: 0.64,
    fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // Key diff
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("关键差异：客服需要用户画像 + 知识库  |  代码助手需要当前文件 + 关联文件。场景不同，设计不同。", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9.5, color: "B8C5E0", align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 10 — RunnableParallel 实现
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "用 LangChain RunnableParallel 实现");
  addFooter(s);

  s.addText("手动拼字符串到第三个数据源就崩了。RunnableParallel 并行获取多个上下文，比串行快 2-3 倍：", {
    x: 0.42, y: 0.94, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Code block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.28, w: 5.9, h: 3.75,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 0.56, y: 1.38, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("runnable_parallel_example.py", {
    x: 0.76, y: 1.33, w: 5.0, h: 0.25,
    fontSize: 9, color: "9CA3AF", margin: 0,
  });

  const code = [
    { t: "from langchain_core.runnables import (", c: "C8D3F5" },
    { t: "    RunnablePassthrough, RunnableParallel", c: "9CDCFE" },
    { t: ")", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "# 并行获取多个上下文数据源", c: "6A9955" },
    { t: "context_chain = RunnableParallel(", c: "C8D3F5" },
    { t: "    user_profile = RunnablePassthrough() | get_user_profile,", c: "9CDCFE" },
    { t: "    knowledge    = RunnablePassthrough() | search_knowledge_base,", c: "9CDCFE" },
    { t: "    question     = lambda x: x['question'],", c: "9CDCFE" },
    { t: ")", c: "C8D3F5" },
    { t: " ", c: "C8D3F5" },
    { t: "chain = context_chain | prompt | ChatOpenAI(model='gpt-4o')", c: "C8D3F5" },
    { t: "result = chain.invoke({'user_id': 'u123', 'question': '我要退款'})", c: "9CDCFE" },
  ];
  code.forEach((line, i) => {
    s.addText(line.t, {
      x: 0.52, y: 1.65 + i * 0.24, w: 5.65, h: 0.25,
      fontSize: 8.5, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Right: serial vs parallel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.45, y: 1.28, w: 3.17, h: 1.7,
    fill: { color: "FFF5F5" }, line: { color: C.red, width: 1.5 },
  });
  s.addText("❌ 串行（旧方式）", {
    x: 6.57, y: 1.33, w: 2.9, h: 0.32,
    fontSize: 11, bold: true, color: C.red, margin: 0,
  });
  ["取用户画像  →  0.8s", "查知识库    →  1.2s", "取订单信息  →  1.2s", "合计：       3.2s"].forEach((t, i) => {
    s.addText(t, {
      x: 6.57, y: 1.7 + i * 0.28, w: 2.9, h: 0.26,
      fontSize: 10, color: C.dark, fontFace: "Courier New", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.45, y: 3.1, w: 3.17, h: 1.7,
    fill: { color: "F0FFF4" }, line: { color: C.green, width: 1.5 },
  });
  s.addText("✅ 并行（RunnableParallel）", {
    x: 6.57, y: 3.15, w: 2.9, h: 0.32,
    fontSize: 11, bold: true, color: C.green, margin: 0,
  });
  ["取用户画像  ┐", "查知识库    ┼→  1.2s（同时）", "取订单信息  ┘", "合计：       1.4s  🎉"].forEach((t, i) => {
    s.addText(t, {
      x: 6.57, y: 3.52 + i * 0.28, w: 2.9, h: 0.26,
      fontSize: 10, color: C.dark, fontFace: "Courier New", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("实测：我们的客服系统从串行改并行后，P99 延迟从 3.2 秒降到 1.4 秒", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9.5, color: C.orange, align: "center", bold: true, margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 11 — 量化对比 V1 / V2 / V3
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "量化对比：V1 / V2 / V3 三方案对比");
  addFooter(s);

  s.addText("客服场景 50 条测试问题，3 种方案对比：", {
    x: 0.42, y: 0.94, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // Table header
  const headers = ["方案", "Faithfulness", "Answer Relevancy", "平均延迟", "月成本"];
  const colW = [2.8, 1.6, 1.9, 1.4, 1.2];
  const colX = [0.42, 3.22, 4.82, 6.72, 8.12];

  // Header row
  colX.forEach((x, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.3, w: colW[i], h: 0.45,
      fill: { color: C.dark }, line: { color: C.dark },
    });
    s.addText(headers[i], {
      x: x + 0.06, y: 1.3, w: colW[i] - 0.1, h: 0.45,
      fontSize: 11, bold: true, color: C.white, valign: "middle", align: "center", margin: 0,
    });
  });

  const rows = [
    {
      label: "V1: 纯 System Prompt（无 RAG）",
      values: ["0.45", "0.62", "1.2s", "$200"],
      color: C.red, bg: "FFF5F5", barColors: ["E53E3E", "E53E3E"],
    },
    {
      label: "V2: System Prompt + RAG",
      values: ["0.78", "0.85", "2.1s", "$350"],
      color: C.orange, bg: "FFF8F0", barColors: ["F97316", "F97316"],
    },
    {
      label: "V3: 完整 Context Engineering",
      values: ["0.91", "0.93", "1.8s", "$400"],
      color: C.green, bg: "F0FFF4", barColors: ["28A745", "28A745"],
    },
  ];

  rows.forEach((row, ri) => {
    const y = 1.85 + ri * 0.85;
    colX.forEach((x, ci) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: colW[ci], h: 0.75,
        fill: { color: ri % 2 === 0 ? C.white : row.bg },
        line: { color: C.border, width: 0.5 },
      });
      const val = ci === 0 ? row.label : row.values[ci - 1];
      s.addText(val, {
        x: x + 0.06, y, w: colW[ci] - 0.1, h: 0.75,
        fontSize: ci === 0 ? 10 : 12,
        bold: ci !== 0,
        color: ci === 0 ? C.dark : row.color,
        valign: "middle",
        align: ci === 0 ? "left" : "center",
        margin: 0,
      });
    });
    // Version badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: colX[0], y, w: 0.06, h: 0.75,
      fill: { color: row.color }, line: { color: row.color },
    });
  });

  // Insights
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.45, w: 4.45, h: 0.65,
    fill: { color: "FFF5F5" }, line: { color: C.red, width: 1 },
  });
  s.addText("V1 为什么这么差？", {
    x: 0.55, y: 4.48, w: 4.2, h: 0.24,
    fontSize: 10, bold: true, color: C.red, margin: 0,
  });
  s.addText("只有训练数据，无私有知识 → 超过一半回答不可信（幻觉）", {
    x: 0.55, y: 4.72, w: 4.2, h: 0.32,
    fontSize: 9.5, color: C.dark, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 4.45, w: 4.62, h: 0.65,
    fill: { color: "F0FFF4" }, line: { color: C.green, width: 1 },
  });
  s.addText("V2 → V3 的关键提升：", {
    x: 5.12, y: 4.48, w: 4.38, h: 0.24,
    fontSize: 10, bold: true, color: C.green, margin: 0,
  });
  s.addText("用户画像 + 对话摘要 + 动态预算 → 延迟反而更低（1.8s vs 2.1s）", {
    x: 5.12, y: 4.72, w: 4.38, h: 0.32,
    fontSize: 9.5, color: C.dark, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("V3 比 V2 多 15% 成本，但 Faithfulness 从 0.78 提升到 0.91  |  动态预算控制减少了不必要检索，LLM 处理 token 更少", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 9, color: "B8C5E0", align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 11.5 — 过渡：从数据到工程实践
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "数据验证了方向——那工程上怎么落地？");
  addFooter(s);

  s.addText("V1 → V2 → V3 的数据告诉我们：分层 + 动态是对的。下一个问题是：在真实项目里，怎么把这套思路系统性地组织起来？", {
    x: 0.42, y: 0.95, w: 9.2, h: 0.42,
    fontSize: 12, color: C.gray, italic: true, margin: 0,
  });

  // Left: recap what we learned
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.48, w: 4.4, h: 3.6,
    fill: { color: C.white }, line: { color: C.border, width: 1.5 }, shadow: { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.48, w: 4.4, h: 0.45,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("我们已经知道的：", {
    x: 0.55, y: 1.48, w: 4.2, h: 0.45,
    fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const learned = [
    { icon: "✅", text: "Context 要分层管理，不能一股脑塞进去", color: C.green },
    { icon: "✅", text: "按需加载（RAG）比预载全部文档效果更好", color: C.green },
    { icon: "✅", text: "动态预算控制能同时降低成本和延迟", color: C.teal },
    { icon: "✅", text: "对话摘要解决了长对话 token 爆炸问题", color: C.teal },
    { icon: "❓", text: "但这些规则放哪里？怎么复用？", color: C.orange },
    { icon: "❓", text: "多人协作时，Context 策略怎么统一？", color: C.orange },
  ];
  learned.forEach((l, i) => {
    const y = 2.05 + i * 0.52;
    s.addShape(pres.shapes.OVAL, {
      x: 0.58, y: y + 0.12, w: 0.22, h: 0.22,
      fill: { color: l.color }, line: { color: l.color },
    });
    s.addText(`${l.icon}  ${l.text}`, {
      x: 0.88, y, w: 3.82, h: 0.45,
      fontSize: 11, color: C.dark, valign: "middle", margin: 0,
    });
  });

  // Arrow in middle
  s.addText("→", {
    x: 4.9, y: 2.9, w: 0.62, h: 0.6,
    fontSize: 28, bold: true, color: C.orange, align: "center", margin: 0,
  });
  s.addText("答案", {
    x: 4.88, y: 3.5, w: 0.65, h: 0.3,
    fontSize: 10, color: C.orange, bold: true, align: "center", margin: 0,
  });

  // Right: what's coming
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.6, y: 1.48, w: 4.02, h: 3.6,
    fill: { color: C.white }, line: { color: C.orange, width: 2 }, shadow: { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.6, y: 1.48, w: 4.02, h: 0.45,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("下一步：CLAUDE.md Pattern", {
    x: 5.72, y: 1.48, w: 3.8, h: 0.45,
    fontSize: 13, bold: true, color: C.white, valign: "middle", margin: 0,
  });

  const coming = [
    { layer: "项目级", desc: "全局规则、技术栈约束\n= System Prompt 的持久化", color: C.blue },
    { layer: "模块级", desc: "领域专属规则\n= 按需 RAG 的结构化替代", color: C.teal },
    { layer: "用户级", desc: "个人偏好设置\n= 用户画像的工程化存储", color: C.purple },
  ];
  coming.forEach((c, i) => {
    const y = 2.05 + i * 1.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.72, y, w: 3.78, h: 0.85,
      fill: { color: c.color, transparency: 90 }, line: { color: c.color, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.72, y, w: 0.72, h: 0.85,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.layer, {
      x: 5.72, y, w: 0.72, h: 0.85,
      fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.desc, {
      x: 6.5, y: y + 0.1, w: 2.88, h: 0.68,
      fontSize: 10, color: C.dark, margin: 0,
    });
  });

  // Bottom connector
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.18, w: 9.2, h: 0.28,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("把 Context Engineering 策略写进项目结构里，而不是散落在代码注释和每个人的脑子里", {
    x: 0.52, y: 5.2, w: 9.0, h: 0.24,
    fontSize: 10, color: C.orange, bold: true, align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 12 — CLAUDE.md 分层注入
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "CLAUDE.md Pattern：项目级上下文注入");
  addFooter(s);

  s.addText("Claude Code 的 CLAUDE.md 是实际项目中最优雅的 Context Engineering 实践——分三层注入上下文：", {
    x: 0.42, y: 0.94, w: 9.2, h: 0.3,
    fontSize: 11, color: C.gray, italic: true, margin: 0,
  });

  // File tree (code block style)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 1.28, w: 4.5, h: 3.2,
    fill: { color: C.codeBlack }, line: { color: C.codeBlack },
  });
  s.addShape(pres.shapes.OVAL, { x: 0.56, y: 1.38, w: 0.14, h: 0.14, fill: { color: "6BBF6B" }, line: { color: "6BBF6B" } });
  s.addText("project structure", {
    x: 0.76, y: 1.33, w: 4.0, h: 0.25,
    fontSize: 9, color: "9CA3AF", margin: 0,
  });

  const tree = [
    { t: "项目根目录/", c: "9CDCFE", indent: 0 },
    { t: "├── CLAUDE.md          ← 项目级", c: "6BBF6B", indent: 1 },
    { t: "│      技术栈、编码规范、架构约束", c: "9CA3AF", indent: 2 },
    { t: "├── src/", c: "9CDCFE", indent: 1 },
    { t: "│   └── modules/", c: "9CDCFE", indent: 2 },
    { t: "│       └── CLAUDE.md  ← 模块级", c: "6BBF6B", indent: 3 },
    { t: "│              该模块的特殊规则", c: "9CA3AF", indent: 4 },
    { t: "└── .claude/", c: "9CDCFE", indent: 1 },
    { t: "    └── settings.json  ← 用户级", c: "F4C06B", indent: 2 },
    { t: "           个人偏好", c: "9CA3AF", indent: 3 },
  ];
  tree.forEach((line, i) => {
    s.addText(line.t, {
      x: 0.52 + line.indent * 0.1, y: 1.65 + i * 0.25, w: 4.2, h: 0.25,
      fontSize: 8.5, color: line.c, fontFace: "Courier New", margin: 0,
    });
  });

  // Right: 3 layer mapping
  const layers = [
    {
      layer: "项目级 CLAUDE.md",
      equiv: "= System Prompt（全局规则）",
      desc: "角色定义、技术栈约束、安全边界",
      color: C.blue,
    },
    {
      layer: "模块级 CLAUDE.md",
      equiv: "= RAG 检索结果（领域知识）",
      desc: "该模块特有规则、依赖关系",
      color: C.orange,
    },
    {
      layer: "用户级 settings.json",
      equiv: "= 用户画像（用户偏好）",
      desc: "个人编码习惯、输出格式偏好",
      color: C.teal,
    },
  ];

  layers.forEach((l, i) => {
    const y = 1.28 + i * 1.08;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y, w: 4.52, h: 0.95,
      fill: { color: C.white }, line: { color: l.color, width: 1.5 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y, w: 0.08, h: 0.95,
      fill: { color: l.color }, line: { color: l.color },
    });
    s.addText(l.layer, {
      x: 5.25, y: y + 0.06, w: 4.25, h: 0.3,
      fontSize: 11, bold: true, color: l.color, margin: 0,
    });
    s.addText(l.equiv, {
      x: 5.25, y: y + 0.35, w: 4.25, h: 0.25,
      fontSize: 10, bold: true, color: C.dark, margin: 0,
    });
    s.addText(l.desc, {
      x: 5.25, y: y + 0.6, w: 4.25, h: 0.25,
      fontSize: 9, color: C.gray, margin: 0,
    });
  });

  // Result callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.6, w: 9.2, h: 0.48,
    fill: { color: "F0FFF4" }, line: { color: C.green, width: 1.5 },
  });
  s.addText("实测结果：分层结构后 AI 遵循规则准确率从 72% 提升到 91%", {
    x: 0.55, y: 4.63, w: 5.5, h: 0.4,
    fontSize: 12, bold: true, color: C.green, valign: "middle", margin: 0,
  });
  s.addText("原因：每层更短、更聚焦，模型更容易\"记住\"", {
    x: 6.1, y: 4.63, w: 3.4, h: 0.4,
    fontSize: 10, color: C.dark, valign: "middle", margin: 0,
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 13 — 常见错误
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addWatermark(s);
  addLogo(s);
  addPageTitle(s, "常见错误");
  addFooter(s);

  const mistakes = [
    {
      title: "把所有规则塞进一个巨大的 System Prompt",
      problem: "超过 2000 tokens 后模型对中间内容的注意力显著下降",
      fix: "用分层结构（CLAUDE.md pattern），每层短而聚焦",
      color: C.red,
    },
    {
      title: "128K 窗口就用 128K",
      problem: "实测超过 20K tokens 后效果开始下降，\"Lost in the Middle\" 问题",
      fix: "保持有效 context 在 10-30K 范围内，关键信息放开头或结尾",
      color: C.orange,
    },
    {
      title: "System Prompt 里写空洞描述",
      problem: "\"你是一个专业的、负责任的、有创造力的助手\"——占 token 但零信息量",
      fix: "2000 token 的 Prompt 真正有用的往往不到 200 token，只写具体规则",
      color: C.purple,
    },
  ];

  mistakes.forEach((m, i) => {
    const y = 1.05 + i * 1.45;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.42, y, w: 9.2, h: 1.3,
      fill: { color: C.white }, line: { color: m.color, width: 1.5 },
      shadow: makeShadow(),
    });
    // Left color strip
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.42, y, w: 0.55, h: 1.3,
      fill: { color: m.color }, line: { color: m.color },
    });
    s.addText("❌", {
      x: 0.42, y, w: 0.55, h: 1.3,
      fontSize: 18, align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText(m.title, {
      x: 1.05, y: y + 0.08, w: 8.45, h: 0.3,
      fontSize: 13, bold: true, color: m.color, margin: 0,
    });
    // Problem
    s.addText(`问题：${m.problem}`, {
      x: 1.05, y: y + 0.42, w: 8.45, h: 0.28,
      fontSize: 10.5, color: C.dark, margin: 0,
    });
    // Fix
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.05, y: y + 0.76, w: 8.45, h: 0.42,
      fill: { color: m.color, transparency: 90 }, line: { color: m.color, transparency: 70 },
    });
    s.addText(`✅ 正确做法：${m.fix}`, {
      x: 1.12, y: y + 0.78, w: 8.32, h: 0.38,
      fontSize: 10.5, color: m.color, valign: "middle", margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════
// SLIDE 14 — 总结
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Decorative
  s.addShape(pres.shapes.OVAL, {
    x: -0.8, y: -0.8, w: 3.5, h: 3.5,
    fill: { color: "FFFFFF", transparency: 94 }, line: { color: "FFFFFF", transparency: 94 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 8.2, y: 3.5, w: 3.0, h: 3.0,
    fill: { color: C.orange, transparency: 88 }, line: { color: C.orange, transparency: 85 },
  });

  // Logo on dark bg
  addLogo(s);

  // Title area
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 0.2, w: 0.1, h: 0.9,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("总结：记住这几点就够了", {
    x: 0.62, y: 0.2, w: 7.8, h: 0.55,
    fontSize: 22, bold: true, color: C.white, fontFace: "Arial", margin: 0,
  });
  s.addText("Context Engineering 核心要点", {
    x: 0.62, y: 0.76, w: 7.8, h: 0.28,
    fontSize: 12, color: "7B9EC9", margin: 0,
  });

  const points = [
    { icon: "🏗", title: "CE 不是写 Prompt，是设计系统", body: "决定给 AI 看什么、不看什么、按什么顺序看", color: C.blue },
    { icon: "📦", title: "四种来源按需组合", body: "System Instructions / User Input / Tool Results / Memory", color: C.orange },
    { icon: "💰", title: "上下文是有限资源", body: "信号密度比信息量重要，超过 20K 效果下降", color: C.teal },
    { icon: "⚡", title: "按需加载 + 动态预算", body: "不要预先塞入所有信息，用户问什么再检索什么", color: C.purple },
  ];

  points.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.42 + col * 4.85;
    const y = 1.2 + row * 1.5;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.6, h: 1.35,
      fill: { color: "FFFFFF", transparency: 90 }, line: { color: p.color, transparency: 30 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h: 1.35,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(`${p.icon}  ${p.title}`, {
      x: x + 0.18, y: y + 0.1, w: 4.3, h: 0.38,
      fontSize: 12, bold: true, color: C.white, margin: 0,
    });
    s.addText(p.body, {
      x: x + 0.18, y: y + 0.55, w: 4.3, h: 0.65,
      fontSize: 10.5, color: "B8C5E0", margin: 0,
    });
  });

  // Final orange banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 4.35, w: 9.2, h: 0.68,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("量化驱动 — 每次改动都跑评估，用数据说话而不是凭感觉", {
    x: 0.55, y: 4.38, w: 9.0, h: 0.62,
    fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // Footer
  s.addText("www.jiangren.com.au", {
    x: 0.42, y: 5.22, w: 3, h: 0.22,
    fontSize: 10, color: "7B9EC9", bold: true, margin: 0,
  });
}

// ── Write ─────────────────────────────────────────────
pres.writeFile({ fileName: "/home/claude/context_engineering_v2.pptx" })
  .then(() => console.log("DONE"))
  .catch(e => { console.error(e); process.exit(1); });
