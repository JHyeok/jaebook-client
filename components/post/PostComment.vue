<template>
  <div class="row bootstrap snippets">
    <div class="col-md-12 col-md-offset-2 col-sm-12">
      <div class="comment-wrapper">
        <div class="panel panel-info">
          <div class="panel-heading">
            댓글 {{ comments.length }} 개
          </div>
          <div class="panel-body">
            <hr>
            <ul class="media-list">
              <template v-for="comment in comments">
                <li :key="comment.id" class="media">
                  <div class="media-body">
                    <strong class="text-success">{{ comment.user.realName }}({{ comment.user.email }})</strong>
                    <span class="text-muted pull-right">
                      <small class="text-muted">{{ getDate(comment.createdAt) }}</small>
                    </span>
                    <div class="comment-body" v-text="comment.text" />
                  </div>
                  <div v-if="$auth.$state.loggedIn && ($auth.$state.user.id === comment.user.id)" class="float-right">
                    <span><a href="#">수정</a></span>
                    <span><a href="#">삭제</a></span>
                  </div>
                </li>
              </template>
            </ul>
          </div>
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
    comments: Array
  }
})
export default class PostComment extends Vue {
  getDate (datetime) {
    return new Date(datetime).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul'
    })
  }
}
</script>

<style scoped>
.comment-body {
  white-space:pre;
}

.comment-wrapper .media-list {
  margin-left: -40px;
}

.comment-wrapper .media-list .media img {
  width:64px;
  height:64px;
  border:2px solid #e5e7e8;
}

.comment-wrapper .media-list .media {
  border-bottom:1px dashed #efefef;
  margin-bottom:25px;
}
</style>
