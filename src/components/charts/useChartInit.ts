/* ============================================
 * 梦天数据大屏 — ECharts 初始化 Composable
 * 支持响应式数据更新、自动 resize、销毁
 * ============================================ */

import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, GaugeChart, ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { ref, onMounted, onBeforeUnmount, watch, nextTick, type Ref } from 'vue'
import { createLogger } from '../../utils/logger'

// 按需注册
echarts.use([
  BarChart, LineChart, PieChart, GaugeChart, ScatterChart,
  GridComponent, TitleComponent, TooltipComponent, LegendComponent,
  CanvasRenderer,
])

const logger = createLogger('ECharts')

/**
 * 通用图表初始化 Hook
 * @param elementId — 容器 DOM ID
 * @param optionsRef — 响应式 EChartsOption (Ref / ComputedRef)
 */
export function useChartInit(
  elementId: string,
  optionsRef: Ref<EChartsOption>,
) {
  const chartInstance = ref<echarts.ECharts | null>(null)
  let resizeObserver: ResizeObserver | null = null

  function getContainer(): HTMLDivElement | null {
    return document.getElementById(elementId) as HTMLDivElement | null
  }

  function initChart() {
    const container = getContainer()
    if (!container) {
      logger.warn(`图表容器 #${elementId} 未找到`)
      return
    }

    const existing = echarts.getInstanceByDom(container)
    if (existing) existing.dispose()

    const instance = echarts.init(container)
    chartInstance.value = instance

    // 设置初始配置
    instance.setOption(optionsRef.value)

    // ResizeObserver 监听容器尺寸变化
    resizeObserver = new ResizeObserver(() => {
      instance.resize()
    })
    resizeObserver.observe(container)

    logger.debug(`图表 #${elementId} 初始化完成`)
  }

  // 数据变化时更新图表
  watch(optionsRef, (newOptions) => {
    if (chartInstance.value && newOptions) {
      chartInstance.value.setOption(newOptions, { notMerge: true })
    }
  }, { deep: true })

  // 延迟初始化，确保 DOM 已渲染
  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        initChart()
      }, 100)
    })
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    if (chartInstance.value) {
      chartInstance.value.dispose()
      chartInstance.value = null
      logger.debug(`图表 #${elementId} 已销毁`)
    }
  })

  return { chartInstance }
}
