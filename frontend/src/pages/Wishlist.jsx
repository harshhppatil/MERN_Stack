import { useEffect, useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import Spinner from '../components/Spinner';
import axios from '../api/axios';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    axios.get('/wishlist')
      .then(res => setWishlist(res.data))
      .catch(() => setWishlist([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <p className="section-label">Saved Destinations</p>
          <h1 className="section-title">My <em>Wishlist</em></h1>
        </div>

        {loading ? <Spinner fullPage /> : (
          wishlist.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🤍</div>
              <h3>No saved destinations</h3>
              <p>Heart any destination to save it here.</p>
            </div>
          ) : (
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
              {wishlist.map(dest => (
                <DestinationCard
                  key={dest._id}
                  destination={{ ...dest, isWishlisted: true }}
                  large
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}