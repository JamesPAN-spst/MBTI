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
// 搜索用的纯文本：去掉 $ 与 TeX 命令的反斜杠、HTML 标签
const plain = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\$/g, '').replace(/\\(?:mathrm|operatorname|mathbb|mathcal|text)\b/g, '').replace(/[\\{}]/g, '').replace(/\s+/g, ' ').trim();

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
const langSwitch = '<span class="seg lang-sw" role="group" aria-label="语言"><button type="button" data-l="zh" aria-pressed="true">中</button><button type="button" data-l="fr" aria-pressed="false">Fr</button></span>';

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
      env.kinds[kind] = (env.kinds[kind] || 0) + 1;
      const nameHtml = a.zh ? md.renderInline(a.zh, env) : '';
      if (NUMBERED.has(kind) || a.zh) {
        env.index.push([KINDS[kind], NUMBERED.has(kind) ? label : '', nameHtml,
          plain([label, a.zh, a.en, a.fr, a.ru].filter(Boolean).join(' ')), env.page, anchor, env.chapter]);
      }
      const name = a.zh ? `<span class="blk-name">${nameHtml}</span>` : '';
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
    env.index.push(['节', `§ ${env.chapter}.${env.section}`, title, plain(`${env.chapter}.${env.section} ${tokens[idx + 1].content}`), env.page, id, env.chapter]);
    return `<h2 id="${id}"><span class="sec-num">${env.chapter}.${env.section}</span>`;
  }
  return self.renderToken(tokens, idx, opts);
};

const themeBoot = `<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>`;
// 宋纸手稿的字体：正文 Garamond + 宋体，旁白楷体，封面行书、迪多尼数字、花体法文
const FONTS = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Noto+Serif+SC:wght@400;600;700&family=LXGW+WenKai+TC&family=Zhi+Mang+Xing&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Great+Vibes&display=swap';

function head(title, description) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${escapeHtml(FONTS)}">
<link rel="stylesheet" href="assets/katex/katex.min.css">
<link rel="stylesheet" href="assets/style.css">
${themeBoot}
</head>`;
}

const CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'];
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
const SEMESTER_FR = { S3: 'Semestre 3', S4: 'Semestre 4' };

const ICON = {
  burger: '<svg viewBox="0 0 24 24"><line class="l1" x1="5" y1="7" x2="19" y2="7"/><line class="l2" x1="5" y1="12" x2="19" y2="12"/><line class="l3" x1="5" y1="17" x2="19" y2="17"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  theme: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  proofs: '<svg viewBox="0 0 24 24"><path class="ic-open" d="M7 9.5l5-5 5 5M7 14.5l5 5 5-5"/><path class="ic-close" d="M7 4.5l5 5 5-5M7 19.5l5-5 5 5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

// 朱印（超椭圆）：顶栏、封面题款、左侧页边共用
const SEAL = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><symbol id="seal" viewBox="0 0 100 100"><path d="M50 2C88 2 98 12 98 50S88 98 50 98 2 88 2 50 12 2 50 2z" fill="var(--zhu)"/><path d="M50 9C82 9 91 18 91 50S82 91 50 91 9 82 9 50 18 9 50 9z" fill="none" stroke="var(--on-zhu)" stroke-width="2.2" opacity=".85"/><text x="50" y="68" text-anchor="middle" font-size="52" font-weight="700" fill="var(--on-zhu)" font-family="Noto Serif SC, serif">析</text></symbol></defs></svg>';
// 纸的层次：纸下插画 → 纤维、云纹、金箔 → 金箔反光（脚本生成）
const PAPER = '<div class="paper-clip" id="decos" aria-hidden="true"></div><div class="paper-tex" aria-hidden="true"></div><div class="paper-sheen" aria-hidden="true"></div>';

const SEARCH_UI = `<div class="search" id="search" role="dialog" aria-modal="true" aria-label="搜索" hidden>
<div class="search-box">
<div class="search-in"><input id="q" type="search" placeholder="搜索定理、定义、例子、术语…" autocomplete="off" spellcheck="false" aria-label="搜索"><button class="ghost" id="search-x" type="button" aria-label="关闭搜索">${ICON.close}</button></div>
<ul class="results" id="results"></ul>
</div>
</div>`;

function topbar({ crumb = '', chapter = false } = {}) {
  const tools = chapter
    ? `<span class="seg lang-sw" id="lang-global" role="group" aria-label="定理与证明的语言" title="定理与证明：中文 / 法语"><button type="button" data-l="zh" aria-pressed="true">中</button><button type="button" data-l="fr" aria-pressed="false">Fr</button></span>
