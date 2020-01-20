import { mount } from '@vue/test-utils'
import Login from '@/components/account/Login.vue'

describe('Login', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Login)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
