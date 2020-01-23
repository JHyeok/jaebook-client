<template>
  <div class="container auth-container">
    <login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Login from '~/components/account/Login.vue'

@Component({
  components: {
    Login
  }
})
export default class LoginPage extends Vue {
}
</script>
