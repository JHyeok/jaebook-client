<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-12">
        <div class="chat-wrapper">
          <p class="text-center">
            🔥현재 총 {{ chatCounter }} 명이 채팅중🔥
          </p>
          <div ref="chat" class="chat">
            <message
              v-for="(message, index) in messages"
              :key="`message-${index}`"
              :name="message.name"
              :text="message.message"
            />
          </div>
          <div class="chat__form">
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
  private chatCounter: Number = 0;

  mounted () {
    try {
      (this as any).$socket.$subscribe('chatPeople', (data) => {
        this.chatCounter = data
      })
      ;(this as any).$socket.$subscribe('message', (data) => {
        this.messages = [...this.messages, data]
      })
    } catch (error) {
      (this as any).$toast.error(error.message as string)
    }
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
