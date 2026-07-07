<script setup lang="ts">
import { computed } from 'vue'
import { useChartInit } from './useChartInit'
import { useMapScatterOption } from '../../composables/useCharts'
import type { RegionItem } from '../../adapters/types'

const props = defineProps<{ data: RegionItem[] }>()
const options = computed(() => useMapScatterOption(props.data))
useChartInit('chart-map-scatter', options)
</script>

<template>
  <div id="chart-map-scatter" class="chart-fill" />
</template>

<style scoped>
.chart-fill { width: 100%; height: 100%; }
</style>
