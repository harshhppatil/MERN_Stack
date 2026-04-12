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

  const backdropStyle = movie.backdropImage
    ? { backgroundImage: `url(${movie.backdropImage})` }
    : {};

  return (
    <div className="text-white">
      {/* Backdrop Section */}
      <div
        className="w-full h-[30rem] bg-cover bg-center relative"
        style={backdropStyle}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 -mt-96 relative pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src={movie.posterImage}
              alt={`Poster for ${movie.title}`}
              className="rounded-lg shadow-2xl w-full"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 mt-8 md:mt-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-1">{movie.title}</h1>
            <p className="text-gray-300 text-lg italic mb-4">{movie.tagline}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 mb-6">
              <span>⭐ {movie.rating}/10</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            {user && (
              <div className="flex items-center space-x-4 mb-8">
                <button
                  onClick={handleFavoriteToggle}
                  className={`py-2 px-5 rounded-lg font-semibold transition duration-300 flex items-center gap-2 ${
                    isFavorited
                      ? 'bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/30'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {isFavorited ? '♥ Favorited' : '♡ Favorite'}
                </button>
                <button
                  onClick={handleWatchlistToggle}
                  className={`py-2 px-5 rounded-lg font-semibold transition duration-300 flex items-center gap-2 ${
                    isWatchlisted
                      ? 'bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/30'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {isWatchlisted ? '✓ Watchlisted' : '+ Watchlist'}
                </button>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold border-b-2 border-red-600 pb-2 mb-4 inline-block">
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">{movie.story}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Director</h3>
              <p className="text-gray-400">{movie.director}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Cast</h3>
              <div className="flex flex-wrap gap-4">
                {movie.cast.map((actor) => (
                  <div key={actor} className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="font-medium">{actor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
