/* ============================================
 * 梦天数据大屏 — 销售排行 Mock 数据
 * ============================================ */

import type { RankItem } from '../../adapters/types'

/**
 * Top 10 销售排行
 */
export const mockRankData: RankItem[] = [
  { rank: 1, name: '华为旗舰店', value: 2856000, growth: 0.235 },
  { rank: 2, name: '小米官方店', value: 2523400, growth: 0.187 },
  { rank: 3, name: '耐克运动旗舰', value: 2187600, growth: 0.156 },
  { rank: 4, name: '苹果授权店', value: 1965200, growth: -0.042 },
  { rank: 5, name: '海尔家电旗舰', value: 1758300, growth: 0.128 },
  { rank: 6, name: '欧莱雅美妆', value: 1542600, growth: 0.093 },
  { rank: 7, name: '宜家家居官方', value: 1328900, growth: 0.067 },
  { rank: 8, name: '三只松鼠旗舰', value: 1184500, growth: -0.018 },
  { rank: 9, name: '安踏体育官方', value: 1037200, growth: 0.112 },
  { rank: 10, name: '良品铺子旗舰', value: 896300, growth: 0.054 },
]
