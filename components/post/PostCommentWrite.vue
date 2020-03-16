<template>
  <div class="row bootstrap snippets">
    <div class="col-md-12 col-md-offset-2 col-sm-12">
      <div class="comment-wrapper">
        <div class="panel panel-info">
          <div class="panel-body">
            <textarea v-model="text" class="form-control" placeholder="댓글을 작성하세요..." rows="3" />
            <button type="button" class="btn btn-info float-right my-2" :disabled="isSubmitted" @click="createComment(postId)">
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
export default class PostCommentWrite extends Vue {
  private isSubmitted: boolean = false
  private text: string = ''

  private async createComment (postId) {
    if ((this as any).$auth.$state.loggedIn === false) {
      (this as any).$toast.info('로그인이 필요합니다.')
      this.$router.push('/account/login')
      return
    }

    this.isSubmitted = true

    const params = {
      text: this.text
    }

    try {
      const res = await (this as any).$axios.$post(`/posts/${postId}/comments`, params)
      if (res.status === 201) {
        (this as any).$toast.success('댓글을 작성하였습니다.')
        this.$router.push('/posts')
      }
    } catch (error) {
      (this as any).$toast.error(error.message as string)
      this.isSubmitted = false
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
