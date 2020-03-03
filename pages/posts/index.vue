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
export default class PostsPage extends Vue {
  private posts = []

  async asyncData (context) {
    try {
      const data = await context.$axios.$get('/posts')
      return {
        posts: data
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  viewPost (postId): void {
    // eslint-disable-next-line no-console
    console.log(`postId: ${postId}`)
  }
}
</script>
