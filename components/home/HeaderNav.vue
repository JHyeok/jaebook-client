<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <nuxt-link :to="`/`" class="p-2 text-dark font-weight-normal">
        JAEBOOK
      </nuxt-link>
    </h5>
    <nav v-if="isLogin()" class="my-2 my-md-0 mr-md-3">
      {{ showProfileName() }} 님, 환영합니다!
      <nuxt-link :to="`/account/logout`" class="p-2 text-dark">
        로그아웃
      </nuxt-link>
    </nav>
    <nav v-else class="my-2 my-md-0 mr-md-3">
      <nuxt-link :to="`/account/login`" class="p-2 text-dark">
        로그인
      </nuxt-link>
      <nuxt-link :to="`/account/register`" class="p-2 text-dark">
        회원가입
      </nuxt-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HeaderNavComponent extends Vue {
  private showProfileName (): string {
    return this.$store.getters['user/data'].realName || ''
  }

  private isLogin (): boolean {
    if (this.$store.getters['user/data']) {
      return true
    } else {
      return false
    }
  }
}
</script>
