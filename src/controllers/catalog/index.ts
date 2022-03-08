import { Response, Request } from 'express'
import Product from '../../models/product'
import { IProduct } from '../../types/product'

const getCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = {}
    const foundProducts: IProduct[] = await Product.find(filter)

    res.send(foundProducts)
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    throw error
  }
}

export { getCatalog }
