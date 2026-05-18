# F1JUSTIN 个人网站技术实施指导文档

## 📋 一、最终架构确认

### 1.1 导航结构
```
F1JUSTIN | 作品 | 文章 | 关于
```

**说明：**
- 画廊暂时隐藏，未来实现时再加入
- 移动端使用汉堡菜单

### 1.2 页面架构
```
/
├── index.astro           # 首页
├── works/
│   └── index.astro       # 作品列表页
├── posts/
│   ├── index.astro       # 文章列表页
│   └── [slug].astro      # 文章详情页
├── about.astro           # 关于页
└── 404.astro            # 404 页面
```

### 1.3 内容架构
```
content/
├── config.ts             # Content Collections 配置
├── works/                # 作品元数据（YAML 格式）
│   ├── nekro-agent.yaml
│   ├── tongji-course.yaml
│   └── ...
└── posts/                # 文章（Markdown 格式）
    ├── photography-philosophy.md
    └── ...
```

---

## 📦 二、Content Collections 配置

### 2.1 作品集合（Works Collection）

**文件位置：** `content/config.ts`

**Schema 定义：**

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| title | string | ✅ | 项目标题 |
| emoji | string | ✅ | 视觉标识符（单个 emoji） |
| tagline | string | ✅ | 一句话描述 |
| time_range | string | ✅ | 时间段（如 "2024-03 至今"） |
| links.github | string (URL) | ❌ | GitHub 仓库链接 |
| links.post | string | ❌ | 关联文章的 slug |
| featured | boolean | ❌ | 是否在首页展示（默认 false） |
| order | number | ❌ | 首页展示顺序（数字越小越靠前） |

**YAML 文件示例：**
```
文件名：content/works/nekro-agent.yaml

title: "nekro-agent"
emoji: "🧠"
tagline: "高可扩展 AI 聊天机器人"
time_range: "2024-03 至今"
links:
  github: "https://github.com/F1Justin/nekro-agent"
  post: "nekro-agent-story"
featured: true
order: 1
```

### 2.2 文章集合（Posts Collection）

**Schema 定义：**

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| title | string | ✅ | 文章标题 |
| date | date | ✅ | 发布日期 |
| summary | string | ❌ | 摘要（1-2 句话） |

**Markdown 文件示例：**
```
文件名：content/posts/photography-philosophy.md

---
title: "摄影的觉醒：从迷茫到当代摄影实践"
date: 2025-09-20
summary: "从器材焦虑到观念先行，我的摄影之路..."
---

[正文内容...]
```

---

## 🏠 三、首页实现指导

### 3.1 页面结构

**区域划分（从上到下）：**

1. **Hero Section（英雄区）**
   - 大标题：F1JUSTIN
   - 副标题：一句话身份定位
   - 希尔伯特名言 + 打字机效果

2. **Featured Works（精选作品）**
   - 标题：「精选作品」
   - 4 个作品卡片（2x2 网格或 1 列）
   - "查看更多作品 →" 链接（跳转到 /works）

3. **My Capabilities（我会做什么）**
   - 标题：「我会做什么」
   - 4 个主题卡片：
     - 🧠 技术
     - 📷 视觉
     - 📚 阅读
     - 🔧 硬件

4. **Footer（页脚）**
   - 社交图标
   - 版权信息

### 3.2 精选作品区实现

**数据获取逻辑：**
1. 读取所有 works 集合
2. 筛选 `featured: true` 的作品
3. 按 `order` 字段升序排序
4. 取前 4 个
5. 如果不足 4 个，显示所有 featured 作品

**卡片布局：**
- 桌面端：2x2 网格（gap: 24px）
- 平板：2 列
- 移动端：1 列

**单个卡片设计规范：**

| 元素 | 样式规范 |
|------|----------|
| 容器 | 圆角 8px，背景色淡灰，padding 24px |
| Emoji | 字号 2em，左上角 |
| 标题 | 字号 1.25em，加粗，margin-top 12px |
| 描述 | 字号 0.9em，灰色（opacity 0.7） |
| 时间 | 字号 0.8em，更灰（opacity 0.6），右上角 |
| 状态指示器 | 如果包含"至今"，在时间前显示绿色圆点（直径 8px） |
| 链接按钮 | margin-top auto，右对齐 |

**状态指示器实现：**
- 检测 `time_range` 字段是否包含"至今"
- 如果是，在时间文字前添加 `<span>` 元素
- 样式：
  - 宽高：8px
  - 背景：绿色（建议 #10b981 或 hsl(142, 71%, 45%)）
  - 圆形：border-radius 50%
  - 位置：inline-block，vertical-align middle
  - 右侧间距：6px

**链接按钮逻辑：**
- 如果有 `links.github`：显示 [GitHub →]
- 如果有 `links.post`：显示 [详细介绍 →]
- 两个按钮横向排列，间距 12px

### 3.3 主题卡片区实现

**数据结构：**
定义在页面内部的静态数据数组：

```
主题列表 = [
  {
    emoji: "🧠",
    title: "技术",
    keywords: ["Linux", "AI 驱动开发", "自动化", "Nonebot"],
    anchor: "tech"  // 关于页的锚点 ID
  },
  {
    emoji: "📷",
    title: "视觉",
    keywords: ["HDR 摄影", "并置美学", "声音艺术"],
    anchor: "visual"
  },
  {
    emoji: "📚",
    title: "阅读",
    keywords: ["福柯", "莱姆", "PKD", "深度阅读"],
    anchor: "reading"
  },
  {
    emoji: "🔧",
    title: "硬件",
    keywords: ["NAS", "DIY", "电子", "木工"],
    anchor: "hardware"
  }
]
```

**卡片布局：**
- 桌面端：2x2 网格
- 移动端：1 列

**交互设计（方案 C）：**

1. **初始状态：**
   - 显示 emoji + 标题
   - 显示 3-4 个关键词（小字，灰色）

2. **悬停状态：**
   - 卡片轻微上浮（translateY -4px）
   - 出现左侧彩色边框（4px，accent color）
   - 阴影加深
   - 关键词变亮（opacity 增加）

3. **点击行为：**
   - 跳转到 `/about#[anchor]`
   - 页面滚动到对应主题区域
   - 可选：添加高亮动画

**卡片样式规范：**
- 背景：半透明灰色
- 圆角：8px
- Padding：20px
- 标题字号：1.1em
- 关键词字号：0.85em
- 关键词间用 `·` 分隔或用小圆点

---

## 📦 四、作品页实现指导

### 4.1 页面结构

**文件位置：** `src/pages/works/index.astro`

**布局：**
1. 页面标题："作品"
2. 作品列表（细长横向卡片）
3. 无分页（显示所有作品）

### 4.2 数据获取与排序

**逻辑：**
1. 读取所有 works 集合
2. 按时间倒序排序
   - 优先使用 `time_range` 中的起始时间
   - 解析逻辑：提取 "YYYY-MM" 格式
   - "至今" 的项目最靠前

**时间排序规则：**
- "2024-08 至今" → 当前时间（最新）
- "2024-03 - 2024-08" → 2024-08
- "2024-03 至今" → 当前时间
- "2024-01" → 2024-01

### 4.3 作品卡片设计

**卡片尺寸：**
- 宽度：100%（撑满容器）
- 高度：自适应（约 100-120px）
- 间距：每张卡片之间 16px

**内容布局（横向）：**
```
┌────────────────────────────────────────────────────────┐
│ 🧠 nekro-agent                                         │
│    高可扩展 AI 聊天机器人                               │
│    🟢 2024-03 至今                [GitHub →] [介绍 →]  │
└────────────────────────────────────────────────────────┘
```

