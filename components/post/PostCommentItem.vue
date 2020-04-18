<template>
  <li class="media">
    <div class="media-body mb-4">
      <strong>
        <nuxt-link :to="`/account/${comment.user.id}`" class="text-success">
          {{ comment.user.realName }}({{ comment.user.email }})
        </nuxt-link>
      </strong>
      <span class="text-muted pull-right">
        <small class="text-muted">{{ getDate(comment.createdAt) }}</small>
      </span>
      <div v-if="!modified" class="comment-body" v-text="comment.text" />
      <div v-if="modified">
        <textarea
          id="modifiedComment"
          class="form-control mt-2"
          :value="comment.text"
          rows="3"
        />
        <div class="text-right mt-1">
          <button class="btn btn-info" @click="toggleModified">
            취소
          </button>
          <button
            class="btn btn-info"
            @click="editComment(comment.postId, comment.id)"
          >
            댓글 수정
          </button>
        </div>
      </div>
      <div
        v-if="$auth.$state.loggedIn && $auth.$state.user.id === comment.user.id"
        class="float-right"
      >
        <div v-if="!modified">
          <span><a href="javascript:;" @click="toggleModified">수정</a></span>
          <span
            ><a
              href="javascript:;"
              @click="deleteComment(comment.postId, comment.id)"
              >삭제</a
            ></span
          >
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    comment: Object,
  },
})
export default class PostCommentItem extends Vue {
  private modified: boolean = false

  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  private toggleModified() {
    if (this.modified) {
      if (confirm('댓글 수정을 취소하시겠습니까?')) {
        this.modified = !this.modified
      }
    } else {
      this.modified = !this.modified
    }
  }

  private async editComment(postId: string, commentId: string) {
    try {
      const editedComment = (document as any).getElementById('modifiedComment')
        .value

      if (editedComment.length === 0) {
        ;(this as any).$toast.error('댓글 내용을 입력해주세요.')
        return
      }

      const res = await (this as any).$axios.put(
        `/posts/${postId}/comments/${commentId}`,
        {
          text: editedComment,
        }
      )

      if (res.status === 200) {
        ;(this as any).comment.text = editedComment
        this.modified = false
        ;(this as any).$toast.success('댓글을 수정하였습니다.')
      }
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
    }
  }

  private async deleteComment(postId: string, commentId: string) {
    if (confirm('삭제하시겠습니까?')) {
      try {
        const res = await (this as any).$axios.delete(
          `/posts/${postId}/comments/${commentId}`
        )

        if (res.status === 200) {
          ;(this as any).$toast.success('댓글을 삭제하였습니다.')
          this.$emit('afterDeleteComment', commentId)
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
