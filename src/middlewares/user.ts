import { Request, Response, NextFunction } from 'express'
import { HydratedDocument } from 'mongoose'
import Users, { IUser } from '../models/User'

export default {
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        const authorizationHeader: string = req.headers.authorization || ''
        if (authorizationHeader.startsWith('Bearer ')) {
            const token: string = authorizationHeader.substring(7, authorizationHeader.length)
            const user: HydratedDocument<IUser> | null = await Users.findOne({ token })
            if (user) {
                res.locals.user = user
                next()
            } else res.status(401).send('Access token is invalid')
        } else res.status(401).send('Access token is missing')
    },
    groupExists: async (req: Request, res: Response, next: NextFunction) => {
        if (res.locals.user.groups.includes(res.locals.group._id)) next()
        else res.status(404).send('Group with this id was not found')
    }
}
