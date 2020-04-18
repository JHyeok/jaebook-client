<template>
  <div class="row bootstrap snippets">
    <div class="col-md-12 col-md-offset-2 col-sm-12">
      <div class="comment-wrapper">
        <div class="panel panel-info">
          <div class="panel-heading">댓글 {{ comments.length }} 개</div>
          <div class="panel-body">
            <hr />
            <ul class="media-list">
              <template v-for="comment in comments">
                <post-comment-item
                  :key="comment.id"
                  :comment="comment"
                  @afterDeleteComment="afterDeleteComment"
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
  },
})
export default class PostComment extends Vue {
  private afterDeleteComment(commentId: string) {
    for (let i = 0; i < (this as any).comments.length; i++) {
      if ((this as any).comments[i].id === commentId) {
        ;(this as any).comments.splice(i, 1)
        break
      }
    }
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