**Flexbox 布局：**
- 主容器：`display: flex`, `flex-direction: column`, `justify-content: space-between`
- 第一行：Emoji + 标题（横向排列）
- 第二行：描述
- 第三行：时间 + 链接按钮（横向排列，space-between）

**元素样式：**

| 元素 | 样式 |
|------|------|
| Emoji | 字号 1.5em，margin-right 12px |
| 标题 | 字号 1.1em，加粗 |
| 描述 | 字号 0.9em，灰色，margin-top 8px |
| 时间 | 字号 0.8em，更灰，包含绿点（如果是"至今"） |
| 按钮 | 字号 0.9em，margin-left auto |

**悬停效果：**
- 整个卡片上浮 4px
- 左侧出现 accent color 边框（4px）
- 阴影：从 subtle 变为 medium

### 4.4 加载动画

**骨架屏实现：**
1. 初始渲染 5 个骨架卡片
2. 数据加载完成后，骨架淡出
3. 真实卡片 Stagger 淡入

**骨架样式：**
- 背景：灰色渐变（shimmer 效果）
- 使用 CSS 动画（pulse 或 shimmer）
- 高度与真实卡片一致（约 100-120px）

**Stagger 动画参数：**
- 第 1 张卡片：delay 0ms
- 第 2 张卡片：delay 100ms
- 第 3 张卡片：delay 200ms
- 以此类推

**动画效果：**
- 透明度：从 0 到 1
- 位移：从左侧 translateX(-20px) 到 0
- 持续时间：400ms
- 缓动函数：ease-out

---

## 📝 五、文章页实现指导

### 5.1 文章列表页

**文件位置：** `src/pages/posts/index.astro`

**页面结构：**
1. 页面标题："文章"
2. 文章列表（细长卡片）
3. 空状态处理

**空状态设计：**
- 显示占位图标（📝）
- 文字："暂无文章"
- 副文字："敬请期待更多深度思考..."

**数据获取：**
1. 读取所有 posts 集合
2. 按 `date` 字段倒序排序
3. 渲染卡片

**文章卡片设计：**

```
┌────────────────────────────────────────────────────────┐
│ 摄影的觉醒：从迷茫到当代摄影实践                         │
│ 2025-09-20                                             │
│ 从器材焦虑到观念先行，我的摄影之路...                   │
└────────────────────────────────────────────────────────┘
```

**布局：**
- 标题：大号字体（1.25em），加粗
- 日期：小字（0.8em），灰色，margin-top 8px
- 摘要：常规字号（0.95em），灰色，margin-top 12px，最多 2 行（超出省略）

**整卡可点击：**
- 点击跳转到 `/posts/[slug]`
- 悬停效果与作品卡片一致

### 5.2 文章详情页

**文件位置：** `src/pages/posts/[slug].astro`

**动态路由：**
- 使用 Astro 的 `getStaticPaths()` 函数
- 从 posts 集合生成所有路径

**页面结构：**
1. 文章头部（Header）
   - 标题
   - 日期
   - 返回链接（← 返回文章列表）

2. 文章正文
   - 使用 Markdown 渲染
   - 应用排版样式

3. 页脚（可选）
   - 版权声明
   - 社交分享（未来）

**Markdown 样式规范：**

| 元素 | 样式 |
|------|------|
| h1 | 字号 2em，margin-bottom 24px |
| h2 | 字号 1.5em，margin-top 48px，margin-bottom 16px |
| h3 | 字号 1.25em，margin-top 36px |
| p | 行高 1.7，margin-bottom 20px |
| a | 颜色 accent，下划线（悬停） |
| code (inline) | 背景灰色，padding 2px 6px，圆角 4px |
| pre (code block) | 背景深灰，padding 20px，圆角 8px，overflow-x auto |
| blockquote | 左侧边框 4px accent，padding-left 20px，斜体 |
| ul/ol | margin-left 24px，list-style-position outside |

---

## ℹ️ 六、关于页实现指导

### 6.1 页面结构

**文件位置：** `src/pages/about.astro`

**区域划分：**

1. **自我介绍区**
   - 标题："关于我"
   - 2-3 段自我介绍文字
   - 可以包含头像（可选）

2. **我会做什么（详细展开）**
   - 4 个主题区域，每个区域包含：
     - Emoji + 标题
     - 详细列表（你原有的兴趣条目）
     - 锚点 ID（用于首页跳转）

3. **联系方式**
   - Email
   - 社交图标（复用 SocialIcons 组件）

### 6.2 主题区域设计

**数据结构（页面内静态定义）：**

```
主题区域 = [
  {
    id: "tech",        // 锚点 ID
    emoji: "🧠",
    title: "技术",
    items: [
      "Linux 与 Nix 生态深度用户",
      "AI 驱动开发实践者",
      "Nonebot 插件生态贡献者",
      // ... 更多条目
    ]
  },
  // ... 其他主题
]
```

**渲染逻辑：**
1. 遍历主题数组
2. 为每个主题创建区域
3. 添加 `id` 属性作为锚点
4. 渲染列表

**区域样式：**
- 每个主题之间间距：64px
- 标题：Emoji（1.5em）+ 文字（1.3em，加粗）
- 列表：无序列表，margin-left 24px
- 列表项：行高 1.8，字号 0.95em

**锚点跳转平滑滚动：**
- CSS：`scroll-behavior: smooth;`（在 html 或 body 上）
- 或使用 JavaScript 的 `scrollIntoView({ behavior: 'smooth' })`

---

## 🎨 七、全局样式规范

### 7.1 颜色系统

**CSS 自定义属性（基于现有配置）：**

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --color-bg | hsl(0, 0%, 100%) | hsl(0, 0%, 10%) |
| --color-text | hsl(0, 0%, 10%) | hsl(0, 0%, 90%) |
| --color-accent | hsl(272, 63%, 59%) | hsl(272, 63%, 59%) |
| --color-muted | opacity 0.6 | opacity 0.6 |
| --color-border | hsl(0, 0%, 90%) | hsl(0, 0%, 20%) |
| --color-card-bg | mix(bg 95%, text 5%) | mix(bg 95%, text 5%) |

**状态指示器：**
- 绿色圆点：`#10b981` 或 `hsl(142, 71%, 45%)`

### 7.2 排版系统

**字体栈：**
```
font-family: 
  "Inter", 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  "PingFang SC", 
  "Hiragino Sans GB", 
  "Microsoft YaHei", 
  sans-serif;
```

**字号比例（基于 16px）：**

| 用途 | 字号 | rem 值 |
|------|------|--------|
| 大标题 (h1) | 32px | 2rem |
| 中标题 (h2) | 24px | 1.5rem |
| 小标题 (h3) | 20px | 1.25rem |
| 正文 | 16px | 1rem |
| 次要文字 | 14px | 0.875rem |
| 小字 | 13px | 0.8125rem |

**行高：**
- 标题：1.2
- 正文：1.7
- 列表：1.8

### 7.3 间距系统

**统一间距值：**
- 4px：细微间距
- 8px：小间距
- 12px：元素内部间距
- 16px：卡片间距
- 24px：区域内部间距
- 32px：小区域间距
- 48px：中区域间距
- 64px：大区域间距

### 7.4 圆角与阴影

**圆角：**
- 小元素（按钮、标签）：4px
- 卡片：8px
- 大容器：12px

**阴影层级：**

