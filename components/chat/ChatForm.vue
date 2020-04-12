<template>
  <div class="msg-bottom">
    <form class="message-form" @submit.prevent="sendMessage(name)">
      <div class="input-group">
        <input v-model="text" type="text" class="form-control message-input" placeholder="메세지 보내기..." required>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: String,
    ws: Object
  }
})
export default class ChatForm extends Vue {
  private text: string = ''

  private sendMessage (name: string) {
    if (this.text.length) {
      (this as any).ws.json(
        {
          action: 'message',
          body: this.text,
          author: name,
          createdAt: (this as any).$moment().format('HH:mm')
        }
      )
      this.text = ''
    }
  }
}
</script>
