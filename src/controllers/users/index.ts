import { Response, Request } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || ''

const generateToken = (data: string) => {
  return jwt.sign(data, PRIVATE_KEY)
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'username' | 'password'>
    const {
      username, password
    } = body

    const existingUsers: IUser[] = await User.find({ username })

    if (existingUsers.length === 0) {
      res.status(401).send({ message: 'No user found' })
      return
    } else if (existingUsers.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    }

    const correctPassword = await bcrypt.compare(password, existingUsers[0].password)

    if (!correctPassword) {
      res.status(401).send({ message: 'Invalid credentials' })
      return
    }

    res.status(200).send({ ...existingUsers[0].toJSON() })
    return
  } catch (error) {
    // res.status(500).send({ message: error });
    throw error
  }
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'username' | 'password' | 'email' | 'address' | 'phone'>

    const {
      username,
      password,
      email,
      address,
      phone
    } = body

    const existingUsers: IUser[] = await User.find({ username })

    if (existingUsers.length !== 0) {
      res.status(409).send({ message: 'User already exists' })
      return
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const token = generateToken(username)

    const newUserData: Pick<IUser, 'username' | 'password' | 'email' | 'address' | 'phone' | 'token'> = {
      username,
      password: hash,
      email,
      address,
      phone,
      token
    }

    const newUser: IUser = new User(newUserData)
    const createdUser: IUser = await newUser.save()

    res.status(201).send({ ...createdUser.toJSON() })
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).send(res.locals.user)
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'email' | 'address' | 'phone'>

    const {
      email,
      address,
      phone
    } = body

    const filter = { _id: res.locals.user._id }

    await User.updateMany(filter, { $set: { email: email, address: address, phone: phone } })

    res.status(200).send({ message: 'User updated' })
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

export { registerUser, loginUser, getUser, updateUser }
