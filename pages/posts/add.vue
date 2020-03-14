<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="createPost">
          <div class="form-group">
            <label for>제목</label>
            <input v-model="title" type="text" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for>내용</label>
            <textarea v-model="content" class="form-control" rows="20" />
          </div>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitted">
            글 작성
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
export default class PostAddPage extends Vue {
  private isSubmitted: boolean = false
  private title: string = ''
  private content: string = ''

  private async createPost () {
    this.isSubmitted = true

    const params = {
      title: this.title,
      content: this.content
    }

    try {
      const res = await (this as any).$axios.post('/posts', params)
      if (res.status === 200) {
        (this as any).$toast.success('Post를 작성하였습니다.')
        this.$router.push('/posts')
      }
    } catch (error) {
      (this as any).$toast.error(error.message as string)
      this.isSubmitted = false
    }
  }
}
</script>
