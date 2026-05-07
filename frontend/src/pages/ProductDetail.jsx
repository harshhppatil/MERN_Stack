import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

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

// ── Star Rating Picker ──────────────────────────────────────────────
function StarPicker({ rating, setRating }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110"
        >
          <span className={(hovered || rating) >= star ? 'text-[#e8b4b8]' : 'text-gray-200'}>★</span>
        </button>
      ))}
    </div>
  )
}

// ── Single Review Card ──────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(61,46,34,0.06)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#e8b4b8] flex items-center justify-center text-[#7a3a3e] font-bold text-sm">
            {review.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#3d2e22]">{review.name}</p>
            <p className="text-[10px] text-[#8a7060]">
              {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < review.rating ? 'text-[#e8b4b8]' : 'text-gray-200'}`}>★</span>
          ))}
        </div>
      </div>
      <p className="text-sm text-[#8a7060] leading-relaxed">{review.comment}</p>
    </div>
  )
}

// ── Main Product Detail Page ────────────────────────────────────────
export default function ProductDetail() {
  const { id }        = useParams()
  const { addToCart } = useCart()
  const { user }      = useAuth()
  const navigate      = useNavigate()

  const [product, setProduct]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [quantity, setQuantity]   = useState(1)
  const [added, setAdded]         = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  // Review form state
  const [rating, setRating]     = useState(0)
  const [comment, setComment]   = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [reviewError, setReviewError]   = useState('')
  const [reviewSuccess, setReviewSuccess] = useState('')

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    } catch {
      navigate('/shop')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setReviewError('')
    setReviewSuccess('')

    if (!rating) return setReviewError('Please select a star rating.')
    if (!comment.trim()) return setReviewError('Please write a comment.')

    try {
      setSubmitting(true)
      await api.post(`/products/${id}/review`, { rating, comment })
      setReviewSuccess('Thank you for your review! 🌸')
      setRating(0)
      setComment('')
      fetchProduct() // refresh to show new review
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Could not submit review.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading skeleton ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-white rounded-3xl h-[420px]" />
          <div className="space-y-4 pt-4">
            <div className="h-3 bg-[#f5ede4] rounded w-1/4" />
            <div className="h-8 bg-[#f5ede4] rounded w-3/4" />
            <div className="h-4 bg-[#f5ede4] rounded w-full" />
            <div className="h-4 bg-[#f5ede4] rounded w-2/3" />
            <div className="h-10 bg-[#f5ede4] rounded w-1/3 mt-4" />
            <div className="h-12 bg-[#f5ede4] rounded-full w-full mt-6" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) return null

  const hasImages  = product.images?.length > 0
  const inStock    = product.stock > 0
  const alreadyReviewed = product.reviews?.some(
    (r) => r.user === user?._id || r.name === user?.name
  )

  return (
    <div className="pt-16 min-h-screen bg-[#faf7f2]">

      {/* ── BREADCRUMB ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-2">
        <div className="flex items-center gap-2 text-xs text-[#8a7060]">
          <Link to="/" className="hover:text-[#8b6f47] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#8b6f47] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#8b6f47] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-[#3d2e22] font-medium truncate max-w-[160px]">{product.name}</span>
        </div>
      </div>

      {/* ── PRODUCT MAIN ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-12">

        {/* Left — Images */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <div className="bg-gradient-to-br from-[#fdf0f0] to-[#f5ede4] rounded-3xl h-[400px] flex items-center justify-center overflow-hidden relative">
            {hasImages ? (
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <span className="text-[9rem] select-none">🧶</span>
            )}
            {product.tag && (
              <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full ${tagStyles[product.tag]}`}>
                {tagLabels[product.tag]}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          {hasImages && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-[#8b6f47]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-5 pt-2">

          {/* Category + Name */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#9caf88] mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3d2e22] leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating summary */}
          {product.numReviews > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-base ${i < Math.round(product.avgRating) ? 'text-[#e8b4b8]' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-[#8a7060]">
                {product.avgRating.toFixed(1)} · {product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl font-bold text-[#8b6f47]">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#8a7060]">incl. of all taxes</span>
          </div>

          {/* Description */}
          <p className="text-[#8a7060] leading-relaxed text-sm border-t border-[#8b6f47]/10 pt-5">
            {product.description}
          </p>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-[#9caf88]' : 'bg-red-400'}`} />
            <span className={`text-xs font-medium ${inStock ? 'text-[#9caf88]' : 'text-red-400'}`}>
              {inStock ? `In Stock (${product.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity + Add to Cart */}
          {inStock && (
            <div className="flex flex-col gap-4 pt-2">
              {/* Quantity selector */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-full bg-white border border-[#8b6f47]/20 text-[#3d2e22] text-lg flex items-center justify-center hover:border-[#8b6f47] transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-[#3d2e22]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-9 h-9 rounded-full bg-white border border-[#8b6f47]/20 text-[#3d2e22] text-lg flex items-center justify-center hover:border-[#8b6f47] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 ${
                  added
                    ? 'bg-[#9caf88] text-white'
                    : 'bg-[#8b6f47] hover:bg-[#c4714a] text-white shadow-[0_4px_20px_rgba(139,111,71,0.3)] hover:shadow-[0_8px_28px_rgba(139,111,71,0.4)] hover:-translate-y-0.5'
                }`}
              >
                {added ? '✓ Added to Cart!' : '🛍 Add to Cart'}
              </button>

              {/* Go to cart shortcut */}
              {added && (
                <Link
                  to="/cart"
                  className="text-center text-xs text-[#8b6f47] underline underline-offset-2 hover:text-[#c4714a] transition-colors"
                >
                  View Cart →
                </Link>
              )}
            </div>
          )}

          {/* Perks */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#8b6f47]/10">
            {[
              { icon: '🧵', text: '100% Handmade' },
              { icon: '📦', text: 'Ships Pan-India' },
              { icon: '↩️', text: 'Easy Returns' },
              { icon: '💌', text: 'Custom Orders' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-[#8a7060]">
                <span>{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS SECTION ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-10 border-t border-[#8b6f47]/10">
        <h2 className="font-serif text-2xl font-bold text-[#3d2e22] mb-8">
          Customer Reviews
          {product.numReviews > 0 && (
            <span className="ml-3 font-sans text-sm font-normal text-[#8a7060]">
              ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Reviews list */}
          <div className="flex flex-col gap-4">
            {product.reviews?.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <span className="text-4xl">🌸</span>
                <p className="font-serif text-lg text-[#3d2e22] mt-3 font-bold">No reviews yet</p>
                <p className="text-sm text-[#8a7060] mt-1">Be the first to share your thoughts!</p>
              </div>
            ) : (
              product.reviews.map((r) => <ReviewCard key={r._id} review={r} />)
            )}
          </div>

          {/* Add review form */}
          <div>
            {!user ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(61,46,34,0.06)]">
                <span className="text-4xl">🔐</span>
                <p className="font-serif text-lg font-bold text-[#3d2e22] mt-3 mb-1">Login to leave a review</p>
                <p className="text-sm text-[#8a7060] mb-5">Share your experience with this piece</p>
                <Link
                  to="/login"
                  className="inline-block bg-[#8b6f47] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#c4714a] transition-colors"
                >
                  Login
                </Link>
              </div>
            ) : alreadyReviewed ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(61,46,34,0.06)]">
                <span className="text-4xl">✅</span>
                <p className="font-serif text-lg font-bold text-[#3d2e22] mt-3">You've reviewed this!</p>
                <p className="text-sm text-[#8a7060] mt-1">Thank you for sharing your thoughts 🌸</p>
              </div>
            ) : (
              <form
                onSubmit={handleReviewSubmit}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(61,46,34,0.06)] flex flex-col gap-5"
              >
                <h3 className="font-serif text-xl font-bold text-[#3d2e22]">Write a Review</h3>

                {/* Star picker */}
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-2">
                    Your Rating
                  </label>
                  <StarPicker rating={rating} setRating={setRating} />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-[#8a7060] block mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you loved about this piece..."
                    className="w-full border border-[#8b6f47]/15 rounded-2xl px-4 py-3 text-sm text-[#3d2e22] placeholder-[#8a7060]/50 focus:outline-none focus:border-[#8b6f47]/40 resize-none transition-colors"
                  />
                </div>

                {/* Error / Success */}
                {reviewError   && <p className="text-xs text-red-400">{reviewError}</p>}
                {reviewSuccess && <p className="text-xs text-[#9caf88] font-medium">{reviewSuccess}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#8b6f47] hover:bg-[#c4714a] text-white py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Review 🌸'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}