<script setup lang="ts">
import { inject, ref, Ref } from 'vue'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import AssignmentCardComponent from "@/components/AssignmentCardComponent.vue";
import api from "@/api";

const assignments: Ref<Assignment[] | undefined> = ref()

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
    <el-space direction="vertical">
      <AssignmentCardComponent v-for="assignment in assignments" v-bind="assignment" />
    </el-space>
  </div>
</template>

<style scoped>
</style>