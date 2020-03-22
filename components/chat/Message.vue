<template>
  <div>
    <div class="msg">
      <p class="msg-body">
        {{ name }} : {{ text }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: String,
    text: String
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
</style>
