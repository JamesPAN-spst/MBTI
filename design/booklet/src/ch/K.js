// ===== K 质感：shape（K01–K18）与 shape-lab（卡片调试台）=====
// 样品里的组件用真实 px 尺寸；放大视图里由容器查询整体放大（见 K.css 的 .ma-z）

const maCard = (cls = '', btn = '开始学习') => `<div class="ma-card ${cls}">
  <span class="ma-k">定理 3.2</span><b class="ma-t">收敛半径</b><span class="ma-d">比值法：若 |aₙ₊₁ / aₙ| → L，<span class="ma-nw">则 R = 1 / L。</span></span>
  <span class="ma-act"><button type="button" class="ma-b">${btn}</button><span class="ma-tag">级数</span></span></div>`;
const maScene = (inner, cap = '') => `<div class="ma-sc"><div class="ma-z">${inner}${cap ? `<p class="ma-cap">${cap}</p>` : ''}</div></div>`;

// 超椭圆 |x|^n + |y|^n = 1（n = 5）
const maSquircle = (() => {
  const n = 5, pts = [];
  for (let i = 0; i < 160; i++) {
    const t = (i / 160) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    pts.push(`${(50 + 48 * Math.sign(c) * Math.abs(c) ** (2 / n)).toFixed(2)},${(50 + 48 * Math.sign(s) * Math.abs(s) ** (2 / n)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
})();
// 长投影：几十层逐像素偏移的 text-shadow
const maLong = Array.from({ length: 70 }, (_, i) => `${i + 1}px ${i + 1}px 0 var(--ma-ls)`).join(',');
const maPressInit = (stage) => {
  stage.querySelectorAll('.ma-seg').forEach((seg) => seg.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    seg.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));
};

const MA = [
  { code: 'K01', name: '直角', en: 'Sharp corners', meta: 'border-radius: 0', bg: '#ECEDF0',
    html: maScene(maCard('ma-r0'), '卡片 0 · 按钮 0'),
    desc: '卡片、按钮、标签全部是直角。显得锐利、严肃，有印刷品和编辑设计的味道，常见于瑞士风、粗野主义、报纸和学术网站。配细线和大量留白很高级；配厚重阴影则容易显得过时。',
    more: '直角让对齐线格外清楚，适合信息密集、强调网格的页面；期刊风格（S02）可以直接用直角卡片。缺点是显得冷、有距离感，触屏上按钮看起来不太「好按」。',
    kw: ['直角', '锐利', '编辑感', '网格'],
    css: '.card, .button, .tag {\n  border-radius: 0;\n}' },
  { code: 'K02', name: '小圆角', en: 'Small radius', meta: 'border-radius: 4px', bg: '#ECEDF0',
    html: maScene(maCard('ma-r4'), '卡片 6px · 按钮 4px'),
    desc: '只把角磨掉一点点（2–6px），几乎看不出是圆的，但比直角柔和、精致。这是传统网页和后台系统最常用的值（Bootstrap、GitHub 一带）。稳妥、专业、不抢戏。',
    more: '小圆角适合密集的表格、表单和工具界面——元素小、数量多时，大圆角会显得臃肿。同一界面里要统一：比如卡片 6px，按钮和输入框 4px。',
    kw: ['小圆角', '稳妥', '后台', '表单'],
    css: '.card   { border-radius: 6px; }\n.button { border-radius: 4px; }\n.input  { border-radius: 4px; }' },
  { code: 'K03', name: '中圆角', en: 'Medium radius', meta: 'border-radius: 8–12px', bg: '#ECEDF0',
    html: maScene(maCard('ma-r12'), '卡片 12px · 按钮 8px'),
    desc: '现在最主流的圆角：卡片 12px、按钮 8px。友好但不幼稚，现代 SaaS 网站和 App（Stripe、Linear、Notion 一类）基本都在这个范围。拿不定主意时，选它就对了。',
    more: '一个讲究：元素嵌套时，内层圆角 ≈ 外层圆角 − 两者之间的间距，两条弧线才平行（同心）；内外用同一个圆角，内层会显得「鼓」出来。',
    kw: ['中圆角', '主流', '友好', '同心圆角'],
    css: '.card   { border-radius: 12px; }\n.button { border-radius: 8px; }\n/* 嵌套：内圆角 = 外圆角 − 间距 */\n.card > .inner { border-radius: calc(12px - 6px); margin: 6px; }' },
  { code: 'K04', name: '大圆角', en: 'Large radius', meta: 'border-radius: 20–28px', bg: '#ECEDF0',
    html: maScene(maCard('ma-r24'), '卡片 24px · 按钮 14px'),
    desc: '卡片圆角 24px 左右，按钮接近胶囊。柔软、亲和、有「App 感」，像 iOS 小组件和便当盒格子。适合面向大众的产品和学习类 App；放在密集的表格旁边会显得太软。',
    more: '大圆角要配足够的内边距（至少是圆角的 2/3 到 1 倍），否则文字会顶进弧线里。iOS 小组件约 22px，Material 3 的大卡片 28px。大圆角 + 柔和阴影 + 浅色底是近年最常见的「友好」组合。',
    kw: ['大圆角', '柔软', 'App 感', '小组件'],
    css: '.card {\n  border-radius: 24px;\n  padding: 22px;          /* 内边距要跟上 */\n}\n.button { border-radius: 14px; }' },
  { code: 'K05', name: '胶囊', en: 'Pill', meta: 'border-radius: 999px', bg: '#ECEDF0', init: maPressInit,
    html: maScene(`<div class="ma-pills">
      <label class="ma-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><input type="text" placeholder="搜索定理、公式…" aria-label="搜索（示例）"></label>
      <div class="ma-seg ma-seg-p no-pagekeys" role="group" aria-label="章节"><button type="button" aria-pressed="false">极限</button><button type="button" aria-pressed="true">级数</button><button type="button" aria-pressed="false">积分</button></div>
      <div class="ma-prow"><button type="button" class="ma-pb">开始学习</button><button type="button" class="ma-pb ma-pb2">收藏</button></div>
      <div class="ma-prow"><span class="ma-chip">收敛</span><span class="ma-chip">一致收敛</span><span class="ma-chip ma-on">幂级数</span></div></div>`),
    desc: '两端是完整半圆的「胶囊」形，border-radius: 999px 就能得到。最适合按钮、标签、搜索框、分段控件这类单行元素，显得圆润、好点、现代。不适合多行的大卡片。',
    more: '胶囊按钮在 Apple、Google 的新设计里都很常见。左右内边距要比上下大（约 2:1），文字才显得居中好看。一个界面里「卡片中圆角 + 按钮胶囊」混用，是很常见的搭配。',
    kw: ['胶囊', '全圆角', '标签', '搜索框'],
    css: '.button, .chip, .search {\n  border-radius: 999px;   /* 任何大于高度一半的值都行 */\n}\n.button { padding: 9px 18px; }' },
  { code: 'K06', name: '超椭圆', en: 'Squircle', meta: '连续曲率圆角', bg: '#F3F4F6',
    html: maScene(`<div class="ma-sq">
      <figure><svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="k06-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6E8BFF"/><stop offset="1" stop-color="#A26BFA"/></linearGradient></defs><rect x="2" y="2" width="96" height="96" rx="29" fill="url(#k06-g)"/></svg><figcaption>普通圆角</figcaption></figure>
      <figure><svg viewBox="0 0 100 100" aria-hidden="true"><path d="${maSquircle}" fill="url(#k06-g)"/></svg><figcaption>超椭圆</figcaption></figure>
      <figure><svg class="ma-ov" viewBox="0 0 54 54" aria-hidden="true"><path d="${maSquircle}" class="ma-ov-s"/><rect x="2" y="2" width="96" height="96" rx="29" class="ma-ov-r"/></svg><figcaption>左上角放大</figcaption></figure></div>`),
    desc: '普通圆角是「直线 + 四分之一圆」，交接处曲率突变，细看有个「折点」；超椭圆从直边到弧线平滑过渡，拐角更饱满、自然——苹果的图标和硬件都是这种形状。右边把两条轮廓叠在一起放大：红虚线是普通圆角（在拐角处削得更多），蓝色是超椭圆。',
    more: '数学上超椭圆是 |x|ⁿ + |y|ⁿ = 1（这里 n = 5，用 SVG 路径画出）。CSS 的 border-radius 只能画圆弧；网页上要画超椭圆，通常用 SVG 路径做蒙版（mask 或 clip-path），较新的浏览器开始支持 corner-shape: squircle。Figma 里对应的选项叫 corner smoothing（圆角平滑）。',
    kw: ['超椭圆', '连续曲率', '苹果图标', 'corner smoothing'], links: [['Wikipedia', 'https://en.wikipedia.org/wiki/Squircle']],
    css: '/* 普通圆角 */\n.icon { border-radius: 22%; }\n/* 超椭圆：用 SVG 路径做蒙版 */\n.icon.squircle {\n  border-radius: 0;\n  mask: url(squircle.svg) center / 100% 100%;\n}\n/* 较新的浏览器 */\n.icon.squircle { corner-shape: squircle; border-radius: 30%; }' },
  { code: 'K07', name: '细线描边', en: 'Hairline', meta: '无阴影 · 只描边', bg: '#FAFAFA',
    html: maScene(`<div class="ma-hl"><div class="ma-hl-h"><b>第 3 章 · 级数</b><span>3 节</span></div>
      <button type="button" class="ma-hl-r"><span>3.1 数项级数</span><i>›</i></button><button type="button" class="ma-hl-r"><span>3.2 幂级数</span><i>›</i></button><button type="button" class="ma-hl-r"><span>3.3 傅里叶级数</span><i>›</i></button></div>`),
    desc: '不用阴影，只用 1px 的浅灰细线勾出边界和分隔。扁平、干净、信息感强，是 Vercel、Linear、GitHub 这类开发者产品的标志性做法。层级靠线和底色深浅区分。',
    more: '线的颜色要很浅（只比背景深一点，如 #E4E4E7），否则会像表格。高分屏上可以用 0.5px 让线更细。和中圆角搭配最常见。一页里线太多会显得琐碎，可以用留白代替一部分分隔线。',
    kw: ['细线', '1px', '描边', '扁平'],
    css: '.card {\n  border: 1px solid #E4E4E7;\n  border-radius: 10px;\n  box-shadow: none;\n}\n.card .row + .row { border-top: 1px solid #F0F0F2; }' },
  { code: 'K08', name: '柔和投影', en: 'Soft elevation', meta: '多层阴影叠加', bg: '#F1F2F4',
    html: maScene(`<div class="ma-pair"><figure><div class="ma-mini ma-hard"><span class="ma-k">定理 3.2</span><b>收敛半径</b><i></i><i></i></div><figcaption>单层 · 又黑又硬</figcaption></figure>
      <figure><div class="ma-mini ma-soft"><span class="ma-k">定理 3.2</span><b>收敛半径</b><i></i><i></i></div><figcaption>四层 · 柔和</figcaption></figure></div>`),
    desc: '左边是一层又黑又硬的阴影，右边是四层很淡的阴影叠在一起（近处小而实，远处大而虚），像真实光线下的物体轻轻浮在纸面上。苹果、Stripe 的卡片都是这种做法。',
    more: '真实物体的影子由两部分组成：贴近物体的清晰小阴影，和扩散得很远的柔和大阴影。用多层 box-shadow 模拟：每层的 y 偏移和模糊翻倍，不透明度都很低（3–8%）。阴影颜色可以带一点背景的色调，而不是纯黑。',
    kw: ['柔和阴影', '多层', '漂浮', '苹果式'], links: [['Josh Comeau：设计阴影', 'https://www.joshwcomeau.com/css/designing-shadows/']],
    css: '/* 单层（不推荐） */\n.card.hard { box-shadow: 0 6px 12px rgb(0 0 0 / .35); }\n/* 多层叠加 */\n.card.soft {\n  box-shadow:\n    0 1px 1px rgb(0 0 0 / .04),\n    0 2px 4px rgb(0 0 0 / .04),\n    0 6px 12px rgb(0 0 0 / .05),\n    0 18px 36px -6px rgb(0 0 0 / .10);\n}' },
  { code: 'K09', name: '层级高度', en: 'Elevation 1–5', meta: 'Material Design', bg: '#F1F2F5',
    html: maScene(`<div class="ma-elev">${[1, 3, 6, 8, 12].map((dp, i) => `<figure><button type="button" class="ma-e ma-e${i + 1}">${i + 1}</button><figcaption>${dp}dp</figcaption></figure>`).join('')}</div>`, '卡片 → 按钮 → 浮动按钮 → 菜单 → 对话框'),
    desc: '用阴影的深浅表示元素「离纸面多高」：1 级是贴着纸的卡片，3 级是浮起的按钮，5 级是对话框。阴影越大越虚，元素越「靠前」。鼠标移上去，每块会再升一级。',
    more: '这是 Material Design 的核心概念：每一级高度对应一组固定的阴影（图中是 Material 3 的五级阴影）。好处是整个界面的前后关系有统一规则：同一层级的东西阴影相同，弹出层一定比底下的高。暗色模式下改用更亮的表面色表示高度（见 C09）。',
    kw: ['层级', '高度', 'Material', '前后关系'], links: [['Material 3 · Elevation', 'https://m3.material.io/styles/elevation/overview']],
    css: '.level-1 { box-shadow: 0 1px 2px rgb(0 0 0 / .3), 0 1px 3px 1px rgb(0 0 0 / .15); }\n.level-2 { box-shadow: 0 1px 2px rgb(0 0 0 / .3), 0 2px 6px 2px rgb(0 0 0 / .15); }\n.level-3 { box-shadow: 0 1px 3px rgb(0 0 0 / .3), 0 4px 8px 3px rgb(0 0 0 / .15); }\n.level-4 { box-shadow: 0 2px 3px rgb(0 0 0 / .3), 0 6px 10px 4px rgb(0 0 0 / .15); }\n.level-5 { box-shadow: 0 4px 4px rgb(0 0 0 / .3), 0 8px 12px 6px rgb(0 0 0 / .15); }' },
  { code: 'K10', name: '硬阴影', en: 'Hard offset', meta: '新粗野主义 Neo-brutalism', bg: '#FFD84D',
    html: maScene(maCard('ma-brut', '按我试试')),
    desc: '粗黑描边 + 不模糊的纯黑阴影（向右下偏移 4–6px），配高饱和的平涂色。像贴纸、像漫画，有趣、大胆、有态度，近几年在独立产品和创意网站上很流行。按下按钮，它会「压」进阴影里。',
    more: '硬阴影没有模糊，所以像一块剪纸叠在另一块上。按下时让元素朝阴影方向移动、阴影同时缩短，就得到很有手感的反馈。适合个性化、年轻的产品；严肃的教材慎用，可以只在少数按钮上用。',
    kw: ['硬阴影', '粗描边', '新粗野主义', '贴纸感'],
    css: '.card {\n  border: 2.5px solid #111;\n  box-shadow: 6px 6px 0 #111;   /* 模糊为 0 */\n}\n.button {\n  border: 2px solid #111;\n  box-shadow: 4px 4px 0 #111;\n  transition: transform .08s, box-shadow .08s;\n}\n.button:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #111; }' },
  { code: 'K11', name: '长投影', en: 'Long shadow', meta: '扁平设计 · 2013', bg: '#ECF0F1',
    html: maScene(`<div class="ma-longs">${[['∑', '#1ABC9C', '#11806A'], ['∫', '#3498DB', '#20669A'], ['π', '#E67E22', '#A85A16']].map(([g, c, d]) => `<span class="ma-lt" style="background:${c};--ma-ls:${d}"><b style="text-shadow:${maLong}">${g}</b></span>`).join('')}</div>`),
    desc: '图标的影子沿 45° 一直拖到底，被方块的边缘截断。这是 2013 年前后扁平设计（Flat UI）的招牌：纯色块、白色图形、长长的深色斜影，既平面又有一点立体感。',
    more: '实现方法是叠几十层逐像素偏移的 text-shadow（1px 1px、2px 2px……），再让外框 overflow: hidden 把影子截断。今天看已经有年代感，适合复古扁平风的图标和插画，不建议大面积用在界面上。',
    kw: ['长投影', '45°', '扁平设计', 'Flat UI'],
    css: '.tile { overflow: hidden; background: #1ABC9C; }\n.tile .glyph {\n  color: #fff;\n  /* 几十层逐像素偏移，通常用 Sass 循环生成 */\n  text-shadow: 1px 1px 0 #11806A, 2px 2px 0 #11806A,\n               3px 3px 0 #11806A, /* … */ 60px 60px 0 #11806A;\n}' },
  { code: 'K12', name: '彩色光晕', en: 'Glow', meta: '暗色 · 科技感', bg: '#0A0C16', dark: true,
    html: maScene(maCard('ma-glow')),
    desc: '在深色背景上，按钮和卡片边缘散发出彩色的光（大模糊、低不透明度的彩色阴影），像屏幕上的霓虹。科技、AI、游戏类产品很爱用，能把视线牢牢吸到主按钮上。',
    more: '光晕用彩色 box-shadow 实现：0 0 40px 的大模糊 + 一圈 1px 的同色描边。只在暗背景上有效，亮背景上会显得脏。一屏里只让一两个元素发光——全都发光就等于都不发光。',
    kw: ['光晕', '发光', '暗色', '霓虹'],
    css: '.card {\n  background: #12152A;\n  box-shadow: 0 0 0 1px rgb(124 92 255 / .35),\n              0 0 48px -8px rgb(124 92 255 / .45);\n}\n.button {\n  background: linear-gradient(135deg, #7C5CFF, #4D7CFF);\n  box-shadow: 0 0 0 1px rgb(150 130 255 / .6),\n              0 8px 30px -4px rgb(124 92 255 / .8);\n}' },
  { code: 'K13', name: '内阴影', en: 'Inset / pressed', meta: '凹陷 · 按下', bg: '#E5E8ED', init: maPressInit,
    html: maScene(`<div class="ma-inset">
      <div class="ma-seg ma-seg-i no-pagekeys" role="group" aria-label="章节"><button type="button" aria-pressed="false">数列</button><button type="button" aria-pressed="true">级数</button><button type="button" aria-pressed="false">积分</button></div>
      <label class="ma-well"><input type="text" placeholder="在凹槽里输入答案…" aria-label="答案（示例）"></label></div>`, '选中的一格是「按下去」的 · 点别的试试'),
    desc: '阴影画在元素内部，看起来是凹进去的：用在按下的按钮、被选中的分段、输入框的凹槽上。上面的分段控件里，选中的一格是凹的、其余是凸的——点一下试试；下面是输入框凹槽。',
    more: 'box-shadow 加 inset 关键字就变成内阴影。上边缘的内阴影 + 下边缘一线高光，最有「凹」的感觉。新拟态（Neumorphism）就是把凸起和凹陷都做得极其柔和；适度使用能给界面带来手感，过度则对比度太低、看不清边界。',
    kw: ['内阴影', '凹陷', '按下', 'inset'],
    css: '.segment[aria-pressed="true"], .well {\n  background: #DCE0E6;\n  box-shadow: inset 0 2px 4px rgb(0 0 0 / .18),\n              inset 0 -1px 0 rgb(255 255 255 / .6);\n}\n.segment {   /* 凸起 */\n  background: linear-gradient(#FFF, #F1F3F6);\n  box-shadow: 0 1px 2px rgb(0 0 0 / .18);\n}' },
  { code: 'K14', name: '焦点环', en: 'Focus ring', meta: '双环 · 可访问性', bg: '#F7F8FA',
    html: maScene(`<div class="ma-focus"><div class="ma-frow"><figure><button type="button" class="ma-fb">默认</button><figcaption>默认</figcaption></figure><figure><button type="button" class="ma-fb ma-ring">提交答案</button><figcaption>双环</figcaption></figure></div>
      <figure><label class="ma-fi"><input type="text" value="Σ aₙ xⁿ" aria-label="示例输入框"></label><figcaption>柔和光环</figcaption></figure></div>`),
    desc: '用 Tab 键选中按钮或输入框时，外面出现一圈清晰的环：常见做法是「白色间隙 + 蓝色外环」的双环，或半透明的柔和光环。它告诉键盘用户「现在在这里」，是可访问性的基本要求。点一下样品再按 Tab 试试。',
    more: 'CSS 用 :focus-visible（只在键盘操作时出现）配合 outline 或多层 box-shadow。双环里白色那一圈保证环在任何背景上都看得见。不要为了好看用 outline: none 去掉焦点环又不提供替代——键盘用户会迷路。',
    kw: ['焦点环', 'focus-visible', '双环', '可访问性'],
    css: '/* 双环：白色间隙 + 蓝环 */\n.button:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563EB;\n}\n/* 柔和光环 */\n.input:focus {\n  border-color: #2563EB;\n  box-shadow: 0 0 0 4px rgb(37 99 235 / .22);\n}' },
  { code: 'K15', name: '毛玻璃', en: 'Frosted glass', meta: 'backdrop-filter', bg: '#E9E6FF',
    html: `<div class="ma-sc ma-glassbg"><i class="ma-blob ma-b1"></i><i class="ma-blob ma-b2"></i><i class="ma-blob ma-b3"></i><span class="ma-bigsym">∑</span><div class="ma-z">${maCard('ma-glass')}</div></div>`,
    desc: '半透明的卡片把身后的内容模糊掉，像磨砂玻璃：能隐约看见背后的颜色，又不影响前面的文字。macOS、iOS（控制中心、菜单栏）和 Windows 11 都大量使用。背后要有丰富的颜色，效果才明显。',
    more: '关键是 backdrop-filter: blur() saturate()：模糊加上提高饱和度，玻璃才通透、不发灰；再加一圈半透明白色细边当「玻璃边缘」。背景单调时毛玻璃看不出来；它也比较耗性能，不要大面积叠很多层。',
    kw: ['毛玻璃', '半透明', 'backdrop-filter', '苹果'], links: [['MDN：backdrop-filter', 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter']],
    css: '.glass {\n  background: rgb(255 255 255 / .3);\n  backdrop-filter: blur(16px) saturate(180%);\n  -webkit-backdrop-filter: blur(16px) saturate(180%);\n  border: 1px solid rgb(255 255 255 / .55);\n  box-shadow: 0 8px 32px rgb(31 38 135 / .18);\n}' },
  { code: 'K16', name: '渐变描边', en: 'Gradient border', meta: '高亮 · 推荐', bg: '#F6F6FA',
    html: maScene(`<div class="ma-gradwrap">${maCard('ma-grad', '升级方案')}<button type="button" class="ma-flow">✦ 让 AI 讲解这一节</button></div>`),
    desc: '边框不是单色而是一道渐变（紫 → 粉 → 橙），常用来标出「推荐方案」「新功能」或 AI 相关的内容。下面按钮的边框会缓慢旋转流动。精致、吸睛，但一屏里最多用一两处。',
    more: 'CSS 没有直接的渐变边框，常用技巧是两层背景：内层纯色只铺在 padding-box，外层渐变铺满 border-box，再配一圈透明边框。流动效果用 conic-gradient 加一个用 @property 注册的角度变量做动画。',
    kw: ['渐变描边', '高亮', '流光', 'conic-gradient'],
    css: '.card {\n  border: 2px solid transparent;\n  background:\n    linear-gradient(#fff, #fff) padding-box,\n    linear-gradient(135deg, #7C3AED, #EC4899, #F59E0B) border-box;\n}\n@property --a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }\n.button { /* 同样两层背景，外层换成 conic-gradient(from var(--a), …) */\n  animation: spin 4s linear infinite;\n}\n@keyframes spin { to { --a: 360deg; } }' },
  { code: 'K17', name: '纸张颗粒', en: 'Paper grain', meta: '噪点 · 质感', bg: '#E7DFCC',
    html: maScene(`<div class="ma-pair ma-papers"><figure><div class="ma-paper"><span class="ma-k">定理 3.2</span><b>收敛半径</b><i></i><i></i><i></i></div><figcaption>纯色</figcaption></figure>
      <figure><div class="ma-paper ma-grain"><span class="ma-k">定理 3.2</span><b>收敛半径</b><i></i><i></i><i></i></div><figcaption>加颗粒</figcaption></figure></div>`),
    desc: '在纯色上叠一层细小的噪点，平面立刻有了纸张、胶片的触感。左边是纯色卡片，右边加了颗粒——温暖、手作、有印刷感，适合人文、阅读和复古风格的页面。',
    more: '噪点用 SVG 的 feTurbulence 滤镜生成，作为 data URI 背景平铺，不需要任何图片文件。颗粒要淡（不透明度 5–15%），刚好「感觉得到、看不太清」。配米色纸和衬线字（参考 C14 墨水与纸）效果最好。',
    kw: ['颗粒', '噪点', '纸张', 'feTurbulence'],
    css: '.paper {\n  background-color: #F7F1E3;\n  /* 噪点：SVG feTurbulence 滤镜，作为 data URI 平铺 */\n  background-image: url("data:image/svg+xml,%3Csvg …%3E%3Cfilter id=\'n\'%3E\n    %3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\'/%3E …");\n}\n/* 或者叠一层伪元素，用 opacity 控制颗粒强度 */\n.paper::after {\n  content: ""; position: absolute; inset: 0;\n  background: url(noise.svg); opacity: .12; mix-blend-mode: multiply;\n}' },
  { code: 'K18', name: '斜面浮雕', en: 'Bevel / emboss', meta: '拟物 · iOS 6 时代', bg: '#C9CDD3',
    html: `<div class="ma-sc ma-metal"><div class="ma-z"><div class="ma-plate"><span class="ma-engr">第 3 章 · 级数</span><b class="ma-emb">收敛半径</b><span class="ma-slot">R = 1 / L</span><button type="button" class="ma-bev">开始学习</button></div></div></div>`,
    desc: '用渐变、上缘高光和下缘阴影做出凸起的按钮，文字像压印在金属板上（字下方有一像素白色投影）。这是 2007–2013 年拟物设计（iOS 6 之前）的典型手法：立体、有触感、有年代感。',
    more: '压印文字：深色字 + 下方 1px 白色 text-shadow；凸起文字反过来（上方 1px 深色）。斜面按钮：上亮下暗的渐变 + 顶部 1px 内高光 + 底部外阴影，按下时渐变反转。今天整体使用会显得过时，但少量用在开关、旋钮、游戏化元素上很有趣味。',
    kw: ['浮雕', '斜面', '拟物', '高光'],
    css: '.engraved { color: #5D636C; text-shadow: 0 1px 0 rgb(255 255 255 / .75); }\n.bevel {\n  background: linear-gradient(#7DB3F2, #3B7EDB 50%, #2C6BCB 51%, #3A79D6);\n  border: 1px solid #1E4E9A;\n  box-shadow: inset 0 1px 0 rgb(255 255 255 / .5), 0 1px 2px rgb(0 0 0 / .35);\n  text-shadow: 0 -1px 0 rgb(0 0 0 / .35);\n}\n.bevel:active { background: linear-gradient(#2C6BCB, #3B7EDB); }' }
];

registerPages('K', [
  { type: 'gallery', token: 'shape', title: '圆角、阴影与边', min: 290,
    intro: '同一张小卡片，换不同的圆角、阴影、描边和表面处理。这些细节决定界面是「硬」还是「软」、是「平」还是「立体」。样品里的组件都是真实尺寸，放大视图会整体放大。',
    tiles: MA.map((t) => ({ ...t, ratio: t.ratio || '4 / 3' }))
  },
  { type: 'custom', token: 'shape-lab', title: '卡片调试台',
    intro: '拖动滑块调一张卡片的圆角、阴影、描边和透明度，下面实时生成 CSS，可以直接复制。先点一个预设看看各种风格的参数，再慢慢微调。',
    render: maLab }
]);

// ======================= 卡片调试台 =======================
const MA_PRESETS = {
  apple: { name: '苹果柔和', bg: 'light', r: 18, p: 24, sx: 0, sy: 10, bl: 28, sp: -4, op: 7, ly: 4, bw: 1, bc: 'k', bo: 5, co: 100, bb: 0 },
  material: { name: 'Material', bg: 'light', r: 12, p: 20, sx: 0, sy: 4, bl: 8, sp: 1, op: 16, ly: 2, bw: 0, bc: 'k', bo: 10, co: 100, bb: 0 },
  brutal: { name: '粗野', bg: 'warm', r: 6, p: 20, sx: 6, sy: 6, bl: 0, sp: 0, op: 100, ly: 1, bw: 2.5, bc: 'k', bo: 100, co: 100, bb: 0 },
  glass: { name: '玻璃', bg: 'color', r: 22, p: 24, sx: 0, sy: 8, bl: 32, sp: 0, op: 14, ly: 1, bw: 1, bc: 'w', bo: 55, co: 26, bb: 16 },
  flat: { name: '扁平', bg: 'light', r: 8, p: 20, sx: 0, sy: 0, bl: 0, sp: 0, op: 0, ly: 1, bw: 0, bc: 'k', bo: 10, co: 100, bb: 0 },
  hair: { name: '细线', bg: 'light', r: 10, p: 20, sx: 0, sy: 0, bl: 0, sp: 0, op: 0, ly: 1, bw: 1, bc: 'k', bo: 12, co: 100, bb: 0 }
};
const MA_SLIDERS = [
  ['形状', [['r', '圆角', 0, 48, 1, 'px'], ['p', '内边距', 8, 48, 1, 'px']]],
  ['阴影', [['sx', 'x 偏移', -20, 20, 1, 'px'], ['sy', 'y 偏移', 0, 40, 1, 'px'], ['bl', '模糊', 0, 80, 1, 'px'], ['sp', '扩散', -20, 20, 1, 'px'], ['op', '每层不透明度', 0, 100, 1, '%'], ['ly', '叠加层数', 1, 5, 1, '']]],
  ['描边', [['bw', '宽度', 0, 4, 0.5, 'px'], ['bo', '不透明度', 0, 100, 1, '%']]],
  ['表面', [['co', '底色不透明', 0, 100, 1, '%'], ['bb', '背景模糊', 0, 40, 1, 'px']]]
];
const MA_BGS = [['color', '彩色'], ['light', '浅灰'], ['warm', '暖黄'], ['dark', '深色']];
const MA_BC = { k: [17, 19, 24], w: [255, 255, 255], a: [79, 107, 237] };

function maLab(body, ctx) {
  const st = { ...MA_PRESETS.apple, preset: 'apple' };
  body.innerHTML = `<div class="ma-lab">
    <div class="ma-lv">
      <div class="ma-pv ma-pv-light">
        <i class="ma-pb1"></i><i class="ma-pb2"></i><i class="ma-pb3"></i><span class="ma-pvsym">∫</span>
        <div class="ma-pvbar"><div class="ma-seg2" role="group" aria-label="预览背景">${MA_BGS.map(([k, n]) => `<button type="button" data-bg="${k}">${n}</button>`).join('')}</div></div>
        <div class="ma-pcard"><span class="ma-k">定理 3.2</span><b>收敛半径</b><p>若 |aₙ₊₁ / aₙ| → L，则幂级数 Σ aₙxⁿ 的收敛半径 <span class="ma-nw">R = 1 / L。</span></p><span class="ma-pact"><button type="button">开始学习</button><span>级数 · 3 分钟</span></span></div>
      </div>
      <section class="ma-panel ma-codep"><div class="ma-ph"><h3>CSS</h3><button type="button" class="ma-copy">复制 CSS</button></div><pre class="ma-code"><code></code></pre></section>
    </div>
    <section class="ma-panel ma-ctl">
      <h3 class="ma-h">预设</h3>
      <div class="ma-presets">${Object.entries(MA_PRESETS).map(([k, p]) => `<button type="button" data-p="${k}">${p.name}</button>`).join('')}</div>
      ${MA_SLIDERS.map(([g, rows]) => `<h3 class="ma-h">${g}</h3><div class="ma-rows">${rows.map(([k, n, a, b, s, u]) => `<label class="ma-rg"><span>${n}</span><input type="range" min="${a}" max="${b}" step="${s}" data-k="${k}"><output data-u="${u}"></output></label>`).join('')}
        ${g === '描边' ? `<div class="ma-rg"><span>颜色</span><div class="ma-bcs" role="group" aria-label="描边颜色">${Object.entries({ k: '深色', w: '白色', a: '强调色' }).map(([k, n]) => `<button type="button" data-bc="${k}" aria-label="${n}" title="${n}"></button>`).join('')}</div></div>` : ''}</div>`).join('')}
    </section>
  </div>`;
  const $ = (s) => body.querySelector(s);
  const pv = $('.ma-pv'), card = $('.ma-pcard'), code = $('.ma-code code');
  const f = (v) => +(+v).toFixed(2);
  const rgba = ([r, g, b], a) => `rgb(${r} ${g} ${b} / ${f(a)})`;
  const px = (v) => (f(v) === 0 ? '0' : `${f(v)}px`);

  function shadows() {
    if (!st.op || (!st.sx && !st.sy && !st.bl && !st.sp)) return [];
    const n = st.ly;
    return Array.from({ length: n }, (_, i) => {
      const k = 2 ** (i - n + 1); // 每层翻倍：1/8, 1/4, 1/2, 1
      return `${px(st.sx * k)} ${px(st.sy * k)} ${px(st.bl * k)}${st.sp ? ` ${px(st.sp * k)}` : ''} ${rgba([0, 0, 0], st.op / 100)}`;
    });
  }
  function draw() {
    const dark = st.bg === 'dark';
    const base = dark ? [30, 33, 41] : [255, 255, 255];
    const sh = shadows();
    const props = [
      ['border-radius', `${st.r}px`],
      ['padding', `${st.p}px`],
      ['background', rgba(base, st.co / 100)],
      ['border', st.bw ? `${st.bw}px solid ${rgba(MA_BC[st.bc], st.bo / 100)}` : 'none'],
      ['box-shadow', sh.length ? (sh.length > 1 ? `\n    ${sh.join(',\n    ')}` : sh[0]) : 'none']
    ];
    if (st.bb) props.push(['backdrop-filter', `blur(${st.bb}px) saturate(1.6)`], ['-webkit-backdrop-filter', `blur(${st.bb}px) saturate(1.6)`]);
    card.style.cssText = props.map(([k, v]) => `${k}:${v.replace(/\n\s*/g, ' ')}`).join(';') + `;--ma-br:${Math.round(Math.min(st.r * 0.6, 20))}px`;
    card.classList.toggle('ma-onDark', dark);
    card.classList.toggle('ma-hardbtn', !st.bl && st.op >= 60 && !!(st.sx || st.sy));
    pv.className = `ma-pv ma-pv-${st.bg}`;
    code.innerHTML = `<span class="ma-sel">.card</span> {\n${props.map(([k, v]) => `  <span class="ma-pr">${k}</span>: ${esc(v)};`).join('\n')}\n}`;
    body.querySelectorAll('.ma-rg input').forEach((inp) => {
      inp.value = st[inp.dataset.k];
      const o = inp.nextElementSibling; o.textContent = `${st[inp.dataset.k]}${o.dataset.u}`;
      const pct = ((st[inp.dataset.k] - inp.min) / (inp.max - inp.min)) * 100;
      inp.style.setProperty('--ma-fill', `${pct}%`);
    });
    body.querySelectorAll('[data-p]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === st.preset)));
    body.querySelectorAll('[data-bg]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.bg === st.bg)));
    body.querySelectorAll('[data-bc]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.bc === st.bc)));
  }
  body.querySelectorAll('.ma-rg input').forEach((inp) => inp.addEventListener('input', () => { st[inp.dataset.k] = +inp.value; st.preset = ''; draw(); }));
  $('.ma-presets').addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) { Object.assign(st, MA_PRESETS[b.dataset.p], { preset: b.dataset.p }); draw(); } });
  $('.ma-seg2').addEventListener('click', (e) => { const b = e.target.closest('[data-bg]'); if (b) { st.bg = b.dataset.bg; draw(); } });
  $('.ma-bcs').addEventListener('click', (e) => { const b = e.target.closest('[data-bc]'); if (b) { st.bc = b.dataset.bc; st.preset = ''; if (!st.bw) st.bw = 1; draw(); } });
  $('.ma-copy').addEventListener('click', async (e) => {
    const b = e.currentTarget, text = code.textContent;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
    }
    b.textContent = ok ? '已复制 ✓' : '复制失败，请手动选择'; ctx.later(1500, () => { b.textContent = '复制 CSS'; });
  });
  draw();
}
