import mongoose from 'mongoose'

export interface ITask {
  _id: mongoose.Types.ObjectId
  groupId: mongoose.Types.ObjectId
  title: string
  checked: boolean
  subtasks: [
      {
          title: string
          checked: boolean
      }
  ]
}

const taskSchema = new mongoose.Schema<ITask>({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true, immutable: true },
  title: { type: String, required: true },
  checked: { type: Boolean, default: false },
  subtasks: [{ title: { type: String, required: true }, checked: { type: Boolean, default: false } }]
})

export default mongoose.model<ITask>('Task', taskSchema)
