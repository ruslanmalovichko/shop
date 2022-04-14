import { Response, Request } from 'express'
import Comment from '../../models/comment'
import Product from '../../models/product'

import { IUser } from '../../types/user'
import { IProduct } from '../../types/product'

const comment = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = res.locals.user
    const message: string = req.body.message
    const productName: string = req.body.product
    const foundProducts: IProduct[] = await Product.find({ 'info.name': productName })

    if (foundProducts.length === 0) {
      res.status(401).send({ message: 'No products found' })
      return
    } else if (foundProducts.length !== 1) {
      res.status(401).send({ message: 'Multiple products found' })
      return
    }

    const newComment = new Comment({
      product: foundProducts[0]._id,
      user: user._id,
      body: message
    })

    await newComment.save()
    res.status(200).send({ message: 'Comment has been sent' })
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

export { comment }
