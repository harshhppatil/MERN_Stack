// src/pages/Home.jsx
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.jsx'
import HeroSlideshow from '../components/HeroSlideshow.jsx'

const TICKER_ITEMS = [
  'BLUE WHALE', 'BAJA CALIFORNIA', '7,200KM MIGRATION',
  'HUMPBACK WHALE', 'NORWEGIAN FJORDS', 'ORCA PODS',
  'AMAZON RIVER', 'JAGUAR TERRITORY', 'GREAT BARRIER REEF',
  'EMPEROR PENGUIN', 'ANTARCTIC EXPEDITION', 'GIANT RIVER OTTER',
  'SPERM WHALE', 'GALÁPAGOS ISLANDS', 'NARWHAL',
]

/* ── Shared layout constants ── */
const CONTAINER = {
  maxWidth: '1280px',
  margin:   '0 auto',
  padding:  '0 64px',
}

const Home = () => {
  const { user } = useAuth()
  const [destinations, setDestinations] = useState([])
  const [tours,        setTours]        = useState([])
  const [species,      setSpecies]      = useState([])
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dRes, tRes, sRes] = await Promise.all([
          api.get('/destinations/featured'),
          api.get('/tours/featured'),
          api.get('/species/featured'),
        ])
        setDestinations(dRes.data)
        setTours(tRes.data)
        setSpecies(sRes.data)
      } catch { console.error('Fetch failed') }
      finally  { setLoading(false) }
    }
    fetchAll()
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }} className="grain">

      {/* ────────────────────────────── */}
      {/* HERO                           */}
      {/* ────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <HeroSlideshow />

        {/* Content */}
        <div style={{
          position:       'relative',
          zIndex:          10,
          height:          '100%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          paddingLeft:     '7vw',
          paddingRight:    '7vw',
          maxWidth:        '900px',
        }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div className="bio-dot" />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize:    '11px',
              color:       'rgba(57,255,20,0.7)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}>
              WildTide Expeditions · Est. 2025
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily:   'Syne, sans-serif',
            fontWeight:    800,
            fontSize:      'clamp(60px, 9vw, 120px)',
            lineHeight:    0.9,
            letterSpacing: '-0.02em',
            color:         '#fff',
            marginBottom:  '28px',
            animation:     'fadeUp 1s ease 0.2s both',
          }}>
            THE WILD
            <br />
            <span className="glow-text" style={{ fontStyle: 'italic' }}>IS ALIVE.</span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 300,
            fontSize:   '16px',
            color:      '#666',
            maxWidth:   '420px',
            lineHeight: 1.7,
            marginBottom: '40px',
            animation:  'fadeUp 1s ease 0.45s both',
          }}>
            Expert-guided expeditions into Earth's most extraordinary
            wild places — oceans, mountains, rivers, and beyond.
          </p>

          {/* CTAs */}
          <div style={{
            display:   'flex',
            gap:       '16px',
            flexWrap:  'wrap',
            animation: 'fadeUp 1s ease 0.65s both',
          }}>
            <Link to="/destinations" className="btn-bio no-underline" style={{
              fontSize:      '12px',
              fontFamily:    'Sora, sans-serif',
              fontWeight:     600,
              padding:       '14px 36px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Explore Destinations
            </Link>
            <Link to="/tours" className="no-underline" style={{
              fontSize:      '12px',
              fontFamily:    'Sora, sans-serif',
              fontWeight:     500,
              padding:       '14px 36px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.6)',
              border:        '1px solid rgba(255,255,255,0.12)',
              transition:    'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
            >
              View Expeditions
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position:   'absolute', bottom: 0, left: 0, right: 0, height: '160px',
          background: 'linear-gradient(to top, #000, transparent)',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ────────────────────────────── */}
      {/* TICKER                         */}
      {/* ────────────────────────────── */}
      <div style={{
        borderTop:    '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        background:   '#080808',
        padding:      '14px 0',
        overflow:     'hidden',
      }}>
        <div className="animate-ticker" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...Array(2)].map((_, copy) => (
            <div key={copy} style={{ display: 'flex', alignItems: 'center' }}>
              {TICKER_ITEMS.map((item, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily:    'JetBrains Mono, monospace',
                    fontSize:      '11px',
                    color:         '#484848',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    padding:       '0 28px',
                  }}>{item}</span>
                  <span style={{ color: '#39ff14', fontSize: '8px' }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────── */}
      {/* STATS                          */}
      {/* ────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div style={CONTAINER}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border:              '1px solid #1a1a1a',
          }}>
            {[
              { num: '8',    label: 'Wild Destinations',  code: 'DEST · 001-008' },
              { num: '10',   label: 'Expert Expeditions', code: 'EXP  · 001-010' },
              { num: '12',   label: 'Species Documented', code: 'SPE  · 001-012' },
              { num: '100%', label: 'Conservation Funded',code: 'CSR  · 001PCT'  },
            ].map((s, i) => (
              <div key={i} style={{
                padding:     '40px 36px',
                borderRight: i < 3 ? '1px solid #1a1a1a' : 'none',
                background:  '#080808',
                transition:  'background 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0d0d0d'}
              onMouseLeave={e => e.currentTarget.style.background = '#080808'}
              >
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize:   'clamp(44px, 5vw, 68px)',
                  color:      '#39ff14',
                  lineHeight: 1,
                  marginBottom: '12px',
                  textShadow: '0 0 30px rgba(57,255,20,0.35)',
                }}>{s.num}</div>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize:   '14px',
                  color:      '#fff',
                  marginBottom: '8px',
                }}>{s.label}</div>
                <div style={{
                  fontFamily:    'JetBrains Mono, monospace',
                  fontSize:      '10px',
                  color:         '#2a2a2a',
                  letterSpacing: '0.2em',
                }}>{s.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* FEATURED DESTINATIONS          */}
      {/* ────────────────────────────── */}
      <section style={{ padding: '80px 0 100px' }}>
        <div style={CONTAINER}>
          <SectionHeader
            eyebrow="Wild Destinations"
            title="Where Will You Go?"
            link="/destinations"
            linkLabel="All Destinations"
          />

          {loading ? <LoadingState /> : (
            <div style={{
              display:             'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gridTemplateRows:    '320px 320px',
              gap:                 '16px',
            }}>
              {destinations[0] && (
                <DestinationCard
                  dest={destinations[0]}
                  style={{ gridRow: 'span 2' }}
                  large
                />
              )}
              {destinations[1] && <DestinationCard dest={destinations[1]} />}
              {destinations[2] && <DestinationCard dest={destinations[2]} />}
              {destinations[3] && (
                <DestinationCard
                  dest={destinations[3]}
                  style={{ gridColumn: 'span 2' }}
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* FEATURED EXPEDITIONS           */}
      {/* ────────────────────────────── */}
      <section style={{
        padding:      '100px 0',
        background:   '#060606',
        borderTop:    '1px solid #111',
        borderBottom: '1px solid #111',
      }}>
        <div style={CONTAINER}>
          <SectionHeader
            eyebrow="Expert Expeditions"
            title="Led by Those Who Know the Wild"
            link="/tours"
            linkLabel="All Expeditions"
          />
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '24px',
          }}>
            {tours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* SPECIES SPOTLIGHT              */}
      {/* ────────────────────────────── */}
      <section style={{ padding: '100px 0' }}>
        <div style={CONTAINER}>
          <SectionHeader
            eyebrow="Wildlife Encyclopedia"
            title="The Inhabitants"
            link="/species"
            linkLabel="All Species"
          />
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap:                 '16px',
          }}>
            {species.map(s => (
              <SpeciesCard key={s._id} species={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* WHALE FEATURE                  */}
      {/* ────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position:           'absolute', inset: 0,
          backgroundImage:    'url(https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1920&q=90)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             'brightness(0.15) saturate(0.5)',
        }} />
        <div style={{
          position:   'absolute', inset: 0,
          background: 'linear-gradient(to right, #000 30%, rgba(0,0,0,0.7) 60%, transparent)',
        }} />

        <div style={{ position: 'relative', ...CONTAINER, padding: '100px 64px' }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div className="bio-dot" />
              <span style={{
                fontFamily:    'JetBrains Mono, monospace',
                fontSize:      '11px',
                color:         'rgba(57,255,20,0.6)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}>Species Spotlight · Balaenoptera musculus</span>
            </div>

            <h2 style={{
              fontFamily:   'Syne, sans-serif',
              fontWeight:    800,
              fontSize:      'clamp(36px, 5vw, 60px)',
              color:         '#fff',
              lineHeight:    1.05,
              marginBottom:  '24px',
            }}>
              The Blue Whale.
              <br />
              <span className="glow-text" style={{ fontStyle: 'italic' }}>
                200 Tonnes of Life.
              </span>
            </h2>

            <p style={{
              fontFamily:   'Sora, sans-serif',
              fontWeight:    300,
              fontSize:      '15px',
              color:         '#606060',
              lineHeight:    1.8,
              marginBottom:  '36px',
            }}>
              The largest animal to have ever existed on Earth. Its heart is the size
              of a small car. A single heartbeat can be heard two miles away.
              And yet — it feeds on creatures invisible to the naked eye.
            </p>

            {/* Stats grid */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '12px',
              marginBottom:        '40px',
            }}>
              {[
                { label: 'Weight',   value: 'Up to 200t'  },
                { label: 'Length',   value: 'Up to 33m'   },
                { label: 'Lifespan', value: '80–90 years' },
                { label: 'Status',   value: 'Endangered'  },
              ].map((s, i) => (
                <div key={i} style={{
                  padding:    '16px 20px',
                  border:     '1px solid #1a1a1a',
                  background: 'rgba(0,0,0,0.6)',
                }}>
                  <div style={{
                    fontFamily:    'JetBrains Mono, monospace',
                    fontSize:      '10px',
                    color:         '#333',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom:  '6px',
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize:   '18px',
                    fontWeight: 600,
                    color:      '#fff',
                  }}>{s.value}</div>
                </div>
              ))}
            </div>

            <Link to="/species" className="no-underline" style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '10px',
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '11px',
              color:         'rgba(57,255,20,0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderBottom:  '1px solid rgba(57,255,20,0.2)',
              paddingBottom: '4px',
              transition:    'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#39ff14'
              e.currentTarget.style.borderBottomColor = 'rgba(57,255,20,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(57,255,20,0.7)'
              e.currentTarget.style.borderBottomColor = 'rgba(57,255,20,0.2)'
            }}
            >
              Explore the Encyclopedia →
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* WHY WILDTIDE                   */}
      {/* ────────────────────────────── */}
      <section style={{
        padding:      '100px 0',
        background:   '#060606',
        borderTop:    '1px solid #111',
        borderBottom: '1px solid #111',
      }}>
        <div style={CONTAINER}>
          <SectionHeader
            eyebrow="Why WildTide"
            title="Conservation at the Core"
          />
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 '20px',
          }}>
            {[
              {
                code:  '01',
                title: 'Expert Naturalists',
                desc:  'Every guide holds advanced qualifications in marine biology, ecology, or conservation. Their knowledge turns sightings into understanding.',
              },
              {
                code:  '02',
                title: 'Small Groups Only',
                desc:  'Maximum 12 people per expedition. Intimate, respectful, and minimal impact on the wildlife you came to witness.',
              },
              {
                code:  '03',
                title: 'Leave No Trace',
                desc:  'All expeditions operate under strict Leave No Trace protocols. We observe. We never disturb.',
              },
              {
                code:  '04',
                title: '1% for the Planet',
                desc:  '1% of every booking funds ocean and habitat conservation organisations working in the regions you visit.',
              },
            ].map((item, i) => (
              <div key={i} className="glow-card" style={{ padding: '36px 28px', background: '#000' }}>
                <div style={{
                  fontFamily:    'JetBrains Mono, monospace',
                  fontSize:      '11px',
                  color:         'rgba(57,255,20,0.25)',
                  letterSpacing: '0.3em',
                  marginBottom:  '24px',
                }}>{item.code}</div>
                <h3 style={{
                  fontFamily:   'Syne, sans-serif',
                  fontWeight:    700,
                  fontSize:      '18px',
                  color:         '#fff',
                  marginBottom:  '14px',
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 300,
                  fontSize:   '13px',
                  color:      '#555',
                  lineHeight: 1.7,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* CTA                            */}
      {/* ────────────────────────────── */}
      <section style={{ padding: '120px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {/* Line decoration */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '20px',
            marginBottom:   '40px',
          }}>
            <div style={{ height: '1px', background: 'rgba(57,255,20,0.15)', width: '60px' }} />
            <span style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '10px',
              color:         'rgba(57,255,20,0.4)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}>Begin Your Journey</span>
            <div style={{ height: '1px', background: 'rgba(57,255,20,0.15)', width: '60px' }} />
          </div>

          <h2 style={{
            fontFamily:   'Syne, sans-serif',
            fontWeight:    800,
            fontSize:      'clamp(44px, 6vw, 80px)',
            color:         '#fff',
            lineHeight:    0.95,
            marginBottom:  '24px',
          }}>
            The Wild Calls.
            <br />
            <span className="glow-text" style={{ fontStyle: 'italic' }}>Answer It.</span>
          </h2>

          <p style={{
            fontFamily:   'Sora, sans-serif',
            fontWeight:    300,
            fontSize:      '15px',
            color:         '#555',
            lineHeight:    1.7,
            marginBottom:  '48px',
          }}>
            Join thousands of nature lovers who have experienced the extraordinary
            with WildTide's expert-led expeditions.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!user && (
              <Link to="/register" className="btn-bio no-underline" style={{
                fontSize:      '12px',
                fontFamily:    'Sora, sans-serif',
                fontWeight:     600,
                padding:       '16px 44px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                Create Account
              </Link>
            )}
            <Link to="/tours" className="no-underline" style={{
              fontSize:      '12px',
              fontFamily:    'Sora, sans-serif',
              fontWeight:     500,
              padding:       '16px 44px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.5)',
              border:        '1px solid rgba(255,255,255,0.1)',
              transition:    'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
            >
              Browse Expeditions
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── */}
      {/* FOOTER                         */}
      {/* ────────────────────────────── */}
      <footer style={{
        borderTop:  '1px solid #111',
        padding:    '40px 64px',
      }}>
        <div style={{
          ...CONTAINER,
          padding:        '0 64px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '24px',
        }}>
          <Link to="/" className="no-underline" style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '12px',
          }}>
            <div style={{
              width:          '28px',
              height:         '28px',
              borderRadius:   '50%',
              border:         '1px solid rgba(57,255,20,0.4)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize:   '12px',
                color:      '#39ff14',
              }}>W</span>
            </div>
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize:   '18px',
              color:      '#fff',
            }}>Wild<span style={{ color: '#39ff14' }}>Tide</span></span>
          </Link>

          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { to: '/destinations', label: 'Destinations' },
              { to: '/tours',        label: 'Expeditions'  },
              { to: '/species',      label: 'Wildlife'     },
            ].map(l => (
              <Link key={l.to} to={l.to} className="no-underline" style={{
                fontFamily:    'JetBrains Mono, monospace',
                fontSize:      '10px',
                color:         '#2a2a2a',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transition:    'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#555'}
              onMouseLeave={e => e.currentTarget.style.color = '#2a2a2a'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <span style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '10px',
            color:         '#1e1e1e',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            © 2025 WILDTIDE · FOR THE WILD
          </span>
        </div>
      </footer>
    </div>
  )
}

/* ────────────────────────────────────── */
/* Reusable Components                    */
/* ────────────────────────────────────── */

const SectionHeader = ({ eyebrow, title, link, linkLabel }) => (
  <div style={{
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-end',
    marginBottom:   '48px',
    gap:            '24px',
    flexWrap:       'wrap',
  }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div className="bio-dot" />
        <span style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '11px',
          color:         'rgba(57,255,20,0.6)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
        }}>{eyebrow}</span>
      </div>
      <h2 style={{
        fontFamily:   'Syne, sans-serif',
        fontWeight:    800,
        fontSize:      'clamp(32px, 4vw, 52px)',
        color:         '#fff',
        lineHeight:    1.05,
      }}>{title}</h2>
    </div>
    {link && (
      <Link to={link} className="no-underline" style={{
        fontFamily:    'JetBrains Mono, monospace',
        fontSize:      '11px',
        color:         'rgba(57,255,20,0.5)',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '8px',
        transition:    'color 0.2s ease',
        flexShrink:     0,
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#39ff14'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(57,255,20,0.5)'}
      >
        {linkLabel} →
      </Link>
    )}
  </div>
)

const DestinationCard = ({ dest, large, style: extraStyle }) => {
  const [hov, setHov] = useState(false)

  return (
    <Link
      to={`/destinations/${dest._id}`}
      className="no-underline"
      style={{
        position:   'relative',
        display:    'block',
        overflow:   'hidden',
        cursor:     'pointer',
        ...extraStyle,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Background image */}
      <div style={{
        position:           'absolute',
        inset:               0,
        backgroundImage:    `url(${dest.images[0]})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        filter:             hov ? 'brightness(0.3) saturate(0.7)' : 'brightness(0.2) saturate(0.6)',
        transform:          hov ? 'scale(1.06)' : 'scale(1)',
        transition:         'all 0.7s ease',
      }} />

      {/* Gradient */}
      <div style={{
        position:   'absolute',
        inset:       0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)',
      }} />

      {/* Hover border */}
      <div style={{
        position:   'absolute',
        inset:       0,
        boxShadow:  hov
          ? 'inset 0 0 0 1px rgba(57,255,20,0.35)'
          : 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        transition: 'box-shadow 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Top row */}
      <div style={{
        position: 'absolute',
        top:      '20px',
        left:     '20px',
        right:    '20px',
        display:  'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '10px',
          color:         hov ? 'rgba(57,255,20,0.9)' : 'rgba(57,255,20,0.6)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          background:    'rgba(0,0,0,0.7)',
          padding:       '5px 12px',
          border:        '1px solid rgba(57,255,20,0.15)',
          transition:    'all 0.3s ease',
        }}>{dest.category}</span>
        <span style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '10px',
          color:         '#333',
          letterSpacing: '0.1em',
        }}>{dest.country}</span>
      </div>

      {/* Bottom info */}
      <div style={{
        position:   'absolute',
        bottom:      0,
        left:        0,
        right:       0,
        padding:    '28px 24px',
        transform:  hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.35s ease',
      }}>
        <div style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '10px',
          color:         '#383838',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom:  '8px',
        }}>{dest.region}</div>

        <h3 style={{
          fontFamily:   'Syne, sans-serif',
          fontWeight:    800,
          fontSize:      large ? '28px' : '20px',
          color:         '#fff',
          lineHeight:    1.1,
          marginBottom:  '12px',
        }}>{dest.name}</h3>

        <div style={{
          overflow:   'hidden',
          maxHeight:  hov ? '50px' : '0',
          opacity:    hov ? 1 : 0,
          transition: 'all 0.4s ease',
        }}>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 300,
            fontSize:   '12px',
            color:      '#555',
            lineHeight: 1.6,
          }}>{dest.tagline}</p>
        </div>

        {hov && (
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '8px',
            marginTop:  '14px',
          }}>
            <div className="bio-dot" style={{ width: '5px', height: '5px' }} />
            <span style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '10px',
              color:         '#39ff14',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>Explore →</span>
          </div>
        )}
      </div>
    </Link>
  )
}

const TourCard = ({ tour }) => {
  const [hov, setHov] = useState(false)
  const diffColor = {
    Easy:        '#34d399',
    Moderate:    '#fbbf24',
    Challenging: '#f97316',
    Extreme:     '#f87171',
  }

  return (
    <Link
      to={`/tours/${tour._id}`}
      className="no-underline"
      style={{
        display:    'block',
        background: '#0a0a0a',
        border:     hov ? '1px solid rgba(57,255,20,0.35)' : '1px solid #1a1a1a',
        boxShadow:  hov ? '0 0 20px rgba(57,255,20,0.1), 0 0 60px rgba(57,255,20,0.05)' : 'none',
        transform:  hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s ease',
        overflow:   'hidden',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <div style={{
          position:           'absolute',
          inset:               0,
          backgroundImage:    `url(${tour.images?.[0] || tour.destination?.images?.[0]})`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             'brightness(0.35) saturate(0.6)',
          transform:          hov ? 'scale(1.05)' : 'scale(1)',
          transition:         'transform 0.7s ease',
        }} />
        <div style={{
          position:   'absolute',
          inset:       0,
          background: 'linear-gradient(to top, #0a0a0a, transparent)',
        }} />

        {/* Badges */}
        <div style={{
          position:       'absolute',
          top:             '16px',
          left:            '16px',
          right:           '16px',
          display:         'flex',
          justifyContent:  'space-between',
        }}>
          <span style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '10px',
            color:         'rgba(57,255,20,0.8)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background:    'rgba(0,0,0,0.8)',
            padding:       '5px 10px',
            border:        '1px solid rgba(57,255,20,0.15)',
          }}>{tour.category}</span>
          <span style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '10px',
            color:         diffColor[tour.difficulty] || '#fff',
            background:    'rgba(0,0,0,0.8)',
            padding:       '5px 10px',
            border:        `1px solid ${diffColor[tour.difficulty]}33`,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>{tour.difficulty}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <p style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '10px',
          color:         '#333',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom:  '10px',
        }}>
          {tour.destination?.name} · {tour.destination?.country}
        </p>

        <h3 style={{
          fontFamily:   'Syne, sans-serif',
          fontWeight:    700,
          fontSize:      '18px',
          color:         '#fff',
          lineHeight:    1.2,
          marginBottom:  '16px',
        }}>{tour.name}</h3>

        <div style={{
          display:     'flex',
          alignItems:  'center',
          gap:         '10px',
          marginBottom: '20px',
        }}>
          {[
            `${tour.duration} days`,
            `Max ${tour.maxGroupSize}`,
          ].map((item, i) => (
            <span key={i} style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '11px',
              color:         '#404040',
              paddingRight:  i < 1 ? '10px' : 0,
              borderRight:   i < 1 ? '1px solid #1e1e1e' : 'none',
            }}>{item}</span>
          ))}
        </div>

        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          paddingTop:     '16px',
          borderTop:      '1px solid #141414',
        }}>
          <div>
            <span style={{
              fontFamily:  'Syne, sans-serif',
              fontWeight:   800,
              fontSize:     '22px',
              color:        '#39ff14',
              textShadow:  '0 0 20px rgba(57,255,20,0.35)',
            }}>₹{tour.pricePerPerson.toLocaleString()}</span>
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize:   '11px',
              color:      '#333',
              marginLeft: '6px',
            }}>/ person</span>
          </div>
          <span style={{
            color:      hov ? '#39ff14' : '#2a2a2a',
            fontSize:   '16px',
            transition: 'color 0.3s ease',
          }}>→</span>
        </div>
      </div>
    </Link>
  )
}

const SpeciesCard = ({ species }) => {
  const [hov, setHov] = useState(false)

  const statusColor = {
    'Least Concern':         '#34d399',
    'Near Threatened':       '#fbbf24',
    'Vulnerable':            '#f97316',
    'Endangered':            '#f87171',
    'Critically Endangered': '#ef4444',
  }

  return (
    <Link
      to={`/species/${species._id}`}
      className="no-underline"
      style={{
        display:    'block',
        background: '#0a0a0a',
        border:     hov ? '1px solid rgba(57,255,20,0.3)' : '1px solid #1a1a1a',
        boxShadow:  hov ? '0 0 20px rgba(57,255,20,0.1)' : 'none',
        transform:  hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
        overflow:   'hidden',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
        <div style={{
          position:           'absolute',
          inset:               0,
          backgroundImage:    `url(${species.image})`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             hov ? 'brightness(0.4) saturate(0.7)' : 'brightness(0.35) saturate(0.5)',
          transform:          hov ? 'scale(1.08)' : 'scale(1)',
          transition:         'all 0.6s ease',
        }} />
        <div style={{
          position:   'absolute',
          inset:       0,
          background: 'linear-gradient(to top, #0a0a0a, transparent)',
        }} />

        {/* Status pill */}
        <div style={{
          position:   'absolute',
          bottom:      '10px',
          left:        '10px',
          right:       '10px',
        }}>
          <span style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '9px',
            color:         statusColor[species.conservationStatus] || '#fff',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background:    'rgba(0,0,0,0.8)',
            padding:       '3px 8px',
            border:        `1px solid ${statusColor[species.conservationStatus]}33`,
          }}>{species.conservationStatus}</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <h4 style={{
          fontFamily:   'Syne, sans-serif',
          fontWeight:    700,
          fontSize:      '14px',
          color:         '#fff',
          marginBottom:  '4px',
          lineHeight:    1.2,
        }}>{species.name}</h4>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize:   '9px',
          color:      '#2a2a2a',
          fontStyle:  'italic',
          letterSpacing: '0.05em',
        }}>{species.scientificName}</p>
      </div>
    </Link>
  )
}

const LoadingState = () => (
  <div style={{
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    padding:        '80px 0',
  }}>
    <div style={{
      width:  '32px',
      height: '32px',
      border: '1px solid #39ff14',
      borderTopColor: 'transparent',
      borderRadius:   '50%',
      animation:      'spin 1s linear infinite',
    }} />
  </div>
)

export default Home