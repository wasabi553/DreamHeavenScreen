/* ============================================
 * 梦天数据大屏 — KPI Mock 数据
 * ============================================ */

import type { KPIData } from '../../adapters/types'

/**
 * 全量 KPI 数据
 * 数据设计原则：数值真实合理，具有区分度
 */
export const mockKPIData: KPIData = {
  totalSales: 12867950,
  totalOrders: 38429,
  activeUsers: 18750,
  salesGrowth: 0.126,
  ordersGrowth: -0.034,
  usersGrowth: 0.089,
}

/**
 * 每次刷新时的微调数据（围绕基准值小幅波动）
 */
export function generateKPIUpdate(): Partial<KPIData> {
  // 每次刷新只微调，模拟真实数据变化
  const salesDelta = Math.round((Math.sin(Date.now() / 30000) * 5000 + 5000))
  const ordersDelta = Math.round((Math.cos(Date.now() / 25000) * 15 + 15))
  const usersDelta = Math.round((Math.sin(Date.now() / 35000) * 8 + 8))

  return {
    totalSales: 12867950 + salesDelta,
    totalOrders: 38429 + ordersDelta,
    activeUsers: 18750 + usersDelta,
    salesGrowth: 0.126 + (Math.sin(Date.now() / 40000) * 0.005),
    ordersGrowth: -0.034 + (Math.cos(Date.now() / 35000) * 0.003),
    usersGrowth: 0.089 + (Math.sin(Date.now() / 45000) * 0.004),
  }
}
