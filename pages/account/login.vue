<template>
  <div class="container auth-container">
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
          <b-alert v-if="error" show variant="danger">
            {{ error + '' }}
          </b-alert>
          <b-alert v-if="$auth.$state.redirect" show>
            <strong>{{ $auth.$state.redirect }}</strong> 에 접속하기 전에 로그인해야 합니다.
          </b-alert>
          <div class="text-right mt-4">
            <button class="btn btn-success btn-lg" :disabled="(!isLogin || isSubmitted)" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  middleware: ['auth']
})
export default class LoginPage extends Vue {
  private isSubmitted: boolean = false
  private error:string = ''
  private email:string = ''
  private password:string = ''

  private get isLogin (): boolean {
    if (this.email.length > 0 && this.password.length > 0) {
      return true
    } else {
      return false
    }
  }

  private redirect (): string {
    return (
      this.$route.query.redirect && decodeURIComponent((this as any).$route.query.redirect)
    )
  }

  private login (): void {
    this.isSubmitted = true
    this.error = ''

    return (this as any).$auth
      .loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.message)
        }
      })
      .catch((error) => {
        this.error = (error.message as string) + ''
        this.isSubmitted = false
      })
  }
}
</script>
