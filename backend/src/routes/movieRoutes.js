import express from 'express';
import {
  getAllMovies,
  getMovieById,
  toggleFavorite,
  toggleWatchlist,
} from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllMovies);

router.route('/:id').get(getMovieById);

router.route('/:id/favorite').post(protect, toggleFavorite);
router.route('/:id/watchlist').post(protect, toggleWatchlist);

export default router;
