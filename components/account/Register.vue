<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
      <h1 class="text-center">
        회원가입
      </h1>
      <p class="text-center">
        <nuxt-link :to="`/account/login`">
          계정이 있으신가요?
        </nuxt-link>
      </p>
      <form @submit.prevent="register">
        <p class="h4 text-center mb-4">
          JaeBook
        </p>
        <div class="form-group">
          <input id="name" v-model="name" type="text" placeholder="이름" class="form-control form-control-lg">
        </div>
        <div class="form-group">
          <input id="email" v-model="email" type="email" placeholder="이메일" class="form-control form-control-lg">
        </div>
        <div class="form-group">
          <input id="password" v-model="password" type="password" placeholder="비밀번호" class="form-control form-control-lg">
        </div>
        <div class="text-right mt-4">
          <button class="btn btn-success btn-lg" :disabled="!isRegister" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class RegisterComponent extends Vue {
  private name: string = ''
  private email: string = ''
  private password: string = ''
  private result: string = ''

  get isRegister (): boolean {
    if (this.name.length > 0 && this.email.length > 0 && this.password.length > 0) {
      return true
    } else {
      return false
    }
  }

  private register (): void {
    // eslint-disable-next-line no-console
    console.log('register!')
  }
}
</script>
