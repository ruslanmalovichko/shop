import { Document } from 'mongoose'
import { IItem } from './item'

export interface IOrder extends Document {
  items: [
    IItem
  ],
  stripe: object
}
