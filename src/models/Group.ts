import mongoose from 'mongoose'

export interface IGroup {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  title: string
  tasks: mongoose.Types.ObjectId[]
}

const groupSchema = new mongoose.Schema<IGroup>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

export default mongoose.model<IGroup>('Group', groupSchema)
