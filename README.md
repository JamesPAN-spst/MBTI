# 数学分析 · L2

按法国 licence 2 / MP（2021 年大纲）编排的数学分析学习网页。共 11 章，定理附英、法、俄原名，证明按 ★ / ★★ / ★★★ 分级，部分章节带交互演示。

## 浏览

构建产物在 `docs/`，是纯静态页面，直接用浏览器打开 `docs/index.html` 即可。也可以在仓库设置中把 GitHub Pages 的来源设为 `main` 分支的 `/docs` 目录。

## 风格样品册

`design/booklet/` 是挑选网站视觉风格用的互动册子：10 种整体风格 + 233 个带编号的零件样品（背景艺术、配色、字体、排版、布局、质感、按钮、文本框、动效、页面切换、大企业设计语言）。构建到 `docs/booklet/index.html`，说明见 [design/booklet/README.md](design/booklet/README.md)。

## 设计方案「宋纸手稿」

`design/songzhi/` 是按样品册里的收藏做的设计方案与示范页（第 4 章 §4.1 收敛半径），构建到 `docs/songzhi/index.html`；页内「设计方案」视图写明了配色、字体、排版参数和每个收藏编号的用处。插画素材在 `design/assets/`，说明见 [design/assets/README.md](design/assets/README.md)。

主站按这个方案排版：

- 封面：水墨远山（四层视差）、行书章名、烫金章号、竖排题款与朱印、本章公式跑马灯。
- 正文：约 37 字一行（17px，宋体 + Garamond），左侧竖排页边，右侧页边留给纸下的插画。
- 纸面：洒金宣纸。纸纹、金箔、远山和插画在每次打开页面时按随机种子重新生成。插画印在纸下、金箔之下，隔一段放一张，面朝页面里面；页脚有一条青海波，长页面里偶尔出现一幅敦煌藻井。
- 定理块：上下两道细线。证明可折叠，思路旁白用楷体，证毕处是朱色方块。
- 顶栏：目录抽屉、全书搜索（快捷键 `/`，中法英俄都能搜）、中 / Fr 总开关、展开全部证明、亮暗主题（从按钮处圆形展开）；翻到上一章 / 下一章时有翻书动画。
- 样式在 `src/assets/style.css`，页面脚本在 `src/assets/app.js`；各章封面的行书分行与跑马灯公式写在 `content/chapters.json` 的 `lines` 与 `marquee` 里。

## 目录结构

```
content/            正文（Markdown + KaTeX）
  chapters.json     章节元数据：编号、学期、四语标题、摘要、封面分行、跑马灯公式
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
- `::: fr` 紧跟在定义、定理、证明之后，写它的法语版本（页面上「中 / Fr」切换）；法语里引用用 `{@fr:id}`。
- 以 `▷` 开头的段落是楷体的思路旁白；`::: q` + `::: ans` 是「想一想」与折叠的解答；`::: read` 延伸阅读；`::: glossary` 章末中法英俄术语表（汇总到 `glossaire.html`）。
- 详细的写作规范（证明怎么写、法语怎么写、术语表与延伸阅读）见 [`plan/writing-guide.md`](plan/writing-guide.md)。

宏定义（`\R`、`\norm{…}`、`\abs{…}`、`\ps{…}` 等）见 `scripts/build.mjs` 中的 `MACROS`。
