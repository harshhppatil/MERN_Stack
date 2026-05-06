import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout }            = useAuth()
  const { cartCount }               = useCart()
  const navigate                    = useNavigate()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setDropdownOpen(false)
    navigate('/')
  }

  const navLink = ({ isActive }) =>
    `text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
      isActive ? 'text-[#8b6f47]' : 'text-[#8a7060] hover:text-[#8b6f47]'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#8b6f47]/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold text-[#8b6f47] tracking-tight">
          Loops <span className="italic text-[#c8888e]">&</span> Looms
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li><NavLink to="/shop" className={navLink}>Shop</NavLink></li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-[#8b6f47] hover:bg-[#c4714a] text-white text-xs font-bold tracking-wider px-4 py-2 rounded-full transition-all duration-200"
          >
            <span>🛍</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#e8b4b8] text-[#7a3a3e] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User — logged in */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 text-sm text-[#8b6f47] font-medium hover:text-[#c4714a] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#e8b4b8] flex items-center justify-center text-[#7a3a3e] font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs tracking-wide">{user.name.split(' ')[0]}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-[#8b6f47]/10 overflow-hidden">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-3 text-sm text-[#3d2e22] hover:bg-[#faf7f2] transition-colors">
                    👤 My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-3 text-sm text-[#3d2e22] hover:bg-[#faf7f2] transition-colors">
                    📦 My Orders
                  </Link>
                  <hr className="border-[#8b6f47]/10" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#faf7f2] transition-colors">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-xs font-bold tracking-widest uppercase text-[#8b6f47] hover:text-[#c4714a] transition-colors">
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden text-[#8b6f47] text-xl ml-1" onClick={() => setMenuOpen((p) => !p)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-t border-[#8b6f47]/10 px-6 py-4 flex flex-col gap-4">
          <NavLink to="/shop" onClick={() => setMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#8a7060] hover:text-[#8b6f47]">Shop</NavLink>
          {user && (
            <>
              <NavLink to="/orders"  onClick={() => setMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#8a7060] hover:text-[#8b6f47]">My Orders</NavLink>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#8a7060] hover:text-[#8b6f47]">Profile</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  )
}