  // —— 术语表：说不清的时候，用这些词 ——
  // [中文, English, 一句话解释, 相关页面 token（可空）]
  const GLOSSARY = [
    { group: '字体与排版', items: [
      ['衬线体', 'Serif', '笔画末端有小「脚」的字体，如宋体、Times。显得正式、书卷气，适合长文。', 'type-latin'],
      ['无衬线体', 'Sans-serif', '笔画末端没有装饰，如黑体、Helvetica。显得现代、干净，适合界面。', 'type-latin'],
      ['等宽体', 'Monospace', '每个字符一样宽，代码和终端用的字体。', 'type-latin'],
      ['展示体', 'Display face', '只适合做大标题的个性字体，正文用会很累。', 'type-latin'],
      ['字重', 'Weight', '笔画粗细，100 最细到 900 最粗；400 是常规，700 是粗体。', 'type-cjk'],
      ['字号', 'Font size', '字的大小。网页正文通常 16–18px。', 'typo-lab'],
      ['行高 / 行距', 'Line height / Leading', '一行占的高度与字号之比。中文正文 1.7–1.9 舒服，英文 1.4–1.6。', 'typo-lab'],
      ['字距', 'Letter spacing / Tracking', '字与字之间的整体间距。大标题常收紧，全大写小字常放宽。', 'typo-lab'],
      ['字偶距', 'Kerning', '个别字母对之间的微调（如 AV、To），字体自带。', null],
      ['行宽 / 行长', 'Measure', '一行能放多少字。英文 60–75 个字母、中文 30–40 个字最好读。', 'typo-lab'],
      ['x 字高', 'x-height', '小写字母 x 的高度。x 字高大的字体同字号下看起来更大。', 'type-latin'],
      ['字阶', 'Type scale', '标题、小标题、正文、注释之间按固定倍数放大，例如每级 ×1.25。', 'typo-sets'],
      ['层级', 'Hierarchy', '用大小、粗细、颜色区分「先看什么、后看什么」。', 'typo-sets'],
      ['两端对齐', 'Justify', '每行左右都对齐。中文常用；英文容易出现难看的大空隙。', 'typo-sets'],
      ['首行缩进', 'Indent', '段落第一行空两格。中文传统；网页上更常用段间距分段。', 'typo-sets'],
      ['寡行 / 孤字', 'Widow / Orphan', '段落最后一行只剩一两个字，看起来很孤单，排版时会避免。', null],
      ['中西混排', 'Mixed CJK–Latin', '中文和英文、数字放在一起时的字体搭配与间距处理。', 'type-cjk']
    ] },
    { group: '颜色', items: [
      ['色相', 'Hue', '「是什么颜色」：红、橙、黄、绿、蓝、紫，在色环上用角度表示。', 'color-wheel'],
      ['饱和度', 'Saturation', '颜色的鲜艳程度。低饱和显得高级、安静；高饱和显得活泼、刺激。', 'color-wheel'],
      ['明度', 'Lightness', '颜色的深浅。', 'color-wheel'],
      ['对比度', 'Contrast', '文字和背景的明暗差。正文至少 4.5 : 1 才看得清（WCAG 标准）。', 'color-wheel'],
      ['主色 / 强调色', 'Primary / Accent', '品牌最常用的颜色，和只用在按钮、链接等重点处的颜色。', 'color-sets'],
      ['中性色', 'Neutrals', '黑、白、灰及带一点色调的灰，界面里占面积最大的颜色。', 'color-sets'],
      ['互补色', 'Complementary', '色环上正对面的两色（蓝与橙），对比最强。', 'color-wheel'],
      ['类似色', 'Analogous', '色环上相邻的几色（蓝、青、绿），和谐柔和。', 'color-wheel'],
      ['渐变', 'Gradient', '颜色平滑过渡。线性、径向、锥形、网格渐变各有效果。', 'art-ui'],
      ['双色调', 'Duotone', '图片只用两种颜色表现明暗。', 'art-sub']
    ] },
    { group: '布局', items: [
      ['栅格', 'Grid', '把页面分成等宽的列，所有元素对齐到列上，常见 12 列。', 'layouts'],
      ['留白', 'Whitespace', '元素之间刻意留出的空白。留白多显得高级、从容。', 'layouts'],
      ['断点', 'Breakpoint', '屏幕宽到多少时改变布局，比如手机单栏、电脑双栏。', 'layouts'],
      ['响应式', 'Responsive', '同一页面自动适应手机、平板、电脑。', 'layouts'],
      ['首屏', 'Hero / Above the fold', '打开页面不滚动就能看到的第一屏。', 'layouts'],
      ['便当盒布局', 'Bento grid', '大小不一的圆角格子拼成一整块，像便当盒。', 'layouts'],
      ['卡片', 'Card', '有边界的一块内容（常带圆角、阴影），可以点。', 'shape'],
      ['旁注', 'Sidenote / Margin note', '放在正文旁边空白处的注释，不打断阅读。', 'layouts'],
      ['吸顶', 'Sticky', '滚动时固定在顶部（或侧边）不动的元素。', 'motion-scroll']
    ] },
    { group: '质感', items: [
      ['圆角', 'Border radius', '角的圆润程度。0 显得锐利、严肃；大圆角显得友好。', 'shape'],
      ['超椭圆圆角', 'Squircle', '比普通圆角过渡更平滑的「方圆」，苹果图标的形状。', 'shape'],
      ['投影', 'Drop shadow', '元素下方的阴影，让它看起来浮起来。', 'shape'],
      ['层级高度', 'Elevation', '用阴影深浅表示元素「离纸面多高」。', 'shape'],
      ['内阴影', 'Inset shadow', '阴影在内部，看起来是凹进去的。', 'shape'],
      ['描边', 'Stroke / Border', '元素的边框线。', 'shape'],
      ['毛玻璃', 'Backdrop blur / Frosted glass', '半透明并把背后内容模糊，像磨砂玻璃。', 'art-ui'],
      ['噪点 / 颗粒', 'Grain / Noise', '在平滑的颜色上加细小颗粒，显得有胶片或纸张质感。', 'art-ui'],
      ['拟物', 'Skeuomorphism', '模仿真实物体的材质和光影。', 'art-ui'],
      ['扁平', 'Flat design', '去掉阴影和纹理，只用纯色块。', 'art-ui']
    ] },
    { group: '交互', items: [
      ['悬停', 'Hover', '鼠标移到上面但还没点时的状态。', 'buttons-2'],
      ['按下', 'Active / Pressed', '点下去那一瞬间的状态。', 'buttons-2'],
      ['聚焦', 'Focus', '用键盘 Tab 选中时的状态，通常有一圈光环。', 'inputs'],
      ['禁用', 'Disabled', '暂时不能点，通常变灰。', 'buttons-2'],
      ['微交互', 'Micro-interaction', '点赞时心形弹一下这类小反馈。', 'motion-fx'],
      ['骨架屏', 'Skeleton screen', '内容加载前先显示灰色占位块。', 'motion-fx'],
      ['吐司提示', 'Toast', '屏幕边缘弹出几秒后自动消失的小提示。', null],
      ['模态框', 'Modal / Dialog', '盖在页面上、必须先处理的对话框。', 'transitions-2'],
      ['抽屉', 'Drawer / Sheet', '从屏幕边缘滑出的面板。', 'transitions-1'],
      ['分段控件', 'Segmented control', '几个并排的选项，一次只能选一个。', 'buttons-2']
    ] },
    { group: '动效', items: [
      ['缓动', 'Easing', '速度怎样变化：先快后慢（ease-out）最自然，匀速（linear）最机械。', 'motion-ease'],
      ['时长', 'Duration', '动画持续多久。界面反馈 100–300ms，页面切换 300–500ms。', 'motion-ease'],
      ['弹簧', 'Spring', '像弹簧一样冲过头再回来，显得有弹性、有生命。', 'motion-ease'],
      ['交错', 'Stagger', '一组元素依次出现，每个晚一点点。', 'motion-fx'],
      ['视差', 'Parallax', '滚动时前景和背景移动速度不同，产生纵深感。', 'motion-scroll'],
      ['滚动触发', 'Scroll-triggered', '滚动到某处时才播放的动画。', 'motion-scroll'],
      ['共享元素过渡', 'Shared element transition', '一个元素从上一页「飞」到下一页的对应位置。', 'transitions-2'],
      ['关键帧', 'Keyframes', '定义动画在几个时间点的样子，中间由浏览器补齐。', null]
    ] }
  ];
