import express, { Router } from 'express'

import getUserMiddleware from '../middlewares/getUser'
import groupController from '../controllers/group'

const router: Router = express.Router()

router.use('/group', getUserMiddleware)

export default router
