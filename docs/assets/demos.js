// 交互演示：每个 <figure class="demo" data-demo="id"> 由下面同名的函数挂载。
(() => {
  const root = document.documentElement;
  const css = (name) => getComputedStyle(root).getPropertyValue(name).trim();
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgba = (rgb, a = 1) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

  function palette() {
    return {
      bg: css('--surface-2'), text: css('--text'), muted: css('--muted'),
      line: css('--line-strong'), grid: css('--line'),
      accent: css('--accent'), a2: css('--c-thm'), a3: css('--c-cex'), a4: css('--c-ex'),
    };
  }

  // —— 控件 ——
  function controls(mount) {
    const bar = document.createElement('div');
    bar.className = 'demo-controls';
    mount.appendChild(bar);
    return {
      slider(label, { min, max, step, value, fmt = (v) => v }, onInput) {
        const l = document.createElement('label');
        const input = Object.assign(document.createElement('input'), { type: 'range', min, max, step, value });
        const out = document.createElement('output');
        out.textContent = fmt(Number(value));
        l.append(label, input, out);
        bar.appendChild(l);
        input.addEventListener('input', () => { out.textContent = fmt(Number(input.value)); onInput(Number(input.value)); });
        return { input, set(v) { input.value = v; out.textContent = fmt(Number(v)); } };
      },
      select(label, options, onChange) {
        const l = document.createElement('label');
        const sel = document.createElement('select');
        options.forEach(([value, text]) => sel.appendChild(Object.assign(document.createElement('option'), { value, textContent: text })));
        l.append(label, sel);
        bar.appendChild(l);
        sel.addEventListener('change', () => onChange(sel.value));
        return sel;
      },
      button(text, onClick) {
        const b = Object.assign(document.createElement('button'), { type: 'button', textContent: text });
        b.addEventListener('click', onClick);
        bar.appendChild(b);
        return b;
      },
    };
  }

  // —— 画布与坐标系 ——
  function stage(mount, aspect, draw) {
    const canvas = document.createElement('canvas');
    const readout = document.createElement('div');
    readout.className = 'demo-readout';
    mount.append(canvas, readout);
    const ctx = canvas.getContext('2d');
    const s = { canvas, ctx, readout, w: 0, h: 0 };
    const resize = () => {
      const w = mount.clientWidth;
      if (!w) return;
      const h = Math.round(Math.min(w * aspect, 440));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.w = w; s.h = h;
      draw();
    };
    new ResizeObserver(resize).observe(mount);
    window.addEventListener('themechange', () => requestAnimationFrame(draw));
    return s;
  }

  function view(s, [x0, x1], [y0, y1], { equal = false, pad = 10 } = {}) {
    let w = s.w - 2 * pad;
    let h = s.h - 2 * pad;
    let sx = w / (x1 - x0);
    let sy = h / (y1 - y0);
    if (equal) {
      const k = Math.min(sx, sy);
      const cx = (x0 + x1) / 2; const cy = (y0 + y1) / 2;
      sx = sy = k;
      x0 = cx - w / (2 * k); x1 = cx + w / (2 * k);
      y0 = cy - h / (2 * k); y1 = cy + h / (2 * k);
    }
    return {
      x0, x1, y0, y1,
      X: (x) => pad + (x - x0) * sx,
      Y: (y) => pad + (y1 - y) * sy,
      ix: (px) => x0 + (px - pad) / sx,
      iy: (py) => y1 - (py - pad) / sy,
    };
  }

  function axes(s, v, p, { xstep = 1, ystep = 1, labels = true } = {}) {
    const { ctx } = s;
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, s.w, s.h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = p.grid;
    ctx.beginPath();
    for (let x = Math.ceil(v.x0 / xstep) * xstep; x <= v.x1; x += xstep) { ctx.moveTo(v.X(x), 0); ctx.lineTo(v.X(x), s.h); }
    for (let y = Math.ceil(v.y0 / ystep) * ystep; y <= v.y1; y += ystep) { ctx.moveTo(0, v.Y(y)); ctx.lineTo(s.w, v.Y(y)); }
    ctx.stroke();
    ctx.strokeStyle = p.line;
    ctx.beginPath();
    if (v.y0 <= 0 && v.y1 >= 0) { ctx.moveTo(0, v.Y(0)); ctx.lineTo(s.w, v.Y(0)); }
    if (v.x0 <= 0 && v.x1 >= 0) { ctx.moveTo(v.X(0), 0); ctx.lineTo(v.X(0), s.h); }
    ctx.stroke();
    if (!labels) return;
    ctx.fillStyle = p.muted;
    ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    const fmt = (t) => (Math.abs(t) < 1e-9 ? '0' : String(+t.toFixed(2)));
    const yAxis = Math.min(Math.max(v.Y(0), 12), s.h - 4);
    for (let x = Math.ceil(v.x0 / xstep) * xstep; x <= v.x1; x += xstep) {
      if (Math.abs(x) > 1e-9) ctx.fillText(fmt(x), v.X(x) + 3, yAxis - 4);
    }
    const xAxis = Math.min(Math.max(v.X(0), 4), s.w - 30);
    for (let y = Math.ceil(v.y0 / ystep) * ystep; y <= v.y1; y += ystep) {
      if (Math.abs(y) > 1e-9) ctx.fillText(fmt(y), xAxis + 4, v.Y(y) - 3);
    }
  }

  function plot(s, v, f, color, { width = 2, dash = [], from = v.x0, to = v.x1, steps } = {}) {
    const { ctx } = s;
    const n = steps || Math.max(200, Math.round(s.w * 1.5));
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash);
    ctx.lineJoin = 'round';
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i <= n; i++) {
      const x = from + (to - from) * (i / n);
      const y = f(x);
      if (!Number.isFinite(y) || Math.abs(v.Y(y)) > 1e5) { pen = false; continue; }
      if (pen) ctx.lineTo(v.X(x), v.Y(y)); else ctx.moveTo(v.X(x), v.Y(y));
      pen = true;
    }
    ctx.stroke();
    ctx.restore();
  }

  const DEMOS = {};

  // 第 1 章：ℓ^p 单位球
  DEMOS.unitballs = (mount) => {
    let p = 2;
    const c = controls(mount);
    const sl = c.slider('p =', { min: 1, max: 12, step: 0.05, value: 2, fmt: (x) => (x >= 12 ? '∞' : x.toFixed(2)) }, (x) => { p = x >= 12 ? Infinity : x; draw(); });
    c.button('p = 1', () => { p = 1; sl.set(1); draw(); });
    c.button('p = 2', () => { p = 2; sl.set(2); draw(); });
    c.button('p = ∞', () => { p = Infinity; sl.set(12); draw(); });
    const s = stage(mount, 0.62, () => draw());
    const ball = (q) => (t) => {
      const x = Math.cos(t); const y = Math.sin(t);
      const n = q === Infinity ? Math.max(Math.abs(x), Math.abs(y)) : (Math.abs(x) ** q + Math.abs(y) ** q) ** (1 / q);
      return [x / n, y / n];
    };
    function curve(v, g, color, width, dash = [], fill = null) {
      const { ctx } = s;
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= 720; i++) {
        const [x, y] = g((i / 720) * 2 * Math.PI);
        if (i) ctx.lineTo(v.X(x), v.Y(y)); else ctx.moveTo(v.X(x), v.Y(y));
      }
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash); ctx.stroke();
      ctx.restore();
    }
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const v = view(s, [-1.5, 1.5], [-1.25, 1.25], { equal: true });
      axes(s, v, pl, { xstep: 0.5, ystep: 0.5 });
      [1, 2, Infinity].forEach((q) => curve(v, ball(q), pl.muted, 1, [4, 4]));
      curve(v, ball(p), pl.accent, 2.5, [], rgba(hexToRgb(pl.accent), 0.12));
      s.readout.textContent = `虚线为 p = 1, 2, ∞ 的单位球；当前 p = ${p === Infinity ? '∞' : p.toFixed(2)}，对偶指数 q = ${p === 1 ? '∞' : p === Infinity ? '1' : (p / (p - 1)).toFixed(2)}。`;
    }
  };

  // 第 2 章：Riemann 重排定理
  DEMOS.rearrange = (mount) => {
    let target = 1.5;
    let N = 200;
    const c = controls(mount);
    c.slider('目标和', { min: -2, max: 3, step: 0.01, value: target, fmt: (x) => x.toFixed(2) }, (x) => { target = x; draw(); });
    c.slider('项数 N', { min: 10, max: 600, step: 1, value: N }, (x) => { N = x; draw(); });
    const s = stage(mount, 0.5, () => draw());
    function rearranged(n) {
      const sums = [];
      let S = 0; let pos = 1; let neg = 2;
      let np = 0; let nn = 0;
      for (let k = 0; k < n; k++) {
        if (S <= target) { S += 1 / pos; pos += 2; np++; } else { S -= 1 / neg; neg += 2; nn++; }
        sums.push(S);
      }
      return { sums, np, nn };
    }
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const { sums, np, nn } = rearranged(N);
      const lo = Math.min(-2.2, ...sums); const hi = Math.max(3.2, ...sums);
      const v = view(s, [0, N], [lo, hi], { pad: 14 });
      axes(s, v, pl, { xstep: N > 200 ? 100 : 20, ystep: 0.5 });
      const { ctx } = s;
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = pl.a3; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, v.Y(target)); ctx.lineTo(s.w, v.Y(target)); ctx.stroke();
      ctx.strokeStyle = pl.muted;
      ctx.beginPath(); ctx.moveTo(0, v.Y(Math.LN2)); ctx.lineTo(s.w, v.Y(Math.LN2)); ctx.stroke();
      ctx.restore();
      let S = 0;
      const orig = [];
      for (let k = 1; k <= N; k++) { S += (k % 2 ? 1 : -1) / k; orig.push(S); }
      plot(s, v, (x) => orig[Math.min(N - 1, Math.max(0, Math.round(x) - 1))], pl.muted, { width: 1, steps: N });
      plot(s, v, (x) => sums[Math.min(N - 1, Math.max(0, Math.round(x) - 1))], pl.accent, { width: 2, steps: N });
      s.readout.textContent = `重排后 S_N = ${sums[N - 1].toFixed(5)}（用了 ${np} 个正项、${nn} 个负项）；原顺序 S_N = ${orig[N - 1].toFixed(5)} → ln 2 ≈ 0.69315。`;
    }
  };

  // 第 3 章：一致收敛的 ε-管道
  DEMOS.uniform = (mount) => {
    const families = {
      pow: { label: 'xⁿ（[0,1]）', f: (n, x) => x ** n, lim: (x) => (x < 1 ? 0 : 1), xr: [0, 1], yr: [-0.3, 1.3], jump: 1 },
      bump: { label: 'n x e^{-nx}（[0,1]）', f: (n, x) => n * x * Math.exp(-n * x), lim: () => 0, xr: [0, 1], yr: [-0.3, 0.8] },
      decay: { label: 'x / (1 + n x²)（[0,2]）', f: (n, x) => x / (1 + n * x * x), lim: () => 0, xr: [0, 2], yr: [-0.3, 1.1] },
      abs: { label: '√(x² + 1/n²)（[-1,1]）', f: (n, x) => Math.sqrt(x * x + 1 / (n * n)), lim: (x) => Math.abs(x), xr: [-1, 1], yr: [-0.2, 1.4] },
    };
    let key = 'pow'; let n = 5; let eps = 0.1;
    const c = controls(mount);
    c.select('函数列', Object.entries(families).map(([k, f]) => [k, f.label]), (k) => { key = k; draw(); });
    c.slider('n =', { min: 1, max: 80, step: 1, value: n }, (x) => { n = x; draw(); });
    c.slider('ε =', { min: 0.02, max: 0.5, step: 0.01, value: eps, fmt: (x) => x.toFixed(2) }, (x) => { eps = x; draw(); });
    const s = stage(mount, 0.55, () => draw());
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const F = families[key];
      const v = view(s, F.xr, F.yr, { pad: 14 });
      axes(s, v, pl, { xstep: 0.25, ystep: 0.25 });
      const { ctx } = s;
      const steps = 600;
      ctx.save();
      ctx.fillStyle = rgba(hexToRgb(pl.a4), 0.16);
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = F.xr[0] + (F.xr[1] - F.xr[0]) * (i / steps);
        const y = F.lim(x) + eps;
        if (i) ctx.lineTo(v.X(x), v.Y(y)); else ctx.moveTo(v.X(x), v.Y(y));
      }
      for (let i = steps; i >= 0; i--) {
        const x = F.xr[0] + (F.xr[1] - F.xr[0]) * (i / steps);
        ctx.lineTo(v.X(x), v.Y(F.lim(x) - eps));
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
      plot(s, v, F.lim, pl.a4, { width: 2, to: F.jump ? F.xr[1] - 1e-6 : F.xr[1] });
      if (F.jump) {
        ctx.fillStyle = pl.a4;
        ctx.beginPath(); ctx.arc(v.X(1), v.Y(1), 4, 0, 2 * Math.PI); ctx.fill();
      }
      plot(s, v, (x) => F.f(n, x), pl.accent, { width: 2.2 });
      let sup = 0; let at = F.xr[0];
      for (let i = 0; i <= 4000; i++) {
        const x = F.xr[0] + (F.xr[1] - F.xr[0]) * (i / 4000);
        if (F.jump && x >= 1) continue;
        const d = Math.abs(F.f(n, x) - F.lim(x));
        if (d > sup) { sup = d; at = x; }
      }
      ctx.strokeStyle = pl.a3; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(v.X(at), v.Y(F.lim(at))); ctx.lineTo(v.X(at), v.Y(F.f(n, at))); ctx.stroke();
      const ok = sup <= eps;
      s.readout.textContent = `sup |fₙ − f| ≈ ${sup.toFixed(4)}（在 x ≈ ${at.toFixed(3)} 处）：fₙ ${ok ? '完全落在' : '没有完全落在'} ε-管道内。`;
    }
  };

  // 第 4 章：Taylor 多项式与收敛半径
  DEMOS.taylor = (mount) => {
    const fact = (k) => { let r = 1; for (let i = 2; i <= k; i++) r *= i; return r; };
    const fns = {
      exp: { label: 'eˣ', f: Math.exp, a: (k) => 1 / fact(k), R: Infinity, xr: [-4, 4], yr: [-2, 12] },
      sin: { label: 'sin x', f: Math.sin, a: (k) => (k % 2 ? (((k - 1) / 2) % 2 ? -1 : 1) / fact(k) : 0), R: Infinity, xr: [-9, 9], yr: [-3, 3] },
      log: { label: 'ln(1 + x)', f: (x) => (x > -1 ? Math.log1p(x) : NaN), a: (k) => (k ? (k % 2 ? 1 : -1) / k : 0), R: 1, xr: [-1.5, 2.5], yr: [-3, 2] },
      lor: { label: '1 / (1 + x²)', f: (x) => 1 / (1 + x * x), a: (k) => (k % 2 ? 0 : ((k / 2) % 2 ? -1 : 1)), R: 1, xr: [-2.5, 2.5], yr: [-1, 2] },
    };
    let key = 'lor'; let N = 8;
    const c = controls(mount);
    const sel = c.select('函数', Object.entries(fns).map(([k, f]) => [k, f.label]), (k) => { key = k; draw(); });
    sel.value = key;
    c.slider('阶数 N =', { min: 0, max: 40, step: 1, value: N }, (x) => { N = x; draw(); });
    const s = stage(mount, 0.55, () => draw());
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const F = fns[key];
      const v = view(s, F.xr, F.yr, { pad: 14 });
      axes(s, v, pl, { xstep: key === 'sin' ? 2 : 0.5, ystep: key === 'exp' ? 2 : 0.5 });
      const { ctx } = s;
      if (Number.isFinite(F.R)) {
        ctx.fillStyle = rgba(hexToRgb(pl.a4), 0.12);
        ctx.fillRect(v.X(-F.R), 0, v.X(F.R) - v.X(-F.R), s.h);
      }
      const P = (x) => { let sum = 0; let xp = 1; for (let k = 0; k <= N; k++) { sum += F.a(k) * xp; xp *= x; } return sum; };
      plot(s, v, F.f, pl.muted, { width: 2.5 });
      plot(s, v, P, pl.accent, { width: 2 });
      const R = Number.isFinite(F.R) ? `R = ${F.R}（绿色带为收敛区间）` : 'R = ∞';
      const extra = key === 'lor' ? '。1/(1+x²) 在整个实轴上光滑，但收敛半径只有 1：障碍来自复平面上的奇点 ±i。' : '。';
      s.readout.textContent = `${F.label} 的 ${N} 阶 Taylor 多项式；${R}${extra}`;
    }
  };

  // 第 5 章：Fourier 部分和与 Fejér 平均
  DEMOS.fourier = (mount) => {
    const fns = {
      square: { label: '方波 sgn(x)', f: (x) => Math.sign(Math.sin(x)), coef: (k) => (k % 2 ? [0, 4 / (Math.PI * k)] : [0, 0]), a0: 0, yr: [-1.6, 1.6] },
      saw: { label: '锯齿波 x', f: (x) => { const t = ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return t; }, coef: (k) => [0, (2 * (k % 2 ? 1 : -1)) / k], a0: 0, yr: [-4, 4] },
      tri: { label: '三角波 |x|', f: (x) => { const t = ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return Math.abs(t); }, coef: (k) => (k % 2 ? [-4 / (Math.PI * k * k), 0] : [0, 0]), a0: Math.PI, yr: [-0.5, 3.8] },
    };
    let key = 'square'; let N = 15; let fejer = false;
    const c = controls(mount);
    c.select('函数', Object.entries(fns).map(([k, f]) => [k, f.label]), (k) => { key = k; draw(); });
    c.slider('N =', { min: 1, max: 150, step: 1, value: N }, (x) => { N = x; draw(); });
    const btn = c.button('切换到 Fejér 平均 σ_N', () => { fejer = !fejer; btn.textContent = fejer ? '切换到部分和 S_N' : '切换到 Fejér 平均 σ_N'; draw(); });
    const s = stage(mount, 0.5, () => draw());
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const F = fns[key];
      const v = view(s, [-2 * Math.PI, 2 * Math.PI], F.yr, { pad: 14 });
      axes(s, v, pl, { xstep: Math.PI / 2, ystep: 1, labels: false });
      const coefs = [];
      for (let k = 1; k <= N; k++) coefs.push(F.coef(k));
      const S = (x) => {
        let sum = F.a0 / 2;
        for (let k = 1; k <= N; k++) {
          const w = fejer ? 1 - k / (N + 1) : 1;
          const [a, b] = coefs[k - 1];
          sum += w * (a * Math.cos(k * x) + b * Math.sin(k * x));
        }
        return sum;
      };
      plot(s, v, F.f, pl.muted, { width: 2, steps: 2000 });
      plot(s, v, S, fejer ? pl.a2 : pl.accent, { width: 2, steps: 2400 });
      let text = `${fejer ? 'Fejér 平均 σ_N' : '部分和 S_N'}，N = ${N}。`;
      if (key === 'square') {
        let m = -Infinity;
        for (let i = 1; i <= 3000; i++) m = Math.max(m, S((i / 3000) * Math.PI));
        text += ` (0, π) 上的最大值 ≈ ${m.toFixed(4)}，过冲 ≈ ${((m - 1) / 2 * 100).toFixed(2)}% × 跳跃高度`;
        text += fejer ? '：Fejér 平均没有过冲。' : '（Gibbs 常数约 8.95%，N 增大也不消失）。';
      }
      s.readout.textContent = text;
    }
  };

  // 第 8 章：方向场与解曲线
  DEMOS.slopefield = (mount) => {
    const eqs = {
      lin: { label: "y' = t − y", f: (t, y) => t - y },
      logi: { label: "y' = y(1 − y)", f: (t, y) => y * (1 - y) },
      blow: { label: "y' = y²（爆破）", f: (t, y) => y * y },
      peano: { label: "y' = 3 y^{2/3}（不唯一）", f: (t, y) => 3 * Math.cbrt(y * y) },
      osc: { label: "y' = −t y", f: (t, y) => -t * y },
    };
    let key = 'lin';
    let seeds = [[0, 1], [0, -1], [-2, 2]];
    const c = controls(mount);
    c.select('方程', Object.entries(eqs).map(([k, e]) => [k, e.label]), (k) => { key = k; seeds = k === 'peano' ? [[0, 0], [-1, -1]] : [[0, 1], [0, -1]]; draw(); });
    c.button('清除解曲线', () => { seeds = []; draw(); });
    const s = stage(mount, 0.6, () => draw());
    let v;
    s.canvas.style.cursor = 'crosshair';
    s.canvas.addEventListener('click', (e) => {
      const r = s.canvas.getBoundingClientRect();
      seeds.push([v.ix(e.clientX - r.left), v.iy(e.clientY - r.top)]);
      draw();
    });
    function integrate(f, t0, y0, dir, tEnd) {
      const pts = [[t0, y0]];
      let t = t0; let y = y0; const h = 0.01 * dir;
      for (let i = 0; i < 4000; i++) {
        const k1 = f(t, y); const k2 = f(t + h / 2, y + (h / 2) * k1);
        const k3 = f(t + h / 2, y + (h / 2) * k2); const k4 = f(t + h, y + h * k3);
        y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4); t += h;
        if (!Number.isFinite(y) || Math.abs(y) > 50 || (dir > 0 ? t > tEnd : t < tEnd)) break;
        pts.push([t, y]);
      }
      return pts;
    }
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const f = eqs[key].f;
      v = view(s, [-4, 4], [-3, 3], { equal: true, pad: 12 });
      axes(s, v, pl, { xstep: 1, ystep: 1 });
      const { ctx } = s;
      ctx.strokeStyle = pl.muted; ctx.lineWidth = 1;
      const step = 0.4;
      ctx.beginPath();
      for (let t = Math.ceil(v.x0 / step) * step; t <= v.x1; t += step) {
        for (let y = Math.ceil(v.y0 / step) * step; y <= v.y1; y += step) {
          const m = f(t, y);
          const L = 0.14 / Math.sqrt(1 + m * m);
          ctx.moveTo(v.X(t - L), v.Y(y - m * L)); ctx.lineTo(v.X(t + L), v.Y(y + m * L));
        }
      }
      ctx.stroke();
      ctx.lineWidth = 2.2; ctx.strokeStyle = pl.accent;
      for (const [t0, y0] of seeds) {
        for (const dir of [1, -1]) {
          const pts = integrate(f, t0, y0, dir, dir > 0 ? v.x1 : v.x0);
          ctx.beginPath();
          pts.forEach(([t, y], i) => (i ? ctx.lineTo(v.X(t), v.Y(y)) : ctx.moveTo(v.X(t), v.Y(y))));
          ctx.stroke();
        }
        ctx.fillStyle = pl.a3;
        ctx.beginPath(); ctx.arc(v.X(t0), v.Y(y0), 4, 0, 2 * Math.PI); ctx.fill();
      }
      const note = key === 'peano'
        ? '从 y(0) = 0 出发，数值方法给出 y ≡ 0，但 y = (t − c)³（t ≥ c）也是解：Lipschitz 条件不成立时唯一性失效。'
        : key === 'blow' ? '解 y = 1/(c − t) 在有限时间内趋于无穷：解的最大存在区间可以是有界的。' : '点击画布可以添加初值条件。';
      s.readout.textContent = note;
    }
  };

  // 第 9 章：等高线与梯度
  DEMOS.gradient = (mount) => {
    const fns = {
      bowl: { label: 'x² + 3y²', f: (x, y) => x * x + 3 * y * y, step: 0.5 },
      saddle: { label: 'x² − y²（鞍点）', f: (x, y) => x * x - y * y, step: 0.5 },
      peaks: { label: 'x·exp(−x²−y²)', f: (x, y) => x * Math.exp(-x * x - y * y), step: 0.05 },
      monkey: { label: 'x³ − 3xy²（猴鞍）', f: (x, y) => x ** 3 - 3 * x * y * y, step: 0.4 },
    };
    let key = 'peaks';
    let hover = null;
    let cache = null;
    // 背景色图只在函数、尺寸或主题变化时重算，指针移动时只重画叠加层
    function heatmap(F, pl, W, H) {
      const dpr = window.devicePixelRatio || 1;
      const img = s.ctx.createImageData(W, H);
      const bg = hexToRgb(pl.bg.startsWith('#') ? pl.bg : '#f5f5f7');
      const hi = hexToRgb(pl.accent); const lo = hexToRgb(pl.a3);
      const vals = new Float32Array(W * H);
      let vmax = 0;
      for (let j = 0; j < H; j++) {
        for (let i = 0; i < W; i++) {
          const val = F.f(v.ix(i / dpr), v.iy(j / dpr));
          vals[j * W + i] = val; vmax = Math.max(vmax, Math.abs(val));
        }
      }
      for (let k = 0; k < vals.length; k++) {
        const val = vals[k];
        const t = Math.min(1, Math.abs(val) / (vmax || 1));
        let col = mix(bg, val >= 0 ? hi : lo, 0.08 + 0.42 * t);
        // 到最近等值线的距离（以像素计）< 1 时画线，避免平坦区域被整片涂色
        const i = k % W;
        const j = (k - i) / W;
        const gx = i + 1 < W ? vals[k + 1] - val : val - vals[k - 1];
        const gy = j + 1 < H ? vals[k + W] - val : val - vals[k - W];
        const g = Math.hypot(gx, gy);
        const off = Math.abs(val - F.step * Math.round(val / F.step));
        if (g > 0 && off < 0.9 * g * dpr) col = mix(col, val >= 0 ? hi : lo, 0.65);
        img.data[4 * k] = col[0]; img.data[4 * k + 1] = col[1]; img.data[4 * k + 2] = col[2]; img.data[4 * k + 3] = 255;
      }
      return img;
    }
    const c = controls(mount);
    const sel = c.select('函数', Object.entries(fns).map(([k, f]) => [k, f.label]), (k) => { key = k; draw(); });
    sel.value = key;
    const s = stage(mount, 0.62, () => draw());
    let v;
    s.canvas.addEventListener('pointermove', (e) => {
      const r = s.canvas.getBoundingClientRect();
      hover = [v.ix(e.clientX - r.left), v.iy(e.clientY - r.top)];
      draw();
    });
    s.canvas.addEventListener('pointerleave', () => { hover = null; draw(); });
    const grad = (f, x, y) => { const h = 1e-4; return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)]; };
    function draw() {
      if (!s.w) return;
      const pl = palette();
      const F = fns[key];
      v = view(s, [-2, 2], [-1.5, 1.5], { equal: true, pad: 0 });
      const { ctx } = s;
      const W = s.canvas.width; const H = s.canvas.height;
      const sig = [key, W, H, pl.bg, pl.accent, pl.a3].join('|');
      if (!cache || cache.sig !== sig) cache = { sig, img: heatmap(F, pl, W, H) };
      const { img } = cache;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.putImageData(img, 0, 0); ctx.restore();
      ctx.strokeStyle = pl.text; ctx.fillStyle = pl.text; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.55;
      for (let x = -1.8; x <= 1.81; x += 0.3) {
        for (let y = -1.35; y <= 1.36; y += 0.3) {
          const [gx, gy] = grad(F.f, x, y);
          const n = Math.hypot(gx, gy);
          if (n < 1e-6) continue;
          arrow(ctx, v.X(x), v.Y(y), v.X(x + (0.12 * gx) / n), v.Y(y + (0.12 * gy) / n));
        }
      }
      ctx.globalAlpha = 1;
      if (hover) {
        const [x, y] = hover;
        const [gx, gy] = grad(F.f, x, y);
        const n = Math.hypot(gx, gy) || 1;
        ctx.strokeStyle = pl.a4; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(v.X(x - (0.4 * gy) / n), v.Y(y + (0.4 * gx) / n)); ctx.lineTo(v.X(x + (0.4 * gy) / n), v.Y(y - (0.4 * gx) / n)); ctx.stroke();
        ctx.strokeStyle = pl.text; ctx.fillStyle = pl.text; ctx.lineWidth = 2.5;
        arrow(ctx, v.X(x), v.Y(y), v.X(x + (0.35 * gx) / n), v.Y(y + (0.35 * gy) / n));
        s.readout.textContent = `(x, y) = (${x.toFixed(2)}, ${y.toFixed(2)})：f = ${F.f(x, y).toFixed(3)}，∇f = (${gx.toFixed(3)}, ${gy.toFixed(3)})。粗箭头是梯度，绿色线段是等高线的切线，二者垂直。`;
      } else {
        s.readout.textContent = '把指针移到图上：梯度垂直于等高线，指向函数增长最快的方向。';
      }
    }
    function arrow(ctx, x0, y0, x1, y1) {
      const a = Math.atan2(y1 - y0, x1 - x0); const L = 5;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - L * Math.cos(a - 0.45), y1 - L * Math.sin(a - 0.45));
      ctx.lineTo(x1 - L * Math.cos(a + 0.45), y1 - L * Math.sin(a + 0.45));
      ctx.closePath(); ctx.fill();
    }
  };

  document.querySelectorAll('figure.demo[data-demo]').forEach((fig) => {
    const mount = fig.querySelector('.demo-mount');
    const make = DEMOS[fig.dataset.demo];
    if (make) make(mount);
  });
})();
