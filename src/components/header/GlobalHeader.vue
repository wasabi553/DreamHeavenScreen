<script setup lang="ts">
import { useClock } from '../../composables/useClock'
import { useDashboardStore } from '../../stores/dashboard'
import KPICard from '../kpi/KPICard.vue'

const { currentTime, currentDate, currentWeekday } = useClock()
const store = useDashboardStore()
</script>

<template>
  <div class="gh">
    <div class="gh-brand">
      <svg viewBox="0 0 48 48" width="38" height="38" class="gh-logo">
        <defs>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00e5ee"/><stop offset="100%" stop-color="#b388ff"/>
          </linearGradient>
        </defs>
        <polygon points="24,3 45,15 45,37 24,45 3,37 3,15" fill="none" stroke="url(#lg2)" stroke-width="1.4" stroke-linejoin="round"/>
        <polygon points="24,13 37,33 11,33" fill="none" stroke="#00e5ee" stroke-width="1" opacity="0.6"/>
        <circle cx="24" cy="26" r="2.5" fill="#00e5ee" opacity="0.9">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div>
        <h1 class="gh-title">梦天数据大屏</h1>
      </div>
    </div>

    <div class="gh-clock">
      <div class="gh-date">{{ currentDate }} {{ currentWeekday }}</div>
      <div class="gh-time font-display">{{ currentTime }}</div>
    </div>

    <div class="gh-kpis">
      <div class="gh-kpi-slot"><KPICard label="总销售额" :value="store.kpi.totalSales" :growth="store.kpi.salesGrowth" prefix="¥" /></div>
      <div class="gh-kpi-slot"><KPICard label="总订单量" :value="store.kpi.totalOrders" :growth="store.kpi.ordersGrowth" suffix=" 单" /></div>
      <div class="gh-kpi-slot"><KPICard label="活跃用户" :value="store.kpi.activeUsers" :growth="store.kpi.usersGrowth" suffix=" 人" /></div>
    </div>
  </div>
</template>

<style scoped>
.gh {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 70px;
  background: linear-gradient(180deg, rgba(6,18,46,0.97), rgba(6,14,42,0.88), rgba(5,11,32,0.82));
  border-bottom: 1px solid rgba(0,229,238,0.22);
  box-shadow: 0 4px 36px rgba(0,0,0,0.5); position: relative;
}
.gh::after {
  content: ''; position: absolute; bottom: -1px; left: 5%; width: 90%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,229,238,0.5), rgba(179,136,255,0.4), rgba(0,229,238,0.5), transparent);
}
.gh-brand { display: flex; align-items: center; gap: 12px; width: 290px; flex-shrink: 0; }
.gh-logo { filter: drop-shadow(0 0 10px rgba(0,229,238,0.55)); flex-shrink: 0; }
.gh-title { font-size: 20px; font-weight: 800; letter-spacing: 5px; margin: 0; line-height: 1.2; background: linear-gradient(180deg, #eaf6ff, #8ec8f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.gh-sub { font-size: 9px; color: var(--text-muted); letter-spacing: 2px; margin: 0; }
.gh-clock { text-align: center; padding: 5px 22px; background: rgba(0,22,56,0.5); border: 1px solid rgba(0,229,238,0.1); border-radius: 8px; }
.gh-date { font-size: 10px; color: var(--text-secondary); margin-bottom: 2px; }
.gh-time { font-size: 22px; color: var(--accent-cyan); letter-spacing: 3px; text-shadow: 0 0 16px rgba(0,229,238,0.5); line-height: 1; }
.gh-kpis { display: flex; gap: 10px; flex: 1; justify-content: flex-end; }
.gh-kpi-slot { flex: 1 1 0; max-width: 195px; }
</style>
