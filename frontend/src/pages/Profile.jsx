import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.jsx'

const Profile = () => {
  const { user, setUser, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name:    user?.name    || '',
    phone:   user?.phone   || '',
    address: user?.address || '',
  })
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [error,    setError]    = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSuccess(false)
    setError('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const { data } = await api.put('/users/me', form)
      setUser(data)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you absolutely sure? This cannot be undone.')) return
    setDeleting(true)
    try {
      await api.delete('/users/me')
      await logout()
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed')
      setDeleting(false)
    }
  }

  return (
    <div className="bg-dark min-h-screen pt-[72px]">

      {/* ── HEADER ── */}
      <div className="border-b border-[#1a1a1a] py-16 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">
              Your Account
            </span>
          </div>
          <h1 className="font-display font-light text-white text-6xl">Profile</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12 space-y-6">

        {/* ── ACCOUNT INFO (read-only) ── */}
        <div className="border border-[#1a1a1a] bg-card">
          <div className="px-8 py-5 border-b border-[#1a1a1a]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans">
              Account Details
            </p>
          </div>
          <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadField label="Email" value={user?.email} />
            <ReadField label="Member Since" value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })
                : '—'
            } />
            <ReadField label="Role" value={user?.role === 'admin' ? 'Administrator' : 'Member'} />
            <ReadField label="Account ID" value={user?._id?.slice(-8).toUpperCase()} />
          </div>
        </div>

        {/* ── EDIT PROFILE ── */}
        <div className="border border-[#1a1a1a] bg-card">
          <div className="px-8 py-5 border-b border-[#1a1a1a]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans">
              Edit Profile
            </p>
          </div>
          <form onSubmit={handleSave} className="px-8 py-6 space-y-5">

            {/* Name */}
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
                className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            {/* Phone + Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-4 py-3 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
            </div>

            {/* Feedback */}
            {success && (
              <div className="border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-sans tracking-wide px-4 py-3">
                Profile updated successfully.
              </div>
            )}
            {error && (
              <div className="border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-sans tracking-wide px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-gold to-gold-light text-dark px-10 py-3 text-xs font-semibold tracking-[0.15em] uppercase font-sans rounded-sm hover:opacity-85 disabled:opacity-50 transition-all duration-200"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* ── DELETE ACCOUNT ── */}
        <div className="border border-[#1a1a1a] bg-card">
          <div className="px-8 py-5 border-b border-[#1a1a1a]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-red-500/60 font-sans">
              Remove Account
            </p>
          </div>
          <div className="px-8 py-6 flex items-center justify-between gap-6 flex-wrap">
            <div>
              <p className="text-white text-sm font-sans font-light mb-1">
                Permanently delete your account
              </p>
              <p className="text-[#444] text-xs font-sans">
                All your data and bookings will be removed. This cannot be undone.
              </p>
            </div>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="border border-red-500/20 text-red-500/60 hover:border-red-500/60 hover:text-red-500 px-8 py-3 text-xs tracking-widest uppercase font-sans transition-all duration-200 disabled:opacity-40 shrink-0"
            >
              {deleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

const ReadField = ({ label, value }) => (
  <div>
    <p className="text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">{label}</p>
    <p className="text-white text-sm font-sans font-light">{value || '—'}</p>
  </div>
)

export default Profile