// ===== C 配色：color-sets（C01–C14）与 color-wheel（配色关系实验台）=====

// —— 颜色工具 ——
const coHexRgb = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const coLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const coLum = (h) => { const [r, g, b] = coHexRgb(h).map(coLin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const coRatio = (a, b) => { const x = coLum(a), y = coLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const coOn = (h) => (coRatio(h, '#ffffff') >= coRatio(h, '#141414') ? '#ffffff' : '#141414');
const coHsl2Hex = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)))).toString(16).padStart(2, '0');
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};
const coHex2Hsl = (hex) => {
  const [r, g, b] = coHexRgb(hex).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s: s * 100, l: l * 100 };
};
async function coCopy(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* 退回旧办法 */ }
  const ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
  document.body.appendChild(ta); ta.select();
  let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove(); return ok;
}

// —— 同一个「学习卡片」小界面：颜色全部来自 CSS 变量 ——
const CO_BARS = [56, 84, 44, 70, 92];
function coUI(u, extra = '', sideExtra = '') {
  const bars = u.bars.map((c, i) => `<i style="height:${CO_BARS[i % 5]}%;--co-c:${c}">${i === 4 ? sideExtra : ''}</i>`).join('');
  return `<div class="co-ui">
    <div class="co-card">${extra}
      <span class="co-tag">第 3 章 · 级数</span>
      <b class="co-title">幂级数</b>
      <p class="co-body">在收敛半径内，幂级数可以逐项求导与积分。</p>
      <div class="co-prog"><span>本节进度</span><span>62%</span><i><b style="width:62%"></b></i></div>
      <div class="co-btns"><span class="co-btn">开始学习</span><span class="co-btn2">收藏</span></div>
    </div>
    <div class="co-side">
      <span class="co-sl">各章掌握度</span>
      <b class="co-big">78<small>%</small></b>
      <div class="co-bars">${bars}</div>
    </div>
  </div>`;
}
const coVars = (u) => [
  ['bg', u.bg], ['card', u.card], ['side', u.side || u.card], ['ink', u.ink], ['mut', u.mut], ['line', u.line],
  ['pri', u.pri], ['onpri', u.onPri], ['soft', u.soft], ['tagink', u.tagInk], ['tagline', u.tagLine || 'transparent']
].map(([k, v]) => `--co-${k}:${v}`).join(';');
function coChips(sw) {
  const many = sw.length > 7;
  return `<div class="co-chips${many ? ' co-many' : ''}" style="--co-cols:${Math.ceil(sw.length / 2)}">${sw.map(([n, h]) => `<span class="co-chip" style="background:${h};color:${coOn(h)}"><b>${n}</b><code>${many ? h.slice(1) : h}</code></span>`).join('')}</div>`;
}

