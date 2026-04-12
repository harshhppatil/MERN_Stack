import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
        CinemaStack
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/movies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Movies
        </Link>
        {user ? (
          <>
            <span className="text-sm text-gray-400">Hi, {user.name}</span>
            <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar