import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-dark/95 backdrop-blur-md border-b border-border'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-[72px] grid grid-cols-3 items-center">

        {/* Logo — left */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 bg-gradient-to-br from-gold to-gold-light rounded-md flex items-center justify-center font-display font-bold text-dark text-lg">
            A
          </div>
          <span className="font-display text-2xl font-semibold text-white tracking-wide">
            Auto<span className="text-gold">Vault</span>
          </span>
        </Link>

        {/* Nav Links — perfectly centered */}
        <div className="hidden md:flex items-center justify-center gap-8">
          <NavLink to="/cars">Fleet</NavLink>
          {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
        </div>

        {/* Auth — right */}
        <div className="flex items-center gap-4 justify-end">
          {user ? (
            <>
              <NavLink to="/profile">{user.name}</NavLink>
              <button
                onClick={handleLogout}
                className="border border-border text-muted px-5 py-2 rounded text-xs tracking-widest uppercase font-sans hover:border-gold hover:text-gold transition-all duration-200"
              >
                Logout
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
                className="bg-gradient-to-r from-gold to-gold-light text-dark text-xs font-semibold px-5 py-2.5 rounded tracking-widest uppercase font-sans hover:opacity-85 transition-opacity duration-200 no-underline"
              >
                Get Started
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
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`text-xs tracking-widest uppercase font-sans font-medium transition-colors duration-200 no-underline pb-0.5 ${
        isActive
          ? 'text-gold border-b border-gold'
          : 'text-muted hover:text-white border-b border-transparent'
      }`}
    >
      {children}
    </Link>
  )
}

export default Navbar