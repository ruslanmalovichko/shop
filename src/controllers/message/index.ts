import { Response, Request } from 'express'
import Conversation from '../../models/conversation'
import Message from '../../models/message'
import User from '../../models/user'

import { IUser } from '../../types/user'
import { IConversation } from '../../types/conversation'
import { IMessage } from '../../types/message'

const message = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = res.locals.user
    const emailTo = req.body.to

    const existingUsers: IUser[] = await User.find({ email: emailTo })

    if (existingUsers.length === 0) {
      res.status(401).send({ message: 'No user found' })
      return
    } else if (existingUsers.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    }

    const from = user._id
    const to = existingUsers[0]._id
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
      res.status(401).send({ message: 'Multiple conversations found' })
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

const conversations = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = res.locals.user
    const from = user._id

    const filter = {
      recipients: {
        $all: [
          { $elemMatch: { $eq: from } }
        ]
      }
    }

    const foundConversation: IConversation[] = await Conversation.find(filter)

    if (foundConversation.length === 0) {
      res.status(401).send({ message: 'No conversations found' })
      return
    } else if (foundConversation.length !== 1) {
      res.status(401).send({ message: 'Multiple conversations found' })
      return
    } else {
      res.status(200).send({ conversationId: foundConversation[0]._id })
      return
    }
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

const messages = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = res.locals.user
    const emailTo = req.query.to

    const existingUsers: IUser[] = await User.find({ email: emailTo })

    if (existingUsers.length === 0) {
      res.status(401).send({ message: 'No user found' })
      return
    } else if (existingUsers.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    }

    const from = user._id
    const to = existingUsers[0]._id

    const filter = {
      recipients: {
        $all: [
          { $elemMatch: { $eq: from } }
        ]
      }
    }

    const foundConversation: IConversation[] = await Conversation.find(filter)

    if (foundConversation.length === 0) {
      res.status(401).send({ message: 'No conversations found' })
      return
    } else if (foundConversation.length !== 1) {
      res.status(401).send({ message: 'Multiple conversations found' })
      return
    }

    const filterMessage = {
      conversation: foundConversation[0]._id,
      $or: [
        { $and: [{ to: to }, { from: from }] },
        { $and: [{ to: from }, { from: to }] }
      ]
    }

    const foundMessages: IMessage[] = await Message.find(filterMessage)
    res.status(200).send(foundMessages)
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

export { message, conversations, messages }
