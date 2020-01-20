import { mount } from '@vue/test-utils'
import HeaderNav from '@/components/home/HeaderNav.vue'

describe('HeaderNav', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(HeaderNav)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
