import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import 'dotenv/config'

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || ''

const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const header = req.headers['authorization']

    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];

      jwt.verify(token, PRIVATE_KEY, async (err, username) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
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
        }
      })
    }
    else {
      res.sendStatus(403);
    }
  } catch (error) {
    // res.status(500).send({ message: error });
    throw error
  }
}

export { checkToken }

