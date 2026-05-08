import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.jsx'
import HeroSlideshow from '../components/HeroSlideshow.jsx'

const Home = () => {
  const { user } = useAuth()
  const [featuredDest,    setFeaturedDest]    = useState([])
  const [featuredTours,   setFeaturedTours]   = useState([])
  const [featuredSpecies, setFeaturedSpecies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [destRes, toursRes, speciesRes] = await Promise.all([
          api.get('/destinations/featured'),
          api.get('/tours/featured'),
          api.get('/species/featured'),
        ])
        setFeaturedDest(destRes.data)
        setFeaturedTours(toursRes.data)
        setFeaturedSpecies(speciesRes.data)
      } catch {
        console.error('Failed to fetch home data')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <div className="bg-ocean min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlideshow />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 max-w-5xl animate-fadeUp">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-tide/60" />
            <span className="text-tide text-[11px] tracking-[0.4em] uppercase font-sans font-medium">
              Experience the Wild World
            </span>
            <div className="w-12 h-px bg-tide/60" />
          </div>

          {/* Heading */}
          <h1
            className="font-display text-foam font-light leading-[0.95] mb-8 tracking-tight"
            style={{ fontSize: 'clamp(56px, 9vw, 120px)' }}
          >
            Where the Ocean
            <br />
            <em className="text-tide italic">Calls You</em>
          </h1>

          <p className="text-mist text-base leading-relaxed max-w-xl mx-auto mb-12 font-sans font-light">
            Guided expeditions to the world's most extraordinary wild places.
            Oceans, mountains, rivers — untouched and alive.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/destinations"
              className="bg-tide hover:bg-tide-light text-white no-underline px-10 py-4 text-xs font-semibold tracking-[0.15em] uppercase font-sans transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Destinations
            </Link>
            <Link
              to="/tours"
              className="glass border border-tide/20 hover:border-tide/60 text-foam no-underline px-10 py-4 text-xs tracking-[0.15em] uppercase font-sans transition-all duration-200 hover:-translate-y-0.5"
            >
              View Expeditions
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-tide/60 to-transparent animate-float" />
          <span className="text-mist/40 text-[10px] tracking-[0.3em] uppercase font-sans">Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-b border-tide/10 py-14 px-8 glass">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '8',    label: 'Wild Destinations' },
            { value: '10',   label: 'Expert Expeditions' },
            { value: '12',   label: 'Species Documented' },
            { value: '100%', label: 'Conservation First' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-5xl font-light text-tide mb-2 leading-none">
                {s.value}
              </div>
              <div className="text-mist/60 text-[11px] tracking-[0.2em] uppercase font-sans">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ── */}
      <section className="py-28 px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Wild Destinations"
          title="Where Will the Tide Take You?"
          sub="Eight extraordinary ecosystems, each more wild than the last."
          link="/destinations"
          linkLabel="All Destinations"
        />

        {loading ? <LoadingGrid /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredDest.map((dest, i) => (
              <DestinationCard key={dest._id} dest={dest} featured={i === 0} />
            ))}
          </div>
        )}
      </section>

      {/* ── FEATURED TOURS ── */}
      <section className="py-28 px-8 bg-ocean-mid border-t border-tide/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Expert Expeditions"
            title="Led by Those Who Know the Wild"
            sub="Marine biologists, naturalists, and trackers — your guides into the extraordinary."
            link="/tours"
            linkLabel="All Expeditions"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIES SPOTLIGHT ── */}
      <section className="py-28 px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Wildlife Encyclopedia"
          title="Meet the Inhabitants"
          sub="From blue whales to emperor penguins — the creatures that make the wild worth saving."
          link="/species"
          linkLabel="All Species"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredSpecies.map(s => (
            <SpeciesCard key={s._id} species={s} />
          ))}
        </div>
      </section>

      {/* ── WHY WILDTIDE ── */}
      <section className="py-28 px-8 bg-ocean-mid border-t border-tide/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Why WildTide"
            title="Conservation at the Core"
            sub="Every expedition funds the protection of the ecosystems you visit."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: '🌊',
                title: 'Expert Naturalists',
                desc: 'Every guide holds advanced qualifications in marine biology, ecology, or wildlife conservation.',
              },
              {
                icon: '🐋',
                title: 'Small Group Sizes',
                desc: 'Maximum 12 people per expedition. Intimate, respectful, and minimal impact on wildlife.',
              },
              {
                icon: '🌿',
                title: 'Leave No Trace',
                desc: 'All our expeditions operate under strict Leave No Trace principles and wildlife approach protocols.',
              },
              {
                icon: '◎',
                title: '1% for the Planet',
                desc: '1% of every booking goes directly to ocean and habitat conservation organisations worldwide.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass border border-tide/10 hover:border-tide/30 p-8 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-display text-xl text-foam font-medium mb-3">{item.title}</h3>
                <p className="text-mist/70 text-sm leading-relaxed font-sans font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHALE FEATURE ── */}
      <section className="relative py-40 px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1920&q=90)',
            filter: 'brightness(0.2)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean via-ocean/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-tide" />
              <span className="text-tide text-[11px] tracking-[0.3em] uppercase font-sans">
                Species Spotlight
              </span>
            </div>
            <h2
              className="font-display font-light text-foam leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
            >
              The Blue Whale —<br />
              <em className="text-tide italic">Largest Life on Earth</em>
            </h2>
            <p className="text-mist text-base leading-relaxed mb-8 font-sans font-light max-w-lg">
              A single heartbeat from its basketball-sized heart can be heard from two miles away.
              At 200 tonnes, it is the largest animal to have ever existed — and yet it feeds
              on creatures invisible to the naked eye.
            </p>
            <Link
              to="/species"
              className="inline-flex items-center gap-3 text-tide text-xs tracking-[0.2em] uppercase font-sans font-medium no-underline hover:gap-5 transition-all duration-300 border-b border-tide/30 pb-1"
            >
              Explore the Encyclopedia →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-8 text-center border-t border-tide/10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-tide/40" />
            <span className="text-tide/70 text-[11px] tracking-[0.3em] uppercase font-sans">
              Begin Your Journey
            </span>
            <div className="w-12 h-px bg-tide/40" />
          </div>
          <h2
            className="font-display font-light text-foam leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            The Wild World Is Waiting.<br />
            <em className="text-tide italic">Are You?</em>
          </h2>
          <p className="text-mist text-base font-sans font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Join thousands of nature lovers who have experienced the extraordinary
            with WildTide's expert-led expeditions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {!user && (
              <Link
                to="/register"
                className="bg-tide hover:bg-tide-light text-white no-underline px-12 py-4 text-xs font-semibold tracking-[0.15em] uppercase font-sans transition-all duration-200 hover:-translate-y-0.5"
              >
                Create Account
              </Link>
            )}
            <Link
              to="/tours"
              className="glass border border-tide/30 hover:border-tide text-foam no-underline px-12 py-4 text-xs tracking-[0.15em] uppercase font-sans transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Expeditions
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-tide/10 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tide to-tide-deep flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">W</span>
            </div>
            <span className="font-display text-foam text-lg">
              Wild<span className="text-tide">Tide</span>
            </span>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/destinations" className="text-mist/40 text-xs tracking-widest uppercase font-sans hover:text-mist transition-colors no-underline">Destinations</Link>
            <Link to="/tours"        className="text-mist/40 text-xs tracking-widest uppercase font-sans hover:text-mist transition-colors no-underline">Expeditions</Link>
            <Link to="/species"      className="text-mist/40 text-xs tracking-widest uppercase font-sans hover:text-mist transition-colors no-underline">Wildlife</Link>
          </div>
          <p className="text-mist/30 text-xs tracking-widest font-sans">
            © 2025 WildTide · For the Wild
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ── Reusable Section Header ── */
const SectionHeader = ({ eyebrow, title, sub, link, linkLabel }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-tide" />
        <span className="text-tide text-[11px] tracking-[0.3em] uppercase font-sans">{eyebrow}</span>
      </div>
      <h2
        className="font-display font-light text-foam leading-tight mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
      >
        {title}
      </h2>
      {sub && <p className="text-mist/60 text-sm font-sans font-light max-w-lg">{sub}</p>}
    </div>
    {link && (
      <Link
        to={link}
        className="text-tide text-xs tracking-[0.2em] uppercase font-sans no-underline hover:gap-4 flex items-center gap-2 transition-all duration-200 border-b border-tide/30 pb-1 shrink-0"
      >
        {linkLabel} →
      </Link>
    )}
  </div>
)

