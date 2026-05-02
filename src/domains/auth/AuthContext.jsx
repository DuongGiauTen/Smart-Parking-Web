// ============================================================
// AUTH CONTEXT - Quản lý trạng thái đăng nhập & phân quyền
// ============================================================
import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from './authService'

const AuthContext = createContext(null)

const USERS = {
  'admin@hcmut.edu.vn': { password: 'admin123', role: 'admin', name: 'Admin HCMUT', title: 'Quản trị viên hệ thống' },
  'user@hcmut.edu.vn':  { password: 'user123',  role: 'user',  name: 'Trần Minh Dương', title: 'Sinh viên HCMUT · MSSV 2310609' },
  'staff@hcmut.edu.vn': { password: 'staff123', role: 'staff', name: 'Phạm Công Võ', title: 'Nhân viên bãi đậu xe' },
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bkparking_auth')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password)
      const session = { ...result.user, token: result.token }
      setAuth(session)
      sessionStorage.setItem('bkparking_auth', JSON.stringify(session))
      return { success: true, role: result.user.role }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setAuth(null)
    sessionStorage.removeItem('bkparking_auth')
  }

  useEffect(() => {
    const loadUser = async () => {
      const saved = sessionStorage.getItem('bkparking_auth')
      if (saved) {
        const session = JSON.parse(saved)
        if (session.token) {
          try {
            const user = await authService.getCurrentUser(session.token)
            setAuth({ ...user, token: session.token })
          } catch {
            // Token invalid, clear
            sessionStorage.removeItem('bkparking_auth')
            setAuth(null)
          }
        }
      }
    }
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin: auth?.role === 'admin', isUser: auth?.role === 'user', isStaff: auth?.role === 'staff' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
