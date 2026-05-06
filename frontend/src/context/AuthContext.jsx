import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true) // true while checking if user is logged in

  // On app load — check if a valid cookie session exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me')
        setUser(data)
      } catch {
        setUser(null) // not logged in
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    setUser(data)
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — use this in any component
export const useAuth = () => useContext(AuthContext)