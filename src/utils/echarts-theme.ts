/* ============================================
 * 梦天数据大屏 — ECharts 航天深空主题
 * ============================================ */

import type { EChartsOption } from 'echarts'

export const THEME_COLORS = {
  cyan: '#00e5ee',
  blue: '#448aff',
  purple: '#b388ff',
  pink: '#ff6e9f',
  orange: '#ff8f3f',
  green: '#00e676',
  red: '#ff4458',
  text: '#e4f0ff',
  secondary: '#8495b8',
}

export function getBaseChartTheme(): Partial<EChartsOption> {
  return {
    backgroundColor: 'transparent',
    textStyle: { color: THEME_COLORS.secondary, fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif', fontSize: 12 },
    legend: { textStyle: { color: THEME_COLORS.secondary, fontSize: 11 }, itemWidth: 10, itemHeight: 6, itemGap: 14 },
    tooltip: {
      backgroundColor: 'rgba(8,18,48,0.95)', borderColor: THEME_COLORS.cyan, borderWidth: 1,
      textStyle: { color: THEME_COLORS.text, fontSize: 12 },
      extraCssText: 'box-shadow: 0 0 20px rgba(0,229,238,0.25);',
    },
    animation: true, animationDuration: 800, animationEasing: 'cubicOut' as const,
  }
}

export function getAxisStyle() {
  return {
    axisLine: { lineStyle: { color: 'rgba(0,229,238,0.15)' } },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: 'rgba(0,229,238,0.06)', type: 'dashed' as const } },
    axisLabel: { color: THEME_COLORS.secondary, fontSize: 11 },
  }
}
