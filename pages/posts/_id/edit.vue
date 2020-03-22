<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="updatePost">
          <div class="form-group">
            <label for>제목</label>
            <input v-model="post.title" type="text" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for>내용</label>
            <textarea v-model="post.content" class="form-control" rows="20" />
          </div>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitted">
            글 수정
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  middleware: ['auth']
})
export default class PostEditPage extends Vue {
  private isSubmitted: boolean = false
  private post: any = []

  private async asyncData ({ $axios, params }) {
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

  private async updatePost () {
    this.isSubmitted = true

    const params = {
      title: (this as any).post.title,
      content: (this as any).post.content
    }

    try {
      const res = await (this as any).$axios.put(`/posts/${(this as any).post.id}`, params)
      if (res.status === 200) {
        (this as any).$toast.success('Post를 수정하였습니다.')
        setTimeout(() => {
          this.$router.push(`/posts/${(this as any).post.id}`)
        }, 0)
      }
    } catch (error) {
      (this as any).$toast.error(error.message as string)
      this.isSubmitted = false
    }
  }
}
</script>
