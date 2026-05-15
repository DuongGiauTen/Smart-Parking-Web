// domains/dashboard/dashboardService.js
// Dashboard data API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const dashboardService = {
  getAdminStats: async () => {
    // Mock admin dashboard stats
    return Promise.resolve({
      totalSpots: 200,
      occupiedSpots: 45,
      availableSpots: 155,
      totalRevenue: 1250000,
      todayRevenue: 125000,
      activeUsers: 142,
      onlineDevices: 18,
      alerts: 2
    })
  },

  getUserStats: async (userId) => {
    // Mock user dashboard stats
    return Promise.resolve({
      currentParking: {
        spot: 'A01',
        vehicle: '29A-12345',
        entryTime: '2024-01-15T08:00:00Z',
        duration: '2 hours 30 minutes'
      },
      totalSpent: 125000,
      totalSessions: 12,
      averageSession: '6 hours',
      favoriteSpot: 'A01'
    })
  },

  getRecentActivity: async (limit = 10) => {
    // Mock recent activity
    return Promise.resolve([
      {
        id: 1,
        type: 'entry',
        message: 'Vehicle 29A-12345 entered at Gate A',
        timestamp: '2024-01-15T08:00:00Z',
        user: 'Trần Minh Dương'
      },
      {
        id: 2,
        type: 'payment',
        message: 'Payment of 45,000 VND completed',
        timestamp: '2024-01-15T17:00:00Z',
        user: 'Trần Minh Dương'
      },
      {
        id: 3,
        type: 'exit',
        message: 'Vehicle 29A-12345 exited at Gate B',
        timestamp: '2024-01-15T17:05:00Z',
        user: 'Trần Minh Dương'
      }
    ])
  },

  getAlerts: async () => {
    // Mock alerts
    return Promise.resolve([
      {
        id: 1,
        type: 'warning',
        message: 'Low battery on Gate A sensor',
        timestamp: '2024-01-15T09:15:00Z',
        priority: 'medium'
      },
      {
        id: 2,
        type: 'info',
        message: 'Monthly revenue target achieved',
        timestamp: '2024-01-15T12:00:00Z',
        priority: 'low'
      }
    ])
  }
}