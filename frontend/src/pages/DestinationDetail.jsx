import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import WishlistButton from '../components/WishlistButton';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

export default function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      axios.get(`/destinations/${id}`),
      axios.get(`/tours?destination=${id}`),
    ]).then(([dest, toursRes]) => {
      if (dest.status === 'fulfilled') setDestination(dest.value.data);
      if (toursRes.status === 'fulfilled') setTours(toursRes.value.data.data || toursRes.value.data);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner fullPage />;
  if (!destination) return (
    <div className="page-wrapper empty-state">
      <p>Destination not found.</p>
      <Link to="/destinations" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Destinations</Link>
    </div>
  );

  const images = destination.images?.length ? destination.images : ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80'];

  return (
    <div className="page-wrapper">
      {/* Image gallery */}
      <div className="dest-gallery">
        <div className="gallery-main">
          <img src={images[activeImg]} alt={destination.name} />
          <div className="gallery-overlay">
            <div className="gallery-wishlist">
              <WishlistButton destinationId={destination._id} isWishlisted={destination.isWishlisted} />
            </div>
            <div className="gallery-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              {destination.country}, {destination.continent}
            </div>
          </div>
        </div>
        {images.length > 1 && (
          <div className="gallery-thumbs">
            {images.map((img, i) => (
              <button key={i} className={`thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        <div className="dest-detail-layout">
          <div className="dest-main">
            <h1 className="dest-detail-title">{destination.name}</h1>
            {destination.tagline && <p className="dest-tagline-large">{destination.tagline}</p>}
            <div className="dest-description">
              <p>{destination.description}</p>
            </div>

            {destination.highlights?.length > 0 && (
              <div className="dest-highlights">
                <h3>Highlights</h3>
                <ul>
                  {destination.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="highlight-dot" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tours.length > 0 && (
              <div className="dest-tours">
                <h3>Available Tours</h3>
                <div className="grid-2">
                  {tours.map(t => <TourCard key={t._id} tour={t} />)}
                </div>
              </div>
            )}
          </div>

          <aside className="dest-sidebar">
            <div className="sidebar-card">
              <h4>Quick Facts</h4>
              {destination.bestSeason && (
                <div className="fact-row">
                  <span className="fact-label">Best Season</span>
                  <span>{destination.bestSeason}</span>
                </div>
              )}
              {destination.climate && (
                <div className="fact-row">
                  <span className="fact-label">Climate</span>
                  <span>{destination.climate}</span>
                </div>
              )}
              {destination.difficulty && (
                <div className="fact-row">
                  <span className="fact-label">Difficulty</span>
                  <span>{destination.difficulty}</span>
                </div>
              )}
              {destination.avgTemp && (
                <div className="fact-row">
                  <span className="fact-label">Avg. Temp</span>
                  <span>{destination.avgTemp}</span>
                </div>
              )}
              <Link to={`/tours?destination=${destination._id}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                View Tours
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .dest-gallery {
          height: 70vh;
          min-height: 400px;
          position: relative;
          display: flex;
          gap: 0.5rem;
        }
        .gallery-main {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .gallery-main img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
        }
        .gallery-wishlist { align-self: flex-end; }
        .gallery-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.8);
        }
        .gallery-thumbs {
          width: 100px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          overflow-y: auto;
        }
        .thumb {
          flex-shrink: 0;
          height: 70px;
          border-radius: 4px;
          overflow: hidden;
          border: 2px solid transparent;
          transition: border-color var(--transition);
          cursor: pointer;
        }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }
        .thumb.active { border-color: var(--accent); }

        .dest-detail-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
          padding: 3rem 0 5rem;
        }
        .dest-detail-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }
        .dest-tagline-large {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.1rem;
          color: var(--accent-warm);
          margin-bottom: 1.5rem;
        }
        .dest-description p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .dest-highlights { margin: 2rem 0; }
        .dest-highlights h3, .dest-tours h3, .dest-tours h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .dest-highlights ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .dest-highlights li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .highlight-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }
        .dest-tours { margin-top: 2.5rem; }

        .sidebar-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          position: sticky;
          top: calc(var(--nav-height) + 1rem);
        }
        .sidebar-card h4 {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .fact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
        }
        .fact-label {
          color: var(--text-muted);
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 600;
        }
        @media (max-width: 900px) {
          .dest-detail-layout { grid-template-columns: 1fr; }
          .gallery-thumbs { display: none; }
          .dest-sidebar { order: -1; }
          .sidebar-card { position: static; }
        }
      `}</style>
    </div>
  );
}