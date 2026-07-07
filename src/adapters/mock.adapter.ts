/* ============================================
 * 梦天数据大屏 — Mock 数据适配器
 * 直接返回内置 Mock 数据，无需 HTTP 请求
 * 后期切换到 APIAdapter 时改为真实 HTTP 调用
 * ============================================ */

import type { DataAdapter, DashboardData, TrendItem, RankItem, KPIData, RealtimeItem } from './types'
import { mockKPIData, generateKPIUpdate } from '../mocks/data/kpi'
import { mockTrendData } from '../mocks/data/trends'
import { mockCategoryData } from '../mocks/data/category'
import { mockRegionData } from '../mocks/data/region'
import { mockRankData } from '../mocks/data/ranks'
import { mockRealtimeData, generateRealtimeNotification } from '../mocks/data/realtime'
import { createLogger } from '../utils/logger'

const logger = createLogger('MockAdapter')

/**
 * 模拟网络延迟
 */
function simulateDelay(ms = 150): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mock 适配器 — 直接返回内置模拟数据
 */
export class MockAdapter implements DataAdapter {
  async fetchDashboardData(): Promise<DashboardData> {
    logger.debug('获取大屏全量数据 (Mock 直接返回)')
    await simulateDelay(200)
    return {
      kpi: { ...mockKPIData },
      trends: [...mockTrendData],
      categories: [...mockCategoryData],
      regions: [...mockRegionData],
      rankings: [...mockRankData],
      realtime: [...mockRealtimeData],
      gauges: [
        { label: '月度目标', current: 1286.8, target: 1500, unit: '万元' },
        { label: '季度目标', current: 3860.4, target: 4500, unit: '万元' },
      ],
    }
  }

  async fetchTrendData(days: number): Promise<TrendItem[]> {
    logger.debug(`获取近 ${days} 天趋势数据`)
    await simulateDelay(80)
    return mockTrendData.slice(-days)
  }

  async fetchRankData(): Promise<RankItem[]> {
    logger.debug('获取排行数据')
    await simulateDelay(80)
    return [...mockRankData]
  }

  async fetchRealtimeUpdates(): Promise<{
    kpi: Partial<KPIData>
    newNotifications: RealtimeItem[]
  }> {
    await simulateDelay(50)
    return {
      kpi: generateKPIUpdate(),
      newNotifications: [generateRealtimeNotification()],
    }
  }
}
