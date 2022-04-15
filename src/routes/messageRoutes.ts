import { Router } from 'express'
import { message, conversations } from '../controllers/message'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, message)
router.get('/conversations', checkToken, conversations)
export default router
