// 组装风格样品册：npm run booklet（或 node design/booklet/build.mjs）
//   默认输出完整网页 docs/booklet/index.html（GitHub Pages 可直接访问）
//   CH=A,B       只装入这些章节（S 章和框架总会装入），供分章测试
//   OUT=路径      输出到别处
//   FRAGMENT=1   输出不带 <!doctype>/<html>/<body> 的片段，用于发布为 claude.ai Artifact
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = (p) => new URL(`src/${p}`, import.meta.url);
const read = (p) => readFileSync(here(p), 'utf8');
const require = createRequire(import.meta.url);
const katex = require('katex');
const dist = path.join(path.dirname(require.resolve('katex/package.json')), 'dist');

const ORDER = ['A', 'C', 'F', 'T', 'L', 'K', 'B', 'I', 'M', 'P', 'R'];
const only = process.env.CH ? new Set(process.env.CH.split(',').map((s) => s.trim().toUpperCase())) : null;
const chapters = ORDER.filter((c) => (!only || only.has(c)) && existsSync(here(`ch/${c}.js`)));

// —— 字体：基础字体 + 各章 ch/X.fonts.txt（每行一个 Google Fonts family 参数）——
const BASE_FONTS = [
  'Instrument+Sans:wght@400;500;600', 'Instrument+Serif:ital@0;1', 'JetBrains+Mono:wght@400;500',
  'Noto+Sans+SC:wght@100..900', 'Noto+Serif+SC:wght@200..900',
  'EB+Garamond:ital,wght@0,400;0,500;1,400', 'Source+Sans+3:wght@400;600;700', 'Source+Serif+4:opsz,wght@8..60,400;8..60,600',
  'Nunito:wght@400;700;800', 'STIX+Two+Text:wght@400;600', 'Geist:wght@400;500;600', 'Geist+Mono:wght@400;500',
  'Newsreader:opsz,wght@6..72,400;6..72,600', 'Archivo+Narrow:wght@500;600', 'Archivo:wght@400;700;900',
  'Cormorant+Garamond:ital@0;1', 'Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800'
];
const fonts = new Map();
// 只去掉完全相同的参数；同一字体的不同字重放在不同 <link> 里，浏览器会合并（@font-face 按字重区分）
const addFont = (spec, from) => {
  if (fonts.has(spec)) return;
  fonts.set(spec, { spec, from });
};
BASE_FONTS.forEach((f) => addFont(f, 'base'));
for (const c of chapters) {
  const p = `ch/${c}.fonts.txt`;
  if (existsSync(here(p))) read(p).split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).forEach((f) => addFont(f, c));
}
// 按来源分组生成 <link>：某一章写错一个字体参数（Google 会对整条链接返回 400）只影响这一章
const links = [];
for (const from of ['base', ...chapters]) {
  const specs = [...fonts.values()].filter((f) => f.from === from).map((f) => f.spec);
  for (let i = 0; i < specs.length; i += 14) {
    links.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${specs.slice(i, i + 14).map((s) => `family=${s}`).join('&')}&display=swap">`);
  }
}

// —— CSS ——
const css = [
  ...readdirSync(here('css/')).filter((f) => f.endsWith('.css')).sort().map((f) => read(`css/${f}`)),
  ...chapters.filter((c) => existsSync(here(`ch/${c}.css`))).map((c) => `/* ===== 章节 ${c} ===== */\n${read(`ch/${c}.css`)}`)
].join('\n');

// —— JS：框架 → S 章 → 各章（各自包在块里）→ 术语 → 页面 ——
const js = [
  read('js/00-core.js'), read('js/05-plot.js'), read('js/10-styles-data.js'), read('js/15-specimen-bind.js'),
  ...chapters.map((c) => `  // ===== 章节 ${c} =====\n  {\n${read(`ch/${c}.js`)}\n  }`),
  read('js/80-glossary.js'), read('js/90-pages.js')
].join('\n');
if (/<\/script/i.test(js)) throw new Error('脚本里不能出现 </script');

// —— 正文模板里的数学用 KaTeX 预渲染 ——
let count = 0;
const render = (tex, display) => { count++; return katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' }); };
const body = read('body.html').replace('<!--TEMPLATES-->', read('body-templates.html'))
  .replace(/\$\$([^$]+?)\$\$/g, (_, t) => render(t.trim(), true))
  .replace(/\$([^$\n]+?)\$/g, (_, t) => render(t, false));
const katexCss = readFileSync(`${dist}/katex.min.css`, 'utf8').replace(/src:url\(fonts\/(KaTeX_[\w-]+)\.woff2\)[^;}]*/g,
  (_, name) => `src:url(data:font/woff2;base64,${readFileSync(`${dist}/fonts/${name}.woff2`).toString('base64')}) format("woff2")`);

const head = `${read('head.html').replace('<!--FONTS-->', links.join('\n'))}
<style>${css}</style>
<style>${katexCss}</style>`;
const script = `<script>
(() => {
'use strict';
${js}
})();
</script>`;
const fragment = !!process.env.FRAGMENT;
const html = fragment
  ? `${head}\n${body}\n${script}\n`
  : `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
${body}
${script}
</body>
</html>
`;
const root = path.resolve(fileURLToPath(import.meta.url), '../../..');
const out = path.resolve(process.env.OUT || path.join(root, 'docs/booklet/index.html'));
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`chapters: S ${chapters.join(' ')} · fonts ${fonts.size} · katex ${count} · ${(html.length / 1024).toFixed(0)} KB → ${out}`);
