import { Response, Request } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'

const setOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = { _id: res.locals.user._id }
    const existingUsers: IUser[] = await User.find(filter)

    if (existingUsers.length === 0) {
      res.status(401).send({ message: 'No user found' })
      return
    } else if (existingUsers.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    }

    req.body.order.forEach(async (order: {
      name: string,
      price: number,
      quantity: number,
      dateCreated: number
    }) => {
      const updatedUser = await User.updateMany(filter, { $push: { 'orders': order }})
    })
    res.status(200).send({ message: 'User updated' })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

export { setOrder }
