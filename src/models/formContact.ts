import { IFormContact } from '../types/formContact'
import { model, Schema } from 'mongoose'

const options = { collection: 'formContacts', timestamps: true }

const formContactSchema: Schema = new Schema(
  {
    messageId: {
      type: String
    },
    message: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    }
  },
  options
)

export default model<IFormContact>('FormContact', formContactSchema)
