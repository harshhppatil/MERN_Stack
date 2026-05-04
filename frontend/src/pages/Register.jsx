import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.phone, form.address)
      navigate('/dashboard')
      toast.success('Welcome to AutoVault!')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
        setError(msg)
        toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark min-h-screen pt-[72px] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">
              Join AutoVault
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-display font-light text-white text-5xl mb-2">
            Create Account
          </h1>
          <p className="text-muted text-sm font-sans font-light">
            Access the world's finest automotive collection
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

            {/* Name + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Smith"
                  className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Address */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Marine Drive, Mumbai"
                className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-4">
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
                  placeholder="Min 6 characters"
                  className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat password"
                  className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-dark py-4 text-xs font-semibold tracking-[0.15em] uppercase font-sans rounded-sm hover:opacity-85 disabled:opacity-50 transition-all duration-200 mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-[#444] text-xs font-sans mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:underline no-underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register