<button class="ghost" id="proof-toggle" type="button" aria-pressed="false" aria-label="展开全部证明" title="展开全部证明">${ICON.proofs}</button>`
    : '';
  return `<header class="tb">
<div class="tb-in">
<button class="ghost burger" id="burger" type="button" aria-label="打开目录" aria-expanded="false" aria-controls="drawer">${ICON.burger}</button>
<a class="brand" href="index.html" aria-label="数学分析 L2 · 首页"><svg aria-hidden="true"><use href="#seal"/></svg><b>数学分析</b><span>licence 2</span></a>
<div class="crumb">${crumb}</div>
<div class="tb-tools">
${tools}
<button class="ghost" id="search-btn" type="button" aria-label="搜索（快捷键 /）" title="搜索（/）">${ICON.search}</button>
<button class="ghost" id="theme-toggle" type="button" aria-label="切换亮色或暗色" title="切换亮色或暗色">${ICON.theme}</button>
</div>
</div>
<div class="progress" id="progress"></div>
</header>`;
}

function drawer(chapters, cur, toc) {
  const sec = toc
    ? `<h3>第 ${cur.num} 章 · ${cur.zh}</h3><ol id="drawer-toc">${toc.map((s) => `<li><a href="#${s.id}" data-close data-sec="${s.id}"><span class="no">${s.num}</span><span>${s.title}</span></a></li>`).join('')}</ol>`
    : '';
  const all = chapters.map((c) => `<li${cur && c.num === cur.num ? ' class="cur"' : ''}><a href="${c.slug}.html"><span class="no">${c.num}</span><span>${c.zh}</span></a></li>`).join('');
  return `<div class="scrim" id="scrim"></div>
<nav class="drawer" id="drawer" aria-label="目录" aria-hidden="true">
${sec}
<h3>全书</h3><ol>${all}</ol>
<h3>其他</h3><ol><li><a href="index.html"><span class="no">·</span><span>首页与阅读说明</span></a></li><li><a href="glossaire.html"><span class="no">·</span><span>术语对照</span></a></li></ol>
</nav>`;
}

// 行书章名：逐字升起；西文单词（Fourier）用花体。字号按最长一行的字数定
// 第一行与右上角的烫金章号同高，留给它的宽度窄一些（两位章号更窄）
function brushTitle(lines, label, num = '') {
  let i = 0;
  const width = (l) => l.replace(/[A-Za-z]+/g, (w) => '·'.repeat(Math.ceil(w.length * 0.5))).length;
  const first = String(num).length > 1 ? 450 : num ? 540 : 640;
  const px = Math.min(176, ...lines.map((l, k) => Math.floor((k ? 680 : first) / width(l))));
  const vw = Math.min(13, 84 / Math.max(...lines.map(width))).toFixed(2);
  const line = (l) => l.split(/([A-Za-z]+)/).filter(Boolean).map((seg) => (/^[A-Za-z]+$/.test(seg)
    ? `<span class="ch lat"><i style="--i:${i++}">${seg}</i></span>`
    : [...seg].map((c) => `<span class="ch"><i style="--i:${i++}">${c}</i></span>`).join(''))).join('');
  return `<h1 class="c-title" aria-label="${escapeHtml(label)}" style="--fs:clamp(44px, ${vw}vw, ${px}px)"><span aria-hidden="true">${lines.map((l) => `<span class="ln">${line(l)}</span>`).join('')}</span></h1>`;
}

function marqueeHtml(label, items) {
  const track = [0, 1].map((k) => items.map((t) => `<span${k ? ' aria-hidden="true"' : ''}>${t}</span>`).join('')).join('');
  return `<div class="marquee"><span class="mq-label eyebrow">${label}</span><div class="mq-track" aria-label="${escapeHtml(label)}">${track}</div></div>`;
}

// 封面：水墨远山（四层视差）+ 行书章名 + 烫金章号 + 竖排题款与朱印 + 跑马灯
function cover({ eyebrow, lines, label, fr, names, abs, facts, cta, num, vtext, marquee, small }) {
  return `<header class="cover${small ? ' cover-sm' : ''}" id="top">
