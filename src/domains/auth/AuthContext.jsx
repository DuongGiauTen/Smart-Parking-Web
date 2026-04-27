// ============================================================
// AUTH CONTEXT - Quản lý trạng thái đăng nhập & phân quyền
// ============================================================
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS = {
  'admin@hcmut.edu.vn': { password: 'admin123', role: 'admin', name: 'Admin HCMUT', title: 'Quản trị viên hệ thống' },
  'user@hcmut.edu.vn':  { password: 'user123',  role: 'user',  name: 'Trần Minh Dương', title: 'Sinh viên HCMUT · MSSV 2310609' },
  'staff@hcmut.edu.vn': { password: 'staff123', role: 'admin', name: 'Phạm Công Võ', title: 'Giảng viên HCMUT' },
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bkparking_auth')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const login = (email, password) => {
    const user = USERS[email.toLowerCase()]
    if (user && user.password === password) {
      const session = { email, role: user.role, name: user.name, title: user.title }
      setAuth(session)
      sessionStorage.setItem('bkparking_auth', JSON.stringify(session))
      return { success: true, role: user.role }
    }
    return { success: false }
  }

  const logout = () => {
    setAuth(null)
    sessionStorage.removeItem('bkparking_auth')
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin: auth?.role === 'admin', isUser: auth?.role === 'user' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
