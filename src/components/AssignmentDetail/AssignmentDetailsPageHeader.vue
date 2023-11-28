<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, computed, watchEffect } from "vue";
import api from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

const props = defineProps<{assignment?: Assignment, user?: User, submissionList?: Submission[]}>()

const router = useRouter()
const assigner = ref('Loading')

const isOverdue = computed(() => {
  return props.assignment == undefined ? false : (new Date(props.assignment.deadline) < new Date())
})
watchEffect(() => {
  if (props.assignment == undefined) {
    assigner.value = 'Loading'
  } else {
    api.getUserById(Number(props.assignment.uid)).then(
      (response: AxiosResponse<Result<User>>) => {
        if (response.data.data == undefined) {
          assigner.value = 'Undefined'
        } else {
          assigner.value = response.data.data.name
        }
      }
    )
  }
})

function deleteAssignment() {
  ElMessageBox.confirm(
    'This will permanently delete the assignment. Are you sure you wanna do this?',
    'Deleting Assignment',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    api.deleteAssignment(props.assignment!.id).then((response: AxiosResponse<Result<any>>) => {
      if (response.data.code == 'SUCCESS') {
        ElMessage('Successfully Deleted')
        router.push('/assignments')
      } else {
        ElMessage.error(response.data.msg)
      }
    })
  }).catch((err: AxiosError) => {
    ElMessage.error(err.message)
  })
}
</script>

<template>
  <el-page-header @back="router.back()">
    <template #content>
      <div class="flex items-center">
        <span> {{assignment?.title}} </span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button v-if="user?.isTeacher" class="ml-2" @click="router.push('/editAssignment/' + assignment!.id)">Edit</el-button>
        <el-button v-if="user?.isTeacher" type="danger" class="ml-2" @click="deleteAssignment">Delete</el-button>
      </div>
    </template>

    <el-descriptions :column="3" size="large" class="assignment-detail-description">
      <el-descriptions-item label="Create Time">{{assignment == undefined ? 'Loading' : new Date(assignment.createTime).toLocaleString()}}</el-descriptions-item>
      <el-descriptions-item label="Deadline">{{assignment == undefined ? 'Loading' : new Date(assignment.deadline).toLocaleString()}}</el-descriptions-item>
      <el-descriptions-item v-if="user == undefined || user.isTeacher" label="Allowed Attempts">{{assignment == undefined ? 'Loading' : assignment.allowedAttempts}}</el-descriptions-item>
      <el-descriptions-item v-else label="Remaining Attempts">{{submissionList == undefined || assignment == undefined ? 'Loading' : assignment.allowedAttempts - submissionList.length}}</el-descriptions-item>
      <el-descriptions-item label="Assigner">{{assigner}}</el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag v-if="!(user?.isTeacher) && submissionList != undefined && submissionList.length > 0">Submitted</el-tag>
        <el-tag v-else-if="isOverdue" type="danger">Expired</el-tag>
        <el-tag v-else>Active</el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-if="assignment != undefined && assignment.description != undefined" label="Description">{{assignment.description}}</el-descriptions-item>
    </el-descriptions>

  </el-page-header>
</template>

<style scoped>
.assignment-detail-description {
  margin: 20px;
}
</style>