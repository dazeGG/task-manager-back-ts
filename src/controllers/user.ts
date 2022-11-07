// Types
import { Request, Response } from 'express'
import mongoose, { HydratedDocument } from 'mongoose'
import { IGroup } from '../models/Group'

// Models
import Groups from '../models/Group'

export default {
  getGroups: async (req: Request, res: Response) => {
    const groups: { _id: mongoose.Types.ObjectId, title: string }[] = []
    for (const groupId of res.locals.user.groups || []) {
      const group: HydratedDocument<IGroup> | null = await Groups.findById(groupId)
      if (group) groups.push({ _id: group._id, title: group.title })
    }
    res.status(200).send(groups)
  }
}
