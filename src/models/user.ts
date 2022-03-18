import { IUser } from '../types/user'
import { model, Schema } from 'mongoose'

const validateEmail = function (email: string): boolean {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
const options = { collection: 'users', timestamps: true }

const userSchema: Schema = new Schema(
  {
    password: {
      type: String,
      required: true
    },
    orders: [
      {
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
        ],
        stripe: {
          type: Schema.Types.Mixed,
          required: true
        }
      }
    ],
    token: {
      type: String,
      required: true
    },
    customer_id: {
      type: String,
      required: true
    },

    // With stripe
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'invalid email']
    },
    address: {
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      line1: {
        type: String,
        required: true
      }
    },
    phone: {
      type: String,
      required: true
    }
  },
  options
)

export default model<IUser>('User', userSchema)
