import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour name is required'],
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,  // in days
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Extreme'],
      required: true,
    },
    pricePerPerson: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    includes: {
      type: [String],  // e.g. ['Expert guide', 'Meals', 'Accommodation']
      default: [],
    },
    excludes: {
      type: [String],  // e.g. ['Flights', 'Travel insurance']
      default: [],
    },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
    startDates: {
      type: [Date],
      default: [],
    },
    guideInfo: {
      name: { type: String },
      experience: { type: String },
    },
    category: {
      type: String,
      enum: ['Wildlife Safari', 'Ocean Expedition', 'Mountain Trek', 'River Journey', 'Arctic Expedition', 'Forest Immersion'],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Tour = mongoose.model('Tour', tourSchema)
export default Tour