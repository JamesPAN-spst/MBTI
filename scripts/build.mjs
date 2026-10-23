// 构建脚本：content/*.md → docs/*.html
// 数学公式在构建时用 KaTeX 渲染，产物是纯静态页面，可直接用浏览器打开或部署到 GitHub Pages。

import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import katex from 'katex';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// OUT_DIR=… 输出到别处（并行预览时互不干扰）；默认 docs/
const outDir = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : path.join(root, 'docs');
const SITE = '数学分析 · L2';

const KINDS = {
  def: '定义', thm: '定理', prop: '命题', lem: '引理', cor: '推论',
  ex: '例', cex: '反例', rem: '注', method: '方法', open: '开放问题', hist: '历史',
  q: '想一想', read: '延伸阅读',
};
// 可折叠的块：证明、证明概要、解答
const FOLDS = { proof: '证明', sketch: '证明概要', ans: '解答' };
const KINDS_FR = {
  def: 'définition', thm: 'théorème', prop: 'proposition', lem: 'lemme', cor: 'corollaire', ex: 'exemple', cex: 'contre-exemple',
};
const FOLDS_FR = { proof: 'Preuve', sketch: 'Esquisse de preuve', ans: 'Réponse' };
const NUMBERED = new Set(['def', 'thm', 'prop', 'lem', 'cor', 'ex', 'cex']);
const LEVEL_TITLES = {
  1: '★ 必修主干：完整证明',
  2: '★★ 进阶：证明概要',
  3: '★★★ 拓展：只陈述，证明见参考文献',
};

const MACROS = {
  '\\R': '\\mathbb{R}', '\\N': '\\mathbb{N}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}',
  '\\C': '\\mathbb{C}', '\\K': '\\mathbb{K}', '\\T': '\\mathbb{T}',
  '\\eps': '\\varepsilon', '\\dd': '\\mathrm{d}', '\\ii': '\\mathrm{i}', '\\e': '\\mathrm{e}',
  '\\norm': '\\left\\lVert #1 \\right\\rVert', '\\abs': '\\left\\lvert #1 \\right\\rvert',
  '\\ps': '\\left\\langle #1 \\right\\rangle',
  '\\Id': '\\mathrm{Id}', '\\tr': '\\operatorname{tr}', '\\rg': '\\operatorname{rg}',
  '\\Vect': '\\operatorname{Vect}', '\\GL': '\\mathrm{GL}', '\\M': '\\mathcal{M}',
  '\\Cc': '\\mathcal{C}', '\\Lin': '\\mathcal{L}', '\\Ker': '\\operatorname{Ker}',
  '\\Ima': '\\operatorname{Im}', '\\sh': '\\operatorname{sh}', '\\ch': '\\operatorname{ch}',
  '\\th': '\\operatorname{th}', '\\Arctan': '\\operatorname{Arctan}',
};

const errors = [];
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 法式区间 ]a, b[、[a, b[、]a, b]：KaTeX 默认把 ] 当右括号、[ 当左括号，
// 导致 ∈ 之后缺间距、]-r 中的减号被当成二元运算。这里按位置把它们改成正确的定界符类型。
const OPEN_BRACKET = /(?<![\\A-Za-z0-9}\)\]|])\]/g;
const CLOSE_BRACKET = /(?<![\\])(?<!\\(?:right|left|big|Big|bigg|Bigg))\[(?=\s|,|\)|\\(?:times|to|setminus|subset|cap|cup)\b|$)/g;
const frenchIntervals = (src) => src
  .replace(OPEN_BRACKET, '\\mathopen{]}')
  .replace(CLOSE_BRACKET, '\\mathclose{[}');

function tex(src, display, env) {
  try {
    return katex.renderToString(frenchIntervals(src), {
      displayMode: display, macros: { ...MACROS }, throwOnError: true, strict: 'ignore',
    });
  } catch (e) {
    errors.push(`${env.file}: ${e.message}`);
    return `<code class="tex-error">${escapeHtml(src)}</code>`;
  }
}

