import express from 'express'
import { body } from 'express-validator'
import { protect } from '../middleware/authMiddleware.js'
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} from '../controllers/todoController.js'

const router = express.Router()

// All todo routes require authentication
router.use(protect)

const todoValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title too long'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description too long'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('Invalid date format'),
  body('tags').optional().isArray({ max: 5 }).withMessage('Max 5 tags allowed'),
  body('tags.*').optional().isString().trim().isLength({ max: 20 }).withMessage('Each tag max 20 chars'),
]

router.get('/', getTodos)
router.get('/:id', getTodoById)
router.post('/', todoValidation, createTodo)
router.put('/:id', todoValidation, updateTodo)
router.delete('/:id', deleteTodo)
router.patch('/:id/toggle', toggleTodoStatus)

export default router