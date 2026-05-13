export const QUESTIONS = [
  {
    id: 'c1', dim: 'C',
    text: '你让 AI 给你写一封邮件，拿到结果一看：既空洞又专业，说了半天等于没说。你会？',
    options: [
      { label: '凑合用，格式对了就行', value: 1 },
      { label: '让它重写，把要求描述得更清楚', value: 2 },
      { label: '这种情况我提前就防住了——Prompt 里有角色、约束和例子', value: 3 }
    ]
  },
  {
    id: 'b1', dim: 'B',
    text: '这个月，你用 AI 做过哪些领域的事？',
    options: [
      { label: '就本职工作的内容', value: 1 },
      { label: '工作为主，加生活里两三件事', value: 2 },
      { label: '工作、学习、设计、代码、法律合同... 至少 5 个领域都碰过', value: 3 }
    ]
  },
  {
    id: 'f1', dim: 'F',
    text: '你用 AI 的主要方式是什么？',
    options: [
      { label: '打开对话框，一问一答', value: 1 },
      { label: '会上传文件、开联网，偶尔用插件功能', value: 2 },
      { label: '主要用 Agent，让它自主读文件、执行操作、跑代码', value: 3 }
    ]
  },
  {
    id: 'r1', dim: 'R',
    text: '你有没有保存过自己的 Prompt 模板，反复调用？',
    options: [
      { label: '没有，每次都重新写', value: 1 },
      { label: '保存过几个，比较随意', value: 2 },
      { label: '有 Prompt 库，分类管理，定期迭代', value: 3 }
    ]
  },
  {
    id: 'c2', dim: 'C',
    text: 'AI 输出的内容你一般怎么验证真实性？',
    options: [
      { label: '感觉靠谱就用了', value: 1 },
      { label: '重要的会搜一下对一对', value: 2 },
      { label: '提前在 Prompt 里规定好：不确定的标注[推测]，重要内容给来源', value: 3 }
    ]
  },
  {
    id: 'b2', dim: 'B',
    text: '你有没有为 AI 工具掏过钱？',
    options: [
      { label: '没有，免费的够用', value: 1 },
      { label: '付过一个，比如 ChatGPT Plus 或者会员', value: 2 },
      { label: '付过三个以上，不同工具各有分工', value: 3 }
    ]
  },
  {
    id: 'f2', dim: 'F',
    text: '"MCP" 这三个字母，对你来说是？',
    options: [
      { label: '第一次听说', value: 1 },
      { label: '知道是什么，但还没配过', value: 2 },
      { label: '配了不少，我的 Agent 连着好几个外部工具', value: 3 }
    ]
  },
  {
    id: 'r2', dim: 'R',
    text: '和三个月前相比，你用 AI 的方式有什么变化？',
    options: [
      { label: '差不多，没啥变化', value: 1 },
      { label: '有些进步，但整体没有太大变化', value: 2 },
      { label: '完全不同了，像是两个人', value: 3 }
    ]
  },
  {
    id: 'c3', dim: 'C',
    text: '你给 AI 的提示词，通常长什么样？',
    options: [
      { label: '"帮我写个 XX"，直接说需求就行', value: 1 },
      { label: '会说背景和要求，但没有固定结构', value: 2 },
      { label: '角色 / 任务 / 格式 / 约束全给到，有可复用的模板', value: 3 }
    ]
  },
  {
    id: 'b3', dim: 'B',
    text: '身边的人有没有来找你"帮我用 AI 搞定一件跨领域的事"？',
    options: [
      { label: '没有，我也不太会', value: 1 },
      { label: '偶尔，我能帮上一点', value: 2 },
      { label: '经常有，基本没有我搞不定的场景', value: 3 }
    ]
  },
  {
    id: 'f3', dim: 'F',
    text: '你有没有让 AI 自主完成过一个多步骤任务，中间不需要你每步确认？',
    options: [
      { label: '没有，我需要全程参与和确认', value: 1 },
      { label: '尝试过，但 AI 会卡住或出错', value: 2 },
      { label: '是我的常态，Agent 跑着我去做别的', value: 3 }
    ]
  },
  {
    id: 'r3', dim: 'R',
    text: '你有没有为自己或别人搭过 AI 工作流或自动化流程？',
    options: [
      { label: '没有', value: 1 },
      { label: '搭过一两个，但比较简单', value: 2 },
      { label: '有一套自己的系统，覆盖了主要工作场景', value: 3 }
    ]
  },
  {
    id: 'c4', dim: 'C',
    text: 'AI 给了你十个方向但每个都很浅，你的应对方式是？',
    options: [
      { label: '截图，感叹"AI 还是不行"', value: 1 },
      { label: '挑一个方向继续追问', value: 2 },
      { label: '重新拆任务，让它每次只做一件事，分步走', value: 3 }
    ]
  },
  {
    id: 'b4', dim: 'B',
    text: '你用 AI 独立完成过哪些"以前需要找专业人士"的事？',
    options: [
      { label: '没有，专业的事还是找专业人', value: 1 },
      { label: '做过一两次，比如写合同或做简单设计', value: 2 },
      { label: '很多——代码、法律、设计、数据分析都干过', value: 3 }
    ]
  },
  {
    id: 'f4', dim: 'F',
    text: '你用过 Claude Code、Cursor 这类 Agent 编程工具吗？',
    options: [
      { label: '没用过，也没怎么了解', value: 1 },
      { label: '试过，但不是主力工具', value: 2 },
      { label: '在用，是我依赖程度最高的工具之一', value: 3 }
    ]
  },
  {
    id: 'r4', dim: 'R',
    text: '有没有人因为你用 AI 的方式感到惊讶，或者向你请教？',
    options: [
      { label: '没有', value: 1 },
      { label: '有一两次', value: 2 },
      { label: '经常，我也开始总结自己的方法论了', value: 3 }
    ]
  },
  {
    id: 'c5', dim: 'C',
    text: '你有没有给 AI 设置过记忆、系统指令，或者建过专属项目 / 知识库？',
    options: [
      { label: '没有', value: 1 },
      { label: '设置过一两条自定义指令', value: 2 },
      { label: '有体系化的上下文管理，不同任务有不同材料和指令', value: 3 }
    ]
  },
  {
    id: 'b5', dim: 'B',
    text: '你现在同时在用几个 AI 产品 / 工具？',
    options: [
      { label: '就一个', value: 1 },
      { label: '2-4 个', value: 2 },
      { label: '5 个以上，各有分工', value: 3 }
    ]
  },
  {
    id: 'f5', dim: 'F',
    text: '你最近一次让 AI 直接操作文件、运行代码或执行系统命令是什么时候？',
    options: [
      { label: '从来没有', value: 1 },
      { label: '试过，但比较谨慎，全程盯着', value: 2 },
      { label: '经常，已经充分信任它的执行能力了', value: 3 }
    ]
  },
  {
    id: 'r5', dim: 'R',
    text: '你和 AI 的关系，最接近哪个描述？',
    options: [
      { label: '偶尔用一下的工具', value: 1 },
      { label: '每天都用的助手', value: 2 },
      { label: '协作伙伴，是我工作方式本身的一部分', value: 3 }
    ]
  }
];

