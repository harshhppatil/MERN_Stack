import express from 'express'
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Protected — logged-in users
router.post('/',            protect,              placeOrder)       // POST   /api/orders
router.get('/myorders',     protect,              getMyOrders)      // GET    /api/orders/myorders
router.get('/:id',          protect,              getOrderById)     // GET    /api/orders/:id

// Admin only
router.get('/',             protect, adminOnly,   getAllOrders)     // GET    /api/orders
router.put('/:id/status',   protect, adminOnly,   updateOrderStatus)// PUT   /api/orders/:id/status

export default router