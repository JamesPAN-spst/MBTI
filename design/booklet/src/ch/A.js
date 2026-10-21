// ===== A 章 · 艺术风格与背景 =====
// 每个样品是一张现场绘制的背景/主视觉：内联 SVG（viewBox + slice，随舞台等比缩放）、CSS 或只画一次的 canvas。

// —— 工具 ——
const r1 = (n) => Math.round(n * 10) / 10;
// mulberry32：可复现的伪随机，两份挂载画出来完全一样
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const SV = (vb, body, cls = '') => `<svg class="ar-svg${cls ? ' ' + cls : ''}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
// 过点的平滑曲线（Catmull-Rom → 三次贝塞尔）
function smooth(pts, closed = false, t = 1) {
  const n = pts.length;
  const P = (i) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6 * t, p1[1] + (p2[1] - p0[1]) / 6 * t];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6 * t, p2[1] - (p3[1] - p1[1]) / 6 * t];
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}
const poly = (pts) => pts.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ');
// 撕纸边：沿矩形四边加锯齿抖动
function torn(x, y, w, h, seed, amp = 2.2, step = 4) {
  const R = rng(seed), pts = [];
  const edge = (ax, ay, bx, by) => {
    const L = Math.hypot(bx - ax, by - ay), n = Math.max(2, Math.round(L / step));
    for (let i = 0; i < n; i++) {
      const k = i / n, nx = -(by - ay) / L, ny = (bx - ax) / L, j = (R() - 0.5) * 2 * amp;
      pts.push([ax + (bx - ax) * k + nx * j, ay + (by - ay) * k + ny * j]);
    }
  };
  edge(x, y, x + w, y); edge(x + w, y, x + w, y + h); edge(x + w, y + h, x, y + h); edge(x, y + h, x, y);
  return pts;
}
// 画布：按舞台尺寸 × DPR 画一次，尺寸变化时重画
function paintCanvas(stage, ctx, cv, draw, maxPx = 1.8e6) {
  const paint = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    let d = Math.min(window.devicePixelRatio || 1, 2);
    if (w * h * d * d > maxPx) d = Math.sqrt(maxPx / (w * h));
    const W = Math.round(w * d), H = Math.round(h * d);
    if (cv.width === W && cv.height === H) return;
    cv.width = W; cv.height = H;
    draw(cv.getContext('2d'), W, H);
  };
  const ro = new ResizeObserver(paint);
  ro.observe(stage);
  ctx.add(() => ro.disconnect());
  paint();
}
const W_ = (path) => `https://en.wikipedia.org/wiki/${path}`;

// ============================================================
// 第 1 页 · 现代艺术运动
// ============================================================

// A01 新艺术运动
const a01 = (() => {
  const leaf = (x, y, a, s = 1, f = '#7c8550') => `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0C6-7 18-8 27 0C18 8 6 7 0 0Z" fill="${f}" stroke="#4a3b26" stroke-width=".9"/><path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M2 0H23" stroke="#4a3b26" stroke-width=".6"/>`;
  const bloom = (x, y, s = 1) => {
    let p = '';
    for (let i = 0; i < 6; i++) p += `<ellipse cx="0" cy="-7.5" rx="4.6" ry="7.8" transform="rotate(${i * 60})" fill="#e7b9a0" stroke="#4a3b26" stroke-width=".9"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${p}<circle r="4.2" fill="#c8a24e" stroke="#4a3b26" stroke-width=".9"/><circle r="1.6" fill="#4a3b26"/></g>`;
  };
  const half = `<g fill="none" stroke="#4a3b26" stroke-linecap="round">
      <path d="M108 300C104 262 64 252 62 214C60 178 98 168 98 136C98 108 72 92 52 102C36 110 40 134 57 134C69 134 71 120 61 117" stroke-width="2.8"/>
      <path d="M86 300C84 280 46 270 40 244C35 220 56 206 50 184" stroke-width="1.9"/>
      <path d="M62 214C46 206 30 214 28 232C27 244 38 248 44 240" stroke-width="1.6"/>
      <path d="M98 150C114 138 116 112 104 100" stroke-width="1.4"/>
      <path d="M60 184C44 178 28 170 26 150" stroke-width="1.4"/>
      <path d="M40 244C30 262 16 266 14 282" stroke-width="1.2"/>
    </g>
    ${leaf(64, 238, -128, 1.05)}${leaf(60, 196, -60, .9, '#8f9a62')}${leaf(96, 160, -105, .8)}${leaf(46, 262, -160, .85, '#8f9a62')}${leaf(84, 120, -150, .7)}
    ${leaf(98, 182, -40, .8, '#8f9a62')}${leaf(80, 92, -20, .62, '#8f9a62')}${leaf(40, 172, -150, .6)}${leaf(78, 278, -100, .8)}${leaf(26, 270, -60, .6, '#8f9a62')}
    ${bloom(50, 182, 1.15)}${bloom(28, 232, .7)}${bloom(26, 148, .78)}
    <g fill="#e7b9a0" stroke="#4a3b26" stroke-width=".9"><path d="M104 100c-6-4-6-12 0-16c6 4 6 12 0 16Z"/><circle cx="14" cy="282" r="3" fill="#c8a24e"/></g>`;
  let spokes = '';
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    spokes += `<line x1="${r1(200 + 49 * c)}" y1="${r1(128 + 49 * s)}" x2="${r1(200 + 62 * c)}" y2="${r1(128 + 62 * s)}"/>`;
  }
  let rays = '';
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    rays += `<line x1="200" y1="128" x2="${r1(200 + 340 * Math.cos(a))}" y2="${r1(128 + 340 * Math.sin(a))}"/>`;
  }
  return SV('0 0 400 300', `<defs>
      <clipPath id="a01-in"><rect x="15" y="15" width="370" height="270"/></clipPath>
      <radialGradient id="a01-bg" cx="50%" cy="42%" r="72%"><stop offset="0" stop-color="#f5ecd3"/><stop offset="1" stop-color="#dfcea3"/></radialGradient>
      <linearGradient id="a01-arch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bdbd93"/><stop offset="1" stop-color="#8d9466"/></linearGradient>
      <g id="a01-half">${half}</g>
    </defs>
    <rect width="400" height="300" fill="url(#a01-bg)"/>
    <g clip-path="url(#a01-in)">
    <g stroke="#c8a24e" stroke-width=".7" opacity=".38">${rays}</g>
    <path d="M122 300V128A78 78 0 0 1 278 128V300Z" fill="url(#a01-arch)" stroke="#4a3b26" stroke-width="1.6"/>
    <path d="M130 300V129A70 70 0 0 1 270 129V300" fill="none" stroke="#e6d4a2" stroke-width=".9"/>
    <circle cx="200" cy="128" r="76" fill="#e2c98c" stroke="#4a3b26" stroke-width="1.5"/>
    <circle cx="200" cy="128" r="70" fill="none" stroke="#4a3b26" stroke-width=".8"/>
    <circle cx="200" cy="128" r="66" fill="none" stroke="#9c7a33" stroke-width="3.4" stroke-dasharray="0 6.9" stroke-linecap="round"/>
    <circle cx="200" cy="128" r="55.5" fill="none" stroke="#c9a451" stroke-width="13"/>
    <g stroke="#4a3b26" stroke-width=".8">${spokes}</g>
    <circle cx="200" cy="128" r="62" fill="none" stroke="#4a3b26" stroke-width=".9"/>
    <circle cx="200" cy="128" r="48" fill="#f4e9cc" stroke="#4a3b26" stroke-width="1.3"/>
    <text x="200" y="125" text-anchor="middle" font-family="Federant, serif" font-size="25" fill="#4a3b26">Analyse</text>
    <text x="200" y="143" text-anchor="middle" font-family="Federant, serif" font-size="7.2" letter-spacing="1.4" fill="#6d7546">SÉRIES ENTIÈRES</text>
    <use href="#a01-half"/><use href="#a01-half" transform="matrix(-1 0 0 1 400 0)"/>
    <rect x="132" y="246" width="136" height="30" rx="2" fill="#6d7546" stroke="#4a3b26" stroke-width="1.4"/>
    <rect x="136" y="250" width="128" height="22" fill="none" stroke="#d9bd78" stroke-width=".8"/>
    <text x="200" y="265.5" text-anchor="middle" font-family="Federant, serif" font-size="10.5" letter-spacing="3" fill="#f0dfae">LEÇON · II</text>
    </g>
    <rect x="15" y="15" width="370" height="270" fill="none" stroke="#c8a24e" stroke-width="1"/>
    <rect x="9.5" y="9.5" width="381" height="281" fill="none" stroke="#6d7546" stroke-width="3"/>
    <g fill="#c8a24e" stroke="#4a3b26" stroke-width=".8"><circle cx="15" cy="15" r="4"/><circle cx="385" cy="15" r="4"/><circle cx="15" cy="285" r="4"/><circle cx="385" cy="285" r="4"/></g>`);
})();

// A02 装饰艺术
const a02 = (() => {
  let wedges = '', rays = '', fan = '';
  for (let i = 0; i < 30; i++) {
    const a0 = Math.PI + (i / 30) * Math.PI, a1 = Math.PI + ((i + 1) / 30) * Math.PI;
    if (i % 2 === 0) wedges += `<path d="M200 300L${r1(200 + 460 * Math.cos(a0))} ${r1(300 + 460 * Math.sin(a0))}L${r1(200 + 460 * Math.cos(a1))} ${r1(300 + 460 * Math.sin(a1))}Z"/>`;
    rays += `<line x1="${r1(200 + 112 * Math.cos(a0))}" y1="${r1(300 + 112 * Math.sin(a0))}" x2="${r1(200 + 460 * Math.cos(a0))}" y2="${r1(300 + 460 * Math.sin(a0))}"/>`;
  }
  for (let i = 1; i < 9; i++) {
    const a = Math.PI + (i / 9) * Math.PI;
    fan += `<line x1="${r1(200 + 20 * Math.cos(a))}" y1="${r1(300 + 20 * Math.sin(a))}" x2="${r1(200 + 70 * Math.cos(a))}" y2="${r1(300 + 70 * Math.sin(a))}"/>`;
  }
  const step = (s) => `M${s} ${s + 14}H${s + 7}V${s + 7}H${s + 14}V${s}H${400 - s - 14}V${s + 7}H${400 - s - 7}V${s + 14}H${400 - s}V${300 - s - 14}H${400 - s - 7}V${300 - s - 7}H${400 - s - 14}V${300 - s}H${s + 14}V${300 - s - 7}H${s + 7}V${300 - s - 14}H${s}Z`;
  const zig = (x, dir) => {
    let p = `M${x} 290`;
    [[0, 108], [14, 108], [14, 126], [28, 126], [28, 144], [42, 144], [42, 162], [52, 162], [52, 10]].forEach(([dx, h]) => { p += `L${x + dir * dx} ${300 - h}`; });
    let l = '';
    [7, 21, 35].forEach((dx, i) => { l += `M${x + dir * dx} ${300 - 100 - i * 18}V290`; });
    return `<path d="${p}Z" fill="#0f1012" stroke="#d6b161" stroke-width="1.1"/><path d="${l}" stroke="#d6b161" stroke-width=".6" opacity=".7"/>`;
  };
  return SV('0 0 400 300', `<defs>
      <linearGradient id="a02-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7e7ae"/><stop offset=".46" stop-color="#cfa955"/><stop offset=".54" stop-color="#9a7431"/><stop offset="1" stop-color="#e9cf86"/></linearGradient>
      <radialGradient id="a02-fan" cx="50%" cy="100%" r="100%"><stop offset="0" stop-color="#f3dc98"/><stop offset="1" stop-color="#b48a3f"/></radialGradient>
    </defs>
    <rect width="400" height="300" fill="#0f1012"/>
    <g fill="#d6b161" opacity=".07">${wedges}</g>
    <g stroke="#d6b161" stroke-width=".7" opacity=".42">${rays}</g>
    <g fill="none" stroke="url(#a02-gold)" stroke-width="1.6"><circle cx="200" cy="300" r="84"/><circle cx="200" cy="300" r="98"/><circle cx="200" cy="300" r="112" stroke-width=".8"/></g>
    <path d="M130 300A70 70 0 0 1 270 300Z" fill="url(#a02-fan)"/>
    <g stroke="#0f1012" stroke-width="2.2">${fan}</g>
    <path d="M180 300A20 20 0 0 1 220 300Z" fill="#0f1012" stroke="url(#a02-gold)" stroke-width="1.5"/>
    ${zig(24, 1)}${zig(376, -1)}
    <g fill="none" stroke="url(#a02-gold)"><path d="${step(12)}" stroke-width="1.6"/><path d="${step(18)}" stroke-width=".7"/></g>
    <g stroke="#d6b161" stroke-width="1"><line x1="42" y1="40" x2="42" y2="140"/><line x1="48" y1="40" x2="48" y2="128"/><line x1="54" y1="40" x2="54" y2="116"/><line x1="358" y1="40" x2="358" y2="140"/><line x1="352" y1="40" x2="352" y2="128"/><line x1="346" y1="40" x2="346" y2="116"/></g>
    <g fill="none" stroke="url(#a02-gold)" stroke-width="1.2"><path d="M118 52H184M216 52H282"/><path d="M200 44L208 52L200 60L192 52Z" fill="#d6b161"/></g>
    <text x="200" y="104" text-anchor="middle" font-family="Limelight, serif" font-size="40" letter-spacing="5" fill="url(#a02-gold)">ANALYSE</text>
    <text x="200" y="128" text-anchor="middle" font-family="'Poiret One', sans-serif" font-size="11.5" letter-spacing="5.5" fill="#e6cd8a">SÉRIES · LEÇON II</text>
    <path d="M150 142H250" stroke="#d6b161" stroke-width=".8"/>`);
})();

// A03 包豪斯
const a03 = SV('0 0 400 300', `
    <rect width="400" height="300" fill="#ede6d6"/>
    <g stroke="#1b1b1b" stroke-width=".5" opacity=".18"><path d="M100 0V300M200 0V300M300 0V300M0 100H400M0 200H400"/></g>
    <circle cx="300" cy="104" r="84" fill="#d8361f"/>
    <path d="M216 104A84 84 0 0 1 300 20V104Z" fill="#1b1b1b"/>
    <rect x="28" y="168" width="104" height="104" fill="#1f4ea1"/>
    <path d="M132 272L200 154L268 272Z" fill="#f1b300"/>
    <rect x="0" y="272" width="400" height="10" fill="#1b1b1b"/>
    <rect x="326" y="186" width="12" height="86" fill="#1b1b1b"/>
    <path d="M346 272A42 42 0 0 1 388 230V272Z" fill="#1f4ea1"/>
    <circle cx="80" cy="220" r="22" fill="#ede6d6"/>
    <circle cx="200" cy="232" r="9" fill="#1b1b1b"/>
    <text x="26" y="66" font-family="Jost, sans-serif" font-weight="700" font-size="44" letter-spacing="-1" fill="#1b1b1b">analysis</text>
    <rect x="28" y="80" width="150" height="5" fill="#1b1b1b"/>
    <text x="28" y="104" font-family="Jost, sans-serif" font-weight="500" font-size="12.5" fill="#1b1b1b">kurs 2 — reihen und folgen</text>
    <text transform="translate(392 176) rotate(-90)" font-family="Jost, sans-serif" font-weight="500" font-size="9" letter-spacing="2.5" fill="#1b1b1b">weimar · 1923</text>`);

// A04 构成主义
const a04 = SV('0 0 400 300', `<defs>
      <filter id="a04-paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .22  0 0 0 0 .12  0 0 0 -1.6 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    </defs>
    <rect width="400" height="300" fill="#e8dcc0"/>
    <path d="M232 0H400V300H168Z" fill="#151413"/>
    <circle cx="306" cy="132" r="66" fill="#e8dcc0"/>
    <path d="M14 30L58 168L296 123Z" fill="#c8241f"/>
    <g stroke="#151413" stroke-width="2.2"><path d="M0 300L274 0"/><path d="M14 300L286 4" stroke-width="1"/></g>
    <rect x="300" y="226" width="34" height="34" fill="#c8241f" transform="rotate(-24 317 243)"/>
    <g transform="rotate(-24 150 196)">
      <rect x="22" y="170" width="214" height="54" fill="#151413"/>
      <text x="30" y="216" font-family="Oswald, sans-serif" font-weight="700" font-size="54" letter-spacing="1" fill="#e8dcc0">АНАЛИЗ</text>
      <rect x="22" y="228" width="150" height="19" fill="#c8241f"/>
      <text x="29" y="242.5" font-family="Oswald, sans-serif" font-weight="500" font-size="12" letter-spacing="2.4" fill="#e8dcc0">РЯДЫ · ЛЕКЦИЯ № 2</text>
    </g>
    <text x="384" y="40" text-anchor="end" font-family="Oswald, sans-serif" font-weight="700" font-size="26" fill="#c8241f">1924</text>
    <rect width="400" height="300" filter="url(#a04-paper)" opacity=".5"/>`);

// A05 风格派
const a05 = (() => {
  const B = '#151515';
  const cells = [['#d42a1c', 106, 0, 294, 180], ['#1d4b9b', 0, 190, 96, 110], ['#f3cc12', 350, 265, 50, 35]];
  const bars = [[96, 0, 10, 300], [0, 180, 400, 10], [0, 88, 96, 10], [340, 190, 10, 110], [350, 255, 50, 10], [42, 98, 9, 82]];
  return SV('0 0 400 300', `<rect width="400" height="300" fill="#f2efe6"/>
    ${cells.map(([c, x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`).join('')}
    ${bars.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${B}"/>`).join('')}
    <text x="122" y="234" font-family="Archivo, sans-serif" font-weight="900" font-size="26" letter-spacing="-.5" fill="${B}">Analyse</text>
    <text x="123" y="255" font-family="Archivo, sans-serif" font-weight="400" font-size="11" fill="${B}">定理 3.2 · 一致收敛</text>
    <text x="123" y="284" font-family="'JetBrains Mono', monospace" font-size="8" fill="#555">composition · 1930</text>`);
})();

// A06 波普艺术
const a06 = (() => {
  const R = rng(66), pts = [];
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 44 + R() * 8 : 78 + R() * 22;
    pts.push([118 + r * Math.cos(a) * 1.15, 196 + r * Math.sin(a)]);
  }
  return SV('0 0 400 300', `<defs>
      <pattern id="a06-dots" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="4.5" cy="4.5" r="2.6" fill="#3d7fe0"/></pattern>
      <pattern id="a06-red" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3.5" cy="3.5" r="2" fill="#e8302a"/></pattern>
    </defs>
    <rect width="400" height="300" fill="#f6f1e2"/>
    <rect width="400" height="300" fill="url(#a06-dots)"/>
    <path d="M0 214L400 150V300H0Z" fill="#ffd21f"/>
    <path d="M0 214L400 150V300H0Z" fill="url(#a06-red)" opacity=".55"/>
    <polygon points="${poly(pts)}" fill="#fff4b0" stroke="#111" stroke-width="5" stroke-linejoin="round"/>
    <polygon points="${poly(pts.map(([x, y]) => [118 + (x - 118) * .72, 196 + (y - 196) * .72]))}" fill="#e8302a"/>
    <text x="118" y="210" text-anchor="middle" font-family="Bangers, sans-serif" font-size="44" letter-spacing="1" fill="#ffe94a" stroke="#111" stroke-width="2.2" paint-order="stroke" transform="rotate(-8 118 196)">POW!</text>
    <path d="M206 34H372Q388 34 388 50V112Q388 128 372 128H300L262 158L272 128H206Q190 128 190 112V50Q190 34 206 34Z" fill="#fff" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
    <text font-family="Bangers, sans-serif" font-size="21" letter-spacing=".6" fill="#111" text-anchor="middle"><tspan x="289" y="72">OH, BRAD…</tspan><tspan x="289" y="98">IT CONVERGES!</tspan></text>
    <rect x="3" y="3" width="394" height="294" fill="none" stroke="#111" stroke-width="6"/>`);
})();

// A07 迷幻艺术：极坐标里扭曲的色带，画一次，CSS 慢慢旋转
function a07draw(c, S) {
  const img = c.createImageData(S, S), d = img.data;
  const pal = [[255, 40, 140], [120, 230, 60], [255, 120, 0], [40, 90, 255], [255, 225, 0], [150, 40, 210]];
  const cx = S / 2, cy = S / 2, k = 1 / (S / 2);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const dx = (x - cx) * k, dy = (y - cy) * k, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
      const v = r * 12 + a * 3 / Math.PI + Math.sin(a * 5 + r * 7) * (0.35 + r * 0.6) + Math.sin(a * 11 - r * 14) * 0.12;
      const band = ((Math.floor(v) % 6) + 6) % 6, edge = v - Math.floor(v);
      const p = pal[band], o = (y * S + x) * 4, s = edge < 0.07 ? 0.2 : 1;
      d[o] = p[0] * s; d[o + 1] = p[1] * s; d[o + 2] = p[2] * s; d[o + 3] = 255;
    }
  }
  c.putImageData(img, 0, 0);
}

// A08 孟菲斯
const a08 = (() => {
  const R = rng(808);
  let specks = '';
  for (let i = 0; i < 70; i++) {
    const x = R() * 400, y = R() * 300, s = 1.2 + R() * 2.4, a = R() * 180;
    specks += `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(s * 1.6)}" height="${r1(s)}" rx="${r1(s / 2)}" transform="rotate(${r1(a)} ${r1(x)} ${r1(y)})" fill="${['#141414', '#141414', '#ff5d8f', '#2b59ff'][i % 4]}"/>`;
  }
  let squig = 'M20 54';
  for (let i = 0; i < 7; i++) squig += `q${7} ${i % 2 ? 12 : -12} 14 0`;
  let zig = 'M300 254';
  for (let i = 0; i < 6; i++) zig += `l9 ${i % 2 ? 12 : -12}`;
  return SV('0 0 400 300', `<defs>
      <pattern id="a08-grid" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.4" fill="#141414"/></pattern>
      <pattern id="a08-str" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3.2" height="7" fill="#141414"/></pattern>
    </defs>
    <rect width="400" height="300" fill="#fbe8de"/>
    ${specks}
    <circle cx="334" cy="74" r="48" fill="#ff6f91"/><circle cx="326" cy="66" r="48" fill="none" stroke="#141414" stroke-width="2.4"/>
    <rect x="24" y="190" width="86" height="64" fill="url(#a08-grid)"/>
    <path d="M60 236L118 160L150 250Z" fill="#ffcf3f" stroke="#141414" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M232 300A52 52 0 0 1 336 300Z" fill="#2b59ff"/>
    <path d="M232 300A52 52 0 0 1 336 300" fill="url(#a08-str)" opacity=".9" transform="translate(16 -10) scale(1)" clip-path="none"/>
    <rect x="352" y="196" width="34" height="34" fill="#73d2b8" stroke="#141414" stroke-width="2.4" transform="rotate(14 369 213)"/>
    <path d="${squig}" fill="none" stroke="#141414" stroke-width="4" stroke-linecap="round"/>
    <path d="${zig}" fill="none" stroke="#ff5d8f" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M178 40a14 14 0 1 1 28 0" fill="none" stroke="#2b59ff" stroke-width="6" stroke-linecap="round"/>
    <g fill="#141414"><rect x="196" y="244" width="8" height="8"/><rect x="212" y="244" width="8" height="8"/><rect x="204" y="252" width="8" height="8"/><rect x="196" y="260" width="8" height="8"/><rect x="212" y="260" width="8" height="8"/></g>
    <rect x="128" y="104" width="190" height="78" rx="4" fill="#fff" stroke="#141414" stroke-width="2.6"/>
    <rect x="136" y="112" width="190" height="78" rx="4" fill="none" stroke="#141414" stroke-width="1.2"/>
    <text x="223" y="152" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="34" letter-spacing="-1" fill="#141414">Analysis!</text>
    <text x="223" y="170" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="500" font-size="11" fill="#141414">第 2 讲 · 级数与收敛</text>`);
})();

