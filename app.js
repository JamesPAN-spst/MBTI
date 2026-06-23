const DIMENSIONS = {
  EI: { left: "E", right: "I", leftName: "外倾", rightName: "内倾", title: "能量指向" },
  SN: { left: "S", right: "N", leftName: "实感", rightName: "直觉", title: "信息方式" },
  TF: { left: "T", right: "F", leftName: "思考", rightName: "情感", title: "判断依据" },
  JP: { left: "J", right: "P", leftName: "判断", rightName: "感知", title: "生活取向" },
};

// direction: -1 points to the left letter; +1 points to the right letter.
// All items are original Chinese statements and do not reproduce official MBTI® items.
const QUESTIONS = [
  { d: "EI", dir: -1, c: "社交之后", t: "参加一场气氛不错的聚会两小时后，我通常还有兴致继续和人待在一起。" },
  { d: "SN", dir: -1, c: "学习新事物", t: "面对陌生操作，我更希望先看具体示例和步骤，再理解背后的原理。" },
  { d: "TF", dir: -1, c: "意见分歧", t: "即使对方是亲近的人，我也会先检验其论证是否成立。" },
  { d: "JP", dir: -1, c: "准备出行", t: "重要交通和住宿提前确定，会让我更自在地享受旅程。" },
  { d: "EI", dir: -1, c: "整理思路", t: "复杂想法常常是在和别人边说边聊的过程中逐渐成形。" },
  { d: "SN", dir: -1, c: "观察环境", t: "我容易发现房间摆设、用词或流程中细小而具体的变化。" },
  { d: "TF", dir: -1, c: "给予反馈", t: "清楚指出标准与差距，比把话说得委婉更有帮助。" },
  { d: "JP", dir: -1, c: "开始任务", t: "接到一个周期较长的任务时，我会较早列出节点与交付顺序。" },
  { d: "EI", dir: -1, c: "陌生场合", t: "进入一个彼此不熟的群体，我通常会主动开启几段对话。" },
  { d: "SN", dir: -1, c: "启动项目", t: "我会先弄清现有资源、现实限制和可验证的事实。" },
  { d: "TF", dir: -1, c: "集体决策", t: "一套对所有人一致的规则，通常比因人调整更公平。" },
  { d: "JP", dir: -1, c: "做出选择", t: "把选项收束并作出决定，通常会让我感到轻松。" },
  { d: "EI", dir: -1, c: "独处之后", t: "独自待了大半天后，我会自然地想找人说话或一起做点什么。" },
  { d: "SN", dir: -1, c: "解决问题", t: "一个方法只要稳定有效，我不会仅为了新鲜感就替换它。" },
  { d: "TF", dir: -1, c: "面对冲突", t: "我首先会问：什么决定最符合原则、也最经得起推敲？" },
  { d: "JP", dir: -1, c: "日常秩序", t: "文件、物品或日程有清楚的归位系统，会明显降低我的负担。" },
  { d: "EI", dir: -1, c: "协作状态", t: "需要持续交流、即时接球的协作，往往使我更有精神。" },
  { d: "SN", dir: -1, c: "复述经历", t: "讲述一件事时，我倾向按发生顺序交代具体细节。" },
  { d: "TF", dir: -1, c: "评估表现", t: "我能够把对一个人的喜欢，与对其工作表现的评价分开。" },
  { d: "JP", dir: -1, c: "面对期限", t: "只要条件允许，我更愿意提前完成，而不是把弹性留到最后。" },
  { d: "EI", dir: -1, c: "重要决定", t: "在独自下结论前，我更愿意先听几个人的即时反应。" },
  { d: "SN", dir: -1, c: "讨论内容", t: "比起尚未落地的远景，我更看重眼下能执行的细节。" },
  { d: "TF", dir: -1, c: "处理故障", t: "问题出现时，我会优先定位根因与效率瓶颈。" },
  { d: "JP", dir: -1, c: "临时变化", t: "即使新安排听起来有趣，最后一刻改变既定计划也会让我紧绷。" },
  { d: "EI", dir: 1, c: "密集社交", t: "连续与人相处一下午后，我通常需要独处一阵再进入下一件事。" },
  { d: "SN", dir: 1, c: "自由讨论", t: "一个话题会让我迅速联想到别的领域、隐喻或潜在联系。" },
  { d: "TF", dir: 1, c: "权衡影响", t: "做重大决定时，我会认真考虑它对不同个体的具体感受。" },
  { d: "JP", dir: 1, c: "信息不足", t: "只要条件仍在变化，我更愿意暂时保留多个可行选项。" },
  { d: "EI", dir: 1, c: "表达观点", t: "在重要场合开口前，我通常需要先在心里把想法组织完整。" },
  { d: "SN", dir: 1, c: "面对模糊", t: "信息还不完整时，我很自然地会推演多种可能的解释。" },
  { d: "TF", dir: 1, c: "给予反馈", t: "即使要指出问题，我也会优先保护对方的尊严并交代具体语境。" },
  { d: "JP", dir: 1, c: "安排一天", t: "我喜欢在日程中留下较大的空白，让当天的状态决定怎么使用。" },
  { d: "EI", dir: 1, c: "陌生场合", t: "进入一个新群体，我通常先观察气氛，再选择和谁深入交流。" },
  { d: "SN", dir: 1, c: "学习新事物", t: "如果先看到整体概念地图，我更容易理解后面的事实和步骤。" },
  { d: "TF", dir: 1, c: "艰难选择", t: "即使某个方案逻辑整齐，若违背我重视的价值，我仍很难接受。" },
  { d: "JP", dir: 1, c: "临时邀约", t: "突然出现的有趣邀请，常值得我调整原本的晚间安排。" },
  { d: "EI", dir: 1, c: "周末恢复", t: "一个完全空下来的周末，我会自然保留一段安静且不被打扰的时间。" },
  { d: "SN", dir: 1, c: "日常改进", t: "重复性的流程常让我想到：它还能怎样重组，或用在别处？" },
  { d: "TF", dir: 1, c: "处理冲突", t: "除了讨论对错，我也会留意当事人没有说出口的需要。" },
  { d: "JP", dir: 1, c: "工作节奏", t: "我的高效期常以一阵阵投入出现，而不是每天严格等量推进。" },
  { d: "EI", dir: 1, c: "交流偏好", t: "比起多人轮番发言，我更容易在一对一的深谈中进入状态。" },
  { d: "SN", dir: 1, c: "理解信息", t: "我常先捕捉一组事实背后的模式，而不是逐条记住事实本身。" },
  { d: "TF", dir: 1, c: "集体决策", t: "当某人的处境确实特殊时，我认为调整统一规则可能更公平。" },
  { d: "JP", dir: 1, c: "并行事项", t: "我乐于在几个项目间切换，让兴趣和新信息重新决定优先级。" },
  { d: "EI", dir: 1, c: "专注工作", t: "一段没有会议和消息打断的独立工作，会让我恢复精神。" },
  { d: "SN", dir: 1, c: "长期规划", t: "规划未来时，我更着迷于不同情境可能如何展开。" },
  { d: "TF", dir: 1, c: "衡量成功", t: "除了是否达成结果，我同样在意过程有没有保住信任与关系。" },
  { d: "JP", dir: 1, c: "探索过程", t: "即使会延后原目标，有价值的岔路也值得顺着走一段。" },
];

