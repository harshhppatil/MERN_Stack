import { useState, useEffect } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1920&q=90',
    label: 'Blue Whale · Baja California',
  },
  {
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=90',
    label: 'Norwegian Fjords · Arctic Norway',
  },
  {
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=90',
    label: 'Great Barrier Reef · Australia',
  },
  {
    image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?w=1920&q=90',
    label: 'Antarctic Peninsula · Antarctica',
  },
  {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=90',
    label: 'Serengeti Plains · Tanzania',
  },
]

const HeroSlideshow = () => {
  const [current, setCurrent]   = useState(0)
  const [previous, setPrevious] = useState(null)
  const [fading, setFading]     = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevious(current)
      setFading(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length)
        setFading(false)
        setPrevious(null)
      }, 1200)
    }, 5000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Previous slide — fades out */}
      {previous !== null && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms]"
          style={{
            backgroundImage: `url(${slides[previous].image})`,
            filter: 'brightness(0.3)',
            opacity: fading ? 0 : 1,
          }}
        />
      )}

      {/* Current slide */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms]"
        style={{
          backgroundImage: `url(${slides[current].image})`,
          filter: 'brightness(0.3)',
          opacity: fading ? 0 : 1,
          transform: 'scale(1.05)',
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/20 to-ocean/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean/80 via-transparent to-ocean/40" />

      {/* Slide indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? 'w-8 h-1.5 bg-tide'
                : 'w-1.5 h-1.5 bg-foam/30 hover:bg-foam/60'
            }`}
          />
        ))}
      </div>

      {/* Current location label */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <span className="text-foam/50 text-[11px] tracking-[0.3em] uppercase font-sans">
          {slides[current].label}
        </span>
      </div>
    </div>
  )
}

export default HeroSlideshow