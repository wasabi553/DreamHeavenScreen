/* ============================================
 * 梦天数据大屏 — 航天深空图表配置
 * ============================================ */

import type { EChartsOption } from 'echarts'
import type { TrendItem, CategoryItem, RegionItem, GaugeData } from '../adapters/types'
import { THEME_COLORS, getBaseChartTheme, getAxisStyle } from '../utils/echarts-theme'

// ---- 折线图 --------------------------------------------------
export function useTrendLineOption(trends: TrendItem[]): EChartsOption {
  const base = getBaseChartTheme()
  return {
    ...base, tooltip: { ...base.tooltip, trigger: 'axis' as const },
    grid: { top: 14, right: 22, bottom: 40, left: 58, containLabel: false },
    xAxis: { type: 'category' as const, data: trends.map((t) => t.date), boundaryGap: false, axisLine: { lineStyle: { color: 'rgba(0,229,238,0.18)' } }, axisTick: { show: false }, axisLabel: { color: THEME_COLORS.secondary, fontSize: 11, interval: 4, margin: 10 } },
    yAxis: { type: 'value' as const, ...getAxisStyle(), axisLabel: { color: THEME_COLORS.secondary, fontSize: 11, formatter: (v: number) => v >= 10000 ? `${(v/10000).toFixed(0)}w` : String(v) }, splitLine: { lineStyle: { color: 'rgba(0,229,238,0.06)', type: 'dashed' } } },
    series: [{ name: '销售额', type: 'line', data: trends.map((t) => t.sales), smooth: true, symbol: 'none', lineStyle: { color: THEME_COLORS.cyan, width: 2.5, shadowBlur: 14, shadowColor: THEME_COLORS.cyan }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(0,229,238,0.28)' }, { offset: 0.5, color: 'rgba(179,136,255,0.08)' }, { offset: 1, color: 'rgba(0,229,238,0.01)' }] } }, itemStyle: { color: THEME_COLORS.cyan } }],
  }
}

// ---- 柱状图 --------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCategoryBarOption(categories: CategoryItem[]): any {
  const base = getBaseChartTheme()
  const names = [...categories].reverse().map((c) => c.name)
  const values = [...categories].reverse().map((c) => c.value)
  const colors = [THEME_COLORS.cyan, THEME_COLORS.blue, THEME_COLORS.purple, THEME_COLORS.pink, '#ff8f3f'].reverse()
  return {
    ...base, tooltip: { ...base.tooltip, trigger: 'axis' as const },
    grid: { top: 10, right: 30, bottom: 28, left: 58, containLabel: false },
    xAxis: { type: 'value' as const, ...getAxisStyle(), axisLabel: { color: THEME_COLORS.secondary, fontSize: 10, formatter: (v: number) => `${(v/10000).toFixed(0)}w` } },
    yAxis: { type: 'category' as const, data: names, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: THEME_COLORS.text, fontSize: 12 } },
    series: [{ type: 'bar', barWidth: 14, data: values.map((v: number, i: number) => ({ value: v, itemStyle: { color: colors[i], borderRadius: [0, 3, 3, 0], shadowBlur: 8, shadowColor: colors[i] } })), label: { show: true, position: 'right', distance: 4, color: THEME_COLORS.secondary, fontSize: 10, formatter: (p: unknown) => `${((p as { value: number }).value / 10000).toFixed(0)}w` } }],
  }
}

// ---- 饼图 ----------------------------------------------------
export function useRegionPieOption(regions: RegionItem[]): EChartsOption {
  const base = getBaseChartTheme()
  const colors = ['#00e5ee', '#448aff', '#b388ff', '#ff6e9f', '#ff8f3f', '#00e676', '#ffd740']
  return {
    ...base,
    legend: { orient: 'vertical' as const, right: '0%', top: 'center', itemWidth: 8, itemHeight: 8, itemGap: 14, textStyle: { color: THEME_COLORS.secondary, fontSize: 11 } },
    series: [{ type: 'pie' as const, radius: ['50%', '75%'], center: ['36%', '50%'], avoidLabelOverlap: false, itemStyle: { borderRadius: 3, borderColor: 'rgba(8,18,48,0.75)', borderWidth: 2, shadowBlur: 12, shadowColor: 'rgba(0,229,238,0.2)' }, label: { show: false }, emphasis: { label: { show: true, fontSize: 13, fontWeight: 'bold', color: THEME_COLORS.text }, scaleSize: 5 }, data: regions.map((r, i) => ({ value: r.value, name: r.name, itemStyle: { color: colors[i % colors.length] } })) }],
  }
}

// ---- 仪表盘（新版：简化刻度，金额外置）---------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGaugeOption(gaugeData: GaugeData, color: string = THEME_COLORS.cyan): any {
  const pct = Math.round((gaugeData.current / gaugeData.target) * 100)
  return {
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      startAngle: 210,
      endAngle: -30,
      center: ['50%', '52%'],
      radius: '82%',
      min: 0,
      max: 100,
      // 只显示 0/20/40/60/80/100
      splitNumber: 5,
      axisLine: {
        show: true,
        lineStyle: {
          width: 14,
          color: [[pct / 100, color], [1, 'rgba(0,229,238,0.06)']],
        },
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '55%',
        width: 5,
        offsetCenter: [0, '-12%'],
        itemStyle: { color: '#e4f0ff' },
      },
      axisTick: { show: false },
      splitLine: {
        show: true,
        length: 12,
        distance: -6,
        lineStyle: { color: 'rgba(0,229,238,0.25)', width: 1 },
      },
      axisLabel: {
        show: true,
        distance: -20,
        color: THEME_COLORS.secondary,
        fontSize: 10,
      },
      // 不显示中心值（由 Vue 组件外置）
      detail: { show: false },
      // 不显示重叠文字
      title: { show: false },
      data: [{ value: pct }],
    }],
  }
}

// ---- 地图散点 ------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMapScatterOption(regions: RegionItem[]): any {
  const base = getBaseChartTheme()
  const coords: Record<string, [number, number]> = { '华东地区': [121,31], '华南地区': [113,24], '华北地区': [116,40], '华中地区': [113,31], '西南地区': [104,29], '西北地区': [96,37], '东北地区': [124,45] }
  const maxV = Math.max(...regions.map((r) => r.value), 1)
  return {
    ...base, grid: { top: 4, right: 4, bottom: 4, left: 4, containLabel: false },
    xAxis: { type: 'value', show: false, min: 84, max: 132 }, yAxis: { type: 'value', show: false, min: 19, max: 51 },
    series: [{ type: 'scatter', symbolSize: (v: number[]) => 14 + (v[2] / maxV) * 28, data: regions.map((r) => { const [cx, cy] = coords[r.name] || [116,35]; return { name: r.name, value: [cx, cy, r.value] } }), itemStyle: { color: { type: 'radial', x: 0.35, y: 0.35, r: 0.8, colorStops: [{ offset: 0, color: 'rgba(200,240,255,0.9)' }, { offset: 0.4, color: THEME_COLORS.cyan }, { offset: 1, color: 'rgba(0,180,220,0.04)' }] }, shadowBlur: 16, shadowColor: THEME_COLORS.cyan }, label: { show: true, formatter: (p: { name: string }) => p.name, position: 'bottom', color: THEME_COLORS.secondary, fontSize: 10, distance: 5 }, emphasis: { scale: 1.35, label: { color: THEME_COLORS.cyan, fontWeight: 'bold' } } }],
  }
}
