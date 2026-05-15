// domains/user-management/userManagementService.js
// User management API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const userManagementService = {
  getUsers: async () => {
    // Mock users data
    return Promise.resolve([
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@hcmut.edu.vn',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-15T09:00:00Z'
      },
      {
        id: 2,
        name: 'Trần Minh Dương',
        email: 'user@hcmut.edu.vn',
        role: 'user',
        status: 'active',
        lastLogin: '2024-01-15T08:30:00Z'
      },
      {
        id: 3,
        name: 'Phạm Công Võ',
        email: 'staff@hcmut.edu.vn',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-14T16:00:00Z'
      }
    ])
  },

  createUser: async (userData) => {
    // Mock create user
    return Promise.resolve({
      success: true,
      user: {
        id: Date.now(),
        ...userData,
        status: 'active',
        createdAt: new Date().toISOString()
      }
    })
  },

  updateUser: async (userId, updates) => {
    // Mock update user
    return Promise.resolve({
      success: true,
      user: {
        id: userId,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    })
  },

  deleteUser: async (userId) => {
    // Mock delete user
    return Promise.resolve({
      success: true,
      userId
    })
  },

  getUserStats: async () => {
    // Mock user statistics
    return Promise.resolve({
      total: 150,
      active: 142,
      inactive: 8,
      admins: 3,
      users: 147
    })
  }
}