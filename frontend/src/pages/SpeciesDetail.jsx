import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

const statusColors = {
  'Least Concern': '#8bc34a', 'Near Threatened': '#c8a85a',
  'Vulnerable': '#ffa726', 'Endangered': '#ef5350',
  'Critically Endangered': '#b71c1c', 'Extinct in the Wild': '#9c27b0',
};

export default function SpeciesDetail() {
  const { id } = useParams();
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/species/${id}`)
      .then(res => setSpecies(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner fullPage />;
  if (!species) return <div className="page-wrapper empty-state"><p>Species not found.</p></div>;

  const img = species.images?.[0] || 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80';
  const statusColor = statusColors[species.conservationStatus] || 'var(--accent)';

  return (
    <div className="page-wrapper">
      <div className="species-hero" style={{ backgroundImage: `url(${img})` }}>
        <div className="species-hero-overlay" />
        <div className="container species-hero-content">
          <div className="species-status-badge" style={{ '--sc': statusColor }}>
            <span className="status-dot-sm" />
            {species.conservationStatus}
          </div>
          <h1 className="species-detail-title">{species.commonName}</h1>
          <p className="species-sci-name">{species.scientificName}</p>
        </div>
      </div>

      <div className="container">
        <div className="species-layout">
          <div className="species-main">
            {species.description && (
              <div className="species-description">
                <p>{species.description}</p>
              </div>
            )}

            {species.behavior && (
              <div className="species-section">
                <h3>Behavior</h3>
                <p>{species.behavior}</p>
              </div>
            )}

            {species.diet && (
              <div className="species-section">
                <h3>Diet</h3>
                <p>{species.diet}</p>
              </div>
            )}

            {species.threats?.length > 0 && (
              <div className="species-section">
                <h3>Threats</h3>
                <ul className="threat-list">
                  {species.threats.map((t, i) => (
                    <li key={i}>
                      <span style={{ color: '#ef5350' }}>⚠</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="species-sidebar">
            <div className="sidebar-card">
              <h4>Species Profile</h4>
              {[
                ['Habitat', species.habitat],
                ['Range', species.range],
                ['Population', species.population],
                ['Weight', species.weight],
                ['Lifespan', species.lifespan],
                ['Diet Type', species.dietType],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div className="fact-row" key={label}>
                  <span className="fact-label">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .species-hero {
          height: 65vh;
          min-height: 420px;
          background-size: cover;
          background-position: center top;
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        .species-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }
        .species-hero-content {
          position: relative;
          z-index: 1;
          padding-bottom: 3rem;
        }
        .species-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          background: rgba(0,0,0,0.6);
          border: 1px solid var(--sc);
          border-radius: 2px;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--sc);
          margin-bottom: 0.75rem;
        }
        .status-dot-sm {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--sc);
        }
        .species-detail-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 0.4rem;
        }
        .species-sci-name {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.1rem;
          color: rgba(240,237,232,0.5);
        }
        .species-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          padding: 3rem 0 5rem;
        }
        .species-description p, .species-section p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .species-section {
          margin-top: 2rem;
        }
        .species-section h3 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--border);
        }
        .threat-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .threat-list li { font-size: 14px; color: var(--text-secondary); display: flex; gap: 0.5rem; }
        @media (max-width: 900px) {
          .species-layout { grid-template-columns: 1fr; }
          .species-sidebar { order: -1; }
        }
      `}</style>
    </div>
  );
}