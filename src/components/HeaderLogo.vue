<script setup lang="ts">
import alice from '@/assets/alice.png'
</script>

<template>
<el-space direction="horizontal">
  <el-avatar :src="alice" shape="square" :size="40"></el-avatar>
  <el-text class="header-logo-text">LeetScope</el-text>
</el-space>
</template>

<style scoped>
.header-logo-text {
  font-size: 18px;
  font-weight: bolder;
}
</style>