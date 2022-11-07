// Express and Router type
import express, { Router } from 'express'

// Middlewares
import userMiddleware from '../middlewares/user'
import groupMiddleware from '../middlewares/group'
import taskMiddleware from '../middlewares/task'

// Controller
import taskController from '../controllers/task'

const router: Router = express.Router()

router.use('/', userMiddleware.getUser)
router.use('/', taskMiddleware.getGroup)
router.use('/', userMiddleware.groupExists)

router.post('/', taskController.create)

router.use('/:id', taskMiddleware.getTask)
router.use('/:id', groupMiddleware.taskExists)

router.get('/:id', taskController.get)

export default router
