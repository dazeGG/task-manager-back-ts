import path from 'path'

// eslint-disable-next-line
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express'

import router from './routes'
import swaggerOptions from './swagger'

mongoose.connect(process.env.dbURI || '')

const app: Application = express()

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerOptions))

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
