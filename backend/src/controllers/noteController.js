import Note from '../models/Note.js'
import { validationResult } from 'express-validator'

// @desc   Get all notes for logged-in user (pinned first)
// @route  GET /api/notes
export const getNotes = async (req, res, next) => {
  try {
    const { search } = req.query
    const filter = { user: req.user._id }
    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ]
    }
    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 })
    res.json(notes)
  } catch (error) {
    next(error)
  }
}

// @desc   Get single note
// @route  GET /api/notes/:id
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json(note)
  } catch (error) {
    next(error)
  }
}

// @desc   Create a note
// @route  POST /api/notes
export const createNote = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { title, content, color } = req.body
    const note = await Note.create({ user: req.user._id, title, content, color })
    res.status(201).json(note)
  } catch (error) {
    next(error)
  }
}

// @desc   Update a note
// @route  PUT /api/notes/:id
export const updateNote = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
    if (!note) return res.status(404).json({ message: 'Note not found' })

    const { title, content, color } = req.body
    if (title   !== undefined) note.title   = title
    if (content !== undefined) note.content = content
    if (color   !== undefined) note.color   = color

    const updated = await note.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// @desc   Toggle pin
// @route  PATCH /api/notes/:id/pin
export const togglePin = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
    if (!note) return res.status(404).json({ message: 'Note not found' })
    note.pinned = !note.pinned
    const updated = await note.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// @desc   Delete a note
// @route  DELETE /api/notes/:id
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json({ message: 'Note deleted' })
  } catch (error) {
    next(error)
  }
}