const TYPES = {
  INTJ: { name: "远见建构者", family: "分析家", accent: "#405b50", tagline: "把复杂世界压缩成一套可执行的长期系统。", summary: "你倾向先在内部形成清晰模型，再以独立而有结构的方式推进。你关注模式、长期后果与系统效率；热情常藏在冷静外表之下，并集中投向少数真正重要的问题。", strengths: ["从杂乱信息中识别结构与长期趋势", "自主学习，能把抽象洞见变为路线图", "对标准与能力有稳定而高的要求"], blindspots: ["可能低估沟通情绪与建立共识所需的时间", "尚未成熟的观点容易被你过早判定为低效", "高标准在疲惫时会变成苛刻或封闭"], work: "需要自主权、复杂问题与长期建设；比频繁同步更喜欢有准备的深度讨论。", relation: "重视智识尊重与可靠行动，表达在意时常靠解决问题，而非高频情绪确认。", stress: "压力下可能过度控制细节、反复推演风险，并对低效格外不耐烦。", growth: "在方案尚未完美时更早邀请反馈；把关系维护也视为系统的一部分。" },
  INTP: { name: "概念拆解者", family: "分析家", accent: "#4a655b", tagline: "追问原理，直到一个解释真正站得住脚。", summary: "你对概念的内部一致性高度敏感，喜欢拆开默认前提并重新组合。好奇心常比完成感更有驱动力；当问题足够有趣时，你能进入极深的专注。", strengths: ["发现逻辑漏洞与未被质疑的假设", "跨领域连接概念，生成非典型解释", "面对复杂性时保持开放与求真"], blindspots: ["可能不断优化模型，却迟迟不交付可用版本", "容易忽略他人需要明确结论或情绪回应", "重复执行与行政细节会快速消耗耐心"], work: "适合研究、设计与问题诊断；需要大块独立时间和探索余地。", relation: "以分享想法和诚实分析表达亲近，但可能需要主动说出温度，而不只给出答案。", stress: "压力下会退回脑内、过度分析，或用挑错代替面对不确定感。", growth: "给探索设置停止条件；练习用简单语言交付一个不完美但可验证的版本。" },
  ENTJ: { name: "系统推进者", family: "分析家", accent: "#344d44", tagline: "看见目标、组织资源，然后让事情向前发生。", summary: "你自然地寻找方向、杠杆与可扩展的结构。面对混乱时，你常迅速建立秩序并承担决策责任；清晰的挑战与实质进展会让你充满能量。", strengths: ["快速识别瓶颈并配置人力与资源", "敢于作出艰难决定并承担后果", "把愿景转成目标、机制与节奏"], blindspots: ["推进速度可能快于团队的理解与承诺", "直接纠错容易让他人只听见否定", "休息与脆弱可能被误判为效率损失"], work: "喜欢高难目标、决策空间与可衡量影响；厌倦权责模糊。", relation: "忠诚且愿意投入资源，希望彼此独立成长；需要留意倾听不等于立刻修复。", stress: "压力下会加码控制、缩短耐心，并把所有问题都转成任务。", growth: "先询问再下结论；把支持、节奏和恢复纳入长期绩效。" },
  ENTP: { name: "可能性辩手", family: "分析家", accent: "#506d62", tagline: "用新角度搅动停滞，让可能性重新流动。", summary: "你被新问题、新组合与智识碰撞吸引。你擅长快速生成替代方案，享受检验观点而非维护惯例；自由度和变化常比稳定流程更能调动你。", strengths: ["迅速生成多个可行方向与策略", "在争论中识别盲区、重构问题", "适应变化，敢于试验未经验证的路径"], blindspots: ["新鲜感消退后，收尾与维护容易失速", "把辩论当探索时，别人可能感到被否定", "过多选项会稀释承诺与持续投入"], work: "适合创新、创业与跨界策略；最好与擅长落地和运营的人协作。", relation: "需要思想自由和轻松互动；认真倾听对方的感受，比给出漂亮反驳更能建立安全感。", stress: "压力下可能四处开新战线、用机智回避焦虑，或冲动推翻已有安排。", growth: "为好点子建立筛选门槛；选择少数方向，允许重复劳动把它们做深。" },
  INFJ: { name: "洞察引路人", family: "理想家", accent: "#6c6e91", tagline: "从人的故事里看见深层线索与更好的去处。", summary: "你常把对人的敏锐感受与长期意义感结合起来。你需要独处整理复杂输入，也愿意为认定的价值持续投入；安静并不等于没有方向。", strengths: ["理解言语背后的动机、关系与意义", "把价值愿景组织成连贯行动", "在深度关系中提供专注而细腻的支持"], blindspots: ["容易吸收他人情绪，却很晚才表达自己的界限", "理想图景过强时会对现实妥协感到失望", "可能以为暗示已经足够清楚"], work: "重视意义、深度和完整性；适合咨询、写作、研究与长期育人。", relation: "追求真诚且有成长性的连接，需要被理解，也需要稳定的独处空间。", stress: "压力下会突然封闭、反复解读细节，或对外界刺激异常敏感。", growth: "更早说出需要与不满；允许关系通过具体沟通，而不是靠彼此猜中。" },
  INFP: { name: "价值守望者", family: "理想家", accent: "#77799b", tagline: "以温柔守住真实，为尚未发生的美好留位置。", summary: "你以内在价值作为方向盘，对真实、意义和个体差异十分敏感。你的想象力为现实打开许多版本；当任务与信念相连时，会显出安静却顽强的投入。", strengths: ["真诚体察个体经验，不急于把人归类", "以想象力发现新的表达与可能", "在重要价值上保持忠诚和韧性"], blindspots: ["不愿破坏和谐，可能拖延必要的冲突", "理想与执行落差会转化为自我怀疑", "面对僵硬流程时容易失去动力"], work: "适合有价值空间、创造自由和深度专注的工作；明确的小期限有助于落地。", relation: "珍视被完整接纳的感觉，常用细腻理解与私人化表达传递爱。", stress: "压力下可能退缩、反刍批评，或突然用僵硬标准要求自己。", growth: "把价值翻译成可重复的小行动；冲突不是背叛，也可以是诚实。" },
  ENFJ: { name: "共识点灯人", family: "理想家", accent: "#66698e", tagline: "让每个人看见彼此，也看见自己还能成为谁。", summary: "你善于读懂群体气氛，并把人们组织到共同愿景周围。关系中的回应会给你能量；你常自然而然地承担鼓舞、协调和促进成长的角色。", strengths: ["识别人际需要并建立共同语言", "用清晰愿景激发参与和成长", "把抽象价值转成有温度的群体行动"], blindspots: ["容易把别人的满意度当成自己的责任", "为了共识可能推迟表达真实异议", "过度投入后才意识到自己已经耗尽"], work: "适合教育、领导、组织发展和公共沟通；需要看见工作对人的影响。", relation: "热情、主动且重视确认；也要允许对方用不同节奏回应。", stress: "压力下会过度介入、寻求外界肯定，或把沉默理解为关系危机。", growth: "帮助前先确认对方是否需要；建立不依赖他人反馈的恢复与判断空间。" },
  ENFP: { name: "灵感连接者", family: "理想家", accent: "#8586a6", tagline: "在热情、人与可能性之间不断搭起新桥。", summary: "你对新的人、新的意义和新的组合保持开放。你的能量具有感染力，擅长看见别人尚未命名的潜力；当自由和价值感同时存在时，你最为鲜活。", strengths: ["快速建立联系，调动希望与参与感", "从不同故事中发现新方向", "适应变化，以即兴能力打开僵局"], blindspots: ["承诺太多后容易被细节与维护淹没", "可能追随当下热情，低估长期成本", "对他人反应敏感时会失去自己的中心"], work: "适合创意、传播、咨询与早期探索；需要外部结构协助优先级和收尾。", relation: "重视真诚交流、共同成长与新鲜体验，也需要清晰边界保护彼此空间。", stress: "压力下会分散、过度联想负面可能，或用忙碌逃避失望。", growth: "区分“令人兴奋”和“值得承诺”；用稳定习惯托住真正重要的自由。" },
  ISTJ: { name: "秩序守成者", family: "守序者", accent: "#7c664c", tagline: "把承诺落到细节，让可靠成为一种安静力量。", summary: "你信赖事实、经验与可重复的秩序。责任一旦接下，往往会稳健推进直到完成；你不一定高调，但会用准确、准备与一致性构成安全感。", strengths: ["严谨追踪事实、细节与责任边界", "在重复和长期任务中保持稳定", "用经验建立可依赖的标准与流程"], blindspots: ["快速变化可能先被体验为对秩序的干扰", "容易独自扛下责任，不及时暴露负荷", "可能低估未经验证的新思路的潜在价值"], work: "适合标准清晰、要求准确和可持续建设的环境；希望变更有依据。", relation: "以守约、照料实际事务表达在意；情绪语言虽不高频，但行动稳定。", stress: "压力下会更执着程序、反复检查风险，并预想事情如何出错。", growth: "在低风险处练习试验；把求助视为维护系统可靠性，而非失职。" },
  ISFJ: { name: "细节照护者", family: "守序者", accent: "#897154", tagline: "记住具体的人和事，把关怀做成可依赖的日常。", summary: "你关注他人的实际需要，也看重秩序和责任。许多别人忽略的细节会被你记住，并转化为体贴行动；稳定关系与明确贡献让你感到踏实。", strengths: ["细致观察并回应个体的实际需要", "耐心维护承诺、流程与关系", "把经验与关怀结合成可靠支持"], blindspots: ["可能长期照顾别人，却把自己的需要排到最后", "对冲突和突变的回避会积累隐性压力", "贡献被视为理所当然时容易受伤"], work: "适合需要准确、连续性与服务意识的角色；欣赏具体肯定和清晰期待。", relation: "忠诚而细腻，会记住小事；需要练习直接提出需求，而非等待对方察觉。", stress: "压力下可能沉默承受、反复担忧细节，最终突然耗竭或抽离。", growth: "在答应前检查余量；让“不”成为可持续关怀的一部分。" },
  ESTJ: { name: "现实组织者", family: "守序者", accent: "#755f47", tagline: "明确标准、分配责任，把计划稳稳送达终点。", summary: "你对现实条件、职责与执行效率非常敏锐。面对模糊局面，你常迅速定义问题、建立顺序并推动交付；清楚的规则和看得见的成果使你安心。", strengths: ["组织复杂任务，建立清楚责任与节奏", "根据事实迅速决断并持续跟进", "在压力情境中维持可预测的运行"], blindspots: ["过早定案可能错过新信息和少数意见", "直率要求容易盖过认可与倾听", "容易把不同工作方式误解为不够负责"], work: "适合运营、管理和需要结果负责的岗位；偏好权责匹配、标准明确。", relation: "通过承担责任、安排实际事务表达可靠；也可多给无目的的陪伴和情绪确认。", stress: "压力下会强化控制、频繁催促，并把不确定性看成执行问题。", growth: "在定方案前设置探索窗口；评价结果，也看见不同路径的有效性。" },
  ESFJ: { name: "关系营造者", family: "守序者", accent: "#90785a", tagline: "让人被欢迎、被记得，也让共同生活有序运转。", summary: "你会主动关注群体需要，并用具体、持续的方式营造归属。你珍视互惠、责任与可感知的和谐；他人的回应能帮助你确认关系正在健康运转。", strengths: ["营造友善氛围，让成员感到被纳入", "记住实际需要并协调资源落实", "维护群体规范、仪式与稳定联系"], blindspots: ["可能因害怕失望而过度迎合主流期待", "对冷淡或批评的反应比自己想象中更深", "为维持和谐而回避必要分歧"], work: "适合服务、协调、教育和团队运营；希望贡献被具体看见。", relation: "愿意高频投入并创造共同记忆，需要双方清楚表达感谢与边界。", stress: "压力下会过度确认他人态度、反复照料，或对不合群行为格外敏感。", growth: "区分“他人不赞同”和“关系不安全”；保留不服务任何人的个人空间。" },
  ISTP: { name: "冷静解题者", family: "探索者", accent: "#4d6f78", tagline: "先看系统如何运转，再用最少动作解决真实问题。", summary: "你对因果、工具与当下条件有敏锐直觉。平时保留空间，问题出现时却能快速进入行动；你信任亲手验证的结果，不喜欢不必要的程序和表态。", strengths: ["在突发情境中冷静定位关键变量", "灵活使用工具、数据与现实反馈", "独立判断，用简洁方案恢复运行"], blindspots: ["对长期协调和预先说明可能投入不足", "情绪沉默容易被误读为漠不关心", "追求即时解决时可能忽略后续维护"], work: "适合技术、诊断、现场解决与高自主任务；需要少干扰和直接反馈。", relation: "尊重空间，以实际帮助表达在意；提前说明需要独处能减少误解。", stress: "压力下可能切断交流、冲动寻求刺激，或只处理技术面。", growth: "在问题爆发前分享观察；把感受当作信息，而不是妨碍解决的噪声。" },
  ISFP: { name: "感受工艺者", family: "探索者", accent: "#597984", tagline: "贴近此刻的真实，用行动与审美表达温柔立场。", summary: "你对环境、感受和个人价值有细腻而直接的感知。你通常不急着主导别人，却会以具体选择维护真实；自由、空间和亲手体验比抽象规则更有说服力。", strengths: ["敏锐察觉当下氛围、质感与个体需要", "用灵活而具体的行动回应现实", "尊重差异，不轻易把价值强加给人"], blindspots: ["不愿正面冲突，可能让边界长期模糊", "对远期结构和行政安排容易拖延", "批评可能被体验为对自我价值的否定"], work: "适合创作、服务、手作与现场体验；需要自主节奏和可见的真实影响。", relation: "温柔、包容并重视共享体验；说出不舒服，比默默退开更能保护亲密。", stress: "压力下可能突然封闭、过度迎合，或陷入对未来的灾难化想象。", growth: "把重要价值转成明确边界；用轻量计划为自由提供支点。" },
  ESTP: { name: "现场行动派", family: "探索者", accent: "#436973", tagline: "读懂现场、抓住窗口，用行动让局面重新活起来。", summary: "你对当下机会、现实反馈和人际动态反应迅速。比起长时间推演，你更愿意进入现场测试；挑战、变化和即时结果常让你兴奋。", strengths: ["快速读取环境并抓住可行动的窗口", "在压力下大胆、务实地处理现实问题", "善于谈判、调动气氛与即时资源"], blindspots: ["即时回报可能遮住长期代价", "厌倦预演和规则时容易低估风险", "持续追求刺激会挤压安静反思"], work: "适合业务、应急、谈判和快速迭代；需要行动空间与短反馈回路。", relation: "有趣、直接、愿意一起体验；稳定倾听和兑现远期承诺会加深信任。", stress: "压力下可能加速行动、冒险或用外界刺激逃开内在不安。", growth: "重大选择设置冷静期；不仅问“能不能”，也问“之后会怎样”。" },
  ESFP: { name: "体验点燃者", family: "探索者", accent: "#507783", tagline: "把注意力带回此刻，让人与生活都更有温度。", summary: "你对现场氛围、人的反应与具体乐趣非常敏锐。你常以自然的热情让人放松，并愿意在真实需要出现时伸手；体验本身是你理解世界的重要方式。", strengths: ["迅速建立亲近感，让群体更有活力", "灵活回应现实需要并创造愉快体验", "欣赏具体的人、事与当下美感"], blindspots: ["不愉快的长期议题容易被推迟", "外界反馈过强时可能忽略自己的方向", "重复规划和抽象分析会消耗动力"], work: "适合现场服务、表演、活动与人际密集环境；需要变化和可见反馈。", relation: "慷慨、热烈且重视共同体验；坦然谈论困难能让快乐更有根基。", stress: "压力下可能过度社交或消费，随后对未来产生强烈担忧。", growth: "用小而固定的习惯处理未来；给安静和不愉快也留出位置。" },
};

