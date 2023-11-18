<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import type { AxiosResponse } from "axios";

const route = useRoute()
const router = useRouter()
const assignment: Assignment | undefined = undefined
api.getAssignmentById(route.params.id).then((response: AxiosResponse) => {

})
</script>

<template>
  <el-page-header @back="router.back()">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3"> Title </span>
        <el-tag>Default</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button>Print</el-button>
        <el-button type="primary" class="ml-2">Edit</el-button>
      </div>
    </template>

    <el-descriptions :column="3" size="small" class="mt-4">
      <el-descriptions-item label="Username"
      >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="Telephone"
      >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal
      circumstance, but critical bug fixes would require hotfix so the actual
      release number <b>could be</b> more than 1 per week.
    </p>
  </el-page-header>
</template>

<style scoped>

</style>