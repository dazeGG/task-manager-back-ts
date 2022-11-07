// Types
import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { ITask } from '../models/Task'
import { IGroup } from '../models/Group'

// Models
import Tasks from '../models/Task'

export default {
    get: async (req: Request, res: Response) => res.status(200).send(res.locals.task),
    create: async (req: Request, res: Response) => {
        const task: HydratedDocument<ITask> = await Tasks.create({ title: req.body.title })
        const group: HydratedDocument<IGroup> = res.locals.group
        group.tasks.push(task._id)
        await group.save()
        res.status(201).send(task)
    }
}
