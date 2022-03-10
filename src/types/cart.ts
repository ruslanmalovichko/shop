import { Document } from 'mongoose'
import { IItem } from './item'

export interface ICart extends Document {
  user: string
  items: [
    IItem
  ]
}
