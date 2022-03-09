import { Response, Request } from 'express'
import Cart from '../../models/cart'
import { ICart } from '../../types/cart'
import { IItem } from '../../types/item'

const addCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IItem, 'product' | 'quantity'>

    const {
      product, quantity
    } = body

    const user: Pick<ICart, 'user'> = res.locals.user
    const foundCart: ICart[] = await Cart.find({ user: user })

    if (foundCart.length === 1) {
      const products: string[] = foundCart[0].items.map((item): string => item.product.toString())

      if (products.includes(product)) {
        const filter = {
          user: user,
          items: {
            $elemMatch: { product: product }
          }
        }

        const updatedCart = await Cart.updateMany(filter, { $inc: { 'items.$.quantity': quantity }})
        res.status(200).send(updatedCart)
        return
      }
      else {
        const filter = { user: user }

        const item: Pick<IItem, 'product' | 'quantity'> = { product: product, quantity: quantity }
        const updatedCart = await Cart.updateMany(filter, { $push: { 'items': item }})
        res.status(200).send(updatedCart)
        return
      }
    }
    if (foundCart.length === 0) {
      const newCart: ICart = new Cart({
        user: user,
        items: [
          {
            product: product,
            quantity: quantity
          }
        ]
      })

      const createdCart: ICart = await newCart.save()
      res.status(200).send(createdCart)
      return
    }
    else if (foundCart.length !== 1) {
      res.status(401).send({ message: 'Multiple carts found' })
      return
    }
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: Pick<ICart, 'user'> = res.locals.user
    const foundCart: ICart[] = await Cart.find({ user: user }).populate('user').populate('items.product') // render user and items.product

    if (foundCart.length === 1) {
      res.status(200).send(foundCart[0])
      return
    }
    if (foundCart.length === 0) {
      res.status(401).send({ message: 'Carts not found' })
      return
    }
    else if (foundCart.length !== 1) {
      res.status(401).send({ message: 'Multiple carts found' })
      return
    }
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

export { addCart, getCart }