// $…$ 行内公式、$$…$$ 行间公式
function mathPlugin(md) {
  md.inline.ruler.before('escape', 'math_inline', (state, silent) => {
    const src = state.src;
    const start = state.pos;
    if (src[start] !== '$') return false;
    const delim = src[start + 1] === '$' ? '$$' : '$';
    let end = start + delim.length;
    for (;;) {
      end = src.indexOf(delim, end);
      if (end === -1) return false;
      if (src[end - 1] === '\\') { end += 1; continue; }
      break;
    }
    const content = src.slice(start + delim.length, end);
    if (!content.trim()) return false;
    if (!silent) {
      const token = state.push('math_inline', 'math', 0);
      token.content = content;
      token.markup = delim;
    }
    state.pos = end + delim.length;
    return true;
  });

  md.block.ruler.before('fence', 'math_block', (state, startLine, endLine, silent) => {
    const lineText = (n) => state.src.slice(state.bMarks[n] + state.tShift[n], state.eMarks[n]);
    const first = lineText(startLine);
    if (!first.startsWith('$$')) return false;
    let content;
    let last = startLine;
    const rest = first.slice(2);
    if (rest.trim().endsWith('$$')) {
      content = rest.trim().slice(0, -2);
    } else {
      const lines = [rest];
      for (last = startLine + 1; last < endLine; last++) {
        const t = lineText(last);
        if (t.trim().endsWith('$$')) { lines.push(t.trim().slice(0, -2)); break; }
        lines.push(t);
      }
      if (last >= endLine) return false;
      content = lines.join('\n');
    }
    if (silent) return true;
    const token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = content;
    token.map = [startLine, last + 1];
    state.line = last + 1;
    return true;
  }, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });

  md.renderer.rules.math_inline = (tokens, idx, _opts, env) =>
    tex(tokens[idx].content, tokens[idx].markup === '$$', env);
  md.renderer.rules.math_block = (tokens, idx, _opts, env) =>
    `<div class="math-display">${tex(tokens[idx].content, true, env)}</div>\n`;
}

