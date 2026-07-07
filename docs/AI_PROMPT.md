# 梦天数据大屏 · AI 实现提示词

> **使用方法**：将本文档完整复制给支持多文件编辑的 AI 编程助手（如 Claude Code、Cursor、Copilot 等），AI 将按计划逐步实现整个项目。

---

## 1. 角色设定

你是一位资深前端架构师和数据可视化专家，精通：

- Vue 3 Composition API + TypeScript 大型项目架构
- ECharts 5 数据可视化深度定制
- Vite 6 构建工具链
- Pinia 状态管理与模块化设计
- MSW (Mock Service Worker) 数据模拟与 API 适配器模式
- Vitest + Playwright 测试体系
- 企业级代码质量系统 (ESLint + Prettier + Husky + Commitlint)
- CSS 动画与数据大屏视觉设计（霓虹 / 科技蓝 / 暗黑主题）

---

## 2. 项目背景

- **英文名**：DreamHeavenScreen
- **中文名**：梦天数据大屏
- **定位**：帮助开发者从 0 到 1 学习如何制作数据可视化大屏的开源项目
- **当前阶段**：纯前端 + Mock 数据，后期通过适配器切换到真实 API
- **仓库地址**：`https://github.com/wasabi553/DreamHeavenScreen`
- **工作目录**：`d:\DreamHeavenScreen`

---

## 3. 技术栈（严格锁定）

| 类别 | 选型 | 版本要求 |
|------|------|----------|
| 框架 | Vue 3 Composition API | `^3.5` |
| 语言 | TypeScript 严格模式 | `^5.6` |
| 构建 | Vite | `^6.0` |
| 可视化 | ECharts | `^5.5` |
| 状态管理 | Pinia | `^2.2` |
| HTTP 客户端 | Axios | `^1.7` |
| Mock | MSW (Mock Service Worker) | `^2.6` |
| CSS | UnoCSS (原子化) | `^0.65` |
| 日期 | dayjs | `^1.11` |
| 工具库 | @vueuse/core | `^11.0` |
| 测试 | Vitest + Playwright | `^2.1` / `^1.48` |
| 代码质量 | ESLint + Prettier + Husky + lint-staged + commitlint | 最新 |
| Node.js | | `>=20` |

---

## 4. 功能需求

本次需要实现一个完整的 **"企业数据监控中心"** 数据大屏页面，包含以下模块：

### 4.1 顶部标题栏 (Header)
- 左侧：项目 Logo + 标题 "梦天数据大屏"
- 中间：当前日期时间（实时更新）
- 右侧：3 个全局 KPI 指标卡片（总销售额 / 总订单量 / 活跃用户数）

### 4.2 左侧面板 (Left Panel)
- **KPI 对比卡片**（4 个）：今日 vs 昨日，带百分比变化箭头
- **分类销售柱状图**：横向柱状图，Top 5 品类
- **地区销售分布饼图**：环形饼图带图例

### 4.3 中间主区域 (Center)
- **销售趋势折线图**：近 30 天趋势，带面积渐变填充
- **中国地图**：省份销售热力图（用 ECharts map 模拟或简化实现）

### 4.4 右侧面板 (Right Panel)
- **Top 10 销售排行**：滚动列表，前三名高亮
- **实时订单滚动**：底部滚动通知条
- **目标完成率仪表盘**：2 个仪表盘（月度目标 / 季度目标）

### 4.5 底部 (Footer)
- 实时数据滚动条，显示最新订单通知

### 4.6 视觉效果
- **暗黑科技风背景**：深色背景 + CSS 网格线
- **霓虹发光边框**：面板边框带蓝色发光效果
- **数字跳动动画**：KPI 数字从小到大滚动到位
- **粒子背景**：Canvas 绘制的浮动粒子

### 4.7 数据刷新
- 每 5 秒模拟推送新数据（通过 Pinia store 更新）
- 图表平滑过渡动画
- 顶部时间每秒刷新

---

## 5. 架构设计（不可违背）

### 5.1 分层架构

