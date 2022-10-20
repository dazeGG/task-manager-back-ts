import 'dotenv/config'

import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import router from './routes'

mongoose.connect(process.env.dbURI || '')

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/', router)

const PORT: string | number = process.env.PORT || 5000

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
