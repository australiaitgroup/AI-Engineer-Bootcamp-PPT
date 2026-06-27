# Demo 1 运行手册 · Computer Use 视觉循环

> **不需要 Claude Code。** 你自己打开「终端」(macOS Terminal / Windows PowerShell),
> 把下面的命令复制进去回车即可。整个 demo 跑在 Docker 容器里,跟你本机隔离。

---

## 这个 demo 要展示什么

让观众**肉眼看到** Claude 操作一台虚拟电脑:截屏 → 识别界面 → 移动鼠标/点击/打字 → 再截屏验证。
界面在 `http://localhost:8080`:**左边是聊天框,右边是虚拟桌面**(能看到鼠标自己动、窗口被打开、表单被填)。

> ⚠️ 注意:本 demo 在一个**隔离的 Docker 容器**里跑(自带 Linux 桌面),不会碰你本机的文件、邮箱或数据——这本身就呼应课程里"sandbox + 最小权限"的原则,可以现场点出来。

---

## 前置检查(自己逐项确认)

1. **Docker 已安装并在运行**
   ```bash
   docker --version && docker info > /dev/null 2>&1 && echo "Docker OK" || echo "Docker 未运行"
   ```
   - 如果没装:提示我去装 Docker Desktop(macOS/Windows)并打开它,不要自行尝试别的安装方式。

2. **API Key 已就绪**(用环境变量,**不要**把 key 写进任何文件)
   ```bash
   [ -n "$ANTHROPIC_API_KEY" ] && echo "Key 已设置" || echo "请先 export ANTHROPIC_API_KEY"
   ```
   - 如果没设:提示我在终端运行 `export ANTHROPIC_API_KEY=sk-ant-xxxx` 后重来。

---

## 启动(确认上面两项 OK 后,在终端执行)

直接用官方预构建镜像,**不需要 clone 仓库**:

```bash
docker run \
  -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
  -v $HOME/.anthropic:/home/computeruse/.anthropic \
  -p 5900:5900 -p 8501:8501 -p 6080:6080 -p 8080:8080 \
  -it ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest
```

- 首次拉镜像 + 初始化约 **1–3 分钟**,看到 `Computer Use Demo is ready!` 才算好。
- 然后让我在浏览器打开 **http://localhost:8080**(组合界面:左聊天 + 右桌面)。
- 端口含义:`8080` 主界面 / `6080` 网页版桌面 / `8501` Streamlit / `5900` VNC。
- 模型分辨率默认 XGA(1024×768),精度最好,**演示前别改**。

## 演示任务(在 localhost:8080 的聊天框里输入)

> 演示口诀:每输入一句,就指着右边桌面让观众看"它先截图、再动鼠标、做完又截图确认"。

**首选任务(联网,故事性强 —— "操作一个只有网页 UI 的系统"):**
```
打开 Firefox,访问 https://httpbin.org/forms/post ,
帮我填写这个订餐表单:顾客姓名填 "Demo User",电话填 "12345678",
配送时间随便选一个,披萨尺寸选 Large,
然后点击 Submit。每做完一步先截图确认再继续。
```

**备选任务(离线,最稳,网络不好时用):**
```
打开文本编辑器,写一首关于"AI agent 上生产"的五行小诗,
然后把文件保存到桌面,命名为 demo.txt。每步截图确认。
```

---

## 🛟 保命清单(现场必看)

- [ ] **提前录一段成功跑通的屏幕录像**。现场挂了就切录像边播边讲,毫无尴尬。
- [ ] **课前 30 分钟先完整跑通一遍**(镜像已拉、桌面已起、任务已验证)。
- [ ] 演示时**网速/API 额度**确认正常;限流就切备用 key。
- [ ] 如果它中途出错或卡住,**别慌**——顺势说:"看,这就是为什么生产必须有重试和超时",直接接到降级策略那页。
- [ ] 演示结束 `Ctrl+C` 停容器;敏感演示别留在公共机器上。

---

## 关于"卸载/收尾"

- 停止容器:在运行容器的终端按 `Ctrl+C`。
- 镜像会缓存在本机,下次启动同一条 `docker run` 即可,**不用再等拉镜像**(所以课前务必先跑一次)。
