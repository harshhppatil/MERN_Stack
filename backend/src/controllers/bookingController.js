import Booking from '../models/Booking.js'
import Car from '../models/Car.js'

// @desc   Create a new booking
// @route  POST /api/bookings
// @access Protected
export const createBooking = async (req, res, next) => {
  try {
    const { carId, startDate, endDate, pickupLocation, specialRequests } = req.body

    // Check car exists
    const car = await Car.findById(carId)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (!car.isAvailable) return res.status(400).json({ message: 'Car is not available' })

    const start = new Date(startDate)
    const end = new Date(endDate)

    // Basic date validation
    if (start >= end) {
      return res.status(400).json({ message: 'End date must be after start date' })
    }
    if (start < new Date()) {
      return res.status(400).json({ message: 'Start date cannot be in the past' })
    }

    // Check if car is already booked for overlapping dates
    const overlapping = await Booking.findOne({
      car: carId,
      status: { $ne: 'cancelled' },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
      ],
    })

    if (overlapping) {
      return res.status(400).json({
        message: 'Car is already booked for the selected dates',
      })
    }

    // Calculate total days and price
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    const totalPrice = totalDays * car.pricePerDay

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      startDate: start,
      endDate: end,
      totalDays,
      totalPrice,
      pickupLocation,
      specialRequests,
    })

    // Populate car details in response
    await booking.populate('car', 'name brand images pricePerDay')

    res.status(201).json(booking)
  } catch (error) {
    next(error)
  }
}

// @desc   Get all bookings of logged-in user
// @route  GET /api/bookings/my
// @access Protected
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car', 'name brand images pricePerDay category')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

// @desc   Get single booking by ID
// @route  GET /api/bookings/:id
// @access Protected
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car', 'name brand images pricePerDay category specs')
      .populate('user', 'name email')

    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    // Make sure user can only see their own bookings
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this booking' })
    }

    res.json(booking)
  } catch (error) {
    next(error)
  }
}

// @desc   Cancel a booking
// @route  PUT /api/bookings/:id/cancel
// @access Protected
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    // Only the booking owner can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' })
    }

    // Cannot cancel already cancelled booking
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' })
    }

    // Cannot cancel if start date has passed
    if (new Date(booking.startDate) < new Date()) {
      return res.status(400).json({ message: 'Cannot cancel a booking that has already started' })
    }

    booking.status = 'cancelled'
    await booking.save()

    res.json({ message: 'Booking cancelled successfully', booking })
  } catch (error) {
    next(error)
  }
}

// @desc   Check availability for a car on given dates
// @route  GET /api/bookings/check-availability
// @access Public
export const checkAvailability = async (req, res, next) => {
  try {
    const { carId, startDate, endDate } = req.query

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: 'carId, startDate and endDate are required' })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    const overlapping = await Booking.findOne({
      car: carId,
      status: { $ne: 'cancelled' },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
      ],
    })

    res.json({ available: !overlapping })
  } catch (error) {
    next(error)
  }
}