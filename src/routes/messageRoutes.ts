import { Router } from 'express'
import { message, conversations, messages } from '../controllers/message'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, message)
router.get('/conversations', checkToken, conversations)
router.get('/messages', checkToken, messages)
export default router
