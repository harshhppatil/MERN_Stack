import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="var(--accent)"/>
          </svg>
          WILD<span>TIDE</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/destinations" onClick={() => setMenuOpen(false)}>Expeditions</NavLink></li>
          <li><NavLink to="/tours" onClick={() => setMenuOpen(false)}>Tours</NavLink></li>
          <li><NavLink to="/species" onClick={() => setMenuOpen(false)}>Species Archive</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</NavLink></li>
              <li><NavLink to="/bookings" onClick={() => setMenuOpen(false)}>My Bookings</NavLink></li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <button
                className="user-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{user.name?.[0]?.toUpperCase() || 'U'}</span>
              </button>
              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-email">{user.email}</p>
                  </div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</Link>
                  <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Bookings</Link>
                  <button className="dropdown-item logout" onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '12px' }}>Sign In</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '12px' }}>Join Expedition</Link>
            </>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: var(--nav-height);
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background var(--transition), border-color var(--transition), backdrop-filter var(--transition);
        }
        .navbar.scrolled {
          background: rgba(10,12,11,0.92);
          backdrop-filter: blur(20px);
          border-bottom-color: var(--border);
        }
        .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-logo {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
        }
        .nav-links a {
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          padding: 0.4rem 0.75rem;
          border-radius: 4px;
          transition: color var(--transition), background var(--transition);
        }
        .nav-links a:hover, .nav-links a.active {
          color: var(--text-primary);
          background: var(--bg-elevated);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
          margin-left: auto;
        }
        .user-menu { position: relative; }
        .user-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--accent-muted);
          border: 1px solid var(--border-accent);
          color: var(--accent);
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition);
        }
        .user-avatar:hover { background: var(--accent); color: #0a0c0b; }
        .user-dropdown {
          position: absolute;
          top: calc(100% + 0.75rem);
          right: 0;
          width: 200px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .dropdown-header {
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .dropdown-name {
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 13px;
        }
        .dropdown-email {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }
        .dropdown-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 0.7rem 1rem;
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition), background var(--transition);
          cursor: pointer;
          border: none;
          background: none;
        }
        .dropdown-item:hover { color: var(--text-primary); background: var(--bg-card); }
        .dropdown-item.logout { color: #e57373; border-top: 1px solid var(--border); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all var(--transition);
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: var(--nav-height);
            left: 0; right: 0;
            background: rgba(10,12,11,0.97);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            border-bottom: 1px solid var(--border);
            gap: 0;
          }
          .nav-links.open { display: flex; }
          .nav-links a { padding: 0.75rem; width: 100%; }
          .hamburger { display: flex; }
          .btn-outline { display: none; }
        }
      `}</style>
    </nav>
  );
}