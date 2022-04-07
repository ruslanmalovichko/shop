import { Document } from 'mongoose'

export interface IFormContact extends Document {
  messageId: string
  message: string
  name: string
  email: string
  from: string
  to: string
  subject: string
}
