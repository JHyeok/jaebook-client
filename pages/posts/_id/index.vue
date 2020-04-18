<template>
  <main id="scrollAnchor" class="container my-5">
    <div class="row">
      <div class="col-12">
        <h3 class="post-title">
          {{ post.title }}
        </h3>
        <div class="row">
          <div class="col-12">
            <nuxt-link :to="`/account/${post.user.id}`" class="text-dark">
              {{ post.user.realName }}({{ post.user.email }})
            </nuxt-link>
          </div>
        </div>
        <span class="date-text">{{ getDate(post.createdAt) }}</span>
      </div>
      <div class="col-md-12 mb-4">
        <div class="post-details">
          <div class="sub-info">
            <dl>
              <dd>
                <span class="num-text float-right">{{ post.view }} 읽음</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12 mb-4">
        <section class="post-body" v-text="post.content" />
      </div>
    </div>
    <div
      v-if="$auth.$state.loggedIn && $auth.$state.user.id === post.user.id"
      class="text-right"
    >
      <button class="btn btn-info" @click="editPost(post.id)">
        글 수정
      </button>
      <button class="btn btn-danger" @click="deletePost(post.id)">
        글 삭제
      </button>
    </div>
    <div class="d-flex justify-content-center my-4">
      <div class="like-wrap">
        <div>
          <input id="like-toggle" v-model="isPostLiked" type="checkbox" />
          <label
            for="like-toggle"
            class="like-toggle"
            @click="toggleLikePost(post.id)"
            >❤</label
          >
        </div>
        <div class="like-count">
          {{ post.like }}
        </div>
      </div>
    </div>
    <post-comment-write
      :post-id="post.id"
      @afterCreateComment="afterCreateComment"
    />
    <post-comment :comments="comments" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostComment from '~/components/post/PostComment.vue'
import PostCommentWrite from '~/components/post/PostCommentWrite.vue'
Component.registerHooks(['asyncData'])

@Component({
  components: {
    PostComment,
    PostCommentWrite,
  },
})
export default class PostDetailPage extends Vue {
  private post: any = []
  private comments: any = []
  private isPostLiked: boolean = false

  private async asyncData({ $auth, $axios, params }) {
    try {
      let isPostLiked: boolean = false
      const data = await $axios.$get(`/posts/${params.id}`)
      const commentData = await $axios.$get(`/posts/${params.id}/comments`)

      if ($auth.$state.loggedIn) {
        const postCommnetData = await $axios.$get(`/posts/${params.id}/like`)
        isPostLiked = postCommnetData.isPostLiked
      }

      return {
        post: data,
        comments: commentData,
        isPostLiked,
      }
    } catch (error) {
      return {
        post: [],
        comments: [],
        isPostLiked: false,
      }
    }
  }

  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  private editPost(postId: string) {
    this.$router.push(`/posts/${postId}/edit`)
  }

  private async deletePost(postId: string) {
    if (confirm('삭제 하시겠습니까?')) {
      try {
        const res = await (this as any).$axios.delete(`/posts/${postId}`)

        if (res.status === 200) {
          ;(this as any).$toast.success('글을 삭제하였습니다.')
          this.$router.push('/posts')
        }
      } catch (error) {
        ;(this as any).$toast.error(error.message as string)
      }
    }
  }

  private toggleLikePost(postId: string) {
    if ((this as any).$auth.$state.loggedIn === false) {
      ;(this as any).$toast.info('로그인이 필요합니다.')
      this.$router.push('/account/login')
      return
    }

    if (this.isPostLiked) {
      this.unlikePost(postId)
    } else {
      this.likePost(postId)
    }
  }

  private async likePost(postId: string) {
    try {
      const res = await (this as any).$axios.$post(`/posts/${postId}/like`)
      this.post.like = res.like as number
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
    }
  }

  private async unlikePost(postId: string) {
    try {
      const res = await (this as any).$axios.$delete(`/posts/${postId}/like`)
      this.post.like = res.like as number
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
    }
  }

  private async afterCreateComment(postId: string) {
    try {
      const commentData = await (this as any).$axios.$get(
        `/posts/${postId}/comments`
      )
      this.comments = commentData
      setTimeout(() => {
        const mainElement = document.getElementById('scrollAnchor')
        mainElement!.scrollIntoView(false)
      }, 0)
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
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
  min-height: 4rem;
  word-break: break-all;
  white-space: pre-wrap;
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
  font-size: 14px;
  color: #828282;
  letter-spacing: 0;
}

.like-wrap {
  width: 2.9rem;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  background: #f5f3f3;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-radius: 2rem;
  border-color: #eae8e8;
  padding: 0.2rem;
}

#like-toggle {
  position: absolute;
  left: -100vw;
}

#like-toggle:checked + label {
  color: #e2264d;
}

.like-toggle {
  margin: auto;
  align-self: center;
  color: #d0c8c8;
  font-size: 2em;
  cursor: pointer;
}

.like-count {
  color: #828282;
  line-height: 1;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  font-weight: bold;
}
</style>
