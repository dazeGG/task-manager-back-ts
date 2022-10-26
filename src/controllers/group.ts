// Types
import { Request, Response } from 'express'

// Models
import Groups from '../models/Group'
import Tasks from '../models/Task'

// Utils
import getGroupFull from '../scripts/getGroupFull'

class groupController {
    async getGroup(req: Request, res: Response) {
        const groupID = req.params.id
        if (res.locals.user.groups.includes(groupID)) {
            res.status(200).send(await getGroupFull(groupID))
        } else {
            res.status(404).send('Group with this id was not found')
        }
    }
    // async createGroup(req: Request, res: Response) {
    //     const tasks = []
    //     if (req.body.tasks)
    //         for (const task of req.body.tasks) tasks.push((await Tasks.create(task))._id)
    //     const group = await Groups.create({ title: req.body.title, tasks })
    //     const user = res.locals.user
    //     user.groups.push(group._id)
    //     await user.save()
    //     res.status(201).send(await getGroupFull(group._id))
    // }
    async createGroup(req: Request, res: Response) {
        const group = await Groups.create({ title: req.body.title })
        const user = res.locals.user
        user.groups.push(group._id)
        await user.save()
        res.status(201).send(await getGroupFull(group._id))
    }
    async updateGroup(req: Request, res: Response) {
        const group = await Groups.findById(req.body._id)
        if (group) {
            group.title = req.body.title
            await group.save()
            res.status(200).send('Successfully updated')
        } else {
            res.status(404).send('Group with this id was not found')
        }
    }
}

export default new groupController()
