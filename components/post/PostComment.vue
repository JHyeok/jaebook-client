<template>
  <div class="row bootstrap snippets">
    <div class="col-md-12 col-md-offset-2 col-sm-12">
      <div class="comment-wrapper">
        <div class="panel panel-info">
          <div class="panel-heading">댓글 {{ commentsCount }} 개</div>
          <div class="panel-body">
            <hr />
            <ul class="media-list">
              <template v-for="comment in comments">
                <post-comment-item
                  :key="comment.id"
                  :comment="comment"
                  @afterDeleteComment="afterDeleteComment"
                  @setCommentReplies="setCommentReplies"
                  @afterDeleteCommentReply="afterDeleteCommentReply"
                />
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostCommentItem from './PostCommentItem.vue'

@Component({
  components: {
    PostCommentItem,
  },
  props: {
    comments: Array,
    commentsCount: Number,
  },
})
export default class PostComment extends Vue {
  /**
   * 댓글이 삭제된 후 실행되는 메서드
   */
  private afterDeleteComment(commentId: string): void {
    for (let i = 0; i < (this as any).comments.length; i++) {
      if ((this as any).comments[i].id === commentId) {
        ;(this as any).comments[i].isDeleted = true
        ;(this as any).comments[i].text = '작성자에 의해 삭제된 댓글입니다.'
        let count = (this as any).commentsCount
        count--
        this.$emit('setCommentsCount', count)
        break
      }
    }
  }

  /**
   * 댓글의 답글이 작성된 후 실행되는 메서드
   */
  private setCommentReplies(commentId: string): void {
    for (let i = 0; i < (this as any).comments.length; i++) {
      if ((this as any).comments[i].id === commentId) {
        ;(this as any).comments[i].isReplies = true
        let count = (this as any).commentsCount
        count++
        this.$emit('setCommentsCount', count)
        break
      }
    }
  }

  /**
   * 댓글의 답글이 삭제된 후 실행되는 메서드
   */
  private afterDeleteCommentReply(): void {
    let count = (this as any).commentsCount
    count--
    this.$emit('setCommentsCount', count)
  }
}
</script>

<style scoped>
.comment-wrapper .media-list {
  margin-left: -40px;
}

.comment-wrapper .media-list .media img {
  width: 64px;
  height: 64px;
  border: 2px solid #e5e7e8;
}

.comment-wrapper .media-list .media {
  border-bottom: 1px dashed #efefef;
  margin-bottom: 25px;
}
</style>