<div class="sky"></div><div class="aurora" aria-hidden="true"></div>
${[0, 1, 2, 3].map((i) => `<canvas class="mtn" data-layer="${i}" aria-hidden="true"></canvas>`).join('')}
<div class="cover-in">
<div class="c-side">${vtext ? `<div class="c-seal"><span class="vtext">${vtext}</span><svg class="seal" aria-hidden="true"><use href="#seal"/></svg></div>` : ''}</div>
<div class="c-text">
<p class="eyebrow">${eyebrow}</p>
${brushTitle(lines, label, num)}
${fr ? `<p class="c-fr" lang="fr">${fr}</p>` : ''}
${names ? `<p class="c-names">${names}</p>` : ''}
<p class="c-abs">${abs}</p>
${facts ? `<dl class="c-facts">${facts.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>` : ''}
${cta ? `<div class="c-cta">${cta}</div>` : ''}
</div>
${num ? `<p class="c-num" aria-hidden="true" data-n="${num}">${num}</p>` : ''}
</div>
${marquee || ''}
</header>`;
}

const SCRIPTS = '<script src="assets/search.js" defer></script>\n<script src="assets/app.js" defer></script>';

function chapterPage(ch, html, env, prev, next, chapters) {
  const k = env.kinds;
  const facts = [
    [env.toc.length, '节'],
    [(k.thm || 0) + (k.prop || 0) + (k.lem || 0) + (k.cor || 0), '条定理、命题与引理'],
    [k.def || 0, '个定义'],
    [(k.ex || 0) + (k.cex || 0), '个例与反例'],
  ];
  const pg = (c, dir) => (c
    ? `<a class="btn${dir === 'prev' ? ' quiet' : ''}" href="${c.slug}.html" data-turn>${dir === 'prev' ? ICON.back : ''}<span><small>${dir === 'prev' ? '上一章' : '下一章'} · 第 ${c.num} 章</small>${c.zh}</span>${dir === 'next' ? ICON.arrow : ''}</a>`
    : dir === 'next' ? `<a class="btn" href="index.html" data-turn><span><small>全书完</small>回到目录</span>${ICON.arrow}</a>` : '<span></span>');
  const vtext = `第${CN[ch.num]}章　${ch.zh}`;
  return `${head(`${ch.num}. ${ch.zh} · ${SITE}`, ch.summary)}
<body class="page-chapter">
${PAPER}
${SEAL}
${topbar({ crumb: `第 ${ch.num} 章 ${ch.zh}<i>/</i><span id="crumb-sec"></span>`, chapter: true })}
${cover({
    eyebrow: `<b>Chapitre ${ROMAN[ch.num]}</b>　·　Licence 2　·　${SEMESTER_FR[ch.semester]}`,
    lines: ch.lines || [ch.zh], label: ch.zh, fr: ch.fr,
    names: `<span lang="en">${ch.en}</span><span lang="ru">${ch.ru}</span>`,
    abs: ch.summary, facts,
    cta: `<a class="btn zhu" href="#${env.toc[0]?.id || 'main'}">开始本章 ${ICON.arrow}</a><button class="btn quiet" type="button" data-open-drawer>本章目录</button>`,
    num: ch.num, vtext, marquee: ch.marqueeBlock,
  })}
<div class="wrap">
<aside class="rail" aria-hidden="true"><div class="rail-in"><svg class="seal"><use href="#seal"/></svg><span class="vtext">${vtext}</span></div></aside>
<main class="article" id="main">
${html}
<nav class="next" aria-label="翻页">${pg(prev, 'prev')}${pg(next, 'next')}</nav>
</main>
</div>
<footer class="site-foot"><p>${SITE}　·　第 ${ch.num} 章 ${ch.zh}　·　<a class="ul" href="#top">回到本章封面</a></p></footer>
${drawer(chapters, ch, env.toc)}
${SEARCH_UI}
<div class="turn" id="turn" hidden><div class="leafp"></div></div>
${SCRIPTS}
${env.demos.length ? '<script src="assets/demos.js" defer></script>' : ''}
</body>
</html>
`;
}

function glossaryPage(chapters, rendered) {
  let rows = 0;
  const parts = rendered.map(({ ch, html }) => {
    const m = html.match(/<section class="glossary"[\s\S]*?<\/section>/);
    if (!m) return '';
    rows += (m[0].match(/<tr>/g) || []).length - 1;
    const table = m[0].replace(/<header[\s\S]*?<\/header>/, '').replace(/^<section[^>]*>/, '').replace(/<\/section>$/, '');
    return `<section class="gl-chapter" id="g${ch.num}"><h2><a class="ul" href="${ch.slug}.html#glossary-${ch.num}"><span class="no">${ch.num}</span>${ch.zh}</a></h2><div class="glossary">${table}</div></section>`;
  }).join('\n');
  return `${head(`术语对照 · ${SITE}`, '中文、法语、英语、俄语数学分析术语对照表。')}
