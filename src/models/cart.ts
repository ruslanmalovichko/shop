import { ICart } from '../types/cart'
import { model, Schema } from 'mongoose'

const options = { collection: 'carts', timestamps: true }

const cartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  options
)

export default model<ICart>('Cart', cartSchema)

