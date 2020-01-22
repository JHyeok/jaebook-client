<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
      <h1 class="text-center">
        로그인
      </h1>
      <p class="text-center">
        <nuxt-link :to="`/account/register`">
          계정이 필요하신가요?
        </nuxt-link>
      </p>
      <form @submit.prevent="login">
        <p class="h4 text-center mb-4">
          JaeBook
        </p>
        <div class="form-group">
          <input id="email" v-model.trim="email" type="email" placeholder="이메일" class="form-control form-control-lg">
        </div>
        <div class="form-group">
          <input id="password" v-model.trim="password" type="password" placeholder="비밀번호" class="form-control form-control-lg">
        </div>
        <div class="text-right mt-4">
          <button class="btn btn-success btn-lg" :disabled="!isLogin" type="submit">
            로그인
          </button>
        </div>
      </form>
    </div>
  </div>
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
