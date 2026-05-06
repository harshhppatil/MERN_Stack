import mongoose from 'mongoose'

// ── Embedded review schema ──────────────────────────────────────────
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name:    { type: String, required: true },  // denormalised for display
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

// ── Main product schema ─────────────────────────────────────────────
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Clothing', 'Bags', 'Accessories', 'Home Decor'],
    },

    // Array of image URLs (e.g. Cloudinary links or local paths)
    images: {
      type: [String],
      default: [],
    },

    // tag shown on product card
    tag: {
      type: String,
      enum: ['bestseller', 'new', 'trending', ''],
      default: '',
    },

    stock: {
      type: Number,
      required: true,
      default: 10,
      min: [0, 'Stock cannot be negative'],
    },

    reviews: [reviewSchema],

    // auto-calculated fields
    numReviews: { type: Number, default: 0 },
    avgRating:  { type: Number, default: 0 },

    // soft-delete / visibility toggle
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// ── Recalculate avgRating & numReviews after reviews change ─────────
productSchema.methods.updateRatingStats = function () {
  const reviews = this.reviews
  this.numReviews = reviews.length
  this.avgRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

const Product = mongoose.model('Product', productSchema)
export default Product