| 层级 | 用途 | 值 |
|------|------|----|
| subtle | 默认卡片 | 0 1px 3px rgba(0,0,0,0.1) |
| medium | 悬停卡片 | 0 4px 12px rgba(0,0,0,0.15) |
| large | 弹窗、模态框 | 0 12px 24px rgba(0,0,0,0.2) |

---

## 🔧 八、组件设计指导

### 8.1 WorkCard 组件（作品卡片）

**Props：**
- `work`: 作品对象（包含所有字段）
- `variant`: 'featured' | 'list'（首页精选 vs 列表页）

**条件渲染逻辑：**

1. **状态指示器显示：**
   ```
   如果 work.time_range 包含 "至今"：
     显示绿色圆点
   ```

2. **链接按钮显示：**
   ```
   如果 work.links.github 存在：
     显示 [GitHub →] 按钮
   
   如果 work.links.post 存在：
     显示 [详细介绍 →] 按钮
   ```

3. **时间格式化：**
   - 直接显示 `work.time_range` 原始值
   - 不需要解析处理

### 8.2 PostCard 组件（文章卡片）

**Props：**
- `post`: 文章对象

**元素：**
- 标题：`post.title`
- 日期：`post.date`（格式化为 YYYY-MM-DD）
- 摘要：`post.summary`（可选，如果存在则显示）

**日期格式化：**
- 使用 JavaScript Date 对象
- 格式：`YYYY-MM-DD` 或 `YYYY 年 MM 月 DD 日`

### 8.3 ThemeCard 组件（主题卡片）

**Props：**
- `theme`: 主题对象（emoji, title, keywords, anchor）

**交互状态：**
- `hover`: 布尔值，控制悬停样式
- `onClick`: 跳转到 `/about#${theme.anchor}`

**关键词渲染：**
- 使用 `·` 或 `•` 分隔
- 示例："Linux · AI 驱动开发 · 自动化"

### 8.4 SkeletonCard 组件（骨架屏）

**变体：**
- `work`: 作品卡片骨架
- `post`: 文章卡片骨架

**动画：**
- Shimmer 效果（光泽扫过）
- 或 Pulse 效果（明暗脉冲）

**实现提示：**
- 使用 CSS `@keyframes` 定义动画
- 背景使用渐变 + `background-position` 或 `background-size` 动画

---

## 🎭 九、交互与动画细节

### 9.1 页面加载动画

**作品页/文章页：**
1. 页面加载时显示骨架屏（5 个）
2. 数据获取完成后：
   - 骨架屏同时淡出（fade-out，200ms）
   - 真实卡片依次淡入（Stagger）

**Stagger 实现逻辑：**
- 每张卡片添加 `style="animation-delay: ${index * 100}ms"`
- CSS 动画：
  ```
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  ```
- 应用：`animation: fadeInSlide 400ms ease-out forwards;`

### 9.2 卡片悬停效果

**通用卡片悬停：**
- 过渡时间：200ms
- 缓动函数：ease-out
- 变化属性：
  - `transform: translateY(-4px)`
  - `box-shadow`: 从 subtle 到 medium
  - `border-left`: 0 → 4px accent color

**实现方式：**
- CSS `:hover` 伪类
- 使用 `transition` 属性平滑过渡

### 9.3 平滑滚动

**全局设置：**
- 在 `<html>` 或 `<body>` 标签上添加 `scroll-behavior: smooth`

**锚点跳转增强（可选）：**
- 使用 JavaScript 拦截锚点链接点击
- 使用 `scrollIntoView({ behavior: 'smooth', block: 'start' })`
- 添加滚动偏移（避免内容被固定导航栏遮挡）

### 9.4 响应式交互

**移动端优化：**
- 移除悬停效果（`:hover` 在移动端体验不佳）
- 使用 `:active` 代替（点击时的视觉反馈）
- 增大点击区域（最小 44x44px）

**媒体查询断点：**
- 移动端：< 640px
- 平板：640px - 1024px
- 桌面端：> 1024px

---

## 🔍 十、SEO 与元数据

### 10.1 全局元数据

**在 Layout 组件中定义：**

| 标签 | 内容 |
|------|------|
| `<title>` | 页面标题 \| F1JUSTIN |
| `<meta name="description">` | 页面描述（120-160 字） |
| `<meta name="author">` | F1JUSTIN |
| `<link rel="canonical">` | 当前页面的规范 URL |

### 10.2 Open Graph 标签

**社交分享优化：**

```
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:type" content="website">
<meta property="og:url" content="当前 URL">
<meta property="og:image" content="分享图片 URL">
```

**分享图片建议：**
- 尺寸：1200x630px
- 格式：JPG 或 PNG
- 内容：网站 Logo + 页面标题

### 10.3 页面特定元数据

**首页：**
- Title: "F1JUSTIN - 系统构建者 | 视觉叙事者"
- Description: "F1JUSTIN 的个人网站，展示技术项目、摄影作品与深度思考"

**作品页：**
- Title: "作品 | F1JUSTIN"
- Description: "查看我的技术项目与创作作品"

**文章详情页：**
- Title: "{文章标题} | F1JUSTIN"
- Description: "{文章摘要}"

**关于页：**
- Title: "关于 | F1JUSTIN"
- Description: "了解我的背景、技能与兴趣"

---

## ⚡ 十一、性能优化

### 11.1 图片优化

**使用 Astro Image 组件：**
- 自动转换为 WebP/AVIF 格式
- 生成多尺寸响应式图片
- Lazy loading（懒加载）

**图片规格：**
- Emoji：使用 Unicode 字符（无需图片）
- 头像（如果有）：最大 200x200px
- 作品封面（未来）：最大 800px 宽

### 11.2 代码分割

**React 组件加载策略：**

| 组件 | 加载时机 | 指令 |
|------|----------|------|
| SocialIcons | 页面加载时 | `client:load` |
| ThemeCard（如果需要交互） | 可见时 | `client:visible` |
| 其他静态组件 | 服务端渲染 | 无（默认） |

### 11.3 字体优化

**策略：**
1. 使用系统字体栈（无需加载外部字体）
2. 如果使用 Web 字体：
   - 使用 `font-display: swap`
   - 子集化（只包含所需字符）
   - 预加载关键字体文件

### 11.4 CSS 优化

**关键 CSS 内联：**
- 首屏渲染所需的 CSS 内联到 `<head>` 中
- 非关键 CSS 异步加载

**CSS 压缩：**
- 生产环境自动启用（Astro 默认行为）

---

## ♿ 十二、可访问性（A11y）

### 12.1 语义化 HTML

**使用正确的标签：**
- `<nav>` 包裹导航栏
- `<main>` 包裹主要内容
- `<article>` 包裹文章
- `<section>` 划分区域
- `<footer>` 页脚

### 12.2 ARIA 标签

**链接可访问性：**
- 所有图标链接添加 `aria-label`
- 示例：`<a href="..." aria-label="访问 nekro-agent 的 GitHub 仓库">`

**交互元素：**
- 按钮使用 `<button>` 标签（而非 `<div>`）
- 可展开区域添加 `aria-expanded` 属性

### 12.3 键盘导航

**必须支持：**
- Tab 键顺序合理
- 所有交互元素可通过键盘访问
- 焦点状态可见（outline 或自定义样式）