```
┌─────────────────────────────────────────┐
│           视图层 (views / components)     │  ← 纯展示，不直接请求数据
├─────────────────────────────────────────┤
│         业务逻辑层 (composables)          │  ← useDashboard, useKPI, useCharts
├─────────────────────────────────────────┤
│          数据适配器层 (adapters)          │  ← MockAdapter / APIAdapter
├─────────────────────────────────────────┤
│         数据存储层 (stores)              │  ← Pinia stores
├─────────────────────────────────────────┤
│          基础设施层 (utils / logger)      │  ← Logger, ErrorHandler, HttpClient
└─────────────────────────────────────────┘
```

**铁律**：
1. 组件绝不直接 import axios / mock 数据，必须通过 composable 或 store
2. 每个模块只能调用同层或下一层，禁止跨层调用
3. 数据源切换只改 `.env` 中的 `VITE_DATA_SOURCE`，不改任何业务代码

### 5.2 数据适配器模式（Mock → API 无缝切换）

```typescript
// 接口定义
interface DataAdapter {
  fetchDashboardData(): Promise<DashboardData>
  fetchTrendData(days: number): Promise<TrendData[]>
  fetchRankData(): Promise<RankItem[]>
  // ...
}

// Mock 实现
class MockAdapter implements DataAdapter { ... }

// API 实现（后期）
class APIAdapter implements DataAdapter { ... }

// 工厂函数 — 根据环境变量选择
export function createAdapter(): DataAdapter {
  return import.meta.env.VITE_DATA_SOURCE === 'api'
    ? new APIAdapter()
    : new MockAdapter()
}
```

---

## 6. 目录结构（必须严格遵循）

```
DreamHeavenScreen/
├── .env                          # 环境变量
├── .env.development              # 开发环境变量
├── .eslintrc.cjs                 # ESLint 配置
├── .prettierrc                   # Prettier 配置
├── .husky/                       # Git hooks
│   ├── pre-commit                # lint-staged
│   └── commit-msg                # commitlint
├── commitlint.config.cjs         # commitlint 配置
├── index.html                    # 入口 HTML
├── package.json
├── tsconfig.json                 # TS 主配置
├── tsconfig.node.json            # TS Node 配置
├── vite.config.ts                # Vite 配置
├── vitest.config.ts              # Vitest 配置
├── playwright.config.ts          # Playwright 配置
├── uno.config.ts                 # UnoCSS 配置
├── public/
│   ├── favicon.ico
│   └── mocks/                    # MSW 初始化脚本
│       └── browser.js            # MSW Service Worker
├── src/
│   ├── main.ts                   # 应用入口
│   ├── App.vue                   # 根组件
│   ├── env.d.ts                  # 环境变量类型声明
│   │
│   ├── assets/                   # 静态资源
│   │   └── styles/
│   │       ├── global.css        # 全局样式
│   │       ├── variables.css     # CSS 变量（颜色/字体/间距）
│   │       └── animations.css    # 动画定义
│   │
│   ├── adapters/                 # 🧩 数据适配器层
│   │   ├── types.ts              # 适配器接口定义
│   │   ├── mock.adapter.ts       # Mock 数据适配器
│   │   ├── api.adapter.ts        # API 适配器（预留）
│   │   └── index.ts              # 工厂函数
│   │
│   ├── composables/              # 🎯 业务逻辑 Composable
│   │   ├── useDashboard.ts       # 大屏主数据
│   │   ├── useKPI.ts             # KPI 指标逻辑
│   │   ├── useCharts.ts          # 图表配置生成
│   │   ├── useClock.ts           # 实时时钟
│   │   ├── useCountUp.ts         # 数字滚动动画
│   │   ├── useParticles.ts       # 粒子背景
│   │   └── useDataRefresh.ts     # 数据自动刷新
│   │
│   ├── stores/                   # 📦 Pinia 状态管理
│   │   ├── dashboard.ts          # 大屏全局状态
│   │   └── index.ts              # Pinia 实例
│   │
│   ├── mocks/                    # 🎭 MSW Mock 数据
│   │   ├── handlers.ts           # 请求处理器
│   │   ├── data/                 # Mock 原始数据
│   │   │   ├── kpi.ts
│   │   │   ├── trends.ts
│   │   │   ├── ranks.ts
│   │   │   ├── category.ts
│   │   │   ├── region.ts
│   │   │   └── realtime.ts
│   │   └── browser.ts            # MSW Worker 启动
│   │
│   ├── components/               # 🧱 组件
│   │   ├── layout/               # 布局组件
│   │   │   ├── DashboardLayout.vue   # 大屏整体布局
│   │   │   └── PanelContainer.vue    # 通用面板容器（带发光边框）
│   │   ├── header/               # 顶部
│   │   │   └── GlobalHeader.vue      # 标题栏 + 时间 + 全局KPI
│   │   ├── kpi/                  # KPI 组件
│   │   │   ├── KPICard.vue           # 单个 KPI 卡片
│   │   │   ├── KPIContrastCard.vue   # 对比型 KPI 卡片(今日vs昨日)
│   │   │   └── KPIGauge.vue          # 仪表盘型 KPI
│   │   ├── charts/               # 图表组件
│   │   │   ├── BarChart.vue          # 柱状图
│   │   │   ├── LineChart.vue         # 折线图
│   │   │   ├── PieChart.vue          # 饼图
│   │   │   ├── MapChart.vue          # 地图
│   │   │   └── useChartInit.ts       # ECharts 初始化 Composable
│   │   ├── ranking/              # 排行
│   │   │   └── RankList.vue          # Top N 排行列表
│   │   ├── realtime/             # 实时
│   │   │   └── RealtimeTicker.vue    # 实时滚动通知
│   │   ├── particles/            # 特效
│   │   │   └── ParticleBackground.vue # Canvas 粒子背景
│   │   └── common/               # 通用
│   │       ├── CountUpNumber.vue      # 数字动画组件
│   │       └── TrendArrow.vue         # 涨跌箭头组件
│   │
│   ├── utils/                    # 🛠 工具函数
│   │   ├── logger.ts             # 日志系统
│   │   ├── error-handler.ts      # 全局错误处理
│   │   ├── format.ts             # 格式化工具(数字/日期/百分比)
│   │   └── echarts-theme.ts      # ECharts 主题配置
│   │
│   └── __tests__/                # 🧪 测试
│       ├── unit/                 # 单元测试
│       │   ├── adapters/
│       │   ├── composables/
│       │   ├── stores/
│       │   └── utils/
│       ├── components/           # 组件测试
│       └── e2e/                  # E2E 测试
│           └── dashboard.spec.ts
```

