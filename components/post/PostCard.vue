<template>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card">
      <div class="card-body post-card-body">
        <h6 class="card-title" @click="onView(post.id)">
          <strong>{{ post.title }}</strong>
        </h6>
        <div class="card-text post-content-body" @click="onView(post.id)">
          <p class="card-text post-content">
            {{ post.previewContent }}
          </p>
        </div>
        <div class="post-info">
          {{ post.view }} 읽음 · {{ post.like }} 좋아요 <br>
          {{ getDate(post.createdAt) }}
        </div>
        <div class="card-text writer-info">
          <nuxt-link :to="`/account/${post.user.id}`" class="text-dark">
            {{ post.user.realName }}({{ post.user.email }})
          </nuxt-link>
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
    post: Object,
    onView: Function
  }
})
export default class PostCard extends Vue {
  private getDate (datetime) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style scoped>
.card-title {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.4em;
}

.post-card-body {
  min-height: 288px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  overflow: hidden;
}

.post-content-body {
  cursor: pointer;
  height: 150px;
}

.post-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 4.8em;
}

.post-info {
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgb(134, 142, 150);
}

.writer-info {
  font-size: 0.9rem;
}
</style>
