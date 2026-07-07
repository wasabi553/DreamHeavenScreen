/**
 * KPICard 组件测试
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import KPICard from '../../components/kpi/KPICard.vue'

describe('KPICard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('应该渲染标签', () => {
    const wrapper = mount(KPICard, {
      props: {
        label: '总销售额',
        value: 1000000,
        growth: 0.15,
        prefix: '¥',
      },
    })
    expect(wrapper.text()).toContain('总销售额')
  })

  it('应该渲染涨跌箭头', () => {
    const wrapper = mount(KPICard, {
      props: {
        label: '测试',
        value: 100,
        growth: -0.1,
      },
    })
    expect(wrapper.find('.trend-down').exists()).toBe(true)
  })

  it('应该包含 CountUpNumber 组件', () => {
    const wrapper = mount(KPICard, {
      props: {
        label: '测试',
        value: 5000,
        growth: 0.05,
      },
    })
    expect(wrapper.find('.kc-val').exists()).toBe(true)
  })
})
