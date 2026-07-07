/**
 * MockAdapter 单元测试
 * 验证 Mock 数据完整性和适配器可用性
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from '../../../mocks/handlers'
import { MockAdapter } from '../../../adapters/mock.adapter'

const server = setupServer(...handlers)

describe('MockAdapter', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterAll(() => server.close())

  it('应该获取完整大屏数据', async () => {
    const adapter = new MockAdapter()
    const data = await adapter.fetchDashboardData()

    expect(data.kpi).toBeDefined()
    expect(data.kpi.totalSales).toBeGreaterThan(0)
    expect(data.trends.length).toBeGreaterThanOrEqual(30)
    expect(data.categories.length).toBeGreaterThanOrEqual(5)
    expect(data.regions.length).toBeGreaterThanOrEqual(7)
    expect(data.rankings.length).toBeGreaterThanOrEqual(10)
    expect(data.realtime.length).toBeGreaterThan(0)
    expect(data.gauges.length).toBe(2)
  })

  it('应该获取趋势数据', async () => {
    const adapter = new MockAdapter()
    const trends = await adapter.fetchTrendData(7)
    expect(trends).toHaveLength(7)
  })

  it('应该获取排行数据', async () => {
    const adapter = new MockAdapter()
    const rankings = await adapter.fetchRankData()
    expect(rankings.length).toBeGreaterThanOrEqual(10)
    expect(rankings[0].rank).toBe(1)
  })

  it('应该获取实时更新数据', async () => {
    const adapter = new MockAdapter()
    const update = await adapter.fetchRealtimeUpdates()
    expect(update.kpi).toBeDefined()
    expect(update.newNotifications.length).toBe(1)
  })
})
