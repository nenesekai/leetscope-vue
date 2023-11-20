<script setup lang="ts">
const props = defineProps<{submission: Submission}>()
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Submission {{submission.id}}</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <el-descriptions>
      <el-descriptions-item label="File Name">{{submission.fileName}}</el-descriptions-item>
      <el-descriptions-item label="Create Time">{{new Date(submission.createTime).toLocaleString()}}</el-descriptions-item>
      <el-descriptions-item label="Grade Status">
        <el-tag v-if="submission.isGraded">Graded</el-tag>
        <el-tag v-else type="danger">Not Graded</el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-if="submission.isPass" label="Result">
        <el-tag v-if="submission.isPass">Pass</el-tag>
        <el-tag v-else type="danger">No Pass</el-tag>
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