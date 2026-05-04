import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'


const CarDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    specialRequests: '',
  })
  const [totalDays, setTotalDays] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await api.get(`/cars/${id}`)
        setCar(data)
        setBooking(prev => ({ ...prev, pickupLocation: data.location }))
      } catch {
        navigate('/cars')
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  // Live price calculation
  useEffect(() => {
    if (booking.startDate && booking.endDate && car) {
      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      if (days > 0) {
        setTotalDays(days)
        setTotalPrice(days * car.pricePerDay)
      } else {
        setTotalDays(0)
        setTotalPrice(0)
      }
    }
  }, [booking.startDate, booking.endDate, car])

  const handleChange = (e) => {
    setBooking(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    if (totalDays <= 0) return setError('Please select valid dates')

    setSubmitting(true)
    setError('')
    try {
      await api.post('/bookings', {
        carId: car._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        specialRequests: booking.specialRequests,
        pickupLocation: car.location,
    })
      toast.success('Booking confirmed! Our concierge will contact you shortly.')
      setSuccess(true)

    } catch (err) {
        const msg = err.response?.data?.message || 'Booking failed. Please try again.'
        setError(msg)
        toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  if (loading) return (
    <div className="bg-dark min-h-screen pt-[72px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!car) return null

  if (success) return (
    <div className="bg-dark min-h-screen pt-[72px] flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="font-display text-7xl text-gold mb-6">◆</div>
        <h2 className="font-display text-4xl text-white font-light mb-4">
          Booking Confirmed
        </h2>
        <p className="text-muted font-sans text-sm leading-relaxed mb-8">
          Your {car.brand} {car.name} has been reserved for {totalDays} days.
          Our concierge will contact you shortly.
        </p>
        <div className="bg-card border border-[#1a1a1a] p-6 mb-8 text-left space-y-3">
          <DetailRow label="Vehicle" value={`${car.brand} ${car.name}`} />
          <DetailRow label="From" value={new Date(booking.startDate).toLocaleDateString('en-IN', { dateStyle: 'long' })} />
          <DetailRow label="To" value={new Date(booking.endDate).toLocaleDateString('en-IN', { dateStyle: 'long' })} />
          <DetailRow label="Duration" value={`${totalDays} days`} />
          <DetailRow label="Total" value={`₹${totalPrice.toLocaleString()}`} gold />
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            to="/my-bookings"
            className="bg-gradient-to-r from-gold to-gold-light text-dark no-underline px-8 py-3 text-xs font-semibold tracking-widest uppercase font-sans rounded-sm hover:opacity-85 transition-opacity"
          >
            My Bookings
          </Link>
          <Link
            to="/cars"
            className="border border-[#222] text-muted no-underline px-8 py-3 text-xs tracking-widest uppercase font-sans rounded-sm hover:border-gold hover:text-gold transition-all"
          >
            Browse Fleet
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-dark min-h-screen pt-[72px]">

      {/* ── HERO IMAGE ── */}
      <div className="relative h-[55vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${car.images[0]})`,
            filter: 'brightness(0.35)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-transparent" />

        {/* Back button */}
        <Link
          to="/cars"
          className="absolute top-8 left-8 text-muted text-xs tracking-widest uppercase font-sans hover:text-gold transition-colors no-underline flex items-center gap-2"
        >
          ← Fleet
        </Link>

        {/* Car title overlay */}
        <div className="absolute bottom-10 left-8 right-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">{car.brand} · {car.category}</span>
          </div>
          <h1 className="font-display font-light text-white leading-none"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            {car.name}
          </h1>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── LEFT — Car Info ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Quick specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
              {[
                { label: 'Year', value: car.year },
                { label: 'Seats', value: car.seats },
                { label: 'Transmission', value: car.transmission },
                { label: 'Fuel', value: car.fuelType },
              ].map((spec, i) => (
                <div key={i} className="bg-card px-6 py-5 text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">{spec.label}</p>
                  <p className="font-display text-xl text-white">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <SectionLabel>About</SectionLabel>
              <p className="text-muted font-sans text-sm leading-relaxed font-light">
                {car.description}
              </p>
            </div>

            {/* Performance specs */}
            {car.specs && (
              <div>
                <SectionLabel>Performance</SectionLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Engine', value: car.specs.engine },
                    { label: 'Horsepower', value: car.specs.horsepower ? `${car.specs.horsepower} hp` : null },
                    { label: 'Top Speed', value: car.specs.topSpeed ? `${car.specs.topSpeed} km/h` : null },
                    { label: '0–100 km/h', value: car.specs.acceleration },
                    { label: 'Drive', value: car.specs.drive },
                  ].filter(s => s.value).map((spec, i) => (
                    <div key={i} className="border border-[#1a1a1a] p-4">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">{spec.label}</p>
                      <p className="font-display text-lg text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {car.features?.length > 0 && (
              <div>
                <SectionLabel>Features & Highlights</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] tracking-wider uppercase font-sans px-4 py-2 border border-[#1a1a1a] text-muted hover:border-gold/30 hover:text-gold transition-all duration-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <SectionLabel>Pickup Location</SectionLabel>
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">◎</span>
                <span className="text-muted font-sans text-sm">{car.location}</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Booking Form ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-[#1a1a1a] bg-card p-8">

              {/* Price */}
              <div className="border-b border-[#1a1a1a] pb-6 mb-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#444] font-sans mb-1">Rental Rate</p>
                <div className="flex items-end gap-2">
                  <span className="font-display text-4xl text-gold font-medium">
                    ₹{car.pricePerDay.toLocaleString()}
                  </span>
                  <span className="text-muted text-sm font-sans mb-1">/ day</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBooking} className="space-y-4">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                      From
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={booking.startDate}
                      min={today}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-3 py-2.5 focus:outline-none focus:border-gold transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                      To
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={booking.endDate}
                      min={booking.startDate || today}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-3 py-2.5 focus:outline-none focus:border-gold transition-colors duration-200"
                    />
                  </div>
                </div>

                
                {/* Special requests */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#444] font-sans mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={booking.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requirements..."
                    className="w-full bg-dark border border-[#222] text-white text-sm font-sans px-3 py-2.5 placeholder-[#333] focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Price breakdown */}
                {totalDays > 0 && (
                  <div className="bg-dark border border-[#1a1a1a] p-4 space-y-2">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-muted">₹{car.pricePerDay.toLocaleString()} × {totalDays} days</span>
                      <span className="text-white">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-[#1a1a1a] pt-2 flex justify-between">
                      <span className="text-[10px] tracking-widest uppercase text-muted font-sans">Total</span>
                      <span className="font-display text-xl text-gold">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <p className="text-red-400 text-xs font-sans tracking-wide">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-gold to-gold-light text-dark py-4 text-xs font-semibold tracking-[0.15em] uppercase font-sans rounded-sm hover:opacity-85 disabled:opacity-50 transition-all duration-200"
                >
                  {submitting ? 'Processing...' : user ? 'Reserve Now' : 'Sign In to Book'}
                </button>

                {!user && (
                  <p className="text-center text-[#444] text-xs font-sans">
                    <Link to="/login" className="text-gold hover:underline no-underline">
                      Sign in
                    </Link>
                    {' '}to complete your reservation
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-5 h-px bg-gold" />
    <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans">{children}</p>
  </div>
)

const DetailRow = ({ label, value, gold }) => (
  <div className="flex justify-between items-center">
    <span className="text-[#444] text-xs tracking-wider uppercase font-sans">{label}</span>
    <span className={`text-sm font-sans ${gold ? 'text-gold font-display text-lg' : 'text-white'}`}>{value}</span>
  </div>
)

export default CarDetail