/* ============================================
 * 梦天数据大屏 — MSW Service Worker 启动
 * ============================================ */

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