**焦点样式：**
```
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### 12.4 颜色对比度

**WCAG AA 标准：**
- 正文文字：至少 4.5:1
- 大号文字（18px+）：至少 3:1
- 图标按钮：至少 3:1

**测试工具：**
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker

---

## 📱 十三、响应式设计

### 13.1 断点定义

**媒体查询断点：**

| 设备类型 | 宽度范围 | 主要调整 |
|----------|----------|----------|
| 移动端 | < 640px | 单列布局，汉堡菜单 |
| 平板 | 640px - 1024px | 2 列布局 |
| 桌面端 | > 1024px | 多列布局 |

### 13.2 布局调整

**首页精选作品：**
- 桌面：2x2 网格
- 平板：2 列
- 移动：1 列

**主题卡片：**
- 桌面/平板：2x2 网格
- 移动：1 列

**导航栏：**
- 桌面/平板：横向排列
- 移动：汉堡菜单（折叠）

### 13.3 字体缩放

**移动端调整：**
- 大标题：缩小 10-20%
- 正文：保持 16px（可读性）
- 行高：增加到 1.8（移动端更舒适）

---

## 🚨 十四、错误处理

### 14.1 404 页面

**文件位置：** `src/pages/404.astro`

**页面内容：**
```
┌────────────────────────────────────────┐
│ 404                                    │
│                                        │
│ 页面不存在                              │
│                                        │
│ [返回首页]  [查看作品]  [阅读文章]      │
└────────────────────────────────────────┘
```

**样式：**
- 垂直居中
- 大号 404 数字（6rem）
- 灰色提示文字
- 按钮横向排列

### 14.2 空状态处理

**文章列表为空：**
```
┌────────────────────────────────────────┐
│ 📝                                     │
│                                        │
│ 暂无文章                                │
│ 敬请期待更多深度思考...                  │
└────────────────────────────────────────┘
```

**作品列表为空：**
```
┌────────────────────────────────────────┐
│ 📦                                     │
│                                        │
│ 暂无作品                                │
│ 作品正在创作中...                       │
└────────────────────────────────────────┘
```

---

## 📊 十五、分析与监控

### 15.1 已集成工具

**Vercel Analytics：**
- 已在代码中集成 ✅
- 自动追踪页面浏览量
- 无需额外配置

**Vercel Speed Insights：**
- 已在代码中集成 ✅
- 监控性能指标（FCP, LCP, CLS 等）
- 无需额外配置

### 15.2 可选工具

**Plausible Analytics（隐私友好）：**
- 轻量级（< 1KB）
- 无 Cookie
- 符合 GDPR

**实施方式：**
- 在 `<head>` 中添加脚本标签
- 配置域名白名单

---

## 🔐 十六、安全与隐私

### 16.1 外部链接安全

**所有外部链接添加：**
- `rel="noopener noreferrer"`
- 防止 `window.opener` 攻击

**示例：**
```
<a href="https://github.com/..." target="_blank" rel="noopener noreferrer">
  GitHub
</a>
```

### 16.2 CSP 配置（可选）

**Content Security Policy：**
- 限制脚本来源
- 防止 XSS 攻击

**Vercel 配置（vercel.json）：**
```
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' va.vercel-scripts.com; ..."
        }
      ]
    }
  ]
}
```

---

## 📦 十七、部署配置

### 17.1 Vercel 部署

**配置文件：** `vercel.json`（可选）

**环境变量：**
- 无需配置（静态站点）

**构建命令：**
- `npm run build` 或 `pnpm build`

**输出目录：**
- `dist/`

### 17.2 构建优化

**Astro 配置（astro.config.mjs）：**
- 启用压缩：`compressHTML: true`
- 图片优化：`image.service: 'astro/assets/services/sharp'`
- 预渲染路由：默认全部预渲染（SSG）

### 17.3 Git 配置

**忽略文件（.gitignore）：**
```
node_modules/
dist/
.env
.DS_Store
```

**推荐分支策略：**
- `main`：生产环境（自动部署）
- `dev`：开发环境（预览部署）

---

## 🎯 十八、开发工作流

### 18.1 开发环境

**启动命令：**
```
npm run dev
# 或
pnpm dev
```

**热更新：**
- Astro 支持 HMR（Hot Module Replacement）
- 修改文件后自动刷新浏览器

### 18.2 内容创建流程

**添加新作品：**
1. 在 `content/works/` 创建 YAML 文件
2. 填写必需字段（title, emoji, tagline, time_range）
3. 可选：添加 `featured: true` 和 `order`
4. 保存文件，自动出现在作品页

**发布新文章：**
1. 在 `content/posts/` 创建 MD 文件
2. 填写 frontmatter（title, date, summary）
3. 编写正文
4. 保存文件，自动出现在文章列表

**链接作品与文章：**
1. 文章的文件名（slug）为 `example-post`
2. 在作品 YAML 中添加：`links.post: "example-post"`
3. 作品卡片自动显示"详细介绍"链接

### 18.3 测试检查清单

**功能测试：**
- [ ] 首页精选作品显示正确（4 个）
- [ ] 主题卡片点击跳转到关于页对应锚点
- [ ] 作品页显示所有作品，按时间排序
- [ ] "至今"项目显示绿色圆点
- [ ] 文章列表按时间排序
- [ ] 文章详情页 Markdown 渲染正确
- [ ] 404 页面显示正常

**响应式测试：**
- [ ] 移动端（375px）布局正常
- [ ] 平板（768px）布局正常
- [ ] 桌面端（1440px）布局正常
- [ ] 导航栏在移动端正常工作

**性能测试：**
- [ ] Lighthouse 性能分数 > 90
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

**可访问性测试：**
- [ ] Lighthouse 可访问性分数 > 95
- [ ] 所有交互元素可通过键盘访问
- [ ] 屏幕阅读器可正确读取

---

## 📝 十九、关键实现提示

### 19.1 时间解析与排序

**挑战：** `time_range` 是字符串，需要提取日期进行排序

**解决方案：**
1. 创建工具函数 `parseTimeRange(timeRange: string)`
2. 逻辑：
   - 如果包含"至今"→ 返回当前日期
   - 如果包含"-"（范围）→ 提取后一个日期
   - 否则 → 提取唯一日期
3. 将提取的日期字符串（YYYY-MM）转为 Date 对象
4. 按 Date 对象排序

### 19.2 绿色圆点状态指示器

**实现细节：**

**HTML 结构：**
```
<span class="status-indicator"></span> 2024-03 至今
```

**CSS 样式：**
```
.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  margin-right: 6px;
  vertical-align: middle;
}
```

**条件渲染：**
- 仅当 `time_range.includes('至今')` 时显示

### 19.3 Markdown 渲染配置

**Astro Markdown 配置（astro.config.mjs）：**

**语法高亮：**
- 使用 Shiki 或 Prism
- 主题：选择深色/浅色模式对应的主题

**Markdown 插件（可选）：**
- `remark-gfm`：支持 GitHub Flavored Markdown
- `rehype-slug`：自动为标题生成 ID
- `rehype-autolink-headings`：标题自动添加锚点链接

### 19.4 首页主题卡片锚点跳转

**实现方式（纯 HTML/CSS）：**

**链接：**
```
<a href="/about#tech" class="theme-card">
  ...
</a>
```

**关于页锚点：**
```
<section id="tech">
  <h2>🧠 技术</h2>
  ...
