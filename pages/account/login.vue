<template>
  <div class="container auth-container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-center">
          로그인
        </h1>
        <div class="row social-area">
          <div class="col-xs-12 col-sm-12">
            <a href="javascript:;" class="btn btn-lg btn-block btn-github" data-toggle="tooltip" data-placement="top" title="GitHub">
              <i class="fa fa-github fa-2x" />
              <span class="hidden-xs" />
            </a>
          </div>
        </div>
        <div class="row login-or">
          <div class="col-xs-12 col-sm-12">
            <hr class="hr-or">
            <span class="span-or">or</span>
          </div>
        </div>
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
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" rules="required|email" name="이메일">
                <input id="email" v-model.trim="email" type="email" placeholder="이메일" class="form-control form-control-lg">
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" rules="required|min:3" name="비밀번호">
                <input id="password" v-model.trim="password" type="password" placeholder="비밀번호" class="form-control form-control-lg">
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <b-alert v-if="error" show variant="danger">
              {{ error + '' }}
            </b-alert>
            <b-alert v-if="$auth.$state.redirect" show>
              <strong>{{ $auth.$state.redirect }}</strong> 에 접속하기 전에 로그인해야 합니다.
            </b-alert>
            <div class="text-right mt-4">
              <button class="btn btn-success btn-lg" :disabled="(invalid || isSubmitted)" type="submit">
                로그인
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

@Component({
  middleware: ['auth']
})
export default class LoginPage extends Vue {
  private isSubmitted: boolean = false
  private error:string = ''
  private email:string = ''
  private password:string = ''

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
      .catch((error) => {
        if (error.response.status === 400) {
          this.error = '올바른 요청이 아닙니다. 예측 가능한 원인: 이메일, 비밀번호'
        } else {
          this.error = (error.response.data.message as string)
        }
        this.isSubmitted = false
      })
  }
}
</script>

<style scoped>
@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);
.social-area a {
  color: white;
  opacity:0.9;
  margin-top: 10px;
}
.social-area a:hover {
  color: white;
  opacity:1;
}

.btn-github {
  background: #666666; -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}

.btn-github:hover {
  background: #333333
}

.btn-github:focus {
  background: #fff;
  color: #666666;
  border-color: #666666
}

.login-or {
  position: relative;
  font-size: 1.5em;
  color: #aaa;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.hr-or {
  background-color: #cdcdcd;
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -0.6em;
  margin-left: -1.5em;
  background-color: white;
  width: 3em;
  text-align: center;
}
</style>
