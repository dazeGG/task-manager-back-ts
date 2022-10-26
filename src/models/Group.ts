import mongoose from 'mongoose'

export interface IGroup {
  title: string
  tasks: mongoose.Types.ObjectId[]
}

const groupSchema = new mongoose.Schema<IGroup>({
  title: { type: String, required: true }, // * required
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task'
    }
  ],
})

export default mongoose.model('group', groupSchema)
