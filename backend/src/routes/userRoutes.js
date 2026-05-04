import express from 'express'
import bcrypt from 'bcryptjs'
import { protect, adminOnly } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

// @desc   Get all users (admin only)
// @route  GET /api/users
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// @desc   Update own profile (name and/or password)
// @route  PUT /api/users/profile
// @access Protected
router.put('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password')

    const { name, currentPassword, newPassword } = req.body

    // Update name
    if (name && name.trim()) {
      user.name = name.trim()
    }

    // Update password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required' })
      }
      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' })
      }
      user.password = newPassword  // pre-save hook in User.js will hash it
    }

    const updated = await user.save()
    res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role })
  } catch (error) {
    next(error)
  }
})

// @desc   Delete own account and all their todos
// @route  DELETE /api/users/profile
// @access Protected
router.delete('/profile', protect, async (req, res, next) => {
  try {
    // Import Todo here to avoid circular deps at top level
    const { default: Todo } = await import('../models/Todo.js')
    await Todo.deleteMany({ user: req.user._id })
    await User.findByIdAndDelete(req.user._id)
    res.clearCookie('jwt')
    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    next(error)
  }
})

export default router