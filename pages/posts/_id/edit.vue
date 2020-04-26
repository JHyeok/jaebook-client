<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(updatePost)">
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true }"
              name="제목"
            >
              <b-form-group label="제목" label-for="title">
                <b-form-input
                  id="title"
                  v-model="post.title"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true }"
              name="내용"
            >
              <b-form-group label="내용" label-for="content">
                <b-form-textarea
                  id="content"
                  v-model="post.content"
                  :state="getValidationState(validationContext)"
                  rows="20"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="text-right mt-1">
              <b-button class="btn btn-danger" @click="cancelEditPost()">
                취소
              </b-button>
              <b-button
                type="submit"
                class="btn btn-success"
                :disabled="(invalid || isSubmitted)"
              >
                확인
              </b-button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  middleware: ['auth'],
})
export default class PostEditPage extends Vue {
  private isSubmitted: boolean = false
  private post: any = []

  private getValidationState({ dirty, validated, valid = null }) {
    return dirty || validated ? valid : null
  }

  private cancelEditPost() {
    if (confirm('수정을 취소하시겠습니까?')) {
      this.$router.push(`/posts/${(this as any).post.id}`)
    }
  }

  private async asyncData({ $axios, params, error }) {
    try {
      const data = await $axios.$get(`/posts/${params.id}`)
      return {
        post: data,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }

  private async updatePost() {
    this.isSubmitted = true

    const params = {
      title: (this as any).post.title,
      content: (this as any).post.content,
    }

    try {
      const res = await (this as any).$axios.put(
        `/posts/${(this as any).post.id}`,
        params
      )
      if (res.status === 200) {
        ;(this as any).$toast.success('글을 수정하였습니다.')
        setTimeout(() => {
          this.$router.push(`/posts/${(this as any).post.id}`)
        }, 0)
      }
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
      this.isSubmitted = false
    }
  }
}
</script>
