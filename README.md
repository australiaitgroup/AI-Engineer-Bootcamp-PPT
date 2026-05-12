# AI Engineer Bootcamp · PPT

匠人学院 AI Engineer Bootcamp 课程演示文稿仓库。每个 deck 是一份独立的 Vite + React + TS 应用，构建后各自部署到 GitHub Pages 的独立子路径，互不共享菜单。

## 线上路径（每个 PPT 独立 URL）

| Deck | 源码目录 | 线上 URL |
| --- | --- | --- |
| Context Engineering | `ai-engineer-bootcamp-05/Context Engineering/` | https://australiaitgroup.github.io/AI-Engineer-Bootcamp-PPT/context-engineering/ |
| The Four Prototyping Patterns | `ai-engineer-bootcamp-05/The Four Prototyping Patterns/` | https://australiaitgroup.github.io/AI-Engineer-Bootcamp-PPT/four-prototyping-patterns/ |
| Vibe Coding | `ai-engineer-bootcamp-05/Vibe Coding/` | https://australiaitgroup.github.io/AI-Engineer-Bootcamp-PPT/vibe-coding/ |

> 仓库根路径 `https://australiaitgroup.github.io/AI-Engineer-Bootcamp-PPT/` 故意不放 `index.html`，访问会 404 —— 这是有意为之，不提供菜单/索引页。

仓库：https://github.com/australiaitgroup/AI-Engineer-Bootcamp-PPT

## 自动部署

`.github/workflows/deploy.yml`：

1. 触发：`push` 到 `main` 或手动 `workflow_dispatch`
2. `npm ci && npm run build` 三个 deck，输出到各自 `dist/`
3. 把 `dist/` 拷贝到 `_site/<slug>/`，slug 与上表对应
4. `_site/` 整体上传，`actions/deploy-pages@v4` 发布

推到 `main` 后约 2-3 分钟即可在生产环境看到更新。

## 项目结构

```
.
├── ai-engineer-bootcamp-05/
│   ├── Context Engineering/                # Vite + React + TS
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.ts                  # base: './'
│   │   └── src/
│   ├── The Four Prototyping Patterns/      # Vite + React + TS
│   └── Vibe Coding/                        # Vite + React + TS
└── .github/workflows/deploy.yml
```

每个 deck 的 `vite.config.ts` 都使用 `base: './'` 相对路径，因此发布到任何子路径都能正常工作。

## 新增一份 deck

1. 在 `ai-engineer-bootcamp-05/` 下新建一个 deck 目录（Vite + React + TS，参考现有的三个）。
2. 确认 `vite.config.ts` 含 `base: './'`，`package.json` 有 `build` 脚本。
3. 在 `.github/workflows/deploy.yml` 的 `Build all decks` 步骤里追加一行 `build_deck`：

   ```bash
   build_deck "ai-engineer-bootcamp-05/<新 deck 目录名>" "<新 slug>"
   ```

4. 在本 README 的「线上路径」表格里登记这个新 slug（这一步必做 —— 不然别人不知道线上 URL）。
5. 推到 `main`，等 workflow 跑完。

## 本地开发

每个 deck 独立开发：

```bash
cd "ai-engineer-bootcamp-05/Context Engineering"
npm install
npm run dev          # Vite 默认 5173 端口
npm run build        # 产物在 ./dist
npm run preview      # 本地预览构建产物
```