</section>
```

**平滑滚动：**
- 全局 CSS：`html { scroll-behavior: smooth; }`

**滚动偏移（如果有固定导航栏）：**
```
#tech {
  scroll-margin-top: 80px; /* 导航栏高度 */
}
```

---

## 🔄 二十、未来扩展规划

### 20.1 画廊系统

**时机：** Phase 2（核心功能完成后）

**实现要点：**
- 单独的 `gallery` Content Collection
- 使用 Astro Image 组件优化 HDR 照片
- Lightbox 组件（使用 React 或原生 JS）
- EXIF 信息展示（需要解析库）

### 20.2 搜索功能

**推荐方案：** Pagefind（Astro 官方推荐）

**特点：**
- 静态生成索引
- 客户端搜索（无需后端）
- 支持中文分词

**集成步骤：**
1. 安装 `pagefind` 包
2. 构建后运行索引生成
3. 添加搜索 UI 组件

### 20.3 RSS 订阅

**文章更新通知：**

**实现方式：**
1. 创建 `src/pages/rss.xml.ts`
2. 使用 `@astrojs/rss` 包生成 feed
3. 在页脚添加订阅链接

### 20.4 评论系统（可选）

**轻量级方案：**
- Giscus（基于 GitHub Discussions）
- Utterances（基于 GitHub Issues）

**特点：**
- 无需后端
- 访客使用 GitHub 账号登录
- 免费

---

## ✅ 二十一、最终确认

### 21.1 架构总结

**页面：**
- 首页：精选作品（4 个）+ 主题卡片（4 个）
- 作品页：所有作品列表
- 文章页：文章列表 + 详情页
- 关于页：自我介绍 + 详细主题展开

**导航：**
- F1JUSTIN | 作品 | 文章 | 关于

**内容管理：**
- works/*.yaml：作品元数据
- posts/*.md：文章内容

**核心功能：**
- 作品卡片：Emoji + 标题 + 描述 + 时间（含绿点） + 双链接
- 文章卡片：标题 + 日期 + 摘要
- 主题卡片：悬停预览 + 点击跳转
- 骨架屏 + Stagger 动画

### 21.2 技术栈确认

**框架：**
- Astro（SSG）
- React（客户端交互组件）

**内容：**
- Content Collections
- Markdown/YAML

**样式：**
- CSS（自定义属性）
- 响应式设计

**部署：**
- Vercel
- 自动部署

**监控：**
- Vercel Analytics
- Vercel Speed Insights

---

## 🚀 二十二、开始实施

### 22.1 第一步：设置 Content Collections

1. 创建 `content/config.ts`
2. 定义 works 和 posts 的 schema
3. 创建示例内容文件测试

### 22.2 第二步：实现核心页面

1. 首页：精选作品 + 主题卡片
2. 作品页：列表 + 骨架屏
3. 文章页：列表 + 详情

### 22.3 第三步：样式与交互

1. 全局样式配置
2. 卡片组件样式
3. 悬停效果与动画
4. 响应式调整

### 22.4 第四步：优化与测试

1. SEO 元数据
2. 性能优化
3. 可访问性测试
4. 跨浏览器测试

---

## 📚 参考资源

### 技术文档：
- Astro 官方文档：https://docs.astro.build
- Content Collections：https://docs.astro.build/en/guides/content-collections/
- Astro Image：https://docs.astro.build/en/guides/images/

### 设计参考：
- CSS 自定义属性：MDN Web Docs
- 动画缓动函数：easings.net
- 颜色对比度工具：WebAIM Contrast Checker

### 性能工具：
- Lighthouse：Chrome DevTools
- PageSpeed Insights：web.dev

# 双语网站设计方案（中英文支持）

## 📋 一、多语言架构设计

### 1.1 URL 结构方案对比

[1 tool called]

好的！我来为你设计一个完整的双语网站架构方案。这将是对现有文档的重要补充。

---

# 双语网站（中英文）技术架构设计

## 📋 一、URL 路由策略

### 1.1 推荐方案：路径前缀方式

**结构设计：**
```
默认（中文）：
/                    → 首页
/works               → 作品页
/posts               → 文章列表
/about               → 关于页

英文版本：
/en                  → 英文首页
/en/works            → Works 页面
/en/posts            → Posts 列表
/en/about            → About 页面
```

**优势：**
- ✅ SEO 友好（搜索引擎易识别）
- ✅ URL 清晰直观
- ✅ 易于实现和维护
- ✅ 支持独立的语言版本缓存

**替代方案对比：**

| 方案 | URL 示例 | 优点 | 缺点 | 推荐度 |
|------|----------|------|------|--------|
| **路径前缀** | `/en/works` | SEO 好，清晰 | 需要复制路由 | ⭐⭐⭐⭐⭐ |
| 子域名 | `en.f1justin.com` | 完全独立 | 需要额外配置，成本高 | ⭐⭐⭐ |
| 查询参数 | `/?lang=en` | 实现简单 | SEO 差，不专业 | ⭐⭐ |
| Cookie/Header | 无 URL 变化 | 用户友好 | SEO 极差 | ⭐ |

**最终选择：路径前缀方式（`/en/...`）**

### 1.2 默认语言设置

**策略：**
1. **根路径（`/`）= 中文版本**
   - 你的主要受众是中文用户
   - 简化中文访问路径

2. **英文版本需要明确访问（`/en`）**
   - 国际访问者通过语言切换器访问
   - 或通过浏览器语言检测自动跳转

3. **浏览器语言检测（可选）：**
   - 首次访问时检测浏览器语言
   - 如果是 `en-US`, `en-GB` 等 → 重定向到 `/en`
   - 记住用户选择（localStorage）

---

## 📂 二、文件与目录结构

### 2.1 页面文件结构

**方案 A：平铺结构（推荐）**

```
src/pages/
├── index.astro                    # 中文首页
├── works/
│   └── index.astro                # 中文作品页
├── posts/
│   ├── index.astro                # 中文文章列表
│   └── [slug].astro               # 中文文章详情
├── about.astro                    # 中文关于页
│
└── en/                            # 英文版本目录
    ├── index.astro                # 英文首页
    ├── works/
    │   └── index.astro            # 英文 Works 页
    ├── posts/
    │   ├── index.astro            # 英文 Posts 列表
    │   └── [slug].astro           # 英文 Post 详情
    └── about.astro                # 英文 About 页
```

**优势：**
- 清晰分离中英文页面
- 每个语言版本可以独立定制布局
- 易于维护

**方案 B：共享组件结构（高级）**

```
src/pages/
├── [...slug].astro                # 动态路由处理所有语言
└── en/[...slug].astro             # 英文动态路由

src/layouts/
├── BaseLayout.astro               # 基础布局
└── LocalizedLayout.astro          # 本地化布局包装器

src/i18n/
├── locales/
│   ├── zh.json                    # 中文翻译
│   └── en.json                    # 英文翻译
└── utils.ts                       # i18n 工具函数
```

**推荐：方案 A（平铺结构）**
- 对于你的网站规模（4-5 个页面），平铺结构更简单直观
- 避免过度工程化

### 2.2 内容文件结构

**双语内容管理方式：**

**方案 A：文件名后缀区分（推荐）**

```
content/
├── works/
│   ├── nekro-agent.zh.yaml        # 中文版本
│   ├── nekro-agent.en.yaml        # 英文版本
│   ├── tongji-course.zh.yaml
│   └── tongji-course.en.yaml
│
└── posts/
    ├── photography-philosophy.zh.md
    ├── photography-philosophy.en.md
    ├── organic-chem-war.zh.md
    └── organic-chem-war.en.md
```

**优势：**
- 同一内容的不同语言版本在同一目录
- 文件名清晰标识语言
- 易于管理和查找

**方案 B：目录区分**

```
content/
├── zh/
│   ├── works/
│   └── posts/
└── en/
    ├── works/
    └── posts/
