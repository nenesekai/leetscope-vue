<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'


const router = useRouter()

const assignmentFormRef = ref<FormInstance>()
const assignmentForm = reactive({
  title: '',
  description: '',
  deadline: '',
  allowedAttempts: 1
})
const rules = reactive<FormRules<typeof assignmentForm>({
  title: [
    { required: true, message: 'Assignment Title Cannot be Blank', trigger: 'blur'}
  ]
})

const onSubmit = () => {
  console.log('submit!')
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
          <el-form-item label="Title">
            <el-input v-model="assignmentForm.title" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="assignmentForm.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Deadline">
            <el-date-picker
              v-model="assignmentForm.deadline"
              type="datetime"
              placeholder="Select date and time"
            />
          </el-form-item>
          <el-form-item label="Allowed Attempts">
            <el-input-number v-model="assignmentForm.allowedAttempts" :min="1" :max="10"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
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
  margin: auto 100px auto;
}
</style>