<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import alice from '@/assets/alice.png'
import { ref } from "vue";

const isDark = useDark()
const router = useRouter()
const store = useUserStore()
const loginDialogVisible = ref(false)

function jumpToDashboard() {
  if (!store.isLogin) {
    loginDialogVisible.value = true
  } else {
    router.push('/assignments')
  }
}
</script>

<template>
<div class="introduction-container dark">
  <el-row class="introduction-row" justify="center">
    <el-col><el-avatar :size="400" shape="square" :src="alice"></el-avatar></el-col>
    <el-col><el-text class="introduction-heading-text">Welcome To LeetScope!!!</el-text></el-col>
    <el-col>
      <el-text>A one-stop platform for teachers and students from programming class that manages, receives, and grades programming assignment!</el-text>
    </el-col>
    <el-col><el-divider></el-divider></el-col>
    <el-col>
      <el-button type="primary" size="large" @click="jumpToDashboard">Go to Dashboard</el-button>
    </el-col>
  </el-row>

  <el-dialog
    v-model="loginDialogVisible"
    title="Login?"
    width="30%"
  >
    <span>You are not signed in. If you proceed, you will visit as a guest and functionalities will be limited. Do you want to continue?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="router.push('/assignments')">Proceed as Guest</el-button>
        <el-button type="primary" @click="router.push('/login')">
          Login
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped>
.introduction-container {
  margin: 40px;
}
.introduction-heading-text {
  font-size: 32px;
}
.el-row {
  margin-top: 40px;
}
.el-col {
  margin-bottom: 20px;
}
</style>