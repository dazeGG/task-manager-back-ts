import { Request, Response, NextFunction } from 'express'
import { HydratedDocument } from 'mongoose'
import Groups, { IGroup } from '../models/Group'

export default {
    getGroup: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const group: HydratedDocument<IGroup> | null = await Groups.findById(req.params.id)
            if (group) {
                res.locals.group = group
                next()
            } else res.status(289).send('Group with this id was not found')
        } catch (e) {
            res.status(289).send('Group with this id was not found')
        }
    },
    taskExists: async (req: Request, res: Response, next: NextFunction) => {
        if (res.locals.group._id.equals(res.locals.task.groupId)) next()
        else res.status(299).send('Task with this id was not found')
    }
}
