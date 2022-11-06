// Express and Router type
import express, { Router } from 'express'

// Middlewares
import getUserMiddleware from '../middlewares/getUser'

// Controllers
import groupController from '../controllers/group'

const router: Router = express.Router()

// Group
router.use('/', getUserMiddleware)

router.post('/', groupController.create)
router.get('/:id', groupController.get)
router.put('/:id', groupController.update)
router.delete('/:id', groupController.delete)

export default router
