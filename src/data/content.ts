export const ageRanges = ["70后", "80后", "90后", "00后", "10后"] as const;

export const professions = [
  "学生",
  "职场人",
  "自由职业",
  "创业者",
  "其他",
] as const;

export const cities = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "杭州",
  "成都",
  "重庆",
  "南京",
  "武汉",
  "西安",
  "长沙",
  "厦门",
  "青岛",
  "天津",
  "东京",
  "首尔",
  "新加坡",
  "伦敦",
  "纽约",
];

export const hobbies = [
  { group: "运动", items: ["瑜伽", "徒步", "普拉提", "跑步", "骑行", "攀岩"] },
  { group: "文艺", items: ["看展", "话剧", "livehouse", "读书", "写作", "绘画"] },
  { group: "旅行", items: ["city walk", "露营", "背包", "小众目的地"] },
  { group: "生活", items: ["咖啡探店", "手作", "做饭", "宠物", "植物"] },
  { group: "兴趣", items: ["电影", "综艺", "播客", "观鸟", "桌游"] },
];

export const scenarioTags = [
  { key: "travel", emoji: "🗺️", label: "旅行搭" },
  { key: "sport", emoji: "🏃", label: "运动搭" },
  { key: "art", emoji: "🎨", label: "看展演出" },
  { key: "study", emoji: "📚", label: "学习考证" },
  { key: "career", emoji: "💼", label: "职场副业" },
  { key: "rent", emoji: "🏠", label: "租房合住" },
  { key: "newcity", emoji: "🌆", label: "新城市破冰" },
  { key: "daily", emoji: "☕", label: "日常陪伴" },
];

export interface ValueQuestion {
  id: string;
  question: string;
  type: "choice" | "fill" | "open";
  options?: string[];
  placeholder?: string;
}

export const valueQuestions: ValueQuestion[] = [
  {
    id: "Q1",
    question: "一件让你觉得「这个人我处不来」的小事是什么？",
    type: "open",
    placeholder: "比如：随意爽约、把服务员当工具人……（20–150 字）",
  },
  {
    id: "Q2",
    question: "你如何看待 AA 制？什么情况下你会主动抢单？",
    type: "choice",
    options: [
      "坚持 AA，清清爽爽最自在",
      "多数时候 AA，偶尔主动请客",
      "谁方便谁先付，长期来看差不多就行",
      "对方过生日/庆祝，我会抢单",
    ],
  },
  {
    id: "Q3",
    question: "对你来说，「舒适的沉默」是什么感觉？",
    type: "open",
    placeholder: "在你和对方之间，沉默是放松还是尴尬？（20–150 字）",
  },
  {
    id: "Q4",
    question: "你通常怎么处理和朋友之间的小矛盾？",
    type: "choice",
    options: [
      "当面说清楚，不隔夜",
      "冷静一晚再聊",
      "看情况决定，视对方而定",
      "如果不严重，不提也罢",
    ],
  },
  {
    id: "Q5",
    question: "什么样的人让你觉得「和她在一起很安心」？",
    type: "open",
    placeholder: "描述一下让你放松的特质（20–150 字）",
  },
  {
    id: "Q6",
    question: "你觉得「好朋友」和「普通朋友」最本质的区别是什么？",
    type: "fill",
    placeholder: "一句话说出你的答案",
  },
  {
    id: "Q7",
    question: "你对「占便宜」这件事的容忍底线在哪里？",
    type: "choice",
    options: [
      "零容忍",
      "小事不计较，大事必计较",
      "要看关系远近",
      "能换成真诚就没问题",
    ],
  },
  {
    id: "Q8",
    question: "描述一次你觉得「这趟值了」的经历（不限场景）。",
    type: "open",
    placeholder: "一段小经历，20–150 字",
  },
  {
    id: "Q9",
    question: "你最近在认真做的一件事是什么？",
    type: "fill",
    placeholder: "可以是一个目标、一门课、一段练习",
  },
  {
    id: "Q10",
    question: "如果你和搭子意见不合，你通常会怎么做？",
    type: "choice",
    options: [
      "先听对方，再表达自己",
      "直接说出观点，求同存异",
      "不愿起冲突，先避开",
      "看事情大小，能让就让",
    ],
  },
];

