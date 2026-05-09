import { useState, useEffect } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1920&q=90',
    label: 'Blue Whale',
    location: '28°12\'N · 115°44\'W',
    sub: 'Baja California, Mexico',
  },
  {
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=90',
    label: 'Norwegian Fjords',
    location: '68°08\'N · 14°22\'E',
    sub: 'Vestfjorden, Norway',
  },
  {
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=90',
    label: 'Great Barrier Reef',
    location: '18°17\'S · 147°42\'E',
    sub: 'Queensland, Australia',
  },
  {
    image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?w=1920&q=90',
    label: 'Antarctic Peninsula',
    location: '64°46\'S · 63°00\'W',
    sub: 'Antarctica',
  },
  {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=90',
    label: 'Serengeti Plains',
    location: '2°20\'S · 34°50\'E',
    sub: 'Tanzania, Africa',
  },
]

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length)
        setTransitioning(false)
      }, 800)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i) => {
    if (i === current) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(i)
      setTransitioning(false)
    }, 400)
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current && !transitioning ? 1 : 0 }}
        >
          <div
            className="absolute inset-[-4%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: 'brightness(0.22) saturate(0.8)',
              transition: 'transform 8s ease',
              transform: i === current ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        </div>
      ))}

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Viewfinder corners — top left */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-6 h-px bg-bio opacity-60" />
          <div className="absolute top-0 left-0 w-px h-6 bg-bio opacity-60" />
        </div>
      </div>
      {/* top right */}
      <div className="absolute top-8 right-8 pointer-events-none">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 right-0 w-6 h-px bg-bio opacity-60" />
          <div className="absolute top-0 right-0 w-px h-6 bg-bio opacity-60" />
        </div>
      </div>
      {/* bottom left */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <div className="relative w-16 h-16">
          <div className="absolute bottom-0 left-0 w-6 h-px bg-bio opacity-60" />
          <div className="absolute bottom-0 left-0 w-px h-6 bg-bio opacity-60" />
        </div>
      </div>
      {/* bottom right */}
      <div className="absolute bottom-8 right-8 pointer-events-none">
        <div className="relative w-16 h-16">
          <div className="absolute bottom-0 right-0 w-6 h-px bg-bio opacity-60" />
          <div className="absolute bottom-0 right-0 w-px h-6 bg-bio opacity-60" />
        </div>
      </div>

      {/* Location tag — bottom right */}
      <div className="absolute bottom-10 right-12 text-right pointer-events-none">
        <p className="font-mono text-[10px] text-bio/70 tracking-[0.2em] mb-1">
          {slides[current].location}
        </p>
        <p className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
          {slides[current].sub}
        </p>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 left-12 flex items-center gap-3 pointer-events-none">
        <span className="font-mono text-[11px] text-bio">
          {String(current + 1).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 pointer-events-auto ${
                i === current
                  ? 'w-8 h-0.5 bg-bio'
                  : 'w-2 h-0.5 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[11px] text-white/30">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default HeroSlideshow