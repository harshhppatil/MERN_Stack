import express from 'express'
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  checkAvailability,
} from '../controllers/bookingController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public
router.get('/check-availability', checkAvailability)

// Protected — must be logged in
router.post('/', protect, createBooking)
router.get('/my', protect, getMyBookings)
router.get('/:id', protect, getBookingById)
router.put('/:id/cancel', protect, cancelBooking)

export default router