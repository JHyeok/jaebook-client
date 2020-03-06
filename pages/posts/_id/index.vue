<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-12">
        <h3 class="post-title">
          {{ post.title }}
        </h3>
      </div>
      <div class="col-md-12 mb-4">
        <div class="post-details">
          <div class="sub-info">
            <dl>
              <dd>
                <span class="date-text">{{ getDate(post.createdAt) }}</span>
              </dd>
              <dd>
                <span class="sub-info-bar">|</span>
                <span class="num-text">0 읽음</span>
              </dd>
            </dl>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <textarea class="form-control" rows="14" disabled v-html="post.content" />
        </div>
      </div>
    </div>
    <div v-if="$auth.$state.loggedIn && ($auth.$state.user.id === post.user.id)">
      <button class="btn btn-info" @click="editPost(post.id)">
        Edit Post
      </button>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
Component.registerHooks(['asyncData'])

@Component
export default class PostDetailPage extends Vue {
  private post: any = []

  async asyncData ({ $axios, params }) {
    try {
      const data = await $axios.$get(`/posts/${params.id}`)
      return {
        post: data
      }
    } catch (error) {
      return {
        post: []
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

.sub-info {
  overflow: hidden;
  margin-top: 15px;
}

.num-text {
  float: right;
  font-size: 13px;
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

.sub-info-bar {
  margin: 0 15px;
  color: #eaeaea;
}
</style>
