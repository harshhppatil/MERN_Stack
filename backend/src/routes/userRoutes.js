import express from 'express'
import { protect, adminOnly } from '../middleware/authMiddleware.js'
import User from '../models/User.js'
import Movie from '../models/Movie.js';

const router = express.Router()

// @desc  Get all users (admin only example)
// @route GET /api/users
// @access Admin
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// @desc  Get user's favorite movies
// @route GET /api/users/profile/favorites
// @access Private
router.get('/profile/favorites', protect, async (req, res, next) => {
  try {
    const movies = await Movie.find({ favoritedBy: req.user._id });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// @desc  Get user's watchlist movies
// @route GET /api/users/profile/watchlist
// @access Private
router.get('/profile/watchlist', protect, async (req, res, next) => {
  try {
    const movies = await Movie.find({ watchlistedBy: req.user._id });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// Friends can add their own user-related routes here 👇
// e.g. update profile, upload avatar, etc.

export default router