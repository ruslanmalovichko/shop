import { IUser } from './../types/user'
import { model, Schema } from 'mongoose'

const validateEmail = function (email: string) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
const options = { collection: 'users', timestamps: true }

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, 'invalid email']
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    orders: {
      type: [],
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  options
)

export default model<IUser>('User', userSchema)
