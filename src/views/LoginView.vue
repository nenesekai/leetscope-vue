<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const store = useUserStore()
const route = useRoute()
const router = useRouter()
const token = ref('')

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
  <el-space direction="vertical">
    <el-input name="token" v-model="token" placeholder="Token"></el-input>
    <el-button @click="login">Click Me to Login</el-button>
  </el-space>
</template>

<style scoped>

</style>