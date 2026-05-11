import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const genresList = [
  "Sci-Fi", "Horror", "Rom-Com"
];

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const { user } = useAuth();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await getAllMovies(selectedGenre, searchTerm);
        setMovies(response.data);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, searchTerm]);

  if (loading && movies.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-white">
          {searchTerm 
            ? `Search Results for "${searchTerm}"` 
            : selectedGenre 
              ? `${selectedGenre} Movies` 
              : 'All Movies'}
        </h1>
      </div>
      
      {/* Genre Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGenre('')}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedGenre === ''
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {genresList.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedGenre === genre
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {error ? (
        <div className="text-center text-red-500 mt-10">{error}</div>
      ) : loading ? (
        <div className="flex justify-center mt-10"><Spinner /></div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-xl">No movies found in this genre.</p>
          {user && <p className="mt-2">Click the "+ Add Movie" button to get started!</p>}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
