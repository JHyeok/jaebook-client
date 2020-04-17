<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>📄 전체 글</h3>
          <div v-if="$auth.$state.loggedIn">
            <nuxt-link to="/posts/add" class="btn btn-outline-dark">
              새 글 작성
            </nuxt-link>
          </div>
        </div>
      </div>
      <template v-for="post in posts">
        <post-card :key="post.id" :on-view="viewPost" :post="post" />
      </template>
      <infinite-loading spinner="spiral" @infinite="infiniteHandler">
        <div slot="no-more" />
        <div slot="no-results" />
        <div slot="error" slot-scope="{ trigger }">
          Error message, click
          <a href="javascript:;" @click="trigger">here</a> to retry
        </div>
      </infinite-loading>
    </div>
  </main>
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
export default class PostListPage extends Vue {
  private posts: any = []
  private page: number = 1
  private offset: number = 0
  private limit: number = 20

  async asyncData ({ $axios }) {
    try {
      const data = await $axios.$get('/posts?offset=0&limit=20')
      return {
        posts: data
      }
    } catch (error) {
      return {
        posts: []
      }
    }
  }

  private infiniteHandler ($state) {
    setTimeout(async () => {
      try {
        this.page++
        this.offset = (this.page - 1) * this.limit
        const data = await (this as any).$axios.$get(`/posts?offset=${this.offset}&limit=${this.limit}`)
        if (data.length > 0) {
          this.posts = [...this.posts, ...data]
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (error) {
        $state.complete()
      }
    }, 0)
  }

  private viewPost (postId: string) {
    this.$router.push(`/posts/${postId}`)
  }
}
</script>
