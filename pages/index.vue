<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{ projectName }}
      </h1>
      <h2 class="subtitle">
        My unreal Nuxt.js project
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