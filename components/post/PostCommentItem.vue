<template>
  <li class="media">
    <div class="media-body">
      <strong class="text-success">{{ comment.user.realName }}({{ comment.user.email }})</strong>
      <span class="text-muted pull-right">
        <small class="text-muted">{{ getDate(comment.createdAt) }}</small>
      </span>
      <div class="comment-body" v-text="comment.text" />
    </div>
    <div v-if="$auth.$state.loggedIn && ($auth.$state.user.id === comment.user.id)" class="float-right">
      <span><a href="#">수정</a></span>
      <span><a href="#">삭제</a></span>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    comment: Object
  }
})
export default class PostCommentItem extends Vue {
  private getDate (datetime) {
    return new Date(datetime).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul'
    })
  }
}
</script>

<style scoped>
.comment-body {
  white-space:pre;
}
</style>
