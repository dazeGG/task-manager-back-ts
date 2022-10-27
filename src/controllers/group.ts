// Types
import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { IUser } from '../models/User'
import { IGroup } from '../models/Group'

// Models
import Groups from '../models/Group'

// Utils
import getGroupFull from '../scripts/getGroupFull'

class groupController {
    async get(req: Request, res: Response) {
        const groupID: string = req.params.id
        if (res.locals.user.groups.includes(groupID)) {
            res.status(200).send(await getGroupFull(groupID))
        } else {
            res.status(404).send('Group with this id was not found')
        }
    }
    async create(req: Request, res: Response) {
        const group: HydratedDocument<IGroup> = await Groups.create({ title: req.body.title })
        const user: HydratedDocument<IUser> = res.locals.user
        user.groups.push(group._id)
        await user.save()
        res.status(201).send(await getGroupFull(group._id))
    }
    async update(req: Request, res: Response) {
        const group: HydratedDocument<IGroup> | null = await Groups.findById(req.body._id)
        if (group) {
            group.title = req.body.title
            await group.save()
            res.status(200).send('Successfully updated')
        } else {
            res.status(404).send('Group with this id was not found')
        }
    }
    async delete(req: Request, res: Response) {
        const group: HydratedDocument<IGroup> | null = await Groups.findByIdAndDelete(req.body._id)
        if (group) res.sendStatus(204)
        else res.status(404).send('Invalid group id')
    }
}

export default new groupController()
