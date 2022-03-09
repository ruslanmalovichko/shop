import { Router } from 'express'
import { checkToken } from '../controllers/token'
import { addCart } from '../controllers/cart'

const router: Router = Router()

router.post('/', checkToken, addCart)

export default router
