// 主题切换、证明展开、目录高亮
(() => {
  const root = document.documentElement;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* 隐私模式下忽略 */ } },
  };

  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
    window.dispatchEvent(new Event('themechange'));
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!root.dataset.theme) window.dispatchEvent(new Event('themechange'));
  });

  const proofToggle = document.getElementById('proof-toggle');
  if (proofToggle) {
    const proofs = [...document.querySelectorAll('details.proof')];
    if (!proofs.length) proofToggle.hidden = true;
    const sync = () => {
      const allOpen = proofs.every((d) => d.open);
      proofToggle.textContent = allOpen ? '收起全部证明' : '展开全部证明';
    };
    proofToggle.addEventListener('click', () => {
      const open = !proofs.every((d) => d.open);
      proofs.forEach((d) => { d.open = open; });
      sync();
    });
    proofs.forEach((d) => d.addEventListener('toggle', sync));
    sync();
  }

  // 中 / Fr：每个双语块可以单独切换；顶栏的总开关切换全部，并记住选择
  const biBlocks = [...document.querySelectorAll('.bi')];
  const setLang = (block, lang) => {
    block.classList.toggle('show-fr', lang === 'fr');
    block.querySelectorAll(':scope > header .lang-sw button, :scope > summary .lang-sw button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === lang)));
  };
  const globalSw = document.getElementById('lang-global');
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

  // 术语表页：输入即筛选
  const filter = document.getElementById('gl-filter');
  if (filter) {
    const rows = [...document.querySelectorAll('.glossary tbody tr')];
    filter.addEventListener('input', () => {
      const q = filter.value.trim().toLowerCase();
      rows.forEach((r) => { r.hidden = q && !r.textContent.toLowerCase().includes(q); });
    });
  }

  // 打开指向证明内部或定理的锚点时，自动展开对应证明
  const revealHash = () => {
    if (!location.hash) return;
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    el?.closest('details')?.setAttribute('open', '');
  };
  window.addEventListener('hashchange', revealHash);
  revealHash();

  const links = [...document.querySelectorAll('.toc a')];
  if (links.length) {
    const headings = [...document.querySelectorAll('.article h2')];
    let pending = false;
    const update = () => {
      pending = false;
      let current = headings[0]?.id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = h.id;
      }
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
    };
    window.addEventListener('scroll', () => {
      if (!pending) { pending = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();
