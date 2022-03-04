import { Router } from 'express'
import { checkToken } from '../controllers/token'
import { getUser } from '../controllers/users'

const router: Router = Router()

router.get('/', checkToken, getUser)

export default router

