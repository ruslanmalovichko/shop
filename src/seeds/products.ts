import Product from '../models/product'
import { Response, Request, NextFunction } from 'express'
import { IProduct } from '../types/product'
import { readFileSync } from 'fs'
const products: (Pick<IProduct, 'info' | 'tags'>)[] = JSON.parse(readFileSync(process.cwd() + '/src/seeds/products.json', 'utf-8'))

const seedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filter = {}
    const results = await Product.deleteMany(filter)
    console.log("\n%d Products Deleted.", results.deletedCount)
    const foundProducts: IProduct[] = await Product.find(filter)
    console.log("\nAfter delete: ");
    for (let i in foundProducts) {
      console.log(foundProducts[i])
    }
    const createdProducts: IProduct[] = await Product.create(products)
    res.status(200).send(createdProducts)
    // res.status(200).send({ message: 'Products created.' })
    return
  } catch (error) {
    // res.status(500).send({ message: error });
    throw error
  }
}

export { seedProducts }

