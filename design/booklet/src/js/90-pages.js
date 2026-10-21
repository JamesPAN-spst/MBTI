  // —— 页面装配 ——
  const PAGES = [
    { type: 'cover', token: 'cover', title: '封面' },
    { type: 'guide', token: 'guide', title: '怎么用这本册子' },
    { type: 'contents', token: 'contents', title: '目录' },
    ...STYLES.map((s) => ({ type: 'style', token: s.id, chapter: 'S', title: s.name, style: s, code: `S${s.no}` })),
    ...CHAPTERS.filter((c) => c.id !== 'S').flatMap((c) => REG.filter((p) => p.chapter === c.id)),
    { type: 'glossary', token: 'glossary', title: '术语表' },
    { type: 'summary', token: 'summary', title: '我的选择' }
  ];
  // 每章内的页序，用于眉题「A · 2 / 4」
  for (const c of CHAPTERS) {
    const ps = PAGES.filter((p) => p.chapter === c.id);
    ps.forEach((p, i) => { p.k = i + 1; p.n = ps.length; });
  }
  // 编号索引：编号 → { 样品, 页 }
  const INDEX = new Map();
  for (const p of PAGES) {
    if (p.type === 'style') INDEX.set(p.code, { name: p.style.name, page: p });
    for (const t of p.tiles || []) {
      if (INDEX.has(t.code)) console.warn('编号重复', t.code);
      INDEX.set(t.code, { name: t.name, page: p, tile: t });
    }
  }
  // 旧版收藏（风格 id）迁移为编号，并丢掉已不存在的编号
  favs = favs.map((x) => { const s = STYLES.find((st) => st.id === x); return s ? `S${s.no}` : x; }).filter((c) => INDEX.has(c));
  store.set(favs);

  const stage = document.getElementById('stage');
  const pno = document.getElementById('pno');
  const barTitle = document.getElementById('bar-title');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const favN = document.getElementById('fav-n');
  const motionBtn = document.getElementById('motion-btn');
  let cur = 0;
  let pageCtx = null;
  const dots = (k) => Array.from({ length: 5 }, (_, i) => `<span class="dot${i < k ? ' on' : ''}"></span>`).join('');
  const swVars = (s) => `--c-bg:${s.bg};--c-ink:${s.ink};--c-accent:${s.accent}`;
  const pageIndex = (t) => PAGES.findIndex((p) => p.token === t);
  const goToken = (t, code) => { const i = pageIndex(t); if (i >= 0) go(i, undefined, code); };
  const goCode = (code) => { const hit = INDEX.get(code.toUpperCase()); if (hit) goToken(hit.page.token, code.toUpperCase()); return !!hit; };
  const tileCount = (c) => [...INDEX.keys()].filter((k) => k[0] === c).length;
  const eyebrow = (p) => {
    const c = chapterOf(p.chapter);
    return `<p class="g-eyebrow"><span class="g-badge">${c.id}</span>${c.name}<span class="g-of">${p.k} / ${p.n}</span></p>`;
  };

  function coverPage() {
    const el = document.createElement('article');
    el.className = 'spread single';
    const total = INDEX.size;
    el.innerHTML = `<div class="leaf"><div class="cover">
      <div>
        <p class="c-eyebrow">数学分析 L2 · 设计提案 · 第二版 · 2026 年 10 月</p>
        <h1 class="c-title">风格<br><em>样品册</em></h1>
        <p class="c-sub">十种完整风格，加上 ${total - 10} 个零件样品：背景艺术、配色、字体、排版、布局、质感、按钮、文本框、动效、页面切换，和十几家大公司的设计语言。每个样品都有编号，看中了就收藏，最后一页一键复制给我。</p>
        <ul class="c-howto">
          <li><kbd>←</kbd><kbd>→</kbd>翻页</li>
          <li>点 <span class="c-ico">${ICON.zoom}</span> 放大样品</li>
          <li>点 <span class="c-ico">${ICON.heart}</span> 收藏</li>
        </ul>
        <div class="c-actions">
          <button class="c-start" type="button" data-token="guide">先看怎么用</button>
          <button class="c-start ghost" type="button" data-token="contents">直接看目录</button>
        </div>
      </div>
      <div class="fan" role="list" aria-label="十种风格">
        ${STYLES.map((s, i) => `<button class="fan-card" role="listitem" type="button" data-token="${s.id}" style="--i:${i};${swVars(s)}" aria-label="S${s.no} ${s.name}">
          <span class="fc-no">S${s.no}</span>
          <span class="fc-name">${s.name}</span>
          <span class="fc-glyph" style="font-family:${s.font}">Aa<i>幂级数</i></span>
        </button>`).join('')}
      </div>
    </div></div>`;
    return el;
  }

  function guidePage() {
    const el = document.createElement('article');
    el.className = 'spread single';
    const rows = [
      ['整体风格', 'S', 'S02'], ['背景 / 艺术风格', 'A', 'A18'], ['配色', 'C', 'C03'], ['字体', 'F', 'F15'],
      ['排版参数', 'T', 'T04'], ['布局', 'L', 'L02'], ['质感', 'K', 'K05'], ['按钮', 'B', 'B03'],
      ['文本框', 'I', 'I04'], ['动效', 'M', 'M04'], ['页面切换', 'P', 'P02'], ['参考', 'R', 'R01']
    ];
    el.innerHTML = `<div class="leaf"><div class="page guide">
      <h1 class="p-title">怎么用这本册子</h1>
      <p class="p-lede">设计里最难的是「说清楚想要什么」。这本册子把常见的风格和零件都做成了带编号的样品——你不需要会画画，只要会指：「我要这个」。</p>
      <div class="gd-steps">
        <section class="gd-step"><b>1</b><h3>翻、看、点</h3><p>每个样品都是活的：按钮能按，输入框能打字，动画能重播。点 <span class="c-ico">${ICON.zoom}</span> 放大看细节和对应的 CSS。</p></section>
        <section class="gd-step"><b>2</b><h3>收藏</h3><p>看中的点 <span class="c-ico">${ICON.heart}</span>。顶栏的 ♥ 数字会增加，最后一页「我的选择」按章节汇总。</p></section>
        <section class="gd-step"><b>3</b><h3>复制给我</h3><p>在「我的选择」点复制，粘贴到对话里。也可以直接打编号，比如「按钮 B03，背景 A18」。</p></section>
      </div>
      <h2 class="gd-h">一份完整的描述长这样</h2>
      <div class="gd-formula">
        ${rows.map(([n, c, ex]) => `<button class="gd-slot" type="button" data-chap="${c}"><span>${n}</span><code>${ex}</code></button>`).join('')}
      </div>
      <p class="gd-note">不必每项都选。没选的部分，我会按「整体风格」补齐。点上面任意一格可以跳到那一章。</p>
      <h2 class="gd-h">可以这样修饰</h2>
      <ul class="gd-say">
        <li><q>按钮用 B05，但圆角改成 K03 那样</q><span>组合两个样品</span></li>
        <li><q>A11 的纹样，颜色换成 C07</q><span>借形不借色</span></li>
        <li><q>比 M04 更慢、更轻一点</q><span>在样品基础上调程度</span></li>
        <li><q>整体像 R03，但是暗色</q><span>参考大企业的设计语言</span></li>
        <li><q>行距 1.8，行宽 36 字</q><span>排版页的滑块会直接给你数值</span></li>
      </ul>
      <h2 class="gd-h">几点说明</h2>
      <ul class="gd-notes">
        <li>所有样品都用代码现场绘制，没有用图片，所以放大不会糊，也能直接搬进网站。</li>
        <li>「大企业参考」一章是按各家公开的设计规范<strong>重画</strong>的设计语言，不是截图，不含商标；颜色与字体为近似值，每张都附了官网链接，可以对照着看。</li>
        <li>不知道某个词什么意思，翻到书末的「术语表」。</li>
        <li>顶栏「动效」按钮可以暂停所有动画。</li>
      </ul>
      <div class="gd-jump">
        <label for="gd-code">知道编号？直接跳过去</label>
        <div><input id="gd-code" class="code-in" placeholder="例如 B07" autocomplete="off" spellcheck="false" maxlength="4"><button class="c-start sm" type="button" data-jump="#gd-code">跳转</button></div>
        <span class="code-msg" aria-live="polite"></span>
      </div>
    </div></div>`;
    return el;
  }

  function contentsPage() {
    const el = document.createElement('article');
    el.className = 'spread single';
    const chap = (c) => {
      const ps = PAGES.filter((p) => p.chapter === c.id);
      if (!ps.length) return '';
      const body = c.id === 'S'
        ? `<div class="toc-grid">${STYLES.map((s) => `<button class="toc-card" type="button" data-token="${s.id}">
            <span class="toc-sw" style="${swVars(s)};font-family:${s.font}">Aa</span>
            <span class="toc-text">
              <span class="toc-no">S${s.no}${isFav(`S${s.no}`) ? ' <span class="toc-fav">♥</span>' : ''}</span>
              <span class="toc-name">${s.name}</span>
              <span class="toc-tag">${s.tag}</span>
            </span></button>`).join('')}</div>`
        : `<div class="toc-pages">${ps.map((p) => {
            const codes = (p.tiles || []).map((t) => t.code);
            const range = codes.length ? `${codes[0]}–${codes[codes.length - 1]}` : '可调试';
            const nf = codes.filter(isFav).length;
            return `<button class="toc-page" type="button" data-token="${p.token}"><span class="tp-range">${range}</span><span class="tp-name">${p.title}</span><span class="tp-n">${codes.length ? `${codes.length} 个` : ''}${nf ? ` · ♥${nf}` : ''}</span></button>`;
          }).join('')}</div>`;
      return `<section class="toc-chap" id="chap-${c.id}">
        <header><span class="g-badge lg">${c.id}</span><div><h2>${c.name}<small>${c.en}</small></h2><p>${c.desc}</p></div><span class="toc-count">${tileCount(c.id)} 个样品</span></header>
        ${body}
      </section>`;
    };
    el.innerHTML = `<div class="leaf"><div class="page">
      <div class="toc-top">
        <div><h1 class="p-title">目录</h1>
        <p class="p-lede">十二章，${INDEX.size} 个带编号的样品。字母是章节，数字是序号。</p></div>
        <div class="gd-jump compact"><label for="toc-code">按编号跳转</label>
          <div><input id="toc-code" class="code-in" placeholder="B07" autocomplete="off" spellcheck="false" maxlength="4"><button class="c-start sm" type="button" data-jump="#toc-code">跳转</button></div>
          <span class="code-msg" aria-live="polite"></span></div>
      </div>
      ${CHAPTERS.map(chap).join('')}
      <section class="toc-chap"><header><span class="g-badge lg">+</span><div><h2>附录</h2><p>术语表，和你收藏的汇总。</p></div></header>
        <div class="toc-pages"><button class="toc-page" type="button" data-token="glossary"><span class="tp-range">词</span><span class="tp-name">术语表</span><span class="tp-n">${GLOSSARY.reduce((a, g) => a + g.items.length, 0)} 个词</span></button>
        <button class="toc-page" type="button" data-token="summary"><span class="tp-range">♥</span><span class="tp-name">我的选择</span><span class="tp-n">${favs.length} 个收藏</span></button></div>
      </section>
    </div></div>`;
    return el;
  }

  function stylePage(s) {
    const el = document.createElement('article');
    el.className = 'spread';
    const code = `S${s.no}`;
    el.innerHTML = `<section class="leaf notes" aria-label="${s.name}：说明">
      <div class="n-head"><span><strong>${code}</strong> · 整体风格 ${Number(s.no)} / 10</span>${favBtn(code)}</div>
      <h2 class="n-name" style="font-family:${s.font}">${s.name}</h2>
      <p class="n-orig">${esc(s.orig)}</p>
      <p class="n-desc">${s.desc}</p>
      <h3 class="n-label">代表案例</h3>
      <ul class="n-cases">${s.cases.map(([t, u]) => `<li>${u ? `<a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>` : `<span>${esc(t)}</span>`}</li>`).join('')}</ul>
      <h3 class="n-label">关键手法</h3>
      <ul class="n-moves">${s.moves.map((m) => `<li>${m}</li>`).join('')}</ul>
      <h3 class="n-label">字体</h3>
      <div class="n-fonts">${s.fonts.map(([n, f, t]) => `<div class="n-font"><span class="n-font-sample" style="font-family:${f}">${t}</span><span class="n-font-name">${esc(n)}</span></div>`).join('')}</div>
      <h3 class="n-label">色板</h3>
      <div class="n-swatches">${s.palette.map(([n, h]) => `<div class="sw"><i style="--c:${h}"></i><b>${n}</b><code>${h}</code></div>`).join('')}</div>
      ${s.pnote ? `<p class="n-pnote">${s.pnote}</p>` : ''}
      <h3 class="n-label">用在数学课本上</h3>
      <dl class="n-ratings">${CRIT.map((c, i) => `<div class="r-row"><dt>${c}</dt><dd aria-label="${s.r[i]} 分（满分 5）">${dots(s.r[i])}</dd></div>`).join('')}</dl>
      <p class="n-cost">实现成本：${s.cost}</p>
      <div class="n-fit"><p><b>适合</b><span>${s.good}</span></p><p><b>不适合</b><span>${s.bad}</span></p></div>
    </section>
    <section class="leaf specimen" aria-label="${s.name}：样品"></section>`;
    const holder = el.querySelector('.specimen');
    holder.appendChild(document.getElementById(`tpl-${s.id}`).content.cloneNode(true));
    bindSpecimen(holder.querySelector('.sp'), s.id);
    return el;
  }

  function pageHead(p) {
    return `<header class="g-head">${eyebrow(p)}<h1 class="p-title">${p.title}</h1>${p.intro ? `<p class="p-lede">${p.intro}</p>` : ''}</header>`;
  }

  function galleryPage(p) {
    const el = document.createElement('article');
    el.className = 'spread single';
    el.innerHTML = `<div class="leaf"><div class="page gallery">
      ${pageHead(p)}
      ${p.top ? `<div class="g-top">${p.top}</div>` : ''}
      <div class="gal" style="--tmin:${p.min || 300}px">${p.tiles.map(tileHTML).join('')}</div>
    </div></div>`;
    el._mount = (ctx) => {
      el.querySelectorAll('.tile').forEach((fig) => {
        const t = INDEX.get(fig.dataset.code).tile;
        const ts = fig.querySelector('.t-stage');
        mountTile(ts, t);
        ctx.add(() => { ts._ctx?.dispose(); seen.unobserve(ts); });
      });
      if (p.topInit) p.topInit(el.querySelector('.page'), ctx);
    };
    return el;
  }

  function customPage(p) {
    const el = document.createElement('article');
    el.className = 'spread single';
    el.innerHTML = `<div class="leaf"><div class="page custom">${pageHead(p)}<div class="g-body"></div></div></div>`;
    el._mount = (ctx) => p.render(el.querySelector('.g-body'), ctx);
    return el;
  }

  function glossaryPage() {
    const el = document.createElement('article');
    el.className = 'spread single';
    const link = (t) => (t && pageIndex(t) >= 0 ? `<button class="gl-go" type="button" data-token="${t}">看样品 →</button>` : '');
    el.innerHTML = `<div class="leaf"><div class="page">
      <h1 class="p-title">术语表</h1>
      <p class="p-lede">设计师之间常用的词。不必背，描述时用得上一两个，沟通就会准确很多。英文一并列出，方便你搜索资料。</p>
      <div class="gl-groups">${GLOSSARY.map((g) => `<section class="gl-group"><h2>${g.group}</h2><dl>${g.items.map(([zh, en, d, t]) => `<div class="gl-item"><dt><b>${zh}</b><span>${en}</span></dt><dd>${d}${link(t)}</dd></div>`).join('')}</dl></section>`).join('')}</div>
    </div></div>`;
    return el;
  }

  function summaryText() {
    if (!favs.length) return '';
    const lines = CHAPTERS.map((c) => {
      const mine = favs.filter((x) => x[0] === c.id).sort();
      return mine.length ? `${c.name}：${mine.map((x) => `${x} ${INDEX.get(x).name}`).join('、')}` : null;
    }).filter(Boolean);
    return `我从风格样品册里选了这些：\n${lines.join('\n')}`;
  }

  function summaryPage() {
    const el = document.createElement('article');
    el.className = 'spread single';
    const text = summaryText();
    const groups = CHAPTERS.map((c) => {
      const mine = favs.filter((x) => x[0] === c.id).sort();
      if (!mine.length) return '';
      return `<div class="sm-group"><h3><span class="g-badge">${c.id}</span>${c.name}</h3><div class="sm-chips">${mine.map((x) => {
        const hit = INDEX.get(x);
        return `<span class="sm-chip"><button type="button" data-code="${x}"><code>${x}</code>${hit.name}</button><button class="sm-x" type="button" data-unfav="${x}" aria-label="取消收藏 ${x}">${ICON.close}</button></span>`;
      }).join('')}</div></div>`;
    }).join('');
    el.innerHTML = `<div class="leaf"><div class="page">
      <h1 class="p-title">我的选择</h1>
      <p class="p-lede">你收藏的样品按章节汇总在这里。复制后直接发给我，我会按这些编号来设计网站。</p>
      <div class="sum-cols top">
        <div class="panel">
          <h3>收藏 · ${favs.length}</h3>
          ${favs.length ? groups : '<p>还没有收藏。翻到任意样品，点 ♥ 就会出现在这里。</p>'}
        </div>
        <div class="panel">
          <h3>发给 Claude</h3>
          ${text ? `<pre class="copy-text" id="copy-text">${esc(text)}</pre>
            <label class="sm-extra"><span>补充说明（可选）</span><textarea id="sm-extra" rows="3" placeholder="例如：整体要安静，按钮圆一点，暗色模式也要"></textarea></label>
            <button class="copy-btn" id="copy-btn" type="button">复制</button><span class="copy-state" id="copy-state" aria-live="polite"></span>
            <button class="sm-clear" id="sm-clear" type="button">清空收藏</button>`
            : '<p>收藏后这里会生成一段文字，复制给我即可。</p>'}
        </div>
      </div>
      <h2 class="gd-h">十种整体风格对照</h2>
      <p class="p-lede sm">四项评估针对「数学分析教材网页」这个具体用途，满分 5。</p>
      <div class="sum-wrap"><table class="sum">
        <thead><tr><th>风格</th>${CRIT.map((c) => `<th>${c}</th>`).join('')}<th>实现成本</th><th>收藏</th></tr></thead>
        <tbody>${STYLES.map((s) => `<tr>
          <td><button class="go" type="button" data-token="${s.id}"><i style="--c-bg:${s.bg}"></i>S${s.no} ${s.name}</button></td>
          ${s.r.map((k) => `<td><span class="dots" aria-label="${k} 分">${dots(k)}</span></td>`).join('')}
          <td>${s.cost}</td>
          <td class="mono">${isFav(`S${s.no}`) ? '♥' : '—'}</td>
        </tr>`).join('')}</tbody>
      </table></div>
      <div class="panel" style="margin-top:16px">
        <h3>我的建议</h3>
        <p>如果只选一种整体风格，选「研究期刊」(S02)：四项最均衡，定理、证明和交互图都放得下。正文可以配「学术手稿」(S01) 的旁注，演示部分借用「可探索解释」(S03) 的可拖动数字和分步揭示。</p>
      </div>
    </div></div>`;
    const btn = el.querySelector('#copy-btn');
    if (btn) btn.addEventListener('click', async () => {
      const state = el.querySelector('#copy-state');
      const extra = el.querySelector('#sm-extra').value.trim();
      const full = extra ? `${text}\n补充：${extra}` : text;
      try { await navigator.clipboard.writeText(full); state.textContent = '已复制'; }
      catch {
        const r = document.createRange(); r.selectNodeContents(el.querySelector('#copy-text'));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        state.textContent = '已选中文字，请按 Ctrl+C 或 ⌘C 复制';
      }
    });
    el.querySelector('#sm-clear')?.addEventListener('click', () => {
      if (!confirm('清空全部收藏？')) return;
      favs = []; store.set(favs); syncFavs(); go(cur, 0);
    });
    return el;
  }

  const BUILD = { cover: coverPage, guide: guidePage, contents: contentsPage, glossary: glossaryPage, summary: summaryPage };
  function go(i, dir = Math.sign(i - cur), focusCode) {
    if (i < 0 || i >= PAGES.length) return;
    const same = i === cur;
    cur = i;
    const p = PAGES[i];
    pageCtx?.dispose();
    const el = BUILD[p.type] ? BUILD[p.type]() : p.type === 'style' ? stylePage(p.style) : p.type === 'gallery' ? galleryPage(p) : customPage(p);
    if (dir && !reduce) el.classList.add(dir > 0 ? 'enter-next' : 'enter-prev');
    const keep = same ? [stage.scrollTop, stage.querySelector('.leaf')?.scrollTop || 0] : null;
    stage.replaceChildren(el);
    pageCtx = makeCtx(stage, false);
    if (el._mount) el._mount(pageCtx);
    stage.scrollTop = keep ? keep[0] : 0;
    if (keep) el.querySelector('.leaf').scrollTop = keep[1];
    pno.textContent = `${pad(i + 1)} / ${pad(PAGES.length)}`;
    barTitle.textContent = p.chapter ? `${p.chapter} · ${p.title}` : p.title;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === PAGES.length - 1;
    try { history.replaceState(null, '', `#${p.token}`); } catch { /* 部分查看器不允许改地址 */ }
    if (focusCode) {
      const fig = el.querySelector(`#tile-${focusCode}`);
      if (fig) requestAnimationFrame(() => {
        fig.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        fig.classList.add('flash');
        setTimeout(() => fig.classList.remove('flash'), 1600);
      });
    }
  }

  // —— 收藏 ——
  function syncFavs() {
    favN.textContent = favs.length;
    document.querySelectorAll('[data-fav]').forEach((b) => {
      const on = isFav(b.dataset.fav);
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
      const sp = b.querySelector('span');
      if (sp) sp.textContent = on ? '已收藏' : '收藏';
    });
  }
  function toggleFav(code) {
    favs = isFav(code) ? favs.filter((x) => x !== code) : [...favs, code];
    store.set(favs);
    syncFavs();
  }

  // —— 放大查看 ——
  const lb = document.getElementById('lb');
  const lbStage = lb.querySelector('.lb-stage');
  let lbList = [], lbAt = 0;
  function openLB(code) {
    const fig = stage.querySelectorAll('.tile');
    lbList = [...fig].map((f) => f.dataset.code);
    lbAt = Math.max(0, lbList.indexOf(code));
    showLB();
    if (!lb.open) lb.showModal();
  }
  function showLB() {
    const code = lbList[lbAt];
    const t = INDEX.get(code).tile;
    const [a, b] = ratioOf(t).split('/').map(Number);
    lbStage.className = `t-stage lb-stage${t.dark ? ' dark' : ''}`;
    lbStage.style.cssText = `aspect-ratio:${ratioOf(t)};${t.bg ? `background:${t.bg};` : ''}--rn:${a / b}`;
    mountTile(lbStage, t, true);
    lb.querySelector('#lb-code').textContent = code;
    lb.querySelector('#lb-name').textContent = t.name;
    lb.querySelector('#lb-en').textContent = [t.en, t.meta].filter(Boolean).join(' · ');
    lb.querySelector('#lb-desc').innerHTML = t.desc + (t.more ? `<br><br>${t.more}` : '');
    lb.querySelector('#lb-kw').innerHTML = (t.kw || []).map((k) => `<li>${k}</li>`).join('');
    lb.querySelector('#lb-links').innerHTML = (t.links || []).map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join('');
    const css = lb.querySelector('#lb-css');
    css.hidden = !t.css;
    css.querySelector('code').textContent = t.css || '';
    lb.querySelector('#lb-fav').outerHTML = favBtn(code).replace('class="fav', 'id="lb-fav" class="fav');
    lb.querySelector('#lb-pos').textContent = `${lbAt + 1} / ${lbList.length}`;
    lb.querySelector('#lb-prev').disabled = lbAt === 0;
    lb.querySelector('#lb-next').disabled = lbAt === lbList.length - 1;
  }
  lb.addEventListener('close', () => { lbStage._ctx?.dispose(); lbStage.innerHTML = ''; });
  lb.addEventListener('click', (e) => {
    if (e.target === lb) { lb.close(); return; }
    if (e.target.closest('#lb-x')) lb.close();
    else if (e.target.closest('#lb-prev') && lbAt > 0) { lbAt--; showLB(); }
    else if (e.target.closest('#lb-next') && lbAt < lbList.length - 1) { lbAt++; showLB(); }
    else if (e.target.closest('#lb-copy')) {
      const s = lb.querySelector('#lb-copy');
      navigator.clipboard?.writeText(lb.querySelector('#lb-css code').textContent).then(() => { s.textContent = '已复制'; setTimeout(() => { s.textContent = '复制 CSS'; }, 1400); }, () => { s.textContent = '复制失败'; });
    }
  });
  lb.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowLeft' && lbAt > 0) { lbAt--; showLB(); }
    if (e.key === 'ArrowRight' && lbAt < lbList.length - 1) { lbAt++; showLB(); }
  });

  // —— 全局点击委托 ——
  function jump(input) {
    const msg = input.closest('.gd-jump').querySelector('.code-msg');
    const v = input.value.trim().toUpperCase();
    if (!goCode(v)) msg.textContent = v ? `没有 ${v} 这个编号` : '请输入编号';
  }
  document.addEventListener('click', (e) => {
    const f = e.target.closest('[data-fav]');
    if (f) { toggleFav(f.dataset.fav); return; }
    if (e.target.closest('dialog')) return;
    const z = e.target.closest('[data-zoom]');
    if (z) { openLB(z.dataset.zoom); return; }
    const r = e.target.closest('.t-replay');
    if (r) { const ts = r.closest('.t-stage'); const code = ts.closest('.tile')?.dataset.code; if (code) mountTile(ts, INDEX.get(code).tile); return; }
    const t = e.target.closest('[data-token]');
    if (t && stage.contains(t)) { goToken(t.dataset.token); return; }
    const c = e.target.closest('[data-code]');
    if (c && c.tagName === 'BUTTON') { goCode(c.dataset.code); return; }
    const u = e.target.closest('[data-unfav]');
    if (u) { toggleFav(u.dataset.unfav); go(cur, 0); return; }
    const ch = e.target.closest('[data-chap]');
    if (ch) { const p = PAGES.find((pg) => pg.chapter === ch.dataset.chap); if (p) goToken(p.token); return; }
    const j = e.target.closest('[data-jump]');
    if (j) jump(document.querySelector(j.dataset.jump));
  });
  stage.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('.code-in')) jump(e.target); });
  prevBtn.addEventListener('click', () => go(cur - 1));
  nextBtn.addEventListener('click', () => go(cur + 1));
  document.getElementById('toc-btn').addEventListener('click', () => goToken('contents'));
  document.getElementById('fav-btn').addEventListener('click', () => goToken('summary'));
  document.getElementById('brand').addEventListener('click', () => goToken('cover'));
  function setMotion(on) {
    motionOn = on;
    document.documentElement.dataset.motion = on ? 'on' : 'off';
    motionBtn.setAttribute('aria-pressed', String(on));
    motionBtn.querySelector('span').textContent = on ? '动效 开' : '动效 关';
    try { localStorage.setItem('specimen-motion', on ? 'on' : 'off'); } catch { /* 忽略 */ }
  }
  motionBtn.addEventListener('click', () => setMotion(!motionOn));
  setMotion(motionOn);
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || lb.open) return;
    if (e.target.closest('input, textarea, select, [contenteditable], [role="slider"], .sp-dark, .no-pagekeys')) return;
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  });

  // 手机上左右滑动翻页（从控件和样品上开始的滑动不算）
  let sx = null, sy = 0;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch' || e.target.closest('input, textarea, button, a, .scrub, svg, .t-stage, .no-pagekeys')) { sx = null; return; }
    sx = e.clientX; sy = e.clientY;
  });
  stage.addEventListener('pointerup', (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });

  window.addEventListener('hashchange', () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (/^[A-Z]\d{2}$/i.test(h)) { goCode(h); return; }
    if (h && h !== PAGES[cur].token) goToken(h);
  });
  syncFavs();
  const h0 = decodeURIComponent(location.hash.slice(1));
  if (/^[A-Z]\d{2}$/i.test(h0) && INDEX.has(h0.toUpperCase())) { cur = -1; goCode(h0); }
  else { const start = pageIndex(h0); go(start >= 0 ? start : 0, 0); }
