import mongoose from 'mongoose'

export interface ITask {
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
  title: { type: String, required: true }, // * required
  checked: { type: Boolean, default: false },
  subtasks: [
    {
      title: { type: String, required: true }, // * required
      checked: { type: Boolean, default: false },
    },
  ],
})

export default mongoose.model('task', taskSchema)
