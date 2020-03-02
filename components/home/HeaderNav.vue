<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <nuxt-link :to="`/`" class="p-2 text-dark font-weight-normal">
        JAEBOOK
      </nuxt-link>
    </h5>
    <nav v-if="$auth.$state.loggedIn" class="my-2 my-md-0 mr-md-3">
      {{ $auth.$state.user.realName }} 님, 환영합니다!
      <a href="#" class="p-2 text-dark" @click="logout()">로그아웃</a>
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
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HeaderNav extends Vue {
  logout (): void {
    (this as any).$auth.logout().then(() => {
      (this as any).$toast.success('로그아웃 되었습니다.')
    })
  }
}
</script>
