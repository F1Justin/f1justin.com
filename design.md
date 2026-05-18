# F1JUSTIN 网站视觉设计规范

## 📐 设计哲学

**核心理念**：**"结构主义美学 - 用线条定义秩序，用留白创造呼吸"**

- **直角几何**：所有元素使用直角，拒绝圆角，强调理性与秩序
- **粗线框架**：用有分量感的边框构建视觉层次
- **留白呼吸**：充足的内边距，让内容自然呼吸
- **字体层级**：通过字号、字重、颜色建立清晰的信息层级
- **克制变色**：hover 效果通过边框颜色变化，而非过度动画

---

## 🎨 颜色系统

### 主色调（CSS 变量定义）

```css
:root {
  /* 背景色 */
  --color-bg: #ffffff;
  --color-bg-elevated: #fafafa;
  --color-bg-card: #ffffff;
  
  /* 文字色 */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-text-tertiary: #999999;
  
  /* 边框色 */
  --color-border-default: #1a1a1a;      /* 默认粗边框 */
  --color-border-hover: #0066cc;         /* hover 强调色 */
  --color-border-subtle: #e0e0e0;        /* 细分割线 */
  
  /* 强调色 */
  --color-accent: #0066cc;               /* 主强调色（蓝） */
  --color-accent-hover: #0052a3;
  
  /* 状态色 */
  --color-status-active: #00cc66;        /* 绿色圆点 */
  
  /* 间距系统 */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  
  /* 边框宽度 */
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;
  
  /* 动画时长 */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0a0a0a;
    --color-bg-elevated: #121212;
    --color-bg-card: #0f0f0f;
    
    --color-text-primary: #f0f0f0;
    --color-text-secondary: #a0a0a0;
    --color-text-tertiary: #707070;
    
    --color-border-default: #f0f0f0;
    --color-border-hover: #3399ff;
    --color-border-subtle: #2a2a2a;
    
    --color-accent: #3399ff;
    --color-accent-hover: #66b3ff;
    
    --color-status-active: #00ff88;
  }
}
```

---

## 📦 卡片系统设计规范

### 1. 基础卡片框架

```css
/* 所有卡片的通用基类 */
.card-base {
  background-color: var(--color-bg-card);
  border: var(--border-width-thick) solid var(--color-border-default);
  padding: var(--space-lg);
  transition: border-color var(--duration-normal) ease;
  
  /* 关键：直角，无圆角 */
  border-radius: 0;
}

.card-base:hover {
  border-color: var(--color-border-hover);
}

/* 可选：轻微阴影（深色模式下更明显） */
.card-base {
  box-shadow: 0 0 0 0 transparent;
  transition: border-color var(--duration-normal) ease,
              box-shadow var(--duration-normal) ease;
}

.card-base:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

@media (prefers-color-scheme: dark) {
  .card-base:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
}
```

---

## 📋 具体卡片设计规范

### 2.1 作品卡片（Work Card）

**视觉结构**：
```
┌──────────────────────────────────────────────────┐  ← 3px 边框
│  🧠                                              │  
│  nekro-agent                    ●   2024-03 至今 │  ← Emoji | 标题 | 状态圆点 | 时间
│  高可扩展 AI 聊天机器人                          │  ← 描述
│                                                  │  
│                         [GitHub →]  [详细介绍 →] │  ← 右对齐按钮
└──────────────────────────────────────────────────┘
```

**尺寸规格**：
- 总高度：约 140px
- 左右内边距：32px
- 上下内边距：24px
- 边框粗细：3px

**CSS 实现**：

```css
.work-card {
  background-color: var(--color-bg-card);
  border: var(--border-width-thick) solid var(--color-border-default);
  padding: var(--space-lg) var(--space-lg);
  transition: border-color var(--duration-normal) ease,
              transform var(--duration-normal) ease;
  
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-height: 140px;
}

.work-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

/* 顶部行：Emoji + 标题 + 状态 + 时间 */
.work-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.work-card-emoji {
  font-size: 2em;
  line-height: 1;
  flex-shrink: 0;
}

.work-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  margin: 0;
  flex: 1;
}

.work-card-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-status-active);
  flex-shrink: 0;
}

.work-card-time {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  font-weight: 400;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* 描述行 */
.work-card-tagline {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* 底部按钮行 */
.work-card-actions {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
  margin-top: auto;
}

.work-card-link {
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
  border: var(--border-width-medium) solid var(--color-border-default);
  transition: all var(--duration-fast) ease;
  letter-spacing: 0.02em;
}

.work-card-link:hover {
  background-color: var(--color-text-primary);
  color: var(--color-bg);
  border-color: var(--color-text-primary);
}
```

---

### 2.2 文章卡片（Post Card）

**视觉结构**：
```
┌──────────────────────────────────────────────────┐  ← 3px 边框
│  摄影的觉醒：从迷茫到当代摄影实践                │  ← 标题
│  2025-09-20                                      │  ← 日期
│  从器材焦虑到观念先行，我的摄影之路...           │  ← 摘要
└──────────────────────────────────────────────────┘
```

