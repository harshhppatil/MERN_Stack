import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user }      = useAuth()
  const { cartCount } = useCart()

  const navLink = ({ isActive }) =>
    `text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
      isActive ? 'text-[#8b6f47]' : 'text-[#8a7060] hover:text-[#8b6f47]'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#8b6f47]/10">
      <div className="w-full px-8 h-16 flex items-center gap-8">

        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold text-[#8b6f47] tracking-tight flex-shrink-0 leading-none">
          Loops <span className="italic text-[#c8888e]">&</span> Looms
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 leading-none translate-y-0.5">
          <NavLink to="/shop" className={navLink}>Shop</NavLink>
          {user && (
            <NavLink to="/orders" className={navLink}>My Orders</NavLink>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-auto">

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

          {user ? (
            <Link
              to="/profile"
              className="text-xs font-bold tracking-widest uppercase text-[#8b6f47] px-4 py-2 rounded-full border border-[#8b6f47]/20 transition-all duration-200"
            >
              👤{user.name.split(' ')[0]}
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-xs font-bold tracking-widest uppercase text-[#8b6f47] hover:text-[#c4714a] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}