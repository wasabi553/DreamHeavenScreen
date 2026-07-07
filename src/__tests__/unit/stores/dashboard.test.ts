/**
 * Dashboard Store 单元测试
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDashboardStore } from '../../../stores/dashboard'

// Mock 适配器
vi.mock('../../../adapters', () => ({
  getAdapter: () => ({
    fetchDashboardData: vi.fn().mockResolvedValue({
      kpi: {
        totalSales: 1000000,
        totalOrders: 5000,
        activeUsers: 3000,
        salesGrowth: 0.1,
        ordersGrowth: -0.05,
        usersGrowth: 0.08,
      },
      trends: [
        { date: '07-01', sales: 400000, orders: 1200 },
        { date: '07-02', sales: 450000, orders: 1350 },
      ],
      categories: [
        { name: '电子产品', value: 300000, percent: 0.3 },
      ],
      regions: [
        { name: '华东地区', value: 500000 },
      ],
      rankings: [
        { rank: 1, name: '测试店铺', value: 200000, growth: 0.2 },
      ],
      realtime: [
        { id: 1, type: 'order', content: '测试通知', time: '12:00:00' },
      ],
      gauges: [
        { label: '月度目标', current: 800, target: 1500, unit: '万元' },
      ],
    }),
    fetchRealtimeUpdates: vi.fn().mockResolvedValue({
      kpi: { totalSales: 1005000 },
      newNotifications: [
        { id: 2, type: 'order', content: '新通知', time: '12:01:00' },
      ],
    }),
  }),
}))

describe('Dashboard Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始状态应为空', () => {
    const store = useDashboardStore()
    expect(store.loaded).toBe(false)
    expect(store.kpi.totalSales).toBe(0)
  })

  it('loadDashboardData 应加载数据', async () => {
    const store = useDashboardStore()
    await store.loadDashboardData()
    expect(store.loaded).toBe(true)
    expect(store.kpi.totalSales).toBe(1000000)
    expect(store.trends).toHaveLength(2)
  })

  it('fetchRealtimeUpdate 应更新实时数据', async () => {
    const store = useDashboardStore()
    await store.loadDashboardData()
    await store.fetchRealtimeUpdate()
    // KPI 应该被更新
    expect(store.kpi.totalSales).toBe(1005000)
    // 新通知应该被插入
    expect(store.realtime).toHaveLength(2)
  })

  it('kpiContrasts 应返回正确的计算属性', async () => {
    const store = useDashboardStore()
    await store.loadDashboardData()
    expect(store.kpiContrasts).toHaveLength(3)
    expect(store.kpiContrasts[0].label).toBe('销售额')
  })
})