**CSS 实现**：

```css
.post-card {
  background-color: var(--color-bg-card);
  border: var(--border-width-thick) solid var(--color-border-default);
  padding: var(--space-lg);
  transition: border-color var(--duration-normal) ease,
              transform var(--duration-normal) ease;
  
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-height: 120px;
  text-decoration: none;
  color: inherit;
}

.post-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.post-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
  margin: 0;
  letter-spacing: -0.01em;
}

.post-card-date {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
  margin: 4px 0;
}

.post-card-summary {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: var(--space-xs) 0 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

---

### 2.3 主题卡片（Theme Card）- 首页

**视觉结构**：
```
┌────────────────────────────┐  ← 2px 边框（比作品卡片细一点）
│  🧠                        │  
│  技术与系统美学             │  ← Emoji + 标题
│                            │  
│  Linux · AI · 自动化       │  ← 关键词（最多 3-5 个）
│  Nonebot · 软件工程        │  
│                            │  
│          了解更多 →        │  ← 居中按钮
└────────────────────────────┘
```

**尺寸规格**：
- 宽度：响应式网格（桌面 2-3 列，移动 1 列）
- 最小高度：200px
- 边框粗细：2px（比作品卡片细，体现层级差异）

**CSS 实现**：

```css
.theme-card {
  background-color: var(--color-bg-card);
  border: var(--border-width-medium) solid var(--color-border-default);
  padding: var(--space-lg);
  transition: border-color var(--duration-normal) ease,
              transform var(--duration-normal) ease;
  
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-height: 200px;
  text-decoration: none;
  color: inherit;
  position: relative;
}

.theme-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
}

/* Emoji + 标题区域 */
.theme-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.theme-card-emoji {
  font-size: 2.5em;
  line-height: 1;
}

.theme-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

/* 关键词区域 */
.theme-card-keywords {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  flex: 1;
}

.theme-card-keywords::before {
  content: '';
  display: block;
  width: 32px;
  height: 2px;
  background-color: var(--color-border-default);
  margin-bottom: var(--space-sm);
}

/* 底部按钮 */
.theme-card-action {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-align: center;
  letter-spacing: 0.05em;
  margin-top: auto;
  padding-top: var(--space-sm);
  border-top: var(--border-width-thin) solid var(--color-border-subtle);
}

.theme-card:hover .theme-card-action {
  color: var(--color-accent);
}
```

---

### 2.4 精选作品卡片（首页特殊版）

**视觉结构（更紧凑）**：
```
┌──────────────────────────┐  ← 3px 边框
│  🧠  nekro-agent  ●     │  ← Emoji | 标题 | 状态
│  高可扩展 AI 聊天机器人  │  ← 描述
│  2024-03 至今            │  ← 时间
│                          │  
│  [GitHub]  [介绍]       │  ← 按钮
└──────────────────────────┘
```

**CSS 实现**：

```css
.featured-work-card {
  background-color: var(--color-bg-card);
  border: var(--border-width-thick) solid var(--color-border-default);
  padding: var(--space-md);
  transition: border-color var(--duration-normal) ease,
              transform var(--duration-normal) ease;
  
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-height: 180px;
}

.featured-work-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-3px);
}

/* 顶部行 */
.featured-work-header {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.featured-work-emoji {
  font-size: 1.5em;
  line-height: 1;
}

.featured-work-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  flex: 1;
}

.featured-status-dot {
  width: 6px;
  height: 6px;
  background-color: var(--color-status-active);
  margin-left: auto;
}

