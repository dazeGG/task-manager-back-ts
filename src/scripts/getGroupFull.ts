import { HydratedDocument } from 'mongoose'

import { IGroup } from '../models/Group'
import Tasks, { ITask } from '../models/Task'

export interface IGroupFull extends Omit<IGroup, 'tasks'> {
    tasks: ITask[]
}

export default async (group: HydratedDocument<IGroup>): Promise<IGroupFull> => {
    const tasks = []
    for (const taskId of group?.tasks || []) {
        const task: HydratedDocument<ITask> | null = await Tasks.findById(taskId)
        if (task) {
            tasks.push(task)
        }
    }
    return { _id: group._id, userId: group.userId, title: group.title, tasks }
}
