import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import 'dotenv/config'

const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const header = req.headers.authorization

    if (typeof header !== 'string') {
      res.status(401).send({ message: 'Header is wrong type' })
      return
    }

    const bearer = header.split(' ')
    const token = bearer[1]

    const PRIVATE_KEY = process.env.PRIVATE_KEY

    if (typeof PRIVATE_KEY !== 'string') {
      res.status(401).send({ message: 'PRIVATE_KEY is wrong type' })
      return
    }

    const username = jwt.verify(token, PRIVATE_KEY, (err, username) => {
      if (err != null) {
        return null
      } else {
        return username
      }
    })

    if (username == null) {
      res.status(401).send({ message: 'jwt is not verified' })
      return
    }

    const existingUsers: IUser[] = await User.find({ username })

    if (existingUsers.length === 0) {
      res.status(401).send({ message: 'No user found' })
      return
    } else if (existingUsers.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    }

    res.locals.user = existingUsers[0]
    next()
  } catch (error) {
    // res.status(500).send({ message: error });
    console.log(error)
    throw error
  }
}

export { checkToken }
