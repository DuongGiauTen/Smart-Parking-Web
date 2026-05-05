// domains/auth/authService.js
// Authentication with mocked backend using mockDB

import { mockDB } from '../../services/mockDB'

export const authService = {
  login: async (email, password) => {
    const result = mockDB.authenticateUser(email, password)
    if (!result.success) {
      throw new Error('Login failed')
    }
    const token = btoa(`${email}:${Date.now()}`)
    return { success: true, user: result.user, token }
  },

  logout: async () => {
    return Promise.resolve()
  },

  getCurrentUser: async (token) => {
    try {
      const [email] = atob(token).split(':')
      const user = mockDB.getCurrentUser(email)
      if (!user) throw new Error('User not found')
      return { success: true, ...user }
    } catch (e) {
      throw new Error('Invalid token')
    }
  }
}