// A09 极简主义（宽格）
const a09 = SV('0 0 800 350', `<rect width="800" height="350" fill="#f1efea"/>
    <circle cx="560" cy="160" r="86" fill="#d7432b"/>
    <text x="64" y="278" font-family="'Instrument Sans', sans-serif" font-weight="500" font-size="22" letter-spacing=".3" fill="#1d1d1b">Analyse</text>
    <text x="65" y="302" font-family="'Instrument Sans', 'Noto Sans SC', sans-serif" font-size="13" letter-spacing="1.4" fill="#8a8780">极限 · 连续 · 级数</text>`);

// A10 达达拼贴
const a10 = (() => {
  const R = rng(1010);
  let news = '';
  for (let col = 0; col < 4; col++) {
    for (let i = 0; i < 34; i++) {
      const x = 10 + col * 98, y = 12 + i * 8.4, w = 84 - (R() < 0.15 ? R() * 50 : R() * 8);
      news += `<rect x="${x}" y="${r1(y)}" width="${r1(w)}" height="3.2" fill="#7b7466" opacity="${r1(0.35 + R() * 0.25)}"/>`;
    }
  }
  const piece = (pts, fill, white = true) => (white ? `<polygon points="${poly(pts.map(([x, y]) => [x + 1.4, y + 1.6]))}" fill="#fbf7ec"/>` : '') + `<polygon points="${poly(pts)}" fill="${fill}"/>`;
  const L = [['收', "'Noto Serif SC', serif", 900, '#111', '#f4e04d', -6], ['敛', "'Noto Sans SC', sans-serif", 900, '#fff', '#c8372d', 5], ['？', "'Bodoni Moda', serif", 700, '#111', '#fbf7ec', -3]];
  let ransom = '';
  L.forEach(([ch, f, w, c, bg, a], i) => {
    const x = 214 + i * 46, y = 206 + (i % 2) * 10;
    ransom += `<g transform="rotate(${a} ${x + 20} ${y + 20})"><polygon points="${poly(torn(x, y, 42, 46, 50 + i, 1.2, 5))}" fill="${bg}"/><text x="${x + 21}" y="${y + 36}" text-anchor="middle" font-family="${f}" font-weight="${w}" font-size="32" fill="${c}">${ch}</text></g>`;
  });
  let ht = '';
  for (let y = 40; y < 144; y += 5.2) {
    for (let x = 56; x < 186; x += 5.2) {
      const dx = (x - 112) / 40, dy = (y - 86) / 40, rr = Math.hypot(dx, dy);
      let g;
      if (rr < 1) { const nz = Math.sqrt(1 - rr * rr); g = 1 - Math.max(0, (-dx * 0.55 - dy * 0.6 + nz * 0.58)); g = 0.05 + Math.pow(g, 1.4) * 0.95; }
      else { const sh = Math.hypot((x - 126) / 50, (y - 134) / 10); g = sh < 1 ? 0.7 - sh * 0.5 : 0.04 + (y - 40) / 104 * 0.1; }
      const rad = 2.6 * Math.sqrt(Math.max(0, Math.min(1, g)));
      if (rad > 0.25) ht += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(rad)}"/>`;
    }
  }
  return SV('0 0 400 300', `<defs>
      <pattern id="a10-ht" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.2" fill="#1b1b1b"/></pattern>
      <radialGradient id="a10-fade" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
      <mask id="a10-m"><rect width="400" height="300" fill="url(#a10-fade)"/></mask>
    </defs>
    <rect width="400" height="300" fill="#e7dec9"/>
    <g transform="rotate(-2 200 150)">${news}</g>
    ${piece(torn(232, -10, 190, 130, 7, 3), '#c8372d')}
    ${piece(torn(-14, 170, 150, 150, 9, 3), '#24456f')}
    <g transform="rotate(8 120 92)">${piece(torn(52, 34, 136, 112, 11, 2.4), '#ddd6c4')}<g fill="#1b1b1b">${ht}</g></g>
    <text x="262" y="96" font-family="'Bodoni Moda', serif" font-weight="900" font-size="74" fill="#f3ead6" transform="rotate(-10 262 96)">3.2</text>
    <g font-weight="900">
      <text x="20" y="44" font-family="Archivo, sans-serif" font-size="40" fill="#111" transform="rotate(-8 20 44)">D</text>
      <text x="196" y="36" font-family="'Bodoni Moda', serif" font-style="italic" font-size="34" fill="#c8372d" transform="rotate(12 196 36)">a</text>
      <text x="22" y="252" font-family="'Bodoni Moda', serif" font-size="58" fill="#f3ead6" transform="rotate(-4 22 252)">D</text>
      <text x="96" y="282" font-family="'JetBrains Mono', monospace" font-size="36" fill="#f4e04d" transform="rotate(10 96 282)">a</text>
    </g>
    <path d="M150 168L346 148" stroke="#111" stroke-width="3"/><path d="M346 148l-12-7 2 14z" fill="#111"/>
    ${ransom}
    <g transform="rotate(-14 330 270)" fill="none" stroke="#c8372d" stroke-width="2.2" opacity=".85"><circle cx="330" cy="270" r="24"/><circle cx="330" cy="270" r="19" stroke-width="1"/><text x="330" y="275" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#c8372d" stroke="none">N°7</text></g>`);
})();

const PAGE1 = [
  {
    code: 'A01', name: '新艺术运动', en: 'Art Nouveau', meta: '欧洲 · 1890–1910',
    desc: '世纪之交风靡欧洲的装饰风格，代表是慕夏（Alphonse Mucha）的招贴画。最好认的是「鞭形曲线」——像甩动的鞭子一样的 S 形植物茎蔓，加上圆形光环、拱形窗框、花卉边框，配色是哑金、橄榄绿和肉粉。网页上适合做封面、扉页、证书边框，正文要放在中间一块干净的底上。',
    more: '新艺术反对工业化的直线和重复，从植物、长发、水波里提炼曲线，主张把艺术用在日常物件上：海报、家具、首饰、巴黎地铁入口（吉马尔设计）。慕夏的典型构图是人物居中，身后一个带马赛克分格的圆形光环，四周拱形框和藤蔓，底部一条装饰字带；字体是手绘的、笔画带弧度的装饰字（这里用 Federant 近似）。不适合：信息密集的页面、需要理性干练的工具界面——满屏曲线会显得繁复、怀旧。',
    kw: ['慕夏', '鞭形曲线', '植物藤蔓', '圆形光环', '哑金橄榄绿'],
    html: a01, bg: '#efe4c6',
    links: [['Wikipedia · Art Nouveau', W_('Art_Nouveau')], ['Wikipedia · Alphonse Mucha', W_('Alphonse_Mucha')]],
    css: `/* 暖纸底 + 双线边框 + 装饰字；藤蔓用 SVG 三次贝塞尔（C 命令）画 */
.nouveau {
  background: radial-gradient(circle at 50% 42%, #f5ecd3, #dfcea3);
  border: 3px solid #6d7546;
  outline: 1px solid #c8a24e; outline-offset: -10px;
}
.nouveau h1 { font-family: 'Federant', serif; color: #4a3b26; }
.nouveau .halo { border-radius: 50%; background: #e2c98c;
  box-shadow: 0 0 0 6px #c9a451, 0 0 0 7px #4a3b26; }`
  },
  {
    code: 'A02', name: '装饰艺术', en: 'Art Deco', meta: '法国 → 美国 · 1920–1930s',
    desc: '1925 年巴黎装饰艺术博览会得名，盛行于爵士时代的纽约（克莱斯勒大厦）。特征是黑底配金色、严格左右对称、扇形与放射线（旭日纹）、阶梯形轮廓、细长的几何字体。网页上适合高端、典礼感的首页或活动页；金线要细、留足黑底，否则就成了廉价的「土豪金」。',
    more: '装饰艺术把机器时代的速度感和古埃及、阿兹特克的阶梯金字塔结合起来：直线、折线、同心弧、旭日放射纹，材料是黑漆、黄铜、镀铬。电影《了不起的盖茨比》的视觉就是典型。字体多为细线几何无衬线（这里用 Poiret One）或高反差的展示字（Limelight）。不适合：需要长时间阅读的页面——黑底金字读久了很累；也不要和圆润可爱的元素混搭。',
    kw: ['黑金', '旭日放射', '扇形', '对称', '盖茨比'],
    html: a02, bg: '#0f1012', dark: true,
    links: [['Wikipedia · Art Deco', W_('Art_Deco')]],
    css: `/* 底部旭日放射 + 细金线 */
.deco {
  background:
    repeating-conic-gradient(from -90deg at 50% 100%,
      rgba(214,177,97,.14) 0 3deg, transparent 3deg 6deg),
    #0f1012;
  border: 1px solid #d6b161; outline: 1px solid #d6b161; outline-offset: -7px;
}
.deco h1 { font-family: 'Limelight', serif; letter-spacing: .12em;
  background: linear-gradient(#f7e7ae, #cfa955 46%, #9a7431 54%, #e9cf86);
  -webkit-background-clip: text; color: transparent; }`
  },
  {
    code: 'A03', name: '包豪斯', en: 'Bauhaus', meta: '德国 · 1919–1933',
    desc: '德国包豪斯设计学校的风格：只用红、黄、蓝三原色加黑白，只用圆、方、三角三种基本形，排在看得见或看不见的网格上；字体是几何无衬线，常常全小写。网页上适合做大胆的着陆页、课程封面；正文区仍要回到白底黑字，色块只占边角。',
    more: '包豪斯主张「形式追随功能」，把艺术、手工艺和工业生产结合，是现代设计教育的源头。康定斯基曾做过问卷，认为黄配三角、红配方、蓝配圆最协调（这里的黄三角、蓝方、红圆就借用了这个梗）。代表人物：格罗皮乌斯、康定斯基、克利、拜耶（发明了全小写的「通用字体」）。不适合：需要温和、亲切气质的页面；三原色大色块很抢眼，用多了像儿童玩具。',
    kw: ['三原色', '圆方三角', '网格', '几何无衬线', '全小写'],
    html: a03, bg: '#ede6d6',
    links: [['Wikipedia · Bauhaus', W_('Bauhaus')]],
    css: `.bauhaus { background: #ede6d6; position: relative; }
.bauhaus::before { /* 红圆 */
  content: ""; position: absolute; right: 8cqw; top: 6cqh;
  width: 42cqw; aspect-ratio: 1; border-radius: 50%; background: #d8361f; }
.bauhaus::after { /* 黄三角 */
  content: ""; position: absolute; left: 33cqw; bottom: 6cqh;
  width: 34cqw; aspect-ratio: 1.15; background: #f1b300;
  clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.bauhaus h1 { font-family: 'Jost', sans-serif; font-weight: 700;
  text-transform: lowercase; letter-spacing: -.02em; }`
  },
  {
    code: 'A04', name: '构成主义', en: 'Constructivism', meta: '苏联 · 1915–1930s',
    desc: '十月革命后苏联先锋派的海报风格：红、黑两色加旧纸色，强烈的对角线构图，楔形、圆、粗黑条，粗体无衬线大字斜着排。代表是利西茨基《以红色楔子打击白军》——红色三角刺入白色圆形。网页上适合有冲击力的宣言式首页、活动海报。',
    more: '构成主义把艺术当作「建造」：几何形和文字像机器零件一样组装，服务于宣传和工业。代表人物：利西茨基（El Lissitzky）、罗德琴科（Rodchenko）、斯捷潘诺娃。斜线制造运动感，红黑白的高反差制造紧迫感；常配照片拼贴。这里的西里尔文 АНАЛИЗ 意为「分析」。不适合：需要平静、专注阅读的学习页面——它天生是「喊口号」的视觉；斜排文字也不能用于正文。',
    kw: ['红黑', '对角线', '红色楔子', '粗体斜排', '苏联海报'],
    html: a04, bg: '#e8dcc0',
    links: [['Wikipedia · Constructivism (art)', W_('Constructivism_(art)')], ['Wikipedia · El Lissitzky', W_('El_Lissitzky')]],
    css: `.constructivist {
  background: linear-gradient(105deg, #e8dcc0 58%, #151413 58%);
}
.constructivist .wedge { position: absolute; left: 4cqw; top: 20cqh;
  width: 70cqw; height: 50cqh; background: #c8241f;
  clip-path: polygon(0 0, 100% 45%, 14% 100%); }
.constructivist h1 { font-family: 'Oswald', sans-serif; font-weight: 700;
  transform: rotate(-24deg); background: #151413; color: #e8dcc0;
  padding: 0 .2em; text-transform: uppercase; }`
  },
  {
    code: 'A05', name: '风格派', en: 'De Stijl', meta: '荷兰 · 1917–1931',
    desc: '荷兰的抽象艺术运动，代表是蒙德里安的《红黄蓝构成》：粗黑直线把画面切成大小不等的矩形，只填红、黄、蓝和白，绝对不用曲线和斜线，构图不对称但平衡。网页上很适合当布局灵感——每个白格就是一个内容区，色块做强调。',
    more: '风格派（荷兰语 De Stijl，意为「风格」）追求「纯粹抽象」：只保留水平线、垂直线和原色。成员有蒙德里安、范杜斯堡、里特维尔德（红蓝椅、施罗德住宅）。它对后来的网格系统、便当盒布局影响很大。要点：黑线粗细一致；大块白、小块色；颜色块少而不对称。不适合：需要柔和、有机感的主题；色块太多就失去了它的克制。',
    kw: ['蒙德里安', '黑线网格', '红黄蓝', '矩形色块', '不对称平衡'],
    html: a05, bg: '#f2efe6',
    links: [['Wikipedia · De Stijl', W_('De_Stijl')], ['Wikipedia · Piet Mondrian', W_('Piet_Mondrian')]],
    css: `/* 用 grid 的 gap 当黑线
   <div class="mondrian"><i></i><i class="red"></i><i class="blue"></i>
     <i></i><i></i><i></i><i class="yellow"></i></div> */
.mondrian {
  display: grid; gap: 2.5cqw; background: #151515;
  grid-template-columns: 24fr 60fr 12fr;
  grid-template-rows: 58fr 30fr 12fr;
}
.mondrian > * { background: #f2efe6; }
.mondrian .red { background: #d42a1c; grid-column: 2 / 4; }
.mondrian .blue { background: #1d4b9b; grid-row: 2 / 4; }
.mondrian .yellow { background: #f3cc12; grid-area: 3 / 3; }`
  },
  {
    code: 'A06', name: '波普艺术', en: 'Pop Art', meta: '英美 · 1950s–1960s',
    desc: '把漫画、广告、商品搬进美术馆的艺术。利希滕斯坦（Lichtenstein）放大的漫画格最好认：本戴网点（Ben-Day dots）、粗黑描边、红黄蓝平涂、对话气泡和「POW!」爆炸框。网页上适合活泼的活动页、趣味测验、表情包式提示，用于正文就太吵了。',
    more: '波普艺术反讽消费社会：沃霍尔的金宝汤罐头和玛丽莲·梦露丝网版画、利希滕斯坦的漫画格。网点是廉价印刷用小圆点混色的痕迹，被放大成了风格符号。实现：网点用 radial-gradient 平铺，描边要粗而统一，字体用漫画手写体（这里是 Bangers）。不适合：严肃、需要信任感的场合；网点背景上不要放小字。',
    kw: ['网点', '粗黑描边', '漫画气泡', '利希滕斯坦', '高饱和'],
    html: a06, bg: '#f6f1e2',
    links: [['Wikipedia · Pop art', W_('Pop_art')], ['Wikipedia · Roy Lichtenstein', W_('Roy_Lichtenstein')], ['Wikipedia · Ben-Day dots', W_('Ben-Day_dots')]],
    css: `/* 本戴网点 */
.pop {
  background: radial-gradient(circle, #3d7fe0 32%, transparent 34%) 0 0 / 3cqw 3cqw,
              #f6f1e2;
  border: 1.5cqw solid #111;
}
.pop .bubble { background: #fff; border: 1cqw solid #111; border-radius: 4cqw;
  font-family: 'Bangers', sans-serif; text-transform: uppercase; }
.pop .pow { font-family: 'Bangers'; color: #ffe94a;
  -webkit-text-stroke: .6cqw #111; paint-order: stroke; }`
  },
  {
    code: 'A07', name: '迷幻艺术', en: 'Psychedelic', meta: '美国 · 1960s 后期',
    desc: '60 年代旧金山摇滚海报和嬉皮文化的视觉：扭曲旋转的漩涡、同心色带，高饱和的对比色（品红配绿、橙配蓝）互相「振动」，字母像融化的蜡一样变形填满空间。网页上只适合音乐节、复古派对这类主题；做背景时要压暗或只用一角，文字放在实色块上。',
    more: '迷幻艺术模仿致幻体验：色彩振动（等亮度的互补色并置会让边界「发抖」）、流动的新艺术式曲线、视错觉。代表：Wes Wilson 和 Victor Moscoso 为 Fillmore 演出画的海报、披头士《黄色潜水艇》。这里的色带用画布按极坐标逐像素算出，然后整体慢慢旋转。不适合：任何需要阅读的内容——这是最不适合当正文背景的一种；也要注意对光敏感的用户，别让它闪烁。',
    kw: ['漩涡', '同心色带', '高饱和', '对比色', '60 年代'],
    html: `<canvas class="ar-a07-cv"></canvas><div class="ar-a07-t"><span>Analysis</span><small>Summer of Series · 1967</small></div>`,
    init(stage, ctx) {
      const cv = stage.querySelector('canvas');
      const paint = () => {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h) return;
        const S = Math.min(1200, Math.ceil(Math.hypot(w, h) * Math.min(window.devicePixelRatio || 1, 2)));
        if (cv.width === S) return;
        cv.width = cv.height = S;
        a07draw(cv.getContext('2d'), S);
      };
      const ro = new ResizeObserver(paint);
      ro.observe(stage);
      ctx.add(() => ro.disconnect());
    },
    bg: '#7a2ee6', dark: true, wide: true,
    links: [['Wikipedia · Psychedelic art', W_('Psychedelic_art')]],
    css: `/* CSS 只能做同心色带；真正扭曲的漩涡要用画布按极坐标逐像素计算 */
.psychedelic { position: relative; overflow: hidden; }
.psychedelic::before { content: ""; position: absolute; inset: -40%;
  background: repeating-radial-gradient(circle,
    #ff288c 0 3%, #78e63c 0 6%, #ff7800 0 9%,
    #285aff 0 12%, #ffe100 0 15%, #9628d2 0 18%);
  animation: spin 90s linear infinite; }
@keyframes spin { to { rotate: 360deg; } }
.psychedelic h1 { position: relative; font-family: 'Shrikhand', cursive;
  color: #ffde00; -webkit-text-stroke: .5cqw #3a0a5e; paint-order: stroke; }`
  },
  {
    code: 'A08', name: '后现代 · 孟菲斯', en: 'Memphis / Postmodern', meta: '意大利 · 1981–1987',
    desc: '后现代设计的代表：米兰的孟菲斯小组故意打破「好品味」，用粉彩色块配纯黑，波浪线、锯齿线、彩纸屑般散落的几何形、水磨石斑点、黑白条纹，形状常常和描边错开。网页上适合年轻、活泼的活动页、课程宣传；内容卡片要用白底和粗描边把它压住。',
    more: '1981 年埃托雷·索特萨斯在米兰成立孟菲斯小组，家具和图案像玩具一样鲜艳、不实用、故意「俗」——这是对现代主义「少即是多」的反叛。90 年代的电视片头、文具到处都是这种图案，2010 年代又在网页插画里复兴。不适合：需要安静、学术感的阅读页面；图形一多就像彩纸屑撒了一屏，一定要给内容留白。',
    kw: ['孟菲斯', '粉彩加黑', '波浪线', '彩纸屑', '水磨石'],
    html: a08, bg: '#fbe8de',
    links: [['Wikipedia · Memphis Group', W_('Memphis_Group')]],
    css: `.memphis {
  background:
    radial-gradient(#141414 18%, transparent 20%) 0 0 / 4cqw 4cqw,
    #fbe8de;
}
.memphis .squiggle { /* 波浪线：SVG path 的 q 命令 */ }
.memphis .card {
  background: #fff; border: .6cqw solid #141414; border-radius: 1cqw;
  box-shadow: 2cqw 2cqw 0 -.3cqw #fbe8de, 2cqw 2cqw 0 0 #141414;
}`
  },
  {
    code: 'A09', name: '极简主义', en: 'Minimalism', meta: '美国 · 1960s 起',
    desc: '只留一个形状，其余全部是空白。源自 60 年代纽约的极简艺术（贾德、凯利），后来影响了无印良品、苹果的产品与网页。特征：极少的元素、大量留白、克制的颜色（往往只有一个强调色）、小而精确的文字。网页上非常适合做学习网站首页或章节封面——但留白要「有意」，元素的位置和大小要精确。',
    more: '极简主义的口号是「少即是多」（密斯·凡·德·罗）。在平面上，它靠比例和位置说话：这里一个朱红圆放在右侧黄金分割附近，文字压在左下角，中间大片空白让眼睛有休息处。日本设计师原研哉的无印良品海报、苹果的产品页都是这一路。不适合：需要一次展示大量信息的首页；元素太少时，任何一点粗糙（对不齐、字号随意）都会被放大。',
    kw: ['留白', '一个形状', '少即是多', '克制', '原研哉'],
    html: a09, bg: '#f1efea', wide: true,
    links: [['Wikipedia · Minimalism', W_('Minimalism')]],
    css: `.minimal { background: #f1efea; position: relative; }
.minimal::after { content: ""; position: absolute;
  left: 59cqw; top: 46cqh; translate: -50% -50%;
  width: 21.5cqw; aspect-ratio: 1; border-radius: 50%;
  background: #d7432b; }
.minimal h1 { position: absolute; left: 8cqw; bottom: 16cqh;
  font: 500 2.1cqw/1 'Instrument Sans', sans-serif; letter-spacing: .02em; }`
  },
  {
    code: 'A10', name: '达达 / 拼贴', en: 'Dada collage', meta: '苏黎世 · 柏林 · 1916–1924',
    desc: '一战期间的反艺术运动：把报纸、照片、票据剪下来乱贴，字体、字号、颜色故意混搭，像绑匪拼字条。特征：撕纸毛边、错位歪斜的剪报字、网点照片碎片、红黑为主的强对比。网页上适合实验性的作品集、杂志专题、海报；也可以只借它的「撕纸边」和「混排标题」。',
    more: '达达主义诞生于 1916 年苏黎世的伏尔泰酒馆，用荒诞对抗战争和理性。拼贴（photomontage）代表：汉娜·霍赫、劳尔·豪斯曼、施维特斯的 Merz 拼贴。后来的朋克海报、Zine 杂志、当代的「反设计」都继承了它。要点：每块碎片要有明确的阴影或白边（撕纸露出的纸芯），字体至少混三种。不适合：教学正文和表单——它本意就是制造混乱。',
    kw: ['撕纸', '剪报字', '混排', '照片拼贴', '反艺术'],
    html: a10, bg: '#e7dec9',
    links: [['Wikipedia · Dada', W_('Dada')], ['Wikipedia · Photomontage', W_('Photomontage')]],
    css: `/* 撕纸毛边：不规则 clip-path + 一层白色纸芯 */
.scrap { background: #c8372d;
  clip-path: polygon(0 3%, 9% 0, 22% 2%, 37% 0, 52% 3%, 70% 0, 88% 2%,
    100% 0, 98% 30%, 100% 62%, 97% 100%, 74% 97%, 49% 100%,
    23% 97%, 0 100%, 2% 62%); }
.ransom span:nth-child(3n) { font-family: 'Bodoni Moda'; background: #f4e04d; }
.ransom span:nth-child(3n+1) { font-family: 'Archivo'; font-weight: 900;
  background: #111; color: #fff; rotate: -4deg; }
.ransom span:nth-child(3n+2) { font-family: 'JetBrains Mono'; rotate: 3deg; }`
  }
];