const CO_SETS = [
  { code: 'C01', name: '莫兰迪', en: 'Morandi', meta: '灰调 · 低饱和',
    u: { bg: '#E5DFD8', card: '#F3EFEA', ink: '#47423E', mut: '#776F68', line: '#DCD3CA', pri: '#62717F', onPri: '#FFFFFF', soft: '#E9DAD4', tagInk: '#86615A', bars: ['#9AA8B4', '#C3A39C', '#A5B09E', '#62717F', '#D1BFA6'] },
    sw: [['燕麦', '#E5DFD8'], ['雾霾蓝', '#9AA8B4'], ['灰豆沙', '#C3A39C'], ['灰豆绿', '#A5B09E'], ['奶茶', '#D1BFA6'], ['深雾蓝', '#62717F'], ['岩灰', '#47423E']],
    desc: '每个颜色都像掺了一点灰：雾霾蓝、灰豆沙、灰豆绿，彼此明度接近，整体安静、克制、有高级感。适合阅读型、生活方式类页面；用它做背景和图表很舒服，但文字和按钮要另选更深的颜色，否则对比度不够。',
    more: '名字来自意大利画家乔治·莫兰迪（Giorgio Morandi），他一生画瓶瓶罐罐，用色灰而柔和。搭配可按 60-30-10：60% 燕麦灰做大面积背景，30% 雾霾蓝、灰豆绿做卡片和图表，10% 深雾蓝做按钮。颜色彼此太接近，层级要靠明度差（深字浅底）而不是靠色相。不适合需要强烈引导的营销页。',
    kw: ['低饱和', '灰调', '高级感', '雾霾蓝'], links: [['Giorgio Morandi', 'https://en.wikipedia.org/wiki/Giorgio_Morandi']] },
  { code: 'C02', name: '马卡龙', en: 'Pastel', meta: '粉彩 · 高明度',
    u: { bg: '#FDF5EF', card: '#FFFFFF', ink: '#3E3651', mut: '#736B88', line: '#EFE4EA', pri: '#FFB5C8', onPri: '#3E3651', soft: '#EEE8FC', tagInk: '#6550AE', bars: ['#FFB5C8', '#A9D6F5', '#B4E7D2', '#FFE29A', '#CBB8F2'] },
    sw: [['草莓', '#FFB5C8'], ['天空', '#A9D6F5'], ['薄荷', '#B4E7D2'], ['柠檬', '#FFE29A'], ['薰衣草', '#CBB8F2'], ['墨紫', '#3E3651']],
    desc: '高明度、中低饱和的糖果色：草莓粉、天空蓝、薄荷绿、柠檬黄、薰衣草紫。轻松、可爱、亲切，适合低龄学习者、打卡和游戏化的界面。浅色按钮上要放深色字（这里是墨紫），白字几乎看不清。',
    more: '粉彩之间明度相近，放在一起不会互相抢，但也因此缺少层次，需要一个深色（墨紫、深灰）来承担文字和关键信息。常见做法：白或奶油色底 + 2–3 个粉彩做卡片和标签 + 深色字。粉彩用得太多会显得幼稚，正式的数学讲义慎用。',
    kw: ['糖果色', '粉彩', '高明度', '可爱'] },
  { code: 'C03', name: '大地色', en: 'Earth tones', meta: '自然 · 暖调',
    u: { bg: '#EDE3D1', card: '#F8F2E7', ink: '#3B2A20', mut: '#6C5849', line: '#E0D3BD', pri: '#A9542F', onPri: '#FFFFFF', soft: '#E6E3CC', tagInk: '#5C5F2F', bars: ['#A9542F', '#C99A4A', '#7D7A45', '#9AA383', '#3B2A20'] },
    sw: [['沙', '#EDE3D1'], ['陶土', '#A9542F'], ['赭石', '#C99A4A'], ['橄榄', '#7D7A45'], ['鼠尾草', '#9AA383'], ['深棕', '#3B2A20']],
    desc: '取自泥土、岩石和植物的颜色：沙色、陶土、赭石、橄榄、深棕。温暖、踏实、有手作感，适合人文、自然和慢阅读的内容。沙色做底（60%），赭石、橄榄做图表和标签（30%），陶土只用在按钮这类重点上（10%）。',
    more: '大地色都偏暖、偏黄，饱和度中低，彼此天然协调。正文不用纯黑而用深棕 #3B2A20，整体更柔和。配数学内容时会有「旧书、手稿」的感觉，比冷灰色的界面更亲切。避免整页只有棕黄而没有一点冷色——加一点鼠尾草绿或灰蓝可以透气。',
    kw: ['陶土', '赭石', '橄榄绿', '暖调', '自然'] },
  { code: 'C04', name: '霓虹暗底', en: 'Neon on dark', meta: '赛博 · 高饱和', dark: true, cls: 'co-neon',
    u: { bg: '#0A0A16', card: '#14142A', ink: '#F1EEFF', mut: '#A29FC0', line: '#2A2A4E', pri: '#FF2E97', onPri: '#12001F', soft: 'rgba(0,229,255,.12)', tagInk: '#00E5FF', tagLine: 'rgba(0,229,255,.45)', bars: ['#FF2E97', '#00E5FF', '#B6FF3C', '#FFE14D', '#9D5CFF'] },
    sw: [['夜', '#0A0A16'], ['品红', '#FF2E97'], ['电光青', '#00E5FF'], ['荧光绿', '#B6FF3C'], ['柠黄', '#FFE14D'], ['电紫', '#9D5CFF']],
    desc: '近黑的深蓝紫底上放高饱和的荧光色：品红、电光青、荧光绿，按钮和图表带发光光晕。科技感、游戏感强烈，适合活动页、编程竞赛类内容。荧光色只做点缀，大面积使用会刺眼。',
    more: '发光效果是大模糊半径的彩色 box-shadow / text-shadow。底色不要纯黑，用带一点蓝紫的 #0A0A16，荧光色才显得「亮」。荧光色上放文字要用深色字（品红按钮上用近黑字），白字对比度只有 3.4:1。长时间阅读会累，不适合大段正文。',
    kw: ['荧光', '发光', '赛博朋克', '暗底'] },
  { code: 'C05', name: '中国传统色', en: 'Chinese traditional colours', meta: '色名 · hex 为近似值', cls: 'co-seal',
    u: { bg: '#D6ECF0', card: '#FFFBF0', ink: '#425066', mut: '#50616D', line: '#E9E2D0', pri: '#425066', onPri: '#FFFBF0', soft: '#FF461F', tagInk: '#FFFBF0', bars: ['#FF461F', '#FFB61E', '#789262', '#1685A9', '#425066'] },
    sw: [['朱砂', '#FF461F'], ['黛蓝', '#425066'], ['月白', '#D6ECF0'], ['藤黄', '#FFB61E'], ['竹青', '#789262'], ['石青', '#1685A9'], ['象牙白', '#FFFBF0']],
    desc: '用有名字的传统色：朱砂、黛蓝、月白、藤黄、竹青、石青，卡片是象牙白。朱砂像印章，黛蓝像墨，端庄而有书卷气，适合古典、人文、国风页面。以月白、象牙白为底，黛蓝做文字和按钮，朱砂只点在最需要注意的地方。',
    more: 'hex 为近似值：这些色名历史上没有统一的标准色值，各家资料（如「中国色」网站）给出的数值不尽相同，这里取流传较广的一组。朱砂 #FF461F 很鲜，放白字对比度只有 3.3:1，适合做印章式的小标签，不适合做大按钮的底。',
    kw: ['朱砂', '黛蓝', '月白', '藤黄', '竹青'], links: [['中国色', 'http://zhongguose.com/']] },
  { code: 'C06', name: '日本传统色', en: 'Japanese traditional colours', meta: '和色 · hex 为近似值',
    u: { bg: '#165E83', card: '#FBFAF5', ink: '#223A70', mut: '#595857', line: '#E8E4DA', pri: '#165E83', onPri: '#FFFFFF', soft: '#FEF4F4', tagInk: '#C85200', tagLine: 'rgba(235,97,1,.45)', bars: ['#165E83', '#EB6101', '#928C36', '#F8B500', '#223A70'] },
    sw: [['藍', '#165E83'], ['紺', '#223A70'], ['朱', '#EB6101'], ['鶯', '#928C36'], ['山吹', '#F8B500'], ['桜', '#FEF4F4'], ['生成り', '#FBFAF5']],
    desc: '日本的「和色」：藍（靛蓝）、紺（深藏青）、朱、鶯（带褐的黄绿）、山吹（金黄）、桜（极淡的粉）。大面积藍色底配生成り（米白）卡片，朱色只做小标签，克制而有工艺感。适合文化、设计、手作类内容。',
    more: 'hex 为近似值，参照常见的和色列表（如和色大辞典、NIPPON COLORS），不同资料略有差异。藍是日本最有代表性的颜色之一（所谓 Japan Blue）。桜色 #FEF4F4 比想象中淡得多，几乎是带粉的白，适合做底色而不是强调色。',
    kw: ['藍', '朱', '鶯', '桜', '和色'], links: [['NIPPON COLORS', 'https://nipponcolors.com/']] },
  { code: 'C07', name: '北欧', en: 'Nordic', meta: '斯堪的纳维亚 · 明亮',
    u: { bg: '#F2F0EB', card: '#FFFFFF', ink: '#2A2E33', mut: '#62686E', line: '#E6E3DC', pri: '#3F5E73', onPri: '#FFFFFF', soft: '#F2EADF', tagInk: '#7E5F38', bars: ['#3F5E73', '#93A9B8', '#A9B8A0', '#D4B996', '#D9B8B0'] },
    sw: [['雪白', '#F2F0EB'], ['峡湾蓝', '#3F5E73'], ['雾蓝', '#93A9B8'], ['鼠尾草', '#A9B8A0'], ['浅橡木', '#D4B996'], ['灰粉', '#D9B8B0'], ['炭黑', '#2A2E33']],
    desc: '大量的白和暖白，配灰蓝、鼠尾草绿、浅橡木色和一点炭黑。明亮、通透、安静，像北欧家居。很适合学习工具和文档站：背景干净，颜色只在需要时出现。',
    more: '北欧风的核心是「白 + 天然材质色 + 低饱和冷色」，大面积留白，强调色也很克制。按钮用较深的峡湾蓝 #3F5E73 保证对比度（白字 6.9:1），浅木色和灰粉做标签、插图。程序员熟悉的 Nord 配色主题（北极蓝 + 极光色）也是同一种气质。',
    kw: ['明亮', '浅木色', '灰蓝', '鼠尾草绿', '留白'], links: [['Nord 配色主题', 'https://www.nordtheme.com/']] },
  { code: 'C08', name: '黑白 + 单一强调色', en: 'High-contrast mono + accent', meta: '瑞士风 · 极简',
    u: { bg: '#EDEDED', card: '#FFFFFF', ink: '#0A0A0A', mut: '#5C5C5C', line: '#D6D6D6', pri: '#0A0A0A', onPri: '#FFFFFF', soft: '#FF4D00', tagInk: '#0A0A0A', bars: ['#D6D6D6', '#A3A3A3', '#5C5C5C', '#0A0A0A', '#FF4D00'] },
    sw: [['白', '#FFFFFF'], ['浅灰', '#EDEDED'], ['中灰', '#A3A3A3'], ['深灰', '#5C5C5C'], ['黑', '#0A0A0A'], ['橙', '#FF4D00']],
    desc: '整个界面只有黑、白和几级灰，唯一的颜色（这里是橙 #FF4D00）只标最重要的东西：标签、当前数据。对比强烈、信息清楚，适合编辑类、作品集和工具类网站。',
    more: '这是最容易做好的配色：灰阶负责层级，强调色负责「看这里」。规则只有一条——强调色用得越少越有效，一屏里最好只出现一两处。强调色换成克莱因蓝、正红或荧光绿，气质会完全不同。橙色上的字用黑色（对比 6:1），白字只有 3.3:1。',
    kw: ['黑白灰', '单一强调色', '高对比', '极简'] },
  { code: 'C09', name: '暗色模式', en: 'Dark UI', meta: '深色主题 · 灰阶表示层级', dark: true, cls: 'co-darkui',
    u: { bg: '#111317', card: '#1A1D22', side: '#23272E', ink: '#E6E8EB', mut: '#9BA1A9', line: '#30353D', pri: '#8AB4F8', onPri: '#0B1B33', soft: 'rgba(138,180,248,.16)', tagInk: '#A8C7FA', bars: ['#8AB4F8', '#81C995', '#FDD663', '#F28B82', '#C58AF9'] },
    sw: [['背景', '#111317'], ['表面 1', '#1A1D22'], ['表面 2', '#23272E'], ['表面 3', '#2D323A'], ['次要文字', '#9BA1A9'], ['文字', '#E6E8EB'], ['主色', '#8AB4F8']],
    desc: '暗色模式不是把背景涂成纯黑：底色是 #111317 这样的深灰，越「靠近」你的面越亮——卡片、右侧面板、「本周 +12%」提示框各高一层，用灰阶而不是阴影表示层级。文字用 #E6E8EB 而不是纯白，主色比亮色模式更浅、更不饱和。',
    more: '为什么不用纯黑：纯黑底上的纯白字对比过强，看久了会「发光」、拖影；深灰底还能让层级显现出来。Material Design 建议底色 #121212，每升高一层就叠加更多白色。彩色在暗底上要降饱和、提明度（如 #8AB4F8 而不是 #1A73E8），否则刺眼。',
    kw: ['深灰不是纯黑', '表面层级', '降饱和', '暗色主题'], links: [['Material 暗色主题', 'https://m2.material.io/design/color/dark-theme.html']] },
  { code: 'C10', name: '70 年代复古', en: 'Retro 70s', meta: '复古 · 暖调', cls: 'co-retro',
    u: { bg: '#EFD9AE', card: '#FAEBCD', ink: '#3D2314', mut: '#6E4E36', line: '#E6CB98', pri: '#B4471A', onPri: '#FFF6E5', soft: '#E0A526', tagInk: '#3D2314', bars: ['#B4471A', '#E0A526', '#7A8A2A', '#6B3A1E', '#2E6E6A'] },
    sw: [['奶油', '#EFD9AE'], ['焦橙', '#B4471A'], ['芥末黄', '#E0A526'], ['牛油果绿', '#7A8A2A'], ['巧克力', '#6B3A1E'], ['孔雀青', '#2E6E6A']],
    desc: '焦橙、芥末黄、牛油果绿、巧克力棕，加一点孔雀青，底色是奶油色。温暖、怀旧、有点俏皮，常配圆胖的衬线字和彩虹条纹（卡片右上角）。适合活动页、播客和轻松的科普内容。',
    more: '70 年代的家居、唱片封面和广告里到处是这组颜色。它们都偏暖、偏浊，放在一起很协调；几条平行的彩色弧线是最有辨识度的装饰。按钮选最深的焦橙或巧克力色，芥末黄只适合做色块，上面用深棕字。',
    kw: ['复古', '焦橙', '芥末黄', '牛油果绿', '条纹'] },
  { code: 'C11', name: '单色阶', en: 'Monochromatic', meta: '一个色相 · 9 级', cls: 'co-mono',
    u: { bg: '#E3E0FF', card: '#F3F1FF', ink: '#322163', mut: '#5E3EB6', line: '#E3E0FF', pri: '#7758DA', onPri: '#FFFFFF', soft: '#CCC4FF', tagInk: '#482E8E', bars: ['#CCC4FF', '#B0A2FE', '#937CF1', '#7758DA', '#482E8E'] },
    sw: [['100', '#F3F1FF'], ['200', '#E3E0FF'], ['300', '#CCC4FF'], ['400', '#B0A2FE'], ['500', '#937CF1'], ['600', '#7758DA'], ['700', '#5E3EB6'], ['800', '#482E8E'], ['900', '#322163']],
    desc: '整个界面只用一个色相（这里是紫，OKLCH 色相约 290°），从最浅的 100 到最深的 900 共 9 级：浅的做背景和标签，中间的做按钮和图表，深的做文字。统一、稳重、品牌感强，不会出现配色冲突。',
    more: '这就是 Tailwind、Material 等设计系统里「100–900」色阶的意思：同一色相按明度分级。这组色阶在 OKLCH 色彩空间里按明度均匀生成，所以过渡看起来很匀。单色阶的风险是单调，可以加一组中性灰，或一点小面积的互补色调剂。',
    kw: ['色阶', '100–900', '同色系', '统一'] },
  { code: 'C12', name: '冷静蓝绿', en: 'Calm teal', meta: '冷静 · 清爽',
    u: { bg: '#E6F0EE', card: '#FBFDFC', ink: '#102A2A', mut: '#4C6865', line: '#D4E3E0', pri: '#11706A', onPri: '#FFFFFF', soft: '#FBE7D8', tagInk: '#94491F', bars: ['#11706A', '#3FA59A', '#8CCFC4', '#E39B6B', '#2D4F4C'] },
    sw: [['雾绿', '#E6F0EE'], ['深青', '#11706A'], ['湖青', '#3FA59A'], ['浅青', '#8CCFC4'], ['杏', '#E39B6B'], ['墨绿', '#102A2A']],
    desc: '以深青 #11706A 为主色，配浅青和带绿调的浅灰底，再用一点杏色做强调。冷静、可信、清爽，常见于医疗、金融和学习工具。蓝绿让人专注而不紧张，适合需要长时间停留的学习页面。',
    more: '蓝绿介于蓝（理性）和绿（放松）之间。强调色杏 #E39B6B 是蓝绿的近似互补色，只用在标签和一根柱子上，让画面不至于太冷。深青上放白字对比度 5.9:1，满足正文要求。',
    kw: ['蓝绿', '深青', '清爽', '专注'] },
  { code: 'C13', name: '日落渐变', en: 'Sunset', meta: '渐变 · 暖调', dark: true, cls: 'co-sunset',
    u: { bg: 'linear-gradient(165deg,#2E1A47 0%,#8E2C6E 40%,#E0475E 68%,#F98B4F 86%,#FFC870 100%)', card: 'rgba(255,255,255,.93)', ink: '#2E1A47', mut: '#68486B', line: '#F0DCE3', pri: 'linear-gradient(90deg,#C9365A,#EE6A3C)', onPri: '#FFFFFF', soft: '#F7E1EC', tagInk: '#8E2C6E', bars: ['#2E1A47', '#8E2C6E', '#E0475E', '#F98B4F', '#FFC870'] },
    sw: [['暮紫', '#2E1A47'], ['梅紫', '#8E2C6E'], ['玫瑰', '#E0475E'], ['橘', '#F98B4F'], ['金', '#FFC870']],
    desc: '从暮紫、梅紫、玫瑰红到橘色和金色的渐变，像傍晚的天空。热烈、浪漫、有情绪，常用于首屏背景、海报和按钮。卡片保持白色，让渐变只出现在背景和少数关键元素上。',
    more: '渐变好看的要点是相邻颜色色相接近（紫 → 红 → 橙 → 黄是色环上连续的一段），过渡才干净；跳得太远（如蓝到橙）中间会发灰。按钮可以截取渐变里的一段（玫瑰到橘）。渐变背景上的文字要放进卡片，不要直接压在渐变上。',
    kw: ['渐变', '暮紫', '橘金', '热烈'] },
  { code: 'C14', name: '墨水与纸', en: 'Ink & paper', meta: '学术 · 印刷感', cls: 'co-paper',
    u: { bg: '#EFE9DD', card: '#FBF8F1', ink: '#1D1C1A', mut: '#5E584E', line: '#DCD3C3', pri: '#1D1C1A', onPri: '#FBF8F1', soft: 'transparent', tagInk: '#8E1F1B', tagLine: '#8E1F1B', bars: ['#1D1C1A', '#5E584E', '#9A9284', '#C9C0AF', '#8E1F1B'] },
    sw: [['米白', '#EFE9DD'], ['纸', '#FBF8F1'], ['墨', '#1D1C1A'], ['灰墨', '#5E584E'], ['淡墨', '#9A9284'], ['暗红', '#8E1F1B']],
    desc: '米白的纸、墨黑的字、几级灰墨，加一个暗红做批注和标签。像一本印刷精良的教科书：安静、严谨、可信，最适合长篇阅读与学术内容，比如数学讲义。',
    more: '暗红 #8E1F1B 来自传统印刷里的「第二色」（红色标题、批注）。纸色不用纯白，偏暖的 #FBF8F1 长时间看更舒服。按钮用墨黑，卡片用细线描边代替阴影，保持「纸面」的感觉。和 S01 学术手稿、S02 研究期刊是同一个家族。',
    kw: ['米白纸', '墨黑', '暗红', '学术', '印刷'] }
];

