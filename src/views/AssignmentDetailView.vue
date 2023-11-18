<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import type { AxiosResponse } from "axios";
import { computed, ref } from "vue";

const route = useRoute()
const router = useRouter()
const assignment = ref<Assignment>()
const isOverdue = computed(() => {
  return assignment.value == undefined ? false : (new Date(assignment.value.deadline) < new Date())
})
const invalid = ref(false)
api.getAssignmentById(Number(route.params.id)).then((response: AxiosResponse) => {
  if (response.data.code == 'SUCCESS') {
    assignment.value = response.data.data
  } else {
    invalid.value = true
  }
})
</script>

<template>
  <el-result
    icon="error"
    title="Invalid Assignment ID"
    sub-title="Please do not modify the url :)"
    v-if="invalid"
  >
    <template #extra>
      <el-button type="primary" @click="router.push('/assignments')">Go Back to Dashboard</el-button>
    </template>
  </el-result>
  <div class="assignment-detail-container" v-else>
    <el-page-header @back="router.back()">
      <template #content>
        <div class="flex items-center">
          <span> {{assignment != undefined ? assignment.title : ''}} </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button>Print</el-button>
          <el-button type="primary" class="ml-2">Edit</el-button>
        </div>
      </template>

      <el-descriptions :column="3" size="large" class="assignment-detail-description">
        <el-descriptions-item v-if="assignment != undefined" label="Create Time">{{new Date(assignment.createTime).toLocaleString()}}</el-descriptions-item>
        <el-descriptions-item v-if="assignment != undefined" label="Deadline">{{new Date(assignment.deadline).toLocaleString()}}</el-descriptions-item>
        <el-descriptions-item v-if="assignment != undefined" label="Allowed Attempts">{{assignment.allowedAttempts}}</el-descriptions-item>
        <el-descriptions-item label="Status">
          <el-tag v-if="isOverdue" type="danger">Expired</el-tag>
          <el-tag v-else>Active</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="assignment != undefined && assignment.description != undefined" label="Description">{{assignment.description}}</el-descriptions-item>
      </el-descriptions>

    </el-page-header>
  </div>
</template>

<style scoped>
.assignment-detail-description {
  margin: 20px;
}
</style>