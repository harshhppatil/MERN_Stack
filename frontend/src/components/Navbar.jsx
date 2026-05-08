import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'glass border-b border-tide/10'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-[72px] grid grid-cols-3 items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tide to-tide-deep flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">W</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-tide/30 animate-ping opacity-0 group-hover:opacity-100" />
          </div>
          <span className="font-display text-2xl font-semibold text-foam tracking-wide">
            Wild<span className="text-tide">Tide</span>
          </span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center justify-center gap-8">
          <NavLink to="/destinations">Destinations</NavLink>
          <NavLink to="/tours">Expeditions</NavLink>
          <NavLink to="/species">Wildlife</NavLink>
        </div>

        {/* Right Auth */}
        <div className="flex items-center gap-4 justify-end">
          {user ? (
            <>
              {/* Wishlist icon */}
              <Link
                to="/wishlist"
                className="text-mist hover:text-tide transition-colors duration-200 no-underline"
                title="My Wishlist"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </Link>
              {/* Bookings */}
              <Link
                to="/my-bookings"
                className="text-mist text-xs tracking-widest uppercase font-sans hover:text-tide transition-colors duration-200 no-underline hidden md:block"
              >
                Bookings
              </Link>
              {/* Profile */}
              <Link
                to="/profile"
                className="text-xs tracking-widest uppercase font-sans no-underline px-4 py-2 border border-tide/20 text-mist hover:border-tide hover:text-tide transition-all duration-200"
              >
                {user.name.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs tracking-widest uppercase font-sans text-mist/50 hover:text-red-400 transition-colors duration-200"
              >
                Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-mist text-sm font-sans hover:text-foam transition-colors duration-200 no-underline"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-tide text-white text-xs font-semibold px-5 py-2.5 font-sans hover:bg-tide-light transition-colors duration-200 no-underline tracking-wider"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)

  return (
    <Link
      to={to}
      className={`text-xs tracking-[0.12em] uppercase font-sans font-medium transition-all duration-200 no-underline relative group ${
        isActive ? 'text-tide' : 'text-mist hover:text-foam'
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-px bg-tide transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </Link>
  )
}

export default Navbar