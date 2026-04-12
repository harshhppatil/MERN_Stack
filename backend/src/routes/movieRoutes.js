import express from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  toggleFavorite,
  toggleWatchlist,
} from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllMovies).post(protect, createMovie);

router
  .route('/:id')
  .get(getMovieById)
  .put(protect, updateMovie)
  .delete(protect, deleteMovie);

router.route('/:id/favorite').post(protect, toggleFavorite);
router.route('/:id/watchlist').post(protect, toggleWatchlist);

export default router;
