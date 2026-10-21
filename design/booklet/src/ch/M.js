// ===== M 动效：缓动与时长 / 入场与反馈 / 滚动与氛围 =====
// 动效关掉时（或用户偏好减少动效），给根元素加 mo-still，循环动画停在「完成」的样子，而不是停在透明的第 0 帧
const moStill = (stage, ctx) => {
  const root = stage.firstElementChild;
  const sync = () => root && root.classList.toggle('mo-still', !ctx.motion());
  sync();
  const mo = new MutationObserver(sync);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  ctx.add(() => mo.disconnect());
};

// —— 缓动函数：曲线路径（SVG 0–100 坐标，y 向下）与 CSS linear() 字符串 ——
const moPt = (x, y) => `${(x * 100).toFixed(2)},${(100 - y * 100).toFixed(2)}`;
const moBz = (x1, y1, x2, y2) => `M0,100 C${moPt(x1, y1)} ${moPt(x2, y2)} 100,0`;
const moPoly = (f, n = 160) => 'M' + Array.from({ length: n + 1 }, (_, i) => moPt(i / n, f(i / n))).join(' L');
const moSpring = (t) => {
  if (t >= 1) return 1;
  const z = 0.5, w = 10, wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t));
};
const moBounce = (x) => {
  const n = 7.5625, d = 2.75;
  if (x < 1 / d) return n * x * x;
  if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75;
  if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375;
  return n * (x -= 2.625 / d) * x + 0.984375;
};
const moR = (v) => String(+v.toFixed(3));
const moLinearEven = (f, n) => `linear(${Array.from({ length: n + 1 }, (_, i) => moR(i === n ? 1 : f(i / n))).join(', ')})`;
const moLinearAt = (f, ts) => `linear(${ts.map((t, i) => (i === 0 ? '0' : i === ts.length - 1 ? '1' : `${moR(f(t))} ${+(t * 100).toFixed(2)}%`)).join(', ')})`;
const MO_SPRING = moLinearEven(moSpring, 40);
const MO_BOUNCE = moLinearAt(moBounce, [...new Set([...Array.from({ length: 33 }, (_, i) => i / 32), 1 / 2.75, 2 / 2.75, 2.5 / 2.75].map((t) => +t.toFixed(4)))].sort((a, b) => a - b));
// 把很长的 linear() 拆成多行，放进 CSS 要点里
const moWrap = (s, k = 8) => { const p = s.slice(7, -1).split(', '); const rows = []; for (let i = 0; i < p.length; i += k) rows.push('    ' + p.slice(i, i + k).join(', ')); return 'linear(\n' + rows.join(',\n') + '\n  )'; };

const moEz = (o) => ({
  code: o.code, name: o.name, en: o.en, meta: o.meta, desc: o.desc, more: o.more, kw: o.kw, css: o.css, links: o.links,
  bg: '#f6f7f9',
  html: `<div class="mo-root mo-ez" style="--mo-e:${o.fn}">
    ${o.hot ? `<span class="mo-ez-hot">${o.hot}</span>` : ''}
    <div class="mo-ez-guide"><div class="mo-ez-f"><div class="mo-ez-y"><i class="mo-ez-gl"></i></div></div></div>
    <div class="mo-ez-box">
      <svg class="mo-ez-svg mo-ez-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="mo-ez-ax1" d="M0,0 V100 H100"/><path class="mo-ez-ax2" d="M0,0 H100 V100"/></svg>
      <svg class="mo-ez-svg mo-ez-base" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${o.path}"/></svg>
      <div class="mo-ez-f">
        <div class="mo-ez-rv"><svg class="mo-ez-svg mo-ez-hi" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${o.path}"/></svg></div>
        <div class="mo-ez-x"><i class="mo-ez-t"></i><div class="mo-ez-y"><i class="mo-ez-dot"></i></div></div>
      </div>
      <span class="mo-ez-n mo-ez-n1">1</span><span class="mo-ez-n mo-ez-n0">0</span>
      <span class="mo-ez-ly">进度 ↑</span><span class="mo-ez-lx">时间 →</span>
    </div>
    <div class="mo-ez-rail"><i class="mo-ez-mk mo-ez-mk1"></i><i class="mo-ez-mk mo-ez-mk0"></i><span class="mo-ez-ml mo-ez-ml1">终点</span><span class="mo-ez-ml mo-ez-ml0">起点</span>
      <div class="mo-ez-f"><div class="mo-ez-y"><i class="mo-ez-ball"></i></div></div></div>
    <div class="mo-ez-code"><b>${o.label}</b>${o.eq ? `<span>${o.eq}</span>` : ''}</div>
  </div>`,
  init: moStill
});

const MO_DU = [
  [100, '即时反馈：按下、开关、勾选'],
  [200, '小元素：悬停、提示气泡'],
  [300, '中等：下拉菜单、弹窗出现'],
  [500, '大面积：页面切换、抽屉'],
  [800, '偏慢：只用于强调和引导']
];

