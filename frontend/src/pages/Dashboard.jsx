import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import TodoCard from '../components/TodoCard'
import TodoModal from '../components/TodoModal'

const STATUS_FILTERS = ['all', 'pending', 'in-progress', 'completed']
const PRIORITY_OPTS  = [
  { value: '',       label: 'All Priorities' },
  { value: 'high',   label: '🔴 High' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'low',    label: '🟢 Low' },
]
const SORT_OPTS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt',  label: 'Oldest First' },
  { value: 'dueDate',    label: 'Due Date' },
  { value: '-priority',  label: 'Priority' },
]

// Priority weight for client-side sort
const PRI_WEIGHT = { high: 3, medium: 2, low: 1 }

export default function Dashboard() {
  const { user }  = useAuth()
  const [todos, setTodos]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [statusFilter, setStatus] = useState('all')
  const [priorityFilter, setPriority] = useState('')
  const [search, setSearch]       = useState('')
  const [sort, setSort]           = useState('-createdAt')

  useEffect(() => { fetchTodos() }, [])

  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos')
      setTodos(data)
    } catch {
      toast.error('Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    let result = todos.filter(t => {
      const matchStatus   = statusFilter === 'all' || t.status === statusFilter
      const matchPriority = !priorityFilter || t.priority === priorityFilter
      const matchSearch   = !search.trim() ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase()) ||
        t.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      return matchStatus && matchPriority && matchSearch
    })

    // Client-side sort
    result = [...result].sort((a, b) => {
      switch (sort) {
        case '-createdAt': return new Date(b.createdAt) - new Date(a.createdAt)
        case 'createdAt':  return new Date(a.createdAt) - new Date(b.createdAt)
        case 'dueDate':
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case '-priority':  return (PRI_WEIGHT[b.priority] || 0) - (PRI_WEIGHT[a.priority] || 0)
        default:           return 0
      }
    })
    return result
  }, [todos, statusFilter, priorityFilter, search, sort])

  const stats = useMemo(() => ({
    total:      todos.length,
    pending:    todos.filter(t => t.status === 'pending').length,
    inProgress: todos.filter(t => t.status === 'in-progress').length,
    completed:  todos.filter(t => t.status === 'completed').length,
  }), [todos])

  const progress = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

  const handleUpdate = (updated) => setTodos(p => p.map(t => t._id === updated._id ? updated : t))
  const handleDelete = (id)      => setTodos(p => p.filter(t => t._id !== id))
  const handleCreate = (created) => setTodos(p => [created, ...p])

  const pillCls = (val) =>
    `px-4 py-1.5 text-sm font-bold border-2 border-black rounded-full cursor-pointer transition-all hover:-translate-y-0.5 hover:brutal-sm capitalize ${statusFilter === val ? 'bg-black text-white' : 'bg-white'}`

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-5 py-9">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-7">
          <div>
            <h1 className="font-head text-4xl font-extrabold leading-tight">
              Your <span className="text-[#5B00F0]">Tasks</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 font-bold text-sm border-2 border-black rounded-xl bg-[#FFE500] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal transition-all cursor-pointer">
            + New Todo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Total',       value: stats.total,      color: 'text-[#5B00F0]' },
            { label: 'Pending',     value: stats.pending,    color: 'text-orange-500' },
            { label: 'In Progress', value: stats.inProgress, color: 'text-blue-600'  },
            { label: 'Completed',   value: stats.completed,  color: 'text-green-600' },
          ].map(s => (
            <div key={s.label} className="bg-white border-2 border-black rounded-xl p-4 brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:brutal-lg transition-all">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`font-head text-4xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {stats.total > 0 && (
          <div className="bg-white border-2 border-black rounded-xl p-4 brutal mb-7">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">Overall Progress</span>
              <span className="text-sm font-extrabold text-[#5B00F0]">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full border border-black overflow-hidden">
              <div
                className="h-full bg-[#5B00F0] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">
              {stats.completed} of {stats.total} tasks completed
            </p>
          </div>
        )}

        {/* Search + Sort */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by title, description or tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm font-medium border-2 border-black rounded-xl bg-white outline-none focus:shadow-[3px_3px_0_#5B00F0] focus:border-[#5B00F0] transition-all"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-sm font-semibold border-2 border-black rounded-xl px-3 py-2.5 bg-white outline-none cursor-pointer hover:brutal-sm transition-all">
            {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5 mb-6 flex-wrap">
          {STATUS_FILTERS.map(f => (
            <button key={f} onClick={() => setStatus(f)} className={pillCls(f)}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
          <select
            value={priorityFilter}
            onChange={e => setPriority(e.target.value)}
            className="ml-auto text-sm font-semibold border-2 border-black rounded-lg px-3 py-1.5 bg-white outline-none cursor-pointer hover:brutal-sm transition-all">
            {PRIORITY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-9 h-9 rounded-full border-4 border-gray-200 border-t-[#5B00F0] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-black rounded-xl bg-white">
            <p className="text-4xl mb-3">{search ? '🔍' : '📭'}</p>
            <h3 className="font-head font-bold text-xl mb-1">
              {todos.length === 0 ? 'No todos yet!' : search ? 'No results found' : 'No results for this filter'}
            </h3>
            <p className="text-sm text-gray-500">
              {todos.length === 0 ? 'Hit "+ New Todo" to get started.' : search ? `Nothing matches "${search}"` : 'Try changing the filters above.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(todo => (
              <TodoCard key={todo._id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <TodoModal onClose={() => setShowModal(false)} onSave={handleCreate} />
      )}
    </div>
  )
}