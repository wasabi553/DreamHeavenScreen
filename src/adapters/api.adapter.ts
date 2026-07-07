/* ============================================
 * 梦天数据大屏 — API 适配器（预留）
 * 后期对接真实 API 时实现
 * ============================================ */

import axios from 'axios'
import type { DataAdapter, DashboardData, TrendItem, RankItem, KPIData, RealtimeItem } from './types'
import { createLogger } from '../utils/logger'

const logger = createLogger('APIAdapter')
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

/**
 * API 适配器实现（骨架）
 * 当前返回空数据，后期替换为真实接口调用
 */
export class APIAdapter implements DataAdapter {
  async fetchDashboardData(): Promise<DashboardData> {
    logger.info('API 模式：获取大屏全量数据')
    try {
      const res = await axios.get(`${BASE_URL}/dashboard`)
      return res.data.data
    } catch (err) {
      logger.error('获取大屏数据失败', err instanceof Error ? err : new Error(String(err)))
      // 返回空数据骨架，避免页面崩溃
      return {
        kpi: { totalSales: 0, totalOrders: 0, activeUsers: 0, salesGrowth: 0, ordersGrowth: 0, usersGrowth: 0 },
        trends: [],
        categories: [],
        regions: [],
        rankings: [],
        realtime: [],
        gauges: [],
      }
    }
  }

  async fetchTrendData(days: number): Promise<TrendItem[]> {
    logger.info(`API 模式：获取近 ${days} 天趋势数据`)
    try {
      const res = await axios.get(`${BASE_URL}/trends`, { params: { days } })
      return res.data.data
    } catch (err) {
      logger.error('获取趋势数据失败', err instanceof Error ? err : new Error(String(err)))
      return []
    }
  }

  async fetchRankData(): Promise<RankItem[]> {
    logger.info('API 模式：获取排行数据')
    try {
      const res = await axios.get(`${BASE_URL}/rankings`)
      return res.data.data
    } catch (err) {
      logger.error('获取排行数据失败', err instanceof Error ? err : new Error(String(err)))
      return []
    }
  }

  async fetchRealtimeUpdates(): Promise<{
    kpi: Partial<KPIData>
    newNotifications: RealtimeItem[]
  }> {
    logger.info('API 模式：获取实时更新')
    try {
      const res = await axios.get(`${BASE_URL}/realtime/updates`)
      return res.data.data
    } catch (err) {
      logger.error('获取实时更新失败', err instanceof Error ? err : new Error(String(err)))
      return { kpi: {}, newNotifications: [] }
    }
  }
}
