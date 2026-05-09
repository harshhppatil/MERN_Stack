import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

const statusColors = {
  pending: '#c8a85a',
  confirmed: '#8bc34a',
  cancelled: '#ef5350',
  completed: '#78909c',
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/bookings/my')
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const cancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.patch(`/bookings/${id}/cancel`);
      setBookings(bs => bs.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch {}
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <p className="section-label">Travel History</p>
          <h1 className="section-title">My <em>Bookings</em></h1>
        </div>

        {loading ? <Spinner fullPage /> : (
          bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🧭</div>
              <h3>No bookings yet</h3>
              <p>Explore our tours and book your next adventure.</p>
              <Link to="/tours" className="btn-primary" style={{ marginTop: '1.5rem' }}>Browse Tours</Link>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(b => {
                const tour = b.tour;
                const img = tour?.images?.[0] || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80';
                return (
                  <div key={b._id} className="booking-item">
                    <div className="booking-img">
                      <img src={img} alt={tour?.title} />
                    </div>
                    <div className="booking-info">
                      <div className="booking-header">
                        <div>
                          <h3 className="booking-title">{tour?.title || 'Tour'}</h3>
                          {tour?.destination && <p className="booking-dest">{tour.destination.name}</p>}
                        </div>
                        <span className="booking-status" style={{ '--sc': statusColors[b.status] || 'var(--accent)' }}>
                          {b.status}
                        </span>
                      </div>
                      <div className="booking-meta">
                        <span>📅 {new Date(b.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                        <span>👥 {b.participants} participant{b.participants !== 1 ? 's' : ''}</span>
                        <span>💰 ${b.totalPrice?.toLocaleString() || ((tour?.price || 0) * b.participants).toLocaleString()}</span>
                        <span>⏱ {tour?.duration} days</span>
                      </div>
                      <div className="booking-actions">
                        {tour && <Link to={`/tours/${tour._id}`} className="btn-outline" style={{ padding: '0.4rem 0.85rem', fontSize: '12px' }}>View Tour</Link>}
                        {b.status === 'pending' || b.status === 'confirmed' ? (
                          <button className="btn-outline" style={{ padding: '0.4rem 0.85rem', fontSize: '12px', color: '#ef5350', borderColor: 'rgba(239,83,80,0.3)' }} onClick={() => cancel(b._id)}>Cancel</button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      <style>{`
        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 4rem;
        }
        .booking-item {
          display: flex;
          gap: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition);
        }
        .booking-item:hover { border-color: var(--border-accent); }
        .booking-img {
          width: 160px;
          flex-shrink: 0;
        }
        .booking-img img { width: 100%; height: 100%; object-fit: cover; }
        .booking-info {
          flex: 1;
          padding: 1.25rem 1.25rem 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        .booking-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
        }
        .booking-dest {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          margin-top: 0.2rem;
        }
        .booking-status {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--sc);
          padding: 0.25rem 0.6rem;
          border: 1px solid var(--sc);
          border-radius: 2px;
          white-space: nowrap;
          background: rgba(0,0,0,0.2);
        }
        .booking-meta {
          display: flex;
          gap: 1.25rem;
          font-size: 13px;
          color: var(--text-muted);
          flex-wrap: wrap;
        }
        .booking-actions { display: flex; gap: 0.75rem; }
        @media (max-width: 600px) {
          .booking-img { width: 100px; }
          .booking-meta { gap: 0.75rem; }
        }
      `}</style>
    </div>
  );
}