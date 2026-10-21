// ===== R 大企业参考：按各家公开的设计规范，重画「我们自己的数学网站」 =====
// 每个样品是一张缩小的网页：宽版按 640px 设计，舞台窄于 560px 时换成 360px 宽的手机版布局；
// 整页用 transform 等比缩放到舞台宽度，所以放大视图里就是一张更大的「截图」。
// 不放任何公司的标志、商标、产品名与口号，只重现字体气质、配色、圆角、栅格、按钮、留白与动效。

const NARROW = 560;
function fit(stage, ctx) {
  const pg = stage.querySelector('.rf-pg');
  if (!pg) return;
  const set = () => {
    const W = stage.clientWidth;
    if (!W) return;
    const n = W < NARROW;
    pg.classList.toggle('rf-n', n);
    pg.style.transform = `scale(${W / (n ? 360 : 640)})`;
  };
  set();
  const ro = new ResizeObserver(set);
  ro.observe(stage);
  ctx.add(() => ro.disconnect());
}
const pg = (cls, inner, extra = '') => `<div class="rf-pg ${cls}">${inner}</div>${extra}`;
const tile = (o) => ({
  wide: true, ratio: '3 / 2', ...o,
  init(stage, ctx) { fit(stage, ctx); return o.init ? o.init(stage, ctx) : undefined; }
});

// —— 线条图标（24 栅格）——
const IC = {
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM20 20l-4.8-4.8',
  menu: 'M4 7h16M4 12h16M4 17h16',
  menu2: 'M5 9h14M5 15h14',
  bell: 'M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14zM10 20.5a2 2 0 0 0 4 0',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0',
  home: 'M4 10.5L12 4l8 6.5V20h-5.5v-6h-5v6H4z',
  book: 'M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5zM5 20.5A2.5 2.5 0 0 0 7.5 23H19',
  pencil: 'M4 20l1.2-4.4L16.4 4.4a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8zM14.5 6.5l3 3',
  plus: 'M12 5v14M5 12h14',
  chevR: 'M9.5 6l6 6-6 6',
  chevD: 'M6 9.5l6 6 6-6',
  chevL: 'M14.5 6l-6 6 6 6',
  heart: 'M12 20.5S3.5 15.3 3.5 9.6C3.5 6.8 5.6 4.8 8.1 4.8c1.6 0 3 .8 3.9 2.1.9-1.3 2.3-2.1 3.9-2.1 2.5 0 4.6 2 4.6 4.8 0 5.7-8.5 10.9-8.5 10.9z',
  star: 'M12 3.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8z',
  bookmark: 'M6.5 4h11v16.5L12 16.8l-5.5 3.7z',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1',
  grid: 'M5 5h3v3H5zM10.5 5h3v3h-3zM16 5h3v3h-3zM5 10.5h3v3H5zM10.5 10.5h3v3h-3zM16 10.5h3v3h-3zM5 16h3v3H5zM10.5 16h3v3h-3zM16 16h3v3h-3z',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrowR: 'M4.5 12h15M13.5 6l6 6-6 6',
  arrowD: 'M12 4.5v15M6 13.5l6 6 6-6',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3.6 3 14.4 0 18M12 3c-3 3.6-3 14.4 0 18',
  file: 'M6.5 3h7.5l4.5 4.5V21h-12zM14 3v4.5h4.5',
  folder: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h4.6l2 2h8.4A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 7.5V12l3 2',
  branch: 'M7 4.5v11M7 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 8.5c0 5-10 3.5-10 7',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  inbox: 'M4 13.5l2.5-8h11l2.5 8V19H4zM4 13.5h4.5l1 2h5l1-2H20',
  layers: 'M12 4l8.5 4.5L12 13 3.5 8.5zM3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5',
  chart: 'M4 20h16M7 16.5v-5M12 16.5V7M17 16.5v-8',
  tag: 'M3.5 12.5V4h8.5l8.5 8.5-8 8zM8 8h.01',
  copy: 'M8.5 8.5h11v11h-11zM15.5 8.5v-4h-11v11h4',
  note: 'M5 4h14v16H5zM8.5 9h7M8.5 13h7M8.5 17h4',
  refresh: 'M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5V9H15',
  filter: 'M4 6.5h16M7.5 12h9M10.5 17.5h3',
  play: 'M8 5.5v13l10.5-6.5z',
  pause: 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',
  prev: 'M6 5v14M18 5.5v13L8.5 12z',
  next: 'M18 5v14M6 5.5v13l9.5-6.5z',
  shuffle: 'M3.5 7h3c5 0 6 10 11 10h3M17.5 14l3 3-3 3M3.5 17h3c1.6 0 2.7-1 3.6-2.4M13.9 9.4C14.8 8 15.9 7 17.5 7h3M17.5 4l3 3-3 3',
  repeat: 'M5 11V9.5A2.5 2.5 0 0 1 7.5 7H19M16 4l3 3-3 3M19 13v1.5a2.5 2.5 0 0 1-2.5 2.5H5M8 20l-3-3 3-3',
  volume: 'M4 9.5h3.5L12 6v12l-4.5-3.5H4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11',
  library: 'M5.5 4v16M10.5 4v16M15 4.5l4.5 15.5',
  mic: 'M12 3.5a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0v-5a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v3.5',
  cmd: 'M9 9h6v6H9zM9 9V6.5A2.5 2.5 0 1 0 6.5 9zM15 9h2.5A2.5 2.5 0 1 0 15 6.5zM15 15v2.5a2.5 2.5 0 1 0 2.5-2.5zM9 15H6.5A2.5 2.5 0 1 0 9 17.5z',
  min: 'M5 12h14',
  max: 'M6 6h12v12H6z',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 11v5.5M12 7.8h.01',
  flame: 'M12 21c-3.9 0-6.5-2.6-6.5-6 0-3.6 2.7-5.4 3.5-8.5 1.6 1.2 2.4 2.7 2.5 4.3 1-1 1.6-2.4 1.6-4.3 2.9 1.9 5.4 5 5.4 8.5 0 3.4-2.6 6-6.5 6z',
  bag: 'M5.5 8h13l-1 12.5h-11zM9 8V6.5a3 3 0 0 1 6 0V8',
  sliders: 'M5 7h9M18 7h1M5 17h1M10 17h9M14 4.5v5M8 14.5v5'
};
const ic = (n, cls = '') => `<svg class="rf-i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]}"/></svg>`;
const icf = (n, cls = '') => ic(n, 'rf-if' + (cls ? ' ' + cls : ''));

// —— 函数曲线 → SVG 路径 ——
function curve(f, [x0, x1], [y0, y1], w, h, n = 160) {
  const lo = y0 - (y1 - y0), hi = y1 + (y1 - y0);
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    let y = f(x);
    if (!Number.isFinite(y)) y = hi;
    y = Math.max(lo, Math.min(hi, y));
    d += (i ? 'L' : 'M') + ((x - x0) / (x1 - x0) * w).toFixed(1) + ',' + ((y1 - y) / (y1 - y0) * h).toFixed(1);
  }
  return d;
}
const tsin = (k) => (x) => { let s = 0, t = x; for (let i = 0; i <= k; i++) { s += t; t *= -x * x / ((2 * i + 2) * (2 * i + 3)); } return s; };
const sqw = (k) => (x) => { let s = 0; for (let i = 1; i <= k; i++) { const m = 2 * i - 1; s += Math.sin(m * x) / m; } return 4 / Math.PI * s; };
// 折线 → 平滑曲线（Catmull-Rom 转贝塞尔）
function smooth(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

// 在 transform 缩放过的页面里，把指针位置换算成元素内的坐标
function localXY(el, e) {
  const r = el.getBoundingClientRect();
  const k = r.width / el.offsetWidth || 1;
  return [(e.clientX - r.left) / k, (e.clientY - r.top) / k, el.offsetWidth, el.offsetHeight];
}

/* ============================== R01 Apple ============================== */
// 屏幕里的「产品图」：幂级数部分和 S₃₀(z) 的相位图——零点排在收敛圆上
let discImg = null;
function paintDisc(cv) {
  const W = 708, H = 426;
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  if (!discImg) {
    discImg = g.createImageData(W, H);
    const d = discImg.data, N = 30;
    const hsv = (h, s, v) => {
      const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
      return [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
    };
    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        const x = (i / W - 0.5) * 3.8, y = (0.5 - j / H) * 2.29;
        const r = Math.hypot(x, y), th = Math.atan2(y, x);
        const rn = Math.pow(r, N + 1), tn = th * (N + 1);
        const nr = 1 - rn * Math.cos(tn), ni = -rn * Math.sin(tn);
        const dr = 1 - x, di = -y, den = dr * dr + di * di || 1e-9;
        const fr = (nr * dr + ni * di) / den, fi = (ni * dr - nr * di) / den;
        const hue = (Math.atan2(fi, fr) / (2 * Math.PI) + 1.08) % 1;
        const lm = Math.log2(Math.hypot(fr, fi) + 1e-12);
        let v = 0.78 + 0.22 * (lm - Math.floor(lm));
        if (r > 1) v *= Math.max(0.05, Math.exp(-(r - 1) * 5.5));
        const [R, G, B] = hsv(hue, 0.78, v);
        const k = (j * W + i) * 4;
        d[k] = R * 255; d[k + 1] = G * 255; d[k + 2] = B * 255; d[k + 3] = 255;
      }
    }
  }
  g.putImageData(discImg, 0, 0);
  g.strokeStyle = 'rgba(255,255,255,.85)';
  g.lineWidth = 2.2;
  g.beginPath();
  g.arc(W / 2, H / 2, H / 2.29, 0, Math.PI * 2);
  g.stroke();
}
const apCurves = (() => {
  const w = 305, h = 46, X = [-9.5, 9.5], Y = [-1.5, 1.5];
  return `<svg class="rf-ap-wave" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <defs><linearGradient id="r01-g" x1="0" x2="1"><stop offset="0" stop-color="#2997ff"/><stop offset=".5" stop-color="#bf5af2"/><stop offset="1" stop-color="#ff375f"/></linearGradient></defs>
    ${[1, 3, 5, 7, 9].map((k, i) => `<path d="${curve(tsin(k), X, Y, w, h)}" stroke="url(#r01-g)" stroke-opacity="${0.35 + i * 0.13}" fill="none" stroke-width="1.6"/>`).join('')}
    <path d="${curve(Math.sin, X, Y, w, h)}" stroke="#f5f5f7" fill="none" stroke-width="2"/>
  </svg>`;
})();
const R01 = tile({
  code: 'R01', name: 'Apple 式', en: 'Apple', meta: '消费电子 · 官网',
  desc: '白底上居中的大号无衬线标题（中文用苹方的半粗体），一句短副标题，下面是两个胶囊按钮：实心蓝 #0071e3 和蓝色描边；产品图居中、常被区块底边裁掉一截。往下是 #f5f5f7 浅灰与纯黑区块交替的双栏卡片，卡片里只有标题、一行副标题和蓝色文字链接「了解更多 ›」。顶部导航 44px 高、半透明毛玻璃、字号只有 12px。',
  more: '颜色、字体为近似：原字体 SF Pro 是专有字体，这里用 Inter + 思源黑体代替。借鉴要点是「克制」：每屏只讲一件事，用留白和图片说话，按钮极少。适合数学网站的首页、章节封面、某个定理的「产品发布式」介绍页；不适合信息密集的习题列表。入场动效是轻微的淡入上移（右下角 ↻ 重播）。',
  kw: ['大标题居中', '#f5f5f7 浅灰区块', '胶囊按钮', '了解更多 ›', '毛玻璃导航'],
  css: `--blue: #0071e3;      /* 按钮（近似） */
--link: #0066cc;      /* 浅底上的文字链接；深底用 #2997ff */
--ink: #1d1d1f;  --section: #f5f5f7;
font-family: "SF Pro Display", Inter, "PingFang SC", sans-serif;
h1 { font-size: 56px; font-weight: 600; letter-spacing: -.005em; }
.btn { border-radius: 980px; padding: 11px 21px; font-size: 17px; }
.nav { height: 44px; background: rgba(250,250,252,.8);
       backdrop-filter: saturate(180%) blur(20px); }`,
  links: [['apple.com', 'https://www.apple.com/'], ['Human Interface Guidelines', 'https://developer.apple.com/design/human-interface-guidelines/'], ['Inter 字体', 'https://fonts.google.com/specimen/Inter']],
  bg: '#ffffff',
  html: pg('rf-ap', `
    <nav class="rf-ap-nav">
      <span class="rf-ap-mk">∂</span>
      <span class="rf-w">课程</span><span class="rf-w">定理</span><span class="rf-w">习题</span><span class="rf-w">图像</span><span class="rf-w">工具</span><span class="rf-w">社区</span><span class="rf-w">支持</span>
      <span class="rf-ap-ni">${ic('search')}</span><span class="rf-ap-ni">${ic('bookmark')}</span><span class="rf-ap-ni rf-o">${ic('menu2')}</span>
    </nav>
    <section class="rf-ap-hero">
      <h1>幂级数</h1>
      <p class="rf-ap-sub">无穷多项，汇成一个函数。</p>
      <div class="rf-ap-cta"><span class="rf-ap-btn">了解更多</span><span class="rf-ap-btn rf-ap-ghost">开始学习</span></div>
      <div class="rf-ap-dev"><canvas></canvas></div>
    </section>
    <div class="rf-ap-tiles rf-w">
      <section class="rf-ap-tile rf-ap-light">
        <h2>收敛半径</h2><p>一个数，划出级数成立的边界。</p>
        <div class="rf-ap-links"><span class="rf-ap-a">了解更多 ›</span><span class="rf-ap-a">做练习 ›</span></div>
        <svg class="rf-ap-disc" viewBox="0 10 240 70" aria-hidden="true">
          <defs><radialGradient id="r01-d" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3e3e8"/></radialGradient></defs>
          <circle cx="120" cy="104" r="86" fill="url(#r01-d)" stroke="#1d1d1f" stroke-opacity=".25"/>
          <path d="M120 104L181 43" stroke="#0071e3" stroke-width="2" stroke-linecap="round"/>
          <circle cx="120" cy="104" r="3" fill="#1d1d1f"/>
          <text x="138" y="62" fill="#0071e3" font-size="12" font-style="italic" font-family="Inter, serif">R</text>
        </svg>
      </section>
      <section class="rf-ap-tile rf-ap-dark">
        <h2 class="rf-ap-grad">泰勒展开</h2><p>一阶一阶，逼近原来的曲线。</p>
        <div class="rf-ap-links"><span class="rf-ap-a">了解更多 ›</span><span class="rf-ap-a">观看演示 ›</span></div>
        ${apCurves}
      </section>
    </div>`, replayBtn),
  init(stage) { paintDisc(stage.querySelector('.rf-ap-dev canvas')); }
});

