import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { confirmToast } from '../utils/confirmToast'

const PRIORITY = {
  high:   { label: '🔴 High',   classes: 'bg-red-100 text-red-600 border-red-300' },
  medium: { label: '🟡 Medium', classes: 'bg-orange-100 text-orange-600 border-orange-300' },
  low:    { label: '🟢 Low',    classes: 'bg-green-100 text-green-600 border-green-300' },
}

const STATUS = {
  'pending':     { label: 'Pending',     classes: 'bg-gray-100 text-gray-600 border-gray-300' },
  'in-progress': { label: 'In Progress', classes: 'bg-blue-100 text-blue-600 border-blue-300' },
  'completed':   { label: 'Done ✓',     classes: 'bg-green-100 text-green-700 border-green-300' },
}

export default function TodoCard({ todo, onUpdate, onDelete }) {
  const navigate = useNavigate()
  const p = PRIORITY[todo.priority]
  const s = STATUS[todo.status]

  const isOverdue = todo.dueDate &&
    new Date(todo.dueDate) < new Date() &&
    todo.status !== 'completed'

  const handleToggle = async () => {
    try {
      const { data } = await api.patch(`/todos/${todo._id}/toggle`)
      onUpdate(data)
      toast.success(`Moved to ${STATUS[data.status].label}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async () => {
    const ok = await confirmToast('Delete this todo?')
    if (!ok) return
    try {
      await api.delete(`/todos/${todo._id}`)
      onDelete(todo._id)
      toast.success('Deleted!')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className={`flex flex-col gap-3 p-5 bg-white border-2 border-black rounded-xl brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal-lg ${todo.status === 'completed' ? 'opacity-60' : ''}`}>
      {/* Header — badges + actions */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${p.classes}`}>{p.label}</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${s.classes}`}>{s.label}</span>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          <button onClick={handleToggle} title="Cycle status" className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-base">⚡</button>
          <button onClick={() => navigate(`/todo/${todo._id}`)} title="Edit" className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-base">✏️</button>
          <button onClick={handleDelete} title="Delete" className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer text-base">🗑️</button>
        </div>
      </div>

      {/* Title */}
      <h3 className={`font-head font-bold text-[1rem] leading-snug ${todo.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
        {todo.title}
      </h3>

      {/* Description */}
      {todo.description && (
        <p className="text-sm text-gray-500 leading-relaxed">
          {todo.description.length > 90 ? todo.description.slice(0, 90) + '…' : todo.description}
        </p>
      )}

      {/* Footer — due date + tags */}
      <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-1">
        {todo.dueDate ? (
          <span className={`text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
            📅 {new Date(todo.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            {isOverdue && ' ⚠️'}
          </span>
        ) : <span />}
        {todo.tags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {todo.tags.map(t => (
              <span key={t} className="text-xs font-bold bg-[#EDE9FF] text-[#5B00F0] px-2 py-0.5 rounded">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}