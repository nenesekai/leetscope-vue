import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import ElementPlus, { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const pinia = createPinia().use(piniaPluginPersistedState)
const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(VueAxios, axios)
  .use(ElementPlus)

app.provide('axios', app.config.globalProperties.axios)

router.isReady().then(() => app.mount('#app'))

router.onError((err) => {
  ElMessage.error(err)
})