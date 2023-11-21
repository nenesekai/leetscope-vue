<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, computed, watchEffect } from "vue";
import api from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

const props = defineProps<{assignment?: Assignment, user?: User}>()

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
        <el-button v-if="user?.isTeacher" type="primary" class="ml-2">Edit</el-button>
      </div>
    </template>

    <el-descriptions :column="3" size="large" class="assignment-detail-description">
      <el-descriptions-item label="Create Time">{{assignment == undefined ? 'Loading' : new Date(assignment.createTime).toLocaleString()}}</el-descriptions-item>
      <el-descriptions-item label="Deadline">{{assignment == undefined ? 'Loading' : new Date(assignment.deadline).toLocaleString()}}</el-descriptions-item>
      <el-descriptions-item label="Allowed Attempts">{{assignment == undefined ? 'Loading' : assignment.allowedAttempts}}</el-descriptions-item>
      <el-descriptions-item label="Assigner">{{assigner}}</el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag v-if="isOverdue" type="danger">Expired</el-tag>
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