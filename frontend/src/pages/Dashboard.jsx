import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      if (!user) {
        setLoading(false);
        return;
      }
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
  }, [user]);

  const renderMovieList = (title, movies, listType) => (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-2 border-l-4 border-red-600 pl-4">
        {title}
      </h2>
      <p className="text-gray-400 mb-8 pl-4">
        {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in this list
      </p>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard key={`${listType}-${movie._id}`} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-900/50 border border-dashed border-gray-700 rounded-lg p-12">
          <p className="text-gray-400 mb-4">Your list is empty.</p>
          <Link
            to="/movies"
            className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors"
          >
            Explore Movies
          </Link>
        </div>
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Welcome, <span className="text-red-500">{user?.name}</span>
        </h1>
        <p className="text-gray-400 mt-2">Here are your curated movie lists.</p>
      </div>
      
      {renderMovieList("My Favorite Movies", favorites, 'fav')}
      {renderMovieList("My Watchlist", watchlist, 'watch')}
    </div>
  );
};

export default Dashboard;