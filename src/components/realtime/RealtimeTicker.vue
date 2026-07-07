<script setup lang="ts">
import { computed } from 'vue'
import type { RealtimeItem } from '../../adapters/types'
const props = defineProps<{ items: RealtimeItem[] }>()
const icons: Record<string, string> = { order: '🛰️', alert: '⚠️', milestone: '🚀' }
// 时间正序（早→晚），渲染两份实现无缝循环
const list = computed(() => [...props.items].reverse().slice(0, 10))
</script>
<template>
  <div class="ds-wrap">
    <span class="ds-badge">◈ 深空数据流</span>
    <span class="ds-sep">│</span>
    <div class="ds-scroll">
      <div class="ds-track">
        <!-- 第一份 -->
        <template v-for="item in list" :key="'a' + item.id">
          <span class="ds-item"><span class="ds-icon">{{ icons[item.type] || '📡' }}</span><span class="ds-text">{{ item.content }}</span><span class="ds-time">{{ item.time }}</span></span>
          <span class="ds-dot">·</span>
        </template>
        <!-- 第二份（无缝衔接） -->
        <template v-for="item in list" :key="'b' + item.id">
          <span class="ds-item"><span class="ds-icon">{{ icons[item.type] || '📡' }}</span><span class="ds-text">{{ item.content }}</span><span class="ds-time">{{ item.time }}</span></span>
          <span class="ds-dot">·</span>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ds-wrap { width: 100%; height: 100%; display: flex; align-items: center; gap: 10px; }
.ds-badge { font-size: 11px; color: #ff8f3f; font-weight: 700; white-space: nowrap; letter-spacing: 1px; text-shadow: 0 0 6px rgba(255,143,63,0.4); flex-shrink: 0; }
.ds-sep { color: rgba(0,229,238,0.18); flex-shrink: 0; }
.ds-scroll { flex: 1; overflow: hidden; mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%); }
.ds-track { display: flex; animation: marqueeFlow 28s linear infinite; white-space: nowrap; align-items: center; width: max-content; }
.ds-item { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; flex-shrink: 0; }
.ds-icon { font-size: 13px; flex-shrink: 0; }
.ds-text { color: var(--text-primary); }
.ds-time { color: var(--text-muted); font-family: var(--font-display); font-size: 10px; }
.ds-dot { margin: 0 9px; color: rgba(0,229,238,0.08); flex-shrink: 0; }
</style>
