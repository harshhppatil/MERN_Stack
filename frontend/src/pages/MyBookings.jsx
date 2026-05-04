import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios.jsx'

const statusConfig = {
  pending:   { label: 'Pending',   color: 'text-yellow-500', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5'  },
  confirmed: { label: 'Confirmed', color: 'text-emerald-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
  cancelled: { label: 'Cancelled', color: 'text-red-500',    border: 'border-red-500/20',    bg: 'bg-red-500/5'    },
}

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [cancelling, setCancelling] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/bookings/my')
        setBookings(data)
      } catch {
        console.error('Failed to fetch bookings')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    setCancelling(id)
    try {
      await api.put(`/bookings/${id}/cancel`)
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b)
      )
    } catch (err) {
      alert(err.response?.data?.message || 'Cancellation failed')
    } finally {
      setCancelling(null)
    }
  }

  if (loading) return (
    <div className="bg-dark min-h-screen pt-[72px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="bg-dark min-h-screen pt-[72px]">

      {/* ── HEADER ── */}
      <div className="border-b border-[#1a1a1a] py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">
              Your Account
            </span>
          </div>
          <h1 className="font-display font-light text-white text-6xl">My Bookings</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="text-center py-32">
            <div className="font-display text-7xl text-[#1a1a1a] mb-6">◎</div>
            <h2 className="font-display text-3xl text-white font-light mb-3">
              No Bookings Yet
            </h2>
            <p className="text-muted font-sans text-sm mb-8">
              Your reservations will appear here once you book a vehicle.
            </p>
            <Link
              to="/cars"
              className="bg-gradient-to-r from-gold to-gold-light text-dark no-underline px-8 py-3 text-xs font-semibold tracking-widest uppercase font-sans rounded-sm hover:opacity-85 transition-opacity"
            >
              Browse Fleet
            </Link>
          </div>
        ) : (
          <div className="space-y-px bg-[#1a1a1a]">
            {bookings.map(booking => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
                cancelling={cancelling === booking._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const BookingCard = ({ booking, onCancel, cancelling }) => {
  const { car, startDate, endDate, totalDays, totalPrice, status, pickupLocation, createdAt } = booking
  const s = statusConfig[status]
  const canCancel = status !== 'cancelled' && new Date(startDate) > new Date()

  return (
    <div className="bg-card p-8 flex flex-col md:flex-row gap-8">

      {/* Car Image */}
      <div className="w-full md:w-52 h-36 shrink-0 overflow-hidden bg-dark">
        {car?.images?.[0] ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${car.images[0]})`,
              filter: status === 'cancelled' ? 'brightness(0.3) grayscale(1)' : 'brightness(0.5)',
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#222] font-display text-3xl">◎</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <p className="text-[#444] text-[10px] tracking-[0.2em] uppercase font-sans mb-1">
              {car?.brand}
            </p>
            <h3 className="font-display text-2xl text-white font-normal">
              {car?.name}
            </h3>
          </div>
          {/* Status Badge */}
          <div className={`px-4 py-1.5 border text-[10px] tracking-[0.2em] uppercase font-sans ${s.color} ${s.border} ${s.bg}`}>
            {s.label}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Detail
            label="From"
            value={new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          />
          <Detail
            label="To"
            value={new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          />
          <Detail label="Duration" value={`${totalDays} day${totalDays > 1 ? 's' : ''}`} />
          <Detail label="Pickup" value={pickupLocation} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[#1a1a1a]">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mr-3">Total</span>
            <span className="font-display text-2xl text-gold">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#333] text-[10px] font-sans">
              Booked {new Date(createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
            </span>
            {canCancel && (
              <button
                onClick={() => onCancel(booking._id)}
                disabled={cancelling}
                className="text-[10px] tracking-widest uppercase font-sans text-red-500/60 hover:text-red-500 border border-red-500/20 hover:border-red-500/50 px-4 py-1.5 transition-all duration-200 disabled:opacity-40"
              >
                {cancelling ? 'Cancelling...' : 'Cancel'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Detail = ({ label, value }) => (
  <div>
    <p className="text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-1">{label}</p>
    <p className="text-white text-sm font-sans font-light">{value}</p>
  </div>
)

export default MyBookings