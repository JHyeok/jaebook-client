import VueTestUtils from '@vue/test-utils'

// Mock Nuxt Components
(VueTestUtils as any).config.stubs['nuxt-link'] = '<a><slot /></a>';
(VueTestUtils as any).config.stubs['no-ssr'] = '<span><slot /></span>'
