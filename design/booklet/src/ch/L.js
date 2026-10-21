// ===== L 版式布局：layouts（L01–L14），线框图 + 桌面 / 手机切换 =====

// —— 线框零件：尺寸全部是 var(--la-u) 的倍数（桌面窗口里 1u = 1cqw，手机屏幕里更小）——
const U = (n) => `calc(var(--la-u)*${n})`;
const T = (n = 3, last = 62) => `<span class="la-t">${'<i></i>'.repeat(Math.max(0, n - 1))}<i style="width:${last}%"></i></span>`;
const H = (w = 60, k = '') => `<i class="la-h${k ? ` la-${k}` : ''}" style="width:${w}%"></i>`;
const IMG = (h, st = '') => `<i class="la-img" style="height:${U(h)};${st}"></i>`;
const NAV = (cta = true, k = '') => `<div class="la-nav ${k}"><i class="la-logo"></i><span class="la-navl"><i></i><i></i><i></i><i></i></span>${cta ? '<i class="la-cta"></i>' : ''}</div>`;
const PNAV = (mid = '') => `<div class="la-nav"><i class="la-logo"></i>${mid || '<i class="la-burger"></i>'}</div>`;
const LAB = (t, pos, k = '') => `<em class="la-lab ${k}" style="${pos}">${t}</em>`;
const TOC = () => `<span class="la-toc"><i style="width:72%"></i><i class="la-on" style="width:84%"></i><i class="la-sub" style="width:62%"></i><i class="la-sub" style="width:54%"></i><i style="width:66%"></i><i style="width:78%"></i><i style="width:58%"></i><i style="width:70%"></i></span>`;
const WIN = (inner, k = '') => `<div class="la-win"><div class="la-chrome"><i></i><i></i><i></i><b></b></div><div class="la-c ${k}">${inner}</div></div>`;
const PHONE = (inner, cap) => `<div class="la-ph"><div class="la-phone"><div class="la-screen"><div class="la-c">${inner}</div></div></div>${cap ? `<span class="la-pcap">${cap}</span>` : ''}</div>`;
function laFrame({ d, m, m2, note, cap = ['桌面 · 1280px', '手机 · 390px'], sw = ['桌面', '手机'] }) {
  const second = m2 ? WIN(m2.html, m2.k || '') : `<div class="la-phones${note ? ' la-withnote' : ''}">${m.map(([c, html]) => PHONE(html, c)).join('')}${note ? `<div class="la-note">${note}</div>` : ''}</div>`;
  return `<div class="la-wf">
    <div class="la-top"><span class="la-cap"><span class="la-cp0">${cap[0]}</span><span class="la-cp1">${cap[1]}</span></span>
      <span class="la-sw" role="group" aria-label="切换视图"><button type="button" aria-pressed="true" data-v="0">${sw[0]}</button><button type="button" aria-pressed="false" data-v="1">${sw[1]}</button></span></div>
    <div class="la-scn la-s0">${WIN(d.html, d.k || '')}</div>
    <div class="la-scn la-s1">${second}</div>
  </div>`;
}
function laInit(stage, ctx) {
  const root = stage.querySelector('.la-wf');
  const play = () => {
    root.querySelectorAll('.la-anim').forEach((el) => { el.classList.remove('la-play'); void el.getBoundingClientRect(); if (ctx.motion() && !reduce) el.classList.add('la-play'); });
  };
  root.querySelectorAll('.la-sw button').forEach((b) => b.addEventListener('click', () => {
    root.classList.toggle('la-alt', b.dataset.v === '1');
    root.querySelectorAll('.la-sw button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    play();
  }));
  play();
}

// 手机里常用的一列正文
const PCOL = (inner) => `<div class="la-col" style="padding:${U(3)} ${U(3)};gap:${U(1.8)}">${inner}</div>`;

// —— L12 用到的曲线：sin x 与它的泰勒多项式 ——
const laPath = (f) => {
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const x = -7 + (14 * i) / 120, y = Math.max(-3.5, Math.min(3.5, f(x)));
    pts.push(`${(10 + (x + 7) / 14 * 180).toFixed(1)},${(60 - y * 22).toFixed(1)}`);
  }
  return `M${pts.join('L')}`;
};
const LA_SIN = laPath(Math.sin);
const LA_TAY = [
  laPath((x) => x),
  laPath((x) => x - x ** 3 / 6),
  laPath((x) => x - x ** 3 / 6 + x ** 5 / 120 - x ** 7 / 5040 + x ** 9 / 362880)
];
const laPlot = (k = '') => `<svg class="la-plot ${k}" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true">
  <path class="la-ax" d="M10 60H190M100 8V112"/><path class="la-sin" d="${LA_SIN}"/>
  ${LA_TAY.map((p, i) => `<path class="la-tay la-tay${i + 1}" d="${p}"/>`).join('')}</svg>`;

