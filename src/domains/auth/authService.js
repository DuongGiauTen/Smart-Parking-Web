// domains/auth/authService.js
// Authentication API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const authService = {
  login: async (email, password) => {
    // Mock login for now
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@bkparking.com' && password === 'admin123') {
          resolve({
            user: { id: 1, name: 'Admin User', email, role: 'admin' },
            token: 'mock-jwt-token'
          })
        } else if (email === 'user@bkparking.com' && password === 'user123') {
          resolve({
            user: { id: 2, name: 'Regular User', email, role: 'user' },
            token: 'mock-jwt-token'
          })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  },

  logout: async () => {
    // Mock logout
    return Promise.resolve()
  },

  getCurrentUser: async () => {
    // Mock get current user
    return Promise.resolve(null)
  }
}