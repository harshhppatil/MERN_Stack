import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark min-h-screen pt-[72px] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">
              Welcome Back
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-display font-light text-white text-5xl mb-2">
            Sign In
          </h1>
          <p className="text-muted text-sm font-sans font-light">
            Access your AutoVault account
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-[#1a1a1a] bg-card p-8">

          {error && (
            <div className="border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-sans tracking-wide px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Your password"
                className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-dark py-4 text-xs font-semibold tracking-[0.15em] uppercase font-sans rounded-sm hover:opacity-85 disabled:opacity-50 transition-all duration-200 mt-2"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[#444] text-xs font-sans mt-6">
            No account?{' '}
            <Link to="/register" className="text-gold hover:underline no-underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <Link to="/" className="text-[#333] text-xs tracking-widest uppercase font-sans hover:text-muted transition-colors no-underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login