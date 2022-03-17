import { Router } from 'express'
import { createCheckoutSession, checkoutSession, checkoutSessionSave } from '../controllers/order'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/create-checkout-session', checkToken, createCheckoutSession)
router.get('/checkout-session', checkoutSession)
router.post('/checkout-session-save', checkToken, checkoutSessionSave)

export default router
