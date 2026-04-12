import api from '../api/axios';

// Get all movies
export const getAllMovies = () => {
  return api.get('/movies');
};

// Get a single movie by its ID
export const getMovieById = (id) => {
  return api.get(`/movies/${id}`);
};

// Create a new movie
export const createMovie = (movieData) => {
  return api.post('/movies', movieData);
};

// Update a movie
export const updateMovie = (id, movieData) => {
  return api.put(`/movies/${id}`, movieData);
};

// Delete a movie
export const deleteMovie = (id) => {
  return api.delete(`/movies/${id}`);
};

// Toggle a movie in the user's favorites list
export const toggleFavorite = (id) => {
  return api.post(`/movies/${id}/favorite`);
};

// Toggle a movie in the user's watchlist
export const toggleWatchlist = (id) => {
  return api.post(`/movies/${id}/watchlist`);
};