```

**优势：**
- 语言版本完全隔离
- 适合内容完全不同的情况

**推荐：方案 A（文件名后缀）**
- 你的内容是翻译关系，而非完全独立
- 易于看出哪些内容有/无英文版本

### 2.3 Content Collections Schema 更新

**作品集合（Works）：**

| 字段 | 类型 | 必需 | 新增说明 |
|------|------|------|----------|
| title | string | ✅ | 保持原样 |
| emoji | string | ✅ | 保持原样（emoji 通用） |
| tagline | string | ✅ | 保持原样（翻译内容） |
| time_range | string | ✅ | 保持原样 |
| **lang** | `'zh' \| 'en'` | ✅ | **新增：语言标识** |
| **slug** | string | ✅ | **新增：唯一标识符（跨语言共享）** |
| links.github | string | ❌ | 保持原样 |
| links.post | string | ❌ | 保持原样 |
| featured | boolean | ❌ | 保持原样 |
| order | number | ❌ | 保持原样 |

**文件示例：**

`content/works/nekro-agent.zh.yaml`
```yaml
slug: "nekro-agent"           # 唯一标识
lang: "zh"                     # 语言
title: "nekro-agent"
emoji: "🧠"
tagline: "高可扩展 AI 聊天机器人"
time_range: "2024-03 至今"
links:
  github: "https://github.com/F1Justin/nekro-agent"
  post: "nekro-agent-story"
featured: true
order: 1
```

`content/works/nekro-agent.en.yaml`
```yaml
slug: "nekro-agent"           # 相同的 slug
lang: "en"                     # 英文
title: "nekro-agent"
emoji: "🧠"
tagline: "Highly Scalable AI Chatbot"
time_range: "Mar 2024 - Present"
links:
  github: "https://github.com/F1Justin/nekro-agent"
  post: "nekro-agent-story-en"
featured: true
order: 1
```

**关键点：**
- `slug` 字段跨语言共享，用于关联同一作品的不同语言版本
- `lang` 字段用于过滤语言
- `time_range` 英文版本使用英文表达（"Mar 2024 - Present"）

**文章集合（Posts）：**

| 字段 | 类型 | 必需 | 新增说明 |
|------|------|------|----------|
| title | string | ✅ | 保持原样 |
| date | date | ✅ | 保持原样 |
| summary | string | ❌ | 保持原样 |
| **lang** | `'zh' \| 'en'` | ✅ | **新增：语言标识** |
| **slug** | string | ✅ | **新增：唯一标识符** |
| **has_translation** | boolean | ❌ | **新增：是否有翻译版本** |

---

## 🌐 三、导航与 UI 翻译

### 3.1 导航栏设计

**中文版本：**
```
F1JUSTIN | 作品 | 文章 | 关于 | [EN]
```

**英文版本：**
```
F1JUSTIN | Works | Posts | About | [中]
```

**语言切换器设计：**

**位置：** 导航栏最右侧

**样式选项：**

| 方案 | 样式 | 优点 | 缺点 |
|------|------|------|------|
| 文字链接 | `[EN]` 或 `English` | 清晰明确 | 占用空间 |
| 图标 + 文字 | `🌐 EN` | 视觉突出 | 稍显花哨 |
| 国旗图标 | 🇨🇳 🇬🇧 | 直观 | 政治敏感，不推荐 |
| 简写 | `中/EN` | 简洁 | 可能不够明显 |

**推荐：简洁文字链接**
- 中文页面：`EN`（小字，灰色）
- 英文页面：`中`（小字，灰色）
- 悬停变为 accent color

**交互逻辑：**
1. 检测当前页面路径
2. 切换到对应语言的相同页面
3. 示例：
   - `/works` → 点击 `EN` → `/en/works`
   - `/en/about` → 点击 `中` → `/about`
   - `/posts/photography-philosophy` → `/en/posts/photography-philosophy`

**特殊情况处理：**
- 如果某文章/作品无对应语言版本：
  - 跳转到该语言的首页或列表页
  - 或显示提示："该内容暂无英文版本"

### 3.2 UI 元素翻译表

**创建翻译配置文件：**

`src/i18n/locales/zh.json`
```json
{
  "nav": {
    "works": "作品",
    "posts": "文章",
    "about": "关于"
  },
  "home": {
    "featured_works": "精选作品",
    "view_more": "查看更多作品",
    "my_capabilities": "我会做什么"
  },
  "works": {
    "page_title": "作品",
    "github_link": "GitHub",
    "read_more": "详细介绍",
    "empty_state": "暂无作品",
    "empty_hint": "作品正在创作中..."
  },
  "posts": {
    "page_title": "文章",
    "empty_state": "暂无文章",
    "empty_hint": "敬请期待更多深度思考...",
    "back_to_list": "返回文章列表"
  },
  "about": {
    "page_title": "关于我",
    "contact": "联系方式"
  },
  "time": {
    "present": "至今",
    "date_format": "YYYY年MM月DD日"
  },
  "404": {
    "title": "页面不存在",
    "back_home": "返回首页",
    "view_works": "查看作品",
    "view_posts": "阅读文章"
  }
}
```

`src/i18n/locales/en.json`
```json
{
  "nav": {
    "works": "Works",
    "posts": "Posts",
    "about": "About"
  },
  "home": {
    "featured_works": "Featured Works",
    "view_more": "View More Works",
    "my_capabilities": "What I Do"
  },
  "works": {
    "page_title": "Works",
    "github_link": "GitHub",
    "read_more": "Read More",
    "empty_state": "No Works Yet",
    "empty_hint": "Works are being created..."
  },
  "posts": {
    "page_title": "Posts",
    "empty_state": "No Posts Yet",
    "empty_hint": "Stay tuned for more insights...",
    "back_to_list": "Back to Posts"
  },
  "about": {
    "page_title": "About Me",
    "contact": "Contact"
  },
  "time": {
    "present": "Present",
    "date_format": "MMM DD, YYYY"
  },
  "404": {
    "title": "Page Not Found",
    "back_home": "Back Home",
    "view_works": "View Works",
    "view_posts": "Read Posts"
  }
}
```

### 3.3 主题卡片翻译

**中文版本数据：**
```javascript
const themesZh = [
  {
    emoji: "🧠",
    title: "技术",
    keywords: ["Linux", "AI 驱动开发", "自动化", "Nonebot"],
    anchor: "tech"
  },
  {
    emoji: "📷",
    title: "视觉",
    keywords: ["HDR 摄影", "并置美学", "声音艺术"],
    anchor: "visual"
  },
  {
    emoji: "📚",
    title: "阅读",
    keywords: ["福柯", "莱姆", "PKD", "深度阅读"],
    anchor: "reading"
  },
  {
    emoji: "🔧",
    title: "硬件",
    keywords: ["NAS", "DIY", "电子", "木工"],
    anchor: "hardware"
  }
]
```

**英文版本数据：**
```javascript
const themesEn = [
  {
    emoji: "🧠",
    title: "Technology",
    keywords: ["Linux", "AI-Driven Dev", "Automation", "Nonebot"],
    anchor: "tech"
  },
  {
    emoji: "📷",
    title: "Visual Arts",
    keywords: ["HDR Photography", "Juxtaposition", "Sound Art"],
    anchor: "visual"
  },
  {
    emoji: "📚",
    title: "Reading",
    keywords: ["Foucault", "Lem", "PKD", "Deep Reading"],
    anchor: "reading"
  },
  {
    emoji: "🔧",
    title: "Hardware",
    keywords: ["NAS", "DIY", "Electronics", "Woodworking"],
    anchor: "hardware"
  }
]
```

---

## 🔧 四、技术实现要点

### 4.1 语言检测与切换

**工具函数设计：**

`src/i18n/utils.ts` 需要包含以下功能：

1. **获取当前语言：**
   - 从 URL 路径解析（`/en/...` → `'en'`，其他 → `'zh'`）

2. **获取翻译文本：**
   - 根据语言和 key 返回对应文本
   - 支持嵌套 key（如 `nav.works`）

3. **切换语言 URL：**
   - 输入：当前路径、目标语言
   - 输出：对应语言的路径
   - 逻辑：
     ```
     /works → /en/works
     /en/works → /works
     /posts/example → /en/posts/example-en (如果存在)
     ```

4. **检测浏览器语言（可选）：**
   - 读取 `navigator.language`
   - 首次访问时自动重定向

### 4.2 内容获取逻辑

**作品页面（/works 和 /en/works）：**

**中文页面：**
1. 读取所有 works 集合
2. 筛选 `lang === 'zh'`
3. 按时间排序
4. 渲染卡片

**英文页面：**
1. 读取所有 works 集合
2. 筛选 `lang === 'en'`
3. 按时间排序
4. 渲染卡片

**文章详情页面的语言关联：**

**需求：** 在文章底部显示"阅读其他语言版本"链接

**实现逻辑：**
1. 获取当前文章的 `slug` 和 `lang`
2. 查找相同 `slug` 但不同 `lang` 的文章
3. 如果存在，显示链接：
   - 中文页面："Read in English →"
   - 英文页面："阅读中文版本 →"

### 4.3 首页精选作品的双语处理

**挑战：** 首页显示 4 个精选作品，如何处理双语？

**方案 A：每种语言独立精选**
- 中文首页：显示 `lang === 'zh'` 且 `featured === true` 的 4 个
- 英文首页：显示 `lang === 'en'` 且 `featured === true` 的 4 个
- 优点：灵活，可以展示不同内容
- 缺点：需要维护两套精选列表

**方案 B：基于 slug 关联**
- 中文首页：显示 4 个中文精选作品
- 英文首页：显示这 4 个作品的英文版本（通过 slug 匹配）
- 优点：保持内容一致性
- 缺点：必须所有精选作品都有英文版本

**推荐：方案 A（独立精选）**
- 初期：中英文展示相同的 4 个作品（通过 slug 匹配）
- 未来：可以根据受众调整不同语言的精选内容

---

## 📊 五、SEO 优化

### 5.1 Hreflang 标签

**作用：** 告诉搜索引擎页面的语言版本关系

**实现方式：** 在每个页面的 `<head>` 中添加：

**中文页面（/works）：**
```html
<link rel="alternate" hreflang="zh" href="https://f1justin.com/works" />
<link rel="alternate" hreflang="en" href="https://f1justin.com/en/works" />
<link rel="alternate" hreflang="x-default" href="https://f1justin.com/works" />
```

**英文页面（/en/works）：**
```html
<link rel="alternate" hreflang="zh" href="https://f1justin.com/works" />
<link rel="alternate" hreflang="en" href="https://f1justin.com/en/works" />
<link rel="alternate" hreflang="x-default" href="https://f1justin.com/works" />
```

**关键点：**
- `x-default`：默认语言（推荐设置为中文，因为是你的主要受众）
- 每个页面都需要包含所有语言版本的链接

### 5.2 元数据本地化

**页面标题和描述：**

**中文首页：**
```html
<title>F1JUSTIN - 系统构建者 | 视觉叙事者</title>
<meta name="description" content="F1JUSTIN 的个人网站，展示技术项目、摄影作品与深度思考" />
<meta property="og:locale" content="zh_CN" />
```

**英文首页：**
```html
<title>F1JUSTIN - System Builder | Visual Storyteller</title>
<meta name="description" content="F1JUSTIN's personal website showcasing tech projects, photography, and deep thoughts" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="zh_CN" />
```

### 5.3 Sitemap 配置

**生成双语 Sitemap：**

`sitemap.xml` 应包含所有语言版本的页面：

```xml
<url>
  <loc>https://f1justin.com/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://f1justin.com/en/" />
  <xhtml:link rel="alternate" hreflang="zh" href="https://f1justin.com/" />
