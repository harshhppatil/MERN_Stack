import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
    },
    region: {
      type: String,
      enum: ['Asia', 'Africa', 'Americas', 'Europe', 'Oceania', 'Antarctica'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Ocean', 'Mountain', 'Forest', 'River', 'Desert', 'Arctic'],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      required: true,
    },
    bestSeason: {
      type: String,
      required: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    wildlife: {
      type: [String],  // species names found here
      default: [],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Extreme'],
      default: 'Moderate',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Destination = mongoose.model('Destination', destinationSchema)
export default Destination