import express, { Router } from 'express'

import authMiddleware from '../middlewares/auth'
import getUserMiddleware from '../middlewares/getUser'
import userController from '../controllers/user'

const router: Router = express.Router()

// * Sing Up

// Middlewares
router.use('/sign-up', authMiddleware.usernameAndPasswordCheck)
router.use('/sign-up', authMiddleware.usernameCheck)
router.use('/sign-up', authMiddleware.passwordCheck)

// Route
router.post('/sign-up', userController.signUp)

// * Sing In

// Middlewares
router.use('/sign-in', authMiddleware.usernameAndPasswordCheck)
router.use('/sign-in', authMiddleware.passwordCheck)

// Route
router.post('/sign-in', userController.signIn)

// * Token Refresh

// Middlewares
router.use('/token/refresh', getUserMiddleware)

// Route
router.put('/token/refresh', userController.tokenRefresh)

export default router
