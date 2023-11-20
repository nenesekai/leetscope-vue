<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { computed, ref } from "vue";
import { UploadFilled } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/user";
import {
  ElMessage, genFileId, UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadRequestHandler,
  UploadRequestOptions,
  UploadUserFile
} from "element-plus";
import AssignmentDetailsPageHeader from "@/components/AssignmentDetailsPageHeader.vue";

const route = useRoute()
const router = useRouter()
const assignment = ref<Assignment>()
const upload = ref<UploadInstance>()

const invalid = ref(false)
const user = ref<User>()
const store = useUserStore()
let files: UploadUserFile[] = []
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

const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitHandler = () => {
  upload.value!.submit()
}

const clearHandler = () => {
  upload.value!.clearFiles()
}
</script>

<template>
  <el-result
    icon="error"
    title="Invalid Assignment ID"
    sub-title="Please do not modify the url :)"
    v-if="invalid"
  >
    <template #extra>
      <el-button type="primary" @click="router.push('/assignments')">Go Back to Dashboard</el-button>
    </template>
  </el-result>
  <div class="assignment-detail-container" v-else>
    <AssignmentDetailsPageHeader :assignment="assignment" :user="user" />

    <div class="submit-area-container" v-if="user != undefined && user.isStudent">
      <el-upload
        drag
        ref="upload"
        action="http://localhost:8080/submission/upload"
        :headers="{ Authorization: 'Bearer ' + store.token }"
        :data="{ assignmentId: assignment?.id }"
        :file-list="files"
        :multiple="false"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Submit your work here
        </div>
      </el-upload>
      <el-space>
        <el-button @click="clearHandler">Clear</el-button>
        <el-button type="primary" @click="submitHandler">Submit</el-button>
      </el-space>
    </div>
  </div>
</template>

<style scoped>

</style>