// Express and Router type
import express, { Router } from 'express'

import getUserMiddleware from '../middlewares/getUser'
import userController from '../controllers/user'
import authRouter from './auth'

const router: Router = express.Router()

router.use('/auth', authRouter)

// * Get Groups

// Middleware
router.use('/groups', getUserMiddleware)

// Route
router.get('/groups', userController.getGroups)

export default router
