import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!', timestamp: new Date() })
})

// Sample API for pricing (will be integrated later)
app.get('/api/pricing', (req, res) => {
  res.json({
    policies: [
      { name: 'Sinh viên HCMUT', price: 5000, unit: 'VNĐ/giờ' },
      { name: 'Cán bộ - Giảng viên', price: 8000, unit: 'VNĐ/giờ' },
      { name: 'Khách vãng lai', price: 15000, unit: 'VNĐ/giờ' }
    ]
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`)
})
