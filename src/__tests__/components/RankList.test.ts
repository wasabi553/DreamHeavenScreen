/**
 * RankList 组件测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RankList from '../../components/ranking/RankList.vue'

const mockRankData = [
  { rank: 1, name: '第一名店铺', value: 2856000, growth: 0.235 },
  { rank: 2, name: '第二名店铺', value: 2523400, growth: 0.187 },
  { rank: 3, name: '第三名店铺', value: 2187600, growth: 0.156 },
  { rank: 4, name: '第四名店铺', value: 1965200, growth: -0.042 },
  { rank: 5, name: '第五名店铺', value: 1758300, growth: 0.128 },
]

describe('RankList', () => {
  it('应该渲染所有项目', () => {
    const wrapper = mount(RankList, {
      props: { data: mockRankData },
    })
    const items = wrapper.findAll('.row')
    expect(items).toHaveLength(5)
  })

  it('第一名应有金牌样式', () => {
    const wrapper = mount(RankList, {
      props: { data: mockRankData },
    })
    expect(wrapper.find('.c1').exists()).toBe(true)
  })

  it('应该显示排名图标', () => {
    const wrapper = mount(RankList, {
      props: { data: mockRankData },
    })
    expect(wrapper.text()).toContain('🥇')
    expect(wrapper.text()).toContain('🥈')
    expect(wrapper.text()).toContain('🥉')
  })

  it('应限制最大显示数量', () => {
    const wrapper = mount(RankList, {
      props: { data: mockRankData, maxShow: 3 },
    })
    const items = wrapper.findAll('.row')
    expect(items).toHaveLength(3)
  })
})
