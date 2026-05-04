import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { confirmToast } from '../utils/confirmToast'
import Navbar from '../components/Navbar'

const COLOR_MAP = {
  white:  { bg: 'bg-white',        border: 'border-black',     label: '⬜ White'  },
  yellow: { bg: 'bg-yellow-50',    border: 'border-yellow-400',label: '🟡 Yellow' },
  purple: { bg: 'bg-purple-50',    border: 'border-purple-400',label: '🟣 Purple' },
  green:  { bg: 'bg-green-50',     border: 'border-green-400', label: '🟢 Green'  },
  blue:   { bg: 'bg-blue-50',      border: 'border-blue-400',  label: '🔵 Blue'   },
  pink:   { bg: 'bg-pink-50',      border: 'border-pink-400',  label: '🩷 Pink'   },
}

const EMPTY_FORM = { title: '', content: '', color: 'white' }

function NoteModal({ onClose, onSave, existing }) {
  const [form, setForm]   = useState(existing || EMPTY_FORM)
  const [loading, setLoading] = useState(false)

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = existing
        ? await api.put(`/notes/${existing._id}`, form)
        : await api.post('/notes', form)
      toast.success(existing ? 'Note updated!' : 'Note created!')
      onSave(data, !!existing)
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.errors?.[0]?.msg || 'Failed to save note')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const inputCls = "w-full border-2 border-black rounded-lg px-3.5 py-2.5 text-sm font-medium bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white border-2 border-black rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '6px 6px 0 #0A0A0A', animation: 'slideUp 0.2s ease' }}>
        <style>{`@keyframes slideUp { from { transform: translateY(16px); opacity:0 } to { transform: translateY(0); opacity:1 } }`}</style>

        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-black">
          <h2 className="font-head text-xl font-extrabold">{existing ? 'Edit Note' : '📝 New Note'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-lg font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Title *</label>
            <input className={inputCls} placeholder="Note title…" value={form.title} onChange={set('title')} required maxLength={100} />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Content</label>
            <textarea
              className={`${inputCls} resize-none`}
              style={{ minHeight: '180px' }}
              placeholder="Write anything — ideas, plans, thoughts…"
              value={form.content}
              onChange={set('content')}
              maxLength={5000}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{form.content.length}/5000</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Color</label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(COLOR_MAP).map(([key, val]) => (
                <button key={key} type="button"
                  onClick={() => setForm(p => ({ ...p, color: key }))}
                  className={`px-3 py-1.5 text-xs font-bold border-2 rounded-lg cursor-pointer transition-all ${form.color === key ? 'border-[#5B00F0] shadow-[2px_2px_0_#5B00F0]' : 'border-black hover:brutal-sm'} ${val.bg}`}>
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all disabled:opacity-50 cursor-pointer">
              {loading ? 'Saving…' : existing ? 'Save Changes' : '+ Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function NoteCard({ note, onUpdate, onDelete, onEdit }) {
  const c = COLOR_MAP[note.color] || COLOR_MAP.white

  const handlePin = async () => {
    try {
      const { data } = await api.patch(`/notes/${note._id}/pin`)
      onUpdate(data)
      toast.success(data.pinned ? 'Note pinned!' : 'Note unpinned')
    } catch {
      toast.error('Failed to pin note')
    }
  }

  const handleDelete = async () => {
    const ok = await confirmToast('Delete this note?')
    if (!ok) return
    try {
      await api.delete(`/notes/${note._id}`)
      onDelete(note._id)
      toast.success('Note deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className={`flex flex-col gap-3 p-5 border-2 ${c.border} rounded-xl ${c.bg} transition-all hover:-translate-x-0.5 hover:-translate-y-0.5`}
      style={{ boxShadow: '4px 4px 0 #0A0A0A' }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-head font-bold text-[1rem] leading-snug flex-1">
          {note.pinned && <span className="mr-1">📌</span>}
          {note.title}
        </h3>
        <div className="flex gap-0.5 flex-shrink-0">
          <button onClick={handlePin} title={note.pinned ? 'Unpin' : 'Pin'}
            className={`p-1.5 rounded-lg cursor-pointer text-base transition-colors ${note.pinned ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}>
            📌
          </button>
          <button onClick={onEdit} title="Edit"
            className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-base">
            ✏️
          </button>
          <button onClick={handleDelete} title="Delete"
            className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer text-base">
            🗑️
          </button>
        </div>
      </div>

      {/* Content preview */}
      {note.content && (
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {note.content.length > 150 ? note.content.slice(0, 150) + '…' : note.content}
        </p>
      )}

      {/* Footer */}
      <p className="text-xs text-gray-400 font-medium mt-auto pt-1 border-t border-black/10">
        {new Date(note.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </div>
  )
}

export default function Notes() {
  const navigate = useNavigate()
  const [notes, setNotes]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing]     = useState(null)

  useEffect(() => { fetchNotes() }, [])

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes')
      setNotes(data)
    } catch {
      toast.error('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return notes
    const q = search.toLowerCase()
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content?.toLowerCase().includes(q)
    )
  }, [notes, search])

  const pinned   = filtered.filter(n => n.pinned)
  const unpinned = filtered.filter(n => !n.pinned)

  const handleSave = (saved, isEdit) => {
    if (isEdit) setNotes(p => p.map(n => n._id === saved._id ? saved : n))
    else        setNotes(p => [saved, ...p])
  }
  const handleUpdate = (updated) => setNotes(p => p.map(n => n._id === updated._id ? updated : n))
  const handleDelete = (id)      => setNotes(p => p.filter(n => n._id !== id))

  const openEdit = (note) => { setEditing(note); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditing(null) }

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-5 py-9">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-7">
          <div>
            <h1 className="font-head text-4xl font-extrabold leading-tight">
              Your <span className="text-[#5B00F0]">Notes</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">{notes.length} note{notes.length !== 1 ? 's' : ''} total</p>
          </div>
          <button onClick={() => { setEditing(null); setShowModal(true) }}
            className="flex items-center gap-2 px-5 py-3 font-bold text-sm border-2 border-black rounded-xl bg-[#FFE500] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer">
            + New Note
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-7 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search notes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-9 h-9 rounded-full border-4 border-gray-200 border-t-[#5B00F0] animate-spin" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-black rounded-xl bg-white">
            <p className="text-4xl mb-3">📓</p>
            <h3 className="font-head font-bold text-xl mb-1">No notes yet</h3>
            <p className="text-sm text-gray-500">Hit "+ New Note" to capture your first thought.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-black rounded-xl bg-white">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="font-head font-bold text-xl mb-1">No results</h3>
            <p className="text-sm text-gray-500">Nothing matches "{search}"</p>
          </div>
        ) : (
          <>
            {/* Pinned section */}
            {pinned.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">📌 Pinned</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pinned.map(note => (
                    <NoteCard key={note._id} note={note}
                      onUpdate={handleUpdate}
                      onEdit={() => openEdit(note)}
                      onDelete={handleDelete} />
                  ))}
                </div>
              </div>
            )}

            {/* All notes */}
            {unpinned.length > 0 && (
              <div>
                {pinned.length > 0 && (
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">All Notes</h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {unpinned.map(note => (
                    <NoteCard key={note._id} note={note}
                      onUpdate={handleUpdate}
                      onEdit={() => openEdit(note)}
                      onDelete={handleDelete} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {showModal && (
        <NoteModal onClose={closeModal} onSave={handleSave} existing={editing} />
      )}
    </div>
  )
}