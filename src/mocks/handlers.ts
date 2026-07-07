/* ============================================
 * 梦天数据大屏 — MSW 请求处理器
 * ============================================ */

import { http, HttpResponse, delay } from 'msw'
import { mockKPIData, generateKPIUpdate } from './data/kpi'
import { mockTrendData } from './data/trends'
import { mockCategoryData } from './data/category'
import { mockRegionData } from './data/region'
import { mockRankData } from './data/ranks'
import { mockRealtimeData, generateRealtimeNotification } from './data/realtime'

/** API 基础路径 */
const BASE_URL = '/api/v1'

export const handlers = [
  // 获取大屏全部数据
  http.get(`${BASE_URL}/dashboard`, async () => {
    await delay(200)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        kpi: mockKPIData,
        trends: mockTrendData,
        categories: mockCategoryData,
        regions: mockRegionData,
        rankings: mockRankData,
        realtime: mockRealtimeData,
        gauges: [
          { label: '月度目标', current: 1286.8, target: 1500, unit: '万元' },
          { label: '季度目标', current: 3860.4, target: 4500, unit: '万元' },
        ],
      },
    })
  }),

  // 获取趋势数据
  http.get(`${BASE_URL}/trends`, async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const days = parseInt(url.searchParams.get('days') || '30', 10)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockTrendData.slice(-days),
    })
  }),

  // 获取排行数据
  http.get(`${BASE_URL}/rankings`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: mockRankData,
    })
  }),

  // 获取实时更新数据
  http.get(`${BASE_URL}/realtime/updates`, async () => {
    await delay(80)
    const newNotification = generateRealtimeNotification()
    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        kpi: generateKPIUpdate(),
        newNotifications: [newNotification],
      },
    })
  }),
]
