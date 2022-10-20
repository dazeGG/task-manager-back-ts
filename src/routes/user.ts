import express, { Router, Request, Response } from 'express'

import authMiddleware from '../middlewares/auth'
import getTokenMiddleware from '../middlewares/getToken'
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
router.use('/token/refresh', getTokenMiddleware)

// Route
router.put('/token/refresh', userController.tokenRefresh)

// * Tasks

// Middlewares
router.use('/tasks', getTokenMiddleware)

// Route
router.get('/tasks', userController.getTasks)

export default router
