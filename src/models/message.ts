import { IMessage } from '../types/message'
import { model, Schema } from 'mongoose'

const options = { collection: 'messages', timestamps: true }

const messageSchema: Schema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  options
)

export default model<IMessage>('Message', messageSchema)