const LA = [
  { code: 'L01', name: '单栏居中', en: 'Single column', meta: '最常见 · 阅读型',
    desc: '所有内容排成一栏放在页面正中，两侧大量留白；栏宽限制在 600–720px（每行约 35 个汉字）。最简单、最专注，适合博客、文章和单个证明的讲解。缺点是目录、旁注这类辅助信息没有地方放。',
    more: 'Medium 和大多数个人博客都是这种布局。宽屏上两侧空白会很大，可以让宽图或长公式「破栏」（超出正文宽度）来打破单调。数学教材如果章节很长，单栏需要再配一个浮动的目录按钮。',
    kw: ['单栏', '居中', '行宽', '留白'],
    css: `.article {\n  max-width: 680px;      /* 约 35 个汉字一行 */\n  margin: 0 auto;\n  padding: 48px 20px;\n}\n.article .wide {        /* 宽图破栏 */\n  margin-inline: -120px;\n}\n@media (max-width: 900px) {\n  .article .wide { margin-inline: 0; }\n}`,
    d: { html: `${NAV()}<div class="la-body la-l01"><i class="la-guide" style="left:24%"></i><i class="la-guide" style="left:76%"></i>${LAB('↔ 栏宽 ≈ 680px', 'left:50%;top:1.2%;transform:translateX(-50%)')}
      <div class="la-col" style="width:52%;margin:0 auto;padding-top:${U(5)};gap:${U(1.7)}">${H(16, 'sm la-acc')}${H(82, 'lg')}${H(50, 'lg')}${T(3, 70)}${IMG(12)}${T(4, 45)}${H(36)}${T(3, 80)}</div></div>` },
    m: [['', `${PNAV()}${PCOL(`${H(22, 'sm la-acc')}${H(92, 'lg')}${H(60, 'lg')}${T(4, 70)}${IMG(16)}${T(5, 50)}${H(44)}${T(4, 70)}`)}`]],
    note: '<b>手机上</b>几乎不用改：单栏天然适合窄屏，只是把「居中 680px」换成「左右各留 16–20px」。' },

  { code: 'L02', name: '双栏 + 左侧目录', en: 'Sidebar + content', meta: '文档 · 教材',
    desc: '左边一条固定的章节目录，右边是正文；目录高亮当前位置，滚动时不动。这是在线文档和教材最常见的布局，数学讲义要在章节间来回跳转，用它最顺手。手机上目录收进顶部的「目录」按钮，点开从左侧滑出（抽屉菜单）。',
    more: '目录宽 240–280px，正文仍然限制行宽（约 680–720px），多出的宽度留白。目录要「吸顶」（position: sticky），并标出当前所在小节。缺点：目录占掉一块宽度，13 寸笔记本上正文会变窄，可以允许把目录折叠起来。',
    kw: ['侧边目录', '文档布局', '吸顶', '抽屉菜单'],
    css: `.page {\n  display: grid;\n  grid-template-columns: 260px minmax(0, 1fr);\n}\n.toc { position: sticky; top: 0; height: 100vh; overflow: auto; }\n.content { max-width: 720px; padding: 48px 64px; }\n@media (max-width: 900px) {\n  .page { grid-template-columns: 1fr; }\n  .toc { position: fixed; inset: 0 auto 0 0; width: 80%;\n         transform: translateX(-100%); transition: transform .3s; }\n  .toc.open { transform: none; }\n}`,
    d: { html: `${NAV()}<div class="la-body" style="display:grid;grid-template-columns:21% 1fr">
      <div class="la-side">${H(38, 'sm la-mut')}${TOC()}${LAB('目录 · 吸顶', 'left:50%;bottom:3%;transform:translateX(-50%)')}</div>
      <div class="la-col" style="padding:${U(3.4)} ${U(7)} 0 ${U(5)};gap:${U(1.6)}">${H(24, 'sm la-mut')}${H(56, 'lg')}${T(3, 78)}
        <div class="la-thm">${H(22, 'sm la-acc')}${T(2, 70)}</div>${IMG(9, 'width:66%')}${T(3, 56)}</div></div>` },
    m: [['目录收进按钮', `${PNAV('<i class="la-pill">目录</i>')}${PCOL(`${H(30, 'sm la-mut')}${H(88, 'lg')}${T(4, 70)}<div class="la-thm">${H(30, 'sm la-acc')}${T(2, 60)}</div>${IMG(14)}${T(4, 60)}`)}`],
      ['点开：抽屉滑出', `${PNAV('<i class="la-pill">目录</i>')}${PCOL(`${H(30, 'sm la-mut')}${H(88, 'lg')}${T(4, 70)}<div class="la-thm">${H(30, 'sm la-acc')}${T(2, 60)}</div>${IMG(14)}${T(4, 60)}`)}<i class="la-dim"></i><div class="la-drawer">${H(40, 'sm la-mut')}${TOC()}</div>`]] },

  { code: 'L03', name: '三栏', en: 'Three columns', meta: '目录 + 正文 + 旁注',
    desc: '左边目录、中间正文、右边一栏放旁注、定义卡或「本页目录」。信息密度高，适合需要随时对照定义、提示和参考资料的教材与技术文档。屏幕要够宽（≥ 1200px），手机上左栏收起、右栏插回正文。',
    more: '很多文档网站右侧放「本页目录」；数学教材可以放定义回顾、记号说明、习题提示。三栏最怕挤：中栏至少保证 600px，左右两栏宁可窄一点，或在中等屏幕上先隐藏右栏。',
    kw: ['三栏', '旁注栏', '本页目录', '信息密度'],
    css: `.page {\n  display: grid;\n  grid-template-columns: 220px minmax(0, 1fr) 280px;\n  gap: 40px;\n}\n.toc, .aside { position: sticky; top: 0; align-self: start; }\n@media (max-width: 1200px) {\n  .page { grid-template-columns: 220px minmax(0, 1fr); }\n  .aside { display: none; }      /* 或改成正文里的提示框 */\n}\n@media (max-width: 800px) {\n  .page { grid-template-columns: 1fr; }\n}`,
    d: { html: `${NAV()}<div class="la-body" style="display:grid;grid-template-columns:18% 1fr 25%">
      <div class="la-side">${H(40, 'sm la-mut')}${TOC()}${LAB('目录', 'left:50%;bottom:3%;transform:translateX(-50%)')}</div>
      <div class="la-col" style="padding:${U(3.4)} ${U(3.6)} 0;gap:${U(1.6)}">${H(64, 'lg')}${T(3, 70)}${H(34)}${T(4, 82)}${IMG(9)}${T(3, 50)}${LAB('正文', 'left:50%;bottom:3%;transform:translateX(-50%)')}</div>
      <div class="la-aside">${['定义', '记号', '提示'].map((x, i) => `<div class="la-ncard${i === 0 ? ' la-on' : ''}">${H(i === 0 ? 46 : 36, 'sm' + (i === 0 ? ' la-acc' : ''))}${T(i === 1 ? 2 : 3, 60)}</div>`).join('')}${LAB('旁注', 'left:50%;bottom:3%;transform:translateX(-50%)')}</div></div>` },
    m: [['', `${PNAV('<i class="la-pill">目录</i>')}${PCOL(`${H(90, 'lg')}${T(3, 70)}<div class="la-inl">${H(36, 'sm la-acc')}${T(2, 64)}</div>${T(4, 60)}${IMG(13)}<div class="la-inl">${H(30, 'sm la-acc')}${T(2, 50)}</div>${T(3, 70)}`)}`]],
    note: '<b>手机上</b>三栏变一栏：左侧目录收进菜单按钮；右侧旁注插回正文，变成段落之间的提示框（蓝色块），或直接隐藏。' },

  { code: 'L04', name: '旁注式 Tufte', en: 'Tufte sidenotes', meta: 'Edward Tufte · 学术',
    desc: '正文只占页面左边约 55%，右边宽宽的页边专门放旁注和小图；旁注与正文里的引用号（¹ ²）对齐，读者不用跳到页尾就能看到注释。安静、学术，最适合数学、物理这类注释多的长文。',
    more: '来自统计学家 Edward Tufte 的书籍版式，网页上有现成的 Tufte CSS。偶尔用一张「全宽图」横跨正文和页边。窄屏放不下页边，旁注收成 ⊕ 小按钮，点开在段落里展开（S01 学术手稿就是这样做的）。',
    kw: ['旁注', '页边', '引用号', '全宽图'], links: [['Tufte CSS', 'https://edwardtufte.github.io/tufte-css/']],
    css: `article { padding-left: 12.5%; }\nsection > p, section > figure { width: 55%; }\n.sidenote {\n  float: right; clear: right;\n  margin-right: -60%; width: 50%;   /* 推到右边页边里 */\n  font-size: .8em; line-height: 1.4;\n}\nfigure.fullwidth { width: 90%; }\n@media (max-width: 760px) {\n  section > p { width: 100%; }\n  .sidenote { display: none; }      /* 点 ⊕ 时再展开 */\n  .sidenote.open { display: block; float: none; width: auto; margin: .5em 0; }\n}`,
    d: { k: 'la-paper', html: `<div class="la-body la-l04">
      <div class="la-tm">${H(70, 'lg')}${H(40, 'sm la-mut')}</div>
      <div class="la-tm"><span class="la-t"><i></i><i class="la-ref" data-n="1" style="width:64%"></i><i></i><i></i><i style="width:72%"></i></span></div>
      <div class="la-tn"><b>1</b>${T(3, 55)}</div>
      <div class="la-full">${IMG(9)}</div>
      <div class="la-tm"><span class="la-t"><i></i><i class="la-ref" data-n="2" style="width:80%"></i><i></i><i></i><i style="width:58%"></i></span></div>
      <div class="la-tn"><b>2</b>${T(2, 70)}${IMG(6, 'margin-top:' + U(1) + ';width:84%')}</div>
      <div class="la-tm">${H(30)}${T(4, 66)}</div>
      ${LAB('页边：旁注与引用号对齐', 'right:3%;top:3%')}</div>` },
    m: [['旁注收成 ⊕', `<div class="la-paper la-fillc">${PCOL(`${H(88, 'lg')}${H(50, 'sm la-mut')}${T(4, 64)}<span class="la-plus">⊕</span>${T(5, 70)}${IMG(13)}${T(4, 50)}`)}</div>`],
      ['点开：在段落里展开', `<div class="la-paper la-fillc">${PCOL(`${H(88, 'lg')}${H(50, 'sm la-mut')}${T(4, 64)}<span class="la-plus la-on">⊖</span><div class="la-inl">${T(3, 60)}</div>${T(5, 70)}${IMG(13)}`)}</div>`]] },

  { code: 'L05', name: '杂志式不对称', en: 'Editorial / asymmetric', meta: '编辑设计',
    desc: '像杂志内页：超大标题压在大图旁边，正文分成窄窄的两栏，引语用大号字跳出来，左右刻意不对称。有张力、有「编辑感」，适合专题文章、作品集和长篇报道。',
    more: '背后其实是 12 列栅格：每个元素跨不同的列数（标题 7 列、图片 5 列、正文各 3 列），对齐仍然严格。缺点是排版成本高，每篇文章都要单独调；在手机上会退化成单栏。',
    kw: ['不对称', '大标题', '引语', '12 列栅格'],
    css: `.spread {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 24px;\n}\n.headline { grid-column: 1 / 8; font-size: clamp(48px, 7vw, 112px); }\n.photo    { grid-column: 8 / 13; grid-row: 1 / 4; }\n.body-a   { grid-column: 1 / 4; }\n.body-b   { grid-column: 4 / 7; }\n.pull     { grid-column: 8 / 13; font-size: 2em; }\n@media (max-width: 800px) {\n  .spread > * { grid-column: 1 / -1; grid-row: auto; }\n}`,
    d: { html: `${NAV(false, 'la-thin')}<div class="la-body la-l05">
      <div class="la-k">${H(100, 'sm la-acc')}</div>
      <div class="la-hl">${H(100, 'xl')}${H(86, 'xl')}${H(52, 'xl')}</div>
      <div class="la-ph5">${IMG(31, 'height:100%')}</div>
      <div class="la-dk">${T(2, 60)}</div>
      <div class="la-b1"><i class="la-drop"></i>${T(12, 50)}</div><div class="la-b2">${T(12, 70)}</div>
      <div class="la-pq"><span>“</span>${H(92, 'acc2')}${H(70, 'acc2')}${H(30, 'sm la-mut')}</div></div>` },
    m: [['', `${IMG(30, 'border-radius:0')}${PCOL(`${H(26, 'sm la-acc')}${H(96, 'xl')}${H(80, 'xl')}${H(44, 'xl')}${T(3, 70)}<div class="la-pq la-pqm"><span>“</span>${H(92, 'acc2')}${H(64, 'acc2')}</div>${T(4, 60)}`)}`]],
    note: '<b>手机上</b>栅格退化成一栏：大图放顶部铺满，标题仍然很大，引语保留强调色，失去的是左右的张力。' },

  { code: 'L06', name: '便当盒', en: 'Bento grid', meta: 'Apple 发布会 · 2020s',
    desc: '大小不一的圆角格子拼成一整块矩形，像日式便当盒：最重要的内容占大格（强调色那一格），次要的占小格。一屏就能概览很多信息，常见于产品功能页、个人主页和「本章概览」。',
    more: '苹果在发布会和官网上大量使用后流行起来。要点：格子间距统一（12–20px）、圆角统一、每格只讲一件事。用 CSS Grid 的 grid-template-areas 很容易实现。手机上变成 2 列或 1 列，大格子跨整行。',
    kw: ['便当盒', '圆角格子', '概览', 'grid-area'],
    css: `.bento {\n  display: grid; gap: 16px;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-areas:\n    "hero hero a    tall"\n    "hero hero b    tall"\n    "c    wide wide wide";\n}\n.bento > * { border-radius: 24px; }\n.hero { grid-area: hero; }   /* 最重要的一格 */\n@media (max-width: 700px) {\n  .bento { grid-template-columns: 1fr 1fr;\n    grid-template-areas: "hero hero" "a b" "tall tall" "c wide"; }\n}`,
    d: { html: `${NAV()}<div class="la-body" style="padding:${U(3)} ${U(4)};display:grid;grid-template-rows:auto 1fr;gap:${U(2)}">
      <div style="display:grid;gap:${U(1)}">${H(26, 'lg')}${H(40, 'sm la-mut')}</div>
      <div class="la-bento">
        <div class="la-bx la-hero" style="grid-area:1/1/3/3">${H(40, 'lg la-w')}${H(26, 'lg la-w')}<i class="la-bignum"></i></div>
        <div class="la-bx" style="grid-area:1/3/2/4"><i class="la-dot"></i>${H(60, 'sm')}</div>
        <div class="la-bx la-pad0" style="grid-area:1/4/3/5">${IMG(10, 'height:100%;border-radius:0')}</div>
        <div class="la-bx" style="grid-area:2/3/3/4"><span class="la-mini"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i></span></div>
        <div class="la-bx" style="grid-area:3/1/4/2"><i class="la-dot"></i>${H(70, 'sm')}</div>
        <div class="la-bx la-row" style="grid-area:3/2/4/5">${IMG(6, 'width:30%;height:100%')}<div class="la-col" style="gap:${U(1)};flex:1">${H(50)}${T(2, 60)}</div></div>
      </div></div>` },
    m: [['', `${PNAV()}<div class="la-bento la-bm">
        <div class="la-bx la-hero" style="grid-column:1/3;height:${U(22)}">${H(50, 'lg la-w')}${H(30, 'lg la-w')}<i class="la-bignum"></i></div>
        <div class="la-bx" style="height:${U(14)}"><i class="la-dot"></i>${H(60, 'sm')}</div>
        <div class="la-bx" style="height:${U(14)}"><span class="la-mini"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i></span></div>
        <div class="la-bx la-pad0" style="grid-column:1/3;height:${U(16)}">${IMG(10, 'height:100%;border-radius:0')}</div>
        <div class="la-bx" style="height:${U(14)}"><i class="la-dot"></i>${H(70, 'sm')}</div>
        <div class="la-bx" style="height:${U(14)}">${H(60)}${T(2, 60)}</div></div>`]],
    note: '<b>手机上</b>改成 2 列：大格子跨满整行，小格子两两并排。顺序按重要性重新排。' },

  { code: 'L07', name: '卡片网格', en: 'Card grid', meta: '列表 · 目录页',
    desc: '同样大小的卡片排成整齐的网格，每张卡片是「图 + 标题 + 两行摘要」。规整、易扫视、易扩展，适合章节目录、习题列表、课程首页。上方常配筛选标签（强调色为当前选中）。',
    more: '用 repeat(auto-fill, minmax(240px, 1fr)) 就能让列数随屏幕宽度自动变化，不用写断点。卡片内部结构必须一致，标题长短不一时要限制行数。缺点是千篇一律、没有重点，最重要的内容可以单独放大（参考 L06 便当盒）。',
    kw: ['卡片', '网格', 'auto-fill', '筛选'],
    css: `.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 20px;\n}\n.card { display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; }\n.card img { aspect-ratio: 16 / 10; object-fit: cover; }\n.card h3 {\n  display: -webkit-box; -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical; overflow: hidden;\n}`,
    d: { html: `${NAV()}<div class="la-body" style="padding:${U(3)} ${U(4)};display:grid;align-content:start;gap:${U(2.2)}">
      <div class="la-row" style="justify-content:space-between">${H(24, 'lg')}<span class="la-chips"><i class="la-on"></i><i></i><i></i><i></i></span></div>
      <div class="la-cards">${Array.from({ length: 8 }, (_, i) => `<div class="la-card${i === 1 ? ' la-hov' : ''}">${IMG(10, 'border-radius:0')}<div class="la-col" style="padding:${U(1.4)};gap:${U(1)}">${H([72, 60, 80, 66][i % 4])}${T(2, [50, 70, 40, 62][i % 4])}</div></div>`).join('')}</div></div>` },
    m: [['', `${PNAV()}<div class="la-col" style="padding:${U(3)};gap:${U(2.4)}"><span class="la-chips"><i class="la-on"></i><i></i><i></i><i></i></span>${[0, 1, 2].map(() => `<div class="la-card">${IMG(17, 'border-radius:0')}<div class="la-col" style="padding:${U(2)};gap:${U(1.4)}">${H(70)}${T(2, 60)}</div></div>`).join('')}</div>`]],
    note: '<b>手机上</b>列数自动减到 1 列（或 2 列小卡片），筛选标签变成可以横向滑动的一行。' },

  { code: 'L08', name: '瀑布流', en: 'Masonry', meta: 'Pinterest',
    desc: '等宽不等高的卡片一列列往下排，哪列短就往哪列补，像砖墙一样没有空隙。适合图片、灵感板、长短不一的笔记卡。阅读顺序不明确，不适合有先后顺序的教材内容。',
    more: 'Pinterest 让这种布局流行起来。纯 CSS 可以用 columns 属性近似实现（但顺序是先上下后左右）；精确的瀑布流要用 JavaScript（如 Masonry 库），CSS 的原生 masonry 还在标准化中。',
    kw: ['瀑布流', '等宽不等高', 'Pinterest', '灵感板'], links: [['Masonry 库', 'https://masonry.desandro.com/']],
    css: `/* 纯 CSS 近似：多栏布局，卡片不跨栏断开 */\n.wall { columns: 5 220px; column-gap: 16px; }\n.wall .card {\n  break-inside: avoid;\n  margin-bottom: 16px;\n  border-radius: 12px;\n}\n/* 精确的「哪列短补哪列」需要 JS（如 Masonry 库） */`,
    d: { html: `${NAV()}<div class="la-body la-mason" style="padding:${U(2.6)} ${U(3)}">${[[14, 9, 18, 8], [9, 16, 11, 14], [18, 8, 13, 10], [11, 14, 9, 17], [8, 19, 12, 9]].map((col, ci) => `<div class="la-mcol">${col.map((h, i) => `<div class="la-mc${ci === 2 && i === 1 ? ' la-on' : ''}">${IMG(h, `background-color:${['#EEF1F5', '#E6EAF0', '#F1F3F7', '#E9EDF3'][(ci + i) % 4]}`)}${i % 2 ? H(66, 'sm') : ''}</div>`).join('')}</div>`).join('')}</div>` },
    m: [['', `${PNAV()}<div class="la-mason" style="padding:${U(2.4)}">${[[18, 12, 22, 14], [12, 20, 15, 18]].map((col) => `<div class="la-mcol">${col.map((h, i) => `<div class="la-mc">${IMG(h)}${i % 2 ? H(66, 'sm') : ''}</div>`).join('')}</div>`).join('')}</div>`]],
    note: '<b>手机上</b>减到 2 列，仍然错落；卡片顺序按「哪列短补哪列」重新计算。' },

  { code: 'L09', name: '分屏', en: 'Split screen', meta: '登录 · 落地页',
    desc: '页面从中间一分为二：一边是整块的色彩或大图，一边是内容（标题、说明、表单）。对比强烈、聚焦，常用于登录注册、产品介绍和「二选一」的对比页。手机上变成上下两段。',
    more: '两边可以等分，也可以 40/60。图片那一半负责情绪，内容那一半保持简洁、只做一件事（比如登录表单）。不适合内容很多的页面——一半屏幕被图片占掉了。',
    kw: ['分屏', '左右对半', '登录页', '大图'],
    css: `.split {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n}\n.split .visual { background: url(hero.jpg) center / cover; }\n.split .panel {\n  display: grid; place-content: center;\n  padding: 64px; max-width: 520px; margin: auto;\n}\n@media (max-width: 800px) {\n  .split { grid-template-columns: 1fr; grid-template-rows: 40vh auto; }\n}`,
    d: { html: `<div class="la-body" style="display:grid;grid-template-columns:1fr 1fr;height:100%">
      <div class="la-vis"><i class="la-logo la-w"></i><i class="la-orb" style="width:58%;left:16%;top:22%"></i><i class="la-orb la-o2" style="width:34%;left:52%;top:52%"></i><div class="la-col" style="position:absolute;left:${U(4)};bottom:${U(4)};width:60%;gap:${U(1.2)}">${H(80, 'lg la-w')}${H(50, 'sm la-w')}</div></div>
      <div class="la-col" style="align-content:center;padding:0 ${U(8)};gap:${U(1.8)}">${H(22, 'sm la-acc')}${H(70, 'lg')}${T(2, 60)}<i class="la-field"></i><i class="la-field"></i><i class="la-btn"></i>${H(40, 'sm la-mut')}</div></div>` },
    m: [['', `<div class="la-vis" style="height:38%"><i class="la-logo la-w"></i><i class="la-orb" style="width:66%;left:18%;top:20%"></i><i class="la-orb la-o2" style="width:36%;left:56%;top:46%"></i></div>${PCOL(`${H(30, 'sm la-acc')}${H(80, 'lg')}${T(2, 60)}<i class="la-field"></i><i class="la-field"></i><i class="la-btn"></i>`)}`]],
    note: '<b>手机上</b>左右变上下：图片缩成顶部的一条（约 30–40% 屏高），内容在下面。' },

  { code: 'L10', name: '全屏首屏 + 分段', en: 'Hero + sections', meta: '产品官网',
    desc: '打开页面先看到占满整屏的「首屏」（大标题、一句话、按钮），往下滚是一段段左右交替的介绍（图左文右、文左图右）。几乎所有产品官网都这样，适合课程介绍页、项目主页。',
    more: '首屏（hero）决定第一印象，只放一个最重要的行动按钮。分段之间用背景色或留白区分，左右交替让阅读有节奏。不适合教材正文：读者要的是内容本身，而不是一屏屏的宣传。',
    kw: ['首屏', 'Hero', '分段', '左右交替'],
    css: `.hero {\n  min-height: 100svh;               /* 占满第一屏 */\n  display: grid; place-content: center; text-align: center;\n}\n.feature {\n  display: grid; grid-template-columns: 1fr 1fr;\n  gap: 64px; align-items: center; padding: 120px 8vw;\n}\n.feature:nth-child(even) > :first-child { order: 2; } /* 左右交替 */\n@media (max-width: 800px) {\n  .feature { grid-template-columns: 1fr; padding: 64px 20px; }\n}`,
    d: { html: `<div class="la-body la-l10">
      <div class="la-hero10">${NAV(true, 'la-dark')}<div class="la-col" style="justify-items:center;gap:${U(1.6)};padding-top:${U(5)}">${H(52, 'xl la-w')}${H(34, 'xl la-w')}${H(42, 'sm la-w2')}<span class="la-row" style="gap:${U(1.2)};margin-top:${U(1)}"><i class="la-btn la-wb"></i><i class="la-btn la-gb"></i></span></div>${LAB('首屏 · 100vh', 'right:2.5%;bottom:5%', 'la-labw')}</div>
      <div class="la-sec">${IMG(13, 'width:40%')}<div class="la-col" style="flex:1;gap:${U(1.3)}">${H(20, 'sm la-acc')}${H(60, 'lg')}${T(3, 60)}</div></div>
      <div class="la-sec la-gray"><div class="la-col" style="flex:1;gap:${U(1.3)}">${H(20, 'sm la-acc')}${H(54, 'lg')}${T(3, 70)}</div>${IMG(13, 'width:40%')}</div>
      <i class="la-sbar"></i></div>` },
    m: [['', `<div class="la-l10"><div class="la-hero10" style="height:${U(62)}">${PNAV()}<div class="la-col" style="justify-items:center;gap:${U(2.2)};padding:${U(14)} ${U(4)} 0">${H(84, 'xl la-w')}${H(60, 'xl la-w')}${H(70, 'sm la-w2')}<i class="la-btn la-wb" style="margin-top:${U(2)}"></i></div></div>
      <div class="la-col" style="padding:${U(4)} ${U(3)};gap:${U(1.8)}">${IMG(14)}${H(26, 'sm la-acc')}${H(80, 'lg')}${T(3, 60)}</div></div>`]],
    note: '<b>手机上</b>首屏仍占满第一屏，文字居中、按钮加大；每个分段都变成「图在上、文在下」。' },

  { code: 'L11', name: '仪表盘', en: 'Dashboard', meta: '应用 · 数据',
    desc: '左侧一条窄窄的图标导航，顶部是搜索和头像，内容区是一排数字卡片（KPI）+ 大图表 + 列表。信息密集、一目了然，适合学习进度、成绩统计、后台管理。',
    more: '仪表盘通常用 12 列栅格和统一的卡片样式，最重要的数字放左上。手机上侧栏变成底部标签栏，数字卡片排成 2×2，图表占满宽度。不要把所有数据都塞进来——一个仪表盘最好只回答 3–5 个问题。',
    kw: ['仪表盘', 'KPI 卡片', '侧栏导航', '图表'],
    css: `.app {\n  display: grid; height: 100vh;\n  grid-template-columns: 72px 1fr;\n  grid-template-rows: 56px 1fr;\n}\n.rail { grid-row: 1 / 3; }\n.kpis   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }\n.panels { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }\n@media (max-width: 800px) {\n  .app { grid-template-columns: 1fr; }\n  .rail { position: fixed; inset: auto 0 0 0; height: 64px; } /* 底部标签栏 */\n  .kpis { grid-template-columns: 1fr 1fr; }\n  .panels { grid-template-columns: 1fr; }\n}`,
    d: { html: `<div class="la-body" style="display:grid;grid-template-columns:${U(6.4)} 1fr;height:100%">
      <div class="la-rail"><i class="la-logo la-w"></i><i class="la-ic la-on"></i><i class="la-ic"></i><i class="la-ic"></i><i class="la-ic"></i></div>
      <div style="display:grid;grid-template-rows:${U(5)} 1fr;min-height:0">
        <div class="la-tbar"><i class="la-search"></i><i class="la-av"></i></div>
        <div style="padding:${U(2.2)};display:grid;grid-template-rows:auto 1fr;gap:${U(1.6)};min-height:0;background:#F6F7F9">
          <div class="la-kpis">${[0, 1, 2, 3].map((i) => `<div class="la-kpi${i === 0 ? ' la-on' : ''}">${H(46, 'sm la-mut')}<i class="la-num" style="width:${[52, 40, 58, 36][i]}%"></i><i class="la-spark" style="--w:${[64, 40, 80, 52][i]}%"></i></div>`).join('')}</div>
          <div style="display:grid;grid-template-columns:2fr 1fr;gap:${U(1.6)};min-height:0">
            <div class="la-panel">${H(26, 'sm')}<svg class="la-chart" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="la-area" d="M0 32L10 28L20 30L30 22L40 24L50 16L60 19L70 11L80 13L90 6L100 8V40H0Z"/><path class="la-line" d="M0 32L10 28L20 30L30 22L40 24L50 16L60 19L70 11L80 13L90 6L100 8"/></svg></div>
            <div class="la-panel">${H(40, 'sm')}${[80, 64, 72, 58, 76, 50, 68].map((w) => `<div class="la-li"><i class="la-av"></i>${T(1, w)}</div>`).join('')}</div>
          </div></div></div></div>` },
    m: [['', `<div class="la-tbar" style="height:${U(7)}"><i class="la-logo"></i><i class="la-av"></i></div><div style="padding:${U(2.4)};display:grid;gap:${U(2)};background:#F6F7F9;height:100%;align-content:start">
        <div class="la-kpis" style="grid-template-columns:1fr 1fr">${[0, 1, 2, 3].map((i) => `<div class="la-kpi${i === 0 ? ' la-on' : ''}">${H(56, 'sm la-mut')}<i class="la-num" style="width:${[52, 40, 58, 36][i]}%"></i></div>`).join('')}</div>
        <div class="la-panel" style="height:${U(22)}">${H(36, 'sm')}<svg class="la-chart" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="la-area" d="M0 32L10 28L20 30L30 22L40 24L50 16L60 19L70 11L80 13L90 6L100 8V40H0Z"/><path class="la-line" d="M0 32L10 28L20 30L30 22L40 24L50 16L60 19L70 11L80 13L90 6L100 8"/></svg></div>
        <div class="la-panel">${[0, 1].map(() => `<div class="la-li"><i class="la-av"></i>${T(1, 80)}</div>`).join('')}</div></div>
        <div class="la-tabs"><i class="la-on"></i><i></i><i></i><i></i></div>`]],
    note: '<b>手机上</b>侧栏变成底部标签栏，数字卡片排成 2×2，图表和列表各占一整行。' },

  { code: 'L12', name: '吸顶叙事', en: 'Sticky scrollytelling', meta: '数据新闻 · 可视化讲解',
    desc: '一边的图「钉」在屏幕上不动（sticky），另一边的文字卡片随滚动经过；每经过一张卡片，图就变一步。这里演示的是泰勒多项式一步步逼近 sin x（灰色虚线）。非常适合讲解数学过程。',
    more: '数据新闻（纽约时报、The Pudding 等）常用这种讲故事的方式，叫 scrollytelling。实现上：图用 position: sticky 固定，文字卡片用 IntersectionObserver 判断哪张经过了视口中线，再更新图。手机上图钉在上半屏，卡片从下方滚过。',
    kw: ['滚动叙事', 'sticky', '分步讲解', '数据新闻'], links: [['The Pudding', 'https://pudding.cool/']],
    css: `.story { display: grid; grid-template-columns: 2fr 3fr; }\n.story .graphic {\n  position: sticky; top: 0;\n  height: 100vh;              /* 图钉住不动 */\n}\n.story .step { margin: 50vh 0; } /* 每张卡片间隔一屏 */\n/* JS：IntersectionObserver 监听 .step，\n   进入视口中线时 graphic.dataset.step = n */\n@media (max-width: 800px) {\n  .story { grid-template-columns: 1fr; }\n  .story .graphic { height: 50vh; }\n}`,
    d: { html: `${NAV()}<div class="la-body" style="display:grid;grid-template-columns:42% 58%">
      <div class="la-steps"><i class="la-trig"></i><div class="la-track">${['y = x', 'y = x − x³/3!', '加到 x⁹/9!'].map((t, i) => `<div class="la-step la-st${i + 1}"><b>${i + 1} · ${t}</b>${H(70)}${T(2, 60)}</div>`).join('')}</div></div>
      <div class="la-stick"><div class="la-gfx">${laPlot()}<span class="la-pin">📌 sticky 固定</span></div></div></div>` },
    m: [['', `${PNAV()}<div class="la-pstory"><div class="la-gfx la-gm">${laPlot()}<span class="la-pin">📌</span></div><div class="la-steps la-psteps"><div class="la-track">${[1, 2, 3].map((i) => `<div class="la-step la-st${i}"><b>${i}</b>${H(70)}${T(2, 60)}</div>`).join('')}</div></div></div>`]],
    note: '<b>手机上</b>图钉在上半屏，文字卡片在下半屏依次滚过；也可以让卡片半透明地盖在图上。' },

  { code: 'L13', name: '圣杯布局', en: 'Holy grail', meta: '经典网页结构',
    desc: '经典的五块结构：页头、页脚横跨全宽，中间三栏是导航、主内容、侧栏；主内容最宽，三栏等高，页脚总在底部。早年用浮动很难做好，所以叫「圣杯」；现在用 CSS Grid 几行就能写出来。',
    more: '门户网站、论坛、早期博客都是这个结构，今天很多文档站也是它的变体（参考 L03）。手机上五块按「页头 → 导航 → 主内容 → 侧栏 → 页脚」竖排。',
    kw: ['圣杯', '页头页脚', '三栏', 'grid-template-areas'], links: [['Wikipedia', 'https://en.wikipedia.org/wiki/Holy_grail_(web_design)']],
    css: `body {\n  display: grid; min-height: 100vh;\n  grid-template:\n    "header header header" auto\n    "nav    main   aside"  1fr\n    "footer footer footer" auto\n    / 200px 1fr 240px;\n}\nheader { grid-area: header; } nav { grid-area: nav; }\nmain { grid-area: main; } aside { grid-area: aside; }\nfooter { grid-area: footer; }\n@media (max-width: 800px) {\n  body { grid-template: "header" "nav" "main" "aside" "footer" / 1fr; }\n}`,
    d: { html: `<div class="la-body la-hg">
      <div class="la-z la-zh" style="grid-area:1/1/2/4"><span>页头 header</span></div>
      <div class="la-z" style="grid-area:2/1/3/2"><span>导航 nav</span></div>
      <div class="la-z la-zm" style="grid-area:2/2/3/3"><div class="la-col" style="gap:${U(1.4)};width:100%">${H(56, 'lg')}${T(3, 60)}${IMG(8)}${T(2, 70)}</div><span>主内容 main</span></div>
      <div class="la-z" style="grid-area:2/3/3/4"><span>侧栏 aside</span></div>
      <div class="la-z la-zh" style="grid-area:3/1/4/4"><span>页脚 footer</span></div></div>` },
    m: [['', `<div class="la-body la-hg la-hgm">${[['页头', 'la-zh', 6], ['导航', '', 5], ['主内容', 'la-zm', 27], ['侧栏', '', 10], ['页脚', 'la-zh', 6]].map(([t, k, h]) => `<div class="la-z ${k}" style="height:${U(h)}">${k === 'la-zm' ? `<div class="la-col" style="gap:${U(1.6)};width:100%">${H(70, 'lg')}${T(4, 60)}</div>` : ''}<span>${t}</span></div>`).join('')}</div>`]],
    note: '<b>手机上</b>五块按源码顺序竖排。导航常常再收进汉堡菜单，侧栏放到主内容后面。' },

  { code: 'L14', name: 'F 型 / Z 型阅读动线', en: 'F- & Z-pattern', meta: '眼动研究',
    desc: '人看网页的视线有固定路线。文字多的页面是 F 型：先横扫顶部，再横扫第二行，然后沿左边往下（暖色是注视热区）；元素少的落地页是 Z 型：左上 → 右上 → 斜穿 → 左下 → 右下。把重要内容放在这些路线上。右上角切换 F / Z。',
    more: 'F 型来自 Nielsen Norman Group 的眼动研究：用户很少读完整行，越往下越只看左边开头。所以标题和段落的前几个字最重要，列表要左对齐、关键词放开头。Z 型适合首屏：logo 左上，导航或登录右上，主按钮放在 Z 的终点附近。',
    kw: ['F 型', 'Z 型', '视线', '热区', '眼动'], links: [['NN/g：F 型阅读', 'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/']],
    css: `/* F 型：让每行开头承载信息 */\n.list li { text-align: left; }\n.list li strong:first-child { font-weight: 700; } /* 关键词放开头 */\n\n/* Z 型：首屏四个角 */\n.hero { display: grid; grid-template-columns: 1fr 1fr;\n        grid-template-areas: "logo  nav" "title art" "cta   ." ; }\n.hero .cta { grid-area: cta; }`,
    cap: ['F 型 · 文字密集的页面', 'Z 型 · 元素少的落地页'], sw: ['F 型', 'Z 型'],
    d: { html: `${NAV()}<div class="la-body" style="padding:${U(2.6)} ${U(4)} 0 ${U(5.4)};display:grid;gap:${U(2.2)};align-content:start">${[0, 1, 2, 3, 4].map((i) => `<div class="la-col" style="gap:${U(.9)}">${H([46, 38, 52, 34, 44][i])}${T(2, [70, 55, 80, 60, 50][i])}</div>`).join('')}</div>
      <i class="la-heat" style="left:-4%;top:9%;width:104%;height:17%"></i><i class="la-heat" style="left:-3%;top:22.5%;width:70%;height:15%"></i><i class="la-heat" style="left:-6%;top:30%;width:30%;height:72%"></i>
      <svg class="la-eye la-anim" viewBox="0 0 92 57" aria-hidden="true">
        <path pathLength="1" class="la-path" d="M5.4 9.5H82"/><path class="la-ah" d="M84 9.5l-2.6-1.5v3z"/>
        <path pathLength="1" class="la-path la-d2" d="M5.4 16.6H55"/><path class="la-ah la-d2" d="M57 16.6l-2.6-1.5v3z"/>
        <path pathLength="1" class="la-path la-d3" d="M2.6 25V51"/><path class="la-ah la-d3" d="M2.6 53l-1.5-2.6h3z"/>
        <g class="la-n"><circle cx="2.6" cy="9.5" r="2"/><text x="2.6" y="9.6">1</text></g><g class="la-n la-d2"><circle cx="2.6" cy="16.6" r="2"/><text x="2.6" y="16.7">2</text></g><g class="la-n la-d3"><circle cx="2.6" cy="22.5" r="2"/><text x="2.6" y="22.6">3</text></g></svg>` },
    m2: { html: `<div class="la-nav"><i class="la-logo la-hot"></i><span class="la-navl"><i></i><i></i><i></i></span><i class="la-cta la-hot"></i></div>
      <div class="la-body" style="display:grid;grid-template-columns:1.1fr 1fr;grid-template-rows:minmax(0,1fr) auto;gap:${U(2.4)} ${U(5)};padding:${U(4.4)} ${U(5)} ${U(4.4)}">
        <div class="la-col" style="gap:${U(1.6)};align-content:center">${H(92, 'xl')}${H(66, 'xl')}${T(3, 60)}</div>
        ${IMG(10, 'height:100%;border-radius:' + U(1.6))}
        <i class="la-btn la-hot" style="width:${U(15)}"></i>
        <span class="la-row" style="justify-content:flex-end;gap:${U(1.6)}">${H(30, 'sm la-mut')}<i class="la-btn la-gb2" style="width:${U(12)};flex:none"></i></span></div>
      <svg class="la-eye la-anim" viewBox="0 0 92 57" aria-hidden="true">
        <path pathLength="1" class="la-path la-zp" d="M6.6 2.3H83L15 50.9H76"/><path class="la-ah la-d4" d="M78.4 50.9l-2.6-1.5v3z"/>
        <g class="la-n"><circle cx="3.8" cy="2.3" r="2"/><text x="3.8" y="2.4">1</text></g><g class="la-n la-d2"><circle cx="86" cy="2.3" r="2"/><text x="86" y="2.4">2</text></g><g class="la-n la-d3"><circle cx="12.6" cy="50.9" r="2"/><text x="12.6" y="51">3</text></g><g class="la-n la-d4"><circle cx="81" cy="50.9" r="2"/><text x="81" y="51">4</text></g></svg>` } }
];

registerPages('L', [
  { type: 'gallery', token: 'layouts', title: '版式布局', min: 340,
    intro: '页面的骨架，用线框图表示：灰色块是标题、正文、图片和导航，蓝色标出关键区域。每张右上角可以切换「桌面 / 手机」，看看屏幕变窄时布局怎样折叠。',
    tiles: LA.map((l) => ({
      code: l.code, name: l.name, en: l.en, meta: l.meta, desc: l.desc, more: l.more, kw: l.kw, links: l.links, css: l.css,
      bg: '#E9ECF1', ratio: '4 / 3',
      html: laFrame(l) + (l.code === 'L14' ? replayBtn : ''),
      init: laInit
    }))
  }
]);
