import { Document } from 'mongoose'
import { IConversation } from './conversation'

export interface IMessage extends Document {
  conversation: IConversation
  to: string
  from: string
  body: string
}
