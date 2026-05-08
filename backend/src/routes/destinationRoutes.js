import express from 'express'
import {
  getDestinations, getFeaturedDestinations,
  getDestinationById, createDestination,
  updateDestination, deleteDestination,
} from '../controllers/destinationController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDestinations)
router.get('/featured', getFeaturedDestinations)
router.get('/:id', getDestinationById)
router.post('/', protect, adminOnly, createDestination)
router.put('/:id', protect, adminOnly, updateDestination)
router.delete('/:id', protect, adminOnly, deleteDestination)

export default router