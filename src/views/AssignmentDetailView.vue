<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import AssignmentDetailsPageHeader from "@/components/AssignmentDetail/AssignmentDetailsPageHeader.vue";
import AssignmentIdInvalidError from "@/components/AssignmentDetail/AssignmentIdInvalidError.vue";
import AssignmentUploadComponent from "@/components/AssignmentDetail/AssignmentUploadComponent.vue";
import SubmissionCardComponent from "@/components/AssignmentDetail/SubmissionCardComponent.vue";
import SubmissionListStudent from "@/components/AssignmentDetail/SubmissionListComponent.vue";

const route = useRoute()
const router = useRouter()
const assignment = ref<Assignment>()
const user = ref<User>()
const submissionList = ref<Submission[]>()
const invalid = ref(false)
const store = useUserStore()
api.getAssignmentById(Number(route.params.id)).then((response: AxiosResponse) => {
  if (response.data.code == 'SUCCESS') {
    assignment.value = response.data.data
    if (store.isLogin) {
      api.getCurrentUser().then((response: AxiosResponse) => {
        if (response.status != 200) {
          invalid.value = true
          ElMessage.error(response.statusText)
        } else {
          user.value = response.data.data
          api.listSubmissionsByAssignmentId(assignment.value!.id).then((response: AxiosResponse) => {
            submissionList.value = response.data.data
          })
        }
      }).catch((err: AxiosError) => {
        ElMessage.error(err)
      })
    }
  } else {
    invalid.value = true
  }
}).catch((err) => {
  invalid.value = true
})

</script>

<template>
  <AssignmentIdInvalidError v-if="invalid" />
  <div class="assignment-detail-container" v-else>
    <AssignmentDetailsPageHeader :assignment="assignment" :user="user" :submissionList="submissionList" />
    <el-main>
      <AssignmentUploadComponent class="item" :assignment="assignment" :user="user" :submission-list="submissionList" v-if="user != undefined && submissionList != undefined && assignment != undefined && user.isStudent && submissionList.length < assignment.allowedAttempts" />
      <SubmissionListStudent v-if="user != undefined" :user="user" :submission-list="submissionList" />
    </el-main>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 20px;
}
</style>