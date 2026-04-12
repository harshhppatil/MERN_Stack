import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserFavorites, getUserWatchlist } from '../services/userService';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const [favoritesRes, watchlistRes] = await Promise.all([
          getUserFavorites(),
          getUserWatchlist(),
        ]);
        setFavorites(favoritesRes.data);
        setWatchlist(watchlistRes.data);
      } catch (err) {
        setError('Failed to fetch your movie lists.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLists();
  }, []);

  const renderMovieList = (title, movies) => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">You haven't added any movies to this list yet.</p>
      )}
    </div>
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
      <p className="text-gray-400 mb-10">Welcome back, {user?.name}!</p>
      
      {renderMovieList("My Favorite Movies", favorites)}
      {renderMovieList("My Watchlist", watchlist)}
    </div>
  );
};

export default Dashboard;