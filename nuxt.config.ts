export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/transitions.css',
    '~/assets/fonts/nanumsquareround.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-infinite-loading.ts', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'accessToken' },
          user: { url: '/users/me', method: 'get', propertyName: 'userInfo' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/account/login',
      logout: '/',
      // callback: '/callback',
      home: '/'
    }
  },
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000/api'
  },
  toast: {
    position: 'bottom-right',
    duration: 3000
  },
  /*
   ** Build configuration
   */
  build: {
  }
}
