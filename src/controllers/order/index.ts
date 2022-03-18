import { Response, Request } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import { IProduct } from '../../types/product'
import Product from '../../models/product'
import { ICart } from '../../types/cart'
import Cart from '../../models/cart'
import { IOrder } from '../../types/order'

import 'dotenv/config'
import Stripe from 'stripe'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
let stripe: Stripe

if (typeof STRIPE_SECRET_KEY === 'string') {
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    typescript: true
  })
}

const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = res.locals.user
    const domainURL = process.env.DOMAIN

    if (typeof domainURL !== 'string') {
      res.status(401).send({ message: 'Wrong domainURL type' })
      return
    }

    const filter = {
      _id: req.query.id,
      user: user._id.toString()
    }

    if (typeof filter._id !== 'string') {
      res.status(401).send({ message: 'Wrong Cart id type' })
      return
    }

    if (typeof filter.user !== 'string') {
      res.status(401).send({ message: 'Wrong User id type' })
      return
    }

    const foundCart: ICart[] = await Cart.find(filter)

    if (foundCart.length === 0) {
      res.status(401).send({ message: 'Carts not found' })
      return
    } else if (foundCart.length !== 1) {
      res.status(401).send({ message: 'Multiple carts found' })
      return
    }

    const order: IOrder = {
      items: foundCart[0].items,
      stripe: {}
    }

    const lineItems = []

    for await (const item of order.items) {
      const foundProducts: IProduct[] = await Product.find({ _id: item.product })

      if (foundProducts.length === 0) {
        res.status(401).send({ message: 'No products found' })
        return
      } else if (foundProducts.length !== 1) {
        res.status(401).send({ message: 'Multiple products found' })
        return
      }

      lineItems.push({
        price: foundProducts[0].info.price_id,
        quantity: item.quantity
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${domainURL}/api/order/checkout-session-save?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled`, // TO DO: Research canceled
      customer: user.customer_id,
      metadata: {
        user_id: filter.user,
        cart_id: filter._id
      }
    })

    await Cart.updateMany(filter, { $set: { session_id: session.id } })

    res.status(200).send({ message: session.url })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    // res.status(400).send({ error: { message: e.message } })
    console.log(error)
    throw error
  }
}

const checkoutSessionSave = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.query.session_id
    console.log('sessionId')
    console.log(sessionId)

    if (typeof sessionId !== 'string') {
      res.status(500).send({ message: 'No session ID' })
      return
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
    console.log('stripeSession.status')
    console.log(stripeSession.status)

    if (stripeSession.status !== 'complete') {
      res.status(401).send({ message: 'Stripe status is not complete' })
      return
    }

    const metadata = stripeSession.metadata
    console.log('metadata')
    console.log(metadata)

    if (metadata == null) {
      res.status(401).send({ message: 'Wrong stripe metadata' })
      return
    }

    if (metadata.cart_id == null) {
      res.status(401).send({ message: 'Wrong stripe metadata' })
      return
    }

    if (metadata.user_id == null) {
      res.status(401).send({ message: 'Wrong stripe metadata' })
      return
    }

    const filterUser = { _id: metadata.user_id }
    const existingUsers: IUser[] = await User.find(filterUser)

    if (existingUsers.length === 0) {
      res.status(401).send({ message: 'No user found' })
      return
    } else if (existingUsers.length !== 1) {
      res.status(401).send({ message: 'Multiple users found' })
      return
    }

    const filterCart = { _id: metadata.cart_id }
    const existingCarts: ICart[] = await Cart.find(filterCart)

    if (existingCarts.length === 0) {
      res.status(401).send({ message: 'No carts found' })
      return
    } else if (existingCarts.length !== 1) {
      res.status(401).send({ message: 'Multiple carts found' })
      return
    }

    console.log('existingUsers')
    console.log(existingUsers)

    console.log('existingCarts')
    console.log(existingCarts)

    const order: IOrder = {
      items: existingCarts[0].items,
      stripe: stripeSession
    }

    console.log(order)

    await User.updateMany(filterUser, { $push: { orders: order } })
    await Cart.deleteMany(filterCart)

    res.status(200).send({ message: 'User updated' })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    // res.status(400).send({ error: { message: e.message } })
    console.log(error)
    throw error
  }
}

export { createCheckoutSession, checkoutSessionSave }
