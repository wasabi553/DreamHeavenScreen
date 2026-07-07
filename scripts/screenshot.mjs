/**
 * 梦天数据大屏 — 自动截图脚本
 * 用法: node scripts/screenshot.mjs
 * 前提: npm run dev 已在另一个终端运行
 */

import { chromium } from '@playwright/test'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../docs')

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

  console.log('📸 正在截取大屏截图...')
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
  // 等动画和图表渲染完成
  await page.waitForTimeout(5000)

  await page.screenshot({
    path: path.join(OUT_DIR, 'screenshot.png'),
    fullPage: false,
  })
  console.log('✅ 截图已保存到 docs/screenshot.png')

  await browser.close()
}

main().catch((err) => {
  console.error('❌ 截图失败:', err.message)
  process.exit(1)
})