// ============================================================
// 第 2 页 · 东方与传统
// ============================================================

// 曲线采样与偏移（画浪、飘带用）
function crSample(pts, n = 12) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
const pl = (pts) => 'M' + pts.map((p) => `${r1(p[0])} ${r1(p[1])}`).join('L');
function offsetPl(pts, d) {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const dd = typeof d === 'function' ? d(i / (pts.length - 1)) : d;
    return [p[0] - (dy / L) * dd, p[1] + (dx / L) * dd];
  });
}
// 青海波：一排排同心扇形，后画的一排压住前一排的下半
function seigaiha(x0, y0, w, h, r, fill, line, sw = 1) {
  let g = '';
  for (let row = 0; y0 + row * r / 2 < y0 + h + r; row++) {
    const y = y0 + row * r / 2, off = row % 2 ? r : 0;
    for (let x = x0 - 2 * r + off; x < x0 + w + 2 * r; x += 2 * r) {
      g += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="${fill}"/>`;
      g += `<path d="M${r1(x - r * .8)} ${r1(y)}a${r * .8} ${r * .8} 0 0 1 ${r * 1.6} 0M${r1(x - r * .55)} ${r1(y)}a${r * .55} ${r * .55} 0 0 1 ${r * 1.1} 0M${r1(x - r * .3)} ${r1(y)}a${r * .3} ${r * .3} 0 0 1 ${r * .6} 0" fill="none" stroke="${line}" stroke-width="${sw}"/>`;
    }
  }
  return g;
}
// 阿基米德螺线（祥云、卷草、藤蔓的卷须）
function spiral(cx, cy, r, turns = 1.6, a0 = 0, dir = 1, n = 28) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = a0 + dir * t * turns * Math.PI * 2, rr = r * (1 - t * 0.86);
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  return smooth(pts);
}

// A11 浮世绘：神奈川冲浪里式的大浪
const a11 = (() => {
  const INK = '#1b2a45', PB = '#1f3c6e', LB = '#6a8dbd', FOAM = '#f4efe1';
  const outer = [[-4, 300], [-4, 214], [20, 160], [58, 110], [108, 74], [164, 56], [214, 60], [250, 82], [264, 112], [256, 138], [236, 150]];
  const inner = [[236, 150], [242, 130], [234, 108], [212, 96], [188, 98], [170, 116], [163, 148], [172, 190], [200, 232], [244, 268], [300, 300]];
  const body = `${smooth(outer)} ${smooth(inner).replace(/^M/, 'L')} L-4 300Z`;
  const oc = crSample(outer, 14), ic = crSample(inner, 14);
  let stripes = '';
  for (let d = 9; d < 64; d += 9) stripes += `<path d="${pl(offsetPl(oc, d))}" stroke="${d % 18 ? LB : '#2f5288'}" stroke-width="${d < 40 ? 2.6 : 3.2}" opacity="${r1(1 - d / 110)}"/>`;
  stripes += `<path d="${pl(offsetPl(oc.slice(0, 50), 80))}" stroke="${LB}" stroke-width="2.6" opacity=".35"/><path d="${pl(offsetPl(oc.slice(0, 44), 100))}" stroke="${LB}" stroke-width="2.6" opacity=".25"/>`;
  const whites = [4, 13].map((d) => `<path d="${pl(offsetPl(oc.slice(40), d))}" stroke="${FOAM}" stroke-width="${d < 8 ? 3.2 : 1.1}"/>`).join('');
  // 爪形浪花：沿外缘，从浪顶到浪舌越来越大，向前勾
  let claws = '';
  const start = 44;
  for (let i = start; i < oc.length - 1; i += 3) {
    const p = oc[i], q = oc[Math.min(oc.length - 1, i + 1)], o = oc[Math.max(0, i - 1)];
    const dx = q[0] - o[0], dy = q[1] - o[1], L = Math.hypot(dx, dy) || 1;
    const T = [dx / L, dy / L], N = [dy / L, -dx / L];
    const k = 0.7 + ((i - start) / (oc.length - start)) * 0.9;
    const P = (u, v) => `${r1(p[0] + (T[0] * u + N[0] * v) * k)} ${r1(p[1] + (T[1] * u + N[1] * v) * k)}`;
    claws += `<path d="M${P(-4, -1)}C${P(-4, 6)} ${P(2, 11)} ${P(9, 9)}C${P(4, 7.5)} ${P(3, 4)} ${P(4.5, -1)}Z"/>`;
  }
  // 浪舌下垂的一排小爪
  for (let i = 0; i < 6; i++) {
    const p = ic[2 + i * 4];
    if (!p) break;
    claws += `<path d="M${r1(p[0] - 3)} ${r1(p[1])}c0 5 2 9 6 10c-2-3-1-6 1-10z"/>`;
  }
  const R = rng(1111);
  let spray = '';
  for (let i = 0; i < 46; i++) {
    const x = 232 + R() * 110, y = 96 + R() * 110;
    if (Math.hypot(x - 300, y - 228) < 30) continue;
    spray += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(0.8 + R() * 1.7)}"/>`;
  }
  // 前景小浪（形似富士）
  const sOuter = [[262, 300], [284, 274], [314, 252], [342, 244], [362, 250], [366, 262], [354, 268]];
  const sInner = [[354, 268], [352, 258], [340, 256], [326, 266], [322, 284], [330, 300]];
  const sBody = `${smooth(sOuter)} ${smooth(sInner).replace(/^M/, 'L')}Z`;
  const sc = crSample(sOuter, 10);
  let sStripes = '';
  for (let d = 6; d < 40; d += 6) sStripes += `<path d="${pl(offsetPl(sc, d))}" stroke="${d % 12 ? LB : '#2f5288'}" stroke-width="2.2"/>`;
  let sClaws = '';
  for (let i = 22; i < sc.length - 1; i += 3) {
    const p = sc[i], q = sc[i + 1], o = sc[i - 1], dx = q[0] - o[0], dy = q[1] - o[1], L = Math.hypot(dx, dy) || 1;
    const T = [dx / L, dy / L], N = [dy / L, -dx / L];
    const P = (u, v) => `${r1(p[0] + (T[0] * u + N[0] * v) * .7)} ${r1(p[1] + (T[1] * u + N[1] * v) * .7)}`;
    sClaws += `<path d="M${P(-4, -1)}C${P(-4, 6)} ${P(2, 11)} ${P(9, 9)}C${P(4, 7.5)} ${P(3, 4)} ${P(4.5, -1)}Z"/>`;
  }
  const ch = (t, x, y0, size, gap, extra = '') => [...t].map((c, i) => `<text x="${x}" y="${y0 + i * gap}" text-anchor="middle" font-size="${size}" ${extra}>${c}</text>`).join('');
  return SV('0 0 400 300', `<defs>
      <linearGradient id="a11-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4a63"/><stop offset=".22" stop-color="#8d8f8a" stop-opacity=".55"/><stop offset=".42" stop-color="#e9dcbc" stop-opacity="0"/></linearGradient>
      <linearGradient id="a11-face" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="${PB}"/><stop offset="1" stop-color="#4c70a6"/></linearGradient>
      <clipPath id="a11-clip"><path d="${body}"/></clipPath>
      <clipPath id="a11-sea"><rect x="0" y="256" width="400" height="44"/></clipPath>
      <clipPath id="a11-sclip"><path d="${sBody}"/></clipPath>
      <filter id="a11-paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .36  0 0 0 0 .2  0 0 0 -1.4 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    </defs>
    <rect width="400" height="300" fill="#ebdfc2"/>
    <rect width="400" height="300" fill="url(#a11-sky)"/>
    <g transform="translate(300 258)">
      <path d="M-46 0L-12 -50Q0 -58 12 -50L46 0Z" fill="#3c5a86" stroke="${INK}" stroke-width="1"/>
      <path d="M-12 -50Q0 -58 12 -50L22 -35L15 -38L9 -31L3 -38L-4 -30L-9 -38L-15 -33L-22 -35Z" fill="${FOAM}" stroke="${INK}" stroke-width=".8"/>
      <path d="M-30 -14L-22 -24M-6 -22L-2 -30M10 -18L18 -26M26 -10L30 -16" stroke="#9fb3cc" stroke-width="1"/>
    </g>
    <rect x="0" y="256" width="400" height="44" fill="${PB}"/>
    <g clip-path="url(#a11-sea)">${seigaiha(0, 258, 400, 44, 9, PB, '#c9d4e3', .9)}</g>
    <path d="${body}" fill="url(#a11-face)"/>
    <g clip-path="url(#a11-clip)" fill="none" stroke-linecap="round">${stripes}${whites}
      <path d="${pl(offsetPl(ic, 6))}" stroke="${FOAM}" stroke-width="2" opacity=".85"/>
      <path d="${pl(offsetPl(ic, 14))}" stroke="#9db4d6" stroke-width="2.4"/>
    </g>
    <path d="${body}" fill="none" stroke="${INK}" stroke-width="1.3"/>
    <g fill="${FOAM}" stroke="${INK}" stroke-width=".75">${claws}</g>
    <g transform="rotate(-20 198 230)"><path d="M146 230C168 222 214 218 250 220C236 230 196 238 152 238Z" fill="#dcc690" stroke="${INK}" stroke-width=".9"/>
    <path d="M154 234C180 230 214 226 240 225" stroke="#a88f55" stroke-width=".7" fill="none"/>
    <g fill="#24395f" stroke="${INK}" stroke-width=".5">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${163 + i * 11} ${r1(225.5 - i * .3)}a3 3.4 0 0 1 6 0z"/>`).join('')}</g>
    <path d="M140 236C170 236 210 232 256 222" stroke="${FOAM}" stroke-width="1.4" fill="none" opacity=".8"/></g>
    <path d="${sBody}" fill="${PB}"/>
    <g clip-path="url(#a11-sclip)" fill="none">${sStripes}<path d="${pl(offsetPl(sc, 3))}" stroke="${FOAM}" stroke-width="2.4"/></g>
    <path d="${sBody}" fill="none" stroke="${INK}" stroke-width="1"/>
    <g fill="${FOAM}" stroke="${INK}" stroke-width=".7">${sClaws}</g>
    <g fill="${FOAM}">${spray}</g>
    <rect x="14" y="14" width="42" height="96" fill="#e6d29f" stroke="${INK}" stroke-width="1.1"/>
    <rect x="17" y="17" width="36" height="90" fill="none" stroke="${INK}" stroke-width=".5"/>
    <g font-family="'Noto Serif SC', serif" font-weight="700" fill="${INK}">${ch('幂级数', 42, 40, 17, 22)}</g>
    <g font-family="'Noto Serif SC', serif" font-weight="500" fill="${INK}">${ch('第三章', 25, 36, 8.5, 11)}</g>
    <g font-family="'Noto Serif SC', serif" font-weight="500" fill="${INK}" opacity=".85">${ch('数理画', 66, 24, 8, 10)}</g>
    <rect x="60" y="56" width="12" height="12" fill="#c23b22"/>
    <text x="66" y="65.2" text-anchor="middle" font-family="'Noto Serif SC', serif" font-weight="700" font-size="8.5" fill="#f3e6c8">析</text>
    <rect width="400" height="300" filter="url(#a11-paper)" opacity=".35"/>`);
})();

// A12 水墨：画布层叠远山
function a12draw(c, W, H) {
  const R = rng(1212);
  c.fillStyle = '#f2ede1';
  c.fillRect(0, 0, W, H);
  // 纸纹
  for (let i = 0; i < 2600; i++) {
    c.fillStyle = `rgba(120,100,70,${0.02 + R() * 0.04})`;
    c.fillRect(R() * W, R() * H, 1 + R() * W * 0.012, 1);
  }
  const n = 129;
  const ridge = (peaks, rough, amp) => {
    const md = new Array(n).fill(0);
    md[0] = R() - 0.5; md[n - 1] = R() - 0.5;
    let step = n - 1, a = 1;
    while (step > 1) {
      const h = step / 2;
      for (let i = h; i < n; i += step) md[i] = (md[i - h] + md[i + h]) / 2 + (R() - 0.5) * a;
      a *= rough; step = h;
    }
    return md.map((m, i) => {
      const x = i / (n - 1);
      let e = 0;
      peaks.forEach(([px, ph, pw]) => { e = Math.max(e, ph * Math.exp(-(((x - px) / pw) ** 2))); });
      return e + m * amp * (0.4 + e);
    });
  };
  const layer = (peaks, base, alpha, blur, mistA, mistB, rough = 0.55, amp = 0.08, tone = 30) => {
    const ys = ridge(peaks, rough, amp).map((v) => (base - v) * H);
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const o = off.getContext('2d');
    o.beginPath();
    o.moveTo(0, H);
    ys.forEach((y, i) => o.lineTo((i / (n - 1)) * W, y));
    o.lineTo(W, H);
    o.closePath();
    o.fillStyle = `rgba(${tone},${tone + 4},${tone + 8},${alpha})`;
    o.fill();
    // 山脊线更浓
    o.beginPath();
    ys.forEach((y, i) => (i ? o.lineTo((i / (n - 1)) * W, y) : o.moveTo(0, y)));
    o.lineWidth = Math.max(1, W * 0.003);
    o.strokeStyle = `rgba(${tone},${tone},${tone},${Math.min(1, alpha * 1.3)})`;
    o.stroke();
    // 皴擦：沿山脊向下的短笔触
    for (let i = 0; i < 220; i++) {
      const k = Math.floor(R() * n), x = (k / (n - 1)) * W, y = ys[k];
      const len = H * (0.02 + R() * 0.07);
      o.strokeStyle = `rgba(${tone},${tone},${tone},${alpha * (0.25 + R() * 0.4)})`;
      o.lineWidth = Math.max(0.6, W * 0.0018);
      o.beginPath();
      o.moveTo(x, y + 1);
      o.quadraticCurveTo(x + (R() - 0.5) * len * 0.6, y + len * 0.5, x + (R() - 0.5) * len * 0.5, y + len);
      o.stroke();
    }
    // 山脚隐入雾中
    o.globalCompositeOperation = 'destination-out';
    const g = o.createLinearGradient(0, mistA * H, 0, mistB * H);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,1)');
    o.fillStyle = g;
    o.fillRect(0, 0, W, H);
    c.save();
    c.filter = `blur(${blur * W / 400}px)`;
    c.drawImage(off, 0, 0);
    c.restore();
  };
  layer([[0.16, 0.32, 0.09], [0.3, 0.22, 0.07], [0.7, 0.36, 0.08], [0.84, 0.26, 0.06]], 0.6, 0.16, 2.2, 0.36, 0.6);
  layer([[0.06, 0.3, 0.08], [0.22, 0.2, 0.09], [0.58, 0.24, 0.07], [0.96, 0.34, 0.07]], 0.7, 0.3, 1.1, 0.46, 0.72);
  layer([[0.0, 0.56, 0.12], [0.13, 0.42, 0.06], [0.26, 0.2, 0.05]], 0.98, 0.78, 0.4, 0.6, 1.02, 0.6, 0.1, 22);
  layer([[1.0, 0.3, 0.06], [0.9, 0.16, 0.04]], 1.0, 0.62, 0.5, 0.78, 1.04, 0.6, 0.08, 26);
  // 小舟与渔人
  const bx = W * 0.6, by = H * 0.8, s = W / 400;
  c.strokeStyle = 'rgba(25,25,28,.85)';
  c.lineCap = 'round';
  c.lineWidth = 2.2 * s;
  c.beginPath(); c.moveTo(bx - 16 * s, by - 2 * s); c.quadraticCurveTo(bx, by + 4 * s, bx + 18 * s, by - 3 * s); c.stroke();
  c.lineWidth = 1.2 * s;
  c.beginPath(); c.moveTo(bx + 4 * s, by - 1 * s); c.lineTo(bx + 5 * s, by - 9 * s); c.stroke();
  c.beginPath(); c.arc(bx + 5 * s, by - 10.5 * s, 2 * s, 0, Math.PI * 2); c.fillStyle = 'rgba(25,25,28,.85)'; c.fill();
  c.lineWidth = 0.7 * s;
  c.beginPath(); c.moveTo(bx + 6 * s, by - 7 * s); c.lineTo(bx + 30 * s, by - 20 * s); c.stroke();
  // 水纹
  c.strokeStyle = 'rgba(40,40,44,.22)';
  c.lineWidth = 0.8 * s;
  [[0.52, 0.84, 30], [0.66, 0.86, 22], [0.46, 0.9, 18], [0.72, 0.9, 14]].forEach(([x, y, l]) => { c.beginPath(); c.moveTo(W * x, H * y); c.quadraticCurveTo(W * x + l * s / 2, H * y - 1.5 * s, W * x + l * s, H * y); c.stroke(); });
  // 飞鸟
  c.strokeStyle = 'rgba(25,25,28,.7)';
  c.lineWidth = 1 * s;
  [[0.44, 0.3, 1], [0.48, 0.27, 0.7]].forEach(([x, y, k]) => { c.beginPath(); c.moveTo(W * x - 5 * s * k, H * y - 2 * s * k); c.quadraticCurveTo(W * x - 2 * s * k, H * y - 2 * s * k, W * x, H * y); c.quadraticCurveTo(W * x + 2 * s * k, H * y - 3 * s * k, W * x + 6 * s * k, H * y - 3 * s * k); c.stroke(); });
}

// A13 国潮
const a13 = (() => {
  const cloud = (x, y, s, flip = false) => {
    const lobes = [[0, 0, 13], [17, -7, 11], [32, 1, 9], [-15, 4, 9]];
    const t = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;
    const circ = (f, st) => lobes.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${f}/>`).join('') + `<path d="M-20 10C-30 14 -42 13 -50 6C-56 1 -54 -6 -48 -6C-44 -6 -42 -2 -45 1C-40 6 -30 8 -20 5Z" ${st}/>`;
    return `<g transform="${t}"><g fill="none" stroke="#e9b44c" stroke-width="4.2">${circ('', '')}</g><g fill="#fbe7bd">${circ('', '')}</g>
      <g fill="none" stroke="#c0841f" stroke-width="1.5" stroke-linecap="round"><path d="${spiral(0, 1, 8, 1.3, Math.PI * 0.9)}"/><path d="${spiral(17, -6, 6.5, 1.2, Math.PI)}"/><path d="${spiral(32, 2, 5, 1.1, Math.PI * 1.1)}"/><path d="M-24 9C-32 11 -40 9 -46 4"/></g></g>`;
  };
  // 海水江崖：底部斜条纹（立水）+ 卷浪 + 山石
  let stripes = '';
  const cols = ['#e9b44c', '#b5161d', '#1f7a6d', '#b5161d'];
  for (let i = -30; i < 60; i++) stripes += `<path d="M${i * 8} 300L${i * 8 + 34} 262" stroke="${cols[((i % 4) + 4) % 4]}" stroke-width="4.4"/>`;
  let waves = '';
  for (let x = -10; x < 420; x += 26) waves += `<path d="M${x} 262a13 13 0 0 1 26 0" fill="#b5161d" stroke="#e9b44c" stroke-width="1.6"/><path d="${spiral(x + 13, 258, 6, 1.2, Math.PI)}" fill="none" stroke="#e9b44c" stroke-width="1.2"/>`;
  return SV('0 0 400 300', `<defs>
      <radialGradient id="a13-bg" cx="65%" cy="38%" r="80%"><stop offset="0" stop-color="#cf1f26"/><stop offset="1" stop-color="#8c0c12"/></radialGradient>
      <radialGradient id="a13-sun" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#f7d27a"/><stop offset="1" stop-color="#df9f32"/></radialGradient>
      <clipPath id="a13-band"><rect x="0" y="262" width="400" height="38"/></clipPath>
    </defs>
    <rect width="400" height="300" fill="url(#a13-bg)"/>
    <g fill="none" stroke="#e9b44c" stroke-width=".6" opacity=".35"><circle cx="282" cy="120" r="104"/><circle cx="282" cy="120" r="112"/></g>
    <circle cx="282" cy="120" r="92" fill="url(#a13-sun)"/>
    ${cloud(232, 168, 1.35)}${cloud(338, 92, 1.0, true)}${cloud(232, 52, .78, true)}
    <g clip-path="url(#a13-band)">${stripes}</g>
    ${waves}
    <path d="M168 262L182 228L192 236L204 210L218 230L228 222L240 262Z" fill="#1f7a6d" stroke="#e9b44c" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M186 248L196 242M204 226L210 238M222 240L230 236" stroke="#e9b44c" stroke-width="1.2"/>
    <g font-family="'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif" fill="#fbe7bd">
      <text x="24" y="104" font-size="62" letter-spacing="2">数学</text>
      <text x="24" y="170" font-size="62" letter-spacing="2">分析</text>
    </g>
    <rect x="26" y="186" width="128" height="1.2" fill="#e9b44c"/>
    <text x="26" y="202" font-family="Archivo, sans-serif" font-weight="700" font-size="8.6" letter-spacing="2.2" fill="#e9b44c">MATHEMATICAL ANALYSIS</text>
    <text x="26" y="216" font-family="'JetBrains Mono', monospace" font-size="7.5" letter-spacing="1" fill="#f3c9a3" opacity=".85">NO.02 · 级数 SERIES</text>
    <rect x="158" y="30" width="18" height="44" rx="2" fill="#e9b44c"/>
    <g font-family="'Noto Serif SC', serif" font-weight="900" font-size="12" fill="#b5161d" text-anchor="middle"><text x="167" y="46">国</text><text x="167" y="64">潮</text></g>`);
})();

