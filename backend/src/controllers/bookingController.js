import Booking from '../models/Booking.js'
import Tour from '../models/Tour.js'

export const createBooking = async (req, res, next) => {
  try {
    const { tourId, startDate, groupSize, specialRequests } = req.body

    const tour = await Tour.findById(tourId)
    if (!tour) return res.status(404).json({ message: 'Tour not found' })
    if (!tour.isAvailable) return res.status(400).json({ message: 'Tour is not available' })

    if (groupSize > tour.maxGroupSize) {
      return res.status(400).json({
        message: `Maximum group size for this tour is ${tour.maxGroupSize}`,
      })
    }

    if (new Date(startDate) < new Date()) {
      return res.status(400).json({ message: 'Start date cannot be in the past' })
    }

    const totalPrice = groupSize * tour.pricePerPerson

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      startDate,
      groupSize,
      totalPrice,
      specialRequests,
    })

    await booking.populate('tour', 'name images pricePerPerson duration destination')
    res.status(201).json(booking)
  } catch (error) {
    next(error)
  }
}

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'tour',
        select: 'name images pricePerPerson duration category',
        populate: { path: 'destination', select: 'name country' },
      })
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'tour',
        populate: { path: 'destination', select: 'name country images' },
      })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    res.json(booking)
  } catch (error) {
    next(error)
  }
}

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Already cancelled' })
    }
    if (new Date(booking.startDate) < new Date()) {
      return res.status(400).json({ message: 'Cannot cancel a tour that has already started' })
    }
    booking.status = 'cancelled'
    await booking.save()
    res.json({ message: 'Booking cancelled', booking })
  } catch (error) {
    next(error)
  }
}