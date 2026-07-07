/* ============================================
 * 梦天数据大屏 — 全局错误处理
 * ============================================ */

import { createLogger } from './logger'

const logger = createLogger('ErrorHandler')

/** 错误上下文信息 */
interface ErrorContext {
  source: string
  message: string
  error?: Error
  timestamp: number
}

/** 错误历史记录（最多保留 50 条） */
const errorHistory: ErrorContext[] = []
const MAX_HISTORY = 50

/**
 * 全局错误处理器
 */
class GlobalErrorHandler {
  private listeners: Array<(ctx: ErrorContext) => void> = []

  /** 初始化全局错误监听 */
  init() {
    // Vue 错误
    window.addEventListener('error', (event) => {
      this.handleError({
        source: 'window.onerror',
        message: event.message,
        error: event.error,
        timestamp: Date.now(),
      })
    })

    // Promise 未捕获异常
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        source: 'unhandledrejection',
        message: event.reason?.message || String(event.reason),
        error: event.reason instanceof Error ? event.reason : undefined,
        timestamp: Date.now(),
      })
    })

    // 自定义错误事件（logger 触发）
    window.addEventListener('dreamheaven:error', ((e: CustomEvent) => {
      this.handleError({
        source: e.detail.module || 'unknown',
        message: e.detail.message,
        error: e.detail.error,
        timestamp: Date.now(),
      })
    }) as EventListener)

    logger.info('全局错误处理器已初始化')
  }

  /** 处理错误 */
  private handleError(ctx: ErrorContext) {
    errorHistory.push(ctx)
    if (errorHistory.length > MAX_HISTORY) {
      errorHistory.shift()
    }

    // 开发环境打印详细信息
    if (import.meta.env.DEV) {
      console.group(`%c❌ ${ctx.source}`, 'color: #ff4757')
      console.log('消息:', ctx.message)
      if (ctx.error) {
        console.log('错误:', ctx.error)
      }
      console.groupEnd()
    }

    // 通知所有监听器
    this.listeners.forEach((fn) => {
      try {
        fn(ctx)
      } catch {
        // 监听器自身错误不处理，避免无限循环
      }
    })
  }

  /** 添加错误监听器 */
  onError(fn: (ctx: ErrorContext) => void) {
    this.listeners.push(fn)
    // 返回取消订阅函数
    return () => {
      this.listeners = this.listeners.filter((f) => f !== fn)
    }
  }

  /** 获取错误历史 */
  getHistory(): ErrorContext[] {
    return [...errorHistory]
  }
}

/** 单例 */
export const errorHandler = new GlobalErrorHandler()

/**
 * 安全执行异步函数，自动捕获异常
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  context: string = 'unknown',
): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    logger.error(`安全执行失败 [${context}]`, err instanceof Error ? err : new Error(String(err)))
    return null
  }
}

/**
 * 安全执行同步函数，自动捕获异常
 */
export function safeSync<T>(fn: () => T, context: string = 'unknown'): T | null {
  try {
    return fn()
  } catch (err) {
    logger.error(`安全执行失败 [${context}]`, err instanceof Error ? err : new Error(String(err)))
    return null
  }
}
