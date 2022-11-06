import mongoose from 'mongoose'

import Groups, { IGroup } from '../models/Group'
import Tasks from '../models/Task'

export interface IGroupFull extends IGroup {
    _id: mongoose.Types.ObjectId
    tasks: any[]
}

export default async (groupID: mongoose.Types.ObjectId | string): Promise<IGroupFull | null> => {
    const group = await Groups.findById(groupID)
    if (group) {
        const tasks = []
        for (const taskID of group?.tasks || []) tasks.push(await Tasks.findById(taskID))
        return { _id: group._id, title: group.title, tasks }
    } else return group
}
