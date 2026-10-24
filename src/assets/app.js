// 宋纸手稿：主题、洒金宣纸、纸下插画、封面远山、目录抽屉、搜索、中 / Fr、证明开关、翻书
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* 隐私模式下忽略 */ } },
  };
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  const raf = (f) => { let on = false; return () => { if (on) return; on = true; requestAnimationFrame(() => { on = false; f(); }); }; };

  // 每次打开页面换一个随机种子：纸纹、金箔、远山、插画都会不同；切换亮暗时沿用同一个种子
  const SEED = (crypto.getRandomValues ? crypto.getRandomValues(new Uint32Array(1))[0] : Math.random() * 2 ** 32) >>> 0;
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function noise1(seed, n) {
    const r = rng(seed); const v = Array.from({ length: n + 2 }, r);
    return (t) => { const i = Math.floor(t), f = t - i, u = (1 - Math.cos(f * Math.PI)) / 2; return v[i % (n + 2)] * (1 - u) + v[(i + 1) % (n + 2)] * u; };
  }

  // ———— 主题：从按钮处圆形展开 ————
  const themeListeners = [];
  const onTheme = (f) => themeListeners.push(f);
  const fireTheme = () => { themeListeners.forEach((f) => f()); window.dispatchEvent(new Event('themechange')); };
  new MutationObserver(fireTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!root.dataset.theme) fireTheme(); });
  $('#theme-toggle')?.addEventListener('click', (e) => {
    const next = isDark() ? 'light' : 'dark';
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const apply = () => { root.dataset.theme = next; store.set('theme', next); };
    if (!document.startViewTransition || reduce.matches) { apply(); return; }
    root.style.setProperty('--tx', `${x}px`);
    root.style.setProperty('--ty', `${y}px`);
    root.style.setProperty('--tr', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
    document.startViewTransition(apply);
  });

  // ———— 阅读进度：朱色细线 ————
  const bar = $('#progress');
  if (bar) {
    let docH = 0;
    const measure = () => { docH = root.scrollHeight - innerHeight; };
    const upd = raf(() => { bar.style.transform = `scaleX(${docH > 0 ? Math.min(1, scrollY / docH).toFixed(4) : 0})`; });
    new ResizeObserver(() => { measure(); upd(); }).observe(document.body);
    addEventListener('resize', measure);
    addEventListener('scroll', upd, { passive: true });
    measure(); upd();
  }

  // ———— 洒金宣纸：纤维、云状深浅、细长金箔；另画一层金箔反光 ————
  const texEl = $('.paper-tex'), sheen = $('.paper-sheen');
  const paperCache = {};
  function paperCanvases(dark) {
    const T = 900, S = Math.min(devicePixelRatio || 1, 2);
    const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
    const R = rng(SEED);
    const flecks = [];
    const G = 16, cell = T / G;   // 抖动网格：疏密均匀
    for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
      flecks.push({ x: (i + .15 + R() * .7) * cell, y: (j + .15 + R() * .7) * cell, s: 2.1 + R() * 1.6, rot: R() * Math.PI, k: 4 + Math.floor(R() * 3), st: .17 + R() * .15, al: R(), sd: Math.floor(R() * 1e9) });
    }
    for (let i = 0; i < 12; i++) {   // 每张纸十来片稍大的金箔
      flecks.push({ x: R() * T, y: R() * T, s: 4.5 + R() * 2.5, rot: R() * Math.PI, k: 5 + Math.floor(R() * 3), st: .3 + R() * .2, al: .3 + R() * .5, sd: Math.floor(R() * 1e9) });
    }
    const OFF = [-T, 0, T];
    const near = (v, s) => (v < s + 2 ? [0, T] : v > T - s - 2 ? [0, -T] : [0]);
    const flake = (g, f, fill) => {
      const r = rng(f.sd);
      for (const dx of near(f.x, f.s)) for (const dy of near(f.y, f.s)) {
        const cx = f.x + dx, cy = f.y + dy;
        g.beginPath();
        for (let i = 0; i < f.k; i++) {
          const t = (i / f.k) * Math.PI * 2 + (r() - .5) * .5;
          const rad = f.s * (.55 + .45 * r());
          const lx = Math.cos(t) * rad, ly = Math.sin(t) * rad * f.st;   // 先压扁成细条，再整体旋转
          const px = cx + lx * Math.cos(f.rot) - ly * Math.sin(f.rot), py = cy + lx * Math.sin(f.rot) + ly * Math.cos(f.rot);
          if (i) g.lineTo(px, py); else g.moveTo(px, py);
        }
        g.closePath(); g.fillStyle = fill(f); g.fill();
      }
    };
    const TONES = ['150,114,48', '172,134,60', '190,154,84', '134,100,40'];
    const [lo, hi] = dark ? [.14, .3] : [.4, .68];
    const [c, g] = mk(T * S, T * S); g.scale(S, S); g.lineCap = 'round';
    for (let i = 0; i < 260; i++) {   // 纤维
      const x = R() * T, y = R() * T, len = 8 + R() * 46, a = R() * Math.PI, bend = (R() - .5) * 14;
      const light = R() > .35;
      g.strokeStyle = dark ? (light ? 'rgba(201,168,107,.055)' : 'rgba(0,0,0,.35)') : (light ? 'rgba(255,255,250,.62)' : 'rgba(120,96,56,.07)');
      g.lineWidth = .35 + R() * .6;
      for (const dx of OFF) for (const dy of OFF) {
        const x0 = x + dx, y0 = y + dy, x1 = x0 + Math.cos(a) * len, y1 = y0 + Math.sin(a) * len;
        if (Math.max(x0, x1) < -60 || Math.min(x0, x1) > T + 60 || Math.max(y0, y1) < -60 || Math.min(y0, y1) > T + 60) continue;
        g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + x1) / 2 + bend, (y0 + y1) / 2 - bend, x1, y1); g.stroke();
      }
    }
    for (let i = 0; i < 260; i++) {   // 金粉
      g.fillStyle = `rgba(176,140,70,${(dark ? .1 : .18) * R() + .03})`;
      g.fillRect(R() * T, R() * T, .7, .7);
    }
    flecks.forEach((f) => flake(g, f, () => `rgba(${TONES[f.sd % 4]},${lo + (hi - lo) * f.al})`));
    const [ch, gh] = mk(T * S, T * S); gh.scale(S, S);   // 反光层：只有金箔，颜色更亮
    flecks.forEach((f) => flake(gh, f, () => (dark ? 'rgba(214,184,116,.55)' : 'rgba(232,208,146,.7)')));
    const M = 400;   // 云状深浅：低分辨率画，放大后自然柔和
    const [cm, gm] = mk(M, M);
    for (let i = 0; i < 70; i++) {
      const x = R() * M, y = R() * M, r = 20 + R() * 70;
      const col = dark ? (R() > .5 ? '201,168,107' : '0,0,0') : (R() > .45 ? '255,255,248' : '150,120,70');
      const a = dark ? (col === '0,0,0' ? .22 : .028) : (col[0] === '2' ? .32 : .045);
      for (const dx of [-M, 0, M]) for (const dy of [-M, 0, M]) {
        const gr = gm.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
        gr.addColorStop(0, `rgba(${col},${a})`); gr.addColorStop(1, `rgba(${col},0)`);
        gm.fillStyle = gr; gm.fillRect(x + dx - r, y + dy - r, r * 2, r * 2);
      }
    }
    return { tex: c, hi: ch, mottle: cm };
  }
  const toURL = (cv) => new Promise((res) => cv.toBlob((b) => res(b ? URL.createObjectURL(b) : cv.toDataURL())));
  async function applyPaper() {
    if (!texEl) return;
    const dark = isDark();
    paperCache[dark] ||= (async () => { const c = paperCanvases(dark); const [tex, hi, mottle] = await Promise.all([toURL(c.tex), toURL(c.hi), toURL(c.mottle)]); return { tex, hi, mottle }; })();
    const u = await paperCache[dark];
    if (dark !== isDark()) return;
    texEl.style.backgroundImage = `url(${u.tex}), url(${u.mottle}), var(--grain)`;
    texEl.style.backgroundSize = '900px 900px, 1600px 1600px, 220px 220px';
    if (sheen) sheen.style.backgroundImage = `url(${u.hi})`;
  }
  requestAnimationFrame(() => setTimeout(applyPaper, 30));
  onTheme(applyPaper);

  // 指针经过处金箔反光（只改反光层自己的样式，不牵动正文）；封面烫金随指针横向流动
  const coverEl = $('.cover');
  let mx = -9999, my = -9999;
  const placeSheen = raf(() => {
    if (!sheen) return;
    sheen.style.setProperty('--mx', `${mx}px`);
    sheen.style.setProperty('--my', `${my}px`);
    sheen.style.backgroundPosition = `${-scrollX}px ${-scrollY}px`;
    if (coverEl && scrollY < coverEl.offsetTop + coverEl.offsetHeight) coverEl.style.setProperty('--gx', (mx / innerWidth).toFixed(3));
  });
  addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; mx = e.clientX; my = e.clientY; placeSheen(); }, { passive: true });
  addEventListener('scroll', () => { if (mx > -9999) placeSheen(); }, { passive: true });
  root.addEventListener('pointerleave', () => { mx = my = -9999; placeSheen(); });

  // ———— 纸下的插画与图案：隔一段放一张，左右交替，填掉大片留白 ————
  // 敦煌藻井：方井套菱形套方，中心八瓣莲，外圈联珠与垂角
  function zaojing() {
    const C = { red: '#9c4a33', blue: '#2e5872', green: '#3e8a75', ochre: '#b8834f', white: '#efe3c8', gold: '#c9a24a', ink: '#3a2c22' };
    const o = [];
    o.push(`<rect x="8" y="8" width="584" height="584" fill="${C.red}"/>`, `<rect x="22" y="22" width="556" height="556" fill="none" stroke="${C.white}" stroke-width="2"/>`);
    for (let t = 0; t <= 1.0001; t += 1 / 26) {
      const v = 34 + t * 532;
      for (const [x, y] of [[v, 34], [v, 566], [34, v], [566, v]]) o.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/>`);
    }
    const n = 12, a = 50, b = 550, d = 38;
    for (let i = 0; i < n; i++) {
      const u0 = a + (b - a) * i / n, u1 = a + (b - a) * (i + 1) / n, um = (u0 + u1) / 2, col = i % 2 ? C.green : C.blue;
      for (const pts of [`${u0},${a} ${u1},${a} ${um},${a + d}`, `${u0},${b} ${u1},${b} ${um},${b - d}`, `${a},${u0} ${a},${u1} ${a + d},${um}`, `${b},${u0} ${b},${u1} ${b - d},${um}`]) o.push(`<polygon points="${pts}" fill="${col}" stroke="${C.white}" stroke-width="1.5"/>`);
    }
    o.push(`<rect x="96" y="96" width="408" height="408" fill="${C.blue}" stroke="${C.white}" stroke-width="3"/>`);
    const spiral = (cx, cy, s, dir) => {
      let dd = `M${cx} ${cy}`;
      for (let k = 1; k <= 60; k++) { const th = k / 60 * Math.PI * 3.2, r = s * k / 60; dd += `L${(cx + dir * r * Math.cos(th)).toFixed(1)} ${(cy + r * Math.sin(th)).toFixed(1)}`; }
      return `<path d="${dd}" fill="none" stroke="${C.white}" stroke-width="4" stroke-linecap="round"/>`;
    };
    for (const [x, y] of [[150, 150], [450, 150], [150, 450], [450, 450]]) o.push(spiral(x - 14, y, 26, 1), spiral(x + 14, y, 26, -1));
    o.push(`<polygon points="300,96 504,300 300,504 96,300" fill="${C.green}" stroke="${C.white}" stroke-width="3"/>`);
    for (const [x, y] of [[300, 160], [440, 300], [300, 440], [160, 300]]) o.push(`<circle cx="${x}" cy="${y}" r="10" fill="${C.white}"/><circle cx="${x}" cy="${y}" r="4" fill="${C.red}"/>`);
    o.push(`<rect x="198" y="198" width="204" height="204" fill="${C.ochre}" stroke="${C.white}" stroke-width="3"/>`, `<circle cx="300" cy="300" r="94" fill="${C.white}" stroke="${C.red}" stroke-width="3"/>`);
    for (let k = 0; k < 8; k++) o.push(`<ellipse cx="300" cy="238" rx="20" ry="58" fill="${C.red}" stroke="${C.white}" stroke-width="2" transform="rotate(${k * 45} 300 300)"/>`);
    for (let k = 0; k < 8; k++) o.push(`<ellipse cx="300" cy="256" rx="13" ry="38" fill="${C.blue}" stroke="${C.white}" stroke-width="1.5" transform="rotate(${k * 45 + 22.5} 300 300)"/>`);
    o.push(`<circle cx="300" cy="300" r="28" fill="${C.green}" stroke="${C.white}" stroke-width="2"/><circle cx="300" cy="300" r="11" fill="${C.gold}"/>`);
    return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">${o.join('')}</svg>`;
  }
  // 浮世绘青海波：一排排同心圆弧，下一排压住上一排
  function seigaiha(w, h) {
    const r = 30, o = [];
    for (let j = 0; j * r / 2 < h + r; j++) {
      for (let i = -1; i * 2 * r < w + 2 * r; i++) {
        const cx = i * 2 * r + (j % 2 ? r : 0), cy = j * r / 2;
        for (let k = 4; k >= 1; k--) o.push(`<circle cx="${cx}" cy="${cy}" r="${(r * k / 4 - 1).toFixed(1)}" fill="var(--neutral)" stroke="var(--wave)" stroke-width="${k === 4 ? 2.6 : 1.8}"/>`);
      }
    }
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${o.join('')}</svg>`;
  }
  // 插画池：[文件, 名字, 类别, 朝向, 高宽比]。朝向 r：面朝右，放左边；l：面朝左，放右边；''：不分方向
  const POOL = [
    ['10-shinv', '执扇仕女', '人物', 'l', 1.255], ['11-fuqin', '抚琴高士', '人物', 'l', 1.25], ['12-yuweng', '蓑笠渔翁', '人物', 'r', 1.115],
    ['13-pipa', '琵琶仕女', '人物', 'r', 1.244], ['14-chengsan', '撑伞', '人物', 'r', 1.325], ['15-sanxian', '三味线', '人物', 'l', 1.202],
    ['16-xingzhe', '行者', '人物', 'r', 1.181], ['17-feitian', '飞天', '人物', 'r', 1.25], ['19-gewuji', '歌舞伎', '人物', 'l', 1.228],
    ['01-jiuweihu', '九尾狐', '瑞兽', 'l', 1], ['02-qilin', '麒麟', '瑞兽', 'l', 1.006], ['03-yutu', '玉兔捣药', '瑞兽', 'r', 1.001],
    ['04-fenghuang', '凤凰', '瑞兽', 'l', 1], ['05-tiangou', '天狗', '瑞兽', 'l', .998], ['20-qinglong', '青龙', '瑞兽', 'l', 1],
    ['06-pubu', '山水瀑布', '山水楼阁', '', .955], ['07-gongdian', '宫殿', '山水楼阁', '', .906], ['08-yuanlin', '园林月洞门', '山水楼阁', '', .998],
    ['09-baota', '宝塔山水', '山水楼阁', '', 1], ['18-gongmen', '宫门', '山水楼阁', '', .915],
  ];
  const decoLayer = $('#decos');
  const slotRng = (i, salt) => rng((SEED ^ Math.imul(i + 1, 0x9e3779b1) ^ salt) >>> 0);
  const sideOf = (i) => (i === 0 || i % 2 === 0 ? 'left' : 'right');
  const isMedal = (i) => i % 7 === 4;
  // 抽签（按位置顺序、只抽一次）：面朝页面里面；近八幅不重复；相邻不同类；山水楼阁少一些；封面只要朝右的人物或瑞兽
  const picks = [];
  function pickFor(i) {
    for (let j = picks.length; j <= i; j++) {
      if (isMedal(j) && j) { picks[j] = 'medal'; continue; }
      const need = sideOf(j) === 'left' ? 'r' : 'l';
      const recent = picks.slice(Math.max(0, j - 8), j).filter((p) => p && p !== 'medal');
      const prev = recent[recent.length - 1];
      const fits = (q) => (j === 0 ? q[3] === need && q[2] !== '山水楼阁' : q[3] === need || q[3] === '');
      let cand = POOL.filter((q) => fits(q) && !recent.some((r) => r[0] === q[0]) && (!prev || q[2] !== prev[2]));
      if (!cand.length) cand = POOL.filter((q) => fits(q) && !recent.some((r) => r[0] === q[0]));
      if (!cand.length) cand = POOL.filter(fits);
      const w = cand.map((q) => (q[2] === '山水楼阁' ? .55 : 1));
      let t = slotRng(j, 0x51)() * w.reduce((a, b) => a + b, 0), k = 0;
      while (k < cand.length - 1 && (t -= w[k]) > 0) k++;
      picks[j] = cand[k];
    }
    return picks[i];
  }
  const slots = [];
  let band = null, bandKey = '';
  function slotEl(i, small) {
    if (slots[i]) return slots[i];
    const p = pickFor(i);
    const el = document.createElement('div');
    if (p === 'medal') { el.className = 'deco soft medal'; el.innerHTML = zaojing(); el.dataset.ratio = '1'; }
    else {
      const src = `assets/img/${p[0]}${small ? '-sm' : ''}.webp`;
      el.className = `deco${i ? ' soft' : ' cover-deco'}`;
      el.dataset.ratio = String(p[4]);
      el.innerHTML = `<img class="pa-blur" src="${src}" alt="" loading="lazy" decoding="async"><img class="pa-sharp" src="${src}" alt="" loading="lazy" decoding="async">`;
    }
    decoLayer.appendChild(el);
    return (slots[i] = el);
  }
  function layoutDecos() {
    if (!decoLayer) return;
    const W = root.clientWidth, narrow = W < 760;
    const foot = $('.site-foot');
    const end = (foot ? foot.offsetTop : root.scrollHeight) - 160;
    const put = (el, top, w, side, over) => {
      const h = w * +el.dataset.ratio;
      Object.assign(el.style, { top: `${top}px`, width: `${w}px`, height: `${h}px`, left: side === 'left' ? `${-w * over}px` : 'auto', right: side === 'right' ? `${-w * over}px` : 'auto' });
      el.hidden = false;
      return h;
    };
    let i = 0;
    if (coverEl) {   // 封面：左上角，看向章名
      const w = narrow ? W * .74 : Math.max(300, Math.min(620, W * .42));
      put(slotEl(0, narrow), coverEl.offsetTop + 12, w, 'left', .03);
      i = 1;
    }
    const step = narrow ? Math.max(820, innerHeight * 1.4) : Math.min(2100, Math.max(1150, innerHeight * 1.3));
    let y = (coverEl ? coverEl.offsetTop + coverEl.offsetHeight : 0) + (narrow ? 140 : 240);
    for (; ; i++) {
      const medal = pickFor(i) === 'medal';
      const w = medal ? Math.max(200, Math.min(400, W * .26)) : narrow ? W * .7 : Math.max(260, Math.min(520, W * .34));
      if (y + w * .6 > end) break;
      if (medal && narrow) { if (slots[i]) slots[i].hidden = true; }
      // 左边的画退到页边里，不压正文；右边页边宽，画可以多露一些
      else put(slotEl(i, narrow), y, w, sideOf(i), medal || narrow ? .45 : sideOf(i) === 'left' ? .46 : .22);
      y += step * (.8 + .4 * slotRng(i, 0x7f)());
    }
    for (let j = i; j < slots.length; j++) if (slots[j]) slots[j].hidden = true;
    // 页脚上方一条青海波
    if (foot) {
      if (!band) { band = document.createElement('div'); band.className = 'deco soft band'; decoLayer.appendChild(band); }
      const h = narrow ? 170 : 240;
      Object.assign(band.style, { top: `${foot.offsetTop - h * .35}px`, left: '0', width: `${W}px`, height: `${h}px` });
      const key = `${W}x${h}`;
      if (bandKey !== key) { band.innerHTML = seigaiha(Math.round(W), h); bandKey = key; }
    }
  }
  const relayout = raf(layoutDecos);
  if (decoLayer) {
    new ResizeObserver(relayout).observe(document.body);
    document.fonts?.ready.then(relayout);
    layoutDecos();
  }

  // ———— 封面：水墨远山，四层画布做视差 ————
  const layers = $$('.mtn');
  const LAYERS = [
    { base: .56, amp: .15, seed: 7, oct: [[3, 1], [7, .45], [17, .18]], light: [116, 146, 146, .30], dark: [201, 168, 107, .10], skew: -.30 },
    { base: .66, amp: .16, seed: 19, oct: [[4, 1], [9, .45], [23, .2]], light: [88, 108, 106, .40], dark: [201, 168, 107, .15], skew: -.34 },
    { base: .77, amp: .14, seed: 31, oct: [[3, 1], [11, .5], [29, .22]], light: [56, 62, 60, .58], dark: [190, 152, 92, .22], skew: -.40 },
    { base: .92, amp: .17, seed: 43, oct: [[2, 1], [8, .4], [31, .25]], light: [35, 33, 29, .86], dark: [176, 136, 78, .32], skew: -.62 },
  ];
  function drawLayer(cv, L, dark, w, h) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    const narrow = w < 700;
    const base = L.base + (narrow ? .1 : 0), amp = L.amp * (narrow ? .8 : 1);
    const ns = L.oct.map(([f], k) => noise1(SEED + L.seed + k * 101, f + 2));
    const ridge = (x) => {
      const t = x / w;
      let y = 0, a = 0;
      L.oct.forEach(([, am], k) => { y += ns[k](t * L.oct[k][0]) * am; a += am; });
      y /= a;
      const lean = (t - .5) * L.skew;   // 山势向左抬：画在左上，文字在右
      return h * (base - (y - .5) * amp * 2 - lean * amp * 2);
    };
    const [r, gg, b, al] = dark ? L.dark : L.light;
    const ink = (k) => `rgba(${r},${gg},${b},${(al * k).toFixed(3)})`;
    for (let pass = 0; pass < 3; pass++) {   // 从山脊向下渐淡，像雾里出山；叠三遍让边缘有晕染
      const off = (pass - 1) * 1.8;
      g.beginPath(); g.moveTo(0, h);
      for (let x = 0; x <= w; x += 3) g.lineTo(x, ridge(x) + off);
      g.lineTo(w, h); g.closePath();
      const top = h * (base - amp * 1.4), depth = h * .26;
      const grad = g.createLinearGradient(0, top, 0, top + depth + h * amp);
      const k = pass === 1 ? 1 : .3;
      grad.addColorStop(0, ink(k)); grad.addColorStop(.5, ink(.32 * k)); grad.addColorStop(1, ink(0));
      g.fillStyle = grad; g.fill();
    }
    const wob = noise1(SEED + L.seed * 13, 40);   // 沿山脊的一道墨线，浓淡随笔势变化，有断有连
    g.lineCap = 'round';
    for (let x = 0; x < w; x += 6) {
      const v = wob(x / w * 40);
      if (v < .35) continue;
      g.strokeStyle = ink(.25 + .55 * v); g.lineWidth = .6 + 1.6 * v;
      g.beginPath(); g.moveTo(x, ridge(x)); g.lineTo(x + 6, ridge(x + 6)); g.stroke();
    }
    if (L.seed > 20) {   // 点苔
      const R = rng(SEED + L.seed * 7);
      g.fillStyle = ink(.7);
      for (let i = 0; i < w / 34; i++) {
        const x = (.35 + .65 * R()) * w, y = ridge(x) + 2 + R() * 10;
        g.beginPath(); g.ellipse(x, y, 1.2 + R() * 1.8, .8 + R(), R() * 3, 0, Math.PI * 2); g.fill();
      }
    }
  }
  if (coverEl && layers.length) {
    let key = '';
    const sizeCover = () => {
      const w = coverEl.clientWidth, h = coverEl.clientHeight, k = `${w}x${h}:${isDark()}`;
      if (k === key) return;
      key = k;
      layers.forEach((cv, i) => drawLayer(cv, LAYERS[i], isDark(), w, h));
    };
    new ResizeObserver(sizeCover).observe(coverEl);
    // 封面离开视口后暂停跑马灯、光晕与远山，免得长页面每一帧都在合成封面
    new IntersectionObserver(([e]) => coverEl.classList.toggle('off', !e.isIntersecting)).observe(coverEl);
    setTimeout(() => coverEl.classList.add('settled'), 2600);
    onTheme(sizeCover);
    const parallax = raf(() => {
      const H = coverEl.offsetHeight, y = Math.min(scrollY, H);
      if (scrollY > H * 1.2 && layers[0].dataset.y === String(H)) return;
      layers.forEach((cv, i) => { cv.style.transform = `translate3d(0, ${y * [0.42, 0.3, 0.18, 0.06][i]}px, 0)`; cv.dataset.y = String(y); });
      if (slots[0]) slots[0].style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    });
    if (!reduce.matches) addEventListener('scroll', parallax, { passive: true });
  }

  // ———— 目录抽屉 ————
  const drawer = $('#drawer'), scrim = $('#scrim'), burger = $('#burger');
  const setDrawer = (on) => {
    if (!drawer) return;
    drawer.classList.toggle('on', on); scrim.classList.toggle('on', on);
    burger.setAttribute('aria-expanded', String(on));
    burger.setAttribute('aria-label', on ? '关闭目录' : '打开目录');
    drawer.setAttribute('aria-hidden', String(!on));
    if (on) (drawer.querySelector('li.on a, li.cur a') || drawer.querySelector('a'))?.focus({ preventScroll: true });
  };
  burger?.addEventListener('click', () => setDrawer(!drawer.classList.contains('on')));
  $$('[data-open-drawer]').forEach((b) => b.addEventListener('click', () => setDrawer(true)));
  scrim?.addEventListener('click', () => setDrawer(false));
  $$('[data-close]', drawer || document).forEach((a) => a.addEventListener('click', () => setDrawer(false)));

  // ———— 当前小节：顶栏面包屑与抽屉同步 ————
  const heads = $$('.article h2');
  if (heads.length) {
    const crumbSec = $('#crumb-sec');
    const secLinks = new Map($$('#drawer-toc a').map((a) => [a.dataset.sec, a.parentElement]));
    let cur = '';
    const spy = raf(() => {
      let h = null;
      for (const x of heads) { if (x.getBoundingClientRect().top < innerHeight * 0.3) h = x; else break; }
      const id = h ? h.id : '';
      if (id === cur) return;
      cur = id;
      secLinks.forEach((li, k) => li.classList.toggle('cur', k === id));
      if (crumbSec) crumbSec.textContent = h ? `§ ${h.querySelector('.sec-num')?.textContent || ''} ${[...h.childNodes].filter((n) => !n.classList?.contains('sec-num')).map((n) => n.textContent).join('').trim()}` : '';
    });
    addEventListener('scroll', spy, { passive: true });
    spy();
  }

  // ———— 搜索：全书的定理、定义、例子、小节与术语 ————
  const search = $('#search'), q = $('#q'), results = $('#results');
  const here = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  let act = 0, hits = [];
  function renderResults() {
    const S = window.SEARCH || [];
    const terms = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) hits = S.filter((e) => e[4] === here && e[0] === '节');
    else {
      hits = S.filter((e) => { const t = `${e[3]} ${e[7] || ''}`.toLowerCase(); return terms.every((w) => t.includes(w)); });
      const score = (e) => (e[4] === here ? 0 : 1) + (e[0] === '术语' ? 2 : 0) + (e[0] === '节' ? -.5 : 0);
      hits = hits.map((e, i) => [score(e), i, e]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).slice(0, 60).map((x) => x[2]);
    }
    act = Math.min(act, Math.max(0, hits.length - 1));
    results.innerHTML = hits.length
      ? hits.map((e, i) => `<li><a class="${i === act ? 'act' : ''}" href="${e[4] === here ? '' : e[4]}#${e[5]}"><span class="k">${e[0]}</span><span class="n">${e[1] ? `${e[1]}　` : ''}${e[2]}${e[7] ? `<small>${e[7]}</small>` : ''}</span><span class="s">第 ${e[6]} 章</span></a></li>`).join('')
      : `<li class="none">${terms.length ? `没有找到「${q.value.replace(/[<>&]/g, '')}」。试试「一致收敛」「Baire」「convergence」「сходимость」。` : '输入关键词：中文、法语、英语、俄语都可以。'}</li>`;
  }
  function openSearch() { if (!search) return; search.hidden = false; q.value = ''; act = 0; renderResults(); q.focus(); }
  function closeSearch() { if (!search || search.hidden) return; search.hidden = true; $('#search-btn')?.focus({ preventScroll: true }); }
  $('#search-btn')?.addEventListener('click', openSearch);
  $('#search-x')?.addEventListener('click', closeSearch);
  search?.addEventListener('click', (e) => { if (e.target === search) closeSearch(); else if (e.target.closest('a')) search.hidden = true; });
  q?.addEventListener('input', () => { act = 0; renderResults(); });
  q?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      act = (act + (e.key === 'ArrowDown' ? 1 : hits.length - 1)) % Math.max(1, hits.length);
      renderResults();
      results.querySelector('a.act')?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'Enter') { const a = results.querySelector('a.act'); if (a) { search.hidden = true; location.href = a.href; } }
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); setDrawer(false); }
    if (e.key === '/' && search?.hidden && !e.target.closest('input, textarea, select')) { e.preventDefault(); openSearch(); }
  });

  // ———— 中 / Fr：每个双语块可以单独切换；顶栏的总开关切换全部，并记住选择 ————
  const biBlocks = $$('.bi');
  const setLang = (block, lang) => {
    block.classList.toggle('show-fr', lang === 'fr');
    block.querySelectorAll(':scope > header .lang-sw button, :scope > summary .lang-sw button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === lang)));
  };
  const globalSw = $('#lang-global');
  const setGlobal = (lang) => {
    biBlocks.forEach((b) => setLang(b, lang));
    globalSw?.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === lang)));
    store.set('lang', lang);
  };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-sw button');
    if (!btn) return;
    e.preventDefault();          // 开关在 <summary> 里时，不要顺带折叠证明
    if (btn.closest('#lang-global')) { setGlobal(btn.dataset.l); return; }
    const block = btn.closest('.bi');
    setLang(block, btn.dataset.l);
    if (block.tagName === 'DETAILS') block.open = true;
  });
  if (!biBlocks.length && globalSw) globalSw.hidden = true;
  if (store.get('lang') === 'fr') setGlobal('fr');

  // ———— 展开 / 收起全部证明 ————
  const proofToggle = $('#proof-toggle');
  if (proofToggle) {
    const proofs = $$('details.proof');
    if (!proofs.length) proofToggle.hidden = true;
    const sync = raf(() => {
      const all = proofs.length > 0 && proofs.every((d) => d.open);
      const t = all ? '收起全部证明' : '展开全部证明';
      proofToggle.setAttribute('aria-pressed', String(all));
      proofToggle.setAttribute('aria-label', t);
      proofToggle.title = t;
    });
    proofToggle.addEventListener('click', () => {
      const open = !proofs.every((d) => d.open);
      proofs.forEach((d) => { d.open = open; });
      sync();
    });
    proofs.forEach((d) => d.addEventListener('toggle', sync));
    sync();
  }

  // ———— 术语表页：输入即筛选 ————
  const filter = $('#gl-filter');
  if (filter) {
    const groups = $$('.gl-chapter').map((s) => [s, $$('tbody tr', s)]);
    filter.addEventListener('input', () => {
      const t = filter.value.trim().toLowerCase();
      groups.forEach(([s, rows]) => {
        let any = false;
        rows.forEach((r) => { const hide = !!t && !r.textContent.toLowerCase().includes(t); r.hidden = hide; any ||= !hide; });
        s.hidden = !any;
      });
    });
  }

  // 打开指向证明内部或定理的锚点时，自动展开对应证明
  const revealHash = () => {
    if (!location.hash) return;
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    el?.closest('details')?.setAttribute('open', '');
  };
  addEventListener('hashchange', revealHash);
  revealHash();

  // ———— 翻书：翻到上一章 / 下一章之前，一张纸绕书脊翻过来 ————
  const turn = $('#turn');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-turn]');
    if (!a || !turn || reduce.matches || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    turn.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => turn.classList.add('go')));
    setTimeout(() => { location.href = a.href; }, 600);
  });
  addEventListener('pageshow', () => { if (turn) { turn.classList.remove('go'); turn.hidden = true; } });
})();
