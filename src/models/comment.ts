import { IComment } from '../types/comment'
import { model, Schema } from 'mongoose'

const options = { collection: 'comments', timestamps: true }

const commentSchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    user: {
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

export default model<IComment>('Comment', commentSchema)
