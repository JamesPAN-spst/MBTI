# 风格样品册

一本互动册子，用来挑选数学分析网站的视觉风格：10 种整体风格（S01–S10），加上 233 个带编号的零件样品——背景艺术、配色、字体、排版参数、版式布局、质感、按钮、文本框、动效、页面切换，以及 20 家大企业的设计语言。看中的样品点 ♥ 收藏，最后一页「我的选择」一键复制编号，发给 Claude 即可。

- 构建产物：[`docs/booklet/index.html`](../../docs/booklet/index.html)（单文件，可直接用浏览器打开；开启 GitHub Pages 后位于站点的 `/booklet/`）
- 在线版本（claude.ai Artifact）：https://claude.ai/artifact/KkNN1QGMwFXtX5HXjjqaNk

## 构建

```bash
npm install          # 只需要 katex（仓库已有的依赖）
npm run booklet      # → docs/booklet/index.html
npm run build        # 构建主站后再构建册子（主站构建会清空 docs/）
```

环境变量：

| 变量 | 作用 |
|---|---|
| `CH=A,B` | 只装入这些章节（S 章和框架总会装入），分章测试用 |
| `OUT=路径` | 输出到别处 |
| `FRAGMENT=1` | 输出不带 `<!doctype>`/`<html>`/`<body>` 的片段，用于发布为 claude.ai Artifact |

## 自检

```bash
node design/booklet/shoot.cjs docs/booklet/index.html /tmp/shots 1440x900 light cover,contents,art-east --full
node design/booklet/shoot.cjs docs/booklet/index.html /tmp/shots 390x844 dark buttons-1 --zoom=B05
```

截取指定页面（`--full` 截整页长图，`--zoom` 打开样品放大视图），并报告脚本错误、横向溢出等问题；输出「没有错误」即通过。需要全局安装的 Playwright。

## 结构

```
design/booklet/
  build.mjs            组装：src/ → 单个 HTML（字体走 Google Fonts，KaTeX 字体内联）
  shoot.cjs            截图自检
  AUTHORING.md         章节编写规范：样品数据格式、init/ctx 生命周期、命名前缀、编号登记表
  src/
    head.html body.html          外壳（顶栏、放大视图对话框）
    body-templates.html          S 章十种整体风格的样品模板（含 KaTeX 公式）
    css/00-chrome.css            册子外观（亮/暗主题）
    css/01-framework.css         样品格、放大视图、目录、指南、术语表、汇总
    css/10-specimens.css         S 章样式
    js/00-core.js                章节登记、收藏、样品挂载与清理
    js/05-plot.js 10-… 15-…      S 章的绘图、数据与交互
    js/80-glossary.js            术语表
    js/90-pages.js               页面装配与导航
    ch/X.js / X.css / X.fonts.txt  各章（A C F T L K B I M P R）
```

编号一经发布不要改动或复用：收藏存在浏览器里，也可能已经在对话中被引用。新增样品接在章节末尾编号，规范见 [AUTHORING.md](AUTHORING.md)。
