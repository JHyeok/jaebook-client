<template>
  <div class="container auth-container">
    <register />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Register from '~/components/account/Register.vue'

@Component({
  components: {
    Register
  }
})
export default class RegisterPage extends Vue {
}
</script>
