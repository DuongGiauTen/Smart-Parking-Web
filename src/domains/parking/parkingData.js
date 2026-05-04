export const REGISTERED_USERS = [
  {
    card: 'USER_01',
    name: 'Trần Minh Hoàng',
    role: 'Sinh viên chính quy',
    id: '2110432',
    group: 'Sinh viên chính quy',
    unit: 'Khoa Khoa học và Kỹ thuật Máy tính',
    vehicle: '51A - 992.42',
    vehicleType: 'Ô tô (Sedan 4 chỗ)',
    plate: '51A - 992.42',
    entryTime: '09:42:15',
  },
  {
    card: 'USER_02',
    name: 'Lê Thị Mai',
    role: 'Giảng viên',
    id: '1004521',
    group: 'Giảng viên chính quy',
    unit: 'Khoa Công nghệ Thông tin',
    vehicle: '29C - 112.55',
    vehicleType: 'Ô tô (SUV)',
    entryTime: '09:35:22',
  },
  {
    card: 'USER_03',
    name: 'Phạm Văn Cường',
    role: 'Nhân viên',
    id: 'SEC-082',
    group: 'Nhân viên an ninh',
    unit: 'Ban Quản lý Bãi xe',
    vehicle: '77B - 222.11',
    vehicleType: 'Xe máy',
    entryTime: '09:15:33',
  },
  {
    card: 'USER_04',
    name: 'Đỗ Kim Ngân',
    role: 'Khách',
    id: 'GUEST-005',
    group: 'Khách vãng lai',
    unit: 'Phòng đón tiếp',
    vehicle: '60A - 888.77',
    vehicleType: 'Xe tải nhẹ',
    entryTime: '09:28:01',
  },
]

const activeSessions = []

export const parkingData = {
  getRegisteredUsers: () => REGISTERED_USERS,
  getActiveSession: (card) => activeSessions.find((session) => session.card === card),
  createEntrySession: (user) => {
    let session = activeSessions.find((item) => item.card === user.card)
    if (!session) {
      session = {
        card: user.card,
        user,
        timeIn: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
      }
      activeSessions.push(session)
    }
    return session
  },
  closeSession: (card) => {
    const index = activeSessions.findIndex((session) => session.card === card)
    if (index === -1) return null
    return activeSessions.splice(index, 1)[0]
  },
  getActiveSessions: () => [...activeSessions],
}
