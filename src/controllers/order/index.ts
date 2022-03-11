import { Response, Request } from 'express'
import { IUser } from './../../types/user'
import User from '../../models/user'
import 'dotenv/config'
import Stripe from 'stripe';

const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || ''

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  typescript: true
});

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
      name: string
      price: number
      quantity: number
      dateCreated: number
    }) => {
      const updatedUser = await User.updateMany(filter, { $push: { orders: order } })
    })
    res.status(200).send({ message: 'User updated' })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const domainURL = process.env.DOMAIN;
    const { priceId } = req.body;

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the form
    // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
    // For full details see https://stripe.com/docs/api/checkout/sessions/create

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/api/order/checkout-session?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
      // automatic_tax: { enabled: true }
    })

    // [1] {
    // [1]   id: 'cs_test_a1dKaF3Zg5WYviO2ope2juivLNhcs874YNRm4A9ZwvgVBR2VjGAxusL3nx',
    // [1]   object: 'checkout.session',
    // [1]   after_expiration: null,
    // [1]   allow_promotion_codes: null,
    // [1]   amount_subtotal: 1200,
    // [1]   amount_total: 1200,
    // [1]   automatic_tax: { enabled: false, status: null },
    // [1]   billing_address_collection: null,
    // [1]   cancel_url: 'http://localhost:5000/canceled.html',
    // [1]   client_reference_id: null,
    // [1]   consent: null,
    // [1]   consent_collection: null,
    // [1]   currency: 'usd',
    // [1]   customer: null,
    // [1]   customer_creation: 'always',
    // [1]   customer_details: null,
    // [1]   customer_email: null,
    // [1]   expires_at: 1647085404,
    // [1]   livemode: false,
    // [1]   locale: null,
    // [1]   metadata: {},
    // [1]   mode: 'subscription',
    // [1]   payment_intent: null,
    // [1]   payment_link: null,
    // [1]   payment_method_options: null,
    // [1]   payment_method_types: [ 'card' ],
    // [1]   payment_status: 'unpaid',
    // [1]   phone_number_collection: { enabled: false },
    // [1]   recovered_from: null,
    // [1]   setup_intent: null,
    // [1]   shipping: null,
    // [1]   shipping_address_collection: null,
    // [1]   shipping_options: [],
    // [1]   shipping_rate: null,
    // [1]   status: 'open',
    // [1]   submit_type: null,
    // [1]   subscription: null,
    // [1]   success_url: 'http://localhost:5000/success.html?session_id={CHECKOUT_SESSION_ID}',
    // [1]   total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    // [1]   url: 'https://checkout.stripe.com/pay/cs_test_a1dKaF3Zg5WYviO2ope2juivLNhcs874YNRm4A9ZwvgVBR2VjGAxusL3nx#fidkdWxOYHwnPyd1blpxYHZxWjA0Tmdob1RMQWxIT01dSlZjMEdwR2p3aE1LTzcyZ05JbkBtfHdyMDRQNz1sSmsxMl1GZF88UGYzXFVfQGdnRj1BRm5kMXA0TDJ0aDFjMzI2SVdPc1FIYUB3NTVoTV1rSXVhVCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
    // [1] }

    res.status(200).send({ message: session.url })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    // res.status(400).send({ error: { message: e.message } })
    throw error
  }
}

const checkoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.query.session_id

    if (typeof sessionId === 'string') {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // {
      //   "id": "cs_test_a1RmdliBCtgRT2GD03W3hkyY5jY4f3kAfGj307R7kAZYuYsJ1OxDOMGqbu",
      //   "object": "checkout.session",
      //   "after_expiration": null,
      //   "allow_promotion_codes": null,
      //   "amount_subtotal": 1200,
      //   "amount_total": 1200,
      //   "automatic_tax": {
      //     "enabled": false,
      //     "status": null
      //   },
      //   "billing_address_collection": null,
      //   "cancel_url": "http://localhost:5000/canceled.html",
      //   "client_reference_id": null,
      //   "consent": null,
      //   "consent_collection": null,
      //   "currency": "usd",
      //   "customer": "cus_LIlF2eubcJhPnH",
      //   "customer_creation": "always",
      //   "customer_details": {
      //     "email": "ruslanmalovichko@gmail.com",
      //     "phone": null,
      //     "tax_exempt": "none",
      //     "tax_ids": []
      //   },
      //   "customer_email": null,
      //   "expires_at": 1647095059,
      //   "livemode": false,
      //   "locale": null,
      //   "metadata": {},
      //   "mode": "subscription",
      //   "payment_intent": null,
      //   "payment_link": null,
      //   "payment_method_options": null,
      //   "payment_method_types": [
      //     "card"
      //   ],
      //   "payment_status": "paid",
      //   "phone_number_collection": {
      //     "enabled": false
      //   },
      //   "recovered_from": null,
      //   "setup_intent": null,
      //   "shipping": null,
      //   "shipping_address_collection": null,
      //   "shipping_options": [],
      //   "shipping_rate": null,
      //   "status": "complete",
      //   "submit_type": null,
      //   "subscription": "sub_1Kc9inIDiMJHXOSfH65MaTIa",
      //   "success_url": "http://localhost:5000/api/order/checkout-session?session_id={CHECKOUT_SESSION_ID}",
      //   "total_details": {
      //     "amount_discount": 0,
      //     "amount_shipping": 0,
      //     "amount_tax": 0
      //   },
      //   "url": null
      // }

      res.status(200).send(session)
      return
    }
    res.status(500).send({ message: 'No session ID' })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    // res.status(400).send({ error: { message: e.message } })
    throw error
  }
}

export { setOrder, createCheckoutSession, checkoutSession }