---

## 7. Mock 数据设计

### 7.1 数据模型

```typescript
// KPI 数据
interface KPIData {
  totalSales: number       // 总销售额（元）
  totalOrders: number      // 总订单量
  activeUsers: number      // 活跃用户数
  salesGrowth: number      // 销售额环比增长（%）
  ordersGrowth: number     // 订单量环比增长（%）
  usersGrowth: number      // 用户数环比增长（%）
}

// 趋势数据（30天）
interface TrendItem {
  date: string             // '07-07'
  sales: number            // 日销售额
  orders: number           // 日订单数
}

// 品类销售
interface CategoryItem {
  name: string             // 品类名
  value: number            // 销售额
  percent: number          // 占比
}

// 地区分布
interface RegionItem {
  name: string             // 地区名
  value: number            // 销售额
}

// 排行项
interface RankItem {
  rank: number             // 排名
  name: string             // 名称（店铺/商品）
  value: number            // 销售额
  growth: number           // 增长率
}

// 实时通知
interface RealtimeItem {
  id: number
  type: 'order' | 'alert' | 'milestone'
  content: string
  time: string
}

// 仪表盘数据
interface GaugeData {
  label: string            // 标签
  current: number          // 当前值
  target: number           // 目标值
  unit: string             // 单位
}

// 大屏完整数据
interface DashboardData {
  kpi: KPIData
  trends: TrendItem[]
  categories: CategoryItem[]
  regions: RegionItem[]
  rankings: RankItem[]
  realtime: RealtimeItem[]
  gauges: GaugeData[]
}
```

### 7.2 Mock 数据要求