/* ============================== R02 Material 3 ============================== */
const mdGraph = (() => {
  const w = 230, h = 92, X = [-6.6, 6.6], Y = [-2, 2];
  return `<svg class="rf-md-plot" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 ${h / 2}H${w}" stroke="#7965AF" stroke-opacity=".35"/>
    <path d="${curve(tsin(1), X, Y, w, h)}" stroke="#7D5260" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="${curve(tsin(3), X, Y, w, h)}" stroke="#625B71" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="${curve(tsin(7), X, Y, w, h)}" stroke="#B69DF8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="${curve(Math.sin, X, Y, w, h)}" stroke="#6750A4" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;
})();
const R02 = tile({
  code: 'R02', name: 'Google Material 3 式', en: 'Material Design 3', meta: 'Google · 设计系统',
  desc: '一切颜色从一个主色 #6750A4 推出「色调表面」：淡紫的容器色 #EADDFF、带紫调的灰底 #F3EDF7，而不是纯白纯灰。大卡片圆角 28px，按钮是 40px 高的全圆角胶囊，筛选标签（chips）是 8px 圆角的小方块，选中时变成填色并出现 ✓。左侧导航栏的选中项是一颗药丸形高亮；右下角有悬浮操作按钮（FAB）。点击任何按钮会有水波纹。',
  more: '颜色为 Material 3 基准配色（baseline），字体用 Roboto（原 Google Sans 不在公开字库里时的官方替代）。适合做学习类「应用」：章节列表、练习、设置页；它的动态取色能让整站从一个主色自动生成深浅搭配。不适合追求杂志感、强排版的页面。试试点 chips 和按钮。',
  kw: ['色调表面', '28px 大圆角', 'FAB 悬浮按钮', 'chips 标签', '水波纹'],
  css: `--md-primary: #6750A4;  --md-on-primary: #FFFFFF;
--md-primary-container: #EADDFF;  --md-on-primary-container: #21005D;
--md-secondary-container: #E8DEF8;
--md-surface: #FEF7FF;  --md-surface-container: #F3EDF7;
--md-outline: #79747E;
.card-xl { border-radius: 28px; }   .chip { border-radius: 8px; height: 32px; }
.btn { height: 40px; border-radius: 20px; font: 500 14px/20px Roboto; }
.fab { border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15); }
transition-timing-function: cubic-bezier(.2, 0, 0, 1); /* emphasized */`,
  links: [['Material Design 3', 'https://m3.material.io/'], ['Roboto 字体', 'https://fonts.google.com/specimen/Roboto']],
  bg: '#F3EDF7',
  html: pg('rf-md', `
    <aside class="rf-md-rail rf-w">
      <button type="button" class="rf-md-ib rf-md-r">${ic('menu')}</button>
      <button type="button" class="rf-md-fab rf-md-r">${ic('pencil')}</button>
      <div class="rf-md-dest"><i>${ic('home')}</i><span>首页</span></div>
      <div class="rf-md-dest on"><i>${icf('book')}</i><span>章节</span></div>
      <div class="rf-md-dest"><i>${ic('note')}</i><span>练习</span></div>
      <div class="rf-md-dest"><i>${ic('user')}</i><span>我的</span></div>
    </aside>
    <main class="rf-md-main">
      <header class="rf-md-top">
        <button type="button" class="rf-md-ib rf-md-r rf-o">${ic('menu')}</button>
        <h1>泰勒公式</h1>
        <button type="button" class="rf-md-ib rf-md-r rf-w">${ic('search')}</button>
        <button type="button" class="rf-md-ib rf-md-r rf-w">${ic('dots')}</button>
        <span class="rf-md-av">明</span>
      </header>
      <div class="rf-md-chips">
        <button type="button" class="rf-md-chip rf-md-r on">${ic('check')}全部</button>
        <button type="button" class="rf-md-chip rf-md-r">定理</button>
        <button type="button" class="rf-md-chip rf-md-r">例题</button>
        <button type="button" class="rf-md-chip rf-md-r">习题</button>
        <button type="button" class="rf-md-chip rf-md-r rf-w">余项估计</button>
      </div>
      <div class="rf-md-grid">
        <article class="rf-md-hero">
          <p class="rf-md-over">第 6 章 · 第 2 节</p>
          <h2>用多项式逼近光滑函数</h2>
          <p class="rf-md-body">阶数越高，sin x 的泰勒多项式贴合得越远。</p>
          ${mdGraph}
          <div class="rf-md-btns"><button type="button" class="rf-md-btn rf-md-r">开始学习</button><button type="button" class="rf-md-btn rf-md-tonal rf-md-r">${ic('bookmark')}收藏</button></div>
        </article>
        <div class="rf-md-side rf-w">
          <article class="rf-md-fill rf-md-r">
            <p class="rf-md-over">余项</p>
            <h3>拉格朗日余项</h3>
            <p class="rf-md-f">R<sub>n</sub>(x) = f<sup>(n+1)</sup>(ξ)·(x−a)<sup>n+1</sup> ∕ (n+1)!</p>
          </article>
          <article class="rf-md-list">
            <div class="rf-md-li rf-md-r"><b class="rf-md-a1">e</b><span><em>eˣ 的展开</em><small>1 + x + x²/2! + …</small></span>${ic('chevR')}</div>
            <div class="rf-md-li rf-md-r"><b class="rf-md-a2">sin</b><span><em>sin x 的展开</em><small>x − x³/3! + x⁵/5! − …</small></span>${ic('chevR')}</div>
            <div class="rf-md-li rf-md-r"><b class="rf-md-a3">ln</b><span><em>ln(1+x) 的展开</em><small>x − x²/2 + x³/3 − …</small></span>${ic('chevR')}</div>
          </article>
        </div>
      </div>
    </main>
    <button type="button" class="rf-md-efab rf-md-r">${ic('pencil')}<span>做练习</span></button>
    <nav class="rf-md-bar rf-o">
      <div class="rf-md-dest"><i>${ic('home')}</i><span>首页</span></div>
      <div class="rf-md-dest on"><i>${icf('book')}</i><span>章节</span></div>
      <div class="rf-md-dest"><i>${ic('note')}</i><span>练习</span></div>
      <div class="rf-md-dest"><i>${ic('user')}</i><span>我的</span></div>
    </nav>`),
  init(stage, ctx) {
    ctx.on(stage, 'pointerdown', (e) => {
      const el = e.target.closest('.rf-md-r');
      if (!el) return;
      const [x, y, w, h] = localXY(el, e);
      const s = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 2;
      const r = document.createElement('span');
      r.className = 'rf-md-rip';
      r.style.cssText = `left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px`;
      el.appendChild(r);
      ctx.later(650, () => r.remove());
    });
    ctx.on(stage, 'click', (e) => {
      const c = e.target.closest('.rf-md-chip');
      if (!c) return;
      c.classList.toggle('on');
      if (c.classList.contains('on') && !c.querySelector('.rf-i')) c.insertAdjacentHTML('afterbegin', ic('check'));
      if (!c.classList.contains('on')) c.querySelector('.rf-i')?.remove();
    });
  }
});

/* ============================== R03 Fluent 2 ============================== */
const flGraph = (() => {
  const w = 250, h = 96, f = (x) => 0.35 * x * x * x - 1.2 * x * x + 0.6 * x + 2.2, X = [0, 3.2], Y = [0, 3];
  const a = 0.3, b = 2.9, fa = f(a), fb = f(b), m = (fb - fa) / (b - a);
  // f'(ξ) = m： 1.05ξ² − 2.4ξ + 0.6 − m = 0
  const A = 1.05, B = -2.4, C = 0.6 - m, xi = (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A);
  const px = (x) => (x - X[0]) / (X[1] - X[0]) * w, py = (y) => h - (y - Y[0]) / (Y[1] - Y[0]) * h;
  const tl = (x) => f(xi) + m * (x - xi);
  return `<svg class="rf-fl-plot" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <path d="${curve(f, X, Y, w, h)}" stroke="#0F6CBD" stroke-width="2.4" fill="none"/>
    <path d="M${px(a)},${py(fa)}L${px(b)},${py(fb)}" stroke="#616161" stroke-dasharray="4 3" stroke-width="1.4"/>
    <path d="M${px(xi - 0.75)},${py(tl(xi - 0.75))}L${px(xi + 0.75)},${py(tl(xi + 0.75))}" stroke="#C239B3" stroke-width="2" stroke-linecap="round"/>
    <circle cx="${px(a)}" cy="${py(fa)}" r="3.5" fill="#fff" stroke="#0F6CBD" stroke-width="2"/>
    <circle cx="${px(b)}" cy="${py(fb)}" r="3.5" fill="#fff" stroke="#0F6CBD" stroke-width="2"/>
    <circle cx="${px(xi)}" cy="${py(f(xi))}" r="3.5" fill="#C239B3"/>
    <text x="${px(xi) - 4}" y="${py(f(xi)) + 16}" font-size="10" fill="#C239B3" font-style="italic">ξ</text>
  </svg>`;
})();
const R03 = tile({
  code: 'R03', name: 'Microsoft Fluent 2 式', en: 'Fluent 2', meta: 'Microsoft · 设计系统',
  desc: '最有辨识度的是「亚克力」材质：弹出菜单是半透明的白，透出背后模糊的颜色，再叠一层细微噪点；窗口底色是透出桌面色调的「云母」。圆角很小：按钮、输入框 4px，卡片和菜单 8px。主色是沉稳的蓝 #0F6CBD，选中的导航项左边有一根 3px 的蓝色竖条。字体是人文主义无衬线（Segoe UI），图标线条圆润。',
  more: '颜色、字体为近似：Segoe UI 只在 Windows 上有，这里用 Open Sans 代替；壁纸是抽象的蓝色花瓣，并非系统壁纸。适合做「工具型」学习应用：笔记、草稿、带右键菜单的公式编辑器。亚克力只该用在浮层（菜单、侧栏、对话框）上，正文区保持实色以保证可读性。',
  kw: ['亚克力', '云母', '4px 小圆角', '#0F6CBD', '导航竖条'],
  css: `--brand: #0F6CBD;  --brand-hover: #115EA3;  --brand-pressed: #0C3B5E;
--fg1: #242424;  --fg2: #424242;  --stroke: #D1D1D1;
font-family: "Segoe UI Variable", "Segoe UI", "Open Sans", sans-serif;
.btn { height: 32px; border-radius: 4px; font: 600 14px/20px var(--font); }
.card, .flyout { border-radius: 8px; }
.shadow4  { box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.14); }
.shadow16 { box-shadow: 0 0 2px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.14); }
.acrylic { background: rgba(252,252,252,.7);
           backdrop-filter: blur(30px) saturate(125%); }`,
  links: [['Fluent 2', 'https://fluent2.microsoft.design/'], ['Open Sans 字体', 'https://fonts.google.com/specimen/Open+Sans']],
  bg: '#cfe0f3',
  html: pg('rf-fl', `
    <div class="rf-fl-wall"><i></i><i></i><i></i><i></i></div>
    <div class="rf-fl-win">
      <div class="rf-fl-bar">
        <span class="rf-fl-app">∂</span><span class="rf-fl-tt">数学分析</span>
        <span class="rf-fl-search rf-w">${ic('search')}搜索定理、例题</span>
        <span class="rf-fl-ctl">${ic('min')}${ic('max')}${ic('close')}</span>
      </div>
      <div class="rf-fl-body">
        <nav class="rf-fl-nav">
          <span class="rf-fl-ni">${ic('menu')}<b class="rf-w"></b></span>
          <span class="rf-fl-ni">${ic('home')}<b class="rf-w">主页</b></span>
          <span class="rf-fl-ni on">${ic('book')}<b class="rf-w">章节</b></span>
          <span class="rf-fl-ni">${ic('pencil')}<b class="rf-w">习题</b></span>
          <span class="rf-fl-ni">${ic('star')}<b class="rf-w">收藏</b></span>
          <span class="rf-fl-ni">${ic('note')}<b class="rf-w">笔记</b></span>
        </nav>
        <main class="rf-fl-main">
          <p class="rf-fl-crumb">章节 <span>›</span> 第 5 章 <span>›</span> <b>微分中值定理</b></p>
          <h1>微分中值定理</h1>
          <div class="rf-fl-card">
            <div class="rf-fl-ch"><b>拉格朗日中值定理</b><small>割线的斜率，一定等于某点的切线斜率</small></div>
            ${flGraph}
          </div>
          <div class="rf-fl-row">
            <button type="button" class="rf-fl-btn rf-fl-pri">继续学习</button>
            <button type="button" class="rf-fl-btn">添加到列表</button>
            <label class="rf-fl-field rf-w"><input class="no-pagekeys" placeholder="写下 ξ 的取值…"></label>
          </div>
        </main>
      </div>
    </div>
    <div class="rf-fl-menu">
      <span class="rf-fl-mi">${ic('copy')}<b>复制公式</b><kbd>Ctrl+C</kbd></span>
      <span class="rf-fl-mi on">${ic('pencil')}<b>添加批注</b><kbd>Ctrl+M</kbd></span>
      <span class="rf-fl-mi">${ic('star')}<b>收藏定理</b><kbd></kbd></span>
      <i></i>
      <span class="rf-fl-mi">${ic('link')}<b>复制链接</b><kbd>Ctrl+L</kbd></span>
    </div>`)
});

/* ============================== R04 IBM Carbon ============================== */
const cbChart = (() => {
  const w = 236, h = 132, ns = [[1, '#6929c4'], [2, '#1192e8'], [5, '#005d5d'], [20, '#9f1853']];
  const grid = [0, 0.25, 0.5, 0.75, 1].map((t) => `<path d="M0 ${(h - t * h).toFixed(1)}H${w}" stroke="#e0e0e0"/>`).join('');
  return `<svg class="rf-cb-svg" viewBox="-28 -6 ${w + 34} ${h + 24}" aria-hidden="true">
    ${grid}
    ${[0, 0.5, 1].map((t) => `<text x="-6" y="${h - t * h + 3}" text-anchor="end">${t.toFixed(1)}</text>`).join('')}
    ${[0, 0.25, 0.5, 0.75, 1].map((t) => `<text x="${t * w}" y="${h + 14}" text-anchor="middle">${t}</text>`).join('')}
    <path d="M0 ${h}H${w}" stroke="#8d8d8d"/>
    ${ns.map(([n, c]) => `<path d="${curve((x) => Math.pow(x, n), [0, 1], [0, 1], w, h, 120)}" stroke="${c}" stroke-width="1.6" fill="none"/>`).join('')}
    <circle cx="${w}" cy="0" r="3" fill="#161616"/><circle cx="${w}" cy="${h}" r="3" fill="#fff" stroke="#161616" stroke-width="1.4"/>
  </svg>`;
})();
const R04 = tile({
  code: 'R04', name: 'IBM Carbon 式', en: 'IBM Carbon', meta: 'IBM · 设计系统',
  desc: '零圆角：按钮、输入框、卡片全是直角。顶栏是 #161616 近黑色；主按钮是 IBM 蓝 #0f62fe 的长方块，文字靠左、箭头靠右。大标题用 IBM Plex Sans 的细体（Light 300），严格对齐在 16 栏、以 8px 为单位的「2x 栅格」上。输入框是浅灰 #f4f4f4 底加一条底边线，聚焦时变成 2px 蓝框。卡片之间只用 1px 细线分隔。',
  more: 'IBM Plex Sans 是 IBM 开源的真字体，颜色取自 Carbon 的 White 主题（近似）。图表用 Carbon 数据可视化的分类色（紫 #6929c4、青 #1192e8、深绿 #005d5d、品红 #9f1853）。适合理性、工程感的数学网站：定义—定理—证明的严格层级、数据表格、可视化。输入框可以真的输入。',
  kw: ['零圆角', 'IBM Plex', '#0f62fe', '2x 栅格', '底边框输入框'],
  css: `--interactive: #0f62fe;  --background: #ffffff;
