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
        const group: HydratedDocument<IGroup> = res.locals.group
        const task: HydratedDocument<ITask> = await Tasks.create({ title: req.body.title, groupId: group._id })
        group.tasks.push(task._id)
        await group.save()
        res.status(201).send(task)
    },
    update: async (req: Request, res: Response) => {
        const task: HydratedDocument<ITask> = res.locals.task
        task.title = req.body.title
        await task.save()
        res.status(200).send('Successfully updated')
    },
    delete: async (req: Request, res: Response) => {
        const task: HydratedDocument<ITask> = res.locals.task
        const group: HydratedDocument<IGroup> = res.locals.group
        for (let i = 0; i < group.tasks.length; i++) {
            if (task._id.equals(group.tasks[i])) {
                group.tasks.splice(i, 1)
                await group.save()
                break
            }
        }
        task.delete()
        res.sendStatus(204)
    },
}
