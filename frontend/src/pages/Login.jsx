import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const location    = useLocation()

  // redirect back to where they came from, or home
  const from = location.state?.from?.pathname || '/'

  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) return setError('Please fill in all fields.')

    try {
      setLoading(true)
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(61,46,34,0.10)] p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="font-serif text-2xl font-bold text-[#8b6f47]">
              Loops <span className="italic text-[#c8888e]">&</span> Looms
            </Link>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#c8888e] mt-3 mb-1">✦ Welcome Back</p>
            <h1 className="font-serif text-2xl font-bold text-[#3d2e22]">Login to your account</h1>
            <p className="text-xs text-[#8a7060] mt-1">Good to see you again 🌸</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 pr-11 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#8b6f47] text-xs transition-colors"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8b6f47] hover:bg-[#c4714a] text-white py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(139,111,71,0.25)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-xs text-[#8a7060] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#8b6f47] font-semibold hover:text-[#c4714a] transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}