import type { UserState, User } from '@/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    setUser(user: User): void {
      this.user = user
    },
  },
})