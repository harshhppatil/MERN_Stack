import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import DestinationCard from '../components/DestinationCard';
import SpeciesCard from '../components/SpeciesCard';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

// Fallback data for when the API is not yet running
const FALLBACK_DESTINATIONS = [
  { _id: '1', name: 'Icelandic Highlands', country: 'Iceland', continent: 'Europe', tagline: 'Where fire meets glacial majesty', images: ['https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80'] },
  { _id: '2', name: 'Okavango Delta', country: 'Botswana', continent: 'Africa', tagline: 'Africa\'s inland sea of wonder', images: ['https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80'] },
  { _id: '3', name: 'Namib Desert', country: 'Namibia', continent: 'Africa', tagline: 'The world\'s oldest desert', images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80'] },
  { _id: '4', name: 'Patagonia Peaks', country: 'Chile', continent: 'South America', tagline: 'Towers of wind-scoured granite', images: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80'] },
  { _id: '5', name: 'Kyoto Forests', country: 'Japan', continent: 'Asia', tagline: 'Ancient bamboo and temple shadow', images: ['https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80'] },
  { _id: '6', name: 'Great Barrier Reef', country: 'Australia', continent: 'Oceania', tagline: 'The ocean\'s cathedral', images: ['https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80'] },
];

const FALLBACK_SPECIES = [
  { _id: '1', commonName: 'Snow Leopard', scientificName: 'Panthera uncia', conservationStatus: 'Vulnerable', habitat: 'Mountain', images: ['https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=80'] },
  { _id: '2', commonName: 'Red Fox', scientificName: 'Vulpes vulpes', conservationStatus: 'Least Concern', habitat: 'Forest & Meadow', images: ['https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80'] },
  { _id: '3', commonName: 'Sumatran Tiger', scientificName: 'Panthera tigris sumatrae', conservationStatus: 'Critically Endangered', habitat: 'Rainforest', images: ['https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80'] },
  { _id: '4', commonName: 'African Elephant', scientificName: 'Loxodonta africana', conservationStatus: 'Vulnerable', habitat: 'Savanna', images: ['https://images.unsplash.com/photo-1551085254-e96b210db58a?w=800&q=80'] },
];

export default function Home() {
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);
  const [species, setSpecies] = useState(FALLBACK_SPECIES);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axios.get('/destinations?limit=6'),
      axios.get('/species?limit=4'),
      axios.get('/tours?limit=3'),
    ]).then(([dest, spec, tour]) => {
      if (dest.status === 'fulfilled') setDestinations(dest.value.data.data || dest.value.data);
      if (spec.status === 'fulfilled') setSpecies(spec.value.data.data || spec.value.data);
      if (tour.status === 'fulfilled') setTours(tour.value.data.data || tour.value.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <HeroSlideshow />

      {/* Featured Species */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">Profiles from the Field</p>
              <h2 className="section-title">Featured <em>Species</em></h2>
              <p className="section-desc">
                Our photographers spent months in isolation to capture these rare glimpses of Earth's most elusive inhabitants. Discover the stories behind the lens.
              </p>
            </div>
            <Link to="/species" className="view-all">
              View Full Archive
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </Link>
          </div>
          <div className="grid-4">
            {species.slice(0, 4).map(s => <SpeciesCard key={s._id} species={s} />)}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="home-section" style={{ background: 'var(--bg-surface)', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <div>
              <p className="section-label">Global Expeditions</p>
              <h2 className="section-title" style={{ textAlign: 'center' }}>Trending <em>Destinations</em></h2>
            </div>
          </div>

          <div className="dest-mosaic">
            {/* Large left */}
            {destinations[0] && (
              <div className="mosaic-large">
                <DestinationCard destination={destinations[0]} large />
              </div>
            )}
            {/* Right 2x2 */}
            <div className="mosaic-right">
              {destinations.slice(1, 5).map(d => (
                <DestinationCard key={d._id} destination={d} />
              ))}
            </div>
            {/* Bottom single */}
            {destinations[5] && (
              <div className="mosaic-bottom">
                <DestinationCard destination={destinations[5]} />
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/destinations" className="btn-outline">Explore All Destinations</Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-value">128k</div>
          <div className="stat-label">Hectares Protected</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">14.2k</div>
          <div className="stat-label">Wildlife Encounters</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">84</div>
          <div className="stat-label">Global Expeditions</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">92%</div>
          <div className="stat-label">Community Impact</div>
        </div>
      </div>

      {/* Featured Tours */}
      {tours.length > 0 && (
        <section className="home-section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="section-label">Curated Journeys</p>
                <h2 className="section-title">Upcoming <em>Tours</em></h2>
              </div>
              <Link to="/tours" className="view-all">
                All Tours
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </Link>
            </div>
            <div className="grid-3">
              {tours.slice(0, 3).map(t => <TourCard key={t._id} tour={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Featured Article */}
      <section className="home-section">
        <div className="container">
          <div className="featured-article">
            <div className="article-image">
              <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=900&q=80" alt="Lion pride" />
            </div>
            <div className="article-content">
              <div className="article-author">
                <div className="author-avatar">MT</div>
                <div>
                  <p className="author-name">Marcus Thorne</p>
                  <p className="author-role">Field Photographer/Writer</p>
                </div>
              </div>
              <h2 className="article-title">Beyond the Roar: A Decade of Tracking the Pride</h2>
              <p className="article-body">
                Living among the lions of the Okavango Delta requires more than just patience. It requires a fundamental shift in perception. In this exclusive retrospective, Marcus Thorne reveals the secret social dynamics of Africa's most fearsome hunters.
              </p>
              <div className="article-actions">
                <button className="btn-primary">Read Journey</button>
                <button className="btn-outline">Listen to Podcast</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-section { padding: 5rem 0; }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1rem;
        }
        .section-desc {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 480px;
          margin-top: 0.5rem;
        }
        .view-all {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--accent);
          white-space: nowrap;
          transition: gap var(--transition);
        }
        .view-all:hover { gap: 0.5rem; }

        /* Mosaic layout */
        .dest-mosaic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto auto;
          gap: 1rem;
        }
        .mosaic-large {
          grid-column: 1;
          grid-row: 1 / 3;
        }
        .mosaic-right {
          grid-column: 2;
          grid-row: 1 / 3;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .mosaic-bottom {
          grid-column: 1;
          grid-row: 3;
        }

        /* Featured article */
        .featured-article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .article-image {
          height: 420px;
        }
        .article-image img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .article-content {
          padding: 3rem 3rem 3rem 0;
        }
        .article-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .author-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--accent-muted);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
        }
        .author-name {
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 700;
        }
        .author-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .article-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .article-body {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 2rem;
        }
        .article-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .featured-article { grid-template-columns: 1fr; }
          .article-image { height: 280px; }
          .article-content { padding: 2rem; }
          .dest-mosaic { grid-template-columns: 1fr; }
          .mosaic-large, .mosaic-right, .mosaic-bottom { grid-column: 1; grid-row: auto; }
          .section-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}