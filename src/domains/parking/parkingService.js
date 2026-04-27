// domains/parking/parkingService.js
// Parking management API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const parkingService = {
  getParkingSpots: async () => {
    // Mock parking spots data
    return Promise.resolve([
      { id: 1, spot: 'A01', status: 'available', type: 'car' },
      { id: 2, spot: 'A02', status: 'occupied', type: 'car', vehicle: '29A-12345' },
      { id: 3, spot: 'B01', status: 'available', type: 'motorcycle' },
      { id: 4, spot: 'B02', status: 'reserved', type: 'motorcycle' },
    ])
  },

  getParkingHistory: async (userId) => {
    // Mock parking history
    return Promise.resolve([
      {
        id: 1,
        spot: 'A01',
        vehicle: '29A-12345',
        entryTime: '2024-01-15T08:00:00Z',
        exitTime: '2024-01-15T17:00:00Z',
        duration: '9 hours',
        cost: 45000
      },
      {
        id: 2,
        spot: 'B02',
        vehicle: '29A-67890',
        entryTime: '2024-01-14T09:00:00Z',
        exitTime: '2024-01-14T16:00:00Z',
        duration: '7 hours',
        cost: 35000
      }
    ])
  },

  enterParking: async (spotId, vehicleNumber) => {
    // Mock entry
    return Promise.resolve({
      success: true,
      ticket: {
        id: Date.now(),
        spot: spotId,
        vehicle: vehicleNumber,
        entryTime: new Date().toISOString()
      }
    })
  },

  exitParking: async (ticketId) => {
    // Mock exit
    return Promise.resolve({
      success: true,
      cost: 45000,
      duration: '9 hours'
    })
  }
}