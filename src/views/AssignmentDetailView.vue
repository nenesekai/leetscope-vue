<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import AssignmentDetailsPageHeader from "@/components/AssignmentDetail/AssignmentDetailsPageHeader.vue";
import AssignmentIdInvalidError from "@/components/AssignmentDetail/AssignmentIdInvalidError.vue";
import AssignmentUploadComponent from "@/components/AssignmentDetail/AssignmentUploadComponent.vue";

const route = useRoute()
const assignment = ref<Assignment>()
const user = ref<User>()
const invalid = ref(false)
const store = useUserStore()
if (store.isLogin) {
  api.getCurrentUser().then((response: AxiosResponse) => {
    user.value = response.data.data
  }).catch((err: AxiosError) => {
    ElMessage.error(err)
  })
}
api.getAssignmentById(Number(route.params.id)).then((response: AxiosResponse) => {
  if (response.data.code == 'SUCCESS') {
    assignment.value = response.data.data
  } else {
    invalid.value = true
  }
})
</script>

<template>
  <AssignmentIdInvalidError v-if="invalid" />
  <div class="assignment-detail-container" v-else>
    <AssignmentDetailsPageHeader :assignment="assignment" :user="user" />

    <AssignmentUploadComponent :assignment="assignment" :user="user" v-if="user != undefined && user.isStudent" />
  </div>
</template>

<style scoped>

</style>