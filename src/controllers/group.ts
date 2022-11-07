// Types
import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { IUser } from '../models/User'
import { IGroup } from '../models/Group'

// Models
import Groups from '../models/Group'

// Utils
import getGroupFull from '../scripts/getGroupFull'

export default {
    get: async (req: Request, res: Response) => {
        const groupID: string = req.params.id
        if (res.locals.user.groups.includes(groupID)) {
            const group = await getGroupFull(groupID)
            if (group) res.status(200).send(group)
            else res.status(404).send('Group with this id was not found')
        } else {
            res.status(404).send('Group with this id was not found')
        }
    },
    create: async (req: Request, res: Response) => {
        const group: HydratedDocument<IGroup> = await Groups.create({ title: req.body.title })
        const user: HydratedDocument<IUser> = res.locals.user
        user.groups.push(group._id)
        await user.save()
        res.status(201).send(await getGroupFull(group._id))
    },
    update: async (req: Request, res: Response) => {
        const group: HydratedDocument<IGroup> | null = await Groups.findById(req.params.id)
        if (group) {
            group.title = req.body.title
            await group.save()
            res.status(200).send('Successfully updated')
        } else {
            res.status(404).send('Group with this id was not found')
        }
    },
    delete: async (req: Request, res: Response) => {
        const group: HydratedDocument<IGroup> | null = await Groups.findByIdAndDelete(req.params.id)
        const user: HydratedDocument<IUser> = res.locals.user
        if (group) {
            for (let i = 0; i < user.groups.length; i++) {
                if (group._id.equals(user.groups[i])) {
                    user.groups.splice(i, 1)
                    await user.save()
                    break
                }
            }
            res.sendStatus(204)
        }
        else res.status(404).send('Invalid group id')
    }
}
