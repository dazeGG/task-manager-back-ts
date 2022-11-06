// Express and Router type
import express, { Router } from 'express'

import getUserMiddleware from '../middlewares/getUser'
import groupController from '../controllers/group'

const router: Router = express.Router()

router.use('/', getUserMiddleware)

router.post('/', groupController.create)
router.get('/:id', groupController.get)
router.put('/:id', groupController.update)
router.delete('/:id', groupController.delete)

export default router
