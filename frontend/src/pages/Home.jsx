import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.jsx'

const Home = () => {
  const { user } = useAuth()
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/cars/featured')
        setFeatured(data)
      } catch {
        console.error('Failed to fetch featured cars')
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-dark min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          ref={heroRef}
          className="absolute inset-[-20%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920)',
            filter: 'brightness(0.25)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />

        {/* Content */}
        <div className="relative text-center px-8 max-w-4xl animate-fadeUp">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans font-medium">
              The World's Finest Fleet
            </span>
            <div className="w-10 h-px bg-gold" />
          </div>

          {/* Heading */}
          <h1 className="font-display font-light text-white leading-none mb-6 tracking-tight"
            style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
            Drive the
            <br />
            <em className="text-gold italic">Extraordinary</em>
          </h1>

          <p className="text-muted text-base leading-relaxed max-w-md mx-auto mb-12 font-sans font-light">
            Experience the world's most exclusive automobiles.
            From Lamborghini to Rolls-Royce — your dream car awaits.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/cars"
              className="bg-gradient-to-r from-gold to-gold-light text-dark no-underline px-10 py-4 text-xs font-semibold tracking-[0.12em] uppercase font-sans rounded-sm hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Fleet
            </Link>
            {!user && (
              <Link
                to="/register"
                className="border border-border text-white no-underline px-10 py-4 text-xs tracking-[0.12em] uppercase font-sans rounded-sm hover:border-gold hover:-translate-y-0.5 transition-all duration-200"
              >
                Join AutoVault
              </Link>
             )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 animate-bounce-scroll flex flex-col items-center gap-2">
          <span className="text-[#555] text-[11px] tracking-[0.2em] uppercase font-sans">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-b border-[#1a1a1a] py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50+', label: 'Luxury Vehicles' },
            { value: '10+', label: 'Premium Brands' },
            { value: '5000+', label: 'Happy Clients' },
            { value: '24/7', label: 'Concierge Support' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-display font-light text-gold text-5xl leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[#555] text-[11px] tracking-[0.15em] uppercase font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED CARS ── */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <SectionHeader eyebrow="Featured Collection" title="The Crown Jewels" />

        {loading ? (
          <div className="text-center text-[#555] py-20 font-sans">Loading fleet...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
            {featured.map((car) => (
              <FeaturedCarCard key={car._id} car={car} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/cars"
            className="text-gold no-underline text-xs tracking-[0.15em] uppercase font-sans font-medium inline-flex items-center gap-2 border-b border-gold/20 pb-1 hover:gap-4 transition-all duration-200"
          >
            View Full Fleet →
          </Link>
        </div>
      </section>

      {/* ── WHY AUTOVAULT ── */}
      <section className="py-24 px-8 bg-[#0d0d0d] border-t border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Why Choose Us" title="The AutoVault Difference" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '◈',
                title: 'Curated Fleet',
                desc: 'Every vehicle is hand-selected and meticulously maintained before every rental.',
              },
              {
                icon: '◉',
                title: 'White Glove Delivery',
                desc: 'Your vehicle is delivered to your preferred location at no extra charge.',
              },
              {
                icon: '◎',
                title: '24/7 Concierge',
                desc: 'Our dedicated team is available around the clock during your rental.',
              },
              {
                icon: '◐',
                title: 'Fully Insured',
                desc: 'Comprehensive insurance included with every booking. Drive with peace of mind.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 border border-[#1a1a1a] bg-dark hover:border-gold/25 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="font-display text-3xl text-gold mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed font-sans font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-32 px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920)',
            filter: 'brightness(0.15)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark" />
        <div className="relative">
          <h2
            className="font-display font-light text-white mb-6 leading-tight"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            Ready to Experience
            <br />
            <em className="text-gold italic">Automotive Perfection?</em>
          </h2>
          <p className="text-[#666] text-base mb-12 font-sans font-light">
            Join thousands of discerning clients who trust AutoVault.
          </p>
          <Link
            to="/cars"
            className="bg-gradient-to-r from-gold to-gold-light text-dark no-underline px-12 py-5 text-xs font-semibold tracking-[0.12em] uppercase font-sans rounded-sm hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200 inline-block"
          >
            Browse the Fleet
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a1a1a] py-8 text-center">
        <p className="text-[#333] text-xs tracking-widest font-sans">
          © 2025 AutoVault · Premium Car Rentals · India
        </p>
      </footer>
    </div>
  )
}

/* ── Reusable Section Header ── */
const SectionHeader = ({ eyebrow, title }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-gold" />
      <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">{eyebrow}</span>
    </div>
    <h2
      className="font-display font-light text-white leading-tight"
      style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}
    >
      {title}
    </h2>
  </div>
)

/* ── Featured Car Card ── */
const FeaturedCarCard = ({ car }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to={`/cars/${car._id}`} className="no-underline block">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-[420px] overflow-hidden bg-card cursor-pointer"
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${car.images[0]})`,
            filter: hovered ? 'brightness(0.4)' : 'brightness(0.3)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-6 right-6 bg-gold/10 border border-gold/25 text-gold text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-sans">
          {car.category}
        </div>

        {/* Info */}
        <div className={`absolute bottom-0 left-0 right-0 p-8 transition-transform duration-300 ${hovered ? '-translate-y-2' : 'translate-y-0'}`}>
          <p className="text-muted text-[11px] tracking-[0.2em] uppercase font-sans mb-1">{car.brand}</p>
          <h3 className="font-display text-3xl font-normal text-white mb-4">{car.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gold font-display text-2xl font-medium">
                ₹{car.pricePerDay.toLocaleString()}
              </span>
              <span className="text-[#555] text-xs font-sans ml-1">/ day</span>
            </div>
            <span className={`text-gold text-xl transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Home