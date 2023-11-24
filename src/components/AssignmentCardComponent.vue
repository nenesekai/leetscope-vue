<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import api from "@/api";
import type { AxiosResponse } from "axios";

const props = defineProps<{assignment: Assignment}>()
const router = useRouter()
const store = useUserStore()

const user = ref<User>()
if (store.isLogin) {
  api.getCurrentUser().then((response: AxiosResponse<Result<User>>) => {
    user.value = response.data.data!
  })
}
</script>

<template>
  <el-card class="assignment-card" shadow="hover">
    <el-descriptions
      :title="assignment.title"
      :column="1"
    >
      <template #extra>
        <el-button v-if="user != undefined && user.isTeacher" @click="router.push('/editAssignment/' + assignment.id)">Edit</el-button>
        <el-button type="primary" @click="router.push('/assignmentDetail/' + assignment.id)">Details</el-button>
      </template>
      <el-descriptions-item v-if="assignment.description != undefined" label="Description">{{assignment.description}}</el-descriptions-item>
      <el-descriptions-item v-if="assignment.deadline != undefined" label="Deadline">{{new Date(assignment.deadline).toLocaleString()}}</el-descriptions-item>
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