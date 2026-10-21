  // —— 核心：工具、章节登记、收藏、样品格的挂载与清理 ——
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const ICON = {
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15.3 3.5 9.6C3.5 6.8 5.6 4.8 8.1 4.8c1.6 0 3 .8 3.9 2.1.9-1.3 2.3-2.1 3.9-2.1 2.5 0 4.6 2 4.6 4.8 0 5.7-8.5 10.9-8.5 10.9z"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5"/></svg>',
    replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };

  // 章节：S 是十种完整风格，其余章节由各自的文件用 registerPages 登记页面
  const CHAPTERS = [
    { id: 'S', name: '整体风格', en: 'Complete looks', desc: '十种完整的网页风格，排同一段数学内容。先在这里定大方向。' },
    { id: 'A', name: '艺术风格与背景', en: 'Art movements & backgrounds', desc: '从新艺术运动到蒸汽波：每种艺术风格做成一张背景，看它长什么样、叫什么名字。' },
    { id: 'C', name: '配色', en: 'Colour', desc: '配色关系（互补、类似……）和十几套现成色板，每套都套在同一个小界面上。' },
    { id: 'F', name: '字体', en: 'Typefaces', desc: '西文字体的分类和中文字体的门类，可以输入自己的文字试排。' },
    { id: 'T', name: '排版参数', en: 'Typography settings', desc: '字号、行距、字距、行宽、段距、对齐：拖滑块看效果，记下数值。' },
    { id: 'L', name: '版式布局', en: 'Layouts', desc: '页面的骨架：单栏、双栏、便当盒、分屏、杂志式……用线框图表示。' },
    { id: 'K', name: '质感', en: 'Shape & depth', desc: '圆角、阴影、描边、玻璃、内凹：决定界面「软」还是「硬」、「平」还是「立体」。' },
    { id: 'B', name: '按钮', en: 'Buttons', desc: '按钮的外形和按下去的反馈。都可以点。' },
    { id: 'I', name: '文本框', en: 'Text fields', desc: '输入框的样式、标签的位置、出错时的样子。都可以输入。' },
    { id: 'M', name: '动效', en: 'Motion', desc: '缓动曲线、入场、反馈、滚动和氛围动画。右下角 ↻ 可重播。' },
    { id: 'P', name: '页面切换', en: 'Page transitions', desc: '从一页到另一页的方式：淡入、推入、翻转、展开……每个都是一部小手机。' },
    { id: 'R', name: '大企业参考', en: 'Design languages', desc: '十几家大公司的设计语言，按它们公开的设计规范重画（不是截图）。' }
  ];
  const REG = [];
  const registerPages = (chapter, pages) => pages.forEach((p) => REG.push({ ...p, chapter }));
  const chapterOf = (id) => CHAPTERS.find((c) => c.id === id);

  // 收藏：存编号（S02、A11……）；旧版存的是风格 id，在 90-pages 里迁移
  const store = {
    get() {
      try {
        const v = JSON.parse(localStorage.getItem('specimen-favs-v2') || 'null');
        if (Array.isArray(v)) return v;
        const old = JSON.parse(localStorage.getItem('specimen-favs') || '[]');
        return Array.isArray(old) ? old : [];
      } catch { return []; }
    },
    set(v) { try { localStorage.setItem('specimen-favs-v2', JSON.stringify(v)); } catch { /* 无痕模式下忽略 */ } }
  };
  let favs = store.get();
  const isFav = (code) => favs.includes(code);
  const favBtn = (code, small = false) => {
    const on = isFav(code);
    return `<button class="fav${small ? ' sm' : ''}${on ? ' on' : ''}" type="button" aria-pressed="${on}" data-fav="${code}" aria-label="收藏 ${code}">${ICON.heart}${small ? '' : `<span>${on ? '已收藏' : '收藏'}</span>`}</button>`;
  };

  // 动效总开关：关掉时暂停样品里的 CSS 动画和脚本循环
  let motionOn = !reduce;
  try { const m = localStorage.getItem('specimen-motion'); if (m) motionOn = m === 'on'; } catch { /* 忽略 */ }

  // 只让看得见的样品跑循环
  const seen = new IntersectionObserver((es) => es.forEach((e) => { e.target._vis = e.isIntersecting; }), { rootMargin: '120px' });

  // ctx：给样品的 init 用。所有定时器、监听、动画帧都登记在这里，翻页或关闭放大时统一清理
  function makeCtx(stage, zoom) {
    const bin = [];
    const live = () => motionOn && stage._vis !== false && stage.isConnected;
    return {
      zoom,
      motion: () => motionOn,
      on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); bin.push(() => t.removeEventListener(ev, fn, opt)); },
      every(ms, fn) { const id = setInterval(() => { if (live()) fn(); }, ms); bin.push(() => clearInterval(id)); return id; },
      later(ms, fn) { const id = setTimeout(fn, ms); bin.push(() => clearTimeout(id)); return id; },
      loop(fn) {
        let id, last = performance.now();
        const f = (t) => { const dt = Math.min(64, t - last); last = t; if (live()) fn(t, dt); id = requestAnimationFrame(f); };
        id = requestAnimationFrame(f);
        bin.push(() => cancelAnimationFrame(id));
      },
      add(fn) { bin.push(fn); },
      dispose() { bin.splice(0).forEach((f) => { try { f(); } catch { /* 忽略 */ } }); }
    };
  }
  function mountTile(stage, t, zoom = false) {
    if (stage._ctx) stage._ctx.dispose();
    stage.innerHTML = t.html;
    const ctx = makeCtx(stage, zoom);
    stage._ctx = ctx;
    if (!zoom) seen.observe(stage);
    if (t.init) {
      try { const r = t.init(stage, ctx); if (typeof r === 'function') ctx.add(r); }
      catch (err) { console.error(`样品 ${t.code} 初始化失败`, err); }
    }
    return ctx;
  }

  const ratioOf = (t) => t.ratio || (t.wide ? '16 / 7' : '4 / 3');
  function tileHTML(t) {
    const sub = [t.en, t.meta].filter(Boolean).map(esc).join(' · ');
    return `<figure class="tile${t.wide ? ' wide' : ''}" data-code="${t.code}" id="tile-${t.code}">
      <div class="t-stage${t.dark ? ' dark' : ''}" style="aspect-ratio:${ratioOf(t)};${t.bg ? `background:${t.bg};` : ''}"></div>
      <figcaption class="t-cap">
        <div class="t-head"><code class="t-code">${t.code}</code><span class="t-name">${t.name}</span>
          ${favBtn(t.code, true)}
          <button class="t-btn" type="button" data-zoom="${t.code}" aria-label="放大 ${t.code}">${ICON.zoom}</button></div>
        ${sub ? `<p class="t-en">${sub}</p>` : ''}
        <p class="t-desc">${t.desc}</p>
        ${t.kw?.length ? `<ul class="t-kw">${t.kw.map((k) => `<li>${k}</li>`).join('')}</ul>` : ''}
      </figcaption>
    </figure>`;
  }
  // 样品里可以放这个按钮，点了以后整格重新挂载（用于重播入场动画）
  const replayBtn = '<button class="t-replay" type="button" aria-label="重播">' + ICON.replay + '</button>';
