import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    setUser(data)
    return data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#F7F7F2]">
        <span className="font-head text-4xl font-extrabold tracking-tight">
          Plan<span className="text-[#5B00F0]">Pad</span>
        </span>
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#5B00F0] animate-spin" />
      </div>
    )
  }

  const refreshUser = async () => {
    const { data } = await api.get('/auth/me')
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)