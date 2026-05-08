import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import destinationRoutes from './src/routes/destinationRoutes.js'
import tourRoutes from './src/routes/tourRoutes.js'
import bookingRoutes from './src/routes/bookingRoutes.js'
import wishlistRoutes from './src/routes/wishlistRoutes.js'
import speciesRoutes from './src/routes/speciesRoutes.js'
import { errorHandler, notFound } from './src/middleware/errorHandler.js'

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
app.use(cookieParser())

app.use('/api/auth',         authRoutes)
app.use('/api/users',        userRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/tours',        tourRoutes)
app.use('/api/bookings',     bookingRoutes)
app.use('/api/wishlist',     wishlistRoutes)
app.use('/api/species',      speciesRoutes)

app.get('/api/health', (req, res) => {
  res.json({ message: 'WildTide server running ✅' })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🌊 WildTide server running on http://localhost:${PORT}`)
})