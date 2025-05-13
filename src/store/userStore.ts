import { create } from 'zustand'
import type { User } from '../types/user'

const STORAGE_KEY = 'eng_cards_user_v1'

interface UserState {
  user: User
  setUsername: (username: string) => void
  setAvatar: (avatar: string | null) => void
  resetUser: () => void
}

function loadUser(): User {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as User
  } catch {
    // Silent fail for localStorage errors
  }
  return {
    username: 'User',
    avatar: null,
    createdAt: new Date().toISOString(),
  }
}

export const useUserStore = create<UserState>(set => {
  const persist = (user: User): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch {
      // Silent fail for localStorage errors
    }
  }
  return {
    user: loadUser(),
    setUsername: (username: string) =>
      set(state => {
        const updated = { ...state.user, username }
        persist(updated)
        return { user: updated }
      }),
    setAvatar: (avatar: string | null) =>
      set(state => {
        const updated = { ...state.user, avatar }
        persist(updated)
        return { user: updated }
      }),
    resetUser: () =>
      set(() => {
        const reset = {
          username: 'User',
          avatar: null,
          createdAt: new Date().toISOString(),
        }
        persist(reset)
        return { user: reset }
      }),
  }
})
