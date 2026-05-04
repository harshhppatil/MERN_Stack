import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home       from './pages/Home'
import Login      from './pages/Login'
import Register   from './pages/Register'
import Dashboard  from './pages/Dashboard'
import TodoDetail from './pages/TodoDetail'
import Profile    from './pages/Profile'
import Notes      from './pages/Notes'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/login"     element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register"  element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/todo/:id"  element={<ProtectedRoute><TodoDetail /></ProtectedRoute>} />
      <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/notes"     element={<ProtectedRoute><Notes /></ProtectedRoute>} />
      <Route path="*"          element={<Navigate to="/" />} />
    </Routes>
  )
}