import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
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
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
      // trim each tag, max 5 tags
      validate: {
        validator: (arr) => arr.length <= 5,
        message: 'You can add at most 5 tags',
      },
    },
  },
  { timestamps: true }
)

// Index so queries are fast per user
todoSchema.index({ user: 1, createdAt: -1 })
todoSchema.index({ user: 1, status: 1 })
todoSchema.index({ user: 1, priority: 1 })

const Todo = mongoose.model('Todo', todoSchema)
export default Todo