<body class="page-glossary">
${PAPER}
${SEAL}
${topbar({ crumb: '术语对照　·　Lexique' })}
${cover({
    small: true, eyebrow: '<b>Lexique</b>　·　Glossary　·　Словарь', lines: ['术语对照'], label: '术语对照', fr: 'Lexique',
    abs: '各章末尾的术语表汇总在这里：中文、法语、英语、俄语。输入任何一种语言都能筛选。',
    facts: [[rendered.length, '章'], [rows, '条术语'], [4, '种语言']], vtext: '术语对照　中法英俄',
  })}
<main class="gl-main" id="main">
<div class="gl-search"><input class="gl-filter" id="gl-filter" type="search" placeholder="筛选：收敛 / convergence / сходимость" aria-label="筛选术语"></div>
${parts}
</main>
<footer class="site-foot"><p>${SITE}　·　术语对照　·　<a class="ul" href="index.html">回到目录</a></p></footer>
${drawer(chapters, null, null)}
${SEARCH_UI}
${SCRIPTS}
</body>
</html>
`;
}

function indexPage(chapters, stats, homeMarquee) {
  const total = [...stats.values()].reduce((n, s) => n + s.blocks, 0);
  const demos = [...stats.values()].reduce((n, s) => n + s.demos, 0);
  const row = (c) => {
    const s = stats.get(c.slug);
    return `<li><a class="ch-row" href="${c.slug}.html">
<span class="ch-no">${c.num}</span>
<span class="ch-main"><b>${c.zh}</b><i lang="fr">${c.fr}</i><span class="ch-sum">${c.summary}</span></span>
<span class="ch-meta">${s.blocks} 个编号条目${s.demos ? `<em>${s.demos} 个交互演示</em>` : ''}</span>
</a></li>`;
  };
  const group = (sem, title) => `<section class="semester">
<p class="eyebrow"><b>${SEMESTER_FR[sem]}</b></p>
<h2>${title}</h2>
<ol class="chapters">${chapters.filter((c) => c.semester === sem).map(row).join('\n')}</ol>
</section>`;
  const first = chapters[0];
  return `${head(SITE, '数学分析 L2：按法国 licence 2 / MP 大纲编排的数学分析学习网页，定理与证明中法双语，附英、俄原名。')}
<body class="page-home">
${PAPER}
${SEAL}
${topbar({ crumb: '目录　·　Sommaire' })}
${cover({
    eyebrow: '<b>Analyse</b>　·　Licence 2　·　MP 2021',
    lines: ['数学分析'], label: '数学分析 L2', fr: 'Analyse — Licence 2',
    names: '<span lang="en">Mathematical analysis</span><span lang="ru">Математический анализ</span>',
    abs: '按法国 licence 2 与 MP 大纲编排的第二年分析课程：从赋范空间的拓扑出发，经过级数、函数级数、Fourier 分析、广义积分与含参积分，再到微分方程、多元微分学和重积分。',
    facts: [[chapters.length, '章'], [total, '个编号条目'], [demos, '个交互演示'], [4, '种语言对照']],
    cta: first ? `<a class="btn zhu" href="${first.slug}.html">从第 1 章开始 ${ICON.arrow}</a><a class="btn quiet" href="glossaire.html">术语对照</a>` : '',
    num: 'L2', vtext: '数学分析　第二年', marquee: homeMarquee,
  })}
