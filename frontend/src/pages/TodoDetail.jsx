import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { confirmToast } from '../utils/confirmToast'
import Navbar from '../components/Navbar'

export default function TodoDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [form, setForm]     = useState(null)
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    api.get(`/todos/${id}`)
      .then(({ data }) => setForm({ ...data, dueDate: data.dueDate ? data.dueDate.slice(0, 10) : '' }))
      .catch(() => { toast.error('Todo not found'); navigate('/dashboard') })
      .finally(() => setLoading(false))
  }, [id])

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const addTag = (e) => {
    if (e.key !== 'Enter' && e.key !== ',') return
    e.preventDefault()
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (!tag || form.tags.includes(tag) || form.tags.length >= 5) return
    setForm(p => ({ ...p, tags: [...p.tags, tag] }))
    setTagInput('')
  }

  const removeTag = (tag) => setForm(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await api.put(`/todos/${id}`, { ...form, dueDate: form.dueDate || null })
      toast.success('Saved!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const ok = await confirmToast('Delete this todo?')
    if (!ok) return
    try {
      await api.delete(`/todos/${id}`)
      toast.success('Deleted!')
      navigate('/dashboard')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const inputCls = "w-full border-2 border-black rounded-lg px-3.5 py-2.5 text-sm font-medium bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F2]">
        <Navbar />
        <div className="flex justify-center py-24">
          <div className="w-9 h-9 rounded-full border-4 border-gray-200 border-t-[#5B00F0] animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      <Navbar />

      <main className="max-w-xl mx-auto px-5 py-10">
        {/* Back */}
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm font-semibold mb-6 hover:text-[#5B00F0] transition-colors cursor-pointer">
          ← Back to Dashboard
        </button>

        <div className="bg-white border-2 border-black rounded-2xl brutal-lg p-8">
          <div className="flex items-center justify-between mb-7">
            <h1 className="font-head text-2xl font-extrabold">Edit Todo</h1>
            <button onClick={handleDelete}
              className="px-4 py-2 text-sm font-bold border-2 border-black rounded-lg bg-red-500 text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer">
              🗑 Delete
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">Title *</label>
              <input className={inputCls} value={form.title} onChange={set('title')} required maxLength={100} />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">Description</label>
              <textarea className={`${inputCls} resize-none min-h-[100px]`} value={form.description} onChange={set('description')} maxLength={500} />
            </div>

            {/* Priority + Status + Due */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Priority</label>
                <select className={inputCls} value={form.priority} onChange={set('priority')}>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Status</label>
                <select className={inputCls} value={form.status} onChange={set('status')}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Due Date</label>
                <input className={inputCls} type="date" value={form.dueDate} onChange={set('dueDate')} />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Tags <span className="text-gray-400 font-normal">(max 5, Enter or comma)</span>
              </label>
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
              <input className={inputCls}
                placeholder={form.tags.length >= 5 ? 'Max 5 tags reached' : 'Add a tag…'}
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={addTag}
                disabled={form.tags.length >= 5}
              />
            </div>

            {error && <p className="text-sm font-semibold text-red-500">⚠ {error}</p>}

            {/* Meta info */}
            <div className="text-xs text-gray-400 font-medium border-t border-gray-100 pt-3">
              Created: {new Date(form.createdAt).toLocaleString('en-IN')}
              {form.updatedAt !== form.createdAt && (
                <> · Updated: {new Date(form.updatedAt).toLocaleString('en-IN')}</>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => navigate('/dashboard')}
                className="px-5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 text-sm font-bold border-2 border-black rounded-xl bg-[#5B00F0] text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}