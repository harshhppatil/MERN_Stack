import mongoose from 'mongoose'

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Car name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Sports', 'Sedan', 'SUV', 'Luxury', 'Convertible'],
      required: [true, 'Category is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    seats: {
      type: Number,
      required: [true, 'Seats is required'],
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual'],
      default: 'Automatic',
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      default: 'Petrol',
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Price per day is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: {
      type: [String],  // array of image URLs
      required: [true, 'At least one image is required'],
    },
    features: {
      type: [String],  // e.g. ['Sunroof', 'Heated Seats', 'Bang & Olufsen Sound']
      default: [],
    },
    specs: {
      engine:       { type: String },
      horsepower:   { type: Number },
      topSpeed:     { type: Number },   // in km/h
      acceleration: { type: String },   // e.g. "3.2s 0-100"
      drive:        { type: String },   // e.g. "AWD", "RWD"
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: 'Mumbai, India',
    },
  },
  { timestamps: true }
)

const Car = mongoose.model('Car', carSchema)
export default Car