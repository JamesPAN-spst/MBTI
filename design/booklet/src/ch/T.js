// —— T 排版参数：实验台（custom 页）+ 排版对照（gallery）——

// 数学变量用 KaTeX 自带的数学斜体（框架已内嵌 KaTeX 字体），和网站里 KaTeX 公式一致
const tyV = (s) => `<i class="ty-v">${s}</i>`;
// 简写的行内公式：字母变斜体，_n 下标，^n 上标；只在关系符号后折行
const tyX = (src) => {
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (/[A-Za-zε]/.test(c)) {
      out += tyV(c);
      while (src[i + 1] === '_' || src[i + 1] === '^') {
        const t = src[i + 1] === '_' ? 'sub' : 'sup';
        out += `<${t}>${/[A-Za-z]/.test(src[i + 2]) ? tyV(src[i + 2]) : src[i + 2]}</${t}>`;
        i += 2;
      }
    } else if (c === ' ' && /[<>=≤≥∈]/.test(src[i - 1])) out += '</span> <span class="ty-m">';  // 关系符号后允许换行（同 KaTeX）
    else out += { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] || c;
  }
  return `<span class="ty-m">${out}</span>`;
};
const X = tyX;
const TY_P1 = `设函数项级数 ${X('∑u_n(x)')} 在区间 ${X('I')} 上逐点收敛于 ${X('S(x)')}。若对任意 ${X('ε > 0')}，都存在只与 ${X('ε')} 有关的正整数 ${X('N')}，使得当 ${X('n > N')} 时，对一切 ${X('x ∈ I')} 都有 ${X('|S_n(x) − S(x)| < ε')}，就称该级数在 ${X('I')} 上一致收敛。`;
const TY_P2 = `直观地说，一致收敛要求所有点「齐步走」：同一个 ${X('N')} 对整个区间都管用。它保证了连续性、可积性在逐项求和之后依然成立。`;
const TY_P3 = `逐点收敛则允许每个点各自选择 ${X('N')}，于是连续函数的极限可能不再连续，经典的例子是 ${X('x^n')} 在 ${X('[0, 1]')} 上的极限。`;

