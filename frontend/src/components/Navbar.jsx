import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out!')
      navigate('/')
    } catch {
      toast.error('Logout failed')
    }
  }

  // Shared style for nav link buttons (Dashboard, Notes)
  const navLink = "text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all"

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b-2 border-black">
      <Link to="/" className="font-head text-2xl font-extrabold">
        Plan<span className="text-[#5B00F0]">Pad</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Page links — same style */}
        <Link to="/dashboard" className={navLink}>📋 Tasks</Link>
        <Link to="/notes"     className={navLink}>📝 Notes</Link>

        {/* Divider */}
        <span className="w-px h-6 bg-gray-200 mx-1" />

        {/* Profile — avatar + name */}
        <Link
          to="/profile"
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all"
        >
          <span className="w-5 h-5 rounded-full bg-[#5B00F0] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </span>
          <span className="hidden sm:block">{user?.name}</span>
        </Link>

        {/* Logout — filled red-ish to stand out as a destructive action */}
        <button
          onClick={handleLogout}
          className="text-sm font-semibold px-4 py-2 border-2 border-black rounded-lg bg-[#0A0A0A] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}