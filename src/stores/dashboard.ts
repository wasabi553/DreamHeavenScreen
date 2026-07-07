/* ============================================
 * 梦天数据大屏 — 大屏全局状态 Store
 * 管理所有大屏数据的状态、加载、刷新
 * ============================================ */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  DashboardData,
  KPIData,
  TrendItem,
  CategoryItem,
  RegionItem,
  RankItem,
  RealtimeItem,
  GaugeData,
} from '../adapters/types'
import { getAdapter } from '../adapters'
import { createLogger } from '../utils/logger'

const logger = createLogger('DashboardStore')

export const useDashboardStore = defineStore('dashboard', () => {
  // ========== 状态 ==========

  /** 加载状态 */
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  /** 大屏核心数据 */
  const kpi = ref<KPIData>({
    totalSales: 0,
    totalOrders: 0,
    activeUsers: 0,
    salesGrowth: 0,
    ordersGrowth: 0,
    usersGrowth: 0,
  })

  /** 趋势数据 */
  const trends = ref<TrendItem[]>([])

  /** 品类数据 */
  const categories = ref<CategoryItem[]>([])

  /** 地区数据 */
  const regions = ref<RegionItem[]>([])

  /** 排行数据 */
  const rankings = ref<RankItem[]>([])

  /** 实时通知 */
  const realtime = ref<RealtimeItem[]>([])

  /** 仪表盘数据 */
  const gauges = ref<GaugeData[]>([])

  // ========== 计算属性 ==========

  /** 今日 KPI 对比数据（用于对比卡片） */
  const kpiContrasts = computed(() => [
    { label: '销售额', today: kpi.value.totalSales, growth: kpi.value.salesGrowth, unit: '¥', format: 'currency' as const },
    { label: '订单量', today: kpi.value.totalOrders, growth: kpi.value.ordersGrowth, unit: '单', format: 'number' as const },
    { label: '用户数', today: kpi.value.activeUsers, growth: kpi.value.usersGrowth, unit: '人', format: 'number' as const },
  ])

  // ========== Actions ==========

  /**
   * 初始化加载大屏全量数据
   */
  async function loadDashboardData() {
    const adapter = getAdapter()
    loading.value = true
    error.value = null

    logger.time('数据加载')
    try {
      const data: DashboardData = await adapter.fetchDashboardData()

      kpi.value = data.kpi
      trends.value = data.trends
      categories.value = data.categories
      regions.value = data.regions
      rankings.value = data.rankings
      realtime.value = data.realtime
      gauges.value = data.gauges

      loaded.value = true
      logger.timeEnd('数据加载')
      logger.info('大屏数据加载完成', { kpi: data.kpi.totalSales, trends: data.trends.length })
    } catch (err) {
      const msg = err instanceof Error ? err.message : '未知错误'
      error.value = msg
      logger.error('大屏数据加载失败', err instanceof Error ? err : new Error(msg))
    } finally {
      loading.value = false
    }
  }

  /**
   * 拉取实时增量更新（每 5 秒调用）
   */
  async function fetchRealtimeUpdate() {
    try {
      const adapter = getAdapter()
      const update = await adapter.fetchRealtimeUpdates()

      // 更新 KPI（部分字段）
      if (update.kpi) {
        Object.assign(kpi.value, update.kpi)
      }

      // 追加新通知（保持最多 20 条）
      if (update.newNotifications?.length) {
        realtime.value = [...update.newNotifications, ...realtime.value].slice(0, 20)
      }
    } catch (err) {
      // 实时更新失败不影响已加载数据，静默处理
      logger.warn('实时更新拉取失败', err instanceof Error ? err.message : String(err))
    }
  }

  return {
    // 状态
    loading,
    loaded,
    error,
    kpi,
    trends,
    categories,
    regions,
    rankings,
    realtime,
    gauges,
    // 计算属性
    kpiContrasts,
    // Actions
    loadDashboardData,
    fetchRealtimeUpdate,
  }
})
