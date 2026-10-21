// ===== P 页面切换：每个样品是一部小手机，自动在两（或几）个页面之间来回切换，也可以点 =====
const PT_SB = '<div class="pt-sb"><b>9:41</b><span><i class="pt-sig"></i><i class="pt-bat"></i></span></div>';
const PT_SBX = '<div class="pt-sb pt-sbx"><b>9:41</b><span><i class="pt-sig"></i><i class="pt-bat"></i></span></div>';
const PT_CH = [
  ['1', '实数与数列', '确界 · 单调收敛', '#ffe1bf', '#c2620a'],
  ['2', '极限与连续', 'ε-δ · 介值定理', '#ccf2d6', '#1a8a45'],
  ['3', '级数', '审敛法 · 幂级数', '#d4e4ff', '#2f6bff'],
  ['4', '积分', '黎曼和 · 牛顿–莱布尼茨', '#e5dbff', '#6741d9'],
  ['5', '多元微分', '偏导数 · 梯度', '#ffd8e4', '#c2255c']
];
const ptLines = (n, k = 3) => Array.from({ length: n }, (_, i) => `<i class="pt-l${i % k === k - 1 ? ' pt-s' : ''}"></i>`).join('');
const ptRows = (n = 4) => PT_CH.slice(0, n).map(([no, t, s, bg, fg]) => `<div class="pt-row${no === '3' ? ' pt-go' : ''}"><i class="pt-th" style="background:${bg};color:${fg}">${no}</i><span class="pt-rt"><b>第 ${no} 章 ${t}</b><small>${s}</small></span><i class="pt-chev"></i></div>`).join('');
const ptToc = (cls = '', n = 5) => `<div class="pt-pg pt-a ${cls}"><div class="pt-lt">目录</div><div class="pt-search">搜索</div><div class="pt-list">${ptRows(n)}</div></div>`;
const ptDetail = (cls = '', hero = '<div class="pt-hero">∑ aₙ</div>') => `<div class="pt-pg pt-b ${cls}"><div class="pt-nav"><span class="pt-back">目录</span><b>第 3 章</b><span></span></div>${hero}<div class="pt-body"><h6>级数</h6><small>审敛法 · 幂级数 · 共 12 节</small>${ptLines(8)}</div></div>`;
const ptPhone = (sc, inner, a, sb = PT_SB, hint = '点手机里的<br>元素试试') => `<div class="pt-root">
  <div class="pt-dir"><svg class="pt-arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg><span class="pt-dl">${a}</span></div>
  <div class="pt-hint"><i></i><span>${hint}</span></div>
  <div class="pt-ph"><div class="pt-sc ${sc}">${inner}${sb}</div></div></div>`;

// 自动演示时的「手指」：在目标元素中心出现一个圆圈，并让元素呈按下状态
function ptTap(sc, el, ctx) {
  if (!el) return;
  const r = el.getBoundingClientRect(), s = sc.getBoundingClientRect();
  if (!s.width) return;
  const d = document.createElement('i');
  d.className = 'pt-tap';
  d.style.left = `${((r.left + r.width / 2 - s.left) / s.width) * 100}%`;
  d.style.top = `${((r.top + r.height / 2 - s.top) / s.height) * 100}%`;
  sc.appendChild(d);
  el.classList.add('is-press');
  ctx.later(260, () => el.classList.remove('is-press'));
  ctx.later(700, () => d.remove());
}

// 状态机：labels[i] 是第 i 个状态的名字；apply(i, prev, info) 负责真正的切换
function ptRun(stage, ctx, o) {
  const sc = stage.querySelector('.pt-sc');
  const dir = stage.querySelector('.pt-dir'), dl = stage.querySelector('.pt-dl');
  if (o.vertical) dir.classList.add('is-v');
  let cur = o.start || 0, quiet = 0, k = 0;
  const order = o.order || [1, 0];
  const mark = (i, fwd) => { dir.classList.add('is-on'); dir.classList.toggle('is-back', !fwd); dl.textContent = o.labels[i]; };
  const go = (i, user, info) => {
    if (i === cur || i < 0 || i >= o.labels.length) return false;
    const prev = cur;
    cur = i;
    mark(i, o.fwd ? o.fwd(i, prev) : i > prev);
    o.apply(i, prev, info || {});
    if (user) quiet = performance.now() + 5000;
    return true;
  };
  ctx.every(o.every || 2800, () => {
    if (performance.now() < quiet) return;
    let nx = order[k % order.length];
    if (nx === cur) { k++; nx = order[k % order.length]; }
    k++;
    const el = o.tap ? o.tap(nx, cur) : null;
    if (el) { ptTap(sc, el, ctx); ctx.later(190, () => go(nx, false, { el })); }
    else go(nx, false, {});
  });
  return {
    go: (i, info) => go(i, true, info),
    sync(i) { if (i !== cur) { mark(i, i > cur); cur = i; quiet = performance.now() + 5000; } },
    get cur() { return cur; }
  };
}

// 最常见的两页切换：点 toB 去 B 页，点 toA 回 A 页
const ptAB = (o) => (stage, ctx) => {
  const sc = stage.querySelector('.pt-sc');
  const run = ptRun(stage, ctx, {
    labels: o.labels, vertical: o.vertical, every: o.every,
    apply: (i, prev, info) => { if (o.before) o.before(sc, i, info); sc.classList.toggle('is-b', i === 1); },
    tap: (nx) => sc.querySelector(nx === 1 ? o.tapB : o.tapA)
  });
  ctx.on(sc, 'click', (e) => {
    const b = o.toB && e.target.closest(o.toB), a = o.toA && e.target.closest(o.toA);
    if (b && run.cur === 0) run.go(1, { el: b, ev: e });
    else if (a && run.cur === 1) run.go(0, { el: a, ev: e });
  });
  if (o.extra) o.extra(stage, ctx, sc, run);
};

