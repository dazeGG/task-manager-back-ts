// Types
import { Types, HydratedDocument } from 'mongoose'
import { ITask } from '../models/Task'
import { IGroup } from '../models/Group'

// Models
import Groups from '../models/Group'
import Tasks from '../models/Task'

// Template
import welcomeTask from '../utils/welcomeTask'

export default async (): Promise<Types.ObjectId> => {
  const createdTask: HydratedDocument<ITask> = await Tasks.create(welcomeTask)
  const createdGroup: HydratedDocument<IGroup> = await Groups.create({
    title: 'Welcome Group',
    tasks: [createdTask._id],
  })
  return createdGroup._id
}
