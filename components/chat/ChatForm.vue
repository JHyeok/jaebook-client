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
import cookie from 'js-cookie'

@Component
export default class ChatForm extends Vue {
  private text: string = ''
  private name: string = this.createChatDisplayName(6)

  mounted () {
    (this as any).$connect()
    ;(this as any).$options.sockets.onopen = () => {
      const nickName = cookie.get('nickName')

      if (nickName) {
        this.name = nickName
      } else {
        cookie.set('nickName', this.name)
      }

      (this as any).$socket.sendObj(
        {
          action: 'rename',
          nickName: this.name
        }
      )
    }
  }

  private sendMessage () {
    if (this.text.length) {
      (this as any).$socket.sendObj(
        {
          action: 'message',
          body: this.text,
          author: this.name
        }
      )
      this.text = ''
    }
  }

  private createChatDisplayName (length: number): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }
}
</script>
