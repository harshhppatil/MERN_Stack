import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, toggleFavorite, toggleWatchlist } from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const MovieDetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
        if (user) {
          setIsFavorited(response.data.favoritedBy.includes(user._id));
          setIsWatchlisted(response.data.watchlistedBy.includes(user._id));
        }
      } catch (err) {
        setError('Failed to fetch movie details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, user]);

  const handleFavoriteToggle = async () => {
    if (!user) return navigate('/login');
    try {
      await toggleFavorite(id);
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!user) return navigate('/login');
    try {
      await toggleWatchlist(id);
      setIsWatchlisted(!isWatchlisted);
    } catch (err) {
      console.error('Failed to toggle watchlist', err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!movie) return null;

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={movie.posterImage} alt={movie.title} className="rounded-lg shadow-lg w-full" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-lg mb-4">
            {new Date(movie.releaseDate).getFullYear()}
          </p>
          <p className="mb-6">{movie.description}</p>

          {user && (
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={handleFavoriteToggle}
                className={`py-2 px-4 rounded-lg font-semibold transition duration-300 flex items-center gap-2 ${
                  isFavorited
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </button>
              <button
                onClick={handleWatchlistToggle}
                className={`py-2 px-4 rounded-lg font-semibold transition duration-300 flex items-center gap-2 ${
                  isWatchlisted
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isWatchlisted ? 'On Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          )}

          {movie.watchProviders && movie.watchProviders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Where to Watch</h2>
              <div className="flex flex-wrap gap-4">
                {movie.watchProviders.map((provider) => (
                  <a
                    key={provider.name}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    {provider.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
