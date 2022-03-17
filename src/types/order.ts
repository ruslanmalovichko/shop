import { IItem } from './item'

export interface IOrder {
  items: [
    IItem
  ]
  stripe: object
}
