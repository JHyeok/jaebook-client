<template>
  <main class="container my-5">
    <div v-if="webSocketStatus" class="row">
      <div class="col-12">
        <div class="chat-wrapper">
          <p v-if="webSocketLoading" class="text-center">
            ⏳ 접속중입니다... ⏳
          </p>
          <p v-else class="text-center">
            ✅ 당신의 익명 닉네임은 {{ name }} 입니다.
          </p>
          <div ref="chat" class="chat">
            <message
              v-for="(message, index) in messages"
              :key="`message-${index}`"
              :self="message.self"
              :name="message.name"
              :message="message.message"
              :created-at="message.createdAt"
            />
          </div>
          <div class="chat-form">
            <chat-form :name="name" :ws="ws" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="col-12">
        <div class="chat-wrapper">
          <p class="text-center">
            🛑 오류가 발생하였습니다. 🛑
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import cookie from 'js-cookie'
import Sockette from 'sockette'
import Message from '~/components/chat/Message.vue'
import ChatForm from '~/components/chat/ChatForm.vue'

@Component({
  components: {
    Message,
    ChatForm
  },
  watch: {
    messages () {
      setTimeout(() => {
        if (this.$refs.chat) {
          (this as any).$refs.chat.scrollTop = (this as any).$refs.chat.scrollHeight
        }
      }, 0)
    }
  }
})
export default class ChatPage extends Vue {
  /* eslint-disable no-console */
  private ws: any = null
  private messages: any[] = []
  private name: string = ''
  private text: string = ''
  private webSocketLoading: boolean = true
  private webSocketStatus: boolean = true

  mounted () {
    const chatServerUrl = process.env.chatWebSocket || ''
    this.name = cookie.get('nickName') || ''

    this.ws = new Sockette(chatServerUrl, {
      timeout: 5e3,
      maxAttempts: 3,
      onopen: this.onConnect,
      onmessage: this.onMessageReceive,
      onclose: event => console.log(`❌ Socket Close: ${event}`),
      onerror: (error) => {
        this.webSocketStatus = false
        console.log(`🔥 Scoket Error: ${error}`)
      }
    })

    this.webSocketLoading = false
  }

  private onConnect () {
    const chatDisplayName = cookie.get('nickName')

    if (chatDisplayName) {
      this.name = chatDisplayName
    } else {
      this.name = this.createChatDisplayName(6)
      cookie.set('nickName', this.name)
    }

    (this as any).ws.json(
      {
        action: 'setName',
        nickName: this.name
      }
    )
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

  private onMessageReceive (e) {
    const data = JSON.parse(e.data)
    if (data.action === 'message') {
      this.messages = [
        ...this.messages,
        {
          self: this.name === data.author,
          name: data.author,
          message: data.body,
          createdAt: data.createdAt
        }
      ]
    } else if (data.action === 'messages') {
      this.messages = [
        ...this.messages,
        ...data.messages
          .sort((a: any, b: any) => a.createdAt - b.createdAt)
          .map((message: any) => JSON.parse(message.body))
          .map(
            (data: any) => {
              return {
                self: this.name === data.author,
                name: data.author,
                message: data.body,
                createdAt: data.createdAt
              }
            }
          )
      ]
    }
  }

  beforeDestroy () {
    this.ws.close()
  }
}
</script>

<style scoped>
.chat {
  height: 630px;
  overflow: auto;
  border: 1px solid #dad6d6;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
