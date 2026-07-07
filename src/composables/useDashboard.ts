/* ============================================
 * 梦天数据大屏 — 大屏数据加载与刷新 Composable
 * ============================================ */

import { onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { createLogger } from '../utils/logger'

const logger = createLogger('useDashboard')

/**
 * 大屏数据管理 Composable
 * 封装数据加载、自动刷新逻辑
 */
export function useDashboard() {
  const store = useDashboardStore()

  /** 初始化加载 */
  async function init() {
    if (store.loaded) {
      logger.debug('数据已加载，跳过重复请求')
      return
    }
    await store.loadDashboardData()
  }

  onMounted(() => {
    init()
  })

  return {
    store,
    init,
    refresh: () => store.loadDashboardData(),
  }
}
