// Express and Router type
import express, { Router } from 'express'

// Routers
import authRouter from './auth'
import userRouter from './user'
import groupRouter from './group'

const router: Router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/group', groupRouter)

export default router
