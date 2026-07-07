<script setup lang="ts">
/**
 * 航天深空背景 — 星点缓慢流动 + 细星轨弧线
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>()

interface Star { x: number; y: number; r: number; opacity: number; speed: number; phase: number }
interface OrbitLine { cx: number; cy: number; rx: number; ry: number; opacity: number; angle: number }

let stars: Star[] = []
let orbits: OrbitLine[] = []
let animationId = 0

function init(w: number, h: number) {
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    opacity: 0.2 + Math.random() * 0.5,
    speed: Math.random() * 0.15 + 0.04,
    phase: Math.random() * Math.PI * 2,
  }))
  orbits = [
    { cx: w * 0.15, cy: h * 0.25, rx: 180, ry: 90, opacity: 0.06, angle: 0 },
    { cx: w * 0.78, cy: h * 0.55, rx: 220, ry: 110, opacity: 0.05, angle: 0 },
    { cx: w * 0.45, cy: h * 0.78, rx: 200, ry: 80, opacity: 0.05, angle: 0 },
  ]
}

let time = 0
function draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h)
  time += 0.005
  for (const o of orbits) {
    ctx.save(); ctx.translate(o.cx, o.cy); ctx.rotate(time * 0.08 + o.angle)
    ctx.beginPath(); ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(0,229,238,${o.opacity})`; ctx.lineWidth = 0.5
    ctx.setLineDash([8, 30]); ctx.stroke(); ctx.setLineDash([]); ctx.restore()
  }
  for (const s of stars) {
    s.y -= s.speed
    const flicker = s.opacity * (0.7 + 0.3 * Math.sin(time * 3 + s.phase))
    if (s.y < -5) { s.y = h + 5; s.x = Math.random() * w }
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200,240,255,${flicker.toFixed(2)})`; ctx.fill()
  }
  animationId = requestAnimationFrame(() => draw(ctx, w, h))
}

function resize() {
  const c = canvasRef.value; if (!c) return
  const dpr = window.devicePixelRatio || 1
  const w = window.innerWidth, h = window.innerHeight
  c.width = w * dpr; c.height = h * dpr
  c.style.width = `${w}px`; c.style.height = `${h}px`
  const ctx = c.getContext('2d'); if (ctx) ctx.scale(dpr, dpr)
  init(w, h)
}

onMounted(() => {
  resize()
  const c = canvasRef.value; if (c) { const ctx = c.getContext('2d'); if (ctx) draw(ctx, window.innerWidth, window.innerHeight) }
  window.addEventListener('resize', resize)
})
onBeforeUnmount(() => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize) })
</script>
<template><canvas ref="canvasRef" class="starfield-canvas" /></template>
<style scoped>
.starfield-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 2; }
</style>
