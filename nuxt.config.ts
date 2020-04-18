import { Configuration } from '@nuxt/types'

const envPath = `config/.env.${process.env.NODE_ENV || 'development'}`
require('dotenv').config({ path: envPath })

const config: Configuration = {
  mode: 'universal',
  /**
   * Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//fonts.googleapis.com/css?family=Noto+Sans+KR',
      },
    ],
  },
  /**
   * Customize the progress-bar color
   */
  loading: {
    color: '#03ff0b',
    height: '4px',
    failedColor: '#ff0342',
  },
  /**
   * Global CSS
   */
  css: ['~/assets/css/transitions.css', '~/assets/css/main.css'],
  /**
   * Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-infinite-loading.ts', mode: 'client' },
    { src: '~/plugins/vee-validate.ts', mode: 'client' },
  ],
  /**
   * Nuxt.js Dev-Modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
  /**
   * Nuxt.js Modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/moment',
  ],
  /**
   * Nuxt.js Auth
   */
  auth: {
    localStorage: false,
    strategies: {
      local: {
        _scheme: 'refresh',
        token: {
          property: 'accessToken',
          tokenRequired: true,
          tokenType: 'Bearer',
        },
        refreshToken: {
          property: 'refreshToken',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/token/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: false,
        },
      },
    },
    redirect: {
      login: '/account/login',
      logout: '/',
      home: '/',
    },
  },
  /**
   * Nuxt.js Axios
   */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000/api',
  },
  /**
   * Nuxt.js Environment Variable
   */
  env: {
    chatWebSocket: process.env.CHAT_SERVER_URL || 'http://localhost:4000',
  },
  /**
   * Nuxt.js Toast
   */
  toast: {
    position: 'bottom-right',
    duration: 3000,
  },
  /**
   * Build Configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module!.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}

export default config
