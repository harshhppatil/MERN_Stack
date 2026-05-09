import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="bg-white rounded-2xl p-5 flex gap-4 shadow-[0_2px_12px_rgba(61,46,34,0.06)]">

      {/* Image */}
      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#fdf0f0] to-[#f5ede4] flex items-center justify-center flex-shrink-0 overflow-hidden">
        {item.images?.[0] ? (
          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <span className="text-4xl">🧶</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#9caf88] mb-0.5">{item.category}</p>
        <h3 className="font-serif font-bold text-[#3d2e22] text-base leading-tight truncate">{item.name}</h3>
        <p className="font-serif text-[#8b6f47] font-bold text-lg mt-1">₹{item.price.toLocaleString()}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-2 bg-[#faf7f2] rounded-full px-3 py-1">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center text-[#8b6f47] hover:text-[#c4714a] font-bold text-lg transition-colors"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-semibold text-[#3d2e22]">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center text-[#8b6f47] hover:text-[#c4714a] font-bold text-lg transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-xs text-red-300 hover:text-red-400 transition-colors font-medium"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Item total */}
      <div className="text-right flex-shrink-0">
        <p className="font-serif font-bold text-[#3d2e22] text-lg">
          ₹{(item.price * item.quantity).toLocaleString()}
        </p>
        {item.quantity > 1 && (
          <p className="text-[10px] text-[#8a7060] mt-0.5">
            {item.quantity} × ₹{item.price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Cart() {
  const { cartItems, itemsPrice, shippingPrice, totalPrice, clearCart } = useCart()
  const { user }    = useAuth()
  const navigate    = useNavigate()

  const isEmpty = cartItems.length === 0

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2]">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#f5ede4] to-[#fdf0f0] py-7 px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8888e] mb-2">✦ Your Selection</p>
        <h1 className="font-serif text-4xl font-bold text-[#3d2e22]">Your <em className="text-[#8b6f47]">Cart</em></h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {isEmpty ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <span className="text-7xl">🧺</span>
            <p className="font-serif text-2xl font-bold text-[#3d2e22]">Your cart is empty</p>
            <p className="text-sm text-[#8a7060]">Looks like you haven't added anything yet</p>
            <Link
              to="/shop"
              className="mt-2 bg-[#8b6f47] hover:bg-[#c4714a] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(139,111,71,0.3)]"
            >
              Browse the Collection →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items — left */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-serif text-xl font-bold text-[#3d2e22]">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#8a7060] hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              </div>
              {cartItems.map((item) => <CartItem key={item._id} item={item} />)}

              {/* Continue shopping */}
              <Link
                to="/shop"
                className="text-sm text-[#8b6f47] hover:text-[#c4714a] transition-colors font-medium mt-2 inline-flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary — right */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(61,46,34,0.08)] sticky top-24">
                <h2 className="font-serif text-xl font-bold text-[#3d2e22] mb-6">Order Summary</h2>

                <div className="flex flex-col gap-3 text-sm mb-5">
                  <div className="flex justify-between text-[#8a7060]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#3d2e22]">₹{itemsPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#8a7060]">
                    <span>Shipping</span>
                    <span className={`font-medium ${shippingPrice === 0 ? 'text-[#9caf88]' : 'text-[#3d2e22]'}`}>
                      {shippingPrice === 0 ? 'FREE 🎉' : `₹${shippingPrice}`}
                    </span>
                  </div>
                  {shippingPrice > 0 && (
                    <p className="text-[10px] text-[#8a7060] bg-[#faf7f2] rounded-xl px-3 py-2">
                      Add ₹{(999 - itemsPrice).toLocaleString()} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-[#8b6f47]/10 pt-3 flex justify-between">
                    <span className="font-bold text-[#3d2e22]">Total</span>
                    <span className="font-serif font-bold text-[#8b6f47] text-xl">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => user ? navigate('/checkout') : navigate('/login')}
                  className="w-full bg-[#8b6f47] hover:bg-[#c4714a] text-white py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(139,111,71,0.25)] hover:shadow-[0_8px_28px_rgba(139,111,71,0.35)] hover:-translate-y-0.5"
                >
                  {user ? 'Proceed to Checkout →' : 'Login to Checkout →'}
                </button>

                {!user && (
                  <p className="text-center text-xs text-[#8a7060] mt-3">
                    <Link to="/login" className="text-[#8b6f47] hover:underline">Login</Link> or{' '}
                    <Link to="/register" className="text-[#8b6f47] hover:underline">Register</Link> to place your order
                  </p>
                )}

                {/* Trust badges */}
                <div className="mt-6 pt-5 border-t border-[#8b6f47]/10 grid grid-cols-2 gap-2">
                  {[['🔒', 'Secure Checkout'], ['📦', 'Pan-India Delivery'], ['↩️', 'Easy Returns'], ['🧵', '100% Handmade']].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-1.5 text-[10px] text-[#8a7060]">
                      <span>{icon}</span> {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}