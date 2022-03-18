import express, { Express } from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import catalogRoutes from './routes/catalogRoutes'
import orderRoutes from './routes/orderRoutes'
import cartRoutes from './routes/cartRoutes'
import 'dotenv/config'

import { connect } from 'mongoose'

const app: Express = express()

const PORT = process.env.PORT
const DB = process.env.DB

run().catch(err => console.log(err))

async function run (): Promise<void> {
  if (!(typeof DB === 'string' && typeof PORT === 'string')) {
    console.log('Env variables are wrong')
    return
  }

  await connect(`mongodb://localhost:27017/${DB}`)

  app.use(express.json())
  app.set('json spaces', 2)
  app.use(cors())

  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/product', productRoutes)
  app.use('/api/catalog', catalogRoutes)
  app.use('/api/order', orderRoutes)
  app.use('/api/cart', cartRoutes)

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
