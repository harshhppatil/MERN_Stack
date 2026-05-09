import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';

export default function DestinationCard({ destination, large = false }) {
  const { _id, name, country, continent, images, tagline, isWishlisted } = destination;
  const img = images?.[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80';

  return (
    <Link to={`/destinations/${_id}`} className={`dest-card img-card ${large ? 'large' : ''}`}>
      <img src={img} alt={name} loading="lazy" />
      <div className="img-card-overlay">
        <div className="dest-card-top">
          <WishlistButton destinationId={_id} isWishlisted={isWishlisted} />
        </div>
        <div>
          <div className="dest-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span>{country}</span>
          </div>
          <h3 className="dest-name">{name}</h3>
          {tagline && <p className="dest-tagline">{tagline}</p>}
        </div>
      </div>

      <style>{`
        .dest-card {
          display: block;
          height: 260px;
          cursor: pointer;
        }
        .dest-card.large { height: 380px; }
        .dest-card-top {
          position: absolute;
          top: 1rem; right: 1rem;
          z-index: 2;
        }
        .img-card-overlay { justify-content: space-between; }
        .dest-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.35rem;
        }
        .dest-name {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .dest-card.large .dest-name { font-size: 1.5rem; }
        .dest-tagline {
          font-size: 12px;
          color: rgba(240,237,232,0.6);
          margin-top: 0.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Link>
  );
}