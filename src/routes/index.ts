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
router.post('/group', groupController.create)
router.put('/group', groupController.update)
router.delete('/group', groupController.delete)

export default router
