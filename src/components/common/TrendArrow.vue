<script setup lang="ts">
/**
 * 涨跌箭头组件
 * 正值显示绿色向上箭头，负值显示红色向下箭头
 */
import { computed } from 'vue'

const props = defineProps<{
  value: number
  showPercent?: boolean
}>()

const isUp = computed(() => props.value >= 0)
const icon = computed(() => (isUp.value ? '↑' : '↓'))
const absValue = computed(() => {
  const pct = Math.abs(props.value * 100)
  return pct.toFixed(1) + '%'
})
</script>

<template>
  <span class="trend-arrow" :class="isUp ? 'trend-up' : 'trend-down'">
    {{ icon }}
    <span v-if="showPercent !== false">{{ absValue }}</span>
  </span>
</template>

<style scoped>
.trend-arrow {
  font-size: var(--fs-xs);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
</style>
