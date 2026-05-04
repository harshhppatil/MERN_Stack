import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios.jsx'

const BRANDS = ['All', 'Lamborghini', 'Ferrari', 'Porsche', 'Mercedes-Benz', 'BMW', 'Land Rover', 'Bentley', 'Aston Martin']
const CATEGORIES = ['All', 'Sports', 'Sedan', 'SUV', 'Convertible']

const Cars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    brand: 'All',
    category: 'All',
    transmission: 'All',
    maxPrice: 100000,
  })

  useEffect(() => {
    fetchCars()
  }, [filters])

  const fetchCars = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.brand !== 'All') params.brand = filters.brand
      if (filters.category !== 'All') params.category = filters.category
      if (filters.transmission !== 'All') params.transmission = filters.transmission
      params.maxPrice = filters.maxPrice

      const { data } = await api.get('/cars', { params })
      setCars(data)
    } catch {
      console.error('Failed to fetch cars')
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({ brand: 'All', category: 'All', transmission: 'All', maxPrice: 100000 })
  }

  return (
    <div className="bg-dark min-h-screen pt-[72px]">

      {/* ── PAGE HEADER ── */}
      <div className="border-b border-[#1a1a1a] py-16 px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920)' }}
        />
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">Our Collection</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-display font-light text-white text-6xl md:text-7xl">
            The Fleet
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── SIDEBAR FILTERS ── */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 border border-[#1a1a1a] p-6 bg-card">

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xl text-white font-medium">Refine</h3>
                <button
                  onClick={resetFilters}
                  className="text-muted text-xs tracking-widest uppercase font-sans hover:text-gold transition-colors duration-200"
                >
                  Reset
                </button>
              </div>

              {/* Brand Filter */}
              <FilterSection title="Brand">
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map(brand => (
                    <button
                      key={brand}
                      onClick={() => handleFilter('brand', brand)}
                      className={`text-[11px] tracking-wider uppercase font-sans px-3 py-1.5 border transition-all duration-200 ${
                        filters.brand === brand
                          ? 'border-gold text-gold bg-gold/10'
                          : 'border-[#222] text-muted hover:border-[#444] hover:text-white'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Category Filter */}
              <FilterSection title="Category">
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleFilter('category', cat)}
                      className={`w-full text-left text-sm font-sans px-3 py-2 transition-all duration-200 flex items-center justify-between ${
                        filters.category === cat
                          ? 'text-gold'
                          : 'text-muted hover:text-white'
                      }`}
                    >
                      {cat}
                      {filters.category === cat && (
                        <span className="text-gold text-xs">◆</span>
                      )}
                    </button>
                  ))}
                </div>
              </FilterSection>
              
              {/* Price Filter */}
              <FilterSection title={`Max Price — ₹${Number(filters.maxPrice).toLocaleString()}/day`} last>
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={filters.maxPrice}
                  onChange={e => handleFilter('maxPrice', e.target.value)}
                  className="w-full accent-gold cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[#444] text-[11px] font-sans">₹10,000</span>
                  <span className="text-[#444] text-[11px] font-sans">₹1,00,000</span>
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* ── CARS GRID ── */}
          <main className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted text-sm font-sans">
                <span className="text-white font-medium">{cars.length}</span> vehicles available
              </p>
              <div className="w-8 h-px bg-[#1a1a1a]" />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-32">
                <div className="font-display text-5xl text-[#222] mb-4">◎</div>
                <p className="text-muted font-sans text-sm">No vehicles match your filters.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-gold text-xs tracking-widest uppercase font-sans hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#1a1a1a]">
                {cars.map(car => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

/* ── Filter Section Wrapper ── */
const FilterSection = ({ title, children, last }) => (
  <div className={`${last ? '' : 'border-b border-[#1a1a1a] pb-6 mb-6'}`}>
    <p className="text-[10px] tracking-[0.25em] uppercase text-[#444] font-sans mb-4">{title}</p>
    {children}
  </div>
)

/* ── Car Card ── */
const CarCard = ({ car }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to={`/cars/${car._id}`} className="no-underline block bg-card">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url(${car.images[0]})`,
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              filter: hovered ? 'brightness(0.5)' : 'brightness(0.4)',
            }}
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-dark/80 border border-[#222] text-[#666] text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-sans">
            {car.category}
          </div>
          {/* Availability */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-500 text-[10px] tracking-wider uppercase font-sans">Available</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 border-t border-[#1a1a1a]">
          <p className="text-[#444] text-[10px] tracking-[0.2em] uppercase font-sans mb-1">{car.brand}</p>
          <h3 className="font-display text-2xl font-normal text-white mb-4 leading-tight">{car.name}</h3>

          {/* Specs row */}
          <div className="flex items-center gap-4 mb-6">
            <SpecBadge label={`${car.seats} Seats`} />
            <SpecBadge label={car.transmission} />
            <SpecBadge label={car.fuelType} />
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-2xl text-gold font-medium">
                ₹{car.pricePerDay.toLocaleString()}
              </span>
              <span className="text-[#444] text-xs font-sans ml-1">/ day</span>
            </div>
            <div className={`text-[11px] tracking-widest uppercase font-sans transition-all duration-200 flex items-center gap-2 ${
              hovered ? 'text-gold' : 'text-[#333]'
            }`}>
              View <span className={`transition-transform duration-200 ${hovered ? 'translate-x-1' : ''}`}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const SpecBadge = ({ label }) => (
  <span className="text-[10px] tracking-wider uppercase text-[#444] font-sans border-r border-[#1a1a1a] pr-4 last:border-0 last:pr-0">
    {label}
  </span>
)

export default Cars