// ———————————————————— 排版实验台 ————————————————————
const TY_TEXT = {
  zh: {
    h: '§ 3.2　函数项级数的一致收敛',
    p: [TY_P1, `<b>定理 3.2（Weierstrass 判别法）</b>　若存在收敛的正项级数 ${X('∑M_n')}，使得对一切 ${X('x ∈ I')} 和一切 ${X('n')} 都有 ${X('|u_n(x)| ≤ M_n')}，则 ${X('∑u_n(x)')} 在 ${X('I')} 上一致收敛。`, `${TY_P2}${TY_P3}`]
  },
  en: {
    h: '§ 3.2  Uniform convergence of series of functions',
    p: [`Let ${X('∑u_n(x)')} be a series of functions converging pointwise to ${X('S(x)')} on an interval ${X('I')}. If for every ${X('ε > 0')} there is an integer ${X('N')}, depending only on ${X('ε')}, such that ${X('|S_n(x) − S(x)| < ε')} for all ${X('n > N')} and all ${X('x ∈ I')}, the series is said to converge uniformly on ${X('I')}.`,
      `<b>Theorem 3.2 (Weierstrass M-test).</b> If there is a convergent series of positive terms ${X('∑M_n')} with ${X('|u_n(x)| ≤ M_n')} for every ${X('x ∈ I')} and every ${X('n')}, then ${X('∑u_n(x)')} converges uniformly on ${X('I')}.`,
      `Intuitively, uniform convergence asks every point to march in step: a single ${X('N')} works for the whole interval. Pointwise convergence lets each point choose its own ${X('N')}, so a limit of continuous functions may fail to be continuous — the classic example is ${X('x^n')} on ${X('[0, 1]')}.`]
  },
  fr: {
    h: '§ 3.2  Convergence uniforme des séries de fonctions',
    p: [`Soit ${X('∑u_n(x)')} une série de fonctions qui converge simplement vers ${X('S(x)')} sur un intervalle ${X('I')}. Si, pour tout ${X('ε > 0')}, il existe un entier ${X('N')}, ne dépendant que de ${X('ε')}, tel que ${X('|S_n(x) − S(x)| < ε')} pour tout ${X('n > N')} et tout ${X('x ∈ I')}, on dit que la série converge uniformément sur ${X('I')}.`,
      `<b>Théorème 3.2 (critère de Weierstrass).</b> S’il existe une série convergente à termes positifs ${X('∑M_n')} telle que ${X('|u_n(x)| ≤ M_n')} pour tout ${X('x ∈ I')} et tout ${X('n')}, alors ${X('∑u_n(x)')} converge uniformément (et même normalement) sur ${X('I')}.`,
      `Intuitivement, la convergence uniforme exige que tous les points « avancent au même pas » : un même ${X('N')} convient pour tout l’intervalle. La convergence simple laisse chaque point choisir son ${X('N')} ; la limite de fonctions continues peut alors ne pas être continue — l’exemple classique est ${X('x^n')} sur ${X('[0, 1]')}.`]
  }
};
const TY_FONTS = [
  { id: 'song', name: '思源宋体', en: 'Noto Serif SC', stack: '"Noto Serif SC", serif', w: [300, 400, 500, 600, 700] },
  { id: 'hei', name: '思源黑体', en: 'Noto Sans SC', stack: '"Noto Sans SC", sans-serif', w: [300, 400, 500, 600, 700] },
  { id: 'kai', name: '霞鹜文楷', en: 'LXGW WenKai TC', stack: '"LXGW WenKai TC", "Noto Serif SC", serif', w: [400] },
  { id: 'stix', name: 'STIX Two', en: 'STIX Two Text', stack: '"STIX Two Text", "Noto Serif SC", serif', w: [400, 600], note: '+ 思源宋体' },
  { id: 'srcserif', name: 'Source Serif', en: 'Source Serif 4', stack: '"Source Serif 4", "Noto Serif SC", serif', w: [400, 600], note: '+ 思源宋体' },
  { id: 'gara', name: 'EB Garamond', en: 'EB Garamond', stack: '"EB Garamond", "Noto Serif SC", serif', w: [400, 500], note: '+ 思源宋体' },
  { id: 'inter', name: 'Inter', en: 'Inter', stack: 'Inter, "Noto Sans SC", sans-serif', w: [300, 400, 500, 600, 700], note: '+ 思源黑体' },
  { id: 'srcsans', name: 'Source Sans', en: 'Source Sans 3', stack: '"Source Sans 3", "Noto Sans SC", sans-serif', w: [400, 600, 700], note: '+ 思源黑体' }
];
const TY_PRESETS = [
  { id: 'zh-comfy', name: '中文正文舒适', s: { lang: 'zh', font: 'song', size: 18, lh: 1.8, ls: 0.02, mzh: 36, para: 1, align: 'justify', indent: 0, weight: 400 } },
  { id: 'zh-book', name: '中文书刊', s: { lang: 'zh', font: 'song', size: 17, lh: 1.75, ls: 0, mzh: 38, para: 0, align: 'justify', indent: 2, weight: 400 } },
  { id: 'en-book', name: '英文书籍', s: { lang: 'en', font: 'gara', size: 20, lh: 1.5, ls: 0, men: 66, para: 0, align: 'justify', indent: 1, weight: 400 } },
  { id: 'compact', name: '紧凑', s: { lang: 'zh', font: 'hei', size: 14, lh: 1.5, ls: 0, mzh: 46, para: 0.5, align: 'left', indent: 0, weight: 400 } },
  { id: 'poster', name: '大标题海报', s: { lang: 'zh', font: 'hei', size: 28, lh: 1.2, ls: -0.02, mzh: 16, para: 0.6, align: 'center', indent: 0, weight: 700 } }
];
const TY = { ...TY_PRESETS[0].s, men: 66, paper: 'auto', preset: 'zh-comfy' };
const tyCanvas = document.createElement('canvas').getContext('2d');
const tyFont = () => TY_FONTS.find((f) => f.id === TY.font);
const tyEn = () => TY.lang !== 'zh';
const tyFmt = (v, d = 2) => String(+v.toFixed(d));
// 推荐区间（随语言、缩进变化）
const tyRec = {
  size: () => ({ r: [16, 20], t: '屏幕正文 16–20px' }),
  lh: () => (tyEn() ? { r: [1.4, 1.6], t: '西文正文 1.4–1.6' } : { r: [1.7, 1.9], t: '中文正文 1.7–1.9' }),
  ls: () => (tyEn() ? { r: [-0.01, 0.01], t: '西文正文 0 附近' } : { r: [0, 0.05], t: '中文正文 0–0.05em' }),
  measure: () => (tyEn() ? { r: [60, 75], t: '西文 60–75 个字符' } : { r: [30, 40], t: '中文 30–40 字' }),
  para: () => (TY.indent ? { r: [0, 0.3], t: '已有首行缩进时 0–0.3em' } : { r: [0.6, 1.2], t: '不缩进时 0.6–1.2em' })
};
const TY_CTL = {
  size: { label: '字号', min: 12, max: 28, step: 1, fmt: (v) => `${v}px` },
  lh: { label: '行距', min: 1, max: 2.4, step: 0.05, fmt: (v) => tyFmt(v) },
  ls: { label: '字距', min: -0.05, max: 0.2, step: 0.005, fmt: (v) => `${tyFmt(v, 3)}em` },
  measure: { label: '行宽', min: 16, max: 60, step: 1, fmt: (v) => (tyEn() ? `${v} 字符` : `${v} 字`) },
  para: { label: '段间距', min: 0, max: 2, step: 0.1, fmt: (v) => `${tyFmt(v, 1)}em` }
};
const tyGet = (k) => (k === 'measure' ? (tyEn() ? TY.men : TY.mzh) : TY[k]);
const tySet = (k, v) => { if (k === 'measure') TY[tyEn() ? 'men' : 'mzh'] = v; else TY[k] = v; };
const tySeg = (k, label, opts, hint) => `<div class="ty-ctl"><div class="ty-ctl-h"><span>${label}</span>${hint ? `<em class="ty-tip">${hint}</em>` : ''}</div>
  <div class="ty-seg" data-k="${k}">${opts.map(([v, t]) => `<button type="button" data-v="${v}">${t}</button>`).join('')}</div></div>`;
