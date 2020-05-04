<template>
  <div class="container index-container">
    <div class="row">
      <div class="col-12 col-xs-12 text-center mb-4">
        <a
          href="https://github.com/JHyeok/jaebook-server"
          target="_blank"
          class="button--grey mb-1"
          >Backend Github</a
        >
        <a
          href="https://github.com/JHyeok/serverless-jaebook-chat"
          target="_blank"
          class="button--grey mb-1"
          >Serverless Chat Github</a
        >
        <a
          href="https://github.com/JHyeok/jaebook-client"
          target="_blank"
          class="button--grey mb-1"
          >FrontEnd GitHub</a
        >
      </div>
      <div class="col-12 col-xs-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>🔥 주간 인기 글</h3>
        </div>
      </div>
      <template v-for="post in posts">
        <post-card :key="post.id" :on-view="viewPost" :post="post" />
      </template>
      <div class="col-12 col-xs-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>🆕 새로운 글</h3>
        </div>
      </div>
      <template v-for="post in newPosts">
        <post-card :key="post.id" :on-view="viewPost" :post="post" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PostCard from '~/components/post/PostCard.vue'
Component.registerHooks(['asyncData'])

@Component({
  components: {
    PostCard,
  },
})
export default class HomePage extends Vue {
  private posts: any = []
  private newPosts: any = []

  private async asyncData({ $axios }) {
    try {
      const posts = await $axios.$get('/posts?offset=0&limit=4&sort=best')
      const newPosts = await $axios.$get('/posts?offset=0&limit=4')

      return {
        posts,
        newPosts,
      }
    } catch (error) {
      return {
        posts: [],
        newPosts: [],
      }
    }
  }

  private viewPost(postId: string) {
    this.$router.push(`/posts/${postId}`)
  }
}
</script>
