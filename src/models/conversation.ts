import { IConversation } from '../types/conversation'
import { model, Schema } from 'mongoose'

const options = { collection: 'conversations', timestamps: true }

const conversationSchema: Schema = new Schema(
  {
    recipients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    lastMessage: {
      type: String,
      required: true
    }
  },
  options
)

export default model<IConversation>('Conversation', conversationSchema)
