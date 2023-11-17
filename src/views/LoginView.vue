<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { reactive, Ref, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'

const store = useUserStore()
const router = useRouter()
const token = ref('')
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({name: '', password: ''})
const rules = reactive<FormRules<typeof loginForm>>({
  name: [{ required: true, message: 'Username cannot be blank', trigger: 'blur' }],
  password: [{ required: true, message: 'Password cannot be blank', trigger: 'blur' }]
})

function login() {
  if (token.value == '') {
    ElMessageBox.alert('Token cannot be blank')
    return
  }
  store.login(token.value)
  ElMessage.success('Login Successfully, Redirecting')
  router.push('/assignments')
}
</script>

<template>
  <div class="login-form-container">
    <el-card class="login-card" shadow="always">
      <div class="login-header-container"><el-text class="login-header">LeetScope</el-text></div>
      <div class="flex-grow"></div>
      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          label-width="80px"
          status-icon
      >
        <el-form-item label="Username" prop="name">
          <el-input v-model="loginForm.name" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" :show-password="true" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
          <el-button>Register</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="router.push('/assignments')">Continue as Guest</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-form-container {
  justify-content: center;
}
.login-header {
  font-size: 28px;
}
.login-header-container {
  margin-bottom: 20px;
}
.login-card {
  max-width: 400px;
  padding: 20px;
  margin: 10% auto auto;
}
.flex-grow {
  flex-grow: 1;
}
</style>