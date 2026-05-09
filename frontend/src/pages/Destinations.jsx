import { useEffect, useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

const CONTINENTS = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [continent, setContinent] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (continent !== 'All') params.continent = continent;
    if (search) params.search = search;
    axios.get('/destinations', { params })
      .then(res => setDestinations(res.data.data || res.data))
      .catch(() => setDestinations([]))
      .finally(() => setLoading(false));
  }, [continent]);

  const filtered = destinations.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80)' }} />
        <div className="page-hero-content">
          <p className="section-label">Global Expeditions</p>
          <h1 className="section-title">Discover <em>Destinations</em></h1>
        </div>
      </div>

      <div className="container">
        <div className="dest-controls">
          <input
            type="search"
            className="search-input"
            placeholder="Search destinations or countries…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 400 }}
          />
          <div className="filter-bar" style={{ marginBottom: 0 }}>
            {CONTINENTS.map(c => (
              <button
                key={c}
                className={`filter-chip ${continent === c ? 'active' : ''}`}
                onClick={() => setContinent(c)}
              >{c}</button>
            ))}
          </div>
        </div>

        {loading ? <Spinner fullPage /> : (
          filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🌍</div>
              <h3>No destinations found</h3>
              <p>Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
              {filtered.map(d => <DestinationCard key={d._id} destination={d} large />)}
            </div>
          )
        )}
      </div>

      <style>{`
        .dest-controls {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
      `}</style>
    </div>
  );
}