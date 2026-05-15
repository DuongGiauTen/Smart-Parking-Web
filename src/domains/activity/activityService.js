// domains/activity/activityService.js
// Activity tracking API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const activityService = {
  getUserActivity: async (userId) => {
    // Mock user activity data
    return Promise.resolve([
      {
        id: 1,
        type: 'parking_entry',
        description: 'Entered parking at Gate A',
        timestamp: '2024-01-15T08:00:00Z',
        location: 'Gate A',
        details: { spot: 'A01', vehicle: '29A-12345' }
      },
      {
        id: 2,
        type: 'payment',
        description: 'Paid parking fee',
        timestamp: '2024-01-15T17:00:00Z',
        location: 'Gate B',
        details: { amount: 45000, method: 'bkpay' }
      },
      {
        id: 3,
        type: 'parking_exit',
        description: 'Exited parking at Gate B',
        timestamp: '2024-01-15T17:05:00Z',
        location: 'Gate B',
        details: { spot: 'A01', duration: '9 hours' }
      }
    ])
  },

  getSystemActivity: async (limit = 100) => {
    // Mock system activity data
    return Promise.resolve([
      {
        id: 1,
        type: 'gate_access',
        description: 'Gate A opened for entry',
        timestamp: '2024-01-15T08:00:00Z',
        user: 'Trần Minh Dương',
        details: { gate: 'A', direction: 'entry' }
      },
      {
        id: 2,
        type: 'payment_processed',
        description: 'Payment processed successfully',
        timestamp: '2024-01-15T17:00:00Z',
        user: 'Trần Minh Dương',
        details: { amount: 45000, transactionId: 'TXN_12345' }
      },
      {
        id: 3,
        type: 'device_alert',
        description: 'Low battery warning - Gate A Sensor',
        timestamp: '2024-01-15T09:15:00Z',
        user: null,
        details: { deviceId: 1, batteryLevel: 15 }
      }
    ])
  },

  logActivity: async (activityData) => {
    // Mock log activity
    return Promise.resolve({
      success: true,
      activity: {
        id: Date.now(),
        ...activityData,
        timestamp: new Date().toISOString()
      }
    })
  }
}