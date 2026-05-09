import { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
    label: 'Story of the Month',
    title: 'The Last Sentinels',
    titleAccent: 'of the North',
    subtitle: 'Journey deep into the Arctic wilderness to document the resilience of the apex predators guarding the edge of a changing world.',
  },
  {
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1600&q=80',
    label: 'Featured Expedition',
    title: 'Into the Heart',
    titleAccent: 'of the Okavango',
    subtitle: 'Follow the seasonal floods that transform the Kalahari into one of Africa\'s most extraordinary wildlife habitats.',
  },
  {
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1600&q=80',
    label: 'Conservation Report',
    title: 'Shadows of the',
    titleAccent: 'Rainforest Floor',
    subtitle: 'Rare glimpses into the nocturnal world of endangered big cats navigating an ever-shrinking habitat.',
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % slides.length);
        setFading(false);
      }, 600);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 600);
  };

  const slide = slides[current];

  return (
    <div className="hero-slideshow">
      <div className={`hero-bg ${fading ? 'fade' : ''}`} style={{ backgroundImage: `url(${slide.image})` }} />
      <div className="hero-overlay" />

      <div className="hero-content container">
        <div className={`hero-text ${fading ? 'fade' : ''}`}>
          <span className="section-label">{slide.label}</span>
          <h1 className="hero-title">
            {slide.title}<br />
            <em>{slide.titleAccent}</em>
          </h1>
          <p className="hero-subtitle">{slide.subtitle}</p>
          <div className="hero-actions">
            <button className="btn-primary">
              Start Exploring
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </button>
            <button className="btn-outline">Watch Documentary</button>
          </div>
        </div>

        <div className="hero-dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

      <style>{`
        .hero-slideshow {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.6s ease;
          transform: scale(1.05);
          animation: slowZoom 8s ease forwards;
        }
        .hero-bg.fade { opacity: 0; }
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.0); }
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.5) 50%,
            rgba(0,0,0,0.1) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: var(--nav-height);
        }
        .hero-text {
          max-width: 560px;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hero-text.fade {
          opacity: 0;
          transform: translateY(10px);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          color: var(--text-primary);
          margin: 0.5rem 0 1rem;
        }
        .hero-title em {
          color: var(--accent-warm);
          font-style: italic;
        }
        .hero-subtitle {
          font-size: 15px;
          color: rgba(240,237,232,0.75);
          max-width: 400px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 3rem;
        }
        .dot {
          width: 28px;
          height: 3px;
          background: rgba(255,255,255,0.25);
          border-radius: 2px;
          transition: all var(--transition);
        }
        .dot.active {
          background: var(--accent);
          width: 48px;
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-ui);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          z-index: 2;
        }
        .scroll-line {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.25);
        }
      `}</style>
    </div>
  );
}