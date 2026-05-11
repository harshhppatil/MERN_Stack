import User from '../models/User.js'
import { validationResult } from 'express-validator'

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, phone, address } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password, phone, address })

    // Set session
    req.session.userId = user._id

    res.status(201).json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      phone:   user.phone,
      address: user.address,
      role:    user.role,
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Set session
    req.session.userId = user._id

    res.json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      phone:   user.phone,
      address: user.address,
      role:    user.role,
    })
  } catch (error) {
    next(error)
  }
}

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' })
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out successfully' })
  })
}

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    next(error)
  }
}