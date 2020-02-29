<template>
  <div class="container auth-container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-center">
          회원가입
        </h1>
        <b-alert v-if="error" show variant="danger">
          {{ error + '' }}
        </b-alert>
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
  </div>
</template>

<script>
export default {
  auth: 'guest',

  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null
    }
  },

  computed: {
    isRegister () {
      if (this.name.length > 0 && this.email.length > 0 && this.password.length > 0) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    async register () {
      this.error = null
      try {
        const params = {
          realName: this.name,
          email: this.email,
          password: this.password
        }

        const res = await this.$axios.post('/auth/register', params)

        // 중복 이메일 체크
        if (res.data.code === 'ERR_REGISTER_DUPLICATE_EMAIL') {
          throw new Error(res.data.message)
        }

        // 회원가입 후 로그인
        if (res.data.userInfo) {
          return this.$auth
            .loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then(() => {
              this.$router.push('/')
            })
            .catch((error) => {
              this.error = error.message + ''
            })
        }
      } catch (error) {
        this.error = error.message + ''
      }
    }
  }
}
</script>