- 所有数据必须**真实合理**，不能是随机数（趋势要有波动规律，排名要有区分度）
- 提供至少 30 条趋势数据、10 条排行数据、5 条品类数据
- 实时数据每次刷新时要**合理变化**（微调最新 KPI 值、新增一条实时通知）
- 地图数据覆盖全国 7 个大区（不要求精确到省份）

---

## 8. 视觉设计规范

### 8.1 配色方案

```css
--bg-primary: #0a0e27;        /* 主背景 - 深蓝黑 */
--bg-panel: rgba(6, 14, 52, 0.75);  /* 面板背景 - 半透明深蓝 */
--border-glow: #00d4ff;       /* 边框发光 - 霓虹蓝 */
--accent-cyan: #00f0ff;       /* 强调色 - 青色 */
--accent-green: #00ff88;      /* 上涨色 - 霓虹绿 */
--accent-red: #ff4757;        /* 下跌色 - 霓虹红 */
--accent-yellow: #ffd93d;     /* 警告色 - 金色 */
--text-primary: #e8f0ff;      /* 主文字 */
--text-secondary: #8892b0;    /* 次要文字 */
--chart-series: [#00f0ff, #5b8def, #a78bfa, #ff6b9d, #ffd93d, #00ff88];
```

### 8.2 面板样式

- 每个面板使用 `.panel-container` 类，带 `box-shadow: 0 0 15px rgba(0, 212, 255, 0.15)` 发光边框
- 面板内边距 16px，圆角 4px
- 面板标题使用 `.panel-title` 类，左侧带青色竖线装饰

### 8.3 字体

- 标题/数字：`Orbitron`（Google Font or 本地 fallback）
- 正文：系统默认 `-apple-system, sans-serif`

### 8.4 动画

- KPI 数字：入场时从 0 滚动到目标值（`useCountUp`），持续 1.5s
- 面板：入场时从下方淡入上移（`fadeInUp`），交错延迟
- 实时数据：从右向左滚动（`marquee`）

---

## 9. 日志系统设计

```typescript
// src/utils/logger.ts

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

class Logger {
  private level: LogLevel
  private prefix: string

  constructor(module: string) {
    this.prefix = `[DreamHeaven][${module}]`
    this.level = import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.WARN
  }

  debug(msg: string, data?: any) { ... }
  info(msg: string, data?: any) { ... }
  warn(msg: string, data?: any) { ... }
  error(msg: string, error?: Error) { ... }
  time(label: string) { ... }     // 性能计时
  timeEnd(label: string) { ... }
}

// 使用示例
const logger = new Logger('Dashboard')
logger.info('数据加载完成', { duration: 123 })
logger.error('图表渲染失败', new Error('...'))
```

**要求**：
- 每个模块使用自己的 logger 实例
- 开发环境输出所有级别的日志，生产环境只输出 WARN 以上
- 日志包含时间戳、模块名、消息
- error 级别日志同时调用 `console.error` 和全局错误处理

---

## 10. 代码质量系统

### 10.1 ESLint
- 使用 `@antfu/eslint-config` 或标准 Vue 3 + TS 配置
- 强制 `console.log` 警告（除了 logger 工具内）
- 强制 import 顺序

### 10.2 Prettier
- 单引号、分号、尾逗号、100 字符宽度
- 与 ESLint 无冲突

### 10.3 Husky + lint-staged
- `pre-commit`：对暂存文件运行 `eslint --fix` + `prettier --write`
- `commit-msg`：遵循 Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)

### 10.4 测试

```
单元测试 (Vitest):
✓ adapters/mock.adapter.ts    — Mock 数据完整性
✓ composables/useClock.ts     — 时钟逻辑
✓ composables/useCountUp.ts   — 数字动画
✓ utils/logger.ts             — 日志输出
✓ utils/format.ts             — 格式化函数
✓ stores/dashboard.ts         — Store action/reducer

组件测试 (Vitest + @vue/test-utils):
✓ KPICard.vue                 — 数据渲染
✓ RankList.vue                — 排序展示

E2E (Playwright):
✓ 页面加载后所有图表渲染完成
✓ KPI 数字 5 秒内自动刷新
✓ 面板数量正确 (6+ 个)
```

**覆盖率目标**：utils/composables/stores ≥ 80%，组件 ≥ 50%

