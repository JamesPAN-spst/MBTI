# 风格样品册 · 章节编写规范

> 这是编写和修改册子章节的规范（最初用于多个代理并行编写各章）。总体说明见 [README.md](README.md)。

## 背景

这本「风格样品册」服务于「数学分析」学习网站的设计。读者**没有美术/设计经验**，不知道各种风格叫什么、长什么样。册子是一个单文件 HTML 互动册子（构建到 `docs/booklet/`，也可发布为 claude.ai Artifact），作用是：

1. **教读者认识**设计风格与零件（每个样品都要像教科书插图一样典型、准确、好看）；
2. **让读者能指认**：每个样品有编号（如 A11、B07），收藏后复制编号发给 Claude，Claude 据此设计网站。

所以每个样品都必须：**名副其实**（一看就是那种风格，抓住最有辨识度的特征）、**做工精致**（达到 Apple/Stripe 官网那种细节水准）、**说明能教会一个外行**（中文、简洁、专业）。读者偏好 Apple 审美，但样品册要如实呈现各种风格，不要把所有东西都做成 Apple 风。

整个册子由框架 + 各章节文件组成。

## 目录结构（都在 `design/booklet/` 下）

```
design/booklet/
  build.mjs              组装脚本
  shoot.cjs              截图自检脚本
  src/head.html body.html body-templates.html   外壳与 S 章的样品模板
  src/css/ src/js/       框架与 S 章
  src/ch/X.js            章节 X 的页面与样品数据
  src/ch/X.css           章节 X 的样式
  src/ch/X.fonts.txt     （可选）章节 X 需要的额外 Google Fonts
```

改框架（`src/css`、`src/js`、`build.mjs`）时，要对所有章节回归测试。

## 章节文件怎么写

`src/ch/X.js` 的内容会被原样包进一个块 `{ ... }`，放在一个严格模式的 IIFE 里。所以你声明的 `const`/`function` 都是局部的，不会和别的章节冲突。可用的框架全局：

- `registerPages(chapterId, pages)` —— 登记本章的页面（按顺序）
- `replayBtn` —— 一段 HTML 字符串：右下角的 ↻ 重播按钮。放进样品 html 里，点击时框架会**整格重新挂载**（innerHTML 重设 + 重新 init），用于重播入场动画
- `esc(s)` —— HTML 转义
- `reduce` —— 用户是否偏好减少动效（布尔）
- `ICON` —— 若干 SVG 图标字符串（heart, zoom, replay, close, left, right）

### 页面

```js
registerPages('A', [
  { type: 'gallery', token: 'art-modern', title: '现代艺术运动', intro: '一两句引言……',
    min: 300,            // 可选：样品格最小宽度 px，默认 300
    top: '<div>…</div>', // 可选：样品格上方的 HTML（例如「输入示例文字」框）
    topInit(pageEl, ctx) { … }, // 可选：top 的交互
    tiles: [ /* 样品 */ ] },
  { type: 'custom', token: 'color-wheel', title: '配色关系', intro: '……',
    render(bodyEl, ctx) { bodyEl.innerHTML = '…'; /* 交互 */ } }
]);
```

- `token` 用章节登记表里的（术语表和指南会链接到这些 token）。
- custom 页面渲染在册子的书页里，**要跟随册子的亮/暗主题**：用 `var(--ink) var(--muted) var(--line) var(--leaf) var(--leaf-2) var(--accent) var(--on-accent)` 和字体 `var(--f-ui) var(--f-mono) var(--f-display)`。当然，里面的「样品区域」可以有自己的固定配色。
- 页面宽度：桌面书页内容区约 1280px，手机 358px（390 视口减边距）。**两种宽度都必须好看、不能横向溢出。**

### 样品（tile）

```js
{
  code: 'A11',                 // 章节字母 + 两位数字，连续
  name: '浮世绘',              // 中文名
  en: 'Ukiyo-e',               // 英文名（可选）
  meta: '日本 · 17–19 世纪',    // 出处/年代/类别（可选）
  desc: '2–3 句：它是什么、视觉上最有辨识度的特征、在网页上怎么用。',
  more: '（可选，仅放大视图显示）更多背景：历史、代表人物/作品、适合与不适合。',
  kw: ['青海波', '普鲁士蓝', '平涂'],   // 3–5 个关键词：用户描述时能用的词
  html: '<div class="ar-ukiyo">…</div>', // 舞台内容（innerHTML）
  init(stage, ctx) { … },      // 可选：交互/画布/循环
  css: '.wave { … }',          // 可选：重现这个效果的 CSS 要点（≤15 行），放大视图里可复制
  links: [['Wikipedia', 'https://en.wikipedia.org/wiki/Ukiyo-e']], // 可选：只放你确定存在的链接
  bg: '#f4efe4',               // 舞台背景
  dark: false,                 // 背景是深色时设 true（舞台默认文字色变浅）
  ratio: '4 / 3',              // 可选，格式 'a / b'（默认 4/3；wide 默认 16/7）
  wide: false                  // 可选：占两列（手机上自动变一列）
}
```

