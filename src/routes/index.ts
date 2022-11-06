// Express and Router type
import express, { Router } from 'express'

// Routers
import userRouter from './user'
import groupRouter from './group'

const router: Router = express.Router()

// User
router.use('/user', userRouter)

// Group
router.use('/group', groupRouter)

export default router
