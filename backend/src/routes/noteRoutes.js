import express from 'express'
import { body } from 'express-validator'
import { protect } from '../middleware/authMiddleware.js'
import { getNotes, getNoteById, createNote, updateNote, togglePin, deleteNote } from '../controllers/noteController.js'

const router = express.Router()

router.use(protect)

const noteValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('content').optional().isLength({ max: 5000 }).withMessage('Content too long'),
  body('color').optional().isIn(['yellow', 'purple', 'green', 'blue', 'pink', 'white']),
]

router.get('/',          getNotes)
router.get('/:id',       getNoteById)
router.post('/',         noteValidation, createNote)
router.put('/:id',       noteValidation, updateNote)
router.patch('/:id/pin', togglePin)
router.delete('/:id',    deleteNote)

export default router