// A14 侘寂：陶土质感 + 枯笔圆相（画布）+ 金缮裂纹
function a14draw(c, W, H) {
  const R = rng(1414);
  const cx = W * 0.4, cy = H * 0.5, rad = H * 0.3, bw = H * 0.075;
  const a0 = Math.PI * 0.62, sweep = Math.PI * 1.82;
  const N = 60, steps = 180;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  for (let j = 0; j < N; j++) {
    const off = (j / (N - 1) - 0.5) * 2;
    const lw = (bw / N) * (1.6 + R() * 1.4);
    const f1 = 6 + R() * 14, ph = R() * 6.28, edge = Math.abs(off);
    const tS = edge * edge * 0.035, tE = 1 - edge * 0.06 - R() * 0.07;
    let ink = 0.85 + R() * 0.3, run = [];
    const flush = () => {
      if (run.length > 1) {
        c.strokeStyle = `rgba(30,26,23,${r1(Math.min(0.92, 0.3 + run.ink * 0.65) * 100) / 100})`;
        c.lineWidth = lw;
        c.beginPath();
        run.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
        c.stroke();
      }
      run = [];
    };
    for (let k = 0; k <= steps; k++) {
      const t = k / steps, a = a0 + t * sweep;
      const press = t < 0.05 ? 0.8 + t * 4 : 1 - t * 0.5;
      const rr = rad * (1 + 0.045 * Math.sin(t * 5 + 0.6) + 0.01 * Math.sin(t * 17)) + off * bw * press * 0.5;
      const p = [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
      ink -= 0.003 + edge * 0.0035;
      // 飞白：笔毛沿线成段地「断墨」，越往后、越靠边越多
      const dry = t < tS || t > tE || ink <= 0 || Math.sin(t * f1 + ph) > 1.15 - t * 0.9 - edge * 0.35;
      if (dry) { flush(); continue; }
      if (!run.length) run.ink = ink;
      run.push(p);
      if (run.length > 8) { const last = run[run.length - 1]; flush(); run = [last]; run.ink = ink; }
    }
    flush();
  }
}
const a14 = SV('0 0 400 300', `<defs>
    <filter id="a14-clay" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="3" seed="3" result="m"/><feColorMatrix in="m" values="0 0 0 0 .42  0 0 0 0 .34  0 0 0 0 .26  0 0 0 1.4 -.5"/></filter>
    <filter id="a14-speck" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="8"/><feColorMatrix values="0 0 0 0 .22  0 0 0 0 .16  0 0 0 0 .1  0 0 0 -11 3.9"/></filter>
    <linearGradient id="a14-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dc93"/><stop offset=".5" stop-color="#b98a2f"/><stop offset="1" stop-color="#e8c66e"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="#cbbca3"/>
  <rect width="400" height="300" filter="url(#a14-clay)" opacity=".55"/>
  <rect width="400" height="300" filter="url(#a14-speck)" opacity=".5"/>
  <path d="M400 214L372 222L356 218L338 232L322 230L306 246L292 244L276 262L266 274L252 300" fill="none" stroke="url(#a14-gold)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M338 232L344 246L340 262" fill="none" stroke="url(#a14-gold)" stroke-width="1.3"/>`);

// A15 回纹 / 冰裂纹窗格
const a15 = (() => {
  const R = rng(1515);
  // 冰裂纹：多边形随机切分
  const split = (P, px, py, dx, dy) => {
    const A = [], B = [];
    const side = (p) => (p[0] - px) * dy - (p[1] - py) * dx;
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], sa = side(a), sb = side(b);
      (sa >= 0 ? A : B).push(a);
      if ((sa >= 0) !== (sb >= 0)) {
        const t = sa / (sa - sb), q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        A.push(q); B.push(q);
      }
    }
    return [A, B];
  };
  const area = (P) => Math.abs(P.reduce((s, p, i) => { const q = P[(i + 1) % P.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
  let polys = [[[56, 56], [344, 56], [344, 244], [56, 244]]], done = [];
  while (polys.length) {
    const P = polys.pop();
    const ar = area(P);
    if (ar < 1700 || P.length < 3) { done.push(P); continue; }
    const cx = P.reduce((s, p) => s + p[0], 0) / P.length, cy = P.reduce((s, p) => s + p[1], 0) / P.length;
    let ok = false;
    for (let tries = 0; tries < 8 && !ok; tries++) {
      const a = R() * Math.PI;
      const [A, B] = split(P, cx + (R() - 0.5) * 10, cy + (R() - 0.5) * 10, Math.cos(a), Math.sin(a));
      if (A.length > 2 && B.length > 2 && Math.min(area(A), area(B)) > ar * 0.28) { polys.push(A, B); ok = true; }
    }
    if (!ok) done.push(P);
  }
  const ice = done.map((P) => `<polygon points="${poly(P)}"/>`).join('');
  // 回纹带：底线 + 一个个方形回旋
  const key = (u) => `h${u}v${-u}h${-u * 0.75}v${u * 0.5}h${u * 0.5}v${-u * 0.25}`;
  const band = (len, u) => {
    const n = Math.round(len / (u * 1.3)), st = len / n;
    let d = '';
    for (let i = 0; i < n; i++) d += `M${r1(i * st + (st - u) / 2)} ${u}${key(u)}`;
    return `${d}M0 ${u + 2.5}H${len}M0 -2.5H${len}`;
  };
  const u = 15;
  const corner = (x, y) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18"/><rect x="${x - 4}" y="${y - 4}" width="8" height="8"/>`;
  return SV('0 0 400 300', `<defs>
      <radialGradient id="a15-light" cx="50%" cy="50%" r="65%"><stop offset="0" stop-color="#fff6df"/><stop offset=".7" stop-color="#f1d9a6"/><stop offset="1" stop-color="#d9b675"/></radialGradient>
      <mask id="a15-hole"><rect width="400" height="300" fill="#fff"/><circle cx="200" cy="150" r="66" fill="#000"/></mask>
    </defs>
    <rect width="400" height="300" fill="url(#a15-light)"/>
    <g fill="none" stroke="#4b2e1f" stroke-width="3.4" stroke-linejoin="round" mask="url(#a15-hole)">${ice}</g>
    <g fill="none" stroke="#4b2e1f" stroke-width="3" stroke-linecap="square">
      <path transform="translate(42 22.5)" d="${band(316, u)}"/>
      <path transform="translate(358 277.5) rotate(180)" d="${band(316, u)}"/>
      <path transform="translate(22.5 258) rotate(-90)" d="${band(216, u)}"/>
      <path transform="translate(377.5 42) rotate(90)" d="${band(216, u)}"/>
      ${corner(30, 30)}${corner(370, 30)}${corner(30, 270)}${corner(370, 270)}
    </g>
    <rect x="5" y="5" width="390" height="290" fill="none" stroke="#4b2e1f" stroke-width="10"/>
    <rect x="53" y="53" width="294" height="194" fill="none" stroke="#4b2e1f" stroke-width="5"/>
    <circle cx="200" cy="150" r="66" fill="none" stroke="#4b2e1f" stroke-width="6"/>
    <circle cx="200" cy="150" r="58" fill="none" stroke="#4b2e1f" stroke-width="1.5"/>
    <text x="200" y="152" text-anchor="middle" font-family="'Noto Serif SC', serif" font-weight="600" font-size="24" letter-spacing="3" fill="#3b2418">数学分析</text>
    <text x="200" y="172" text-anchor="middle" font-family="'Noto Serif SC', serif" font-size="9" letter-spacing="3" fill="#6b4a33">第二章 · 级数</text>`);
})();

// A16 敦煌：藻井 + 飞天飘带
const a16 = (() => {
  const QING = '#2f6d8c', LV = '#4f9a84', ZHE = '#b8793c', HONG = '#a5452b', TU = '#e7d4ad', INK = '#3a2a1e';
  const cx = 200, cy = 150;
  const sq = (h, f, st = INK, sw = 1) => `<rect x="${cx - h}" y="${cy - h}" width="${2 * h}" height="${2 * h}" fill="${f}" stroke="${st}" stroke-width="${sw}"/>`;
  // 垂幔三角
  let tri = '';
  const H0 = 140;
  for (let i = 0; i < 14; i++) {
    const x = cx - H0 + i * 20;
    const c = [LV, HONG, QING][i % 3];
    tri += `<path d="M${x} ${cy - H0}l10 14l10 -14Z" fill="${c}"/><path d="M${x} ${cy + H0}l10 -14l10 14Z" fill="${c}"/>`;
    tri += `<path d="M${cx - H0} ${x - cx + cy}l14 10l-14 10Z" fill="${c}"/><path d="M${cx + H0} ${x - cx + cy}l-14 10l14 10Z" fill="${c}"/>`;
  }
  // 联珠纹
  let pearls = '';
  for (let i = 0; i <= 22; i++) {
    const t = -110 + i * 10;
    [[cx + t, cy - 114], [cx + t, cy + 114], [cx - 114, cy + t], [cx + 114, cy + t]].forEach(([x, y]) => { pearls += `<circle cx="${x}" cy="${y}" r="3.4"/>`; });
  }
  // 卷草纹：一圈波浪线 + 卷须
  let vine = '';
  const vh = 98;
  for (let side = 0; side < 4; side++) {
    let d = '', curls = '';
    for (let i = 0; i < 8; i++) {
      const x = -vh + i * 24.5, s = i % 2 ? 1 : -1;
      d += i ? `q6.1 ${s * 8} 12.25 0t12.25 0` : `M${x} 0q6.1 ${s * 8} 12.25 0t12.25 0`;
      curls += `<path d="${spiral(x + 6, s * 3.6, 3.2, 1.1, s > 0 ? -Math.PI / 2 : Math.PI / 2)}"/>`;
    }
    vine += `<g transform="translate(${cx} ${cy}) rotate(${side * 90}) translate(0 ${-vh})">${`<path d="${d}"/>`}${curls}</g>`;
  }
  // 莲花
  let lotus = '';
  for (let i = 0; i < 16; i++) lotus += `<path transform="rotate(${i * 22.5})" d="M0 -14C8 -20 9 -34 0 -46C-9 -34 -8 -20 0 -14Z" fill="${i % 2 ? TU : LV}" stroke="${INK}" stroke-width=".8"/>`;
  for (let i = 0; i < 8; i++) lotus += `<path transform="rotate(${i * 45 + 22.5})" d="M0 -10C6 -15 6 -24 0 -32C-6 -24 -6 -15 0 -10Z" fill="${QING}" stroke="${INK}" stroke-width=".7"/>`;
  // 飘带（会翻面：一段正面土红，一段背面石绿）
  const ribbon = (pts, w, seed) => {
    const P = crSample(pts, 16), n = P.length, R = rng(seed);
    let out = '';
    const ph = R() * Math.PI;
    const width = (t) => w * Math.sin(Math.PI * Math.min(1, t * 1.15)) * Math.cos(t * Math.PI * 3.2 + ph);
    let seg = [], sign = null;
    const flush = () => {
      if (seg.length > 1) {
        const L = offsetPl(seg.map((s) => s.p), (k) => seg[Math.round(k * (seg.length - 1))].w / 2);
        const Rr = offsetPl(seg.map((s) => s.p), (k) => -seg[Math.round(k * (seg.length - 1))].w / 2);
        out += `<path d="${pl([...L, ...Rr.reverse()])}Z" fill="${sign ? HONG : LV}" stroke="${INK}" stroke-width=".6"/>`;
      }
    };
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), wv = width(t), sg = wv >= 0;
      if (sign !== null && sg !== sign) { seg.push({ p: P[i], w: 0 }); flush(); seg = [{ p: P[i], w: 0 }]; }
      sign = sg;
      seg.push({ p: P[i], w: Math.abs(wv) });
    }
    flush();
    return out;
  };
  return SV('0 0 400 300', `<defs>
      <filter id="a16-age" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="16"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .42  0 0 0 0 .28  0 0 0 1.6 -.55"/></filter>
      <filter id="a16-grit" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="6"/><feColorMatrix values="0 0 0 0 .95  0 0 0 0 .9  0 0 0 0 .8  0 0 0 -2 1.15"/></filter>
    </defs>
    <rect width="400" height="300" fill="#d8bf92"/>
    ${sq(140, ZHE)}${tri}
    ${sq(122, HONG)}<g fill="${TU}">${pearls}</g>
    ${sq(106, ZHE, INK, .8)}<g fill="none" stroke="${LV}" stroke-width="2.2" stroke-linecap="round">${vine}</g>
    ${sq(90, QING)}
    <path d="M${cx} ${cy - 90}L${cx + 90} ${cy}L${cx} ${cy + 90}L${cx - 90} ${cy}Z" fill="${LV}" stroke="${INK}" stroke-width="1"/>
    <path d="M${cx} ${cy - 76}L${cx + 76} ${cy}L${cx} ${cy + 76}L${cx - 76} ${cy}Z" fill="none" stroke="${TU}" stroke-width="1.4" stroke-dasharray="1 4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="58" fill="${TU}" stroke="${INK}" stroke-width="1"/>
    <g transform="translate(${cx} ${cy})">${lotus}<circle r="13" fill="${HONG}" stroke="${INK}" stroke-width=".8"/><g fill="${ZHE}"><circle r="2.2"/><circle cx="6" r="1.8"/><circle cx="-6" r="1.8"/><circle cy="6" r="1.8"/><circle cy="-6" r="1.8"/></g></g>
    <g opacity=".95">${ribbon([[-14, 262], [26, 226], [70, 238], [104, 206], [96, 170], [134, 146]], 15, 3)}${ribbon([[414, 30], [368, 66], [330, 54], [300, 86], [314, 120], [280, 144]], 14, 9)}</g>
    <rect x="22" y="40" width="26" height="88" fill="#efe0bd" stroke="${HONG}" stroke-width="2"/>
    <g font-family="'Noto Serif SC', serif" font-weight="600" font-size="15" fill="${INK}" text-anchor="middle"><text x="35" y="62">定</text><text x="35" y="80">理</text><text x="35" y="98">三</text><text x="35" y="116">二</text></g>
    <rect width="400" height="300" filter="url(#a16-age)" opacity=".5"/>
    <rect width="400" height="300" filter="url(#a16-grit)" opacity=".35"/>`);
})();

// A17 青花瓷：缠枝莲 + 如意云头 + 莲瓣，中间留白「开光」
const a17 = (() => {
  const D = '#1b2f7d', M = '#3159b5';
  const wash = `fill="${M}" fill-opacity=".5" stroke="${D}" stroke-width="1.1" stroke-linejoin="round"`;
  const petal = (ang, len, wid) => `<path transform="rotate(${ang})" d="M0 0C${wid} ${-len * .3} ${wid * .7} ${-len * .8} 0 ${-len}C${-wid * .7} ${-len * .8} ${-wid} ${-len * .3} 0 0Z" ${wash}/>`;
  const lotus = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${petal(-78, 13, 5)}${petal(78, 13, 5)}${petal(-50, 17, 6.5)}${petal(50, 17, 6.5)}${petal(-24, 21, 7.5)}${petal(24, 21, 7.5)}${petal(0, 24, 8.5)}
      <path d="M0 -4V-17M-4 -5L-7 -14M4 -5L7 -14" stroke="${D}" stroke-width=".8" fill="none"/>
      <path d="M-12 -6H12L8 4H-8Z" fill="${M}" fill-opacity=".75" stroke="${D}" stroke-width="1.1" stroke-linejoin="round"/>
      <g fill="#f7f9f7"><circle cx="-5" cy="-2" r="1.3"/><circle cx="0" cy="-2" r="1.3"/><circle cx="5" cy="-2" r="1.3"/><circle cx="-2.5" cy="1.5" r="1.2"/><circle cx="2.5" cy="1.5" r="1.2"/></g>
      <path d="M-15 5C-6 12 6 12 15 5" fill="none" stroke="${D}" stroke-width="1.1"/>
      ${petal(160, 9, 5)}${petal(-160, 9, 5)}</g>`;
  const leaf = (x, y, a, s = 1) => `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${r1(a)}) scale(${s})"><path d="M0 0C5 -7 16 -8 26 -2C20 0 18 3 13 3C8 5 4 3 0 0Z" ${wash}/><path d="M2 -.5C9 -3 16 -3 23 -2" fill="none" stroke="${D}" stroke-width=".6"/></g>`;
  const vy = (x) => 141 + 38 * Math.sin((x / 180) * Math.PI * 2 + 0.9);
  const vpts = [];
  for (let x = -20; x <= 420; x += 10) vpts.push([x, vy(x)]);
  let deco = '';
  // 叶子：沿主藤交替两侧
  for (let x = 4, k = 0; x < 400; x += 19, k++) {
    const y = vy(x), dy = vy(x + 1) - y, ang = (Math.atan2(dy, 1) * 180) / Math.PI;
    deco += leaf(x, y, ang + (k % 2 ? 40 : -40), 0.75 + (k % 3) * 0.08);
  }
  // 卷须
  [[24, 1], [146, -1], [256, 1], [330, -1]].forEach(([x, d]) => {
    const y = vy(x);
    deco += `<path d="M${x} ${r1(y)}Q${x + 8} ${r1(y + d * 14)} ${x + 18} ${r1(y + d * 16)}" fill="none" stroke="${D}" stroke-width="1.1"/><path d="${spiral(x + 22, y + d * 14, 6, 1.3, Math.PI, d)}" fill="none" stroke="${D}" stroke-width="1.1"/>`;
  });
  // 花：放在藤蔓弯里，用短枝连到主藤
  [[44, 206, 62], [118, 82, 106], [290, 206, 292], [362, 82, 352]].forEach(([fx, fy, sx]) => {
    const sy = vy(sx), up = fy < sy;
    deco += `<path d="M${sx} ${r1(sy)}Q${r1((sx + fx) / 2 + (up ? -14 : 14))} ${r1((sy + fy) / 2)} ${fx} ${fy + (up ? 4 : -2)}" fill="none" stroke="${D}" stroke-width="1.5"/>`;
    deco += leaf((sx + fx) / 2, (sy + fy) / 2, up ? -120 : 60, 0.8);
    deco += lotus(fx, fy, 1.32);
  });
  // 如意云头
  let ruyi = '';
  for (let x = 0; x <= 400; x += 40) ruyi += `<path d="M${x - 20} 20C${x - 20} 32 ${x - 8} 30 ${x - 6} 37C${x - 4} 44 ${x + 4} 44 ${x + 6} 37C${x + 8} 30 ${x + 20} 32 ${x + 20} 20" ${wash}/><path d="M${x - 9} 26C${x - 6} 32 ${x - 2} 36 ${x} 38C${x + 2} 36 ${x + 6} 32 ${x + 9} 26" fill="none" stroke="${D}" stroke-width=".8"/>`;
  // 莲瓣带
  let lb = '';
  for (let x = 0; x <= 400; x += 26) lb += `<path d="M${x - 11} 300V268C${x - 11} 258 ${x - 4} 252 ${x} 248C${x + 4} 252 ${x + 11} 258 ${x + 11} 268V300" ${wash}/><path d="M${x - 5.5} 300V272C${x - 5.5} 266 ${x - 2} 262 ${x} 260C${x + 2} 262 ${x + 5.5} 266 ${x + 5.5} 272V300" fill="none" stroke="${D}" stroke-width=".9"/>`;
  const med = 'M136 146C136 120 156 104 176 106C184 96 216 96 224 106C244 104 264 120 264 146C264 172 244 188 224 186C216 196 184 196 176 186C156 188 136 172 136 146Z';
  return SV('0 0 400 300', `<defs>
      <radialGradient id="a17-glaze" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="#fbfcfa"/><stop offset=".7" stop-color="#eef1ef"/><stop offset="1" stop-color="#dde4e6"/></radialGradient>
      <filter id="a17-heap" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".11" numOctaves="2" seed="17" result="n"/><feColorMatrix in="n" values="0 0 0 0 .04  0 0 0 0 .1  0 0 0 0 .34  0 0 0 2.6 -1.25" result="d"/><feComposite in="d" in2="SourceGraphic" operator="in" result="dd"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="dd"/></feMerge></filter>
    </defs>
    <rect width="400" height="300" fill="url(#a17-glaze)"/>
    <g filter="url(#a17-heap)">
      <rect x="0" y="0" width="400" height="11" fill="${D}"/>
      <path d="M0 14H400M0 17.5H400" stroke="${D}" stroke-width="1"/>
      ${ruyi}
      <path d="${smooth(vpts)}" fill="none" stroke="${D}" stroke-width="2.2"/>
      ${deco}
      <path d="M0 240H400M0 243.5H400" stroke="${D}" stroke-width="1"/>
      ${lb}
    </g>
    <path d="${med}" fill="#f8faf8" stroke="${D}" stroke-width="2"/>
    <path d="${med}" fill="none" stroke="${D}" stroke-width=".8" transform="translate(200 146) scale(.9) translate(-200 -146)"/>
    <text x="200" y="152" text-anchor="middle" font-family="'Noto Serif SC', serif" font-weight="600" font-size="22" letter-spacing="4" fill="${D}">幂级数</text>
    <text x="200" y="171" text-anchor="middle" font-family="'Noto Serif SC', serif" font-size="8.5" letter-spacing="2.5" fill="${M}">第三章 · 收敛半径</text>`);
})();

// A18 宋式雅色（宽格）：马远式一角构图，远山、孤舟、大量留白
const a18 = (() => {
  const C = { tq: '#a9c4c0', yb: '#dfe7e4', qx: '#b9ab73', dai: '#55626a', yz: '#a8423a' };
  const R = rng(1818);
  const ridge = (x0, x1, base, peaks, j = 3) => {
    const pts = [];
    for (let x = x0; x <= x1; x += 8) {
      let e = 0;
      peaks.forEach(([px, ph, pw]) => { e = Math.max(e, ph * Math.exp(-(((x - px) / pw) ** 2))); });
      pts.push([x, base - e + (R() - 0.5) * j]);
    }
    return `${smooth(pts)}L${x1} 350L${x0} 350Z`;
  };
  let reeds = '';
  for (let i = 0; i < 16; i++) {
    const x = 18 + i * 7 + R() * 5, h = 22 + R() * 30, bend = 4 + R() * 8;
    reeds += `<path d="M${r1(x)} 350Q${r1(x + bend * .4)} ${r1(350 - h * .6)} ${r1(x + bend)} ${r1(350 - h)}"/>`;
  }
  return SV('0 0 800 350', `<defs>
      <linearGradient id="a18-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9eeeb"/><stop offset="1" stop-color="#f3f2ec"/></linearGradient>
      <linearGradient id="a18-m1" gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="0" y2="214"><stop offset="0" stop-color="${C.tq}" stop-opacity=".6"/><stop offset="1" stop-color="${C.tq}" stop-opacity="0"/></linearGradient>
      <linearGradient id="a18-m2" gradientUnits="userSpaceOnUse" x1="0" y1="140" x2="0" y2="244"><stop offset="0" stop-color="#8eaaa8" stop-opacity=".8"/><stop offset="1" stop-color="${C.tq}" stop-opacity="0"/></linearGradient>
      <linearGradient id="a18-m3" gradientUnits="userSpaceOnUse" x1="0" y1="180" x2="0" y2="304"><stop offset="0" stop-color="${C.dai}" stop-opacity=".78"/><stop offset="1" stop-color="${C.dai}" stop-opacity="0"/></linearGradient>
      <radialGradient id="a18-moon"><stop offset="0" stop-color="#fbfbf6"/><stop offset=".7" stop-color="#f6f6ef"/><stop offset="1" stop-color="#f6f6ef" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="800" height="350" fill="url(#a18-sky)"/>
    <circle cx="560" cy="92" r="30" fill="url(#a18-moon)"/>
    <path d="${ridge(-10, 480, 214, [[60, 110, 46], [150, 70, 40], [250, 92, 34], [350, 46, 40]])}" fill="url(#a18-m1)"/>
    <path d="${ridge(-10, 340, 244, [[20, 100, 40], [110, 64, 34], [196, 40, 32]], 2)}" fill="url(#a18-m2)"/>
    <path d="${ridge(-10, 230, 304, [[0, 124, 50], [70, 76, 30], [130, 26, 30]], 2)}" fill="url(#a18-m3)"/>
    <g fill="${C.dai}" opacity=".55">${[4, 14, 24, 33, 58, 66, 74, 81].map((x, i) => { const e = Math.max(...[[0, 124, 50], [70, 76, 30], [130, 26, 30]].map(([px, ph, pw]) => ph * Math.exp(-(((x - px) / pw) ** 2)))); return `<ellipse cx="${x}" cy="${r1(304 - e + 3 + (i % 3) * 2)}" rx="2.4" ry="1.2"/>`; }).join('')}</g>
    <g fill="none" stroke="${C.dai}" stroke-width="1.1" stroke-linecap="round" opacity=".75">${reeds}</g>
    <g stroke="${C.dai}" fill="none" stroke-linecap="round">
      <path d="M318 262Q338 268 362 260" stroke-width="2"/>
      <path d="M336 262L337 251" stroke-width="1.2"/><circle cx="337" cy="249" r="2.2" fill="${C.dai}" stroke="none"/>
      <path d="M339 254L376 236" stroke-width=".7"/>
      <path d="M376 236L378 266" stroke-width=".4" opacity=".6"/>
    </g>
    <g fill="none" stroke="${C.tq}" stroke-width="1" stroke-linecap="round" opacity=".9"><path d="M300 274q14 -3 28 0M368 270q10 -2 20 0M280 286q20 -3 40 0M392 282q12 -2 24 0"/></g>
    <g font-family="'LXGW WenKai TC', 'Noto Serif SC', serif" fill="${C.dai}" text-anchor="middle">${[...'数学分析'].map((c, i) => `<text x="704" y="${92 + i * 34}" font-size="27">${c}</text>`).join('')}</g>
    <g font-family="'Noto Serif SC', serif" fill="${C.dai}" opacity=".8" text-anchor="middle" font-size="10">${[...'第一章 极限'].map((c, i) => `<text x="666" y="${96 + i * 15}">${c}</text>`).join('')}</g>
    <rect x="694" y="232" width="20" height="20" fill="${C.yz}" opacity=".88"/>
    <g font-family="'Noto Serif SC', serif" font-weight="700" font-size="8" fill="#f3ece2" text-anchor="middle"><text x="699.5" y="240.5">分</text><text x="708.5" y="240.5">数</text><text x="699.5" y="249">学</text><text x="708.5" y="249">析</text></g>
    <g font-family="'Noto Serif SC', serif" font-size="7.5" fill="${C.dai}" opacity=".85">
      ${[['天青', C.tq], ['月白', C.yb], ['秋香', C.qx], ['黛', C.dai], ['胭脂', C.yz]].map(([n, c], i) => `<rect x="${560 + i * 30}" y="306" width="22" height="10" fill="${c}"/><text x="${571 + i * 30}" y="327" text-anchor="middle">${n}</text>`).join('')}
    </g>`);
})();