#### 舞台（`.t-stage`）的环境

- `position: relative; overflow: hidden; border-radius: 12px; container-type: size;` 宽度由网格决定，高度由 `aspect-ratio` 决定。默认文字 14px、`var(--f-ui)` 字体、深色字。
- **用容器单位 `cqw / cqh / cqmin` 来定尺寸**（尤其是艺术/背景类），这样在放大视图里会等比放大。按钮、输入框等组件则用正常 px 尺寸，保持真实大小。
- 工具类：`.fill`（绝对定位铺满）、`.center`（铺满并居中，16px 内边距）、`.row`（横排换行居中，gap 12px）、`.col`（竖排居中）。
- 同一个样品可能**同时挂载两份**（网格里一份、放大视图里一份），所以：
  - html 里**不要用 id**，除了 SVG `<defs>` 里的 id（渐变、滤镜、图案）——这些 id 要以小写编号开头（如 `a11-wave`），两份内容完全相同时引用不会出错。
  - init 里用 `stage.querySelector(...)` 找元素，不要用 `document.getElementById`。
- 不能用 `<script>`（innerHTML 不执行）；交互写在 `init`。

#### `init(stage, ctx)`

`ctx` 管理所有副作用，翻页或关闭放大视图时会统一清理：

- `ctx.loop((t, dt) => {…})` —— requestAnimationFrame 循环；只在**样品可见且动效开关打开**时调用
- `ctx.every(ms, fn)` —— setInterval，同样只在可见且动效开时调用
- `ctx.later(ms, fn)` —— setTimeout
- `ctx.on(target, 'event', fn, opt)` —— 加监听（对 window/document 的监听**必须**用它）
- `ctx.add(cleanupFn)` —— 登记其他清理（如 `ro.disconnect()`）
- `ctx.motion()` —— 动效开关当前状态；`ctx.zoom` —— 是否在放大视图中
- init 可以返回一个清理函数

画布：尺寸取 `stage.clientWidth/clientHeight × min(devicePixelRatio, 2)`，用 ResizeObserver 处理尺寸变化（`ctx.add(() => ro.disconnect())`）。静态图案画一次即可，不要每帧重画。

#### 动效

- 顶栏有「动效 开/关」按钮。关掉时框架会暂停舞台里的所有 CSS 动画（`animation-play-state: paused`），`ctx.loop/every` 也不再调用。所以 CSS 无限循环动画可以放心用；JS 循环必须用 `ctx.loop/every`。
- 入场类动画（只播一次）请加 `replayBtn`，用户可以重播。
- 页面上可能同时有几十个样品，注意性能：避免大面积的 `filter: blur()` 动画、每帧全屏重绘等。

#### 键盘与触摸

- 全局 ← → 键翻页，但焦点在 `input, textarea, select, [role=slider], .no-pagekeys` 内时不翻。你的样品若用到方向键，给可聚焦元素加 `class="no-pagekeys"`。
- 手机上从 `.t-stage` 内开始的滑动不会触发翻页。

### 命名约束（避免冲突）

- **CSS 的每条规则都必须以你的章节前缀类开头**（见下方章节登记表），`@keyframes` 名也带前缀（如 `@keyframes ar-drift`）。不要写 `body`、`:root`、`button`、`*` 等全局选择器；CSS 变量也带前缀（`--ar-…`）。
- 保留的类名：`fill center row col tile t-* fav lb-* g-* gd-* toc-* sm-* sp-* c-* n-* page spread leaf stage`（工具类 fill/center/row/col 可以用，不要重新定义）。
- 保留的 data 属性（不要在样品里用）：`data-token data-fav data-zoom data-code data-chap data-jump data-unfav`。
- JS 里不能出现 `</script`。
- 舞台里如果放 `<button>`，记得 `type="button"`。

### 资源

