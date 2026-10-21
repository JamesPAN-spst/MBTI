  // —— 数学 ——
  function taylorSin(N, x) {
    let s = 0, term = x;
    for (let k = 0; 2 * k + 1 <= N; k++) { s += term; term *= -x * x / ((2 * k + 2) * (2 * k + 3)); }
    return s;
  }
  function maxErr(N) {
    let m = 0;
    for (let i = 0; i <= 800; i++) { const x = -Math.PI + 2 * Math.PI * i / 800; m = Math.max(m, Math.abs(Math.sin(x) - taylorSin(N, x))); }
    return m;
  }
  function reach(N) {
    for (let x = 0; x <= 7; x += 0.01) if (Math.abs(Math.sin(x) - taylorSin(N, x)) >= 0.01) return x;
    return 7;
  }
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  function fmtErr(e) {
    if (e >= 0.001) return e.toFixed(4);
    const ex = Math.floor(Math.log10(e)); const m = e / 10 ** ex;
    return `${m.toFixed(1)} × 10${String(ex).split('').map((c) => SUP[c]).join('')}`;
  }

  // —— 插图 ——
  let clipSeq = 0;
  function drawPlot(svg, N, o) {
    const W = o.W, H = o.H, P = { l: 30, r: 14, t: 14, b: 30 };
    const xr = [-2 * Math.PI - 0.45, 2 * Math.PI + 0.45], yr = [-2.1, 2.1];
    const X = (x) => P.l + (x - xr[0]) / (xr[1] - xr[0]) * (W - P.l - P.r);
    const Y = (y) => P.t + (yr[1] - y) / (yr[1] - yr[0]) * (H - P.t - P.b);
    const id = svg.dataset.clip || (svg.dataset.clip = `clip${++clipSeq}`);
    const c = o.c;
    const n = 420;
    const sample = (f) => { const a = []; for (let i = 0; i <= n; i++) { const x = xr[0] + (xr[1] - xr[0]) * i / n; a.push([X(x), Y(Math.max(-60, Math.min(60, f(x))))]); } return a; };
    const line = (a) => 'M' + a.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L');
    const base = sample(Math.sin), approx = sample((x) => taylorSin(N, x));
    const txt = (x, y, s, anchor = 'middle') => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" fill="${c.label}" font-family="${o.font.replace(/"/g, "'")}" font-size="${o.fs}" font-weight="${o.weight || 400}">${s}</text>`;
    const PI = Math.PI, xt = [[-2 * PI, '−2π'], [-PI, '−π'], [PI, 'π'], [2 * PI, '2π']];
    let s = `<defs><clipPath id="${id}"><rect x="${P.l}" y="${P.t}" width="${W - P.l - P.r}" height="${H - P.t - P.b}"/></clipPath>`;
    if (o.glow) s += `<filter id="${id}g" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    s += '</defs>';
    if (o.grid === 'lines') {
      s += `<g stroke="${c.grid}" stroke-width="1">`;
      for (let k = -2; k <= 2; k++) s += `<line x1="${X(k * PI).toFixed(1)}" x2="${X(k * PI).toFixed(1)}" y1="${P.t}" y2="${H - P.b}"/>`;
      for (const y of [-2, -1, 0, 1, 2]) s += `<line x1="${P.l}" x2="${W - P.r}" y1="${Y(y).toFixed(1)}" y2="${Y(y).toFixed(1)}"/>`;
      s += '</g>';
    } else if (o.grid === 'dots') {
      s += `<g fill="${c.grid}">`;
      for (let k = -4; k <= 4; k++) for (const y of [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]) s += `<circle cx="${X(k * PI / 2).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="1.6"/>`;
      s += '</g>';
    }
    if (o.axis === 'cross') {
      s += `<g stroke="${c.axis}" stroke-width="1"><line x1="${P.l}" x2="${W - P.r}" y1="${Y(0)}" y2="${Y(0)}"/><line x1="${X(0)}" x2="${X(0)}" y1="${P.t}" y2="${H - P.b}"/>`;
      for (const [x] of xt) s += `<line x1="${X(x)}" x2="${X(x)}" y1="${Y(0) - 4}" y2="${Y(0) + 4}"/>`;
      for (const y of [-1, 1]) s += `<line x1="${X(0) - 4}" x2="${X(0) + 4}" y1="${Y(y)}" y2="${Y(y)}"/>`;
      s += '</g>';
      for (const [x, l] of xt) s += txt(X(x), Y(0) + o.fs + 6, l);
      s += txt(X(0) - 8, Y(1) + o.fs / 3, '1', 'end') + txt(X(0) - 8, Y(-1) + o.fs / 3, '−1', 'end');
    } else if (o.axis === 'baseline') {
      s += `<line x1="${P.l}" x2="${W - P.r}" y1="${Y(0)}" y2="${Y(0)}" stroke="${c.axis}" stroke-width="1"/>`;
      for (const [x, l] of xt) s += txt(X(x), Y(0) + o.fs + 6, l);
    } else if (o.axis === 'range') {
      const yb = H - P.b + 6, xl = P.l - 6;
      s += `<g stroke="${c.axis}" stroke-width="1"><line x1="${X(-2 * PI)}" x2="${X(2 * PI)}" y1="${yb}" y2="${yb}"/><line x1="${xl}" x2="${xl}" y1="${Y(1)}" y2="${Y(-1)}"/>`;
      for (const [x] of xt) s += `<line x1="${X(x)}" x2="${X(x)}" y1="${yb}" y2="${yb + 4}"/>`;
      s += '</g>';
      for (const [x, l] of xt) s += txt(X(x), yb + o.fs + 4, l);
      s += txt(xl - 5, Y(1) + o.fs / 3, '1', 'end') + txt(xl - 5, Y(-1) + o.fs / 3, '−1', 'end');
    }
    s += `<g clip-path="url(#${id})">`;
    if (c.band) s += `<path d="${line(base)}L${approx.slice().reverse().map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L')}Z" fill="${c.band}" stroke="none"/>`;
    s += `<path d="${line(base)}" fill="none" stroke="${c.base}" stroke-width="${o.w[0]}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} stroke-linejoin="round"/>`;
    s += `<path class="approx" d="${line(approx)}" fill="none" stroke="${c.approx}" stroke-width="${o.w[1]}" stroke-linejoin="round" stroke-linecap="round" ${o.glow ? `filter="url(#${id}g)"` : ''}/>`;
    if (o.marker) {
      let bx = 0, be = -1;
      for (let i = 0; i <= 800; i++) { const x = -PI + 2 * PI * i / 800; const e = Math.abs(Math.sin(x) - taylorSin(N, x)); if (e > be) { be = e; bx = x; } }
      const y1 = Y(Math.sin(bx)), y2 = Y(Math.max(-60, Math.min(60, taylorSin(N, bx))));
      s += `<line x1="${X(bx)}" x2="${X(bx)}" y1="${y1}" y2="${y2}" stroke="${c.mark}" stroke-width="2.5"/><circle cx="${X(bx)}" cy="${y1}" r="4.5" fill="${c.mark}"/><circle cx="${X(bx)}" cy="${y2}" r="4.5" fill="${c.mark}"/>`;
    }
    s += '</g>';
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = s;
    if (o.animate && !reduce) {
      const p = svg.querySelector('.approx');
      const L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset .9s cubic-bezier(.4,0,.2,1)';
      p.style.strokeDashoffset = 0;
    }
  }

