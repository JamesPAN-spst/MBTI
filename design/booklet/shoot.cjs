// 截图与自检：node shoot.cjs <html文件> <输出目录> <宽x高> <light|dark> <页token,逗号分隔> [--full] [--wait=ms] [--zoom=A01,A05]
//   --full  把整页展开后截长图（看完整的样品格）
//   --zoom  在最后一个页面上依次打开这些样品的放大视图并截图
// 会打印：脚本错误、控制台错误、横向溢出、溢出样品格（内容超出舞台的格子）
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const fs = require('fs');
const path = require('path');
const [file, outDir, size, scheme, tokens, ...rest] = process.argv.slice(2);
const full = rest.includes('--full');
const wait = +(rest.find((a) => a.startsWith('--wait=')) || '--wait=900').split('=')[1];
const [w, h] = size.split('x').map(Number);
fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(`${m.type()}: ${m.text()}`); });
  await p.goto('file://' + path.resolve(file));
  for (const t of tokens.split(',')) {
    await p.evaluate((tk) => { location.hash = tk; }, t);
    await p.waitForTimeout(wait);
    const info = await p.evaluate(() => {
      const sw = document.documentElement.scrollWidth;
      const bad = [];
      document.querySelectorAll('.tile .t-stage').forEach((s) => {
        // 舞台里绝对定位的东西被裁掉是设计的一部分；这里只报告舞台本身被撑大的情况
        const r = s.getBoundingClientRect();
        const fig = s.closest('.tile');
        if (fig.getBoundingClientRect().width + 1 < r.width) bad.push(fig.dataset.code + ' stage wider than tile');
      });
      return { sw, W: innerWidth, title: document.getElementById('bar-title').textContent, n: document.querySelectorAll('.tile').length, bad };
    });
    if (info.sw > info.W) errs.push(`${t}: 横向溢出 ${info.sw} > ${info.W}`);
    info.bad.forEach((x) => errs.push(`${t}: ${x}`));
    const file2 = `${outDir}/${w}-${scheme}-${t}${full ? '-full' : ''}.png`;
    if (full) {
      await p.addStyleTag({ content: '.app{height:auto!important}.stage{overflow:visible!important}.spread{height:auto!important}.leaf{overflow:visible!important}' });
      await p.waitForTimeout(300);
      await p.screenshot({ path: file2, fullPage: true });
      await p.evaluate(() => document.querySelectorAll('style').forEach((s) => { if (s.textContent.startsWith('.app{height:auto!important}')) s.remove(); }));
    } else {
      await p.screenshot({ path: file2 });
    }
    console.log(`${t} → ${info.title} · ${info.n} tiles · ${file2}`);
  }
  const zoom = (rest.find((a) => a.startsWith('--zoom=')) || '').split('=')[1];
  for (const code of zoom ? zoom.split(',') : []) {
    const btn = await p.$(`[data-zoom="${code}"]`);
    if (!btn) { errs.push(`没有找到样品 ${code}`); continue; }
    await btn.click();
    await p.waitForTimeout(wait);
    const f = `${outDir}/${w}-${scheme}-zoom-${code}.png`;
    await p.screenshot({ path: f });
    console.log(`zoom ${code} → ${f}`);
    await p.keyboard.press('Escape');
    await p.waitForTimeout(200);
  }
  console.log(errs.length ? `问题：\n${errs.join('\n')}` : '没有错误');
  await b.close();
})();