function parseAttrs(info) {
  const attrs = {};
  for (const m of info.matchAll(/(\w+)=(?:"([^"]*)"|(\S+))/g)) attrs[m[1]] = m[2] ?? m[3];
  return attrs;
}

const md = new MarkdownIt({ html: true, typographer: false });
md.use(mathPlugin);

// 以「▷」开头的段落是灰色旁白：思路、把假设翻译成量词、「我们要证的是……」
md.core.ruler.push('meta_paragraph', (state) => {
  const t = state.tokens;
  for (let i = 0; i + 2 < t.length; i++) {
    if (t[i].type !== 'paragraph_open' || t[i + 1].type !== 'inline') continue;
    const first = t[i + 1].children?.[0];
    if (!first || first.type !== 'text' || !first.content.startsWith('▷')) continue;
    first.content = first.content.replace(/^▷\s*/, '');
    t[i].attrJoin('class', 'meta');
  }
});

// 找到第 idx 个 token（块的开头）对应的结尾，看紧跟着的是不是 ::: fr
function followedByFr(tokens, idx) {
  let depth = 0;
  for (let j = idx; j < tokens.length; j++) {
    if (tokens[j].type === 'container_blk_open') depth++;
    else if (tokens[j].type === 'container_blk_close' && --depth === 0) {
      const n = tokens[j + 1];
      return !!n && n.type === 'container_blk_open' && n.info.trim() === 'fr';
    }
  }
  return false;
}
const langSwitch = '<span class="lang-sw" role="group" aria-label="语言"><button type="button" data-l="zh" aria-pressed="true">中</button><button type="button" data-l="fr" aria-pressed="false">Fr</button></span>';

// ::: kind key="value" …  —— 定义、定理、证明、交互演示等语义块
// 紧跟在一个块后面的 ::: fr 是它的法语版本（定义与定理的陈述、证明），与中文版本放在同一个块里，可切换。
md.use(container, 'blk', {
  validate: (params) => /^\s*(def|thm|prop|lem|cor|ex|cex|rem|method|open|hist|proof|sketch|ans|demo|q|read|glossary|fr)\b/.test(params),
  render(tokens, idx, _opts, env) {
    const token = tokens[idx];
    const info = token.info.trim();
    const kind = info.split(/\s+/)[0];

    if (kind === 'fr') {
      const parent = env.stack[env.stack.length - 1];
      if (token.nesting === 1) {
        if (!parent || !parent.awaitFr) { errors.push(`${env.file}: ::: fr 必须紧跟在一个块之后`); return '<div>'; }
        parent.inFr = true;
        return `<div class="${FOLDS[parent.kind] ? 'proof-body' : 'blk-body'}" lang="fr">\n`;
      }
      if (!parent || !parent.inFr) return '</div>';
      env.stack.pop();
      return `${FOLDS[parent.kind] ? '<p class="qed">∎</p>' : ''}</div>${closing(parent, env)}`;
    }

    if (token.nesting === 1) {
      const a = parseAttrs(info);
      const hasFr = followedByFr(tokens, idx);
      env.stack.push({ kind, a, hasFr });
      const zh = hasFr ? ' lang="zh"' : '';
      if (FOLDS[kind]) {
        const label = hasFr ? `<span lang="zh">${FOLDS[kind]}</span><span lang="fr">${FOLDS_FR[kind]}</span>` : FOLDS[kind];
        return `<details class="proof${kind === 'sketch' ? ' sketch' : ''}${kind === 'ans' ? ' ans' : ''}${hasFr ? ' bi' : ''}"><summary>${label}${hasFr ? langSwitch : ''}</summary><div class="proof-body"${zh}>\n`;
      }
      if (kind === 'demo') {
        env.demos.push(a.id);
        return `<figure class="demo" data-demo="${escapeHtml(a.id)}"><div class="demo-mount"></div><figcaption>\n`;
      }
      if (kind === 'glossary') {
        return `<section class="glossary" id="glossary-${env.chapter}"><header class="blk-head"><span class="blk-kind">术语对照</span><span class="blk-name">Lexique · Glossary · Словарь</span></header>\n`;
      }
      let label = KINDS[kind];
      let labelFr = KINDS_FR[kind] || label;
      if (NUMBERED.has(kind)) { label += ` ${env.chapter}.${++env.counter}`; labelFr += ` ${env.chapter}.${env.counter}`; }
      const anchor = a.id || `${kind}-${env.chapter}-${env.counter}-${idx}`;
      if (a.id) {
        if (env.labels.has(a.id)) errors.push(`${env.file}: 重复的 id ${a.id}`);
        env.labels.set(a.id, { label, labelFr, page: env.page });
      }
      const lvl = a.lvl ? Number(a.lvl) : 0;
      if (lvl) env.levels[lvl] = (env.levels[lvl] || 0) + 1;
      const name = a.zh ? `<span class="blk-name">${md.renderInline(a.zh, env)}</span>` : '';
      const stars = lvl ? `<span class="blk-lvl lvl-${lvl}" title="${LEVEL_TITLES[lvl]}">${'★'.repeat(lvl)}</span>` : '';
      const names = ['en', 'fr', 'ru'].filter((k) => a[k])
        .map((k) => `<span class="nm" lang="${k}"><b>${k.toUpperCase()}</b>${md.renderInline(a[k], env)}</span>`).join('');
      return `<section class="blk blk-${kind}${hasFr ? ' bi' : ''}" id="${escapeHtml(anchor)}">`
        + `<header class="blk-head"><span class="blk-kind">${label}</span>${name}${stars}${hasFr ? langSwitch : ''}</header>`
        + (names ? `<p class="blk-names">${names}</p>` : '')
        + `<div class="blk-body"${zh}>\n`;
    }

    const top = env.stack[env.stack.length - 1];
    if (top.hasFr && !top.awaitFr) {
      top.awaitFr = true;
      return FOLDS[top.kind] ? '<p class="qed">∎</p></div>\n' : '</div>\n';
    }
    env.stack.pop();
    if (FOLDS[top.kind]) return `<p class="qed">∎</p></div></details>\n`;
    if (top.kind === 'demo') return '</figcaption></figure>\n';
    if (top.kind === 'glossary') return '</section>\n';
    return `</div>${closing(top, env)}`;
  },
});

// 块的收尾（正文 </div> 之后）：证明的 </details>，定理的参考文献脚注与 </section>
function closing({ kind, a }, env) {
  if (FOLDS[kind]) return '</details>\n';
  const lvl = Number(a.lvl || 0);
  const ref = a.ref ? md.renderInline(a.ref, env) : '';
  const foot = lvl === 3 || ref
    ? `<p class="blk-ref">${lvl === 3 ? '证明从略。' : ''}${ref ? `参考：${ref}` : ''}</p>` : '';
  return `${foot}</section>\n`;
}

// 二级标题自动编号并收集目录
md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => {
  const t = tokens[idx];
  if (t.tag === 'h2') {
    env.section += 1;
    const id = `s${env.chapter}-${env.section}`;
    const title = md.renderInline(tokens[idx + 1].content, env);
    env.toc.push({ id, title, num: `${env.chapter}.${env.section}` });
    return `<h2 id="${id}"><span class="sec-num">${env.chapter}.${env.section}</span>`;
  }
  return self.renderToken(tokens, idx, opts);
};

const themeBoot = `<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>`;

function head(title, description) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="stylesheet" href="assets/katex/katex.min.css">
<link rel="stylesheet" href="assets/style.css">
${themeBoot}
</head>`;
}

function topbar(crumb) {
  return `<nav class="topbar"><div class="topbar-inner">
<a class="brand" href="index.html">${SITE}</a>
${crumb ? `<span class="crumb">${crumb}</span>` : '<span class="crumb"></span>'}
<div class="topbar-actions">
${crumb ? '<span class="lang-sw" id="lang-global" role="group" aria-label="定理与证明的语言" title="定理与证明：中文 / 法语"><button type="button" data-l="zh" aria-pressed="true">中</button><button type="button" data-l="fr" aria-pressed="false">Fr</button></span><button class="pill" id="proof-toggle" type="button">展开全部证明</button>' : ''}
<button class="icon-btn" id="theme-toggle" type="button" aria-label="切换明暗主题" title="切换明暗主题"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor"/></svg></button>
</div></div></nav>`;
}

const SEMESTERS = { S3: 'Semestre 3 · 第三学期', S4: 'Semestre 4 · 第四学期' };

function chapterPage(ch, html, env, prev, next) {
  const toc = env.toc.map((s) => `<li><a href="#${s.id}"><span class="toc-num">${s.num}</span><span>${s.title}</span></a></li>`).join('\n');
  const pager = (c, dir) => c
    ? `<a class="pager-${dir}" href="${c.slug}.html"><small>${dir === 'prev' ? '上一章' : '下一章'}</small>${c.num}. ${c.zh}</a>`
    : '<span></span>';
  return `${head(`${ch.num}. ${ch.zh} · ${SITE}`, ch.summary)}
<body class="page-chapter">
${topbar(`第 ${ch.num} 章 · ${ch.zh}`)}
<header class="chapter-hero">
<p class="eyebrow">第 ${ch.num} 章 · ${SEMESTERS[ch.semester]}</p>
<h1>${ch.zh}</h1>
<p class="hero-names"><span lang="en">${ch.en}</span><span lang="fr">${ch.fr}</span><span lang="ru">${ch.ru}</span></p>
<p class="lede">${ch.summary}</p>
</header>
<div class="layout">
<aside class="toc" aria-label="本章目录"><p class="toc-title">本章目录</p><ol>${toc}</ol></aside>
<main class="article">
<details class="toc-mobile"><summary>本章目录</summary><ol>${toc}</ol></details>
${html}
</main>
</div>
<footer class="pager">${pager(prev, 'prev')}${pager(next, 'next')}</footer>
<script src="assets/app.js" defer></script>
${env.demos.length ? '<script src="assets/demos.js" defer></script>' : ''}
</body>
</html>
`;
}

function glossaryPage(chapters, rendered) {
  const parts = rendered.map(({ ch, html }) => {
    const m = html.match(/<section class="glossary"[\s\S]*?<\/section>/);
    if (!m) return '';
    const table = m[0].replace(/<header[\s\S]*?<\/header>/, '').replace(/^<section[^>]*>/, '').replace(/<\/section>$/, '');
    return `<section class="gl-chapter" id="g${ch.num}"><h2><a href="${ch.slug}.html#glossary-${ch.num}">${ch.num}. ${ch.zh}</a></h2><div class="glossary">${table}</div></section>`;
  }).join('\n');
  return `${head(`术语对照 · ${SITE}`, '中文、法语、英语、俄语数学分析术语对照表。')}
<body class="page-chapter">
${topbar('术语对照')}
<header class="chapter-hero">
<p class="eyebrow">Lexique · Glossary · Словарь</p>
<h1>术语对照</h1>
<p class="lede">各章末尾的术语表汇总在这里：中文、法语、英语、俄语。输入任何一种语言都能筛选。</p>
</header>
<main class="home">
<input class="gl-filter" id="gl-filter" type="search" placeholder="筛选：收敛 / convergence / сходимость" aria-label="筛选术语">
${parts}
</main>
<script src="assets/app.js" defer></script>
</body>
</html>
`;
}

function indexPage(chapters, stats) {
  const card = (c) => {
    const s = stats.get(c.slug);
    return `<a class="card" href="${c.slug}.html">
<span class="card-num">${String(c.num).padStart(2, '0')}</span>
<h3>${c.zh}</h3>
<p class="card-fr" lang="fr">${c.fr}</p>
<p class="card-sum">${c.summary}</p>
<p class="card-meta"><span>${s.blocks} 个编号条目</span>${s.demos ? `<span class="badge">${s.demos} 个交互演示</span>` : ''}</p>
</a>`;
  };
  const group = (sem) => `<section class="semester">
<h2>${SEMESTERS[sem]}</h2>
<div class="grid">${chapters.filter((c) => c.semester === sem).map(card).join('\n')}</div>
</section>`;
  return `${head(SITE, '数学分析 L2：按法国 licence 2 / MP 大纲编排的数学分析学习网页，定理附英、法、俄原名。')}
<body class="page-home">
${topbar('')}
<header class="home-hero">
<p class="eyebrow">Analyse · Analysis · Анализ</p>
<h1>数学分析<span>L2</span></h1>
<p class="lede">按法国 licence 2 与 MP 大纲编排的第二年分析课程：从赋范空间的拓扑出发，经过级数、函数级数、Fourier 分析、广义积分与含参积分，再到微分方程、多元微分学和重积分。</p>
</header>
<main class="home">
${group('S3')}
${group('S4')}
<section class="legend">
<h2>阅读说明</h2>
<div class="legend-grid">
<div><h3>证明分级</h3>
<p><span class="blk-lvl lvl-1">★</span> 必修主干，给出完整证明。</p>
<p><span class="blk-lvl lvl-2">★★</span> 进阶内容，给出证明概要。</p>
<p><span class="blk-lvl lvl-3">★★★</span> 拓展内容，只陈述结论，证明见参考文献。</p></div>
<div><h3>中法双语</h3>
<p>每个定义、定理和证明都有法语版本：点块右上角的「中 / Fr」切换单个，或用顶栏的开关切换全部。证明里灰色的段落是思路旁白，对应法国讲义里的 Méthode。</p></div>
<div><h3>术语</h3>
<p>每个定理、定义附 <b>EN</b> 英文、<b>FR</b> 法文、<b>RU</b> 俄文原名；章末有中法英俄术语表，全部汇总在<a href="glossaire.html">术语对照</a>页，方便阅读 Фихтенгольц、Зорич、Demidovich 等苏联教材和 Rudin、Gourdon。</p></div>
<div><h3>先修知识</h3>
<p>L1 内容：实数的完备性、数列极限、一元函数的连续与导数、Taylor 公式、闭区间上的 Riemann 积分、线性代数（矩阵、行列式、对角化）。</p></div>
<div><h3>编排依据</h3>
<p>主线依照法国 MP 2021 年官方大纲的顺序，补充 licence L2 常见的 Fourier 级数与重积分。完整的四国课程调研与全程目录见仓库中的 <code>plan/syllabus.md</code>。</p></div>
</div>
</section>
</main>
<footer class="site-foot"><p>${SITE} · 习题另行编写</p></footer>
<script src="assets/app.js" defer></script>
</body>
</html>
`;
}

async function main() {
  // ONLY=01-evn,02-series 只构建部分章节（写作时预览用，跨章引用不报错）
  const only = process.env.ONLY?.split(',');
  const chapters = JSON.parse(await readFile(path.join(root, 'content/chapters.json'), 'utf8'))
    .filter((c) => !only || only.includes(c.slug));
  const labels = new Map();
  const rendered = [];
  const stats = new Map();

  for (const ch of chapters) {
    const src = await readFile(path.join(root, 'content', `${ch.slug}.md`), 'utf8');
    const env = {
      file: `${ch.slug}.md`, page: `${ch.slug}.html`, chapter: ch.num,
      counter: 0, section: 0, toc: [], stack: [], demos: [], levels: {}, labels,
    };
    const html = md.render(src, env);
    if (env.stack.length) errors.push(`${env.file}: 有未闭合的 ::: 块`);
    rendered.push({ ch, html, env });
    stats.set(ch.slug, { blocks: env.counter, demos: env.demos.length });
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, 'assets'), { recursive: true });

  rendered.forEach(({ ch, html, env }, i) => {
    // {@id} 显示中文标签（定理 4.3），{@fr:id} 显示法语标签（théorème 4.3），用在 ::: fr 里
    const linked = html.replace(/\{@(fr:)?([\w-]+)\}/g, (_m, fr, id) => {
      const target = labels.get(id);
      if (!target) {
        if (!only) errors.push(`${env.file}: 未定义的引用 {@${fr || ''}${id}}`);
        return `<span class="xref-missing">${id}</span>`;
      }
      const href = target.page === env.page ? `#${id}` : `${target.page}#${id}`;
      return `<a class="xref" href="${href}">${fr ? target.labelFr : target.label}</a>`;
    });
    rendered[i].page = chapterPage(ch, linked, env, chapters[i - 1], chapters[i + 1]);
  });

  if (errors.length) {
    console.error(`构建失败，共 ${errors.length} 处错误：\n${errors.join('\n')}`);
    process.exit(1);
  }

  for (const r of rendered) await writeFile(path.join(outDir, `${r.ch.slug}.html`), r.page);
  await writeFile(path.join(outDir, 'glossaire.html'), glossaryPage(chapters, rendered));
  await writeFile(path.join(outDir, 'index.html'), indexPage(chapters, stats));
  await writeFile(path.join(outDir, '.nojekyll'), '');
  await cp(path.join(root, 'src/assets'), path.join(outDir, 'assets'), { recursive: true });
  const katexDist = path.join(root, 'node_modules/katex/dist');
  await mkdir(path.join(outDir, 'assets/katex'), { recursive: true });
  await cp(path.join(katexDist, 'katex.min.css'), path.join(outDir, 'assets/katex/katex.min.css'));
  await cp(path.join(katexDist, 'fonts'), path.join(outDir, 'assets/katex/fonts'), {
    recursive: true, filter: (f) => !/\.(ttf|woff)$/.test(f),
  });

  const total = [...stats.values()].reduce((n, s) => n + s.blocks, 0);
  console.log(`已生成 ${chapters.length} 章，${total} 个编号条目 → docs/`);
}

await main();
