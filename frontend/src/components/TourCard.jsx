import { Link } from 'react-router-dom';

export default function TourCard({ tour }) {
  const { _id, title, destination, duration, price, difficulty, images, maxGroupSize } = tour;
  const img = images?.[0] || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80';
  const destName = destination?.name || destination || '';

  const diffColors = {
    Easy: '#8bc34a',
    Moderate: '#c8a85a',
    Challenging: '#e57373',
    Extreme: '#ab47bc',
  };

  return (
    <Link to={`/tours/${_id}`} className="tour-card">
      <div className="tour-img img-card">
        <img src={img} alt={title} loading="lazy" />
        {difficulty && (
          <span className="tour-diff" style={{ '--diff-color': diffColors[difficulty] || 'var(--accent)' }}>
            {difficulty}
          </span>
        )}
      </div>
      <div className="tour-info">
        {destName && <p className="tour-dest">{destName}</p>}
        <h3 className="tour-title">{title}</h3>
        <div className="tour-meta">
          <span className="tour-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
            {duration} days
          </span>
          {maxGroupSize && (
            <span className="tour-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              Max {maxGroupSize}
            </span>
          )}
        </div>
        <div className="tour-price">
          <span className="price-label">From</span>
          <span className="price-value">${price?.toLocaleString()}</span>
          <span className="price-per">/ person</span>
        </div>
      </div>

      <style>{`
        .tour-card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition), transform var(--transition);
        }
        .tour-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-3px);
        }
        .tour-img {
          height: 200px;
        }
        .tour-diff {
          position: absolute;
          top: 0.75rem; left: 0.75rem;
          padding: 0.2rem 0.5rem;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid var(--diff-color);
          border-radius: 2px;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--diff-color);
        }
        .tour-info {
          padding: 1.25rem;
        }
        .tour-dest {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.35rem;
        }
        .tour-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }
        .tour-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .tour-meta-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 12px;
          color: var(--text-muted);
          font-family: var(--font-ui);
        }
        .tour-price {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .price-label {
          font-size: 11px;
          color: var(--text-muted);
        }
        .price-value {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-warm);
        }
        .price-per {
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </Link>
  );
}