<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <h5>
          이름
        </h5>
      </div>
      <div class="col-4">
        <div class="info-contents">
          {{ user.realName }}
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
          {{ user.email }}
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
          {{ getDate(user.createdAt) }}
        </div>
      </div>
    </div>
    <div class="row justify-content-end">
      <button class="btn btn-info">
        수정
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    user: Object,
  },
})
export default class AccountCard extends Vue {
  private modified: boolean = false

  private toggleModified() {
    this.modified = !this.modified
  }

  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>
