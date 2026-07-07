<script setup lang="ts">
import CountUpNumber from '../common/CountUpNumber.vue'
import TrendArrow from '../common/TrendArrow.vue'
defineProps<{ label: string; today: number; yesterday: number; growth: number; prefix?: string; suffix?: string }>()
</script>

<template>
  <div class="cc">
    <div class="cc-head"><span class="cc-label">{{ label }}</span><TrendArrow :value="growth" /></div>
    <div class="cc-val"><CountUpNumber :value="today" :prefix="prefix ?? ''" :suffix="suffix ?? ''" :decimals="0" :duration="1400" /></div>
    <div class="cc-yest">昨日 {{ prefix }}{{ yesterday.toLocaleString() }}{{ suffix }}</div>
    <div class="cc-bar"><div class="cc-bar-f" :class="growth >= 0 ? 'up' : 'down'" :style="{ width: Math.min(Math.abs(growth) * 200, 100) + '%' }" /></div>
  </div>
</template>

<style scoped>
.cc {
  display: flex; flex-direction: column; padding: 13px 14px;
  background: linear-gradient(140deg, rgba(14,28,62,0.72), rgba(8,18,44,0.55));
  border: 1px solid rgba(0,229,238,0.16); border-radius: 6px; height: 100%; justify-content: center;
}
.cc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
.cc-label { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
.cc-val { font-size: 22px; font-weight: 700; font-family: var(--font-display); color: var(--text-primary); text-shadow: 0 0 12px rgba(0,229,238,0.3); margin-bottom: 2px; line-height: 1.2; text-align: center; }
.cc-yest { font-size: 10px; color: var(--text-muted); margin-bottom: 8px; text-align: center; }
.cc-bar { height: 3px; background: rgba(0,229,238,0.08); border-radius: 2px; overflow: hidden; }
.cc-bar-f { height: 100%; border-radius: 2px; transition: width 1s ease; }
.up { background: var(--accent-green); box-shadow: 0 0 10px rgba(0,230,118,0.45); }
.down { background: var(--accent-red); box-shadow: 0 0 10px rgba(255,68,88,0.45); }
</style>
