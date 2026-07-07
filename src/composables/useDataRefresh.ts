/* ============================================
 * 梦天数据大屏 — 定时数据刷新 Composable
 * 每 5 秒拉取增量数据更新
 * ============================================ */

import { onMounted, onBeforeUnmount } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { createLogger } from '../utils/logger'

const logger = createLogger('DataRefresh')

/**
 * 数据自动刷新
 * @param intervalMs 刷新间隔（毫秒），默认 5000
 */
export function useDataRefresh(intervalMs = 5000) {
  const store = useDashboardStore()
  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    if (timer) return
    logger.debug(`启动数据自动刷新，间隔 ${intervalMs}ms`)
    timer = setInterval(async () => {
      await store.fetchRealtimeUpdate()
    }, intervalMs)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
      logger.debug('停止数据自动刷新')
    }
  }

  onMounted(() => {
    start()
  })

  onBeforeUnmount(() => {
    stop()
  })

  return { start, stop }
}