const tyRangeHTML = (k) => {
  const c = TY_CTL[k];
  return `<label class="ty-ctl" data-k="${k}"><span class="ty-ctl-h"><span>${c.label}</span><output></output></span>
    <input class="ty-range" type="range" min="${c.min}" max="${c.max}" step="${c.step}">
    <span class="ty-hint"><i></i><span></span></span></label>`;
};

function tyLabRender(body, ctx) {
  body.innerHTML = `<div class="ty-lab">
    <aside class="ty-panel" aria-label="排版参数">
      <div class="ty-sec"><h3>预设</h3><div class="ty-presets">${TY_PRESETS.map((p) => `<button type="button" data-v="${p.id}">${p.name}</button>`).join('')}</div></div>
      <div class="ty-sec"><h3>字体</h3><div class="ty-fonts">${TY_FONTS.map((f) => `<button type="button" data-v="${f.id}"${f.note ? '' : ' class="solo"'} style="font-family:${f.stack.replace(/"/g, "'")}"><b>${/[a-z]/i.test(f.name[0]) ? 'Aa' : '永'}</b><span>${f.name}</span>${f.note ? `<small>${f.note}</small>` : ''}</button>`).join('')}</div></div>
      <div class="ty-sec ty-grid">
        ${tyRangeHTML('size')}${tyRangeHTML('lh')}${tyRangeHTML('ls')}${tyRangeHTML('measure')}${tyRangeHTML('para')}
        ${tySeg('weight', '字重', [[300, '300'], [400, '400'], [500, '500'], [600, '600'], [700, '700']], '正文 400')}
        ${tySeg('align', '对齐', [['left', '左对齐'], ['justify', '两端'], ['center', '居中']], '')}
        ${tySeg('indent', '首行缩进', [[0, '无'], [1, '1 字'], [2, '2 字']], '缩进和段间距二选一')}
      </div>
    </aside>
    <section class="ty-main">
      <div class="ty-bar">
        ${tySeg('lang', '示例语言', [['zh', '中文'], ['en', 'English'], ['fr', 'Français']], '')}
        ${tySeg('paper', '纸面', [['auto', '跟随'], ['white', '白'], ['cream', '米黄'], ['night', '夜间']], '')}
      </div>
      <div class="ty-pv"><article class="ty-prose"></article></div>
      <p class="ty-read" aria-live="polite"></p>
      <div class="ty-out">
        <div class="ty-card ty-say"><div class="ty-card-h"><h3>复制给 Claude</h3><button type="button" class="ty-copy" data-what="say">复制描述</button></div><p class="ty-say-t"></p></div>
        <div class="ty-card ty-css"><div class="ty-card-h"><h3>CSS</h3><button type="button" class="ty-copy" data-what="css">复制 CSS</button></div><pre><code></code></pre></div>
      </div>
    </section>
  </div>`;
  const $ = (s) => body.querySelector(s);
  const prose = $('.ty-prose');
  const pv = $('.ty-pv');
  const ranges = [...body.querySelectorAll('.ty-ctl[data-k] .ty-range')];
  let lastLang = null;

  function texts() {
    const t = TY_TEXT[TY.lang];
    prose.lang = TY.lang === 'zh' ? 'zh-CN' : TY.lang;
    prose.innerHTML = `<h4>${t.h}</h4>${t.p.map((p) => `<p>${p}</p>`).join('')}`;
  }
  function css(m) {
    const f = tyFont();
    const ls = TY.ls;
    const width = tyEn() ? `${tyFmt(TY.men * m.avg / m.ch, 1)}ch;  /* ≈ 每行 ${TY.men} 个字符 */` : `${tyFmt(TY.mzh * (1 + ls), 2)}em;  /* ≈ 每行 ${TY.mzh} 字 */`;
    return `.prose {\n  font-family: ${f.stack};\n  font-size: ${TY.size}px;\n  font-weight: ${TY.weight};\n  line-height: ${tyFmt(TY.lh)};\n  letter-spacing: ${tyFmt(ls, 3)}em;\n  max-width: ${width}\n  text-align: ${TY.align};${TY.align === 'justify' && tyEn() ? '\n  hyphens: auto;' : ''}\n}\n.prose p {\n  margin: 0 0 ${tyFmt(TY.para, 1)}em;\n  text-indent: ${TY.indent}em;\n}`;
  }
  function say() {
    const f = tyFont();
    const al = { left: '左对齐', justify: '两端对齐', center: '居中' }[TY.align];
    const lang = { zh: '中文', en: '英文', fr: '法文' }[TY.lang];
    const fontName = TY.font === 'song' || TY.font === 'hei' || TY.font === 'kai' ? `${f.name}（${f.en}）` : `${f.en}${f.note ? `（中文配${f.note.slice(2)}）` : ''}`;
    const ind = TY.indent ? `首行缩进 ${tyEn() ? `${TY.indent}em` : `${TY.indent} 字`}` : '不缩进';
    return `${lang}正文：${fontName}，${TY.size}px，字重 ${TY.weight}，行距 ${tyFmt(TY.lh)}，字距 ${tyFmt(TY.ls, 3)}em，行宽约 ${tyEn() ? `${TY.men} 个字符` : `${TY.mzh} 字`}，${al}，${ind}，段间距 ${tyFmt(TY.para, 1)}em。`;
  }
  function update() {
    const f = tyFont();
    if (!f.w.includes(TY.weight)) { const w0 = TY.weight; TY.weight = f.w.reduce((a, b) => (Math.abs(b - w0) < Math.abs(a - w0) ? b : a)); }
    if (lastLang !== TY.lang) { texts(); lastLang = TY.lang; }
    // 西文按「字符数」设行宽：用当前字体量出平均字宽，再换算成 px / ch
    tyCanvas.font = `${TY.weight} ${TY.size}px ${f.stack}`;
    const sample = prose.querySelector('p:last-child').textContent;
    const m = { avg: tyCanvas.measureText(sample).width / sample.length + TY.ls * TY.size, ch: tyCanvas.measureText('0').width };
    // 控件
    ranges.forEach((r) => {
      const k = r.closest('.ty-ctl').dataset.k;
      const c = TY_CTL[k];
      let min = c.min, max = c.max;
      if (k === 'measure' && tyEn()) { min = 40; max = 110; }
      r.min = min; r.max = max;
      r.value = tyGet(k);
      const rec = tyRec[k]();
      const pa = (rec.r[0] - min) / (max - min) * 100, pb = (rec.r[1] - min) / (max - min) * 100;
      r.style.setProperty('--ty-a', `${pa.toFixed(2)}%`);
      r.style.setProperty('--ty-b', `${Math.max(pb, pa + 1.2).toFixed(2)}%`);
      r.style.setProperty('--ty-p', `${((tyGet(k) - min) / (max - min) * 100).toFixed(2)}%`);
      const ctl = r.closest('.ty-ctl');
      const v = tyGet(k);
      const ok = v >= rec.r[0] - 1e-9 && v <= rec.r[1] + 1e-9;
      ctl.querySelector('output').textContent = c.fmt(v);
      ctl.classList.toggle('ok', ok);
      ctl.querySelector('.ty-hint span').textContent = `推荐 ${rec.t}`;
    });
    body.querySelectorAll('.ty-seg').forEach((sg) => {
      const k = sg.dataset.k;
      sg.querySelectorAll('button').forEach((b) => {
        const on = String(TY[k]) === b.dataset.v;
        b.setAttribute('aria-pressed', String(on));
        if (k === 'weight') b.disabled = !f.w.includes(+b.dataset.v);
        if (k === 'indent' && +b.dataset.v) b.textContent = tyEn() ? `${b.dataset.v}em` : `${b.dataset.v} 字`;
      });
    });
    body.querySelectorAll('.ty-fonts button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === TY.font)));
    body.querySelectorAll('.ty-presets button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === TY.preset)));
    // 预览
    pv.dataset.paper = TY.paper;
    const st = prose.style;
    st.fontFamily = f.stack;
    st.fontSize = `${TY.size}px`;
    st.fontWeight = TY.weight;
    st.lineHeight = TY.lh;
    st.letterSpacing = `${TY.ls}em`;
    st.maxWidth = tyEn() ? `${(TY.men * m.avg).toFixed(1)}px` : `${TY.mzh * (1 + TY.ls)}em`;
    st.textAlign = TY.align;
    st.hyphens = TY.align === 'justify' && tyEn() ? 'auto' : 'manual';
    st.setProperty('--ty-para', `${TY.para}em`);
    st.setProperty('--ty-ind', `${TY.indent}em`);
    // 实测每行字数
    const w = prose.clientWidth;
    const cpl = tyEn() ? Math.round(w / m.avg) : Math.floor(w / (TY.size * (1 + TY.ls)) + 0.02);
    const capped = cpl < tyGet('measure') - 0.5;
    $('.ty-read').innerHTML = `实测：每行约 <b>${cpl}</b> ${tyEn() ? '个字符' : '字'} · 行高 ${tyFmt(TY.size * TY.lh, 1)}px${capped ? '<span>（预览区不够宽，已按可用宽度显示）</span>' : ''}`;
    $('.ty-css code').textContent = css(m);
    $('.ty-say-t').textContent = say();
  }
  const touch = () => { TY.preset = null; update(); };
  ranges.forEach((r) => ctx.on(r, 'input', () => { tySet(r.closest('.ty-ctl').dataset.k, +r.value); touch(); }));
  body.querySelectorAll('.ty-seg').forEach((sg) => ctx.on(sg, 'click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    const k = sg.dataset.k;
    TY[k] = ['weight', 'indent'].includes(k) ? +b.dataset.v : b.dataset.v;
    if (k === 'lang' || k === 'paper') update(); else touch();
  }));
  body.querySelectorAll('.ty-fonts button').forEach((b) => ctx.on(b, 'click', () => { TY.font = b.dataset.v; touch(); }));
  body.querySelectorAll('.ty-presets button').forEach((b) => ctx.on(b, 'click', () => {
    const p = TY_PRESETS.find((x) => x.id === b.dataset.v);
    Object.assign(TY, p.s, { preset: p.id });
    update();
  }));
  body.querySelectorAll('.ty-copy').forEach((b) => ctx.on(b, 'click', async () => {
    const el = b.dataset.what === 'css' ? $('.ty-css code') : $('.ty-say-t');
    const old = b.dataset.what === 'css' ? '复制 CSS' : '复制描述';
    try { await navigator.clipboard.writeText(el.textContent); b.textContent = '已复制'; }
    catch {
      const r = document.createRange(); r.selectNodeContents(el);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      b.textContent = '已选中，请按 ⌘C / Ctrl+C';
    }
    ctx.later(1600, () => { b.textContent = old; });
  }));
  const ro = new ResizeObserver(() => update());
  ro.observe(pv);
  ctx.add(() => ro.disconnect());
  if (document.fonts) document.fonts.ready.then(() => { if (body.isConnected) update(); });
  update();
}
// ———————————————————— 排版对照 ————————————————————
const tyVerdict = (k, t) => `<span class="ty-vd ${k}">${{ ok: '✓', mid: '△', no: '✗' }[k]} ${t}</span>`;
const tyHead = (spec, vd) => `<div class="ty-th"><code>${spec}</code>${vd}</div>`;
const TY_LONG = `<p>${TY_P1}${TY_P2}</p>`;

function tyLH(code, lh, vk, vt, desc, more, kw) {
  return {
    code, name: `行距 ${lh}`, en: `line-height: ${lh}`, meta: '思源宋体 · 同一段文字',
    desc, more, kw, bg: '#fbfaf7', ratio: '4 / 3',
    css: `.prose {\n  line-height: ${lh};  /* 行高 = 字号 × ${lh} */\n}`,
    html: `<div class="ty-t ty-lh" style="--ty-lh:${lh}">${tyHead(`line-height: ${lh}`, tyVerdict(vk, vt))}
      <div class="ty-lhbox"><div class="ty-lhin"><span class="ty-ruler" aria-hidden="true"></span><div class="ty-tp">${TY_LONG}</div></div></div></div>`
  };
}
function tyMeasure(code, n, vk, vt, name, desc, more) {
  return {
    code, name, en: `measure ≈ ${n} 字`, meta: '同一字号，只改行宽',
    desc, more, kw: ['行宽', `${n} 字`, 'max-width', '可读性'], bg: '#fbfaf7', wide: true, ratio: '4 / 1',
    css: `.prose {\n  max-width: ${n}em;  /* 中文：每个字 1em，约 ${n} 字一行 */\n}`,
    html: `<div class="ty-t ty-ms" style="--ty-n:${n}">${tyHead(`max-width: ${n}em`, tyVerdict(vk, vt))}
      <div class="ty-mscol"><div class="ty-msrule" aria-hidden="true"><span>每行 ${n} 字</span></div><div class="ty-tp"><p>${TY_P1}</p></div></div></div>`
  };
}
const TY_LEVELS = [['H1', '幂级数'], ['H2', '收敛半径'], ['H3', '定理 3.2'], ['H4', '证明']];
function tyScale(code, r, name, en, desc, more) {
  const px = (i) => Math.round(16 * r ** i);
  return {
    code, name, en, meta: `每级 × ${r}`,
    desc, more, kw: ['字阶', `× ${r}`, '层级', '标题大小'], bg: '#fbfaf7', ratio: '4 / 3',
    css: `body { font-size: 16px; }\nh4 { font-size: ${tyFmt(r, 3)}rem; }   /* ${px(1)}px */\nh3 { font-size: ${tyFmt(r ** 2, 3)}rem; }   /* ${px(2)}px */\nh2 { font-size: ${tyFmt(r ** 3, 3)}rem; }   /* ${px(3)}px */\nh1 { font-size: ${tyFmt(r ** 4, 3)}rem; }   /* ${px(4)}px */`,
    html: `<div class="ty-t ty-sc" style="--ty-r:${r}">${tyHead(`ratio ${r}`, `<span class="ty-scn">16 → ${px(1)} → ${px(2)} → ${px(3)} → ${px(4)} px</span>`)}
      <div class="ty-scl">${TY_LEVELS.map(([h, t], i) => `<div class="ty-scr" style="font-size:${(2.7 * r ** (4 - i)).toFixed(2)}cqw"><span class="ty-sct">${t}</span><code>${h} · ${px(4 - i)}</code></div>`).join('')}
        <div class="ty-scr body" style="font-size:2.7cqw"><span class="ty-sct">设幂级数 ${X('∑a_nx^n')} 的收敛半径为 ${X('R')}……</span><code>正文 · 16</code></div></div></div>`
  };
}

const tySetsTiles = [
  tyLH('T01', 1.2, 'no', '中文太挤', '行距 1.2 是很多软件的默认值。对西文标题合适，但中文笔画密、没有上下伸部，行与行几乎贴在一起，读完一行很难找到下一行。只用于多行标题。', '行距（line-height）是「行高 ÷ 字号」。左侧刻度每一格就是一行占的高度。CSS 写成不带单位的数字（1.2），子元素会按自己的字号重新计算。', ['行距', '1.2', '紧', '只用于标题']),
  tyLH('T02', 1.5, 'mid', '西文正文', '西文正文的常用值（1.4–1.6），放在中文里略紧。适合界面里的短说明、列表、卡片文字等只有两三行的地方。', '浏览器默认 normal 约为 1.2；很多 CSS 框架把 body 设为 1.5。中文长文建议再加大。', ['行距', '1.5', '西文正文', '短文字']),
  tyLH('T03', 1.75, 'ok', '中文正文推荐', '落在中文正文的舒适区间（1.7–1.9）：行间留出足够空白，眼睛换行不串行，段落仍然紧凑成块。教材、文章首选。', '字号越大、行越宽，行距可以越大；含分式、上下标的数学段落可以用到 1.85–1.9，给公式留空间。', ['行距', '1.75', '舒适', '中文正文']),
  tyLH('T04', 2, 'mid', '偏松', '像双倍行距的稿纸，很松。适合要留空批注的讲义、儿童读物或行很宽的版面；普通正文用会显得散，段落失去整体感。', '如果只是觉得「挤」，先检查行宽和字号，往往比把行距加到 2 更有效。', ['行距', '2.0', '宽松', '讲义']),
  tyMeasure('T05', 18, 'no', '太窄', '行宽 · 窄（约 18 字）', '每行约 18 个字。行太短，眼睛频繁换行，句子被切得很碎，公式和标点常常被挤到下一行。手机上难以避免，桌面上应该放宽。', '手机竖屏一般只能放 20–24 个字，这是可以接受的下限。'),
  tyMeasure('T06', 35, 'ok', '推荐', '行宽 · 舒适（约 35 字）', '每行 30–40 个中文字（英文 60–75 个字母）最好读：一眼能扫完一行，换行时也不容易串行。网页上用 max-width 把正文限制在这个宽度。', '中文每个字宽 1em，所以 max-width: 36em ≈ 每行 36 字。多出来的屏幕宽度留给目录、旁注或空白。'),
  tyMeasure('T07', 70, 'no', '太宽', '行宽 · 过宽（约 70 字）', '每行 70 个字：读到行尾后很难准确找回下一行开头，长段落令人疲惫。宽屏上让正文铺满整行是最常见的错误。', '如果版面很宽又想多放内容，用两栏或边栏，而不是加长每一行。'),
  tyScale('T08', 1.2, '字阶 · 小三度', 'Type scale · Minor third 1.2', '每级标题放大 1.2 倍：16 → 19 → 23 → 28 → 33px。层级温和、克制，适合信息密集的界面、文档和教材。', '名字来自音乐的音程比例。层级差小，所以标题常配合加粗或颜色来区分。'),
  tyScale('T09', 1.333, '字阶 · 纯四度', 'Type scale · Perfect fourth 1.333', '每级 × 1.333：16 → 21 → 28 → 38 → 51px。对比清楚又不夸张，适合文章、博客、学习网站。', '最常用的一档。手机上可以整体缩小一级（例如把 1.333 换成 1.25）。'),
  tyScale('T10', 1.618, '字阶 · 黄金比', 'Type scale · Golden ratio 1.618', '每级 × 1.618：16 → 26 → 42 → 68 → 110px。标题非常大，戏剧性强，适合落地页、海报式首页；层级一多就失控。', '一般只用前三级（正文、小标题、大标题），而且大标题要收紧字距、减小行距（见 T11）。'),
  {
    code: 'T11', name: '大标题收紧字距', en: 'Tracking for display type', meta: 'letter-spacing 0 与 −0.03em 对比',
    desc: '字号越大，字母间的默认空隙看起来越松、越散。大标题（40px 以上）通常把字距收紧到 −0.01 ～ −0.03em，看起来更紧凑有力。中文大标题收 0 ～ −0.02em 即可，不要挤到笔画相碰。',
    more: '苹果官网的大标题就是这样处理的。反过来，小字号正文不要收紧字距。',
    kw: ['字距', '收紧', '大标题', '−0.03em'], bg: '#fbfaf7', ratio: '4 / 3',
    css: 'h1 {\n  font-size: 56px;\n  line-height: 1.05;\n  letter-spacing: -0.03em;  /* 大标题收紧 */\n}',
    html: `<div class="ty-t ty-tk">${tyHead('letter-spacing', '')}
      <div class="ty-tkr"><span class="ty-tkl">0（默认）</span><p style="letter-spacing:0">Uniform Convergence</p><p class="zh" style="letter-spacing:0">一致收敛的级数</p></div>
      <div class="ty-tkr ok"><span class="ty-tkl">−0.03em ✓</span><p style="letter-spacing:-.03em">Uniform Convergence</p><p class="zh" style="letter-spacing:-.02em">一致收敛的级数</p></div></div>`
  },
  {
    code: 'T12', name: '全大写小标签加字距', en: 'Eyebrow / small caps tracking', meta: 'letter-spacing 0 与 0.14em 对比',
    desc: '全大写的小字（如标题上方的章节标签 CHAPTER 3）字母挤在一起不好认。字距放宽到 0.08–0.15em 后清楚又精致。这种标在标题上方的小标签叫 eyebrow（眉题）。',
    more: '只对全大写或很小的字加字距；小写正文加字距反而难读。中文小标签可加 0.1–0.2em。',
    kw: ['眉题', '全大写', '加字距', 'eyebrow'], bg: '#fbfaf7', ratio: '4 / 3',
    css: '.eyebrow {\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.14em;\n}',
    html: `<div class="ty-t ty-eb">${tyHead('eyebrow', '')}
      <div class="ty-ebr"><span class="ty-tkl">不加字距 ✗</span><p class="ty-ebx" style="letter-spacing:0">CHAPTER 3 · POWER SERIES</p><p class="ty-ebh">幂级数与收敛半径</p></div>
      <div class="ty-ebr ok"><span class="ty-tkl">0.14em ✓</span><p class="ty-ebx" style="letter-spacing:.14em">CHAPTER 3 · POWER SERIES</p><p class="ty-ebh">幂级数与收敛半径</p></div></div>`
  },
  {
    code: 'T13', name: '两端对齐 vs 左对齐', en: 'Justify vs flush left', meta: 'text-align',
    desc: '中文是方块字，两端对齐（justify）几乎不会产生难看的空隙，左右两边都整齐；左对齐时，遇到西文单词和公式换行，右边会参差不齐。英文则相反：窄栏里两端对齐容易出现大空洞（「河流」），网页英文正文通常左对齐。',
    more: '英文要两端对齐，必须同时开启断字 hyphens: auto 并给页面设置 lang="en"。',
    kw: ['两端对齐', '左对齐', 'justify', '河流'], bg: '#fbfaf7', ratio: '4 / 3',
    css: '.prose-zh { text-align: justify; }\n.prose-en { text-align: left; }\n/* 英文若要两端对齐，务必开启断字 */\n.prose-en.justify { text-align: justify; hyphens: auto; }',
    html: `<div class="ty-t ty-al">${tyHead('text-align', '')}
      <div class="ty-alg">
        <div class="ty-alc"><span class="ty-tkl">左对齐 left</span><div class="ty-alt" style="text-align:left">${TY_LONG}</div></div>
        <div class="ty-alc ok"><span class="ty-tkl">两端对齐 justify ✓</span><div class="ty-alt" style="text-align:justify">${TY_LONG}</div></div>
      </div></div>`
  },
  {
    code: 'T14', name: '首行缩进 vs 段间距', en: 'Indent vs paragraph spacing', meta: 'text-indent / margin',
    desc: '两种分段方式：首行缩进两个字（书刊传统），或段与段之间留空（网页习惯）。二选一即可，两个都用会显得多余。网页正文推荐段间距 0.8–1em；想要书卷气时用缩进、段间距设 0。',
    more: '用缩进时，标题后的第一段通常不缩进（p:first-of-type { text-indent: 0 }）。',
    kw: ['首行缩进', '段间距', '分段', '二选一'], bg: '#fbfaf7', ratio: '4 / 3',
    css: '/* 方式一：书刊式 */\n.book p { margin: 0; text-indent: 2em; }\n/* 方式二：网页式 */\n.web p { margin: 0 0 0.9em; text-indent: 0; }',
    html: `<div class="ty-t ty-pi">${tyHead('分段方式', '')}
      <div class="ty-alg">
        <div class="ty-alc"><span class="ty-tkl">首行缩进 2 字</span><div class="ty-alt ty-ind"><p>${TY_P2}</p><p>${TY_P3}</p></div></div>
        <div class="ty-alc"><span class="ty-tkl">段间距 0.9em</span><div class="ty-alt ty-gap"><p>${TY_P2}</p><p>${TY_P3}</p></div></div>
      </div></div>`
  },
  {
    code: 'T15', name: '中英文之间加空格', en: 'CJK–Latin spacing (盘古之白)', meta: '空格 / text-autospace',
    desc: '中文与西文、数字、公式之间加一个空格（俗称「盘古之白」），文字更透气，变量和公式也更醒目。图中浅蓝色的就是这些空格。较新的浏览器支持 text-autospace 自动加间距，也可以写文字时手动加空格。',
    more: '标点符号（，。「」）和中文之间不加空格。写网站内容时养成习惯，比事后用脚本补空格可靠。',
    kw: ['盘古之白', '中英混排', '空格', 'text-autospace'], bg: '#fbfaf7', ratio: '4 / 3',
    css: '/* 较新的浏览器：自动在中西文之间加 1/8 字宽 */\n.prose { text-autospace: normal; }\n/* 兼容做法：写内容时手动加半角空格 */',
    html: (() => {
      const S = '<span class="ty-sp"> </span>';
      const t = (s) => `设${s}${X('f(x)')}${s}在${s}[0, 1]${s}上连续，则可用${s}Python${s}算出它的前${s}10${s}个${s}Fourier${s}系数。`;
      return `<div class="ty-t ty-pg">${tyHead('spacing', '')}
        <div class="ty-pgr"><span class="ty-tkl">不加空格 ✗</span><p>${t('')}</p></div>
        <div class="ty-pgr ok"><span class="ty-tkl">加空格 ✓</span><p>${t(S)}</p></div></div>`;
    })()
  }
];

registerPages('T', [
  {
    type: 'custom', token: 'typo-lab', title: '排版实验台',
    intro: '拖动左边的滑块，右边的数学正文会实时变化。绿色区间是推荐值；调到满意后，把下方那句描述复制给我，或直接复制 CSS。',
    render: tyLabRender
  },
  {
    type: 'gallery', token: 'typo-sets', title: '排版对照',
    intro: '同一段文字，只改一个参数。看哪张顺眼，就可以说「行距像 T03、行宽像 T06」。每张都写了推荐值和原因。',
    min: 480,
    tiles: tySetsTiles
  }
]);
