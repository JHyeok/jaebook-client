<template>
  <div class="container auth-container">
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
        <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(register)">
            <p class="h4 text-center mb-4">
              JaeBook
            </p>
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" rules="required|max:20" name="이름">
                <input id="name" v-model="name" type="text" placeholder="이름" class="form-control form-control-lg">
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" rules="required|email" name="이메일">
                <input id="email" v-model="email" type="email" placeholder="이메일" class="form-control form-control-lg">
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" rules="required|min:3" name="비밀번호">
                <input id="password" v-model="password" type="password" placeholder="비밀번호" class="form-control form-control-lg">
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <b-alert v-if="error" show variant="danger">
              {{ error + '' }}
            </b-alert>
            <div class="text-right mt-4">
              <button class="btn btn-success btn-lg" :disabled="(invalid || isSubmitted)" type="submit">
                회원가입
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class RegisterPage extends Vue {
  private isSubmitted: boolean = false
  private error: string = ''
  private name: string = ''
  private email: string = ''
  private password: string = ''

  private async register () {
    this.isSubmitted = true
    this.error = ''

    try {
      const params = {
        realName: this.name,
        email: this.email,
        password: this.password
      }

      const res = await (this as any).$axios.post('/auth/register', params)

      if (res.data.error) {
        throw new Error(res.data.message)
      }

      // 회원가입 후 로그인
      if (res.data.user) {
        return (this as any).$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .catch((error) => {
            this.error = (error.response.data.message as string)
          })
      }
    } catch (error) {
      if (error.response?.status === 400) {
        this.error = '올바른 요청이 아닙니다. 예측 가능한 원인: 이메일, 비밀번호'
      } else {
        this.error = (error.message as string)
      }
      this.isSubmitted = false
    }
  }
}
</script>