const PAGE2 = [
  {
    code: 'A11', name: '浮世绘', en: 'Ukiyo-e', meta: '日本 · 江户时代 17–19 世纪',
    desc: '江户时代的木刻版画，代表是葛饰北斋《神奈川冲浪里》。最好认的是：普鲁士蓝的大浪、浪尖像鹰爪一样卷起的白色浪花、平涂色块加清晰的木刻轮廓线、天空上方的渐层暗带、竖排的标题框和朱红印章；海面常用「青海波」纹样。网页上适合做日式主题的头图；内容放在留白的天空或标题框里。',
    more: '浮世绘是批量印刷的平民艺术：一块木版印一种颜色，所以色块是平的、边缘是硬的。1830 年前后进口的合成颜料普鲁士蓝让北斋、广重的风景画以蓝色为主调。它深刻影响了梵高和印象派（「日本主义」）。借用要点：限制颜色（蓝、米黄、少量朱红）、粗细均匀的深色描边、纸张颗粒。不适合：需要现代科技感的界面；也别把大浪放在正文后面——细节太多会干扰阅读。',
    kw: ['神奈川冲浪里', '普鲁士蓝', '青海波', '木刻线', '朱红印章'],
    html: a11, bg: '#ebdfc2',
    links: [['Wikipedia · Ukiyo-e', W_('Ukiyo-e')], ['Wikipedia · The Great Wave off Kanagawa', W_('The_Great_Wave_off_Kanagawa')], ['Wikipedia · Hokusai', W_('Hokusai')]],
    css: `/* 青海波：四层径向渐变平铺 */
.seigaiha {
  --b: #1f3c6e; --l: #c9d4e3; --s: 6cqw;
  background:
    radial-gradient(circle at 50% 100%, var(--b) 20%, var(--l) 21% 24%,
      var(--b) 25% 44%, var(--l) 45% 48%, var(--b) 49% 68%,
      var(--l) 69% 72%, transparent 73%) 0 0 / var(--s) calc(var(--s) / 2),
    radial-gradient(circle at 50% 100%, var(--b) 20%, var(--l) 21% 24%,
      var(--b) 25% 44%, var(--l) 45% 48%, var(--b) 49% 68%,
      var(--l) 69% 72%, transparent 73%) calc(var(--s) / 2) calc(var(--s) / 4) / var(--s) calc(var(--s) / 2),
    var(--b);
}`
  },
  {
    code: 'A12', name: '水墨', en: 'Ink wash painting', meta: '中国 · 唐宋以来',
    desc: '用墨的浓淡干湿画山水：远山淡、近山浓，山脚隐进雾里，大片空白就是水和天（「计白当黑」），一叶小舟、两只飞鸟点出尺度，最后盖一方朱红印章。网页上适合做中文学习、诗词、哲学类页面的头图；文字压在留白处，用书法字或宋体。',
    more: '水墨画的核心是「墨分五色」（焦、浓、重、淡、清）和留白。远近靠浓淡表现，不靠透视线；山的纹理用「皴法」——这里在山脊下画了短笔触来模拟。代表：范宽《溪山行旅图》、马远、夏圭的「边角之景」，以及后世的文人画。实现：画布逐层画山，每层用竖向渐变把山脚擦淡，远山再加一点模糊。不适合：需要大量彩色图表的页面——满屏黑白灰会让彩色元素显得突兀；也别配英文无衬线大标题。',
    kw: ['远山', '留白', '晕染', '浓淡', '印章'],
    html: `<canvas class="ar-fill-cv"></canvas><div class="ar-a12-t"><b>极限</b><span>数学分析 · 第一章</span><i>析</i></div>`,
    init(stage, ctx) { paintCanvas(stage, ctx, stage.querySelector('canvas'), a12draw); },
    bg: '#f2ede1',
    links: [['Wikipedia · Ink wash painting', W_('Ink_wash_painting')], ['Wikipedia · Shan shui', W_('Shan_shui')]],
    css: `/* 层叠远山的近似：多层渐变剪影 + 底部白雾 */
.ink {
  background:
    linear-gradient(to top, #f2ede1 8%, transparent 40%),
    radial-gradient(60% 40% at 12% 100%, rgba(25,28,32,.8), transparent 70%),
    radial-gradient(50% 35% at 75% 70%, rgba(40,44,50,.25), transparent 70%),
    #f2ede1;
}
.ink h1 { font-family: 'Ma Shan Zheng', cursive; writing-mode: vertical-rl;
  color: #1c1c1e; letter-spacing: .1em; }
.ink .seal { background: #b8322a; color: #f2ede1; }`
  },
  {
    code: 'A13', name: '国潮', en: 'Guochao (China-chic)', meta: '中国 · 2018 年起',
    desc: '「国风 + 潮流」：中国红配金色，祥云、海水江崖、山石等传统纹样被简化成扁平图形，配上现代粗体中文标题、英文小字和编号，像潮牌海报一样排版。网页上适合节日活动、文创、品牌宣传页；正文区要换回浅底，红底只用在头图和按钮上。',
    more: '国潮兴起于 2018 年前后（李宁纽约时装周、故宫文创、各品牌联名），本质是把传统符号「去复杂化」后放进当代设计里。常见元素：祥云（卷曲的如意云头）、海水江崖（龙袍下摆的斜条纹「立水」+ 浪花 + 山石）、红金配色、书法或粗黑体大字、竖排、印章、英文副标题。不适合：严肃的学术内容——大红大金会显得热闹而不专注；纹样不要堆满，一个主图形就够。',
    kw: ['中国红', '金色', '祥云', '海水江崖', '粗体中文'],
    html: a13, bg: '#b5161d', dark: true,
    css: `.guochao {
  background: radial-gradient(circle at 65% 38%, #cf1f26, #8c0c12 80%);
  color: #fbe7bd;
}
.guochao h1 { font-family: 'ZCOOL QingKe HuangYou', sans-serif;
  font-size: 15cqw; line-height: 1.05; letter-spacing: .03em; }
.guochao .sun { border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #f7d27a, #df9f32);
  box-shadow: 0 0 0 2cqw #b5161d, 0 0 0 2.2cqw #e9b44c; }
.guochao .hem { /* 海水江崖的「立水」 */
  background: repeating-linear-gradient(-48deg, #e9b44c 0 1cqw,
    #b5161d 0 2cqw, #1f7a6d 0 3cqw, #b5161d 0 4cqw); }`
  },
  {
    code: 'A14', name: '侘寂', en: 'Wabi-sabi', meta: '日本 · 茶道美学',
    desc: '日本茶道里「接受不完美、不长久、不完整」的美学：粗陶的土色和斑点、枯笔画出的不闭合的圆（圆相 ensō），器物裂了用金粉修补（金缮），整体安静、朴素、留白多。网页上适合手作、茶、设计工作室、个人随笔一类的页面；配色只用土色和墨色，字要小而疏。',
    more: '「侘」指简朴、清寂，「寂」指时间留下的痕迹。代表：千利休的草庵茶室、乐烧茶碗；圆相是禅宗一笔画成的圆，故意留一个缺口，飞白（枯笔露出的纸底）是关键。实现：背景用 SVG feTurbulence 做陶土的斑驳和颗粒，圆相用画布模拟几十根笔毛、墨越画越少。不适合：需要明快、高效感的产品界面；和「极简」的区别是——极简追求精确干净，侘寂追求粗糙和自然的痕迹。',
    kw: ['圆相', '粗陶', '土色', '金缮', '不完美'],
    html: `${a14}<canvas class="ar-fill-cv"></canvas><div class="ar-a14-t"><b>侘寂</b><span>不完美 · 不长久 · 不完整</span></div>`,
    init(stage, ctx) { paintCanvas(stage, ctx, stage.querySelector('canvas'), a14draw); },
    bg: '#cbbca3',
    links: [['Wikipedia · Wabi-sabi', W_('Wabi-sabi')], ['Wikipedia · Ensō', W_('Ens%C5%8D')], ['Wikipedia · Kintsugi', W_('Kintsugi')]],
    css: `/* 陶土质感：SVG 噪点做背景图 */
.wabi {
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E"),
    radial-gradient(circle at 30% 30%, #d6c8b0, #b9a98c);
  color: #2b2520;
}
.wabi h1 { font-family: 'Noto Serif SC', serif; font-weight: 300;
  letter-spacing: .4em; }`
  },
  {
    code: 'A15', name: '回纹 / 冰裂纹窗格', en: 'Chinese lattice', meta: '中国 · 明清园林',
    desc: '江南园林花窗的样子：深色木格背后透着暖光的窗纸，外圈是方折回旋、连绵不断的「回纹」，中间是像冰面裂开的不规则多边形「冰裂纹」，正中留一个圆形的空处。网页上适合做中式页面的边框、章节分隔或开屏；正文放在中间留白处，木格颜色要深、线要粗细一致。',
    more: '回纹由「回」字形方折线连续排列，寓意绵延不断，常见于青铜器、瓷器、家具边框；冰裂纹来自冰面的裂纹和哥窑瓷的开片，是明清窗棂里最自由的一种格子（计成《园冶》里有记载）。这里的冰裂纹用程序把矩形随机切成多边形生成。不适合：需要现代感的工具界面；回纹作为边框时宽度要克制，太宽会像餐馆菜单。',
    kw: ['回纹', '冰裂纹', '花窗', '木格', '园林'],
    html: a15, bg: '#f1d9a6',
    links: [['Wikipedia · Meander (art)', W_('Meander_(art)')]],
    css: `/* 回纹带：一个「回」字单元横向平铺 */
.huiwen {
  height: 5cqw;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M1 19V1h18v14H5V5h10v6H9' fill='none' stroke='%234b2e1f' stroke-width='2'/%3E%3C/svg%3E")
    0 0 / 5cqw 5cqw repeat-x;
  border-block: .6cqw solid #4b2e1f;
}
.window { background: radial-gradient(#fff6df, #f1d9a6 70%, #d9b675);
  outline: 1.2cqw solid #4b2e1f; }
.window h1 { font-family: 'Noto Serif SC', serif; color: #3b2418; }`
  },
  {
    code: 'A16', name: '敦煌', en: 'Dunhuang murals', meta: '中国 · 北魏至元 4–14 世纪',
    desc: '敦煌莫高窟壁画和藻井（洞窟顶部的方形图案）的配色与纹样：石青、石绿、赭石、土红这些矿物颜料，层层套叠的方井，正中一朵莲花，四周是联珠纹、卷草纹、垂幔三角，还有飞天身上翻卷的长飘带；整体带着褪色斑驳的旧墙感。网页上适合文博、丝路、传统文化主题；内容放在「榜题」式的竖条框里。',
    more: '莫高窟始建于公元 366 年，现存 735 个洞窟、4.5 万平方米壁画。矿物颜料让它的颜色偏灰、偏暖，常年氧化后更显沉稳——这正是它和国潮大红大金的区别。藻井一般是「方井套圆、圆中莲花」，边饰一圈比一圈细。飞天没有翅膀，靠飘带表现飞翔，飘带会翻出正反两面不同颜色。不适合：大面积做正文背景（太花）；只借配色时，记得降低饱和度。',
    kw: ['藻井', '石青石绿', '土红赭石', '飞天飘带', '莲花'],
    html: a16, bg: '#d8bf92',
    links: [['Wikipedia · Mogao Caves', W_('Mogao_Caves')], ['Wikipedia · Apsara', W_('Apsara')]],
    css: `/* 藻井：方井里斜套一个方井，正中一朵莲（颜色为近似值） */
.zaojing {
  --qing: #2f6d8c; --lv: #4f9a84; --zhe: #b8793c;
  --hong: #a5452b; --tu: #e7d4ad;
  position: relative; aspect-ratio: 1; background: var(--qing);
  border: 3cqh solid var(--hong); outline: 3cqh solid var(--zhe);
}
.zaojing::before { content: ""; position: absolute; inset: 14.6%;
  background: var(--lv); rotate: 45deg; }
.zaojing::after { content: ""; position: absolute; inset: 30%;
  border-radius: 50%;
  background: radial-gradient(var(--hong) 0 25%, var(--tu) 26%); }`
  },
  {
    code: 'A17', name: '青花瓷', en: 'Blue-and-white porcelain', meta: '中国 · 元明清 14 世纪起',
    desc: '白地上用钴蓝画花：主纹是藤蔓缠绕、一朵朵莲花的「缠枝莲」，上下有如意云头和莲瓣纹的边饰带，中间常留一块白色「开光」写字。钴料浓处会积成深蓝的小斑点。网页上只用两种颜色就很有辨识度，适合做中式主题的头图、分隔条、加载图案；正文区直接用它的白底蓝字。',
    more: '青花始于唐宋、成熟于元代景德镇，用进口的钴料（苏麻离青）在胎上绘画再罩透明釉烧成。明代永乐、宣德青花最受推崇——发色浓艳、带「铁锈斑」。纹样分层：口沿（回纹、卷草）、肩部（如意云头）、腹部主纹（缠枝莲、龙、山水）、底部（莲瓣）。借用要点：深蓝勾线 + 浅蓝平涂（「分水」），白底要略偏冷。不适合：需要暖色、活泼氛围的页面；也别把青花纹样铺满整页做正文背景。',
    kw: ['钴蓝', '缠枝莲', '开光', '如意云头', '莲瓣'],
    html: a17, bg: '#f4f6f3',
    links: [['Wikipedia · Blue and white pottery', W_('Blue_and_white_pottery')]],
    css: `.qinghua {
  background: radial-gradient(circle at 45% 40%, #fbfcfa, #eef1ef 70%, #dfe5e6);
  color: #1c3584;
}
.qinghua .band { /* 边饰带：深蓝细线 + 浅蓝平涂 */
  border-block: 1px solid #1c3584;
  background: repeating-linear-gradient(90deg,
    rgba(61,99,184,.55) 0 3cqw, transparent 0 4cqw);
}
.qinghua .medallion { border: .5cqw solid #1c3584; border-radius: 50% / 40%;
  outline: 1px solid #1c3584; outline-offset: -1.6cqw; background: #f8faf8; }`
  },
  {
    code: 'A18', name: '宋式雅色', en: 'Song dynasty aesthetics', meta: '中国 · 宋代 960–1279',
    desc: '宋代绘画和瓷器的低饱和「雅色」：汝窑的天青、月白，秋香、黛、胭脂……色相不鲜艳，偏灰、偏冷、偏淡。构图学马远的「一角」——远山只占一角，隐在雾里，一叶孤舟，其余全是空白。网页上非常适合做数学、文史这类需要长时间阅读的网站背景：安静、不抢内容，标题用楷体或宋体竖排点缀即可。',
    more: '宋人审美追求「平淡天真」：汝窑只烧单色釉，以「雨过天青云破处」为最高；画院山水从北宋的全景巨嶂走向南宋马远、夏圭的边角小景，留白成了画的主角。色名（近似值）：天青 #a9c4c0、月白 #dfe7e4、秋香 #b9ab73、黛 #55626a、胭脂 #a8423a。用作网站背景时：页面底色用月白一类的偏冷浅色，天青做强调、黛做文字，胭脂只用于极少的点缀（印章、当前项）。不适合：需要活力、促销感的页面；颜色要成套使用，混进一个高饱和色就破了。',
    kw: ['天青', '月白', '留白', '马一角', '低饱和'],
    html: `${a18}<div class="ar-a18-mist"><i></i><i></i></div>`, bg: '#eef0eb', wide: true,
    links: [['Wikipedia · Ru ware', W_('Ru_ware')], ['Wikipedia · Ma Yuan', W_('Ma_Yuan')]],
    css: `/* 宋式雅色：月白底、天青远山、黛色竖排标题 */
.song {
  --tianqing: #a9c4c0; --yuebai: #dfe7e4; --qiuxiang: #b9ab73;
  --dai: #55626a; --yanzhi: #a8423a;
  background:
    radial-gradient(70% 55% at 10% 100%, rgba(85,98,106,.35), transparent 70%),
    radial-gradient(60% 50% at 25% 75%, rgba(169,196,192,.55), transparent 70%),
    linear-gradient(#e9eeeb, #f3f2ec);
  color: var(--dai);
}
.song h1 { writing-mode: vertical-rl; font-family: 'LXGW WenKai TC', serif;
  font-weight: 400; letter-spacing: .3em; }`
  }
];

// ============================================================
// 第 3 页 · 界面材质的演变
// ============================================================
const ICO = {
  integral: '<svg viewBox="0 0 24 24"><path d="M4 4v16h16"/><path d="M6.5 16c2.5-7 5-9 7-5s3.5 3 5-5"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 12h16M12 4v16"/></svg>',
  dice: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/></svg>',
  pen: '<svg viewBox="0 0 24 24"><path d="M5 19l1-4L16 5l3 3L9 18z"/><path d="M14 7l3 3"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></svg>'
};
const longShadow = (n, step, col) => Array.from({ length: n }, (_, i) => `${r1((i + 1) * step * 100) / 100}cqw ${r1((i + 1) * step * 100) / 100}cqw 0 ${col}`).join(',');

