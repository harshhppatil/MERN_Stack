import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name:    user?.name             || '',
    phone:   user?.phone            || '',
    street:  user?.address?.street  || '',
    city:    user?.address?.city    || '',
    state:   user?.address?.state   || '',
    pincode: user?.address?.pincode || '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError]     = useState('')

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      setLoading(true)
      const { data } = await api.put('/users/profile', {
        name:  form.name,
        phone: form.phone,
        address: {
          street:  form.street,
          city:    form.city,
          state:   form.state,
          pincode: form.pincode,
        },
      })
      updateUser(data)
      setSuccess('Profile updated successfully! 🌸')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const inputClass = "w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors bg-white"
  const labelClass = "text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5"

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2]">

      {/* USER BANNER */}
      <div className="bg-gradient-to-br from-[#f5ede4] to-[#fdf0f0] py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="w-20 h-20 rounded-full bg-[#e8b4b8] flex items-center justify-center text-[#7a3a3e] font-bold text-3xl flex-shrink-0 shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#c8888e] mb-1">✦ Account</p>
            <h1 className="font-serif text-3xl font-bold text-[#3d2e22]">{user?.name}</h1>
            <p className="text-sm text-[#8a7060] mt-0.5">{user?.email}</p>
            {user?.address?.city && (
              <p className="text-xs text-[#8a7060] mt-0.5">📍 {user.address.city}, {user.address.state}</p>
            )}
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/orders" className="flex items-center gap-2 bg-white border border-[#8b6f47]/20 text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200">
              📦 My Orders
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-white border border-red-200 text-red-400 hover:bg-red-400 hover:text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* EDIT FORM */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(61,46,34,0.08)] overflow-hidden">

  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#8b6f47]/10">

    {/* Personal Info */}
    <div className="p-6">
      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#c8888e] mb-5">Personal Info</p>
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input value={user?.email} disabled className="w-full border border-[#8b6f47]/10 rounded-xl px-4 py-3 text-sm text-[#8a7060] bg-[#faf7f2] cursor-not-allowed" />
          <p className="text-[10px] text-[#8a7060] mt-1 ml-1">Email cannot be changed</p>
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} className={inputClass} />
        </div>
      </div>
    </div>

    {/* Delivery Address */}
    <div className="p-6">
      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#c8888e] mb-5">Delivery Address</p>
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Street Address</label>
          <input name="street" value={form.street} onChange={handleChange} placeholder="House no., Street, Area" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>City</label>
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Pincode</label>
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" maxLength={6} className={inputClass} />
        </div>
      </div>
    </div>

  </div>

  {/* Footer — feedback + save button */}
  <div className="px-6 py-5 border-t border-[#8b6f47]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
    <div className="flex-1">
      {error   && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-[#2d5a2a] font-medium">{success}</p>}
    </div>
    <button type="submit" disabled={loading} className="bg-[#8b6f47] hover:bg-[#c4714a] text-white px-10 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(139,111,71,0.25)] hover:-translate-y-0.5 disabled:opacity-60">
      {loading ? 'Saving...' : 'Save Changes 🌸'}
    </button>
  </div>

</form>
      </div>
    </div>
  )
}