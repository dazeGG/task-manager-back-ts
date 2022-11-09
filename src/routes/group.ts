// Express and Router type
import express, { Router } from 'express'

// Middlewares
import userMiddleware from '../middlewares/user'
import groupMiddleware from '../middlewares/group'

// Controller
import groupController from '../controllers/group'

const router: Router = express.Router()

router.use('/', userMiddleware.getUser)

router.post('/', groupController.create)

router.use('/:id', groupMiddleware.getGroup)
router.use('/:id', userMiddleware.groupExists)

router.get('/:id', groupController.get)
router.put('/:id', groupController.update)
router.put('/:id/move', groupController.move)
router.delete('/:id', groupController.delete)

export default router
