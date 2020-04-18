<template>
  <main class="container my-5">
    <div class="mt-4">
      <b-tabs content-class="mt-3" justified>
        <b-tab title="정보" active>
          <div class="row justify-content-center">
            <div class="col-4">
              <h5>
                이름
              </h5>
            </div>
            <div class="col-4">
              <div class="info-contents">
                {{ account.realName }}
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4">
              <h5>
                이메일
              </h5>
            </div>
            <div class="col-4">
              <div class="info-contents">
                {{ account.email }}
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4">
              <h5>
                가입일
              </h5>
            </div>
            <div class="col-4">
              <div class="info-contents">
                {{ getDate(account.createdAt) }}
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="작성 글">
          <p>글 {{ posts.length }} 개</p>
          <div class="row">
            <template v-for="post in posts">
              <post-card :key="post.id" :on-view="viewPost" :post="post" />
            </template>
          </div>
        </b-tab>
        <b-tab title="작성 댓글">
          <div>
            <post-comment :comments="comments" />
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostCard from '~/components/post/PostCard.vue'
import PostComment from '~/components/post/PostComment.vue'
Component.registerHooks(['asyncData'])

@Component({
  components: {
    PostCard,
    PostComment,
  },
})
export default class AccountInfoPage extends Vue {
  private account: any = []
  private posts: any = []
  private comments: any = []

  private async asyncData({ $axios, params, error }) {
    try {
      const account = await $axios.$get(`/users/${params.id}`)
      const posts = await $axios.$get(`/users/${params.id}/posts`)
      const comments = await $axios.$get(`/users/${params.id}/comments`)

      return {
        account,
        posts,
        comments,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }

  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  private viewPost(postId: string) {
    this.$router.push(`/posts/${postId}`)
  }
}
</script>

<style scoped>
.info-contents {
  font-size: 1rem;
  line-height: 1.5;
  color: #6f6e6e;
}
</style>
