// —— F 字体：西文字体分类 + 中文字体门类 ——
// 每个字体样品都有「大字 + 辨识特征标注」：标注线由 init 现场测量字形（Range + canvas measureText）后画出，
// 所以换字号、放大视图、字体晚到都能对准。

const FO = {
  latin: { text: 'Power series converge uniformly', size: 22, def: 'Power series converge uniformly' },
  cjk: { text: '一致收敛的函数项级数', size: 24, def: '一致收敛的函数项级数' }
};
const foCanvas = document.createElement('canvas').getContext('2d');
const foFont = (el) => { const s = getComputedStyle(el); return `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`; };

// 把示例文字与字号写进样品（网格与放大视图都会调用）
function foBind(stage, st) {
  const root = stage.firstElementChild;
  if (!root) return;
  root.style.setProperty('--fo-ss', st.size);
  stage.querySelectorAll('.fo-sample').forEach((s) => { s.textContent = st.text; });
}

// 标注引擎（坐标都相对于 .fo-hero；x、y 为百分比）
//   { g: 'x' | 'cap' | 'base' | 'asc', t }       参考线，右端标字
//   { ch, at: [fx, fy], t, y, x?, a }             指向第 ch 个字形墨迹框内 (fx, fy) 处；标签锚点 (x%, y%)，x 省略时与指向点同列
//                                                 a：u 标签在锚点上方居中、d 下方居中、r 在右、l 在左
//   { axis: ch, deg, t, y, x?, a }                穿过字形中心的轴线（deg：偏离竖直的角度，负值为上端左倾）
//   { circ: ch, t, y, x?, a }                     在字形上叠一个正圆（几何体）
//   { cells: true }                               每个字符的步进宽度画成格子（等宽体）
//   { grid: 8, rows, below }                      像素格（像素体）
//   { t, x, y, a }                                没有指向的文字标签
function foAnnotate(stage, ctx, ann, bl = 0.7, snap = 0) {
  const hero = stage.querySelector('.fo-hero');
  if (!hero) return;
  const word = hero.querySelector('.fo-word');
  const probe = word.querySelector('.fo-bl');
  const svg = hero.querySelector('.fo-svg');
  const labs = hero.querySelector('.fo-labs');
  const tn = word.firstChild;
  const rg = document.createRange();
  let dead = false;
  ctx.add(() => { dead = true; });
  const f1 = (v) => v.toFixed(1);
  function draw() {
    if (dead || !hero.isConnected) return;
    const W = hero.clientWidth, H = hero.clientHeight;
    if (!W || !H) return;
    word.style.transform = '';
    if (snap) { word.style.fontSize = ''; word.style.fontSize = `${Math.max(snap, Math.round(parseFloat(getComputedStyle(word).fontSize) / snap) * snap)}px`; }
    const hb = hero.getBoundingClientRect();
    const k = W / (hb.width || W);
    const base0 = (probe.getBoundingClientRect().bottom - hb.top) * k;
    const base = H * bl;
    word.style.transform = `translateY(${f1(base - base0)}px)`;
    const fpx = parseFloat(getComputedStyle(word).fontSize);
    foCanvas.font = foFont(word);
    const asc = (s) => foCanvas.measureText(s).actualBoundingBoxAscent;
    const u = stage.clientWidth / 100;
    const box = (i) => {
      rg.setStart(tn, i); rg.setEnd(tn, i + 1);
      const b = rg.getBoundingClientRect();
      const m = foCanvas.measureText(tn.data[i]);
      const x = (b.left - hb.left) * k;
      return { x, w: b.width * k, l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: base - m.actualBoundingBoxAscent, b: base + m.actualBoundingBoxDescent };
    };
    const n = tn.data.length;
    const first = box(0), last = box(n - 1);
    const lines = [], labels = [];
    const lab = (t, x, y, a, cls = '') => labels.push(`<span class="fo-lab ${a}${cls}" style="left:${f1(x)}px;top:${f1(y)}px">${t}</span>`);
    const lead = (px, py, ax, ay, r) => {
      const dx = ax - px, dy = ay - py, d = Math.hypot(dx, dy) || 1;
      if (r) lines.push(`<circle class="fo-ring" cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}"/>`);
      if (d > (r || 0) + u) lines.push(`<line class="fo-lead" x1="${f1(px + dx / d * (r || 0))}" y1="${f1(py + dy / d * (r || 0))}" x2="${f1(ax)}" y2="${f1(ay)}"/>`);
    };
    const anchor = (a, px) => [a.x !== undefined ? a.x / 100 * W : px, a.y / 100 * H];
    for (const a of ann) {
      if (a.g) {
        const y = a.g === 'base' ? base : base - asc({ x: 'x', cap: 'H', asc: 'd' }[a.g]);
        lines.push(`<line class="fo-guide${a.g === 'base' ? ' b' : ''}" x1="0" x2="${W}" y1="${f1(y)}" y2="${f1(y)}"/>`);
        labels.push(`<span class="fo-gl" style="top:${f1(y)}px">${a.t}</span>`);
      } else if (a.axis !== undefined) {
        const b = box(a.axis);
        const cx = (b.l + b.r) / 2, cy = (b.t + b.b) / 2, h = (b.b - b.t) * 0.7, th = a.deg * Math.PI / 180;
        const tx = cx + Math.sin(th) * h, ty = cy - Math.cos(th) * h;
        lines.push(`<line class="fo-axis" x1="${f1(tx)}" y1="${f1(ty)}" x2="${f1(cx - Math.sin(th) * h)}" y2="${f1(cy + Math.cos(th) * h)}"/>`);
        const [ax, ay] = anchor(a, tx);
        lead(tx, ty, ax, ay, 0);
        lab(a.t, ax, ay, a.a || 'u');
      } else if (a.circ !== undefined) {
        const b = box(a.circ);
        const cx = (b.l + b.r) / 2, cy = (b.t + b.b) / 2, r = Math.max(b.r - b.l, b.b - b.t) / 2;
        lines.push(`<circle class="fo-circ" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}"/>`);
        const [ax, ay] = anchor(a, cx);
        const sy = ay > cy ? 1 : -1;
        lead(cx, cy + sy * r, ax, ay, 0);
        lab(a.t, ax, ay, a.a || 'd');
      } else if (a.cells) {
        const top = base - asc('H') - fpx * 0.14, bot = base + fpx * 0.24;
        for (let i = 0; i < n; i++) {
          const b = box(i);
          lines.push(`<rect class="fo-cell" x="${f1(b.x)}" y="${f1(top)}" width="${f1(b.w)}" height="${f1(bot - top)}"/>`);
        }
      } else if (a.grid) {
        const c = fpx / a.grid, top = base - c * (a.rows || 7), bot = base + c * (a.below || 0);
        let p = '';
        for (let y = top; y <= bot + 0.5; y += c) p += `M${f1(first.x)} ${f1(y)}H${f1(last.x + last.w)}`;
        for (let x = first.x; x <= last.x + last.w + 0.5; x += c) p += `M${f1(x)} ${f1(top)}V${f1(bot)}`;
        lines.push(`<path class="fo-grid" d="${p}"/>`);
      } else if (a.num) {
        const b = box(a.ch);
        const px = b.l + a.at[0] * (b.r - b.l), py = b.t + a.at[1] * (b.b - b.t);
        lines.push(`<g class="fo-num"><circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1.9 * u)}"/><text x="${f1(px)}" y="${f1(py + 0.05 * u)}" font-size="${f1(2.3 * u)}">${a.num}</text></g>`);
      } else if (a.ch !== undefined) {
        const b = box(a.ch);
        const px = b.l + a.at[0] * (b.r - b.l), py = b.t + a.at[1] * (b.b - b.t);
        const [ax, ay] = anchor(a, px);
        lead(px, py, ax, ay, (a.r || 2) * u);
        lab(a.t, ax, ay, a.a || 'u');
      } else {
        lab(a.t, a.x / 100 * W, a.y / 100 * H, a.a || 'r', ' n');
      }
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = lines.join('');
    labs.innerHTML = labels.join('');
    // 标签不要伸出舞台：超出左右边距时整体挪回来（引线仍指向原锚点）
    const lim = 5 * u;
    labs.querySelectorAll('.fo-lab').forEach((el) => {
      const r = el.getBoundingClientRect();
      const l = (r.left - hb.left) * k, rr = (r.right - hb.left) * k;
      if (l < -lim) el.style.marginLeft = `${f1(-lim - l)}px`;
      else if (rr > W + lim) el.style.marginLeft = `${f1(W + lim - rr)}px`;
    });
  }
  draw();
  if (document.fonts) document.fonts.load(foFont(word), tn.data).then(() => { draw(); ctx.later(60, draw); }, () => {});
  ctx.later(650, draw);
  const ro = new ResizeObserver(() => draw());
  ro.observe(hero);
  ctx.add(() => ro.disconnect());
}

const foHero = (word) => `<div class="fo-hero"><span class="fo-word">${word}<b class="fo-bl"></b></span><svg class="fo-svg" aria-hidden="true"></svg><div class="fo-labs" aria-hidden="true"></div></div>`;
const FO_ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 &amp;?!';
const foGF = (name) => ['Google Fonts · ' + name, 'https://fonts.google.com/specimen/' + name.replace(/ /g, '+')];

function foLatin(o) {
  return {
    code: o.code, name: o.name, en: o.en, meta: `原型 ${o.proto} · 近似替代 ${o.sub}`,
    desc: o.desc, more: o.more, kw: o.kw, bg: '#f6f4ef', ratio: '1 / 1',
    css: `/* 在 <head> 引入 Google Fonts，或 @import */\n@import url("https://fonts.googleapis.com/css2?family=${o.gf}&display=swap");\n\n${o.use || '.title'} {\n  font-family: ${o.stack};${o.wt ? `\n  font-weight: ${o.wt};` : ''}\n}`,
    links: [foGF(o.sub), ...(o.links || [])],
    html: `<div class="fo-l ${o.cls || ''}" style="--fo-f:${o.fam};--fo-fs:${o.fs || 21};--fo-wt:${o.wt || 400}">
      <div class="fo-head"><b>${o.sub}</b><span>近似替代 ${o.proto}</span></div>
      ${foHero(o.word)}
      <p class="fo-sample">${esc(FO.latin.def)}</p>
      <p class="fo-abc">${o.abc || FO_ABC}</p>
    </div>`,
    init(stage, ctx) { foBind(stage, FO.latin); foAnnotate(stage, ctx, o.ann, o.bl, o.snap); }
  };
}

const FO_PARA = '若对任意 ε > 0，都存在只与 ε 有关的 N，使得 n > N 时对一切 x ∈ I 都有 |Sₙ(x) − S(x)| < ε，就称该级数在 I 上一致收敛。';
function foCJK(o) {
  let k = 0;
  const feats = o.ann.map((a) => ({ ...a, num: a.ch !== undefined ? String(++k) : null }));
  return {
    code: o.code, name: o.name, en: o.en, meta: o.meta,
    desc: o.desc, more: o.more, kw: o.kw, bg: '#f6f4ef', ratio: '1 / 1',
    css: `@import url("https://fonts.googleapis.com/css2?family=${o.gf}&display=swap");\n\n${o.use || '.title'} {\n  font-family: ${o.stack};\n}`,
    links: [foGF(o.gname), ...(o.links || [])],
    html: `<div class="fo-c ${o.cls || ''}" style="--fo-f:${o.fam};--fo-fs:${o.fs || 26}">
      <div class="fo-head"><b>${o.font}</b><span>${o.tag}</span></div>
      ${foHero(o.word || '正弦')}
      <ol class="fo-feat">${feats.map((f) => `<li>${f.num ? `<i>${f.num}</i>` : '<i class="dot"></i>'}<span>${f.t}</span></li>`).join('')}</ol>
      <div class="fo-cbot">
        <p class="fo-sample">${esc(FO.cjk.def)}</p>
        <p class="fo-para">${FO_PARA}</p>
        <p class="fo-use"><b>适合</b>${o.fit}</p>
      </div>
    </div>`,
    init(stage, ctx) { foBind(stage, FO.cjk); foAnnotate(stage, ctx, feats.filter((f) => f.num), o.bl || 0.78); }
  };
}

// 页面顶部：输入示例文字 + 字号
function foTop(st, chips, min, max, ph) {
  return `<div class="fo-top">
    <label class="fo-tin"><span>输入你自己的示例文字</span><input type="text" maxlength="120" spellcheck="false" autocomplete="off" placeholder="${esc(ph)}"></label>
    <label class="fo-tsz"><span>示例字号 <output>${st.size}px</output></span><input type="range" min="${min}" max="${max}" step="1" value="${st.size}"></label>
    <div class="fo-chips"><span>试试：</span>${chips.map((c) => `<button type="button" class="fo-chip">${esc(c)}</button>`).join('')}</div>
  </div>`;
}
function foTopInit(st) {
  return (pageEl, ctx) => {
    const inp = pageEl.querySelector('.fo-tin input');
    const rg = pageEl.querySelector('.fo-tsz input');
    const out = pageEl.querySelector('.fo-tsz output');
    inp.value = st.text === st.def ? '' : st.text;
    rg.value = st.size;
    const apply = () => {
      out.textContent = `${st.size}px`;
      pageEl.querySelectorAll('.t-stage').forEach((s) => foBind(s, st));
    };
    ctx.on(inp, 'input', () => { st.text = inp.value.trim() ? inp.value : st.def; apply(); });
    ctx.on(rg, 'input', () => { st.size = +rg.value; apply(); });
    pageEl.querySelectorAll('.fo-chip').forEach((b) => ctx.on(b, 'click', () => { inp.value = b.textContent; st.text = b.textContent; apply(); }));
  };
}

// ———————————————————— 西文字体分类 ————————————————————
const foLatinTiles = [
  foLatin({
    code: 'F01', name: '旧式衬线', en: 'Old-style serif', proto: 'Garamond', sub: 'EB Garamond', gf: 'EB+Garamond',
    fam: "'EB Garamond', serif", stack: '"EB Garamond", Garamond, "Noto Serif SC", serif', use: '.prose',
    word: 'Rho', fs: 26,
    desc: '文艺复兴时期从手写演变来的衬线体。o 的最细处连成一条向左倾的斜线（像扁头笔写的），衬线和竖笔之间有弧形过渡，粗细对比温和，x 字高偏小。温润、书卷气，适合长篇正文。',
    more: '代表：Garamond、Bembo、Sabon。大量数学和人文书籍用它排正文。网页上字号要比无衬线体大一号（18–20px）才舒服；想要冷静、科技感的界面时不合适。',
    kw: ['书卷气', '斜向轴线', '弧形过渡衬线', '低对比'],
    links: [['Wikipedia · Garamond', 'https://en.wikipedia.org/wiki/Garamond']],
    ann: [
      { g: 'x', t: 'x 字高偏小' }, { g: 'base', t: '基线' },
      { axis: 2, deg: -24, t: '轴线向左倾', y: 18 },
      { ch: 1, at: [0.04, 0.985], t: '衬线与竖笔弧形过渡', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F02', name: '过渡衬线', en: 'Transitional serif', proto: 'Baskerville', sub: 'Libre Baskerville', gf: 'Libre+Baskerville:wght@400;700',
    fam: "'Libre Baskerville', serif", stack: '"Libre Baskerville", Baskerville, Georgia, "Noto Serif SC", serif', use: '.prose',
    word: 'Rho', fs: 23,
    desc: '18 世纪印刷技术进步后的衬线体，介于旧式与现代之间：轴线接近竖直，粗细对比更明显，衬线更平、更锐利，字形更规整。Times New Roman、Georgia 都属于这一类。',
    more: '原型 Baskerville 由英国印刷商 John Baskerville 在 1750 年代设计。Libre Baskerville 为屏幕加大了 x 字高，比纸本更「大」。适合正式文章、学术网站的标题与正文。',
    kw: ['规整', '近竖直轴线', '对比增强', 'Times / Georgia'],
    links: [['Wikipedia · Baskerville', 'https://en.wikipedia.org/wiki/Baskerville']],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { axis: 2, deg: -8, t: '轴线接近竖直', y: 18 },
      { ch: 1, at: [0.04, 0.985], t: '衬线更平、更锐', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F03', name: '现代衬线 · 迪多尼', en: 'Didone / Modern serif', proto: 'Bodoni、Didot', sub: 'Playfair Display', gf: 'Playfair+Display:wght@400;700',
    fam: "'Playfair Display', serif", stack: '"Playfair Display", Didot, "Noto Serif SC", serif', use: 'h1, .display',
    word: 'Rho', fs: 26,
    desc: '把粗细对比推到极致：竖笔很粗，横笔和衬线细如发丝，衬线与笔画直角相接、没有过渡，轴线完全竖直。大字号华丽醒目，是 Vogue 这类时尚杂志刊头的标志。',
    more: '约 1800 年由意大利的 Bodoni 和法国的 Didot 家族定型。小字号时发丝线太细、会闪烁，只适合标题或 28px 以上；正文请选旧式或过渡体。Playfair Display 是为大字号标题设计的迪多尼风格字体，带圆球形笔端；更正宗的复刻可以看 Bodoni Moda。',
    kw: ['极端对比', '发丝衬线', '竖直轴线', '时尚杂志'],
    links: [['Wikipedia · Bodoni', 'https://en.wikipedia.org/wiki/Bodoni']],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { ch: 0, at: [0.22, 0.45], t: '粗竖笔', y: 18 },
      { axis: 2, deg: 0, t: '轴线完全竖直', y: 18 },
      { ch: 1, at: [0.04, 0.99], t: '发丝衬线，直角相接', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F04', name: '粗衬线', en: 'Slab serif', proto: 'Rockwell、Clarendon', sub: 'Roboto Slab', gf: 'Roboto+Slab:wght@400;700',
    fam: "'Roboto Slab', serif", stack: '"Roboto Slab", Rockwell, "Noto Serif SC", serif', use: 'h1, h2',
    word: 'Rho', fs: 24,
    desc: '衬线是又厚又方的「板块」，和笔画差不多粗，整体几乎没有粗细对比。19 世纪用于海报和广告，今天常见于科技品牌、技术文档的标题，显得结实、可靠、略带打字机的机械感。',
    more: '也叫埃及体（Egyptian）。粗衬线在低分辨率屏幕和粗糙纸张上都很稳。做正文时选笔画较细的款式（如 Roboto Slab 300–400），标题用 600–700。',
    kw: ['方块衬线', '低对比', '结实', '打字机感'],
    links: [['Wikipedia · Slab serif', 'https://en.wikipedia.org/wiki/Slab_serif']],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { ch: 2, at: [0.5, 0.04], t: '笔画几乎等粗', y: 18 },
      { ch: 1, at: [0.04, 0.975], t: '厚重的方块衬线', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F05', name: '怪诞体', en: 'Grotesque sans', proto: 'Franklin Gothic、Akzidenz-Grotesk', sub: 'Libre Franklin', gf: 'Libre+Franklin:wght@400;700',
    fam: "'Libre Franklin', sans-serif", stack: '"Libre Franklin", "Franklin Gothic", "Noto Sans SC", sans-serif', use: 'h1, .headline',
    word: 'Gag', fs: 26,
    desc: '19 世纪末到 20 世纪初最早的一批无衬线体（当时人们觉得没衬线很「怪」，故名 grotesque）。笔画在连接处略收细，有轻微粗细变化；G 带一根下刺，g 常是上下两层。比新怪诞体多一点人味和不规则。',
    more: '美国的 Franklin Gothic、News Gothic 与德国的 Akzidenz-Grotesk 都是这一类。报纸标题、海报、复古工业风品牌常用。',
    kw: ['早期无衬线', '双层 g', 'G 带下刺', '略有粗细'],
    links: [['Wikipedia · Franklin Gothic', 'https://en.wikipedia.org/wiki/Franklin_Gothic']],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { ch: 2, at: [0.93, 0.03], t: 'g 右上有小「耳朵」', y: 18 },
      { ch: 0, at: [0.93, 0.95], t: 'G 带一根下刺', y: 86, a: 'd' },
      { ch: 2, at: [0.5, 0.9], t: '双层 g', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F06', name: '新怪诞体', en: 'Neo-grotesque sans', proto: 'Helvetica', sub: 'Archivo', gf: 'Archivo:wght@400;700',
    fam: "'Archivo', sans-serif", stack: 'Archivo, "Helvetica Neue", Helvetica, Arial, "Noto Sans SC", sans-serif', use: 'body',
    word: 'Gag', fs: 26,
    desc: '20 世纪中叶瑞士风格的代表：把怪诞体修整得统一、中性。笔画几乎等粗，a、c、e、s、G 的收笔都是水平切，x 字高大，g 变成单层。Helvetica、Arial 属于这一路，是「国际主义」海报和企业标志最常见的字。',
    more: '原型 Helvetica 1957 年诞生于瑞士。Archivo 的水平收笔、带尾巴的 a、带刺的 G 都很像它。界面里常用的 Inter、苹果的 San Francisco 是它的「屏幕化」后代：把收笔改成斜切、开口加大，向人文体靠拢，小字更清楚。缺点是「太中性」，个性要靠颜色和版式来补。',
    kw: ['中性', '水平收笔', 'x 字高大', '单层 g', '瑞士风'],
    links: [['Wikipedia · Helvetica', 'https://en.wikipedia.org/wiki/Helvetica'], foGF('Inter')],
    ann: [
      { g: 'x', t: 'x 字高大' }, { g: 'base', t: '基线' },
      { ch: 1, at: [0.08, 0.1], t: '收笔是水平切的', y: 18 },
      { ch: 0, at: [0.93, 0.94], t: 'G 也带刺', y: 86, a: 'd' },
      { ch: 2, at: [0.5, 0.9], t: '单层 g', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F07', name: '几何无衬线', en: 'Geometric sans', proto: 'Futura', sub: 'Jost', gf: 'Jost:wght@500;700',
    fam: "'Jost', sans-serif", stack: 'Jost, Futura, "Noto Sans SC", sans-serif', use: 'h1, .brand', wt: 500,
    word: 'Atom', fs: 24,
    desc: '用圆、三角和直线构造字母：o 几乎是正圆，A、M 是尖顶，笔画等粗；x 字高小，升部长。1920 年代包豪斯时期的产物，显得理性、现代、有设计感，常用于品牌和标题。',
    more: '原型 Futura 的小写 a 是单层的，Jost 默认是双层。几何体在小字号下可读性略差（圆形字母容易混淆），更适合标题、导航、海报。同类：Avenir、Century Gothic、Poppins。',
    kw: ['正圆', '尖顶', '包豪斯', '理性'],
    links: [['Wikipedia · Futura', 'https://en.wikipedia.org/wiki/Futura_(typeface)']],
    ann: [
      { g: 'x', t: 'x 字高小' }, { g: 'base', t: '基线' },
      { ch: 0, at: [0.5, 0.0], t: '尖顶 A', y: 18 },
      { circ: 2, t: 'o 几乎是正圆', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F08', name: '人文无衬线', en: 'Humanist sans', proto: 'Frutiger、Gill Sans', sub: 'Source Sans 3', gf: 'Source+Sans+3:wght@400;600',
    fam: "'Source Sans 3', sans-serif", stack: '"Source Sans 3", Frutiger, "Segoe UI", "Noto Sans SC", sans-serif', use: 'body',
    word: 'Gag', fs: 28,
    desc: '保留手写笔意的无衬线体：笔画有细微的粗细变化，c、e、a 的开口张得很大，收笔斜切。小字号、低分辨率下也容易辨认，常用于机场导视、操作系统界面和长篇正文。',
    more: '代表：Frutiger、Gill Sans、Myriad、Segoe UI、Fira Sans。比新怪诞体温和、亲切，比几何体好读，是「无衬线正文」最稳妥的选择。',
    kw: ['开口大', '斜切收笔', '易读', '亲切'],
    links: [['Wikipedia · Frutiger', 'https://en.wikipedia.org/wiki/Frutiger_(typeface)']],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { ch: 1, at: [0.14, 0.15], t: '收笔斜切、开口大', y: 18 },
      { ch: 0, at: [0.93, 0.25], t: 'G 的口也张得很开', y: 86, a: 'd' },
      { ch: 2, at: [0.5, 0.9], t: '单层 g', y: 86, a: 'd' }
    ]
  }),
  foLatin({
    code: 'F09', name: '等宽体', en: 'Monospace', proto: 'Courier、Menlo', sub: 'JetBrains Mono', gf: 'JetBrains+Mono:wght@400;500',
    fam: "'JetBrains Mono', monospace", stack: '"JetBrains Mono", Menlo, Consolas, monospace', use: 'code, pre',
    word: 'iW0O', fs: 20,
    desc: '每个字符占同样的宽度，i 和 W 一样宽，所以代码能上下对齐。为编程设计的等宽体还会把 0 和 O、1 和 l 设计得截然不同。用于代码、终端、数据表格和带「技术感」的小标签。',
    more: '原型是打字机字体 Courier；今天的编程字体如 JetBrains Mono、Menlo、Consolas、SF Mono 都更清晰。正文用等宽体会很累，只在需要对齐或强调「这是代码」时使用。',
    kw: ['同宽', '代码', '对齐', '0 带点'],
    links: [['Wikipedia · Monospaced font', 'https://en.wikipedia.org/wiki/Monospaced_font']],
    ann: [
      { cells: true },
      { t: '每个字符占同样宽的格子', x: 0, y: 12 },
      { ch: 2, at: [0.5, 0.5], t: '0 中间带点，区别于 O', y: 88, a: 'd', r: 1.8 }
    ]
  }),
  foLatin({
    code: 'F10', name: '展示体', en: 'Display', proto: '20 世纪海报窄体', sub: 'Bebas Neue', gf: 'Bebas+Neue',
    fam: "'Bebas Neue', sans-serif", stack: '"Bebas Neue", "Noto Sans SC", sans-serif', use: '.hero-title',
    word: 'LIMIT', fs: 30,
    desc: '只为大字号设计的字体统称。Bebas Neue 是典型：只有大写，字形窄而高，笔画粗，几个字母就能撑满一张海报。用于封面标题、大数字、横幅，不要用于正文。',
    more: '「展示体」不是一种造型而是一种用途：Abril Fatface（胖迪多尼）、Lobster（复古花体）等也都算。共同点是小字号时难读、个性很强。一个页面最多用一种。',
    kw: ['只用大字', '全大写', '窄长', '海报感'],
    links: [['Wikipedia · Display typeface', 'https://en.wikipedia.org/wiki/Display_typeface']],
    ann: [
      { g: 'cap', t: '大写高' }, { g: 'base', t: '基线' },
      { t: '只有大写字母', x: 0, y: 14 },
      { ch: 1, at: [0.5, 0.75], t: '字形窄而高', y: 88, a: 'd', r: 1.8 }
    ]
  }),
  foLatin({
    code: 'F11', name: '手写体', en: 'Handwriting', proto: '马克笔随手写', sub: 'Caveat', gf: 'Caveat:wght@600;700',
    fam: "'Caveat', cursive", stack: 'Caveat, "Long Cang", cursive', use: '.note', wt: 600,
    word: 'Aha!', fs: 30, cls: 'fo-hand',
    desc: '模仿用笔随手写的字：字母大多不相连，大小和基线略有起伏，笔画像马克笔。显得亲切、随意，适合批注、便签、「老师手写」的提示，不适合大段正文。',
    more: '和花体的区别：手写体像日常书写，不追求华丽；花体模仿书法笔，字母一笔连写、带装饰。手写体通常要比正文大 20–30% 才好读。',
    kw: ['随手写', '亲切', '批注', '马克笔'],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { ch: 1, at: [0.3, 0.05], t: '笔画像马克笔', y: 16 },
      { ch: 2, at: [0.04, 0.72], t: '字母各自独立、不连笔', y: 88, a: 'd', r: 1.8 }
    ]
  }),
  foLatin({
    code: 'F12', name: '花体', en: 'Script', proto: '铜版手写体 Copperplate', sub: 'Great Vibes', gf: 'Great+Vibes',
    fam: "'Great Vibes', cursive", stack: '"Great Vibes", cursive', use: '.signature',
    word: 'Lemma', fs: 27,
    desc: '模仿尖头笔书写：字母一笔连写，强烈右倾，粗细对比强，大写字母带华丽的花饰（swash）。用于请柬、证书、婚礼；屏幕上只适合一两个词的装饰标题或签名。',
    more: '原型是 18 世纪英国的铜版手写体（English Roundhand / Copperplate）。全大写或长句使用会几乎无法阅读。',
    kw: ['连笔', '花饰', '强烈倾斜', '请柬'],
    links: [['Wikipedia · Script typeface', 'https://en.wikipedia.org/wiki/Script_typeface']],
    ann: [
      { g: 'base', t: '基线' },
      { ch: 0, at: [0.3, 0.1], t: '大写带花饰', y: 14, r: 2.4 },
      { ch: 3, at: [0.02, 0.7], t: '字母一笔连写', y: 88, a: 'd', r: 1.8 }
    ]
  }),
  foLatin({
    code: 'F13', name: '哥特体 · 黑字体', en: 'Blackletter', proto: 'Fraktur、Textura', sub: 'UnifrakturMaguntia', gf: 'UnifrakturMaguntia',
    fam: "'UnifrakturMaguntia', serif", stack: 'UnifrakturMaguntia, serif', use: '.masthead',
    word: 'Satz', fs: 28,
    desc: '中世纪欧洲手抄本和古腾堡印刷的字体。宽头笔写出的弧线被折成棱角，竖笔密排像栅栏，笔端呈菱形。今天带有古典、宗教、重金属或报纸刊头（如《纽约时报》）的意味，读起来很费力。',
    more: '示例词 Satz 是德语「定理」。德国直到 20 世纪上半叶仍用 Fraktur 排印日常读物。网页上只适合做一两个字的刊头或装饰。',
    kw: ['折角笔画', '菱形笔端', '中世纪', '刊头'],
    links: [['Wikipedia · Blackletter', 'https://en.wikipedia.org/wiki/Blackletter']],
    ann: [
      { g: 'x', t: 'x 字高' }, { g: 'base', t: '基线' },
      { ch: 1, at: [0.5, 0.03], t: '弧线折成棱角', y: 18 },
      { ch: 1, at: [0.9, 0.96], t: '尖角、菱形的笔端', y: 88, a: 'd', r: 1.8 }
    ]
  }),
  foLatin({
    code: 'F14', name: '像素体', en: 'Pixel / Bitmap', proto: '8 位游戏机字体', sub: 'Press Start 2P', gf: 'Press+Start+2P',
    fam: "'Press Start 2P', monospace", stack: '"Press Start 2P", monospace', use: '.score', cls: 'fo-pixel',
    word: 'Aa', fs: 24, snap: 8, abc: 'ABCDEFGHIJKLM abcdefghijklm 0123456789',
    desc: '每个字母都由方格像素拼成（这里是 8×8 格），模仿早期电脑和游戏机屏幕。复古、游戏感强。只有字号是 8px 的整数倍时边缘才清晰，适合分数、关卡、彩蛋式的小装饰。',
    more: 'Press Start 2P 模仿 1980 年代南梦宫街机的字体。另一款 VT323 模仿 DEC 终端。CSS 里加 -webkit-font-smoothing: none 或用整数倍字号，避免边缘发虚。',
    kw: ['8×8 像素', '复古游戏', '方格', '整数倍字号'],
    ann: [
      { grid: 8, rows: 8, below: 0 },
      { t: '8 × 8 像素格拼成', x: 0, y: 12 },
      { ch: 1, at: [0.9, 0.3], t: '边缘是台阶，不是曲线', y: 88, a: 'd', r: 2.2 }
    ]
  })
];

// ———————————————————— 中文字体 ————————————————————
const foCJKTiles = [
  foCJK({
    code: 'F15', name: '宋体 · 明体', en: 'Song / Ming', meta: '原型 明代刻本印刷体 · 近似替代 思源宋体 Noto Serif SC',
    font: '思源宋体', tag: '近似替代 宋体 / 明体', gname: 'Noto Serif SC', gf: 'Noto+Serif+SC:wght@400;700',
    fam: "'Noto Serif SC', serif", stack: '"Noto Serif SC", "Songti SC", SimSun, serif', use: '.prose',
    desc: '中文的「衬线体」。横画细、竖画粗，横画末端有三角形的「字脚」（喙），点、撇、捺带书法的起收。正式、书卷气，是书籍、教材、论文正文的标准字体。',
    more: '源于明代木刻印刷：刻工为了省力，把横画刻细、竖画刻粗，形成了今天的样子。日本、台湾称「明体」。同门类还有「仿宋」（笔画细、略右上斜，用于公文和引文）。屏幕正文建议 17–20px，太小时细横画会发虚。',
    kw: ['横细竖粗', '三角字脚', '书卷气', '正文'],
    fit: '教材正文 · 定理与证明 · 论文',
    links: [['Wikipedia · Ming (typefaces)', 'https://en.wikipedia.org/wiki/Ming_(typefaces)']],
    ann: [
      { ch: 0, at: [0.93, 0.07], t: '横画末端有三角形的「字脚」' },
      { ch: 0, at: [0.5, 0.45], t: '横画细、竖画粗' },
      { t: '点、撇、捺有书法的起收' }
    ]
  }),
  foCJK({
    code: 'F16', name: '黑体', en: 'Hei (Gothic)', meta: '原型 黑体 / ゴシック体 · 近似替代 思源黑体 Noto Sans SC',
    font: '思源黑体', tag: '近似替代 黑体', gname: 'Noto Sans SC', gf: 'Noto+Sans+SC:wght@400;700',
    fam: "'Noto Sans SC', sans-serif", stack: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif', use: 'body',
    desc: '中文的「无衬线体」。横竖笔画一样粗，起笔收笔方正、没有装饰，字面饱满。屏幕上清晰稳定，是网页界面、标题、按钮、导航的默认选择。',
    more: '苹方（PingFang）、微软雅黑、思源黑体都属于黑体。思源黑体有 7 个字重，从细到特粗都能用：正文 400、标题 600–700。',
    kw: ['横竖等粗', '方头', '清晰', '界面'],
    fit: '界面 · 标题 · 按钮 · 屏幕正文',
    ann: [
      { ch: 0, at: [0.95, 0.07], t: '收笔方头，没有字脚' },
      { ch: 0, at: [0.5, 0.45], t: '横竖一样粗' },
      { t: '字面饱满，内部空间大' }
    ]
  }),
  foCJK({
    code: 'F17', name: '楷体', en: 'Kai (Regular script)', meta: '原型 楷书 / 华文楷体 · 近似替代 霞鹜文楷 LXGW WenKai',
    font: '霞鹜文楷', tag: '近似替代 楷体', gname: 'LXGW WenKai TC', gf: 'LXGW+WenKai+TC',
    fam: "'LXGW WenKai TC', serif", stack: '"LXGW WenKai TC", "Kaiti SC", KaiTi, serif', use: 'blockquote, .note',
    desc: '规范的手写正楷：保留毛笔的起笔、顿笔与提按，笔画有自然的粗细和弧度，字形端正。比宋体亲切，常用于引文、批注、教材里的「提示 / 注」框，也有人用来排整篇文章。',
    more: '霞鹜文楷是开源楷体中最受欢迎的一款，源自日本「教科书体」，比传统楷体更清秀。Google Fonts 上只有繁体版（TC），但也包含简体字（已逐字确认能显示）。',
    kw: ['手写正楷', '提按', '亲切', '批注'],
    fit: '引文 · 批注 · 提示框 · 文艺长文',
    links: [['Wikipedia · Regular script', 'https://en.wikipedia.org/wiki/Regular_script']],
    ann: [
      { ch: 1, at: [0.16, 0.4], t: '笔画有提按，带弧度' },
      { t: '像用毛笔认真写的正楷' },
      { t: '字形端正、清秀' }
    ]
  }),
  foCJK({
    code: 'F18', name: '圆体', en: 'Yuan (Rounded)', meta: '原型 华康圆体、方正细圆 · 近似替代 jf 粉圆 Huninn',
    font: 'jf 粉圆', tag: '近似替代 圆体', gname: 'Huninn', gf: 'Huninn',
    fam: "'Huninn', sans-serif", stack: 'Huninn, "Yuanti SC", "Noto Sans SC", sans-serif', use: '.friendly',
    desc: '黑体的「软化版」：笔画粗细一致，但端点和转角都是圆的。显得友好、柔和、年轻，适合儿童教育、App 提示、可爱风品牌；严肃的长文里会显得不够庄重。',
    more: 'jf 粉圆（Huninn）由台湾 justfont 开源，Google Fonts 收录；字形以台湾标准为主，但常用简体字都能显示（已逐字确认）。macOS 自带的「圆体-简」是同类。',
    kw: ['圆头', '友好', '柔和', '年轻'],
    fit: '入门内容 · 友好的提示 · 圆润品牌',
    ann: [
      { ch: 0, at: [0.02, 0.07], t: '笔画端点是圆头' },
      { t: '横竖等粗，转角圆润' },
      { t: '比黑体更软、更年轻' }
    ]
  }),
  foCJK({
    code: 'F19', name: '毛笔楷书', en: 'Brush Kai', meta: '原型 毛笔楷书 · Google Fonts 字体 马善政楷书',
    font: '马善政楷书', tag: '书法字体', gname: 'Ma Shan Zheng', gf: 'Ma+Shan+Zheng',
    fam: "'Ma Shan Zheng', serif", stack: '"Ma Shan Zheng", "Kaiti SC", serif', use: '.chapter-title',
    desc: '真正用毛笔写出来的楷书：笔画粗重，起笔有明显的顿笔，撇捺舒展，边缘带一点墨迹的毛糙。比印刷楷体更有书法气，适合章节扉页、书法感海报，不适合正文。',
    more: '与 F17 的区别：楷体是为阅读整理过的「印刷楷」，这里是保留笔墨个性的「书法楷」。标题用 40px 以上效果最好。',
    kw: ['毛笔', '顿笔', '书法', '扉页'],
    fit: '章节扉页 · 书法感标题 · 海报',
    ann: [
      { ch: 0, at: [0.16, 0.14], t: '起笔有明显的顿笔' },
      { t: '笔画粗重，撇捺舒展' },
      { t: '仍是端正的楷书结构' }
    ]
  }),
  foCJK({
    code: 'F20', name: '行书', en: 'Xing (Running script)', meta: '原型 行书 · Google Fonts 字体 志莽行书',
    font: '志莽行书', tag: '书法字体', gname: 'Zhi Mang Xing', gf: 'Zhi+Mang+Xing',
    fam: "'Zhi Mang Xing', cursive", stack: '"Zhi Mang Xing", cursive', use: '.quote-title',
    desc: '介于楷书和草书之间：笔画连带，书写速度感强，字与字之间有呼应，但多数字还认得出。潇洒、有个性，适合短标题、引语、签名式的装饰。',
    more: '一句话里最多用几个字，或只用于一个大标题。小字号会糊成一片。',
    kw: ['连笔', '速度感', '潇洒', '短标题'],
    fit: '短标题 · 引语 · 签名',
    links: [['Wikipedia · Semi-cursive script', 'https://en.wikipedia.org/wiki/Semi-cursive_script']],
    ann: [
      { t: '笔画连带，一气呵成' },
      { t: '有速度感，略倾斜' },
      { t: '多数字仍认得出' }
    ]
  }),
  foCJK({
    code: 'F21', name: '草书', en: 'Cao (Cursive script)', meta: '原型 草书 · Google Fonts 字体 刘建毛草',
    font: '刘建毛草', tag: '书法字体', gname: 'Liu Jian Mao Cao', gf: 'Liu+Jian+Mao+Cao',
    fam: "'Liu Jian Mao Cao', cursive", stack: '"Liu Jian Mao Cao", cursive', use: '.ornament',
    desc: '最潦草的书法字体：笔画大量省略和连写，字形高度简化，需要专门学习才能认读。只能当作图形装饰（例如一两个字的意境标题），不能用来传递信息。',
    more: '如果一定要用，旁边要配一行正常字体的「释文」。',
    kw: ['省略', '连绵', '难认', '纯装饰'],
    fit: '装饰性大字 · 书法意境',
    links: [['Wikipedia · Cursive script', 'https://en.wikipedia.org/wiki/Cursive_script_(East_Asia)']],
    ann: [
      { t: '笔画大量省略' },
      { t: '字与字连绵不断' },
      { t: '外行几乎认不出' }
    ]
  }),
  foCJK({
    code: 'F22', name: '手写体', en: 'Handwriting', meta: '原型 日常硬笔字 · Google Fonts 字体 龙藏体',
    font: '龙藏体', tag: '手写字体', gname: 'Long Cang', gf: 'Long+Cang',
    fam: "'Long Cang', cursive", stack: '"Long Cang", cursive', use: '.margin-note',
    desc: '模仿日常手写：字形不太规整，略向右上倾斜，笔画细而连贯，像随手记的笔记或老师的批语。适合手账风、便签、页边旁注；整段使用会显得凌乱。',
    more: '与 F11 西文手写体 Caveat 气质接近，可以搭配使用。字号要比正文大一些（约 1.2 倍）。',
    kw: ['随手记', '旁注', '手账风', '亲切'],
    fit: '旁注 · 便签 · 手账风页面',
    ann: [
      { t: '像钢笔随手写的' },
      { t: '字形不太规整' },
      { t: '向右上微微倾斜' }
    ]
  }),
  foCJK({
    code: 'F23', name: '快乐体', en: 'Cartoon', meta: '站酷快乐体 · Google Fonts 原生字体',
    font: '站酷快乐体', tag: '卡通字体', gname: 'ZCOOL KuaiLe', gf: 'ZCOOL+KuaiLe',
    fam: "'ZCOOL KuaiLe', sans-serif", stack: '"ZCOOL KuaiLe", sans-serif', use: '.fun-title',
    desc: '圆润、粗壮、略带歪斜的卡通字体，笔画像软糖，结构故意不那么规整。活泼、热闹、带点稚气，适合游戏、儿童内容、活动标语；严肃的场合慎用。',
    more: '站酷（ZCOOL）是国内设计师社区，推出过一系列免费商用字体，Google Fonts 收录了其中几款。',
    kw: ['卡通', '软糖', '活泼', '稚气'],
    fit: '游戏 · 活动标语 · 儿童内容',
    ann: [
      { t: '笔画圆胖，像软糖' },
      { t: '故意歪斜、不规整' },
      { t: '一看就是「好玩」' }
    ]
  }),
  foCJK({
    code: 'F24', name: '黄油体', en: 'Bold condensed display', meta: '站酷庆科黄油体 · Google Fonts 原生字体',
    font: '站酷庆科黄油体', tag: '展示字体', gname: 'ZCOOL QingKe HuangYou', gf: 'ZCOOL+QingKe+HuangYou',
    fam: "'ZCOOL QingKe HuangYou', sans-serif", stack: '"ZCOOL QingKe HuangYou", sans-serif', use: '.banner',
    desc: '方正、粗重、竖长的展示字：笔画几乎填满字框，转角方硬，字距紧凑，带一点复古海报和综艺字幕的味道。只用于大标题、封面和横幅。',
    more: '相当于中文里的 Bebas Neue（F10）。两者可以搭配：中文用黄油体，数字和英文用 Bebas。',
    kw: ['方硬', '竖长', '粗重', '海报'],
    fit: '封面大字 · 横幅 · 综艺感标题',
    ann: [
      { t: '笔画几乎撑满字框' },
      { t: '字形竖长，转角方硬' },
      { t: '只在大字号好看' }
    ]
  }),
  foCJK({
    code: 'F25', name: '小薇体', en: 'Slender Song display', meta: '站酷小薇 LOGO 体 · Google Fonts 原生字体',
    font: '站酷小薇体', tag: '展示字体', gname: 'ZCOOL XiaoWei', gf: 'ZCOOL+XiaoWei',
    fam: "'ZCOOL XiaoWei', serif", stack: '"ZCOOL XiaoWei", "Noto Serif SC", serif', use: '.magazine-title',
    desc: '纤细、舒展的宋体变体：保留横细竖粗和字脚，但笔画更瘦，字与字之间更疏朗，带一点文艺和时尚感。适合杂志标题、文艺类品牌、引言。',
    more: '可以理解为中文里的「迪多尼」(F03)：对比强、气质优雅，适合大字，不适合小字正文。',
    kw: ['纤细', '疏朗', '文艺', '杂志感'],
    fit: '文艺标题 · 品牌字标 · 引言',
    ann: [
      { ch: 0, at: [0.93, 0.07], t: '保留宋体的字脚' },
      { t: '笔画纤细，对比强' },
      { t: '字距疏朗，时髦' }
    ]
  })
];

// 字重
const foWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const foWeightTile = {
  code: 'F26', name: '字重', en: 'Weight', meta: '思源黑体 100–900 · 思源宋体 200–900（可变字体）',
  desc: '同一款字体的粗细。100 极细、300 细、400 常规（正文）、500 中等、700 粗体（强调）、900 特粗（海报）。一个页面通常只用两三个字重：正文 400、小标题 500–600、大标题 700。拖动滑块试试。',
  more: '思源黑体和思源宋体都是「可变字体」，字重可以连续变化（如 450）。粗细差至少两级（400 对 600 或 700）层级才明显；相邻两级（400 对 500）放在一起看不出区别。',
  kw: ['常规 400', '粗体 700', '可变字体', '层级'],
  bg: '#f6f4ef', ratio: '1 / 1',
  css: '/* 正文、小标题、标题三个字重 */\nbody { font-family: "Noto Sans SC", sans-serif; font-weight: 400; }\nh3 { font-weight: 600; }\nh1, h2 { font-weight: 700; }\nstrong { font-weight: 700; }',
  links: [foGF('Noto Sans SC'), foGF('Noto Serif SC')],
  html: `<div class="fo-w" style="--fo-ss:24">
    <div class="fo-head"><b>思源黑体 / 思源宋体</b><span>可变字重</span></div>
    <div class="fo-wgrid">
      <span class="fo-wl">黑体</span>${foWeights.map((w) => `<span class="fo-wc sans" style="font-weight:${w}">数</span>`).join('')}
      <span class="fo-wl">宋体</span>${foWeights.map((w) => (w < 200 ? '<span class="fo-wc none">—</span>' : `<span class="fo-wc serif" style="font-weight:${w}">数</span>`)).join('')}
      <span></span>${foWeights.map((w) => `<span class="fo-wn${w === 400 || w === 700 ? ' key' : ''}">${w}${w === 400 ? '<i>常规</i>' : w === 700 ? '<i>粗体</i>' : ''}</span>`).join('')}
    </div>
    <label class="fo-wlive"><span>拖动改字重</span><input type="range" min="100" max="900" step="10" value="400"><output>400</output></label>
    <p class="fo-sample fo-wsent">一致收敛的函数项级数</p>
    <p class="fo-wsent serif">一致收敛的函数项级数</p>
  </div>`,
  init(stage, ctx) {
    foBind(stage, FO.cjk);
    const rg = stage.querySelector('.fo-wlive input');
    const out = stage.querySelector('.fo-wlive output');
    const sents = stage.querySelectorAll('.fo-wsent');
    const cols = stage.querySelectorAll('.fo-wn');
    const set = () => {
      const w = +rg.value;
      out.textContent = w;
      sents.forEach((s) => { s.style.fontWeight = Math.max(s.classList.contains('serif') ? 200 : 100, w); });
      cols.forEach((c, i) => c.classList.toggle('on', Math.abs(foWeights[i] - w) < 50));
    };
    ctx.on(rg, 'input', set);
    set();
  }
};

// 中西混排
const foMixSent = (lat, num) => `用 ${lat('Python')} 画出 ${lat('Fourier')} 级数的前 ${num('10')} 项`;
const foMixTile = {
  code: 'F27', name: '中西混排', en: 'Mixed CJK–Latin', meta: '字体搭配 · 中西间距',
  desc: '中文里夹英文和数字时，西文字体要「同气质」：宋体配 Garamond 这类衬线体，黑体配 Inter 这类无衬线体；中文与西文、数字之间留一个空格。搭反了，西文会显得又细又飘或粗硬突兀。',
  more: 'CSS 写法是把西文字体放在前面、中文字体放在后面：font-family: "EB Garamond", "Noto Serif SC", serif; 浏览器会让英文用 Garamond、汉字用思源宋体。Garamond 这类 x 字高小的字体和汉字放在一起会显小，可以单独把西文放大 5–10%。',
  kw: ['宋配衬线', '黑配无衬线', '盘古之白', '字体栈'],
  bg: '#f6f4ef', ratio: '1 / 1',
  css: '/* 西文在前，中文在后 */\n.prose-serif {\n  font-family: "EB Garamond", "Noto Serif SC", serif;\n}\n.prose-sans {\n  font-family: Inter, "Noto Sans SC", sans-serif;\n}\n/* 较新的浏览器可自动在中西文之间加间距 */\n.prose { text-autospace: normal; }',
  html: (() => {
    const L = (s) => `<span class="fo-lat">${s}</span>`;
    const plain = (s) => s;
    const cell = (ok, label, why, cls, txt) => `<div class="fo-mx ${ok ? 'ok' : 'no'}"><p class="fo-mxh"><b>${ok ? '✓' : '✗'}</b>${label}</p><p class="fo-mxs ${cls}">${txt}</p><p class="fo-mxw">${why}</p></div>`;
    return `<div class="fo-mix">
      <div class="fo-head"><b>同一句话，六种排法</b><span>左好 · 右差</span></div>
      <div class="fo-mxg">
        ${cell(true, '宋体 + Garamond', '同为衬线，笔画对比相近', 'song-gara', foMixSent(L, L))}
        ${cell(false, '宋体 + Inter', '西文粗硬，像贴上去的', 'song-inter', foMixSent(plain, plain))}
        ${cell(true, '黑体 + Inter', '同为无衬线，粗细一致', 'hei-inter', foMixSent(plain, plain))}
        ${cell(false, '黑体 + Garamond', '西文又细又小，发飘', 'hei-gara', foMixSent(plain, plain))}
        ${cell(true, '中西之间留空格', '词与词分得清，透气', 'hei-inter', foMixSent(plain, plain))}
        ${cell(false, '不留空格', '挤成一团，难以分词', 'hei-inter', '用Python画出Fourier级数的前10项')}
      </div>
    </div>`;
  })()
};

registerPages('F', [
  {
    type: 'gallery', token: 'type-latin', title: '西文字体分类',
    intro: '西文字体按「有没有衬线、笔画粗细怎么变化、字形从哪里来」分成十几类。每张卡片用该类的代表字体（Google Fonts 上的近似替代，注明原型）写一个词，红线标出这一类最好认的特征，蓝线是基线和 x 字高。',
    min: 360,
    top: foTop(FO.latin, ['Power series converge uniformly', 'Théorème de Weierstrass', 'The quick brown fox jumps over the lazy dog', '0123456789 ∑ ∫ ε δ'], 12, 44, 'Power series converge uniformly'),
    topInit: foTopInit(FO.latin),
    tiles: foLatinTiles
  },
  {
    type: 'gallery', token: 'type-cjk', title: '中文字体',
    intro: '中文字体先分「宋、黑、楷、圆」四大门类，再加上书法字体和设计师做的展示字体。每张卡片用大字写「正弦」，右侧列出辨识特征，下方是可替换的示例句和适用场景。最后两张讲字重和中西混排。',
    min: 360,
    top: foTop(FO.cjk, ['一致收敛的函数项级数', '定理 3.2　设 f 在 [a, b] 上连续', '开始学习', '永'], 14, 48, '一致收敛的函数项级数'),
    topInit: foTopInit(FO.cjk),
    tiles: [...foCJKTiles, foWeightTile, foMixTile]
  }
]);
