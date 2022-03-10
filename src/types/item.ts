import { Document } from 'mongoose'

export interface IItem extends Document {
  product: string
  quantity: number
}
