import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

export default function WishlistButton({ destinationId, isWishlisted = false, onToggle }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(isWishlisted);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    if (loading) return;
    setLoading(true);
    try {
      if (active) {
        await axios.delete(`/wishlist/${destinationId}`);
      } else {
        await axios.post('/wishlist', { destinationId });
      }
      setActive(!active);
      if (onToggle) onToggle(!active);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`wishlist-btn ${active ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      disabled={loading}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      <style>{`
        .wishlist-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(10,12,11,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          transition: all var(--transition);
          cursor: pointer;
        }
        .wishlist-btn:hover {
          background: rgba(10,12,11,0.9);
          color: #e57373;
          border-color: rgba(229,115,115,0.4);
        }
        .wishlist-btn.active {
          color: #e57373;
          border-color: rgba(229,115,115,0.4);
          background: rgba(229,115,115,0.1);
        }
      `}</style>
    </button>
  );
}