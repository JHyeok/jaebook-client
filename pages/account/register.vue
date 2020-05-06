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
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true, max: 10 }"
              name="이름"
            >
              <b-form-group label-for="name">
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="getValidationState(validationContext)"
                  placeholder="이름"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true, email: true }"
              name="이메일"
            >
              <b-form-group label-for="email">
                <b-form-input
                  id="email"
                  v-model="email"
                  :state="getValidationState(validationContext)"
                  placeholder="이메일"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true, min: 3 }"
              name="비밀번호"
            >
              <b-form-group label-for="password">
                <b-form-input
                  id="password"
                  v-model="password"
                  type="password"
                  :state="getValidationState(validationContext)"
                  placeholder="비밀번호"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <b-alert v-if="error" show variant="danger">
              {{ error + '' }}
            </b-alert>
            <div class="text-right mt-4">
              <b-button
                type="submit"
                class="btn btn-success"
                :disabled="(invalid || isSubmitted)"
              >
                회원가입
              </b-button>
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

  private getValidationState({ dirty, validated, valid = null }): any {
    return dirty || validated ? valid : null
  }

  private async register(): Promise<void> {
    this.isSubmitted = true
    this.error = ''

    try {
      const params = {
        realName: this.name,
        email: this.email,
        password: this.password,
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
              password: this.password,
            },
          })
          .catch((error) => {
            this.error = error.response.data.message as string
          })
      }
    } catch (error) {
      this.error = error.message as string
      this.isSubmitted = false
    }
  }
}
</script>
