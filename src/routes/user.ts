// Express and Router type
import express, { Router } from 'express'

import userMiddleware from '../middlewares/user'
import userController from '../controllers/user'
import authRouter from './auth'

const router: Router = express.Router()

router.use('/auth', authRouter)

// * Get Groups

// Middleware
router.use('/groups', userMiddleware.getUser)

// Route
router.get('/groups', userController.getGroups)

export default router
