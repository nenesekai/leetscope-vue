<script setup lang="ts">
</script>

<template>
  <el-config-provider>
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
