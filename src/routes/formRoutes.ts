import { Router } from 'express'
import { contactForm } from '../controllers/form'

const router: Router = Router()

router.post('/contact', contactForm)
export default router
