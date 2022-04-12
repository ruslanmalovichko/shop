import { Response, Request } from 'express'
import Conversation from '../../models/conversation'
import Message from '../../models/message'

import { IUser } from '../../types/user'
import { IConversation } from '../../types/conversation'

const mongoose = require('mongoose')

const message = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = res.locals.user

    const from = mongoose.Types.ObjectId(user._id)
    const to = mongoose.Types.ObjectId(req.body.to)

    const message: string = req.body.message

    const filter = {
      recipients: {
        $all: [
          { $elemMatch: { $eq: from } },
          { $elemMatch: { $eq: to } }
        ]
      }
    }

    const foundConversation: IConversation[] = await Conversation.find(filter)

    let conversationId: string

    if (foundConversation.length === 0) {
      const newConversationData: Pick<IConversation, 'recipients' | 'lastMessage'> = {
        recipients: [from, to],
        lastMessage: message
      }

      const newConversation: IConversation = new Conversation(newConversationData)
      const createdConversation: IConversation = await newConversation.save()

      conversationId = createdConversation._id
    } else if (foundConversation.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    } else {
      conversationId = foundConversation[0]._id
      const filter = { _id: conversationId }
      await Conversation.updateMany(filter, { $set: { lastMessage: message } })
    }

    const newMessage = new Message({
      conversation: conversationId,
      to: to,
      from: from,
      body: message
    })

    await newMessage.save()
    res.status(200).send({ message: 'Message has been sent' })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

export { message }
