<script setup lang="ts">
import CountUpNumber from '../common/CountUpNumber.vue'
import TrendArrow from '../common/TrendArrow.vue'
defineProps<{ label: string; value: number; growth: number; prefix?: string; suffix?: string; decimals?: number }>()
</script>
<template>
  <div class="kc">
    <div class="kc-label">{{ label }}</div>
    <div class="kc-val"><CountUpNumber :value="value" :prefix="prefix" :suffix="suffix" :decimals="decimals ?? 0" :duration="1200" /></div>
    <div class="kc-foot"><TrendArrow :value="growth" /><span class="kc-foot-t"> 较昨日</span></div>
  </div>
</template>
<style scoped>
.kc { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8px 10px; background: linear-gradient(180deg, rgba(12,26,58,0.65), rgba(6,14,40,0.5)); border: 1px solid rgba(0,229,238,0.18); border-radius: 6px; position: relative; overflow: hidden; }
.kc::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,229,238,0.55), transparent); }
.kc-label { font-size: 11px; color: var(--text-secondary); margin-bottom: 4px; letter-spacing: 1px; }
.kc-val { font-size: 20px; font-weight: 700; font-family: var(--font-display); color: var(--text-primary); text-shadow: 0 0 14px rgba(0,229,238,0.4); margin-bottom: 4px; line-height: 1.2; }
.kc-foot { display: flex; align-items: center; gap: 3px; }
.kc-foot-t { font-size: 10px; color: var(--text-muted); }
</style>