- **不能引用任何外部图片、脚本、样式**（除了 Google Fonts）。所有图形都用 CSS / 内联 SVG / canvas 现场绘制。小的内联 SVG data URI 可以。
- 字体：基础字体已加载 —— Instrument Sans, Instrument Serif, JetBrains Mono, Noto Sans SC（可变字重 100–900）, Noto Serif SC（可变字重 200–900）, EB Garamond, Source Sans 3, Source Serif 4, Nunito, STIX Two Text, Geist, Geist Mono, Newsreader, Archivo Narrow, Archivo (400/700/900), Cormorant Garamond, Bricolage Grotesque。
  需要别的 Google Fonts，写进 `src/ch/X.fonts.txt`，每行一个 css2 的 family 参数，例如：
  ```
  Bodoni+Moda:ital,wght@0,400;0,700;1,400
  Press+Start+2P
  ```
  **每一行都要用 curl 验证返回 200**（写错一个，这一章的字体全部失效）：
  `curl -s -o /dev/null -w "%{http_code}\n" "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&display=swap"`
  只为需要的字重加载；中文字体（ZCOOL 系列、Ma Shan Zheng 等）Google 会按需分片，可以用。
- 网络：大部分网站被沙箱代理拦截（包括 Wikipedia、各公司官网），所以不能截图或抓取网页；链接只写你确定存在的。

### 文案

- 简体中文。专业、简洁、具体。不要空话（「简约而不简单」之类）。讲清**视觉特征**：用了什么形状、颜色、线条、字体、构图。
- 涉及具体颜色时可以写 hex；近似值注明「近似」。
- 示例文字尽量与数学/学习相关（如「幂级数」「收敛」「定理 3.2」「开始学习」「提交答案」），但不强求。

## 测试（必须做）

```bash
# 在仓库根目录
CH=X OUT=/tmp/test-X.html node design/booklet/build.mjs
node design/booklet/shoot.cjs /tmp/test-X.html /tmp/shots/X 1440x900 light <token1,token2> --full
node design/booklet/shoot.cjs /tmp/test-X.html /tmp/shots/X 390x844 dark <token1,token2> --full
node design/booklet/shoot.cjs /tmp/test-X.html /tmp/shots/X 1440x900 light <token> --zoom=X01,X05   # 放大视图
```

shoot.cjs 使用全局安装的 Playwright（`npm root -g` 下的 `playwright`）。

- 用 Read 工具**逐张看截图**（长图很高时可以分区域截：去掉 --full，或自己写 playwright 脚本截某个 `.tile` 元素：`await page.locator('#tile-A11').screenshot({path})`）。
- 输出必须是「没有错误」。
- 检查每个样品：是否准确体现了该风格？是否精致？文字是否被裁切、溢出、重叠？手机上是否正常？
- 发现问题就改，直到满意。**至少完整迭代两轮**。
- 交互样品要实际测：可以写 playwright 脚本点击/输入后截图。

## 章节登记表

| 章 | 前缀 | 编号 | 页面 token |
|---|---|---|---|
| S 整体风格 | `sp-` | S01–S10 | tufte, journal, explore, chalk, keynote, darktech, editorial, swiss, wa, brutal |
| A 艺术风格与背景 | `ar-` | A01–A36 | art-modern, art-east, art-ui, art-sub |
| C 配色 | `co-` | C01–C14 | color-sets, color-wheel |
| F 字体 | `fo-` | F01–F27 | type-latin, type-cjk |
| T 排版参数 | `ty-` | T01–T15 | typo-lab, typo-sets |
| L 版式布局 | `la-` | L01–L14 | layouts |
| K 质感 | `ma-` | K01–K18 | shape, shape-lab |
| B 按钮 | `bt-` | B01–B24 | buttons-1, buttons-2 |
| I 文本框 | `in-` | I01–I16 | inputs |
| M 动效 | `mo-` | M01–M31 | motion-ease, motion-fx, motion-scroll |
| P 页面切换 | `pt-` | P01–P18 | transitions-1, transitions-2 |
| R 大企业参考 | `rf-` | R01–R20 | brands-1, brands-2 |

新增章节：在 `src/js/00-core.js` 的 `CHAPTERS` 和 `build.mjs` 的 `ORDER` 里各加一项。编号一经发布就不要改动或复用（用户可能已经收藏、或在对话里引用过）；新样品接在末尾编号。

指南页（`src/js/90-pages.js`）和术语表（`src/js/80-glossary.js`）引用了这些编号和页面 token 作为示例，**它们必须存在**：A18 C03 F15 T04 L02 K05 B03 I04 M04 P02 R01（以及 A11 C07 K03 B05 R03）。
