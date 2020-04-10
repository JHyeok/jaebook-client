<template>
  <div class="container index-container">
    <div class="row">
      <div class="col-12 col-xs-12 text-center mb-4">
        <a href="https://github.com/JHyeok/jaebook-server" target="_blank" class="button--grey mb-1">Backend Github</a>
        <a href="https://github.com/JHyeok/jaebook-chat-server" target="_blank" class="button--grey mb-1">Chat Server Github</a>
        <a href="https://github.com/JHyeok/jaebook-client" target="_blank" class="button--grey mb-1">FrontEnd GitHub</a>
      </div>
      <div class="col-12 col-xs-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>주간 인기 글</h3>
          <nuxt-link to="/posts" class="btn btn-grey">
            전체 글 보기
          </nuxt-link>
        </div>
      </div>
      <template v-for="post in posts">
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
    PostCard
  }
})
export default class HomePage extends Vue {
  private posts: any = []

  async asyncData ({ $axios }) {
    try {
      const data = await $axios.$get('/posts?offset=0&limit=8&sort=best')
      return {
        posts: data
      }
    } catch (error) {
      return {
        posts: []
      }
    }
  }

  private viewPost (postId: string) {
    this.$router.push(`/posts/${postId}`)
  }
}
</script>
