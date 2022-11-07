// Express and Router type
import express, { Router } from 'express'

import authMiddleware from '../middlewares/auth'
import userMiddleware from '../middlewares/user'
import authController from '../controllers/auth'

const router: Router = express.Router()

// * Sing Up

// Middlewares
router.use('/sign-up', authMiddleware.usernameAndPasswordCheck)
router.use('/sign-up', authMiddleware.usernameCheck)
router.use('/sign-up', authMiddleware.passwordCheck)

// Route
router.post('/sign-up', authController.signUp)

// * Sing In

// Middlewares
router.use('/sign-in', authMiddleware.usernameAndPasswordCheck)
router.use('/sign-in', authMiddleware.passwordCheck)

// Route
router.post('/sign-in', authController.signIn)

// * Token Refresh

// Middleware
router.use('/token/refresh', userMiddleware.getUser)

// Route
router.put('/token/refresh', authController.tokenRefresh)

export default router
