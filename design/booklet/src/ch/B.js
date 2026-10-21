  // ============ B 按钮 ============
  const BP = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevR: '<path d="M9.5 6l6 6-6 6"/>',
    chevL: '<path d="M14.5 6l-6 6 6 6"/>',
    chevD: '<path d="M6 9.5l6 6 6-6"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5h6V7"/>',
    bookmark: '<path d="M6.5 4h11v16.5L12 16.5l-5.5 4z"/>',
    share: '<path d="M12 15V3.5M7.5 8L12 3.5 16.5 8M5 12.5V20h14v-7.5"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    pencil: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14 7l3 3"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    skip: '<path d="M5 6l7 6-7 6zM13 6l7 6-7 6z"/>',
    bell: '<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/>',
    chat: '<path d="M4.5 5.5h15v10.5h-8l-4.5 4v-4h-2.5z"/>',
    file: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4"/>',
    code: '<path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5"/>',
    print: '<path d="M7 9V4h10v5M7 17H4.5v-8h15v8H17M7 14h10v6.5H7z"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/>',
    book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    heart: '<path d="M12 20.5S3.5 15.3 3.5 9.6C3.5 6.8 5.6 4.8 8.1 4.8c1.6 0 3 .8 3.9 2.1.9-1.3 2.3-2.1 3.9-2.1 2.5 0 4.6 2 4.6 4.8 0 5.7-8.5 10.9-8.5 10.9z"/>'
  };
  const bic = (n, cls = '') => `<svg class="bt-i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${BP[n]}</svg>`;
  const bb = (cls, inner, attrs = '') => `<button type="button" class="bt-b ${cls}"${attrs ? ' ' + attrs : ''}>${inner}</button>`;
  const bCheck = '<svg class="bt-i bt-ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const bCursor = (cls = '') => `<svg class="bt-cur${cls ? ' ' + cls : ''}" viewBox="0 0 16 20" aria-hidden="true"><path d="M1.5 1.2v15.4l4-3.8 2.7 6.1 2.6-1.1-2.7-6h5.6z" fill="#fff" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
  const bPlay = '<svg class="bt-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg>';
  // 交互一次性动画只在动效开时播放（动效关时 CSS 动画会被暂停在第一帧）
  const bMotion = (stage, ctx) => stage.firstElementChild.classList.toggle('bt-anim', ctx.motion());
  // 方向键：阻止翻页（主页面）和放大视图里的切换样品
  const bArrow = (e) => { e.preventDefault(); e.stopPropagation(); };
  const bIsCompose = (e) => e.isComposing || e.keyCode === 229;

  registerPages('B', [
    {
      type: 'gallery', token: 'buttons-1', title: '按钮外形', min: 340,
      intro: '同一个「开始学习」，换一身外形就换了性格。十二种常见外形，每个都能悬停、按下；按 Tab 键可以看到各自的键盘焦点环。',
      tiles: [
        {
          code: 'B01', name: '实心主按钮', en: 'Solid / Primary', meta: '最常用 · 主要操作',
          desc: '一块实心色块＋白字，是页面上最醒目的按钮。用于每屏唯一的主要操作，如「开始学习」「提交答案」；深色版作中性主按钮，红色版专门留给删除这类危险操作。优点是一眼就知道该点哪里；缺点是一屏放三个以上就互相抢戏。',
          more: '细节：悬停时颜色加深一级，箭头右移 3px；按下再深一级并下沉 1px；键盘聚焦时外圈出现「白缝＋主色」的双层光环。主按钮通常配一个次要按钮（描边或幽灵）一起出现，形成主次。',
          kw: ['主要按钮', 'Primary', '实心', 'CTA'],
          bg: '#f3f4f8',
          html: `<div class="center"><div class="bt-stack">
            ${bb('bt-solid bt-lg', `开始学习${bic('arrow', 'bt-arr')}`)}
            <div class="bt-row">${bb('bt-solid bt-dark', '提交答案')}${bb('bt-solid bt-danger', `${bic('trash')}删除笔记`)}</div>
          </div></div>`,
          css: `.btn {
  height: 44px; padding: 0 20px;
  border: 0; border-radius: 10px;
  background: #4f46e5; color: #fff; font-weight: 600;
  box-shadow: 0 1px 2px rgb(16 24 40 / .14);
  transition: background .15s, transform .1s;
}
.btn:hover  { background: #4338ca; }
.btn:active { background: #3730a3; transform: translateY(1px); }
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4f46e5;
}`,
          links: [['Material 3 · Buttons', 'https://m3.material.io/components/buttons/overview'], ['Apple HIG · Buttons', 'https://developer.apple.com/design/human-interface-guidelines/buttons']]
        },
        {
          code: 'B02', name: '描边按钮', en: 'Outline / Secondary', meta: '次要操作',
          desc: '透明底、1–2px 边框、文字与边框同色。视觉分量比实心按钮轻一级，常作次要操作放在主按钮旁边（「查看证明」旁的「稍后再学」用中性灰边），或放在深色区块里用白色描边。悬停时只铺一层很淡的底色。缺点是在花哨的背景上边框容易看不清。',
          kw: ['次要按钮', 'Secondary', '描边', '线框按钮'],
          bg: '#ffffff',
          html: `<div class="center"><div class="bt-stack">
            <div class="bt-row">${bb('bt-outline bt-lg', '查看证明')}${bb('bt-outline bt-gray', '稍后再学')}</div>
            <div class="bt-ol-band"><span><small>NEXT · 4.3</small>一致收敛与逐项求导</span>${bb('bt-outline bt-inv', `下一节${bic('chevR')}`)}</div>
          </div></div>`,
          css: `.btn-outline {
  height: 44px; padding: 0 20px;
  border: 1.5px solid #4f46e5; border-radius: 10px;
  background: transparent; color: #4f46e5;
  font-weight: 600;
  transition: background .15s;
}
.btn-outline:hover  { background: rgb(79 70 229 / .08); }
.btn-outline:active { background: rgb(79 70 229 / .16); }
.btn-outline:focus-visible {
  outline: none; box-shadow: 0 0 0 4px rgb(79 70 229 / .28);
}`
        },
        {
          code: 'B03', name: '幽灵按钮', en: 'Ghost / Text button', meta: '第三级操作',
          desc: '平时只有文字（和小图标），没有边框和底色，鼠标移上去才浮出一块浅灰底。用在工具栏、上一节/下一节导航、对话框里的「再检查一下」——这些需要存在、但不该抢主按钮风头的操作。缺点是静止时不太像按钮，重要操作不要用它。',
          more: '一组按钮的常见层级：实心（主要）› 描边（次要）› 幽灵（第三级）。右下角的对话框就是「幽灵 + 实心」的标准搭配。',
          kw: ['Ghost', '文字按钮', 'Text button', '第三级'],
          bg: '#f4f4f5',
          html: `<div class="center"><div class="bt-stack">
            <nav class="bt-gh-nav" aria-label="章节导航">${bb('bt-ghost', `${bic('chevL')}上一节`)}${bb('bt-ghost', '目录')}${bb('bt-ghost', `下一节${bic('chevR')}`)}</nav>
            <div class="bt-gh-card"><b>提交本节测验？</b><p>提交后就不能再修改答案了。</p><div class="bt-gh-foot">${bb('bt-ghost', '再检查一下')}${bb('bt-solid bt-dark bt-sm', '提交答案')}</div></div>
          </div></div>`,
          css: `.btn-ghost {
  height: 36px; padding: 0 12px;
  border: 0; border-radius: 8px;
  background: transparent; color: #3f3f46;
  font-weight: 500;
  transition: background .15s, color .15s;
}
.btn-ghost:hover  { background: rgb(24 24 27 / .065); color: #09090b; }
.btn-ghost:active { background: rgb(24 24 27 / .11); }
.btn-ghost:focus-visible { outline: 2px solid #4f46e5; }`
        },
        {
          code: 'B04', name: '胶囊按钮', en: 'Pill', meta: '苹果官网式',
          desc: '圆角等于高度的一半，两头是完整的半圆。苹果官网的蓝色胶囊（#0071E3，近似）就是这种：主按钮实心、次按钮描边；下面带白色圆形箭头的黑胶囊引导感更强。显得友好、现代，适合营销页和移动端；缺点是文字很长时两端显得空，不适合表格里密集的小按钮。',
          kw: ['胶囊', 'Pill', '全圆角', '苹果风'],
          bg: '#f5f5f7',
          html: `<div class="center"><div class="bt-apple">
            <h4>数学分析。</h4><p>从实数到级数，一步一步。</p>
            <div class="bt-row">${bb('bt-pill', '开始学习')}${bb('bt-pill bt-pill-2', '观看介绍')}</div>
            <div class="bt-row" style="margin-top:12px">${bb('bt-pill bt-pill-ic', `下一节<span class="bt-pill-dot">${bic('chevR')}</span>`)}</div>
          </div></div>`,
          css: `.btn-pill {
  height: 44px; padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 980px;          /* 足够大 = 两端半圆 */
  background: #0071e3; color: #fff;
  font: 400 17px/1 -apple-system, sans-serif;
}
.btn-pill:hover { background: #0077ed; }
.btn-pill.secondary {
  background: transparent; color: #0071e3; border-color: #0071e3;
}
.btn-pill:focus-visible { outline: 2px solid #0071e3; outline-offset: 3px; }`,
          links: [['Apple HIG · Buttons', 'https://developer.apple.com/design/human-interface-guidelines/buttons']]
        },
        {
          code: 'B05', name: '渐变按钮', en: 'Gradient', meta: '深色首页 · 科技感',
          desc: '底色是靛蓝→紫→粉→橙的线性渐变，带同色系的发光阴影；悬停时渐变缓缓向左平移、光晕变粉。下面是轻量版：渐变描边＋渐变文字。适合深色首页的主行动按钮、AI/科技产品；缺点是用多了显得浮夸，渐变上的白字对比度要单独检查。',
          more: '实现：把渐变背景设成按钮宽度的 200%，悬停时改 background-position 即可平移。渐变描边用两层背景：内层 padding-box 填底色，外层 border-box 填渐变，border 本身设为透明。',
          kw: ['渐变', 'Gradient', '发光', 'AI 风', '渐变描边'],
          bg: 'radial-gradient(90% 70% at 50% 0%, #2b1d63 0%, #0f0d22 70%)', dark: true,
          html: `<div class="center"><div class="bt-stack" style="gap:20px">
            ${bb('bt-grad', `开始学习${bic('arrow', 'bt-arr')}`)}
            ${bb('bt-grad-ol', '<span>查看证明</span>')}
          </div></div>`,
          css: `.btn-grad {
  border: 0; border-radius: 12px; color: #fff;
  background: linear-gradient(90deg,
    #5b5bf6, #9b4cf0 28%, #ec4899 58%, #f59e0b) 0 0 / 200% 100%;
  box-shadow: 0 10px 28px -10px rgb(190 80 230 / .85);
  transition: background-position .6s;
}
.btn-grad:hover { background-position: 100% 0; }
/* 渐变描边 */
.btn-grad-outline {
  border: 1.5px solid transparent;
  background: linear-gradient(#0f0d22, #0f0d22) padding-box,
              linear-gradient(90deg, #6366f1, #ec4899, #f59e0b) border-box;
}`
        },
        {
          code: 'B06', name: '玻璃按钮', en: 'Glass', meta: '玻璃拟态 · visionOS',
          desc: '半透明白底＋背景模糊（backdrop-filter），顶部一道高光、四周一圈细白边，像一块磨砂玻璃——注意按钮后面的彩色圆被模糊了。深色玻璃和圆形图标按钮是同一做法。只在彩色或图片背景上才成立；缺点是可读性依赖背景，低端设备上模糊比较耗性能。',
          kw: ['毛玻璃', 'Glassmorphism', 'backdrop-filter', '半透明'],
          bg: 'radial-gradient(circle at 16% 22%, #ff7eb3 0 10%, transparent 46%), radial-gradient(circle at 86% 26%, #7f7cff 0 12%, transparent 46%), radial-gradient(circle at 62% 96%, #22d3ee 0 12%, transparent 48%), linear-gradient(135deg, #4c2a9e, #1f1757)', dark: true,
          html: `<i class="bt-orb o1"></i><i class="bt-orb o2"></i><i class="bt-orb o3"></i>
          <div class="center"><div class="bt-stack">
            ${bb('bt-glass', '开始学习')}
            <div class="bt-row">${bb('bt-glass bt-glass-dk', '查看证明')}${bb('bt-glass bt-glass-rd', bPlay, 'aria-label="播放讲解"')}</div>
          </div></div>`,
          css: `.btn-glass {
  border: 1px solid rgb(255 255 255 / .45);
  border-radius: 14px; color: #fff;
  background: linear-gradient(rgb(255 255 255 / .32),
                              rgb(255 255 255 / .12));
  backdrop-filter: blur(14px) saturate(170%);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  box-shadow: 0 10px 30px -8px rgb(20 10 60 / .45),
              inset 0 1px 0 rgb(255 255 255 / .6);  /* 顶部高光 */
}
.btn-glass:hover { background: rgb(255 255 255 / .38); }
.btn-glass:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }`,
          links: [['MDN · backdrop-filter', 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter']]
        },
        {
          code: 'B07', name: '新拟态按钮', en: 'Neumorphic', meta: 'Soft UI · 2020 年流行',
          desc: '按钮与背景完全同色，靠左上一道白色高光、右下一道灰色阴影「鼓」出表面；按下时两道阴影翻到内侧，变成凹陷。右边的圆钮是开关式：点一下保持凹下、心形变紫。触感柔软；缺点是对比度很低，弱视用户难以分辨，只适合少量装饰性控件。',
          kw: ['新拟态', 'Neumorphism', 'Soft UI', '凸起', '内阴影'],
          bg: '#e4e9f0',
          html: `<div class="center"><div class="bt-stack" style="gap:28px">
            <div class="bt-row bt-neu-row">${bb('bt-neu', '开始学习')}${bb('bt-neu bt-neu-rd', `<svg viewBox="0 0 24 24" aria-hidden="true">${BP.heart}</svg>`, 'aria-pressed="false" aria-label="收藏本节"')}</div>
            ${bb('bt-neu bt-neu-sm', '下一节')}
          </div></div>`,
          init(stage, ctx) {
            const t = stage.querySelector('.bt-neu-rd');
            ctx.on(t, 'click', () => t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true')));
          },
          css: `/* 背景与按钮同色 */
.btn-neu {
  background: #e4e9f0; border: 0; border-radius: 16px;
  color: #5b6b82;
  box-shadow:  8px  8px 16px #c2cad6,   /* 右下暗影 */
              -8px -8px 16px #ffffff;   /* 左上高光 */
  transition: box-shadow .22s;
}
.btn-neu:active, .btn-neu[aria-pressed="true"] {
  box-shadow: inset  6px  6px 12px #c2cad6,
              inset -6px -6px 12px #ffffff;
}`
        },
        {
          code: 'B08', name: '粗野主义按钮', en: 'Neo-brutalist', meta: 'Gumroad 式 · 2020 年代',
          desc: '3px 粗黑边、零圆角、高饱和纯色块，外加向右下偏移、完全不模糊的黑色硬阴影。悬停时按钮向左上抬起，按下时正好压进阴影的位置、阴影收回——像按下一块实体积木。个性鲜明、好玩；缺点是很吵，不适合严肃的长文阅读界面。',
          kw: ['新粗野主义', 'Neo-brutalism', '硬阴影', '粗描边', '撞色'],
          bg: '#fff3d1',
          html: `<div class="fill bt-grid"></div><span class="bt-brut-tag">NEW · 第 4 章</span>
          <div class="center"><div class="bt-stack" style="gap:24px">
            ${bb('bt-brut', `开始学习${bic('arrow')}`)}
            <div class="bt-row" style="gap:16px">${bb('bt-brut bt-brut-sm bt-brut-w', '查看证明')}${bb('bt-brut bt-brut-sm bt-brut-y', '提交答案')}</div>
          </div></div>`,
          css: `.btn-brutal {
  border: 3px solid #000; border-radius: 0;
  background: #ff90e8; color: #000; font-weight: 800;
  box-shadow: 5px 5px 0 #000;          /* 硬阴影：不模糊 */
  transition: transform .08s, box-shadow .08s;
}
.btn-brutal:hover  { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 #000; }
.btn-brutal:active { transform: translate(5px, 5px);   box-shadow: 0 0 0 #000; }
.btn-brutal:focus-visible { outline: 3px dashed #000; outline-offset: 6px; }`
        },
        {
          code: 'B09', name: '3D 可按压按钮', en: '3D pressable', meta: '多邻国式 · 游戏化学习',
          desc: '按钮下方有一条更深色的「厚度」（用不模糊的阴影做出），按下时整块下沉、厚度消失，像按下真实的按键。这是多邻国（Duolingo）的招牌：绿色「继续」、蓝色「提示」、白色「跳过」，配圆润的粗体字和顶部进度条。非常适合练习、闯关类页面；缺点是童趣感强，放在学术页面里会显得幼稚。',
          kw: ['3D 按钮', '多邻国', 'Duolingo', '游戏化', '可按压'],
          bg: '#ffffff',
          html: `<div class="center"><div class="bt-duo">
            <div class="bt-duo-bar">${bic('x')}<i></i></div>
            ${bb('bt-3d bt-full', '继续')}
            <div class="bt-duo-row">${bb('bt-3d bt-3d-w', '跳过')}${bb('bt-3d bt-3d-blue', '提示')}</div>
          </div></div>`,
          css: `.btn-3d {
  border: 0; border-radius: 14px;
  background: #58cc02; color: #fff;
  font: 800 16px/1 Nunito, sans-serif; letter-spacing: .08em;
  box-shadow: 0 5px 0 #58a700;     /* 底边厚度 */
  transition: transform .05s, box-shadow .05s;
}
.btn-3d:active {
  transform: translateY(5px);      /* 沉下去 */
  box-shadow: 0 0 0 #58a700;       /* 厚度消失 */
}
.btn-3d:focus-visible { outline: 3px solid #84d8ff; outline-offset: 4px; }`
        },
        {
          code: 'B10', name: '霓虹按钮', en: 'Neon glow', meta: '赛博朋克 · 暗色',
          desc: '深色背景上，用几层彩色 box-shadow（外发光＋内发光）和 text-shadow 叠出灯管的光晕；悬停时整块被「点亮」、光晕扩散。粉色那个会像接触不良的灯管一样偶尔闪烁。适合游戏、活动、赛博朋克风页面；缺点是看久了刺眼，浅色背景上完全失效。',
          kw: ['霓虹', 'Neon', '发光', '赛博朋克', '暗色'],
          bg: 'radial-gradient(120% 90% at 50% 115%, #2a0f4a 0%, #0b0716 58%, #05040a 100%)', dark: true,
          html: `<div class="bt-neon-floor"></div>
          <div class="center"><div class="bt-stack" style="gap:24px">
            ${bb('bt-neon', '开始学习')}
            <div class="bt-row" style="gap:18px">${bb('bt-neon bt-neon-pk', '挑战模式')}${bb('bt-neon bt-neon-lm', '排行榜')}</div>
          </div></div>`,
          css: `.btn-neon {
  --n: #2ee6ff;
  border: 2px solid var(--n); border-radius: 10px;
  background: transparent; color: var(--n); letter-spacing: .18em;
  text-shadow: 0 0 4px var(--n), 0 0 12px var(--n);
  box-shadow: 0 0 6px var(--n), 0 0 22px rgb(46 230 255 / .55),
              inset 0 0 12px rgb(46 230 255 / .45);   /* 内发光 */
  transition: all .25s;
}
.btn-neon:hover {
  background: var(--n); color: #04121a; text-shadow: none;
  box-shadow: 0 0 10px var(--n), 0 0 34px var(--n), 0 0 80px var(--n);
}`
        },
        {
          code: 'B11', name: '下划线链接', en: 'Animated underline', meta: '正文链接 · 导航',
          desc: '看起来是文字链接，悬停时下划线做动画：① 从左往右长出（平时留一条淡线，提示这里能点）；② 从左边进、右边出；③ 像荧光笔一样从底部涂满。适合正文里的「查看证明」、页脚、导航这类不需要按钮分量的操作。缺点是点击区域小，手机上不容易点准。',
          kw: ['链接', '下划线动画', 'Link hover', '荧光笔'],
          bg: '#faf7f0',
          html: `<div class="center"><div class="bt-ul-wrap">
            <p>由比值判别法，级数 <i>∑ xⁿ/n!</i> 对一切实数 <i>x</i> 都收敛（<a class="bt-ul u1" href="#">查看证明</a>）。</p>
            <div class="bt-ul-links"><a class="bt-ul u1" href="#">阅读下一节${bic('arrow')}</a><a class="bt-ul u2" href="#">相关定理</a><a class="bt-ul u3" href="#">练习题</a></div>
          </div></div>`,
          init(stage, ctx) {
            stage.querySelectorAll('a.bt-ul').forEach((a) => ctx.on(a, 'click', (e) => e.preventDefault()));
          },
          css: `/* ① 从左长出：两层背景，一条淡线常驻，一条实线变宽 */
.link {
  color: #9a3412; text-decoration: none;
  background:
    linear-gradient(currentColor, currentColor) 0 100% / 0 1.5px no-repeat,
    linear-gradient(#9a341240, #9a341240) 0 100% / 100% 1px no-repeat;
  transition: background-size .35s cubic-bezier(.3,.7,.2,1);
}
.link:hover { background-size: 100% 1.5px, 100% 1px; }
/* ③ 荧光笔 */
.link-mark { background: linear-gradient(#fde68a, #fde68a) 0 100% / 100% 6px no-repeat; }
.link-mark:hover { background-size: 100% 100%; }`
        },
        {
          code: 'B12', name: '图标按钮', en: 'Icon button · FAB', meta: '工具栏 · 移动端',
          desc: '三种形态：顶栏的纯图标圆钮（返回、收藏、分享——悬停浮出圆形底，停一会儿出现文字提示；收藏可切换）；「图标＋文字」按钮（下载讲义）；右下角浮在内容上方的圆角方形「悬浮操作按钮」FAB，放这一页最常用的动作（写笔记）。纯图标省空间，但含义不明确时必须配文字提示。',
          kw: ['图标按钮', 'Icon button', 'FAB', '悬浮按钮', '工具栏'],
          bg: '#e9edf3',
          html: `<div class="bt-app">
            <div class="bt-app-bar">
              ${bb('bt-icon', bic('back'), 'aria-label="返回" data-tip="返回"')}
              <span class="bt-app-t">4.2 幂级数</span>
              ${bb('bt-icon', bic('bookmark'), 'aria-label="收藏" aria-pressed="false" data-tip="收藏"')}
              ${bb('bt-icon', bic('share'), 'aria-label="分享" data-tip="分享"')}
            </div>
            <div class="bt-app-body">
              <b>收敛半径</b><i></i><i></i><i class="s"></i>
              ${bb('bt-tonal', `${bic('download')}下载讲义`)}
            </div>
            ${bb('bt-fab', bic('pencil'), 'aria-label="写笔记" data-tip="写笔记"')}
          </div>`,
          init(stage, ctx) {
            const bm = stage.querySelector('[aria-pressed]');
            ctx.on(bm, 'click', () => {
              const on = bm.getAttribute('aria-pressed') !== 'true';
              bm.setAttribute('aria-pressed', String(on));
              bm.dataset.tip = on ? '已收藏' : '收藏';
            });
          },
          css: `.icon-btn {
  width: 40px; height: 40px; border-radius: 50%;
  border: 0; background: transparent; color: #374151;
}
.icon-btn:hover { background: rgb(17 24 39 / .07); }
.icon-btn[aria-pressed="true"] { color: #2563eb; }
/* 悬浮操作按钮（Material 3 FAB） */
.fab {
  position: fixed; right: 16px; bottom: 16px;
  width: 56px; height: 56px; border-radius: 16px;
  background: #d3e3fd; color: #041e49;
  box-shadow: 0 1px 3px rgb(0 0 0 / .2), 0 4px 10px 2px rgb(0 0 0 / .12);
}`,
          links: [['Material 3 · FAB', 'https://m3.material.io/components/floating-action-button/overview'], ['Material 3 · Icon buttons', 'https://m3.material.io/components/icon-buttons/overview']]
        }
      ]
    },
    {
      type: 'gallery', token: 'buttons-2', title: '交互与状态', min: 340,
      intro: '按钮被碰到时怎么回应：颜色扫入、水波、吸附、加载、确认……这些反馈让人确信「我点到了」。每一个都请亲手试一试。',
      tiles: [
        {
          code: 'B13', name: '填充扫过', en: 'Fill sweep', meta: '悬停效果',
          desc: '悬停时一块颜色从一侧扫进来把按钮填满，文字随之反白；移开时从另一侧退出。三个方向：横扫、自下而上、斜切。常见于作品集、品牌官网和时尚类网站，动作干脆、有设计感；缺点是动画要 0.4 秒左右，用在高频操作上会显得拖沓。',
          kw: ['Fill sweep', '悬停填充', '反白', 'transform-origin'],
          bg: '#f6f3ee',
          html: `<div class="center"><div class="bt-sw-grid">
            <div class="bt-sw-c">${bb('bt-sweep', '开始学习')}<span class="bt-sw-lab">横扫 →</span></div>
            <div class="bt-row" style="gap:16px">
              <div class="bt-sw-c">${bb('bt-sweep v', '下一节')}<span class="bt-sw-lab">自下而上 ↑</span></div>
              <div class="bt-sw-c">${bb('bt-sweep d', '查看证明')}<span class="bt-sw-lab">斜切 ⟋</span></div>
            </div>
          </div></div>`,
          css: `.btn-sweep {
  position: relative; overflow: hidden; isolation: isolate;
  border: 2px solid #111; background: transparent; color: #111;
  transition: color .4s cubic-bezier(.7,0,.2,1);
}
.btn-sweep::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: #111;
  transform: scaleX(0); transform-origin: right;   /* 从右边退出 */
  transition: transform .45s cubic-bezier(.7,0,.2,1);
}
.btn-sweep:hover { color: #fff; }
.btn-sweep:hover::before { transform: scaleX(1); transform-origin: left; } /* 从左边进入 */`
        },
        {
          code: 'B14', name: '涟漪', en: 'Ripple', meta: 'Material Design',
          desc: 'Material Design 的点击反馈：从按下的位置冒出一圈水波，扩散到整个按钮，松手后淡出；悬停时先盖一层 8% 的浅色「状态层」。下面的卡片列表项也有同样的水波（试试在不同位置按住）。安卓应用和 Google 产品的标志；缺点是放在非 Material 风格的界面里会显得突兀。',
          kw: ['涟漪', 'Ripple', 'Material', '状态层', '水波'],
          bg: '#fef7ff',
          html: `<div class="center"><div class="bt-stack bt-m3">
            <div class="bt-row">${bb('bt-m3b filled bt-rp', `${bic('check')}提交答案`)}${bb('bt-m3b ol bt-rp', '保存草稿')}</div>
            ${bb('bt-m3-card bt-rp', `<i class="av">∫</i><span><b>4.3 一致收敛</b><small>继续学习 · 约 12 分钟</small></span>${bic('chevR')}`)}
          </div></div>`,
          init(stage, ctx) {
            const spawn = (el, x, y) => {
              const r = el.getBoundingClientRect();
              const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
              const s = document.createElement('span');
              s.className = 'bt-rip';
              s.style.cssText = `left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px`;
              el.appendChild(s);
              void s.offsetWidth;
              s.classList.add('bt-rip-in');
              s._t = performance.now();
              return s;
            };
            const fade = (s) => {
              if (!s) return;
              ctx.later(Math.max(0, 320 - (performance.now() - s._t)), () => {
                s.classList.add('bt-rip-out');
                ctx.later(450, () => s.remove());
              });
            };
            stage.querySelectorAll('.bt-rp').forEach((el) => {
              let cur = null;
              const up = () => { fade(cur); cur = null; };
              ctx.on(el, 'pointerdown', (e) => {
                if (e.button) return;
                const r = el.getBoundingClientRect();
                up();
                cur = spawn(el, e.clientX - r.left, e.clientY - r.top);
              });
              ctx.on(el, 'pointerup', up);
              ctx.on(el, 'pointerleave', up);
              ctx.on(el, 'pointercancel', up);
              ctx.on(el, 'keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) fade(spawn(el, el.offsetWidth / 2, el.offsetHeight / 2));
              });
            });
          },
          css: `.btn { position: relative; overflow: hidden; isolation: isolate; }
/* 悬停状态层 */
.btn::before { content: ""; position: absolute; inset: 0; z-index: -1;
  background: currentColor; opacity: 0; transition: opacity .15s; }
.btn:hover::before { opacity: .08; }
/* JS 在按下位置插入 <span class="ripple">，宽高 = 到最远角距离 × 2 */
.ripple { position: absolute; z-index: -1; border-radius: 50%;
  background: currentColor; opacity: .2; transform: scale(0);
  transition: transform .5s cubic-bezier(.2,0,0,1), opacity .4s; }
.ripple.in  { transform: scale(1); }
.ripple.out { opacity: 0; }`,
          links: [['Material 3 · States', 'https://m3.material.io/foundations/interaction/states/overview']]
        },
        {
          code: 'B15', name: '磁吸按钮', en: 'Magnetic', meta: '创意网站 · Awwwards 风',
          desc: '光标进入虚线圈后，按钮像被磁铁吸住一样朝光标偏移，里面的文字偏移得更多（视差）；悬停时荧光绿从中心涨满。光标离开后按钮带一点回弹弹回原位。常见于获奖的创意工作室和作品集网站。趣味性强；缺点是手机上没有「靠近」这个动作，而且点击目标会移动，不适合表单等讲效率的场景。',
          kw: ['磁吸', 'Magnetic button', '光标跟随', '回弹', 'Awwwards'],
          bg: '#111112', dark: true,
          html: `<div class="bt-mag-field" aria-hidden="true"></div>
          <div class="center"><div class="bt-mag-row">
            <span class="bt-mag-w">${bb('bt-mag sm', `<span class="bt-mag-t">${bic('chevL')}</span>`, 'aria-label="上一节"')}</span>
            <span class="bt-mag-w">${bb('bt-mag big', '<span class="bt-mag-t">开始学习</span>')}</span>
            <span class="bt-mag-w">${bb('bt-mag sm', `<span class="bt-mag-t">${bic('chevR')}</span>`, 'aria-label="下一节"')}</span>
          </div></div>
          <p class="bt-mag-hint">把鼠标移近按钮</p>`,
          init(stage, ctx) {
            const items = [...stage.querySelectorAll('.bt-mag')].map((b) => ({ b, t: b.querySelector('.bt-mag-t'), w: b.parentElement, big: b.classList.contains('big') }));
            const field = stage.querySelector('.bt-mag-field');
            const reset = (it) => { it.b.classList.remove('bt-near'); it.b.style.transform = ''; it.t.style.transform = ''; };
            ctx.on(stage, 'pointermove', (e) => {
              // 只吸住离光标最近（按各自半径归一）的那一个
              let best = null, bq = 1;
              const ds = items.map((it) => {
                const r = it.w.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
                const q = Math.hypot(dx, dy) / (r.width / 2 + (it.big ? 64 : 26));
                if (q < bq) { bq = q; best = it; }
                return [dx, dy];
              });
              items.forEach((it, i) => {
                if (it !== best) { if (it.b.classList.contains('bt-near')) reset(it); return; }
                const [dx, dy] = ds[i], k = it.big ? 0.36 : 0.42;
                it.b.classList.add('bt-near');
                it.b.style.transform = `translate(${(dx * k).toFixed(1)}px, ${(dy * k).toFixed(1)}px)`;
                it.t.style.transform = `translate(${(dx * k * 0.45).toFixed(1)}px, ${(dy * k * 0.45).toFixed(1)}px)`;
              });
              field.classList.toggle('on', !!best && best.big);
            });
            ctx.on(stage, 'pointerleave', () => { items.forEach(reset); field.classList.remove('on'); });
          },
          css: `.magnet { transition: transform .75s cubic-bezier(.2,1.7,.35,1); } /* 回弹 */
.magnet.near { transition: transform .18s cubic-bezier(.2,.7,.3,1); }  /* 跟随 */
/* JS（伪代码）：
   onpointermove: d = 光标 − 按钮中心
     若 |d| < 半径 + 64px：
       btn.style.transform  = translate(d × 0.36)
       text.style.transform = translate(d × 0.16)   ← 视差
     否则：清空 transform（弹回） */`
        },
        {
          code: 'B16', name: '加载→成功', en: 'Loading → Success', meta: '提交 · 保存 · 下载',
          desc: '上：点击后按钮收缩成圆圈并转起来，完成后变绿、画出对勾，两秒后恢复原样。下：在按钮内部用进度条和百分比显示下载进度。适合「提交答案」「保存」这类要等服务器的操作：按钮本身就告诉用户「收到了、在处理、成功了」，处理中还能防止重复点击。',
          kw: ['加载状态', 'Loading', '状态按钮', '进度', '防重复提交'],
          bg: '#f8fafc',
          html: `<div class="center"><div class="bt-stack" style="gap:22px">
            ${bb('bt-ld', `<span class="bt-ld-l">提交答案</span><span class="bt-ld-spin" aria-hidden="true"></span>`, 'aria-live="polite"')}
            ${bb('bt-pg', `<span class="bt-pg-bar"></span><span class="bt-pg-l">${bic('download')}<span>下载讲义</span></span>`)}
          </div></div>`,
          init(stage, ctx) {
            const ld = stage.querySelector('.bt-ld'), lab = ld.querySelector('.bt-ld-l');
            let busy = false;
            ctx.on(ld, 'click', () => {
              if (busy) return;
              busy = true;
              bMotion(stage, ctx);
              const w = ld.offsetWidth;
              ld.style.width = `${w}px`;
              void ld.offsetWidth;
              ld.classList.add('bt-load');
              ld.style.width = `${ld.offsetHeight}px`;
              ld.setAttribute('aria-busy', 'true');
              ctx.later(1500, () => {
                ld.classList.replace('bt-load', 'bt-done');
                ld.removeAttribute('aria-busy');
                lab.innerHTML = `${bCheck}已提交`;
                ld.style.width = `${w}px`;
                ctx.later(2200, () => {
                  ld.classList.remove('bt-done');
                  lab.textContent = '提交答案';
                  ctx.later(400, () => { ld.style.width = ''; busy = false; });
                });
              });
            });
            const pg = stage.querySelector('.bt-pg'), bar = pg.querySelector('.bt-pg-bar'), pl = pg.querySelector('.bt-pg-l');
            let pBusy = false;
            ctx.on(pg, 'click', () => {
              if (pBusy) return;
              pBusy = true;
              const D = 1800, N = 24;
              pl.innerHTML = `${bic('download')}<span>下载中 0%</span>`;
              const txt = pl.querySelector('span');
              bar.style.transition = `transform ${D}ms linear`;
              bar.style.transform = 'scaleX(1)';
              for (let i = 1; i <= N; i++) ctx.later((D * i) / N, () => { txt.textContent = `下载中 ${Math.round((100 * i) / N)}%`; });
              ctx.later(D + 60, () => {
                pg.classList.add('bt-done');
                pl.innerHTML = `${bCheck}<span>已下载</span>`;
                ctx.later(2000, () => {
                  pg.classList.remove('bt-done');
                  bar.style.transition = 'none';
                  bar.style.transform = '';
                  pl.innerHTML = `${bic('download')}<span>下载讲义</span>`;
                  pBusy = false;
                });
              });
            });
          },
          css: `.btn-load { transition: width .38s cubic-bezier(.4,0,.2,1), background .3s; }
.btn-load.loading { width: 48px !important; padding: 0; }   /* 收成圆 */
.btn-load.loading .label { opacity: 0; }
.spinner {
  width: 22px; height: 22px; border-radius: 50%;
  border: 2.5px solid rgb(255 255 255 / .25); border-top-color: #fff;
  animation: spin .75s linear infinite;
}
.btn-load.done { background: #16a34a; }
.btn-load.done path { stroke-dasharray: 24; animation: draw .42s backwards; }
@keyframes spin { to { transform: rotate(1turn); } }
@keyframes draw { from { stroke-dashoffset: 24; } }`
        },
        {
          code: 'B17', name: '按下缩放', en: 'Press scale', meta: 'iOS · App Store 卡片',
          desc: '按下时整个按钮或卡片缩到 96%，松手后带一点弹性回到原大小，像按下一个有弹性的实物。这是苹果 iOS 和 App Store 卡片的标志性反馈，只要两行 transform 就能实现。适合可点击的卡片和主按钮；缩放幅度超过 0.9 就会显得夸张。按住不放能看得更清楚。',
          kw: ['按压反馈', 'Press', 'scale', '弹簧', 'iOS'],
          bg: '#f5f5f7',
          html: `<div class="center"><div class="bt-stack">
            ${bb('bt-press bt-pcard', `<span class="bt-pcard-art">∑</span><span class="bt-pcard-t"><small>第 4 章</small><b>幂级数</b><em>继续学习 · 已完成 62%</em></span><span class="bt-pcard-r" aria-hidden="true"><svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="14" stroke="#e8e8ed"/><circle cx="17" cy="17" r="14" stroke="#0071e3" stroke-linecap="round" stroke-dasharray="54.5 88"/></svg><b>62</b></span>`)}
            <div class="bt-row">${bb('bt-press bt-apl', '开始学习')}${bb('bt-press bt-apl g', '稍后')}</div>
          </div></div>`,
          css: `.pressable {
  /* 松手：带过冲的弹簧曲线 */
  transition: transform .5s cubic-bezier(.3, 1.6, .5, 1);
}
.pressable:active {
  transform: scale(.96);
  /* 按下：快速、不回弹 */
  transition-duration: .12s;
  transition-timing-function: ease-out;
}`
        },
        {
          code: 'B18', name: '状态全集', en: 'Button states', meta: '设计规范必备',
          desc: '同一个按钮的六种状态并排：默认；悬停（变深、微微浮起）；按下（再深、下沉、内阴影）；聚焦（键盘 Tab 选中时的外圈光环）；禁用（变灰、不可点）；加载中。设计按钮时要把这些状态全部定下来——尤其是聚焦环，它决定了只用键盘的人能不能用你的网站。',
          kw: ['Hover', 'Active', 'Focus', 'Disabled', '交互状态'],
          bg: '#ffffff',
          html: `<div class="center"><div class="bt-states">
            <div class="bt-stc">${bb('bt-sb', '提交')}<span>默认<i>default</i></span></div>
            <div class="bt-stc">${bb('bt-sb h', '提交')}${bCursor()}<span>悬停<i>hover</i></span></div>
            <div class="bt-stc">${bb('bt-sb a', '提交')}<i class="bt-cur-dot"></i>${bCursor('dn')}<span>按下<i>active</i></span></div>
            <div class="bt-stc">${bb('bt-sb f', '提交')}<span>聚焦<i>focus · Tab</i></span></div>
            <div class="bt-stc">${bb('bt-sb', '提交', 'disabled')}<span>禁用<i>disabled</i></span></div>
            <div class="bt-stc">${bb('bt-sb l', '<i></i>提交', 'aria-busy="true"')}<span>加载中<i>loading</i></span></div>
          </div></div>`,
          css: `.btn            { background: #4f46e5; }
.btn:hover      { background: #4338ca;
                  box-shadow: 0 4px 10px -2px rgb(67 56 202 / .45); }
.btn:active     { background: #3730a3; transform: translateY(1px);
                  box-shadow: inset 0 2px 3px rgb(0 0 0 / .25); }
.btn:focus-visible { outline: none;
                  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4f46e5; }
.btn:disabled   { background: #e4e4e7; color: #a1a1aa;
                  cursor: not-allowed; box-shadow: none; }
.btn[aria-busy="true"] { cursor: progress; opacity: .85; }`,
          links: [['MDN · :focus-visible', 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible']]
        },
        {
          code: 'B19', name: '分段控件', en: 'Segmented control · Tabs', meta: 'iOS · Material',
          desc: '上：iOS 分段控件——几个选项挤在一条灰色轨道里，白色滑块平滑地滑到被选中的那一项，下面的内容随之切换。下：Material 风格的标签页，被选中项下方的蓝色指示条滑过去并改变宽度。适合 2–5 个互斥视图的切换（讲义 / 例题 / 习题）；选项多了或文字长了，该换成下拉菜单。聚焦后可以用 ← → 切换。',
          kw: ['分段控件', 'Segmented control', 'Tabs', '标签页', '滑块'],
          bg: '#f2f2f7',
          html: `<div class="center"><div class="bt-segw bt-ios-f">
            <div class="bt-seg no-pagekeys" role="radiogroup" aria-label="内容类型"><span class="bt-seg-th"></span>
              ${['讲义', '例题', '习题'].map((t, i) => bb('bt-seg-o', t, `role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}"`)).join('')}
            </div>
            <div class="bt-seg-p" aria-live="polite"></div>
            <div class="bt-tabs no-pagekeys" role="tablist" aria-label="本节">
              ${['概览', '定理', '证明', '练习'].map((t, i) => bb('bt-tab', t, `role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"`)).join('')}
              <span class="bt-tabs-ink"></span>
            </div>
          </div></div>`,
          init(stage, ctx) {
            const PANEL = [
              ['book', '4.2 幂级数 · 讲义', '12 页 · 约 25 分钟', '#0a84ff'],
              ['bulb', '例题', '8 道 · 每道都有详细解答', '#ff9f0a'],
              ['pencil', '习题', '24 道 · 已完成 9 道', '#30d158']
            ];
            const seg = stage.querySelector('.bt-seg'), opts = [...seg.querySelectorAll('.bt-seg-o')], panel = stage.querySelector('.bt-seg-p');
            const showPanel = (i, anim) => {
              const [ic, t, s, c] = PANEL[i];
              panel.innerHTML = `<b style="--c:${c}">${bic(ic)}</b><span>${t}<small>${s}</small></span>`;
              if (anim && ctx.motion()) { panel.classList.remove('bt-fade'); void panel.offsetWidth; panel.classList.add('bt-fade'); }
            };
            const pick = (i, focus) => {
              seg.style.setProperty('--i', i);
              opts.forEach((o, k) => { o.setAttribute('aria-checked', String(k === i)); o.tabIndex = k === i ? 0 : -1; });
              if (focus) opts[i].focus();
              showPanel(i, true);
            };
            showPanel(0, false);
            opts.forEach((o, i) => ctx.on(o, 'click', () => pick(i)));
            const keys = (list, cur, go) => (e) => {
              const n = list.length, i = cur();
              let j = null;
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
              else if (e.key === 'Home') j = 0;
              else if (e.key === 'End') j = n - 1;
              if (j === null) return;
              bArrow(e);
              go(j, true);
            };
            ctx.on(seg, 'keydown', keys(opts, () => opts.findIndex((o) => o.getAttribute('aria-checked') === 'true'), pick));
            // 标签页：指示条按选中项的位置和宽度移动
            const tl = stage.querySelector('.bt-tabs'), tabs = [...tl.querySelectorAll('.bt-tab')], ink = tl.querySelector('.bt-tabs-ink');
            let sel = 0;
            const place = () => { const t = tabs[sel]; ink.style.width = `${t.offsetWidth}px`; ink.style.transform = `translateX(${t.offsetLeft}px)`; };
            const choose = (i, focus) => {
              sel = i;
              tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
              if (focus) tabs[i].focus();
              place();
            };
            ink.style.transition = 'none';
            place();
            void ink.offsetWidth;
            ink.style.transition = '';
            tabs.forEach((t, i) => ctx.on(t, 'click', () => choose(i)));
            ctx.on(tl, 'keydown', keys(tabs, () => sel, choose));
            const ro = new ResizeObserver(() => { ink.style.transition = 'none'; place(); void ink.offsetWidth; ink.style.transition = ''; });
            tabs.forEach((t) => ro.observe(t));
            ctx.add(() => ro.disconnect());
          },
          css: `.seg { position: relative; display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2px; border-radius: 9px; background: rgb(118 118 128 / .14); }
.seg-thumb {                 /* 白色滑块，--i = 选中项序号 */
  position: absolute; inset: 2px auto 2px 2px;
  width: calc((100% - 4px) / 3); border-radius: 7px; background: #fff;
  box-shadow: 0 3px 8px rgb(0 0 0 / .12), 0 3px 1px rgb(0 0 0 / .04);
  transform: translateX(calc(var(--i) * 100%));
  transition: transform .34s cubic-bezier(.3,.8,.25,1);
}
.seg button { position: relative; z-index: 1; height: 32px;
  background: none; border: 0; font-weight: 500; }
.seg button[aria-checked="true"] { font-weight: 600; }`,
          links: [['Apple HIG · Segmented controls', 'https://developer.apple.com/design/human-interface-guidelines/segmented-controls'], ['WAI-ARIA · Tabs', 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/']]
        },
        {
          code: 'B20', name: '开关', en: 'Toggle switch', meta: 'iOS 设置页',
          desc: 'iOS 式开关：灰色轨道，打开后变绿（#34C759，近似），白色圆钮滑到右边；按住时圆钮会被「压扁」拉长一点。它只用于立即生效的二选一设置（显示提示、每日提醒）；如果还要再点「保存」才生效，应该用复选框。整行都可以点，键盘用空格切换。',
          kw: ['开关', 'Toggle', 'Switch', 'iOS', '设置'],
          bg: '#f2f2f7',
          html: `<div class="center"><div class="bt-ios-f" style="width:100%;display:grid;justify-items:center">
            <p class="bt-ios-h">学习设置</p>
            <div class="bt-ios">
              ${[['bulb', '#ff9f0a', '显示解题提示', true], ['skip', '#5e5ce6', '答对后自动下一题', false], ['bell', '#ff3b30', '每日学习提醒', true]].map(([ic, c, t, on]) => `<div class="bt-ios-row"><span class="bt-ios-ic" style="--c:${c}">${bic(ic)}</span><span class="bt-ios-l">${t}</span>${bb('bt-tg', '<i></i>', `role="switch" aria-checked="${on}" aria-label="${t}"`)}</div>`).join('')}
            </div>
          </div></div>`,
          init(stage, ctx) {
            stage.querySelectorAll('.bt-ios-row').forEach((row) => {
              const sw = row.querySelector('.bt-tg');
              ctx.on(sw, 'click', () => sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true')));
              ctx.on(row, 'click', (e) => { if (!e.target.closest('.bt-tg')) sw.click(); });
            });
          },
          css: `.switch { position: relative; width: 51px; height: 31px;
  border: 0; border-radius: 16px; background: #e9e9eb;
  transition: background .25s; }
.switch i { position: absolute; left: 2px; top: 2px;
  width: 27px; height: 27px; border-radius: 14px; background: #fff;
  box-shadow: 0 3px 8px rgb(0 0 0 / .15), 0 3px 1px rgb(0 0 0 / .06);
  transition: transform .3s cubic-bezier(.3,.7,.3,1.15), width .2s; }
.switch[aria-checked="true"]   { background: #34c759; }
.switch[aria-checked="true"] i { transform: translateX(20px); }
.switch:active i { width: 33px; }                          /* 按住拉长 */
.switch[aria-checked="true"]:active i { transform: translateX(14px); }`,
          links: [['Apple HIG · Toggles', 'https://developer.apple.com/design/human-interface-guidelines/toggles'], ['WAI-ARIA · Switch', 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/']]
        },
        {
          code: 'B21', name: '拆分按钮 / 按钮组', en: 'Split button · Button group', meta: '工具栏 · 编辑器',
          desc: '上：拆分按钮——左边是默认动作（导出 PDF），右边的小箭头展开同类的其它动作；选了别的，左边的默认动作也随之改变。下：按钮组——几个相关按钮共用一圈边框连成一条（上一节 / 目录 / 下一节）。适合工具栏和编辑器；缺点是两个点击区挨得很近，新手常点错。菜单可用 ↑↓ 和 Esc 操作。',
          kw: ['拆分按钮', 'Split button', '下拉菜单', '按钮组', 'Button group'],
          bg: '#f4f6f9',
          html: `<div class="bt-spw">
            <div class="bt-split">
              ${bb('bt-split-main', `${bic('file')}<span>导出 PDF</span>`)}
              ${bb('bt-split-c no-pagekeys', bic('chevD'), 'aria-haspopup="menu" aria-expanded="false" aria-label="更多导出方式"')}
              <div class="bt-menu no-pagekeys" role="menu" aria-label="导出方式">
                ${bb('bt-mi', `${bic('file')}导出 PDF<small>.pdf</small>`, 'role="menuitemradio" aria-checked="true" tabindex="-1"')}
                ${bb('bt-mi', `${bic('code')}导出 LaTeX<small>.tex</small>`, 'role="menuitemradio" aria-checked="false" tabindex="-1"')}
                ${bb('bt-mi', `${bic('print')}打印讲义<small>⌘P</small>`, 'role="menuitemradio" aria-checked="false" tabindex="-1"')}
              </div>
            </div>
            <p class="bt-sp-st" aria-live="polite"></p>
            <div class="bt-grp" role="group" aria-label="章节导航">${bb('', `${bic('chevL')}上一节`)}${bb('', '目录')}${bb('', `下一节${bic('chevR')}`)}</div>
            <span class="bt-grp-lab">当前：4.2 幂级数</span>
          </div>`,
          init(stage, ctx) {
            const F = [['file', '导出 PDF', '已导出 讲义-4.2.pdf'], ['code', '导出 LaTeX', '已导出 讲义-4.2.tex'], ['print', '打印讲义', '已发送到打印机']];
            const wrap = stage.querySelector('.bt-split'), main = wrap.querySelector('.bt-split-main'), car = wrap.querySelector('.bt-split-c');
            const menu = wrap.querySelector('.bt-menu'), items = [...menu.querySelectorAll('.bt-mi')], st = stage.querySelector('.bt-sp-st');
            let cur = 0, open = false, tid = 0;
            const say = (s) => { st.textContent = s; clearTimeout(tid); tid = ctx.later(2400, () => { st.textContent = ''; }); };
            const setOpen = (v, focusIdx) => {
              open = v;
              menu.classList.toggle('on', v);
              car.setAttribute('aria-expanded', String(v));
              if (v && focusIdx != null) items[focusIdx].focus({ preventScroll: true });
            };
            ctx.on(car, 'click', () => setOpen(!open, open ? null : cur));
            ctx.on(car, 'keydown', (e) => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { bArrow(e); setOpen(true, e.key === 'ArrowUp' ? items.length - 1 : cur); }
            });
            ctx.on(menu, 'keydown', (e) => {
              const i = items.indexOf(document.activeElement), n = items.length;
              if (e.key === 'ArrowDown') items[(i + 1) % n].focus();
              else if (e.key === 'ArrowUp') items[(i - 1 + n) % n].focus();
              else if (e.key === 'Home') items[0].focus();
              else if (e.key === 'End') items[n - 1].focus();
              else if (e.key === 'Escape') { setOpen(false); car.focus(); }
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { /* 吞掉，避免翻页 */ }
              else return;
              bArrow(e);
            });
            items.forEach((it, k) => ctx.on(it, 'click', () => {
              cur = k;
              items.forEach((x, j) => x.setAttribute('aria-checked', String(j === k)));
              main.innerHTML = `${bic(F[k][0])}<span>${F[k][1]}</span>`;
              setOpen(false);
              main.focus();
              say(`默认操作已改为「${F[k][1]}」`);
            }));
            ctx.on(main, 'click', () => say(`✓ ${F[cur][2]}`));
            ctx.on(document, 'pointerdown', (e) => { if (open && !wrap.contains(e.target)) setOpen(false); });
            ctx.on(wrap, 'focusout', (e) => { if (open && e.relatedTarget && !wrap.contains(e.relatedTarget)) setOpen(false); });
            // 按钮组：切换小节
            const SEC = ['4.1 函数项级数', '4.2 幂级数', '4.3 一致收敛', '4.4 傅里叶级数'];
            let s = 1;
            const lab = stage.querySelector('.bt-grp-lab'), gb = stage.querySelectorAll('.bt-grp .bt-b');
            const showSec = () => { lab.textContent = `当前：${SEC[s]}`; };
            ctx.on(gb[0], 'click', () => { s = Math.max(0, s - 1); showSec(); });
            ctx.on(gb[1], 'click', () => { lab.textContent = '目录：4.1 – 4.4'; });
            ctx.on(gb[2], 'click', () => { s = Math.min(SEC.length - 1, s + 1); showSec(); });
          },
          css: `.split { display: flex; }
.split > button { height: 40px; border: 0; background: #1f6feb; color: #fff; }
.split .main  { border-radius: 10px 0 0 10px; padding: 0 16px; }
.split .caret { border-radius: 0 10px 10px 0; width: 38px;
  box-shadow: inset 1px 0 0 rgb(255 255 255 / .28); }   /* 中间细分隔线 */
/* 按钮组：共用一圈边框 */
.group { display: inline-flex; border-radius: 10px;
  box-shadow: inset 0 0 0 1px #d0d5dd; }
.group button + button { box-shadow: inset 1px 0 0 #d0d5dd; }
.group button:first-child { border-radius: 10px 0 0 10px; }
.group button:last-child  { border-radius: 0 10px 10px 0; }`,
          links: [['WAI-ARIA · Menu button', 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/']]
        },
        {
          code: 'B22', name: '点赞微交互', en: 'Like burst', meta: '社交产品 · 微交互',
          desc: '点一下心形：先冒出一个收缩的彩色圆环，心形从无到有弹出、放大再回落，周围迸出一圈彩色小粒子，数字向上翻动 +1；再点一次取消，数字向下翻。这类「微交互」让轻量操作也有满足感，推特（X）的点赞就是这样。只适合点赞、收藏这类带情绪的小操作。',
          kw: ['微交互', 'Micro-interaction', '点赞', '粒子', '弹跳'],
          bg: '#fdf2f5',
          html: `<div class="center"><div class="bt-lk-card">
            <div class="bt-lk-h"><span class="bt-lk-av">林</span><span><b>定理 3.2 的证明思路</b><small>魏尔斯特拉斯 M 判别法 · 3 分钟前</small></span></div>
            <p>关键一步：<i>|f<sub>n</sub>(x)| ≤ M<sub>n</sub></i> 且 <i>∑M<sub>n</sub></i> 收敛，柯西准则对所有 <i>x</i> 一致成立。</p>
            <div class="bt-lk-f">
              ${bb('bt-like', `<span class="bt-lk-ic"><i class="bt-lk-ring"></i>${['#f91880', '#ff8a00', '#ffd400', '#18c37e', '#1d9bf0', '#8b5cf6', '#f91880', '#ff8a00'].map((c, i) => `<i class="bt-lk-p" style="--a:${i * 45 + 20}deg;--c:${c}"></i>`).join('')}<svg viewBox="0 0 24 24" aria-hidden="true">${BP.heart}</svg></span><span class="bt-lk-n"><span>128</span></span>`, 'aria-pressed="false" aria-label="点赞"')}
              ${bb('bt-lk2', `${bic('chat')}<span>12</span>`, 'aria-label="评论"')}
            </div>
          </div></div>`,
          init(stage, ctx) {
            const lk = stage.querySelector('.bt-like'), num = lk.querySelector('.bt-lk-n span');
            let on = false, n = 128;
            ctx.on(lk, 'click', () => {
              on = !on;
              n += on ? 1 : -1;
              lk.setAttribute('aria-pressed', String(on));
              num.textContent = n;
              lk.classList.remove('bt-pop', 'bt-up', 'bt-dn');
              void lk.offsetWidth;
              if (!ctx.motion()) return;
              lk.classList.add(on ? 'bt-up' : 'bt-dn');
              if (on) lk.classList.add('bt-pop');
            });
          },
          css: `.like[aria-pressed="true"] svg { fill: #f91880; stroke: #f91880; }
.like.pop svg   { animation: heart .5s cubic-bezier(.17,.89,.32,1.4) both; }
.like.pop .ring { animation: ring .45s ease-out; }        /* 收缩圆环 */
.like.pop .dot  { animation: burst .7s .12s ease-out both; }
/* 8 个粒子，各自 --a 为 20°、65°、110°…… */
@keyframes heart { 0%,20% { transform: scale(0) } 55% { transform: scale(1.3) }
                   75% { transform: scale(.92) } 100% { transform: scale(1) } }
@keyframes ring  { 0% { transform: scale(.1); border-width: 13px; opacity: 1 }
                   100% { transform: scale(1.15); border-width: 0; opacity: 0 } }
@keyframes burst { from { transform: rotate(var(--a)) translateY(-9px);  opacity: 1 }
                   to   { transform: rotate(var(--a)) translateY(-27px) scale(.2); opacity: 0 } }`
        },
        {
          code: 'B23', name: '复制按钮', en: 'Copy to clipboard', meta: '代码块 · 分享链接',
          desc: '点击后图标从「两张纸」转成对勾、文字变成「已复制」并变绿，2 秒后自动恢复。放在代码块、公式的 LaTeX 源码、分享链接旁边。关键在于反馈：复制这个动作本身看不见，没有反馈的话用户会反复点。（这里真的会写入剪贴板。）',
          kw: ['复制', 'Copy to clipboard', '状态反馈', '代码块'],
          bg: '#eef1f5',
          html: `<div class="center"><div class="bt-cpw">
            <div class="bt-code">
              <div class="bt-code-h"><span>geometric.tex</span>${bb('bt-cp', `<span class="bt-cp-ic">${bic('copy')}${bic('check')}</span><span class="bt-cp-t">复制</span>`, 'aria-label="复制 LaTeX 源码"')}</div>
              <pre><span class="k">\\sum</span>_{n=<span class="n">1</span>}^{<span class="k">\\infty</span>} <span class="k">\\frac</span>{<span class="n">1</span>}{<span class="n">2</span>^n} = <span class="n">1</span>
<span class="p">% 几何级数，公比 1/2</span></pre>
            </div>
            <div class="bt-share"><code>mathlab.cn/s/power-series-4-2</code>${bb('bt-cp bt-cp-s', `<span class="bt-cp-ic">${bic('copy')}${bic('check')}</span><span class="bt-cp-t">复制链接</span>`)}</div>
          </div></div>`,
          init(stage, ctx) {
            const SRC = ['\\sum_{n=1}^{\\infty} \\frac{1}{2^n} = 1', 'https://mathlab.cn/s/power-series-4-2'];
            stage.querySelectorAll('.bt-cp').forEach((b, i) => {
              const lab = b.querySelector('.bt-cp-t'), t0 = lab.textContent;
              let tid = 0;
              ctx.on(b, 'click', () => {
                try { const p = navigator.clipboard?.writeText(SRC[i]); if (p) p.catch(() => {}); } catch { /* 无剪贴板权限时只显示反馈 */ }
                b.classList.add('bt-ok');
                lab.textContent = '已复制';
                clearTimeout(tid);
                tid = ctx.later(2000, () => { b.classList.remove('bt-ok'); lab.textContent = t0; });
              });
            });
          },
          css: `/* 两个图标叠在一起，用类名切换 */
.copy .icon { position: absolute; transition: transform .25s cubic-bezier(.3,.7,.3,1.3), opacity .2s; }
.copy .icon-check { transform: scale(.3) rotate(-30deg); opacity: 0; }
.copy.ok .icon-copy  { transform: scale(.3); opacity: 0; }
.copy.ok .icon-check { transform: none; opacity: 1; }
.copy.ok { color: #3fb950; }
/* JS：
   navigator.clipboard.writeText(text);
   btn.classList.add('ok'); label.textContent = '已复制';
   setTimeout(() => { btn.classList.remove('ok'); label.textContent = '复制'; }, 2000); */`
        },
        {
          code: 'B24', name: '长按确认', en: 'Hold to confirm', meta: '防误触 · 危险操作',
          desc: '必须按住约 1.2 秒，红色从左往右灌满（文字随之反白）后才执行；中途松手就退回去。用来保护「重置进度」「删除」这类不可撤销的操作，比弹出一个确认对话框更轻、更不打断。缺点是第一次用的人不知道要按住，所以按钮上必须写明「按住」。键盘可按住空格键。',
          kw: ['长按', 'Hold to confirm', '防误触', '危险操作', '进度填充'],
          bg: '#f5f0ec',
          html: `<div class="center"><div class="bt-hold-card">
            <h5>重置第 4 章的学习进度？</h5>
            <p>已完成的 9 道习题和笔记都会被清空，无法撤销。</p>
            ${bb('bt-hold', `<span class="bt-hold-l">${bic('reset')}<span>按住以重置进度</span></span><span class="bt-hold-fx" aria-hidden="true">${bic('reset')}<span>按住以重置进度</span></span>`)}
            <p class="bt-hold-hint">长按 1.2 秒 · 中途松手即取消</p>
          </div></div>`,
          init(stage, ctx) {
            const b = stage.querySelector('.bt-hold'), labs = b.querySelectorAll('.bt-hold-l, .bt-hold-fx');
            const D = 1200;
            let tid = 0, done = false;
            const setLab = (html) => labs.forEach((l) => { l.innerHTML = html; });
            const L0 = labs[0].innerHTML;
            const finish = () => {
              tid = 0;
              done = true;
              bMotion(stage, ctx);
              b.classList.remove('bt-on');
              b.classList.add('bt-done');
              setLab(`${bic('check')}<span>已重置</span>`);
              ctx.later(2400, () => { b.classList.remove('bt-done'); setLab(L0); done = false; });
            };
            const start = () => { if (done || tid) return; b.classList.add('bt-on'); tid = ctx.later(D, finish); };
            const cancel = () => { if (!tid) return; clearTimeout(tid); tid = 0; b.classList.remove('bt-on'); };
            ctx.on(b, 'pointerdown', (e) => { if (!e.button) start(); });
            ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((ev) => ctx.on(b, ev, cancel));
            ctx.on(b, 'keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) start(); } });
            ctx.on(b, 'keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') cancel(); });
            ctx.on(b, 'contextmenu', (e) => e.preventDefault());
          },
          css: `.hold { position: relative; overflow: hidden; touch-action: none;
  background: #fef2f2; color: #b91c1c; }
/* 上面再叠一层红底白字，用 clip-path 从左往右露出 */
.hold .fill { position: absolute; inset: 0; background: #dc2626; color: #fff;
  clip-path: inset(0 100% 0 0);
  transition: clip-path .35s cubic-bezier(.3,.7,.3,1); }   /* 松手：快速退回 */
.hold.holding .fill { clip-path: inset(0 0 0 0);
  transition: clip-path 1.2s linear; }                     /* 按住：匀速灌满 */
/* JS：pointerdown → 加 .holding 并 setTimeout(执行, 1200)
       pointerup / pointerleave → 去掉 .holding 并 clearTimeout */`
        }
      ]
    }
  ]);
