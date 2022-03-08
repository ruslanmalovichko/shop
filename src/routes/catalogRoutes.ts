import { Router } from 'express'
import { getCatalog } from '../controllers/catalog'

const router: Router = Router()

router.get('/', getCatalog)

export default router
