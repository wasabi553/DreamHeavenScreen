import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  shortcuts: {
    'panel-container': 'bg-[rgba(6,14,52,0.75)] border-1 border-[#00d4ff]/30 rounded-4px p-16px relative overflow-hidden',
    'panel-title': 'text-[#00f0ff] text-14px font-bold mb-12px pl-10px relative before:content-empty before:absolute before:left-0 before:top-50% before:-translate-y-50% before:w-3px before:h-14px before:bg-[#00f0ff] before:rounded-1px',
    'glow-border': 'shadow-[0_0_15px_rgba(0,212,255,0.15)]',
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
  },
  theme: {
    colors: {
      bg: {
        primary: '#0a0e27',
        panel: 'rgba(6, 14, 52, 0.75)',
      },
      border: {
        glow: '#00d4ff',
      },
      accent: {
        cyan: '#00f0ff',
        green: '#00ff88',
        red: '#ff4757',
        yellow: '#ffd93d',
      },
      text: {
        primary: '#e8f0ff',
        secondary: '#8892b0',
      },
    },
  },
})
