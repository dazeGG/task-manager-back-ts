import { Request, Response, NextFunction } from 'express'
import Users from '../models/User'

export default async (req: Request, res: Response, next: NextFunction) => {
    const authorizationItems = (req.headers.authorization || '').split(' ')
    if (authorizationItems[0] === 'Brearer') {
        const token = authorizationItems[1]
        const user = await Users.findOne({ token })
        if (user) {
            res.locals.user = user
            next()
        } else {
            res.status(401).send('User with this token not found')
        }
    } else {
        res.status(400).send('Make sure you have sent the token correctly')
    }
}
