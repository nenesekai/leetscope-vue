<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const route = useRoute()
const store = useUserStore()
const activeIndex = computed(() => { return route.path })
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="header-menu"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="/">LeetScope</el-menu-item>
    <el-menu-item index="/assignments">Assignments</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu v-if="store.isLogin" index="/account">
      <template #title>Account</template>
      <el-menu-item index="/account/settings">Settings</el-menu-item>
      <el-menu-item index="/account/log-out">Log Out</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else index="/login">Login</el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>