  // —— 样品的交互 ——
  function bindSpecimen(root, id) {
    const cfg = PLOT[id];
    const state = { N: 7 };
    const svg = root.querySelector('svg.plot');
    const odd = (n) => Math.max(1, Math.min(19, Math.round((n - 1) / 2) * 2 + 1));
    const update = () => {
      drawPlot(svg, state.N, cfg);
      const e = fmtErr(maxErr(state.N));
      root.querySelectorAll('.n-out').forEach((el) => { el.textContent = state.N; });
      root.querySelectorAll('.err-out').forEach((el) => { el.textContent = e; });
      root.querySelectorAll('.reach-out').forEach((el) => { el.textContent = reach(state.N).toFixed(1); });
      root.querySelectorAll('.n-range').forEach((el) => { el.value = state.N; });
      root.querySelectorAll('.scrub').forEach((el) => { el.textContent = state.N; el.setAttribute('aria-valuenow', state.N); });
      root.querySelectorAll('[data-n]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.n === state.N)));
    };
    const set = (n) => { const v = odd(n); if (v !== state.N) { state.N = v; update(); } };
    root.querySelectorAll('.n-range').forEach((el) => el.addEventListener('input', () => set(+el.value)));
    root.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => set(state.N + +b.dataset.d)));
    root.querySelectorAll('[data-n]').forEach((b) => b.addEventListener('click', () => set(+b.dataset.n)));

    root.querySelectorAll('.proof-toggle').forEach((btn) => {
      const proof = btn.parentElement.querySelector('.proof') || btn.closest('section, div').querySelector('.proof');
      btn.addEventListener('click', () => {
        const open = proof.hidden;
        proof.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
      });
    });

    // 可拖动的数字
    root.querySelectorAll('.scrub').forEach((sc) => {
      let drag = false, x0 = 0, n0 = 0;
      sc.addEventListener('pointerdown', (e) => { drag = true; x0 = e.clientX; n0 = state.N; sc.setPointerCapture(e.pointerId); sc.classList.add('active'); e.preventDefault(); });
      sc.addEventListener('pointermove', (e) => { if (drag) set(n0 + 2 * Math.round((e.clientX - x0) / 16)); });
      const end = () => { drag = false; sc.classList.remove('active'); };
      sc.addEventListener('pointerup', end); sc.addEventListener('pointercancel', end);
      sc.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(state.N + 2); e.preventDefault(); e.stopPropagation(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(state.N - 2); e.preventDefault(); e.stopPropagation(); }
      });
    });

    // 旁注（窄屏时点编号展开）
    root.querySelectorAll('.sn-ref').forEach((r) => r.addEventListener('click', () => r.nextElementSibling?.classList.toggle('open')));

    // 分步揭示
    const next = root.querySelector('.x-next');
    if (next) next.addEventListener('click', () => {
      const h = root.querySelector('.x-steps li[hidden]');
      if (h) h.hidden = false;
      if (!root.querySelector('.x-steps li[hidden]')) { next.disabled = true; next.textContent = '推理完毕'; }
    });

    // 播放：阶数从 1 增加到 19
    const play = root.querySelector('.c-play');
    if (play) play.addEventListener('click', () => {
      play.disabled = true; let n = 1; set(n);
      const t = setInterval(() => {
        n += 2;
        if (n > 19 || !root.isConnected) { clearInterval(t); play.disabled = false; return; }
        set(n);
      }, reduce ? 300 : 900);
    });

    // 发布会：链接滚动到对应区块
    root.querySelectorAll('[data-goto]').forEach((b) => b.addEventListener('click', () => {
      const target = root.querySelector(`[data-anchor="${b.dataset.goto}"]`);
      target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (b.dataset.goto === 'proof') { const t = target.querySelector('.proof-toggle'); if (t && t.getAttribute('aria-expanded') !== 'true') t.click(); }
    }));

    // 暗色工程：键盘快捷键
    if (root.classList.contains('sp-dark')) {
      root.addEventListener('keydown', (e) => {
        if (e.key === '[') { set(state.N - 2); e.preventDefault(); }
        if (e.key === ']') { set(state.N + 2); e.preventDefault(); }
      });
    }

    // 瑞士网格：显示网格
    const gb = root.querySelector('.s-gridbtn');
    if (gb) gb.addEventListener('click', () => {
      const ov = root.querySelector('.s-overlay');
      ov.hidden = !ov.hidden;
      gb.setAttribute('aria-pressed', String(!ov.hidden));
      gb.textContent = ov.hidden ? '显示网格' : '隐藏网格';
    });

    update();
  }

