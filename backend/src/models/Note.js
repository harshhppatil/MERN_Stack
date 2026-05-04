import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      default: '',
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    color: {
      type: String,
      enum: ['yellow', 'purple', 'green', 'blue', 'pink', 'white'],
      default: 'white',
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

noteSchema.index({ user: 1, pinned: -1, updatedAt: -1 })

const Note = mongoose.model('Note', noteSchema)
export default Note