/* ============================================
 * 梦天数据大屏 — 格式化工具
 * ============================================ */

/**
 * 格式化数字为千分位字符串
 * @param value 数字值
 * @param decimals 小数位数，默认 0
 */
export function formatNumber(value: number, decimals = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '--'
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * 格式化金额
 * @param value 金额（元）
 * @param showUnit 是否显示单位，默认 true
 */
export function formatCurrency(value: number, showUnit = true): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '--'

  if (value >= 100000000) {
    // 亿
    const v = (value / 100000000).toFixed(2)
    return showUnit ? `${v} 亿` : v
  }
  if (value >= 10000) {
    // 万
    const v = (value / 10000).toFixed(1)
    return showUnit ? `${v} 万` : v
  }
  return showUnit ? `¥${formatNumber(value, 0)}` : formatNumber(value, 0)
}

/**
 * 格式化百分比
 * @param value 小数形式（0.15 = 15%）
 * @param decimals 小数位数，默认 1
 */
export function formatPercent(value: number, decimals = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '--'
  const pct = value * 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(decimals)}%`
}

/**
 * 格式化日期
 * @param date 日期字符串或 Date 对象
 * @param format 格式模式: 'date' | 'time' | 'datetime' | 'short'
 */
export function formatDate(date: string | Date, format: 'date' | 'time' | 'datetime' | 'short' = 'date'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return '--'

  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')

  switch (format) {
    case 'time':
      return `${h}:${min}:${s}`
    case 'datetime':
      return `${y}-${m}-${day} ${h}:${min}:${s}`
    case 'short':
      return `${m}-${day}`
    default:
      return `${y}-${m}-${day}`
  }
}

/**
 * 格式化大数字为简写（如 1.2k、3.5w）
 */
export function formatCompact(value: number): string {
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}亿`
  if (value >= 10000) return `${(value / 10000).toFixed(1)}w`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(value)
}

/**
 * 格式化排名（1st, 2nd, 3rd, 4th...）
 */
export function formatRank(rank: number): string {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `${rank}`
}

/**
 * 截断文本
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