</url>
<url>
  <loc>https://f1justin.com/en/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://f1justin.com/en/" />
  <xhtml:link rel="alternate" hreflang="zh" href="https://f1justin.com/" />
</url>
```

**Astro 配置：**
- 使用 `@astrojs/sitemap` 插件
- 配置包含 `/en/*` 路径

---

## 🎨 六、用户体验设计

### 6.1 语言切换器交互细节

**视觉设计：**

**桌面端：**
```
F1JUSTIN    作品    文章    关于    [EN]
                                   ↑
                              小字，灰色
                              悬停变 accent
```

**移动端（汉堡菜单内）：**
```
[关闭]

作品
文章
关于
───────
[English]  ← 底部，突出显示
```

**点击行为：**
- 平滑过渡到对应语言页面
- 可选：添加淡入淡出动画（200ms）
- 保存用户选择到 localStorage

### 6.2 语言持久化

**策略：**
1. 用户手动切换语言后，保存选择到 `localStorage`
2. 下次访问时，自动跳转到上次选择的语言
3. 键名：`preferred_language`，值：`'zh' | 'en'`

**实现位置：**
- 在 Layout 组件中，页面加载时检查
- 如果当前语言与保存的语言不符，自动重定向

**示例逻辑：**
```
1. 用户访问 / (中文首页)
2. 检查 localStorage.preferred_language
3. 如果是 'en'，重定向到 /en
4. 如果是 'zh' 或未设置，保持当前页面
```

### 6.3 缺失翻译的处理

**场景：** 某些内容只有中文版本，没有英文翻译

**解决方案：**

**方案 A：显示占位内容**
- 在英文页面显示："This content is only available in Chinese"
- 提供"切换到中文"链接

**方案 B：自动跳转**
- 英文用户访问只有中文的文章 → 自动跳转到中文版本
- 顶部显示提示："本文暂无英文版本，已自动切换到中文"

**方案 C：列表中标注**
- 在英文文章列表中，对只有中文的文章标注 `[中文]` 标签
- 点击跳转到中文版本

**推荐：方案 C（列表标注）+ 方案 B（自动跳转）**
- 用户体验最好
- 信息透明

---

## 📝 七、内容创作工作流

### 7.1 创建双语作品

**步骤：**

1. **创建中文版本：**
   ```
   content/works/new-project.zh.yaml
   ```

2. **创建英文版本：**
   ```
   content/works/new-project.en.yaml
   ```

3. **确保 slug 一致：**
   - 两个文件的 `slug` 字段必须相同
   - 示例：都是 `"new-project"`

4. **翻译关键字段：**
   - `title`：可保持英文原名或翻译
   - `tagline`：翻译描述
   - `time_range`：转换日期格式
     - 中文：`"2024-03 至今"`
     - 英文：`"Mar 2024 - Present"`

**检查清单：**
- [ ] 两个语言版本的 `slug` 相同
- [ ] `lang` 字段正确设置
- [ ] `links.github` 相同（如果有）
- [ ] `links.post` 指向对应语言的文章（如 `post-zh`, `post-en`）
- [ ] `featured` 和 `order` 保持一致（如果使用独立精选则可不同）

### 7.2 创建双语文章

**步骤：**

1. **创建中文文章：**
   ```
   content/posts/my-thoughts.zh.md
   ```
   ```yaml
   ---
   slug: "my-thoughts"
   lang: "zh"
   title: "我的思考"
   date: 2025-10-10
   summary: "关于某个主题的深度思考..."
   has_translation: true
   ---
   
   [中文正文]
   ```

2. **创建英文翻译：**
   ```
   content/posts/my-thoughts.en.md
   ```
   ```yaml
   ---
   slug: "my-thoughts"
   lang: "en"
   title: "My Thoughts"
   date: 2025-10-10
   summary: "Deep thoughts on a topic..."
   has_translation: true
   ---
   
   [English content]
   ```

3. **如果只有中文版本：**
   - 只创建 `.zh.md` 文件
   - 设置 `has_translation: false`
   - 英文列表页不显示该文章
   - 或显示但标注"仅中文"

### 7.3 翻译质量控制

**建议：**

1. **关键内容必须翻译：**
   - 首页精选作品
   - 关于页自我介绍
   - 重要项目介绍

2. **可选翻译：**
   - 部分深度文章（技术性强的可暂不翻译）
   - 早期作品

3. **翻译工具：**
   - DeepL（推荐，质量高）
   - GPT-4（可用于初稿）
   - 人工润色（最终质量保证）

4. **术语一致性：**
   - 创建术语表（Glossary）
   - 示例：
     - "系统构建者" → "System Builder"
     - "视觉叙事者" → "Visual Storyteller"
     - "并置美学" → "Juxtaposition Aesthetics"

---

## 🔄 八、自动化与工具

### 8.1 检测缺失翻译

**工具脚本功能：**
- 扫描 `content/` 目录
- 检测每个内容是否有对应的另一语言版本
- 输出报告：
  ```
  缺失英文翻译：
  - works/project-a.zh.yaml
  - posts/article-b.zh.md
  
  缺失中文翻译：
  - posts/tech-deep-dive.en.md
  ```

**实现提示：**
- 读取所有文件
- 按 slug 分组
- 检查每组是否有 `zh` 和 `en` 版本

### 8.2 翻译状态追踪

**可选：在 frontmatter 中添加翻译状态字段**

```yaml
translation_status: "draft" | "review" | "published"
translator: "AI" | "Human"
last_updated: 2025-10-10
```

**用途：**
- 区分 AI 初稿和人工润色版本
- 追踪翻译进度
- 显示"本文由 AI 辅助翻译"提示（可选）

---

## 📱 九、响应式与本地化细节

### 9.1 日期格式本地化

**中文格式：**
- 完整：`2025年10月10日`
- 简短：`2025-10-10`
- 时间段：`2024-03 至今`

**英文格式：**
- 完整：`October 10, 2025`
- 简短：`Oct 10, 2025`
- 时间段：`Mar 2024 - Present`

**实现：**
- 使用 JavaScript `Intl.DateTimeFormat`
- 或根据语言手动格式化

### 9.2 数字与单位

**中文：**
- 大数字：`3,000+ 学生` 或 `3000+ 学生`
- 时间：`7 日` 或 `7天`

**英文：**
- 大数字：`3,000+ students`
- 时间：`7 days`

### 9.3 排版差异

**中文排版：**
- 段落首行缩进（可选）
- 中英文混排时注意空格
- 引号使用：`「」` 或 `""`

**英文排版：**
- 无首行缩进
- 段落间距稍大
- 引号使用：`""`

---

## 🚀 十、实施优先级

### Phase 1：基础架构（第 1 周）

**任务：**
1. 创建 `/en` 目录结构
2. 复制现有页面到 `/en`（暂用中文内容）
3. 实现语言切换器（基础版本）
4. 添加 `lang` 字段到 Content Collections schema

**验证：**
- [ ] 访问 `/en` 可以看到英文路径的页面
- [ ] 语言切换器可以跳转（即使内容还是中文）

### Phase 2：内容翻译（第 2-3 周）

**任务：**
1. 翻译 UI 元素（创建 `en.json`）
2. 翻译首页关键内容
   - 身份定位
   - 精选作品（4 个）
   - 主题卡片关键词
3. 翻译关于页
4. 翻译 2-3 个代表性作品

**验证：**
- [ ] 英文首页完全英文化
- [ ] 关于页英文版本完整

### Phase 3：SEO 与优化（第 4 周）

**任务：**
1. 添加 hreflang 标签
2. 配置双语 sitemap
3. 优化元数据（title, description）
4. 实现语言持久化（localStorage）
5. 测试不同浏览器语言的自动重定向

**验证：**
- [ ] Google Search Console 正确识别双语版本
- [ ] 用户选择的语言在下次访问时保持

### Phase 4：内容扩展（持续）

**任务：**
1. 逐步翻译更多作品和文章
2. 根据访问数据调整翻译优先级
3. 收集英文用户反馈，优化表达

---

## ✅ 十一、质量检查清单

### 11.1 功能检查

- [ ] 所有页面都有对应的英文版本
- [ ] 语言切换器在所有页面正常工作
- [ ] 切换语言后停留在相同类型的页面
- [ ] 缺失翻译时有合理的回退机制
- [ ] URL 结构清晰（`/` 和 `/en`）

### 11.2 内容检查

- [ ] 首页所有文本已翻译
- [ ] 导航栏已翻译
- [ ] 精选作品至少 2 个有英文版本
- [ ] 关于页完整翻译
- [ ] 日期格式符合对应语言习惯

### 11.3 SEO 检查

- [ ] 每个页面有 hreflang 标签
- [ ] Sitemap 包含所有语言版本
- [ ] 元数据已本地化
- [ ] `og:locale` 设置正确

### 11.4 用户体验检查

- [ ] 语言切换响应迅速
- [ ] 移动端语言切换器位置合理
- [ ] 字体在两种语言下都清晰可读
- [ ] 英文内容无明显机翻痕迹
- [ ] 术语翻译一致

---


---

## 🎯 十三、总结与建议

### 13.1 核心架构决策

**✅ 确定方案：**
1. **URL 结构：** 路径前缀（`/` 中文，`/en` 英文）
2. **内容管理：** 文件名后缀区分（`.zh.yaml`, `.en.md`）
3. **页面结构：** 平铺目录（`/en/` 子目录）
4. **默认语言：** 中文（根路径）
5. **语言切换：** 导航栏右侧文字链接

### 13.2 实施建议

**快速启动（MVP）：**
1. 先实现英文版本框架（即使内容还是中文）
2. 优先翻译高频页面（首页、关于页）
3. 逐步扩展作品和文章翻译

**质量优先：**
- 不要急于翻译所有内容
- 确保已翻译内容质量高
- 机翻后必须人工润色

**迭代优化：**
- 发布初版后收集用户反馈
- 根据访问数据调整翻译优先级
- 持续优化表达和术语

### 13.3 维护建议

**工作流程：**
1. 创建新内容时，同时创建双语版本（或标记待翻译）
2. 每周检查翻译缺失报告
3. 定期更新术语表
4. 监控 SEO 表现，优化元数据

**团队协作（未来）：**
- 可以邀请英文母语者审校
- 使用 GitHub Issues 追踪翻译任务
- 建立翻译贡献指南

---

**你的双语网站架构设计完成！** 🎉

**下一步行动：**
1. 确认以上架构方案
2. 开始 Phase 1 实施（创建英文路由结构）
3. 准备核心内容的英文翻译

有任何细节需要调整或深入讨论的吗？