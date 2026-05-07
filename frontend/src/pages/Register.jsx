import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate     = useNavigate()

  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!form.name.trim())    return 'Name is required.'
    if (!form.email.trim())   return 'Email is required.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    if (form.password !== form.confirm) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const err = validate()
    if (err) return setError(err)

    try {
      setLoading(true)
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(61,46,34,0.10)] p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="font-serif text-2xl font-bold text-[#8b6f47]">
              Loops <span className="italic text-[#c8888e]">&</span> Looms
            </Link>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#c8888e] mt-3 mb-1">✦ Welcome</p>
            <h1 className="font-serif text-2xl font-bold text-[#3d2e22]">Create your account</h1>
            <p className="text-xs text-[#8a7060] mt-1">Join us and start shopping handcrafted pieces</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
              />
            </div>

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
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Confirm Password</label>
              <input
                name="confirm"
                type={showPass ? 'text' : 'password'}
                value={form.confirm}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
              />
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
              {loading ? 'Creating account...' : 'Create Account 🌸'}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-xs text-[#8a7060] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#8b6f47] font-semibold hover:text-[#c4714a] transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}