/* ============================================
 * 梦天数据大屏 — 粒子背景逻辑
 * Canvas 2D 绘制浮动粒子 + 连接线
 * ============================================ */

import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export interface ParticleOptions {
  /** 粒子数量，默认 120 */
  count?: number
  /** 连接线最大距离，默认 150 */
  maxDistance?: number
  /** 粒子颜色，默认 #00f0ff */
  color?: string
  /** 最小透明度，默认 0.3 */
  minOpacity?: number
  /** 最大透明度，默认 0.6 */
  maxOpacity?: number
}

export function useParticles(canvasRef: () => HTMLCanvasElement | null, options: ParticleOptions = {}) {
  const {
    count = 120,
    maxDistance = 150,
    color = '#00f0ff',
    minOpacity = 0.3,
    maxOpacity = 0.6,
  } = options

  const isRunning = ref(false)
  let animationId: number | null = null
  let particles: Particle[] = []

  /** 解析颜色为 RGB */
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const h = hex.replace('#', '')
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    }
  }

  const rgb = hexToRgb(color)

  /** 初始化粒子 */
  function initParticles(width: number, height: number) {
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
    }))
  }

  /** 动画循环 */
  function animate() {
    const canvas = canvasRef()
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // 清除画布
    ctx.clearRect(0, 0, w, h)

    // 更新和绘制粒子
    for (const p of particles) {
      // 移动
      p.x += p.vx
      p.y += p.vy

      // 边缘反弹
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1

      // 绘制粒子
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`
      ctx.fill()
    }

    // 绘制连接线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.15
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  /** 设置 Canvas 尺寸并初始化 */
  function resize() {
    const canvas = canvasRef()
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    initParticles(window.innerWidth, window.innerHeight)
  }

  onMounted(() => {
    const canvas = canvasRef()
    if (!canvas) return

    resize()
    isRunning.value = true
    animationId = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    isRunning.value = false
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    window.removeEventListener('resize', resize)
  })

  return { isRunning }
}
