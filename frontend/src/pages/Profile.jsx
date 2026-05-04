import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { confirmToast } from '../utils/confirmToast'
import Navbar from '../components/Navbar'

export default function Profile() {
  const { user, logout, refreshUser } = useAuth()
  const navigate = useNavigate()

  // Name update
  const [name, setName]         = useState(user?.name || '')
  const [nameLoading, setNL]    = useState(false)

  // Password update
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwLoading, setPwL] = useState(false)
  const [pwError, setPwErr] = useState('')

  // Stats
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/todos').then(({ data }) => {
      setStats({
        total:      data.length,
        pending:    data.filter(t => t.status === 'pending').length,
        inProgress: data.filter(t => t.status === 'in-progress').length,
        completed:  data.filter(t => t.status === 'completed').length,
        high:       data.filter(t => t.priority === 'high').length,
        overdue:    data.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
      })
    }).catch(() => {})
  }, [])

  const handleNameSave = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setNL(true)
    try {
      await api.put('/users/profile', { name })
      await refreshUser()
      toast.success('Name updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update name')
    } finally {
      setNL(false)
    }
  }

  const setPw = (f) => (e) => setPwForm(p => ({ ...p, [f]: e.target.value }))

  const handlePasswordSave = async (e) => {
    e.preventDefault()
    setPwErr('')
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      return setPwErr('New passwords do not match')
    }
    if (pwForm.newPassword.length < 6) {
      return setPwErr('Password must be at least 6 characters')
    }
    setPwL(true)
    try {
      await api.put('/users/profile', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      toast.success('Password updated!')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPwErr(err.response?.data?.message || 'Failed to update password')
    } finally {
      setPwL(false)
    }
  }

  const handleDeleteAccount = async () => {
    const ok = await confirmToast(
      'Permanently delete your account and all todos?',
      { confirmLabel: 'Yes, delete everything', confirmColor: '#DC2626' }
    )
    if (!ok) return
    try {
      await api.delete('/users/profile')
      await logout()
      toast.success('Account deleted.')
      navigate('/')
    } catch {
      toast.error('Failed to delete account')
    }
  }

  const inputCls = "w-full border-2 border-black rounded-lg px-3.5 py-2.5 text-sm font-medium bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"
  const cardCls  = "bg-white border-2 border-black rounded-2xl brutal-lg p-7"

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      <Navbar />

      <main className="max-w-2xl mx-auto px-5 py-10 flex flex-col gap-6">
        {/* Back */}
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm font-semibold hover:text-[#5B00F0] transition-colors cursor-pointer w-fit">
          ← Back to Dashboard
        </button>

        {/* Header card */}
        <div className={cardCls}>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#5B00F0] border-2 border-black flex items-center justify-center text-white font-head text-2xl font-extrabold flex-shrink-0 brutal">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="font-head text-2xl font-extrabold">{user?.name}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 text-xs font-bold bg-[#EDE9FF] text-[#5B00F0] border border-[#5B00F0] rounded px-2 py-0.5 capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className={cardCls}>
            <h2 className="font-head text-lg font-extrabold mb-5">Your Stats</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Todos',  value: stats.total,      color: 'text-[#5B00F0]' },
                { label: 'Completed',    value: stats.completed,  color: 'text-green-600'  },
                { label: 'In Progress',  value: stats.inProgress, color: 'text-blue-600'   },
                { label: 'Pending',      value: stats.pending,    color: 'text-orange-500' },
                { label: 'High Priority',value: stats.high,       color: 'text-red-500'    },
                { label: 'Overdue',      value: stats.overdue,    color: 'text-red-600'    },
              ].map(s => (
                <div key={s.label} className="border-2 border-black rounded-xl p-3 text-center hover:-translate-y-0.5 hover:brutal-sm transition-all">
                  <p className={`font-head text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Update name */}
        <div className={cardCls}>
          <h2 className="font-head text-lg font-extrabold mb-5">Update Name</h2>
          <form onSubmit={handleNameSave} className="flex gap-3">
            <input className={inputCls} value={name} onChange={e => setName(e.target.value)}
              placeholder="Your name" required />
            <button type="submit" disabled={nameLoading || name === user?.name}
              className="px-5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex-shrink-0">
              {nameLoading ? 'Saving…' : 'Save'}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">📧 {user?.email} — email cannot be changed</p>
        </div>

        {/* Change password */}
        <div className={cardCls}>
          <h2 className="font-head text-lg font-extrabold mb-5">Change Password</h2>
          <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Current Password</label>
              <input className={inputCls} type="password" placeholder="••••••••"
                value={pwForm.currentPassword} onChange={setPw('currentPassword')} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">New Password</label>
              <input className={inputCls} type="password" placeholder="Min 6 characters"
                value={pwForm.newPassword} onChange={setPw('newPassword')} required minLength={6} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Confirm New Password</label>
              <input className={inputCls} type="password" placeholder="Repeat new password"
                value={pwForm.confirmPassword} onChange={setPw('confirmPassword')} required />
            </div>
            {pwError && <p className="text-sm font-semibold text-red-500">⚠ {pwError}</p>}
            <button type="submit" disabled={pwLoading}
              className="w-full py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              {pwLoading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Danger zone */}
        <div className="bg-white border-2 border-red-500 rounded-2xl p-7" style={{ boxShadow: '4px 4px 0 #EF4444' }}>
          <h2 className="font-head text-lg font-extrabold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-5">
            Deleting your account is permanent. All your todos will be erased and cannot be recovered.
          </p>
          <button onClick={handleDeleteAccount}
            className="px-5 py-2.5 text-sm font-bold border-2 border-red-500 rounded-xl bg-red-500 text-white hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
            style={{ ':hover': { boxShadow: '4px 4px 0 #991B1B' } }}>
            🗑 Delete My Account
          </button>
        </div>
      </main>
    </div>
  )
}