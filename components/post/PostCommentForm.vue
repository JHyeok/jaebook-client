<template>
  <div class="row bootstrap snippets">
    <div class="col-md-12 col-md-offset-2 col-sm-12">
      <div class="comment-wrapper">
        <div class="panel panel-info">
          <div class="panel-body">
            <textarea v-model="text" class="form-control" placeholder="댓글을 작성하세요..." rows="3" />
            <button type="button" class="btn btn-info float-right my-2" @click="createComment(postId)">
              댓글 작성
            </button>
            <div class="clearfix" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    postId: String
  }
})
export default class PostCommentForm extends Vue {
  private text: string = ''

  async createComment (postId) {
    const params = {
      text: this.text
    }
    try {
      const res = await (this as any).$axios.$post(`/posts/${postId}/comments`, params)
      if (res !== null) {
        (this as any).$toast.success('댓글을 작성하였습니다.')
        this.$router.push('/posts')
      }
    } catch (error) {
      (this as any).$toast.error(error.message as string)
    }
  }
}
</script>

<style scoped>
.comment-wrapper .panel-body {
  max-height:650px;
  overflow:auto;
}

.comment-wrapper .media-list .media img {
  width:64px;
  height:64px;
  border:2px solid #e5e7e8;
}

.comment-wrapper .media-list .media {
  border-bottom:1px dashed #efefef;
  margin-bottom:25px;
}
</style>
