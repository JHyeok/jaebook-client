<template>
  <div>
    <div v-if="self" class="msg">
      <p class="msg-body self-msg">
        {{ name }} : {{ message }}
      </p>
    </div>
    <div v-else class="msg">
      <p class="msg-body">
        {{ name }} : {{ message }}
      </p>
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
    message: String
  }
})
export default class Message extends Vue {
}
</script>

<style scoped>
.msg-body {
  word-break: break-all;
  margin-bottom: 0;
  background: #fbf9fa none repeat scroll 0 0;
  padding: 1px;
  font-weight: 300;
}

.self-msg {
  font-weight: 700;
}
</style>
