// Express and Router type
import express, { Router } from 'express'

// Routers
import userRouter from './user'

// Middlewares
import getUserMiddleware from '../middlewares/getUser'

// Controllers
import groupController from '../controllers/group'

const router: Router = express.Router()

// User
router.use('/user', userRouter)

// Group
router.use('/group', getUserMiddleware)

router.get('/group/:id', groupController.get)
// router.put('/group/move', groupController.move)
router.post('/group', groupController.create)
router.put('/group/:id', groupController.update)
router.delete('/group/:id', groupController.delete)

export default router
