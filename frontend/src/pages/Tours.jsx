import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Challenging', 'Extreme'];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (difficulty !== 'All') params.difficulty = difficulty;
    if (searchParams.get('destination')) params.destination = searchParams.get('destination');
    if (sort) params.sort = sort;
    axios.get('/tours', { params })
      .then(res => setTours(res.data.data || res.data))
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, [difficulty, sort]);

  const filtered = tours.filter(t =>
    !search || t.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80)' }} />
        <div className="page-hero-content">
          <p className="section-label">Curated Journeys</p>
          <h1 className="section-title">Expedition <em>Tours</em></h1>
        </div>
      </div>

      <div className="container">
        <div className="tours-controls">
          <input
            type="search"
            className="search-input"
            placeholder="Search tours…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 340 }}
          />
          <div className="filter-bar" style={{ marginBottom: 0 }}>
            {DIFFICULTIES.map(d => (
              <button key={d} className={`filter-chip ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>{d}</button>
            ))}
          </div>
          <select
            className="form-input"
            style={{ maxWidth: 200, marginLeft: 'auto' }}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="">Sort by: Featured</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="duration">Duration: Short First</option>
            <option value="-duration">Duration: Long First</option>
          </select>
        </div>

        {loading ? <Spinner fullPage /> : (
          filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🧭</div>
              <h3>No tours found</h3>
              <p>Try different filters.</p>
            </div>
          ) : (
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
              {filtered.map(t => <TourCard key={t._id} tour={t} />)}
            </div>
          )
        )}
      </div>
      <style>{`
        .tours-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
      `}</style>
    </div>
  );
}