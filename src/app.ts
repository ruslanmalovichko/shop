import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import catalogRoutes from './routes/catalogRoutes'
import 'dotenv/config'

const app: Express = express()

const PORT = process.env.PORT
const DB = process.env.DB

mongoose
  .connect(`mongodb://localhost:27017/${DB}`)
  .then(() => {
    app.use(express.json())
    app.set('json spaces', 2)
    app.use(cors())
    app.use('/api/auth', authRoutes)
    app.use('/api/user', userRoutes)
    app.use('/api/product', productRoutes)
    app.use('/api/catalog', catalogRoutes)

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
