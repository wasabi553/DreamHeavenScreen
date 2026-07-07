<script setup lang="ts">
/**
 * 数字滚动动画组件
 * 入场时数字从 0 滚动到目标值
 */
import { watch, onMounted } from 'vue'
import { useCountUp } from '../../composables/useCountUp'

const props = withDefaults(
  defineProps<{
    value: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    separator?: boolean
    autoplay?: boolean
  }>(),
  {
    duration: 1500,
    decimals: 0,
    prefix: '',
    suffix: '',
    separator: true,
    autoplay: true,
  },
)

const target = () => props.value
const { displayValue, start, snapToTarget } = useCountUp(target, {
  duration: props.duration,
  decimals: props.decimals,
  prefix: props.prefix,
  suffix: props.suffix,
  separator: props.separator,
})

onMounted(() => {
  if (props.autoplay) {
    start(0)
  }
})

// 值变化时重新动画
watch(
  () => props.value,
  (newVal, oldVal) => {
    if (oldVal !== undefined && newVal !== oldVal) {
      start(oldVal)
    }
  },
)
</script>

<template>
  <span class="count-up-number font-display">{{ displayValue }}</span>
</template>

<style scoped>
.count-up-number {
  font-family: var(--font-display);
  text-shadow: var(--glow-text);
}
</style>
