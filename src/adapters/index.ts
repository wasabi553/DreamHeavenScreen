/* ============================================
 * 梦天数据大屏 — 数据适配器工厂
 * 通过环境变量 VITE_DATA_SOURCE 控制数据源切换
 * 切换数据源只需修改 .env，不改任何业务代码
 * ============================================ */

import type { DataAdapter } from './types'
import { MockAdapter } from './mock.adapter'
import { APIAdapter } from './api.adapter'
import { createLogger } from '../utils/logger'

const logger = createLogger('AdapterFactory')

/**
 * 适配器工厂函数
 * 根据环境变量 VITE_DATA_SOURCE 选择适配器实现
 *
 * @returns DataAdapter 实例
 */
export function createAdapter(): DataAdapter {
  const source = import.meta.env.VITE_DATA_SOURCE

  if (source === 'api') {
    logger.info('使用 API 适配器 — 真实数据源')
    return new APIAdapter()
  }

  logger.info('使用 Mock 适配器 — 模拟数据源')
  return new MockAdapter()
}

/** 全局单例适配器 */
let _adapter: DataAdapter | null = null

/**
 * 获取适配器单例
 */
export function getAdapter(): DataAdapter {
  if (!_adapter) {
    _adapter = createAdapter()
  }
  return _adapter
}

export type { DataAdapter }
