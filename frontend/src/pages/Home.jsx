import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

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

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(61,46,34,0.08)] hover:shadow-[0_12px_40px_rgba(61,46,34,0.15)] transition-all duration-300 hover:-translate-y-1.5 block"
    >
      <div className="h-52 bg-gradient-to-br from-[#fdf0f0] to-[#f5ede4] flex items-center justify-center relative overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="text-7xl select-none">🧶</span>
        )}
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full ${tagStyles[product.tag]}`}>
            {tagLabels[product.tag]}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#9caf88] mb-1">{product.category}</p>
        <h3 className="font-serif text-lg font-bold text-[#3d2e22] mb-1 group-hover:text-[#8b6f47] transition-colors">{product.name}</h3>
        <p className="text-xs text-[#8a7060] line-clamp-2 leading-relaxed mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-[#8b6f47]">₹{product.price.toLocaleString()}</span>
          <span className="text-xs bg-[#faf7f2] text-[#8b6f47] border border-[#8b6f47]/20 px-3 py-1.5 rounded-full font-medium group-hover:bg-[#8b6f47] group-hover:text-white transition-all duration-200">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Mosaic cards shown in hero right side ───────────────────────────
const mosaicItems = [
  { emoji: '🌸', label: 'Blush Cardigan',    price: '₹1,499', bg: 'from-[#fdf0f0] to-[#f7d6d6]', tag: 'New' },
  { emoji: '🌼', label: 'Daisy Tote',        price: '₹849',   bg: 'from-[#fdf6ec] to-[#fbecc8]', tag: 'Bestseller' },
  { emoji: '🌿', label: 'Sage Bucket Hat',   price: '₹599',   bg: 'from-[#f0f5ee] to-[#d4e8d0]', tag: 'Trending' },
  { emoji: '💜', label: 'Lavender Mini Bag', price: '₹649',   bg: 'from-[#f5f0fd] to-[#ead6f0]', tag: 'Bestseller' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading]   = useState(true)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products?sort=newest')
        setFeatured(data.slice(0, 4))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="pt-16 font-sans">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#f5ede4] to-[#fdf0f0]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#e8b4b8]/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-[#9caf88]/10 blur-3xl animate-pulse delay-500" />

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-6">

          {/* Left */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-[#e8b4b8]/25 border border-[#e8b4b8] text-[#8b6f47] text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-6">
              <span>✦</span> Handcrafted with Love
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#3d2e22] leading-[1.1] mb-4">
              Knit with<br />
              <em className="text-[#c8888e] not-italic">Heart,</em><br />
              Worn with Soul
            </h1>
            <p className="font-serif text-xl italic text-[#8a7060] mb-4">Every stitch tells a story</p>
            <p className="text-[#8a7060] text-base leading-relaxed mb-8 max-w-md">
              Discover one-of-a-kind crochet pieces — from flowy cardigans to artisan bags — each lovingly made by hand, just for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-[#8b6f47] hover:bg-[#c4714a] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(139,111,71,0.3)] hover:shadow-[0_8px_28px_rgba(139,111,71,0.4)] transition-all duration-300 hover:-translate-y-0.5">
                Shop the Collection →
              </Link>
              <a href="#story" className="border-[1.5px] border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300">
                Our Story
              </a>
            </div>
            <div className={`flex gap-8 mt-12 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {[['200+', 'Pieces Made'], ['100%', 'Handmade'], ['🌸', 'Made with Love']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-serif text-3xl font-bold text-[#8b6f47]">{num}</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#8a7060] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Mosaic */}
          <div className={`hidden md:block transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 gap-4 items-start">
              {mosaicItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`bg-gradient-to-br ${item.bg} rounded-3xl p-5 flex flex-col gap-3 shadow-[0_4px_20px_rgba(61,46,34,0.08)] hover:shadow-[0_8px_32px_rgba(61,46,34,0.14)] hover:-translate-y-1 transition-all duration-300 `}
                >
                  <span className="text-4xl">{item.emoji}</span>
                  <div>
                    <p className="font-serif font-bold text-[#3d2e22] text-sm leading-tight">{item.label}</p>
                    <p className="font-serif text-[#8b6f47] font-bold text-lg mt-0.5">{item.price}</p>
                  </div>
                  <span className="self-start text-[10px] font-semibold bg-white/60 text-[#8b6f47] px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
            {/* Bottom label */}
            <p className="text-center text-xs text-[#8a7060] tracking-widest uppercase mt-5 font-medium">
              ✦ New pieces added every week ✦
            </p>
          </div>
        </div>
      </section>

      {/* ── YARN DIVIDER ──────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-8 py-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e8b4b8] to-transparent" />
        <span className="text-xl">🧶</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e8b4b8] to-transparent" />
      </div>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8888e] mb-2">✦ New Arrivals</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3d2e22]">
            Fresh from the <em className="text-[#8b6f47]">Hook</em>
          </h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-3xl h-72 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/shop" className="inline-block border-[1.5px] border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white px-10 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300">
            View All Pieces →
          </Link>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8888e] mb-2">✦ Browse by</p>
            <h2 className="font-serif text-4xl font-bold text-[#3d2e22]">Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Clothing',    emoji: '🌸', color: 'from-[#fdf0f0] to-[#f7d6d6]' },
              { label: 'Bags',        emoji: '🌼', color: 'from-[#fdf6ec] to-[#fbecc8]' },
              { label: 'Accessories', emoji: '💐', color: 'from-[#f0f5ee] to-[#d4e8d0]' },
              { label: 'Home Decor',  emoji: '🏡', color: 'from-[#f0eef8] to-[#ead6f0]' },
            ].map(({ label, emoji, color }) => (
              <Link key={label} to={`/shop?category=${label}`} className={`bg-gradient-to-br ${color} rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform duration-300 group`}>
                <span className="text-4xl">{emoji}</span>
                <span className="font-serif font-bold text-[#3d2e22] text-lg group-hover:text-[#8b6f47] transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY BANNER ──────────────────────────────────────────── */}
      <section id="story" className="mx-6 my-16 rounded-3xl bg-gradient-to-br from-[#3d2e22] to-[#6b4c35] overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">

          {/* Left — Text */}
          <div className="p-10 md:p-16">
            <span className="inline-block bg-[#e8b4b8]/20 text-[#e8b4b8] text-[10px] tracking-[0.15em] uppercase font-semibold px-4 py-1.5 rounded-full mb-5">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Crafted with <em className="text-[#e8b4b8]">Passion,</em><br />Shipped with Love
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              Every piece in our collection is born from a love of texture, colour, and the meditative art of crochet. We believe fashion can be slow, sustainable, and deeply personal.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['100% Handmade', 'Sustainable Materials', 'Custom Orders', 'Ships Pan-India'].map((f) => (
                <span key={f} className="flex items-center gap-2 text-white/80 text-sm">
                  <span className="text-[#9caf88] font-bold">✓</span> {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Feature tiles */}
          <div className="p-10 md:p-12 grid grid-cols-2 gap-4 content-center">
            {[
              { icon: '🧵', title: 'Hand Stitched',   desc: 'Every loop tied by hand, not machine' },
              { icon: '🌱', title: 'Eco Friendly',    desc: 'Natural yarns, sustainable process' },
              { icon: '📦', title: 'Safe Packaging',  desc: 'Packed with care, delivered with love' },
              { icon: '💌', title: 'Custom Orders',   desc: 'Your colour, your size, your style' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 hover:bg-white/15 transition-colors rounded-2xl p-4">
                <span className="text-2xl">{icon}</span>
                <p className="text-white font-semibold text-sm mt-2 mb-1">{title}</p>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-[#3d2e22] text-white/50 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-xl font-bold text-white mb-2">
              Loops <span className="italic text-[#e8b4b8]">&</span> Looms
            </p>
            <p className="text-sm leading-relaxed">Handcrafted crochet pieces made with love. Every stitch is a little piece of heart.</p>
          </div>
          {[
            { title: 'Shop',    links: ['Clothing', 'Bags', 'Accessories', 'Home Decor'] },
            { title: 'Help',    links: ['Sizing Guide', 'Shipping Info', 'Returns', 'Custom Orders'] },
            { title: 'Connect', links: ['Instagram', 'WhatsApp'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white text-xs font-semibold tracking-[0.12em] uppercase mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}><Link to="/shop" className="text-sm hover:text-[#e8b4b8] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 px-6 py-4 max-w-7xl mx-auto flex flex-wrap justify-between gap-2 text-xs">
          <span>© 2025 Loops & Looms. Made with <span className="text-[#e8b4b8]">♥</span> in India</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>

    </div>
  )
}