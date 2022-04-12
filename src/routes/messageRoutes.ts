import { Router } from 'express'
import { message } from '../controllers/message'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, message)
export default router
