// Types
import { Request, Response } from 'express'

// Models
import Groups from '../models/Group'
import Tasks from '../models/Task'

class groupController {
    async getGroup(req: Request, res: Response) {
        const groupID = req.params.id
        if (res.locals.user.groups.includes(groupID)) {
            const group = await Groups.findById(groupID)
            const tasks = []
            for (const taskID of group?.tasks || []) tasks.push(await Tasks.findById(taskID))
            res.status(200).send({ _id: group?._id, title: group?.title, tasks })
        } else {
            res.status(404).send('Group with this id was not found')
        }
    }
    async createGroup(req: Request, res: Response) {
        const tasks = []
        if (req.body.tasks)
            for (const task of req.body.tasks) tasks.push((await Tasks.create(task))._id)
        const group = await Groups.create({ title: req.body.title, tasks })
        const user = res.locals.user
        user.groups.push(group._id)
        await user.save()
        res.status(201).send(group)
    }
}

export default new groupController()
