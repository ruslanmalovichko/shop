import { Router } from 'express'
import { comment } from '../controllers/comment'
import { checkToken } from '../controllers/token'

const router: Router = Router()

router.post('/', checkToken, comment)
export default router
