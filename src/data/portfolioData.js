import automationCover from "../assets/images/projects/project-resume-ai.webp";
import dailyBriefCover from "../assets/images/projects/project-daily-brief.webp";
import learningCover from "../assets/images/projects/project-learning-generator.webp";

export const profile = {
  name: "JD",
  role: "AI Enthusiast & Creative Builder",
  eyebrow: "AI ENTHUSIAST / CREATIVE BUILDER",
  intro: "关注人工智能应用，持续探索人与技术之间更有创造力的连接方式。",
  about:
    "我喜欢把新的 AI 能力拆解成可以理解、可以体验、也真正有用的产品。通过持续学习与项目实践，我正在建立从需求理解、内容表达，到原型落地与迭代的完整能力。",
  quote: "不追逐每一个热点，更在意技术最终能为人创造什么。",
  email: "jd763540586@163.com",
  location: "中国",
  status: "正在探索 AI 领域",
  github: "https://github.com/yourname",
  githubLabel: "github.com/yourname",
  availability: "OPEN TO OPPORTUNITIES",
};

export const stats = [
  { value: "10+", label: "项目实践" },
  { value: "1000+", label: "小时学习" },
  { value: "30+", label: "AI 工具体验" },
  { value: "∞", label: "持续探索中" },
];

export const projects = [
  {
    id: "automation-workflow",
    index: "01",
    title: "AI 自动化工作流助手",
    type: "AUTOMATION / AI WORKFLOW",
    summary:
      "连接表单、邮件、表格与 AI 模型，将重复操作编排成可复用、可追踪的自动化流程。",
    technologies: ["Workflow Automation", "API Integration", "AI Agent"],
    highlight: "从触发条件到执行结果，搭建清晰可靠的自动化路径。",
    image: automationCover,
    imageAlt: "AI 自动化工作流助手的抽象项目视觉",
    demoUrl: "#contact",
    repoUrl: "https://github.com/yourname",
  },
  {
    id: "daily-brief",
    index: "02",
    title: "AI 每日资讯简报",
    type: "AUTOMATION / KNOWLEDGE FLOW",
    summary:
      "自动汇集 AI 与科技动态，完成筛选、去重和摘要，生成结构清晰的每日简报。",
    technologies: ["Automation", "Information Design", "AI Summary"],
    highlight: "减少信息噪音，让真正重要的变化更快被看见。",
    image: dailyBriefCover,
    imageAlt: "AI 每日资讯简报的抽象项目视觉",
    demoUrl: "#contact",
    repoUrl: "https://github.com/yourname",
  },
  {
    id: "learning-generator",
    index: "03",
    title: "智能学习资料生成器",
    type: "EDTECH / GENERATIVE AI",
    summary:
      "围绕一个学习主题，生成知识脉络、练习题和复习卡片，帮助学习者形成闭环。",
    technologies: ["Learning Design", "Content System", "Generative AI"],
    highlight: "把零散信息组织成可以循序渐进掌握的学习路径。",
    image: learningCover,
    imageAlt: "智能学习资料生成器的抽象项目视觉",
    demoUrl: "#contact",
    repoUrl: "https://github.com/yourname",
  },
];

export const strengths = [
  {
    id: "ai-tools",
    index: "01",
    title: "AI 工具应用",
    description: "快速理解不同类型的 AI 工具，并把能力组合进真实工作流。",
    keywords: ["探索", "组合", "落地"],
    icon: "brain",
  },
  {
    id: "learning",
    index: "02",
    title: "快速学习能力",
    description: "从陌生问题出发，建立知识框架，再通过动手实践完成验证。",
    keywords: ["拆解", "验证", "迭代"],
    icon: "spark",
  },
  {
    id: "creative",
    index: "03",
    title: "创意表达",
    description: "在内容、视觉和交互之间寻找统一的表达方式，让想法更易被理解。",
    keywords: ["叙事", "视觉", "交互"],
    icon: "palette",
  },
  {
    id: "insight",
    index: "04",
    title: "用户需求理解",
    description: "关注真实使用场景，区分表面需求与更值得解决的核心问题。",
    keywords: ["观察", "同理", "取舍"],
    icon: "telescope",
  },
  {
    id: "design",
    index: "05",
    title: "内容与视觉设计",
    description: "用清晰层级和克制审美，构建有信息效率、也有记忆点的体验。",
    keywords: ["层级", "系统", "审美"],
    icon: "wand",
  },
  {
    id: "execution",
    index: "06",
    title: "项目执行能力",
    description: "把目标转化为可完成的步骤，持续推进并对最终交付负责。",
    keywords: ["规划", "推进", "交付"],
    icon: "rocket",
  },
];

export const socialLinks = [
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
];

export const heroScenes = [
  {
    id: "portal",
    label: profile.eyebrow,
    title: ["HELLO, I'M", `${profile.name}.`],
    description: profile.intro,
  },
  {
    id: "space",
    label: "SELECTED SIGNALS / 2026",
    title: ["IDEAS, MADE", "VISIBLE."],
    projectIds: projects.map((project) => project.id),
  },
];
