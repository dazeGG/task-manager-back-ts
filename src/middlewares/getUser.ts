import { Request, Response, NextFunction } from 'express'
import Users from '../models/User'

export default async (req: Request, res: Response, next: NextFunction) => {
    const user = await Users.findOne({ token: req.headers.bearer })
    if (user) {
        res.locals.user = user
        next()
    } else {
        res.status(401).send('User with this token not found')
    }
}
