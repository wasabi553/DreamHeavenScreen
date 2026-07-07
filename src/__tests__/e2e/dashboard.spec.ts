/**
 * 大屏 E2E 测试
 * 验证页面加载和关键模块渲染
 */
import { test, expect } from '@playwright/test'

test.describe('梦天数据大屏 E2E', () => {
  test('页面应正常加载', async ({ page }) => {
    await page.goto('/')

    // 等待页面标题
    await expect(page).toHaveTitle('梦天数据大屏')
  })

  test('顶部标题栏应显示', async ({ page }) => {
    await page.goto('/')

    // 检查标题
    const headerTitle = page.locator('.header-title')
    await expect(headerTitle).toContainText('梦天数据大屏')
  })

  test('面板应正确渲染', async ({ page }) => {
    await page.goto('/')

    // 等待面板渲染
    await page.waitForSelector('.panel-container')

    // 至少应有 4 个以上面板
    const panels = page.locator('.panel-container')
    const count = await panels.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('粒子背景应存在', async ({ page }) => {
    await page.goto('/')

    // Canvas 粒子背景
    const canvas = page.locator('.particle-canvas')
    await expect(canvas).toBeVisible()
  })

  test('KPI 卡片应显示数据', async ({ page }) => {
    await page.goto('/')

    // 等待 KPI 数据渲染
    await page.waitForSelector('.kpi-card')
    const kpiCards = page.locator('.kpi-card')
    const count = await kpiCards.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})
