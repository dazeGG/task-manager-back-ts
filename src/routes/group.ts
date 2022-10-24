import express, { Router } from 'express'

import getUserMiddleware from '../middlewares/getUser'
import groupController from '../controllers/group'

const router: Router = express.Router()

router.use('/', getUserMiddleware)

router.get('/:id', groupController.getGroup)
router.post('/create', groupController.createGroup)

export default router
