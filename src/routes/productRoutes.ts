import { Router } from 'express'
import { seedProducts } from '../seeds/products'

const router: Router = Router()

router.get('/import', seedProducts)

export default router
