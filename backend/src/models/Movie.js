import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
    },
    description: { // Short description for cards
      type: String,
      required: true,
    },
    story: { // Longer plot summary for details page
      type: String,
      required: true,
    },
    posterImage: {
      type: String, // URL to the poster image
      required: true,
    },
    backdropImage: {
      type: String, // URL to a landscape backdrop image
    },
    releaseDate: {
      type: Date,
    },
    director: {
      type: String,
    },
    genres: [String],
    duration: { // e.g., "2h 44m"
      type: String,
    },
    rating: { // e.g., 8.0
      type: Number,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    cast: [String],
    watchProviders: [
      {
        name: String,
        url: String,
      },
    ],
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    watchlistedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
