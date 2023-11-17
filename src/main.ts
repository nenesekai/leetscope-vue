import { createApp } from 'vue'
import { createPinia } from "pinia";

import ElementPlus, { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus)

router.isReady().then(() => app.mount('#app'))

router.onError((err) => {
  ElMessage.error(err)
})