const coCss = (s) => {
  const u = s.u;
  const name = (hex) => (s.sw.find(([, h]) => h === hex) || [])[0];
  const row = (k, v, note) => `  --${k}: ${v};${note ? ` /* ${note} */` : ''}`;
  const bg = u.bg.startsWith('linear') ? u.bg.replace(/,(?=#)/g, ', ') : u.bg;
  return [':root {',
    row('bg', bg, `${name(u.bg) || '背景'} · 大面积`),
    row('surface', u.card, '卡片'),
    row('text', u.ink, `${name(u.ink) || '正文'} · 正文`),
    row('muted', u.mut, '次要文字'),
    row('primary', u.pri, `${name(u.pri) || '主色'} · 按钮`),
    row('on-primary', u.onPri, '按钮上的字'),
    `  --tag-bg: ${u.soft}; --tag-text: ${u.tagInk};`,
    `  --chart-1: ${u.bars[0]}; --chart-2: ${u.bars[1]}; --chart-3: ${u.bars[2]};`,
    `  --chart-4: ${u.bars[3]}; --chart-5: ${u.bars[4]};`,
    '}'].join('\n');
};

registerPages('C', [
  { type: 'gallery', token: 'color-sets', title: '配色方案', min: 340,
    intro: '十四套现成色板，全部套在同一张「学习卡片」上：标签、标题、正文、进度条、主按钮和一个小柱状图。横向比较，就能看出每套颜色的情绪。下方色条标出每个颜色的名字和 hex。',
    tiles: CO_SETS.map((s) => ({
      code: s.code, name: s.name, en: s.en, meta: s.meta, desc: s.desc, more: s.more, kw: s.kw, links: s.links,
      bg: s.u.bg, dark: !!s.dark, ratio: '5 / 4', css: coCss(s),
      html: `<div class="co-set ${s.cls || ''}" style="${coVars(s.u)}">${coUI(s.u, s.cls === 'co-retro' ? '<i class="co-rainbow"></i>' : '', s.cls === 'co-darkui' ? '<span class="co-pop">本周 +12%</span>' : '')}${coChips(s.sw)}</div>`
    }))
  },
  { type: 'custom', token: 'color-wheel', title: '配色关系',
    intro: '在色环上拖动选一个基色，再选一种「关系」，就会按色环几何生成一套 5 色色板，并立刻套到同一张学习卡片上。右下角可以检查任意两色的对比度是否够用。',
    render: coWheelPage }
]);

// —— 配色关系实验台 ——
const CO_MODES = [
  { id: 'mono', name: '单色', en: 'Mono', say: '只用一个色相，靠深浅变化。最稳妥、最统一，但容易单调。', geo: '同一色相 · 不同明度' },
  { id: 'analog', name: '类似色', en: 'Analogous', say: '色环上相邻的几个颜色（各差 20°），像同一片风景里的颜色，和谐柔和。', geo: '相邻 ±20° / ±40°' },
  { id: 'comp', name: '互补色', en: 'Complementary', say: '色环上正对面的两色（相差 180°），对比最强烈；一个做主色，另一个只做小面积强调。', geo: '对面 180°' },
  { id: 'split', name: '分裂互补', en: 'Split comp.', say: '不用正对面的颜色，而用它两侧的两个（±30°）。对比仍然鲜明，但比互补色温和、好搭。', geo: '180° ± 30°' },
  { id: 'triad', name: '三角', en: 'Triadic', say: '色环上等分的三个颜色（各差 120°），活泼、丰富；通常一个做主角，另两个降低面积。', geo: '等边三角形 · 120°' },
  { id: 'tetra', name: '矩形', en: 'Tetradic', say: '两对互补色组成一个矩形（0°、60°、180°、240°）。颜色最多、最难平衡，要选一个绝对主色。', geo: '两对互补 · 矩形' }
];
function coGen(h, s, l, mode) {
  const H = (x) => ((x % 360) + 360) % 360;
  const C = (v, a, b) => Math.max(a, Math.min(b, v));
  const c = (dh, ds = 0, dl = 0) => ({ h: H(h + dh), s: C(s + ds, 0, 100), l: C(l + dl, 6, 95) });
  const shade = l > 55 ? -24 : 24;
  switch (mode) {
    case 'mono': {
      // 基色本身一定在色板里：其余 4 个按 15% 明度台阶排在它两侧
      const k = [2, 1, 3, 0, 4].find((j) => l - 15 * j >= 5 && l + 15 * (4 - j) <= 97) ?? 2;
      return [0, 1, 2, 3, 4].map((i) => ({ h: H(h), s: C(s - Math.abs(k - i) * 5, 0, 100), l: C(l + 15 * (i - k), 4, 97) }));
    }
    case 'analog': return [c(-40), c(-20), c(0), c(20), c(40)];
    case 'comp': return [c(0, -10, shade), c(0), c(0, -25, l > 50 ? 30 : 46), c(180), c(180, -8, shade)];
    case 'split': return [c(0, 0, shade), c(0), c(150), c(210), c(0, -30, l > 50 ? 32 : 48)];
    case 'triad': return [c(0), c(120), c(240), c(0, 0, shade), c(0, -30, l > 50 ? 32 : 48)];
    default: return [c(0), c(60), c(180), c(240), c(0, 0, shade)];
  }
}
// 每种关系里哪几个是「色环上的点」（用来连几何图形）；基色、第二关键色在色板里的位置（-1 = 按明度找）
const CO_KEYS = { mono: [0], analog: [-40, -20, 0, 20, 40], comp: [0, 180], split: [0, 150, 210], triad: [0, 120, 240], tetra: [0, 60, 180, 240] };
const CO_ROLE = { mono: [-1, 0], analog: [2, 4], comp: [1, 3], split: [1, 2], triad: [0, 1], tetra: [0, 2] };
const CO_TESTS = [['AA', '正文', 4.5], ['AA', '大字', 3], ['AAA', '正文', 7], ['AAA', '大字', 4.5]];

function coWheelPage(body, ctx) {
  const st = { h: 212, s: 68, l: 50, mode: 'comp', dark: false, fg: 'w', bg: 'base' };
  const custom = { fg: '#1D4ED8', bg: '#FFF7E6' };
  body.innerHTML = `<div class="co-lab">
    <section class="co-panel co-wp">
      <div class="co-wheel no-pagekeys" tabindex="0" role="slider" aria-label="基色色相" aria-valuemin="0" aria-valuemax="359">
        <div class="co-ring"></div>
        <svg class="co-geo" viewBox="0 0 300 300" aria-hidden="true"><g class="co-g-lines"></g><circle class="co-g-core" cx="150" cy="150" r="30"/><g class="co-g-dots"></g></svg>
      </div>
      <p class="co-cap"><code class="co-cap-hex"></code><span class="co-cap-g"></span></p>
      <p class="co-hint">拖动色环或圆点改变色相 · 聚焦后可用方向键微调</p>
      <div class="co-modes no-pagekeys" role="radiogroup" aria-label="配色关系">${CO_MODES.map((m) => `<button type="button" role="radio" data-m="${m.id}"><b>${m.name}</b><span>${m.en}</span></button>`).join('')}</div>
      <p class="co-say"></p>
      <div class="co-sliders">
        <label class="co-range"><span>饱和度</span><input type="range" min="0" max="100" data-k="s"><output></output></label>
        <label class="co-range"><span>明度</span><input type="range" min="8" max="92" data-k="l"><output></output></label>
        <label class="co-range co-hexrow"><span>输入基色</span><input class="co-hexin" type="text" maxlength="7" spellcheck="false" autocomplete="off" aria-label="基色 hex"><output class="co-hexmsg"></output></label>
      </div>
    </section>
    <div class="co-rt">
      <section class="co-panel">
        <div class="co-ph"><h3>生成的色板</h3><div class="co-acts"><button type="button" class="co-act" data-copy="list">复制整套</button><button type="button" class="co-act" data-copy="css">复制为 CSS 变量</button></div></div>
        <div class="co-pal"></div>
        <p class="co-note">点单个色块复制它的 hex。<span class="co-copied" aria-live="polite"></span></p>
      </section>
      <div class="co-two">
        <section class="co-panel">
          <div class="co-ph"><h3>套在界面上</h3><div class="co-seg" role="group" aria-label="预览底色"><button type="button" data-dk="0">浅底</button><button type="button" data-dk="1">深底</button></div></div>
          <div class="co-pv"></div>
          <p class="co-note">基色做按钮和进度条，第二个关键色做标签，柱子依次用色板里的 5 个颜色；底色和文字是从基色派生的浅灰 / 深灰。</p>
        </section>
        <section class="co-panel co-cc">
          <div class="co-ph"><h3>对比度检查</h3><button type="button" class="co-act co-swap">⇄ 交换</button></div>
          <div class="co-pick"><span>文字</span><div class="co-opts" data-role="fg"></div></div>
          <div class="co-pick"><span>背景</span><div class="co-opts" data-role="bg"></div></div>
          <div class="co-sample"><b>幂级数 Aa</b><span>在收敛半径内，幂级数可以逐项求导。</span></div>
          <div class="co-ratio"><b></b><span>: 1</span><em></em></div>
          <ul class="co-wcag"></ul>
          <p class="co-note">WCAG 标准：正文至少 4.5 : 1（AA），大字（≥ 24px，或 ≥ 18.7px 粗体）至少 3 : 1；更严格的 AAA 分别是 7 和 4.5。</p>
        </section>
      </div>
    </div>
  </div>`;
  const $ = (s) => body.querySelector(s);
  const wheel = $('.co-wheel'), ring = $('.co-ring'), gLines = $('.co-g-lines'), gDots = $('.co-g-dots');
  const sIn = $('[data-k="s"]'), lIn = $('[data-k="l"]'), hexIn = $('.co-hexin');
  let pal = [], hexes = [], baseIdx = 0, secIdx = 0;

  // 用色板派生出界面的各个角色
  function uiColors() {
    const b = pal[baseIdx], base = hexes[baseIdx], second = hexes[secIdx], sec = pal[secIdx];
    const S = Math.min(b.s, 60);
    const u = st.dark
      ? { bg: coHsl2Hex(b.h, S * 0.3, 8), card: coHsl2Hex(b.h, S * 0.22, 13), ink: coHsl2Hex(b.h, S * 0.15, 92), mut: coHsl2Hex(b.h, S * 0.12, 70), line: coHsl2Hex(b.h, S * 0.15, 22) }
      : { bg: coHsl2Hex(b.h, S * 0.5, 95), card: '#FFFFFF', ink: coHsl2Hex(b.h, S * 0.5, 15), mut: coHsl2Hex(b.h, S * 0.25, 38), line: coHsl2Hex(b.h, S * 0.3, 88) };
    return Object.assign(u, {
      pri: base, onPri: coOn(base),
      soft: `color-mix(in srgb, ${second} ${st.dark ? 28 : 22}%, ${u.card})`,
      tagInk: st.dark ? coHsl2Hex(sec.h, Math.min(sec.s, 85), Math.max(sec.l, 74)) : coHsl2Hex(sec.h, Math.min(sec.s, 85), Math.min(sec.l, 32)),
      bars: hexes
    });
  }

  function draw() {
    pal = coGen(st.h, st.s, st.l, st.mode);
    hexes = pal.map((p) => coHsl2Hex(p.h, p.s, p.l));
    const [bi, si] = CO_ROLE[st.mode];
    baseIdx = bi >= 0 ? bi : pal.reduce((k, p, i) => (Math.abs(p.l - st.l) < Math.abs(pal[k].l - st.l) ? i : k), 0);
    secIdx = st.mode === 'mono' ? (st.l > 50 ? 0 : 4) : si;
    const baseHex = coHsl2Hex(st.h, st.s, st.l);
    const m = CO_MODES.find((x) => x.id === st.mode);
    // 色环（按当前饱和度绘制，明度限制在能看清的范围）
    const rl = Math.max(34, Math.min(70, st.l)), rs = Math.max(st.s, 10);
    ring.style.background = `conic-gradient(${Array.from({ length: 13 }, (_, i) => `hsl(${i * 30} ${rs}% ${rl}%)`).join(',')})`;
    const R = 128;
    const pt = (deg) => [150 + R * Math.sin(deg * Math.PI / 180), 150 - R * Math.cos(deg * Math.PI / 180)];
    const keys = CO_KEYS[st.mode].map((d) => ((st.h + d) % 360 + 360) % 360);
    const ps = keys.map(pt);
    const f = (v) => v.toFixed(1);
    let lines = ps.map(([x, y]) => `<line x1="150" y1="150" x2="${f(x)}" y2="${f(y)}"/>`).join('');
    if (ps.length > 2) lines = `<polygon points="${ps.map((p) => `${f(p[0])},${f(p[1])}`).join(' ')}"/>` + lines;
    if (st.mode === 'mono') {
      // 单色：在辐条上标出 5 个明度台阶
      lines += pal.map((p, i) => { const r = 40 + (i / 4) * 64; return `<circle class="co-g-step" cx="${f(150 + r * Math.sin(st.h * Math.PI / 180))}" cy="${f(150 - r * Math.cos(st.h * Math.PI / 180))}" r="6" fill="${hexes[i]}"/>`; }).join('');
    }
    gLines.innerHTML = lines;
    gDots.innerHTML = keys.map((k, i) => {
      const isBase = CO_KEYS[st.mode][i] === 0;
      return `<circle cx="${f(ps[i][0])}" cy="${f(ps[i][1])}" r="${isBase ? 16.5 : 11}" fill="${coHsl2Hex(k, st.s, st.l)}" class="${isBase ? 'co-dot co-dot-base' : 'co-dot'}"/>`;
    }).join('');
    $('.co-g-core').setAttribute('fill', baseHex);
    $('.co-cap-hex').textContent = baseHex;
    $('.co-cap-g').textContent = `H ${Math.round(st.h)}° · ${m.name}：${m.geo}`;
    wheel.setAttribute('aria-valuenow', String(Math.round(st.h)));
    wheel.setAttribute('aria-valuetext', `色相 ${Math.round(st.h)} 度，${baseHex}`);
    body.querySelectorAll('.co-modes button').forEach((bt) => {
      const on = bt.dataset.m === st.mode;
      bt.setAttribute('aria-checked', String(on)); bt.tabIndex = on ? 0 : -1;
    });
    $('.co-say').innerHTML = `<b>${m.name}</b>${m.say}`;
    sIn.value = st.s; lIn.value = st.l;
    sIn.nextElementSibling.textContent = `${Math.round(st.s)}%`;
    lIn.nextElementSibling.textContent = `${Math.round(st.l)}%`;
    sIn.style.setProperty('--co-track', `linear-gradient(90deg, hsl(${st.h} 0% ${st.l}%), hsl(${st.h} 100% ${st.l}%))`);
    lIn.style.setProperty('--co-track', `linear-gradient(90deg, #000, hsl(${st.h} ${st.s}% 50%), #fff)`);
    if (document.activeElement !== hexIn) hexIn.value = baseHex;
    $('.co-pal').innerHTML = hexes.map((x, i) => `<button type="button" class="co-pc" data-i="${i}" style="background:${x};color:${coOn(x)}" aria-label="复制 ${x}"><span>${i === baseIdx ? '基色' : i === secIdx ? '第二色' : ''}</span><code>${x}</code><small>H ${Math.round(pal[i].h)} · S ${Math.round(pal[i].s)} · L ${Math.round(pal[i].l)}</small></button>`).join('');
    const u = uiColors();
    $('.co-pv').innerHTML = `<div class="co-set co-nochips" style="${coVars(u)}">${coUI(u)}</div>`;
    body.querySelectorAll('.co-seg button').forEach((bt) => bt.setAttribute('aria-pressed', String(+bt.dataset.dk === +st.dark)));
    renderOpts(); sample();
  }

  // —— 对比度检查 ——
  const keyOf = (role) => (st[role] === 'base' ? String(baseIdx) : st[role]);
  const colorOf = (role) => { const k = keyOf(role); return k === 'w' ? '#FFFFFF' : k === 'k' ? '#141414' : k === 'c' ? custom[role] : hexes[+k]; };
  function renderOpts() {
    for (const role of ['fg', 'bg']) {
      const k0 = keyOf(role);
      const opts = [...hexes.map((x, i) => [String(i), x, `色板第 ${i + 1} 色`]), ['w', '#FFFFFF', '白'], ['k', '#141414', '近黑']];
      body.querySelector(`.co-opts[data-role="${role}"]`).innerHTML = opts.map(([k, x, n]) => `<button type="button" class="co-o" data-k="${k}" style="--co-o:${x}" aria-pressed="${k0 === k}" aria-label="${n} ${x}" title="${x}"></button>`).join('')
        + `<label class="co-o co-oc${k0 === 'c' ? ' on' : ''}" style="--co-o:${custom[role]}" title="自定义颜色"><input type="color" value="${custom[role].toLowerCase()}" aria-label="自定义${role === 'fg' ? '文字' : '背景'}色"></label>`;
    }
  }
  function sample() {
    const fg = colorOf('fg'), bg = colorOf('bg'), r = coRatio(fg, bg), smp = $('.co-sample');
    smp.style.background = bg; smp.style.color = fg;
    $('.co-ratio b').textContent = r.toFixed(2);
    $('.co-ratio em').textContent = `${fg} / ${bg}`;
    $('.co-wcag').innerHTML = CO_TESTS.map(([lv, k, n]) => `<li class="${r >= n ? 'co-ok' : 'co-no'}"><b>${r >= n ? '✓' : '✕'}</b><span>${lv} ${k}</span><small>≥ ${n}</small></li>`).join('');
  }

  // —— 色环拖动（pointer events，支持触摸）——
  let drag = null;
  const angleAt = (e) => {
    const r = wheel.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    return { a: (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360, d: Math.hypot(dx, dy) / (r.width / 2) };
  };
  wheel.addEventListener('pointerdown', (e) => {
    const { a, d } = angleAt(e);
    if (d < 0.3) return;
    let off = 0, best = 24; // 抓住最近的点：拖次要点时整组一起转
    for (const k of CO_KEYS[st.mode]) {
      const diff = Math.abs((((a - (st.h + k)) % 360) + 540) % 360 - 180);
      if (diff < best) { best = diff; off = k; }
    }
    drag = off;
    try { wheel.setPointerCapture(e.pointerId); } catch { /* 忽略 */ }
    wheel.classList.add('co-dragging');
    st.h = ((a - off) % 360 + 360) % 360; draw();
    e.preventDefault();
  });
  wheel.addEventListener('pointermove', (e) => { if (drag !== null) { st.h = ((angleAt(e).a - drag) % 360 + 360) % 360; draw(); } });
  const end = () => { drag = null; wheel.classList.remove('co-dragging'); };
  wheel.addEventListener('pointerup', end);
  wheel.addEventListener('pointercancel', end);
  wheel.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 15 : 3;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') st.h = (st.h + step) % 360;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') st.h = (st.h - step + 360) % 360;
    else return;
    e.preventDefault(); draw();
  });
  const modes = $('.co-modes');
  modes.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { st.mode = b.dataset.m; draw(); } });
  modes.addEventListener('keydown', (e) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const i = CO_MODES.findIndex((m) => m.id === st.mode);
    st.mode = CO_MODES[(i + dir + CO_MODES.length) % CO_MODES.length].id; draw();
    modes.querySelector(`[data-m="${st.mode}"]`).focus();
  });
  [sIn, lIn].forEach((inp) => inp.addEventListener('input', () => { st[inp.dataset.k] = +inp.value; draw(); }));
  hexIn.addEventListener('input', () => {
    const v = hexIn.value.trim(), msg = $('.co-hexmsg');
    if (/^#?[0-9a-f]{6}$/i.test(v)) {
      const c = coHex2Hsl(v.startsWith('#') ? v : `#${v}`);
      Object.assign(st, { h: c.h, s: c.s, l: Math.max(8, Math.min(92, c.l)) });
      msg.textContent = ''; draw();
    } else msg.textContent = v.replace('#', '').length >= 6 ? '格式如 #3B82F6' : '';
  });
  hexIn.addEventListener('blur', () => { hexIn.value = coHsl2Hex(st.h, st.s, st.l); $('.co-hexmsg').textContent = ''; });
  hexIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') hexIn.blur(); });
  const flash = (t) => { const c = $('.co-copied'); c.textContent = t; ctx.later(1800, () => { if (c.textContent === t) c.textContent = ''; }); };
  $('.co-pal').addEventListener('click', async (e) => {
    const b = e.target.closest('.co-pc'); if (!b) return;
    const x = hexes[+b.dataset.i];
    flash(await coCopy(x) ? `已复制 ${x}` : '复制失败，请手动选择');
  });
  body.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const m = CO_MODES.find((x) => x.id === st.mode);
    const text = b.dataset.copy === 'list' ? hexes.join(', ')
      : `/* ${m.name}（${m.en}）· 基色 ${hexes[baseIdx]} */\n:root {\n${hexes.map((x, i) => `  --color-${i + 1}: ${x};${i === baseIdx ? ' /* 基色 */' : ''}`).join('\n')}\n}`;
    const ok = await coCopy(text);
    const old = b.dataset.label || (b.dataset.label = b.textContent);
    b.textContent = ok ? '已复制 ✓' : '复制失败';
    ctx.later(1400, () => { b.textContent = old; });
  }));
  $('.co-seg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { st.dark = b.dataset.dk === '1'; draw(); } });
  const cc = $('.co-cc');
  cc.addEventListener('click', (e) => {
    const o = e.target.closest('button.co-o');
    if (o) { st[o.closest('.co-opts').dataset.role] = o.dataset.k; renderOpts(); sample(); return; }
    if (e.target.closest('.co-swap')) {
      const a = keyOf('fg'), b = keyOf('bg');
      st.fg = b; st.bg = a; [custom.fg, custom.bg] = [custom.bg, custom.fg];
      renderOpts(); sample();
    }
  });
  // 自定义颜色：拖动取色器时只更新样张，不重绘选项（否则取色器会被关掉）
  cc.addEventListener('input', (e) => {
    if (e.target.type !== 'color') return;
    const role = e.target.closest('.co-opts').dataset.role;
    custom[role] = e.target.value.toUpperCase(); st[role] = 'c';
    const lab = e.target.closest('.co-oc'); lab.style.setProperty('--co-o', custom[role]); lab.classList.add('on');
    e.target.closest('.co-opts').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    sample();
  });
  draw();
}
