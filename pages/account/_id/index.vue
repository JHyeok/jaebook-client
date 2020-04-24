<template>
  <main class="container my-5">
    <div class="mt-4">
      <b-tabs content-class="mt-3" justified>
        <b-tab title="정보" active>
          <div class="row justify-content-center">
            <div class="col-4">
              <h5>
                이름
              </h5>
            </div>
            <div class="col-4">
              <div class="info-contents">
                {{ account.realName }}
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4">
              <h5>
                이메일
              </h5>
            </div>
            <div class="col-4">
              <div class="info-contents">
                {{ account.email }}
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4">
              <h5>
                가입일
              </h5>
            </div>
            <div class="col-4">
              <div class="info-contents">
                {{ getDate(account.createdAt) }}
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="작성 글">
          <p>작성 글 {{ posts.length }} 개</p>
          <div class="row">
            <template v-for="post in posts">
              <account-post
                :key="post.id"
                :on-view="viewPost"
                :post="post"
                :user="account"
              />
            </template>
          </div>
        </b-tab>
        <b-tab title="작성 댓글">
          <p>작성 댓글 {{ comments.length }} 개</p>
          <div class="comment-wrapper">
            <ul class="media-list">
              <template v-for="comment in comments">
                <account-comment
                  :key="comment.id"
                  :comment="comment"
                  :user="account"
                  @afterDeleteComment="afterDeleteComment"
                />
              </template>
            </ul>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AccountPost from '~/components/account/AccountPost.vue'
import AccountComment from '~/components/account/AccountComment.vue'
Component.registerHooks(['asyncData'])

@Component({
  components: {
    AccountPost,
    AccountComment,
  },
})
export default class AccountInfoPage extends Vue {
  private account: any = []
  private posts: any = []
  private comments: any = []

  private async asyncData({ $axios, params, error }) {
    try {
      const account = await $axios.$get(`/users/${params.id}`)
      const posts = await $axios.$get(`/users/${params.id}/posts`)
      const comments = await $axios.$get(`/users/${params.id}/comments`)

      return {
        account,
        posts,
        comments,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }

  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  private viewPost(postId: string) {
    this.$router.push(`/posts/${postId}`)
  }

  /**
   * 댓글이 삭제된 후 실행되는 메서드
   */
  private async afterDeleteComment() {
    const comments = await (this as any).$axios.$get(
      `/users/${this.account.id}/comments`
    )

    this.comments = comments
  }
}
</script>

<style scoped>
.info-contents {
  font-size: 1rem;
  line-height: 1.5;
  color: #6f6e6e;
}

.comment-wrapper .media-list {
  margin-left: -40px;
}

.comment-wrapper .media-list .media img {
  width: 64px;
  height: 64px;
  border: 2px solid #e5e7e8;
}

.comment-wrapper .media-list .media {
  border-bottom: 1px dashed #efefef;
  margin-bottom: 25px;
}
</style>
