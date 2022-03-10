import { Router } from 'express'
import { checkToken } from '../controllers/token'
import { addCart, getCart, changeCart, removeCart } from '../controllers/cart'
import bodyParser from 'body-parser'

const router: Router = Router()

router.post('/', checkToken, addCart)
router.get('/', checkToken, getCart)
router.put('/', checkToken, bodyParser.json(), changeCart)
router.delete('/', checkToken, removeCart)

export default router
