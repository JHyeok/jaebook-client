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
      <!-- 댓글이 수정 일 때는 텍스트 입력창이 보이고, 수정이 아닐 때는 작성한 댓글이 보인다 -->
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
            :disabled="isSubmittedToEdit"
            @click="editComment(comment.postId, comment.id)"
          >
            댓글 수정
          </button>
        </div>
      </div>
      <!-- 댓글 수정, 삭제 버튼은 로그인한 사용자가 댓글 작성자와 일치해야 한다 -->
      <div
        v-if="$auth.$state.loggedIn && $auth.$state.user.id === comment.user.id"
        class="float-right"
      >
        <div v-if="!modified && !comment.isDeleted">
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
export default class PostCommentReply extends Vue {
  private modified: boolean = false
  private isSubmittedToEdit: boolean = false

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
      this.isSubmittedToEdit = true

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
    } finally {
      this.isSubmittedToEdit = false
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
          this.$emit('afterDeleteCommentReply', commentId)
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
