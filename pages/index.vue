<template>
  <div class="container page-container">
    <div>
      <h2 class="subtitle">
        {{ projectName }}
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'

export default class IndexPage extends Vue {
  projectName: string = 'jaebook-client';
}
</script>
