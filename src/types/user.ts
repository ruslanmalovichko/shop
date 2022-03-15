import { Document } from 'mongoose'
import { IOrder } from './order'

export interface IUser extends Document {
  username: string
  password: string
  email: string
  address: string
  phone: string
  orders: [
    IOrder
  ],
  token: string
}