const ANSWER_LABELS = ["非常不同意", "比较不同意", "不确定 / 看情况", "比较同意", "非常同意"];
const CONSISTENCY_PAIRS = [[4,28],[8,32],[1,33],[13,37],[6,30],[10,42],[7,31],[11,27]];

const state = {
  current: Number(localStorage.getItem("inner-coordinates-current")) || 0,
  answers: JSON.parse(localStorage.getItem("inner-coordinates-answers") || "{}"),
  startedAt: Number(localStorage.getItem("inner-coordinates-started")) || 0,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function familyColor(family) {
  return { "分析家": "#405b50", "理想家": "#6c6e91", "守序者": "#7c664c", "探索者": "#4d6f78" }[family];
}

function renderTypeGrid(filter = "all") {
  const grid = $("#type-grid");
  grid.innerHTML = Object.entries(TYPES)
    .filter(([, data]) => filter === "all" || data.family === filter)
    .map(([code, data]) => `
      <button class="type-card" data-type="${code}" data-letters="${code}" style="--card-accent:${familyColor(data.family)}" aria-label="查看 ${code} ${data.name} 的完整介绍">
        <span class="family">${data.family}</span><span class="arrow" aria-hidden="true">↗</span>
        <h3>${code}</h3><h4>${data.name}</h4><p>${data.tagline}</p>
      </button>`).join("");
  $$(".type-card").forEach((card) => card.addEventListener("click", () => openTypeDialog(card.dataset.type)));
}

function openTypeDialog(code) {
  const data = TYPES[code];
  const dialog = $("#type-dialog");
  $("#dialog-content").innerHTML = `
    <div class="dialog-hero" style="--dialog-accent:${data.accent}">
      <p>${data.family} / PERSONALITY PORTRAIT</p><h2>${code}</h2><h3>${data.name}</h3>
    </div>
    <div class="dialog-body">
      <p class="portrait-lede">${data.summary}</p>
      <div class="dialog-panels">
        <div><h4>自然优势</h4><p>${data.strengths.join("；")}。</p></div>
        <div><h4>容易忽略</h4><p>${data.blindspots.join("；")}。</p></div>
        <div><h4>关系中的你</h4><p>${data.relation}</p></div>
        <div><h4>成长方向</h4><p>${data.growth}</p></div>
      </div>
    </div>`;
  dialog.showModal();
}

function showScreen(name) {
  $$(".screen").forEach((screen) => screen.classList.toggle("is-active", screen.id === `${name}-screen`));
  const inTest = name === "test";
  $(".site-header").style.display = inTest ? "none" : "flex";
  $(".site-footer").style.display = inTest ? "none" : "flex";
  window.scrollTo({ top: 0, behavior: "instant" });
}

function startTest() {
  if (!state.startedAt) {
    state.startedAt = Date.now();
    localStorage.setItem("inner-coordinates-started", String(state.startedAt));
  }
  const answered = Object.keys(state.answers).length;
  if (answered === QUESTIONS.length) {
    state.current = 0;
    state.answers = {};
    state.startedAt = Date.now();
    persist();
  } else if (state.answers[state.current] === undefined && answered) {
    state.current = QUESTIONS.findIndex((_, i) => state.answers[i] === undefined);
  }
  showScreen("test");
  renderQuestion();
}

function persist() {
  localStorage.setItem("inner-coordinates-current", String(state.current));
  localStorage.setItem("inner-coordinates-answers", JSON.stringify(state.answers));
  localStorage.setItem("inner-coordinates-started", String(state.startedAt));
}

function renderQuestion() {
  const q = QUESTIONS[state.current];
  const count = state.current + 1;
  const pct = Math.round(count / QUESTIONS.length * 100);
  $("#progress-label").textContent = `第 ${count} / ${QUESTIONS.length} 题`;
  $("#progress-percent").textContent = `${pct}%`;
  $("#progress-bar").style.width = `${pct}%`;
  $("#question-number").textContent = String(count).padStart(2, "0");
  $("#question-context").textContent = q.c.toUpperCase();
  $("#question-text").textContent = q.t;
  $("#answer-options").innerHTML = ANSWER_LABELS.map((label, idx) => {
    const value = idx - 2;
    const checked = state.answers[state.current] === value ? "checked" : "";
    return `<div class="answer-option"><input type="radio" id="answer-${idx}" name="answer" value="${value}" ${checked}><label for="answer-${idx}">${label}</label></div>`;
  }).join("");
  $("#prev-question").disabled = state.current === 0;
  $("#next-question").disabled = state.answers[state.current] === undefined;
  $("#next-question").innerHTML = state.current === QUESTIONS.length - 1 ? "查看结果 →" : "下一题 →";
  $$("input[name='answer']").forEach((input) => input.addEventListener("change", (event) => {
    state.answers[state.current] = Number(event.target.value);
    $("#next-question").disabled = false;
    persist();
  }));
}

function scoreTest() {
  const result = {};
  Object.entries(DIMENSIONS).forEach(([key, dim]) => {
    const items = QUESTIONS.map((q, i) => ({ ...q, a: state.answers[i] })).filter((q) => q.d === key);
    const signed = items.reduce((sum, item) => sum + item.a * item.dir, 0);
    const rightPercent = Math.round(50 + (signed / (items.length * 2)) * 50);
    const distance = Math.abs(rightPercent - 50);
    const letter = signed === 0 ? "X" : signed > 0 ? dim.right : dim.left;
    const clarity = distance <= 5 ? "边界模糊" : distance <= 12 ? "轻微偏好" : distance <= 24 ? "清晰偏好" : "强烈偏好";
    result[key] = { ...dim, rightPercent, leftPercent: 100 - rightPercent, letter, clarity, distance };
  });
  const type = [result.EI.letter, result.SN.letter, result.TF.letter, result.JP.letter].join("");
  return { result, type, quality: responseQuality() };
}

function responseQuality() {
  const values = Object.values(state.answers);
  const neutralRatio = values.filter((v) => v === 0).length / values.length;
  const unique = new Set(values).size;
  const consistency = CONSISTENCY_PAIRS.map(([a, b]) => {
    const sa = state.answers[a] * QUESTIONS[a].dir;
    const sb = state.answers[b] * QUESTIONS[b].dir;
    return Math.abs(sa - sb);
  }).reduce((a, b) => a + b, 0) / CONSISTENCY_PAIRS.length;
  const minutes = (Date.now() - state.startedAt) / 60000;
  let points = 0;
  if (neutralRatio > .65) points += 2; else if (neutralRatio > .4) points += 1;
  if (unique <= 1) points += 2;
  if (consistency > 2.2) points += 2; else if (consistency > 1.55) points += 1;
  if (minutes < 2) points += 2; else if (minutes < 4) points += 1;
  if (points >= 4) return { label: "建议谨慎解读", note: "作答较快、较单一或前后波动较大", level: "low" };
  if (points >= 2) return { label: "可供参考", note: "部分回答较中性或存在情境波动", level: "mid" };
  return { label: "回答较稳定", note: "作答节奏与内部一致性未见明显异常", level: "high" };
}

function renderResults() {
  const { result, type, quality } = scoreTest();
  const profile = TYPES[type] || boundaryProfile(type, result);
  const dimensionRows = Object.entries(result).map(([, d]) => `
    <div class="dimension-row">
      <span class="dimension-letter ${d.letter === d.left ? "is-dominant" : ""}">${d.left}</span>
      <div>
        <div class="dimension-copy"><span>${d.leftName} ${d.leftPercent}%</span><strong>${d.title} · ${d.clarity}</strong><span>${d.rightName} ${d.rightPercent}%</span></div>
        <div class="dimension-bar"><i style="width:${d.rightPercent}%"></i></div>
        <p class="dimension-note">${d.distance <= 5 ? "你可能会根据情境自然切换，两侧都不是例外。" : `结果更靠近“${d.letter === d.left ? d.leftName : d.rightName}”，但另一侧仍是可用能力。`}</p>
      </div>
      <span class="dimension-letter ${d.letter === d.right ? "is-dominant" : ""}">${d.right}</span>
    </div>`).join("");
  $("#result-content").innerHTML = `
    <section class="result-hero" data-type="${type}">
      <div class="result-hero-inner">
        <p class="result-kicker">YOUR CURRENT BEST-FIT TYPE</p>
        <div class="result-identity">
          <div><h1 class="result-code" id="result-type">${type}</h1><h2 class="result-name">${profile.name}</h2><p class="result-tagline">${profile.tagline}</p></div>
          <div class="quality-chip"><span>本次回答质量</span><strong>${quality.label}</strong><small>${quality.note}</small></div>
        </div>
        <div class="result-actions"><button class="button" id="copy-result">复制结果摘要</button><button class="button" id="restart-test">重新测试</button><button class="button" id="back-home">返回图鉴</button></div>
      </div>
    </section>
    <div class="result-body">
      <section class="result-section">
        <div class="result-section-title"><p class="section-index">01 / 四维坐标</p><h2>你的偏好<br>不是开关</h2><p>百分比表示在本题库中的相对位置，不是能力、成熟度或人群百分位。</p></div>
        <div class="dimension-results">${dimensionRows}</div>
      </section>
      <section class="result-section">
        <div class="result-section-title"><p class="section-index">02 / 性格刻画</p><h2>你如何<br>自然用力</h2><p>这是倾向描述，不是对每个时刻的预言。</p></div>
        <div><p class="portrait-lede">${profile.summary}</p><div class="trait-columns"><div class="trait-box"><h3>常见优势</h3><ul>${profile.strengths.map(x => `<li>${x}</li>`).join("")}</ul></div><div class="trait-box"><h3>可能的盲点</h3><ul>${profile.blindspots.map(x => `<li>${x}</li>`).join("")}</ul></div></div></div>
      </section>
      <section class="result-section">
        <div class="result-section-title"><p class="section-index">03 / 情境画像</p><h2>放进真实<br>生活里看</h2><p>环境、角色与发展阶段都会改变表现方式。</p></div>
        <div class="life-grid"><article class="life-card"><span>W</span><h3>工作与学习</h3><p>${profile.work}</p></article><article class="life-card"><span>R</span><h3>关系与沟通</h3><p>${profile.relation}</p></article><article class="life-card"><span>S</span><h3>压力之下</h3><p>${profile.stress}</p></article><article class="life-card"><span>G</span><h3>成长实验</h3><p>${profile.growth}</p></article><article class="life-card"><span>≠</span><h3>不要这样使用</h3><p>不要据此判断职业上限、关系配对、心理健康或一个人的价值。</p></article><article class="life-card"><span>↺</span><h3>值得重测吗</h3><p>若多组偏好接近中点，可隔数周在平稳状态下重测，并比较具体情境。</p></article></div>
      </section>
      <p class="result-disclaimer">${type.includes("X") ? "某一组或多组偏好正好落在中点，因此用 X 保留不确定性，而不强行分型。建议优先阅读四维条形图，并在图鉴中比较相邻类型。" : Object.values(result).some(d => d.distance <= 5) ? "你的结果包含边界维度：四字母对你而言尤其只是速记。建议优先阅读四维条形图，并同时查看相邻类型。" : "四字母是对本次回答的简写，不是固定身份。人格特质会受情境、经验和发展影响。"} 本测验不是官方 MBTI® 工具，也不提供心理诊断。</p>
    </div>`;
  showScreen("result");
  $("#copy-result").addEventListener("click", () => copyResult(type, profile, result));
  $("#restart-test").addEventListener("click", resetTest);
  $("#back-home").addEventListener("click", () => { showScreen("home"); $("#types-section").scrollIntoView(); });
}

function boundaryProfile(type, result) {
  const tied = Object.values(result).filter(d => d.letter === "X").map(d => d.title).join("、");
  const clear = Object.values(result).filter(d => d.letter !== "X").map(d => `${d.title}偏${d.letter}`).join("，");
  return {
    name: "边界型画像",
    tagline: `${tied}落在中点；这一次，不确定性比硬贴标签更诚实。`,
    summary: `你在${tied}上没有显示稳定的单侧倾向${clear ? `，同时在${clear}` : ""}。这可能代表你能随情境切换，也可能表示目前的角色要求、状态或题目语境掩盖了自然偏好。`,
    strengths: ["能从偏好的两侧调用不同策略", "较少用单一标签限制自己与他人", "对情境变化与复杂性保持开放"],
    blindspots: ["过度适应环境时，可能难以觉察真正需要", "别人可能不易预测你的决策或工作节奏", "在多个可行方向之间会需要更明确的选择标准"],
    work: "观察在哪些任务中你更有能量，而不只记录自己是否能做好；能量成本往往比行为表面更能提示偏好。",
    relation: "直接说明自己在不同情境下的需要，不必为了维持一致形象而固定成某一种表现。",
    stress: "压力可能放大角色化反应，使结果更靠近某一侧或更难分辨；不要在剧烈波动期急于定型。",
    growth: "隔数周在平稳状态下重测，并记录两侧行为发生时的情境、动机与恢复成本。",
  };
}

async function copyResult(type, profile, result) {
  const lines = Object.values(result).map(d => `${d.title}：${d.left}${d.leftPercent}% / ${d.right}${d.rightPercent}%（${d.clarity}）`);
  const text = `我的人格偏好结果：${type} · ${profile.name}\n${profile.tagline}\n${lines.join("\n")}\n\n结果仅用于自我探索，不是心理诊断。`;
  try { await navigator.clipboard.writeText(text); showToast("结果摘要已复制"); }
  catch { showToast("复制失败，请手动截取结果"); }
}

function resetTest() {
  state.current = 0; state.answers = {}; state.startedAt = Date.now(); persist(); startTest();
}

function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function goToNav(target) {
  showScreen("home");
  if (target === "types") $("#types-section").scrollIntoView({ behavior: "smooth" });
  if (target === "method") $("#method-section").scrollIntoView({ behavior: "smooth" });
}

renderTypeGrid();
$("#start-test").addEventListener("click", startTest);
$("#start-test-bottom").addEventListener("click", startTest);
$("#exit-test").addEventListener("click", () => { persist(); showScreen("home"); showToast("进度已保存在当前浏览器"); });
$("#prev-question").addEventListener("click", () => { if (state.current > 0) { state.current--; persist(); renderQuestion(); } });
$("#next-question").addEventListener("click", () => {
  if (state.answers[state.current] === undefined) return;
  if (state.current === QUESTIONS.length - 1) renderResults();
  else { state.current++; persist(); renderQuestion(); }
});
$("#dialog-close").addEventListener("click", () => $("#type-dialog").close());
$("#type-dialog").addEventListener("click", (event) => { if (event.target === $("#type-dialog")) $("#type-dialog").close(); });
$("#type-filter").addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  $$("#type-filter button").forEach(b => b.classList.toggle("is-active", b === event.target));
  renderTypeGrid(event.target.dataset.filter);
});
$$('[data-scroll]').forEach(btn => btn.addEventListener("click", () => $(`#${btn.dataset.scroll}`).scrollIntoView({ behavior: "smooth" })));
$$('[data-nav]').forEach(btn => btn.addEventListener("click", () => goToNav(btn.dataset.nav)));

window.addEventListener("keydown", (event) => {
  if (!$("#test-screen").classList.contains("is-active")) return;
  const number = Number(event.key);
  if (number >= 1 && number <= 5) {
    const input = $(`#answer-${number - 1}`);
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
  if (event.key === "Enter" && !$("#next-question").disabled) $("#next-question").click();
});
