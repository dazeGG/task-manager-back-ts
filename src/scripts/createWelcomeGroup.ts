// Types
import { HydratedDocument } from 'mongoose'
import { IUser } from '../models/User'
import { IGroup } from '../models/Group'
import { ITask } from '../models/Task'

// Models
import Groups from '../models/Group'
import Tasks from '../models/Task'

// Template
import welcomeTask from '../utils/welcomeTask'

export default async (user: HydratedDocument<IUser>): Promise<void> => {
  const group: HydratedDocument<IGroup> = await Groups.create({ title: 'Welcome Group', userId: user._id })
  const task: HydratedDocument<ITask> = await Tasks.create({ ...welcomeTask, groupId: group._id })
  group.tasks.push(task._id)
  await group.save()
  user.groups.push(group._id)
  await user.save()
}
