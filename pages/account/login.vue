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
        <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(login)">
            <p class="h4 text-center mb-4">
              JaeBook
            </p>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true, email: true, min: 6, max: 30 }"
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
            <b-alert v-if="$auth.$state.redirect" show>
              <strong>{{ $auth.$state.redirect }}</strong> 에 접속하기 전에
              로그인해야 합니다.
            </b-alert>
            <div class="text-right mt-4">
              <b-button
                type="submit"
                class="btn btn-success"
                :disabled="(invalid || isSubmitted)"
              >
                로그인
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

@Component({
  middleware: ['auth'],
})
export default class LoginPage extends Vue {
  private isSubmitted: boolean = false
  private error: string = ''
  private email: string = ''
  private password: string = ''

  private getValidationState({ dirty, validated, valid = null }): any {
    return dirty || validated ? valid : null
  }

  private redirect(): string {
    return (
      this.$route.query.redirect &&
      decodeURIComponent((this as any).$route.query.redirect)
    )
  }

  private login(): void {
    this.isSubmitted = true
    this.error = ''

    return (this as any).$auth
      .loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      })
      .catch((error) => {
        this.error = error.response.data.message as string
        this.isSubmitted = false
      })
  }
}
</script>
