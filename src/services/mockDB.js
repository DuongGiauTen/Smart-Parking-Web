// Single source of truth for all parking data with localStorage persistence
// This replaces backend API calls with in-memory data that survives page reloads

const DB_KEY = 'bkparking_mockdb'
const DEFAULT_DB = {
  users: {
    'admin@hcmut.edu.vn': {
      email: 'admin@hcmut.edu.vn',
      password: 'admin123',
      role: 'admin',
      name: 'Admin HCMUT',
      title: 'Quản trị viên hệ thống',
      balance: 500000,
      unpaidBalance: 0,
    },
    'user@hcmut.edu.vn': {
      email: 'user@hcmut.edu.vn',
      contactEmail: 'duongtranminh253@gmail.com',
      password: 'user123',
      role: 'user',
      name: 'Trần Minh Dương',
      title: 'Sinh viên HCMUT · MSSV 2310609',
      vehicle: '51A - 992.42',
      card: 'USER_01',
      balance: 150000,
      unpaidBalance: 0,
    },
    'staff@hcmut.edu.vn': {
      email: 'staff@hcmut.edu.vn',
      password: 'staff123',
      role: 'staff',
      name: 'Phạm Công Võ',
      title: 'Nhân viên bãi đậu xe',
      card: 'USER_03',
      balance: 0,
      unpaidBalance: 0,
    },
  },
  registeredCards: [
    { card: 'USER_01', name: 'Trần Minh Hoàng', group: 'Sinh viên chính quy', unit: 'Khoa CNTT', vehicle: '51A - 992.42', vehicleType: 'Ô tô (Sedan)', role: 'user' },
    { card: 'USER_02', name: 'Lê Thị Mai', group: 'Giảng viên', unit: 'Khoa CNTT', vehicle: '29C - 112.55', vehicleType: 'Ô tô (SUV)', role: 'user' },
    { card: 'USER_03', name: 'Phạm Công Võ', group: 'Nhân viên an ninh', unit: 'Ban QL Bãi xe', vehicle: '77B - 222.11', vehicleType: 'Xe máy', role: 'staff' },
    { card: 'USER_04', name: 'Đỗ Kim Ngân', group: 'Khách vãng lai', unit: 'Phòng đón tiếp', vehicle: '60A - 888.77', vehicleType: 'Xe tải nhẹ', role: 'guest' },
    { card: 'USER_05', name: 'Nguyễn Văn An', group: 'Sinh viên chính quy', unit: 'Khoa Cơ khí', vehicle: '43A - 556.78', vehicleType: 'Xe máy', role: 'user' },
    { card: 'USER_06', name: 'Trương Thị Bích', group: 'Giảng viên', unit: 'Khoa Điện - Điện tử', vehicle: '51G - 234.56', vehicleType: 'Ô tô (Sedan)', role: 'user' },
    { card: 'USER_07', name: 'Hoàng Minh Tuấn', group: 'Cán bộ hành chính', unit: 'Phòng Đào tạo', vehicle: '29B - 789.01', vehicleType: 'Ô tô (Sedan)', role: 'staff' },
    { card: 'USER_08', name: 'Vũ Thị Lan', group: 'Sinh viên chính quy', unit: 'Khoa Xây dựng', vehicle: '51F - 345.67', vehicleType: 'Xe máy', role: 'user' },
    { card: 'USER_09', name: 'Bùi Quốc Hùng', group: 'Nghiên cứu sinh', unit: 'Khoa Vật lý ứng dụng', vehicle: '51K - 456.78', vehicleType: 'Ô tô (SUV)', role: 'user' },
    { card: 'USER_10', name: 'Phan Thị Cẩm Tú', group: 'Khách vãng lai', unit: 'Đối tác hợp tác', vehicle: '79A - 567.89', vehicleType: 'Xe máy', role: 'guest' },
  ],
  zones: [
    { id: 'zone_a1', name: 'Khu A1', capacity: 100, occupied: 42, type: 'car' },
    { id: 'zone_a2', name: 'Khu A2', capacity: 80, occupied: 35, type: 'car' },
    { id: 'zone_b1', name: 'Khu B1', capacity: 150, occupied: 78, type: 'motorcycle' },
  ],
  parkingSessions: [],
  accessLog: [],
  pricing: {
    student: { hourly: 5000, daily: 30000, monthly: 300000 },
    staff: { hourly: 3000, daily: 15000, monthly: 150000 },
    guest: { hourly: 10000, daily: 50000 },
  },
  pendingSync: [],
  guestTickets: [],
  devices: [
    { id: 'gate_a1_in', name: 'Gate A1 Entry', type: 'gate', location: 'Entrance A1', status: 'online' },
    { id: 'gate_a1_out', name: 'Gate A1 Exit', type: 'gate', location: 'Exit A1', status: 'online' },
  ],
}

let db = null

const loadDB = () => {
  if (!db) {
    try {
      const saved = localStorage.getItem(DB_KEY)
      db = saved ? JSON.parse(saved) : { ...DEFAULT_DB }
    } catch (e) {
      console.error('Failed to load DB:', e)
      db = { ...DEFAULT_DB }
    }
  }
  return db
}

