<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(createPost)">
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true }"
              name="제목"
            >
              <b-form-group label="제목" label-for="title">
                <b-form-input
                  id="title"
                  v-model="title"
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
                  v-model="content"
                  :state="getValidationState(validationContext)"
                  rows="20"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="text-right mt-1">
              <b-button type="submit" class="btn btn-success" :disabled="(invalid || isSubmitted)">
                글 작성
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
  middleware: ['auth']
})
export default class PostAddPage extends Vue {
  private isSubmitted: boolean = false
  private title: string = ''
  private content: string = ''

  private getValidationState ({ dirty, validated, valid = null }) {
    return dirty || validated ? valid : null
  }

  private async createPost () {
    this.isSubmitted = true

    const params = {
      title: this.title,
      content: this.content
    }

    try {
      const res = await (this as any).$axios.post('/posts', params)
      if (res.status === 201) {
        (this as any).$toast.success('글을 작성하였습니다.')
        this.$router.push('/posts')
      }
    } catch (error) {
      (this as any).$toast.error(error.message as string)
      this.isSubmitted = false
    }
  }
}
</script>
