<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import alice from '@/assets/alice.png'

const isDark = useDark()
const router = useRouter()
const store = useUserStore()
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
      <el-button type="primary" size="large" @click="router.push('/assignments')">Go to Dashboard</el-button>
    </el-col>
  </el-row>
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