const PAGE3 = [
  {
    code: 'A19', name: '拟物', en: 'Skeuomorphism', meta: 'iOS 1–6 · 2007–2013',
    desc: '让界面模仿真实物件：iOS 6 的备忘录是皮革封面、缝线、撕下的黄色横格纸，背景是亚麻布，按钮像凸起的胶囊、上半截有一道高光，开关像真实的拨动开关。网页上适合做怀旧主题、游戏、乐器/工具类模拟器；做学习网站时可借「纸张」质感，但别全套照搬。',
    more: '拟物（skeuomorphism）主导了 2007–2013 年的苹果界面：皮革日历、木纹书架（iBooks）、亚麻布通知中心、带反光的金属旋钮。它降低了新用户理解触屏的门槛，但也带来视觉噪音和制作成本；2013 年 iOS 7 换成扁平风格。实现：纹理用 SVG 噪点、缝线用 dashed 边框、高光用上下两段的硬分界渐变（50% 处断开）、凸起用内阴影 + 1px 亮边。不适合：信息密集的现代界面；纹理太多会让文字难读。',
    kw: ['皮革缝线', '亚麻布', '高光按钮', 'iOS 6', '仿真纹理'],
    html: `<div class="ar-sk"><div class="ar-sk-pad">
      <div class="ar-sk-top"><span class="ar-sk-btn">返回</span><b>备忘录</b><span class="ar-sk-btn ar-sk-blue">完成</span></div>
      <div class="ar-sk-paper"><p class="ar-sk-date">今天 下午 3:14</p><p>幂级数 Σ aₙxⁿ</p><p>收敛半径 R = 1</p><p>端点要单独检验!</p>
        <div class="ar-sk-sw"><em>自动保存</em><span class="ar-sk-tog"><b>ON</b><i></i></span></div></div>
    </div></div>`,
    bg: '#33363b', dark: true,
    links: [['Wikipedia · Skeuomorph', W_('Skeuomorph')]],
    css: `/* iOS 6 式高光按钮：上下两段渐变在 50% 处硬断开 */
.glossy {
  background: linear-gradient(#8fbaf7, #4a86ea 50%, #2c6ade 51%, #3a78e6);
  border: 1px solid #1d4fa8; border-radius: 6px; color: #fff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 1px 0 rgba(255,255,255,.2);
  text-shadow: 0 -1px 0 rgba(0,0,0,.35);
}
/* 皮革上的缝线 */
.leather { background: #6e4428 url(noise.svg); position: relative; }
.leather::after { content: ""; position: absolute; inset: auto 10px 6px;
  border-bottom: 2px dashed rgba(240,220,190,.7); }`
  },
  {
    code: 'A20', name: '扁平', en: 'Flat design', meta: 'Windows Metro · iOS 7 · 2010–2014',
    desc: '把阴影、渐变、纹理全部拿掉，只剩纯色块、白色线性图标和干净的无衬线字。微软 Metro 的「动态磁贴」是代表：彩色方块拼成网格；2013 年前后还流行「长投影」——图标朝 45° 拖出一条长长的斜影。网页上适合信息清楚、按钮明确的工具页和仪表盘；缺点是层级不明显，可点和不可点容易混。',
    more: '扁平设计由 Windows Phone 7（2010）的 Metro 语言带起，iOS 7（2013）全面跟进，Flat UI 色板（青绿 #1abc9c、彼得河蓝 #3498db、茜红 #e74c3c、向日葵黄 #f1c40f）当年随处可见。它的问题是「看不出哪里能点」，所以后来的 Material Design 又把一点阴影加了回来（有时称「扁平 2.0」）。长投影可以用几十层 text-shadow 叠出来。不适合：需要强烈层次与质感的场景；纯扁平的表单要特别注意按钮的辨识度。',
    kw: ['纯色块', '磁贴', '长投影', '线性图标', 'Metro'],
    html: `<div class="ar-flat"><b class="ar-flat-h">开始</b>
      <div class="ar-flat-tiles">
        <div style="--ar-c:#1abc9c">${ICO.integral}<span>微积分</span></div>
        <div style="--ar-c:#3498db">${ICO.grid}<span>线性代数</span></div>
        <div style="--ar-c:#e74c3c">${ICO.dice}<span>概率</span></div>
        <div class="w2" style="--ar-c:#9b59b6"><strong>12</strong><span>周一 · 习题课</span></div>
        <div style="--ar-c:#f1c40f">${ICO.pen}<span>笔记</span></div>
      </div>
      <div class="ar-flat-side"><div class="ar-flat-badge"><b style="text-shadow:${longShadow(44, 0.3, '#c0601a')}">∑</b></div><span class="ar-flat-btn">开始学习</span></div>
    </div>`,
    bg: '#34495e', dark: true,
    links: [['Wikipedia · Flat design', W_('Flat_design')], ['Wikipedia · Metro (design language)', W_('Metro_(design_language)')]],
    css: `.flat-tile { background: #1abc9c; color: #fff; border-radius: 0; box-shadow: none; }
.flat-btn { background: #2ecc71; color: #fff; border: 0; border-radius: 4px; }
/* 长投影：叠很多层没有模糊的 text-shadow，再用圆形 overflow 裁掉 */
.long-shadow { background: #e67e22; border-radius: 50%; overflow: hidden; }
.long-shadow b { color: #fff;
  text-shadow: 1px 1px #c0601a, 2px 2px #c0601a, 3px 3px #c0601a,
    /* ……一直到 */ 60px 60px #c0601a; }`
  },
  {
    code: 'A21', name: 'Material Design', en: 'Material Design', meta: 'Google · 2014',
    desc: '谷歌 2014 年的设计语言：把界面想成一张张有厚度的「纸」，按高度（elevation）叠放，越高投影越大越柔；顶部是彩色应用栏，右下角一个圆形悬浮按钮（FAB），字体 Roboto，色板是 Indigo、Pink 这类饱和色。网页上适合做逻辑清楚的应用界面；卡片、列表、按钮都有现成规范可依。',
    more: 'Material Design 介于拟物和扁平之间：不模仿真实纹理，但保留「物理」的光影和层级——每个元素有固定的 z 高度（1、2、4、6、8、16、24dp），阴影随高度变化，动画模拟纸片的移动。三版演进：2014 Material、2018 Material 2（更多留白）、2021 Material You（从壁纸取色，圆角更大）。不适合：想要强烈个性或品牌感的页面——它太「像谷歌」；阴影层级要守规矩，乱用会显得脏。',
    kw: ['纸片层叠', '投影层级', 'FAB', 'Roboto', '应用栏'],
    html: `<div class="ar-md">
      <div class="ar-md-bar"><div class="ar-md-planes"><i></i><i></i><i></i></div>
        <div class="ar-md-tb">${ICO.menu}<b>数学分析</b>${ICO.search}</div>
        <div class="ar-md-tabs"><span class="on">章节</span><span>习题</span><span>笔记</span></div></div>
      <div class="ar-md-list">
        <div class="ar-md-card"><i style="--ar-c:#ff9800">1</i><div><b>极限与连续</b><small>12 节 · 已完成</small></div></div>
        <div class="ar-md-card ar-md-up"><i style="--ar-c:#009688">2</i><div><b>级数</b><small>正在学习 · 第 3 节</small></div></div>
        <div class="ar-md-card"><i style="--ar-c:#9c27b0">3</i><div><b>微分学</b><small>未开始</small></div></div>
      </div>
      <div class="ar-md-fab"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>
    </div>`,
    bg: '#eeeeee',
    links: [['Wikipedia · Material Design', W_('Material_Design')]],
    css: `/* 高度 = 阴影：dp 越大，阴影越大越柔 */
.card { background: #fff; border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24); }  /* 1dp */
.card.raised {
  box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23); } /* 8dp */
.app-bar { background: #3f51b5; color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.25); font-family: 'Roboto', sans-serif; }
.fab { width: 56px; height: 56px; border-radius: 50%; background: #ff4081;
  box-shadow: 0 6px 10px rgba(0,0,0,.25), 0 2px 4px rgba(0,0,0,.2); }`
  },
  {
    code: 'A22', name: '新拟态', en: 'Neumorphism', meta: 'Dribbble 潮流 · 2019–2020',
    desc: '元素和背景是同一种颜色，只靠一亮一暗两道阴影「压」出凸起或凹陷，像软塑料上冲压出来的按钮。左上角亮影、右下角暗影是凸起；把两道阴影改成 inset 就变凹陷。网页上适合做小面积的控件展示、音乐播放器、智能家居面板；不适合大量文字和表单——对比度太低，看不清边界。',
    more: '新拟态（soft UI）2019 年底从 Dribbble 上一组概念图走红，名字是 new + skeuomorphism。它的致命问题是可访问性：按钮和背景几乎同色，视力不好或屏幕偏暗时根本看不出边界，按下与未按下的区别也很弱。实践中通常只用在一两个装饰性的大控件上，再配一个有颜色的强调色（这里是蓝紫色进度环）。不适合：长文本、需要清楚状态的表单、深色以外的强对比需求。',
    kw: ['同色凸起', '内凹', '双阴影', 'soft UI', '低对比'],
    html: `<div class="ar-neu">
      <div class="ar-neu-dial"><div class="ar-neu-ring"></div><div class="ar-neu-core"><b>72<small>%</small></b><span>本章掌握度</span></div></div>
      <div class="ar-neu-col">
        <div class="ar-neu-field">${ICO.search}<span>搜索定理…</span></div>
        <div class="ar-neu-btn">开始学习</div>
        <div class="ar-neu-seg"><span class="on">讲义</span><span>习题</span></div>
      </div>
    </div>`,
    bg: '#e3e8ef',
    css: `.neu { background: #e3e8ef; color: #66768f; }
.raised { background: #e3e8ef; border-radius: 16px;
  box-shadow: 8px 8px 16px #b9c2cf, -8px -8px 16px #ffffff; }
.pressed { background: #e3e8ef; border-radius: 16px;
  box-shadow: inset 6px 6px 12px #b9c2cf, inset -6px -6px 12px #ffffff; }
/* 进度环：锥形渐变 + 遮罩挖空中间 */
.ring { border-radius: 50%;
  background: conic-gradient(#7b8cff 0 72%, transparent 0);
  mask: radial-gradient(closest-side, transparent 78%, #000 80%); }`
  },
  {
    code: 'A23', name: '玻璃拟态', en: 'Glassmorphism', meta: 'macOS Big Sur · Windows 11 · 2020 起',
    desc: '半透明的磨砂玻璃卡片浮在鲜艳的彩色光斑上：背后的颜色透过来、被模糊，卡片有一圈细细的白色亮边和柔和的投影。核心 CSS 只有一行 backdrop-filter: blur()。网页上适合做头图上的浮层、登录卡片、媒体控制条；正文卡片要加大不透明度，否则背景颜色会让文字难读。',
    more: '苹果从 iOS 7 起就在控制中心用毛玻璃，2020 年 macOS Big Sur、2021 年 Windows 11 的 Mica/Acrylic 材质让它成为主流，「Glassmorphism」这个名字则来自 2020 年的 Dribbble。要点：背后一定要有丰富的颜色（纯白背景上玻璃是看不出来的），玻璃本身 10–25% 的白，1px 半透明白边模拟玻璃厚度，阴影要很淡。注意性能：大面积 backdrop-filter 在低端设备上会卡；也要给不支持的浏览器一个实色退路。',
    kw: ['毛玻璃', '彩色光斑', '半透明', '细亮边', 'backdrop-filter'],
    html: `<div class="ar-gl"><i class="ar-gl-b1"></i><i class="ar-gl-b2"></i><i class="ar-gl-b3"></i>
      <div class="ar-gl-card"><small>第 2 讲 · 级数</small><b>幂级数</b><p>收敛半径 R = 1</p><div class="ar-gl-bar"><i></i></div>
        <div class="ar-gl-row"><span>进度 64%</span><span class="ar-gl-btn">继续 →</span></div></div>
      <div class="ar-gl-chip">∑</div></div>`,
    bg: '#1b1f3b', dark: true,
    css: `.glass {
  background: rgba(255,255,255,.14);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255,255,255,.35);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(10,10,40,.25);
  color: #fff;
}
.blob { border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff6ad5, #c026d3 60%, transparent 72%); }`
  },
  {
    code: 'A24', name: '黏土拟态', en: 'Claymorphism', meta: '2021–2022',
    desc: '像橡皮泥捏出来的 3D 元素：大圆角、粉彩色、鼓鼓的。做法是三层阴影——一层柔和的外投影把它托起来，一层内侧的暗影压在右下，一层内侧的亮光打在左上，看起来像充了气。网页上适合儿童教育、轻松的学习打卡、游戏化徽章；配圆润的粗体字。',
    more: '黏土拟态是 2021 年前后从 3D 插画（Blender 黏土风）延伸到 UI 的潮流，和新拟态的区别是：它有颜色、有明确的外投影，所以对比度和可读性都好得多。常配 3D 图标、圆滚滚的数字和大号圆角按钮。字体用圆体或几何粗体（这里是 Nunito 800）。不适合：严肃、专业、需要信任感的界面；元素太多会显得幼稚。',
    kw: ['粉彩', '鼓胀', '大圆角', '内外阴影', '3D 软萌'],
    html: `<div class="ar-clay"><i class="ar-clay-ball b1"></i><i class="ar-clay-ball b2"></i><i class="ar-clay-ball b3"></i>
      <div class="ar-clay-card"><div class="ar-clay-ico">∑</div><b>幂级数</b><small>12 道练习 · 约 20 分钟</small>
        <div class="ar-clay-row"><span class="ar-clay-btn">开始 →</span><span class="ar-clay-tag">Lv.2</span></div></div></div>`,
    bg: '#ece6ff',
    css: `.clay {
  background: #ffd9e6; border-radius: 32px;
  box-shadow:
    18px 24px 40px rgba(160,120,200,.35),      /* 外投影 */
    inset -10px -12px 20px rgba(220,120,160,.45), /* 右下内暗 */
    inset 10px 12px 18px rgba(255,255,255,.85);   /* 左上内亮 */
  font-family: 'Nunito', sans-serif; font-weight: 800;
}`
  },
  {
    code: 'A25', name: '极光 / 网格渐变', en: 'Aurora · Mesh gradient', meta: '2020 年代',
    desc: '几团柔和的彩色光斑互相叠加、缓慢流动，像极光或水彩晕开，没有明确的边界；Stripe 的官网头图让它成为科技产品的标配。实现上就是几个大号径向渐变叠在一起，用 transform 慢慢移动。网页上适合做首页头图和大标题的背景；正文区要回到纯色，光斑饱和度宁低勿高。',
    more: '「网格渐变」（mesh gradient）原本是 Illustrator 的功能：在一个网格的每个节点上放颜色，节点之间平滑过渡。网页上通常用多个 radial-gradient 近似，或用 WebGL 实时计算（Stripe 的做法）。「Aurora UI」是 2021 年对这类模糊彩色背景的叫法。要点：颜色选相邻的 3–4 个色相（青、绿、紫），深色底上用 mix-blend-mode: screen 让重叠处变亮；动画周期 20 秒以上，几乎察觉不到才对。不适合：背后要放大量小字的地方；动画要尊重「减少动效」设置。',
    kw: ['极光', '网格渐变', '柔和光斑', '流动', 'Stripe'],
    html: `<div class="ar-au"><i class="ar-au-1"></i><i class="ar-au-2"></i><i class="ar-au-3"></i><i class="ar-au-4"></i><div class="ar-au-stars"></div>
      <div class="ar-au-t"><small>MATHEMATICAL ANALYSIS · 2026</small><b>把极限讲清楚。</b><span>从 ε-δ 到幂级数，一步一步来</span><em>开始学习</em></div></div>`,
    bg: '#050a1a', dark: true, wide: true,
    css: `.aurora { background: #050a1a; position: relative; overflow: hidden; }
.aurora i { position: absolute; border-radius: 50%; mix-blend-mode: screen;
  animation: drift 24s ease-in-out infinite alternate; }
.aurora .a1 { width: 70%; height: 90%; left: -10%; top: -30%;
  background: radial-gradient(closest-side, #2dffb3, transparent); }
.aurora .a2 { width: 60%; height: 80%; right: -5%; top: -20%;
  background: radial-gradient(closest-side, #7a5cff, transparent); }
.aurora .a3 { width: 50%; height: 70%; left: 30%; bottom: -40%;
  background: radial-gradient(closest-side, #00c2ff, transparent); }
@keyframes drift { to { transform: translate(8%, 6%) rotate(12deg) scale(1.1); } }`
  },
  {
    code: 'A26', name: '噪点渐变', en: 'Grainy gradient', meta: '2021 年起',
    desc: '在柔和的渐变上撒一层细密的颗粒，像胶片或丝网印刷，让数码渐变不再「塑料」、色带也被打散。颗粒用 SVG 的 feTurbulence 滤镜生成，再用 mix-blend-mode 叠上去。网页上适合做有温度的品牌头图、海报式封面、按钮的填充；配一款优雅的衬线体很好看。',
    more: '噪点渐变在 2021 年前后流行开（Dribbble、各类 SaaS 落地页），也是对过于光滑的 3D 和玻璃风格的反动。颗粒还有实际作用：消除大面积渐变在 8 位屏幕上的色带（banding）。要点：颗粒要细（baseFrequency 0.7–0.9）、要淡（不透明度 0.2–0.5）；底色用暖色系过渡（橙→粉→紫）最常见。不适合：需要极致清晰、干净的界面（如图表背景）；颗粒层面积大时不要做动画。',
    kw: ['颗粒', '胶片感', 'feTurbulence', '暖色渐变', '海报'],
    html: `<div class="ar-gr"><div class="ar-gr-g"></div>
      <svg class="ar-gr-n" aria-hidden="true"><defs><filter id="a26-n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="2.2" intercept="-.6"/><feFuncG type="linear" slope="2.2" intercept="-.6"/><feFuncB type="linear" slope="2.2" intercept="-.6"/></feComponentTransfer></filter></defs><rect width="100%" height="100%" filter="url(#a26-n)"/></svg>
      <div class="ar-gr-t"><b>Analyse,<br><i>slowly.</i></b><span>第 2 讲 · 级数与收敛</span></div><span class="ar-gr-pill">开始阅读 →</span></div>`,
    bg: '#f3ece2',
    css: `.grainy { position: relative; isolation: isolate;
  background:
    radial-gradient(40% 50% at 72% 34%, #ff6a3d, transparent 70%),
    radial-gradient(45% 55% at 62% 78%, #ff2d87, transparent 70%),
    radial-gradient(40% 50% at 92% 88%, #6e4bff, transparent 70%),
    #f3ece2; }
.grainy::after { content: ""; position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay; opacity: .55; }`
  }
];

// ============================================================
// 第 4 页 · 亚文化与图形
// ============================================================

// A27 蒸汽波：条纹落日 + 透视网格（CSS 3D，transform 动画）+ 棕榈 + Win95 窗口
const a27 = (() => {
  const palm = (x, base, h, flip) => {
    const k = flip ? -1 : 1;
    const top = [x + k * 10, base - h];
    let fr = '';
    [[-150, 40], [-120, 46], [-60, 44], [-25, 40], [10, 34], [-95, 36], [170, 30]].forEach(([a, len], i) => {
      const ang = ((a * k + (flip ? 180 : 0)) * Math.PI) / 180;
      const ex = top[0] + Math.cos(ang) * len, ey = top[1] + Math.sin(ang) * len * 0.75 + 14;
      const mx = top[0] + Math.cos(ang) * len * 0.5, my = top[1] + Math.sin(ang) * len * 0.5 - 8;
      fr += `<path d="M${r1(top[0])} ${r1(top[1])}Q${r1(mx)} ${r1(my - 4)} ${r1(ex)} ${r1(ey)}Q${r1(mx + 2)} ${r1(my + 6)} ${r1(top[0])} ${r1(top[1] + 3)}Z"/>`;
      if (i % 2) fr += `<path d="M${r1(top[0])} ${r1(top[1])}Q${r1(mx)} ${r1(my - 4)} ${r1(ex)} ${r1(ey)}" fill="none" stroke="#1b0638" stroke-width="2.4"/>`;
    });
    return `<path d="M${x} ${base}Q${x + k * 2} ${base - h * 0.5} ${top[0]} ${top[1]}" fill="none" stroke="#1b0638" stroke-width="7" stroke-linecap="round"/>${fr}`;
  };
  let bars = '';
  [[176, 4], [188, 5.5], [199, 7], [210, 8.5], [221, 10]].forEach(([y, h]) => { bars += `<rect x="0" y="${y}" width="800" height="${h}" fill="#000"/>`; });
  return `<div class="ar-vw">
    ${SV('0 0 800 350', `<defs>
        <linearGradient id="a27-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#160a3d"/><stop offset=".35" stop-color="#5b1b8f"/><stop offset=".62" stop-color="#ff5fb8"/><stop offset=".72" stop-color="#ff9e7a"/></linearGradient>
        <linearGradient id="a27-sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff36e"/><stop offset=".55" stop-color="#ff8a5c"/><stop offset="1" stop-color="#ff2a8a"/></linearGradient>
        <mask id="a27-cut"><rect width="800" height="350" fill="#fff"/>${bars}</mask>
      </defs>
      <rect width="800" height="350" fill="url(#a27-sky)"/>
      <circle cx="400" cy="150" r="92" fill="url(#a27-sun)" mask="url(#a27-cut)"/>
      <g fill="#1b0638">${palm(46, 232, 150, false)}${palm(760, 232, 170, true)}${palm(712, 232, 110, true)}</g>`)}
    <div class="ar-vw-ground"><div class="ar-vw-plane"></div></div>
    <div class="ar-vw-t"><small>Ａ Ｅ Ｓ Ｔ Ｈ Ｅ Ｔ Ｉ Ｃ</small><b>解析学</b><span>すうがく の ゆめ · 1995</span></div>
    <div class="ar-vw-win"><div class="ar-vw-bar"><span>analysis.exe</span><i>_</i><i>□</i><i>×</i></div><div class="ar-vw-body"><b>!</b><p>级数已收敛。<br>R = 1</p></div><div class="ar-vw-ok">OK</div></div>
  </div>`;
})();

// A28 赛博朋克：霓虹城市 + HUD + 故障字
const a28 = (() => {
  const R = rng(2828);
  let blds = '', wins = '', rain = '';
  let x = -6;
  while (x < 410) {
    const w = 22 + R() * 34, h = 70 + R() * 150, top = 300 - h;
    blds += `<rect x="${r1(x)}" y="${r1(top)}" width="${r1(w)}" height="${r1(h)}" fill="${R() < 0.5 ? '#0c0a1c' : '#120d26'}"/>`;
    for (let wy = top + 8; wy < 296; wy += 7) {
      for (let wx = x + 4; wx < x + w - 4; wx += 6) {
        if (R() < 0.22) wins += `<rect x="${r1(wx)}" y="${r1(wy)}" width="2.6" height="3.2" fill="${['#05d9e8', '#ff2a6d', '#f9f002', '#7b5cff'][Math.floor(R() * 4)]}" opacity="${r1(0.35 + R() * 0.6)}"/>`;
      }
    }
    x += w + 2 + R() * 6;
  }
  for (let i = 0; i < 70; i++) {
    const rx = R() * 420, ry = R() * 300, l = 6 + R() * 14;
    rain += `<path d="M${r1(rx)} ${r1(ry)}l${r1(-l * 0.25)} ${r1(l)}"/>`;
  }
  return `${SV('0 0 400 300', `<defs>
      <linearGradient id="a28-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05040c"/><stop offset=".6" stop-color="#1a0b2e"/><stop offset="1" stop-color="#3a0c3c"/></linearGradient>
      <radialGradient id="a28-haze" cx="50%" cy="100%" r="70%"><stop offset="0" stop-color="#ff2a6d" stop-opacity=".45"/><stop offset="1" stop-color="#ff2a6d" stop-opacity="0"/></radialGradient>
      <filter id="a28-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="400" height="300" fill="url(#a28-sky)"/>
    <rect width="400" height="300" fill="url(#a28-haze)"/>
    <g opacity=".55" transform="translate(0 -40) scale(1 .9)">${blds}</g>
    ${blds}${wins}
    <g filter="url(#a28-glow)">
      <rect x="318" y="96" width="26" height="76" rx="3" fill="none" stroke="#ff2a6d" stroke-width="1.6"/>
      <text x="331" y="125" text-anchor="middle" font-family="'Noto Sans SC', sans-serif" font-weight="900" font-size="19" fill="#ff7aa5">解</text>
      <text x="331" y="152" text-anchor="middle" font-family="'Noto Sans SC', sans-serif" font-weight="900" font-size="19" fill="#ff7aa5">析</text>
      <rect x="222" y="196" width="54" height="18" rx="2" fill="none" stroke="#05d9e8" stroke-width="1.2"/>
      <text x="249" y="209.5" text-anchor="middle" font-family="Orbitron, sans-serif" font-weight="800" font-size="10" fill="#7ff4ff">24 / 7</text>
    </g>
    <g stroke="#9fb4ff" stroke-width=".6" opacity=".25">${rain}</g>`)}
    <div class="ar-cp-hud"><i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i>
      <span class="ar-cp-l1">SYS://MATH.ANALYSIS v2.077</span><span class="ar-cp-l2">NODE 0x2F · ε &lt; 10⁻⁹</span>
      <b class="ar-cp-g" data-t="ANALYSIS">ANALYSIS</b><span class="ar-cp-sub">// 极限 · LIMIT PROTOCOL</span>
      <span class="ar-cp-bar"><i></i></span><span class="ar-cp-l3">CONVERGENCE 72%</span></div>`;
})();

// A29 Y2K：虹彩 + 铬金属字 + 闪光星 + Aqua 胶囊按钮
const a29 = (() => {
  const star = (x, y, s, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0 -10C1 -2 2 -1 10 0C2 1 1 2 0 10C-1 2 -2 1 -10 0C-2 -1 -1 -2 0 -10Z"/></g>`;
  return `${SV('0 0 400 300', `<defs>
      <linearGradient id="a29-holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bdf0ff"/><stop offset=".3" stop-color="#e6d0ff"/><stop offset=".55" stop-color="#ffd2ec"/><stop offset=".8" stop-color="#fff2c2"/><stop offset="1" stop-color="#c4ffe8"/></linearGradient>
      <linearGradient id="a29-chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".42" stop-color="#b8c2cf"/><stop offset=".5" stop-color="#4e5a6b"/><stop offset=".62" stop-color="#e9eef5"/><stop offset="1" stop-color="#8f9bab"/></linearGradient>
      <radialGradient id="a29-ring" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#aab6c6"/><stop offset=".75" stop-color="#5a6678"/><stop offset="1" stop-color="#dfe6ee"/></radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#a29-holo)"/>
    <g fill="none" stroke="#fff" stroke-width="1" opacity=".6"><ellipse cx="200" cy="150" rx="210" ry="70" transform="rotate(-12 200 150)"/><ellipse cx="200" cy="150" rx="180" ry="52" transform="rotate(-12 200 150)"/></g>
    <g transform="rotate(-18 318 76)"><ellipse cx="318" cy="76" rx="46" ry="30" fill="none" stroke="url(#a29-ring)" stroke-width="13"/><ellipse cx="318" cy="72" rx="46" ry="30" fill="none" stroke="#fff" stroke-width="2" opacity=".55" stroke-dasharray="40 300"/></g>
    <g fill="url(#a29-chrome)" stroke="#5a6678" stroke-width=".6">${star(72, 70, 2.4)}${star(340, 236, 1.6)}</g>
    <g fill="#fff">${star(118, 228, .9, 'ar-y2k-tw')}${star(262, 46, .7, 'ar-y2k-tw d2')}${star(370, 150, .8, 'ar-y2k-tw d3')}${star(40, 170, .6, 'ar-y2k-tw d4')}${star(210, 262, .55, 'ar-y2k-tw d2')}</g>`)}
    <div class="ar-y2k-t"><b>ANALYSIS</b><span>★ SERIES 2000 ★ 幂级数特辑</span><em><i></i>START</em></div>`;
})();

// A30 像素：低分辨率画布，放大时保持锯齿
function a30draw(c) {
  const W = 96, H = 72, px = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
  [['#2b4fd8', 0, 14], ['#3f6ff0', 14, 14], ['#5c94fc', 28, 14], ['#8db8ff', 42, 10]].forEach(([col, y, h]) => px(0, y, W, h, col));
  // 抖动过渡
  for (let x = 0; x < W; x += 2) { px(x, 13, 1, 1, '#3f6ff0'); px(x + 1, 27, 1, 1, '#5c94fc'); px(x, 41, 1, 1, '#8db8ff'); }
  const cloud = (x, y) => { px(x + 2, y, 6, 1, '#fff'); px(x, y + 1, 11, 2, '#fff'); px(x + 1, y + 3, 9, 1, '#d6e6ff'); px(x + 3, y - 1, 3, 1, '#fff'); };
  cloud(6, 8); cloud(58, 5); cloud(80, 16);
  // 远山
  const hill = (cx, r, col, dk) => { for (let x = -r; x <= r; x++) { const h = Math.round(Math.sqrt(r * r - x * x) * 0.9); px(cx + x, 52 - h, 1, h, col); px(cx + x, 52 - h, 1, 1, dk); } };
  hill(16, 14, '#3fa34d', '#1f6b2a'); hill(46, 9, '#56bf5a', '#2d7d33'); hill(78, 16, '#3fa34d', '#1f6b2a');
  // 地面
  px(0, 52, W, 3, '#6bdc4e'); px(0, 55, W, 1, '#2d8a2a');
  for (let y = 56; y < H; y++) for (let x = 0; x < W; x++) px(x, y, 1, 1, (x + (y % 4 < 2 ? 0 : 4)) % 8 === 0 || y % 4 === 3 ? '#7a3a14' : '#c0632b');
  // 树
  const tree = (x) => { px(x + 2, 46, 2, 6, '#7a3a14'); px(x, 40, 6, 6, '#2e9e3a'); px(x + 1, 38, 4, 2, '#2e9e3a'); px(x + 1, 40, 1, 1, '#7fe08a'); px(x, 45, 6, 1, '#1d6b26'); };
  tree(6); tree(88);
  // ∑ 方块
  const blk = (bx, by) => {
    px(bx, by, 10, 10, '#1b1006'); px(bx + 1, by + 1, 8, 8, '#f8b200'); px(bx + 1, by + 1, 8, 1, '#ffd96a'); px(bx + 1, by + 1, 1, 8, '#ffd96a');
    [[3, 3, 4, 1], [3, 4, 1, 1], [4, 5, 1, 1], [3, 6, 1, 1], [3, 7, 4, 1]].forEach(([x, y, w, h]) => px(bx + x, by + y, w, h, '#1b1006'));
    px(bx + 2, by + 2, 1, 1, '#1b1006'); px(bx + 7, by + 2, 1, 1, '#1b1006');
  };
  blk(40, 26); blk(52, 26);
  // 砖块
  [[64, 26]].forEach(([bx, by]) => { px(bx, by, 10, 10, '#1b1006'); px(bx + 1, by + 1, 8, 8, '#c0632b'); px(bx + 1, by + 4, 8, 1, '#1b1006'); px(bx + 4, by + 1, 1, 3, '#1b1006'); px(bx + 6, by + 5, 1, 4, '#1b1006'); });
  // 金币
  [[30, 30], [84, 30]].forEach(([x, y]) => { px(x + 1, y, 2, 1, '#1b1006'); px(x, y + 1, 4, 4, '#1b1006'); px(x + 1, y + 1, 2, 4, '#ffd23f'); px(x + 1, y + 5, 2, 1, '#1b1006'); px(x + 1, y + 1, 1, 2, '#fff3b0'); });
  // 小人
  const hero = [
    '..HHHH..', '.HHHHHH.', '.HSESES.', '.SSSSSS.', '..TTTT..', '.TTTTTT.', '..PPPP..', '.PP..PP.'
  ];
  const pal = { H: '#5a3418', S: '#ffc9a3', E: '#1b1006', T: '#18a39a', P: '#283a8c' };
  hero.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) px(22 + x, 44 + y, 1, 1, pal[ch]); }));
}