export const DIM_NAMES = { C: '可控性', B: '广度', F: '形态', R: '角色' };

export const DIM_SUBTITLES = {
  C: '你能把 AI 驯服到什么程度',
  B: '你把 AI 用到了多宽的疆域',
  F: '你在用 ChatBot 还是 Agent',
  R: '你是 AI 的消费者还是创造者'
};

export const DIM_EXPLANATIONS = {
  C: {
    L: '每次靠运气，AI 什么时候对什么时候错，你说不清楚为什么。',
    M: '知道怎么追问和补充背景，产出大概率能用，偶尔翻车。',
    H: '有结构化 Prompt，有约束机制，AI 的产出在你的预期范围内。'
  },
  B: {
    L: 'AI 是你某个固定场景里的工具，出了这个圈就回到原始状态。',
    M: '跨过了两三个领域，正在扩张，工具也在增加。',
    H: '没有 AI 做不了的领域，工具栈按场景分工，你是那个别人来找的人。'
  },
  F: {
    L: '还在对话框里打问答，AI 只负责输出，其他都得你来。',
    M: '用上了文件、联网、插件，开始感受到 AI 的边界在哪里。',
    H: 'Agent 是主力，多步自主执行，你负责定方向不负责执行。'
  },
  R: {
    L: '用别人的 Prompt，用现成的工具，AI 的产出是终点。',
    M: '有自己的积累，开始沉淀模板和流程，但还没成体系。',
    H: '有自己的 Skill 库、工作流、方法论，AI 产出是你系统的起点。'
  }
};
