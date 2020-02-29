<template>
  <div class="container auth-container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-center">
          로그인
        </h1>
        <b-alert v-if="error" show variant="danger">
          {{ error + '' }}
        </b-alert>
        <b-alert v-if="$auth.$state.redirect" show>
          <strong>{{ $auth.$state.redirect }}</strong> 에 접속하기 전에 로그인해야 합니다.
        </b-alert>
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
  </div>
</template>

<script>
export default {
  middleware: ['auth'],

  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  computed: {
    isLogin () {
      if (this.email.length > 0 && this.password.length > 0) {
        return true
      } else {
        return false
      }
    },
    redirect () {
      return (
        this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect)
      )
    }
  },

  methods: {
    login () {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch((error) => {
          this.error = error.message + ''
        })
    }
  }
}
</script>
