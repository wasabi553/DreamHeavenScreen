<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
<template>
  <div class="capsule-panel">
    <span class="c-tl" /><span class="c-tr" /><span class="c-bl" /><span class="c-br" />
    <span class="scan" />
    <div v-if="title" class="capsule-title">{{ title }}</div>
    <div class="capsule-body"><slot /></div>
  </div>
</template>
<style scoped>
.capsule-panel {
  display: flex; flex-direction: column; min-height: 0; position: relative;
  background: linear-gradient(165deg, rgba(10,24,56,0.78), rgba(6,16,42,0.84));
  border: 1px solid rgba(0,229,238,0.25); border-radius: 8px; padding: 16px;
  box-shadow: 0 0 18px rgba(0,229,238,0.12), inset 0 1px 0 rgba(0,229,238,0.04);
  animation: capsuleBreathe 4s ease-in-out infinite; overflow: hidden;
}
.c-tl, .c-tr, .c-bl, .c-br { position: absolute; width: 14px; height: 14px; pointer-events: none; z-index: 2; }
.c-tl { top: -1px; left: -1px; border-top: 2px solid var(--accent-cyan); border-left: 2px solid var(--accent-cyan); }
.c-tr { top: -1px; right: -1px; border-top: 2px solid var(--accent-cyan); border-right: 2px solid var(--accent-cyan); }
.c-bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--accent-cyan); border-left: 2px solid var(--accent-cyan); }
.c-br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--accent-cyan); border-right: 2px solid var(--accent-cyan); }
.scan { position: absolute; top: 0; left: -100%; width: 200%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,229,238,0.4), transparent); animation: scanLine 5s linear infinite; pointer-events: none; z-index: 2; }
.capsule-title { color: var(--accent-cyan); font-size: 13px; font-weight: 700; margin-bottom: 14px; padding-left: 12px; position: relative; flex-shrink: 0; letter-spacing: 1.5px; }
.capsule-title::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 15px; background: var(--accent-cyan); border-radius: 2px; box-shadow: 0 0 10px var(--accent-cyan); }
.capsule-body { flex: 1; min-height: 0; overflow: hidden; }
</style>