/* 描述 */
.featured-work-tagline {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* 时间 */
.featured-work-time {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
}

/* 按钮 */
.featured-work-actions {
  display: flex;
  gap: var(--space-xs);
  margin-top: auto;
}

.featured-work-link {
  flex: 1;
  padding: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
  text-align: center;
  border: var(--border-width-medium) solid var(--color-border-default);
  transition: all var(--duration-fast) ease;
}

.featured-work-link:hover {
  background-color: var(--color-text-primary);
  color: var(--color-bg);
  border-color: var(--color-text-primary);
}
```

---

### 2.5 骨架屏卡片（Skeleton Card）

**视觉结构**：
```
┌──────────────────────────────────────────────────┐  ← 2px 边框
│  ████████████                                    │  ← 标题占位
│  ████████                                        │  ← 副标题占位
│  ██████████████████████████████                  │  ← 描述占位
└──────────────────────────────────────────────────┘
```

**CSS 实现**：

```css
.skeleton-card {
  background-color: var(--color-bg-card);
  border: var(--border-width-medium) solid var(--color-border-subtle);
  padding: var(--space-lg);
  min-height: 140px;
  
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(
    90deg,
    var(--color-bg-elevated) 25%,
    color-mix(in srgb, var(--color-bg-elevated) 90%, var(--color-text-primary) 10%) 50%,
    var(--color-bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-title {
  width: 60%;
  height: 20px;
}

.skeleton-subtitle {
  width: 30%;
  height: 14px;
}

.skeleton-text {
  width: 100%;
  height: 14px;
}

.skeleton-text:last-child {
  width: 80%;
}
```

---

## 🔤 字体系统

### 字体栈

```css
:root {
  --font-sans: 
    -apple-system, BlinkMacSystemFont, 
    "Segoe UI", 
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "Helvetica Neue", Helvetica, Arial, 
    sans-serif;
  
  --font-mono: 
    "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", 
    Consolas, "Courier New", monospace;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 字体层级

| 用途 | 字号 | 字重 | 颜色 | 行高 |
|------|------|------|------|------|
| 大标题（H1） | 2.5rem (40px) | 700 | primary | 1.2 |
| 小标题（H2） | 1.75rem (28px) | 600 | primary | 1.3 |
| 卡片标题 | 1.25rem (20px) | 600 | primary | 1.4 |
| 正文 | 0.9375rem (15px) | 400 | secondary | 1.6 |
| 小字 | 0.875rem (14px) | 400 | tertiary | 1.5 |
| 按钮文字 | 0.875rem (14px) | 500 | primary | 1 |

```css
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-lg);
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
  letter-spacing: -0.015em;
  margin: 0 0 var(--space-md);
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
  letter-spacing: -0.01em;
  margin: 0 0 var(--space-sm);
}

p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-sm);
}

.text-small {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
}

.text-mono {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
```

---

## 🎯 状态圆点设计

**活跃状态圆点（绿色）**：

```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-status-active);
  position: relative;
}

/* 可选：脉冲动画 */
.status-dot::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-color: var(--color-status-active);
  opacity: 0;
  animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.5);
  }
}
```

---

## 📐 布局网格系统

### 容器宽度

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-md);
  }
}
```

### 网格布局

```css
/* 作品网格（1列） */
.works-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* 精选作品网格（2x2） */
.works-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
}

/* 主题卡片网格（2-3列） */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}
```

---

## ✨ Hover 效果统一规范

### 原则

- **不用阴影变化**（已有边框颜色变化）
- **轻微上浮**（2-4px）
- **边框变色**（default → hover）
- **按钮反色**（背景与文字互换）

### 实现

```css
/* 卡片 Hover */
.card-base:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
  /* 可选：轻微阴影 */
  box-shadow: 0 4px 16px rgba(0, 102, 204, 0.08);
}

/* 按钮 Hover */
.btn-primary:hover {
  background-color: var(--color-text-primary);
  color: var(--color-bg);
  border-color: var(--color-text-primary);
}

/* 链接 Hover */
a:hover {
  color: var(--color-accent);
}
```

---

## 📱 响应式断点

```css
/* 移动端 */
@media (max-width: 640px) {
  :root {
    --space-lg: 24px;
    --space-xl: 32px;
  }
  
  .work-card {
    padding: var(--space-md);
    min-height: 160px;
  }
  
  .work-card-header {
    flex-wrap: wrap;
  }
  
  .work-card-status {
    width: 100%;
    justify-content: flex-start;
    margin-left: 0;
    margin-top: var(--space-xs);
  }
}

/* 平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .themes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 1025px) {
  .themes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🎬 动画规范

### Stagger 动画（列表加载）

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-animated {
  animation: fade-in-up var(--duration-normal) ease-out backwards;
}

/* 通过 style 属性或 JS 设置不同的 animation-delay */
.card-animated:nth-child(1) { animation-delay: 0ms; }
.card-animated:nth-child(2) { animation-delay: 100ms; }
.card-animated:nth-child(3) { animation-delay: 200ms; }
/* ... */
```

### 页面切换动画（可选）

```css
@keyframes page-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

main {
  animation: page-enter 0.3s ease-out;
}
```

---

## 🎨 特殊元素设计

### 分割线

```css
/* 粗分割线（用于章节分隔） */
.divider-thick {
  height: 3px;
  background-color: var(--color-border-default);
  border: none;
  margin: var(--space-2xl) 0;
}

/* 细分割线（用于内容分组） */
.divider-thin {
  height: 1px;
  background-color: var(--color-border-subtle);
  border: none;
  margin: var(--space-lg) 0;
}
```

### Emoji 样式统一

```css
.emoji {
  font-style: normal;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
  line-height: 1;
}
```

---

## 📋 设计检查清单

在实现时，请确保：

- [ ] 所有卡片边框为 2-3px
- [ ] 所有卡片无圆角（border-radius: 0）
- [ ] Hover 效果统一为边框变色 + 轻微上浮
- [ ] 字体层级清晰（标题/正文/小字）
- [ ] 间距使用 CSS 变量，保持一致性
- [ ] 状态圆点为 8x8px，纯色填充
- [ ] 按钮 Hover 反色效果流畅
- [ ] 响应式布局在三个断点下测试通过
- [ ] 深色模式颜色对比度足够
- [ ] 所有动画时长不超过 300ms

---

