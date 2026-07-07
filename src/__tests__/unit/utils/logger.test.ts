/**
 * Logger 日志系统单元测试
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Logger, createLogger } from '../../../utils/logger'

describe('Logger', () => {
  let logger: Logger
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    logger = createLogger('TestModule')
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('应该创建 Logger 实例', () => {
    expect(logger).toBeInstanceOf(Logger)
  })

  it('应该输出 debug 日志', () => {
    logger.debug('测试调试消息')
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('应该输出 info 日志', () => {
    logger.info('测试信息消息')
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('应该输出 warn 日志', () => {
    logger.warn('测试警告消息')
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('应该输出 error 日志', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    logger.error('测试错误消息', new Error('测试异常'))
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('应该支持性能计时', () => {
    logger.time('test-timer')
    logger.timeEnd('test-timer')
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('createLogger 应该创建独立实例', () => {
    const logger1 = createLogger('ModuleA')
    const logger2 = createLogger('ModuleB')
    expect(logger1).not.toBe(logger2)
  })
})
