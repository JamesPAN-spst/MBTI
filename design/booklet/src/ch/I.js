  // ============ I 文本框 ============
  const IP = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
    x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18M10.6 5.6A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.7M6.6 6.6C3.9 8.3 2.5 12 2.5 12S6 18.5 12 18.5c1.8 0 3.3-.5 4.6-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.3v.2"/>',
    okc: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    chevD: '<path d="M6 9.5l6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    doc: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4"/>',
    smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 16l5-5 4 4 2.5-2.5 5.5 5.5"/><circle cx="15.5" cy="9.5" r="1.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    hash: '<path d="M5 9h14M5 15h14M10 4l-2 16M16 4l-2 16"/>'
  };
  const iic = (n, cls = '') => `<svg class="in-i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${IP[n]}</svg>`;
  const iMotion = (stage, ctx) => stage.firstElementChild.classList.toggle('in-anim', ctx.motion());
  const iKick = (el, cls, ctx) => { el.classList.remove(cls); void el.offsetWidth; if (ctx.motion()) el.classList.add(cls); };
  const iCompose = (e) => e.isComposing || e.keyCode === 229;
  const iEsc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  registerPages('I', [
    {
      type: 'gallery', token: 'inputs', title: '文本框', min: 340,
      intro: '输入框的外形、标签的位置、出错时的样子。全部可以打字；用 Tab 键在框之间切换，看每种风格的聚焦状态。',
      tiles: [
        {
          code: 'I01', name: '描边输入框', en: 'Outlined', meta: '最通用 · 登录 / 注册',
          desc: '标签在框上方，白底、1px 浅灰边框、8px 圆角，下面一行灰色的帮助文字；聚焦时边框变成主色，外面再加一圈 4px 的淡色光环。最通用、最不会出错的输入框，登录、注册、设置页都能用。标签始终可见，长表单也好填。密码框右侧的眼睛可以切换明文。',
          kw: ['描边输入框', 'Outlined', '标签在上', '聚焦光环', '登录表单'],
          bg: '#ffffff', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-col">
            <label class="in-fld"><span class="in-lab">邮箱</span><input class="in-ol" type="email" placeholder="name@school.edu" autocomplete="off" spellcheck="false"><span class="in-help">用于找回密码，不会公开</span></label>
            <label class="in-fld"><span class="in-lab">密码<small>至少 8 位</small></span><span class="in-pw"><input class="in-ol" type="password" value="limit2026" autocomplete="off"></span></label>
          </div></div>`,
          init(stage, ctx) {
            const pw = stage.querySelector('.in-pw'), inp = pw.querySelector('input');
            pw.insertAdjacentHTML('beforeend', `<button type="button" class="in-eye" aria-label="显示密码" aria-pressed="false">${iic('eye')}</button>`);
            const eye = pw.querySelector('.in-eye');
            ctx.on(eye, 'click', (e) => {
              e.preventDefault();
              const show = inp.type === 'password';
              inp.type = show ? 'text' : 'password';
              eye.setAttribute('aria-pressed', String(show));
              eye.setAttribute('aria-label', show ? '隐藏密码' : '显示密码');
              eye.innerHTML = iic(show ? 'eyeOff' : 'eye');
            });
          },
          css: `.input {
  height: 44px; padding: 0 14px;
  border: 1px solid #d0d5dd; border-radius: 8px;
  background: #fff; color: #101828; font-size: 16px;
  box-shadow: 0 1px 2px rgb(16 24 40 / .05);
  transition: border-color .15s, box-shadow .15s;
}
.input::placeholder { color: #98a2b3; }
.input:hover { border-color: #98a2b3; }
.input:focus {
  outline: none; border-color: #6172f3;
  box-shadow: 0 0 0 4px #e0e7ff;        /* 聚焦光环 */
}`
        },
        {
          code: 'I02', name: '填充输入框', en: 'Filled', meta: 'Material Design 3',
          desc: 'Material Design 的填充式：浅灰紫色底块、只有上方两个角是圆的、底部一条细线；标签在框内，聚焦或有内容时缩小上移，底线从中间展开、加粗成主色，下面一行是辅助文字和字数。在白页面上「这里可以填」的提示很强；缺点是灰底让页面显得重，并排很多时像一排色块。',
          kw: ['Filled', 'Material', '底线', '标签上浮'],
          bg: '#fef7ff', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-m3">
            <div class="in-m3f"><label class="in-m3f-box"><input placeholder=" " value="数学分析 II" maxlength="20" autocomplete="off"><span class="in-m3f-lab">课程名称</span><i class="in-m3f-line"></i><button type="button" class="in-m3f-clr" aria-label="清除">${iic('x')}</button></label><div class="in-m3f-sup"><span>将显示在课程卡片上</span><span class="n">7 / 20</span></div></div>
            <div class="in-m3f"><label class="in-m3f-box"><input placeholder=" " autocomplete="off"><span class="in-m3f-lab">授课教师</span><i class="in-m3f-line"></i><button type="button" class="in-m3f-clr" aria-label="清除">${iic('x')}</button></label><div class="in-m3f-sup"><span>选填</span></div></div>
          </div></div>`,
          init(stage, ctx) {
            stage.querySelectorAll('.in-m3f').forEach((f) => {
              const inp = f.querySelector('input'), n = f.querySelector('.n'), clr = f.querySelector('.in-m3f-clr');
              const upd = () => { if (n) n.textContent = `${[...inp.value].length} / 20`; };
              ctx.on(inp, 'input', upd);
              ctx.on(clr, 'click', (e) => { e.preventDefault(); inp.value = ''; upd(); inp.focus(); });
            });
          },
          css: `.field { position: relative; height: 56px;
  background: #e6e0e9; border-radius: 4px 4px 0 0;
  box-shadow: inset 0 -1px 0 #49454f; }              /* 底部细线 */
.field input { position: absolute; inset: 0; padding: 22px 16px 4px;
  border: 0; background: none; font: 16px Roboto, sans-serif; }
.field label { position: absolute; left: 16px; top: 28px;
  transform: translateY(-50%); transform-origin: left;
  transition: transform .2s cubic-bezier(.2,0,0,1), color .2s; }
/* placeholder=" " ：没内容时 :placeholder-shown 成立 */
.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  transform: translateY(-20px) scale(.75); }
.field input:focus + label { color: #6750a4; }
.field:focus-within { box-shadow: inset 0 -2px 0 #6750a4; }`,
          links: [['Material 3 · Text fields', 'https://m3.material.io/components/text-fields/overview']]
        },
        {
          code: 'I03', name: '下划线输入框', en: 'Underline', meta: '极简 · 杂志感',
          desc: '没有框，只有一条细底线和上方一行小标签；聚焦时一条深色粗线从左往右长出，标签同时变深。看起来干净、优雅，常见于杂志感或极简风网站。缺点明显：在长表单里不容易认出哪里能填，点击区域也不清楚，所以多用在只有两三个字段的场景（报名、订阅）。',
          kw: ['下划线', 'Underline', '极简', 'Minimal', '杂志感'],
          bg: '#fbf9f4', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-ulf">
            <h5>暑期数学营报名<small>SUMMER · 2027</small></h5>
            <label class="in-ul"><span class="in-ul-lab">姓名</span><input placeholder="你的名字" autocomplete="off"><i class="in-ul-bar"></i></label>
            <label class="in-ul"><span class="in-ul-lab">学校</span><input placeholder="学校全称" autocomplete="off"><i class="in-ul-bar"></i></label>
            <button type="button" class="in-ulf-go">提交报名${iic('arrow')}</button>
          </div></div>`,
          init(stage, ctx) {
            const go = stage.querySelector('.in-ulf-go'), ins = stage.querySelectorAll('.in-ul input');
            ctx.on(go, 'click', () => {
              const empty = [...ins].find((i) => !i.value.trim());
              if (empty) { empty.focus(); return; }
              go.innerHTML = `已收到，谢谢${iic('check')}`;
              ctx.later(2000, () => { go.innerHTML = `提交报名${iic('arrow')}`; });
            });
          },
          css: `.field { position: relative; }
.field input {
  border: 0; border-bottom: 1px solid #cfc8bb; border-radius: 0;
  background: transparent; height: 36px; padding: 0;
}
.field input:focus { outline: none; }
.field .bar {                      /* 聚焦时长出来的粗线 */
  position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: #1f1b16; transform: scaleX(0); transform-origin: left;
  transition: transform .35s cubic-bezier(.3,.7,.2,1);
}
.field:focus-within .bar { transform: scaleX(1); }`
        },
        {
          code: 'I04', name: '浮动标签', en: 'Floating label', meta: 'Material · Airbnb / Stripe',
          desc: '标签一开始躺在框里当提示，聚焦或填入内容后缩小并「浮」上去：上面那个浮到边框线上，把线断开一个缺口（Material 描边式）；下面那个浮在框内左上角，下方留给内容（Airbnb、Stripe 结账页式）。既省空间、又始终看得到标签。缺点是动画写不好会抖，标签太长时浮起后会被截断。',
          more: '纯 CSS 就能实现：给 input 写 placeholder=" "（一个空格），没有内容时 :placeholder-shown 成立；再用 input:focus + label、input:not(:placeholder-shown) + label 两个选择器把标签移上去。描边式的「缺口」其实是标签自带一块和背景同色的底。',
          kw: ['浮动标签', 'Floating label', ':placeholder-shown', '节省空间'],
          bg: '#ffffff', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-flw">
            <label class="in-flo"><input type="email" placeholder=" " autocomplete="off" spellcheck="false"><span>邮箱地址</span></label>
            <p class="in-flc">Material 描边式：标签浮到线上</p>
            <label class="in-fli"><input placeholder=" " value="20261024" inputmode="numeric" autocomplete="off"><span>学号</span></label>
            <p class="in-flc">框内式：标签缩到左上角</p>
          </div></div>`,
          css: `.float { position: relative; }
.float input { height: 54px; padding: 0 16px;
  border: 1px solid #79747e; border-radius: 6px; }
.float span {
  position: absolute; left: 12px; top: 27px; padding: 0 4px;
  background: #fff;                    /* 盖住边框线 = 缺口 */
  transform: translateY(-50%); transform-origin: left;
  transition: transform .2s cubic-bezier(.2,0,0,1), color .2s;
  pointer-events: none;
}
.float input:focus + span,                /* <input placeholder=" "> */
.float input:not(:placeholder-shown) + span {
  transform: translateY(-35px) scale(.75);
}
.float input:focus + span { color: #0b57d0; }`,
          links: [['MDN · :placeholder-shown', 'https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown']]
        },
        {
          code: 'I05', name: '搜索框', en: 'Search field', meta: '⌘K · 文档站 / 工具',
          desc: '胶囊形，左边放大镜，右边一个「⌘K」快捷键提示；开始输入后提示变成清除按钮 ×，下方弹出匹配的建议并高亮关键字（↑↓ 选择，回车确认，Esc 清空）。按 ⌘K（Windows 上 Ctrl+K）在任何位置都能把光标送进搜索框，这已经是 Notion、Linear 和各大文档网站的通用约定。',
          kw: ['搜索框', 'Search', '⌘K', '自动补全', '清除按钮'],
          bg: '#f4f4f5', ratio: '5 / 4',
          html: `<div class="in-sst in-w">
            <div class="in-srch" role="search">
              <div class="in-sbox">${iic('search')}<input type="search" placeholder="搜索定理、概念…" aria-label="搜索" autocomplete="off" spellcheck="false" enterkeyhint="search"><kbd class="in-kbd">⌘K</kbd><button type="button" class="in-clr" aria-label="清除">${iic('x')}</button></div>
              <ul class="in-sug" role="listbox" aria-label="搜索建议" hidden></ul>
            </div>
            <div class="in-hot"><span>热门</span><button type="button">收敛半径</button><button type="button">泰勒展开</button><button type="button">ε-δ 语言</button></div>
            <div class="in-recent"><span>最近搜索</span><button type="button">${iic('clock')}一致收敛</button><button type="button">${iic('clock')}阿贝尔定理</button></div>
            <p class="in-sres" aria-live="polite"></p>
          </div>`,
          init(stage, ctx) {
            const T = [['收敛半径', '概念'], ['收敛域', '概念'], ['一致收敛', '概念'], ['绝对收敛', '概念'], ['条件收敛', '概念'], ['柯西收敛准则', '定理'], ['幂级数', '概念'], ['泰勒展开', '方法'], ['泰勒公式', '定理'], ['麦克劳林级数', '概念'], ['达朗贝尔判别法', '方法'], ['根值判别法', '方法'], ['魏尔斯特拉斯 M 判别法', '方法'], ['阿贝尔定理', '定理'], ['ε-δ 语言', '概念'], ['拉格朗日中值定理', '定理'], ['洛必达法则', '方法'], ['黎曼积分', '概念'], ['上确界', '概念'], ['单调有界定理', '定理'], ['区间套定理', '定理'], ['一致连续', '概念']];
            const box = stage.querySelector('.in-srch'), inp = box.querySelector('input'), clr = box.querySelector('.in-clr'), sug = box.querySelector('.in-sug'), res = stage.querySelector('.in-sres'), kbd = box.querySelector('.in-kbd');
            const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
            if (!mac) kbd.textContent = 'Ctrl K';
            let hits = [], act = -1;
            const draw = () => {
              const q = inp.value.trim();
              box.classList.toggle('has', inp.value.length > 0);
              if (!q) { sug.hidden = true; hits = []; return; }
              const lq = q.toLowerCase();
              hits = T.filter(([t]) => t.toLowerCase().includes(lq)).slice(0, 5);
              act = hits.length ? 0 : -1;
              sug.innerHTML = hits.length ? hits.map(([t, k], i) => {
                const at = t.toLowerCase().indexOf(lq);
                return `<li role="option" aria-selected="${i === act}" data-i="${i}">${iic('search')}<span>${iEsc(t.slice(0, at))}<mark>${iEsc(t.slice(at, at + q.length))}</mark>${iEsc(t.slice(at + q.length))}</span><small>${k}</small></li>`;
              }).join('') : `<li class="none">没有找到「${iEsc(q)}」</li>`;
              sug.hidden = false;
              const room = stage.getBoundingClientRect().bottom - sug.getBoundingClientRect().top - 10;
              sug.style.maxHeight = `${Math.max(80, room)}px`;
            };
            const mark = () => sug.querySelectorAll('li[data-i]').forEach((li, i) => li.setAttribute('aria-selected', String(i === act)));
            const pick = (i) => { inp.value = hits[i][0]; sug.hidden = true; box.classList.add('has'); res.textContent = `→ 打开「${hits[i][0]}」（${hits[i][1]}）`; };
            ctx.on(inp, 'input', () => { res.textContent = ''; draw(); });
            ctx.on(inp, 'focus', () => { if (inp.value.trim() && !res.textContent) draw(); });
            ctx.on(inp, 'keydown', (e) => {
              if (iCompose(e)) return;
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault(); e.stopPropagation();
                if (sug.hidden || !hits.length) return;
                act = (act + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length;
                mark();
              } else if (e.key === 'Enter') {
                e.preventDefault();
                if (!sug.hidden && act >= 0) pick(act);
              } else if (e.key === 'Escape') {
                if (inp.value) { e.preventDefault(); e.stopPropagation(); inp.value = ''; res.textContent = ''; draw(); }
              }
            });
            ctx.on(sug, 'pointerdown', (e) => {
              const li = e.target.closest('li[data-i]');
              e.preventDefault();
              if (li) pick(+li.dataset.i);
            });
            ctx.on(sug, 'pointermove', (e) => { const li = e.target.closest('li[data-i]'); if (li && +li.dataset.i !== act) { act = +li.dataset.i; mark(); } });
            ctx.on(inp, 'blur', () => { sug.hidden = true; });
            ctx.on(clr, 'click', () => { inp.value = ''; res.textContent = ''; draw(); inp.focus(); });
            ctx.on(box.querySelector('.in-sbox'), 'pointerdown', (e) => { if (!e.target.closest('input, button')) { e.preventDefault(); inp.focus(); } });
            stage.querySelectorAll('.in-hot button, .in-recent button').forEach((b) => ctx.on(b, 'click', () => { inp.value = b.textContent; res.textContent = ''; inp.focus(); draw(); }));
            // ⌘K / Ctrl+K：只在这个样品看得见时接管
            ctx.on(document, 'keydown', (e) => {
              if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k' || e.defaultPrevented) return;
              const r = stage.getBoundingClientRect();
              if (!stage.isConnected || r.bottom < 0 || r.top > innerHeight || !stage.offsetParent) return;
              const lb = stage.closest('dialog');
              if (!lb && document.querySelector('dialog[open]')) return;
              e.preventDefault();
              inp.focus();
              inp.select();
            });
          },
          css: `.search {
  display: flex; align-items: center; gap: 10px;
  height: 46px; padding: 0 8px 0 16px; border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 0 1px #e4e4e7, 0 8px 20px -10px rgb(0 0 0 / .15);
}
.search:focus-within {
  box-shadow: 0 0 0 1.5px #6366f1, 0 0 0 5px rgb(99 102 241 / .16);
}
.search input { flex: 1; border: 0; background: none; outline: none; }
kbd { padding: 0 7px; border-radius: 6px; font: 11.5px ui-monospace;
  box-shadow: inset 0 0 0 1px #e4e4e7, inset 0 -1.5px 0 #e4e4e7; }
.search.has-text kbd { display: none; }        /* 有内容时换成 × */`
        },
        {
          code: 'I06', name: '内凹输入框', en: 'Inset / Neumorphic', meta: 'Soft UI',
          desc: '和背景同色，用左上暗、右下亮的内阴影把框「压」进表面里；下面的「登录」按钮则是凸起的，按下时也会凹进去。触感柔和，像软胶面板。缺点同新拟态：边界对比度低，聚焦状态必须另外加一圈彩色光环，否则几乎看不出来（试试 Tab）。',
          kw: ['内凹', 'Inset', '新拟态', 'Neumorphism', '内阴影'],
          bg: '#e4e9f0', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-neu">
            <label class="in-neu-box">${iic('mail')}<input type="email" placeholder="邮箱" aria-label="邮箱" autocomplete="off" spellcheck="false"></label>
            <label class="in-neu-box">${iic('lock')}<input type="password" placeholder="密码" aria-label="密码" autocomplete="off"></label>
            <button type="button" class="in-neu-btn">登 录</button>
          </div></div>`,
          css: `.inset {
  height: 50px; padding: 0 18px; border: 0; border-radius: 16px;
  background: #e4e9f0;                          /* 与背景同色 */
  box-shadow: inset  5px  5px 10px #c2cad6,     /* 左上暗 */
              inset -5px -5px 10px #ffffff;     /* 右下亮 */
}
.inset:focus {
  outline: none;
  box-shadow: inset 5px 5px 10px #c2cad6, inset -5px -5px 10px #fff,
              0 0 0 2px rgb(109 93 252 / .55); /* 必须补一圈彩色 */
}`
        },
        {
          code: 'I07', name: '玻璃输入框', en: 'Glass', meta: '登录页 · 玻璃拟态',
          desc: '磨砂玻璃卡片里放半透明输入框：白色细边框、白色文字、75% 透明度的白色占位符；聚焦时框体变亮、边框变实，外加一圈白色光环。适合放在照片或渐变背景上的登录页。缺点是文字对比度依赖背景，务必在背景最亮的位置检查可读性。',
          kw: ['毛玻璃', 'Glass', '登录页', '半透明', 'backdrop-filter'],
          bg: 'radial-gradient(circle at 12% 18%, #ff9a3c 0 8%, transparent 42%), radial-gradient(circle at 88% 22%, #ff3d77 0 10%, transparent 44%), radial-gradient(circle at 50% 108%, #7b2ff7 0 16%, transparent 58%), linear-gradient(160deg, #3a1670, #6b7fd8)', dark: true, ratio: '5 / 4',
          html: `<i class="in-orb o1"></i><i class="in-orb o2"></i>
          <div class="center in-w"><div class="in-glc">
            <h5>登录学习空间<small>数学分析 II</small></h5>
            <input class="in-gl" type="email" placeholder="邮箱" aria-label="邮箱" autocomplete="off" spellcheck="false">
            <input class="in-gl" type="password" placeholder="密码" aria-label="密码" autocomplete="off">
            <button type="button" class="in-gl-btn">登录</button>
          </div></div>`,
          css: `.glass-card {
  border: 1px solid rgb(255 255 255 / .38); border-radius: 20px;
  background: linear-gradient(160deg, rgb(255 255 255 / .26), rgb(255 255 255 / .08));
  backdrop-filter: blur(18px) saturate(160%);
}
.glass-input {
  border: 1px solid rgb(255 255 255 / .38); border-radius: 12px;
  background: rgb(255 255 255 / .14); color: #fff;
}
.glass-input::placeholder { color: rgb(255 255 255 / .75); }
.glass-input:focus {
  outline: none; background: rgb(255 255 255 / .26);
  border-color: rgb(255 255 255 / .95);
  box-shadow: 0 0 0 3px rgb(255 255 255 / .28);
}`
        },
        {
          code: 'I08', name: '粗野主义输入框', en: 'Brutalist', meta: '新粗野主义',
          desc: '3px 黑框、零圆角、不模糊的硬阴影；标签是黑底白字的等宽字小牌子，「提交」按钮直接焊在输入框右边。聚焦时底色变成荧光黄，整个框向左上抬起、阴影加深。个性极强，适合实验性、作品集类网站；缺点是视觉噪音大，长表单会让人疲劳。',
          kw: ['粗野主义', 'Brutalist', '硬阴影', '等宽字', '荧光黄'],
          bg: '#a7f3d0', ratio: '5 / 4',
          html: `<div class="fill in-grid"></div>
          <div class="center in-w"><div class="in-br">
            <label class="in-brf"><span class="in-br-tag">NAME / 姓名</span><span class="in-br-row"><input placeholder="Cauchy" autocomplete="off" spellcheck="false"></span></label>
            <div class="in-brf"><span class="in-br-tag">ANSWER / 答案</span><span class="in-br-row"><input placeholder="lim = ?" aria-label="答案" autocomplete="off" spellcheck="false"><button type="button" class="in-br-btn">提交 →</button></span><p class="in-br-msg" aria-live="polite"></p></div>
          </div></div>`,
          init(stage, ctx) {
            const inp = stage.querySelectorAll('.in-br-row input')[1], btn = stage.querySelector('.in-br-btn'), msg = stage.querySelector('.in-br-msg');
            const go = () => { msg.textContent = inp.value.trim() ? `> RECEIVED: "${inp.value.trim().slice(0, 18)}"` : '> 先写点什么！'; };
            ctx.on(btn, 'click', go);
            ctx.on(inp, 'keydown', (e) => { if (e.key === 'Enter' && !iCompose(e)) go(); });
            ctx.on(inp, 'input', () => { msg.textContent = ''; });
          },
          css: `.brutal {
  border: 3px solid #000; border-radius: 0;
  background: #fff; box-shadow: 5px 5px 0 #000;
  font: 700 17px ui-monospace, monospace;
  transition: box-shadow .1s, transform .1s;
}
.brutal:focus {
  outline: none; background: #ffe500;          /* 荧光黄 */
  box-shadow: 8px 8px 0 #000; transform: translate(-2px, -2px);
}
.brutal-tag { background: #000; color: #fff; font: 11.5px ui-monospace;
  padding: 5px 8px; letter-spacing: .08em; }`
        },
        {
          code: 'I09', name: '无边框大字号', en: 'Borderless title', meta: 'Notion 式 · 文档 / 笔记',
          desc: 'Notion 式的页面标题：没有框、没有底线，只有一行很大的浅灰占位字「无标题」，点进去直接打字，回车跳到正文；鼠标移上来才出现「添加图标 / 添加封面」（都能点）。正文行只在聚焦时才显示提示。让页面看起来就是纸面本身；缺点是第一次来的用户不知道这里能输入，聚焦状态也几乎只有光标。',
          kw: ['Notion', '无边框', '标题输入', '所见即所得', '就地编辑'],
          bg: '#ffffff', ratio: '5 / 4',
          html: `<div class="in-no in-w">
            <div class="in-no-cover"></div>
            <div class="in-no-top">${iic('doc')}<span>笔记</span><span>/</span><b class="in-no-crumb">无标题</b><span>${iic('clock')}刚刚编辑</span></div>
            <div class="in-no-pg">
              <div class="in-no-ic" aria-hidden="true">∑</div>
              <div class="in-no-tools">
                <button type="button" class="in-no-tb" data-k="ic">${iic('smile')}<span>添加图标</span></button>
                <button type="button" class="in-no-tb" data-k="cv">${iic('image')}<span>添加封面</span></button>
              </div>
              <textarea class="in-no-title" rows="1" placeholder="无标题" aria-label="页面标题" spellcheck="false"></textarea>
              <textarea class="in-no-body" rows="1" placeholder="输入「/」唤出命令，或直接开始写…" aria-label="正文" spellcheck="false"></textarea>
              <div class="in-no-tpl"><p>按回车继续空白页，或选择模板</p>
                <button type="button" class="in-no-tb" data-t="定理卡片">${iic('doc')}<span>定理卡片</span></button>
                <button type="button" class="in-no-tb" data-t="证明笔记">${iic('hash')}<span>证明笔记</span></button>
                <button type="button" class="in-no-tb" data-t="错题本">${iic('smile')}<span>错题本</span></button>
              </div>
            </div>
          </div>`,
          init(stage, ctx) {
            const root = stage.querySelector('.in-no'), title = root.querySelector('.in-no-title'), body = root.querySelector('.in-no-body'), crumb = root.querySelector('.in-no-crumb');
            const tpl = root.querySelector('.in-no-tpl');
            const fit = (t) => { t.style.height = 'auto'; t.style.height = `${t.scrollHeight}px`; };
            const syncTpl = () => { tpl.hidden = !!(title.value.trim() || body.value.trim()); };
            const fitAll = () => { fit(title); fit(body); };
            fitAll();
            const ro = new ResizeObserver(fitAll);
            ro.observe(root);
            ctx.add(() => ro.disconnect());
            ctx.on(title, 'input', () => { title.value = title.value.replace(/\n/g, ''); fit(title); crumb.textContent = title.value.trim() || '无标题'; syncTpl(); });
            ctx.on(title, 'keydown', (e) => { if (e.key === 'Enter' && !iCompose(e)) { e.preventDefault(); body.focus(); } });
            ctx.on(body, 'input', () => { fit(body); syncTpl(); });
            tpl.querySelectorAll('[data-t]').forEach((b) => ctx.on(b, 'click', () => {
              title.value = b.dataset.t; crumb.textContent = b.dataset.t; fit(title); syncTpl(); body.focus();
            }));
            ctx.on(body, 'keydown', (e) => { if (e.key === 'Backspace' && !body.value) { e.preventDefault(); title.focus(); } });
            root.querySelectorAll('.in-no-tb[data-k]').forEach((b) => ctx.on(b, 'click', () => {
              const k = b.dataset.k, on = root.classList.toggle(k);
              b.querySelector('span').textContent = (on ? '移除' : '添加') + (k === 'ic' ? '图标' : '封面');
              fitAll();
            }));
          },
          css: `.page-title {
  display: block; width: 100%;
  border: 0; outline: none; resize: none; overflow: hidden;
  background: none; padding: 3px 2px;
  font: 700 34px/1.2 ui-sans-serif, -apple-system, sans-serif;
  color: #37352f;
}
.page-title::placeholder { color: rgb(55 53 47 / .2); }
/* 正文提示：只在聚焦时出现 */
.page-body::placeholder       { color: transparent; }
.page-body:focus::placeholder { color: rgb(55 53 47 / .45); }
/* JS：input 时 el.style.height = el.scrollHeight + 'px' 自动增高 */`
        },
        {
          code: 'I10', name: '前缀 / 后缀', en: 'Prefix & suffix', meta: '网址 · 金额 · 单位',
          desc: '在框的左右嵌入固定文字：网址的 https:// 和 .cn、金额的 ¥ 和单位「元」、时长的「每天 … 分钟」。用户只填会变的那部分，不会把单位打错。第一行是「附加块」式（灰底小块和框连成一体），后两行是框内的弱化文字。聚焦时整组一起亮起光环；金额失焦后会自动补成两位小数。',
          kw: ['前缀', '后缀', 'Input addon', 'Input group', '单位'],
          bg: '#f8fafc', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-ps">
            <label class="in-ps-f"><span>个人主页</span><span class="in-grp"><span class="in-ad">https://</span><input value="mathlab" aria-label="主页地址" autocomplete="off" spellcheck="false"><span class="in-ad">.cn</span></span></label>
            <label class="in-ps-f"><span>课程费用</span><span class="in-grp"><span class="in-pf">¥</span><input class="money" value="199.00" inputmode="decimal" aria-label="课程费用" autocomplete="off"><span class="in-sf">元 / 学期</span></span></label>
            <label class="in-ps-f"><span>每日目标</span><span class="in-grp"><span class="in-pf">每天</span><input value="45" inputmode="numeric" aria-label="每日学习时长" autocomplete="off"><span class="in-sf">分钟</span></span></label>
          </div></div>`,
          init(stage, ctx) {
            const m = stage.querySelector('.money');
            ctx.on(m, 'blur', () => { const v = parseFloat(m.value.replace(/[^\d.]/g, '')); if (!Number.isNaN(v)) m.value = v.toFixed(2); });
          },
          css: `.group {
  display: flex; height: 40px; overflow: hidden;
  border: 1px solid #d0d5dd; border-radius: 8px; background: #fff;
}
.group:focus-within {                     /* 整组一起聚焦 */
  border-color: #6172f3; box-shadow: 0 0 0 4px #e0e7ff;
}
.group input { flex: 1; min-width: 0; border: 0; outline: none; }
.addon {                                  /* 附加块 */
  display: flex; align-items: center; padding: 0 11px;
  background: #f9fafb; color: #475467;
}
.addon:first-child { border-right: 1px solid #d0d5dd; }
.addon:last-child  { border-left:  1px solid #d0d5dd; }
.prefix, .suffix { display: flex; align-items: center; color: #667085; }`
        },
        {
          code: 'I11', name: '多行 + 字数统计', en: 'Textarea with counter', meta: '简答 · 评论 · 简介',
          desc: '多行文本框，右下角实时显示「已输入 / 上限」和一个小圆环。超过 80% 变橙色，超出上限后边框和数字变红，左边提示「超出 N 字」。适合有长度限制的地方：评论、简答题、个人简介。比直接截断输入更友好——用户可以先写完再删改。',
          kw: ['Textarea', '字数统计', 'Character counter', '字数限制'],
          bg: '#ffffff', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-ta">
            <label class="in-fld"><span class="in-lab">证明思路<small>简答题 3</small></span><textarea spellcheck="false">由比值判别法，|a(n+1) / a(n)| → 1/2 &lt; 1，所以级数绝对收敛。</textarea></label>
            <div class="in-ta-foot"><span class="in-ta-msg">写出关键的一步即可</span><span class="in-cnt"><svg viewBox="0 0 20 20" aria-hidden="true"><circle class="bg" cx="10" cy="10" r="8"/><circle class="fg" cx="10" cy="10" r="8" stroke-dasharray="0 51"/></svg><span><b>0</b> / 60</span></span></div>
          </div></div>`,
          init(stage, ctx) {
            const MAX = 60, C = 2 * Math.PI * 8;
            const w = stage.querySelector('.in-ta'), ta = w.querySelector('textarea'), fg = w.querySelector('.fg'), n = w.querySelector('.in-cnt b'), msg = w.querySelector('.in-ta-msg');
            const upd = () => {
              const k = [...ta.value].length;
              n.textContent = k;
              fg.setAttribute('stroke-dasharray', `${(Math.min(1, k / MAX) * C).toFixed(1)} ${C.toFixed(1)}`);
              w.classList.toggle('warn', k >= MAX * 0.8 && k <= MAX);
              w.classList.toggle('over', k > MAX);
              msg.textContent = k > MAX ? `超出 ${k - MAX} 字，请精简` : k >= MAX * 0.8 ? `还能写 ${MAX - k} 字` : '写出关键的一步即可';
            };
            upd();
            ctx.on(ta, 'input', upd);
          },
          css: `textarea { resize: none; border: 1px solid #d0d5dd; border-radius: 10px; }
.counter svg { width: 18px; height: 18px; transform: rotate(-90deg); }
.counter .fg {                   /* JS 设 stroke-dasharray = 比例 × 周长 */
  fill: none; stroke: #6172f3; stroke-width: 2.6; stroke-linecap: round;
  transition: stroke-dasharray .2s, stroke .2s;
}
.warn .counter     { color: #dc6803; }   /* ≥ 80% */
.warn .counter .fg { stroke: #f79009; }
.over textarea     { border-color: #f04438; }
.over .counter     { color: #d92d20; }
.over .counter .fg { stroke: #f04438; }`
        },
        {
          code: 'I12', name: '校验状态', en: 'Inline validation', meta: '注册 · 表单',
          desc: '边输入边检查：格式不对时边框变红、右侧出现感叹号，下方滑出一句具体的错误说明；正确时边框变绿、出现对勾。示例：邮箱缺了域名报错，8 位学号通过——试着改一改。好的错误提示要说清「怎么改」（例如「@ 后面还缺域名」），而不是只说「格式错误」。',
          kw: ['表单校验', 'Validation', '错误状态', '实时校验', '成功状态'],
          bg: '#ffffff', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-val">
            <label class="in-vf" data-rule="mail"><span class="in-lab">邮箱</span><span class="in-vbox"><input type="email" value="student@" autocomplete="off" spellcheck="false">${iic('alert', 'in-vic e')}${iic('okc', 'in-vic o')}</span><span class="in-vmsg" aria-live="polite"><span></span></span></label>
            <label class="in-vf" data-rule="sid"><span class="in-lab">学号<small>8 位数字</small></span><span class="in-vbox"><input value="20261024" inputmode="numeric" autocomplete="off">${iic('alert', 'in-vic e')}${iic('okc', 'in-vic o')}</span><span class="in-vmsg" aria-live="polite"><span></span></span></label>
          </div></div>`,
          init(stage, ctx) {
            const rule = {
              mail(v) {
                if (!v.includes('@')) return [false, '缺少 @，例如 name@school.edu'];
                const [u, d] = v.split('@');
                if (!u) return [false, '@ 前面要有用户名'];
                if (!d) return [false, '@ 后面还缺域名，例如 school.edu'];
                if (!/^[^\s@]+\.[a-z]{2,}$/i.test(d)) return [false, '域名不完整，例如 school.edu'];
                return [true, '格式正确'];
              },
              sid(v) {
                if (/\D/.test(v)) return [false, '只能输入数字'];
                if (v.length < 8) return [false, `还差 ${8 - v.length} 位`];
                if (v.length > 8) return [false, `多了 ${v.length - 8} 位`];
                return [true, '格式正确，已匹配到「数学科学学院」'];
              }
            };
            stage.querySelectorAll('.in-vf').forEach((f) => {
              const inp = f.querySelector('input'), msg = f.querySelector('.in-vmsg > span'), r = rule[f.dataset.rule];
              const check = () => {
                const v = inp.value.trim();
                if (!v) { f.classList.remove('err', 'ok'); inp.removeAttribute('aria-invalid'); return; }
                const [ok, text] = r(v);
                f.classList.toggle('ok', ok);
                f.classList.toggle('err', !ok);
                inp.setAttribute('aria-invalid', String(!ok));
                msg.textContent = text;
              };
              check();
              ctx.on(inp, 'input', check);
            });
          },
          css: `.field.error input   { border-color: #f04438; }
.field.error input:focus { box-shadow: 0 0 0 4px #fee4e2; }
.field.success input { border-color: #12b76a; }
.field .icon { position: absolute; right: 12px; opacity: 0; transform: scale(.5);
  transition: opacity .2s, transform .3s cubic-bezier(.3,.7,.3,1.5); }
.field.error .icon-error, .field.success .icon-ok { opacity: 1; transform: none; }
/* 提示文字从 0 高度滑出：grid 行 0fr → 1fr */
.field .msg { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .22s; }
.field .msg > span { overflow: hidden; }
.field.error .msg, .field.success .msg { grid-template-rows: 1fr; }
.field.error .msg { color: #d92d20; }  .field.success .msg { color: #039855; }`
        },
        {
          code: 'I13', name: '验证码格子', en: 'OTP / PIN input', meta: '登录 · 两步验证',
          desc: '六个独立的格子，每格一位数字：输入后自动跳到下一格，退格回到上一格，←→ 可以移动，粘贴一串数字会自动分配到各格。填满后自动校验：正确整排变绿，错误整排抖动变红。演示码是 π 的前六位 314159。用于登录、两步验证、支付确认。',
          kw: ['验证码', 'OTP', '一次性密码', '自动跳格', '两步验证'],
          bg: '#f8fafc', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-otpw">
            <h5>输入验证码</h5>
            <p>演示码：<b>314159</b>（π 的前六位）</p>
            <div class="in-otp no-pagekeys" role="group" aria-label="6 位验证码">
              ${[0, 1, 2, 3, 4, 5].map((i) => `${i === 3 ? '<i></i>' : ''}<input class="in-otp-c no-pagekeys" inputmode="numeric" autocomplete="${i === 0 ? 'one-time-code' : 'off'}" placeholder="·" aria-label="第 ${i + 1} 位">`).join('')}
            </div>
            <div class="in-otp-msg" aria-live="polite">验证码 5 分钟内有效</div>
            <button type="button" class="in-linkb">没收到？重新发送</button>
          </div></div>`,
          init(stage, ctx) {
            const wrap = stage.querySelector('.in-otp'), boxes = [...wrap.querySelectorAll('.in-otp-c')], msg = stage.querySelector('.in-otp-msg'), re = stage.querySelector('.in-linkb');
            const say = (t, c = '') => { msg.textContent = t; msg.className = `in-otp-msg${c ? ' ' + c : ''}`; };
            const clear = () => { if (wrap.classList.contains('ok') || wrap.classList.contains('bad')) { wrap.classList.remove('ok', 'bad'); say('验证码 5 分钟内有效'); } };
            const check = () => {
              const code = boxes.map((b) => b.value).join('');
              if (code.length < 6) return;
              if (code === '314159') { wrap.classList.add('ok'); say('✓ 验证成功', 'ok'); }
              else { wrap.classList.add('bad'); iKick(wrap, 'in-shake', ctx); say('验证码不对，再试一次', 'bad'); }
            };
            const fill = (start, digits) => {
              let i = start;
              for (const d of digits) { if (i > 5) break; boxes[i++].value = d; }
              boxes[Math.min(i, 5)].focus();
              check();
            };
            boxes.forEach((b, i) => {
              ctx.on(b, 'focus', () => requestAnimationFrame(() => { if (document.activeElement === b && b.value) b.setSelectionRange(0, b.value.length); }));
              ctx.on(b, 'input', () => {
                clear();
                const d = b.value.replace(/\D/g, '');
                if (d.length > 1) { b.value = ''; fill(i, d); return; }
                b.value = d;
                if (d && i < 5) boxes[i + 1].focus();
                check();
              });
              ctx.on(b, 'keydown', (e) => {
                if (e.key === 'Backspace' && !b.value && i > 0) { e.preventDefault(); clear(); boxes[i - 1].value = ''; boxes[i - 1].focus(); }
                else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  e.preventDefault(); e.stopPropagation();
                  const j = i + (e.key === 'ArrowLeft' ? -1 : 1);
                  if (j >= 0 && j <= 5) boxes[j].focus();
                } else if (/^\d$/.test(e.key) && b.value && b.selectionStart === b.selectionEnd) {
                  e.preventDefault(); clear(); b.value = e.key;
                  if (i < 5) boxes[i + 1].focus();
                  check();
                }
              });
              ctx.on(b, 'paste', (e) => {
                e.preventDefault();
                const t = ((e.clipboardData || window.clipboardData)?.getData('text') || '').replace(/\D/g, '');
                if (t) { clear(); fill(i, t); }
              });
            });
            ctx.on(re, 'click', () => { boxes.forEach((b) => { b.value = ''; }); wrap.classList.remove('ok', 'bad'); say('已重新发送（演示码不变：314159）'); boxes[0].focus(); });
          },
          css: `.otp { display: grid; grid-template-columns: repeat(6, 44px); gap: 7px; }
.otp input {
  height: 54px; padding: 0; text-align: center;
  border: 1px solid #d0d5dd; border-radius: 10px;
  font: 600 24px/1 system-ui; caret-color: #6172f3;
}
.otp input:focus { outline: none; border-color: #6172f3; box-shadow: 0 0 0 4px #e0e7ff; }
.otp.ok  input { border-color: #12b76a; background: #ecfdf3; color: #027a48; }
.otp.bad input { border-color: #f04438; background: #fef3f2; color: #b42318; }
.otp.bad { animation: shake .42s; }
@keyframes shake { 15% { transform: translateX(-7px) } 35% { transform: translateX(6px) }
                   55% { transform: translateX(-4px) } 75% { transform: translateX(3px) } }
/* JS：input → 跳到下一格；空格上按退格 → 回上一格；paste → 逐位分配 */`,
          links: [['MDN · autocomplete', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete']]
        },
        {
          code: 'I14', name: '自定义下拉选择', en: 'Custom select', meta: '表单 · 筛选',
          desc: '点开后在下方弹出圆角浮层，当前项打勾，暂不可选的项变灰并标注「即将上线」。键盘完全可用：↓ 或回车展开，↑↓ 移动，回车选定，Esc 关闭，按数字键直接跳到对应章。比系统自带的下拉框好看、能放编号和说明；代价是键盘和读屏支持都要自己实现。',
          kw: ['下拉选择', 'Select', 'Listbox', '浮层', '键盘操作'],
          bg: '#f8fafc', ratio: '5 / 4',
          html: `<div class="in-selst in-w"><div class="in-sel">
            <span class="in-lab">学习章节</span>
            <button type="button" class="in-sel-btn no-pagekeys" aria-haspopup="listbox" aria-expanded="false"><span class="in-sel-v"></span>${iic('chevD')}</button>
            <ul class="in-sel-list no-pagekeys" role="listbox" aria-label="学习章节"></ul>
            <span class="in-help">共 6 节 · 预计 3 小时</span>
          </div></div>`,
          init(stage, ctx) {
            const CH = [['实数与确界', 5], ['数列极限', 7], ['函数极限', 6], ['连续函数', 6], ['导数与微分', 8], ['微分中值定理', 5], ['不定积分', 6], ['定积分', 9], ['数项级数', 0]];
            const sel = stage.querySelector('.in-sel'), btn = sel.querySelector('.in-sel-btn'), val = btn.querySelector('.in-sel-v'), list = sel.querySelector('.in-sel-list'), help = sel.querySelector('.in-help');
            list.innerHTML = CH.map(([t, n], i) => `<li class="in-opt" role="option" tabindex="-1" aria-selected="false"${n ? '' : ' aria-disabled="true"'}><span class="in-nb">${i + 1}</span>${t}${n ? `<svg class="in-i ck" viewBox="0 0 24 24" aria-hidden="true">${IP.check}</svg>` : '<small>即将上线</small>'}</li>`).join('');
            const opts = [...list.children];
            let cur = 3, open = false;
            const show = () => {
              val.innerHTML = `<span class="in-nb">${cur + 1}</span><span>第 ${cur + 1} 章 · ${CH[cur][0]}</span>`;
              btn.setAttribute('aria-label', `学习章节：第 ${cur + 1} 章 ${CH[cur][0]}`);
              opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === cur)));
              help.textContent = `共 ${CH[cur][1]} 节 · 预计 ${Math.round(CH[cur][1] * 0.5 * 10) / 10} 小时`;
            };
            const ok = (i) => i >= 0 && i < opts.length && !opts[i].hasAttribute('aria-disabled');
            const focusOpt = (i) => {
              const o = opts[i];
              o.focus({ preventScroll: true });
              if (o.offsetTop < list.scrollTop + 4) list.scrollTop = o.offsetTop - 5;
              else if (o.offsetTop + o.offsetHeight > list.scrollTop + list.clientHeight - 4) list.scrollTop = o.offsetTop + o.offsetHeight - list.clientHeight + 5;
            };
            const setOpen = (v, focusTrigger) => {
              open = v;
              sel.classList.toggle('open', v);
              btn.setAttribute('aria-expanded', String(v));
              if (v) {
                const room = stage.getBoundingClientRect().bottom - btn.getBoundingClientRect().bottom - 18;
                list.style.maxHeight = `${Math.max(110, Math.min(room, 330))}px`;
                list.scrollTop = Math.max(0, opts[cur].offsetTop - list.clientHeight / 2 + 18);
                focusOpt(cur);
              } else if (focusTrigger) btn.focus();
            };
            const choose = (i) => { if (!ok(i)) return; cur = i; show(); setOpen(false, true); };
            show();
            ctx.on(btn, 'click', () => setOpen(!open, false));
            ctx.on(btn, 'keydown', (e) => {
              if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); setOpen(true); }
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation();
            });
            opts.forEach((o, i) => {
              ctx.on(o, 'click', () => choose(i));
              ctx.on(o, 'pointermove', () => { if (document.activeElement !== o && ok(i)) o.focus({ preventScroll: true }); });
            });
            ctx.on(list, 'keydown', (e) => {
              const i = opts.indexOf(document.activeElement);
              const step = (d) => { let j = i + d; while (j >= 0 && j < opts.length && !ok(j)) j += d; if (ok(j)) focusOpt(j); };
              if (e.key === 'ArrowDown') step(1);
              else if (e.key === 'ArrowUp') step(-1);
              else if (e.key === 'Home') { focusOpt(0); }
              else if (e.key === 'End') { let j = opts.length - 1; while (!ok(j)) j--; focusOpt(j); }
              else if (e.key === 'Enter' || e.key === ' ') choose(i);
              else if (e.key === 'Escape') setOpen(false, true);
              else if (e.key === 'Tab') { setOpen(false, false); return; }
              else if (/^[1-9]$/.test(e.key)) { const j = +e.key - 1; if (ok(j)) focusOpt(j); }
              else if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
              e.preventDefault(); e.stopPropagation();
            });
            ctx.on(document, 'pointerdown', (e) => { if (open && !sel.contains(e.target)) setOpen(false, false); });
            ctx.on(sel, 'focusout', (e) => { if (open && e.relatedTarget && !sel.contains(e.relatedTarget)) setOpen(false, false); });
          },
          css: `.select-list {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  max-height: 260px; overflow: auto; padding: 5px; border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px rgb(16 24 40 / .08), 0 18px 38px -12px rgb(16 24 40 / .3);
  visibility: hidden; opacity: 0; transform: translateY(-4px);
  transition: opacity .15s, transform .15s, visibility 0s .15s;
}
.select.open .select-list { visibility: visible; opacity: 1; transform: none;
  transition: opacity .15s, transform .15s; }
.option:focus { background: #f2f4f7; outline: none; }
.option[aria-selected="true"] .check { opacity: 1; }
.option[aria-disabled="true"] { color: #98a2b3; cursor: not-allowed; }`,
          links: [['WAI-ARIA · Select-only combobox', 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/']]
        },
        {
          code: 'I15', name: '标签输入', en: 'Tags / Chips input', meta: '关键词 · 收件人',
          desc: '输入一个词按回车（或逗号），它就变成一枚带 × 的小标签；输入框为空时按退格，先选中最后一枚、再按一次删除；重复的词会闪一下提醒你已经有了。下面的推荐词点一下就能加。适合给笔记打知识点标签、填写关键词、添加收件人。缺点是标签多了框会变高，所以限制最多 8 个。',
          kw: ['标签输入', 'Tags input', 'Chips', '多值输入'],
          bg: '#ffffff', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-tgw">
            <span class="in-lab">知识点标签</span>
            <div class="in-tags"><input placeholder="添加，按回车" aria-label="添加知识点标签" autocomplete="off" spellcheck="false" enterkeyhint="done"></div>
            <div class="in-tg-help"><span>回车或逗号添加 · 退格删除</span><b>0 / 8</b></div>
            <div class="in-tg-sug"><span>推荐</span></div>
          </div></div>`,
          init(stage, ctx) {
            const MAX = 8;
            const box = stage.querySelector('.in-tags'), inp = box.querySelector('input'), help = stage.querySelector('.in-tg-help'), cnt = help.querySelector('b'), sugw = stage.querySelector('.in-tg-sug');
            const SUG = ['泰勒展开', '收敛半径', '洛必达法则', '幂级数'];
            const chips = () => [...box.querySelectorAll('.in-chip:not(.out)')];
            const upd = () => {
              const n = chips().length;
              cnt.textContent = `${n} / ${MAX}`;
              help.classList.toggle('full', n >= MAX);
              const have = new Set(chips().map((c) => c.dataset.v));
              sugw.querySelectorAll('button').forEach((b) => { b.hidden = have.has(b.dataset.v); });
            };
            const add = (raw, anim) => {
              const v = raw.replace(/[,，、]/g, ' ').trim().slice(0, 12);
              if (!v) return;
              const dup = chips().find((c) => c.dataset.v === v);
              if (dup) { iMotion(stage, ctx); iKick(dup, 'flash', ctx); return; }
              if (chips().length >= MAX) { iMotion(stage, ctx); iKick(help, 'flash', ctx); return; }
              const c = document.createElement('span');
              c.className = `in-chip${anim ? ' new' : ''}`;
              c.dataset.v = v;
              c.innerHTML = `${iEsc(v)}<button type="button" class="in-chip-x" aria-label="删除 ${iEsc(v)}">${iic('x')}</button>`;
              box.insertBefore(c, inp);
              upd();
            };
            const del = (c) => {
              c.classList.add('out');
              upd();
              ctx.later(160, () => { c.remove(); upd(); });
            };
            ['极限', '连续性', '一致收敛'].forEach((t) => add(t, false));
            sugw.insertAdjacentHTML('beforeend', SUG.map((t) => `<button type="button" data-v="${t}">+ ${t}</button>`).join(''));
            upd();
            ctx.on(inp, 'keydown', (e) => {
              if (iCompose(e)) return;
              const last = chips().pop();
              if (e.key === 'Enter' || e.key === ',' || e.key === '，') {
                e.preventDefault();
                iMotion(stage, ctx);
                add(inp.value, true);
                inp.value = '';
              } else if (e.key === 'Backspace' && !inp.value && last) {
                e.preventDefault();
                if (last.classList.contains('sel')) del(last); else last.classList.add('sel');
              } else if (last) last.classList.remove('sel');
            });
            ctx.on(inp, 'input', () => {
              if (/[,，、]/.test(inp.value)) { iMotion(stage, ctx); inp.value.split(/[,，、]/).slice(0, -1).forEach((t) => add(t, true)); inp.value = inp.value.split(/[,，、]/).pop(); }
            });
            ctx.on(inp, 'blur', () => chips().forEach((c) => c.classList.remove('sel')));
            ctx.on(box, 'click', (e) => {
              const x = e.target.closest('.in-chip-x');
              if (x) { del(x.parentElement); inp.focus(); return; }
              if (e.target === box) inp.focus();
            });
            ctx.on(sugw, 'click', (e) => { const b = e.target.closest('button'); if (b) { iMotion(stage, ctx); add(b.dataset.v, true); inp.focus(); } });
          },
          css: `.tags {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  min-height: 46px; padding: 6px 8px;
  border: 1px solid #d0d5dd; border-radius: 10px; cursor: text;
}
.tags:focus-within { border-color: #6172f3; box-shadow: 0 0 0 4px #e0e7ff; }
.chip { display: inline-flex; align-items: center; height: 28px;
  padding: 0 3px 0 10px; border-radius: 7px;
  background: #eef2ff; color: #3730a3; font-weight: 500; }
.chip.selected { background: #6366f1; color: #fff; }   /* 退格第一次 */
.tags input { flex: 1; min-width: 96px; border: 0; outline: none; }
/* JS：keydown Enter / 逗号 → 新建 chip（注意跳过 e.isComposing，
   否则中文输入法选词时的回车也会被当成添加） */`
        },
        {
          code: 'I16', name: '答案输入框', en: 'Answer box', meta: '数学练习 · 即时反馈',
          desc: '数学练习站的核心组件：输入框直接嵌在公式里，填一个数，按「检查」或回车判断。答对：框变绿、右上角弹出对勾，下面给出一句解法；答错：整行左右抖动变红，并给一句提示而不是直接给答案。支持 1、1.0、2/2 这类等价写法。',
          kw: ['答案框', '练习题', '即时反馈', '抖动', '嵌入公式'],
          bg: '#f7f3ea', ratio: '5 / 4',
          html: `<div class="center in-w"><div class="in-ans">
            <p class="in-ans-k"><span>练习 4.2 · 几何级数</span><span>第 1 次尝试</span></p>
            <div class="in-ans-q">
              <span class="in-sum"><small>∞</small><b>∑</b><small><i>n</i>=1</small></span>
              <span class="in-frac"><span>1</span><span>2<sup><i>n</i></sup></span></span>
              <span>=</span>
              <span class="in-ans-slot"><input class="in-ans-in" inputmode="decimal" placeholder="?" aria-label="你的答案" autocomplete="off" spellcheck="false"><span class="in-ans-badge">${iic('check')}</span></span>
            </div>
            <div class="in-ans-row"><button type="button" class="in-ans-btn">检查</button><p class="in-ans-fb" aria-live="polite">填一个数，可以写分数</p></div>
          </div></div>`,
          init(stage, ctx) {
            const w = stage.querySelector('.in-ans'), inp = w.querySelector('.in-ans-in'), btn = w.querySelector('.in-ans-btn'), fb = w.querySelector('.in-ans-fb'), q = w.querySelector('.in-ans-q'), tries = w.querySelector('.in-ans-k span:last-child');
            let n = 0;
            const parse = (s) => {
              const t = s.replace(/[０-９．／－]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/\s+/g, '');
              const m = t.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
              if (m) return +m[2] ? +m[1] / +m[2] : NaN;
              return /^-?\d+(\.\d+)?$|^-?\.\d+$/.test(t) ? +t : NaN;
            };
            const say = (t) => { fb.innerHTML = t; iKick(fb, 'in-in', ctx); };
            const check = () => {
              iMotion(stage, ctx);
              w.classList.remove('ok', 'bad');
              const v = inp.value.trim();
              if (!v) { say('先填一个数再检查'); inp.focus(); return; }
              const x = parse(v);
              if (Number.isNaN(x)) { w.classList.add('bad'); iKick(q, 'in-shake', ctx); say('请输入一个数，比如 0.5 或 3/4'); return; }
              n++;
              void w.offsetWidth;
              if (Math.abs(x - 1) < 1e-9) { w.classList.add('ok'); tries.textContent = `第 ${n} 次答对`; say('✓ 正确！首项 ½、公比 ½，<span class="in-nw">和 = ½ ÷ (1 − ½) = 1</span>'); }
              else { tries.textContent = `第 ${n + 1} 次尝试`; w.classList.add('bad'); iKick(q, 'in-shake', ctx); say(x > 1 ? '偏大了。提示：这是公比 ½ 的几何级数，<span class="in-nw">和 = a₁ / (1 − r)</span>' : '偏小了。提示：前两项 <span class="in-nw">½ + ¼</span> 已经是 ¾ 了'); }
            };
            ctx.on(btn, 'click', check);
            ctx.on(inp, 'keydown', (e) => { if (e.key === 'Enter' && !iCompose(e)) { e.preventDefault(); check(); } });
            ctx.on(inp, 'input', () => { if (w.classList.contains('ok') || w.classList.contains('bad')) { w.classList.remove('ok', 'bad'); fb.textContent = '填一个数，可以写分数'; } });
          },
          css: `.answer {
  width: 78px; height: 46px; text-align: center;
  border: 1.5px solid #d6d3d1; border-radius: 10px; background: #fafaf9;
  font: 500 21px "STIX Two Text", serif;
}
.answer:focus { outline: none; border-color: #4f46e5; box-shadow: 0 0 0 4px #e0e7ff; }
.correct .answer { border-color: #16a34a; background: #f0fdf4; color: #15803d; }
.wrong   .answer { border-color: #dc2626; background: #fef2f2; color: #b91c1c; }
.wrong .equation { animation: shake .42s cubic-bezier(.36,.07,.19,.97); }
.badge { opacity: 0; transform: scale(.3);                     /* 右上角对勾 */
  transition: opacity .15s, transform .35s cubic-bezier(.3,.7,.3,1.6); }
.correct .badge { opacity: 1; transform: none; }
@keyframes shake { 15% { transform: translateX(-7px) } 35% { transform: translateX(6px) }
                   55% { transform: translateX(-4px) } 75% { transform: translateX(3px) } }`
        }
      ]
    }
  ]);
