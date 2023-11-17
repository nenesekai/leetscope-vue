<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import HeaderLogo from "@/components/HeaderLogo.vue";
import { useDark, useToggle } from "@vueuse/core";

const route = useRoute()
const router = useRouter()
const store = useUserStore()
const activeIndex = computed(() => { return route.path })
const isDark = useDark()
const toggleDark = useToggle(isDark)

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
      <template #title>Account</template>
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
</style>