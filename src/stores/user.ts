import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import api from "@/api";
import type { AxiosResponse } from "axios";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: ''
    }
  },
  getters: {
    isLogin: (state) => state.token != ''
  },
  actions: {
    login(token: string) {
      this.token = token
    },
    logout() {
      this.token = ''
    }
  },
  persist: true
})