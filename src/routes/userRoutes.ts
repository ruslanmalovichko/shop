import { Router } from 'express'
import { checkToken } from '../controllers/token'
import { getUser, updateUser } from '../controllers/users'

const router: Router = Router()

router.get('/', checkToken, getUser)
router.put('/', checkToken, updateUser)

export default router