export const sceneTypes = [
  { key: "travel", emoji: "🗺️", label: "旅行" },
  { key: "sport", emoji: "🏃", label: "运动" },
  { key: "art", emoji: "🎨", label: "看展演出" },
  { key: "rent", emoji: "🏠", label: "租房" },
  { key: "newcity", emoji: "🌆", label: "新城市" },
  { key: "daily", emoji: "☕", label: "日常" },
  { key: "other", emoji: "✨", label: "其他" },
];

export interface Companion {
  id: string;
  name: string;
  emoji: string;
  city: string;
  tags: string[];
  aiSummary: string;
  age: string;
  profession: string;
  hobbies: string[];
  scenarios: string[];
  values: { q: string; a: string }[];
  icebreakers: string[];
  posts: { title: string; time: string; scene: string }[];
}

export const companions: Companion[] = [
  {
    id: "c1",
    name: "小麦",
    emoji: "🌾",
    city: "上海",
    age: "95后",
    profession: "自由职业",
    tags: ["city walk", "真诚", "边界感"],
    aiSummary:
      "爱在街角发呆的 city walker，说话慢半拍但很准，底线是「不把人当工具」。",
    hobbies: ["city walk", "看展", "咖啡探店"],
    scenarios: ["🎨 看展演出", "☕ 日常陪伴", "🌆 新城市破冰"],
    values: [
      {
        q: "一件让你觉得「这个人我处不来」的小事是什么？",
        a: "对服务员说话的态度。如果对着端咖啡的小姐姐不耐烦地催单，我基本下次不会再约了——小事情里最见一个人有没有看到别人。",
      },
      {
        q: "对你来说，「舒适的沉默」是什么感觉？",
        a: "像周末下午一起在咖啡馆各自看书，中间抬头笑一下又低下头。不需要找话题，但彼此都在。",
      },
      {
        q: "你如何看待 AA 制？",
        a: "多数时候 AA，偶尔主动请客",
      },
    ],
    icebreakers: [
      "她说「看服务员的态度判断人」，你也是吗？我最近刚因为这个拉黑了一个朋友（哭笑）",
      "上海的 city walk 路线你会更偏哪种？我最近想找个同频的一起走长乐路～",
      "看你喜欢看展，这周六 798 有个小展，一起？我可以先发你链接",
    ],
    posts: [
      { title: "周六下午 想找人一起逛苏州河西岸", time: "本周末", scene: "日常" },
      { title: "UCCA 新展 求同行姐妹 散场可以喝点东西", time: "下周三", scene: "看展" },
    ],
  },
  {
    id: "c2",
    name: "栗子",
    emoji: "🌰",
    city: "北京",
    age: "00后",
    profession: "学生",
    tags: ["爱运动", "有边界感", "不擅寒暄"],
    aiSummary:
      "普拉提 + 徒步爱好者，讨厌消耗型关系。约运动比约饭更让她放松。",
    hobbies: ["普拉提", "徒步", "跑步"],
    scenarios: ["🏃 运动搭", "📚 学习考证"],
    values: [
      {
        q: "你通常怎么处理和朋友之间的小矛盾？",
        a: "当面说清楚，不隔夜",
      },
      {
        q: "什么样的人让你觉得「和她在一起很安心」？",
        a: "知道什么时候闭嘴、什么时候认真听的人。不需要我去维持话题，也不会突然打破节奏。",
      },
      {
        q: "你最近在认真做的一件事是什么？",
        a: "每周 3 次普拉提，还有在读一本关于边界感的书《蛤蟆先生去看心理医生》，已经看了三遍。",
      },
    ],
    icebreakers: [
      "同样在练普拉提的姐妹！你是跟哪个老师呀？我最近换课很纠结",
      "你提到「知道什么时候闭嘴」，我真的同意——想问下你一般怎么跟话痨朋友相处？",
      "周末想去妙峰山走一段，有兴趣一起吗？不赶进度那种",
    ],
    posts: [
      { title: "周末爬山 不急着赶路 慢慢走", time: "本周末", scene: "运动" },
    ],
  },
  {
    id: "c3",
    name: "鹿野",
    emoji: "🦌",
    city: "杭州",
    age: "90后",
    profession: "职场人",
    tags: ["live house", "反emo", "爱做饭"],
    aiSummary:
      "在科技公司做产品，周末搞 live house 和小厨房。不喜欢内耗聊天，喜欢直接抛问题。",
    hobbies: ["livehouse", "做饭", "骑行"],
    scenarios: ["🎨 看展演出", "☕ 日常陪伴"],
    values: [
      {
        q: "你对「占便宜」这件事的容忍底线在哪里？",
        a: "小事不计较，大事必计较",
      },
      {
        q: "你觉得「好朋友」和「普通朋友」最本质的区别是什么？",
        a: "会不会在我不好的时候直接说「我现在可以陪你」——不用我先开口。",
      },
      {
        q: "描述一次你觉得「这趟值了」的经历。",
        a: "去年一个人去了潮汕，凌晨在小巷子里找牛肉火锅，隔壁桌阿姨把她自家的酱料分给我一勺。那一刻觉得世界还挺可爱的。",
      },
    ],
    icebreakers: [
      "你说「会主动说我可以陪你」——我也觉得这件事是分水岭。最近有遇到这样的朋友吗？",
      "杭州 live 哪家你去得多？我最近在找靠谱的小场地一起",
      "如果做饭搭子我也很想报名！你周末一般几点开火呀？",
    ],
    posts: [
      { title: "周日下午 一起做意面喝白葡萄酒", time: "本周末", scene: "日常" },
    ],
  },
  {
    id: "c4",
    name: "苏苏",
    emoji: "🌿",
    city: "成都",
    age: "90后",
    profession: "创业者",
    tags: ["新城市", "真诚", "同频就约"],
    aiSummary:
      "刚搬到成都 3 个月，在找长期固定搭子。对「舒适沉默」特别在意，不喜欢刻意热络。",
    hobbies: ["city walk", "读书", "咖啡探店"],
    scenarios: ["🌆 新城市破冰", "☕ 日常陪伴"],
    values: [
      {
        q: "对你来说，「舒适的沉默」是什么感觉？",
        a: "一起走路，她突然指一棵树给我看，我点点头，然后又是各自走各自的。那种「不用表演开心」的状态。",
      },
      {
        q: "你如何看待 AA 制？",
        a: "坚持 AA，清清爽爽最自在",
      },
      {
        q: "如果你和搭子意见不合，你通常会怎么做？",
        a: "先听对方，再表达自己",
      },
    ],
    icebreakers: [
      "刚搬来成都 3 个月+1！你是本地还是新来的呀？我还在找慢慢一起逛街的人",
      "「一起走路突然指一棵树」——这条我真的戳到了。最近想找人一起走玉林",
      "成都的咖啡店你推荐哪家？我在找适合看书一下午不被打扰的",
    ],
    posts: [
      { title: "玉林 city walk 慢慢走 周六下午", time: "本周末", scene: "日常" },
    ],
  },
  {
    id: "c5",
    name: "阿玖",
    emoji: "🪷",
    city: "深圳",
    age: "95后",
    profession: "职场人",
    tags: ["边界感", "真诚", "不PUA"],
    aiSummary:
      "互联网 5 年，被消耗够了。现在只想和能「直接说 no」的姐妹做朋友。",
    hobbies: ["瑜伽", "读书", "徒步"],
    scenarios: ["🏃 运动搭", "📚 学习考证", "☕ 日常陪伴"],
    values: [
      {
        q: "一件让你觉得「这个人我处不来」的小事是什么？",
        a: "对别人边界不尊重——比如未经允许翻我包、追问我工资、替我做决定。都是小事，但累积起来会让我关掉这段关系。",
      },
      {
        q: "什么样的人让你觉得「和她在一起很安心」？",
        a: "能直接说「我今天不太想出门」的人。不用找借口，我也不会追问。",
      },
      {
        q: "你最近在认真做的一件事是什么？",
        a: "在学阿斯汤加瑜伽。每周 4 次，想练满一年看看身体会怎么变。",
      },
    ],
    icebreakers: [
      "你说的「直接说不想出门」真的戳，想问你怎么做到不愧疚的？",
      "阿汤老师在深圳有没有推荐的？我最近也在试",
      "周末徒步梧桐山 有兴趣一起吗？我不赶时间、爱中途停下来喝水那种",
    ],
    posts: [
      { title: "梧桐山 慢速徒步 周日早上 8 点出发", time: "本周末", scene: "运动" },
    ],
  },
];