// —— 各样品的页面 ——
const ptChapterPage = (cls, btn) => `<div class="pt-pg pt-a ${cls}"><div class="pt-nav"><span class="pt-back">目录</span><b>第 3 章</b><span></span></div><div class="pt-hero">∑ aₙ</div><div class="pt-body"><h6>级数</h6><small>审敛法 · 幂级数</small>${ptLines(6)}</div><div class="pt-bot"><span class="pt-btn">${btn}</span></div></div>`;
const PT_ICONS = [
  ['∑', '级数', '#4dabf7', '#1c7ed6'], ['∫', '分析', '#748ffc', '#4263eb'], ['π', '几何', '#ffa94d', '#f76707'], ['√', '代数', '#69db7c', '#2b8a3e'],
  ['∞', '极限', '#f783ac', '#d6336c'], ['Δ', '差分', '#3bc9db', '#0c8599'], ['θ', '三角', '#ffd43b', '#f59f00'], ['λ', '线代', '#b197fc', '#7048e8'],
  ['∂', '偏导', '#ff8787', '#e03131'], ['e', '指数', '#63e6be', '#0ca678'], ['ℝ', '实数', '#a5d8ff', '#339af0'], ['≈', '估计', '#ced4da', '#868e96']
];
const ptGrad = (a, b) => `linear-gradient(160deg, ${a}, ${b})`;
const ptHome = () => {
  const xs = [15, 38.333, 61.667, 85];
  const icons = PT_ICONS.map(([g, n, a, b], i) => `<i class="pt-ic${i === 1 ? ' pt-go' : ''}" style="--x:${xs[i % 4]}cqw;--y:${17 + Math.floor(i / 4) * 14}cqh;--g:${ptGrad(a, b)}">${g}<span>${n}</span></i>`).join('');
  const dock = [['✉', '#69db7c', '#2f9e44'], ['☏', '#4dabf7', '#1971c2'], ['◎', '#ffa8a8', '#e03131'], ['♪', '#f783ac', '#c2255c']].map(([g, a, b], i) => `<i class="pt-ic" style="left:${[11, 34.33, 57.67, 81][i]}%;--g:${ptGrad(a, b)};font-family:var(--f-ui);font-size:7cqw">${g}</i>`).join('');
  return `<div class="pt-pg pt-a pt-home">${icons}<div class="pt-pgdots"><i></i><i></i><i></i></div><div class="pt-dock">${dock}</div></div>`;
};
const ptApp = () => `<div class="pt-pg pt-b pt-app" style="--g:${ptGrad('#748ffc', '#4263eb')}">
  <div class="pt-lt">数学分析</div><div class="pt-search">搜索定理、例题</div>
  <div class="pt-cards2">${['#d4e4ff', '#ffe1bf', '#ccf2d6', '#e5dbff'].map((c) => `<i style="--c:${c}"></i>`).join('')}</div>
  <div class="pt-body" style="margin-top:4cqw">${ptLines(5)}</div>
  <i class="pt-homebar"></i><div class="pt-splash">∫</div></div>`;

