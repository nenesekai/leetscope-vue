<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <el-result
    icon="error"
    title="Invalid Assignment ID"
    sub-title="Please do not modify the url :)"
  >
    <template #extra>
      <el-button type="primary" @click="router.push('/assignments')">Go Back to Dashboard</el-button>
    </template>
  </el-result>
</template>

<style scoped>

</style>