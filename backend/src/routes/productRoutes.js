import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/',    getProducts)       // GET  /api/products
router.get('/:id', getProductById)   // GET  /api/products/:id

// Protected — logged-in users
router.post('/:id/review', protect, addReview)  // POST /api/products/:id/review

// Admin only
router.post('/',    protect, createProduct)   // POST   /api/products
router.put('/:id',  protect, updateProduct)   // PUT    /api/products/:id
router.delete('/:id', protect, deleteProduct) // DELETE /api/products/:id

export default router