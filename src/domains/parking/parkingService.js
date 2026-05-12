// domains/parking/parkingService.js
// Service layer for gate operations — single source of truth is mockDB
import { mockDB } from '../../services/mockDB'

const DEFAULT_ZONE = 'zone_a1'

export const parkingService = {
  // UC-02A: Entry flow
  // Returns { success, errorCode?, error?, session?, cardInfo?, isOffline? }
  processEntry: (cardId, isSystemOnline = true, zone = DEFAULT_ZONE) => {
    // AF2: Offline — bypass SSO & capacity checks, create local session, open barrier
    if (!isSystemOnline) {
      const cardInfo = mockDB.validateCard(cardId)
      const result = mockDB.openParkingSessionOffline(cardId, cardInfo, zone)
      return { success: true, session: result.session, cardInfo, isOffline: true }
    }

    // EF1a: Validate card via SSO
    const cardInfo = mockDB.validateCard(cardId)
    if (!cardInfo) {
      mockDB.logAccess('ENTRY', cardId, '---', 'EF1a_INVALID_CARD')
      return { success: false, errorCode: 'EF1a', error: 'Thẻ không hợp lệ hoặc chưa đăng ký trong hệ thống' }
    }

    // EF3: Duplicate entry — card already has an active session
    const existingSession = mockDB.getActiveSession(cardId)
    if (existingSession) {
      mockDB.logAccess('ENTRY', cardId, cardInfo.vehicle, 'EF3_DUPLICATE')
      return {
        success: false,
        errorCode: 'EF3',
        error: `Xe ${cardInfo.vehicle} đang đỗ trong bãi. Vui lòng rời bãi qua cổng ra trước.`,
      }
    }

    // EF2a: Check zone capacity
    const capacity = mockDB.getZoneCapacity(zone)
    if (!capacity || capacity.available <= 0) {
      mockDB.logAccess('ENTRY', cardId, cardInfo.vehicle, 'EF2a_ZONE_FULL')
      return { success: false, errorCode: 'EF2a', error: 'Bãi xe đã đầy, không còn vị trí trống' }
    }

    // Success: open session, decrement slot
    const result = mockDB.openParkingSession(cardInfo, zone)
    return { success: true, session: result.session, cardInfo }
  },

  // UC-02B: Exit — calculate fee and determine routing (member vs guest)
  // Returns { success, error?, session?, fee?, cardInfo?, isGuest? }
  processExit: (cardId) => {
    const session = mockDB.getActiveSession(cardId)
    if (!session) {
      return { success: false, error: 'Thẻ chưa vào bãi hoặc phiên đã kết thúc' }
    }

    const cardInfo = mockDB.validateCard(cardId)
    const now = new Date()
    const hours = Math.max(1, Math.ceil((now - new Date(session.entryTime)) / (1000 * 60 * 60)))
    const pricing = mockDB.getPricing()
    const rolePricing = pricing[session.userRole] || pricing.guest
    const fee = rolePricing.hourly * hours
    const isGuest = session.userRole === 'guest'

    return { success: true, session, fee, cardInfo, isGuest }
  },

  // UC-02B Member: Ghi nợ tự động — end session and add fee to unpaidBalance
  completeMemberExit: (sessionId, cardId) => {
    const result = mockDB.endParkingSession(sessionId, 'debt')
    if (!result.success) return result
    mockDB.addUnpaidBalance(cardId, result.fee)
    return { success: true, session: result.session, fee: result.fee }
  },

  // UC-02B Guest (card): Complete exit after payment callback [OK]
  completeGuestExit: (sessionId) => {
    return mockDB.endParkingSession(sessionId, 'cash')
  },

  // UC-03: Guest ticket — calculate fee preview before payment
  // Returns { success, error?, ticket?, fee? }
  processGuestTicketExit: (ticketCode) => {
    const ticket = mockDB.getGuestTicket(ticketCode)
    if (!ticket || ticket.status !== 'active') {
      return { success: false, error: 'Mã thẻ tạm không hợp lệ hoặc đã hết hiệu lực' }
    }
    const now = new Date()
    const hours = Math.max(1, Math.ceil((now - new Date(ticket.createdAt)) / (1000 * 60 * 60)))
    const fee = mockDB.getPricing().guest.hourly * hours
    return { success: true, ticket, fee }
  },

  // UC-03: Complete guest ticket exit after payment — expires ticket, frees slot
  completeGuestTicketExit: (ticketCode) => {
    const ticket = mockDB.expireGuestTicket(ticketCode)
    if (!ticket) return { success: false, error: 'Ticket not found' }
    mockDB.logAccess('EXIT', ticket.id, ticket.plate, 'SUCCESS')
    return { success: true, ticket }
  },
}
