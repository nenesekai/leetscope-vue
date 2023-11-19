<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage, ElMessageBox } from "element-plus";
import HeaderLogo from "@/components/HeaderLogo.vue";
import { useDark, useToggle } from "@vueuse/core";
import 'element-plus/theme-chalk/dark/css-vars.css'
import api from "@/api";
import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";

const route = useRoute()
const router = useRouter()
const store = useUserStore()
const activeIndex = computed(() => { return route.path })
const isDark = useDark()
const toggleDark = useToggle(isDark)
const user = ref<User>()

if (store.isLogin) {
  api.getCurrentUser().then((response: AxiosResponse<Result<User>>) => {
    user.value = response.data.data
  }).catch((err: AxiosError) => {
    ElMessage.error(err)
  })
}

function logout() {
  ElMessage.success('You are logged out')
  store.logout()
  router.push('/introduction')
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="header-menu"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="/"><HeaderLogo /></el-menu-item>
    <el-menu-item index="/assignments">Assignments</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu v-if="store.isLogin" index="/account">
      <template #title>{{user == undefined ? 'Loading' : user.name}}</template>
      <el-menu-item index="/settings">Settings</el-menu-item>
      <el-menu-item @click="toggleDark()">Dark Mode: {{isDark ? 'On': 'Off'}}</el-menu-item>
      <el-menu-item index="/logout" @click="logout">Log Out</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else index="/login">Login</el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.header-menu {
  background: var(--el-bg-color);
}
</style>