import mongoose from 'mongoose'

const speciesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    habitat: {
      type: String,
      enum: ['Ocean', 'Mountain', 'Forest', 'River', 'Desert', 'Arctic'],
      required: true,
    },
    conservationStatus: {
      type: String,
      enum: ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    funFact: {
      type: String,
      default: '',
    },
    foundAt: {
      type: [String],  // destination names where this species is found
      default: [],
    },
    characteristics: {
      weight: { type: String },
      length: { type: String },
      lifespan: { type: String },
      diet: { type: String },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Species = mongoose.model('Species', speciesSchema)
export default Species