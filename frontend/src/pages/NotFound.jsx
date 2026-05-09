import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="nf-content">
        <p className="section-label">404 Error</p>
        <h1 className="nf-title">Lost in the <em>Wilderness</em></h1>
        <p className="nf-desc">This trail doesn't exist. Let's get you back on track.</p>
        <Link to="/" className="btn-primary">Return to Base Camp</Link>
      </div>
      <div className="nf-bg" />
      <style>{`
        .not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .nf-bg {
          position: absolute;
          inset: 0;
          background-image: url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80);
          background-size: cover;
          background-position: center;
          filter: brightness(0.2);
          z-index: 0;
        }
        .nf-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 2rem;
        }
        .nf-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1.1;
          margin: 0.5rem 0 1rem;
        }
        .nf-title em { color: var(--accent-warm); font-style: italic; }
        .nf-desc {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}