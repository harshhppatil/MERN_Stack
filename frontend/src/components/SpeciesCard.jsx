import { Link } from 'react-router-dom';

const statusColors = {
  'Least Concern': '#8bc34a',
  'Near Threatened': '#c8a85a',
  'Vulnerable': '#ffa726',
  'Endangered': '#ef5350',
  'Critically Endangered': '#b71c1c',
  'Extinct in the Wild': '#9c27b0',
};

export default function SpeciesCard({ species }) {
  const { _id, commonName, scientificName, conservationStatus, habitat, images } = species;
  const img = images?.[0] || 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80';

  return (
    <Link to={`/species/${_id}`} className="species-card img-card">
      <img src={img} alt={commonName} loading="lazy" />
      <div className="img-card-overlay">
        {conservationStatus && (
          <div className="species-status" style={{ '--sc': statusColors[conservationStatus] || 'var(--accent)' }}>
            <span className="status-dot" />
            {conservationStatus}
          </div>
        )}
        <div>
          <p className="species-habitat">{habitat}</p>
          <h3 className="species-name">{commonName}</h3>
          <p className="species-sci">{scientificName}</p>
        </div>
      </div>

      <style>{`
        .species-card {
          display: block;
          height: 240px;
          cursor: pointer;
        }
        .species-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--sc);
          margin-bottom: auto;
          padding: 0.3rem 0.6rem;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          border: 1px solid var(--sc);
          border-radius: 2px;
          width: fit-content;
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--sc);
        }
        .img-card-overlay {
          justify-content: space-between;
        }
        .species-habitat {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.5);
          margin-bottom: 0.2rem;
        }
        .species-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .species-sci {
          font-style: italic;
          font-size: 12px;
          color: rgba(240,237,232,0.5);
          margin-top: 0.2rem;
        }
      `}</style>
    </Link>
  );
}