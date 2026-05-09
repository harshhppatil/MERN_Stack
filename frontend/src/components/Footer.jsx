import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="var(--accent)"/>
              </svg>
              WILD<span>TIDE</span>
            </div>
            <p>Exploring the world's most remote corners and documenting the silent beauty of our planet since 1968.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Expeditions</h4>
            <ul>
              <li><Link to="/destinations">All Destinations</Link></li>
              <li><Link to="/tours">Tour Packages</Link></li>
              <li><Link to="/destinations?type=arctic">Arctic Zones</Link></li>
              <li><Link to="/destinations?type=jungle">Amazon Basins</Link></li>
              <li><Link to="/destinations?type=savanna">Serengeti Plains</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Foundation</h4>
            <ul>
              <li><Link to="/species">Wildlife Grants</Link></li>
              <li><Link to="/species">Photography</Link></li>
              <li><Link to="#">Youth Outreach</Link></li>
              <li><Link to="#">Sustainability</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Receive weekly visual prompts from the field.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="your@email.com" className="form-input" style={{ marginBottom: '0.5rem' }} />
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 WildTide Exploratory Society. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          padding: 4rem 0 2rem;
          margin-top: 6rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-logo {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .footer-logo span { color: var(--accent); }
        .footer-brand p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 240px;
          margin-bottom: 1.25rem;
        }
        .social-links {
          display: flex;
          gap: 0.75rem;
        }
        .social-links a {
          color: var(--text-muted);
          transition: color var(--transition);
        }
        .social-links a:hover { color: var(--accent); }
        .footer-col h4 {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-col ul a {
          font-size: 13px;
          color: var(--text-muted);
          transition: color var(--transition);
        }
        .footer-col ul a:hover { color: var(--accent); }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-muted);
        }
        .footer-legal { display: flex; gap: 1.5rem; }
        .footer-legal a { color: var(--text-muted); transition: color var(--transition); }
        .footer-legal a:hover { color: var(--text-secondary); }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
          .footer-legal { gap: 1rem; }
        }
      `}</style>
    </footer>
  );
}