---

## 11. 实现步骤（严格按顺序执行）

> 每完成一步，必须通过编译检查（`npx vue-tsc --noEmit`）后再进入下一步。

### Step 0：项目初始化
1. 在 `d:\DreamHeavenScreen` 初始化 Vite + Vue 3 + TS 项目
2. 安装所有依赖
3. 配置 `vite.config.ts`、`tsconfig.json`
4. 配置 UnoCSS
5. 配置 ESLint + Prettier + Husky
6. 创建完整目录结构
7. 运行 `npm run dev` 确认项目能启动

### Step 1：基础设施层
1. 实现 `utils/logger.ts` 日志系统
2. 实现 `utils/error-handler.ts` 全局错误处理
3. 实现 `utils/format.ts` 格式化工具
4. 实现 `utils/echarts-theme.ts` ECharts 暗黑主题
5. 实现 `assets/styles/variables.css` CSS 变量
6. 实现 `assets/styles/global.css` 全局样式 + 动画

### Step 2：数据层
1. 定义 `adapters/types.ts` 所有接口类型
2. 创建 `mocks/data/` 下所有 Mock 数据文件
3. 实现 `mocks/handlers.ts` MSW 处理器
4. 实现 `adapters/mock.adapter.ts` Mock 适配器
5. 实现 `adapters/index.ts` 工厂函数
6. 实现 `adapters/api.adapter.ts` API 适配器（骨架）
7. 配置 `mocks/browser.ts` 和 `public/mocks/browser.js`

### Step 3：状态管理
1. 创建 `stores/index.ts` Pinia 实例
2. 实现 `stores/dashboard.ts` 大屏全局 Store

### Step 4：业务逻辑 Composables
1. `useClock.ts` — 实时时钟
2. `useCountUp.ts` — 数字滚动动画
3. `useCharts.ts` — ECharts 图表配置生成
4. `useDashboard.ts` — 大屏数据加载与刷新
5. `useDataRefresh.ts` — 定时数据刷新
6. `useParticles.ts` — 粒子背景逻辑

### Step 5：通用组件
1. `PanelContainer.vue` — 通用面板容器（发光边框 + 标题）
2. `CountUpNumber.vue` — 数字滚动组件
3. `TrendArrow.vue` — 涨跌箭头
4. `ParticleBackground.vue` — 粒子背景

### Step 6：业务组件（由简到繁）
1. `KPICard.vue` — 基础 KPI 卡片
2. `KPIContrastCard.vue` — 对比型 KPI
3. `KPIGauge.vue` — 仪表盘
4. `RankList.vue` — 排行列表
5. `RealtimeTicker.vue` — 实时滚动条
6. `BarChart.vue` — 柱状图
7. `LineChart.vue` — 折线图（带面积渐变）
8. `PieChart.vue` — 饼图
9. `MapChart.vue` — 地图

### Step 7：布局组装
1. `GlobalHeader.vue` — 顶部标题栏
2. `DashboardLayout.vue` — 大屏整体布局（CSS Grid）
3. `App.vue` — 根组件，引入布局
4. `main.ts` — 应用入口，初始化 MSW + Pinia

### Step 8：视觉打磨
1. 调整所有面板的发光边框效果
2. 粒子背景参数调优
3. 入场动画序列对齐
4. 响应式适配（1366×768 最小支持）

### Step 9：质量保障
1. 编写核心工具函数的单元测试
2. 编写 2-3 个关键组件的组件测试
3. 编写 1 个 E2E 测试（页面加载 + 图表渲染）
4. 运行全部测试确保通过

### Step 10：交付
1. `npm run dev` 启动开发服务器
2. 自动打开浏览器 `http://localhost:5173`
3. 确认看到一个完整、漂亮、带数据的炫酷大屏

---

## 12. 关键实现细节

### 12.1 ECharts 使用规范

```typescript
// composables/useChartInit.ts
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts'
import {
  GridComponent, TitleComponent, TooltipComponent,
  LegendComponent, DataZoomComponent, VisualMapComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart, LineChart, PieChart, MapChart,
  GridComponent, TitleComponent, TooltipComponent,
  LegendComponent, DataZoomComponent, VisualMapComponent,
  CanvasRenderer,
])

export function useChartInit() {
  // 返回通用的 ECharts 初始化、resize、销毁逻辑
}
```

