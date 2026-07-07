/* ============================================
 * 梦天数据大屏 — 趋势 Mock 数据（30天）
 * ============================================ */

import type { TrendItem } from '../../adapters/types'

/**
 * 生成近 30 天趋势数据
 * 数据有波动规律：周末销量低于工作日，有促销峰值
 */
export const mockTrendData: TrendItem[] = [
  { date: '06-08', sales: 382400, orders: 1147 },
  { date: '06-09', sales: 296500, orders: 890 },
  { date: '06-10', sales: 425600, orders: 1277 },
  { date: '06-11', sales: 458300, orders: 1375 },
  { date: '06-12', sales: 412700, orders: 1238 },
  { date: '06-13', sales: 389200, orders: 1168 },
  { date: '06-14', sales: 321500, orders: 965 },
  { date: '06-15', sales: 298700, orders: 896 },
  { date: '06-16', sales: 446800, orders: 1340 },
  { date: '06-17', sales: 472100, orders: 1416 },
  { date: '06-18', sales: 435600, orders: 1307 },
  { date: '06-19', sales: 523400, orders: 1570 },
  { date: '06-20', sales: 486200, orders: 1459 },
  { date: '06-21', sales: 352600, orders: 1058 },
  { date: '06-22', sales: 314800, orders: 944 },
  { date: '06-23', sales: 438700, orders: 1316 },
  { date: '06-24', sales: 461500, orders: 1385 },
  { date: '06-25', sales: 508900, orders: 1527 },
  { date: '06-26', sales: 556200, orders: 1669 },
  { date: '06-27', sales: 498300, orders: 1495 },
  { date: '06-28', sales: 365400, orders: 1096 },
  { date: '06-29', sales: 302100, orders: 906 },
  { date: '06-30', sales: 441200, orders: 1324 },
  { date: '07-01', sales: 478600, orders: 1436 },
  { date: '07-02', sales: 513800, orders: 1541 },
  { date: '07-03', sales: 489500, orders: 1469 },
  { date: '07-04', sales: 535100, orders: 1605 },
  { date: '07-05', sales: 562800, orders: 1688 },
  { date: '07-06', sales: 401200, orders: 1204 },
  { date: '07-07', sales: 423600, orders: 1271 },
]