export const chatIcebreakerSuggestions = [
  "她说「一件让我处不来的小事是随意爽约」，你也是这样吗？",
  "你们都提到喜欢「舒适的沉默」——想问你平时约朋友更喜欢一起做什么？",
  "你最近在认真练普拉提，我也刚开始——想一起交流下老师推荐吗？",
  "看到你写「和服务员说话看人品」，同频！要不周末一起找个慢节奏的咖啡店坐坐？",
];

export const safeKeywords = [
  "见面",
  "地址",
  "几点",
  "咖啡店",
  "门口",
  "站",
  "来",
  "到",
];

export const ratingTagsPositive = [
  "守时",
  "真实",
  "有边界感",
  "超级好聊",
  "同频",
  "温柔",
  "清爽",
];
export const ratingTagsNegative = ["爽约", "目的不纯"];

export const brandCopy = {
  tagline: "找到同频的她",
  heroSub: "以三观同频为第一维度，遇见更多姐妹和伙伴。",
};

// 默认头像：四角星 ✨（Gemini 风）
export const defaultAvatarEmoji = "✨";

// —— 活动卡片数据（P11 活动页）——
// 从 companions.posts 聚合 + 加几条无归属的平台活动，形成瀑布流
export interface ActivityCard {
  id: string;
  title: string;
  scene: string;
  city: string;
  time: string;
  cover: string; // emoji 当封面
  host: { name: string; emoji: string; city: string };
  attendees: number;
  desc?: string;
  tags: string[];
}

