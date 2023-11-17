<script setup lang="ts">
import { inject, ref, Ref } from 'vue'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const axios = inject('axios') as AxiosInstance
const assignments: Ref<Assignment[]> = ref()

axios
  .get('http://localhost:8080/assignment/listAll')
  .then((response: { data: { data: Assignment[] } }) => {
    assignments.value = response.data.data
  })
  .catch((err) => {
    ElMessage.error(err)
  })
</script>

<template>
  <p>{{ assignments }}</p>
</template>

<style scoped></style>