const saveDB = () => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  } catch (e) {
    console.error('Failed to save DB:', e)
  }
}

export const mockDB = {
  // User authentication
  authenticateUser: (email, password) => {
    const user = db.users[email]
    if (user && user.password === password) {
      return { success: true, user: { email, role: user.role, name: user.name, title: user.title } }
    }
    return { success: false, error: 'Invalid credentials' }
  },

  getCurrentUser: (email) => {
    const user = db.users[email]
    return user ? { email, role: user.role, name: user.name, title: user.title, balance: user.balance } : null
  },

  // Card management
  validateCard: (card) => {
    return db.registeredCards.find(c => c.card === card)
  },

  getCardByNumber: (card) => {
    return db.registeredCards.find(c => c.card === card)
  },

  // Parking sessions (UC-02)
  createParkingSession: (card, zone = 'zone_a1') => {
    const cardInfo = mockDB.validateCard(card)
    if (!cardInfo) return { success: false, error: 'Card not registered' }

    const zone_info = db.zones.find(z => z.id === zone)
    if (!zone_info || zone_info.occupied >= zone_info.capacity) {
      return { success: false, error: 'Zone is full or invalid' }
    }

    const session = {
      id: `SESSION_${Date.now()}`,
      card,
      vehicle: cardInfo.vehicle,
      vehicleType: cardInfo.vehicleType,
      zone,
      entryTime: new Date().toISOString(),
      exitTime: null,
      fee: 0,
      status: 'active',
      userRole: cardInfo.role,
    }

    db.parkingSessions.push(session)
    zone_info.occupied++
    saveDB()

    mockDB.logAccess('ENTRY', card, cardInfo.vehicle, 'SUCCESS', session.id)

    return { success: true, session }
  },

  endParkingSession: (sessionId, paymentMethod = 'cash') => {
    const session = db.parkingSessions.find(s => s.id === sessionId)
    if (!session || session.status !== 'active') {
      return { success: false, error: 'Session not found or already closed' }
    }

    session.exitTime = new Date().toISOString()
    session.status = 'completed'
    session.paymentMethod = paymentMethod

    const entryTime = new Date(session.entryTime)
    const exitTime = new Date(session.exitTime)
    const hours = Math.max(1, Math.ceil((exitTime - entryTime) / (1000 * 60 * 60)))

    const pricing = db.pricing[session.userRole] || db.pricing.guest
    session.fee = pricing.hourly * hours

    const zone = db.zones.find(z => z.id === session.zone)
    if (zone) zone.occupied = Math.max(0, zone.occupied - 1)

    saveDB()

    mockDB.logAccess('EXIT', session.card, session.vehicle, 'SUCCESS', sessionId)

    return { success: true, session, fee: session.fee }
  },

  // Open a new session without re-validating (validation done by service layer)
  openParkingSession: (cardInfo, zone = 'zone_a1') => {
    const zone_info = db.zones.find(z => z.id === zone)
    if (!zone_info) return { success: false, error: 'Zone not found' }

    const session = {
      id: `SESSION_${Date.now()}`,
      card: cardInfo.card,
      vehicle: cardInfo.vehicle,
      vehicleType: cardInfo.vehicleType,
      zone,
      entryTime: new Date().toISOString(),
      exitTime: null,
      fee: 0,
      status: 'active',
      userRole: cardInfo.role,
    }

    db.parkingSessions.push(session)
    zone_info.occupied++
    saveDB()

    mockDB.logAccess('ENTRY', cardInfo.card, cardInfo.vehicle, 'SUCCESS', session.id)

    return { success: true, session }
  },

  // Create a session in offline mode — no validation, no capacity check (AF2)
  openParkingSessionOffline: (cardId, cardInfo = null, zone = 'zone_a1') => {
    const info = cardInfo || { card: cardId, vehicle: 'UNKNOWN', vehicleType: 'Không xác định', role: 'guest' }

    const session = {
      id: `SESSION_OFF_${Date.now()}`,
      card: cardId,
      vehicle: info.vehicle,
      vehicleType: info.vehicleType,
      zone,
      entryTime: new Date().toISOString(),
      exitTime: null,
      fee: 0,
      status: 'active',
      userRole: info.role,
      isOffline: true,
    }

    db.parkingSessions.push(session)
    saveDB()

    mockDB.addPendingSync({ action: 'ENTRY', card: cardId, vehicle: info.vehicle, sessionId: session.id })

    return { success: true, session }
  },

  getActiveSession: (card) => {
    return db.parkingSessions.find(s => s.card === card && s.status === 'active')
  },

  getSessionById: (sessionId) => {
    return db.parkingSessions.find(s => s.id === sessionId)
  },

  getAllSessions: () => [...db.parkingSessions],

  // Guest temporary tickets (UC-03)
  createGuestTicket: (plate, vehicleType, zone = 'zone_a1') => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const rand = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const ticket = {
      id: `TEMP-${rand}`,
      plate,
      vehicleType,
      zone,
      createdAt: new Date().toISOString(),
      exitTime: null,
      status: 'active',
      fee: 0, // calculated on exit based on actual duration
    }
    // Increment zone slot
    const zone_info = db.zones.find(z => z.id === zone)
    if (zone_info) zone_info.occupied++
    db.guestTickets.push(ticket)
    saveDB()
    return ticket
  },

  getGuestTicket: (ticketId) => {
    return db.guestTickets.find(t => t.id === ticketId)
  },

  getAllGuestTickets: () => [...db.guestTickets],

  expireGuestTicket: (ticketId) => {
    const ticket = db.guestTickets.find(t => t.id === ticketId)
    if (ticket) {
      ticket.exitTime = new Date().toISOString()
      ticket.status = 'expired'
      // Calculate actual fee based on time parked
      const hours = Math.max(1, Math.ceil((new Date(ticket.exitTime) - new Date(ticket.createdAt)) / (1000 * 60 * 60)))
      ticket.fee = db.pricing.guest.hourly * hours
      // Free zone slot
      const zone_info = db.zones.find(z => z.id === ticket.zone)
      if (zone_info) zone_info.occupied = Math.max(0, zone_info.occupied - 1)
      saveDB()
    }
    return ticket
  },

  // Access logging (UC-02, UC-03)
  logAccess: (action, card, plate, result, sessionId = null) => {
    const log = {
      timestamp: new Date().toISOString(),
      action,
      card,
      plate,
      result,
      sessionId,
    }
    db.accessLog.push(log)
    if (db.accessLog.length > 1000) db.accessLog.shift()
    saveDB()
    return log
  },

  getAccessLog: (limit = 50) => {
    return db.accessLog.slice(-limit).reverse()
  },

  // Zone management
  getZones: () => [...db.zones],

  getZoneCapacity: (zoneId) => {
    const zone = db.zones.find(z => z.id === zoneId)
    return zone ? { capacity: zone.capacity, occupied: zone.occupied, available: zone.capacity - zone.occupied } : null
  },

  // Pricing
  getPricing: () => ({ ...db.pricing }),

  calculateFee: (userRole, hours) => {
    const pricing = db.pricing[userRole] || db.pricing.guest
    return pricing.hourly * hours
  },

  // Find user linked to a registered card
  getUserByCard: (cardId) => {
    return Object.values(db.users).find(u => u.card === cardId) || null
  },

  // Add to unpaid balance of the user who owns this card
  addUnpaidBalance: (cardId, amount) => {
    const user = Object.values(db.users).find(u => u.card === cardId)
    if (user) {
      user.unpaidBalance = (user.unpaidBalance || 0) + amount
      saveDB()
      return user.unpaidBalance
    }
    return null
  },

  // Get sessions with unpaid debt for a user (by email)
  getDebtSessions: (email) => {
    const user = db.users[email]
    if (!user || !user.card) return []
    return db.parkingSessions.filter(s => s.card === user.card && s.status === 'completed' && s.paymentMethod === 'debt')
  },

  // Mark a completed debt session as paid, reduce unpaidBalance
  markSessionPaid: (sessionId, email) => {
    const session = db.parkingSessions.find(s => s.id === sessionId)
    if (!session || session.paymentMethod !== 'debt') return false
    session.paymentMethod = 'paid'
    const user = db.users[email]
    if (user) {
      user.unpaidBalance = Math.max(0, (user.unpaidBalance || 0) - session.fee)
    }
    saveDB()
    return true
  },

  // Get all completed sessions (paid + debt) for transaction history
  getCompletedSessions: (email) => {
    const user = db.users[email]
    if (!user || !user.card) return []
    return db.parkingSessions
      .filter(s => s.card === user.card && s.status === 'completed')
      .slice(-20)
      .reverse()
  },

  // Get user's card info
  getUserCard: (email) => {
    const user = db.users[email]
    return user?.card || null
  },

  // Get user's contact email (may differ from login email)
  getContactEmail: (email) => {
    const user = db.users[email]
    return user?.contactEmail || email
  },

  // User balance (for BK-PAY)
  getUserBalance: (email) => {
    const user = db.users[email]
    return user ? user.balance : 0
  },

  updateUserBalance: (email, amount) => {
    const user = db.users[email]
    if (user) {
      user.balance += amount
      saveDB()
      return user.balance
    }
    return null
  },

  // Offline sync
  getPendingSync: () => [...db.pendingSync],

  addPendingSync: (action) => {
    db.pendingSync.push({ ...action, timestamp: new Date().toISOString() })
    saveDB()
  },

  clearPendingSync: () => {
    db.pendingSync = []
    saveDB()
  },

  // Device management
  getDevices: () => [...db.devices],

  updateDeviceStatus: (deviceId, status) => {
    const device = db.devices.find(d => d.id === deviceId)
    if (device) {
      device.status = status
      saveDB()
    }
    return device
  },

  // Reset data (for testing)
  resetDB: () => {
    db = { ...DEFAULT_DB }
    try {
      localStorage.removeItem(DB_KEY)
    } catch (e) {
      console.error('Failed to clear DB:', e)
    }
  },

  // Initialize on first load
  init: () => loadDB(),
}

// Load DB on module import
mockDB.init()