export const activities: ActivityCard[] = [
  {
    id: "a1",
    title: "周六下午 苏州河西岸 慢走",
    scene: "日常",
    city: "上海",
    time: "本周末 14:00",
    cover: "🌿",
    host: { name: "小麦", emoji: "🌾", city: "上海" },
    attendees: 3,
    desc: "我想边走边瞎聊。走累了坐下来喝一杯。",
    tags: ["city walk", "舒适沉默"],
  },
  {
    id: "a2",
    title: "UCCA 新展 求同行姐妹 散场喝点东西",
    scene: "看展",
    city: "上海",
    time: "下周三 19:30",
    cover: "🎨",
    host: { name: "小麦", emoji: "🌾", city: "上海" },
    attendees: 2,
    desc: "展不赶，看得慢的姐妹优先。",
    tags: ["看展", "慢节奏"],
  },
  {
    id: "a3",
    title: "周日妙峰山 慢走不赶路",
    scene: "运动",
    city: "北京",
    time: "本周末 08:00",
    cover: "⛰️",
    host: { name: "栗子", emoji: "🌰", city: "北京" },
    attendees: 4,
    desc: "全程 4 小时以内，停下来拍花草的那种。",
    tags: ["徒步", "不赶进度"],
  },
  {
    id: "a4",
    title: "周日下午 一起做意面 喝白葡萄",
    scene: "日常",
    city: "杭州",
    time: "本周末 15:00",
    cover: "🍝",
    host: { name: "鹿野", emoji: "🦌", city: "杭州" },
    attendees: 2,
    desc: "我买菜，你带酒。",
    tags: ["做饭", "轻松"],
  },
  {
    id: "a5",
    title: "玉林 city walk 一下午 慢慢走",
    scene: "日常",
    city: "成都",
    time: "本周末 16:00",
    cover: "🌳",
    host: { name: "苏苏", emoji: "🌿", city: "成都" },
    attendees: 1,
    desc: "新来 3 个月，找一起走路的姐妹。",
    tags: ["city walk", "新城市"],
  },
  {
    id: "a6",
    title: "梧桐山 慢速徒步 周日早 8 点",
    scene: "运动",
    city: "深圳",
    time: "本周末 08:00",
    cover: "🥾",
    host: { name: "阿玖", emoji: "🪷", city: "深圳" },
    attendees: 3,
    desc: "爱中途停下来喝水那种。",
    tags: ["徒步"],
  },
  {
    id: "a7",
    title: "普拉提课后 一起吃沙拉",
    scene: "运动",
    city: "北京",
    time: "下周二 20:00",
    cover: "🥗",
    host: { name: "栗子", emoji: "🌰", city: "北京" },
    attendees: 2,
    desc: "刚下完课，想和练同类的人聊聊。",
    tags: ["普拉提"],
  },
  {
    id: "a8",
    title: "周末读书会 · 《蛤蟆先生去看心理医生》",
    scene: "日常",
    city: "北京",
    time: "本周末 14:30",
    cover: "📖",
    host: { name: "栗子", emoji: "🌰", city: "北京" },
    attendees: 5,
    desc: "读到哪聊到哪，不要求提前准备。",
    tags: ["读书", "边界感"],
  },
];
