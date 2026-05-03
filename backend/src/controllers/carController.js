import Car from '../models/Car.js'

// @desc   Get all cars (with optional filters)
// @route  GET /api/cars
// @access Public
export const getCars = async (req, res, next) => {
  try {
    const { brand, category, minPrice, maxPrice, transmission } = req.query

    // Build filter object dynamically based on query params
    const filter = { isAvailable: true }

    if (brand)        filter.brand        = { $regex: brand, $options: 'i' }
    if (category)     filter.category     = category
    if (transmission) filter.transmission = transmission
    if (minPrice || maxPrice) {
      filter.pricePerDay = {}
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice)
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice)
    }

    const cars = await Car.find(filter).sort({ pricePerDay: -1 })
    res.json(cars)
  } catch (error) {
    next(error)
  }
}

// @desc   Get single car by ID
// @route  GET /api/cars/:id
// @access Public
export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json(car)
  } catch (error) {
    next(error)
  }
}

// @desc   Get featured cars (top 3 most expensive = most premium)
// @route  GET /api/cars/featured
// @access Public
export const getFeaturedCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ isAvailable: true })
      .sort({ pricePerDay: -1 })
      .limit(3)
    res.json(cars)
  } catch (error) {
    next(error)
  }
}

// @desc   Add a new car
// @route  POST /api/cars
// @access Admin only
export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body)
    res.status(201).json(car)
  } catch (error) {
    next(error)
  }
}

// @desc   Update a car
// @route  PUT /api/cars/:id
// @access Admin only
export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json(car)
  } catch (error) {
    next(error)
  }
}

// @desc   Delete a car
// @route  DELETE /api/cars/:id
// @access Admin only
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json({ message: 'Car deleted successfully' })
  } catch (error) {
    next(error)
  }
}