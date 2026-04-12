import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();
        setMovies(response.data);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">All Movies</h1>
      </div>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-xl">No movies have been added yet.</p>
          {user && <p className="mt-2">Click the "+ Add Movie" button to get started!</p>}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
