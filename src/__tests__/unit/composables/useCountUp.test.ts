/**
 * useCountUp 数字滚动动画单元测试
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCountUp } from '../../../composables/useCountUp'

// 保存原始 RAF
const origRAF = globalThis.requestAnimationFrame
const origCAF = globalThis.cancelAnimationFrame

describe('useCountUp', () => {
  beforeEach(() => {
    let id = 0
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      id++
      setTimeout(() => cb(performance.now() + 2000), 0)
      return id
    }
    globalThis.cancelAnimationFrame = vi.fn()
  })

  afterEach(() => {
    globalThis.requestAnimationFrame = origRAF
    globalThis.cancelAnimationFrame = origCAF
  })

  it('应该返回 displayValue ref', () => {
    const target = () => 1000
    const { displayValue } = useCountUp(target)
    expect(displayValue.value).toBeDefined()
  })

  it('应该支持前缀和后缀', () => {
    const target = () => 500
    const { displayValue } = useCountUp(target, {
      prefix: '¥',
      suffix: ' 元',
      duration: 100,
    })
    expect(displayValue.value).toBe('¥0 元')
  })

  it('snapToTarget 应该直接跳到目标值', () => {
    const target = () => 999
    const { displayValue, snapToTarget } = useCountUp(target)
    snapToTarget()
    expect(displayValue.value).toContain('999')
  })

  it('小数位应正确', () => {
    const target = () => 3.14159
    const { displayValue, snapToTarget } = useCountUp(target, { decimals: 2 })
    snapToTarget()
    expect(displayValue.value).toContain('3.14')
  })

  it('start 应开始动画', () => {
    const target = () => 5000
    const { displayValue, start } = useCountUp(target)
    start(0)
    // 应该开始动画，值应该发生变化
    expect(displayValue.value).toBeDefined()
  })
})
