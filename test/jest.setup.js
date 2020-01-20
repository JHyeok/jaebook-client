import VueTestUtils from '@vue/test-utils'

// Mock Nuxt Components
VueTestUtils.config.stubs['nuxt-link'] = '<a><slot /></a>'
VueTestUtils.config.stubs['no-ssr'] = '<span><slot /></span>'
