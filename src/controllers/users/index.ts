import { Response, Request } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import Stripe from 'stripe'

const PRIVATE_KEY = process.env.PRIVATE_KEY
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
let stripe: Stripe

if (typeof STRIPE_SECRET_KEY === 'string') {
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    typescript: true
  })
}

let generateToken: Function
if (typeof PRIVATE_KEY === 'string') {
  generateToken = (data: string) => {
    return jwt.sign(data, PRIVATE_KEY)
  }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'name' | 'password'>
    const {
      name, password
    } = body

    const existingUsers: IUser[] = await User.find({ name })

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

    // res.status(200).send({ ...existingUsers[0].toJSON() })
    res.status(200).send({ token: existingUsers[0].token })
    return
  } catch (error) {
    // res.status(500).send({ message: error });
    console.log(error)
    throw error
  }
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'password' | 'name' | 'email' | 'address' | 'phone'>

    const {
      password,
      name,
      email,
      address,
      phone
    } = body

    const existingUsers: IUser[] = await User.find({ name })

    if (existingUsers.length !== 0) {
      res.status(409).send({ message: 'User already exists' })
      return
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const token = generateToken(name)

    const customer = await stripe.customers.create({
      name,
      email,
      address,
      phone
    })

    const newUserData: Pick<IUser, 'password' | 'token' | 'customer_id' | 'name' | 'email' | 'address' | 'phone'> = {
      password: hash,
      token,
      customer_id: customer.id,
      name,
      email,
      address,
      phone
    }

    const newUser: IUser = new User(newUserData)
    const createdUser: IUser = await newUser.save()

    res.status(201).send({ ...createdUser.toJSON() })
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).send(res.locals.user)
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'name' | 'email' | 'address' | 'phone'>

    const {
      name,
      email,
      address,
      phone
    } = body

    const customer = await stripe.customers.update(
      res.locals.user.customer_id,
      {
        name,
        email,
        address,
        phone
      }
    )
    console.log('customer')
    console.log(customer)

    const filter = { _id: res.locals.user._id }
    await User.updateMany(filter, { $set: { name, email, address, phone } })
    res.status(200).send({ message: 'User updated' })
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

export { registerUser, loginUser, getUser, updateUser }
