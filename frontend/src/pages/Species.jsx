import { useEffect, useState } from 'react';
import SpeciesCard from '../components/SpeciesCard';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

const STATUSES = ['All', 'Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered'];
const HABITATS = ['All', 'Forest', 'Savanna', 'Ocean', 'Mountain', 'Desert', 'Wetland', 'Arctic'];

export default function Species() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('All');
  const [habitat, setHabitat] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (status !== 'All') params.conservationStatus = status;
    if (habitat !== 'All') params.habitat = habitat;
    axios.get('/species', { params })
      .then(res => setSpecies(res.data.data || res.data))
      .catch(() => setSpecies([]))
      .finally(() => setLoading(false));
  }, [status, habitat]);

  const filtered = species.filter(s =>
    !search ||
    s.commonName?.toLowerCase().includes(search.toLowerCase()) ||
    s.scientificName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1600&q=80)' }} />
        <div className="page-hero-content">
          <p className="section-label">Wildlife Encyclopedia</p>
          <h1 className="section-title">Species <em>Archive</em></h1>
        </div>
      </div>

      <div className="container">
        <input
          type="search"
          className="search-input"
          placeholder="Search by common or scientific name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 480, marginBottom: '1.5rem' }}
        />
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.5rem' }}>Conservation Status</p>
            <div className="filter-bar" style={{ marginBottom: 0 }}>
              {STATUSES.map(s => (
                <button key={s} className={`filter-chip ${status === s ? 'active' : ''}`} onClick={() => setStatus(s)}>
                  {s === 'Critically Endangered' ? 'Critical' : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? <Spinner fullPage /> : (
          filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🦁</div>
              <h3>No species found</h3>
              <p>Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid-4" style={{ marginBottom: '4rem' }}>
              {filtered.map(s => <SpeciesCard key={s._id} species={s} />)}
            </div>
          )
        )}
      </div>
    </div>
  );
}