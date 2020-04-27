<template>
  <footer>
    <div class="container">
      <nuxt-link :to="`/`">
        JaeBook
      </nuxt-link>
      <span>
        사이드 프로젝트입니다.
        <a
          rel="noopener noreferrer"
          target="blank"
          href="https://github.com/JHyeok"
          >Github</a
        >에서
        <a
          rel="noopener noreferrer"
          target="blank"
          href="https://github.com/JHyeok/jaebook-server"
          >백엔드</a
        >,
        <a
          rel="noopener noreferrer"
          target="blank"
          href="https://github.com/JHyeok/serverless-jaebook-chat"
          >서버리스 채팅</a
        >,
        <a
          rel="noopener noreferrer"
          target="blank"
          href="https://github.com/JHyeok/jaebook-client"
          >프론트엔드</a
        >
        소스를 확인하실 수 있습니다.
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class FooterNavComponent extends Vue {}
</script>

<style scoped>
footer {
  background: #f3f3f3;
  margin-top: 3rem;
  padding: 1rem 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
}
</style>
