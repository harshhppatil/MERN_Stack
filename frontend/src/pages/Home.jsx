import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MyApp</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        A MERN stack application with authentication ready to go.
      </p>
      {user ? (
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home