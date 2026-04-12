import Movie from '../models/Movie.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate('addedBy', 'name');
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single movie by ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404);
      throw new Error('Movie not found');
    }
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle a movie in user's favorites
// @route   POST /api/movies/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(404);
      throw new Error('Movie not found');
    }

    const isFavorited = movie.favoritedBy.includes(userId);

    if (isFavorited) {
      // Remove from favorites
      movie.favoritedBy = movie.favoritedBy.filter(id => id.toString() !== userId);
    } else {
      // Add to favorites
      movie.favoritedBy.push(userId);
    }

    await movie.save();
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle a movie in user's watchlist
// @route   POST /api/movies/:id/watchlist
// @access  Private
export const toggleWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(404);
      throw new Error('Movie not found');
    }

    const isWatchlisted = movie.watchlistedBy.includes(userId);

    if (isWatchlisted) {
      // Remove from watchlist
      movie.watchlistedBy = movie.watchlistedBy.filter(id => id.toString() !== userId);
    } else {
      // Add to watchlist
      movie.watchlistedBy.push(userId);
    }

    await movie.save();
    res.json(movie);
  } catch (error) {
    next(error);
  }
};