<main class="home" id="main">
${group('S3', '第三学期')}
${group('S4', '第四学期')}
<section class="legend">
<p class="eyebrow"><b>Mode d'emploi</b></p>
<h2>阅读说明</h2>
<div class="tiers">
<div class="tier"><h3>证明分级</h3>
<p><span class="blk-lvl">★</span> 必修主干，给出完整证明。</p>
<p><span class="blk-lvl">★★</span> 进阶内容，给出证明概要。</p>
<p><span class="blk-lvl">★★★</span> 拓展内容，只陈述结论，证明见参考文献。</p></div>
<div class="tier"><h3>中法双语</h3>
<p>每个定义、定理和证明都有法语版本：点块右上角的「中 / Fr」切换单个，或用顶栏的开关切换全部。证明里楷体的段落是思路旁白，对应法国讲义里的 Méthode。</p></div>
<div class="tier"><h3>术语</h3>
<p>每个定理、定义附英文、法文、俄文原名；章末有中法英俄术语表，全部汇总在<a class="ul" href="glossaire.html">术语对照</a>页，方便阅读 Фихтенгольц、Зорич、Demidovich 等苏联教材和 Rudin、Gourdon。</p></div>
<div class="tier"><h3>先修知识</h3>
<p>L1 内容：实数的完备性、数列极限、一元函数的连续与导数、Taylor 公式、闭区间上的 Riemann 积分、线性代数（矩阵、行列式、对角化）。</p></div>
<div class="tier"><h3>编排依据</h3>
<p>主线依照法国 MP 2021 年官方大纲的顺序，补充 licence L2 常见的 Fourier 级数与重积分。完整的四国课程调研与全程目录见仓库中的 <code>plan/syllabus.md</code>。</p></div>
<div class="tier"><h3>纸面</h3>
<p>「宋纸手稿」：洒金宣纸上的讲义。纸纹、金箔、远山和纸下的插画每次打开都重新随机生成。按 <kbd>/</kbd> 搜索全书；风格来源见<a class="ul" href="booklet/">风格样品册</a>与<a class="ul" href="songzhi/">设计方案</a>。</p></div>
</div>
</section>
</main>
<footer class="site-foot"><p>${SITE}　·　习题另行编写</p></footer>
${drawer(chapters, null, null)}
${SEARCH_UI}
${SCRIPTS}
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
      counter: 0, section: 0, toc: [], stack: [], demos: [], levels: {}, labels, kinds: {}, index: [],
    };
    // 本章开头若是汉字，第一个字做朱色行书首字（以 L1、Fourier 或公式开头的章不做）
    const html = md.render(src, env).replace(/^<p>(?=[\u4e00-\u9fff])/, '<p class="lead">');
    if (env.stack.length) errors.push(`${env.file}: 有未闭合的 ::: 块`);
    rendered.push({ ch, html, env });
    if (ch.marquee) {
      const menv = { file: 'chapters.json' };
      ch.marqueeBlock = marqueeHtml(ch.marquee.label, ch.marquee.items.map((t) => tex(t, false, menv)));
      ch.homeFormula = tex(ch.marquee.items[ch.marquee.home || 0], false, menv);
    }
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
    rendered[i].page = chapterPage(ch, linked, env, chapters[i - 1], chapters[i + 1], chapters);
    // 术语表的每一行也进搜索：中文 → 法 · 英 · 俄
    for (const tr of linked.match(/<section class="glossary"[\s\S]*?<\/section>/)?.[0].match(/<tr>[\s\S]*?<\/tr>/g)?.slice(1) || []) {
      const cells = [...tr.matchAll(/<td>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
      if (cells.length < 2) continue;
      env.index.push(['术语', '', cells[0], plain(cells.join(' ')), env.page, `glossary-${ch.num}`, ch.num, plain(cells.slice(1).join(' · '))]);
    }
  });

  if (errors.length) {
    console.error(`构建失败，共 ${errors.length} 处错误：\n${errors.join('\n')}`);
    process.exit(1);
  }

  for (const r of rendered) await writeFile(path.join(outDir, `${r.ch.slug}.html`), r.page);
  await writeFile(path.join(outDir, 'glossaire.html'), glossaryPage(chapters, rendered));
  const homeMarquee = marqueeHtml('全书名式', chapters.filter((c) => c.homeFormula).map((c) => c.homeFormula));
  await writeFile(path.join(outDir, 'index.html'), indexPage(chapters, stats, homeMarquee));
  // 全书搜索索引：[类别, 编号, 名称（HTML）, 检索文本, 页面, 锚点, 章, 附注]
  const index = rendered.flatMap(({ env }) => env.index);
  await writeFile(path.join(outDir, 'assets/search.js'), `window.SEARCH=${JSON.stringify(index)};\n`);
  await writeFile(path.join(outDir, '.nojekyll'), '');
  await cp(path.join(root, 'src/assets'), path.join(outDir, 'assets'), { recursive: true });
  // 纸下的插画（大图 + 缩略图），页面打开时随机抽取
  await cp(path.join(root, 'design/assets/illustrations'), path.join(outDir, 'assets/img'), {
    recursive: true, filter: (f) => !path.extname(f) || f.endsWith('.webp'),
  });
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