--layer: #f4f4f4;  --text-primary: #161616;  --text-secondary: #525252;
--border-strong: #8d8d8d;  --shell: #161616;
font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
h1 { font-weight: 300; font-size: 42px; line-height: 50px; }
.btn { border-radius: 0; height: 48px; padding: 0 64px 0 16px; }
.input { background: #f4f4f4; border: 0; border-bottom: 1px solid #8d8d8d; }
.input:focus { outline: 2px solid #0f62fe; outline-offset: -2px; }
/* 间距只用 2/4/8/16/24/32/48… */`,
  links: [['Carbon Design System', 'https://carbondesignsystem.com/'], ['IBM Plex Sans 字体', 'https://fonts.google.com/specimen/IBM+Plex+Sans']],
  bg: '#ffffff',
  html: pg('rf-cb', `
    <header class="rf-cb-hd">
      <span class="rf-cb-hb">${ic('menu')}</span>
      <span class="rf-cb-name">数学 <b>分析学</b></span>
      <nav class="rf-w"><span class="on">课程</span><span>定理库</span><span>习题</span><span>资源</span></nav>
      <span class="rf-cb-sp"></span>
      <span class="rf-cb-hb">${ic('search')}</span><span class="rf-cb-hb rf-w">${ic('bell')}</span><span class="rf-cb-hb rf-w">${ic('grid')}</span>
    </header>
    <section class="rf-cb-lead">
      <div class="rf-cb-l">
        <p class="rf-cb-eye">第 4 章 · 函数列与函数项级数</p>
        <h1>一致收敛：<br>比逐点收敛更强的约定</h1>
        <p class="rf-cb-p">对给定的 ε，找一个对所有 x 都管用的 N。只有这样，连续性、积分与求导才能和极限交换次序。</p>
        <label class="rf-cb-field rf-w"><span>容差 ε</span><input class="no-pagekeys" value="0.01" inputmode="decimal"></label>
        <div class="rf-cb-btns">
          <button type="button" class="rf-cb-btn rf-cb-pri">开始学习 ${ic('arrowR')}</button>
          <button type="button" class="rf-cb-btn rf-cb-ter rf-w">下载讲义 ${ic('arrowD')}</button>
        </div>
      </div>
      <figure class="rf-cb-chart rf-w">
        <figcaption><b>fₙ(x) = xⁿ 在 [0, 1] 上</b>
          <span class="rf-cb-lg"><i style="background:#6929c4"></i>n=1<i style="background:#1192e8"></i>n=2<i style="background:#005d5d"></i>n=5<i style="background:#9f1853"></i>n=20</span></figcaption>
        ${cbChart}
      </figure>
    </section>
    <section class="rf-cb-tiles rf-w">
      <div class="rf-cb-tile"><b>逐点收敛</b><p>N 可以随 x 变化</p>${ic('arrowR')}</div>
      <div class="rf-cb-tile"><b>一致收敛</b><p>一个 N 管住全体 x</p>${ic('arrowR')}</div>
      <div class="rf-cb-tile"><b>M 判别法</b><p>用常数项级数控制</p>${ic('arrowR')}</div>
      <div class="rf-cb-tile"><b>连续性的保持</b><p>一致极限仍然连续</p>${ic('arrowR')}</div>
    </section>`)
});

/* ============================== R05 GitHub Primer ============================== */
const ghHeat = (() => {
  const lv = ['#eff2f5', '#aceebb', '#4ac26b', '#2da44e', '#116329'];
  let s = '', seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let c = 0; c < 16; c++) for (let r = 0; r < 7; r++) {
    const v = rnd(), k = c > 11 ? (v < 0.15 ? 1 : v < 0.45 ? 2 : v < 0.8 ? 3 : 4) : (v < 0.4 ? 0 : v < 0.7 ? 1 : v < 0.9 ? 2 : 3);
    s += `<rect x="${c * 9}" y="${r * 9}" width="7" height="7" rx="1.5" fill="${lv[k]}"/>`;
  }
  return `<svg class="rf-gh-heat" viewBox="0 0 142 61" aria-hidden="true">${s}</svg>`;
})();
const ghRow = (dir, name, msg, when) => `<div class="rf-gh-fr">${dir ? icf('folder', 'rf-gh-dir') : ic('file', 'rf-gh-fi')}<b>${name}</b><span>${msg}</span><time>${when}</time></div>`;
const R05 = tile({
  code: 'R05', name: 'GitHub Primer 式', en: 'GitHub Primer', meta: 'GitHub · 设计系统',
  desc: '白底加 1px 浅灰细框 #d1d9e0 的「盒子」，表头是 #f6f8fa 灰；圆角 6px。唯一的实心彩色按钮是绿色 #1f883d，其余按钮都是白底带边框。标签页下方有一条 2px 的珊瑚色下划线，数字放在灰色小胶囊「计数器」里；提交哈希、日期用等宽字体。右栏是浅蓝的话题标签和绿色方格的「贡献热力图」。',
  more: '颜色为 Primer 浅色主题近似值；字体用 GitHub 系统字体栈里的 Noto Sans 与等宽字体。适合把数学网站做成「讲义仓库」：文件树、每节的修订记录、习题讨论区、学习热力图。信息密、可扫读，但缺少情绪，不适合首页大图。点右上角「收藏」试试计数器。',
  kw: ['细边框盒子', '绿色主按钮', '计数器', '热力图', '等宽数字'],
  css: `--fg-default: #1f2328;  --fg-muted: #59636e;
--canvas-subtle: #f6f8fa;  --border-default: #d1d9e0;
--accent-fg: #0969da;  --success-bg: #1f883d;  --tab-underline: #fd8c73;
font-family: -apple-system, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
.box { border: 1px solid var(--border-default); border-radius: 6px; }
.btn { height: 32px; border-radius: 6px; font-weight: 500;
       border: 1px solid rgba(31,35,40,.15); box-shadow: 0 1px 0 rgba(31,35,40,.04); }
.Counter { background: rgba(129,139,152,.12); border-radius: 2em; padding: 0 6px; }
code, .sha { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }`,
  links: [['Primer', 'https://primer.style/'], ['github.com', 'https://github.com/'], ['Noto Sans 字体', 'https://fonts.google.com/specimen/Noto+Sans']],
  bg: '#ffffff',
  html: pg('rf-gh', `
    <header class="rf-gh-hd">
      <span class="rf-gh-ib">${ic('menu')}</span>
      <span class="rf-gh-crumb">xiaoming <i>/</i> <b>math-analysis</b></span>
      <span class="rf-gh-sp"></span>
      <span class="rf-gh-search rf-w">${ic('search')}输入 <kbd>/</kbd> 搜索</span>
      <span class="rf-gh-ib rf-w">${ic('plus')}</span><span class="rf-gh-ib rf-w">${ic('inbox')}</span>
      <span class="rf-gh-av"></span>
    </header>
    <nav class="rf-gh-tabs">
      <span class="on">${ic('file')}讲义</span><span>${ic('info')}习题 <em>12</em></span><span>${ic('branch')}修订 <em>3</em></span><span class="rf-w">${ic('chart')}统计</span><span class="rf-w">${ic('gear')}设置</span>
    </nav>
    <div class="rf-gh-body">
      <div class="rf-gh-main">
        <div class="rf-gh-title"><span class="rf-gh-av sm"></span><b>math-analysis</b><span class="rf-gh-pub">公开</span>
          <span class="rf-gh-sp"></span>
          <span class="rf-gh-btn rf-w">${ic('eye')}关注 <em>36</em></span>
          <button type="button" class="rf-gh-btn rf-gh-star">${ic('star')}<span>收藏</span> <em>1,204</em></button>
        </div>
        <div class="rf-gh-tools">
          <span class="rf-gh-btn">${ic('branch')}main ${ic('chevD')}</span>
          <span class="rf-gh-meta rf-w">${ic('branch')}<b>3</b> 分支</span>
          <span class="rf-gh-sp"></span>
          <span class="rf-gh-btn rf-gh-go">学习 ${ic('chevD')}</span>
        </div>
        <div class="rf-gh-box">
          <div class="rf-gh-bh"><span class="rf-gh-av xs"></span><b>xiaoming</b><span class="rf-gh-msg">补充收敛半径的三道例题</span><code>a1f3c9e</code><time class="rf-w">· 3 天前</time></div>
          ${ghRow(1, '01-极限与连续', '修正 ε-δ 证明的笔误', '2 周前')}
          ${ghRow(1, '02-一致收敛', '加入 M 判别法', '5 天前')}
          ${ghRow(1, '03-幂级数', '补充收敛半径的三道例题', '3 天前')}
          ${ghRow(0, 'README.md', '更新目录', '3 天前')}
          ${ghRow(0, 'LICENSE', '初始化', '上个月')}
        </div>
      </div>
      <aside class="rf-gh-side rf-w">
        <h3>关于</h3>
        <p>数学分析讲义与习题：极限、级数、积分，每节配可运行的例子。</p>
        <div class="rf-gh-topics"><span>实分析</span><span>级数</span><span>收敛</span><span>微积分</span></div>
        <p class="rf-gh-st">${ic('star')}<b class="rf-gh-sn">1,204</b> 收藏</p>
        <h3>学习记录</h3>
        ${ghHeat}
        <div class="rf-gh-lang"><i style="width:68%;background:#3D6117"></i><i style="width:24%;background:#3572A5"></i><i style="width:8%;background:#DA5B0B"></i></div>
        <p class="rf-gh-ll"><i style="background:#3D6117"></i><b>TeX</b> 68%<i style="background:#3572A5"></i><b>Python</b> 24%</p>
      </aside>
    </div>`),
  init(stage, ctx) {
    ctx.on(stage, 'click', (e) => {
      const b = e.target.closest('.rf-gh-star');
      if (!b) return;
      const on = b.classList.toggle('on');
      const n = on ? '1,205' : '1,204';
      b.querySelector('em').textContent = n;
      b.querySelector('span').textContent = on ? '已收藏' : '收藏';
      stage.querySelectorAll('.rf-gh-sn').forEach((x) => { x.textContent = n; });
    });
  }
});

/* ============================== R06 Stripe ============================== */
const stChart = (() => {
  const w = 196, h = 58, n = 30;
  let s = 0;
  const pts = [];
  for (let k = 1; k <= n; k++) { s += 1 / (k * k); pts.push([(k - 1) / (n - 1) * w, h - (s - 0.9) / (1.7 - 0.9) * h]); }
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
  const lim = h - (Math.PI * Math.PI / 6 - 0.9) / 0.8 * h;
  return `<svg class="rf-st-svg" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <defs><linearGradient id="r06-a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#635bff" stop-opacity=".22"/><stop offset="1" stop-color="#635bff" stop-opacity="0"/></linearGradient></defs>
    <path d="M0 ${lim.toFixed(1)}H${w}" stroke="#a3acb9" stroke-dasharray="3 3"/>
    <path d="${line}L${w},${h}L0,${h}Z" fill="url(#r06-a)"/>
    <path d="${line}" stroke="#635bff" stroke-width="1.8" fill="none"/>
  </svg>`;
})();
const stArrow = '<svg class="rf-st-ar" viewBox="0 0 10 10" aria-hidden="true"><path class="rf-st-ln" d="M0 5h7"/><path d="M1 1l4 4-4 4"/></svg>';
const R06 = tile({
  code: 'R06', name: 'Stripe 式', en: 'Stripe', meta: '金融科技 · 官网',
  desc: '页面顶部是一条斜切的彩色渐变带（橙、品红、紫、天蓝在缓慢流动），大标题压在渐变上、用混合模式让字被渐变「染色」。正文是深海军蓝 #0a2540 与石板灰 #425466；按钮是紫 #635bff 的小胶囊，箭头在悬停时从 › 伸成 →。右边是层叠的白色界面卡片和深色代码块，阴影又大又软、带一点蓝紫调；背景上有几条极淡的竖向参考线。',
  more: '颜色、字体为近似：原字体 Söhne 是专有字体，这里用 Inter Tight。渐变带是 CSS 径向渐变在斜切容器里慢慢移动（原站用 WebGL）。适合数学网站的首页与「开发者文档」式的公式/代码讲解页：精致的代码块、细线、数据卡片很配。注意别滥用渐变——Stripe 只在首屏用一次。',
  kw: ['斜切渐变', '#635bff', '深海军蓝', '代码块', '大柔和阴影'],
  css: `--blurple: #635bff;  --navy: #0a2540;  --slate: #425466;  --bg-soft: #f6f9fc;
font-family: "Söhne", "Inter Tight", -apple-system, sans-serif;
.hero-band { transform: skewY(-9deg); transform-origin: 0 0; }
.hero h1 { color: #4d4d4d; mix-blend-mode: multiply; /* 或 color-burn */ }
.btn { background: #635bff; color: #fff; border-radius: 16.5px;
       padding: 3px 12px 6px 16px; font-weight: 600; }
.card { border-radius: 8px;
  box-shadow: 0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3); }
.guide { border-left: 1px dashed rgba(66,71,112,.09); }`,
  links: [['stripe.com', 'https://stripe.com/'], ['Inter Tight 字体', 'https://fonts.google.com/specimen/Inter+Tight']],
  bg: '#ffffff',
  html: pg('rf-st', `
    <div class="rf-st-guides"><i></i><i></i><i></i><i></i></div>
    <div class="rf-st-band"><i class="rf-st-b1"></i><i class="rf-st-b2"></i><i class="rf-st-b3"></i><i class="rf-st-b4"></i></div>
    <nav class="rf-st-nav">
      <b class="rf-st-mk">分析学</b>
      <span class="rf-w">课程</span><span class="rf-w">讲义</span><span class="rf-w">习题</span><span class="rf-w">开发者</span><span class="rf-w">关于</span>
      <span class="rf-st-sp"></span><span class="rf-st-login rf-w">登录 ${stArrow}</span><span class="rf-st-burger rf-o">${ic('menu')}</span>
    </nav>
    <h1 class="rf-st-h">极限、级数与积分，<br>一套完整的工具。</h1>
    <p class="rf-st-p">从 ε-δ 到幂级数，每个定理都有定义、证明、例题三层讲解，四千多道习题附完整解答。</p>
    <div class="rf-st-cta"><button type="button" class="rf-st-btn">开始学习 ${stArrow}</button><button type="button" class="rf-st-link">联系老师 ${stArrow}</button></div>
    <div class="rf-st-cards rf-w">
      <div class="rf-st-card">
        <p class="rf-st-cl">部分和 S<sub>n</sub> = Σ 1/k²</p>
        <p class="rf-st-cv">→ π²/6 <span>+1.6449</span></p>
        ${stChart}
        <p class="rf-st-cf"><span>n = 1</span><span>n = 30</span></p>
      </div>
      <div class="rf-st-code">
        <div class="rf-st-tabs"><span class="on">converge.py</span><span>radius.js</span></div>
        <pre><i>1</i><span class="k">def</span> <span class="f">radius</span>(a):
<i>2</i>    <span class="c"># 柯西–阿达马公式</span>
<i>3</i>    <span class="k">return</span> <span class="n">1</span> / limsup(
<i>4</i>        <span class="f">abs</span>(a(n)) ** (<span class="n">1</span>/n))</pre>
      </div>
    </div>
    <div class="rf-st-stats rf-w">
      <div><b>4,800+</b><span>道配套习题</span></div>
      <div><b>135</b><span>条定理与完整证明</span></div>
      <div><b>99.9%</b><span>的题目有逐步解答</span></div>
    </div>`)
});

/* ============================== R07 Linear ============================== */
const lnRow = (id, st, t, lb, c, d) => `<div class="rf-ln-row"><i class="rf-ln-pr"><b></b><b></b><b></b></i><code>${id}</code><i class="rf-ln-st ${st}"></i><span class="rf-ln-t">${t}</span><span class="rf-ln-lb rf-w"><i style="background:${c}"></i>${lb}</span><span class="rf-ln-av"></span><time class="rf-w">${d}</time></div>`;
const R07 = tile({
  code: 'R07', name: 'Linear 式', en: 'Linear', meta: '软件工具 · 官网',
  desc: '近黑底 #08090a 上的白色大标题，文字带从白到灰的渐变；正文是 13px 左右的精确小字号与冷灰 #8a8f98。产品截图带透视倾斜，顶边有一道发光细线，下半部渐隐进黑色；背后有一团很淡的靛蓝光晕 #5e6ad2。界面里到处是键盘快捷键提示（⌘K、C），状态用小圆圈图标区分。',
  more: '字体就是 Inter（Linear 本身在用），颜色为近似。这种「深色 + 光晕 + 精确小字」的语言适合做证明进度、习题追踪这类效率工具，或者给数学网站一个高级的深色模式。点截图里的 ⌘K 会弹出命令面板。',
  kw: ['深色', '光晕描边', '渐变文字', '⌘K 命令面板', '精确小字号'],
  css: `--bg: #08090a;  --panel: #0f1011;  --text: #f7f8f8;
--text-2: #8a8f98;  --text-3: #62666d;  --accent: #5e6ad2;
--border: rgba(255,255,255,.08);
font-family: "Inter Variable", Inter, sans-serif;  font-size: 13px;
h1 { font-weight: 510; letter-spacing: -.022em;
     background: linear-gradient(to right, #f7f8f8 30%, rgba(247,248,248,.5));
     -webkit-background-clip: text; color: transparent; }
.shot { transform: perspective(1200px) rotateX(16deg);
        mask-image: linear-gradient(#000 40%, transparent); }
kbd { border: 1px solid rgba(255,255,255,.1); border-radius: 4px; }`,
  links: [['linear.app', 'https://linear.app/'], ['Inter 字体', 'https://fonts.google.com/specimen/Inter']],
  bg: '#08090a', dark: true,
  html: pg('rf-ln', `
    <div class="rf-ln-glow"></div>
    <nav class="rf-ln-nav">
      <span class="rf-ln-mk">∂</span><b>分析学</b>
      <span class="rf-w">课程</span><span class="rf-w">方法</span><span class="rf-w">定理库</span><span class="rf-w">更新记录</span>
      <span class="rf-ln-sp"></span><span class="rf-w">登录</span><span class="rf-ln-cta rf-w">注册</span><span class="rf-o">${ic('menu')}</span>
    </nav>
    <p class="rf-ln-chip"><b>新</b>证明依赖图已上线 ${ic('chevR')}</p>
    <h1 class="rf-ln-h">把每一个证明，<br>拆成可追踪的步骤。</h1>
    <p class="rf-ln-p">定义、引理、定理与习题，像管理工程任务一样管理你的数学分析。为速度与专注而设计。</p>
    <div class="rf-ln-btns"><button type="button" class="rf-ln-b1">开始学习</button><button type="button" class="rf-ln-b2">查看方法 ${ic('chevR')}</button></div>
    <div class="rf-ln-shot">
      <div class="rf-ln-app">
        <aside class="rf-ln-side rf-w">
          <p class="rf-ln-ws"><i></i>分析学 ${ic('chevD')}</p>
          <p>${ic('inbox')}收件箱<em>3</em></p><p>${ic('layers')}我的任务</p>
          <p class="rf-ln-sec">章节</p>
          <p class="on">${ic('book')}幂级数</p><p>${ic('book')}一致收敛</p><p>${ic('book')}中值定理</p>
        </aside>
        <div class="rf-ln-list">
          <div class="rf-ln-lh"><b>幂级数</b><span>全部证明</span><span class="rf-ln-sp"></span><button type="button" class="rf-ln-k"><kbd>⌘</kbd><kbd>K</kbd></button></div>
          <div class="rf-ln-gh"><i class="rf-ln-st prog"></i>进行中 <span>3</span></div>
          ${lnRow('MA-112', 'prog', '证明比值判别法', '定理', '#5e6ad2', '10月20日')}
          ${lnRow('MA-118', 'prog', '阿贝尔第二定理：边界上的连续性', '引理', '#f2994a', '10月21日')}
          ${lnRow('MA-121', 'todo', '求 Σ xⁿ/n 的收敛半径', '习题', '#4cb782', '10月23日')}
          <div class="rf-ln-gh"><i class="rf-ln-st done"></i>已完成 <span>12</span></div>
          ${lnRow('MA-097', 'done', '柯西–阿达马公式', '定理', '#5e6ad2', '10月12日')}
        </div>
        <div class="rf-ln-pal">
          <p class="rf-ln-pi">${ic('search')}输入命令或搜索…</p>
          <p class="on">${ic('plus')}新建证明<kbd>C</kbd></p>
          <p>${ic('arrowR')}跳转到定理…<kbd>G</kbd><kbd>T</kbd></p>
          <p>${ic('check')}标记为完成<kbd>⌘</kbd><kbd>.</kbd></p>
        </div>
      </div>
    </div>`),
  init(stage, ctx) {
    ctx.on(stage, 'click', (e) => {
      const app = stage.querySelector('.rf-ln-app');
      if (e.target.closest('.rf-ln-k')) app.classList.toggle('pal');
      else if (!e.target.closest('.rf-ln-pal')) app.classList.remove('pal');
    });
  }
});

/* ============================== R08 Vercel ============================== */
const vcEps = (() => {
  const w = 150, h = 74, f = (x) => 0.5 * x * x + 0.5, X = [0, 2], Y = [0, 2.2];
  const px = (x) => x / 2 * w, py = (y) => h - y / 2.2 * h;
  return `<svg class="rf-vc-svg" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <rect x="0" y="${py(1.25)}" width="${w}" height="${py(0.75) - py(1.25)}" fill="#f2f2f2"/>
    <rect x="${px(0.78)}" y="0" width="${px(1.2) - px(0.78)}" height="${h}" fill="#ebebeb"/>
    <path d="M0 ${py(1)}H${w}M${px(1)} 0V${h}" stroke="#a1a1a1" stroke-dasharray="2 2"/>
    <path d="${curve(f, X, Y, w, h)}" stroke="#171717" stroke-width="1.6" fill="none"/>
    <circle cx="${px(1)}" cy="${py(1)}" r="2.6" fill="#171717"/>
    <text x="${w - 2}" y="${py(1.25) - 3}" text-anchor="end">L + ε</text><text x="${px(1.2) + 3}" y="${h - 3}">a + δ</text>
  </svg>`;
})();
const R08 = tile({
  code: 'R08', name: 'Vercel 式', en: 'Vercel · Geist', meta: '开发者平台 · 官网',
  desc: '只有黑、白和几级灰。字体是 Geist 与 Geist Mono，大标题字距收得很紧（约 −0.045em）。整页被 1px 浅灰细线切成格子，格线交点处有小小的「+」号；首屏背景是淡淡的方格网并向四周渐隐。按钮是黑色实心胶囊和白底细边框胶囊，小标签用等宽字体。',
  more: 'Geist 是 Vercel 开源的真字体。这种工程图纸般的极简适合「开发者式」的数学网站：讲义、API 般整齐的定理索引、终端风格的推导记录。颜色为近似。注意：它几乎不用彩色，重点靠排版和格线；想要温度就得另外加插图。',
  kw: ['黑白', 'Geist', '格线与 + 号', '方格背景', '等宽标签'],
  css: `--bg: #ffffff;  --fg: #171717;  --gray: #666666;  --line: #ebebeb;
font-family: Geist, "Inter", sans-serif;
h1 { font-weight: 600; letter-spacing: -.045em; }
.label { font-family: "Geist Mono", monospace; font-size: 12px; color: #666; }
.btn { height: 40px; border-radius: 9999px; padding: 0 20px; }
.btn-primary { background: #171717; color: #fff; }
.btn-secondary { background: #fff; box-shadow: 0 0 0 1px #ebebeb; }
.cell { border: 1px solid var(--line); }   /* 交点处画 + 号 */
.hero { background: linear-gradient(#f2f2f2 1px, transparent 1px) 0 0 / 28px 28px, … ; }`,
  links: [['Geist 设计系统', 'https://vercel.com/geist'], ['vercel.com', 'https://vercel.com/'], ['Geist 字体', 'https://fonts.google.com/specimen/Geist']],
  bg: '#ffffff',
  html: pg('rf-vc', `
    <nav class="rf-vc-nav">
      <span class="rf-vc-mk">∂</span><b>分析学</b>
      <span class="rf-w">课程 ${ic('chevD')}</span><span class="rf-w">习题 ${ic('chevD')}</span><span class="rf-w">资源 ${ic('chevD')}</span><span class="rf-w">讲义</span>
      <span class="rf-vc-sp"></span><span class="rf-vc-b2 rf-w">登录</span><span class="rf-vc-b1">开始学习</span><span class="rf-o rf-vc-ham">${ic('menu2')}</span>
    </nav>
    <div class="rf-vc-frame">
      <div class="rf-vc-hero">
        <h1>极限，从定义<br>开始讲清楚。</h1>
        <p>极限、连续、导数、积分——每个定义都配可交互的图像，和可以逐行运行的推导。</p>
        <div class="rf-vc-cta"><button type="button" class="rf-vc-p1">开始学习 ${ic('arrowR')}</button><button type="button" class="rf-vc-p2">阅读讲义</button></div>
      </div>
      <div class="rf-vc-cells rf-w">
        <div class="rf-vc-cell"><code>01 / 定义</code><b>任给 ε，总有 δ。</b>${vcEps}</div>
        <div class="rf-vc-cell"><code>02 / 推导</code><b>每一步都可验证。</b>
          <pre class="rf-vc-term"><span>$</span> prove thm-3.2
<em>✓</em> 引理 3.1      <s>0.4s</s>
<em>✓</em> 定理 3.2      <s>1.2s</s>
<i></i>证明完成</pre></div>
        <div class="rf-vc-cell"><code>03 / 速度</code><b>谁收敛得更快？</b>
          <div class="rf-vc-bars"><p><span>Σ 1/n²</span><i style="width:38%"></i></p><p><span>Σ 1/2ⁿ</span><i style="width:72%"></i></p><p><span>Σ 1/n!</span><i style="width:96%"></i></p></div></div>
      </div>
      <i class="rf-vc-x" style="left:-6px;top:-6px"></i><i class="rf-vc-x" style="right:-6px;top:-6px"></i>
      <i class="rf-vc-x rf-w" style="left:-6px;top:210px"></i><i class="rf-vc-x rf-w" style="right:-6px;top:210px"></i>
    </div>`)
});

/* ============================== R09 Notion ============================== */
const R09 = tile({
  code: 'R09', name: 'Notion 式', en: 'Notion', meta: '笔记工具 · 产品界面',
  desc: '暖白底配近黑褐色文字 #37352f，侧栏是更暖的灰 #f7f7f5。每个页面有一张宽幅封面、一个大号表情图标和粗体大标题；正文是一块块「积木」：灰底的提示框 💡、可折叠的 ▸ 切换块、待办勾选框、带淡底色的行内代码和居中的公式块。几乎没有边框和阴影，层级全靠字号、灰度和留白。',
  more: '颜色为近似。Notion 页面可以在 ⋯ 菜单里把整页切换成「默认 / 衬线 / 等宽」三种字体——点右上角 ⋯ 试试（衬线用 Source Serif 代替原来的 Lyon Text）。适合数学笔记、学习计划、讲义草稿；块结构天然适合「定义 / 定理 / 证明（可折叠）」。▸ 证明和勾选框都能点。',
  kw: ['暖白', '#37352f', '表情图标', '块结构', '可折叠'],
  css: `--text: #37352f;  --text-2: rgba(55,53,47,.65);
--bg: #ffffff;  --sidebar: #f7f7f5;  --callout: #f1f1ef;
--hover: rgba(55,53,47,.08);  --blue: #2383e2;
font-family: ui-sans-serif, -apple-system, "Segoe UI", Helvetica, sans-serif;
.page-title { font-size: 40px; font-weight: 700; line-height: 1.2; }
.callout { background: #f1f1ef; border-radius: 4px; padding: 16px 16px 16px 12px; }
code { color: #eb5757; background: rgba(135,131,120,.15); border-radius: 4px; padding: .2em .4em; }
.serif { font-family: "Lyon-Text", Georgia, "Source Serif 4", serif; }`,
  links: [['notion.com', 'https://www.notion.com/']],
  bg: '#ffffff',
  html: pg('rf-nt', `
    <aside class="rf-nt-side rf-w">
      <p class="rf-nt-ws"><span>🧮</span><b>小明的笔记</b>${ic('chevD')}</p>
      <p>${ic('search')}搜索</p><p>${ic('home')}主页</p><p>${ic('inbox')}收件箱</p>
      <p class="rf-nt-sec">私人</p>
      <p><i>▾</i>📘 数学分析</p>
      <p class="rf-nt-sub on"><i>▸</i>📐 幂级数</p>
      <p class="rf-nt-sub"><i>▸</i>∫ 黎曼积分</p>
      <p class="rf-nt-sub"><i>▸</i>📝 习题集</p>
      <p><i>▸</i>📅 学习计划</p>
    </aside>
    <main class="rf-nt-main">
      <div class="rf-nt-top"><span class="rf-o rf-nt-ham">${ic('menu')}</span><span class="rf-w">📘 数学分析 <i>/</i></span> 📐 幂级数<span class="rf-nt-sp"></span><span class="rf-w">分享</span><span class="rf-w">${ic('star')}</span><button type="button" class="rf-nt-more">${ic('dots')}</button></div>
      <div class="rf-nt-menu"><p>字体</p><div><button type="button" class="on" data-f="">Ag<small>默认</small></button><button type="button" class="rf-nt-serif" data-f="serif">Ag<small>衬线</small></button><button type="button" class="rf-nt-mono" data-f="mono">Ag<small>等宽</small></button></div></div>
      <div class="rf-nt-cover"></div>
      <div class="rf-nt-doc">
        <div class="rf-nt-icon">📐</div>
        <h1>幂级数</h1>
        <div class="rf-nt-props rf-w"><p><span>${ic('tag')}标签</span><em class="b">级数</em><em class="y">第 3 章</em></p><p><span>${ic('clock')}日期</span>2026年10月20日</p></div>
        <div class="rf-nt-call"><span>💡</span><p><b>定理 3.2（柯西–阿达马）</b> 若 <i>lim sup</i> ⁿ√|aₙ| = 1/R，则 Σ aₙxⁿ 在 |x| &lt; R 内绝对收敛，在 |x| &gt; R 时发散。</p></div>
        <div class="rf-nt-tg"><button type="button" class="rf-nt-tb"><i>▸</i>证明</button><p class="rf-nt-tc">对固定的 |x| &lt; R，取 q 使 |x|/R &lt; q &lt; 1，与几何级数 Σ qⁿ 比较即可。用 <code>root test</code> 判定。</p></div>
        <label class="rf-nt-todo on"><input type="checkbox" class="no-pagekeys" checked><span>读完 3.1 节：收敛半径</span></label>
        <label class="rf-nt-todo"><input type="checkbox" class="no-pagekeys"><span>做习题 3.4 – 3.8</span></label>
      </div>
    </main>`),
  init(stage, ctx) {
    ctx.on(stage, 'click', (e) => {
      const main = stage.querySelector('.rf-nt-main');
      const tb = e.target.closest('.rf-nt-tb');
      if (tb) tb.parentElement.classList.toggle('open');
      if (e.target.closest('.rf-nt-more')) main.classList.toggle('menu');
      const f = e.target.closest('[data-f]');
      if (f) {
        main.classList.remove('serif', 'mono');
        if (f.dataset.f) main.classList.add(f.dataset.f);
        main.querySelectorAll('[data-f]').forEach((b) => b.classList.toggle('on', b === f));
      }
    });
    ctx.on(stage, 'change', (e) => {
      const l = e.target.closest('.rf-nt-todo');
      if (l) l.classList.toggle('on', e.target.checked);
    });
  }
});

/* ============================== R10 Duolingo ============================== */
const duMascot = `<svg class="rf-du-mas" viewBox="0 0 90 92" aria-hidden="true">
  <ellipse cx="45" cy="86" rx="24" ry="4" fill="#e5e5e5"/>
  <g class="rf-du-bob">
    <rect x="30" y="2" width="30" height="8" rx="2" fill="#4b4b4b"/><path d="M45 0L66 6 45 12 24 6z" fill="#4b4b4b"/><path d="M62 7v10" stroke="#ffc800" stroke-width="3" stroke-linecap="round"/>
    <rect x="12" y="12" width="66" height="66" rx="24" fill="#1cb0f6"/>
    <path d="M12 52h66v2a24 24 0 0 1-24 24H36a24 24 0 0 1-24-24z" fill="#1899d6"/>
    <circle cx="33" cy="38" r="11" fill="#fff"/><circle cx="57" cy="38" r="11" fill="#fff"/>
    <circle cx="35" cy="40" r="5.5" fill="#4b4b4b"/><circle cx="59" cy="40" r="5.5" fill="#4b4b4b"/>
    <circle cx="37" cy="38" r="1.8" fill="#fff"/><circle cx="61" cy="38" r="1.8" fill="#fff"/>
    <path d="M38 56q7 6 14 0" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="22" cy="50" rx="4" ry="2.5" fill="#ff86d0" opacity=".7"/><ellipse cx="68" cy="50" rx="4" ry="2.5" fill="#ff86d0" opacity=".7"/>
    <rect x="26" y="74" width="14" height="8" rx="4" fill="#ff9600"/><rect x="50" y="74" width="14" height="8" rx="4" fill="#ff9600"/>
  </g>
</svg>`;
const duOpts = ['Σ 1/n', 'Σ 1/n²', 'Σ 1/ln n', 'Σ n/(n+1)'];
const R10 = tile({
  code: 'R10', name: 'Duolingo 式', en: 'Duolingo', meta: '语言学习 · 应用',
  desc: '亮绿 #58CC02 配大量白；按钮是 3D 的：圆角 16px、下面有一条 4px 的深色「底边」（#58A700），按下时整个按钮下沉、底边消失。选项卡片是 2px 浅灰描边加加厚的底边，选中变成浅蓝。字体是圆润粗壮的全粗体；角色插画是扁平、圆滚滚的几何造型，表情夸张。进度条是带一道高光的绿色圆角条。',
  more: '颜色为近似，原字体 Feather Bold / DIN Rounded 为专有字体，这里用 Nunito 粗体代替；吉祥物是我们自己画的方块小人，不是它的猫头鹰。适合数学网站的练习、闯关、每日打卡：即时反馈、连胜、奖励感都很强。不适合严肃的定理讲解长文。试试选一个答案再点「检查」。',
  kw: ['#58CC02', '3D 按钮', '圆润粗体', '卡通角色', '即时反馈'],
  css: `--green: #58cc02;  --green-shadow: #58a700;
--blue: #1cb0f6;  --red: #ff4b4b;  --text: #4b4b4b;  --border: #e5e5e5;
font-family: "Feather Bold", Nunito, "DIN Round", sans-serif;  font-weight: 800;
.btn { border-radius: 16px; background: var(--green); color: #fff;
       box-shadow: 0 4px 0 var(--green-shadow); text-transform: uppercase; }
.btn:active { transform: translateY(4px); box-shadow: none; }
.choice { border: 2px solid #e5e5e5; border-bottom-width: 4px; border-radius: 12px; }
.choice.selected { border-color: #84d8ff; background: #ddf4ff; color: #1899d6; }
.progress { height: 16px; border-radius: 99px; background: #58cc02; }`,
  links: [['duolingo.com', 'https://www.duolingo.com/'], ['Nunito 字体', 'https://fonts.google.com/specimen/Nunito']],
  bg: '#ffffff',
  html: pg('rf-du', `
    <div class="rf-du-top"><span class="rf-du-x">${ic('close')}</span><div class="rf-du-prog"><i></i></div><span class="rf-du-hp">${icf('heart')}5</span></div>
    <div class="rf-du-q">
      <p class="rf-du-tag rf-w">${icf('star')}新题型</p>
      <h1>下面哪个级数收敛？</h1>
      <div class="rf-du-say rf-w">${duMascot}<p>提示：和 p 级数比一比，看看 p 是否大于 1。</p></div>
      <div class="rf-du-opts">${duOpts.map((o, i) => `<button type="button" class="rf-du-opt" data-i="${i}"><kbd>${i + 1}</kbd>${o}</button>`).join('')}</div>
    </div>
    <div class="rf-du-foot">
      <p class="rf-du-fb"><i>${ic('check')}</i><span><b>太棒了！</b><small>p = 2 &gt; 1，级数收敛。</small></span></p>
      <button type="button" class="rf-du-btn rf-du-skip rf-w">跳过</button>
      <button type="button" class="rf-du-btn rf-du-go" disabled>检查</button>
    </div>`),
  init(stage, ctx) {
    const root = stage.querySelector('.rf-du');
    const go = root.querySelector('.rf-du-go');
    const fb = root.querySelector('.rf-du-fb');
    let pick = -1, state = 'ask';
    const reset = () => {
      state = 'ask'; pick = -1;
      root.classList.remove('ok', 'bad');
      root.querySelectorAll('.rf-du-opt').forEach((o) => o.classList.remove('on'));
      go.disabled = true; go.textContent = '检查';
    };
    ctx.on(root, 'click', (e) => {
      const o = e.target.closest('.rf-du-opt');
      if (o && state === 'ask') {
        pick = +o.dataset.i;
        root.querySelectorAll('.rf-du-opt').forEach((x) => x.classList.toggle('on', x === o));
        go.disabled = false;
        return;
      }
      if (e.target.closest('.rf-du-skip')) { reset(); return; }
      if (e.target.closest('.rf-du-go') && !go.disabled) {
        if (state === 'ask') {
          state = 'done';
          const ok = pick === 1;
          root.classList.add(ok ? 'ok' : 'bad');
          fb.querySelector('b').textContent = ok ? '太棒了！' : '正确答案：';
          fb.querySelector('small').textContent = ok ? 'p = 2 > 1，级数收敛。' : 'Σ 1/n²（p = 2 > 1）';
          fb.querySelector('i').innerHTML = ok ? ic('check') : ic('close');
          go.textContent = ok ? '继续' : '知道了';
        } else reset();
      }
    });
  }
});


/* ============================== R11 Airbnb ============================== */
const abImg = [
  // 落日沙丘：正弦曲线做的沙丘
  `<svg viewBox="0 0 140 133" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="r11-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf9f"/><stop offset=".55" stop-color="#ff8a65"/><stop offset="1" stop-color="#c94b6d"/></linearGradient></defs>
    <rect width="140" height="133" fill="url(#r11-a)"/><circle cx="96" cy="62" r="17" fill="#ffe9c2" opacity=".95"/>
    <path d="${curve((x) => 0.5 * Math.sin(x) + 0.1 * Math.sin(3 * x), [0, 9], [-3.4, 1], 140, 133)}L140,133L0,133Z" fill="#d06a4f"/>
    <path d="${curve((x) => 0.35 * Math.sin(x + 2) - 0.9, [0, 9], [-3.4, 1], 140, 133)}L140,133L0,133Z" fill="#a8443f"/>
    <path d="${curve((x) => 0.25 * Math.sin(0.7 * x + 1) - 1.8, [0, 9], [-3.4, 1], 140, 133)}L140,133L0,133Z" fill="#7d2f3a"/></svg>`,
  // 湖边的黎曼和：一排「楼房」站在曲线下
  `<svg viewBox="0 0 140 133" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="r11-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8cc8f2"/><stop offset=".62" stop-color="#e8f5ff"/><stop offset=".62" stop-color="#9fcbe8"/><stop offset="1" stop-color="#5d9cc8"/></linearGradient></defs>
    <rect width="140" height="133" fill="url(#r11-b)"/>
    ${Array.from({ length: 10 }, (_, k) => { const x = 8 + k * 12.4, hh = 18 + 40 * Math.sin((k + 0.5) / 10 * Math.PI) ** 1.2; return `<rect x="${x}" y="${82 - hh}" width="11" height="${hh}" fill="#2f4a6d" opacity="${0.75 + k * 0.02}"/><rect x="${x}" y="82.5" width="11" height="${hh * 0.55}" fill="#2f4a6d" opacity=".18"/>`; }).join('')}
    <path d="${curve((x) => 18 + 40 * Math.sin(x * Math.PI) ** 1.2, [-0.05, 1.05], [0, 82], 140, 82)}" stroke="#fff" stroke-width="1.6" fill="none" opacity=".9"/></svg>`,
  // 傅里叶山丘：一层层谐波
  `<svg viewBox="0 0 140 133" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="r11-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#f4fbff"/></linearGradient></defs>
    <rect width="140" height="133" fill="url(#r11-c)"/>
    <path d="${curve((x) => sqw(3)(x) * 0.25, [0, 12], [-2.6, 0.9], 140, 133)}L140,133L0,133Z" fill="#9fd08a"/>
    <path d="${curve((x) => sqw(5)(x + 1) * 0.22 - 0.7, [0, 12], [-2.6, 0.9], 140, 133)}L140,133L0,133Z" fill="#6db35f"/>
    <path d="${curve((x) => Math.sin(x * 0.6) * 0.3 - 1.6, [0, 12], [-2.6, 0.9], 140, 133)}L140,133L0,133Z" fill="#3f8a46"/>
    <circle cx="28" cy="26" r="9" fill="#fff6d6"/></svg>`,
  // 紫色夜空：复平面上的单位圆与轨道
  `<svg viewBox="0 0 140 133" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="r11-d" cx=".7" cy=".3" r=".9"><stop offset="0" stop-color="#9a6bc4"/><stop offset=".6" stop-color="#47306f"/><stop offset="1" stop-color="#1e1640"/></radialGradient></defs>
    <rect width="140" height="133" fill="url(#r11-d)"/>
    <ellipse cx="70" cy="74" rx="52" ry="18" fill="none" stroke="#ffd7f3" stroke-opacity=".5"/><circle cx="70" cy="70" r="24" fill="#f6c8e6"/><circle cx="62" cy="62" r="24" fill="#47306f" opacity=".35"/>
    ${[[18, 20], [40, 12], [112, 22], [124, 52], [24, 104], [104, 112], [88, 16], [10, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#fff"/>`).join('')}</svg>`
];
const abCard = (i, title, star, l1, l2, badge) => `<article class="rf-ab-card">
  <div class="rf-ab-img">${abImg[i]}${badge ? `<span class="rf-ab-badge">${badge}</span>` : ''}<button type="button" class="rf-ab-heart" aria-label="收藏">${icf('heart')}</button><span class="rf-ab-dots"><i class="on"></i><i></i><i></i><i></i><i></i></span></div>
  <p class="rf-ab-t"><b>${title}</b><span>★ ${star}</span></p><p class="rf-ab-g">${l1}</p><p class="rf-ab-g">${l2}</p><p class="rf-ab-pr"><b>免费</b> · 含证书</p>
</article>`;
const R11 = tile({
  code: 'R11', name: 'Airbnb 式', en: 'Airbnb', meta: '住宿平台 · 官网',
  desc: '「照片优先」：整页是 4 列圆角（约 12px）的图片卡片网格，卡片没有边框和底色，文字直接放在图下：一行加粗标题配 ★ 评分，两行灰字，一行价格。顶部是一个巨大的白色搜索胶囊，分成「地点 / 日期 / 人数」几段，右端是珊瑚粉 #FF385C 渐变的圆形搜索按钮；阴影很柔、很浅。图片右上角有可点的爱心。',
  more: '颜色、字体为近似：原字体 Airbnb Cereal 是专有字体，这里用 Plus Jakarta Sans；图片是我们画的风景（沙丘是正弦曲线、楼房是黎曼和）。适合数学网站的「课程目录 / 专题浏览」页：靠封面图吸引人点进去。粉色只用在品牌标识和最重要的按钮上。点爱心试试。',
  kw: ['#FF385C', '搜索胶囊', '圆角图片网格', '柔和阴影', '爱心收藏'],
  css: `--rausch: #FF385C;  --text: #222222;  --text-2: #717171;  --border: #DDDDDD;
--grad: linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%);
font-family: "Airbnb Cereal VF", "Plus Jakarta Sans", sans-serif;
.search { border: 1px solid #ddd; border-radius: 40px;
  box-shadow: 0 3px 12px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.08); }
.search-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--grad); }
.card img { border-radius: 12px; aspect-ratio: 20 / 19; object-fit: cover; }
.card-title { font-weight: 600; }  .price { font-weight: 600; }`,
  links: [['airbnb.com', 'https://www.airbnb.com/'], ['Plus Jakarta Sans 字体', 'https://fonts.google.com/specimen/Plus+Jakarta+Sans']],
  bg: '#ffffff',
  html: pg('rf-ab', `
    <header class="rf-ab-hd rf-w">
      <b class="rf-ab-mk"><i>∞</i>分析学</b>
      <nav><span class="on">课程</span><span>讲座</span><span>答疑</span></nav>
      <span class="rf-ab-host">成为讲师</span><span class="rf-ab-globe">${ic('globe')}</span>
      <span class="rf-ab-user">${ic('menu')}<i>${icf('user')}</i></span>
    </header>
    <div class="rf-ab-search">
      <div class="rf-ab-seg rf-o">${ic('search')}<span><b>从哪个章节开始？</b><small>任意章节 · 任意难度</small></span></div>
      <div class="rf-ab-seg rf-w"><b>主题</b><small>搜索章节或定理</small></div><i class="rf-w"></i>
      <div class="rf-ab-seg rf-w"><b>难度</b><small>任意难度</small></div><i class="rf-w"></i>
      <div class="rf-ab-seg rf-w"><b>时长</b><small>添加时长</small></div>
      <button type="button" class="rf-ab-go rf-w">${ic('search')}</button>
      <span class="rf-ab-flt rf-o">${ic('sliders')}</span>
    </div>
    <nav class="rf-ab-cats">
      <span class="on"><i>Σ</i>级数</span><span><i>∫</i>积分</span><span><i>lim</i>极限</span><span><i>∂</i>导数</span><span><i>∞</i>无穷</span>
      <span class="rf-w"><i>∮</i>曲线积分</span><span class="rf-w"><i>ℝ</i>实数</span>
      <span class="rf-ab-fbtn rf-w">${ic('sliders')}筛选</span>
    </nav>
    <div class="rf-ab-grid">
      ${abCard(0, '幂级数精讲', '4.96', '张老师 · 12 节课', '10月20日开课', '学员最爱')}
      ${abCard(1, '黎曼积分', '4.91', '李老师 · 9 节课', '10月27日开课', '')}
      ${abCard(2, '傅里叶级数', '4.98', '王老师 · 10 节课', '11月3日开课', '学员最爱')}
      ${abCard(3, '复变函数入门', '4.89', '赵老师 · 14 节课', '11月10日开课', '')}
    </div>`),
  init(stage, ctx) {
    ctx.on(stage, 'click', (e) => { const h = e.target.closest('.rf-ab-heart'); if (h) h.classList.toggle('on'); });
  }
});

/* ============================== R12 Spotify ============================== */
const spCover = (bg, txt, sub = '') => `<i class="rf-sp-cv" style="background:${bg}"><b>${txt}</b>${sub ? `<small>${sub}</small>` : ''}</i>`;
const SPC = [
  ['linear-gradient(135deg,#450af5,#c4efd9)', ''],
  ['linear-gradient(160deg,#e8115b,#7b1fa2)', '幂级数'],
  ['linear-gradient(160deg,#1e3264,#477d95)', '证明'],
  ['linear-gradient(160deg,#148a08,#1db954 70%,#a8f0a0)', '每日<br>一题'],
  ['linear-gradient(160deg,#e13300,#f59b23)', '电台'],
  ['linear-gradient(160deg,#27856a,#0d3b2e)', '傅里叶'],
  ['linear-gradient(160deg,#503750,#8c67ab)', '睡前<br>定理'],
  ['linear-gradient(160deg,#0d73ec,#7fb6f7)', 'ε-δ']
];
const spEq = '<span class="rf-sp-eq"><i></i><i></i><i></i></span>';
const spGo = (cls = '') => `<button type="button" class="rf-sp-go ${cls}" aria-label="播放">${icf('play', 'rf-sp-ip')}${icf('pause', 'rf-sp-iz')}</button>`;
const R12 = tile({
  code: 'R12', name: 'Spotify 式', en: 'Spotify', meta: '音乐流媒体 · 应用',
  desc: '近黑的 #121212 面板放在纯黑底上，面板圆角 8px；唯一的强调色是亮绿 #1ED760（品牌绿 #1DB954），只给圆形播放按钮和「正在播放」。首页是一格格横条快捷入口和一排排方形封面卡片，鼠标移上去时绿色圆形播放钮从封面右下角浮起。封面是大色块渐变 + 粗体字；页面顶部有一层从封面色渐变到黑的光。',
  more: '颜色、字体为近似：原字体 Circular / Spotify Mix 是专有字体，这里用 Figtree。适合数学网站做「课程音频 / 讲座回放 / 每日一题」这类连续收听、收藏的内容，深色也适合夜间学习。点底部播放键或第一张卡片上的绿钮，进度条会走起来。',
  kw: ['#121212 深底', '#1DB954 绿', '圆形播放钮', '横排封面卡片', '封面色渐变'],
  css: `--bg: #000000;  --panel: #121212;  --hover: #1f1f1f;  --elevated: #282828;
--green: #1ed760;  /* 品牌绿 #1db954 */  --text: #fff;  --text-2: #b3b3b3;
font-family: "Spotify Mix", "Circular", Figtree, sans-serif;
.panel { background: #121212; border-radius: 8px; }
.play { width: 48px; height: 48px; border-radius: 50%; background: #1ed760; color: #000;
        box-shadow: 0 8px 8px rgba(0,0,0,.3); transform: translateY(8px); opacity: 0; }
.card:hover .play { transform: none; opacity: 1; }
.card img { border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,.5); }
.chip.active { background: #fff; color: #000; border-radius: 32px; }`,
  links: [['spotify.com', 'https://www.spotify.com/'], ['Figtree 字体', 'https://fonts.google.com/specimen/Figtree']],
  bg: '#000000', dark: true,
  html: pg('rf-sp', `
    <header class="rf-sp-top rf-w">
      <span class="rf-sp-mk">∂</span>
      <span class="rf-sp-home">${icf('home')}</span>
      <span class="rf-sp-search">${ic('search')}想学点什么？<i></i>${ic('library')}</span>
      <span class="rf-sp-sp"></span>${ic('bell', 'rf-sp-bell')}<span class="rf-sp-av">明</span>
    </header>
    <aside class="rf-sp-lib rf-w">
      <p class="rf-sp-lh">${ic('library')}<b>你的书架</b><span>${ic('plus')}</span></p>
      <p class="rf-sp-chips"><span>课程</span><span>讲师</span></p>
      <div class="rf-sp-li">${spCover(SPC[0][0], icf('heart'))}<span><b>收藏的定理</b><small><em>${icf('bookmark')}</em>歌单 · 128 条</small></span></div>
      <div class="rf-sp-li now">${spCover(SPC[1][0], '')}<span><b>幂级数精讲</b><small>课程 · 张老师</small></span>${spEq}</div>
      <div class="rf-sp-li">${spCover(SPC[2][0], '')}<span><b>证明 Mix</b><small>歌单 · 分析学</small></span></div>
      <div class="rf-sp-li">${spCover(SPC[4][0], '')}<span><b>分析学电台</b><small>播客 · 每周更新</small></span></div>
      <div class="rf-sp-li">${spCover(SPC[5][0], '')}<span><b>傅里叶的耳朵</b><small>播客 · 王老师</small></span></div>
    </aside>
    <main class="rf-sp-main">
      <div class="rf-sp-tint"></div>
      <p class="rf-sp-chips rf-sp-c2"><span class="rf-o rf-sp-me">明</span><span class="on">全部</span><span>讲座</span><span>习题</span><span>播客</span></p>
      <div class="rf-sp-quick">
        ${[[1, '幂级数精讲'], [3, '每日一题'], [2, '证明 Mix'], [5, '傅里叶的耳朵'], [6, '睡前定理'], [7, 'ε-δ 训练营']].map(([k, t], i) => `<div class="rf-sp-q${i === 0 ? ' now' : ''}">${spCover(SPC[k][0], '')}<b>${t}</b>${i === 0 ? spEq : spGo('sm')}</div>`).join('')}
      </div>
      <div class="rf-sp-shelf rf-w">
        <p class="rf-sp-sh"><b>为你推荐</b><span>显示全部</span></p>
        <div class="rf-sp-cards">
          ${[[1, '幂级数精讲', '张老师 · 12 讲'], [3, '每日一题', '每天 10 分钟的分析'], [4, '分析学电台', '定理背后的故事'], [7, 'ε-δ 训练营', '把极限写严谨']].map(([k, t, d], i) => `<div class="rf-sp-card${i === 0 ? ' now' : ''}"><div class="rf-sp-art">${spCover(SPC[k][0], SPC[k][1])}${spGo()}</div><b>${t}</b><small>${d}</small></div>`).join('')}
        </div>
      </div>
    </main>
    <footer class="rf-sp-bar">
      <div class="rf-sp-np">${spCover(SPC[1][0], '')}<span><b>幂级数 · 第 4 讲</b><small>张老师</small></span><em class="rf-w">${ic('check')}</em></div>
      <div class="rf-sp-ctl rf-w">
        <p>${ic('shuffle', 'rf-sp-on')}${icf('prev')}<button type="button" class="rf-sp-pp" aria-label="播放">${icf('play', 'rf-sp-ip')}${icf('pause', 'rf-sp-iz')}</button>${icf('next')}${ic('repeat')}</p>
        <p class="rf-sp-prog"><time class="rf-sp-t0">2:14</time><span><i></i></span><time>5:30</time></p>
      </div>
      <div class="rf-sp-vol rf-w">${ic('volume')}<span><i></i></span></div>
      <div class="rf-o rf-sp-mini">${ic('check')}<button type="button" class="rf-sp-pp" aria-label="播放">${icf('play', 'rf-sp-ip')}${icf('pause', 'rf-sp-iz')}</button></div>
      <i class="rf-o rf-sp-line"><i></i></i>
    </footer>`),
  init(stage, ctx) {
    const root = stage.querySelector('.rf-sp');
    let t = 134;
    const total = 330;
    const draw = () => {
      const f = `${(t / total * 100).toFixed(2)}%`;
      root.querySelectorAll('.rf-sp-prog span i, .rf-sp-line i').forEach((el) => { el.style.width = f; });
      const m = Math.floor(t / 60), s2 = Math.floor(t % 60);
      root.querySelector('.rf-sp-t0').textContent = `${m}:${String(s2).padStart(2, '0')}`;
    };
    draw();
    ctx.on(root, 'click', (e) => {
      if (e.target.closest('.rf-sp-pp, .rf-sp-go')) root.classList.toggle('playing');
    });
    ctx.loop((_, dt) => { if (root.classList.contains('playing')) { t = (t + dt / 1000) % total; draw(); } });
  }
});

/* ============================== R13 Netflix ============================== */
const nfSpiral = (() => {
  // 部分和 Sₙ = Σ qᵏ（q 是复数）在复平面上旋进极限点
  const q = [0.9 * Math.cos(0.55), 0.9 * Math.sin(0.55)];
  let z = [1, 0], S = [0, 0];
  const pts = [];
  for (let k = 0; k < 70; k++) { S = [S[0] + z[0], S[1] + z[1]]; pts.push(S); z = [z[0] * q[0] - z[1] * q[1], z[0] * q[1] + z[1] * q[0]]; }
  const X = (x) => 420 + x * 58, Y = (y) => 30 + y * 58;
  const d = 'M' + X(0) + ',' + Y(0) + pts.map((p) => 'L' + X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join('');
  const L = [(1 - q[0]) / ((1 - q[0]) ** 2 + q[1] ** 2), q[1] / ((1 - q[0]) ** 2 + q[1] ** 2)];
  return `<svg class="rf-nf-art" viewBox="0 0 640 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><radialGradient id="r13-a" cx=".72" cy=".42" r=".7"><stop offset="0" stop-color="#3a2a1a"/><stop offset=".45" stop-color="#14262c"/><stop offset="1" stop-color="#050708"/></radialGradient>
    <radialGradient id="r13-b"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient></defs>
    <rect width="640" height="300" fill="url(#r13-a)"/>
    <circle cx="${X(L[0])}" cy="${Y(L[1])}" r="120" fill="url(#r13-b)" opacity=".55"/>
    <path d="${d}" stroke="#ff9a3c" stroke-opacity=".18" stroke-width="9" fill="none" stroke-linejoin="round"/>
    <path d="${d}" stroke="#ffc46b" stroke-opacity=".5" stroke-width="3.5" fill="none" stroke-linejoin="round"/>
    <path d="${d}" stroke="#fff3d6" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
    ${pts.slice(0, 14).map((p) => `<circle cx="${X(p[0]).toFixed(1)}" cy="${Y(p[1]).toFixed(1)}" r="2.2" fill="#fff3d6"/>`).join('')}
    <circle cx="${X(L[0])}" cy="${Y(L[1])}" r="4" fill="#fff"/>
  </svg>`;
})();
const nfPoster = (bg, title, cls, p) => `<div class="rf-nf-po"><div class="rf-nf-pi" style="background:${bg}"><b class="${cls}">${title}</b></div><i><i style="width:${p}%"></i></i></div>`;
const R13 = tile({
  code: 'R13', name: 'Netflix 式', en: 'Netflix', meta: '视频流媒体 · 应用',
  desc: '纯黑到 #141414 的影院式深底，品牌红 #E50914 只用于标识和进度条。首屏是全幅「剧照」，左侧和底部压上黑色渐变遮罩，上面是超大号粗体片名、一行排名、一段简介，以及白底黑字的「▶ 播放」和半透明灰的「更多信息」两个 4px 小圆角按钮。下面是一排排横向滚动的 16:9 海报，鼠标移上去会放大；「继续观看」的海报下有红色进度条。',
  more: '颜色为近似；原字体 Netflix Sans 是专有字体，这里用 Archivo 与思源黑体的粗体代替。主视觉是我们画的「复数几何级数的部分和旋进极限点」。适合数学网站的视频课 / 系列讲座页：用「剧集」组织章节、用进度条提示学到哪了。海报可以悬停放大。',
  kw: ['纯黑', '#E50914', '海报横排', '大粗体片名', '渐变遮罩'],
  css: `--bg: #141414;  --red: #e50914;  --text: #fff;  --gray: #808080;
font-family: "Netflix Sans", Archivo, "Helvetica Neue", sans-serif;
.hero::after { background: linear-gradient(77deg, rgba(0,0,0,.6), transparent 85%),
                          linear-gradient(transparent 60%, #141414); }
.title { font-weight: 900; font-size: 4vw; text-shadow: 2px 2px 4px rgba(0,0,0,.45); }
.btn-play { background: #fff; color: #000; border-radius: 4px; font-weight: 700; }
.btn-info { background: rgba(109,109,110,.7); color: #fff; border-radius: 4px; }
.poster { aspect-ratio: 16 / 9; border-radius: 4px; transition: transform .3s; }
.poster:hover { transform: scale(1.25); }   .progress { background: #e50914; }`,
  links: [['netflix.com', 'https://www.netflix.com/'], ['Archivo 字体', 'https://fonts.google.com/specimen/Archivo']],
  bg: '#141414', dark: true,
  html: pg('rf-nf', `
    <section class="rf-nf-hero">
      <div class="rf-nf-bg">${nfSpiral}</div>
      <div class="rf-nf-shade"></div>
      <header class="rf-nf-nav">
        <b class="rf-nf-mk">分析学</b>
        <span class="on rf-w">首页</span><span class="rf-w">课程</span><span class="rf-w">习题</span><span class="rf-w">最新</span><span class="rf-w">我的片单</span>
        <span class="rf-nf-sp"></span>${ic('search')}<span class="rf-w">${ic('bell')}</span><span class="rf-nf-av"><i></i><i></i></span>
      </header>
      <p class="rf-nf-pills rf-o"><span>课程</span><span>习题</span><span>分类 ${ic('chevD')}</span></p>
      <div class="rf-nf-info">
        <p class="rf-nf-tag"><b>Σ</b>系 列 课</p>
        <h1>无穷级数</h1>
        <p class="rf-nf-rank"><i>热</i>今日课程排行第 1 名</p>
        <p class="rf-nf-desc rf-w">从调和级数的发散，到傅里叶级数的收敛——十二集讲完「无穷个数相加」的故事。</p>
        <div class="rf-nf-btns"><button type="button" class="rf-nf-play">${icf('play')}播放</button><button type="button" class="rf-nf-more">${ic('info')}更多信息</button></div>
      </div>
      <div class="rf-nf-rate rf-w"><span>${ic('volume')}</span><i>13+</i></div>
    </section>
    <section class="rf-nf-row rf-w">
      <h2>继续观看</h2>
      <div class="rf-nf-rail">
        ${nfPoster('linear-gradient(135deg,#5a0b0f,#120203 70%)', '收敛判别', 'a', 72)}
        ${nfPoster('linear-gradient(135deg,#0e4d57,#03161a)', '傅里叶', 'b', 35)}
        ${nfPoster('linear-gradient(135deg,#f4c430,#7a4b00)', 'ε–δ', 'c', 88)}
        ${nfPoster('linear-gradient(135deg,#3b1c63,#0d0618)', '黎曼积分', 'd', 20)}
        ${nfPoster('linear-gradient(135deg,#c2410c,#3a0f02)', '泰勒展开', 'a', 50)}
      </div>
    </section>`)
});

/* ============================== R14 Nike ============================== */
const nkTrack = (() => {
  // 透视的跑道：所有跑道线汇聚到同一个点——极限
  const vx = 430, vy = 34, lanes = [-430, -300, -175, -55, 60, 175, 290, 410, 540, 680];
  return `<svg class="rf-nk-svg" viewBox="0 0 640 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="r14-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0b0b"/><stop offset=".2" stop-color="#2a2a2a"/><stop offset="1" stop-color="#4a4a4a"/></linearGradient>
    <radialGradient id="r14-g" cx="${vx / 640}" cy="${vy / 190}" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".3" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="640" height="190" fill="#050505"/>
    <path d="M${vx},${vy}L${lanes[0]},190L${lanes[lanes.length - 1]},190Z" fill="url(#r14-s)"/>
    ${lanes.map((x) => `<path d="M${vx},${vy}L${x},190" stroke="#f5f5f5" stroke-width="2.2" stroke-opacity=".9"/>`).join('')}
    ${[0.62, 0.8].map((t) => `<path d="M${vx + (lanes[0] - vx) * t},${vy + (190 - vy) * t}L${vx + (lanes[lanes.length - 1] - vx) * t},${vy + (190 - vy) * t}" stroke="#f5f5f5" stroke-width="1.4" stroke-opacity=".5"/>`).join('')}
    ${[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => { const x = (lanes[i] + lanes[i + 1]) / 2; return `<text x="${vx + (x - vx) * 0.93}" y="${vy + (190 - vy) * 0.93}" text-anchor="middle">${n}</text>`; }).join('')}
    <rect width="640" height="190" fill="url(#r14-g)"/>
    <circle cx="${vx}" cy="${vy}" r="3" fill="#fff"/>
  </svg>`;
})();
const R14 = tile({
  code: 'R14', name: 'Nike 式', en: 'Nike', meta: '运动品牌 · 官网',
  desc: '黑白为主，几乎不用彩色，靠大幅高反差的运动摄影撑起画面。标题是超大号、压得很窄的全大写粗体（原型是 Futura 压缩超粗体），行距小于 1，像海报一样压在图下方居中。按钮是黑色实心胶囊和白底描边胶囊；导航字重偏中粗、字号小，搜索框是浅灰 #f5f5f5 的胶囊。排版锐利、留白干脆，没有阴影和装饰。',
  more: '颜色、字体为近似：标题用 Anton 代替 Futura Condensed Extra Bold，正文用 Inter 代替 Helvetica Now；图片是我们画的「所有跑道线汇聚到一点」——极限。适合数学网站里需要「燃」一点的页面：挑战赛、刷题打卡、考前冲刺。中文标题可用思源黑体最粗的 900 字重来呼应。',
  kw: ['超大压缩体', '全大写', '黑白高反差', '胶囊按钮', '运动摄影'],
  css: `--black: #111111;  --gray: #757575;  --light: #f5f5f5;  --white: #ffffff;
.headline { font-family: "Futura Condensed ExtraBold", Anton, Impact, sans-serif;
            text-transform: uppercase; font-size: 96px; line-height: .9; }
body { font-family: "Helvetica Now Text", Inter, Helvetica, sans-serif; }
.btn { background: #111; color: #fff; border-radius: 30px; padding: 6px 20px; }
.btn-outline { background: #fff; box-shadow: inset 0 0 0 1.5px #cacacb; }
.search { background: #f5f5f5; border-radius: 24px; }`,
  links: [['nike.com', 'https://www.nike.com/'], ['Anton 字体', 'https://fonts.google.com/specimen/Anton']],
  bg: '#ffffff',
  html: pg('rf-nk', `
    <p class="rf-nk-util rf-w"><span>查找学习中心</span><i></i><span>帮助</span><i></i><span>加入我们</span><i></i><span>登录</span></p>
    <header class="rf-nk-nav">
      <b class="rf-nk-mk">∫</b>
      <nav class="rf-w"><span>新品推荐</span><span>课程</span><span>习题</span><span>讲师</span><span>社区</span></nav>
      <span class="rf-nk-search rf-w">${ic('search')}搜索</span><span class="rf-o rf-nk-ico">${ic('search')}</span>${ic('heart', 'rf-nk-ico')}${ic('bag', 'rf-nk-ico rf-w')}<span class="rf-o rf-nk-ico">${ic('menu')}</span>
    </header>
    <p class="rf-nk-promo rf-w">新学期 · 全部课程免费开放<span>了解详情</span></p>
    <div class="rf-nk-img">${nkTrack}<span class="rf-w">极限 · 第 1 章</span></div>
    <div class="rf-nk-copy">
      <p class="rf-nk-eye rf-w">数学分析 · 训练营</p>
      <h1>Chase the limit</h1>
      <p class="rf-nk-sub rf-w">每一个 ε，都有属于它的 δ。</p>
      <div class="rf-nk-btns"><button type="button" class="rf-nk-b1">开始训练</button><button type="button" class="rf-nk-b2 rf-w">查看课表</button></div>
    </div>`)
});

/* ============================== R15 Tesla ============================== */
const tsScenes = [
  { t: '黎曼积分', s: '12 节课 · 从分割到可积性', svg: (() => {
    const road = 'M150,428C260,360 470,330 445,262L452,262C500,330 420,380 560,428Z';
    return `<svg viewBox="0 0 640 428" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="r15-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f9bb8"/><stop offset=".42" stop-color="#cdbdb6"/><stop offset=".61" stop-color="#f4cfa6"/><stop offset=".61" stop-color="#4a4a4f"/><stop offset="1" stop-color="#1e1f23"/></linearGradient>
      <radialGradient id="r15-b" cx=".69" cy=".6" r=".35"><stop offset="0" stop-color="#ffe3b8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe3b8" stop-opacity="0"/></radialGradient></defs>
      <rect width="640" height="428" fill="url(#r15-a)"/><rect width="640" height="428" fill="url(#r15-b)"/>
      <path d="M0,250L60,232L130,244L210,222L290,240L360,226L430,246L520,228L600,240L640,234V262H0Z" fill="#7d8597" opacity=".75"/>
      <path d="M0,262L90,250L170,258L260,246L350,258L420,252L500,262H0Z" fill="#59606f" opacity=".8"/>
      <path d="${road}" fill="#2a2b30"/>
      <path d="M150,428C260,360 470,330 445,262" stroke="#e8e8e8" stroke-opacity=".55" stroke-width="2" fill="none"/>
      <path d="M560,428C420,380 500,330 452,262" stroke="#e8e8e8" stroke-opacity=".55" stroke-width="2" fill="none"/>
      <path d="M355,428C330,370 480,330 448.5,262" stroke="#f2d17a" stroke-width="2" stroke-dasharray="14 12" fill="none"/>
      ${[[560, 300, 6, 20], [520, 285, 4, 13], [494, 275, 3, 9], [478, 269, 2, 6], [128, 300, 6, 20], [214, 284, 4, 13], [290, 274, 3, 9], [352, 268, 2, 6]].map(([x, y, w, h]) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#f4f4f4" opacity=".85"/>`).join('')}
    </svg>`;
  })() },
  { t: '傅里叶级数', s: '10 节课 · 用正弦波拼出任何形状', svg: `<svg viewBox="0 0 640 428" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="r15-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec5ea"/><stop offset=".55" stop-color="#e8f4fb"/><stop offset=".55" stop-color="#3d8fc4"/><stop offset="1" stop-color="#16547f"/></linearGradient></defs>
      <rect width="640" height="428" fill="url(#r15-c)"/>
      ${[0, 1, 2, 3].map((k) => `<path d="${curve((x) => sqw(2 + k)(x) * 0.18, [0, 22], [-1, 1], 640, 24 + k * 6)}" transform="translate(0 ${240 + k * 26})" stroke="#fff" stroke-opacity="${0.55 - k * 0.1}" stroke-width="1.6" fill="none"/>`).join('')}
      <path d="${curve((x) => 0.45 * Math.sin(x) + 0.15 * Math.sin(3 * x), [0, 9], [-1, 1], 640, 90)}L640,90L640,200L0,200Z" transform="translate(0 330)" fill="#efdcb7"/>
    </svg>` },
  { t: '泰勒展开', s: '8 节课 · 一阶一阶逼近任何光滑函数', svg: `<svg viewBox="0 0 640 428" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="r15-d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6bfd8"/><stop offset=".7" stop-color="#eef3f8"/></linearGradient>
      <linearGradient id="r15-e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c3cfdc"/></linearGradient></defs>
      <rect width="640" height="428" fill="url(#r15-d)"/>
      <path d="${curve((x) => Math.exp(-x * x * 1.4) + 0.12 * Math.exp(-((x - 1.6) ** 2) * 3), [-2.6, 2.6], [-1.5, 1.25], 640, 428)}L640,428L0,428Z" fill="url(#r15-e)"/>
      <path d="${curve((x) => 1 - 1.4 * x * x, [-0.78, 0.78], [-1.5, 1.25], 640 * 1.56 / 5.2, 428)}" transform="translate(${640 * (2.6 - 0.78) / 5.2} 0)" stroke="#3e6ae1" stroke-opacity=".5" stroke-dasharray="4 5" stroke-width="1.6" fill="none"/>
      <path d="${curve((x) => Math.exp(-x * x * 1.4) * 0.5 - 0.95, [-2.6, 2.6], [-1.5, 1.25], 640, 428)}L640,428L0,428Z" fill="#dfe7f0"/>
    </svg>` }
];
const R15 = tile({
  code: 'R15', name: 'Tesla 式', en: 'Tesla', meta: '汽车 · 官网',
  desc: '每一屏都是一张铺满的大照片，文字少到只剩一个居中的标题和一行小字；标题字重偏细（500），颜色是近黑 #171a20。底部居中并排两个同宽的按钮：蓝 #3E6AE1 实心和浅灰 #F4F4F4 实心，圆角只有 4px。导航透明地浮在照片上，链接悬停时出现一块浅灰底。几秒自动换一屏，交叉淡入。',
  more: '颜色、字体为近似：原字体 Universal Sans（早年是 Gotham）是专有字体，这里用 Montserrat。三张「照片」是我们画的：路是曲线、路边的反光柱是一次分割；海浪是正弦波叠加；雪山的山顶是一条抛物线（二阶泰勒多项式）。适合数学网站的章节封面：一张图、一个词、两个按钮。会自动轮播，也可以点底部的圆点。',
  kw: ['全屏主视觉', '极少文字', '细字重', '两个并排按钮', '轮播淡入'],
  css: `--ink: #171a20;  --gray: #393c41;  --blue: #3e6ae1;  --light: #f4f4f4;
font-family: "Universal Sans Display", Gotham, Montserrat, sans-serif;
h1 { font-weight: 500; font-size: 40px; color: #171a20; text-align: center; }
.btn { width: 264px; height: 40px; border-radius: 4px; font-size: 14px; font-weight: 500; }
.btn-primary { background: #3e6ae1; color: #fff; }
.btn-secondary { background: rgba(244,244,244,.65); color: #393c41; backdrop-filter: blur(8px); }
.nav a:hover { background: rgba(0,0,0,.05); border-radius: 4px; }
.slide { transition: opacity 1.2s ease; }`,
  links: [['tesla.com', 'https://www.tesla.com/'], ['Montserrat 字体', 'https://fonts.google.com/specimen/Montserrat']],
  bg: '#cdbdb6',
  html: pg('rf-ts', `
    ${tsScenes.map((sc, i) => `<div class="rf-ts-scene${i === 0 ? ' on' : ''}">${sc.svg}</div>`).join('')}
    <header class="rf-ts-nav">
      <b class="rf-ts-mk">分 析 学</b>
      <nav class="rf-w"><span>课程</span><span>习题</span><span>工具</span><span>讲师</span><span>探索</span></nav>
      <span class="rf-ts-ico rf-w">${ic('info')}${ic('globe')}${ic('user')}</span><span class="rf-ts-menu rf-o">菜单</span>
    </header>
    <div class="rf-ts-copy"><h1>${tsScenes[0].t}</h1><p>${tsScenes[0].s}</p><p class="rf-ts-link rf-w">预约答疑</p></div>
    <div class="rf-ts-btns"><button type="button" class="rf-ts-b1">开始学习</button><button type="button" class="rf-ts-b2">查看讲义</button></div>
    <p class="rf-ts-dots rf-w">${tsScenes.map((_, i) => `<button type="button" data-k="${i}"${i === 0 ? ' class="on"' : ''} aria-label="第 ${i + 1} 屏"></button>`).join('')}</p>`),
  init(stage, ctx) {
    const root = stage.querySelector('.rf-ts');
    const scenes = root.querySelectorAll('.rf-ts-scene'), dots = root.querySelectorAll('.rf-ts-dots button');
    const h = root.querySelector('.rf-ts-copy h1'), p = root.querySelector('.rf-ts-copy p');
    let k = 0;
    const show = (n) => {
      k = (n + scenes.length) % scenes.length;
      scenes.forEach((s, i) => s.classList.toggle('on', i === k));
      dots.forEach((d, i) => d.classList.toggle('on', i === k));
      h.textContent = tsScenes[k].t; p.textContent = tsScenes[k].s;
    };
    ctx.every(5000, () => show(k + 1));
    ctx.on(root, 'click', (e) => { const d = e.target.closest('[data-k]'); if (d) show(+d.dataset.k); });
  }
});

/* ============================== R16 Ant Design ============================== */
const adRow = (no, t, lv, st, rate) => {
  const tag = { 简单: 'g', 中等: 'o', 困难: 'r' }[lv];
  const dot = { 已发布: 'ok', 草稿: 'df', 审核中: 'pr' }[st];
  return `<div class="rf-ad-tr"><label class="rf-ad-ck"><input type="checkbox" class="no-pagekeys"><i></i></label><span class="rf-ad-a">${no}</span><span class="rf-ad-tt">${t}</span><span><em class="rf-ad-tag ${tag}">${lv}</em></span><span class="rf-ad-st rf-w"><i class="${dot}"></i>${st}</span><span class="rf-ad-pg rf-w"><i><i style="width:${rate}%"></i></i>${rate}%</span><span class="rf-ad-op rf-w"><span class="rf-ad-a">编辑</span><i></i><span class="rf-ad-a">删除</span></span></div>`;
};
const R16 = tile({
  code: 'R16', name: 'Ant Design 式', en: 'Ant Design', meta: '蚂蚁集团 · 企业级设计系统',
  desc: '典型的中后台：左侧深蓝黑 #001529 菜单栏，选中项是品牌蓝 #1677ff 实底；右边浅灰 #f5f5f5 底上放白色卡片（圆角 8px），卡片里是查询表单和表格。控件统一高 32px、圆角 6px、1px 浅灰边框 #d9d9d9；表头 #fafafa 浅灰、行之间只有一条 #f0f0f0 细线。状态用带浅底和描边的彩色标签（绿、橙、红）和小圆点；「审核中」的圆点会呼吸。',
  more: '颜色取自 Ant Design 5 的默认主题（近似），字体是系统字体栈，中文用苹方 / 微软雅黑（这里用思源黑体）。适合数学网站的「后台」：题库管理、学生成绩、批改记录；信息密度高、规矩、好维护，但几乎没有个性，前台页面别这么做。勾选框可以点。',
  kw: ['#1677ff', '#001529 侧栏', '6px 圆角', '表单 + 表格', '彩色标签'],
  css: `--colorPrimary: #1677ff;  --colorSuccess: #52c41a;  --colorWarning: #faad14;
--colorError: #ff4d4f;  --colorText: rgba(0,0,0,.88);  --colorTextSecondary: rgba(0,0,0,.45);
--colorBorder: #d9d9d9;  --colorSplit: #f0f0f0;  --colorBgLayout: #f5f5f5;
--borderRadius: 6px;  --controlHeight: 32px;  --fontSize: 14px;
font-family: -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
.sider { background: #001529; }  .menu-item-selected { background: #1677ff; color: #fff; }
.table-thead > th { background: #fafafa; font-weight: 600; }
.tag-success { color: #389e0d; background: #f6ffed; border: 1px solid #b7eb8f; }`,
  links: [['Ant Design', 'https://ant.design/']],
  bg: '#f5f5f5',
  html: pg('rf-ad', `
    <aside class="rf-ad-sider rf-w">
      <p class="rf-ad-logo"><i>∂</i>分析学教务</p>
      <p class="rf-ad-mi">${ic('chart')}仪表盘</p>
      <p class="rf-ad-mi open">${ic('book')}题库管理${ic('chevD', 'rf-ad-car')}</p>
      <div class="rf-ad-sub"><p class="rf-ad-mi on">题目列表</p><p class="rf-ad-mi">知识点</p><p class="rf-ad-mi">试卷</p></div>
      <p class="rf-ad-mi">${ic('user')}学员管理</p>
      <p class="rf-ad-mi">${ic('layers')}成绩分析</p>
      <p class="rf-ad-mi">${ic('gear')}系统设置</p>
    </aside>
    <div class="rf-ad-body">
      <header class="rf-ad-hd">${ic('menu', 'rf-ad-fold')}<span class="rf-ad-bc"><span class="rf-w">首页 <i>/</i></span> 题库管理 <i>/</i> <b>题目列表</b></span><span class="rf-ad-sp"></span>${ic('search', 'rf-w')}<span class="rf-ad-bell">${ic('bell')}<em>5</em></span><span class="rf-ad-av">明</span><span class="rf-w">小明</span></header>
      <div class="rf-ad-content">
        <div class="rf-ad-card rf-ad-form">
          <label>题目名称：<span class="rf-ad-in">请输入</span></label>
          <label class="rf-w">难度：<span class="rf-ad-in rf-ad-sel">请选择${ic('chevD')}</span></label>
          <span class="rf-ad-sp"></span>
          <button type="button" class="rf-ad-btn rf-w">重置</button><button type="button" class="rf-ad-btn rf-ad-pri">查询</button><span class="rf-ad-a rf-w">展开${ic('chevD')}</span>
        </div>
        <div class="rf-ad-card rf-ad-tbl">
          <div class="rf-ad-tool"><b>题目列表</b><span class="rf-ad-sp"></span><button type="button" class="rf-ad-btn rf-ad-pri">${ic('plus')}新建</button><span class="rf-w rf-ad-ti">${ic('refresh')}${ic('sliders')}${ic('gear')}</span></div>
          <div class="rf-ad-tr rf-ad-th"><label class="rf-ad-ck"><input type="checkbox" class="no-pagekeys rf-ad-all"><i></i></label><span>题号</span><span class="rf-ad-tt">题目</span><span>难度</span><span class="rf-w">状态</span><span class="rf-w">正确率</span><span class="rf-w">操作</span></div>
          ${adRow('Q-1024', '求 Σ xⁿ/n 的收敛半径', '简单', '已发布', 82)}
          ${adRow('Q-1025', '证明 Σ sin(nx)/n² 一致收敛', '中等', '审核中', 57)}
          ${adRow('Q-1026', '逐项求导求 Σ n xⁿ 的和函数', '中等', '已发布', 64)}
          ${adRow('Q-1027', '阿贝尔定理在端点处的应用', '困难', '草稿', 31)}
          <div class="rf-ad-pag rf-w"><span>共 128 条</span>${ic('chevL')}<b>1</b><span>2</span><span>3</span><span>…</span><span>13</span>${ic('chevR')}<span class="rf-ad-in rf-ad-sel">10 条/页${ic('chevD')}</span></div>
        </div>
      </div>
    </div>`),
  init(stage, ctx) {
    ctx.on(stage, 'change', (e) => {
      const cb = e.target;
      if (!cb.closest('.rf-ad')) return;
      const rows = [...stage.querySelectorAll('.rf-ad-tr:not(.rf-ad-th)')];
      if (cb.classList.contains('rf-ad-all')) rows.forEach((r) => { r.querySelector('input').checked = cb.checked; });
      rows.forEach((r) => r.classList.toggle('on', r.querySelector('input').checked));
      const n = rows.filter((r) => r.classList.contains('on')).length, all = stage.querySelector('.rf-ad-all');
      all.checked = n === rows.length; all.indeterminate = n > 0 && n < rows.length;
    });
  }
});

/* ============================== R17 Arco ============================== */
const acData = { 周: [1.2, 2.1, 1.6, 3.2, 2.4, 3.8, 2.9], 月: [2.4, 1.8, 2.9, 2.2, 3.4, 2.7, 3.9] };
const acPath = (v, w = 300, h = 86) => smooth(v.map((y, i) => [i / (v.length - 1) * w, h - y / 4.5 * h]));
const acChart = (key) => {
  const w = 300, h = 86, v = acData[key], d = acPath(v, w, h);
  return `<g class="rf-ac-set" data-set="${key}"><path d="${d}L${w},${h}L0,${h}Z" fill="url(#r17-a)"/><path d="${d}" stroke="#165dff" stroke-width="2" fill="none"/></g>`;
};
const R17 = tile({
  code: 'R17', name: 'Arco Design 式（字节跳动）', en: 'Arco Design', meta: '字节跳动 · 企业级设计系统',
  desc: '选的是字节跳动的 Arco（腾讯的 TDesign 主色是 #0052D9，气质相近）。主色是更亮的蓝 #165DFF；最有辨识度的是「填充式」控件：输入框、次要按钮、单选按钮组都是浅灰 #F2F3F5 实底、没有边框，聚焦时才出现蓝框。圆角很小（按钮 2px、卡片 4px），卡片无边框无阴影。图标常放在淡色圆底里；折线图是平滑曲线加蓝色渐隐面积。',
  more: '颜色取自 Arco 默认主题（近似），字体栈以 Inter 开头、中文用苹方（这里用思源黑体）。适合数学网站的「学习数据看板」：学习时长、正确率、打卡天数。比 Ant Design 更轻、更现代一点。图表右上角可以在「周 / 月」之间切换。',
  kw: ['#165DFF', '填充式输入框', '2px 小圆角', '数据看板', '渐变面积图'],
  css: `--primary-6: #165dff;  --primary-1: #e8f3ff;
--color-text-1: #1d2129;  --color-text-2: #4e5969;  --color-text-3: #86909c;
--color-fill-2: #f2f3f5;  --color-border-2: #e5e6eb;
--success-6: #00b42a;  --warning-6: #ff7d00;  --danger-6: #f53f3f;
--border-radius-small: 2px;  --border-radius-medium: 4px;
font-family: Inter, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
.input { background: var(--color-fill-2); border: 1px solid transparent; }
.input:focus { background: #fff; border-color: var(--primary-6); }
.btn-secondary { background: var(--color-fill-2); color: var(--color-text-2); }`,
  links: [['Arco Design', 'https://arco.design/'], ['TDesign（腾讯）', 'https://tdesign.tencent.com/']],
  bg: '#f2f3f5',
  html: pg('rf-ac', `
    <header class="rf-ac-nav">
      <span class="rf-o rf-ac-ham">${ic('menu')}</span><i class="rf-ac-logo">∂</i><b>分析学 · 学习中心</b>
      <span class="rf-ac-sp"></span>
      <label class="rf-ac-in rf-w"><input class="no-pagekeys" placeholder="搜索章节">${ic('search')}</label>
      <span class="rf-ac-ib rf-w">${ic('bell')}<em></em></span><span class="rf-ac-ib rf-w">${ic('gear')}</span><span class="rf-ac-av">明</span>
    </header>
    <aside class="rf-ac-menu rf-w">
      <p class="open">${ic('chart')}仪表盘${ic('chevD', 'rf-ac-car')}</p>
      <p class="sub on">工作台</p><p class="sub">学习分析</p>
      <p>${ic('book')}学习计划</p><p>${ic('note')}练习题库</p><p>${ic('bookmark')}错题本</p><p>${ic('user')}个人中心</p>
    </aside>
    <main class="rf-ac-main">
      <section class="rf-ac-card rf-ac-wel">
        <div class="rf-ac-wh"><b>欢迎回来，小明</b><span class="rf-ac-sp"></span><button type="button" class="rf-ac-btn rf-ac-sec rf-w">查看计划</button><button type="button" class="rf-ac-btn rf-ac-pri">开始今日练习</button></div>
        <div class="rf-ac-stats">
          <div><i style="background:#e8f3ff;color:#165dff">${ic('clock')}</i><span>学习时长<b>128<small> h</small></b></span></div>
          <div><i style="background:#e8ffea;color:#00b42a">${ic('check')}</i><span>完成习题<b>342<small> 道</small></b></span></div>
          <div class="rf-w"><i style="background:#fff7e8;color:#ff7d00">${ic('flame')}</i><span>连续打卡<b>12<small> 天</small></b></span></div>
          <div class="rf-w"><i style="background:#f5e8ff;color:#722ed1">${ic('star')}</i><span>正确率<b>86<small> %</small></b></span></div>
        </div>
        <div class="rf-ac-ch">
          <p class="rf-ac-cht"><b>学习时长趋势</b><span class="rf-ac-sp"></span><span class="rf-ac-rg"><button type="button" class="on" data-set="周">本周</button><button type="button" data-set="月">本月</button></span></p>
          <svg class="rf-ac-svg" viewBox="-4 -6 308 106" aria-hidden="true">
            <defs><linearGradient id="r17-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#165dff" stop-opacity=".22"/><stop offset="1" stop-color="#165dff" stop-opacity="0"/></linearGradient></defs>
            ${[0, 1, 2, 3].map((k) => `<path d="M0 ${k * 28.7}H300" stroke="#e5e6eb" stroke-dasharray="3 3"/>`).join('')}
            ${acChart('周')}${acChart('月')}
            <path d="M150 0V86" stroke="#c9cdd4" stroke-dasharray="3 3"/><circle cx="150" cy="${86 - 3.2 / 4.5 * 86}" r="4" fill="#fff" stroke="#165dff" stroke-width="2"/>
            ${['一', '二', '三', '四', '五', '六', '日'].map((d, i) => `<text x="${i * 50}" y="99" text-anchor="middle">周${d}</text>`).join('')}
          </svg>
          <p class="rf-ac-tip"><b>周四</b><span><i></i>学习时长</span><em>3.2 h</em></p>
        </div>
      </section>
      <aside class="rf-ac-side rf-w">
        <section class="rf-ac-card"><p class="rf-ac-st">快捷入口</p>
          <div class="rf-ac-quick">${[['note', '新建笔记'], ['pencil', '随机一题'], ['bookmark', '错题本'], ['chart', '学习报告'], ['clock', '番茄钟'], ['user', '答疑']].map(([n, t]) => `<span><i>${ic(n)}</i>${t}</span>`).join('')}</div>
        </section>
        <section class="rf-ac-card"><p class="rf-ac-st">公告</p>
          <p class="rf-ac-note"><em class="b">活动</em>期中模拟考周六开考</p>
          <p class="rf-ac-note"><em class="o">通知</em>第 3 章讲义已更新</p>
          <p class="rf-ac-note"><em class="c">消息</em>你的提问有新回答</p>
        </section>
      </aside>
    </main>`),
  init(stage, ctx) {
    const root = stage.querySelector('.rf-ac');
    const set = (k) => {
      root.querySelectorAll('.rf-ac-set').forEach((g) => g.classList.toggle('on', g.dataset.set === k));
      root.querySelectorAll('.rf-ac-rg button').forEach((b) => b.classList.toggle('on', b.dataset.set === k));
      const v = acData[k][3];
      root.querySelector('.rf-ac-svg circle').setAttribute('cy', 86 - v / 4.5 * 86);
      root.querySelector('.rf-ac-tip em').textContent = `${v} h`;
    };
    set('周');
    ctx.on(root, 'click', (e) => { const b = e.target.closest('.rf-ac-rg button'); if (b) set(b.dataset.set); });
  }
});

/* ============================== R18 小米 ============================== */
const squircle = (() => {
  // 超椭圆 |x|⁵ + |y|⁵ = 1，换算到 0..1 的包围盒
  const n = 5, pts = [];
  for (let i = 0; i < 96; i++) {
    const t = i / 96 * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    pts.push([(0.5 + 0.5 * Math.sign(c) * Math.abs(c) ** (2 / n)).toFixed(4), (0.5 + 0.5 * Math.sign(s) * Math.abs(s) ** (2 / n)).toFixed(4)]);
  }
  return 'M' + pts.map((p) => p.join(',')).join('L') + 'Z';
})();
const miWave = (w, h, sw = 2) => `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">
  <path d="${curve(sqw(1), [-0.4, 2 * Math.PI + 0.4], [-1.5, 1.5], w, h)}" stroke="#d6d6d6" stroke-width="${sw}" fill="none"/>
  <path d="${curve(sqw(3), [-0.4, 2 * Math.PI + 0.4], [-1.5, 1.5], w, h)}" stroke="#ffb27a" stroke-width="${sw}" fill="none"/>
  <path d="${curve(sqw(12), [-0.4, 2 * Math.PI + 0.4], [-1.5, 1.5], w, h, 400)}" stroke="#ff6900" stroke-width="${sw * 1.2}" fill="none"/>
</svg>`;
const miThumb = (bg, inner) => `<i class="rf-mi-sq" style="background:${bg}">${inner}</i>`;
const R18 = tile({
  code: 'R18', name: '小米式', en: 'Xiaomi', meta: '消费电子 · 官网',
  desc: '干净的白底和浅灰 #f5f5f5 分区，唯一的强调色是橙 #FF6900（价格、按钮、选中态）。最有辨识度的形状是「超椭圆」：比圆角矩形更饱满、曲率连续的圆角（这里的产品框、缩略图、图标底都是 |x|⁵+|y|⁵=1）。首屏产品居中、名称简短；左边是半透明深灰的分类菜单。商品卡片白底、无边框，悬停时上浮并出现大而淡的阴影。',
  more: '颜色为近似；原字体 MiSans 不在公开字库里，这里用思源黑体。没有使用小米的标志（橙色超椭圆里的白字），超椭圆只用在产品图和图标上。适合数学网站的「新章节发布」或课程商城式的目录页。卡片可以悬停。',
  kw: ['#FF6900', '超椭圆', '白底产品居中', '分类侧栏', '卡片上浮'],
  css: `--orange: #ff6900;  --text: #333333;  --text-2: #757575;  --text-3: #b0b0b0;
--bg-section: #f5f5f5;  --topbar: #333333;
font-family: MiSans, "PingFang SC", "Noto Sans SC", sans-serif;
/* 超椭圆：|x|^5 + |y|^5 = 1，用 SVG clipPath（objectBoundingBox）裁切 */
.squircle { clip-path: url(#squircle); }
/* 新版浏览器也可以：border-radius: 30%; corner-shape: superellipse(2); */
.card { background: #fff; transition: all .2s linear; }
.card:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,.1); }
.price { color: #ff6900; }`,
  links: [['mi.com', 'https://www.mi.com/']],
  bg: '#ffffff',
  html: pg('rf-mi', `
    <svg class="rf-mi-defs" width="0" height="0" aria-hidden="true"><clipPath id="r18-sq" clipPathUnits="objectBoundingBox"><path d="${squircle}"/></clipPath></svg>
    <p class="rf-mi-top rf-w"><span>学习中心</span><i></i><span>题库</span><i></i><span>社区</span><i></i><span>下载 App</span><i></i><span>问题反馈</span><span class="rf-mi-sp"></span><span>登录</span><i></i><span>注册</span><i></i><span>消息通知</span><b>${ic('bag')}书包（0）</b></p>
    <header class="rf-mi-hd">
      <b class="rf-mi-mk">分析学</b>
      <nav class="rf-w"><span>幂级数</span><span>泰勒展开</span><span class="on">傅里叶级数</span><span>积分</span><span>微分</span><span>极限</span><span>习题</span></nav>
      <span class="rf-mi-search"><span>搜索章节名称</span><i>${ic('search')}</i></span>
      <span class="rf-o rf-mi-u">${ic('user')}</span>
    </header>
    <nav class="rf-mi-tabs rf-o"><span class="on">推荐</span><span>幂级数</span><span>积分</span><span>微分</span><span>极限</span></nav>
    <section class="rf-mi-hero">
      <aside class="rf-mi-cat rf-w">${['极限与连续', '导数与微分', '中值定理', '不定积分', '定积分', '数项级数', '函数项级数', '傅里叶级数'].map((c) => `<p>${c}${ic('chevR')}</p>`).join('')}</aside>
      <div class="rf-mi-banner">
        <h1>傅里叶级数</h1>
        <p class="rf-mi-sub">方波 · 谐波叠加 · 吉布斯现象</p>
        <p class="rf-mi-price"><b>免费学习</b><button type="button" class="rf-mi-btn">立即学习</button></p>
        <div class="rf-mi-prod"><div class="rf-mi-dev">${miWave(170, 70, 2.2)}<span>S<sub>12</sub>(x)</span></div></div>
        <span class="rf-mi-arr l rf-w">${ic('chevL')}</span><span class="rf-mi-arr r rf-w">${ic('chevR')}</span>
        <p class="rf-mi-dots rf-w"><i class="on"></i><i></i><i></i><i></i></p>
      </div>
    </section>
    <section class="rf-mi-shelf rf-w">
      <p class="rf-mi-sh"><b>推荐章节</b><span>查看全部 ${ic('chevR')}</span></p>
      <div class="rf-mi-cards">
        ${[['linear-gradient(135deg,#fff1e6,#ffd9bd)', '泰勒展开', '一阶一阶，逼近原函数', '8 课时'], ['linear-gradient(135deg,#eef3ff,#cfdcff)', '黎曼积分', '分割、求和、取极限', '12 课时'], ['linear-gradient(135deg,#eafaf1,#c3ecd3)', '一致收敛', '一个 N 管住全体 x', '9 课时'], ['linear-gradient(135deg,#f4efff,#ddd0ff)', '幂级数', '收敛半径与逐项求导', '10 课时']].map(([bg, t, d, n], i) => `<div class="rf-mi-card">${miThumb(bg, `<svg viewBox="0 0 60 60" aria-hidden="true"><path d="${[curve((x) => Math.sin(x) * 0.9 + (x > 0 ? 0 : 0), [-3, 3], [-1.6, 1.6], 60, 60), curve((x) => x * x, [-1.3, 1.3], [-0.2, 2], 60, 60), curve((x) => Math.pow(Math.abs(x), 1 + 4 * 1) * Math.sign(x), [-1, 1], [-1.2, 1.2], 60, 60), curve((x) => 1 / (1 - x), [-2, 0.6], [0, 3], 60, 60)][i]}" stroke="${['#ff6900', '#3a6cf4', '#1aa260', '#7b4dff'][i]}" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`)}<b>${t}</b><small>${d}</small><em>${n}</em></div>`).join('')}
      </div>
    </section>
    <div class="rf-mi-icons rf-o">${[['#ff6900', '#fff1e6', 'star', '新课'], ['#3a6cf4', '#eef3ff', 'note', '题库'], ['#e5484d', '#ffecec', 'bookmark', '错题'], ['#1aa260', '#eafaf1', 'chart', '排行'], ['#7b4dff', '#f4efff', 'user', '社区']].map(([c, b, n, t]) => `<span><i style="background:${b};color:${c}">${ic(n)}</i>${t}</span>`).join('')}</div>`)
});

/* ============================== R19 MUJI ============================== */
const R19 = tile({
  code: 'R19', name: 'MUJI 无印良品式', en: 'MUJI', meta: '生活用品 · 官网',
  desc: '近乎「没有设计」的设计：白底、细细的 1px 浅线、小字号（11–12px）、宽松的字距和大量空白，没有阴影、没有圆角、几乎没有图标。主视觉是牛皮纸、再生纸、原木这些未经修饰的材料，平铺直拍；文字安静地放在一边。唯一的颜色是一点暗红 #7f0019（近似），只用在小小的「新品」字样上。',
  more: '颜色为近似；没有使用 MUJI 的标志（暗红方块里的白字）。中文用思源黑体的细体。侘寂感来自「素材本身的质感 + 克制的文字」：适合数学网站里讲义下载、笔记模板、学习用品推荐这类安静的页面，或者整站想要「朴素、可信」的气质时借用它的字号和留白。',
  kw: ['牛皮纸', '暗红 #7f0019', '极简', '小字号', '侘寂'],
  css: `--kraft: #c9b28e;  --paper: #f4f1ec;  --burgundy: #7f0019;
--text: #3c3c3c;  --text-2: #7a7a7a;  --line: #e5e0d8;
font-family: "Hiragino Kaku Gothic ProN", "PingFang SC", "Noto Sans SC", sans-serif;
body { font-size: 12px; letter-spacing: .06em; font-weight: 300; }
.section-title { border-bottom: 1px solid var(--line); }
.label-new { color: var(--burgundy); font-size: 10px; letter-spacing: .2em; }
.hero { background: var(--kraft) url(paper-grain.png); }
/* 没有阴影，没有圆角 */`,
  links: [['muji.com', 'https://www.muji.com/']],
  bg: '#ffffff',
  html: pg('rf-mj', `
    <header class="rf-mj-hd">
      <span class="rf-o">${ic('menu')}</span>
      <b class="rf-mj-mk">分析学</b>
      <nav class="rf-w"><span>讲义</span><span>习题</span><span>文具</span><span>阅读</span><span>关于</span></nav>
      <span class="rf-mj-sp"></span>
      <span class="rf-mj-ico">${ic('search', 'rf-w')}${ic('heart', 'rf-w')}${ic('bag')}</span>
    </header>
    <section class="rf-mj-hero">
      <div class="rf-mj-copy">
        <p class="rf-mj-new">新学期</p>
        <h1>只写必要的推导。</h1>
        <p class="rf-mj-sub rf-w">再生纸方格笔记本 · A5<br>第 3 章　幂级数</p>
        <p class="rf-mj-link">查看详情 ›</p>
      </div>
      <div class="rf-mj-still">
        <div class="rf-mj-book"><i class="rf-mj-lbl"><b>幂级数</b><small>NOTE · A5 · 5mm</small></i></div>
        <div class="rf-mj-pencil"></div>
        <div class="rf-mj-ruler"></div>
        <div class="rf-mj-eraser"><i></i></div>
      </div>
    </section>
    <section class="rf-mj-sec">
      <p class="rf-mj-st"><b>新品</b><span>NEW</span><i></i><em>查看全部 ›</em></p>
      <div class="rf-mj-grid">
        <div class="rf-mj-item"><div class="rf-mj-ph"><i class="rf-mj-o1"></i></div><b>再生纸方格本</b><small>第 3 章 · 24 页</small></div>
        <div class="rf-mj-item"><div class="rf-mj-ph"><i class="rf-mj-o2"></i></div><b>铝制圆规</b><small>作图用 · 15 cm</small></div>
        <div class="rf-mj-item rf-w"><div class="rf-mj-ph"><i class="rf-mj-o3"></i></div><b>索引卡片</b><small>定理卡 · 50 张</small></div>
        <div class="rf-mj-item rf-w"><div class="rf-mj-ph"><i class="rf-mj-o4"></i></div><b>透明量角器</b><small>180° · 10 cm</small></div>
      </div>
    </section>`)
});

/* ============================== R20 Shopify Polaris ============================== */
const poRow = (k, t, badge, tone, n, rate, type) => `<div class="rf-po-tr"><label class="rf-po-ck"><input type="checkbox" class="no-pagekeys"><i></i></label><span class="rf-po-th" style="background:${['#fff1e6', '#eef3ff', '#eafaf1', '#f4efff', '#fff8db'][k]}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${[curve(Math.sin, [-3.2, 3.2], [-1.4, 1.4], 24, 24), curve((x) => x * x, [-1.2, 1.2], [-0.2, 1.6], 24, 24), curve(sqw(4), [-3.2, 3.2], [-1.6, 1.6], 24, 24), curve(Math.exp, [-2, 1], [0, 3], 24, 24), curve((x) => 1 / x, [0.3, 3], [0, 3.4], 24, 24)][k]}" stroke="${['#c05717', '#2c6ecb', '#0c8a4e', '#6b3fd4', '#a37b00'][k]}" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg></span><b class="rf-po-t">${t}</b><span><em class="rf-po-bd ${tone}">${badge}</em></span><span class="rf-po-n rf-w">${n}</span><span class="rf-po-n rf-w">${rate}</span><span class="rf-po-ty rf-w">${type}</span></div>`;
const R20 = tile({
  code: 'R20', name: 'Shopify Polaris 式', en: 'Shopify Polaris', meta: 'Shopify · 商家后台设计系统',
  desc: '（在 Polaris 和 Atlassian 之间选了 Polaris。）浅灰 #f1f1f1 画布上放白色卡片，卡片圆角 12px、边缘有一道极细的「斜面」阴影；顶栏是近黑 #1a1a1a，左侧导航是 #ebebeb 灰，选中项是一块白。主按钮是深灰 #303030 带微妙渐变和内高光的「实体」按钮（2023 年改版后的标志），次按钮是带底部阴影的白按钮。状态用圆角胶囊徽章：绿 #affebf「已发布」、蓝「草稿」。',
  more: '颜色为近似；Polaris 本身就用 Inter 字体。适合数学网站的老师端 / 管理后台：章节管理、发布状态、学员数据。比 Ant Design 更柔和、更「有触感」。勾选一行，表头会变成批量操作栏。',
  kw: ['#f1f1f1 画布', '12px 卡片', '实体感按钮', '状态徽章', '#1a1a1a 顶栏'],
  css: `--p-color-bg: #f1f1f1;  --p-color-bg-surface: #ffffff;  --p-color-text: #303030;
--p-color-text-secondary: #616161;  --p-color-border: #e3e3e3;
--p-color-bg-fill-brand: #303030;  --p-color-bg-fill-success: #affebf;
font-family: Inter, -apple-system, "San Francisco", "Segoe UI", sans-serif;
.card { border-radius: 12px; box-shadow: 0 1px 0 0 rgba(26,26,26,.07),
        inset 0 -1px 0 0 rgba(0,0,0,.13), inset 0 0 0 1px rgba(0,0,0,.08); }
.btn-primary { background: linear-gradient(180deg, rgba(48,48,48,0) 63.5%, rgba(255,255,255,.15)), #303030;
  border-radius: 8px; color: #fff; box-shadow: inset 0 -1px 0 1px rgba(0,0,0,.8),
  inset 0 0 0 1px #303030, inset 0 .5px 0 1.5px rgba(255,255,255,.25); }
.badge { border-radius: 8px; padding: 2px 8px; font-size: 12px; }`,
  links: [['Polaris', 'https://polaris.shopify.com/'], ['Atlassian Design', 'https://atlassian.design/']],
  bg: '#f1f1f1',
  html: pg('rf-po', `
    <header class="rf-po-top">
      <span class="rf-o rf-po-ham">${ic('menu')}</span>
      <b class="rf-po-mk"><i>∂</i><span class="rf-w">分析学</span></b>
      <span class="rf-po-search">${ic('search')}<span>搜索</span><kbd class="rf-w">⌘</kbd><kbd class="rf-w">K</kbd></span>
      <span class="rf-po-sp rf-w"></span>
      <span class="rf-po-ib rf-w">${ic('bell')}</span>
      <span class="rf-po-store"><i>MA</i><span class="rf-w">数学分析课</span></span>
    </header>
    <aside class="rf-po-nav rf-w">
      <p>${ic('home')}首页</p>
      <p class="on">${ic('book')}章节</p>
      <p class="sub on">全部章节</p><p class="sub">合集</p><p class="sub">草稿</p>
      <p>${ic('user')}学员</p><p>${ic('note')}习题</p><p>${ic('chart')}数据分析</p>
      <p class="rf-po-set">${ic('gear')}设置</p>
    </aside>
    <main class="rf-po-main">
      <div class="rf-po-ph"><h1>${ic('book')}章节</h1><span class="rf-po-sp"></span><button type="button" class="rf-po-btn rf-w">导出</button><button type="button" class="rf-po-btn rf-po-pri">添加章节</button></div>
      <section class="rf-po-card">
        <div class="rf-po-tabs"><span class="on">全部</span><span>已发布</span><span>草稿</span><span class="rf-w">已归档</span><span class="rf-po-plus">${ic('plus')}</span><span class="rf-po-sp"></span><button type="button" class="rf-po-btn rf-po-ic">${ic('search')}${ic('filter')}</button><button type="button" class="rf-po-btn rf-po-ic rf-w">${ic('sliders')}</button></div>
        <div class="rf-po-tr rf-po-thd"><label class="rf-po-ck"><input type="checkbox" class="no-pagekeys rf-po-all"><i></i></label><span class="rf-po-th0"></span><b class="rf-po-t">章节</b><span>状态</span><span class="rf-po-n rf-w">学员</span><span class="rf-po-n rf-w">完成率</span><span class="rf-po-ty rf-w">类型</span></div>
        <div class="rf-po-bulk"><label class="rf-po-ck"><input type="checkbox" class="no-pagekeys rf-po-all2" checked><i></i></label><b>已选 <span class="rf-po-cnt">1</span> 项</b><button type="button" class="rf-po-btn">批量编辑</button><button type="button" class="rf-po-btn rf-w">设为草稿</button></div>
        ${poRow(0, '第 1 章 · 极限与连续', '已发布', 'ok', '1,284', '92%', '必修')}
        ${poRow(1, '第 2 章 · 导数与微分', '已发布', 'ok', '1,106', '78%', '必修')}
        ${poRow(2, '第 3 章 · 傅里叶级数', '草稿', 'info', '—', '—', '选修')}
        ${poRow(3, '第 4 章 · 幂级数', '审核中', 'warn', '312', '41%', '必修')}
        ${poRow(4, '第 5 章 · 反常积分', '已归档', 'mute', '87', '66%', '选修')}
      </section>
    </main>`),
  init(stage, ctx) {
    const root = stage.querySelector('.rf-po');
    const sync = () => {
      const rows = [...root.querySelectorAll('.rf-po-tr:not(.rf-po-thd)')];
      rows.forEach((r) => r.classList.toggle('on', r.querySelector('input').checked));
      const n = rows.filter((r) => r.classList.contains('on')).length;
      root.querySelector('.rf-po-card').classList.toggle('sel', n > 0);
      root.querySelector('.rf-po-cnt').textContent = n;
      const a2 = root.querySelector('.rf-po-all2');
      a2.checked = n === rows.length; a2.indeterminate = n > 0 && n < rows.length;
      root.querySelector('.rf-po-all').checked = false;
    };
    ctx.on(root, 'change', (e) => {
      const rows = [...root.querySelectorAll('.rf-po-tr:not(.rf-po-thd) input')];
      if (e.target.classList.contains('rf-po-all')) rows.forEach((c) => { c.checked = true; });
      if (e.target.classList.contains('rf-po-all2')) rows.forEach((c) => { c.checked = e.target.checked; });
      sync();
    });
    ctx.on(root, 'click', (e) => {
      const r = e.target.closest('.rf-po-tr:not(.rf-po-thd)');
      if (r && !e.target.closest('label')) { const c = r.querySelector('input'); c.checked = !c.checked; sync(); }
    });
  }
});

registerPages('R', [
  {
    type: 'gallery', token: 'brands-1', title: '科技公司与设计系统',
    intro: '十家科技公司的设计语言，按它们公开的设计规范重画成「我们自己的数学网站」——不是截图，也不含任何标志、商标与原文案；颜色、字体为近似。以后可以直接说「像 R01 那样」，或者「R01 的留白 + R07 的深色」。多数样品可以点、可以输入。',
    tiles: [R01, R02, R03, R04, R05, R06, R07, R08, R09, R10]
  },
  {
    type: 'gallery', token: 'brands-2', title: '消费品牌与中国设计',
    intro: '消费品牌的官网和应用，以及国内大厂的设计系统。同样是按设计语言重画、内容换成数学网站，不含任何标志与商标，颜色、字体为近似。前台页面可以借 R11–R15、R18–R19 的气质，后台与看板可以借 R16、R17、R20。',
    tiles: [R11, R12, R13, R14, R15, R16, R17, R18, R19, R20]
  }
]);
