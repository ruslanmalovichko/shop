import { Document } from 'mongoose'
import { IOrder } from './order'

export interface IUser extends Document {
  password: string
  orders: [
    IOrder
  ]
  token: string
  customer_id: string

  // With stripe
  name: string
  email: string
  address: {
    city: string
    country: string
    line1: string
  }
  phone: string
}
