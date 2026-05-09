import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/axios'

const STATUS_STYLES = {
  Pending:    'bg-[#fbecc8] text-[#7a5a1e]',
  Processing: 'bg-[#c8d4e8] text-[#2a3d5a]',
  Shipped:    'bg-[#d4e8d0] text-[#2d5a2a]',
  Delivered:  'bg-[#d4e8d0] text-[#2d5a2a]',
  Cancelled:  'bg-red-100 text-red-500',
}
const STATUS_ICONS = {
  Pending:    '🕐',
  Processing: '⚙️',
  Shipped:    '🚚',
  Delivered:  '✅',
  Cancelled:  '❌',
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(61,46,34,0.06)] overflow-hidden">

      {/* Order header */}
      <div className="p-5 flex flex-wrap items-center gap-4 justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8a7060] mb-0.5">Order ID</p>
          <p className="font-mono text-xs text-[#3d2e22] font-semibold">#{order._id.slice(-8).toUpperCase()}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8a7060] mb-0.5">Date</p>
          <p className="text-xs text-[#3d2e22] font-medium">
            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widets uppercase text-[#8a7060] mb-0.5">Total</p>
          <p className="font-serif font-bold text-[#8b6f47] text-lg">₹{order.totalPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widets uppercase text-[#8a7060] mb-0.5">Payment</p>
          <p className="text-xs text-[#3d2e22] font-medium">{order.paymentMethod}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${STATUS_STYLES[order.orderStatus]}`}>
          {STATUS_ICONS[order.orderStatus]} {order.orderStatus}
        </span>
        <button
          onClick={() => setExpanded((p) => !p)}
          className="text-xs text-[#8b6f47] font-semibold hover:text-[#c4714a] transition-colors"
        >
          {expanded ? 'Hide ▲' : 'Details ▼'}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[#8b6f47]/08 px-5 pb-5 pt-4 flex flex-col gap-4">

          {/* Items */}
          <div className="flex flex-col gap-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fdf0f0] flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    : '🧶'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#3d2e22]">{item.name}</p>
                  <p className="text-xs text-[#8a7060]">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                </div>
                <p className="text-sm font-bold text-[#8b6f47]">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Shipping address */}
          <div className="bg-[#faf7f2] rounded-xl p-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8a7060] mb-2">Shipping To</p>
            <p className="text-sm text-[#3d2e22] font-medium">{order.shippingAddress.fullName}</p>
            <p className="text-xs text-[#8a7060] mt-0.5">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
            </p>
            <p className="text-xs text-[#8a7060]">📞 {order.shippingAddress.phone}</p>
          </div>

          {/* Price breakdown */}
          <div className="text-xs text-[#8a7060] flex flex-col gap-1">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-[#3d2e22] font-medium">₹{order.itemsPrice.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className={order.shippingPrice === 0 ? 'text-[#9caf88] font-medium' : 'text-[#3d2e22] font-medium'}>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span></div>
            <div className="flex justify-between font-bold text-[#3d2e22] border-t border-[#8b6f47]/10 pt-1 mt-1"><span>Total</span><span className="text-[#8b6f47]">₹{order.totalPrice.toLocaleString()}</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Orders() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams]        = useSearchParams()
  const successId             = searchParams.get('success')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders')
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2]">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#f5ede4] to-[#fdf0f0] py-7 px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8888e] mb-2">✦ Your History</p>
        <h1 className="font-serif text-4xl font-bold text-[#3d2e22]">My <em className="text-[#8b6f47]">Orders</em></h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Success banner */}
        {successId && (
          <div className="bg-[#d4e8d0] border border-[#9caf88] rounded-2xl px-6 py-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-semibold text-[#2d5a2a] text-sm">Order placed successfully!</p>
              <p className="text-xs text-[#2d5a2a]/70 mt-0.5">
                Order #{successId.slice(-8).toUpperCase()} · You'll receive updates soon 🌸
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-24 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <span className="text-6xl">📦</span>
            <p className="font-serif text-2xl font-bold text-[#3d2e22]">No orders yet</p>
            <p className="text-sm text-[#8a7060]">Start shopping to see your orders here</p>
            <Link to="/shop" className="bg-[#8b6f47] hover:bg-[#c4714a] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors shadow-[0_4px_20px_rgba(139,111,71,0.3)]">
              Browse Collection →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#8a7060] mb-2">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
            {orders.map((order) => <OrderCard key={order._id} order={order} />)}
          </div>
        )}
      </div>
    </div>
  )
}