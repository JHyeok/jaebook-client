<template>
  <div class="message-wrap d-flex justify-content-between">
    <div v-if="self" class="message-body">
      💬 <span class="message-author">{{ name }}</span><span class="message-self">(나)</span> : {{ message }}
    </div>
    <div v-else class="message-body">
      💬 <span class="message-author">{{ name }}</span> : {{ message }}
    </div>
    <div class="message-sub-info">
      ⏰ {{ createdAt }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    self: Boolean,
    name: String,
    message: String,
    createdAt: String
  }
})
export default class Message extends Vue {
}
</script>

<style scoped>
.message-wrap {
  background: #fbf9fa none repeat scroll 0 0;
}

.message-wrap:nth-child(2n) {
  background: #f5f2f3
}

.message-body {
  font-size: 1.0rem;
  word-break: break-all;
  margin-bottom: 0;
  padding: 1px;
}

.message-author {
  color: #ab7a7a
}

.message-self {
  color: #ab7a7a;
  font-size: 0.5rem;
}

.message-sub-info {
  margin-right: 0.4rem;
  font-size: 12px;
  color: #A6A6A6
}
</style>
