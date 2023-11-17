<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

const store = useUserStore()
</script>

<template>
  <el-container>
    <el-space>
      <el-text>Account Settings</el-text>
      <el-text>Your Token is: {{ store.token }}</el-text>
    </el-space>
  </el-container>
</template>

<style scoped>

</style>