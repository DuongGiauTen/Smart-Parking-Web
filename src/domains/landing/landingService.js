// domains/landing/landingService.js
// Landing page data API calls

const API_BASE_URL = 'http://localhost:5000/api'

export const landingService = {
  getFeatures: async () => {
    // Mock features data
    return Promise.resolve([
      {
        id: 1,
        title: 'Smart Parking',
        description: 'Automated entry and exit with IoT sensors',
        icon: '🚗'
      },
      {
        id: 2,
        title: 'Real-time Monitoring',
        description: 'Live parking map and availability tracking',
        icon: '📍'
      },
      {
        id: 3,
        title: 'Secure Payments',
        description: 'Integrated BKPay for seamless transactions',
        icon: '💳'
      },
      {
        id: 4,
        title: 'Mobile Access',
        description: 'Access your parking data anywhere, anytime',
        icon: '📱'
      }
    ])
  },

  getStats: async () => {
    // Mock statistics
    return Promise.resolve({
      totalSpots: 200,
      activeUsers: 150,
      totalRevenue: '1.2M VND',
      uptime: '99.9%'
    })
  },

  getTestimonials: async () => {
    // Mock testimonials
    return Promise.resolve([
      {
        id: 1,
        name: 'Trần Minh Dương',
        role: 'Sinh viên HCMUT',
        content: 'BK Parking makes finding parking spots so much easier!',
        rating: 5
      },
      {
        id: 2,
        name: 'Phạm Công Võ',
        role: 'Giảng viên HCMUT',
        content: 'Excellent system for managing campus parking.',
        rating: 5
      }
    ])
  }
}