<script setup lang="ts">
import { inject, ref, Ref } from 'vue'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import AssignmentCardComponent from "@/components/AssignmentCardComponent.vue";
import api from "@/api";
import { useRouter } from "vue-router";

const assignments: Ref<Assignment[] | undefined> = ref()
const router = useRouter()

api.listAllAssignments()
  .then((response: { data: { data: Assignment[] } } ) => {
    assignments.value = response.data.data
  })
  .catch((err) => {
    ElMessage.error(err)
  })
</script>

<template>
  <div class="assignment-list-container">
    <el-page-header @back="router.back()">
      <template #content>
        <span class="text-large font-600 mr-3"> All Assignments </span>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" class="ml-2" @click="router.push('/newAssignment')">Add New Assignment</el-button>
        </div>
      </template>
      <template #default>
        <el-space class="assignment-card-list-container" direction="vertical" size="large">
          <AssignmentCardComponent v-for="assignment in assignments" v-bind="assignment" />
        </el-space>
      </template>
    </el-page-header>
  </div>
</template>

<style scoped>
.assignment-card-list-container {
  margin-top: 20px;
}
</style>