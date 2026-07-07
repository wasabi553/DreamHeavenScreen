<script setup lang="ts">
/**
 * Top10 排行 — 行高统一 · 文字对齐 · 左右留边距
 */
import { computed } from 'vue'
import type { RankItem } from '../../adapters/types'
import TrendArrow from '../common/TrendArrow.vue'
import { formatCurrency } from '../../utils/format'

const props = withDefaults(defineProps<{ data: RankItem[]; maxShow?: number }>(), { maxShow: 10 })
const list = computed(() => props.data.slice(0, props.maxShow))

function icon(r: number) {
  if (r === 1) return '🥇'; if (r === 2) return '🥈'; if (r === 3) return '🥉'
  return `0${r}`.slice(-2)
}
function cls(r: number) {
  if (r === 1) return 'c1'; if (r === 2) return 'c2'; if (r === 3) return 'c3'; return ''
}
</script>

<template>
  <div class="rank-wrap">
    <div v-for="item in list" :key="item.rank" class="row" :class="cls(item.rank)">
      <span class="num" :class="cls(item.rank)">{{ icon(item.rank) }}</span>
      <span class="name">{{ item.name }}</span>
      <span class="val">{{ formatCurrency(item.value) }}</span>
      <span class="arrow"><TrendArrow :value="item.growth" /></span>
    </div>
  </div>
</template>

<style scoped>
.rank-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 2px;
}
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 3px;
  background: rgba(0,20,50,0.25);
  border: 1px solid transparent;
  flex-shrink: 0;
}
.row + .row { margin-top: 3px; }
.row.c1 { background: linear-gradient(90deg, rgba(255,215,0,0.12), rgba(0,20,50,0.25)); }
.row.c2 { background: linear-gradient(90deg, rgba(192,192,192,0.09), rgba(0,20,50,0.25)); }
.row.c3 { background: linear-gradient(90deg, rgba(205,127,50,0.08), rgba(0,20,50,0.25)); }

.num { width: 26px; text-align: center; font-size: 13px; font-weight: 700; color: var(--text-secondary); font-family: var(--font-display); flex-shrink: 0; }
.num.c1 { color: #ffd700; font-size: 15px; }
.num.c2 { color: #c0c0c0; font-size: 15px; }
.num.c3 { color: #cd7f32; font-size: 15px; }

.name { flex: 1; font-size: 13px; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.val { font-size: 12px; color: var(--text-secondary); font-family: var(--font-display); white-space: nowrap; min-width: 64px; text-align: right; }
.arrow { width: 56px; display: flex; justify-content: flex-end; flex-shrink: 0; }
</style>
