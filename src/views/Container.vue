<script setup lang="ts">

import HeaderMenuComponent from "@/components/HeaderMenuComponent.vue";
</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <el-affix>
          <HeaderMenuComponent />
        </el-affix>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>