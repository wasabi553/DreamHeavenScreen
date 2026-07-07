/* ============================================
 * 梦天数据大屏 — 实时时钟 Composable
 * 每秒更新当前时间
 * ============================================ */

import { ref, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'

export function useClock() {
  const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const currentDate = ref(dayjs().format('YYYY 年 MM 月 DD 日'))
  const currentWeekday = ref(dayjs().format('dddd'))

  let timer: ReturnType<typeof setInterval> | null = null

  function tick() {
    const now = dayjs()
    currentTime.value = now.format('YYYY-MM-DD HH:mm:ss')
    currentDate.value = now.format('YYYY 年 MM 月 DD 日')
    currentWeekday.value = now.format('dddd')
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })

  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  return {
    currentTime,
    currentDate,
    currentWeekday,
  }
}
