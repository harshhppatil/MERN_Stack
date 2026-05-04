import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load, check if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me')
        setUser(data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
    return data
  }

  const register = async (name, email, password, phone, address) => {
    const { data } = await api.post('/auth/register', {
      name, email, password, phone, address
    })
    setUser(data)
    return data
  }

  const logout = async () => {
  await api.post('/auth/logout')
  setUser(null)
  toast.success('Logged out successfully.')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )

  return (
  <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
    {children}
  </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)