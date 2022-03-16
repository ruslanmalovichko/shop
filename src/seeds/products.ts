import Product from '../models/product'
import { Response, Request, NextFunction } from 'express'
import { IProduct } from '../types/product'
import { readFileSync } from 'fs'
import 'dotenv/config'
import Stripe from 'stripe';

const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || ''

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  typescript: true
});

const products: Array<Pick<IProduct, 'info' | 'tags'>> = JSON.parse(readFileSync(process.cwd() + '/src/seeds/products.json', 'utf-8'))

const seedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    for await (const product of products) {
      const filter = { 'info.name': product.info.name }
      const foundProducts: IProduct[] = await Product.find(filter)
      if (foundProducts.length > 1) {
        res.status(401).send({ message: 'Multiple products found' })
        return
      }
      else if (foundProducts.length === 1) {
        if (foundProducts[0].info.price !== product.info.price) {
          res.status(401).send({ message: 'Price has changed' })
          return
        }

        const updatedProduct = await Product.updateMany(filter, { $set: product })

        console.log('Updated product')
        console.log(product.info.name)
      }
      else if (foundProducts.length === 0) {
        const productStripe = await stripe.products.create({
          name: product.info.name,
        });
        console.log('Created produc stripe')
        console.log(productStripe.id)

        product.info.product_id = productStripe.id

        const priceStripe = await stripe.prices.create({
          unit_amount: product.info.price,
          currency: 'usd',
          product: productStripe.id,
        });
        console.log('Created price stripe')
        console.log(priceStripe.id)

        product.info.price_id = priceStripe.id

        const createdProduct: IProduct = await Product.create(product)
        console.log('Created product')
        console.log(createdProduct.info.name)
      }
    }
    res.status(200).send({ message: 'Products created.' })
    return
  } catch (error) {
    // res.status(500).send({ message: error });
    throw error
  }
}

export { seedProducts }
