<template>
  <div>
    <header-nav />
    <nuxt />
    <footer-nav />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HeaderNav from '~/components/home/HeaderNav.vue'
import FooterNav from '~/components/home/FooterNav.vue'

@Component({
  components: {
    HeaderNav,
    FooterNav
  }
})
export default class DefaultLayout extends Vue {
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  position: relative;
  min-height: 100%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.auth-container {
  margin-top: 80px;
}

.index-container {
  margin-top: 10px;
}
</style>
