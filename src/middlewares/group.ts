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
            } else res.status(404).send('Group with this id was not found')
        } catch (e) {
            res.status(404).send('Group with this id was not found')
        }
    },
    taskExists: async (req: Request, res: Response, next: NextFunction) => {
        if (res.locals.group.tasks.includes(res.locals.task._id)) next()
        else res.status(404).send('Task with this id was not found')
    }
}
