<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import type {
  FormInstance,
  FormRules,
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from "element-plus";
import { ElMessage, genFileId } from "element-plus";
import api from '@/api'
import type { AxiosError, AxiosResponse } from 'axios'
import { UploadFilled } from '@element-plus/icons-vue'

const router = useRouter()
const requestDatas = ref({
  assignmentId: 0
})
const assignmentFormRef = ref<FormInstance>()
interface FormAssignment {
  title: string
  description: string
  deadline: string
  allowedAttempts: number
}
const assignmentForm = reactive<FormAssignment>({
  title: '',
  description: '',
  deadline: '',
  allowedAttempts: 1
})
const rules = reactive<FormRules<FormAssignment>>({
  title: [{ required: true, message: 'Assignment Title Cannot be Blank', trigger: 'blur' }],
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

const handleInputExceed: UploadProps['onExceed'] = (files) => {
  sampleInputFileRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  hasInputFile.value = true
  sampleInputFileRef.value!.handleStart(file)
}

const handleInputRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  hasInputFile.value = false
}
const handleInputChange: UploadProps['onChange'] = (file: UploadFile, fileList: UploadFile[]) => {
  hasInputFile.value = true
}

const handleOutputExceed: UploadProps['onExceed'] = (files) => {
  sampleOutputFileRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  hasOutputFile.value = true
  sampleOutputFileRef.value!.handleStart(file)
}

const handleOutputRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  hasOutputFile.value = false
}
const handleOutputChange: UploadProps['onChange'] = (file: UploadFile, fileList: UploadFile[]) => {
  hasOutputFile.value = true
}

const sampleInputFileRef = ref<UploadInstance>()
const sampleOutputFileRef = ref<UploadInstance>()
const hasOutputFile = ref(false)
const hasInputFile = ref(false)

const onSubmit = async (formInstance: FormInstance | undefined) => {
  if (!formInstance) return
  if (!hasInputFile.value) {
    ElMessage.error('Must Upload Sample Input File')
    return
  }
  if (!hasOutputFile.value) {
    ElMessage.error('Must Upload Sample Output File!')
    return
  }
  await formInstance.validate((valid, fields) => {
    if (valid) {
      api
        .createNewAssignment(assignmentForm)
        .then((response: AxiosResponse<Result<Assignment>>) => {
          requestDatas.value.assignmentId = Number(response.data.data!.id)
          sampleInputFileRef.value!.submit()
          sampleOutputFileRef.value!.submit()
          ElMessage.success('Successfully Created New Assignment!')
          router.push('/assignments')
        })
        .catch((err: AxiosError) => {
          ElMessage.error(err.message)
        })
    } else {
      ElMessage.error('Invalid New Assignment Request!')
    }
  })
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
            <el-input-number v-model="assignmentForm.allowedAttempts" :min="1" :max="10" />
          </el-form-item>
          <el-form-item label="Sample Input File" prop="input">
            <el-upload
              ref="sampleInputFileRef"
              class="upload-field"
              drag
              :limit="1"
              action="http://localhost:8080/assignment/upload/inputFile"
              :data="requestDatas"
              method="post"
              accept=".txt"
              :auto-upload="false"
              :on-exceed="handleInputExceed"
              :on-change="handleInputChange"
              :on-remove="handleInputRemove"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <template #tip>
                <div class="el-upload__tip">txt file with the exact input to students' program</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="Sample Output File" prop="output">
            <el-upload
              ref="sampleOutputFileRef"
              class="upload-field"
              drag
              :limit="1"
              action="http://localhost:8080/assignment/upload/outputFile"
              :data="requestDatas"
              method="post"
              accept=".txt"
              :auto-upload="false"
              :on-exceed="handleOutputExceed"
              :on-change="handleOutputChange"
              :on-remove="handleOutputRemove"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
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
.upload-field {
  width: 600px;
}
</style>