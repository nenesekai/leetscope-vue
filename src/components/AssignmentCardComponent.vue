<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  deadline: String
})
</script>

<template>
  <el-card class="assignment-card">
    <el-descriptions
      :title="title"
      :column="1"
    >
      <template #extra>
        <el-button type="primary">Details</el-button>
      </template>
      <el-descriptions-item v-if="description != undefined" label="Description">{{description}}</el-descriptions-item>
      <el-descriptions-item label="Deadline">{{deadline != undefined ? new Date(deadline).toDateString() : ''}}</el-descriptions-item>
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
}

.item {
  margin-bottom: 18px;
}

.assignment-card {
  width: 480px;
}
</style>