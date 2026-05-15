// domains/iot/iotService.js
// IoT devices management API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const iotService = {
  getDevices: async () => {
    // Mock IoT devices data
    return Promise.resolve([
      {
        id: 1,
        type: 'gate_sensor',
        location: 'Gate A - Entry',
        status: 'online',
        lastSeen: '2024-01-15T10:30:00Z',
        battery: 85
      },
      {
        id: 2,
        type: 'gate_sensor',
        location: 'Gate B - Exit',
        status: 'online',
        lastSeen: '2024-01-15T10:25:00Z',
        battery: 92
      },
      {
        id: 3,
        type: 'parking_sensor',
        location: 'Spot A01',
        status: 'online',
        lastSeen: '2024-01-15T10:28:00Z',
        battery: 78
      },
      {
        id: 4,
        type: 'camera',
        location: 'Gate A',
        status: 'offline',
        lastSeen: '2024-01-15T08:00:00Z',
        battery: null
      }
    ])
  },

  getSignage: async () => {
    // Mock signage data
    return Promise.resolve([
      {
        id: 1,
        location: 'Gate A',
        message: 'Welcome to BK Parking',
        status: 'active'
      },
      {
        id: 2,
        location: 'Gate B',
        message: 'Please pay before exit',
        status: 'active'
      },
      {
        id: 3,
        location: 'Level 1',
        message: '50 spots available',
        status: 'active'
      }
    ])
  },

  updateSignage: async (id, message) => {
    // Mock update signage
    return Promise.resolve({
      success: true,
      id,
      message,
      updatedAt: new Date().toISOString()
    })
  },

  getDeviceLogs: async (deviceId, limit = 50) => {
    // Mock device logs
    return Promise.resolve([
      {
        id: 1,
        deviceId,
        event: 'motion_detected',
        timestamp: '2024-01-15T10:30:00Z',
        data: { confidence: 0.95 }
      },
      {
        id: 2,
        deviceId,
        event: 'battery_low',
        timestamp: '2024-01-15T09:15:00Z',
        data: { level: 15 }
      }
    ])
  }
}