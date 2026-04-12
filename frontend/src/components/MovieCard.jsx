import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <Link to={`/movie/${movie._id}`}>
        <img
          src={movie.posterImage}
          alt={movie.title}
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <p className="text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {new Date(movie.releaseDate).getFullYear()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
