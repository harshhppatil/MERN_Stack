import Destination from '../models/Destination.js'

export const getDestinations = async (req, res, next) => {
  try {
    const { category, region, difficulty } = req.query
    const filter = {}
    if (category)   filter.category   = category
    if (region)     filter.region     = region
    if (difficulty) filter.difficulty = difficulty

    const destinations = await Destination.find(filter).sort({ createdAt: -1 })
    res.json(destinations)
  } catch (error) {
    next(error)
  }
}

export const getFeaturedDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ isFeatured: true }).limit(4)
    res.json(destinations)
  } catch (error) {
    next(error)
  }
}

export const getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (!destination) return res.status(404).json({ message: 'Destination not found' })
    res.json(destination)
  } catch (error) {
    next(error)
  }
}

export const createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body)
    res.status(201).json(destination)
  } catch (error) {
    next(error)
  }
}

export const updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!destination) return res.status(404).json({ message: 'Destination not found' })
    res.json(destination)
  } catch (error) {
    next(error)
  }
}

export const deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id)
    if (!destination) return res.status(404).json({ message: 'Destination not found' })
    res.json({ message: 'Destination deleted' })
  } catch (error) {
    next(error)
  }
}