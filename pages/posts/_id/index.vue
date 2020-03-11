<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-12">
        <h3 class="post-title">
          {{ post.title }}
        </h3>
        <span class="date-text">{{ getDate(post.createdAt) }}</span>
      </div>
      <div class="col-md-12 mb-4">
        <div class="post-details">
          <div class="sub-info">
            <dl>
              <dd>
                <span class="num-text float-left">{{ post.like }} 명이 좋아요를 눌렀습니다.</span>
                <span class="num-text float-right">{{ post.view }} 읽음</span>
              </dd>
            </dl>
          </div>
          <section class="post-body" v-text="post.content" />
        </div>
      </div>
    </div>
    <div v-if="$auth.$state.loggedIn && ($auth.$state.user.id === post.user.id)">
      <button class="btn btn-info" @click="editPost(post.id)">
        Edit Post
      </button>
      <button class="btn btn-info" @click="deletePost(post.id)">
        Delete Post
      </button>
    </div>
    <div v-if="$auth.$state.loggedIn" class="my-3">
      <button v-if="isPostLiked" class="btn btn-primary" @click="unlikePost(post.id)">
        UnLike!
      </button>
      <button v-else class="btn btn-primary" @click="likePost(post.id)">
        Like!
      </button>
    </div>
    <post-comment-form :post-id="post.id" />
    <post-comment :comments="comments" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostComment from '~/components/post/PostComment.vue'
import PostCommentForm from '~/components/post/PostCommentForm.vue'
Component.registerHooks(['asyncData'])

@Component({
  components: {
    PostComment,
    PostCommentForm
  }
})
export default class PostDetailPage extends Vue {
  private post: any = []
  private comments: any = []
  private isPostLiked: boolean = false;

  async asyncData ({ $auth, $axios, params }) {
    try {
      let isPostLiked: boolean = false
      const data = await $axios.$get(`/posts/${params.id}`)
      const commentData = await $axios.$get(`/posts/${params.id}/comments`)

      if ($auth.$state.loggedIn) {
        isPostLiked = await $axios.$get(`/posts/${params.id}/like`).isPostLiked
      }

      return {
        post: data,
        comments: commentData,
        isPostLiked
      }
    } catch (error) {
      return {
        post: [],
        comments: [],
        isPostLiked: false
      }
    }
  }

  getDate (datetime) {
    return new Date(datetime).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul'
    })
  }

  editPost (postId): void {
    this.$router.push(`/posts/${postId}/edit`)
  }

  async deletePost (postId) {
    try {
      const res = await (this as any).$axios.$delete(`/posts/${postId}`)

      if (res.postId === postId && res.isDelete) {
        (this as any).$toast.success('포스트를 삭제하였습니다.')
        this.$router.push('/posts')
      } else {
        (this as any).$toast.error('잘못된 접근입니다.')
      }
    } catch (error) {
      (this as any).$toast.error(error.message as string)
    }
  }

  async likePost (postId) {
    try {
      const res = await (this as any).$axios.$post(`/posts/${postId}/like`)
      this.post.like = res.like as number
      this.isPostLiked = true;
      (this as any).$toast.success('좋아요를 하였습니다.')
    } catch (error) {
      (this as any).$toast.error(error.message as string)
    }
  }

  async unlikePost (postId) {
    try {
      const res = await (this as any).$axios.$delete(`/posts/${postId}/like`)
      this.post.like = res.like as number
      this.isPostLiked = false;
      (this as any).$toast.success('좋아요를 취소하였습니다.')
    } catch (error) {
      (this as any).$toast.error(error.message as string)
    }
  }
}
</script>

<style scoped>
.post-title {
  margin-top: 15px;
  font-size: 42px;
  font-weight: 300;
  letter-spacing: -0.025em;
  line-height: 54px;
  color: #222;
  word-break: keep-all;
  word-wrap: break-word;
}

.post-body {
  white-space:pre;
}

.sub-info {
  overflow: hidden;
  margin-top: 15px;
  margin-bottom: 15px;
}

.num-text {
  font-size: 15px;
  color: #828282;
}

.date-text {
  position: relative;
  float: left;
  margin-left: 5px;
  padding-left: 7px;
  font-size: 14px;
  color: #828282;
  letter-spacing: 0;
}
</style>