/* ── Destination Card ── */
const DestinationCard = ({ dest, featured }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/destinations/${dest._id}`}
      className={`no-underline block relative overflow-hidden group cursor-pointer ${featured ? 'md:row-span-2' : ''}`}
      style={{ height: featured ? '520px' : '250px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${dest.images[0]})`,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          filter: hovered ? 'brightness(0.35)' : 'brightness(0.25)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean/95 via-transparent to-transparent" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 glass border border-tide/20 text-tide text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-sans">
        {dest.category}
      </div>

      {/* Info */}
      <div className={`absolute bottom-0 left-0 right-0 p-5 transition-transform duration-300 ${hovered ? '-translate-y-1' : ''}`}>
        <p className="text-mist/60 text-[10px] tracking-[0.2em] uppercase font-sans mb-1">{dest.country}</p>
        <h3 className={`font-display text-foam font-normal leading-tight mb-2 ${featured ? 'text-3xl' : 'text-xl'}`}>
          {dest.name}
        </h3>
        <p className={`text-mist/50 text-xs font-sans font-light leading-relaxed transition-all duration-300 ${
          hovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
        } overflow-hidden`}>
          {dest.tagline}
        </p>
      </div>
    </Link>
  )
}

/* ── Tour Card ── */
const TourCard = ({ tour }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/tours/${tour._id}`}
      className="no-underline block glass border border-tide/10 hover:border-tide/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${tour.images?.[0] || tour.destination?.images?.[0]})`,
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: 'brightness(0.45)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-mid to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="glass border border-tide/20 text-tide text-[10px] tracking-wider uppercase px-3 py-1 font-sans">
            {tour.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`text-[10px] tracking-wider uppercase px-3 py-1 font-sans border ${
            tour.difficulty === 'Easy'
              ? 'border-emerald-500/30 text-emerald-400'
              : tour.difficulty === 'Moderate'
              ? 'border-amber-500/30 text-amber-400'
              : 'border-red-500/30 text-red-400'
          }`}>
            {tour.difficulty}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-mist/50 text-[10px] tracking-[0.2em] uppercase font-sans mb-1">
          {tour.destination?.name} · {tour.destination?.country}
        </p>
        <h3 className="font-display text-xl text-foam font-normal mb-4 leading-snug">{tour.name}</h3>

        <div className="flex items-center gap-4 mb-5 text-mist/50 text-[11px] font-sans">
          <span>{tour.duration} days</span>
          <span className="w-1 h-1 rounded-full bg-mist/30" />
          <span>Max {tour.maxGroupSize} people</span>
        </div>

        <div className="flex items-center justify-between border-t border-tide/10 pt-4">
          <div>
            <span className="text-tide font-display text-xl font-medium">
              ₹{tour.pricePerPerson.toLocaleString()}
            </span>
            <span className="text-mist/40 text-xs font-sans ml-1">/ person</span>
          </div>
          <span className={`text-tide text-sm transition-all duration-200 ${hovered ? 'translate-x-1' : ''}`}>
            →
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ── Species Card ── */
const SpeciesCard = ({ species }) => {
  const statusColor = {
    'Least Concern':        'text-emerald-400 border-emerald-500/20',
    'Near Threatened':      'text-yellow-400 border-yellow-500/20',
    'Vulnerable':           'text-amber-400 border-amber-500/20',
    'Endangered':           'text-orange-400 border-orange-500/20',
    'Critically Endangered':'text-red-400 border-red-500/20',
  }

  return (
    <Link to={`/species/${species._id}`} className="no-underline block group">
      <div className="relative h-48 overflow-hidden mb-3">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${species.image})`,
            filter: 'brightness(0.5)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className={`text-[9px] tracking-wider uppercase font-sans px-2 py-0.5 border ${statusColor[species.conservationStatus] || 'text-mist border-mist/20'}`}>
            {species.conservationStatus}
          </span>
        </div>
      </div>
      <h4 className="font-display text-foam text-base font-normal group-hover:text-tide transition-colors duration-200">
        {species.name}
      </h4>
      <p className="text-mist/40 text-[11px] font-sans italic mt-0.5">{species.scientificName}</p>
    </Link>
  )
}

/* ── Loading Grid ── */
const LoadingGrid = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-tide border-t-transparent rounded-full animate-spin" />
  </div>
)

export default Home