import { Document } from 'mongoose'
import { IProduct } from './product'
import { IUser } from './user'

export interface IComment extends Document {
  product: IProduct
  user: IUser
  body: string
}
