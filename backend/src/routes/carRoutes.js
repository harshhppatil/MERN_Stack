import express from 'express'
import {
  getCars,
  getCarById,
  getFeaturedCars,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getCars)
router.get('/featured', getFeaturedCars)  // ⚠️ must be before /:id
router.get('/:id', getCarById)

// Admin only routes
router.post('/', protect, adminOnly, createCar)
router.put('/:id', protect, adminOnly, updateCar)
router.delete('/:id', protect, adminOnly, deleteCar)

export default router