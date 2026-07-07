<script setup lang="ts">
import { computed } from 'vue'
import { useChartInit } from './useChartInit'
import { useTrendLineOption } from '../../composables/useCharts'
import type { TrendItem } from '../../adapters/types'

const props = defineProps<{ data: TrendItem[] }>()
const options = computed(() => useTrendLineOption(props.data))
useChartInit('chart-line-trend', options)
</script>

<template>
  <div id="chart-line-trend" class="chart-fill" />
</template>

<style scoped>
.chart-fill { width: 100%; height: 100%; }
</style>