registerPages('M', [
  {
    type: 'gallery', token: 'motion-ease', title: '缓动与时长',
    intro: '缓动（easing）决定动画「怎么加速、怎么减速」。每张图：横轴是时间，纵轴是进度；蓝点沿曲线走，右边的小球同步按这个进度从起点移到终点。曲线越陡，那一刻越快。',
    tiles: [
      moEz({
        code: 'M01', name: '线性', en: 'linear', meta: 'CSS 关键字',
        fn: 'linear', path: 'M0,100 L100,0', label: 'linear', eq: '= cubic-bezier(0, 0, 1, 1)',
        desc: '速度从头到尾不变：曲线是一条直线，小球匀速移动，起步和停下都很突然，显得机械。适合本来就该匀速的东西：加载转圈、跑马灯、进度条、颜色循环；界面元素的移动和出现几乎不用它。',
        kw: ['匀速', '机械感', '加载转圈', 'linear'],
        css: '.spinner { animation: spin 1s linear infinite; }\n.marquee { animation: scroll 20s linear infinite; }\n@keyframes spin { to { transform: rotate(1turn); } }'
      }),
      moEz({
        code: 'M02', name: '默认缓动', en: 'ease', meta: 'CSS 默认值',
        fn: 'ease', path: moBz(0.25, 0.1, 0.25, 1), label: 'ease', eq: '= cubic-bezier(.25, .1, .25, 1)',
        desc: 'CSS 不写缓动时的默认值：起步稍快、中段最快、后半段很长地减速。比 linear 自然，但不够利落。很多网站的过渡用的就是它——因为没人去改。',
        kw: ['默认', '温和', 'ease'],
        css: '/* 不写缓动 = ease */\n.card { transition: transform .3s; }\n.card { transition: transform .3s ease; }\n/* ease = cubic-bezier(.25, .1, .25, 1) */'
      }),
      moEz({
        code: 'M03', name: '缓入', en: 'ease-in', meta: '先慢后快',
        fn: 'ease-in', path: moBz(0.42, 0, 1, 1), label: 'ease-in', eq: '= cubic-bezier(.42, 0, 1, 1)',
        desc: '开始慢、越来越快、全速撞到终点：曲线起初平、末端陡。像东西被拉走或掉下去，适合「离开」：元素退出屏幕、关闭弹窗、删除列表项。用在入场会显得迟钝，结尾生硬。',
        kw: ['加速', '退场', '离开', 'ease-in'],
        css: '/* 退场：越走越快，离开视线 */\n.toast.leaving {\n  transition: transform .2s ease-in, opacity .2s ease-in;\n  transform: translateY(16px); opacity: 0;\n}'
      }),
      moEz({
        code: 'M04', name: '缓出', en: 'ease-out', meta: '先快后慢 · 界面最常用', hot: '界面最常用',
        fn: 'ease-out', path: moBz(0, 0, 0.58, 1), label: 'ease-out', eq: '= cubic-bezier(0, 0, .58, 1)',
        desc: '一出发就是最快速度，然后平稳减速停下，像在桌面上推出去的杯子滑行停住：曲线开头陡、末端平。这是界面动效最常用的曲线——入场、展开、弹出、悬停都用它，因为反应立刻发生，结尾又柔和。',
        more: '设计师常用比关键字更「狠」的版本：cubic-bezier(.22, 1, .36, 1)（easeOutQuint）或 cubic-bezier(.16, 1, .3, 1)（easeOutExpo），出发更快、停得更软。Material Design 的「减速曲线」cubic-bezier(0, 0, .2, 1) 也属于这一类。',
        kw: ['减速', '入场', '自然', 'ease-out'],
        css: '.menu { transition: transform .25s ease-out, opacity .25s ease-out; }\n/* 更利落的缓出 */\n.panel { transition: transform .4s cubic-bezier(.22, 1, .36, 1); }'
      }),
      moEz({
        code: 'M05', name: '缓入缓出', en: 'ease-in-out', meta: '慢—快—慢',
        fn: 'ease-in-out', path: moBz(0.42, 0, 0.58, 1), label: 'ease-in-out', eq: '= cubic-bezier(.42, 0, .58, 1)',
        desc: '慢起步、中间快、慢停下，曲线是对称的 S 形。适合在屏幕上从一处移到另一处的元素（滑块、轮播、位置变化），以及来回往复的呼吸、摆动。时长太短时它和 linear 看起来差不多。',
        kw: ['S 形', '对称', '往复', 'ease-in-out'],
        css: '.slider-thumb { transition: transform .4s ease-in-out; }\n.breathe { animation: pulse 2.4s ease-in-out infinite alternate; }'
      }),
      moEz({
        code: 'M06', name: '回弹', en: 'Back / overshoot', meta: 'easeOutBack',
        fn: 'cubic-bezier(.34, 1.56, .64, 1)', path: moBz(0.34, 1.56, 0.64, 1), label: 'cubic-bezier(.34, 1.56, .64, 1)', eq: '第 2 个数 > 1 → 冲过终点',
        desc: '冲过终点一点再退回来：曲线顶端超过 1（这里约 1.1）。带来轻快、俏皮的弹性，常用于弹出的气泡、角标、按下后回弹的按钮。cubic-bezier 的第 2 或第 4 个数大于 1 就会冲出界。幅度要小，用多了显得廉价。',
        kw: ['过冲', '弹性', '俏皮', 'overshoot'],
        css: '.badge.pop {\n  animation: pop .45s cubic-bezier(.34, 1.56, .64, 1);\n}\n@keyframes pop { from { transform: scale(.5); } }'
      }),
      moEz({
        code: 'M07', name: '弹簧', en: 'Spring', meta: 'iOS · Framer Motion · linear()',
        fn: MO_SPRING, path: moPoly(moSpring, 200), label: MO_SPRING.split(', ').slice(0, 4).join(', ') + ', …)', eq: '阻尼比 0.5 的弹簧，40 个点',
        desc: '模拟真实弹簧：冲过头、回摆、再轻晃几下才停稳。iOS（SwiftUI）、Framer Motion 都把弹簧当默认动效，用「刚度、阻尼」而不是时长来描述。CSS 用 linear() 多点函数近似（由工具生成一串数）。适合拖拽松手、卡片展开；阻尼越小晃得越多。',
        more: 'CSS 的 linear() 函数（Chrome 113、Safari 17.2 起）可以用很多个点拼出任意曲线，弹簧和弹跳都靠它。不必手写：Jake Archibald 的 linear() 生成器、Easing Wizard 等工具可以输入刚度与阻尼直接得到代码。',
        kw: ['弹簧', '阻尼', '物理感', 'linear()'],
        css: `.sheet {\n  transition: transform .9s ${moWrap(MO_SPRING, 7)};\n}`
      }),
      moEz({
        code: 'M08', name: '弹跳', en: 'Bounce', meta: 'easeOutBounce',
        fn: MO_BOUNCE, path: moPoly(moBounce, 300), label: MO_BOUNCE.split(', ').slice(0, 3).join(', ') + ', …)', eq: '像球落地：越弹越低',
        desc: '像球落地：到终点后弹起几次，一次比一次低，曲线顶端有几个尖角。卡通感、游戏感强，适合儿童产品、庆祝动画、掉下来的图标；严肃界面里几乎不用，会显得幼稚、拖沓。CSS 没有关键字，用 linear() 或关键帧实现。',
        kw: ['弹跳', '落地', '卡通', '游戏感'],
        css: `.coin {\n  animation: drop 1s ${moWrap(MO_BOUNCE, 4)};\n}\n@keyframes drop { from { transform: translateY(-120px); } }`
      }),
      moEz({
        code: 'M09', name: '阶梯', en: 'steps()', meta: '逐帧跳动',
        fn: 'steps(5, end)', path: 'M0,100 H20 V80 H40 V60 H60 V40 H80 V20 H100 V0', label: 'steps(5, end)', eq: '切成 5 段，每段内静止',
        desc: '不连续，而是一格一格地跳：steps(5) 把动画切成 5 段，每段里完全不动，曲线是台阶。用于逐帧的精灵图动画、秒针跳动、像素风、打字机光标；也可以表现「离散」——比如数列一项一项地出现。',
        kw: ['跳格', '逐帧', '像素风', '离散'],
        css: '/* 精灵图：一张横条图里 8 帧 */\n.sprite { animation: run .8s steps(8) infinite; }\n@keyframes run { to { background-position: -800px 0; } }\n/* 秒针 */\n.second { animation: tick 60s steps(60) infinite; }'
      }),
      {
        code: 'M10', name: '时长对比', en: 'Duration', meta: '100 / 200 / 300 / 500 / 800 ms', wide: true, ratio: '16 / 9', bg: '#f6f7f9',
        desc: '同一条 ease-out 曲线，只改时长，五个小球同时出发。100ms 几乎是瞬间，用于按下等即时反馈；200–300ms 是大多数界面动效的甜区；500ms 适合整页、大面板的移动；800ms 已经让人等待，只在需要强调或引导注意时用。元素越大、移动越远，时长越长；越频繁的操作，动画越短。',
        kw: ['时长', '200–300ms', '快慢', 'duration'],
        css: '.btn:active  { transition-duration: 100ms; }\n.tooltip     { transition: opacity 200ms ease-out; }\n.dropdown    { transition: transform 300ms ease-out; }\n.page        { transition: transform 500ms ease-out; }',
        html: `<div class="mo-root mo-du">
          <div class="mo-du-top"><span>同一条 ease-out · 只改时长 · 同时出发</span><b class="mo-du-clock">t = 800 ms</b></div>
          ${MO_DU.map(([ms, use], i) => `<div class="mo-du-row mo-du-r${i + 1}"><div class="mo-du-lab"><b>${ms}<small>ms</small></b><span>${use}</span></div><div class="mo-du-tr"><i class="mo-du-end"></i><span class="mo-du-ok">✓ 完成</span><div class="mo-du-f"><div class="mo-du-mv"><i class="mo-du-ball"></i></div></div></div></div>`).join('')}
        </div>`,
        init(stage, ctx) {
          moStill(stage, ctx);
          const mv = stage.querySelector('.mo-du-r5 .mo-du-mv');
          const clock = stage.querySelector('.mo-du-clock');
          let last = -1;
          ctx.loop(() => {
            const a = mv.getAnimations()[0];
            if (!a || a.currentTime == null) return;
            const ms = Math.round(Math.max(0, Math.min(800, (a.currentTime % 2400) - 300)));
            if (ms !== last) { last = ms; clock.textContent = `t = ${ms} ms`; }
          });
        }
      }
    ]
  },

  {
    type: 'gallery', token: 'motion-fx', title: '入场与反馈',
    intro: '元素出现的方式，和对鼠标、点击的回应。入场动画会循环播放（每轮之间停一下），右下角 ↻ 立即重播；能交互的样品写在说明里。左上角小标签是「改变了什么属性」。',
    tiles: [
      {
        code: 'M11', name: '淡入', en: 'Fade in', meta: 'opacity', bg: '#f1f3f6',
        desc: '只改透明度 0 → 1，位置和大小都不动。最安静、最不打扰的入场：图片加载完成、提示出现、内容替换都可以用。缺点是没有方向感，看不出东西「从哪来」。时长 200–400ms，ease-out。',
        kw: ['淡入', '透明度', '安静', 'fade'],
        css: '@keyframes fade-in { from { opacity: 0; } }\n.card { animation: fade-in .4s ease-out both; }',
        html: `<div class="mo-root mo-fx"><span class="mo-tag"><b>opacity</b> 0 → 1</span>
          <div class="mo-card mo-in mo-k-fade"><div class="mo-card-h"><i class="mo-ico">∑</i><div><b>定理 3.2</b><small>一致收敛的判别</small></div></div><i class="mo-bar mo-w9"></i><i class="mo-bar mo-w8"></i><i class="mo-bar mo-w6"></i></div>
        </div>${replayBtn}`,
        init: moStill
      },
      {
        code: 'M12', name: '上滑淡入', en: 'Slide up + fade', meta: 'opacity + translateY', bg: '#f1f3f6',
        desc: '透明度 0 → 1 的同时，从下方 16–24px 处移上来（虚线框是起点）。现代网站最常见的入场：Apple、Stripe 的产品页，滚到哪里文字和卡片就这样浮现。比纯淡入多了方向和轻盈感；位移不宜大，否则显得飘。',
        kw: ['上滑', '浮现', '轻盈', 'slide up'],
        css: '@keyframes rise {\n  from { opacity: 0; transform: translateY(20px); }\n}\n.card { animation: rise .6s cubic-bezier(.2, .8, .2, 1) both; }',
        html: `<div class="mo-root mo-fx"><span class="mo-tag"><b>opacity</b> + <b>translateY</b></span>
          <div class="mo-gw"><i class="mo-ghost"></i><div class="mo-card mo-in mo-k-up"><div class="mo-card-h"><i class="mo-ico">∑</i><div><b>定理 3.2</b><small>一致收敛的判别</small></div></div><i class="mo-bar mo-w9"></i><i class="mo-bar mo-w8"></i><i class="mo-bar mo-w6"></i></div></div>
        </div>${replayBtn}`,
        init: moStill
      },
      {
        code: 'M13', name: '缩放弹出', en: 'Pop / scale in', meta: 'scale + 回弹', bg: '#f1f3f6',
        desc: '从小（0.4–0.9 倍）放大到原尺寸，通常带一点回弹。用来强调「新出现、需要注意」的小东西：答对的徽章、点赞的心、提示气泡、对话框。transform-origin 决定从哪里长出来，下拉菜单应从按钮那一侧长出。',
        kw: ['弹出', '放大', '强调', 'pop'],
        css: '@keyframes pop { from { opacity: 0; transform: scale(.4); } }\n.badge {\n  animation: pop .5s cubic-bezier(.34, 1.56, .64, 1) both;\n}\n.menu { transform-origin: top right; }',
        html: `<div class="mo-root mo-fx"><span class="mo-tag"><b>scale</b> .4 → 1</span>
          <div class="mo-pop"><div class="mo-pop-badge mo-in mo-k-pop"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><div class="mo-pop-msg mo-in mo-k-pop">回答正确<em>+10</em></div></div>
        </div>${replayBtn}`,
        init: moStill
      },
      {
        code: 'M14', name: '交错出现', en: 'Stagger', meta: '依次延迟 90ms', bg: '#f1f3f6',
        desc: '一组元素不同时出现，而是每个晚 50–100ms 依次进场，像推倒的多米诺骨牌。引导视线按顺序扫过，让列表、卡片网格、菜单的出现有节奏。元素多时要缩短间隔，别让用户等最后一个。',
        kw: ['交错', '依次', '节奏', 'stagger'],
        css: '.grid > * {\n  animation: rise .5s cubic-bezier(.2, .8, .2, 1) both;\n  animation-delay: calc(var(--i) * 90ms);\n}\n/* <div style="--i:0">…<div style="--i:1">… */',
        html: `<div class="mo-root mo-fx"><span class="mo-tag">delay = <b>i × 90ms</b></span>
          <div class="mo-sg">${['#c7d2fe', '#fde68a', '#bbf7d0', '#fbcfe8', '#bae6fd', '#ddd6fe'].map((c, i) => `<div class="mo-sg-c" style="--i:${i};--c:${c}"><i></i><b></b><s></s></div>`).join('')}</div>
        </div>${replayBtn}`,
        init: moStill
      },
      {
        code: 'M15', name: '悬停浮起', en: 'Hover lift', meta: 'translateY + shadow', bg: '#f1f3f6',
        desc: '鼠标移上去，卡片上移几像素、阴影变大变软，像被从桌面上拿起来，提示「可以点」。课程卡、商品卡、文章列表常用。移动 2–6px、200ms 左右最自然；只对有鼠标的设备有效。这里的光标在自动演示，你也可以亲自悬停。',
        more: '性能细节：直接给 box-shadow 做动画每帧都要重绘。更好的做法是把「大阴影」画在伪元素上，只改它的 opacity——这个样品就是这么做的。',
        kw: ['悬停', '浮起', '阴影', 'hover'],
        css: '.card { transition: transform .25s cubic-bezier(.2, .8, .2, 1); }\n.card::after {\n  content: ""; position: absolute; inset: 0; border-radius: inherit;\n  box-shadow: 0 16px 30px -10px rgb(30 40 90 / .35);\n  opacity: 0; transition: opacity .25s;\n}\n.card:hover { transform: translateY(-6px); }\n.card:hover::after { opacity: 1; }',
        html: `<div class="mo-root mo-fx mo-hv-root"><span class="mo-tag"><b>hover</b> → 上移 + 阴影</span>
          <div class="mo-hv">${[['极限', '#dbe4ff', 'ε'], ['导数', '#d3f9d8', '∂'], ['积分', '#ffe3c2', '∫']].map(([t, c, g]) => `<div class="mo-hv-c" style="--c:${c}"><i>${g}</i><b>${t}</b><s></s></div>`).join('')}</div>
          <svg class="mo-cur" viewBox="0 0 20 22" aria-hidden="true"><path d="M3 2 L3 17.5 L7 13.8 L9.8 20 L12.6 18.8 L9.9 12.8 L15.4 12.8 Z"/></svg>
        </div>`,
        init(stage, ctx) {
          const root = stage.querySelector('.mo-hv-root');
          const cards = [...root.querySelectorAll('.mo-hv-c')];
          const cur = root.querySelector('.mo-cur');
          let i = -1, user = false;
          const place = () => {
            let x, y;
            if (i < 0) { x = root.clientWidth * 0.5; y = root.clientHeight * 0.9; }
            else { const c = cards[i]; x = c.offsetLeft + c.offsetWidth * 0.6; y = c.offsetTop + c.offsetHeight * 0.55; }
            cur.style.transform = `translate(${x}px, ${y}px)`;
          };
          place();
          ctx.every(1400, () => {
            if (user) return;
            cards.forEach((c) => c.classList.remove('is-h'));
            i = i >= cards.length - 1 ? -1 : i + 1;
            place();
            const k = i;
            if (k >= 0) ctx.later(520, () => { if (!user && i === k) cards[k].classList.add('is-h'); });
          });
          ctx.on(root, 'pointerenter', (e) => { if (e.pointerType === 'mouse') { user = true; root.classList.add('is-user'); cards.forEach((c) => c.classList.remove('is-h')); } });
          ctx.on(root, 'pointerleave', () => { user = false; root.classList.remove('is-user'); });
        }
      },
      {
        code: 'M16', name: '3D 倾斜', en: 'Tilt', meta: 'perspective + rotateX/Y + 高光', bg: '#10121c', dark: true,
        desc: '卡片跟着指针做透视倾斜，表面一块高光随之移动，像手里转动一张反光的卡。常见于游戏卡牌、会员卡、Apple TV 的图标、作品集。很抢眼，一页用一两处即可，角度控制在 10–15° 以内。把鼠标移到卡片上试试（不动时自动摇摆）。',
        kw: ['倾斜', '透视', '高光', 'tilt'],
        css: '.wrap { perspective: 800px; }\n.card { transition: transform .1s; transform-style: preserve-3d; }\n/* JS：按指针位置 (-1…1) 设置角度 */\ncard.style.transform =\n  `rotateX(${-y * 12}deg) rotateY(${x * 14}deg)`;\n.glare { background: radial-gradient(circle, #fff8, transparent 32%);\n  mix-blend-mode: soft-light; }',
        html: `<div class="mo-root mo-tl"><div class="mo-tl-card"><small>MATH · ANALYSIS</small><i class="mo-tl-chip"></i><b>幂级数</b><span><em>第 3 章</em><em>∑ aₙxⁿ</em></span><div class="mo-tl-glare"></div></div><p class="mo-tl-hint">移动鼠标 · 卡片跟着倾斜</p></div>`,
        init(stage, ctx) {
          const root = stage.querySelector('.mo-tl');
          const card = root.querySelector('.mo-tl-card');
          const glare = root.querySelector('.mo-tl-glare');
          let tx = 0, ty = 0, cx = 0, cy = 0, hover = false, t0 = 0;
          const apply = () => {
            card.style.transform = `rotateX(${(-cy * 13).toFixed(2)}deg) rotateY(${(cx * 16).toFixed(2)}deg)`;
            glare.style.transform = `translate(${(cx * 28).toFixed(2)}%, ${(cy * 28).toFixed(2)}%)`;
          };
          ctx.on(root, 'pointermove', (e) => {
            const r = card.getBoundingClientRect();
            tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
            ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
            hover = true;
            if (!ctx.motion()) { cx = tx; cy = ty; apply(); }
          });
          ctx.on(root, 'pointerleave', () => { hover = false; if (!ctx.motion()) { cx = cy = 0; apply(); } });
          ctx.loop((t, d0) => {
            const dt = Math.max(0, d0);
            if (!hover) { t0 += dt; tx = Math.sin(t0 / 1300) * 0.85; ty = Math.sin(t0 / 1900 + 1) * 0.6; }
            const k = 1 - Math.exp(-dt / (hover ? 70 : 140));
            cx += (tx - cx) * k; cy += (ty - cy) * k;
            apply();
          });
          cx = 0.5; cy = -0.3; apply();
        }
      },
      {
        code: 'M17', name: '骨架屏', en: 'Skeleton shimmer', meta: '占位 + 扫光 → 内容', bg: '#f1f3f6',
        desc: '内容加载前先显示与真实布局一样的灰色块，上面扫过一道光（shimmer），加载完再换成真实内容。比转圈更能缓解等待，因为用户先看到了页面结构。YouTube、LinkedIn、Facebook 都用它。灰块要和真实内容位置尺寸一致，否则替换时会跳。',
        kw: ['骨架屏', '占位', '扫光', 'skeleton'],
        css: '.skeleton { background: #e8ebf0; border-radius: 6px;\n  position: relative; overflow: hidden; }\n.skeleton::after {\n  content: ""; position: absolute; inset: 0;\n  background: linear-gradient(100deg, transparent 20%, #fff9 50%, transparent 80%);\n  animation: shimmer 1.2s infinite;\n}\n@keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }',
        html: `<div class="mo-root mo-fx"><span class="mo-tag">加载中 → <b>内容</b></span>
          <div class="mo-sk">
            <div class="mo-sk-l mo-sk-ph">${'<div class="mo-sk-r"><i class="mo-sk-av"></i><div class="mo-sk-tx"><i></i><i></i></div></div>'.repeat(3)}<i class="mo-sk-shine"></i></div>
            <div class="mo-sk-l mo-sk-real">${[['定理 3.2 · 一致收敛', '第 3 章 · 12 分钟', '#6366f1', '∑'], ['例 3.5 · 几何级数', '第 3 章 · 8 分钟', '#f59e0b', 'q'], ['习题 3.1–3.8', '8 道 · 已完成 5', '#10b981', '✓']].map(([t, s, c, g]) => `<div class="mo-sk-r"><i class="mo-sk-av" style="background:${c}">${g}</i><div class="mo-sk-tx"><b>${t}</b><small>${s}</small></div></div>`).join('')}</div>
          </div>
        </div>${replayBtn}`,
        init: moStill
      },
      {
        code: 'M18', name: '打字机', en: 'Typewriter', meta: '逐字出现 + 闪烁光标', bg: '#fbfaf7',
        desc: '文字一个一个地打出来，末尾有闪烁的光标；常配合「删掉再打下一个词」，在首页大标题里轮换关键词。细节：打字时光标常亮，停下才闪——真实编辑器就是这样。适合首页 Hero、终端或代码风格；正文里别用，读者得等。',
        kw: ['打字机', '光标', '轮换关键词', 'typewriter'],
        css: '.caret {\n  display: inline-block; width: .08em; height: 1em;\n  background: currentColor;\n  animation: blink 1s steps(1) infinite;\n}\n@keyframes blink { 50% { opacity: 0; } }\n/* 文字本身由 JS 每 60–120ms 加一个字 */',
        html: `<div class="mo-root mo-tw"><div class="mo-tw-1">一起来学</div><div class="mo-tw-2"><span class="mo-tw-w">一致收敛</span><i class="mo-tw-c"></i></div><div class="mo-tw-3">数学分析 · 第二学期</div></div>${replayBtn}`,
        init(stage, ctx) {
          moStill(stage, ctx);
          const root = stage.querySelector('.mo-tw');
          const w = root.querySelector('.mo-tw-w');
          const words = ['ε-δ 语言', '幂级数', '一致收敛', '黎曼积分'].map((s) => [...s]);
          let wi = 0, n = 0, phase = 'gap', acc = 0, step = 100;
          if (!ctx.motion()) return;
          w.textContent = '';
          ctx.loop((t, d0) => {
            const dt = Math.max(0, d0);
            acc += dt;
            const word = words[wi];
            if (phase === 'type' && acc > step) {
              acc = 0; step = 70 + Math.random() * 90; n++;
              w.textContent = word.slice(0, n).join('');
              root.classList.add('is-typing');
              if (n >= word.length) { phase = 'hold'; root.classList.remove('is-typing'); }
            } else if (phase === 'hold' && acc > 1800) { acc = 0; phase = 'del'; }
            else if (phase === 'del' && acc > 45) {
              acc = 0; n--;
              w.textContent = word.slice(0, n).join('');
              root.classList.add('is-typing');
              if (n <= 0) { phase = 'gap'; wi = (wi + 1) % words.length; root.classList.remove('is-typing'); }
            } else if (phase === 'gap' && acc > 380) { acc = 0; phase = 'type'; }
          });
        }
      },
      {
        code: 'M19', name: '数字滚动', en: 'Count-up', meta: '0 → 目标值，先快后慢', bg: '#ffffff',
        desc: '数字从 0 快速增长到目标值，越接近越慢地停住（ease-out）。让统计数字显得有分量：学习进度、用户数量、成就。要用等宽数字（tabular-nums），否则数字宽窄变化会让整行抖动；时长 1–2 秒。',
        kw: ['数字滚动', '统计', '等宽数字', 'count-up'],
        css: '.stat { font-variant-numeric: tabular-nums; }\n/* JS：requestAnimationFrame 里 */\nconst p = 1 - Math.pow(1 - t / 1800, 4);   // easeOutQuart\nel.textContent = Math.round(1284 * p).toLocaleString();',
        html: `<div class="mo-root mo-cu"><span class="mo-cu-l">本学期已学习</span>
          <div class="mo-cu-n"><b class="mo-cu-v">1,284</b><span>道题</span></div>
          <div class="mo-cu-row">
            <div class="mo-cu-s"><svg viewBox="0 0 40 40"><circle class="mo-cu-bg" cx="20" cy="20" r="16" pathLength="100"/><circle class="mo-cu-fg" cx="20" cy="20" r="16" pathLength="100" style="stroke-dashoffset:8"/></svg><div><b class="mo-cu-p">92%</b><small>正确率</small></div></div>
            <div class="mo-cu-s"><i class="mo-cu-fire">🔥</i><div><b class="mo-cu-d">37 天</b><small>连续打卡</small></div></div>
          </div></div>${replayBtn}`,
        init(stage, ctx) {
          const root = stage.querySelector('.mo-cu');
          const v = root.querySelector('.mo-cu-v'), pc = root.querySelector('.mo-cu-p'), d = root.querySelector('.mo-cu-d'), ring = root.querySelector('.mo-cu-fg');
          const set = (p) => {
            v.textContent = Math.round(1284 * p).toLocaleString('en-US');
            pc.textContent = `${Math.round(92 * p)}%`;
            d.textContent = `${Math.round(37 * p)} 天`;
            ring.style.strokeDashoffset = String(100 - 92 * p);
          };
          if (!ctx.motion()) return;
          set(0);
          const T = 1900, H = 2600, F = 450;
          let u = 0;
          ctx.loop((t, d0) => {
            const dt = Math.max(0, d0);
            u = (u + dt) % (T + H + F);
            const x = Math.min(1, u / T);
            set(1 - Math.pow(1 - x, 4));
            root.classList.toggle('is-fade', u > T + H);
          });
        }
      },
      {
        code: 'M20', name: '描线', en: 'Line draw', meta: 'stroke-dashoffset', bg: '#fffdf8',
        desc: 'SVG 线条像被笔画出来一样逐渐出现：先把描边设成一段和全长一样长的虚线，再让虚线的偏移量（stroke-dashoffset）从全长变到 0。适合函数图像、签名、图标、路线图——数学网站画坐标图特别合适。这里先画坐标轴，再画 y = sin x / x。',
        kw: ['描线', '手绘感', '函数图像', 'stroke-dashoffset'],
        css: '<path pathLength="1" … />\npath {\n  stroke-dasharray: 1;\n  stroke-dashoffset: 1;\n  animation: draw 1.8s cubic-bezier(.55, .1, .35, 1) forwards;\n}\n@keyframes draw { to { stroke-dashoffset: 0; } }',
        html: (() => {
          const pts = Array.from({ length: 241 }, (_, i) => { const x = -4 * Math.PI + (8 * Math.PI * i) / 240; const y = Math.abs(x) < 1e-6 ? 1 : Math.sin(x) / x; return `${(160 + x * (138 / (4 * Math.PI))).toFixed(2)},${(132 - y * 92).toFixed(2)}`; });
          const grid = [40, 70, 100, 130, 160, 190, 220, 250, 280].map((x) => `M${x},18 V188`).join(' ') + ' ' + [42, 72, 102, 132, 162].map((y) => `M14,${y} H306`).join(' ');
          return `<div class="mo-root mo-ld"><svg viewBox="0 0 320 200" aria-hidden="true">
            <defs><linearGradient id="m20-g" x1="20" x2="300" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3d5af1"/><stop offset=".5" stop-color="#9b5cf6"/><stop offset="1" stop-color="#e2557a"/></linearGradient></defs>
            <g class="mo-ld-fade"><path class="mo-ld-g" d="${grid}"/>
            <path class="mo-ld-ax" pathLength="1" d="M12,132 H306 M300,128 L306,132 L300,136 M160,190 V16 M156,22 L160,16 L164,22"/>
            <path class="mo-ld-cv" pathLength="1" d="M${pts.join(' L')}"/>
            <text class="mo-ld-tx" x="186" y="44">y = sin x ⁄ x</text></g></svg></div>${replayBtn}`;
        })(),
        init: moStill
      },
      {
        code: 'M21', name: '形变', en: 'Morph', meta: 'border-radius · 图标 · SVG 路径', bg: '#f6f5fb',
        desc: '一个形状平滑地变成另一个。左：blob 不停改变圆角，像液体；中：菜单图标 ☰ 的三条线转成 ✕；右：播放 ▶ 变成暂停 ❚❚（SVG 路径插值）。图标形变让状态切换有连续性，用户明白这是同一个按钮。点击两个按钮可以手动切换。',
        kw: ['形变', 'blob', '图标切换', 'morph'],
        css: '.bar { transition: transform .38s cubic-bezier(.65, 0, .35, 1); }\n.open .bar:nth-child(1) { transform: rotate(45deg); }\n.open .bar:nth-child(2) { opacity: 0; }\n.open .bar:nth-child(3) { transform: rotate(-45deg); }\n/* SVG 路径：两条路径的点数相同才能插值 */\npath { transition: d .38s; }\n.playing path { d: path("M5 3 L10 3 L10 21 L5 21 Z"); }',
        html: `<div class="mo-root mo-mp">
          <div class="mo-mp-cell"><div class="mo-mp-blob-w"><div class="mo-mp-blob"></div></div><span>Blob 变形</span></div>
          <div class="mo-mp-cell"><button type="button" class="mo-mp-btn mo-mp-bars" aria-label="切换菜单图标"><i></i><i></i><i></i></button><span>☰ ⇄ ✕</span></div>
          <div class="mo-mp-cell"><button type="button" class="mo-mp-btn mo-mp-play" aria-label="切换播放图标"><svg viewBox="0 0 24 24"><path class="mo-pl1"/><path class="mo-pl2"/></svg></button><span>▶ ⇄ ❚❚</span></div>
        </div>`,
        init(stage, ctx) {
          moStill(stage, ctx);
          const root = stage.querySelector('.mo-mp');
          let quiet = 0;
          ctx.every(1700, () => { if (performance.now() > quiet) root.classList.toggle('is-x'); });
          root.querySelectorAll('.mo-mp-btn').forEach((b) => ctx.on(b, 'click', () => { root.classList.toggle('is-x'); quiet = performance.now() + 4000; }));
        }
      },
      {
        code: 'M22', name: '文字遮罩显现', en: 'Text reveal', meta: 'overflow: hidden + translateY', bg: '#0f1115', dark: true,
        desc: '每一行字从一条看不见的「缝」下面滑上来：外层 overflow: hidden 当遮罩，里层从 translateY(100%) 移到 0，逐行错开。高端品牌官网、作品集、发布会页面的大标题常用，显得考究、有力。只用于大字标题，正文不要用。',
        kw: ['遮罩', '逐行', '大标题', 'text reveal'],
        css: '.line { display: block; overflow: hidden; }\n.line > span {\n  display: block;\n  animation: up .9s cubic-bezier(.2, .75, .15, 1) both;\n  animation-delay: calc(var(--i) * 120ms);\n}\n@keyframes up { from { transform: translateY(110%); } }',
        html: `<div class="mo-root mo-tr">${['极限的语言', '让「无穷」', '变得精确。'].map((s, i) => `<span class="mo-tr-l${i === 1 ? ' mo-tr-acc' : ''}"><span style="--i:${i}">${s}</span></span>`).join('')}<div class="mo-tr-k"><span>ε — δ · CAUCHY · 1821</span></div></div>${replayBtn}`,
        init: moStill
      },
      {
        code: 'M23', name: '加载指示器', en: 'Loaders', meta: '转圈 · 三点 · 进度条 · 骨架脉冲', wide: true, bg: '#ffffff',
        desc: '四种常见的等待提示。转圈：不知道要等多久时；三点跳动：聊天里「对方正在输入」、按钮内的小加载；进度条：知道进度时用确定式，不知道时用这种来回滑动的不确定式；骨架脉冲：内容占位一明一暗。等待超过约 1 秒才需要显示，太快的操作闪一下反而显得慢。',
        kw: ['加载', 'spinner', '进度条', '等待'],
        css: '.spinner { border: 3px solid #e4e8f2; border-top-color: #3d5af1;\n  border-radius: 50%; animation: spin .8s linear infinite; }\n.dot { animation: hop 1.1s ease-in-out infinite; }\n.dot:nth-child(2) { animation-delay: .14s; }\n.dot:nth-child(3) { animation-delay: .28s; }\n@keyframes hop { 30% { transform: translateY(-6px); } }\n.pulse { animation: fade 1.5s ease-in-out infinite; }\n@keyframes fade { 50% { opacity: .45; } }',
        html: `<div class="mo-root mo-lo">
          <div class="mo-lo-c"><div class="mo-lo-box"><i class="mo-lo-spin"></i></div><span><b>转圈</b>Spinner</span></div>
          <div class="mo-lo-c"><div class="mo-lo-box"><div class="mo-lo-dots"><i></i><i></i><i></i></div></div><span><b>三点跳动</b>Typing dots</span></div>
          <div class="mo-lo-c"><div class="mo-lo-box"><div class="mo-lo-bar"><i></i></div></div><span><b>进度条</b>不确定式</span></div>
          <div class="mo-lo-c"><div class="mo-lo-box"><div class="mo-lo-pulse"><i></i><b></b><b></b></div></div><span><b>骨架脉冲</b>Pulse</span></div>
        </div>`,
        init: moStill
      }
    ]
  },

  {
    type: 'gallery', token: 'motion-scroll', title: '滚动与氛围',
    intro: '跟随滚动发生的效果，和让页面「活起来」的背景动画。小手机里会自动慢慢滚动，你也可以把鼠标放上去自己滚（自己动手后自动滚动会暂停几秒）。',
    tiles: [
      {
        code: 'M24', name: '视差', en: 'Parallax', meta: '远慢近快', ratio: '1 / 1', bg: '#f4f2fa',
        desc: '滚动时，远处的东西移动得慢，近处移动得快，于是有了纵深感——层越远越慢。2010 年代网站首页的招牌效果，现在多用于首屏插画和故事型长页面。慎用：幅度大会晕、影响阅读；对开启「减少动效」的用户应关掉。',
        kw: ['视差', '纵深', '分层', 'parallax'],
        css: '/* 每层按自己的系数反向平移：系数越大，看起来越慢 */\nscroller.addEventListener("scroll", () => {\n  for (const el of layers)\n    el.style.transform =\n      `translateY(${scroller.scrollTop * el.dataset.k}px)`;\n});',
        html: `<div class="mo-root">
          <div class="mo-ph"><div class="mo-ph-s mo-px-s"><div class="mo-sc">
            <section class="mo-px-hero">
              <div class="mo-px-l mo-px-star" data-k=".85"></div>
              <div class="mo-px-l mo-px-sun" data-k=".8"></div>
              <div class="mo-px-l mo-px-far" data-k=".6"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><path fill="#9a7cc7" d="M0,40 V22 L10,14 L19,20 L31,6 L44,19 L55,11 L67,22 L79,9 L91,18 L100,13 V40 Z"/></svg></div>
              <div class="mo-px-t" data-k=".45"><small>第 3 章</small><b>级数</b></div>
              <div class="mo-px-l mo-px-mid" data-k=".3"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><path fill="#5d4791" d="M0,40 V24 C8,18 14,14 24,20 C33,25 40,12 52,15 C63,18 70,26 80,19 C88,13 95,16 100,18 V40 Z"/></svg></div>
              <div class="mo-px-l mo-px-near" data-k="0"><svg viewBox="0 0 100 30" preserveAspectRatio="none"><path fill="#1b1736" d="M0,30 V14 C14,6 26,4 40,11 C52,17 62,8 76,6 C88,4 95,9 100,12 V30 Z"/></svg></div>
            </section>
            <section class="mo-px-body">${['3.1 数项级数', '3.2 正项级数', '3.3 幂级数'].map((t) => `<div class="mo-px-card"><b>${t}</b><i></i><i></i><i></i></div>`).join('')}</section>
          </div></div></div>
          <div class="mo-side"><h5>每层速度不同</h5><div class="mo-sw">
            <div><i style="background:#fff2d6"></i><span>太阳</span><b>0.2×</b></div>
            <div><i style="background:#9a7cc7"></i><span>远山</span><b>0.4×</b></div>
            <div><i style="background:#5d4791"></i><span>中景</span><b>0.7×</b></div>
            <div><i style="background:#1b1736"></i><span>近景 / 正文</span><b>1×</b></div>
          </div><small>越远越慢</small></div>
        </div>`,
        init(stage, ctx) {
          const sc = stage.querySelector('.mo-sc');
          const layers = [...stage.querySelectorAll('[data-k]')];
          const title = stage.querySelector('.mo-px-t');
          const upd = () => {
            const y = sc.scrollTop;
            layers.forEach((l) => { l.style.transform = `translate3d(0, ${(y * +l.dataset.k).toFixed(1)}px, 0)`; });
            title.style.opacity = String(Math.max(0, 1 - y / (sc.clientHeight * 0.55)));
          };
          ctx.on(sc, 'scroll', upd, { passive: true });
          upd();
          moAuto(sc, ctx, 0.3);
        }
      },
      {
        code: 'M25', name: '滚动出现', en: 'Scroll reveal', meta: 'IntersectionObserver', ratio: '1 / 1', bg: '#eef1f6',
        desc: '元素滚进可视区域时才播放入场动画（这里是淡入上移）。用 IntersectionObserver 监听，几乎不耗性能。产品介绍页、长篇故事页常用，让内容随滚动一段段展开。注意：重要内容别藏太久；真实网站里出现一次就够了，这里为了演示会反复播放。',
        kw: ['滚动触发', '进入视口', '淡入上移', 'reveal'],
        css: '.reveal { opacity: 0; transform: translateY(24px);\n  transition: opacity .6s, transform .7s cubic-bezier(.2, .8, .2, 1); }\n.reveal.in { opacity: 1; transform: none; }\n/* JS */\nnew IntersectionObserver((es) => es.forEach((e) => {\n  if (e.isIntersecting) e.target.classList.add("in");\n}), { threshold: .2 }).observe(el);',
        html: `<div class="mo-root">
          <div class="mo-ph"><div class="mo-ph-s mo-rv-s"><div class="mo-sc">
            <div class="mo-rv-h"><small>第 3 章</small><b>习题</b></div>
            <div class="mo-rv-list">${Array.from({ length: 10 }, (_, i) => `<div class="mo-rv" style="--c:${['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#0ea5e9'][i % 5]}"><i>${i + 1}</i><b>习题 3.${i + 1}</b><s></s></div>`).join('')}</div>
          </div></div></div>
          <div class="mo-side"><h5>进入视口才出现</h5><span>卡片滚进屏幕时，从下方淡入上移。</span><small>触发后按时间播完，与滚动快慢无关（对比 M27）</small><code>IntersectionObserver</code></div>
        </div>`,
        init(stage, ctx) {
          moStill(stage, ctx);
          const sc = stage.querySelector('.mo-sc');
          const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-in', e.isIntersecting)), { root: sc, threshold: 0.15 });
          stage.querySelectorAll('.mo-rv').forEach((el) => io.observe(el));
          ctx.add(() => io.disconnect());
          moAuto(sc, ctx, 0.26);
        }
      },
      {
        code: 'M26', name: '吸顶 + 阅读进度条', en: 'Sticky header + progress', meta: 'position: sticky', ratio: '1 / 1', bg: '#f4f5f8',
        desc: '标题栏滚到顶部后固定不动（position: sticky），下沿一条细线随阅读进度变长；大标题滚走后，小标题在顶栏里淡入（iOS 的「大标题折叠」）。长文、教材章节、博客常用，让读者知道自己读到哪、还剩多少。',
        kw: ['吸顶', '阅读进度', '大标题折叠', 'sticky'],
        css: '.topbar { position: sticky; top: 0;\n  background: rgb(255 255 255 / .86); backdrop-filter: blur(8px); }\n.progress { transform-origin: left; transform: scaleX(var(--p)); }\n/* JS */\nconst p = scrollTop / (scrollHeight - clientHeight);\nbar.style.setProperty("--p", p);',
        html: `<div class="mo-root">
          <div class="mo-ph"><div class="mo-ph-s"><div class="mo-sc">
            <header class="mo-st-h"><span>‹</span><b>3.2 收敛半径</b><span></span><i class="mo-st-p"></i></header>
            <article class="mo-st-art"><small>第 3 章 · 幂级数</small><h4>3.2 幂级数的收敛半径</h4>
              <i></i><i></i><i></i><i class="mo-s"></i>
              <div class="mo-st-f">R = 1 ⁄ lim sup |aₙ|<sup>1/n</sup></div>
              <i></i><i></i><i></i><i></i><i class="mo-s"></i>
              <div class="mo-st-fig"></div>
              <i></i><i></i><i></i><i class="mo-s"></i><i></i><i></i><i></i><i class="mo-s"></i>
            </article>
          </div></div></div>
          <div class="mo-side"><h5>阅读进度</h5><div class="mo-big"><span class="mo-st-n">0</span><small>%</small></div><div class="mo-meter"><i></i></div><small>顶栏固定在上方；小标题在大标题滚走后出现</small></div>
        </div>`,
        init(stage, ctx) {
          const sc = stage.querySelector('.mo-sc');
          const h = stage.querySelector('.mo-st-h'), bar = stage.querySelector('.mo-st-p'), h4 = stage.querySelector('.mo-st-art h4');
          const n = stage.querySelector('.mo-st-n'), meter = stage.querySelector('.mo-meter i');
          const upd = () => {
            const max = sc.scrollHeight - sc.clientHeight;
            const r = max > 0 ? Math.min(1, sc.scrollTop / max) : 0;
            bar.style.transform = meter.style.transform = `scaleX(${r.toFixed(4)})`;
            n.textContent = Math.round(r * 100);
            h.classList.toggle('is-small', sc.scrollTop > h4.offsetTop + h4.offsetHeight - h.offsetHeight);
            h.classList.toggle('is-stuck', sc.scrollTop > 2);
          };
          ctx.on(sc, 'scroll', upd, { passive: true });
          upd();
          moAuto(sc, ctx, 0.3);
        }
      },
      {
        code: 'M27', name: '滚动驱动动画', en: 'Scroll-driven animation', meta: 'animation-timeline: scroll()', ratio: '1 / 1', bg: '#eceef8',
        desc: '动画进度直接绑在滚动位置上：滚一半，动画就播一半；往回滚，动画倒着播。和「滚动出现」不同——那是到点触发、按时间播完。CSS 新特性 animation-timeline: scroll() / view() 不用 JS 就能做到（Chrome 115 起支持），不支持的浏览器这里用 JS 回退。Apple 产品页里随滚动旋转、缩放的产品图就是这一类。',
        kw: ['滚动驱动', '倒放', '时间线', 'scroll()'],
        css: '.progress {\n  animation: grow linear both;\n  animation-timeline: scroll();\n}\n.card {\n  animation: zoom-in linear both;\n  animation-timeline: view();\n  animation-range: entry 0% cover 45%;\n}\n@keyframes grow { from { transform: scaleX(0); } }\n@keyframes zoom-in { from { opacity: 0; transform: scale(.7); } }',
        html: `<div class="mo-root">
          <div class="mo-ph"><div class="mo-ph-s mo-sd-s"><div class="mo-sc">
            <div class="mo-sd-top"><i class="mo-sd-bar"></i></div>
            <div class="mo-sd-hero"><div class="mo-sd-shape">∑</div></div>
            <div class="mo-sd-list">${['#7c8cff', '#c084fc', '#f472b6', '#38bdf8'].map((c) => `<div class="mo-sd-card" style="--c:linear-gradient(135deg, ${c}, #1b2040)"><i></i><b></b></div>`).join('')}</div>
          </div></div></div>
          <div class="mo-side"><h5>滚动位置 = 动画进度</h5><div class="mo-big"><span class="mo-sd-n">0</span><small>%</small></div><div class="mo-meter"><i></i></div><small>往回滚，图形转回去、卡片缩回去</small><code>animation-timeline</code></div>
        </div>`,
        init(stage, ctx) {
          const sc = stage.querySelector('.mo-sc');
          const s = stage.querySelector('.mo-sd-s');
          const n = stage.querySelector('.mo-sd-n'), meter = stage.querySelector('.mo-meter i');
          const cards = [...stage.querySelectorAll('.mo-sd-card')];
          const native = CSS.supports('animation-timeline: scroll()');
          const upd = () => {
            const max = sc.scrollHeight - sc.clientHeight;
            const r = max > 0 ? Math.min(1, sc.scrollTop / max) : 0;
            n.textContent = Math.round(r * 100);
            meter.style.transform = `scaleX(${r.toFixed(4)})`;
            if (native) return;
            s.style.setProperty('--mo-p', Math.min(1, r / 0.6).toFixed(4));
            cards.forEach((c) => {
              const top = c.offsetTop - sc.scrollTop;
              c.style.setProperty('--mo-v', Math.max(0, Math.min(1, (sc.clientHeight - top) / (sc.clientHeight * 0.45 + c.offsetHeight * 0.45))).toFixed(3));
            });
          };
          ctx.on(sc, 'scroll', upd, { passive: true });
          upd();
          moAuto(sc, ctx, 0.3);
        }
      },
      {
        code: 'M28', name: '跑马灯', en: 'Marquee', meta: '无缝循环滚动', ratio: '1 / 1', bg: '#f7f3ea',
        desc: '一排文字或标签匀速横向滚动，首尾相接、永不停止。做法：内容复制两份并排，整体从 0 平移到 -50% 再循环，接缝处看不出来。常见于合作品牌的 logo 墙、关键词带、新闻快讯、潮牌首页。速度要慢，鼠标悬停时暂停（试试）。',
        kw: ['跑马灯', '无缝循环', 'logo 墙', 'marquee'],
        css: '.track { display: flex; width: max-content;\n  animation: marquee 24s linear infinite; }\n/* 内容放两份，移动 -50% 正好接上 */\n@keyframes marquee { to { transform: translateX(-50%); } }\n.row:hover .track { animation-play-state: paused; }\n.row { mask-image: linear-gradient(90deg, transparent, #000 10% 90%, transparent); }',
        html: (() => {
          const tags = ['极限', '连续', '导数', '中值定理', '泰勒公式', '黎曼积分', '一致收敛', '幂级数', '傅里叶级数', '多元微分'];
          const big = '<span>Mathematical</span><i>✦</i><em>Analysis</em><i>✦</i><span>数学分析</span><i>✦</i>';
          const row = (inner, cls, s) => `<div class="mo-mq-row ${cls}" style="--mo-s:${s}s"><div class="mo-mq-tr"><div class="mo-mq-g">${inner}</div><div class="mo-mq-g" aria-hidden="true">${inner}</div></div></div>`;
          const t1 = tags.map((t, i) => `<span class="mo-mq-tag${i % 3 === 1 ? ' mo-d' : ''}">${t}</span>`).join('');
          const t2 = tags.slice().reverse().map((t, i) => `<span class="mo-mq-tag${i % 4 === 2 ? ' mo-d' : ''}">${t}</span>`).join('');
          return `<div class="mo-root mo-mq">${row(t1, '', 30)}${row(big, 'mo-mq-big mo-rev', 22)}${row(t2, '', 26)}</div>`;
        })(),
        init: moStill
      },
      {
        code: 'M29', name: '光标聚光灯', en: 'Spotlight / cursor follower', meta: '跟随指针的柔光', ratio: '1 / 1', bg: '#090b10', dark: true,
        desc: '一团柔光跟着鼠标移动，光照到的网格点被点亮，像手电筒照进暗处。Linear、Vercel 等开发者产品的暗色首页和卡片边框常用。把鼠标移进来试试（没有鼠标时它自己游走）。触屏设备上没有悬停，只能当装饰。',
        kw: ['聚光灯', '跟随光标', '暗色', 'spotlight'],
        css: '.hero { background: #090b10; }\n.glow {\n  position: absolute; width: 600px; height: 600px; border-radius: 50%;\n  background: radial-gradient(circle, rgb(98 120 255 / .3), transparent 65%);\n  transform: translate(var(--x), var(--y));\n  pointer-events: none;\n}\n/* JS：pointermove 时更新 --x / --y（减去半径） */',
        html: `<div class="mo-root mo-sp"><div class="mo-sp-grid"></div><div class="mo-sp-glow"></div><div class="mo-sp-lens"><div class="mo-sp-grid"></div></div><i class="mo-sp-dot"></i><div class="mo-sp-tx"><b>光标在哪，<br>光就在哪。</b><span>把鼠标移进来</span></div></div>`,
        init(stage, ctx) {
          const root = stage.querySelector('.mo-sp');
          const lens = root.querySelector('.mo-sp-lens'), inner = lens.querySelector('.mo-sp-grid');
          const glow = root.querySelector('.mo-sp-glow'), dot = root.querySelector('.mo-sp-dot');
          let W = 1, H = 1, lw = 1, gw = 1, x = 0, y = 0, tx = 0, ty = 0, hover = false, t0 = 0;
          const measure = () => { W = root.clientWidth; H = root.clientHeight; lw = lens.offsetWidth; gw = glow.offsetWidth; };
          const apply = () => {
            const lx = x - lw / 2, ly = y - lw / 2;
            lens.style.transform = `translate(${lx.toFixed(1)}px, ${ly.toFixed(1)}px)`;
            inner.style.transform = `translate(${(-lx).toFixed(1)}px, ${(-ly).toFixed(1)}px)`;
            glow.style.transform = `translate(${(x - gw / 2).toFixed(1)}px, ${(y - gw / 2).toFixed(1)}px)`;
            dot.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
          };
          const ro = new ResizeObserver(() => { measure(); if (!hover) { x = tx = W * 0.62; y = ty = H * 0.38; } apply(); });
          ro.observe(root);
          ctx.add(() => ro.disconnect());
          measure(); x = tx = W * 0.62; y = ty = H * 0.38; apply();
          ctx.on(root, 'pointermove', (e) => {
            const r = root.getBoundingClientRect();
            tx = e.clientX - r.left; ty = e.clientY - r.top; hover = true;
            if (!ctx.motion()) { x = tx; y = ty; apply(); }
          });
          ctx.on(root, 'pointerleave', () => { hover = false; });
          ctx.loop((t, d0) => {
            const dt = Math.max(0, d0);
            if (!hover) { t0 += dt; tx = W * (0.5 + 0.34 * Math.sin(t0 / 1700)); ty = H * (0.42 + 0.26 * Math.sin(t0 / 1100 + 0.6)); }
            const k = 1 - Math.exp(-dt / (hover ? 60 : 200));
            x += (tx - x) * k; y += (ty - y) * k;
            apply();
          });
        }
      },
      {
        code: 'M30', name: '流动渐变', en: 'Animated gradient', meta: '漂移的色块 · 网格渐变', ratio: '1 / 1', bg: '#7a5ce0',
        desc: '几团大色块在背景里缓慢漂移、彼此融合，颜色像液体一样流动。Stripe 首页的彩色波浪、Apple 的动态壁纸、各种 AI 产品的首屏都用这种「网格渐变」。要动得非常慢（十几秒一个来回），否则让人分心；上面适合放白字或毛玻璃按钮。',
        kw: ['流动渐变', '网格渐变', '色块漂移', 'mesh gradient'],
        css: '.blob {\n  position: absolute; width: 90vmax; aspect-ratio: 1; border-radius: 50%;\n  background: radial-gradient(circle, #7c5cff, transparent 62%);\n  animation: drift 16s ease-in-out infinite alternate;\n}\n@keyframes drift { to { transform: translate(30%, 20%) scale(1.15); } }\n/* 3–5 个不同颜色、不同时长的 blob 叠在一起 */',
        html: `<div class="mo-root mo-gr">${[['#6d3cf0', '15%', '20%', 'mo-gr-1', '13s'], ['#f0479a', '88%', '18%', 'mo-gr-2', '17s'], ['#ff8a3d', '80%', '92%', 'mo-gr-3', '15s'], ['#1593e6', '12%', '88%', 'mo-gr-4', '19s'], ['#8b5cf6', '55%', '55%', 'mo-gr-2', '23s']].map(([c, x, y, k, d]) => `<i class="mo-gr-b" style="--c:${c};--x:${x};--y:${y};--k:${k};--d:${d}"></i>`).join('')}<div class="mo-gr-tx"><b>数学分析</b><span>开始学习 →</span></div></div>`,
        init: moStill
      },
      {
        code: 'M31', name: '粒子星空', en: 'Particles', meta: 'canvas · 约 60 个点', ratio: '1 / 1', bg: '#0a0d1f', dark: true,
        desc: '画布上几十个光点缓慢漂浮，彼此靠近时连线，形成星座般的网络；鼠标附近的点会连到指针上。2015 年前后科技、数据类网站首页很流行（particles.js）。轻量的写法：点数控制在 100 以内、只在看得见时运行。容易显得过时，背景要暗、点和线要淡。',
        kw: ['粒子', '星座连线', 'canvas', '科技感'],
        css: '/* canvas 每帧：移动每个点，两点距离 < D 时画线 */\nfor (const a of pts) for (const b of pts) {\n  const d = Math.hypot(a.x - b.x, a.y - b.y);\n  if (d < D) {\n    ctx.strokeStyle = `rgb(150 170 255 / ${(1 - d / D) * .5})`;\n    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();\n  }\n}',
        html: '<div class="mo-root mo-pa"><canvas aria-hidden="true"></canvas><div class="mo-pa-tx"><b>∞ 星图</b><span>CONSTELLATION</span></div></div>',
        init(stage, ctx) {
          const root = stage.querySelector('.mo-pa');
          const cv = root.querySelector('canvas');
          const g = cv.getContext('2d');
          let w = 1, h = 1, P = [], m = null;
          const seed = () => {
            const n = Math.round(Math.max(36, Math.min(80, (w * h) / 1500)));
            P = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00006, vy: (Math.random() - 0.5) * 0.00006, r: Math.random() * 1.3 + 0.7 }));
          };
          const draw = (dt) => {
            g.clearRect(0, 0, w, h);
            const s = Math.min(w, h), D = s * 0.24;
            for (const p of P) {
              p.x += p.vx * dt; p.y += p.vy * dt;
              if (p.x < -0.02) p.x += 1.04; if (p.x > 1.02) p.x -= 1.04;
              if (p.y < -0.02) p.y += 1.04; if (p.y > 1.02) p.y -= 1.04;
            }
            g.lineWidth = Math.max(0.6, s / 400);
            for (let i = 0; i < P.length; i++) {
              const a = P[i], ax = a.x * w, ay = a.y * h;
              for (let j = i + 1; j < P.length; j++) {
                const b = P[j], dx = ax - b.x * w, dy = ay - b.y * h, d2 = dx * dx + dy * dy;
                if (d2 < D * D) {
                  g.strokeStyle = `rgba(150,170,255,${((1 - Math.sqrt(d2) / D) * 0.45).toFixed(3)})`;
                  g.beginPath(); g.moveTo(ax, ay); g.lineTo(b.x * w, b.y * h); g.stroke();
                }
              }
              if (m) {
                const dx = ax - m.x, dy = ay - m.y, d = Math.hypot(dx, dy);
                if (d < D * 1.3) { g.strokeStyle = `rgba(190,205,255,${((1 - d / (D * 1.3)) * 0.7).toFixed(3)})`; g.beginPath(); g.moveTo(ax, ay); g.lineTo(m.x, m.y); g.stroke(); }
              }
            }
            for (const p of P) {
              g.fillStyle = 'rgba(225,232,255,.9)';
              g.beginPath(); g.arc(p.x * w, p.y * h, p.r * (s / 320), 0, Math.PI * 2); g.fill();
            }
          };
          const size = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = root.clientWidth; h = root.clientHeight;
            cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!P.length) seed();
            draw(0);
          };
          const ro = new ResizeObserver(size);
          ro.observe(root);
          ctx.add(() => ro.disconnect());
          size();
          ctx.on(root, 'pointermove', (e) => { const r = root.getBoundingClientRect(); m = { x: e.clientX - r.left, y: e.clientY - r.top }; if (!ctx.motion()) draw(0); });
          ctx.on(root, 'pointerleave', () => { m = null; });
          ctx.loop((t, dt) => draw(Math.max(0, dt)));
        }
      }
    ]
  }
]);

// 小手机里的自动滚动：慢慢往下，到底停一下再较快地回到顶部；用户自己滚动时暂停 3.5 秒
function moAuto(sc, ctx, speed) {
  let pos = sc.scrollTop, dir = 1, wait = 900, quiet = 0;
  const mark = () => { quiet = performance.now() + 3500; };
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((ev) => ctx.on(sc, ev, mark, { passive: true }));
  ctx.loop((t, d0) => {
            const dt = Math.max(0, d0);
    if (performance.now() < quiet) { pos = sc.scrollTop; return; }
    if (wait > 0) { wait -= dt; return; }
    const max = sc.scrollHeight - sc.clientHeight;
    if (max <= 0) return;
    pos += dir * sc.clientHeight * speed * (dir > 0 ? 1 : 2.6) * dt / 1000;
    if (pos >= max) { pos = max; dir = -1; wait = 1400; }
    else if (pos <= 0) { pos = 0; dir = 1; wait = 1400; }
    sc.scrollTop = pos;
  });
}
