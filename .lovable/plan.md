
# 「白给的艺术」个人 IP 落地页

极简高级暗黑风单页落地页，Apple 官网式排版 + 赛博工业质感，桌面/移动完美自适应。

## 视觉系统

- **色板**：深空灰 `#0A0A0C` → 纯黑 `#000` 渐变背景；主文字近白 `#F5F5F7`；辅文字 `#8A8A93`；强调色双轨——暗金 `#C9A24C`（正文点缀 / 主按钮辉光）与赛博青 `#5EF2E7`（悬浮态 / 数据感线条）；分隔线 `rgba(255,255,255,0.08)`。
- **字体**：标题 Fraunces（衬线，带一丝东方诗意，呼应「江南水乡与现代碰撞」）；正文 Inter；数字/标签 JetBrains Mono。通过 `__root.tsx` 的 `<link>` 引入 Google Fonts。
- **质感**：噪点纹理叠加、径向光晕、细网格背景、`backdrop-blur` 玻璃卡片、光标跟随微光。
- **动效**：Framer Motion 实现丝滑滚动入场（fade + slide-up + stagger）、卡片 hover 放大 + 辉光扩散、按钮真实光晕（多层 box-shadow + 渐变 border）。尊重 `prefers-reduced-motion`。

## 页面结构（单页 `src/routes/index.tsx`）

### 1. Hero「首屏」
- 全屏视口居中：主标题 `白给的艺术`（Fraunces，clamp 字号，字重轻，字距收紧）；副标题 `以文字构建重生宇宙，以 AI 撕裂视觉边界`。
- 背景层：多层合成——深色渐变 + SVG 齿轮/管线线稿缓慢旋转（重工业机械）+ 赛博青色扫描线 + 暗金色径向光斑呼吸动画 + 细颗粒噪点。全部 CSS/SVG/Framer 实现，无需外部资源。
- CTA：发光胶囊按钮 `进入网文宇宙`，暗金渐变边 + 外发光 + hover 时青色脉冲；锚点滚动到 `#novels`。
- 顶部极简导航（sticky，滚动后玻璃化）：Logo「MA.」+ 四个锚点链接。

### 2. 连载宇宙 `#novels`
- 章节标题居中，上方小标签 `NOVEL · 01`。
- 两张封面卡片并排（桌面双列，移动单列堆叠）：
  - 卡片 1《重生后，暴君还在挨鞭》
  - 卡片 2《重生断亲后，假千金全家悔疯了》
- 卡片结构：3:4 竖版封面区（`data-lov-image-placeholder` 生成暗黑国风/权谋质感封面）+ 标题 + 一句极简简介 + `前往番茄阅读 →` 按钮（外链 `target="_blank" rel="noopener"`，用户后续可替换真实 URL 占位 `#`）。
- Hover：整卡 `scale-[1.03]`、封面轻微视差、暗金描边浮现、右下角箭头位移。

### 3. 光影与人间 `#gallery`
- 双栏布局（桌面 5/7 分栏，移动堆叠）：
  - **左：AI 导演**——3 个 9:16 竖屏视频占位框（`<video>` 标签，`src` 留空 `poster` 用生成图），标签「MECHA MORPH / 01·02·03」，悬浮显示播放图标与青色描边。用户后续可放入真实机甲形变短片。
  - **右：镜头切面**——横向瀑布式 2 列拼贴 4 张摄影作品（`data-lov-image-placeholder`）：矿坑水幕巨龙、夜色暖光小舟、江南水乡雨巷、现代玻璃倒影。悬浮显示拍摄地/时间小字。
- 章节下方一段留白引文，Fraunces 斜体：`在钢铁的褶皱里，打捞一盏灯。`

### 4. 连接与共创 `#contact`
- 居中极简玻璃卡片：`商业合作与版权对接请联系：小马`，下方一行辅助文案「Brand · IP · Adaptation」。
- 3 个社交图标（抖音自定义 SVG、小红书自定义 SVG、GitHub 用 lucide `Github`），圆形描边按钮，hover 青色辉光。
- 页脚一行：`© 2026 白给的艺术 · All rights reserved` + 回到顶部箭头。

## 技术实现

- 单路由：改写 `src/routes/index.tsx`，替换占位符；`head()` 设置 SEO（title「白给的艺术 · 小马的创作宇宙」、description、og:title/description/type、twitter:card；不设 og:image 让平台注入）。
- 组件拆分（`src/components/landing/`）：`Hero.tsx`、`NavBar.tsx`、`NovelShowcase.tsx`、`GallerySection.tsx`、`ContactSection.tsx`、`GlowButton.tsx`、`SectionHeading.tsx`、`AnimatedBackground.tsx`。
- 依赖：`bun add framer-motion`（lucide-react 已在项目内）。
- 全局样式：在 `src/styles.css` 追加暗金/赛博青 token 至 `:root` 与 `@theme inline`，添加噪点 utility 与滚动阻尼。默认页面强制暗色（`<html>` 加 `dark` 类或直接使用暗色 token 覆盖）。
- 图片生成：为两张小说封面 + 4 张摄影作品调用 `imagegen`（`transparent_background=false`，写入 `src/assets/`），ES6 import。
- 响应式：Tailwind 断点 `sm/md/lg`；标题 `clamp()`；网格 `grid-cols-[minmax(0,1fr)_auto]` 头部保护；触屏禁用视差。
- 无障碍：所有图片 alt、按钮 aria-label、锚点跳转平滑滚动、focus-visible 环形描边（暗金色）。

## 交付顺序

1. 安装 framer-motion，扩展 `styles.css` 设计 token。
2. 生成 6 张图片资源。
3. 编写各 landing 组件（含动效与响应式）。
4. 组装 `index.tsx` + 更新 `__root.tsx` SEO 与字体 `<link>`。
5. 桌面 + 移动视口截图自查，确认按钮辉光、卡片 hover、留白与文字对比达标。

## 需要你确认的两点

- 番茄阅读的两本小说链接方便提供吗？（先用 `#` 占位可后续替换）
- 抖音、小红书、GitHub 三个账号链接可否提供？（同样可先占位）

不提供也可直接开工，占位为 `#`。
