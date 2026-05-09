import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

export default function TourDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ date: '', participants: 1 });
  const [bookLoading, setBookLoading] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [bookError, setBookError] = useState('');

  useEffect(() => {
    axios.get(`/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    if (!user) { navigate('/login'); return; }
    setBookLoading(true);
    setBookError('');
    try {
      await axios.post('/bookings', { tour: id, ...booking });
      setBookSuccess(true);
    } catch (err) {
      setBookError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setBookLoading(false);
    }
  };

  if (loading) return <Spinner fullPage />;
  if (!tour) return <div className="page-wrapper empty-state"><p>Tour not found.</p></div>;

  const img = tour.images?.[0] || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80';

  return (
    <div className="page-wrapper">
      <div className="tour-hero" style={{ backgroundImage: `url(${img})` }}>
        <div className="tour-hero-overlay" />
        <div className="container tour-hero-content">
          {tour.destination && (
            <Link to={`/destinations/${tour.destination._id || tour.destination}`} className="tour-dest-link">
              ← {tour.destination.name || 'Destination'}
            </Link>
          )}
          <h1 className="tour-detail-title">{tour.title}</h1>
          <div className="tour-hero-meta">
            <span>{tour.duration} days</span>
            {tour.difficulty && <span className="badge">{tour.difficulty}</span>}
            {tour.maxGroupSize && <span>Max {tour.maxGroupSize} people</span>}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tour-detail-layout">
          <div className="tour-main">
            {tour.summary && <p className="tour-summary">{tour.summary}</p>}

            {tour.itinerary?.length > 0 && (
              <div className="itinerary">
                <h3>Itinerary</h3>
                {tour.itinerary.map((day, i) => (
                  <div key={i} className="itinerary-day">
                    <div className="day-number">Day {day.day || i + 1}</div>
                    <div className="day-content">
                      {day.title && <h4>{day.title}</h4>}
                      <p>{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tour.included?.length > 0 && (
              <div className="tour-includes">
                <h3>What's Included</h3>
                <div className="includes-grid">
                  {tour.included.map((item, i) => (
                    <div key={i} className="include-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="tour-sidebar">
            <div className="booking-card">
              <div className="booking-price">
                <span className="booking-from">From</span>
                <span className="booking-amount">${tour.price?.toLocaleString()}</span>
                <span className="booking-per">/ person</span>
              </div>

              {bookSuccess ? (
                <div className="book-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <h4>Booking Confirmed!</h4>
                  <p>Check your bookings for details.</p>
                  <Link to="/bookings" className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center', display: 'flex' }}>View Bookings</Link>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Departure Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={booking.date}
                      onChange={e => setBooking(b => ({ ...b, date: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Participants</label>
                    <input
                      type="number"
                      className="form-input"
                      min={1}
                      max={tour.maxGroupSize || 20}
                      value={booking.participants}
                      onChange={e => setBooking(b => ({ ...b, participants: +e.target.value }))}
                    />
                  </div>
                  {bookError && <p className="error-msg">{bookError}</p>}
                  <div className="booking-total">
                    <span>Total</span>
                    <strong>${((tour.price || 0) * booking.participants).toLocaleString()}</strong>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    onClick={handleBook}
                    disabled={bookLoading || !booking.date}
                  >
                    {bookLoading ? 'Booking…' : user ? 'Book Now' : 'Sign In to Book'}
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .tour-hero {
          height: 60vh;
          min-height: 400px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        .tour-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 70%);
        }
        .tour-hero-content {
          position: relative;
          z-index: 1;
          padding-bottom: 3rem;
        }
        .tour-dest-link {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent);
          display: block;
          margin-bottom: 0.75rem;
        }
        .tour-detail-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .tour-hero-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-ui);
          font-size: 13px;
          color: rgba(240,237,232,0.7);
        }
        .tour-detail-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
          padding: 3rem 0 5rem;
        }
        .tour-summary {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }
        .itinerary h3, .tour-includes h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .itinerary { margin-bottom: 2.5rem; }
        .itinerary-day {
          display: flex;
          gap: 1.5rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
        }
        .day-number {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          min-width: 60px;
          padding-top: 0.2rem;
        }
        .day-content h4 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .day-content p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .includes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }
        .include-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .booking-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          position: sticky;
          top: calc(var(--nav-height) + 1rem);
        }
        .booking-price {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .booking-from { font-size: 12px; color: var(--text-muted); }
        .booking-amount {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-warm);
        }
        .booking-per { font-size: 12px; color: var(--text-muted); }
        .booking-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          font-size: 14px;
          border-top: 1px solid var(--border);
          margin-top: 0.5rem;
        }
        .booking-total strong {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--accent-warm);
        }
        .book-success {
          text-align: center;
          padding: 1rem 0;
        }
        .book-success h4 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          margin: 0.5rem 0 0.25rem;
        }
        .book-success p { font-size: 13px; color: var(--text-muted); }
        @media (max-width: 900px) {
          .tour-detail-layout { grid-template-columns: 1fr; }
          .tour-sidebar { order: -1; }
          .booking-card { position: static; }
          .includes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}