import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const PAYMENT_METHODS = [
  { value: 'COD', label: 'Cash on Delivery', icon: '💵' },
  { value: 'UPI', label: 'UPI',               icon: '📱' },
  { value: 'Card', label: 'Card',             icon: '💳' },
]

export default function Checkout() {
  const { cartItems, itemsPrice, shippingPrice, totalPrice, clearCart } = useCart()
  const { user }  = useAuth()
  const navigate  = useNavigate()

  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone:    user?.phone || '',
    street:   user?.address?.street  || '',
    city:     user?.address?.city    || '',
    state:    user?.address?.state   || '',
    pincode:  user?.address?.pincode || '',
  })
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    const { fullName, phone, street, city, state, pincode } = form
    if (!fullName.trim()) return 'Full name is required.'
    if (!phone.trim() || phone.length < 10) return 'Enter a valid phone number.'
    if (!street.trim()) return 'Street address is required.'
    if (!city.trim()) return 'City is required.'
    if (!state.trim()) return 'State is required.'
    if (!pincode.trim() || pincode.length !== 6) return 'Enter a valid 6-digit pincode.'
    return null
  }

  const handlePlaceOrder = async () => {
    setError('')
    const validationError = validate()
    if (validationError) return setError(validationError)

    try {
      setLoading(true)
      const { data } = await api.post('/orders', {
        items: cartItems.map((item) => ({
          product:  item._id,
          quantity: item.quantity,
        })),
        shippingAddress: form,
        paymentMethod,
      })
      clearCart()
      navigate(`/orders?success=${data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center gap-5">
        <span className="text-6xl">🧺</span>
        <p className="font-serif text-2xl font-bold text-[#3d2e22]">Your cart is empty</p>
        <Link to="/shop" className="bg-[#8b6f47] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#c4714a] transition-colors">
          Go Shopping →
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2]">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#f5ede4] to-[#fdf0f0] py-7 px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8888e] mb-2">✦ Almost There</p>
        <h1 className="font-serif text-4xl font-bold text-[#3d2e22]">
          <em className="text-[#8b6f47]">Checkout</em>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

        {/* Left — Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(61,46,34,0.06)]">
            <h2 className="font-serif text-xl font-bold text-[#3d2e22] mb-5 flex items-center gap-2">
              📍 Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
              </div>
              {/* Phone */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
              </div>
              {/* Street */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Street Address</label>
                <input
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="House no., Street, Area"
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
              </div>
              {/* City */}
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
              </div>
              {/* State */}
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
              </div>
              {/* Pincode */}
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-1.5">Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength={6}
                  className="w-full border border-[#8b6f47]/15 rounded-xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(61,46,34,0.06)]">
            <h2 className="font-serif text-xl font-bold text-[#3d2e22] mb-5 flex items-center gap-2">
              💳 Payment Method
            </h2>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map(({ value, label, icon }) => (
                <label
                  key={value}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === value
                      ? 'border-[#8b6f47] bg-[#faf7f2]'
                      : 'border-[#8b6f47]/10 hover:border-[#8b6f47]/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="accent-[#8b6f47]"
                  />
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-semibold text-[#3d2e22]">{label}</span>
                  {value === 'COD' && (
                    <span className="ml-auto text-[10px] bg-[#d4e8d0] text-[#2d5a2a] px-2 py-0.5 rounded-full font-semibold">
                      Recommended
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(61,46,34,0.08)] sticky top-24">
            <h2 className="font-serif text-xl font-bold text-[#3d2e22] mb-5">Order Summary</h2>

            {/* Items */}
            <div className="flex flex-col gap-3 mb-5 max-h-52 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#fdf0f0] flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
                    {item.images?.[0]
                      ? <img src={item.images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
                      : '🧶'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#3d2e22] truncate">{item.name}</p>
                    <p className="text-[10px] text-[#8a7060]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-[#8b6f47] flex-shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="flex flex-col gap-2 text-sm border-t border-[#8b6f47]/10 pt-4 mb-5">
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
              <div className="flex justify-between border-t border-[#8b6f47]/10 pt-2 mt-1">
                <span className="font-bold text-[#3d2e22]">Total</span>
                <span className="font-serif font-bold text-[#8b6f47] text-xl">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-[#8b6f47] hover:bg-[#c4714a] text-white py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 shadow-[0_4px_20px_rgba(139,111,71,0.25)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : '🌸 Place Order'}
            </button>

            <Link
              to="/cart"
              className="block text-center text-xs text-[#8a7060] hover:text-[#8b6f47] transition-colors mt-3"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}