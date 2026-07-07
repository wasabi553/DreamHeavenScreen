/* ============================================
 * 梦天数据大屏 — 日志系统
 * 每个模块使用自己的 logger 实例
 * 开发环境输出所有级别，生产环境只输出 WARN 以上
 * ============================================ */

/** 日志级别 */
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

/** 日志级别标签映射 */
const LEVEL_LABELS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.SILENT]: 'SILENT',
}

/** 日志级别对应颜色 */
const LEVEL_COLORS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: '#8892b0',
  [LogLevel.INFO]: '#00f0ff',
  [LogLevel.WARN]: '#ffd93d',
  [LogLevel.ERROR]: '#ff4757',
  [LogLevel.SILENT]: '#8892b0',
}

/**
 * 日志记录器
 * 每个模块应创建自己的 logger 实例
 */
export class Logger {
  private level: LogLevel
  private prefix: string
  private timers: Map<string, number> = new Map()

  constructor(module: string) {
    this.prefix = `[DreamHeaven][${module}]`
    // 开发环境 DEBUG，生产环境 WARN
    this.level = import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.WARN
  }

  /** 格式化时间戳 */
  private get timestamp(): string {
    const now = new Date()
    return now.toLocaleTimeString('zh-CN', { hour12: false })
  }

  /** 判断是否应输出该级别日志 */
  private shouldLog(level: LogLevel): boolean {
    return level >= this.level
  }

  /** 核心输出方法 */
  private log(level: LogLevel, message: string, data?: unknown) {
    if (!this.shouldLog(level)) return

    const ts = this.timestamp
    const label = LEVEL_LABELS[level]
    const color = LEVEL_COLORS[level]

    const logLine = [
      `%c${ts} %c${label} %c${this.prefix} %c${message}`,
      'color: #5a6380',
      `color: ${color}; font-weight: bold`,
      'color: #a78bfa',
      `color: ${color}`,
    ] as const

    if (data !== undefined) {
      console.log(...logLine, data)
    } else {
      console.log(...logLine)
    }

    // error 级别额外调用 console.error
    if (level === LogLevel.ERROR && data instanceof Error) {
      console.error(data)
    }
  }

  /** 调试日志 — 仅开发环境 */
  debug(message: string, data?: unknown) {
    this.log(LogLevel.DEBUG, message, data)
  }

  /** 信息日志 */
  info(message: string, data?: unknown) {
    this.log(LogLevel.INFO, message, data)
  }

  /** 警告日志 */
  warn(message: string, data?: unknown) {
    this.log(LogLevel.WARN, message, data)
  }

  /** 错误日志 — 同时触发全局错误处理 */
  error(message: string, error?: Error) {
    this.log(LogLevel.ERROR, message, error)
    // 触发全局错误处理
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('dreamheaven:error', {
          detail: { message, error, module: this.prefix },
        }),
      )
    }
  }

  /** 性能计时开始 */
  time(label: string) {
    this.timers.set(label, performance.now())
    this.debug(`⏱ ${label} — 计时开始`)
  }

  /** 性能计时结束并输出耗时 */
  timeEnd(label: string) {
    const start = this.timers.get(label)
    if (start === undefined) {
      this.warn(`计时器 "${label}" 不存在`)
      return
    }
    const duration = performance.now() - start
    this.timers.delete(label)
    this.info(`⏱ ${label} — ${duration.toFixed(1)}ms`)
  }
}

/** 创建 logger 实例的工厂函数 */
export function createLogger(module: string): Logger {
  return new Logger(module)
}
