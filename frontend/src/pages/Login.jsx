import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import bladeRunnerBg from '../assets/images/blade-runner.jpg'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bladeRunnerBg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative w-full max-w-lg bg-black/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login to CinemaStack</h2>
        {error && <p className="bg-red-500/20 text-red-400 text-sm mb-4 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-600/40 shadow-red-600/20"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-6 text-center">
          No account?{' '}
          <Link to="/register" className="text-red-500 hover:underline font-medium">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login