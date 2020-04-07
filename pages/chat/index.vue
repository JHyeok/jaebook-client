<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-12">
        <div class="chat-wrapper">
          <p class="text-center">
            ✅ 당신의 익명 닉네임은 {{ name }} 입니다.
          </p>
          <div ref="chat" class="chat">
            <message
              v-for="(message, index) in messages"
              :key="`message-${index}`"
              :self="message.self"
              :name="message.name"
              :message="message.message"
            />
          </div>
          <div class="chat-form">
            <chat-form />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import cookie from 'js-cookie'
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
  private messages: any[] = []
  private name: string = ''

  mounted () {
    (this as any).$options.sockets.onopen = () => {
      try {
        this.name = cookie.get('nickName') || ''
        ;(this as any).$options.sockets.onmessage = (e) => {
          const data = JSON.parse(e.data)
          if (data.action === 'message') {
            this.messages = [
              ...this.messages,
              {
                self: this.name === data.author,
                name: data.author,
                message: data.body
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
                      message: data.body
                    }
                  }
                )
            ]
          }
        }
      } catch (error) {
        (this as any).$toast.error(error.message as string)
      }
    }
  }

  beforeDestroy () {
    (this as any).$disconnect()
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
