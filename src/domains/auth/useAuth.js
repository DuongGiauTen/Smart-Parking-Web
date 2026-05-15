// domains/auth/useAuth.js
// Authentication hook

import { useState, useEffect, useContext, createContext } from 'react'
import { authService } from './authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem('bkparking_auth')
    if (storedAuth) {
      try {
        setAuth(JSON.parse(storedAuth))
      } catch (error) {
        localStorage.removeItem('bkparking_auth')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password)
      setAuth(result)
      localStorage.setItem('bkparking_auth', JSON.stringify(result))
      return result
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setAuth(null)
      localStorage.removeItem('bkparking_auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isAdmin = auth?.user?.role === 'admin'

  const value = {
    auth,
    login,
    logout,
    isAdmin,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}