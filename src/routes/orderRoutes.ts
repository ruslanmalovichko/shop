import { Router } from 'express'
import { setOrder, createCheckoutSession, checkoutSession, checkoutSessionSave } from '../controllers/order'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, setOrder)
router.post('/create-checkout-session', createCheckoutSession)
router.get('/checkout-session', checkoutSession)
router.post('/checkout-session-save', checkToken, checkoutSessionSave)

export default router
