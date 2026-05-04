import express from 'express'
import { protect, adminOnly } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

// Get all users — admin only
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// Update logged-in user profile
router.put('/me', protect, async (req, res, next) => {
  try {
    const { name, phone, address } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address },
      { new: true }
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Delete logged-in user account
router.delete('/me', protect, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id)
    res.clearCookie('jwt')
    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    next(error)
  }
})

export default router