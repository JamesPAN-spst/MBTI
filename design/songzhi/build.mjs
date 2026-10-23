// 组装「宋纸手稿」示范页：npm run songzhi（或 node design/songzhi/build.mjs）
//   默认输出完整网页 docs/songzhi/index.html，并把用到的插画复制到 docs/songzhi/img/
//   FRAGMENT=1   输出不带 <!doctype>/<html>/<body> 的片段，用于发布为 claude.ai Artifact
//   OUT=路径      输出到别处（插画复制到同目录的 img/）
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const require = createRequire(import.meta.url);
const katex = require('katex');
const dist = path.join(path.dirname(require.resolve('katex/package.json')), 'dist');

const src = readFileSync(path.join(here, 'src.html'), 'utf8');
let count = 0;
const render = (tex, display) => { count++; return katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' }); };
// 只渲染正文里的 $…$，跳过 <style> 与 <script>
const parts = src.split(/(<style>[\s\S]*?<\/style>|<script>[\s\S]*?<\/script>)/);
const body = parts.map((part, i) => i % 2 === 1 ? part : part
  .replace(/\$\$([^$]+?)\$\$/g, (_, t) => render(t.trim(), true))
  .replace(/\$([^$\n]+?)\$/g, (_, t) => render(t, false))).join('');
const css = readFileSync(path.join(dist, 'katex.min.css'), 'utf8').replace(/src:url\(fonts\/(KaTeX_[\w-]+)\.woff2\)[^;}]*/g,
  (_, name) => `src:url(data:font/woff2;base64,${readFileSync(path.join(dist, 'fonts', `${name}.woff2`)).toString('base64')}) format("woff2")`);
const fragment = body.replace('</style>', `</style>\n<style>${css}</style>`);

// 完整网页：<title>、字体与样式进 <head>，其余进 <body>（正文从「印章」注释开始）
const cut = fragment.indexOf('<!-- 印章');
const html = process.env.FRAGMENT ? fragment : `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${fragment.slice(0, cut).trim()}
</head>
<body>
${fragment.slice(cut).trim()}
</body>
</html>
`;
const out = path.resolve(process.env.OUT || path.join(root, 'docs/songzhi/index.html'));
mkdirSync(path.join(path.dirname(out), 'img'), { recursive: true });
writeFileSync(out, html);

// 插画池在页面打开时随机抽取，所以把全部插画（大图 + 缩略图）都复制过去
const ills = path.join(root, 'design/assets/illustrations');
let copied = 0;
for (const f of readdirSync(ills).filter((f) => f.endsWith('.webp'))) { copyFileSync(path.join(ills, f), path.join(path.dirname(out), 'img', f)); copied++; }
console.log(`katex ${count} · ${(html.length / 1024).toFixed(0)} KB · ${copied} 张插画 → ${out}`);
