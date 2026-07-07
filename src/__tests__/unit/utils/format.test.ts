/**
 * Format 格式化工具单元测试
 */
import { describe, it, expect } from 'vitest'
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatDate,
  formatCompact,
  truncate,
} from '../../../utils/format'

describe('formatNumber', () => {
  it('应该格式化整数为千分位', () => {
    expect(formatNumber(12345)).toBe('12,345')
  })

  it('应该格式化小数', () => {
    expect(formatNumber(12345.67, 2)).toBe('12,345.67')
  })

  it('NaN 应该返回 --', () => {
    expect(formatNumber(Number.NaN)).toBe('--')
  })

  it('0 应该返回 0', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('formatCurrency', () => {
  it('应该格式化万元', () => {
    const result = formatCurrency(12867950)
    expect(result).toContain('万')
  })

  it('应该格式化亿元', () => {
    const result = formatCurrency(150000000)
    expect(result).toContain('亿')
  })

  it('小金额带 ¥ 符号', () => {
    const result = formatCurrency(5000)
    expect(result).toContain('¥')
  })
})

describe('formatPercent', () => {
  it('正值应带 + 号', () => {
    expect(formatPercent(0.126)).toBe('+12.6%')
  })

  it('负值应带 - 号', () => {
    expect(formatPercent(-0.034)).toBe('-3.4%')
  })

  it('0 不带符号', () => {
    expect(formatPercent(0)).toBe('0.0%')
  })
})

describe('formatDate', () => {
  it('应该格式化日期', () => {
    const result = formatDate('2025-07-07', 'date')
    expect(result).toBe('2025-07-07')
  })

  it('short 格式', () => {
    const result = formatDate('2025-07-07', 'short')
    expect(result).toBe('07-07')
  })
})

describe('formatCompact', () => {
  it('大于 1 万显示 w', () => {
    expect(formatCompact(15000)).toBe('1.5w')
  })

  it('大于 1000 显示 k', () => {
    expect(formatCompact(1500)).toBe('1.5k')
  })
})

describe('truncate', () => {
  it('超过长度应截断', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...')
  })

  it('不超过长度不截断', () => {
    expect(truncate('Hi', 5)).toBe('Hi')
  })
})
