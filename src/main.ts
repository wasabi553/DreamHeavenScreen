import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './assets/styles/variables.css'
import './assets/styles/global.css'
import './assets/styles/animations.css'

async function bootstrap() {
  // 仅在 API 模式下启动 MSW（Mock 模式直接返回数据，无需 MSW）
  if (import.meta.env.VITE_DATA_SOURCE === 'api') {
    try {
      const { worker } = await import('./mocks/browser')
      await worker.start({
        onUnhandledRequest: 'bypass',
        quiet: true,
      })
      console.log('[DreamHeaven] MSW Mock Service Worker 已启动')
    } catch {
      console.warn('[DreamHeaven] MSW 启动失败，使用直接 Mock 模式')
    }
  }

  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.mount('#app')

  console.log(`[DreamHeaven] ${import.meta.env.VITE_APP_TITLE} 已启动`)
}

bootstrap()
