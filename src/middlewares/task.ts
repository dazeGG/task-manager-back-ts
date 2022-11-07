import { Request, Response, NextFunction } from 'express'
import { HydratedDocument } from 'mongoose'
import Groups, { IGroup } from '../models/Group'
import Tasks, { ITask } from '../models/Task'

export default {
    getTask: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const task: HydratedDocument<ITask> | null = await Tasks.findById(req.params.id)
            if (task) {
                res.locals.task = task
                next()
            } else res.status(299).send('Task with this id was not found')
        } catch (e) {
            res.status(299).send('Task with this id was not found')
        }
    },
    getGroup: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const group: HydratedDocument<IGroup> | null = await Groups.findById(req.headers.groupid)
            if (group) {
                res.locals.group = group
                next()
            } else res.status(289).send('Group with this id was not found')
        } catch (e) {
            res.status(289).send('Group with this id was not found')
        }
    }
}
