import { Router } from 'express'
import { createCheckoutSession, checkoutSessionSave } from '../controllers/order'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/create-checkout-session', checkToken, createCheckoutSession)
router.get('/checkout-session-save', checkoutSessionSave)

export default router
