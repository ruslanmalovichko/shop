import { Document } from 'mongoose'
import { IUser } from './user'

export interface IConversation extends Document {
  recipients: [
    IUser,
    IUser
  ]
  lastMessage: string
}
