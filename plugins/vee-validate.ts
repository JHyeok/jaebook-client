import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ko from 'vee-validate/dist/locale/ko'

// 모든 규칙을 가지도록 설정
let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule], // eslint-disable-line
  })
}

// 언어 현지화
localize('ko', ko)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
