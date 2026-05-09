import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-10 h-[68px] grid grid-cols-3 items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="relative w-8 h-8 rounded-full border border-bio/40 flex items-center justify-center group-hover:border-bio transition-all duration-300"
            style={{ boxShadow: 'none' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 12px rgba(57,255,20,0.4)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <span className="font-display font-bold text-sm text-bio">W</span>
          </div>
          <span className="font-display font-semibold text-xl text-white tracking-wide">
            Wild<span className="text-bio">Tide</span>
          </span>
        </Link>

        {/* Center Nav */}
        <div className="flex items-center justify-center gap-10">
          <NavLink to="/destinations">Destinations</NavLink>
          <NavLink to="/tours">Expeditions</NavLink>
          <NavLink to="/species">Wildlife</NavLink>
        </div>

        {/* Auth */}
        <div className="flex items-center justify-end gap-5">
          {user ? (
            <>
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-muted hover:text-bio transition-colors duration-200 no-underline"
                title="Wishlist"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </Link>
              {/* Bookings */}
              <Link
                to="/my-bookings"
                className="text-muted text-xs tracking-widest uppercase font-sans hover:text-white transition-colors duration-200 no-underline"
              >
                Bookings
              </Link>
              {/* Profile */}
              <Link
                to="/profile"
                className="btn-bio text-xs tracking-widest uppercase font-sans px-4 py-2 no-underline"
              >
                {user.name.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="text-muted/50 text-xs tracking-widest uppercase font-sans hover:text-red-500 transition-colors duration-200"
              >
                Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-muted text-sm font-sans hover:text-white transition-colors duration-200 no-underline"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-bio text-xs font-semibold px-5 py-2.5 font-sans no-underline tracking-wider"
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
      className={`relative text-xs tracking-[0.15em] uppercase font-sans font-medium no-underline transition-colors duration-200 group ${
        isActive ? 'text-bio' : 'text-muted hover:text-white'
      }`}
    >
      {children}
      <span className={`absolute -bottom-0.5 left-0 h-px bg-bio transition-all duration-300 ${
        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
      }`}
        style={{ boxShadow: '0 0 6px rgba(57,255,20,0.8)' }}
      />
    </Link>
  )
}

export default Navbar