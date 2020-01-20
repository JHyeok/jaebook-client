import { mount } from '@vue/test-utils'
import Register from '@/components/account/Register.vue'

describe('Register', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Register)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
