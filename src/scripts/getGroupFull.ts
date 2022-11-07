import mongoose, { HydratedDocument } from 'mongoose'

import { IGroup } from '../models/Group'
import Tasks from '../models/Task'

export interface IGroupFull extends IGroup {
    _id: mongoose.Types.ObjectId
    tasks: any[]
}

export default async (group: HydratedDocument<IGroup>): Promise<IGroupFull> => {
    const tasks = []
    for (const taskId of group?.tasks || []) tasks.push(await Tasks.findById(taskId))
    return { _id: group._id, title: group.title, tasks }
}