// A31 等距插画：书桌
const a31 = (() => {
  const S = 10.4, ox = 206, oy = 158;
  const P = (x, y, z) => [ox + (x - y) * S * 0.866, oy + (x + y) * S * 0.5 - z * S];
  const box = (x, y, z, w, d, h, [t, l, r], extra = '') => {
    const p = (a, b, c) => P(a, b, c);
    const top = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)];
    const left = [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)];
    const right = [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)];
    return `<polygon points="${poly(left)}" fill="${l}"/><polygon points="${poly(right)}" fill="${r}"/><polygon points="${poly(top)}" fill="${t}" ${extra}/>`;
  };
  const line = (a, b) => `M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}`;
  let g2 = '';
  for (let i = -14; i <= 14; i += 2) g2 += line(P(i, -14, 0), P(i, 14, 0)) + line(P(-14, i, 0), P(14, i, 0));
  // 屏幕上的曲线（画在屏幕平面上：x 方向 + z 方向）
  const scr = (u, v) => P(-1.2 + u * 6.4, -2.6, 4.3 + 0.35 + v * 3.6);
  let curve = '';
  for (let i = 0; i <= 20; i++) { const u = 0.08 + (i / 20) * 0.84, v = 0.15 + 0.7 * (0.5 + 0.4 * Math.sin(u * 9)); const q = scr(u, v); curve += (i ? 'L' : 'M') + `${r1(q[0])} ${r1(q[1])}`; }
  let bars = '';
  [0.2, 0.32, 0.44].forEach((u, i) => { const a = scr(u, 0.1), b = scr(u, 0.1 + [0.25, 0.4, 0.3][i]); bars += `<path d="${line(a, b)}" stroke="#ff6584" stroke-width="3.4" opacity=".85"/>`; });
  return SV('0 0 400 300', `<defs><linearGradient id="a31-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0ff"/><stop offset="1" stop-color="#dfe5ff"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#a31-bg)"/>
    <g stroke="#c3cbf0" stroke-width=".6" opacity=".7"><path d="${g2}"/></g>
    ${box(-8, -6, -1.4, 16, 12, 1.4, ['#ffffff', '#c9cff0', '#aab3e3'])}
    ${box(-6, -4, 0, 1, 1, 4, ['#e09a6a', '#c7804f', '#b06f43'])}${box(5, -4, 0, 1, 1, 4, ['#e09a6a', '#c7804f', '#b06f43'])}
    ${box(-6, 3, 0, 1, 1, 4, ['#e09a6a', '#c7804f', '#b06f43'])}${box(5, 3, 0, 1, 1, 4, ['#e09a6a', '#c7804f', '#b06f43'])}
    ${box(-6.5, -4.5, 4, 13, 9, .6, ['#ffd6a5', '#f4b183', '#e39b69'])}
    ${box(-2, -2.6, 4.6, 8, .4, 4.2, ['#3a4275', '#2d3561', '#262d55'])}
    <polygon points="${poly([scr(0, 0), scr(1, 0), scr(1, 1), scr(0, 1)])}" fill="#1f2650"/>
    <path d="${curve}" fill="none" stroke="#43e0c6" stroke-width="2" stroke-linejoin="round"/>
    ${bars}
    ${box(-2.4, -2.2, 4.6, 8.8, 4.2, .3, ['#e6e9f5', '#c4c9df', '#b2b8d4'])}
    ${box(-5.8, 1.2, 4.6, 3, 2.2, .7, ['#6c63ff', '#544bd6', '#463dc0'])}${box(-5.6, 1.4, 5.3, 2.8, 2, .6, ['#ff6584', '#e14a6a', '#c93e5c'])}${box(-5.4, 1.2, 5.9, 2.6, 2.2, .6, ['#3ec1d3', '#2aa3b5', '#22909f'])}
    ${box(3.6, 2.2, 4.6, 1.3, 1.3, 1.5, ['#ffe1e8', '#ff8aa5', '#ff6584'])}
    <ellipse cx="${r1(P(4.25, 2.85, 6.1)[0])}" cy="${r1(P(4.25, 2.85, 6.1)[1])}" rx="4.8" ry="2.4" fill="#6b3d2e"/>
    ${box(-9.5, 3.5, 0, 2, 2, 2.2, ['#f9f3e3', '#e6dcc4', '#d4c8ad'])}
    <g fill="#43c59e">${[[-8.5, 4.5, 4.6, 7], [-9.4, 4.2, 3.6, 5.5], [-7.6, 5.4, 3.8, 5.5], [-8.8, 5.6, 3.2, 4.5]].map(([x, y, z, r]) => { const q = P(x, y, z); return `<circle cx="${r1(q[0])}" cy="${r1(q[1])}" r="${r}"/>`; }).join('')}</g>
    <g fill="#2fa680">${[[-8.2, 4.8, 4.2, 3], [-9, 5.2, 3.4, 2.4]].map(([x, y, z, r]) => { const q = P(x, y, z); return `<circle cx="${r1(q[0])}" cy="${r1(q[1])}" r="${r}"/>`; }).join('')}</g>
    <text x="22" y="34" font-family="Geist, 'Noto Sans SC', sans-serif" font-weight="600" font-size="15" fill="#2d3561">Analysis Lab</text>
    <text x="22" y="50" font-family="Geist, 'Noto Sans SC', sans-serif" font-size="9" fill="#6d76a8">把定理摆上桌面 · 第 2 讲</text>`);
})();

// A32 蓝图：单位圆的工程制图
const a32 = (() => {
  let grid = '';
  for (let x = 0; x <= 400; x += 10) grid += `M${x} 0V300`;
  for (let y = 0; y <= 300; y += 10) grid += `M0 ${y}H400`;
  let major = '';
  for (let x = 0; x <= 400; x += 50) major += `M${x} 0V300`;
  for (let y = 0; y <= 300; y += 50) major += `M0 ${y}H400`;
  const cx = 150, cy = 150, R = 90, th = 0.72;
  const px = cx + R * Math.cos(th), py = cy - R * Math.sin(th);
  const arrow = (x, y, a) => `<path d="M${r1(x)} ${r1(y)}l${r1(-7 * Math.cos(a) + 2.5 * Math.sin(a))} ${r1(-7 * Math.sin(a) - 2.5 * Math.cos(a))}l${r1(-5 * Math.sin(a))} ${r1(5 * Math.cos(a))}Z" fill="#eaf2ff"/>`;
  let hatch = '';
  for (let i = 0; i < 9; i++) hatch += `M${cx + 6 + i * 6} ${cy}l6 -6`;
  return SV('0 0 400 300', `<defs>
      <radialGradient id="a32-bg" cx="45%" cy="40%" r="80%"><stop offset="0" stop-color="#2463a8"/><stop offset="1" stop-color="#163f74"/></radialGradient>
      <clipPath id="a32-tri"><path d="M${cx} ${cy}L${r1(px)} ${cy}L${r1(px)} ${r1(py)}Z"/></clipPath>
    </defs>
    <rect width="400" height="300" fill="url(#a32-bg)"/>
    <path d="${grid}" stroke="#cfe1ff" stroke-width=".35" opacity=".22"/>
    <path d="${major}" stroke="#cfe1ff" stroke-width=".7" opacity=".3"/>
    <g fill="none" stroke="#eaf2ff" stroke-linecap="round">
      <path d="M${cx - 112} ${cy}H${cx + 118}M${cx} ${cy + 112}V${cy - 118}" stroke-width=".7" stroke-dasharray="14 3 2 3"/>
      <circle cx="${cx}" cy="${cy}" r="${R}" stroke-width="1.6"/>
      <circle cx="${cx}" cy="${cy}" r="${R + 8}" stroke-width=".5" stroke-dasharray="3 3" opacity=".6"/>
      <path d="M${cx} ${cy}L${r1(px)} ${r1(py)}" stroke-width="1.6"/>
      <path d="M${r1(px)} ${r1(py)}V${cy}" stroke-width="1" stroke-dasharray="4 3"/>
      <g clip-path="url(#a32-tri)" stroke-width=".5" opacity=".7"><path d="${hatch}"/></g>
      <path d="M${cx + 26} ${cy}A26 26 0 0 0 ${r1(cx + 26 * Math.cos(th))} ${r1(cy - 26 * Math.sin(th))}" stroke-width="1"/>
      <path d="M${cx} ${cy + 20}V${cy + 30}M${r1(px)} ${cy + 20}V${cy + 30}" stroke-width=".7"/>
      <path d="M${cx + 3} ${cy + 26}H${r1(px - 3)}" stroke-width=".7"/>
      <path d="M${cx + R + 16} ${cy - 3}V${r1(py + 3)}" stroke-width=".7"/>
      <path d="M${r1(px + 4)} ${r1(py)}H${cx + R + 22}M${cx + R + 4} ${cy}H${cx + R + 22}" stroke-width=".7"/>
      <path d="M${cx - R} ${cy - 106}V${cy - 96}M${cx + R} ${cy - 106}V${cy - 96}M${cx - R + 3} ${cy - 102}H${cx + R - 3}" stroke-width=".7"/>
      <path d="M${cx - 5} ${cy}h10M${cx} ${cy - 5}v10" stroke-width="1.2"/>
    </g>
    ${arrow(cx + 3, cy + 26, Math.PI)}${arrow(px - 3, cy + 26, 0)}${arrow(cx + R + 16, cy - 3, Math.PI / 2)}${arrow(cx + R + 16, py + 3, -Math.PI / 2)}
    ${arrow(cx - R + 3, cy - 102, Math.PI)}${arrow(cx + R - 3, cy - 102, 0)}
    <circle cx="${r1(px)}" cy="${r1(py)}" r="2.6" fill="#eaf2ff"/>
    <g font-family="'Architects Daughter', cursive" fill="#eaf2ff" font-size="11">
      <text x="${cx + 30}" y="${cy - 8}">θ</text>
      <text x="${r1((cx + px) / 2)}" y="${cy + 40}" text-anchor="middle">cos θ</text>
      <text x="${cx + R + 26}" y="${r1((cy + py) / 2 + 4)}">sin θ</text>
      <text x="${cx}" y="${cy - 108}" text-anchor="middle">Ø 2.00 (R = 1)</text>
      <text x="${r1(px + 6)}" y="${r1(py - 6)}">P(cos θ, sin θ)</text>
      <text x="${cx - 108}" y="${cy + 108}" font-size="9" opacity=".8">UNIT CIRCLE · TOP VIEW</text>
    </g>
    <g fill="none" stroke="#eaf2ff" stroke-width="1"><rect x="262" y="214" width="126" height="74"/><path d="M262 238H388M262 256H388M262 272H388M318 256V288"/></g>
    <g font-family="'Share Tech Mono', monospace" fill="#eaf2ff">
      <text x="268" y="231" font-size="11">单位圆与三角函数</text>
      <text x="268" y="250" font-size="7.5" opacity=".85">PROJECT  MATH-ANALYSIS</text>
      <text x="268" y="267" font-size="7.5" opacity=".85">DWG A-32</text><text x="324" y="267" font-size="7.5" opacity=".85">SCALE 1:1</text>
      <text x="268" y="283" font-size="7.5" opacity=".85">REV 03</text><text x="324" y="283" font-size="7.5" opacity=".85">2026-10-20</text>
    </g>`);
})();

// A33 孔版印刷：两色叠印 + 错位 + 颗粒
const a33 = (() => {
  let ht = '';
  for (let y = 0; y < 9; y++) for (let x = 0; x < 16; x++) {
    const r = 3.4 * (1 - x / 16);
    if (r > 0.3) ht += `<circle cx="${214 + x * 11 + (y % 2) * 5.5}" cy="${206 + y * 10}" r="${r1(r)}"/>`;
  }
  const pink = `<g fill="#ff48b0">
      <circle cx="268" cy="118" r="88"/>
      ${ht}
      <rect x="30" y="232" width="120" height="16"/>
    </g>`;
  const blue = `<g fill="#0078bf">
      <circle cx="166" cy="148" r="70"/>
      <text x="26" y="88" font-family="Archivo, sans-serif" font-weight="900" font-size="62" letter-spacing="-2">ANALYSE</text>
      <text x="30" y="266" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">RISO · 2 COLOUR · Nº 33</text>
      <path d="M300 250h70v6h-70zM300 262h70v6h-70zM300 274h46v6h-46z"/>
    </g>`;
  return SV('0 0 400 300', `<defs>
      <filter id="a33-ink" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="33" result="n"/><feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 6" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
      <filter id="a33-paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 .4  0 0 0 0 .35  0 0 0 0 .3  0 0 0 -2 1.1"/></filter>
    </defs>
    <rect width="400" height="300" fill="#f3efe6"/>
    <g style="mix-blend-mode:multiply" filter="url(#a33-ink)" opacity=".92">${pink}</g>
    <g style="mix-blend-mode:multiply" filter="url(#a33-ink)" opacity=".92" transform="translate(2.5 -1.8)">${blue}</g>
    <rect width="400" height="300" filter="url(#a33-paper)" opacity=".25"/>`);
})();

// A34 等高线：高度场 + marching squares，画布画一次
function a34draw(c, W, H) {
  c.fillStyle = '#f3efe4';
  c.fillRect(0, 0, W, H);
  const R = rng(3434);
  const bumps = Array.from({ length: 9 }, () => [R(), R() * 0.75, (R() - 0.25) * 1.6, 0.08 + R() * 0.16]);
  bumps.push([0.3, 0.3, 1.6, 0.16], [0.7, 0.45, 1.3, 0.12]);
  const nz = Array.from({ length: 6 }, () => [R() * 6.28, R() * 6.28, 3 + R() * 7, 3 + R() * 7]);
  const f = (x, y) => {
    let v = 0;
    bumps.forEach(([bx, by, a, s]) => { v += a * Math.exp(-(((x - bx) ** 2) + ((y - by) * 0.75) ** 2) / (2 * s * s)); });
    nz.forEach(([p, q, fx, fy]) => { v += 0.04 * Math.sin(x * fx + p) * Math.cos(y * fy + q); });
    return v;
  };
  const step = Math.max(3, W / 150), nx = Math.ceil(W / step) + 1, ny = Math.ceil(H / step) + 1;
  const g = new Float32Array(nx * ny);
  let mn = 1e9, mx = -1e9;
  let pk = [0, 0, -1e9];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const v = f((i * step) / W, (j * step) / W);
    g[j * nx + i] = v; mn = Math.min(mn, v); mx = Math.max(mx, v);
    if (i * step > W * 0.55 && v > pk[2]) pk = [(i * step) / W, (j * step) / H, v];
  }
  const pin = c.canvas.parentElement && c.canvas.parentElement.querySelector('.ar-tp-pin');
  if (pin) { pin.style.left = `${r1(pk[0] * 1000) / 10}%`; pin.style.top = `${r1(pk[1] * 1000) / 10}%`; }
  const levels = 26, lw = Math.max(1, W / 520);
  for (let k = 1; k < levels; k++) {
    const t = mn + ((mx - mn) * k) / levels, idx = k % 5 === 0;
    c.strokeStyle = idx ? 'rgba(120,78,44,.85)' : 'rgba(150,104,66,.5)';
    c.lineWidth = idx ? lw * 1.9 : lw;
    c.beginPath();
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = g[j * nx + i], b = g[j * nx + i + 1], cc = g[(j + 1) * nx + i + 1], d = g[(j + 1) * nx + i];
        const code = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (cc > t ? 2 : 0) | (d > t ? 1 : 0);
        if (code === 0 || code === 15) continue;
        const x = i * step, y = j * step;
        const T = [x + step * ((t - a) / (b - a)), y], Rr = [x + step, y + step * ((t - b) / (cc - b))];
        const B = [x + step * ((t - d) / (cc - d)), y + step], L = [x, y + step * ((t - a) / (d - a))];
        const seg = (p, q) => { c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); };
        switch (code) {
          case 1: case 14: seg(L, B); break;
          case 2: case 13: seg(B, Rr); break;
          case 3: case 12: seg(L, Rr); break;
          case 4: case 11: seg(T, Rr); break;
          case 6: case 9: seg(T, B); break;
          case 7: case 8: seg(L, T); break;
          case 5: seg(L, T); seg(B, Rr); break;
          case 10: seg(T, Rr); seg(L, B); break;
        }
      }
    }
    c.stroke();
  }
}

// A35 手绘笔记（宽格）
const a35 = (() => {
  const R = rng(3535);
  // rough.js 式的抖动线：同一条线画两遍，每遍略有偏差
  const rough = (pts, w = 1.6, col = '#2a2f45', passes = 2) => {
    let out = '';
    for (let p = 0; p < passes; p++) {
      const q = pts.map(([x, y]) => [x + (R() - 0.5) * 2.2, y + (R() - 0.5) * 2.2]);
      out += `<path d="${smooth(q)}" fill="none" stroke="${col}" stroke-width="${p ? w * 0.7 : w}" stroke-linecap="round" stroke-linejoin="round" opacity="${p ? .75 : 1}"/>`;
    }
    return out;
  };
  const seg = (x1, y1, x2, y2, n = 5) => Array.from({ length: n + 1 }, (_, i) => [x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n]);
  // 图：y = 1/(1-x) 和它的部分和
  const gx = 470, gy = 268, sx = 120, sy = 38;
  const G = (x, y) => [gx + x * sx, gy - y * sy];
  const fpts = [];
  for (let x = -1; x <= 0.84; x += 0.08) fpts.push(G(x, 1 / (1 - x)));
  const s3 = [];
  for (let x = -1; x <= 1.05; x += 0.1) s3.push(G(x, 1 + x + x * x + x * x * x));
  return SV('0 0 800 350', `<defs>
      <pattern id="a35-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0V20H0" fill="none" stroke="#b9d0ea" stroke-width=".8"/></pattern>
    </defs>
    <rect width="800" height="350" fill="#fbfaf4"/>
    <rect width="800" height="350" fill="url(#a35-grid)"/>
    <path d="M70 0V350" stroke="#f08a8a" stroke-width="1.4"/>
    <g fill="#e4e1d6">${[50, 175, 300].map((y) => `<circle cx="30" cy="${y}" r="9"/>`).join('')}</g>
    <path d="M118 74C150 70 220 72 262 76" stroke="#ffe45c" stroke-width="16" stroke-linecap="round" opacity=".75"/>
    <text x="96" y="78" font-family="'Long Cang', cursive" font-size="40" fill="#1f2a5a">幂级数</text>
    <text x="236" y="76" font-family="Caveat, cursive" font-weight="700" font-size="28" fill="#1f2a5a">power series</text>
    ${rough(seg(96, 92, 380, 90, 8), 2, '#1f2a5a')}
    <g font-family="Caveat, 'Long Cang', cursive" font-weight="600" fill="#2a2f45">
      <text x="100" y="140" font-size="30">Σ aₙ xⁿ 在 |x| &lt; R 内收敛</text>
      <text x="100" y="186" font-size="30">R = 1 / limsup |aₙ|^(1/n)</text>
      <text x="100" y="236" font-size="26" fill="#c23b3b">端点 x = ±R 要单独检验！</text>
    </g>
    ${rough([[92, 160], [100, 154], [380, 152], [392, 170], [380, 196], [110, 198], [94, 186], [96, 162]], 1.8, '#c23b3b')}
    ${rough([[396, 220], [420, 206], [440, 178]], 1.6, '#c23b3b')}<path d="M432 182l9 -6 1 11" fill="none" stroke="#c23b3b" stroke-width="1.6" stroke-linecap="round"/>
    <g transform="rotate(-4 180 292)"><rect x="102" y="300" width="182" height="20" fill="#000" opacity=".06" transform="translate(3 8)"/><rect x="102" y="260" width="182" height="64" fill="#fff59a"/><rect x="102" y="260" width="182" height="64" fill="none" stroke="#e8d86a"/>
      <text x="116" y="290" font-family="'Long Cang', cursive" font-size="19" fill="#5a4a00">例：Σ xⁿ/n</text><text x="116" y="313" font-family="'Long Cang', cursive" font-size="17" fill="#5a4a00">x = -1 收敛，x = 1 发散</text></g>
    <rect x="590" y="12" width="96" height="26" fill="#9fd8cf" opacity=".75" transform="rotate(6 638 25)"/>
    ${rough(seg(440, gy, 640, gy, 6), 1.6)}${rough(seg(gx, 330, gx, 70, 6), 1.6)}
    <path d="M634 ${gy - 5}l8 5l-8 5M${gx - 5} 76l5 -8l5 8" fill="none" stroke="#2a2f45" stroke-width="1.6" stroke-linecap="round"/>
    ${rough(seg(gx + sx, 330, gx + sx, 70, 6), 1.2, '#c23b3b').replace(/stroke-linecap/g, 'stroke-dasharray="6 6" stroke-linecap')}
    ${rough(fpts, 2.2, '#2456c4')}${rough(s3, 1.6, '#e0882a')}
    <g font-family="Caveat, cursive" font-weight="700" font-size="20">
      <text x="${gx + sx + 6}" y="92" fill="#c23b3b">x = 1</text>
      <text x="${gx + 10}" y="${gy - 104}" fill="#2456c4" transform="rotate(-50 ${gx + 10} ${gy - 104})">1/(1−x)</text>
      <text x="${gx + 30}" y="${gy + 28}" fill="#e0882a">S₃(x)</text>
      <text x="646" y="${gy + 6}" fill="#2a2f45">x</text><text x="${gx + 8}" y="72" fill="#2a2f45">y</text>
    </g>
    <path d="M700 300l6 -14 6 14 -15 -9h18z" fill="none" stroke="#e0882a" stroke-width="1.6" stroke-linejoin="round"/>
    <text x="668" y="186" font-family="'Long Cang', cursive" font-size="18" fill="#2456c4">闭子区间上</text>
    <text x="668" y="208" font-family="'Long Cang', cursive" font-size="18" fill="#2456c4">一致收敛 ✓</text>
    ${rough([[664, 216], [700, 220], [760, 214]], 1.4, '#2456c4')}`);
})();

