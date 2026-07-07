import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/__tests__/**/*.test.ts'],
    setupFiles: [],
    coverage: {
      provider: 'v8',
      include: ['src/utils/**', 'src/composables/**', 'src/stores/**'],
      exclude: ['src/__tests__/**'],
    },
    // 模拟浏览器 API
    onConsoleLog() { /* suppress logs during tests */ },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
