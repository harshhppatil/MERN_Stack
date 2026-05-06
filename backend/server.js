import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import authRoutes    from './src/routes/authRoutes.js'
import userRoutes    from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import orderRoutes   from './src/routes/orderRoutes.js'
import { errorHandler, notFound } from './src/middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/auth',     authRoutes)
app.use('/api/users',    userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)

app.get('/api/health', (req, res) => {
  res.json({ message: 'Loops & Looms server is running ✅', env: process.env.NODE_ENV })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🧶 Loops & Looms server running on http://localhost:${PORT}`)
})