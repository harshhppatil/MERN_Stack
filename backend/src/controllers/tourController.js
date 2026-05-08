import Tour from '../models/Tour.js'

export const getTours = async (req, res, next) => {
  try {
    const { category, difficulty, maxDuration, destination } = req.query
    const filter = { isAvailable: true }

    if (category)    filter.category    = category
    if (difficulty)  filter.difficulty  = difficulty
    if (destination) filter.destination = destination
    if (maxDuration) filter.duration    = { $lte: Number(maxDuration) }

    const tours = await Tour.find(filter)
      .populate('destination', 'name country images category')
      .sort({ pricePerPerson: 1 })
    res.json(tours)
  } catch (error) {
    next(error)
  }
}

export const getFeaturedTours = async (req, res, next) => {
  try {
    const tours = await Tour.find({ isAvailable: true })
      .populate('destination', 'name country images')
      .sort({ pricePerPerson: -1 })
      .limit(3)
    res.json(tours)
  } catch (error) {
    next(error)
  }
}

export const getTourById = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate('destination', 'name country images category region')
    if (!tour) return res.status(404).json({ message: 'Tour not found' })
    res.json(tour)
  } catch (error) {
    next(error)
  }
}

export const createTour = async (req, res, next) => {
  try {
    const tour = await Tour.create(req.body)
    res.status(201).json(tour)
  } catch (error) {
    next(error)
  }
}

export const updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!tour) return res.status(404).json({ message: 'Tour not found' })
    res.json(tour)
  } catch (error) {
    next(error)
  }
}

export const deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) return res.status(404).json({ message: 'Tour not found' })
    res.json({ message: 'Tour deleted' })
  } catch (error) {
    next(error)
  }
}