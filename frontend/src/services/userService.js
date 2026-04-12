import api from '../api/axios';

// Get the current user's favorite movies
export const getUserFavorites = () => {
  return api.get('/users/profile/favorites');
};

// Get the current user's watchlist movies
export const getUserWatchlist = () => {
  return api.get('/users/profile/watchlist');
};
