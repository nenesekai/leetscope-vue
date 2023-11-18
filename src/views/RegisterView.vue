<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useDark } from "@vueuse/core";
import api from "@/api";

const isDark = useDark()
const router = useRouter()
const registerForm = reactive({
  name: '',
  password: '',
  password2: '',
  accountType: ''
})
const registerFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof registerForm>>({
  name: [
    {
      required: true,
      message: 'Username cannot be blank',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Password cannot be blank',
      trigger: 'blur'
    }
  ],
  password2: [
    {
      validator: (rule, value, callback) => {
        if (registerForm.password != registerForm.password2) {
          callback(new Error('Password must be the same'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  accountType: [
    {
      required: true,
      message: 'Must choose an account type',
      trigger: 'blur'
    }
  ]
})

function register(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      api.register({
        name: registerForm.name,
        password: registerForm.password,
        isTeacher: registerForm.accountType == 'teacher',
        isStudent: registerForm.accountType == 'student'
      }).then((response: { data: {
          code: string, msg: string
        }}) => {
        if (response.data.code == 'SUCCESS') {
          ElMessage.success(response.data.msg)
          router.push('/login')
        } else {
          ElMessage.error(response.data.msg)
        }
      }).catch((err) => {
        ElMessage.error(err)
      })

    } else {
      ElMessage.error('Unable to register, please check your entries')
      return false
    }
  })
}
</script>

<template>
  <div class="register-form-container">
    <el-card class="register-card" shadow="always">
      <div class="register-header-container">
        <el-text class="register-header-text">Register to LeetScope</el-text>
      </div>
      <el-form
        label-position="top"
        label-width="140px"
        status-icon
        :model="registerForm"
        ref="registerFormRef"
        :rules="rules"
      >
        <el-form-item label="Username" prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="registerForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="password2">
          <el-input v-model="registerForm.password2" type="password" />
        </el-form-item>
        <el-form-item label="Account Type" prop="accountType">
          <el-select v-model="registerForm.accountType" placeholder="Please choose">
            <el-option label="Student" value="student" />
            <el-option label="Teacher" value="teacher" />
          </el-select>
        </el-form-item>
        <div class="form-buttons-container">
          <el-button type="primary" @click="register(registerFormRef)">Register</el-button>
          <el-button @click="router.push('/login')">Return to Login</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.form-buttons-container {
  margin-top: 40px;
}
.register-header-text {
  font-size: 20px;
  font-weight: bolder;
}
.register-header-container {
  margin-bottom: 20px;
}
.register-card {
  max-width: 400px;
  margin: 5% auto auto;
  padding: 20px;
}
</style>