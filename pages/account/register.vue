<template>
  <div class="container page-container">
    <div>
      <register />
    </div>
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
