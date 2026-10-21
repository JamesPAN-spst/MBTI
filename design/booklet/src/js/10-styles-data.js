  const STYLES = [
    {
      id: 'tufte', no: '01', name: '学术手稿', orig: "Tufte 式 · Academic handout",
      tag: '旁注、宽边距、近乎无色',
      font: "'EB Garamond','Noto Serif SC',serif", bg: '#fffff8', ink: '#111111', accent: '#9a9a9a',
      desc: '仿照 Edward Tufte 的书与讲义：一栏正文，宽阔的右边距放旁注和图注，几乎不用颜色。层级靠字号、字形和位置区分，而不是靠边框和色块。',
      cases: [['Tufte CSS', 'https://edwardtufte.github.io/tufte-css/'], ['Edward Tufte 官网', 'https://www.edwardtufte.com/'], ['《The Visual Display of Quantitative Information》', '']],
      moves: ['旁注代替脚注，眼睛不必跳到页底', '图注放进边距，图与正文对齐', '小型大写字母开启段落和定理', '图表去掉多余的框线与网格'],
      fonts: [['EB Garamond', "'EB Garamond',serif", 'Aa'], ['Noto Serif SC', "'Noto Serif SC',serif", '幂级数']],
      palette: [['纸', '#fffff8'], ['墨', '#111111'], ['注', '#555555'], ['曲线', '#9a9a9a']],
      r: [5, 5, 2, 3], cost: '低',
      good: '长篇证明、讲义、需要大量旁注的章节。', bad: '交互多、需要醒目导航的页面；宽边距在手机上必须折叠。'
    },
    {
      id: 'journal', no: '02', name: '研究期刊', orig: 'Distill 式 · Web-native research article',
      tag: '元数据栏、宽图、悬停脚注',
      font: "'Source Serif 4','Noto Serif SC',serif", bg: '#ffffff', ink: '#1b1b1b', accent: '#2f6fb5',
      desc: '为网页重新设计的学术论文：大标题、作者与元数据栏、比正文更宽的交互图、悬停脚注和规范的参考文献。严谨，同时把交互当作论证的一部分。',
      cases: [['Distill', 'https://distill.pub/'], ['Transformer Circuits Thread', 'https://transformer-circuits.pub/'], ['Quarto 文章版式', 'https://quarto.org/docs/authoring/article-layout.html']],
      moves: ['标题下的元数据栏（章节、等级、日期、引用）', '图比正文宽一级，图号与图注规范', '悬停显示脚注，不打断阅读', '用颜色区域直接画出误差'],
      fonts: [['Source Serif 4', "'Source Serif 4',serif", 'Aa'], ['Source Sans 3', "'Source Sans 3',sans-serif", 'Aa'], ['Noto Serif SC', "'Noto Serif SC',serif", '幂级数']],
      palette: [['纸', '#ffffff'], ['墨', '#1b1b1b'], ['图底', '#f7f7f7'], ['蓝', '#2f6fb5'], ['橙', '#e07b39']],
      r: [5, 5, 4, 4], cost: '中',
      good: '教材正文：定理、证明、图表混排的章节。', bad: '首页或需要强烈视觉记忆点的页面。'
    },
    {
      id: 'explore', no: '03', name: '可探索解释', orig: 'Explorable explanations',
      tag: '可拖动的数字、分步揭示',
      font: "'Nunito','Noto Sans SC',sans-serif", bg: '#f3f6fa', ink: '#2b3440', accent: '#ff7a45',
      desc: '把读者放进论证里：正文里的数字可以拖动，图形随之变化；解释一步一步展开，读者先动手，再读结论。Bret Victor 在 2011 年提出了这个概念。',
      cases: [['Bartosz Ciechanowski', 'https://ciechanow.ski/'], ['Mathigon', 'https://mathigon.org/'], ['Seeing Theory', 'https://seeing-theory.brown.edu/'], ['Bret Victor《Explorable Explanations》', 'https://worrydream.com/ExplorableExplanations/']],
      moves: ['行内可拖动的数字（reactive document）', '先给图，再给文字', '「下一步」分步揭示推理', '柔和的底色衬托交互元素'],
      fonts: [['Nunito', "'Nunito',sans-serif", 'Aa'], ['Noto Sans SC', "'Noto Sans SC',sans-serif", '幂级数']],
      palette: [['白', '#ffffff'], ['墨', '#2b3440'], ['浅底', '#f3f6fa'], ['蓝', '#3b82c4'], ['橙', '#ff7a45']],
      r: [4, 3, 5, 4], cost: '高',
      good: '概念引入、建立直觉、演示多的章节。', bad: '严格的长证明；每个交互都要单独设计，制作成本最高。'
    },
    {
      id: 'chalk', no: '04', name: '黑板动画', orig: '3Blue1Brown / Manim 式',
      tag: '深色舞台、颜色即变量',
      font: "'STIX Two Text','Noto Serif SC',serif", bg: '#1c1c1c', ink: '#ece9e4', accent: '#58c4dd',
      desc: '深灰底上的彩色曲线和公式，同一个对象在图里和公式里用同一种颜色。动画让变化本身可见：改变阶数时，曲线被重新「画」出来。',
      cases: [['3Blue1Brown', 'https://www.3blue1brown.com/'], ['Manim（3b1b 版）', 'https://github.com/3b1b/manim'], ['Manim Community', 'https://www.manim.community/']],
      moves: ['颜色即变量：公式里的项与图中曲线同色', '深色舞台突出图形', '绘制动画展示变化过程', '「播放」按钮代替大段描述'],
      fonts: [['STIX Two Text', "'STIX Two Text',serif", 'Aa'], ['Noto Serif SC', "'Noto Serif SC',serif", '幂级数']],
      palette: [['黑板', '#1c1c1c'], ['粉笔', '#ece9e4'], ['蓝', '#58c4dd'], ['黄', '#f7d96f'], ['棕', '#cd853f']],
      pnote: '色值是社区常用的近似值，不是官方规范。',
      r: [3, 5, 5, 3], cost: '中',
      good: '深色模式、以演示和动画为主的页面、配合视频的讲解。', bad: '长时间阅读：深底上的大段文字更累眼。'
    },
    {
      id: 'keynote', no: '05', name: '发布会', orig: 'Apple 产品页式 · Keynote',
      tag: '巨型标题、bento 网格',
      font: "-apple-system,BlinkMacSystemFont,'SF Pro Display','PingFang SC','Noto Sans SC',sans-serif", bg: '#f5f5f7', ink: '#1d1d1f', accent: '#0071e3',
      desc: '大字号短标题、大量留白、黑白区块交替，信息切成一格一格的卡片（bento 网格）。每屏只说一件事，像产品发布会的幻灯片。',
      cases: [['Apple 产品页', 'https://www.apple.com/'], ['Apple Human Interface Guidelines', 'https://developer.apple.com/design/human-interface-guidelines/']],
      moves: ['超大标题、收紧字距', 'bento 网格把要点拆成卡片', '分段控件、药丸按钮', '一块黑色卡片做视觉重心'],
      fonts: [['系统字体（苹果设备上是 SF Pro 与苹方）', "-apple-system,BlinkMacSystemFont,'PingFang SC','Noto Sans SC',sans-serif", 'Aa 幂']],
      palette: [['白', '#ffffff'], ['浅灰', '#f5f5f7'], ['墨', '#1d1d1f'], ['灰', '#6e6e73'], ['蓝', '#0071e3']],
      r: [2, 2, 4, 4], cost: '中',
      good: '首页、章节导览、成果展示。', bad: '定理和长证明：卡片会把论证切碎。'
    },
    {
      id: 'darktech', no: '06', name: '暗色工程', orig: 'Linear / Vercel 式',
      tag: '发丝线、等宽标签、微光',
      font: "'Geist','Noto Sans SC',sans-serif", bg: '#08090a', ink: '#f7f8f8', accent: '#8b93ff',
      desc: '近黑的冷色底、1 像素发丝线、等宽字体的标签和快捷键提示，一个克制的强调色加一点光晕。看起来像一件精密的工具，而不是一本书。',
      cases: [['Linear', 'https://linear.app/'], ['Vercel', 'https://vercel.com/'], ['Raycast', 'https://www.raycast.com/']],
      moves: ['发丝线代替阴影来划分结构', '等宽字体标注元数据', '键盘快捷键提示（点样品后按 [ 或 ]）', '强调色只用在一处，带微光'],
      fonts: [['Geist', "'Geist',sans-serif", 'Aa'], ['Geist Mono', "'Geist Mono',monospace", 'Aa'], ['Noto Sans SC', "'Noto Sans SC',sans-serif", '幂级数']],
      palette: [['底', '#08090a'], ['面', '#101113'], ['线', '#1f2023'], ['字', '#f7f8f8'], ['灰', '#8a8f98'], ['靛', '#8b93ff']],
      r: [3, 3, 4, 4], cost: '中',
      good: '深色模式，工具型页面（题库、索引、搜索）。', bad: '教材正文：小字号和低对比，长时间阅读吃力。'
    },
    {
      id: 'editorial', no: '07', name: '杂志专题', orig: 'Editorial · Quanta / Stripe Press 式',
      tag: '导语、首字下沉、引语',
      font: "'Newsreader','Noto Serif SC',serif", bg: '#ffffff', ink: '#141414', accent: '#1f4ed8',
      desc: '科普杂志的专题报道：大号衬线标题、导语、署名、首字下沉、引语和配图说明。文字有叙事节奏，适合把一个定理讲成一个故事。',
      cases: [['Quanta Magazine', 'https://www.quantamagazine.org/'], ['Stripe Press', 'https://press.stripe.com/'], ['The Pudding', 'https://pudding.cool/']],
      moves: ['标题与导语形成两级', '首字下沉与引语制造节奏', '宽屏下分两栏', '插图配说明与来源'],
      fonts: [['Newsreader', "'Newsreader',serif", 'Aa'], ['Archivo Narrow', "'Archivo Narrow',sans-serif", 'Aa'], ['Noto Serif SC', "'Noto Serif SC',serif", '幂级数']],
      palette: [['纸', '#ffffff'], ['墨', '#141414'], ['灰', '#5c5c5c'], ['线', '#d9d9d9'], ['钴蓝', '#1f4ed8']],
      r: [5, 3, 3, 4], cost: '中',
      good: '章节导读、历史注记、开放问题专题。', bad: '定理密集的部分：杂志版式不擅长编号体系。'
    },
    {
      id: 'swiss', no: '08', name: '瑞士网格', orig: 'International Typographic Style',
      tag: '模块网格、红黑白',
      font: "'Archivo','Noto Sans SC',sans-serif", bg: '#ffffff', ink: '#000000', accent: '#e2001a',
      desc: '严格的模块网格、齐左不齐右、无衬线字体、大号数字，红黑白三色。秩序本身就是装饰。样品右上角可以打开网格，看到所有元素对齐的骨架。',
      cases: [['Swiss Style（维基百科）', 'https://en.wikipedia.org/wiki/Swiss_Style_(design)'], ['NYCTA Graphics Standards Manual', 'https://standardsmanual.com/'], ['Müller-Brockmann《Grid Systems in Graphic Design》', '']],
      moves: ['12 栏网格，元素严格对齐', '大号编号作为视觉锚点', '齐左不齐右', '红色只用于最重要的一处'],
      fonts: [['Archivo', "'Archivo',sans-serif", 'Aa'], ['Noto Sans SC', "'Noto Sans SC',sans-serif", '幂级数']],
      palette: [['白', '#ffffff'], ['黑', '#000000'], ['灰', '#8c8c8c'], ['红', '#e2001a']],
      r: [4, 3, 3, 4], cost: '低',
      good: '目录、索引、对照表，以及需要清晰结构的章节。', bad: '需要亲和力的入门内容，整体偏冷。'
    },
    {
      id: 'wa', no: '09', name: '和风留白', orig: '間 Ma · 无印良品 / 原研哉式',
      tag: '留白、竖排、朱印',
      font: "'Noto Serif SC',serif", bg: '#f7f7f5', ink: '#2a2a28', accent: '#b33e2b',
      desc: '大量留白、极细的线、竖排标题和一枚朱红印章。颜色接近纸和墨，行距宽松，节奏缓慢，让读者安静地读。',
      cases: [['无印良品', 'https://www.muji.com/'], ['日本设计中心（原研哉）', 'https://www.ndc.co.jp/'], ['原研哉《设计中的设计》', '']],
      moves: ['竖排标题（writing-mode）', '朱红印章标记定理', '极细线与大间距', '克制的字重与宽松行距'],
      fonts: [['Noto Serif SC 细体', "'Noto Serif SC',serif", '幂级数'], ['Cormorant Garamond', "'Cormorant Garamond',serif", 'Aa 7']],
      palette: [['纸', '#f7f7f5'], ['墨', '#2a2a28'], ['鼠', '#8e8d87'], ['线', '#dcdad3'], ['朱', '#b33e2b']],
      r: [4, 3, 2, 5], cost: '低',
      good: '中文长文、序言、章节扉页。', bad: '信息密度高的页面；交互控件必须格外克制。'
    },
    {
      id: 'brutal', no: '10', name: '新粗野', orig: 'Neo-brutalism',
      tag: '粗边框、硬阴影、平涂色',
      font: "'Bricolage Grotesque','Noto Sans SC',sans-serif", bg: '#ffc900', ink: '#000000', accent: '#ff90e8',
      desc: '粗黑边框、没有模糊的硬阴影、饱和的平涂色块和粗体大字。按钮按下去会「陷进」页面。直接、好玩、记忆点强。',
      cases: [['Gumroad', 'https://gumroad.com/'], ['Neo-brutalism: breaking rules loudly（UX Collective）', 'https://uxdesign.cc/neo-brutalism-breaking-rules-loudly-28a8d815fb5d']],
      moves: ['3 像素黑边框', '硬阴影：偏移、无模糊', '饱和的平涂色块', '贴纸式标签'],
      fonts: [['Bricolage Grotesque', "'Bricolage Grotesque',sans-serif", 'Aa'], ['Noto Sans SC 粗体', "'Noto Sans SC',sans-serif", '幂级数']],
      palette: [['白', '#ffffff'], ['黑', '#000000'], ['粉', '#ff90e8'], ['黄', '#ffc900'], ['青', '#a6faff'], ['蓝', '#2a2aff']],
      r: [2, 2, 4, 3], cost: '低',
      good: '练习题、小测验、游戏化的部分。', bad: '正文与证明：视觉噪声太大。'
    }
  ];
  const CRIT = ['长文阅读', '定理与公式', '交互演示', '中文排版'];

  // 每种风格的插图参数：同一个函数，不同的笔触
  const PLOT = {
    tufte: { W: 600, H: 250, axis: 'range', grid: 'none', font: "'EB Garamond',serif", fs: 15, c: { axis: '#111', label: '#555', base: '#9a9a9a', approx: '#111' }, w: [1.3, 1.7] },
    journal: { W: 740, H: 300, axis: 'cross', grid: 'lines', font: "'Source Sans 3',sans-serif", fs: 12, c: { grid: '#e6e6e6', axis: '#9a9a9a', label: '#777', base: '#b9b9b9', approx: '#2f6fb5', band: 'rgba(224,123,57,.24)' }, w: [1.6, 2.4] },
    explore: { W: 720, H: 320, axis: 'cross', grid: 'dots', font: "'Nunito',sans-serif", fs: 13, c: { grid: '#cfd9e5', axis: '#97a7ba', label: '#6b7a8f', base: '#9fb2c8', approx: '#3b82c4', band: 'rgba(255,122,69,.2)', mark: '#e8612c' }, w: [2.2, 3.2], marker: true },
    chalk: { W: 640, H: 360, axis: 'cross', grid: 'lines', font: "'STIX Two Text',serif", fs: 15, c: { grid: 'rgba(255,255,255,.07)', axis: 'rgba(255,255,255,.55)', label: 'rgba(255,255,255,.6)', base: '#58c4dd', approx: '#f7d96f' }, w: [3, 3], animate: true },
    keynote: { W: 640, H: 300, axis: 'baseline', grid: 'none', font: "-apple-system,BlinkMacSystemFont,sans-serif", fs: 12, c: { axis: 'rgba(255,255,255,.22)', label: 'rgba(255,255,255,.5)', base: 'rgba(255,255,255,.4)', approx: '#2997ff' }, w: [2, 3.2] },
    darktech: { W: 680, H: 280, axis: 'cross', grid: 'lines', font: "'Geist Mono',monospace", fs: 11, c: { grid: 'rgba(255,255,255,.05)', axis: 'rgba(255,255,255,.18)', label: '#62666d', base: '#62666d', approx: '#8b93ff' }, w: [1.5, 2.2], glow: true },
    editorial: { W: 760, H: 300, axis: 'baseline', grid: 'none', font: "'Archivo Narrow',sans-serif", fs: 13, c: { axis: '#141414', label: '#5c5c5c', base: '#141414', approx: '#1f4ed8', band: 'rgba(31,78,216,.1)' }, w: [1.4, 3.4], dash: '5 5' },
    swiss: { W: 640, H: 280, axis: 'cross', grid: 'none', font: "'Archivo',sans-serif", fs: 13, weight: 700, c: { axis: '#000', label: '#000', base: '#000', approx: '#e2001a' }, w: [1.6, 4] },
    wa: { W: 600, H: 230, axis: 'baseline', grid: 'none', font: "'Cormorant Garamond',serif", fs: 15, c: { axis: '#cfcdc6', label: '#8e8d87', base: '#8e8d87', approx: '#b33e2b' }, w: [1, 1.5] },
    brutal: { W: 640, H: 290, axis: 'cross', grid: 'lines', font: "'Bricolage Grotesque',sans-serif", fs: 13, weight: 800, c: { grid: 'rgba(0,0,0,.12)', axis: '#000', label: '#000', base: '#000', approx: '#2a2aff' }, w: [2.6, 4.6], dash: '7 6' }
  };
