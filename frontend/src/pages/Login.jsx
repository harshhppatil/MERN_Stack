import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full border-2 border-black rounded-lg px-3.5 py-2.5 text-sm font-medium bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"

  return (
    <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-6">
      <div className="bg-white border-2 border-black rounded-2xl brutal-lg p-10 w-full max-w-md">
        <Link to="/" className="font-head text-3xl font-extrabold mb-1 block">
          Plan<span className="text-[#5B00F0]">Pad</span>
        </Link>
        <h2 className="font-head text-2xl font-bold mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-8">Log in to pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Email</label>
            <input className={inputCls} type="email" placeholder="you@example.com"
              value={form.email} onChange={set('email')} required autoFocus />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Password</label>
            <input className={inputCls} type="password" placeholder="••••••••"
              value={form.password} onChange={set('password')} required />
          </div>

          {error && <p className="text-sm font-semibold text-red-500">⚠ {error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 font-bold text-sm border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            {loading ? 'Logging in…' : 'Login →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#5B00F0] font-semibold hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}