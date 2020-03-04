<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>Latest Posts</h3>
          <div v-if="$auth.$state.loggedIn">
            <nuxt-link to="/posts/add" class="btn btn-info">
              Add Post
            </nuxt-link>
          </div>
        </div>
      </div>
      <template v-for="post in posts">
        <div :key="post.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <post-card :on-view="viewPost" :post="post" />
        </div>
      </template>
      <infinite-loading spinner="spiral" @infinite="infiniteHandler">
        <div slot="no-more" />
        <div slot="no-results">
          No Posts
        </div>
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
import InfiniteLoading from 'vue-infinite-loading'
import PostCard from '~/components/post/PostCard.vue'
Component.registerHooks(['asyncData'])

@Component({
  components: {
    PostCard,
    InfiniteLoading
  }
})
export default class PostsPage extends Vue {
  private posts: any = []
  private page: number = 1
  private offset: number = 0
  private limit: number = 20

  async asyncData (context) {
    try {
      const data = await context.$axios.$get('/posts?offset=0&limit=20')
      return {
        posts: data
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  infiniteHandler ($state) {
    setTimeout(async () => {
      this.page++
      this.offset = (this.page - 1) * this.limit
      const data = await (this as any).$axios.$get(`/posts?offset=${this.offset}&limit=${this.limit}`)
      if (data.length > 0) {
        this.posts = [...this.posts, ...data]
        $state.loaded()
      } else {
        $state.complete()
      }
    }, 0)
  }

  viewPost (postId): void {
    // eslint-disable-next-line no-console
    console.log(`postId: ${postId}`)
  }
}
</script>
