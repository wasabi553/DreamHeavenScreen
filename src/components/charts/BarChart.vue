<script setup lang="ts">
import { computed } from 'vue'
import { useChartInit } from './useChartInit'
import { useCategoryBarOption } from '../../composables/useCharts'
import type { CategoryItem } from '../../adapters/types'

const props = defineProps<{ data: CategoryItem[] }>()
const options = computed(() => useCategoryBarOption(props.data))
useChartInit('chart-bar-category', options)
</script>

<template>
  <div id="chart-bar-category" class="chart-fill" />
</template>

<style scoped>
.chart-fill { width: 100%; height: 100%; }
</style>
