<script setup lang="ts">
import { ref } from 'vue'
import api from "@/api";
import type { AxiosResponse } from "axios";
const props = defineProps<{user: User, submission: Submission}>()

const submitter = ref<User>()
if (props.user.isTeacher) {
  api.getUserById(Number(props.submission.uid)).then((response: AxiosResponse<Result<User>>) => {
    submitter.value = response.data.data!
  })
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Submission {{submission.id}}</span>
      </div>
    </template>
    <el-descriptions :column="user.isTeacher ? 3 : 4">
      <el-descriptions-item label="File Name">{{submission.fileName}}</el-descriptions-item>
      <el-descriptions-item label="Create Time">{{new Date(submission.createTime).toLocaleString()}}</el-descriptions-item>
      <el-descriptions-item label="Grade Status">
        <el-tag v-if="submission.isGraded">Graded</el-tag>
        <el-tag v-else type="danger">Not Graded</el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-if="submission.isGraded" label="Result">
        <el-tag v-if="submission.isPass">Pass</el-tag>
        <el-tag v-else type="danger">No Pass</el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-if="user.isTeacher" label="Submitter">
        {{submitter == undefined ? 'Loading' : submitter.name}}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
  text-align: start;
}

.item {
  margin-bottom: 18px;
}
</style>