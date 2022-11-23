import { defineStore } from 'pinia'
import { useNakamaStore } from './nakama'
export const useUserStore = defineStore('user', {
    state: () => ({ 
        user: false,
    }),
    getters: {
      isAuthenticated: (state) => state.user,
    },
    actions: {
      setUser(user) {
        this.user = user
      },
      logoutUser() {
        this.setUser(false)
        useNakamaStore().clearSession()
      },
    },
  })