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

const route = useRoute()
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
        user.value = response.data.data
        api.listSubmissionsByUidAndAssignmentId(user.value!.id, assignment.value!.id).then((response: AxiosResponse) => {
          submissionList.value = response.data.data
        })
      }).catch((err: AxiosError) => {
        ElMessage.error(err)
      })
    }
  } else {
    invalid.value = true
  }
})

</script>

<template>
  <AssignmentIdInvalidError v-if="invalid" />
  <div class="assignment-detail-container" v-else>
    <AssignmentDetailsPageHeader :assignment="assignment" :user="user" />
    <el-main>
      <AssignmentUploadComponent class="item" :assignment="assignment" :user="user" v-if="user != undefined && user.isStudent" />
      <div v-if="user != undefined && user.isStudent">
        <el-divider></el-divider>
        <div class="submission-list-header-container">
          <el-text class="submission-list-header">Your Submissions: </el-text>
        </div>
        <el-scrollbar class="submission-list-container" max-height="400px">
          <el-empty v-if="submissionList == undefined || submissionList!.length == 0"></el-empty>
          <SubmissionCardComponent v-for="submission in submissionList" class="submission-card" :submission="submission" />
        </el-scrollbar>
      </div>
    </el-main>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 20px;
}
.submission-list-header {
  font-size: 18px;
  font-weight: bolder;
  text-align: start;
}
.submission-list-header-container {
  margin-bottom: 20px
}
.submission-list-container {
  padding: 20px;
  border: 2px solid var(--el-border-color);
  border-radius: 18px
}
.submission-card {
  margin-bottom: 20px;
}
</style>