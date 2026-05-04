import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const EMPTY = { title: '', description: '', priority: 'medium', status: 'pending', dueDate: '', tags: [] }

export default function TodoModal({ onClose, onSave, existing }) {
  const [form, setForm]     = useState(existing ? {
    ...existing,
    dueDate: existing.dueDate ? existing.dueDate.slice(0, 10) : '',
  } : EMPTY)
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

  const addTag = (e) => {
    if (e.key !== 'Enter' && e.key !== ',') return
    e.preventDefault()
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (!tag || form.tags.includes(tag) || form.tags.length >= 5) return
    setForm(p => ({ ...p, tags: [...p.tags, tag] }))
    setTagInput('')
  }

  const removeTag = (tag) => setForm(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = { ...form, dueDate: form.dueDate || null }
      const { data } = existing
        ? await api.put(`/todos/${existing._id}`, payload)
        : await api.post('/todos', payload)
      toast.success(existing ? 'Updated!' : 'Todo created!')
      onSave(data, !!existing)
      onClose()
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Something went wrong'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // Close on overlay click or Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const inputCls = "w-full border-2 border-black rounded-lg px-3 py-2.5 text-sm font-medium bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"
  const labelCls = "block text-sm font-semibold mb-1.5"

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border-2 border-black rounded-2xl brutal-lg w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[slideUp_0.2s_ease]"
        style={{ animation: 'slideUp 0.2s ease' }}>
        <style>{`@keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-black">
          <h2 className="font-head text-xl font-extrabold">
            {existing ? 'Edit Todo' : '✦ New Todo'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-lg font-bold">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className={labelCls}>Title *</label>
            <input className={inputCls} placeholder="What needs to be done?" value={form.title} onChange={set('title')} required maxLength={100} />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none min-h-[80px]`} placeholder="Add some details..." value={form.description} onChange={set('description')} maxLength={500} />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Priority</label>
              <select className={inputCls} value={form.priority} onChange={set('priority')}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={form.status} onChange={set('status')}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className={labelCls}>Due Date</label>
            <input className={inputCls} type="date" value={form.dueDate} onChange={set('dueDate')} />
          </div>

          {/* Tags */}
          <div>
            <label className={labelCls}>Tags <span className="text-gray-400 font-normal">(max 5, press Enter or comma)</span></label>
            {form.tags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap mb-2">
                {form.tags.map(t => (
                  <button key={t} type="button" onClick={() => removeTag(t)}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-[#EDE9FF] text-[#5B00F0] border border-[#5B00F0] rounded px-2 py-0.5 hover:bg-red-100 hover:text-red-600 hover:border-red-400 cursor-pointer transition-colors">
                    #{t} <span>×</span>
                  </button>
                ))}
              </div>
            )}
            <input
              className={inputCls}
              placeholder={form.tags.length >= 5 ? 'Max 5 tags reached' : 'e.g. work, urgent'}
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={addTag}
              disabled={form.tags.length >= 5}
            />
          </div>

          {error && <p className="text-sm font-semibold text-red-500">⚠ {error}</p>}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold border-2 border-black rounded-lg hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer bg-white">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold border-2 border-black rounded-lg bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none">
              {loading ? 'Saving…' : existing ? 'Save Changes' : '+ Create Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}