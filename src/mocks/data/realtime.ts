/* ============================================
 * 梦天数据大屏 — 实时通知 Mock 数据
 * ============================================ */

import type { RealtimeItem } from '../../adapters/types'

/**
 * 初始实时通知数据
 */
export const mockRealtimeData: RealtimeItem[] = [
  { id: 1, type: 'order', content: '华为旗舰店 完成一笔 ¥12,580 大额订单', time: '14:32:15' },
  { id: 2, type: 'milestone', content: '🎉 平台总销售额突破 1,280 万元', time: '14:30:02' },
  { id: 3, type: 'order', content: '小米官方店 新订单 ¥3,680 · 手机配件', time: '14:28:47' },
  { id: 4, type: 'alert', content: '⚠️ 华东区库存预警：电子产品库存不足 5%', time: '14:25:30' },
  { id: 5, type: 'order', content: '耐克运动旗舰 完成一笔 ¥8,920 订单', time: '14:22:18' },
  { id: 6, type: 'milestone', content: '🏆 今日活跃用户数突破 18,000 人', time: '14:20:00' },
  { id: 7, type: 'order', content: '海尔家电旗舰 新订单 ¥15,600 · 冰箱', time: '14:18:35' },
  { id: 8, type: 'order', content: '三只松鼠旗舰 新订单 ¥268 · 零食礼包', time: '14:15:22' },
]

/** 用于生成新通知的模板 */
const notificationTemplates = [
  { type: 'order' as const, content: '华为旗舰店 完成一笔 ¥{amount} 大额订单' },
  { type: 'order' as const, content: '小米官方店 新订单 ¥{amount} · 智能设备' },
  { type: 'order' as const, content: '耐克运动旗舰 新订单 ¥{amount} · 运动鞋' },
  { type: 'order' as const, content: '苹果授权店 新订单 ¥{amount} · 配件' },
  { type: 'order' as const, content: '欧莱雅美妆 新订单 ¥{amount} · 护肤品' },
  { type: 'alert' as const, content: '⚠️ 华南区物流延迟预警：预计影响 3 笔订单' },
  { type: 'milestone' as const, content: '📊 本月销售额完成率更新至 {percent}%' },
]

let notificationIdCounter = 100

/**
 * 生成新的实时通知
 */
export function generateRealtimeNotification(): RealtimeItem {
  const template = notificationTemplates[notificationIdCounter % notificationTemplates.length]
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  let content = template.content
  if (content.includes('{amount}')) {
    const amount = (Math.round(Math.sin(notificationIdCounter * 1.7) * 5000 + 8000) / 100).toFixed(0) + '00'
    content = content.replace('{amount}', Number(amount).toLocaleString())
  }
  if (content.includes('{percent}')) {
    content = content.replace('{percent}', String(78 + (notificationIdCounter % 15)))
  }

  notificationIdCounter++
  return {
    id: notificationIdCounter,
    type: template.type,
    content,
    time,
  }
}
