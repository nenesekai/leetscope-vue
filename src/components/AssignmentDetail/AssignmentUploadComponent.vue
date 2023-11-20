<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { genFileId, UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const props = defineProps<{ assignment?: Assignment; user?: User }>()
const store = useUserStore()
const upload = ref<UploadInstance>()

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
  <div class="submit-area-container">
    <el-upload
      drag
      ref="upload"
      action="http://localhost:8080/submission/upload"
      class="submission-uploader"
      :headers="{ Authorization: 'Bearer ' + store.token }"
      :data="{ assignmentId: assignment?.id }"
      :multiple="false"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Submit your work here</div>
    </el-upload>
    <el-space>
      <el-button @click="clearHandler">Clear</el-button>
      <el-button type="primary" @click="submitHandler">Submit</el-button>
    </el-space>
  </div>
</template>

<style scoped>
.submission-uploader {
  margin-bottom: 20px
}
</style>