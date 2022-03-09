import { Router } from 'express'
import { checkToken } from '../controllers/token'
import { addCart, getCart } from '../controllers/cart'

const router: Router = Router()

router.post('/', checkToken, addCart)
router.get('/', checkToken, getCart)

export default router
