<script setup lang="ts">
/**
 * 梦天数据大屏 — 主布局
 * 三栏稳定布局 | 模块均分高度 | 统一间距
 */
import { onMounted } from 'vue'
import { useDashboard } from '../../composables/useDashboard'
import { useDataRefresh } from '../../composables/useDataRefresh'
import { errorHandler } from '../../utils/error-handler'

import GlobalHeader from '../header/GlobalHeader.vue'
import PanelContainer from './PanelContainer.vue'
import ParticleBackground from '../particles/ParticleBackground.vue'
import KPIGauge from '../kpi/KPIGauge.vue'
import BarChart from '../charts/BarChart.vue'
import LineChart from '../charts/LineChart.vue'
import PieChart from '../charts/PieChart.vue'
import MapChart from '../charts/MapChart.vue'
import RankList from '../ranking/RankList.vue'
import RealtimeTicker from '../realtime/RealtimeTicker.vue'

const { store } = useDashboard()
useDataRefresh(5000)

onMounted(() => errorHandler.init())
</script>

<template>
  <div class="dashboard">
    <div class="grid-bg" />
    <ParticleBackground />

    <header class="dash-header">
      <GlobalHeader />
    </header>

    <div class="dash-body">
      <!-- ====== 左列 ====== -->
      <section class="dash-col">
        <PanelContainer title="品类销售 TOP 5" class="flex-1">
          <BarChart :data="store.categories" />
        </PanelContainer>

        <PanelContainer title="地区销售分布" class="flex-1">
          <PieChart :data="store.regions" />
        </PanelContainer>
      </section>

      <!-- ====== 中列 ====== -->
      <section class="dash-col">
        <PanelContainer title="近 30 天销售趋势" class="flex-4">
          <LineChart :data="store.trends" />
        </PanelContainer>
        <PanelContainer title="全国销售热力分布" class="flex-5">
          <MapChart :data="store.regions" />
        </PanelContainer>
      </section>

      <!-- ====== 右列 ====== -->
      <section class="dash-col">
        <!-- 排行：占比 3 -->
        <PanelContainer title="店铺销售排行 TOP 10" class="flex-3">
          <RankList :data="store.rankings" />
        </PanelContainer>

        <!-- 仪表盘双栏：占比 3 -->
        <div class="right-gauge-row">
          <PanelContainer
            v-for="g in store.gauges"
            :key="g.label"
            :title="g.label"
          >
            <KPIGauge :data="g" :color="g.label.includes('月') ? '#00f0ff' : '#a78bfa'" />
          </PanelContainer>
        </div>
      </section>
    </div>

    <!-- 底部实时动态：加高 -->
    <footer class="dash-footer">
      <RealtimeTicker :items="store.realtime" />
    </footer>
  </div>
</template>

<style scoped>
/* ======================================== */
/* 容器                                    */
/* ======================================== */
.dashboard {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.dash-header { flex-shrink: 0; z-index: 20; }

/* ======================================== */
/* 三栏 Grid：左 320 / 中 1fr / 右 340     */
/* ======================================== */
.dash-body {
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr 340px;
  gap: 16px;
  padding: 16px 20px;
  min-height: 0;
}

.dash-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

/* ======================================== */
/* 右列：Gauge 双栏                          */
/* ======================================== */
.right-gauge-row {
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  min-height: 0;
}

/* ======================================== */
/* 通用 flex 比例：均分高度                   */
/* ======================================== */
.flex-1 { flex: 1; min-height: 0; }
.flex-2 { flex: 2; min-height: 0; }
.flex-3 { flex: 3; min-height: 0; }
.flex-4 { flex: 4; min-height: 0; }
.flex-5 { flex: 5; min-height: 0; }

/* ======================================== */
/* 底部 — 加高，防止遮挡饼图                   */
/* ======================================== */
.dash-footer {
  flex-shrink: 0;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: rgba(6, 14, 52, 0.9);
  border-top: 1px solid rgba(0, 212, 255, 0.18);
  backdrop-filter: blur(6px);
  z-index: 10;
}

/* ======================================== */
/* 响应式                                  */
/* ======================================== */
@media (max-height: 800px) {
  .dash-body { grid-template-columns: 280px 1fr 300px; gap: 12px; padding: 10px 14px; }
  .dash-col { gap: 10px; }
  .dash-footer { height: 30px; }
}
@media (max-width: 1400px) {
  .dash-body { grid-template-columns: 280px 1fr 300px; gap: 12px; padding: 10px 14px; }
  .dash-col { gap: 10px; }
}
</style>
