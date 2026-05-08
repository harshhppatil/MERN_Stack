import express from 'express'
import {
  getSpecies, getFeaturedSpecies,
  getSpeciesById, createSpecies,
} from '../controllers/speciesController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getSpecies)
router.get('/featured', getFeaturedSpecies)
router.get('/:id', getSpeciesById)
router.post('/', protect, adminOnly, createSpecies)

export default router