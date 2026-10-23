# 数学分析 · L2

按法国 licence 2 / MP（2021 年大纲）编排的数学分析学习网页。共 11 章，定理附英、法、俄原名，证明按 ★ / ★★ / ★★★ 分级，部分章节带交互演示。

## 浏览

构建产物在 `docs/`，是纯静态页面，直接用浏览器打开 `docs/index.html` 即可。也可以在仓库设置中把 GitHub Pages 的来源设为 `main` 分支的 `/docs` 目录。

## 风格样品册

`design/booklet/` 是挑选网站视觉风格用的互动册子：10 种整体风格 + 233 个带编号的零件样品（背景艺术、配色、字体、排版、布局、质感、按钮、文本框、动效、页面切换、大企业设计语言）。构建到 `docs/booklet/index.html`，说明见 [design/booklet/README.md](design/booklet/README.md)。

## 设计方案「宋纸手稿」

`design/songzhi/` 是按样品册里的收藏做的设计方案与示范页（第 4 章 §4.1 收敛半径），构建到 `docs/songzhi/index.html`；页内「设计方案」视图写明了配色、字体、排版参数和每个收藏编号的用处。插画素材在 `design/assets/`，说明见 [design/assets/README.md](design/assets/README.md)。

## 目录结构

```
content/            正文（Markdown + KaTeX）
  chapters.json     章节元数据：编号、学期、三语标题、摘要
  01-evn.md …       各章正文
src/assets/         样式、页面脚本、交互演示（原生 canvas，无外部依赖）
scripts/build.mjs   构建脚本：content/*.md → docs/*.html
docs/               构建产物（提交到仓库，供直接浏览与 GitHub Pages 使用）
plan/syllabus.md    四国课程调研与全程目录
design/booklet/     风格样品册（源码与构建脚本）
design/songzhi/     设计方案「宋纸手稿」示范页
design/assets/      插画素材：raw/ 原图，illustrations/ 处理后的 WebP
```

## 构建

```sh
npm install
npm run build                 # 全部章节，随后构建风格样品册与示范页
ONLY=01-evn npm run build     # 只构建部分章节（写作时预览）
npm run booklet               # 只构建风格样品册
npm run songzhi               # 只构建「宋纸手稿」示范页
```

公式在构建时由 KaTeX 渲染，任何 TeX 错误、未定义的交叉引用或未闭合的块都会让构建失败。

## 写作约定

正文是 Markdown，行内公式 `$…$`，行间公式 `$$…$$`。语义块用 `:::` 包裹：

```md
::: thm id=heine zh="Heine 定理" en="Heine–Cantor theorem" fr="Théorème de Heine" ru="Теорема Кантора" lvl=1
紧集上的连续函数一致连续。
:::

::: proof
……
:::
```

- 块类型：`def` 定义、`thm` 定理、`prop` 命题、`lem` 引理、`cor` 推论、`ex` 例、`cex` 反例（以上自动编号），以及 `rem` 注、`method` 方法、`open` 开放问题、`hist` 历史。
- `proof` 为完整证明，`sketch` 为证明概要，都是可折叠的。
- `lvl=1|2|3` 对应 ★ / ★★ / ★★★。`lvl=3` 的块应给出 `ref="…"`。
- `{@id}` 引用任一带 `id` 的块，可以跨章，构建时替换为「定理 3.4」之类的链接。
- `::: demo id=…` 插入交互演示，块内文字作为说明；演示的实现在 `src/assets/demos.js`。

宏定义（`\R`、`\norm{…}`、`\abs{…}`、`\ps{…}` 等）见 `scripts/build.mjs` 中的 `MACROS`。
