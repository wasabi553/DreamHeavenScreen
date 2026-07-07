<script setup lang="ts">
import { computed } from 'vue'
import { useChartInit } from './useChartInit'
import { useRegionPieOption } from '../../composables/useCharts'
import type { RegionItem } from '../../adapters/types'

const props = defineProps<{ data: RegionItem[] }>()
const options = computed(() => useRegionPieOption(props.data))
useChartInit('chart-pie-region', options)
</script>

<template>
  <div id="chart-pie-region" class="chart-fill" />
</template>

<style scoped>
.chart-fill { width: 100%; height: 100%; }
</style>
