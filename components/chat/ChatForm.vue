<template>
  <div class="msg-bottom">
    <form class="message-form" @submit.prevent="sendMessage">
      <div class="input-group">
        <input v-model="text" type="text" class="form-control message-input" placeholder="메세지 보내기..." required>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ChatForm extends Vue {
  private text: string = ''

  mounted () {
    (this as any).$socket.client.emit('join')
  }

  private sendMessage () {
    if (this.text.length) {
      (this as any).$socket.client.emit(
        'send message',
        {
          message: this.text
        }
      )
      this.text = ''
    }
  }
}
</script>