// A36 伊斯兰几何：八角星与十字镶嵌
const a36 = (() => {
  const L = 50, Ro = L / 2, Ri = Ro * 0.7654;
  const starPts = (cx, cy, ro, ri) => {
    const p = [];
    for (let k = 0; k < 16; k++) { const r = k % 2 ? ri : ro, a = (k * Math.PI) / 8; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return poly(p);
  };
  let tile = '';
  [[0, 0], [L, 0], [0, L], [L, L]].forEach(([x, y]) => {
    tile += `<polygon points="${starPts(x, y, Ro, Ri)}" fill="#1c3f8c" stroke="#f4ead2" stroke-width="2.6" stroke-linejoin="miter"/>`;
    tile += `<polygon points="${starPts(x, y, Ro, Ri)}" fill="none" stroke="#0e1f45" stroke-width=".7"/>`;
    tile += `<polygon points="${starPts(x, y, Ro * 0.5, Ri * 0.5)}" fill="#1aa3a3" stroke="#f4ead2" stroke-width=".9"/>`;
    tile += `<circle cx="${x}" cy="${y}" r="2.6" fill="#d9ad4f"/>`;
  });
  tile += `<polygon points="${starPts(L / 2, L / 2, 6, 3.4)}" fill="#d9ad4f"/>`;
  // 中央徽章：八角形
  const med = (r) => { const p = []; for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4 + Math.PI / 8; p.push([200 + r * 1.35 * Math.cos(a), 150 + r * Math.sin(a)]); } return poly(p); };
  return SV('0 0 400 300', `<defs>
      <pattern id="a36-p" width="${L}" height="${L}" patternUnits="userSpaceOnUse" x="0" y="0"><rect width="${L}" height="${L}" fill="#c8643b"/><path d="M${L / 2} 0V${L}M0 ${L / 2}H${L}" stroke="#f4ead2" stroke-width=".8" opacity=".55"/>${tile}</pattern>
      <radialGradient id="a36-v" cx="50%" cy="50%" r="70%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#a36-p)"/>
    <rect width="400" height="300" fill="url(#a36-v)"/>
    <polygon points="${med(62)}" fill="#0e1f45" opacity=".35" transform="translate(0 3)"/>
    <polygon points="${med(62)}" fill="#f4ead2" stroke="#d9ad4f" stroke-width="3"/>
    <polygon points="${med(55)}" fill="none" stroke="#1c3f8c" stroke-width="1"/>
    <text x="200" y="158" text-anchor="middle" font-family="Amiri, serif" font-weight="700" font-size="44" fill="#1c3f8c">الجبر</text>
    <text x="200" y="184" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="12" letter-spacing="1" fill="#8a5a2b">al-jabr · 代数之名</text>`);
})();

const PAGE4 = [
  {
    code: 'A27', name: '蒸汽波', en: 'Vaporwave', meta: '网络亚文化 · 2010 年代',
    desc: '一种怀旧的网络美学：粉紫到青色的落日渐变、被横条切开的复古太阳、向远方延伸的霓虹透视网格、棕榈树剪影，再配上日文、全角英文字母（Ａ Ｅ Ｓ Ｔ Ｈ Ｅ Ｔ Ｉ Ｃ）和 Windows 95 的灰色对话框。网页上适合音乐、复古游戏、个人主页的头图；正文区别用它。',
    more: '蒸汽波源自 2010 年代初的电子音乐（把 80 年代商场音乐、广告配乐放慢重混），视觉上拼贴了 80–90 年代的消费主义符号：希腊雕像、早期 3D 渲染、日本泡沫经济时期的广告、Windows 95。它的「好看」带着反讽。近亲：Synthwave / Outrun（更偏 80 年代赛车电影，网格+落日+铬字更多）。网格是 CSS 3D：一个铺满线条的平面 rotateX 倒下，再用 transform 不断前移。不适合：严肃学习内容；颜色强烈，长时间看很累。',
    kw: ['落日条纹', '透视网格', '棕榈剪影', '粉紫青', 'Win95'],
    html: a27, bg: '#160a3d', dark: true, wide: true,
    links: [['Wikipedia · Vaporwave', W_('Vaporwave')], ['Wikipedia · Synthwave', W_('Synthwave')]],
    css: `/* 透视网格：倒下的平面 + 向前移动 */
.grid-floor { position: relative; height: 40%; overflow: hidden;
  perspective: 300px; perspective-origin: 50% 0; background: #1b0638; }
.grid-floor::before { content: ""; position: absolute; left: -100%;
  right: -100%; top: 0; height: 400%; transform-origin: 50% 0;
  background:
    linear-gradient(#ff3fd0 2px, transparent 0) 0 0 / 60px 60px,
    linear-gradient(90deg, #ff3fd0 2px, transparent 0) 0 0 / 60px 60px;
  animation: run 1.4s linear infinite; }
@keyframes run {
  from { transform: rotateX(76deg) translateY(-60px); }
  to   { transform: rotateX(76deg) translateY(0); } }`
  },
  {
    code: 'A28', name: '赛博朋克', en: 'Cyberpunk', meta: '科幻 · 1980s 起',
    desc: '「高科技、低生活」的未来都市：漆黑夜色里霓虹品红与青色互相照亮，楼上挂着发光的汉字招牌，下着雨；界面叠着 HUD（抬头显示）的角框、等宽小字、十六进制编号，标题文字时不时「故障」——红青错位、横向撕裂一下。网页上适合游戏、黑客松、技术活动页；正文用深底浅字，霓虹只做点缀。',
    more: '赛博朋克来自 80 年代的科幻小说（吉布森《神经漫游者》）和电影《银翼杀手》，后来的《攻壳机动队》《赛博朋克 2077》定型了视觉：品红 #ff2a6d、青 #05d9e8、电黄 #f9f002，亚洲城市的招牌，扫描线和故障效果（glitch）。故障效果用两层伪元素分别染成青和品红，用 clip-path 只露出一条横带并左右错开，大部分时间静止、偶尔闪一下才像。不适合：需要冷静专注的阅读；闪烁要克制，并尊重「减少动效」设置。',
    kw: ['霓虹', '品红青', '故障', 'HUD', '雨夜'],
    html: a28, bg: '#05040c', dark: true,
    links: [['Wikipedia · Cyberpunk', W_('Cyberpunk')], ['Wikipedia · Glitch art', W_('Glitch_art')]],
    css: `.glitch { position: relative; color: #fff; font-family: 'Orbitron', sans-serif; }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; }
.glitch::before { color: #05d9e8; animation: g1 3.2s steps(1) infinite; }
.glitch::after  { color: #ff2a6d; animation: g2 3.2s steps(1) infinite; }
@keyframes g1 { 0%, 90%, 100% { clip-path: inset(0 0 100% 0); }
  92% { clip-path: inset(20% 0 55% 0); translate: -4px 0; }
  95% { clip-path: inset(62% 0 10% 0); translate: 3px 0; } }
@keyframes g2 { 0%, 91%, 100% { clip-path: inset(0 0 100% 0); }
  93% { clip-path: inset(45% 0 30% 0); translate: 4px 0; } }
.neon { color: #ff7aa5; text-shadow: 0 0 4px #ff2a6d, 0 0 16px #ff2a6d; }`
  },
  {
    code: 'A29', name: 'Y2K 千禧风', en: 'Y2K aesthetic', meta: '1997–2004 · 2020 年代复兴',
    desc: '世纪之交对「未来」的乐观想象：镭射虹彩的底色（粉、蓝、紫、薄荷互相渗透），铬金属反光的字和圆环，四角星形的闪光，半透明果冻色的塑料（初代 iMac、Mac OS X 的 Aqua 胶囊按钮），字体圆胖宽扁。网页上适合潮牌、音乐、活动页和年轻化的个人主页。',
    more: 'Y2K 美学流行于 1997–2004（初代 iMac、诺基亚彩壳、《黑客帝国》、Britney 时期的 MV），2020 年前后随 Z 世代复古潮回归。识别点：铬（多段明暗交替的金属渐变）、虹彩（holographic）、闪光星 ✦、蝴蝶、泡泡字、半透明果冻塑料。和蒸汽波的区别：蒸汽波是怀旧+反讽、偏 80–90 年代的粉紫；Y2K 是对新千年的乐观、偏亮白和银色。不适合：需要可信、稳重的场合；铬字要配深色描边，否则在浅底上看不清。',
    kw: ['铬金属', '镭射虹彩', '闪光星', '果冻按钮', '千禧年'],
    html: a29, bg: '#e6d0ff',
    links: [['Wikipedia · Y2K aesthetic', W_('Y2K_aesthetic')], ['Wikipedia · Aqua (user interface)', W_('Aqua_(user_interface)')]],
    css: `.y2k { background: linear-gradient(135deg, #bdf0ff, #e6d0ff 30%,
  #ffd2ec 55%, #fff2c2 80%, #c4ffe8); }
.chrome { font-family: 'Unbounded', sans-serif; font-weight: 800;
  background: linear-gradient(#fff 0%, #b8c2cf 42%, #4e5a6b 50%,
    #e9eef5 62%, #8f9bab 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  -webkit-text-stroke: 1px #3d4757;
  filter: drop-shadow(0 2px 0 rgba(255,255,255,.8)); }
.aqua { border-radius: 99px; color: #fff;
  background: linear-gradient(#bfe3ff, #3a9cf2 50%, #1f7fe0 51%, #7fd0ff);
  box-shadow: inset 0 1px 1px #fff, 0 3px 8px rgba(30,100,200,.4); }`
  },
  {
    code: 'A30', name: '像素', en: 'Pixel art', meta: '8-bit 游戏 · 1980s 起',
    desc: '早期游戏机分辨率很低、颜色很少，画面由一个个看得见的方格组成：天空分几段色带、用棋盘格抖动过渡，物体有深色轮廓，金币、砖块、问号方块、小人都只有十几个像素。网页上适合游戏化学习、成就徽章、复古彩蛋、404 页；配像素字体（这里是 Press Start 2P），放大时一定要保持锯齿。',
    more: '像素画（pixel art）源自 NES、Game Boy 等 8 位机：每个像素都是手工摆放的，调色板常常只有十几种颜色。今天它是独立游戏（《星露谷物语》《Celeste》）的主流风格。实现要点：画布用很小的分辨率（这里 96×72）绘制，再用 CSS image-rendering: pixelated 放大，避免浏览器把边缘插值模糊；动画用 steps() 一格一格跳。不适合：需要细腻信息展示的界面；像素字体只适合短标题和数字，正文请用普通字体。',
    kw: ['8-bit', '像素方格', '抖动', '游戏', '复古'],
    html: `<canvas class="ar-px-cv" width="96" height="72"></canvas><div class="ar-px-hud"><span>SCORE<br>001024</span><span>COIN 12</span><span>WORLD<br>2-1</span></div><div class="ar-px-t"><b>LEVEL 2-1</b><span>SERIES STAGE</span><em>PRESS START</em></div>`,
    init(stage) { a30draw(stage.querySelector('canvas').getContext('2d')); },
    bg: '#5c94fc', dark: true,
    links: [['Wikipedia · Pixel art', W_('Pixel_art')]],
    css: `/* 小画布 + 放大不模糊 */
canvas.pixel { width: 100%; height: 100%;
  image-rendering: pixelated; image-rendering: crisp-edges; }
.pixel-title { font-family: 'Press Start 2P', monospace; color: #fff;
  text-shadow: .5cqw .5cqw 0 #1b1006; }
.blink { animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
/* 也可以用 box-shadow 画像素图：每个阴影就是一个像素 */
.sprite { width: 4px; height: 4px;
  box-shadow: 4px 0 #e53b3b, 8px 0 #e53b3b, 4px 4px #ffc9a3; }`
  },
  {
    code: 'A31', name: '等距插画', en: 'Isometric illustration', meta: 'SaaS 插画 · 2015 年起',
    desc: '用等轴测投影画的立体场景：所有物体沿 30° 的两条斜轴摆放，没有近大远小；每个方块只有三种明暗——顶面最亮、左面中等、右面最暗。常见题材是书桌、办公室、小城市，像精致的模型沙盘。网页上适合产品介绍、功能说明、教程封面；颜色控制在 4–5 种，背景留浅色。',
    more: '等轴测（isometric）本来是工程制图的投影方式，早期游戏（《模拟城市 2000》）用它在 2D 里做出 3D 感；2015 年前后成为科技公司官网插画的主流（Dropbox、Stripe、各种 SaaS）。规则：x 轴、y 轴各与水平线成 30°，竖直线保持竖直；光源固定，同一朝向的面颜色一致。这里所有方块都由一个 box() 函数生成。不适合：需要真实感或情绪感染力的场景；也容易显得「千篇一律的创业公司风」。',
    kw: ['等轴测', '30° 斜轴', '三面明暗', '书桌场景', 'SaaS 插画'],
    html: a31, bg: '#eef0ff',
    links: [['Wikipedia · Isometric projection', W_('Isometric_projection')]],
    css: `/* CSS 也能做等距：把平面转到 30° 斜轴上 */
.iso-plane { transform: rotateX(60deg) rotateZ(-45deg);
  transform-style: preserve-3d; }
.iso-box { --t: #ffd6a5; --l: #f4b183; --r: #e39b69; }
/* 三个面固定三种明度：顶 > 左 > 右 */
.iso-box .top   { background: var(--t); }
.iso-box .left  { background: var(--l); }
.iso-box .right { background: var(--r); }`
  },
  {
    code: 'A32', name: '蓝图', en: 'Blueprint', meta: '工程制图 · 1840s–1940s',
    desc: '旧式工程图纸的样子：深蓝底、白色细线，满版的方格网，图形带中心线（点划线）、尺寸线和箭头、半径与直径标注，右下角有图签栏（图名、图号、比例、日期），字是工程师的手写体。网页上适合技术文档、几何/物理讲解、开发者工具；它天生适合「把一个定理画成图纸」。',
    more: '蓝图是 1842 年发明的氰版印刷：图纸经曝光后底色变成普鲁士蓝，线条留白，所以是蓝底白线；20 世纪中期被重氮复印（白底蓝线）和 CAD 取代，但「蓝图」成了「计划」的代名词。借用要点：网格分主次两级、线宽分粗中细三级（轮廓粗、标注细）、点划线表示中心线、尺寸线两端是实心箭头。这里画的是单位圆：θ、cos θ、sin θ 都按制图规范标注。不适合：需要温暖、亲和感的页面。',
    kw: ['蓝底白线', '方格网', '尺寸标注', '图签栏', '工程制图'],
    html: a32, bg: '#1d4e89', dark: true,
    links: [['Wikipedia · Blueprint', W_('Blueprint')], ['Wikipedia · Technical drawing', W_('Technical_drawing')]],
    css: `.blueprint {
  background:
    linear-gradient(rgba(207,225,255,.3) 1px, transparent 1px) 0 0 / 50px 50px,
    linear-gradient(90deg, rgba(207,225,255,.3) 1px, transparent 1px) 0 0 / 50px 50px,
    linear-gradient(rgba(207,225,255,.12) 1px, transparent 1px) 0 0 / 10px 10px,
    linear-gradient(90deg, rgba(207,225,255,.12) 1px, transparent 1px) 0 0 / 10px 10px,
    radial-gradient(circle at 45% 40%, #2463a8, #163f74);
  color: #eaf2ff; font-family: 'Architects Daughter', cursive;
}
.center-line { stroke-dasharray: 14 3 2 3; } /* 点划线 */`
  },
  {
    code: 'A33', name: '孔版印刷', en: 'Risograph', meta: '理想牌速印机 · 1986 起',
    desc: '用一次只能印一色的速印机套印出来的效果：荧光粉 + 中蓝这类专色叠在一起变成紫色（正片叠底），每一色都略微错位，墨色里有颗粒和漏白，常配半调网点和粗体字。网页上适合独立出版、设计工作室、海报式活动页；颜色限定两三种，叠印处会自然生成第三种。',
    more: 'Risograph 是日本理想科学工业的速印机，本是学校和办公室印讲义用的，2010 年代被独立出版和插画师大量使用：油墨是半透明的专色（荧光粉 #ff48b0、中蓝 #0078bf、黄 #ffe800 等），套印必然有一点错位和不均匀，这种「不完美」就是它的魅力。实现：每色一层，mix-blend-mode: multiply 叠印，translate 几像素做错位，SVG feTurbulence 做颗粒和漏白。不适合：需要精确、干净、品牌规范严格的界面。',
    kw: ['套印', '荧光粉', '错位', '颗粒', '正片叠底'],
    html: a33, bg: '#f3efe6',
    links: [['Wikipedia · Risograph', W_('Risograph')]],
    css: `.riso { background: #f3efe6; isolation: isolate; }
.riso .pink, .riso .blue { mix-blend-mode: multiply; }
.riso .pink { color: #ff48b0; background: #ff48b0; }
.riso .blue { color: #0078bf; background: #0078bf;
  translate: 3px -2px; /* 套印错位 */ }
/* 半调网点渐变 */
.riso .halftone {
  background: radial-gradient(circle, #ff48b0 40%, transparent 42%) 0 0 / 10px 10px;
  mask: linear-gradient(90deg, #000, transparent); }`
  },
  {
    code: 'A34', name: '等高线', en: 'Topographic contours', meta: '地形图 · 18 世纪起',
    desc: '地形图上把同一海拔的点连成的曲线：线越密坡越陡，闭合的小圈是山顶，每第五条「计曲线」画得更粗。做背景时只取线条本身，细、淡、单色，有一种安静的秩序感。对数学网站还有一层意思：等高线就是函数 f(x, y) = c 的水平集。网页上适合做头图、页脚或卡片底纹。',
    more: '等高线由 18 世纪的法国测绘员推广，至今是地形图的标准表示法（美国地质调查局的棕色等高线最经典）。网页设计里它常被当作「户外、探索、数据」的符号，在深色或浅色底上做低对比底纹。这里的画法：在网格上计算一个二元函数（几个高斯山包 + 少量起伏），再用 marching squares 算法求出 26 个高度的等值线，画布只画一次。不适合：作为正文的直接背景时线条要非常淡；颜色多了就变成「热力图」了。',
    kw: ['等高线', '计曲线', '地形图', '水平集', '线条底纹'],
    html: `<canvas class="ar-fill-cv"></canvas><div class="ar-tp-t"><small>N 31°14′ · E 121°29′</small><b>Level sets</b><span>f(x, y) = c</span></div><div class="ar-tp-pin"><i></i>1024 m</div>`,
    init(stage, ctx) { paintCanvas(stage, ctx, stage.querySelector('canvas'), a34draw); },
    bg: '#f3efe4',
    links: [['Wikipedia · Contour line', W_('Contour_line')], ['Wikipedia · Marching squares', W_('Marching_squares')]],
    css: `/* 用 SVG 画好的等高线做平铺底纹，颜色压得很淡 */
.topo { background: #f3efe4 url(contours.svg) center / cover; color: #3d2e20; }
.topo .label { font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .08em; color: #8b6b4a; }
/* 线条规范：普通等高线细而淡，每第 5 条（计曲线）加粗 */
.topo path { stroke: rgba(150,104,66,.5); stroke-width: 1; fill: none; }
.topo path.index { stroke: rgba(120,78,44,.85); stroke-width: 1.9; }`
  },
  {
    code: 'A35', name: '手绘笔记', en: 'Hand-drawn notebook', meta: '手账 · 草图风',
    desc: '像一页真实的学习笔记：浅蓝方格纸、红色页边线、装订孔，手写的公式和批注，抖动的手绘线条画的坐标轴和函数图，荧光笔划重点、红笔圈出易错点、贴一张便利贴。网页上非常适合数学笔记、习题讲解、学习博客——亲切、不严肃，但要控制「涂鸦」的量，正文仍用清晰的印刷体。',
    more: '手绘风（hand-drawn / sketchy）在网页上流行于 Excalidraw、Notion 插画和各类学习类产品：它降低距离感，暗示「这是草稿，可以讨论」。技术上，抖动线条是 rough.js 的思路——同一条线画两遍、每遍加一点随机偏移；手写字体用 Caveat（西文）、龙藏体（中文）。这里画的是 1/(1−x) 和它的三阶部分和 S₃(x)，在收敛半径 x = 1 处分道扬镳。不适合：正式的定义、定理正文（手写体可读性差）；整页都是手绘会显得杂乱。',
    kw: ['方格纸', '手写体', '荧光笔', '便利贴', '抖动线'],
    html: a35, bg: '#fbfaf4', wide: true,
    links: [['Wikipedia · Graph paper', W_('Graph_paper')]],
    css: `.notebook {
  background:
    linear-gradient(90deg, transparent 69px, #f08a8a 69px 71px, transparent 71px),
    linear-gradient(#b9d0ea 1px, transparent 1px) 0 0 / 20px 20px,
    linear-gradient(90deg, #b9d0ea 1px, transparent 1px) 0 0 / 20px 20px,
    #fbfaf4;
  font-family: 'Caveat', 'Long Cang', cursive; color: #2a2f45;
}
.highlight { background: linear-gradient(transparent 45%, rgba(255,228,92,.8) 45% 85%, transparent 85%); }
.sticky { background: #fff59a; rotate: -4deg;
  box-shadow: 0 6px 12px -6px rgba(0,0,0,.3); }`
  },
  {
    code: 'A36', name: '伊斯兰几何', en: 'Islamic geometric patterns', meta: '中东 · 中亚 · 9 世纪起',
    desc: '用圆规和直尺构造的无限重复纹样：最经典的是「八角星 + 十字」镶嵌，星与星的尖角相接，中间自然留出十字形；线条像编织的带子（strapwork），配色是钴蓝、绿松石、赭红和金。网页上适合做文化主题的背景、边框和分隔条；数学上它就是平面的周期镶嵌，中间写的「الجبر」（al-jabr）正是「代数」algebra 一词的来源。',
    more: '伊斯兰艺术回避具象形象，把几何发展到极致：从 9 世纪起，清真寺、宫殿（阿尔罕布拉宫）、瓷砖（伊朗卡尚星形砖）上出现了 8、10、12 重对称的星形镶嵌，部分图案甚至接近现代数学中的准晶体。八角星由两个旋转 45° 的正方形叠成，按正方形网格排列，星尖相触。实现：画一个周期单元，用 SVG pattern 平铺。不适合：大面积放在正文后面（太密）；作为边框或页头只需一条窄带。',
    kw: ['八角星', '镶嵌', '编织带', '钴蓝金', '对称'],
    html: a36, bg: '#1c3f8c', dark: true,
    links: [['Wikipedia · Islamic geometric patterns', W_('Islamic_geometric_patterns')], ['Wikipedia · Girih', W_('Girih')]],
    css: `/* 八角星：两个旋转 45° 的正方形叠在一起 */
.star8 { position: relative; width: 60px; aspect-ratio: 1; }
.star8::before, .star8::after { content: ""; position: absolute; inset: 15%;
  background: #1c3f8c; outline: 2px solid #f4ead2; }
.star8::after { rotate: 45deg; }
/* 平铺：最省事是把一个周期单元画成 SVG，再 background-repeat */
.zellige { background: #c8643b url(star-and-cross.svg) 0 0 / 50px 50px; }`
  }
];

registerPages('A', [
  { type: 'gallery', token: 'art-modern', title: '现代艺术运动', min: 340, intro: '20 世纪的设计史基本就是这十个名字。每张都是用该风格现场绘制的背景或主视觉，上面压一小段字，演示「在这种背景上放内容」的样子。', tiles: PAGE1 },
  { type: 'gallery', token: 'art-east', title: '东方与传统', min: 340, intro: '中国、日本与丝路上的传统视觉。每种都有固定的纹样和色名，借用时最好成套使用：纹样、配色、字体一起换。', tiles: PAGE2 },
  { type: 'gallery', token: 'art-ui', title: '界面材质的演变', min: 340, intro: '从模仿皮革的拟物到会流动的极光渐变，界面「材质」大约每五年换一次潮流。每张都放了一张小卡片或几个控件，看同一种材质落到界面上是什么样子。', tiles: PAGE3 },
  { type: 'gallery', token: 'art-sub', title: '亚文化与图形', min: 340, intro: '网络亚文化、游戏和专业图纸里长出来的视觉。它们辨识度极高，适合做头图、彩蛋或某一个栏目的主题，整站使用要谨慎。', tiles: PAGE4 }
]);