registerPages('P', [
  {
    type: 'gallery', token: 'transitions-1', title: '常见切换', min: 340,
    intro: '日常 App 和网站里最常用的九种「从一页到另一页」。每部手机都会自动来回演示（左边箭头是当前方向：→ 进入、← 返回），你也可以直接点手机里的条目和按钮。',
    tiles: [
      {
        code: 'P01', name: '淡入淡出', en: 'Crossfade', meta: '同时淡出 + 淡入', ratio: '4 / 5', bg: '#eef0f4',
        desc: '旧页变透明的同时新页显现，中间有一刻两页叠在一起（能看到重影）。没有方向感、最中性，适合同级内容的替换：切换图片、刷新内容、主题变化；View Transitions API 的默认效果就是它。不适合表达「进入详情 / 返回」这种层级关系。',
        kw: ['淡入淡出', '叠化', '中性', 'crossfade'],
        css: '.page { position: absolute; inset: 0; transition: opacity .5s ease-in-out; }\n.page.b { opacity: 0; }\n.show-b .page.a { opacity: 0; }\n.show-b .page.b { opacity: 1; }\n/* 或者：document.startViewTransition(() => swap()); 默认就是交叉淡化 */',
        html: ptPhone('pt-fade', ptToc() + ptDetail(), '目录'),
        init: ptAB({ labels: ['目录', '第 3 章'], toB: '.pt-row', toA: '.pt-back', tapB: '.pt-go', tapA: '.pt-back' })
      },
      {
        code: 'P02', name: '推入', en: 'Push (iOS navigation)', meta: 'iOS 导航 · 右进左出', ratio: '4 / 5', bg: '#eef0f4',
        desc: 'iOS 导航的标准动画：新页从右边整页推进来，旧页向左移出约三分之一并稍微变暗；返回时反过来。方向表达了层级——往右是更深一层，往左是回到上一层。几乎所有 iOS App 的「列表 → 详情」都是它。点「第 3 章」进入，点左上角「‹ 目录」返回。',
        more: '曲线接近 cubic-bezier(.32, .72, 0, 1)：起步快、收尾很软，约 0.5 秒。新页左边缘带一层淡阴影，像一张纸压在旧页上面。Android 的 Material 3 对应的是「共享轴（shared axis）」：新旧页同时横移并交叉淡化。',
        kw: ['推入', '层级', 'iOS 导航', 'push'],
        css: '.page { position: absolute; inset: 0;\n  transition: transform .5s cubic-bezier(.32, .72, 0, 1); }\n.page.b { transform: translateX(100%);\n  box-shadow: -8px 0 24px rgb(0 0 0 / .16); }\n.pushed .page.a { transform: translateX(-30%); filter: brightness(.88); }\n.pushed .page.b { transform: none; }',
        html: ptPhone('pt-push', ptToc() + ptDetail(), '目录'),
        init: ptAB({ labels: ['目录', '第 3 章'], toB: '.pt-row', toA: '.pt-back', tapB: '.pt-go', tapA: '.pt-back' })
      },
      {
        code: 'P03', name: '底部弹出', en: 'Sheet (iOS card modal)', meta: '底部卡片 + 背景缩小', ratio: '4 / 5', bg: '#eef0f4',
        desc: '一张卡片从屏幕底部升起，后面的页面缩小、下沉、变暗，顶部露出黑边——iOS 13 以来的「卡片式模态」。表示一个临时任务：选择、筛选、新建、分享，完成或下滑就回到原处。Material 的 Bottom sheet 类似，但背景不缩小。点「开始练习」打开，点「完成」或上方露出的旧页关闭。',
        kw: ['底部弹出', '卡片模态', '临时任务', 'sheet'],
        css: '.screen { background: #000; }\n.page { transform-origin: top; transition: transform .5s cubic-bezier(.32, .72, 0, 1); }\n.open .page { transform: translateY(32px) scale(.9); border-radius: 12px; }\n.sheet { position: absolute; inset: 9% 0 0; border-radius: 12px 12px 0 0;\n  transform: translateY(100%); transition: transform .5s cubic-bezier(.32, .72, 0, 1); }\n.open .sheet { transform: none; }',
        html: ptPhone('pt-sheet', ptChapterPage('', '开始练习') + `<div class="pt-pg pt-b"><i class="pt-grab"></i><div class="pt-sh-h"><span class="pt-shx">取消</span><b>选择习题</b><span class="pt-shx">完成</span></div>
          <div class="pt-opts">${[['3.1 数项级数', 1], ['3.2 正项级数', 1], ['3.3 交错级数', 0], ['3.4 幂级数', 1], ['3.5 函数项级数', 0]].map(([t, on]) => `<div class="pt-opt${on ? ' is-on' : ''}"><span>${t}</span><i></i></div>`).join('')}</div>
          <p class="pt-sh-note">已选 3 节 · 共 24 道题</p></div><div class="pt-shut"></div>`, '第 3 章'),
        init: ptAB({ labels: ['第 3 章', '选择习题'], toB: '.pt-btn', toA: '.pt-shx, .pt-shut', tapB: '.pt-btn', tapA: '.pt-shx:last-of-type' })
      },
      {
        code: 'P04', name: '缩放进入', en: 'Zoom (open app)', meta: '从图标位置放大', ratio: '4 / 5', bg: '#eef0f4',
        desc: '新页面从被点的那个图标的位置放大成全屏，关闭时又缩回原处——就是在 iPhone 主屏上打开 App 的样子。它告诉用户新页面「从哪里来」，空间关系清楚。适合从网格里打开某一项（App、相册里的照片、卡片）。点蓝色的「分析」图标打开，点 App 任意处回到主屏。',
        kw: ['缩放', '打开 App', '从原位放大', 'zoom'],
        css: '/* 先把整页缩到图标的位置和大小，再过渡到原样 */\n.app {\n  transform: translate(var(--dx), var(--dy)) scale(var(--s));\n  clip-path: inset(var(--top) 0 round 22%);\n  transition: transform .55s cubic-bezier(.32, .72, 0, 1),\n              clip-path .55s cubic-bezier(.32, .72, 0, 1);\n}\n.open .app { transform: none; clip-path: inset(0 round 0); }\n.open .home { transform: scale(1.15); opacity: .5; }',
        html: ptPhone('pt-zoom', ptHome() + ptApp(), '主屏幕'),
        init: ptAB({ labels: ['主屏幕', '数学分析 App'], toB: '.pt-ic.pt-go', toA: '.pt-app', tapB: '.pt-ic.pt-go', tapA: '.pt-homebar' })
      },
      {
        code: 'P05', name: '共享元素', en: 'Shared element', meta: '卡片展开成详情', ratio: '4 / 5', bg: '#eef0f4',
        desc: '列表里的卡片直接展开成详情页：图片和标题一直都在，只是变大、移位，页面的其余部分在它周围长出来。App Store「Today」的卡片是代表；Android 叫共享元素过渡，网页可以用 View Transitions API（view-transition-name）实现。视觉最连续、最不容易迷路，但实现最复杂。点卡片展开，点右上角 ✕ 收起。',
        kw: ['共享元素', '卡片展开', '连续性', 'shared element'],
        css: '/* 详情页收起时 = 缩小并裁切到卡片的位置 */\n.detail {\n  transform-origin: 0 0;\n  transform: translate(6%, 22%) scale(.88);\n  clip-path: inset(0 0 55% 0 round 16px);\n  transition: transform .6s cubic-bezier(.32, .72, 0, 1),\n              clip-path .6s cubic-bezier(.32, .72, 0, 1);\n}\n.open .detail { transform: none; clip-path: inset(0 round 0); }\n/* View Transitions：两处元素用同一个 view-transition-name */',
        html: ptPhone('pt-today', `<div class="pt-pg pt-a"><div class="pt-td-date">10月20日 星期二</div><div class="pt-td-t">今日推荐</div><div class="pt-slot"></div><div class="pt-card2"><small>练习 · 第 4 章</small><b>积分的十种算法</b></div></div>
          <div class="pt-xp"><div class="pt-xp-hero"><small>精选 · 第 3 章</small><b>幂级数的魔法</b><span>从 1 ⁄ (1 − x) 说起</span></div><i class="pt-xp-x"></i>
          <div class="pt-xp-body"><p>把函数写成无穷多项的和，是分析学最有力的工具之一。</p>${ptLines(9)}</div></div>`, '今日推荐'),
        init: ptAB({ labels: ['今日推荐', '幂级数的魔法'], toB: '.pt-xp', toA: '.pt-xp-x', tapB: '.pt-slot', tapA: '.pt-xp-x' })
      },
      {
        code: 'P06', name: '侧滑抽屉', en: 'Navigation drawer', meta: 'Material · ☰ 菜单', ratio: '4 / 5', bg: '#eef0f4',
        desc: '导航菜单从左边缘滑出、盖在页面上，其余部分被半透明遮罩压暗，点遮罩关闭。这是 Material Design 的「导航抽屉」，也是网站手机版 ☰ 菜单的常见做法。细节：打开时减速（快出慢停），关闭时加速且更短。菜单项多、又不常用时才用它；常用功能应放在底部标签栏。点左上角 ☰ 试试。',
        kw: ['抽屉', '汉堡菜单', '遮罩', 'drawer'],
        css: '.drawer { position: fixed; inset: 0 auto 0 0; width: 78%;\n  border-radius: 0 16px 16px 0;\n  transform: translateX(-110%);\n  transition: transform .25s cubic-bezier(.3, 0, .8, .15); /* 关：加速 */\n}\n.open .drawer { transform: none;\n  transition: transform .45s cubic-bezier(.05, .7, .1, 1); /* 开：减速 */ }\n.scrim { background: rgb(10 12 20 / .45); opacity: 0; transition: opacity .3s; }\n.open .scrim { opacity: 1; }',
        html: ptPhone('pt-drawer', `<div class="pt-pg pt-a"><div class="pt-nav"><span class="pt-burger"><i></i><i></i><i></i></span><b>第 3 章 级数</b><span></span></div><div class="pt-hero">∑ aₙ</div><div class="pt-body"><h6>3.1 数项级数</h6><small>阅读约 12 分钟</small>${ptLines(8)}</div></div>
          <div class="pt-scrim"></div><nav class="pt-dr"><div class="pt-dr-me"><i>林</i><div><b>林同学</b><small>数学分析 · 第二学期</small></div></div>
          ${['目录', '我的收藏', '笔记', '习题', '设置'].map((t, i) => `<div class="pt-mi${i === 0 ? ' is-on' : ''}"><i></i>${t}</div>`).join('')}</nav>`, '正文'),
        init: ptAB({
          labels: ['正文', '菜单'], toB: '.pt-burger', toA: '.pt-scrim, .pt-mi', tapB: '.pt-burger', tapA: '.pt-scrim'
        })
      },
      {
        code: 'P07', name: '模态对话框', en: 'Modal dialog', meta: '背景模糊 + 对话框弹出', ratio: '4 / 5', bg: '#eef0f4',
        desc: '页面上方弹出一个对话框，背景变暗并模糊，必须先处理它（确认或取消）才能回去。对话框从约 0.9 倍放大、淡入，带一点点回弹。用于需要打断用户的确认：提交、删除、离开未保存的页面。不要滥用——每个弹窗都是一次打断。点「提交答案」，再点对话框里的按钮。',
        kw: ['模态框', '对话框', '背景模糊', 'modal'],
        css: '.backdrop { background: rgb(20 24 35 / .28); backdrop-filter: blur(6px);\n  opacity: 0; transition: opacity .28s; }\n.dialog { opacity: 0; transform: scale(.88);\n  transition: opacity .2s, transform .2s ease-in; }\n.open .backdrop { opacity: 1; }\n.open .dialog { opacity: 1; transform: none;\n  transition: opacity .25s, transform .42s cubic-bezier(.2, .9, .3, 1.18); }\n/* 原生：<dialog> + showModal()，背景用 ::backdrop */',
        html: ptPhone('pt-modal', `<div class="pt-pg pt-a"><div class="pt-nav"><span class="pt-back">第 3 章</span><b>习题 3.4</b><span></span></div>
          <div class="pt-q"><small>判断题 · 第 4 / 8 题</small><p>级数 <em>∑ 1 ⁄ n²</em> 收敛吗？</p></div>
          <div class="pt-radio is-on"><i></i>收敛</div><div class="pt-radio"><i></i>发散</div><div class="pt-radio"><i></i>无法判断</div>
          <div class="pt-bot"><span class="pt-btn">提交答案</span></div></div>
          <div class="pt-bd"></div><div class="pt-dlg pt-b"><i>?</i><b>确认提交？</b><p>提交后不能再修改这道题的答案。</p><div><span class="pt-dx">取消</span><span class="pt-dx">提交</span></div></div>`, '答题'),
        init: ptAB({ labels: ['答题', '确认对话框'], toB: '.pt-btn', toA: '.pt-dx, .pt-bd', tapB: '.pt-btn', tapA: '.pt-dx:last-child' })
      },
      {
        code: 'P08', name: '标签页切换', en: 'Tabs', meta: '指示条滑动 + 内容横移', ratio: '4 / 5', bg: '#eef0f4',
        desc: '顶部几个标签，选中的下面有一条指示条；切换时指示条滑到新标签，内容区跟着左右平移——右边的标签，内容从右边进来。表达「同一层级的并列内容」。Material 的 Tabs、iOS 的分段控件都是这个思路。可以直接点标签。',
        kw: ['标签页', '指示条', '横移', 'tabs'],
        css: '.indicator { width: calc(100% / 3);\n  transform: translateX(calc(var(--i) * 100%));\n  transition: transform .42s cubic-bezier(.4, 0, .2, 1); }\n.strip { display: flex; width: 300%;\n  transform: translateX(calc(var(--i) * -100% / 3));\n  transition: transform .46s cubic-bezier(.4, 0, .2, 1); }\n/* JS：点第 i 个标签时 root.style.setProperty("--i", i) */',
        html: ptPhone('pt-tabsc', `<div class="pt-pg pt-a"><div class="pt-lt" style="font-size:1.7em">第 3 章 级数</div>
          <div class="pt-tabs">${['概念', '例题', '习题'].map((t, i) => `<button type="button" class="pt-tab${i === 0 ? ' is-on' : ''}">${t}</button>`).join('')}<i class="pt-ind"></i></div>
          <div class="pt-panes"><div class="pt-strip">
            <section class="pt-pane"><div class="pt-def"><b>定义 3.1</b>形如 <em>∑ aₙ(x − x₀)ⁿ</em> 的级数称为幂级数。</div>${ptLines(6)}</section>
            <section class="pt-pane"><div class="pt-ex"><b>例 3.4</b>求 <em>∑ xⁿ ⁄ n</em> 的收敛半径。</div>${ptLines(3)}<div class="pt-ex" style="background:#f1f3f5"><b style="color:#495057">解</b>由比值法，<em>R = 1</em>。</div>${ptLines(2)}</section>
            <section class="pt-pane">${[['3.1 判断敛散性', 1], ['3.2 求收敛域', 1], ['3.3 逐项求导', 0], ['3.4 展开成幂级数', 0], ['3.5 求和函数', 0], ['3.6 证明题', 0]].map(([t, d]) => `<div class="pt-chk${d ? ' is-done' : ''}"><i></i><span>${t}</span></div>`).join('')}</section>
          </div></div></div>`, '概念'),
        init(stage, ctx) {
          const sc = stage.querySelector('.pt-sc');
          const tabs = [...sc.querySelectorAll('.pt-tab')];
          const run = ptRun(stage, ctx, {
            labels: ['概念', '例题', '习题'], order: [1, 2, 1, 0],
            apply: (i) => { sc.style.setProperty('--i', i); tabs.forEach((t, k) => t.classList.toggle('is-on', k === i)); },
            tap: (nx) => tabs[nx]
          });
          tabs.forEach((t, i) => ctx.on(t, 'click', () => run.go(i)));
        }
      },
      {
        code: 'P09', name: '手风琴', en: 'Accordion', meta: '展开 / 收起', ratio: '4 / 5', bg: '#eef0f4',
        desc: '点标题展开下面的内容、再点收起，箭头随之翻转；通常一次只开一项，打开新的时旧的自动收起。适合常见问题（FAQ）、「定理 + 证明」、目录分组：先给概览，需要时再看细节。展开会推动下面的内容，所以动画要短（300–400ms）。可以点每一项的标题。',
        kw: ['手风琴', '折叠面板', '展开收起', 'accordion'],
        css: '/* 高度从 0 到自适应：用 grid 的 0fr → 1fr */\n.panel { display: grid; grid-template-rows: 0fr;\n  transition: grid-template-rows .4s cubic-bezier(.4, 0, .2, 1); }\n.panel > div { overflow: hidden; }\n.open .panel { grid-template-rows: 1fr; }\n.open .chevron { transform: rotate(180deg); }\n/* 原生：<details><summary>…</summary>…</details> */',
        html: ptPhone('pt-accsc', `<div class="pt-pg pt-a"><div class="pt-lt" style="font-size:1.7em">3.2 收敛半径</div><div class="pt-search">本节 3 个要点</div><div class="pt-acc">
          ${[['定义', '幂级数', '#2f6bff', '形如 <em>∑ aₙxⁿ</em> 的级数。它在一个以 0 为中心的区间内收敛。'], ['定理', '收敛半径公式', '#c2620a', '<em>R = 1 ⁄ lim sup |aₙ|<sup>1/n</sup></em>，在 |x| &lt; R 内绝对收敛。'], ['例', '几何级数', '#1a8a45', '<em>∑ xⁿ = 1 ⁄ (1 − x)</em>，收敛半径 R = 1。']].map(([k, t, c, p]) => `<div class="pt-acc-i"><button type="button" class="pt-acc-h" style="--c:${c}"><b>${k}</b><span>${t}</span><i class="pt-chev"></i></button><div class="pt-acc-b"><div><div class="pt-acc-c"><p>${p}</p>${ptLines(3)}</div></div></div></div>`).join('')}
          </div></div>`, '全部收起'),
        init(stage, ctx) {
          const sc = stage.querySelector('.pt-sc');
          const items = [...sc.querySelectorAll('.pt-acc-i')];
          const run = ptRun(stage, ctx, {
            labels: ['全部收起', '展开 · 定义', '展开 · 定理', '展开 · 例'], order: [1, 2, 3, 0], vertical: true,
            fwd: (i) => i !== 0,
            apply: (i) => items.forEach((it, k) => it.classList.toggle('is-open', k === i - 1)),
            tap: (nx, cur) => (nx === 0 ? items[cur - 1] : items[nx - 1]).querySelector('.pt-acc-h')
          });
          items.forEach((it, k) => ctx.on(it.querySelector('.pt-acc-h'), 'click', () => run.go(run.cur === k + 1 ? 0 : k + 1)));
        }
      }
    ]
  },

  {
    type: 'gallery', token: 'transitions-2', title: '戏剧化切换', min: 340,
    intro: '更有表现力、也更慢的切换。它们抢眼、有记忆点，适合故事、演示、首页这类「被看」的场合；在需要频繁来回的地方用，会让人不耐烦。',
    tiles: [
      {
        code: 'P10', name: '3D 翻转', en: 'Flip', meta: '绕竖轴转 180°', ratio: '4 / 5', bg: '#eef0f4',
        desc: '整页绕竖轴转 180°，背面就是新页面，像翻一张卡片。适合有「正反面」关系的内容：题目 / 答案、单词卡、卡片背面的设置（早期 iOS 天气 App 的「i」按钮）。有趣但费时，不适合频繁的导航。点按钮翻面。',
        kw: ['翻转', '正反面', '卡片', 'flip'],
        css: '.scene { perspective: 1000px; }\n.card { transform-style: preserve-3d;\n  transition: transform .8s cubic-bezier(.45, .05, .2, 1); }\n.face { position: absolute; inset: 0; backface-visibility: hidden; }\n.face.back { transform: rotateY(180deg); }\n.flipped .card { transform: rotateY(180deg); }',
        html: ptPhone('pt-flip', `<div class="pt-3d"><div class="pt-card3">
          <div class="pt-pg pt-a"><div class="pt-fhead"><span>闪卡 · 第 2 章</span><span>7 / 20</span></div><div class="pt-fc"><small>题 目</small><b>lim<sub>x→0</sub> sin x ⁄ x = ?</b><p>想一想：用夹逼定理，或者单位圆上的面积比较。</p></div><div class="pt-bot"><span class="pt-btn">翻面看答案</span></div></div>
          <div class="pt-pg pt-b"><div class="pt-fhead"><span>闪卡 · 第 2 章</span><span>7 / 20</span></div><div class="pt-fc"><small>答 案</small><b class="pt-big">1</b><p>由 cos x &lt; sin x ⁄ x &lt; 1，两边取极限得 1。</p></div><div class="pt-bot"><span class="pt-btn" style="background:#1c1f25">再看题目</span></div></div>
        </div></div>`, '题目'),
        init: ptAB({ labels: ['题目', '答案'], toB: '.pt-a .pt-btn', toA: '.pt-b .pt-btn', tapB: '.pt-a .pt-btn', tapA: '.pt-b .pt-btn' })
      },
      {
        code: 'P11', name: '立方体旋转', en: 'Cube', meta: 'Instagram / 微信「快拍」', ratio: '4 / 5', bg: '#eef0f4',
        desc: '两页是一个立方体相邻的两个面，切换时整个立方体转 90°，转走的一面渐渐变暗。Instagram、微信视频号等「快拍 / 故事」在不同人之间切换用的就是它。立体感强、戏剧化，适合全屏、一页一页看的故事内容；普通导航用它会晕。点屏幕切换。',
        kw: ['立方体', '3D', '故事', 'cube'],
        css: '.scene { perspective: 1200px; }\n.cube { transform-style: preserve-3d;\n  transform: translateZ(-50vw);\n  transition: transform .85s cubic-bezier(.55, 0, .25, 1); }\n.face.a { transform: translateZ(50vw); }\n.face.b { transform: rotateY(90deg) translateZ(50vw); }\n.next .cube { transform: translateZ(-50vw) rotateY(-90deg); }\n.face { backface-visibility: hidden; }',
        html: ptPhone('pt-cube-sc pt-sbw', `<div class="pt-cubew"><div class="pt-cube">
          <div class="pt-pg pt-a pt-st" style="background:linear-gradient(165deg, #7048e8, #c2255c)"><div class="pt-st-bar"><i class="is-on"></i><i></i></div><div class="pt-st-who"><i></i><div><b>第 2 章 · 极限</b><br><small>2 小时前</small></div></div><div class="pt-st-big">极限<br>是一种语言<small>ε 和 δ 把「无限接近」说清楚</small></div><div class="pt-st-in">回复…</div></div>
          <div class="pt-pg pt-b pt-st" style="background:linear-gradient(165deg, #f76707, #e8590c 40%, #c92a2a)"><div class="pt-st-bar"><i class="is-on"></i><i class="is-on"></i></div><div class="pt-st-who"><i></i><div><b>第 3 章 · 级数</b><br><small>刚刚</small></div></div><div class="pt-st-big">级数<br>是无穷多项的和<small>它什么时候收敛？</small></div><div class="pt-st-in">回复…</div></div>
        </div></div>`, '第 2 章'),
        init: ptAB({ labels: ['第 2 章', '第 3 章'], toB: '.pt-a', toA: '.pt-b', tapB: '.pt-a .pt-st-big', tapA: '.pt-b .pt-st-big' })
      },
      {
        code: 'P12', name: '擦除', en: 'Wipe', meta: '斜向遮罩扫过', ratio: '4 / 5', bg: '#eef0f4',
        desc: '一条斜线边缘从左扫到右，扫过的地方变成新页面，像电影转场或翻开一张新幻灯片；边缘带一条色带来强调。常见于作品集、品牌官网、演示文稿的章节切换，节奏感强；日常 App 里很少用。点「第 3 章」或「‹ 目录」。',
        kw: ['擦除', '遮罩', '转场', 'wipe'],
        css: '/* 新页用多边形裁切，斜边从左扫到右 */\n.page.b {\n  clip-path: polygon(-30% 0, 0 0, -30% 100%, -30% 100%);\n  transition: clip-path .8s cubic-bezier(.7, 0, .25, 1);\n}\n.show-b .page.b {\n  clip-path: polygon(-30% 0, 130% 0, 100% 100%, -30% 100%);\n}',
        html: ptPhone('pt-wipe', ptToc() + ptDetail('', '<div class="pt-dk-hero"><b>∑ 级数</b></div>') + '<i class="pt-wedge"></i>', '目录', PT_SBX),
        init: ptAB({ labels: ['目录', '第 3 章'], toB: '.pt-row', toA: '.pt-back', tapB: '.pt-go', tapA: '.pt-back' })
      },
      {
        code: 'P13', name: '圆形展开', en: 'Circle reveal', meta: 'clip-path: circle() · 从点击处扩散', ratio: '4 / 5', bg: '#eef0f4',
        desc: '新页面以点击位置为圆心，一个圆迅速扩大直到铺满屏幕；返回时圆缩向返回按钮。这是 Material Design 2014 年提出的「揭示（reveal）」效果，强调「这个变化是你这一下点出来的」。点任意一章，圆就从你点的位置展开。',
        kw: ['圆形揭示', '从点击处展开', 'Material', 'reveal'],
        css: '.page.b {\n  clip-path: circle(0% at var(--x) var(--y));\n  transition: clip-path .6s cubic-bezier(.4, 0, .2, 1);\n}\n.show-b .page.b { clip-path: circle(150% at var(--x) var(--y)); }\n/* JS：点击时 root.style.setProperty("--x", e.offsetX + "px") */',
        html: ptPhone('pt-circ', ptToc() + ptDetail('', '<div class="pt-bluehero">∑ aₙ</div>'), '目录', PT_SBX),
        init: ptAB({
          labels: ['目录', '第 3 章'], toB: '.pt-row', toA: '.pt-back', tapB: '.pt-go .pt-chev', tapA: '.pt-back',
          before(sc, i, info) {
            const s = sc.getBoundingClientRect();
            let x, y;
            if (info.ev) { x = info.ev.clientX; y = info.ev.clientY; }
            else if (info.el) { const r = info.el.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
            else return;
            sc.style.setProperty('--x', `${(((x - s.left) / s.width) * 100).toFixed(1)}%`);
            sc.style.setProperty('--y', `${(((y - s.top) / s.height) * 100).toFixed(1)}%`);
          }
        })
      },
      {
        code: 'P14', name: '模糊过渡', en: 'Blur', meta: '失焦 → 对焦', ratio: '4 / 5', bg: '#eef0f4',
        desc: '旧页面一边变模糊一边淡出，新页面从模糊变清晰，像相机重新对焦。气质柔和、梦幻，常用于照片、音乐、首屏大图的切换，或打开菜单时把背景模糊掉。模糊很耗性能，大面积使用要在低端手机上测试。点底部按钮切换。',
        kw: ['模糊', '对焦', '柔和', 'blur'],
        css: '.page { transition: opacity .6s, filter .6s, transform .6s; }\n.page.b { opacity: 0; filter: blur(12px); transform: scale(1.08); }\n.show-b .page.a { opacity: 0; filter: blur(12px); transform: scale(.94); }\n.show-b .page.b { opacity: 1; filter: blur(0); transform: none; }',
        html: ptPhone('pt-blur pt-sbw', `<div class="pt-pg pt-a pt-cov"><div class="pt-cov-art" style="background:radial-gradient(circle at 30% 30%, #ffe066 0 14%, rgba(255,224,102,0) 15%), radial-gradient(120% 70% at 50% 100%, #e8590c, rgba(232,89,12,0) 60%), linear-gradient(180deg, #ff8787, #c2255c 60%, #5f3dc4)"></div><div class="pt-cov-txt"><small>第 2 章</small><b>极限</b><span>无限接近，但不必到达</span></div><span class="pt-btn">下一章 →</span></div>
          <div class="pt-pg pt-b pt-cov"><div class="pt-cov-art" style="background:radial-gradient(circle at 70% 28%, #e7f5ff 0 10%, rgba(231,245,255,0) 11%), radial-gradient(110% 60% at 50% 100%, #12b886, rgba(18,184,134,0) 60%), linear-gradient(180deg, #4dabf7, #1c7ed6 55%, #364fc7)"></div><div class="pt-cov-txt"><small>第 3 章</small><b>级数</b><span>把无穷多个数加起来</span></div><span class="pt-btn">← 上一章</span></div>`, '第 2 章'),
        init: ptAB({ labels: ['第 2 章', '第 3 章'], toB: '.pt-a .pt-btn', toA: '.pt-b .pt-btn', tapB: '.pt-a .pt-btn', tapA: '.pt-b .pt-btn' })
      },
      {
        code: 'P15', name: '翻书', en: 'Page turn', meta: '以左边为书脊掀起', ratio: '4 / 5', bg: '#eef0f4',
        desc: '页面以左边为书脊，像纸一样掀起、翻过去，下面露出新的一页，被盖住的地方带着阴影。电子书（Apple Books 的翻页效果）、电子杂志、绘本常用，有书卷气。但它慢（约 0.9 秒），频繁操作会让人烦；教材正文的翻页不建议用。点书页右半边翻到下一页，左半边翻回来。',
        kw: ['翻书', '书页', '3D', 'page turn'],
        css: '.book { perspective: 1400px; }\n.leaf { transform-origin: left center;\n  transform-style: preserve-3d;\n  transition: transform .9s cubic-bezier(.4, .1, .3, 1); }\n.turned .leaf { transform: rotateY(-100deg); }\n/* 下一页上加一层阴影，翻开时淡出 */\n.under::after { background: linear-gradient(90deg, rgb(60 40 10 / .45), transparent);\n  transition: opacity .9s; }\n.turned .under::after { opacity: 0; }',
        html: ptPhone('pt-book', `<div class="pt-bw">
          <div class="pt-pg pt-b pt-paper"><header><span>第三章 · 级数</span><span>§3.2</span></header><h6>收敛半径</h6><p class="pt-drop">若极限存在，则幂级数在开区间 (−R, R) 内绝对收敛，在区间外发散；端点处需要单独讨论。</p><div class="pt-fig"></div><p>例如几何级数在 x = ±1 处都发散，而 ∑ xⁿ⁄n 在 x = −1 处条件收敛。</p><footer>47</footer></div>
          <div class="pt-leaf"><div class="pt-pg pt-a pt-paper"><header><span>第三章 · 级数</span><span>§3.1</span></header><h6>幂级数</h6><p class="pt-drop">设 {aₙ} 为实数列，形如下式的级数称为以 x₀ 为中心的幂级数。它把函数表示成无穷多个单项式的和。</p><div class="pt-fm">∑ aₙ (x − x₀)ⁿ</div><p>我们关心的第一个问题是：x 取哪些值时，这个级数收敛？</p><footer>46</footer></div></div>
        </div>`, '第 46 页'),
        init: ptAB({ labels: ['第 46 页', '第 47 页'], toB: '.pt-a', toA: '.pt-b', tapB: '.pt-a footer', tapA: '.pt-b header' })
      },
      {
        code: 'P16', name: '整页滚动吸附', en: 'Full-page scroll snap', meta: 'scroll-snap-type: y mandatory', ratio: '4 / 5', bg: '#eef0f4',
        desc: '每次滚动正好翻过一整屏，停下时自动对齐到某一屏的顶部，右侧圆点显示第几屏。CSS 的 scroll-snap 一行就能做到。产品发布页、演示型网站（fullPage.js）常用。内容超过一屏时会被截断，所以阅读型页面别用。可以在手机里滚动，或点右侧圆点。',
        kw: ['整屏滚动', '吸附', '分页圆点', 'scroll snap'],
        css: '.scroller {\n  height: 100vh; overflow-y: auto;\n  scroll-snap-type: y mandatory;\n}\n.section {\n  height: 100vh;\n  scroll-snap-align: start;\n  scroll-snap-stop: always; /* 一次只翻一屏 */\n}',
        html: ptPhone('pt-snap pt-sbw', `<div class="pt-scr no-pagekeys" tabindex="-1">${[['01', '数列极限', '一个数列越来越接近某个数。', '#364fc7', '#5c7cfa', 'ε'], ['02', '函数极限', '自变量趋于某点时，函数值的去向。', '#a61e4d', '#f06595', 'δ'], ['03', '连续性', '极限值恰好等于函数值。', '#087f5b', '#38d9a9', '∞']].map(([n, t, s, a, b, g], i) => `<section class="pt-sec" data-g="${g}" style="--g:linear-gradient(160deg, ${b}, ${a})"><small>第 ${n} 屏</small><b>${t}</b><span>${s}</span>${i === 0 ? '<em>↓ 向下滚动</em>' : ''}</section>`).join('')}</div><div class="pt-dots"><i class="is-on"></i><i></i><i></i></div>`, '第 1 屏'),
        init(stage, ctx) {
          const sc = stage.querySelector('.pt-sc'), scr = sc.querySelector('.pt-scr');
          const dots = [...sc.querySelectorAll('.pt-dots i')];
          const show = (i) => dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
          const run = ptRun(stage, ctx, {
            labels: ['第 1 屏', '第 2 屏', '第 3 屏'], order: [1, 2, 1, 0], vertical: true, every: 2600,
            apply: (i) => { show(i); scr.scrollTo({ top: i * scr.clientHeight, behavior: 'smooth' }); }
          });
          let t = 0;
          ctx.on(scr, 'scroll', () => {
            clearTimeout(t);
            const i = Math.round(scr.scrollTop / scr.clientHeight);
            show(i);
            t = setTimeout(() => run.sync(i), 120);
          }, { passive: true });
          ctx.add(() => clearTimeout(t));
          dots.forEach((d, i) => ctx.on(d, 'click', () => run.go(i)));
        }
      },
      {
        code: 'P17', name: '轮播', en: 'Carousel', meta: '横向滑动 + 分页点', ratio: '4 / 5', bg: '#eef0f4',
        desc: '一排卡片横向排列，一次显示一张、两边露出相邻卡片的边，下面的分页点显示位置；自动或手动滑动切换。首页 Banner、App 引导页、推荐课程常用。研究发现自动轮播的后几张很少有人看到——重要内容别放在第 3 张。可以拖动卡片或点圆点。',
        kw: ['轮播', '分页点', '横滑', 'carousel'],
        css: '.track {\n  display: flex; gap: 12px; overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  padding-inline: 10%;\n}\n.slide { flex: 0 0 80%; scroll-snap-align: center; }\n/* 切到第 i 张 */\nslide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });',
        html: ptPhone('pt-carsc', `<div class="pt-pg pt-a"><div class="pt-lt">发现</div><div class="pt-car-sub">推荐课程<span>全部</span></div>
          <div class="pt-car no-pagekeys">${[['ε', '第 2 章', '极限与连续', '#5c7cfa', '#364fc7'], ['∫', '第 4 章', '黎曼积分', '#ff922b', '#d9480f'], ['∑', '第 3 章', '级数与幂级数', '#20c997', '#087f5b'], ['∂', '第 5 章', '多元微分', '#f06595', '#a61e4d']].map(([g, s, t, a, b]) => `<div class="pt-slide" data-g="${g}" style="--g:linear-gradient(160deg, ${a}, ${b})"><small>${s}</small><b>${t}</b></div>`).join('')}</div>
          <div class="pt-cdots">${'<i></i>'.repeat(4)}</div><div class="pt-body">${ptLines(4)}</div></div>`, '第 1 张'),
        init(stage, ctx) {
          const sc = stage.querySelector('.pt-sc'), car = sc.querySelector('.pt-car');
          const slides = [...car.children], dots = [...sc.querySelectorAll('.pt-cdots i')];
          const show = (i) => dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
          const to = (i, smooth = true) => car.scrollTo({ left: slides[i].offsetLeft - (car.clientWidth - slides[i].offsetWidth) / 2, behavior: smooth ? 'smooth' : 'auto' });
          show(0);
          const run = ptRun(stage, ctx, {
            labels: ['第 1 张', '第 2 张', '第 3 张', '第 4 张'], order: [1, 2, 3, 0], every: 2600,
            apply: (i) => { show(i); to(i); }
          });
          const idx = () => {
            const mid = car.scrollLeft + car.clientWidth / 2;
            let best = 0;
            slides.forEach((s, k) => { if (Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid) < Math.abs(slides[best].offsetLeft + slides[best].offsetWidth / 2 - mid)) best = k; });
            return best;
          };
          let t = 0, drag = null, mute = 0;
          ctx.on(car, 'scroll', () => { if (drag) return; clearTimeout(t); show(idx()); t = setTimeout(() => run.sync(idx()), 140); }, { passive: true });
          ctx.add(() => clearTimeout(t));
          dots.forEach((d, i) => ctx.on(d, 'click', () => run.go(i)));
          // 鼠标拖动（触屏用原生滑动 + 吸附）
          ctx.on(car, 'pointerdown', (e) => {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            drag = { x: e.clientX, s: car.scrollLeft, i: run.cur };
            car.classList.add('is-drag');
            car.setPointerCapture(e.pointerId);
            e.preventDefault();
          });
          ctx.on(car, 'pointermove', (e) => { if (drag) car.scrollLeft = drag.s - (e.clientX - drag.x); });
          const end = (e) => {
            if (!drag) return;
            const dx = e.clientX - drag.x, from = drag.i;
            drag = null;
            if (Math.abs(dx) > 5) mute = performance.now() + 350;
            const i = Math.max(0, Math.min(slides.length - 1, from + (dx < -24 ? 1 : dx > 24 ? -1 : 0)));
            if (!run.go(i)) to(i);
            ctx.later(450, () => car.classList.remove('is-drag'));
          };
          ctx.on(car, 'pointerup', end);
          ctx.on(car, 'pointercancel', end);
          ctx.on(car, 'click', (e) => { if (performance.now() < mute) return; const s = e.target.closest('.pt-slide'); if (s && Math.abs(slides.indexOf(s) - run.cur) === 1) run.go(slides.indexOf(s)); });
        }
      },
      {
        code: 'P18', name: '形变过渡', en: 'Morph / container transform', meta: 'View Transitions 风格', ratio: '4 / 5', bg: '#eef0f4',
        desc: '一个元素的形状、大小、位置、颜色平滑地变成另一个：右下角圆形的「＋」按钮直接长成整页的「新笔记」编辑器，关闭时又缩回按钮。Material 称为容器变换（container transform）；网页上用 View Transitions API 给两处元素起同一个 view-transition-name，浏览器会自动补出这段形变。点「＋」打开，点「取消」或「保存」收回。',
        kw: ['形变', '容器变换', 'View Transitions', 'morph'],
        css: '.fab-layer {\n  background: #2f6bff;\n  clip-path: inset(calc(100% - 96px) 28px 28px calc(100% - 96px) round 34px);\n  transition: clip-path .55s cubic-bezier(.4, 0, .2, 1),\n              background-color .55s cubic-bezier(.4, 0, .2, 1);\n}\n.open .fab-layer { clip-path: inset(0 round 0); background: #fff; }\n/* View Transitions 写法 */\n.fab, .editor { view-transition-name: note; }\ndocument.startViewTransition(() => openEditor());',
        html: ptPhone('pt-morph', `<div class="pt-pg pt-a"><div class="pt-lt">笔记</div><div class="pt-search">搜索笔记</div>
          ${[['幂级数的收敛半径', '10月18日 · 第 3 章'], ['一致收敛 vs 逐点收敛', '10月15日 · 第 3 章'], ['ε-δ 证明的套路', '10月9日 · 第 2 章'], ['积分中值定理', '10月2日 · 第 4 章']].map(([t, d]) => `<div class="pt-note"><b>${t}</b><i class="pt-l"></i><small>${d}</small></div>`).join('')}
          </div><i class="pt-fab-sh"></i><div class="pt-fab"><i class="pt-fab-plus"></i><div class="pt-fab-ui"><div class="pt-ed-nav"><span class="pt-edx">取消</span><b>新笔记</b><span class="pt-edx">保存</span></div><div class="pt-ed-t">标题</div><div class="pt-ed"><i class="pt-caret"></i>${ptLines(5)}</div><div class="pt-ed-tb"><i></i><i></i><i></i><i></i></div></div></div>`, '笔记'),
        init: ptAB({ labels: ['笔记', '新笔记'], toB: '.pt-fab', toA: '.pt-edx', tapB: '.pt-fab-sh', tapA: '.pt-edx:last-child' })
      }
    ]
  }
]);
