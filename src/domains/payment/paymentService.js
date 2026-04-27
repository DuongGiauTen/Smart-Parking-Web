// domains/payment/paymentService.js
// Payment processing API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const paymentService = {
  getPricing: async () => {
    // Mock pricing data
    return Promise.resolve({
      car: {
        hourly: 5000,
        daily: 50000,
        monthly: 500000
      },
      motorcycle: {
        hourly: 2000,
        daily: 20000,
        monthly: 200000
      }
    })
  },

  getRevenue: async (period = 'month') => {
    // Mock revenue data
    return Promise.resolve({
      total: 1250000,
      transactions: 45,
      average: 27778,
      breakdown: {
        car: 800000,
        motorcycle: 450000
      }
    })
  },

  processPayment: async (amount, method = 'bkpay') => {
    // Mock payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount > 0) {
          resolve({
            success: true,
            transactionId: `TXN_${Date.now()}`,
            amount,
            method,
            timestamp: new Date().toISOString()
          })
        } else {
          reject(new Error('Invalid payment amount'))
        }
      }, 2000)
    })
  },

  getPaymentHistory: async (userId) => {
    // Mock payment history
    return Promise.resolve([
      {
        id: 1,
        amount: 45000,
        method: 'bkpay',
        status: 'completed',
        timestamp: '2024-01-15T17:00:00Z',
        description: 'Parking fee - A01'
      },
      {
        id: 2,
        amount: 35000,
        method: 'bkpay',
        status: 'completed',
        timestamp: '2024-01-14T16:00:00Z',
        description: 'Parking fee - B02'
      }
    ])
  }
}