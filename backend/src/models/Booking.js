import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    groupSize: {
      type: Number,
      required: [true, 'Group size is required'],
      min: [1, 'Group size must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    specialRequests: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking