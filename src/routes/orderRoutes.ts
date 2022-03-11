import { Router } from 'express'
import { setOrder, createCheckoutSession, checkoutSession } from '../controllers/order'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, setOrder)
router.post('/create-checkout-session', createCheckoutSession)
router.get('/checkout-session', checkoutSession)

export default router
