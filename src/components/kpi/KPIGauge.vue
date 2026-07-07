<script setup lang="ts">
/**
 * 仪表盘 KPI
 * 布局：环形居中 → 金额在环下方 → 目标文字在底部
 */
import { computed, useId } from 'vue'
import { useChartInit } from '../charts/useChartInit'
import { useGaugeOption } from '../../composables/useCharts'
import type { GaugeData } from '../../adapters/types'

const props = defineProps<{ data: GaugeData; color?: string }>()
const chartId = `gauge-${props.data.label.replace(/\s/g, '-')}-${useId()}`
const options = computed(() => useGaugeOption(props.data, props.color))
useChartInit(chartId, options)
</script>

<template>
  <div class="gauge-root">
    <!-- ECharts 环形 -->
    <div :id="chartId" class="gauge-ring" />
    <!-- 完成金额（环下方） -->
    <div class="gauge-value">
      <span class="gv-num">{{ data.current }}</span>
      <span class="gv-unit"> {{ data.unit }}</span>
    </div>
    <!-- 目标文字（底部） -->
    <p class="gauge-target">目标：{{ data.target }} {{ data.unit }}</p>
  </div>
</template>

<style scoped>
.gauge-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
}

/* 环形画布 — 占主要高度 */
.gauge-ring {
  width: 100%;
  flex: 1;
  min-height: 0;
}

/* 完成金额 — 环正下方 */
.gauge-value {
  text-align: center;
  line-height: 1.1;
  margin-top: -8px;
  flex-shrink: 0;
}
.gv-num {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--text-primary);
  text-shadow: 0 0 14px rgba(0,229,238,0.45);
}
.gv-unit {
  font-size: 12px;
  color: var(--text-secondary);
}

/* 目标文字 — 底部 */
.gauge-target {
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
  margin: 0;
  padding-bottom: 2px;
  flex-shrink: 0;
}
</style>
