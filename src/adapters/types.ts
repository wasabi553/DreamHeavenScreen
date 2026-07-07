/* ============================================
 * 梦天数据大屏 — 数据适配器接口定义
 * ============================================ */

/** KPI 数据 */
export interface KPIData {
  totalSales: number // 总销售额（元）
  totalOrders: number // 总订单量
  activeUsers: number // 活跃用户数
  salesGrowth: number // 销售额环比增长（%）
  ordersGrowth: number // 订单量环比增长（%）
  usersGrowth: number // 用户数环比增长（%）
}

/** 趋势数据（30天） */
export interface TrendItem {
  date: string // '07-07'
  sales: number // 日销售额
  orders: number // 日订单数
}

/** 品类销售 */
export interface CategoryItem {
  name: string // 品类名
  value: number // 销售额
  percent: number // 占比
}

/** 地区分布 */
export interface RegionItem {
  name: string // 地区名
  value: number // 销售额
}

/** 排行项 */
export interface RankItem {
  rank: number // 排名
  name: string // 名称（店铺/商品）
  value: number // 销售额
  growth: number // 增长率
}

/** 实时通知类型 */
export type RealtimeType = 'order' | 'alert' | 'milestone'

/** 实时通知 */
export interface RealtimeItem {
  id: number
  type: RealtimeType
  content: string
  time: string
}

/** 仪表盘数据 */
export interface GaugeData {
  label: string // 标签
  current: number // 当前值
  target: number // 目标值
  unit: string // 单位
}

/** 大屏完整数据 */
export interface DashboardData {
  kpi: KPIData
  trends: TrendItem[]
  categories: CategoryItem[]
  regions: RegionItem[]
  rankings: RankItem[]
  realtime: RealtimeItem[]
  gauges: GaugeData[]
}

/**
 * 数据适配器接口
 * Mock 和 API 实现都必须遵循此接口
 */
export interface DataAdapter {
  /** 获取大屏全部数据 */
  fetchDashboardData(): Promise<DashboardData>

  /** 获取趋势数据 */
  fetchTrendData(days: number): Promise<TrendItem[]>

  /** 获取排行数据 */
  fetchRankData(): Promise<RankItem[]>

  /** 获取实时更新数据（增量） */
  fetchRealtimeUpdates(): Promise<{
    kpi: Partial<KPIData>
    newNotifications: RealtimeItem[]
  }>
}
