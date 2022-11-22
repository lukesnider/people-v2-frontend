import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ 
        user: false,
        user_id: false,
        username: false,
    }),
    getters: {
      isAuthenticated: (state) => state.user,
    },
    actions: {
    },
  })