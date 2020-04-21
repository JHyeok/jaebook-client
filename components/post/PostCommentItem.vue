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
      <div v-if="comment.isReplies">
        <a
          href="javascript:;"
          @click="toggleViewReply(comment.postId, comment.id)"
          ><span v-if="isViewReply">숨기기</span
          ><span v-else>답글 보기</span></a
        >
        <div v-if="isViewReply" class="comment-replies-wrap">
          <template v-for="comment in commentReplies">
            <post-comment-reply
              :key="comment.id"
              :comment="comment"
              @afterDeleteCommentReply="afterDeleteCommentReply"
            />
          </template>
          <a href="javascript:;" @click="toggleWriteReply"
            ><span v-if="isWriteReply">취소</span
            ><span v-else>답글 달기</span></a
          >
          <div v-if="isWriteReply">
            <textarea id="commentReply" class="form-control mt-2" rows="3" />
            <div class="text-right mt-1">
              <button class="btn btn-info" @click="toggleWriteReply">
                취소
              </button>
              <button
                class="btn btn-info"
                @click="createCommentReply(comment.postId, comment.id)"
              >
                답글 작성
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <a href="javascript:;" @click="toggleWriteReply"
          ><span v-if="isWriteReply">취소</span><span v-else>답글 달기</span></a
        >
        <div v-if="isWriteReply">
          <textarea id="commentReply" class="form-control mt-2" rows="3" />
          <div class="text-right mt-1">
            <button class="btn btn-info" @click="toggleWriteReply">
              취소
            </button>
            <button
              class="btn btn-info"
              @click="createCommentReply(comment.postId, comment.id)"
            >
              답글 작성
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostCommentReply from './PostCommentReply.vue'
@Component({
  components: {
    PostCommentReply,
  },
  props: {
    comment: Object,
  },
})
export default class PostCommentItem extends Vue {
  private commentReplies: any = []
  private modified: boolean = false
  private isWriteReply: boolean = false
  private isViewReply: boolean = false
  private isFirstViewReply: boolean = true
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

  private toggleWriteReply() {
    if (this.isWriteReply) {
      if (confirm('답글 작성을 취소하시겠습니까?')) {
        this.isWriteReply = !this.isWriteReply
      }
    } else {
      this.isWriteReply = !this.isWriteReply
    }
  }

  private toggleViewReply(postId: string, commentId: string) {
    if (this.isFirstViewReply) {
      this.isFirstViewReply = false
      this.getCommentReplies(postId, commentId)
    }
    this.isViewReply = !this.isViewReply
  }

  private async getCommentReplies(postId: string, commentId: string) {
    try {
      const commentData = await (this as any).$axios.$get(
        `/posts/${postId}/comments/${commentId}/replies`
      )
      this.commentReplies = commentData
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
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

  private async createCommentReply(postId: string, commentId: string) {
    try {
      const commentReply = (document as any).getElementById('commentReply')
        .value
      if (commentReply.length === 0) {
        ;(this as any).$toast.error('답글 내용을 입력해주세요.')
        return
      }
      const res = await (this as any).$axios.post(
        `/posts/${postId}/comments/${commentId}/replies`,
        {
          text: commentReply,
        }
      )
      if (res.status === 201) {
        this.isWriteReply = false
        this.isViewReply = true
        this.getCommentReplies(postId, commentId)
        ;(this as any).$toast.success('답글을 작성하였습니다.')
        this.$emit('setCommentReplies', commentId)
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

  private afterDeleteCommentReply(commentId: string) {
    for (let i = 0; i < (this as any).commentReplies.length; i++) {
      if ((this as any).commentReplies[i].id === commentId) {
        ;(this as any).commentReplies.splice(i, 1)
        break
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
.comment-replies-wrap {
  margin-top: 1.3rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.016);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
}
</style>
