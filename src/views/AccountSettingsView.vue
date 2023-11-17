<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

const store = useUserStore()
const { token, isLogin, login, logout } = storeToRefs(store)
</script>

<template>
  <el-container>
    <el-text>Account Settings</el-text>
    <el-button @click="store.token = '114514'">Login</el-button>
    <el-text>Current Token: {{store.token}}</el-text>
  </el-container>
</template>

<style scoped>

</style>