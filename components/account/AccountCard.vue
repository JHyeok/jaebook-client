<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <h5>
          이름
        </h5>
      </div>
      <div class="col-4">
        <div v-if="!modified" class="info-contents">
          {{ user.realName }}
        </div>
        <b-form-input v-else id="modifiedUserName" v-model="user.realName" />
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
      <button v-if="!modified" class="btn btn-info" @click="toggleModified">
        수정
      </button>
      <button v-else class="btn btn-success" @click="editUserName(user.id)">
        저장
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
  private isSubmittedToEditName: boolean = false

  private toggleModified() {
    this.modified = !this.modified
  }

  private getDate(datetime: Date) {
    return (this as any).$moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  private async editUserName(userId: string) {
    try {
      this.isSubmittedToEditName = true

      const editedUserName = (document as any).getElementById(
        'modifiedUserName'
      ).value

      if (editedUserName.length === 0) {
        ;(this as any).$toast.error('이름을 입력해주세요.')
        return
      }

      const res = await (this as any).$axios.put(`/users/${userId}`, {
        realName: editedUserName,
      })

      if (res.status === 200) {
        ;(this as any).user.realName = editedUserName
        this.modified = false
        ;(this as any).$toast.success('이름을 수정하였습니다.')
      }
    } catch (error) {
      ;(this as any).$toast.error(error.message as string)
    } finally {
      this.isSubmittedToEditName = false
    }
  }
}
</script>
