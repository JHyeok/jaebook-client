<template>
  <form @submit.prevent="login">
    <p class="h4 text-center mb-4">
      JaeBook
    </p>
    <div class="form-group">
      <label for="email" class="grey-text">이메일</label>
      <input id="email" v-model.trim="email" type="email" placeholder="이메일" class="form-control">
    </div>
    <br>
    <div class="form-group">
      <label for="password" class="grey-text">비밀번호</label>
      <input id="password" v-model.trim="password" type="password" placeholder="비밀번호" class="form-control">
    </div>
    <div class="text-center mt-4">
      <button class="btn btn-success" :disabled="!isLogin" type="submit">
        로그인
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LoginComponent extends Vue {
  private email: string = ''
  private password: string = ''
  private result: string = ''

  get isLogin (): boolean {
    if (this.email.length > 0 && this.password.length > 0) {
      return true
    } else {
      return false
    }
  }

  private login (): void {
    // eslint-disable-next-line no-console
    console.log('login!')
    /*
    this.$store
      .dispatch('account/login', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('/')
      })
      .catch((ex) => {
        this.result = ex
      })
    */
  }
}
</script>
