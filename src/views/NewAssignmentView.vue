<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules, UploadInstance, UploadUserFile } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api";
import type { AxiosError, AxiosResponse } from "axios";
import { UploadFilled } from '@element-plus/icons-vue'


const router = useRouter()

const assignmentFormRef = ref<FormInstance>()
const fileList = ref<UploadUserFile[]>()
interface FormAssignment {
  title: string,
  description: string,
  deadline: string,
  allowedAttempts: number,
  testCases: TestCaseItem[]
}
interface TestCaseItem {
  key: number,
  value: string
}
const assignmentForm = reactive<FormAssignment>({
  title: '',
  description: '',
  deadline: '',
  allowedAttempts: 1,
  testCases: []
})
const rules = reactive<FormRules<FormAssignment>>({
  title: [
    { required: true, message: 'Assignment Title Cannot be Blank', trigger: 'blur'}
  ],
  deadline: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value == '') {
          callback(new Error('Deadline Cannot be Blank'))
        }
        const date = new Date(value)
        const now = new Date()
        if (date < now) {
          callback(new Error('Deadline Cannot be Earlier than Now'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

const sampleInputFileRef = ref<UploadInstance>()

const onSubmit = async (formInstance: FormInstance | undefined) => {
  ElMessage(fileList.value!.pop()!.name)

  // if (!formInstance) return
  // await formInstance.validate((valid, fields) => {
  //   if (valid) {
  //     api.createNewAssignment(assignmentForm).then((response: AxiosResponse) => {
  //       ElMessage.success('Successfully Created New Assignment!')
  //       router.push('/assignments')
  //     }).catch((err: AxiosError) => {
  //       ElMessage.error(err.message)
  //     })
  //   } else {
  //     ElMessage.error('Invalid New Assignment Request!')
  //   }
  // })
}
</script>

<template>
  <el-page-header @back="router.back()">
    <template #content>
      <span class="text-large font-600 mr-3"> Create New Assignment </span>
    </template>
    <template #default>
      <div class="new-assignment-form-container">
        <el-form
          class="new-assignment-form"
          ref="assignmentFormRef"
          :rules="rules"
          :model="assignmentForm"
          label-width="200px"
        >
          <el-form-item label="Title" prop="title">
            <el-input v-model="assignmentForm.title" />
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input v-model="assignmentForm.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Deadline" prop="deadline">
            <el-date-picker
              v-model="assignmentForm.deadline"
              type="datetime"
              placeholder="Select date and time"
            />
          </el-form-item>
          <el-form-item label="Allowed Attempts">
            <el-input-number v-model="assignmentForm.allowedAttempts" :min="1" :max="10"/>
          </el-form-item>
          <el-form-item label="Sample Input File">
            <el-upload
              ref="sampleInputFileRef"
              class="upload-demo"
              drag
              :limit="1"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :auto-upload="false"
              :file-list="fileList"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  txt file with the exact input to students' program
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="Sample Output File">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :limit="1"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  txt file with the exact expected output students' program are supposed to output
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(assignmentFormRef)">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>
.new-assignment-form {
  margin-top: 40px;
}
.new-assignment-form-container {
  margin-right: 80px;
  margin-top: 20px;
}
</style>