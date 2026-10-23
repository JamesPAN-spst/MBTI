# 宋纸手稿 · 示范页

按风格样品册的收藏做的设计方案：Tufte 式旁注版心 + 宋式雅色 + 烫金宣纸，暗色为纯墨黑配暗金字。示范内容是第 4 章 §4.1「收敛半径」；顶栏可切换到「设计方案」视图（配色、字体、排版参数、每个收藏编号的用处、二十幅插画的分配）。

```bash
npm run songzhi                 # → docs/songzhi/index.html（并复制用到的插画到 docs/songzhi/img/）
FRAGMENT=1 OUT=/tmp/sz/index.html node design/songzhi/build.mjs   # claude.ai Artifact 用的片段
```

- 在线版本：https://claude.ai/artifact/EVJsNQXr1epsysFbNwvrx3
- 纸纹、金箔、远山、圆相都在页面打开时用随机种子现场绘制，每次打开都不同。
