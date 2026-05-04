import Todo from '../models/Todo.js'
import { validationResult } from 'express-validator'

// @desc    Get all todos for logged-in user
// @route   GET /api/todos
// @access  Protected
export const getTodos = async (req, res, next) => {
  try {
    const { status, priority, tag, sort = '-createdAt' } = req.query

    const filter = { user: req.user._id }
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (tag) filter.tags = tag // matches if tag is in the array

    const todos = await Todo.find(filter).sort(sort)
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

// @desc    Get a single todo by ID
// @route   GET /api/todos/:id
// @access  Protected
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id })
    if (!todo) return res.status(404).json({ message: 'Todo not found' })
    res.json(todo)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Protected
export const createTodo = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, priority, status, dueDate, tags } = req.body

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      priority,
      status: status || 'pending',
      dueDate: dueDate || null,
      tags: tags || [],
    })

    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Protected
export const updateTodo = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id })
    if (!todo) return res.status(404).json({ message: 'Todo not found' })

    const { title, description, status, priority, dueDate, tags } = req.body

    if (title !== undefined) todo.title = title
    if (description !== undefined) todo.description = description
    if (status !== undefined) todo.status = status
    if (priority !== undefined) todo.priority = priority
    if (dueDate !== undefined) todo.dueDate = dueDate || null
    if (tags !== undefined) todo.tags = tags

    const updated = await todo.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Protected
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!todo) return res.status(404).json({ message: 'Todo not found' })
    res.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle todo status (pending → in-progress → completed → pending)
// @route   PATCH /api/todos/:id/toggle
// @access  Protected
export const toggleTodoStatus = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id })
    if (!todo) return res.status(404).json({ message: 'Todo not found' })

    const cycle = { pending: 'in-progress', 'in-progress': 'completed', completed: 'pending' }
    todo.status = cycle[todo.status]

    const updated = await todo.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}