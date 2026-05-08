import Species from '../models/Species.js'

export const getSpecies = async (req, res, next) => {
  try {
    const { habitat, conservationStatus } = req.query
    const filter = {}
    if (habitat)            filter.habitat            = habitat
    if (conservationStatus) filter.conservationStatus = conservationStatus

    const species = await Species.find(filter).sort({ name: 1 })
    res.json(species)
  } catch (error) {
    next(error)
  }
}

export const getFeaturedSpecies = async (req, res, next) => {
  try {
    const species = await Species.find({ isFeatured: true }).limit(6)
    res.json(species)
  } catch (error) {
    next(error)
  }
}

export const getSpeciesById = async (req, res, next) => {
  try {
    const species = await Species.findById(req.params.id)
    if (!species) return res.status(404).json({ message: 'Species not found' })
    res.json(species)
  } catch (error) {
    next(error)
  }
}

export const createSpecies = async (req, res, next) => {
  try {
    const species = await Species.create(req.body)
    res.status(201).json(species)
  } catch (error) {
    next(error)
  }
}