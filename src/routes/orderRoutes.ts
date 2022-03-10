import { Router } from 'express'
import { setOrder } from '../controllers/order'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, setOrder)

export default router
