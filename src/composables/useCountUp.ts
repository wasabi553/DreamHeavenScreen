/* ============================================
 * 梦天数据大屏 — 数字滚动动画 Composable
 * 使用 requestAnimationFrame 实现数字从 0 滚动到目标值
 * ============================================ */

import { ref, watch, onBeforeUnmount } from 'vue'

/** 缓动函数：easeOutCubic */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export interface UseCountUpOptions {
  /** 动画持续时间（毫秒），默认 1500 */
  duration?: number
  /** 小数位数，默认 0 */
  decimals?: number
  /** 千分位分隔，默认 true */
  separator?: boolean
  /** 前缀 */
  prefix?: string
  /** 后缀 */
  suffix?: string
}

export function useCountUp(target: () => number, options: UseCountUpOptions = {}) {
  const {
    duration = 1500,
    decimals = 0,
    separator = true,
    prefix = '',
    suffix = '',
  } = options

  const displayValue = ref(formatValue(0))

  let animationId: number | null = null
  let startTime: number | null = null
  let startValue = 0

  function formatValue(val: number): string {
    let formatted: string
    if (separator) {
      formatted = val.toLocaleString('zh-CN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    } else {
      formatted = val.toFixed(decimals)
    }
    return `${prefix}${formatted}${suffix}`
  }

  function animate(timestamp: number) {
    if (startTime === null) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutCubic(progress)

    const currentValue = startValue + (target() - startValue) * easedProgress
    displayValue.value = formatValue(currentValue)

    if (progress < 1) {
      animationId = requestAnimationFrame(animate)
    } else {
      displayValue.value = formatValue(target())
    }
  }

  function start(fromValue = 0) {
    // 取消之前的动画
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }
    startTime = null
    startValue = fromValue
    animationId = requestAnimationFrame(animate)
  }

  /** 直接跳到目标值（无动画） */
  function snapToTarget() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    displayValue.value = formatValue(target())
  }

  onBeforeUnmount(() => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }
  })

  return {
    displayValue,
    start,
    snapToTarget,
  }
}
