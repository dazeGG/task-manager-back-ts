import mongoose from 'mongoose'

import Groups, { IGroup } from '../models/Group'
import Tasks from '../models/Task'

export interface IGroupFull extends IGroup {
    _id: mongoose.Types.ObjectId
    tasks: any[]
}

export default async (groupId: mongoose.Types.ObjectId | string): Promise<IGroupFull | null> => {
    const group = await Groups.findById(groupId)
    if (group) {
        const tasks = []
        for (const taskId of group?.tasks || []) tasks.push(await Tasks.findById(taskId))
        return { _id: group._id, title: group.title, tasks }
    } else return group
}
