import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

// @desc   Get logged-in user's profile
// @route  GET /api/users/profile
// @access Protected
router.get('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// @desc   Update logged-in user's profile (name, phone, address)
// @route  PUT /api/users/profile
// @access Protected
router.put('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const { name, phone, address } = req.body

    if (name)    user.name    = name
    if (phone)   user.phone   = phone
    if (address) user.address = { ...user.address.toObject(), ...address }

    const updated = await user.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

export default router