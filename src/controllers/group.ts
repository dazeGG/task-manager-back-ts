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
    get: async (req: Request, res: Response) => res.status(200).send(await getGroupFull(res.locals.group)),
    create: async (req: Request, res: Response) => {
        const user: HydratedDocument<IUser> = res.locals.user
        const group: HydratedDocument<IGroup> = await Groups.create({ title: req.body.title, userId: user._id })
        user.groups.push(group._id)
        await user.save()
        res.status(201).send(await getGroupFull(group))
    },
    update: async (req: Request, res: Response) => {
        const group: HydratedDocument<IGroup> = res.locals.group
        group.title = req.body.title
        await group.save()
        res.status(200).send('Successfully updated')
    },
    move: async (req: Request, res: Response) => {
        const user: HydratedDocument<IUser> = res.locals.user
        const group: HydratedDocument<IGroup> = res.locals.group
        const newIndex: number = req.body.newIndex
        for (let i = 0; i < user.groups.length; i++) {
            if (group._id.equals(user.groups[i])) {
                switch (i > newIndex) {
                    case true:
                        for (let j = i; j > newIndex; j--) user.groups[j] = user.groups[j - 1]
                        user.groups[newIndex] = group._id
                        break
                    case false:
                        for (let j = newIndex; j < i; j++) user.groups[j] = user.groups[j + 1]
                        user.groups[newIndex] = group._id
                        break
                }
                break
            }
        }
        await user.save()
        res.status(200).send('Successfully moved')
    },
    delete: async (req: Request, res: Response) => {
        const group: HydratedDocument<IGroup> = res.locals.group
        const user: HydratedDocument<IUser> = res.locals.user
        for (let i = 0; i < user.groups.length; i++) {
            if (group._id.equals(user.groups[i])) {
                user.groups.splice(i, 1)
                await user.save()
                break
            }
        }
        group.delete()
        res.sendStatus(204)
    }
}
