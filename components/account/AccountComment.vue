<template>
  <li class="media">
    <div class="media-body mb-4">
      <strong>
        <nuxt-link :to="`/account/${user.id}`" class="text-success">
          {{ user.realName }}({{ user.email }})
        </nuxt-link>
      </strong>
      <span class="text-muted pull-right">
        <small class="text-muted">{{ getDate(comment.createdAt) }}</small>
      </span>
      <div class="comment-body" v-text="comment.text" />
      <div
        v-if="$auth.$state.loggedIn && $auth.$state.user.id === user.id"
        class="float-right"
      >
        <div>
          <span
            ><a
              href="javascript:;"
              @click="deleteComment(comment.postId, comment.id)"
              >삭제</a
            ></span
          >
        </div>
      </div>
      <div>
        <span>
          <nuxt-link :to="`/posts/${comment.postId}`">
            댓글로 이동
          </nuxt-link>
        </span>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props: {
    user: Object,
    comment: Object,
  },
})
export default class AccountComment extends Vue {
  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  private async deleteComment(postId: string, commentId: string) {
    if (confirm('삭제하시겠습니까?')) {
      try {
        const res = await (this as any).$axios.delete(
          `/posts/${postId}/comments/${commentId}`
        )
        if (res.status === 200) {
          ;(this as any).$toast.success('댓글을 삭제하였습니다.')
          this.$emit('afterDeleteComment')
        }
      } catch (error) {
        ;(this as any).$toast.error(error.message as string)
      }
    }
  }
}
</script>

<style scoped>
.comment-body {
  word-break: break-all;
  white-space: pre-wrap;
  min-height: 60px;
}
</style>
