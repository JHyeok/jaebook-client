<template>
  <form @submit.prevent="register">
    <p class="h4 text-center mb-4">
      JaeBook
    </p>
    <div class="form-group">
      <label for="name" class="grey-text">이름</label>
      <input id="name" v-model="name" type="text" class="form-control">
    </div>
    <br>
    <div class="form-group">
      <label for="email" class="grey-text">이메일</label>
      <input id="email" v-model="email" type="email" class="form-control">
    </div>
    <br>
    <div class="form-group">
      <label for="password" class="grey-text">비밀번호</label>
      <input id="password" v-model="password" type="password" class="form-control">
    </div>
    <div class="text-center mt-4">
      <button class="btn btn-success" :disabled="!isRegister" type="submit">
        회원가입
      </button>
    </div>
  </form>
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
