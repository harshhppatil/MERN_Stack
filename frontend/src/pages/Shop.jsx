import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

// ── Constants ───────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Clothing', 'Bags', 'Accessories', 'Home Decor']
const TAGS       = [{ value: '', label: 'All Tags' }, { value: 'new', label: '✦ New' }, { value: 'bestseller', label: '★ Bestseller' }, { value: 'trending', label: '↑ Trending' }]
const SORTS      = [{ value: 'newest', label: 'Newest First' }, { value: 'price_asc', label: 'Price: Low to High' }, { value: 'price_desc', label: 'Price: High to Low' }, { value: 'top_rated', label: 'Top Rated' }]

const tagStyles = {
  bestseller: 'bg-[#f7d6d6] text-[#7a3a3e]',
  new:        'bg-[#d4e8d0] text-[#2d5a2a]',
  trending:   'bg-[#c8d4e8] text-[#2a3d5a]',
}
const tagLabels = {
  bestseller: '★ Bestseller',
  new:        '✦ New',
  trending:   '↑ Trending',
}

// ── Product Card ────────────────────────────────────────────────────
function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault() // don't navigate
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(61,46,34,0.08)] hover:shadow-[0_12px_40px_rgba(61,46,34,0.15)] transition-all duration-300 hover:-translate-y-1.5 block"
    >
      {/* Image */}
      <div className="h-56 bg-gradient-to-br from-[#fdf0f0] to-[#f5ede4] flex items-center justify-center relative overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-7xl select-none">🧶</span>
        )}
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full ${tagStyles[product.tag]}`}>
            {tagLabels[product.tag]}
          </span>
        )}
        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#8a7060] tracking-wide">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#9caf88] mb-1">{product.category}</p>
        <h3 className="font-serif text-lg font-bold text-[#3d2e22] mb-1 group-hover:text-[#8b6f47] transition-colors leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-[#8a7060] line-clamp-2 leading-relaxed mb-4">{product.description}</p>

        {/* Rating */}
        {product.numReviews > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.round(product.avgRating) ? 'text-[#e8b4b8]' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <span className="text-[10px] text-[#8a7060]">({product.numReviews})</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-[#8b6f47]">₹{product.price.toLocaleString()}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              added
                ? 'bg-[#9caf88] text-white'
                : product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#8b6f47] hover:bg-[#c4714a] text-white'
            }`}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </Link>
  )
}

// ── Skeleton Loader ─────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(61,46,34,0.06)] animate-pulse">
      <div className="h-56 bg-[#f5ede4]" />
      <div className="p-5 space-y-3">
        <div className="h-2 bg-[#f5ede4] rounded w-1/3" />
        <div className="h-4 bg-[#f5ede4] rounded w-3/4" />
        <div className="h-3 bg-[#f5ede4] rounded w-full" />
        <div className="h-3 bg-[#f5ede4] rounded w-2/3" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 bg-[#f5ede4] rounded w-1/4" />
          <div className="h-8 bg-[#f5ede4] rounded-full w-1/4" />
        </div>
      </div>
    </div>
  )
}

// ── Main Shop Page ──────────────────────────────────────────────────
export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [searchInput, setSearchInput] = useState('')

  // Read initial category from URL (?category=Bags)
  const category = searchParams.get('category') || 'All'
  const tag      = searchParams.get('tag')      || ''
  const sort     = searchParams.get('sort')     || 'newest'

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'All' || value === '') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (category && category !== 'All') params.set('category', category)
        if (tag)    params.set('tag', tag)
        if (sort)   params.set('sort', sort)
        if (search) params.set('search', search)

        const { data } = await api.get(`/products?${params.toString()}`)
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category, tag, sort, search])

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400)
    return () => clearTimeout(t)
  }, [searchInput])

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2]">

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#f5ede4] to-[#fdf0f0] py-14 px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8888e] mb-2">✦ Handcrafted Collection</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3d2e22]">
          The <em className="text-[#8b6f47]">Shop</em>
        </h1>
        <p className="text-[#8a7060] mt-3 text-sm">Every piece made by hand, with love.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── FILTERS ROW ───────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7060] text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search pieces..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#8b6f47]/15 rounded-full text-sm text-[#3d2e22] placeholder-[#8a7060]/60 focus:outline-none focus:border-[#8b6f47]/40 transition-colors"
            />
          </div>

          {/* Tag filter */}
          <select
            value={tag}
            onChange={(e) => setParam('tag', e.target.value)}
            className="bg-white border border-[#8b6f47]/15 rounded-full px-5 py-3 text-sm text-[#3d2e22] focus:outline-none focus:border-[#8b6f47]/40 cursor-pointer"
          >
            {TAGS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="bg-white border border-[#8b6f47]/15 rounded-full px-5 py-3 text-sm text-[#3d2e22] focus:outline-none focus:border-[#8b6f47]/40 cursor-pointer"
          >
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* ── CATEGORY PILLS ────────────────────────────────────── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setParam('category', c)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                category === c || (c === 'All' && !searchParams.get('category'))
                  ? 'bg-[#8b6f47] text-white shadow-[0_4px_12px_rgba(139,111,71,0.25)]'
                  : 'bg-white text-[#8a7060] border border-[#8b6f47]/20 hover:border-[#8b6f47]/50 hover:text-[#8b6f47]'
              }`}
            >
              {c}
            </button>
          ))}
          {/* Result count */}
          {!loading && (
            <span className="ml-auto self-center text-xs text-[#8a7060]">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'} found
            </span>
          )}
        </div>

        {/* ── PRODUCT GRID ──────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🧺</span>
            <p className="font-serif text-2xl text-[#3d2e22] font-bold">No pieces found</p>
            <p className="text-sm text-[#8a7060]">Try a different search or filter</p>
            <button
              onClick={() => { setSearchParams({}); setSearchInput('') }}
              className="mt-2 px-6 py-2.5 bg-[#8b6f47] text-white rounded-full text-sm font-medium hover:bg-[#c4714a] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}