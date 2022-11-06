// Express and Router type
import express, { Router } from 'express'

import getUserMiddleware from '../middlewares/getUser'
import userController from '../controllers/user'

const router: Router = express.Router()

// * Get Groups

// Middleware
router.use('/groups', getUserMiddleware)

// Route
router.get('/groups', userController.getGroups)

export default router
