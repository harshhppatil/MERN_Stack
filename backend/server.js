import express from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import { errorHandler, notFound } from './src/middleware/errorHandler.js'
import carRoutes from './src/routes/carRoutes.js'
import bookingRoutes from './src/routes/bookingRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session middleware — replaces JWT
app.use(session({
  secret: process.env.SESSION_SECRET || 'wildtide_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
}))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running ✅' })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})