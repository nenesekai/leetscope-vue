<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";

defineProps({
  id: Number,
  title: String,
  description: String,
  deadline: String,
  allowedAttempts: Number
})
const router = useRouter()
</script>

<template>
  <el-card class="assignment-card" shadow="hover">
    <el-descriptions
      :title="title"
      :column="1"
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/assignmentDetail/' + id)">Details</el-button>
      </template>
      <el-descriptions-item v-if="description != undefined" label="Description">{{description}}</el-descriptions-item>
      <el-descriptions-item v-if="deadline != undefined" label="Deadline">{{new Date(deadline).toLocaleString()}}</el-descriptions-item>
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