- **必须**使用按需引入，禁止 `import * as echarts from 'echarts'` 全量引入
- 所有图表必须响应 `window.resize`
- 图表配置中禁用默认动画后用 GSAP 替代过渡效果（可选）

### 12.2 数字滚动动画实现

```typescript
// composables/useCountUp.ts
// 使用 requestAnimationFrame 实现数字从 0 滚动到目标值
// 支持格式化：千分位、小数、单位后缀
// 支持持续时间参数
```

### 12.3 粒子背景

使用 Canvas 2D 绘制：
- 100-150 个粒子
- 粒子之间在距离 < 150px 时绘制连接线
- 缓慢移动
- 透明度 0.3-0.6
- 颜色：青色 (#00f0ff)

### 12.4 MSW 配置

```typescript
// mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
export const worker = setupWorker(...handlers)

// main.ts 中条件启动
async function prepareApp() {
  if (import.meta.env.VITE_DATA_SOURCE !== 'api') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}
```

### 12.5 `.env` 文件

```env
# .env.development
VITE_DATA_SOURCE=mock
VITE_APP_TITLE=梦天数据大屏

# .env.production
VITE_DATA_SOURCE=api
VITE_APP_TITLE=梦天数据大屏
```

---

## 13. 验收标准

用 `playwright` 或手动打开浏览器后，应满足：

- [ ] 页面在 3 秒内完成首次渲染
- [ ] 顶部标题栏显示 "梦天数据大屏" + 实时时钟
- [ ] 3 个全局 KPI 卡片数据正确展示
- [ ] 左侧面板有 KPI 对比卡 + 柱状图 + 饼图
- [ ] 中间有折线趋势图（30 天数据）
- [ ] 右侧有排行列表 + 仪表盘
- [ ] 底部有实时滚动通知
- [ ] 所有图表有数据且视觉风格统一（暗黑科技风）
- [ ] KPI 数字有入场滚动动画
- [ ] 面板边框有霓虹发光效果
- [ ] 背景有粒子动画
- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 TypeScript 类型检查（`vue-tsc --noEmit`）
- [ ] 所有单元测试通过
- [ ] `npm run dev` 能正常启动
- [ ] 修改 `.env` 中 `VITE_DATA_SOURCE=api` 后不影响编译（api adapter 返回空数据即可）

---

## 14. 注意事项

1. **所有代码必须使用 TypeScript**，禁止 `any`（除非确实必要并加注释）
2. **每个组件 < 300 行**，超过则拆分
3. **每个文件只做一件事**，单一职责
4. **注释使用中文**，关键逻辑必须注释
5. **ECharts 图表必须做 dispose**，防止内存泄漏（`onBeforeUnmount`）
6. **路由暂不引入**，当前只有一页大屏
7. **不要使用 `setup()` 函数**，统一使用 `<script setup lang="ts">`
8. **所有异步操作必须有错误处理**，用 logger.error 记录
9. **mock 数据不要使用 `Math.random()`**，要写固定的但看起来真实的数据

---

## 15. 常见问题预案

| 问题 | 解决方案 |
|------|---------|
| ECharts 地图中国省份数据缺失 | 先用散点图或柱状图代替地图，后期引入地图 JSON |
| MSW Service Worker 不生效 | 检查 `public/mocks/browser.js` 路径，确保 Vite 能访问 |
| UnoCSS 样式不生效 | 检查 `uno.config.ts` presets 配置 |
| 粒子动画性能差 | 降低粒子数量到 80 个，减小 Canvas 分辨率 |
| HMR 导致 ECharts 实例未销毁 | 在 `onBeforeUnmount` 中调用 `chart.dispose()` |

---

> **给 AI 的最终指令**：请严格按照以上规范，从 Step 0 开始逐步实现。每完成一个 Step，确保编译通过后再继续下一步。最终目标：在浏览器中看到一个完整、炫酷、有真实数据的企业数据监控大屏。
