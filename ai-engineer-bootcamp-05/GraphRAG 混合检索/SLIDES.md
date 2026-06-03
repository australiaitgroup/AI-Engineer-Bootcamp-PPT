# 幻灯片使用指南

本课提供两种格式的幻灯片：

---

## 格式一：Marp（Markdown 幻灯片）

文件：`lesson1_graphrag_hybrid_search/slides.md`

### 打开方式

**1. VS Code + Marp 扩展（推荐）**
```
扩展市场搜索：Marp for VS Code
打开 slides.md → 右上角点击 Marp 图标 → Preview
```

**2. Marp CLI**
```bash
npm install -g @marp-team/marp-cli
marp slides.md --pdf -o graphrag_slides.pdf
marp slides.md --html -o graphrag_slides.html
```

**3. 在线编辑**
浏览器打开 https://web.marp.app → 粘贴 slides.md 内容

### 演讲建议
- 每张幻灯片控制在 60–90 秒
- 代码幻灯片：先讲思路，再看代码，再运行 demo
- 对比表格幻灯片：逐列揭示，不要一次全展示

---

## 格式二：talk-deck（React 交互幻灯片）

文件：`lesson1_graphrag_hybrid_search/talk-deck/` 下的 TSX 文件

### 使用方式

1. Clone talk-deck 框架：
   ```bash
   git clone https://github.com/JR-Academy-AI/talk-deck
   cd talk-deck
   npm install
   ```

2. 将 `talk-deck/` 目录中的所有 `.tsx` 文件复制到：
   ```
   talk-deck/src/components/slides/
   ```

3. 按 `App.tsx.snippet` 的内容更新 `src/App.tsx`

4. 启动开发服务器：
   ```bash
   npm run dev
   ```

5. 导出静态文件：
   ```bash
   npm run build
   # dist/ 文件夹可部署到任意静态托管
   ```

### 快捷键
- `←` `→`：翻页
- `F`：全屏
- `C`：开启摄像头气泡（演讲录制用）

---

## 上传位置

课件完成后上传至：
https://github.com/australiaitgroup/AI-Engineer-Bootcamp-PPT/tree/main/ai-engineer-bootcamp-05
