import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: ''
    }
  },
  getters: {
    isLogin: (state) => state.token != ''
  }
})